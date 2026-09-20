# Try the Tools

---

> The SanityOps governance **specification is fully open source**; the openness of the implementation tools varies by subset. The table below makes this distinction clear at a glance.

## Openness Overview

| Core Subset | Spec License | Tool License / Delivery                               | Audience                                |
| ----------- | ------------ | ----------------------------------------------------- | --------------------------------------- |
| **Inspect** | CC BY-SA 4.0 | **Apache 2.0** (open-source CLI) + SaaS / self-hosted | Everyone                                |
| **Risk**    | CC BY-SA 4.0 | Closed-source SaaS / self-hosted (code-reviewable)    | Paying enterprise customers (under NDA) |
| **Quality** | CC BY-SA 4.0 | Closed-source SaaS / self-hosted (code-reviewable)    | Paying enterprise customers (under NDA) |

> The specification is always open — anyone can inspect, study, and independently implement the methodology behind all three subsets. Tool openness differs: **Inspect**'s tooling itself is open source; **Risk** and **Quality** are offered as SaaS for trial, with enterprise customers granted code-review access under a self-hosted deployment.

---

## Inspect — Open-Source Tooling, Free for Everyone

Defect Inspector is fully open source, allowing the community to freely use, audit, modify, and build upon it.

- **GitHub Repository**: [sanityops-cli](https://github.com/sanityops-org/sanityops-cli)

- **CLI Installation** :
  
  See [Installation guide](https://github.com/sanityops-org/sanityops-cli)

- **Use Case**: Static defect inspection of **logical artifacts** (System Prompts, Skills, Tool Schemas), suitable for local development or CI/CD integration.

- **Note**: The open-source CLI provides the full Inspect capability (inspection, suggestions, and remediation). On the Platform, Inspect results are cross-linked with Risk and Quality findings and archived into the version-level evidence chain.

---

## Risk & Quality — Try the Demo, or Deploy for Your Enterprise

Risk Scanner and Quality Evaluator are delivered as SaaS and self-hosted deployments. Their methodology is fully open source; the tool implementation is not currently released as public source code.

- **Live Demo**: https://www.sanityops.org/demo
  - The demo platform is currently in an early access phase. Because core detection features rely on third-party LLM API calls, access is currently invite-only to ensure service quality and manageable cost.
  - **How to request access**: Email `hello@sanityops.org`  describing your use case, and we will send you an invite code promptly.
  - **Free quota**: 5 free evaluations per IP per day on the SaaS platform (limited by backend LLM inference cost).
- **Enterprise Self-Hosted Deployment**:
  - Full-stack self-hosted deployment (detection engine, database, dashboards) within your enterprise VPC;
  - **Decoupled model layer**: bring your own LLM, including locally hosted models, with no dependency on external APIs;
  - **Code-reviewable access (under NDA)**: contracted enterprise customers may obtain source-code review access under NDA to independently verify how governance logic is implemented — consistent with the transparency principle behind open-sourcing our Framework: **governance tooling should be transparent, not a black box.**
- **Contact Sales**: `hello@sanityops.org` 

---

## Why Are Inspect, Risk, and Quality Unified into the SanityOps Platform?

The Inspect ruleset and CLI are open source — you can use it independently for static defect checking. Risk and Quality can likewise be adopted as standalone capabilities. The methodology behind all three is fully decoupled: **you can use just one, or combine them freely.**

Within the SanityOps Platform, however, we integrate all three into a unified system, for the following reasons:

- **Correlated Root-Cause Analysis**: Defects surfaced by Inspect are mapped against Risk's attack-surface findings and Quality's failure-mode patterns, enabling rapid root-cause localization behind output anomalies or risk incidents;
- **Logical Artifact Version Management**: Every artifact iteration (e.g., `Agent_RAG_v3.2.1 → v3.2.2`) has its defect inspection, risk audit, and quality evaluation results consolidated into a traceable, auditable evidence chain;
- **Analytics Dashboards & Reporting**: Searchable, exportable dashboards and compliance reports support cross-version trend comparisons of governance posture;
- **Multi-User Collaboration**: Team-based user and permission management, integrated with existing CI/CD pipelines, code repositories, and knowledge bases.

> In short: **the open-source tools give you point-in-time detection capability; the Platform gives you correlated root-cause analysis, version traceability, and team collaboration in a continuous governance loop.** Each subset works independently — the Platform's value lies in organizing them into a persistent, collaborative, and auditable governance system, rather than simply bundling features together.

---

## Quick Start

| What do you want to do?                                  | Recommended path                                                                                               |
| -------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| Run static defect checks and integrate it yourself       | Download the [open-source Inspect tool](https://github.com/sanityops-org/sanityops-cli)          |
| Experience the full governance loop                      | Request an invite code and try the [live demo](https://www.sanityops.org/demo)                                 |
| Deploy independently, with custom models and code review | Contact `hello@sanityops.org` to discuss self-hosted deployment                                                |
| Learn the methodology and implement it yourself          | Read the [open-source Framework specification](https://github.com/sanityops-org/sanityops-framework/tree/main) |
