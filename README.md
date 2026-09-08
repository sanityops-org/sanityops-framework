<picture>
  <source srcset="/assets/sanityops-logo-github-w.svg" media="(prefers-color-scheme: dark)" />
  <img src="/assets/sanityops-logo-github-b.svg" alt="SanityOps Logo" width="260" />
</picture>

# SanityOps Framework

## AI Agent Continuous Governance

---

[![Version](https://img.shields.io/badge/version-v1.0-blue)](https://github.com/sanityops) [![License: CC BY-SA 4.0](https://img.shields.io/badge/License-CC%20BY--SA%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by-sa/4.0/) [![AI Agent Governance](https://img.shields.io/badge/AI%20Agent-Governance-6f42c1)](https://github.com/sanityops)

---

> **A full-lifecycle governance system for enterprise-grade AI Agent reliability and security** — built for teams that design, deploy, and continuously adjust Agent logic, including Forward Deployed Engineers (FDEs).

> ⚠️ **Common Misconception**: "Logic artifacts written by LLMs have no defects." This is a fundamental misunderstanding — LLMs optimize for "generating useful content," not "exhaustively verifying constraints." This trade-off will not disappear as models evolve. Logic artifacts always require systematic inspection independent of the generation process. This is the fundamental reason SanityOps exists.

---

## ✨ What is SanityOps

SanityOps is a continuous governance framework built on defect inspection of Agent Logic Artifacts — System Prompts, Skills, and Tool Schemas — that closes a bidirectional loop spanning Agent quality assessment and risk detection.

SanityOps does not promise that Agent governance will always be correct or absolutely secure. Its objective is to bring the controllable, versionable, and verifiable defects of Agent Logic Artifacts into a governance closed loop that continuously inspects, validates, regresses, and documents evidence — mapping those defects against risk and quality — and thereby systematically reducing the uncertainty of Agent behavior and the business and security risks that uncertainty creates.

---

## 🎯 Why SanityOps

Why does SanityOps start with Logic Artifacts? Many factors influence Agent quality and risk: model capability, knowledge content, retrieval strategy, context, tooling, runtime environment, and user input can all cause failures.

But one root cause stands above the rest: **defects in Logic Artifacts are the closest to business design, the most directly controllable by the team, the most suited to version management, and the most amenable to systematic remediation.**

The role definitions, examples, knowledge-invocation rules, and inter-artifact coordination relationships contained in System Prompts, Skills, and Tool Schemas constitute, in essence, the Agent's "executable logic." When that logic suffers from missing definitions, fuzzy boundaries, conflicting constraints, mismatched permissions, incomplete information, or Cross-Artifact inconsistency, the defects ride through the LLM API into model reasoning and tool invocation. They can then manifest as:

- Output that is inaccurate, incomplete, inconsistent, or untraceable;
- Bypassed instructions, privilege escalation, sensitive-information disclosure, or dangerous operations;
- And, because these production issues are difficult to reproduce and localize, they become even harder to optimize and to prove remediated.

Traditional software engineering has compilers, tests, release gates, and traceable change management. The core Logic Artifacts of an Agent typically lack engineering governance of comparable maturity.

SanityOps therefore starts from Logic Artifacts: it converts the writing and optimization of Logic Artifacts — which has traditionally depended on individual skill and experience — into a governance process that is **inspectable, evidencable, mappable, remediable, and regression-verifiable.**

> SanityOps does not claim that static inspection explains everything. It treats Logic Artifact governance as the actionable starting point, and continuously reduces Agent uncertainty through runtime risk detection and quality assessment.

---

## 🏗️ Architecture

### Division of Labor Across the Six Subsets

```
SanityOps Six-Subset Framework
│
├─ Inspect (Defect Inspection)
│   ├─ Inspect Prompt ← System Prompt defect inspection
│   ├─ Inspect Skill ← Skill defect inspection
│   ├─ Inspect Tool ← Tool Schema defect inspection
│   └─ Inspect Cross ← Cross-Artifact Consistency inspection
│
├─ Risk (Risk Scanning)
│   ├─ Risk Explicit ← Explicit Risk Audit
│   └─ Risk Implicit ← Implicit Risk Dynamic Validation
│
├─ Quality (Service Quality)
│   └─ Quality ← Agent and LLM service quality assessment
│
└─ Relevance (Impact Mapping)
    └─ Relevance ← defect → risk/quality diagnostic mapping
```

### Framework Workflow

<img src="/assets/sanityops.svg" alt="SanityOps Architecture" width="650" />

---

## 👽 Who is this for

| Role | In one sentence |
| --- | --- |
| **CTO/CIO** | Design standardized quality and security scaffolding for enterprise AI practice |
| **Agent Development & Test** | Use the guidance framework and automated tooling to raise the quality and efficiency of Logic Artifact development and testing |
| **Agent Quality Assurance** | Assess Agent runtime quality in lockstep with versioning, ensuring the Agent always performs at a high standard |
| **Agent Security Audit** | Detect Agent Explicit and Implicit Risks in lockstep with versioning, maintaining a high security posture |
| **Platform Engineers** | Integrate governance into CI/CD, forming an automated loop of hot iteration, quality, and security |
| **FDEs** | Provide FDE teams with dependable, high-quality enterprise Agent practice guidance |

---

## 🤖 Forward Deployed Engineers (FDE)

FDEs build and adjust AI agents in real customer environments, connecting business workflows, data, tools, policies, and human review.

SanityOps helps FDE teams turn fast, customer-specific iterations into repeatable delivery disciplines:

- **Inspect** prompts, skills, tool patterns, and cross-artifact logic before release

- **Validate** explicit risks and adversarial failure paths for high-impact workflows

- **Assess** task quality against customer-specific baselines and release gates

- **Retain** findings and evidence across iterations, handoffs, and audits

SanityOps does not replace FDE judgment, implementation work, observability, IAM, or production operations. It wraps the Agent logic that FDE teams constantly design and change with a governance loop.

---

## 🧩 Use Cases & Capabilities

| Scenario | Typical Example | Reference Document | Tool |
| --- | --- | --- | --- |
| **Prompt quality self-check** | Before a developer submits a new System Prompt, check for contradictions, unclear boundaries, missing permissions, and other defects | [Inspect Prompt](https://github.com/sanityops-org/sanityops-framework/blob/main/inspect/prompt.md) | 🟢 Defect Inspector |
| **Skill definition audit** | Inspect whether a Skill's trigger conditions, permission declarations, and failure strategies contain logic loopholes | [Inspect Skill](https://github.com/sanityops-org/sanityops-framework/blob/main/inspect/skill.md) | 🟢 Defect Inspector |
| **Tool Schema compliance check** | Verify whether a Tool Schema's parameter constraints and side-effect declarations comply with the specification | [Inspect Tool](https://github.com/sanityops-org/sanityops-framework/blob/main/inspect/tool.md) | 🟢 Defect Inspector |
| **Cross-Artifact Consistency verification** | Verify that authorization, parameters, and contracts are consistent across Prompt–Skill–Tool | [Inspect Cross](https://github.com/sanityops-org/sanityops-framework/blob/main/inspect/cross.md) | 🟢 Defect Inspector |
| **Explicit Risk Audit** | Audit and quantitatively rate dangerous expressions, scripts, and dangerous authorizations in Logic Artifacts | [Risk Explicit](https://github.com/sanityops-org/sanityops-framework/blob/main/risk/explicit.md) | 🔵 Risk Scanner |
| **Implicit Risk attack validation** | Simulate complex logic attacks in a Shadow Environment to detect runtime vulnerabilities | [Risk Implicit](https://github.com/sanityops-org/sanityops-framework/blob/main/risk/implicit.md) | 🔵 Risk Scanner |
| **Tool-Agent reliability assessment** | Evaluate the task success rate of tool-based Agents; establish risk-driven test rigor | [Quality Tool-Agent](https://github.com/sanityops-org/sanityops-framework/blob/main/quality/tool-agent.md) | 🔵 Quality Evaluator |
| **RAG-Agent quality assessment** | Assess knowledge-based Agents across four dimensions and 12 metrics — accuracy, completeness, relevance, traceability, timeliness | [Quality RAG-Agent](https://github.com/sanityops-org/sanityops-framework/blob/main/quality/rag-agent.md) | 🔵 Quality Evaluator |
| **Enterprise Agent release admission** | Before a financial enterprise's financial-analysis Agent ships, pass the Inspect + Risk + Quality three-Gate check and generate a release report | [Core](https://github.com/sanityops-org/sanityops-framework/blob/main/framework/core.md), [Relevance](https://github.com/sanityops-org/sanityops-framework/blob/main/framework/relevance.md) | 🔵 Full tool suite |
| **Defect → risk/quality diagnosis** | Correlate Inspect-discovered defects with Risk Attack Surfaces and Quality Failure Modes to localize root causes | [Relevance](https://github.com/sanityops-org/sanityops-framework/blob/main/framework/relevance.md) | 🔵 Full tool suite |
| **Quality degradation regression** | After Logic Artifact changes, detect quality degradation through regression testing, producing the basis for release decisions | [Quality RAG-Agent](https://github.com/sanityops-org/sanityops-framework/blob/main/quality/rag-agent.md) | 🔵 Quality Evaluator |
| **Compliance audit evidence generation** | Provide audit departments with traceable version records, assessment reports, and Gate decision evidence | [Core](https://github.com/sanityops-org/sanityops-framework/blob/main/framework/core.md) | 🔵 Full tool suite |

> 🟢 Open-source tooling (Defect Inspector) | 🔵 Commercial tooling (Risk Scanner, Quality Evaluator)
>
> The open specification documents are sufficient to guide a team in building its own inspection/assessment tooling. If you would rather not start from scratch, we provide ready-made tools.

---

## 📌 Current Status

**v1.0 · July 2026**

- ✅ Framework core specification published
- ✅ A complete methodology system across Inspect, Risk, Quality, and Relevance
- ✅ Defect Inspector fully open sourced, with a free CLI
- ✅ Risk Scanner and Quality Evaluator available as commercial SaaS / self-hosted offerings

---

## 🤝 Contributing

We welcome improvements via Issues, Pull Requests, or Discussions:

- Submit new Logic Artifact defect patterns
- Share risk audit and attack validation case studies
- Contribute quality assessment baselines and test sets
- Discuss the evolution of terminology, rules, tiering, and Gates

---

## 🌐 Ecosystem

See how SanityOps relates to other tools and frameworks:

- [SanityOps Positioning](/compare/sanityops-positioning.html) — Framework positioning and ecosystem relationships
- [SanityOps and FDE](/compare/sanityops-and-fde.html) — Relationship with Frontier Deployment Engineers
- [SanityOps and Harness](/compare/sanityops-and-harness.html) — Relationship with Harness runtime layer
- [SanityOps vs Promptfoo](/compare/compare-with-promptfoo.html) — Red teaming and adversarial testing
- [SanityOps vs RAGAS](/compare/compare-with-ragas.html) — RAG evaluation and quality metrics
- [SanityOps vs NVIDIA SkillSpector](/compare/compare-with-skillspector.html) — Skill security scanning

## 📄 License

This project is licensed under the [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) license.

---

## 📬 Contact

- Website: `https://www.sanityops.org`
- GitHub: `https://github.com/sanityops-org/sanityops-framework`
- Discussions: `https://github.com/sanityops-org/sanityops-framework/discussions`
- Email: `hello@sanityops.org`
