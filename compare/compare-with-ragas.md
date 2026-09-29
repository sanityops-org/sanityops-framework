# Appendix: Framework-Level Comparison — SanityOps Quality vs. RAGAS

---

## Table of Contents

- [X.1 Context and Scope](#x1-context-and-scope)
- [X.2 Positioning and Objectives](#x2-positioning-and-objectives)
- [X.3 Evaluation Scope](#x3-evaluation-scope)
- [X.4 Test Case Sourcing and Generation](#x4-test-case-sourcing-and-generation)
- [X.5 Metric System Design](#x5-metric-system-design)
- [X.6 Evaluation Workflow and Governance Mechanisms](#x6-evaluation-workflow-and-governance-mechanisms)
- [X.7 Cross-Module Integration](#x7-cross-module-integration)
- [X.8 Boundary Clarification](#x8-boundary-clarification)
- [X.9 Conclusion](#x9-conclusion)

---

<a id="x1-context-and-scope"></a>
## X.1 Context and Scope

This appendix provides an objective, structured comparison between the **Quality subset of the SanityOps Framework** — encompassing both Quality RAG-Agent and Quality Tool-Agent — and **RAGAS** (Retrieval-Augmented Generation Assessment), an open-source evaluation library. The two are frequently conflated in practice, particularly during enterprise tool selection for "RAG evaluation," where RAGAS is sometimes treated as a drop-in equivalent to SanityOps Quality. This appendix clarifies that the two systems address problems at fundamentally different layers of the stack and are neither mutually exclusive nor interchangeable.

---

<a id="x2-positioning-and-objectives"></a>

## X.2 Positioning and Objectives

The distinction begins with the question each system is designed to answer.

| Dimension                   | SanityOps Quality                                                                                                                                                                         | RAGAS                                                                                                                                    |
| --------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| Framework Nature            | A governance subset within an enterprise Agent governance framework, operating in a closed loop with Inspect (Defect Inspection), Risk (Risk Scanning), and Relevance (Impact Mapping).   | A standalone open-source RAG evaluation library focused on measuring the output quality of retrieval-augmented generation pipelines.     |
| Core Question               | Does the Agent's actual task execution — or the user-visible service — meet the defined quality bar?                                                                                      | How semantically similar is the generated content to the retrieval context and/or reference answer?                                      |
| Governance Objective        | Supports a complete decision chain: release authorization, defect localization, and continuous improvement.                                                                               | Provides reproducible, automated scoring to assist model and pipeline iteration and comparison.                                          |
| Part of a Governance System | Yes. Together with Inspect and Risk, it forms the full chain: Design & Build → Static Inspection → Risk Audit → Quality Assessment → Release Gate → Runtime Monitoring → Incident Review. | No. RAGAS is an independent measurement tool; it does not assume release-gating, risk-correlation, or other governance responsibilities. |

---

<a id="x3-evaluation-scope"></a>

## X.3 Evaluation Scope

Beyond the RAG vs. task-execution distinction, the two systems differ in their fundamental assumptions about what an Agent output looks like.

| Dimension           | SanityOps Quality                                                                                                                                                                                                                                                           | RAGAS                                                                                                                                                                |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Agent Type Coverage | Dual-track: **Quality RAG-Agent** for knowledge-retrieval and NL-generation Agents; **Quality Tool-Agent** for tool-calling, structured-I/O, task-execution Agents. Each track uses a completely distinct metric system.                                                    | Covers RAG-generation scenarios only. Does not address the Binary Nature success/failure evaluation of tool-calling or task-execution Agents.                        |
| Output Assumption   | Differentiated by Agent type: RAG-Agent outputs are evaluated on a multi-dimensional continuous scale; Tool-Agent outputs are evaluated on a **Binary Nature** (success/failure) basis — "either entirely correct, or containing an error; there is no intermediate state." | Implicitly assumes natural-language paragraph output and applies continuous scoring paradigms. Provides no adjudication logic for structured, task-oriented outputs. |
| Enterprise Coverage | Explicitly covers task-execution Agents, which dominate enterprise deployments.                                                                                                                                                                                             | Has a structural coverage gap: cannot evaluate tool-based Agents whose core quality signal is task success/failure.                                                  |

In enterprise environments, task-execution Agents — those that call APIs, update databases, or trigger workflows — often outnumber pure generation Agents. A framework that evaluates only generation quality is, by construction, blind to the largest class of production Agents.

---

<a id="x4-test-case-sourcing-and-generation"></a>

## X.4 Test Case Sourcing and Generation

This is where the two systems diverge most sharply — and it is the dimension that determines whether evaluation results are actually representative of the business reality they claim to measure.

<a id="sourcing-governed-vs-user-supplied"></a>

### Sourcing: governed vs. user-supplied

SanityOps Quality mandates that test cases be derived from **identified authoritative sources with defined business boundaries**: approved knowledge documents, policy rules, service boundary specifications, historical high-frequency issues, production complaint records, and change logs. The framework requires source stratification — it is not sufficient to have "some questions"; the questions must be traceable to specific, authoritative origins.

RAGAS, in typical usage, relies on a user-prepared dataset of question/context/answer triples. The tool itself provides no mechanism for connecting to business source material, nor does it enforce source stratification. The quality of the evaluation is entirely dependent on the quality of whatever dataset the user provides.

<a id="generation-governed-pipeline-vs-pre-supplied-dataset"></a>

### Generation: governed pipeline vs. pre-supplied dataset

The SanityOps Quality pipeline is a **mandatory hybrid workflow**: Authoritative Documents → Extract Atomic Knowledge Units → Auto-generate Candidate Questions and Test Variants → Business/Compliance Expert Confirmation → Version Freeze → Incorporate into Regression Set. The expert confirmation step is not optional — it is the mechanism that ensures the test corpus is both authoritative and auditable.

RAGAS does not include a built-in test case generation stage. The evaluation dataset is assumed to already exist. There is no mandated expert confirmation checkpoint, and no framework-level mechanism to verify that the questions being scored are the right questions.

<a id="credibility-and-assetization"></a>

### Credibility and assetization

The SanityOps Quality specification is explicit about the preconditions for credible evaluation: if questions are ambiguous, answers lack authoritative sources, or versions are unidentifiable, **automated scoring cannot produce reliable conclusions**. Baseline Test Cases are therefore treated as one of the four core asset classes, governed with versioning, status fields, and audit trails. A test case is not just a row in a dataset — it is a governed asset with a lifecycle.

RAGAS has no corresponding asset governance layer. Datasets are typically consumed as one-off scripts or files, without versioning, status tracking, or governance attributes. The scoring is automated; the trustworthiness of the inputs is not.

<a id="coverage-governance"></a>

### Coverage governance

SanityOps Quality requires a **Coverage Matrix** — organized by business topic × risk level × critical facts × multi-turn scenarios × timeliness × boundary conditions. When coverage is insufficient, the evaluation report must explicitly flag the gaps rather than allowing the aggregate score to imply full-scope adequacy.

RAGAS has no built-in coverage governance. The representativeness of the score depends entirely on the coverage of the user's self-built dataset, with no framework-level mechanism to detect or flag gaps.

| Dimension                 | SanityOps Quality                                                                                                                                   | RAGAS                                                                                                         |
| ------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| Test Case Sourcing        | Mandated authoritative sources with business boundary definition and source stratification.                                                         | User-supplied question/context/answer triples; no built-in business-source integration.                       |
| Generation Pipeline       | Mandatory hybrid workflow: extract → auto-generate → expert confirm → freeze → regression.                                                          | No built-in generation; assumes pre-existing dataset.                                                         |
| Credibility Prerequisites | Explicit: ambiguous questions, non-authoritative sources, or unidentifiable versions → unreliable scoring. Baseline Test Cases are governed assets. | No mandatory validation of input authority or ambiguity. Credibility entirely dependent on user data hygiene. |
| Assetization              | Baseline Test Cases are one of four core asset classes, with versioning, status fields, and lifecycle governance.                                   | No asset governance layer. Datasets are typically one-off artifacts.                                          |
| Coverage Governance       | Coverage Matrix required; gaps must be flagged in reports.                                                                                          | No built-in coverage governance.                                                                              |

---

<a id="x5-metric-system-design"></a>

## X.5 Metric System Design

The metric systems reflect each tool's relationship to business risk.

| Dimension               | SanityOps Quality                                                                                                                                                               | RAGAS                                                                                                                                                                               |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Design Principles       | Four principles: **business-risk-first, use-case-appropriate, critical-item independent gating, measurable and traceable.**                                                     | Fixed metrics — Faithfulness, Answer Relevancy, Context Precision/Recall — with weights that do not vary by business risk profile.                                                  |
| Critical-Item Handling  | Explicitly requires that "aggregate scores cannot offset failures on critical facts, core rules, or high-risk boundary scenarios." Critical test cases must pass independently. | No independent gating for critical items. Scores are typically presented as averages or aggregates, where high-frequency simple samples can dilute the impact of critical failures. |
| Tool-Agent Adjudication | Binary Nature success rate: **R = successes / valid executions**. Structured output is "either entirely correct or contains an error — there is no intermediate state."         | No binary adjudication method for structured/task-oriented outputs. The continuous scoring paradigm does not apply to this class of output.                                         |

The critical-item handling distinction is particularly consequential in regulated environments. A RAG Agent that correctly answers 95% of general knowledge questions but hallucinates on a single compliance-critical fact would receive a strong aggregate score under a pure averaging model — and would be unfit for production under a framework that gates on critical items independently.

---

<a id="x6-evaluation-workflow-and-governance-mechanisms"></a>

## X.6 Evaluation Workflow and Governance Mechanisms

<a id="standard-workflow"></a>

### Standard workflow

SanityOps Quality operates a **six-step closed loop**: Identify Authoritative Sources and Business Boundaries → Build Confirmed, Versioned Test Cases → Controlled Blind Testing → Evaluator Verification and Adjudication → Aggregate Metrics, Execute Gates, Form Evidence → Regression Validation and Continuous Improvement.

RAGAS provides a library of scoring functions. The typical usage pattern is: Prepare Dataset → Call Scoring Functions → Obtain Scores. There is no built-in gate adjudication, regression governance, or evidence-chain formation.

<a id="tool-agent-workflow"></a>

### Tool-Agent workflow

The Tool-Agent track follows a **seven-step process** with risk-tiered parameters: Risk Classification (L1/L2/L3) → Parameter Configuration → Mock Data Preparation (normal/boundary/abnormal scenarios generated from Logic Artifacts) → N Independent Test Executions in Shadow Sandbox → Reliability Calculation (with statistical confidence interval estimation) → Gate Decision (with Ratchet Mechanism) → Result Output.

RAGAS has no corresponding mechanism; it does not support risk-tiered differentiation of test rigor.

<a id="risk-tiered-differentiation"></a>

### Risk-tiered differentiation

SanityOps Quality varies test sample sizes and pass-rate thresholds by Business Impact Level (L1/L2/L3). RAGAS applies a uniform scoring logic to all evaluation samples, with no concept of risk-tiered strictness.

<a id="evidence-and-result-retention"></a>

### Evidence and result retention

Every SanityOps Quality evaluation must retain version, test case, source, and conclusion evidence. "Evidence and Report Assets" constitute one of the four core asset classes. RAGAS output is typically a single-run score; the tool does not, by default, mandate retention of version lineage, test case traceability, or other governance evidence.

<a id="result-utilization"></a>

### Result utilization

SanityOps Quality results serve three decision layers: **Release** (Gate Decision), **Optimization** (improvement direction), and **Governance** (continuous, auditable evidence). RAGAS results primarily serve model/pipeline comparison and iterative tuning; the tool was not designed with a hierarchical decision structure for release authorization.

<a id="regression-governance"></a>

### Regression governance

SanityOps Quality specifies an explicit regression validation, problem localization, and continuous improvement loop. Failed test cases follow a structured path: Identify Metric/Risk Level/Version Delta → Candidate Investigation Direction → Trigger Inspect if Necessary → Manual Confirmation → Regression Validation → Codify as Test Case/Rule/Governance Improvement.

RAGAS does not include built-in version baseline comparison or regression governance workflows. These must be constructed externally by the user.

| Dimension                   | SanityOps Quality                                                                                       | RAGAS                                                                         |
| --------------------------- | ------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| Standard Workflow           | Six-step closed loop with gate adjudication and evidence formation.                                     | Scoring function library; typical usage is "prepare → score → obtain result." |
| Tool-Agent Workflow         | Seven-step process with risk-tiered parameters, Shadow Sandbox execution, and confidence intervals. | No corresponding mechanism.                                                   |
| Risk-Tiered Differentiation | Test sample size and pass thresholds vary by Business Impact Level (L1/L2/L3).                          | No risk-tiering concept; uniform scoring logic for all samples.               |
| Evidence Retention          | Mandatory: version, test case, source, and conclusion evidence retained per evaluation.                 | Single-run output; no mandated governance evidence retention.                 |
| Result Utilization          | Three-layer: Release (Gate), Optimization, Governance.                                                  | Model/pipeline comparison and iteration.                                      |
| Regression Governance       | Structured failure handling path from metric identification through rule codification.                  | No built-in regression governance; requires external scaffolding.             |

---

<a id="x7-cross-module-integration"></a>

## X.7 Cross-Module Integration

SanityOps Quality is not an island. Its integration with the broader framework creates capabilities that a standalone evaluation tool cannot replicate.

| Dimension                           | SanityOps Quality                                                                                                                                                                                                                                                                                  | RAGAS                                                                                                       |
| ----------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| Inspect Integration                 | Failed test cases can trigger SanityOps Inspect to perform defect localization on Prompt, Skill, and Tool Schema artifacts.                                                                                                                                                                        | No corresponding mechanism. Scores do not trace back to defects in underlying Logic Artifacts.              |
| Risk Integration                    | Shares evaluation assets, version baselines, and evidence systems with Risk as part of the same governance framework.                                                                                                                                                                              | Independent tool; no endogenous integration with a security risk audit system.                              |
| Relevance Mapping                   | Defects can be linked to supplementary quality test recommendations, forming the closed loop: Discover Defect → Map Candidate Impact → Recommend Supplementary Test → Collect Evidence → Manual Confirmation → Regression Close.                                                                   | Not applicable. RAGAS is not part of a multi-subset governance framework.                                   |
| Governance Closed-Loop Completeness | Four capabilities form a complete loop: systematic quality quantification, problem localization support (failure traceability to Logic Artifact defects), versioned quality assurance (Ratchet Mechanism prevents regression), and continuous improvement (Evaluate → Locate → Fix → Re-evaluate). | Covers only the "Evaluate" step. Does not constitute a complete Evaluate → Locate → Fix → Re-evaluate loop. |

---

<a id="x8-boundary-clarification"></a>

## X.8 Boundary Clarification

This comparison does not diminish RAGAS's technical value within its designed scope. As an automated scoring tool for RAG generation quality, RAGAS offers meaningful quantitative methods for faithfulness, relevance, and related dimensions. It can serve as a **candidate technical component** within the SanityOps Quality evaluator layer — alongside Rule Verification, LLM-as-Judge, and Embedding Assistance.

But the two operate at different architectural layers:

- **RAGAS** is a **scoring-method-layer** tool. It answers: _What score does this output receive?_
- **SanityOps Quality** is a **governance-framework-layer** mechanism. It answers: _Can this Agent be released? Where is the problem? How do we sustain quality over time? Is the evidence complete?_

An organization that adopts only RAGAS-class tooling gains a quantitative score for generation quality. What it does not gain includes: evaluation of task-execution Agents, critical-item independent gating, risk-tiered testing, test case source governance, cross-module defect correlation, and the complete evidence chain required for release decisions and compliance audits.

---

<a id="x9-conclusion"></a>

## X.9 Conclusion

SanityOps Quality and RAGAS are not competing products. They occupy different governance layers: the former is a quality subset embedded within an enterprise Agent Full-Lifecycle Governance Framework; the latter is an optional technical component focused on generation-quality quantification.

When evaluating tools or benchmarking frameworks, practitioners should resist the temptation to equate the two. The question is not which tool scores better — it is whether the organization needs a **demonstration-grade scoring tool** or a **production-grade quality governance mechanism**. The dimensions laid out in this appendix provide the criteria for making that determination.
