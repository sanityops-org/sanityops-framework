# SanityOps: What It Does, Who It Compares To, and What It Compares

## 1. Why This Document Exists

An enterprise may have already procured AI development platforms to build Agents, deployed security products to intercept attack traffic, and introduced testing tools to run test cases. However, when Agent counts grow from dozens to thousands, and when underlying models undergo quantization/distillation/fine-tuning with shifting capabilities, enterprises discover: **No existing system covers the complete closed loop of "Logic Artifact defects → security risk validation → service quality assessment → root-cause traceability."**

- Security products can intercept attacks that have already occurred, but cannot discover static defects in System Prompts, Skills, and Tool Schemas before production deployment;
- Testing tools can produce pass rates, but cannot answer "which Logic Artifact is the root cause of failed test cases, and which test cases need regression after remediation";
- Model benchmarks can provide general scores, but cannot reflect capability degradation of enterprise-deployed derivative models on real business tasks.

SanityOps was designed precisely to fill this gap — it is a quality, security, and governance framework for enterprise-grade AI Agents. It does not handle building, orchestrating, or running Agents, but rather provides systematic inspection, audit, and quality measurement capabilities for Logic Artifacts that have already been built and their runtime results. It does not promise that Agent governance will always be correct or absolutely secure, but systematically reduces the uncertainty of Agent behavior and its associated business and security risks.

---

## 2. What SanityOps Can Do

SanityOps operates around four core activities, each answering a key question:

| Domain | Core Question | What You Can Do | What You Get |
| --- | --- | --- | --- |
| **Inspect** | Do Logic Artifact definitions or cross-artifact relationships contain static defects? | Static analysis of System Prompts, Skills, Tool Schemas, and cross-artifact consistency | Defect ID (QD), static evidence, severity level, remediation recommendations |
| **Risk** | Do Logic Artifacts contain explicit risks, or can security risk behaviors be triggered in controlled environments? | Static audit of explicit risks (Explicit), dynamic validation of implicit risks in shadow environments (Implicit) | Risk classification (EX), damage level (D1/D2/D3), signal level (S/A/B/C/D), validation evidence |
| **Quality** | Does the Agent's actual task or user-visible service meet defined quality requirements? | Controlled blind testing of RAG-Agents and Tool-Agents, with test rigor configured by business risk tier | Reliability metrics, test case results, quality Gate decisions, regression conclusions |
| **Relevance** | Which attack surfaces, validation strategies, failure modes, and regression requirements may static defects be associated with? | Map defects discovered by Inspect to candidate attack surfaces, failure modes, and test recommendations | Attack Surface (AS), Failure Mode (FM), defect chains, mapping recommendations, candidate root causes |

### Governance Closed-Loop Overview

The four activities are not isolated checkpoints, but a traceable closed-loop chain:

```
Logic Artifacts and their versions
    ↓
Inspect: Discover static defects (QD)
    ↓
Relevance: Map candidate attack surfaces, failure modes, test and remediation directions
    ↓
Risk: Confirm explicit risks or dynamic behavior evidence in controlled environments
    ↓
Quality: Assess actual tasks, outputs, and service quality
    ↓
Human Review: Determine root cause, control effectiveness, remediation scope, and residual risk
    ↓
Remediation, re-inspection, regression, release, or exception decision
```

Relevance serves as the connector: from defects (QD), candidate attack surfaces (AS) can be derived, Risk audit directions recommended, quality failure modes (FM) derived, defect chains identified, and post-remediation validation and regression scope recommended. However, correlation does not equal causation — mapping conclusions belong to risk correlation and validation recommendations, and do not automatically prove that attacks have succeeded or quality has failed.

### Current Coverage Boundaries

SanityOps v1.0 has primarily defined: Inspect (including Tool / Prompt / Skill / CROSS subsets), Risk Explicit, Risk Implicit, Quality Tool-Agent, Quality RAG-Agent, and Inspect defect impact and linkage mapping. Production runtime monitoring, incident response, and Knowledge / Memory / Identity / A2A governance are directions for subsequent expansion; the above directions should not be characterized as currently fully covered specialized specification capabilities.

### Delivery Form

SanityOps provides two complementary delivery forms:

- **Framework (Open Source Specification)**: Complete methodology documentation released under CC BY-SA 4.0 license, enabling enterprises to build their own toolchain
- **Platform (Commercial Tool)**: Ready-to-use tool platform based on the Framework, supporting SaaS and on-premises deployment

Both forms share the same governance language and evaluation standards; enterprises can choose their adoption path based on their circumstances.

---

## 3. Who It Compares To, and What It Compares

### 3.1 Framework Level: Positioning Comparison with Protocols / Standards / Methodologies

The SanityOps Framework does not replace any of the following categories, but complements them — they address problems at different layers.

| # | Comparison Category | What It Solves | What SanityOps Adds |
| --- | --- | --- | --- |
| 1 | **OWASP LLM Top 10 / Agentic AI Top 10** | Risk classification language and awareness elevation | Provides mapping from static defects to attack surfaces (AS-01→AS-09), with QD IDs linking to repairable Logic Artifact-level defects |
| 2 | **NIST AI RMF** | Organizational-level AI risk management framework | Provides executable inspection, validation, and measurement specifications for Agent Logic Artifacts |
| 3 | **ISO/IEC 42001** | AI management system certification standards | Provides technical-level governance assets (evidence chains, version baselines, gate decisions) to support certification audits |
| 4 | **Agent Communication Protocols (MCP / A2A)** | Inter-Agent communication and interoperability | Does not involve the communication layer; A2A governance listed as future expansion direction |
| 5 | **Traditional SAST / DAST** | Source code and application-layer security testing | Focuses on Logic Artifact layer (Prompt / Skill / Tool Schema), which traditional tools do not cover |
| 6 | **Model Evaluation Benchmarks (MMLU / HELM, etc.)** | General model capability measurement | Assesses quality and risk of Logic Artifacts in Agent systems, not the model itself |
| 7 | **Red Teaming Methodologies** | Adversarial testing methods | Associates attack generation with Logic Artifact defects, enabling root-cause localization rather than just Pass/Fail |
| 8 | **Prompt Engineering Best Practices** | Writing guides and rules of thumb | Provides systematic defect classification (QD), quantitative scoring, and auditable evidence |

> **Core Distinction**: Protocols/standards define "what should be done," methodologies describe "how to test," and SanityOps provides an executable governance closed loop for Agent Logic Artifacts — from defect discovery to risk validation, quality assessment, root-cause traceability, and regression closure, with versioned evidence retained at every step.

### 3.2 Platform Level: Comparison Navigation with Specialized Tools

The following three specialized tools have technical value in their respective domains and do not constitute a same-level substitution relationship with SanityOps, but rather can be combined complementarily.

| Comparison Dimension | Promptfoo | RAGAS | NVIDIA SkillSpector |
| --- | --- | --- | --- |
| **Positioning** | Standalone Prompt evaluation and Red Team tool | Standalone open-source RAG evaluation library | Skill security scanner |
| **Core Question** | Was the attack payload defended (Pass/Fail)? | How semantically similar is generated content to reference answers? | Security issues in Skill definitions |
| **SanityOps Corresponding Subset** | Risk Implicit (dynamic validation + root-cause localization) | Quality (governance framework-level quality assessment) | Inspect + Risk (defect inspection + cross-artifact consistency) |
| **Governance Closed Loop and Evidence Chain** | No endogenous linkage; statistical dimensions at plugin/strategy level | Only covers "assessment" phase; does not constitute "assess→localize→remediate→re-assess" closed loop | Security scanning; does not constitute governance closed loop |
| **Root-Cause Traceability** | Does not answer "which Logic Artifact was wrong" | Scoring results not directly linked to underlying Logic Artifact defects | Does not provide cross-artifact defect chain mapping |
| **Complementary Relationship** | Can serve as external attack generation component for Risk Implicit | Can serve as candidate technical component for Quality evaluator | Can complement Inspect with security scanning capabilities |

> **Key Principle**: The above tools have technical value within their design scope and can serve as candidate technical components for corresponding SanityOps phases. However, the two do not constitute a same-level substitution relationship — specialized tools answer "did this test pass?" while SanityOps answers "can this Agent be released, where is the problem, how to sustain quality, and is the evidence complete?"

### 3.3 DMC Positioning (v2.0 Preview)

> **Note**: DMC (Derivative Model Capability) is the fourth module introduced in SanityOps v2.0 (expected release: November 2026) and is currently in preview.

```
SanityOps Framework
├─ Inspect (Defect Inspection) — Static analysis of Logic Artifacts to discover potential defects
├─ Risk (Risk Scanning) — Dynamic validation to assess security risks
├─ Quality (Quality Assessment) — Runtime quality assessment
└─ DMC (Derivative Model Capability Assessment) — Assess models with modified weights themselves (v2.0)
```

DMC assesses whether enterprise-deployed quantized/pruned/distilled/fine-tuned models themselves can execute specific tasks, while SanityOps Inspect / Risk / Quality governs Agent Logic Artifacts and their runtime results. The two belong to different layers:

- **Lower Layer (DMC)**: Model capability baseline — whether capabilities are degraded after weight changes;
- **Upper Layer (SanityOps)**: Agent Logic Artifact governance — whether Logic Artifacts have defects, risks, and whether service quality meets standards.

Together they constitute a comprehensive capability management system from model to Agent. DMC does not measure end-to-end quality of Agent systems; SanityOps does not assess model capability degradation itself — the two are complementary rather than substitutive.

---

## 4. Detailed Comparison Entry Points

The following three detailed comparison documents respectively depart from three SanityOps subsets to conduct detailed technical comparisons with corresponding specialized tools. Each document focuses on "what SanityOps can do vs. what the specialized tool can do," and explains combinable complementary paths.

| Document | Comparison Object | SanityOps Subset | Core Comparison Dimensions |
| --- | --- | --- | --- |
| [vs. Promptfoo](/compare/compare-with-promptfoo.html) | Promptfoo | Risk Implicit | Root-cause localization, artifact-driven attack generation, shadow environment isolation |
| [vs. RAGAS](/compare/compare-with-ragas.html) | RAGAS | Quality | Governance framework vs. evaluation library, critical-item independent gating, test case assetization |
| [vs. NVIDIA SkillSpector](/compare/compare-with-skillspector.html) | SkillSpector | Inspect + Risk | Governance closed loop vs. security scanning, cross-artifact consistency |

---

## 5. Join the Community

SanityOps' goal is not to replace your existing security products or testing tools, but to fill the missing closed-loop capabilities for your Agent governance.

If you are seeking answers to the following questions, welcome to join the discussion:

- Before Agent production deployment, how to systematically discover defects in Prompts / Skills / Tool Schemas?
- After security testing produces Pass/Fail results, how to localize root causes to specific Logic Artifacts?
- How do quality assessment results support release admission decisions?
- After model quantization/fine-tuning, how to assess capability degradation impact on Agents?

**Repository**: [SanityOps GitHub](https://github.com/sanityops-org/sanityops-framework)  
**Discussion Channels**: Comparisons · Q&A · Announcements

---

*SanityOps does not promise absolute security, but promises that every step of governance is documented, evidenced, and traceable.*
