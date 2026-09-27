# SanityOps Framework

# Quality Tool-Agent White Paper

---

**Version**: v1.0

**Release Date**: July 2026

**Maintained by**: SanityOps Quality Working Group

**License**: CC BY-SA 4.0

---

## Table of Contents

- [1. Executive Summary](#1-executive-summary)
- [2. Introduction](#2-introduction)
  - [2.1 Research Background](#21-research-background)
  - [2.2 Assessment Object Definition](#22-assessment-object-definition)
  - [2.3 Positioning in SanityOps Framework](#23-positioning-in-sanityops-framework)
- [3. Core Principles](#3-core-principles)
  - [3.1 Establishment of Reliability Metrics](#31-establishment-of-reliability-metrics)
  - [3.2 Analysis of Uncertainty Sources](#32-analysis-of-uncertainty-sources)
  - [3.3 Requirements for Continuous Assessment](#33-requirements-for-continuous-assessment)
- [4. Assessment Framework](#4-assessment-framework)
  - [4.1 Core Elements](#41-core-elements)
  - [4.2 Risk Classification Mechanism](#42-risk-classification-mechanism)
  - [4.3 Assessment Workflow](#43-assessment-workflow)
  - [4.4 Statistical Foundation](#44-statistical-foundation)
  - [4.5 Ratchet Mechanism](#45-ratchet-mechanism)
- [5. Implementation Guide](#5-implementation-guide)
  - [5.1 Mock Data Generation Strategy](#51-mock-data-generation-strategy)
  - [5.2 Output Determination Mechanism](#52-output-determination-mechanism)
  - [5.3 Collaboration with SanityOps Inspect](#53-collaboration-with-sanityops-inspect)
- [6. Quality Visualization and Continuous Monitoring](#6-quality-visualization-and-continuous-monitoring)
  - [6.1 Quality Dashboard](#61-quality-dashboard)
  - [6.2 Historical Data Analysis](#62-historical-data-analysis)
- [7. Case Studies](#7-case-studies)
  - [7.1 Case 1: Ticket Intelligent Dispatch Agent](#71-case-1-ticket-intelligent-dispatch-agent)
  - [7.2 Case 2: Payment Transfer Agent](#72-case-2-payment-transfer-agent)
- [8. Challenges and Limitations](#8-challenges-and-limitations)
  - [8.1 Current Limitations](#81-current-limitations)
  - [8.2 Methodological Boundaries](#82-methodological-boundaries)
- [9. Appendix](#9-appendix)
  - [Appendix A: Glossary](#appendix-a-glossary)
  - [Appendix B: Test Count Explanation](#appendix-b-test-count-explanation)

<a id="1-executive-summary"></a>
## 1. Executive Summary

Enterprises are rapidly deploying Tool Agents to automate critical business processes—from ticket dispatch to financial approval, from order processing to payment execution. However, a fundamental problem troubles every organization: **Is this Agent reliable enough to carry critical business?**

This white paper proposes a service quality assessment methodology for enterprise AI applications, with core contributions as follows:

**Methodology Positioning**: As a core component of the Quality subset in the SanityOps Framework, this methodology forms a complete quality assurance closed loop with Inspect (defect inspection) and Risk (risk scanning).

**Single Metric Principle**: Uses **reliability** as the core assessment metric, simplifying complex Agent behaviors into quantifiable, decision-capable quality values through statistical measurement of task success rates.

**Risk-Driven Assessment**: Configures differentiated test strictness and pass rate thresholds based on the Agent's potential business impact (L1/L2/L3 three-level risk classification), achieving balance between quality and efficiency.

**Traceability Governance Mechanism**: Combines reliability assessment with logic artifact defect governance, ensuring production environments always run optimal versions through the ratchet mechanism.

This methodology fills the international gap in enterprise Agent quality assessment and has been validated in multiple industry scenarios.

---

<a id="2-introduction"></a>
## 2. Introduction

<a id="21-research-background"></a>
### 2.1 Research Background

AI Agents are moving from experimental projects to enterprise core business processes. According to industry research, 81% of enterprises limit Agents to single-workflow scenarios with clear success criteria, meaning Tool Agents have become the main form of enterprise AI deployment.

However, significant gaps exist in the Agent quality assessment field:

```
Current Dilemma:
├─ Lack of unified metrics: Different teams adopt different assessment standards, results cannot be compared horizontally
├─ Misaligned assessment methods: Simply migrating retrieval assessment and dialogue assessment methods, ignoring Tool Agent characteristics
├─ Quality and governance disconnected: After assessment discovers problems, lacks systematic problem localization and remediation mechanisms
└─ Continuous quality assurance missing: Post-deployment quality degradation difficult to detect, lacks version comparison mechanisms
```

<a id="22-assessment-object-definition"></a>
### 2.2 Assessment Object Definition

**This methodology focuses on Tool Agents**, whose core characteristic is executing deterministic tasks with determinable outputs.

```
Typical characteristics of Tool Agents:
├─ Task-oriented: Users have clear task goals, Agent outputs directly affect task completion
├─ Output determinable: Task completion has objective determination standards (success/failure)
└─ Business integration: As nodes in business processes, integrated with other systems
```

**Agent types NOT in assessment scope:**

| Agent Type | Characteristics | Why Not in Scope |
|------------|-----------------|------------------|
| Content Generation | Divergent outputs, no standard answers | Output quality difficult to binary-determine, requires human aesthetic assessment |
| Creative Assistance | Output diversity is the goal | "Good" and "bad" have no objective standards |
| Open-domain Dialogue | No clear task goals | Lack determinable success criteria |

**Definition Basis:** The typical characteristic of enterprise AI applications is clear tasks, determinable results, and clear business impact. Content generation Agents have relatively low application ratios in enterprise core business processes, and their assessment methods require separate research.

**Boundary Case Explanation:** When the Agent's main function is tool invocation with content generation as auxiliary (such as generating confirmation text after querying), it still falls within the Tool Agent category and is assessed according to this methodology.

<a id="23-positioning-in-sanityops-framework"></a>
### 2.3 Positioning in SanityOps Framework

SanityOps is a complete Agent quality and security assurance framework, containing three organically connected subsets:

```
SanityOps Framework
│
├─ Inspect (Defect Inspection)
│   ├─ Inspect Tool ← Tool Schema defect inspection
│   ├─ Inspect Prompt ← System Prompt defect inspection
│   ├─ Inspect Skill ← Skill defect inspection
│   ├─ Inspect Cross ← Cross-Artifact defect inspection
│   └─ Inspect Permission ← Permission-responsibility proportionality inspection (QD-PM)
│
├─ Risk (Risk Scanning)
│   ├─ Risk Explicit ← Explicit Logic Artifact risk detection
│   └─ Risk Implicit ← Implicit Agent runtime vulnerability scanning
│
└─ Quality (Service Quality)
    ├─ Quality RAG-Agent ← RAG-Agent service quality assessment
    └─ Quality Tool-Agent ← Tool-Agent service quality assessment ← This white paper
│
└─ Relevance (Impact Mapping)
    └─ Relevance ← defect → risk/quality diagnostic mapping
```

**Quality's Responsibilities in the Framework:**

```
Connection between quality assessment and problem governance:
├─ Inspect: Identify logic artifact defects, prevent quality issues
├─ Risk: Scan runtime risks, avoid security hazards
└─ Quality: Assess service quality, quantify reliability level

Closed-loop mechanism:
├─ Quality assessment discovers issues → Support Inspect to localize defects → Fix and re-assess
└─ Inspect verification after check → Quality confirms standards met → Support release decisions
```

---

<a id="3-core-principles"></a>
## 3. Core Principles

<a id="31-establishment-of-reliability-metrics"></a>
### 3.1 Establishment of Reliability Metrics

<a id="311-binary-nature-of-tool-agent-outputs"></a>
#### 3.1.1 Binary Nature of Tool Agent Outputs

The essential characteristic of Tool Agents is **binary nature of task execution**—tasks either complete successfully or fail, with no intermediate states.

**Theoretical foundation of binary nature:**

In the field of reliability engineering, modeling system states as binary states (normal/failure) is standard practice. For systems executing deterministic tasks, the output states naturally conform to binary nature:

```
├─ Success: Agent output matches expectation, task completed
└─ Failure: Agent output does not match expectation, task not completed
```

This binary nature determines that the assessment metric should not be a continuous metric (such as accuracy score, relevance score), but rather a statistical metric—measuring system reliability through the ratio of success/failure across multiple executions.

**Industry practice validation:**

In enterprise Agent deployment practice, task success rate and task completion rate are widely adopted as core metrics. Research shows top teams (top 15%) achieve Agent reliability 2.2x the average, further validating reliability as the key metric distinguishing Agent quality.

<a id="312-definition-and-measurement-of-reliability"></a>
#### 3.1.2 Definition and Measurement of Reliability

**Definition:** Reliability is the probability of an Agent successfully completing tasks in multiple independent executions, measured by "success count / total execution count".

$$
\text{Reliability} = \frac{\text{Number of Successful Executions}}{\text{Total Executions}} \times 100\%
$$

**Measurement Basis:**

Mature methodologies in the software reliability engineering field indicate that reliability should be assessed through statistical measurement of failure rates. For Agent systems:

```
Reliability measurement method:
├─ Execute N independent tasks in a controlled environment
├─ Count success count S and failure count F
├─ Calculate reliability R = S/N × 100%
└─ Provide reliability interval estimation with confidence level
```

<a id="313-why-not-use-multi-metric-systems"></a>
#### 3.1.3 Why Not Use Multi-Metric Systems

Tool Agent outputs have inherent **binary nature**—tasks either complete successfully or fail, with no intermediate states.

```
Implications of binary nature:
├─ Output either meets downstream process requirements or doesn't
├─ Missing one field means downstream process cannot continue—it's a "have/don't have" question
├─ Not a continuously quantifiable problem like "60% completeness missing"
└─ One parameter error is an error, no such thing as "partially correct"
```

This binary nature determines:

```
├─ No basis for continuous scoring
│   └─ Cannot give "this output scores 80" evaluation—it's either correct or incorrect
│
├─ Multi-metric systems cannot adapt to binary nature
│   ├─ "Intent understanding accuracy 75%" cannot explain whether task completed
│   ├─ "Parameter filling completeness 80%" is meaningless in binary scenarios
│   └─ Metrics cannot reflect user's real question: was the task actually completed?
│
└─ Only success rate statistics can reflect true quality
    └─ In N executions, S successes → Reliability = S/N
```

**Conclusion:** Multi-metric systems are suitable for scenarios where outputs can be continuously scored (such as retrieval relevance, generation quality), while Tool Agent's binary output nature determines its assessment can only be statistical measurement of success rates.

<a id="314-positioning-of-process-metrics"></a>
#### 3.1.4 Positioning of Process Metrics

In the Agent assessment field, international peers commonly focus on a class of process metrics called "Trajectory Metrics", including:

```
Typical process metrics:
├─ Tool selection accuracy: Whether Agent selected the correct tool
├─ Invocation timing correctness: Whether tool invocation timing was appropriate
├─ Invocation sequence compliance: Whether multi-tool invocation sequence was correct
├─ Parameter generation accuracy: Whether generated parameters met constraints
├─ Robustness: Stability of performance under input perturbation
└─ Consistency: Result stability across multiple executions with same input
```

We deeply evaluated the feasibility of incorporating these process metrics into the primary assessment system. Research shows these metrics have clear value for **diagnosing Agent behavior and understanding failure causes**—they can answer "at which step did the Agent go wrong."

However, for Tool Agents, their output's **binary nature** determines the core focus of assessment is "whether the task ultimately completed", not "whether the intermediate process was perfect." One execution may involve multiple tool invocations, some of which may not be optimal choices, but as long as the final output is correct and task completed, from a business perspective it is a success. Conversely, even if each intermediate step "looks reasonable," if the final result is wrong, the task is still determined as failed.

Based on this understanding, we made the following design decisions:

```
Functional positioning of process metrics:
├─ Not included as primary assessment metric in reliability calculation
├─ Positioned as diagnostic metrics for problem localization and defect analysis
└─ In SanityOps framework, Inspect subset handles this function

Division of labor between assessment and diagnosis:
├─ Quality (this methodology): Answers "is it reliable" — judgmental function
└─ Inspect (defect inspection): Answers "why is it not reliable" — diagnostic function
```

This division ensures assessment system simplicity and decision effectiveness: **Reliability assessment focuses on result determination, providing decision-capable quality values; process analysis serves problem governance, supporting precise defect localization and remediation.**

<a id="315-comparison-with-rag-agent-assessment"></a>
#### 3.1.5 Comparison with RAG Agent Assessment

This methodology focuses on Tool Agents, whose core characteristic is output with **binary nature**—structured fields are either completely correct or have errors, with no intermediate states. This characteristic determines the applicability of a single reliability metric.

In contrast, RAG Agent assessment in the SanityOps framework adopts a completely different metric system. RAG Agent's core output is **natural language paragraphs**, whose quality assessment inherently has multi-dimensional, continuous characteristics:

```
RAG Agent Assessment System (SanityOps Quality RAG-Agent):
├─ Retrieval Quality Dimension
│   ├─ Context Precision
│   ├─ Context Recall
│   └─ Context Relevance
├─ Generation Quality Dimension
│   ├─ Faithfulness
│   ├─ Answer Relevance
│   └─ Answer Completeness
└─ Language Quality Dimension
    ├─ Fluency
    ├─ Coherence
    └─ Other language quality metrics
```

This system includes 3 dimensions and 12 metrics, each being a continuous score (0-100), to comprehensively reflect the multi-faceted nature of natural language output.

The difference between the two assessment systems stems from the **fundamentally different output content of the assessment objects**:

| Dimension | Tool Agent | RAG Agent |
|-----------|------------|-----------|
| Output nature | Structured data, deterministic boundaries | Natural language paragraphs, continuous distribution |
| Quality characteristic | Binary (success/failure) | Multi-dimensional continuous (relevance, faithfulness, fluency, etc.) |
| Assessment logic | Discrete determination of statistical success rate | Weighted synthesis of multi-dimensional continuous scores |
| Metric system | Single reliability metric | Multi-dimensional continuous metric system |

This comparison illustrates: **Assessment methodology design should serve the essential characteristics of the assessment object, not simply apply uniform paradigms.** For result-oriented, output-binary-determinable Tool Agents, a single reliability metric can effectively support release decisions; for content-oriented, output-quality-continuously-distributed RAG Agents, multi-dimensional continuous metric systems are needed to fully reflect service quality.

<a id="32-analysis-of-uncertainty-sources"></a>
### 3.2 Analysis of Uncertainty Sources

<a id="321-deterministic-layering-of-agent-behaviors"></a>
#### 3.2.1 Deterministic Layering of Agent Behaviors

The key to understanding Agent quality lies in identifying sources of uncertainty:

```
Agent behavior composition:
├─ Hard-coded programs (traditional code)
│   ├─ Characteristic: Deterministic execution
│   ├─ Quality assurance: Traditional software testing
│   └─ Uncertainty: Negligible (verified before deployment)
│
└─ LLM decision-making
    ├─ Characteristic: Probabilistic output
    ├─ Quality assurance: Requires continuous assessment
    └─ Uncertainty: Fundamental source of Agent quality fluctuations
```

**Core insight:**

If hard-coded program quality is assured through traditional testing, then Agent reliability fluctuations can only come from LLM uncertainty. This means: **Agent quality assessment is essentially assessment of LLM decision-making quality in specific task scenarios.**

<a id="322-root-cause-analysis-of-llm-uncertainty"></a>
#### 3.2.2 Root Cause Analysis of LLM Uncertainty

Research shows LLM performance is affected by prompt quality, example order, context, and other factors. In Agent scenarios:

```
LLM decision failure root cause chain:

LLM decision error
    │
    ▼
Input factors affecting LLM decisions
├─ System Prompt quality → Affects LLM's task understanding
├─ Tool Schema quality → Affects LLM's tool selection and parameter generation
├─ Skill definition quality → Affects LLM's skill invocation logic
└─ Context organization quality → Affects LLM's reasoning quality
    │
    ▼
Logic artifact defects
├─ Unclear Prompt descriptions
├─ Poor Tool Schema description quality
├─ Incomplete parameter constraints
└─ Ambiguous tool definitions
```

**Root cause example:**

```
Scenario: Agent should invoke "transfer tool" but incorrectly invokes "query balance tool"

Surface phenomenon: Tool selection error
Root cause tracing:
├─ Is "transfer tool" Schema description clearly distinguishing use cases?
├─ Could "query balance tool" description mislead the LLM?
├─ Do both tools' parameter signatures have ambiguity?
└─ Does System Prompt clearly specify tool selection logic for different scenarios?

Conclusion: Root cause of tool selection error often lies in Tool Schema description quality defects
```

<a id="323-assessment-governance-closed-loop"></a>
#### 3.2.3 Assessment-Governance Closed Loop

The above analysis reveals the intrinsic connection between Agent quality assessment and logic artifact governance:

```
Governance closed loop:
├─ Pre-governance: Use SanityOps Inspect to check logic artifact defects → Fix before assessment
├─ Assessment validation: Use SanityOps Quality to assess reliability → Discover low reliability issues
└─ Post-hoc tracing: Submit assessment failure logs to SanityOps Inspect → Localize defects → Fix → Re-assess
```

This constitutes the core advantage of this methodology: **Assessment not only answers "is it reliable", but also supports systematic governance of "how to improve reliability".**

**Important limitation notes:**

The above causal chain reveals major reliability influencing factors, but two limitations must be clarified:

```
Limitation 1: Non-complete coverage of Inspect inspection
├─ SanityOps Inspect can systematically identify logic artifact defects
├─ But cannot guarantee 100% coverage of all possible defect types
└─ Therefore, defects may still exist after Inspect fixes affecting reliability

Limitation 2: Third-party interference factors in production environments
├─ Network security measures (firewalls, API gateways) may intercept requests
├─ External service dependency instability
└─ Runtime resource constraints (timeout, memory overflow, etc.)
    └─ These factors exceed logic artifact scope, need handling at operations level
```

<a id="33-requirements-for-continuous-assessment"></a>
### 3.3 Requirements for Continuous Assessment

Tool Agent assessment differs fundamentally from traditional software testing: **Assessment frequency must synchronize with logic artifact iteration frequency.**

```
Traditional software testing:
├─ Hard-coded program iteration frequency is low (monthly, quarterly)
├─ Testing before release is sufficient
└─ No need for continuous assessment

Agent service quality assessment:
├─ Logic artifact iteration frequency is high (weekly, or even daily)
│   ├─ System Prompt adjustments
│   ├─ Tool Schema optimization
│   ├─ Skill definition updates
│   └─ Parameter constraint modifications
│
├─ Logic artifact quality directly affects LLM decisions
│   ├─ Whether Tool selection is correct
│   ├─ Whether parameter generation is accurate
│   └─ Whether output assembly is complete
│
└─ Therefore: Assessment must be continuous, synchronized with iteration frequency
```

**Core value of continuous assessment:**

```
├─ Timely discovery of quality degradation: Logic artifact modifications may introduce problems
├─ Support for rapid iteration: Quick quality verification after each iteration
├─ Ratchet mechanism assurance: Prevents low-quality versions from entering production
└─ DevOps integration: Assessment becomes standard step in release workflow
```

---

<a id="4-assessment-framework"></a>
## 4. Assessment Framework

<a id="41-core-elements"></a>
### 4.1 Core Elements

<a id="411-shadow-environment"></a>
#### 4.1.1 Shadow Environment

Shadow environment is an isolated assessment environment equivalent to production, for observing Agent behavior under controlled conditions.

```
Shadow environment composition:
├─ Logic artifact replicas
│   ├─ Agent code (processing logic)
│   ├─ System Prompt
│   ├─ Tool Schema definitions
│   └─ Skill definitions
│
├─ LLM API (consistent with production configuration)
│   ├─ Same model version
│   ├─ Same parameters (temperature, top_p, etc.)
│   └─ Isolated API quota
│
├─ Mock data and services
│   ├─ Preset input data
│   ├─ Preset expected outputs
│   └─ Mock external dependencies (databases, APIs, etc.)
│
└─ Execution container
    ├─ Independent runtime environment
    ├─ Complete log recording
    └─ Fully isolated from production systems
```

**Shadow environment value:**

```
├─ Repeatability: Same input can execute multiple times, supporting statistical analysis
├─ Safety: Assessment does not affect production systems, no business risk
├─ Observability: Complete execution trajectory recording, supports problem diagnosis
└─ Consistency: Equivalent to production environment, assessment results trustworthy
```

<a id="412-mock-data"></a>
#### 4.1.2 Mock Data

Mock data is preset input-output pairs that drive Agent execution and provide correctness determination baselines.

**Mock Data Agent Working Principle:**

```
Mock Data Agent data generation mechanism:
├─ Input: User provides logic artifacts
│   ├─ System Prompt
│   ├─ Skill definitions
│   └─ Tool Schema
│
├─ Processing: Based on logic artifact content and logical structure
│   ├─ Parse Schema constraints
│   ├─ Identify branch conditions in Skills
│   └─ Understand task semantics in Prompts
│
└─ Output: Generate simulated data conforming to structural constraints
    ├─ Cover normal, boundary, and abnormal scenarios
    └─ Branch-aware: Generate corresponding data for conditional branches in Skills
```

**Mock data validity:**

Mock data authenticity does not affect assessment validity, because:

```
LLM data processing logic:
├─ LLM doesn't know data "authenticity", only cares if data conforms to Schema
├─ Values returned by Mock Data Agent (Tony or Mike, student ID 99 or 100)
│   └─ As long as conforming to Schema definition, LLM reasoning logic is unaffected
│
├─ LLM decisions based on:
│   ├─ Input semantic understanding
│   ├─ Schema constraints
│   └─ Task context
│   └─ Not data "authenticity"
│
└─ Therefore: Mock data "fabricated" nature does not affect LLM decision capability assessment
```

**Example explanation:**

```
Scenario: Student ID query Agent

├─ User input: "Query Tony's student ID"
│
├─ LLM parses intent, selects "query student ID" tool
│
├─ Mock Data Agent returns name (could be Tony, or Mike)
│   └─ This doesn't affect LLM's next-step reasoning
│
├─ LLM assembles query instruction, invokes Mock Data Agent again
│
├─ Mock Data Agent returns student ID (could be 99, or 100)
│   └─ This also doesn't affect LLM's output assembly
│
├─ LLM assembles output: "Tony's student ID is 99"
│
└─ Assessment determination: Did LLM correctly execute the entire process?
    ├─ Correctly selected tool? ✓
    ├─ Correctly assembled output? ✓
    └─ Task process executed correctly → Determined as success
```

**Conclusion:** In shadow environments, assessment focuses on **whether LLM correctly executed the task process**, not **whether data is authentic and correct**. Mock data, as long as it conforms to Schema, can effectively drive LLM to complete the reasoning process, thereby achieving effective assessment of Agent reliability.

<a id="413-binary-determination"></a>
#### 4.1.3 Binary Determination

Each execution output is determined as "success" or "failure", with no intermediate states.

```
Determination logic:
├─ Structured output: Exact match determination
│   └─ All fields consistent with expected → Success; otherwise → Failure
│
├─ Natural language output: Semantic match determination (LLM-as-judge)
│   └─ Contains key information and semantically consistent → Success; otherwise → Failure
│
├─ Mixed output: Layered determination
│   └─ Both structured and semantic parts correct → Success
│
└─ Special cases:
    ├─ Agent active refusal (input genuinely invalid) → Success
    └─ Agent crash/timeout → Failure
```

<a id="414-execution-boundary-definition"></a>
#### 4.1.4 Execution Boundary Definition

**Core principle: Assessment uses final task result as determination unit.**

```
Definition of execution boundary:
├─ Regardless of how many steps or tool invocations inside the Agent
├─ Regardless of how many rounds of clarification dialogue in between
├─ Assessment only focuses on whether the user's requested task was ultimately completed
│
├─ Role of intermediate process:
│   ├─ During assessment: Ignored, not participating in success/failure determination
│   └─ During diagnosis: Used for troubleshooting, localization, analysis, remediation
│
└─ Mock Data Agent participation:
    ├─ Participates in data simulation for each intermediate step
    ├─ Ensures the entire process can execute to final output
    └─ Ultimately produces a determinable result
```

**Example:**

```
Scenario: Complex workflow Agent (query inventory → compare prices → generate order → send confirmation)

├─ Internal steps: 4 tool invocations
├─ Assessment determination: Only look at final result
│   ├─ User receives correct order confirmation → Success
│   └─ User doesn't receive confirmation, or confirmation incorrect → Failure
│
└─ When failure occurs, diagnosis:
    ├─ Retrieve execution logs
    ├─ Localize which step had error
    └─ Analyze root cause (Schema defect, Prompt issue, etc.)
```

<a id="42-risk-classification-mechanism"></a>
### 4.2 Risk Classification Mechanism

<a id="421-classification-basis"></a>
#### 4.2.1 Classification Basis

Risk classification essentially assesses "business impact of Agent failure":

```
Impact dimensions:
├─ Recoverability: Whether failure can be rolled back/compensated
├─ Impact scope: Single user or entire system
├─ Data sensitivity: Whether involving sensitive data/funds
└─ Operation reversibility: Whether operation can be undone
```

<a id="422-three-level-risk-classification"></a>
#### 4.2.2 Three-Level Risk Classification

| Level | Definition | Typical Scenarios | Failure Impact |
|-------|------------|-------------------|----------------|
| **L1 (Low Risk)** | Read-only query type, no state changes | Information queries, data retrieval | User can retry, no persistent impact |
| **L2 (Medium Risk)** | State change type, recoverable | Order creation, notification sending, data updates | Can rollback or compensate, controllable impact |
| **L3 (High Risk)** | Irreversible/sensitive operations | Payment transfers, permission changes, data deletion | Irreversible, severe impact |

<a id="423-classification-corresponding-assessment-strictness"></a>
#### 4.2.3 Classification Corresponding Assessment Strictness

```
L1 → Relaxed assessment
├─ Fewer test counts (30)
├─ Allows certain failures (90% pass rate)
└─ Low failure cost, rapid iteration possible

L2 → Moderate assessment
├─ Moderate test counts (50)
├─ Higher pass rate requirement (95%)
└─ Balance between efficiency and safety needed

L3 → Strict assessment
├─ More test counts (100)
├─ Zero tolerance for failures (100% pass rate)
└─ High failure cost, safety must be ensured
```

<a id="43-assessment-workflow"></a>
### 4.3 Assessment Workflow

```
Assessment workflow:

Step 1: Risk classification
├─ Determine L1/L2/L3 based on Agent characteristics
└─ If SanityOps Inspect completed, can reference inspection results for auxiliary determination

Step 2: Parameter configuration
├─ Determine test counts and pass rate thresholds based on risk level
└─ Users can adjust based on actual conditions (customization supported)

Step 3: Mock data preparation
├─ Mock Data Agent generates test data based on logic artifacts
└─ Cover normal, boundary, and abnormal scenarios

Step 4: Execution and determination
├─ Execute N independent tests in shadow environment
├─ Binary determination after each execution (focus on final result)
└─ Record execution trajectory and determination results

Step 5: Reliability calculation
├─ R = success count / valid count × 100%
└─ Combine statistical confidence to provide interval estimation

Step 6: Gate determination
├─ R ≥ threshold → Pass
├─ R < threshold → Fail
└─ Support ratchet mechanism check

Step 7: Result output
├─ Assessment report (reliability value, Gate determination)
├─ Failure case details (supports problem localization)
└─ Optional: Trigger SanityOps Inspect for defect localization
```

<a id="44-statistical-foundation"></a>
### 4.4 Statistical Foundation

Quantitative method for reliability assessment:

$$
\text{Reliability} = \frac{\text{Successful Count}}{\text{Total Execution Count}} \times 100\%
$$

**Recommended configuration:**

| Risk Level | Recommended Test Count | Recommended Pass Rate Threshold |
|------------|------------------------|--------------------------------|
| L1 (Low Risk) | 30 | 90% |
| L2 (Medium Risk) | 50 | 95% |
| L3 (High Risk) | 100 | 100% |

**Configuration basis:** Test counts must meet statistical significance requirements. At 95% confidence, 30 tests all passing can verify true reliability ≥90%; 100 tests all passing can verify true reliability ≥97%.

<a id="45-ratchet-mechanism"></a>
### 4.5 Ratchet Mechanism

<a id="451-design-purpose"></a>
#### 4.5.1 Design Purpose

When Schema remains unchanged, each assessment's reliability metric is recorded as historical data. The ratchet mechanism ensures production environments always run optimal versions, preventing quality degradation.

<a id="452-mechanism-principle"></a>
#### 4.5.2 Mechanism Principle

```
Ratchet mechanism:
├─ Historical record: Each assessment's reliability metric stored in historical database
├─ Historical optimal: Maintain optimal reliability value for this Agent (same Schema)
├─ Warning trigger: When current reliability < historical optimal, issue warning
└─ Release recommendation: Recommend releasing to production only when reliability ≥ historical optimal
```

<a id="453-application-scenarios"></a>
#### 4.5.3 Application Scenarios

```
Scenario 1: Version iteration
├─ Agent v1.0: 95% reliability → Release to production
├─ Agent v1.1: 92% reliability (below historical optimal 95%) → Warning
└─ Decision: Don't release v1.1, or fix and re-assess

Scenario 2: Prompt optimization
├─ Original Prompt: 90% reliability
├─ Optimized Prompt: 96% reliability → Above historical optimal → Record as new optimal
└─ Decision: Release optimized version

Scenario 3: Regression detection
├─ Production Agent: 95% reliability
├─ Assessment after new code commit: 94% reliability → Warning
└─ Decision: Block release, check code change impact
```

<a id="454-prerequisites"></a>
#### 4.5.4 Prerequisites

The effectiveness of the ratchet mechanism relies on the following prerequisites:

```
Prerequisite 1: Schema stability
├─ Schema changes (new fields, modified constraints) → Start new historical record
├─ Old Schema historical data retained for rollback reference
└─ New Schema establishes history from first assessment

Prerequisite 2: Mock data test set consistency
├─ Each assessment uses the same test case set
├─ Test set changes cause reliability values to become incomparable
└─ If test set needs updating, should reset historical baseline simultaneously

Prerequisite 3: LLM model version stability
├─ Underlying LLM model version must remain consistent
├─ Model provider silent updates may cause quality changes
├─ Recommend recording model version number for each assessment
└─ If model version change detected, should re-establish baseline
```

---

<a id="5-implementation-guide"></a>
## 5. Implementation Guide

<a id="51-mock-data-generation-strategy"></a>
### 5.1 Mock Data Generation Strategy

<a id="511-structured-input-type"></a>
#### 5.1.1 Structured Input Type

```
Generation principles:
├─ Boundary value testing: Numeric boundaries, string boundaries, enum boundaries
├─ Normal value testing: Typical values, sampling near mean
├─ Abnormal value testing: Type errors, missing fields, format errors
└─ Combination testing: Multi-field combinations, field dependency relationships
```

**Handling unclear Schema constraints:**

```
Strategy:
├─ Step 1: Prioritize explicit constraints (type, format, enum, etc.)
├─ Step 2: Infer implicit constraints (field names, business semantics)
├─ Step 3: Generate multiple test versions (conservative, relaxed, typical)
└─ Step 4: Record constraint assumptions for subsequent problem localization
```

<a id="512-natural-language-input-type"></a>
#### 5.1.2 Natural Language Input Type

```
Generation principles:
├─ Core semantic consistency: Must conform to expected intent
├─ Expression variations: Formal, colloquial, abbreviated, complex sentence structures
├─ Boundary cases: Ambiguous expressions, implicit information, mixed intents
└─ Abnormal inputs: Invalid intents, incomplete information, malicious inputs
```

<a id="52-output-determination-mechanism"></a>
### 5.2 Output Determination Mechanism

<a id="521-determination-principle"></a>
#### 5.2.1 Determination Principle

In shadow environments, output determination core is **process correctness**, not data authenticity.

```
Determination logic:
├─ Shadow environment data produced by Mock Data Agent (possibly "fabricated")
├─ Assessment focuses on: Did LLM correctly execute the task process
│   ├─ Correctly understood input intent
│   ├─ Correctly selected tool
│   ├─ Correctly generated parameters
│   └─ Correctly assembled output
└─ As long as process executed correctly, determined as success
```

<a id="522-structured-output-determination"></a>
#### 5.2.2 Structured Output Determination

For structured outputs, check:

```
Determination elements:
├─ Field completeness: Whether output contains all required fields defined in Schema
├─ Type correctness: Whether each field's type conforms to Schema definition
├─ Format compliance: Whether field values conform to format constraints (enums, regex)
└─ Structure correctness: Whether nested structures are correct

Example:
├─ Schema requirement: {"name": "string", "age": "integer", "status": "enum(active|inactive)"}
├─ Actual output: {"name": "Tony", "age": 99, "status": "active"}
└─ Determination: Fields complete, types correct, format compliant → Success
```

<a id="523-natural-language-output-determination"></a>
#### 5.2.3 Natural Language Output Determination

For natural language outputs, check:

```
Determination elements:
├─ Required information inclusion: Whether output contains key information required by task
├─ Format compliance: Whether output conforms to expected format requirements
└─ No obvious errors: Output doesn't contain logical contradictions or obvious errors

Example:
├─ Task: Query student ID
├─ Expected output format: "{Name}'s student ID is {ID}"
├─ Actual output: "Tony's student ID is 99"
└─ Determination: Contains required information, format correct → Success
```

**LLM-as-judge reliability:**

For natural language output determination, this methodology uses LLM-assisted determination. Note:

```
├─ In Tool Agent scenarios, LLM-as-judge performs structured comparison tasks
│   └─ Determine field consistency, format correctness, information completeness
│   └─ Fundamentally different from subjective judgments like "evaluating article quality"
│
├─ Such tasks have extremely low error probability
│   └─ Because determination standards are clear, boundaries distinct
│
├─ But still non-zero error possibility
│   └─ Extreme boundary cases may have determination bias
│
└─ Recommendation: Manual sampling for edge cases as fallback mechanism
```

<a id="524-mixed-output-determination"></a>
#### 5.2.4 Mixed Output Determination

For outputs containing both structured and natural language components:

```
Determination strategy:
├─ Structured part: Check field completeness, type correctness
├─ Natural language part: Check required information inclusion, format compliance
└─ Comprehensive determination: Both parts correct for success
```

<a id="525-failure-case-determination"></a>
#### 5.2.5 Failure Case Determination

```
Failure cases:
├─ Output missing: Agent failed to produce output
├─ Field missing: Missing required fields, causing downstream process unable to continue
├─ Type error: Field type doesn't conform to Schema definition
├─ Tool selection error: LLM selected wrong tool
├─ Parameter generation error: Parameters don't meet constraints or have semantic errors
├─ Output assembly error: Natural language output format chaotic or information missing
└─ Execution interruption: Process failed midway, no final output produced
```

<a id="526-multi-turn-dialogue-handling"></a>
#### 5.2.6 Multi-turn Dialogue Handling

When tasks require multiple rounds of interaction to complete:

```
Scenario example (reimbursement Agent):

Round 1
User: "Help me with reimbursement"
Agent: "Please provide reimbursement amount and expense type"

Round 2
User: "1580 yuan, transportation fee"
Agent: "Reimbursement application submitted, number RB088"
```

**Handling approach:**

```
├─ Determination unit: Entire task process (from start to final completion)
├─ As long as there's a correct final output, determined as success
│
├─ Mock Data Agent responsibilities:
│   ├─ Simulate user responses in each round (structured values)
│   │   └─ E.g., when Agent asks for amount, return "1580"
│   ├─ Don't simulate natural language form responses (avoid preset text fragility)
│   └─ Natural language assembly done by LLM
│
└─ Test process:
    ├─ Agent initiates follow-up → Mock Data Agent returns structured response value
    ├─ LLM receives response, continues processing
    └─ Until final output produced, perform determination
```

<a id="53-collaboration-with-sanityops-inspect"></a>
### 5.3 Collaboration with SanityOps Inspect

<a id="531-pre-check-workflow"></a>
#### 5.3.1 Pre-check Workflow

```
Recommended workflow:
├─ Step 1: Use SanityOps Inspect to check logic artifact defects
├─ Step 2: Fix defects based on inspection report
├─ Step 3: Use SanityOps Quality to assess reliability
└─ Step 4: If reliability doesn't meet standards, return to Step 1
```

**Value:** Significantly improves first assessment pass rate, reduces iteration costs.

<a id="532-post-hoc-traceability-workflow"></a>
#### 5.3.2 Post-hoc Traceability Workflow

```
When assessment reliability doesn't meet standards:
├─ Step 1: Export shadow environment recorded failure transaction logs
├─ Step 2: Submit to SanityOps Inspect for defect localization
├─ Step 3: Inspect analyzes logs, localizes logic artifact defects causing failures
├─ Step 4: Fix defects based on localization results
└─ Step 5: Re-conduct Quality assessment
```

**Value:** High-efficiency problem localization, avoiding manual case-by-case analysis.

---

<a id="6-quality-visualization-and-continuous-monitoring"></a>
## 6. Quality Visualization and Continuous Monitoring

<a id="61-quality-dashboard"></a>
### 6.1 Quality Dashboard

SanityOps Quality tool provides visualized dashboard, supporting:

```
├─ Current reliability metric: Real-time display of latest assessment results
├─ Historical trend charts: Show reliability changes over time
├─ Version comparison: Reliability differences between versions
├─ Ratchet status: Current reliability position relative to historical optimal
└─ Failure type distribution: Statistical distribution of failure case types
```

<a id="62-historical-data-analysis"></a>
### 6.2 Historical Data Analysis

```
Analysis dimensions:
├─ Trend analysis: Is reliability improving or declining?
├─ Regression detection: Did recent changes introduce quality problems?
├─ Stability assessment: Fluctuation degree of reliability metrics
└─ Optimal version identification: Which version has highest reliability?
```

---

<a id="7-case-studies"></a>
## 7. Case Studies

<a id="71-case-1-ticket-intelligent-dispatch-agent"></a>
### 7.1 Case 1: Ticket Intelligent Dispatch Agent

```
Agent characteristics:
├─ Type: Program interaction type (structured input/output)
├─ Risk level: L2
├─ Function: Automatically dispatch tickets to corresponding departments based on content

Assessment configuration:
├─ Test count: 50
├─ Pass rate threshold: 95%

Assessment results:
├─ Success count: 47
├─ Failure count: 3
├─ Reliability: 94%
└─ Gate determination: Fail (94% < 95%)

Follow-up actions:
├─ Submit failure case logs to SanityOps Inspect
├─ Inspect localizes ambiguity in Tool Schema description
├─ Re-assess after fixing Schema description
└─ New reliability: 97% → Pass
```

<a id="72-case-2-payment-transfer-agent"></a>
### 7.2 Case 2: Payment Transfer Agent

```
Agent characteristics:
├─ Type: Human-computer interaction type (natural language input)
├─ Risk level: L3
├─ Function: Parse user transfer requests and execute transfer operations

Assessment configuration:
├─ Test count: 100
├─ Pass rate threshold: 100%

Assessment results:
├─ Success count: 100
├─ Failure count: 0
├─ Reliability: 100%
└─ Gate determination: Pass

Ratchet mechanism application:
├─ Historical optimal (previous version): 98%
├─ Current reliability: 100%
└─ Conclusion: Above historical optimal, update historical record, approve release
```

---

<a id="8-challenges-and-limitations"></a>
## 8. Challenges and Limitations

<a id="81-current-limitations"></a>
### 8.1 Current Limitations

**Limitation 1: Mock Data Coverage Limitations**

- Cannot exhaust all possible input combinations
- Response: Generate based on historical data, regularly update Mock data

**Limitation 2: Natural Language Determination Non-determinism**

- LLM-as-judge itself has extremely low probability of determination bias
- Response: Manual sampling for edge cases, clear determination standards

**Limitation 3: Shadow Environment vs Production Environment Differences**

- Mock external dependency behaviors may differ from real systems
- Response: Regular comparison validation, critical dependencies use real services (read-only mode)

<a id="82-methodological-boundaries"></a>
### 8.2 Methodological Boundaries

**This methodology does NOT promise:**

```
├─ 100% defect coverage: Inspect tools cannot guarantee discovering all logic artifact defects
├─ Zero production failures: Third-party factors (network security, external services) may cause runtime failures
└─ Complete elimination of LLM uncertainty: Model probabilistic output characteristics determine reliability upper limit
```

**This methodology DOES promise:**

```
├─ Systematic quality quantification: Provide objective, comparable reliability metrics
├─ Problem localization support: Failure cases traceable to logic artifact defects
├─ Version quality assurance: Ratchet mechanism prevents quality degradation
└─ Continuous improvement closed loop: Assessment → Localization → Fix → Re-assessment
```

---

<a id="9-appendix"></a>
## 9. Appendix

### Appendix A: Glossary

| Term | Definition |
|------|------------|
| Reliability | Probability of Agent successfully completing tasks in multiple executions |
| Shadow Environment | Isolated assessment environment equivalent to production |
| Mock Data | Simulated data generated based on logic artifacts, for driving assessment and determination |
| Mock Data Agent | Component that parses logic artifacts and generates simulated data conforming to structural constraints |
| Binary Determination | Each execution determined as success or failure, no intermediate states |
| Execution Boundary | Assessment uses final task result as determination unit, intermediate processes used for diagnosis |
| Risk Classification | Levels divided by Agent failure business impact (L1/L2/L3) |
| Gate Determination | Determine pass/fail based on whether reliability meets threshold |
| Ratchet Mechanism | Establish reliability historical records, warn when assessment results below historical optimal |
| LLM-as-judge | Method using LLM to assess another LLM's output quality |
| Logic Artifacts | Configuration files affecting LLM decision quality, including Prompts, Schemas, Skills, etc. |

### Appendix B: Test Count Explanation

Reliability assessment quantification method:

$$
\text{Reliability} = \frac{\text{Success Count}}{\text{Total Executions}} \times 100\%
$$

**Recommended configuration:**

| Risk Level | Recommended Test Count | Recommended Pass Rate Threshold |
|------------|------------------------|--------------------------------|
| L1 (Low Risk) | 30 | 90% |
| L2 (Medium Risk) | 50 | 95% |
| L3 (High Risk) | 100 | 100% |

**Configuration basis:** Test counts must meet statistical significance requirements. At 95% confidence, 30 tests all passing can verify true reliability ≥90%; 100 tests all passing can verify true reliability ≥97%.

---

© 2026 Sanity AI Labs. Licensed under Creative Commons Attribution-ShareAlike 4.0 International.
https://www.sanityops.org  ·  hello@sanityops.org
v1.0  ·  July 2026
