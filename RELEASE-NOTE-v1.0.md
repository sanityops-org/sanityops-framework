# SanityOps Framework v1.0

**Release Date**: August 2026  
**Version**: v1.0  
**License**: CC BY-SA 4.0  
**Repository**: https://github.com/sanityops-org/sanityops-framework

---

## The Problem: AI Agents Have a "Missing Compiler"

79% of enterprises have adopted AI Agents. Only 11% run them in production. Just 6% trust them for core business.

The reason isn't model capability. It's **governance**.

When you write a System Prompt, Skill definition, or Tool Schema, you're writing **executable logic**—but unlike code, it has no compiler. No static checks. No type system. Defects (contradictions, unclear boundaries, missing constraints) aren't caught at writing time. They're projected directly into LLM reasoning, surfacing as:

- Output that drifts between runs
- Security holes you can't see until exploited
- Production issues you can't trace to a root cause

SanityOps v1.0 is our answer: **a governance framework that treats Logic Artifacts as first-class assets**, with static inspection, risk validation, and quality assessment built for Agent lifecycles.

> **Design Philosophy**: A common misconception holds that LLM-generated logic should be defect-free. This misunderstands the fundamental trade-off: LLMs optimize for usefulness, not constraint verification. SanityOps exists because this gap is structural — not a temporary limitation, but a permanent need for independent validation.

---

## Three Design Decisions That Matter

### 1. Static Defect Inspection for Logic Artifacts

**What**: Inspect System Prompts, Skills, Tool Schemas, and Cross-Artifact relationships for definition defects—non-standard, incomplete, unclear, contradictory, structurally unsound.

**How**: Structured defect IDs (`QD-P-*`, `QD-S-*`, `QD-T-*`, `QD-PS-*` for cross-artifact), severity levels (`P0/P1/P2`), and clause-level localization. Think compiler warnings for Prompts.

**Why it matters**: When production breaks, you point to **which line of which artifact**—not "seems like a prompt problem."

---

### 2. Root-Cause Localization via Relevance Mapping

**What**: Connect defects (`QD-*`) to attack surfaces (`AS-*`) and failure modes (`FM-*`) through explicit diagnostic mappings.

**How**: When `Risk Implicit` detects an exploit or `Quality` detects a failure, the report includes: "Root cause likely: `QD-P-2.5.2` (ambiguous boundary definition)." Fixes become targeted; regression tests validate specific defect remediation.

**Why it matters**: Most existing tools answer *whether* something failed. SanityOps is designed to also answer *why*—and *where to fix it*. Different layers, not substitutes.

---

### 3. Artifact-Driven Attack Generation

**What**: Generate attacks from the specific defects found in *your* artifacts, not generic templates.

**How**: `Risk Implicit` pipeline: defect entry → attack strategy derivation → test case generation → shadow environment execution. Attacks are tailored to your actual weaknesses. Four termination statuses (`A/B/C/D`) distinguish "exploited" from "blocked by external guardrail"—the latter doesn't mean your Agent is secure.

**Why it matters**: You validate vulnerabilities that exist in *your* Agent, not just whether you can block common jailbreak prompts.

---

## What's Included

### 10 Specification Documents

| Document | Purpose |
|----------|---------|
| [Core v1.0](framework/core.md) | Unified terminology, object model, evidence standards, Gate semantics |
| [Inspect Prompt v1.0](inspect/prompt.md) | System Prompt static defect inspection |
| [Inspect Skill v1.0](inspect/skill.md) | Skill definition defect inspection |
| [Inspect Tool v1.0](inspect/tool.md) | Tool Schema defect inspection |
| [Inspect Cross v1.0](inspect/cross.md) | Cross-artifact consistency inspection |
| [Risk Explicit v1.0](risk/explicit.md) | Explicit risk classification and audit |
| [Risk Implicit v1.0](risk/implicit.md) | Runtime attack validation methodology |
| [Quality Tool-Agent v1.0](quality/tool-agent.md) | Tool-Agent reliability assessment |
| [Quality RAG-Agent v1.0](quality/rag-agent.md) | RAG-Agent 4-dimension 12-metric assessment |
| [Relevance v1.0](framework/relevance.md) | Defect-to-risk/quality diagnostic mapping |

### Tooling

| Tool | Status | Access |
|------|--------|--------|
| **Defect Inspector** | Open Source | [Free CLI](https://github.com/sanityops-org/sanityops-framework/releases) |
| **Risk Scanner** | Commercial | SaaS / On-Premises |
| **Quality Evaluator** | Commercial | SaaS / On-Premises |

### What You Can Download

| Asset | Format | Access |
|-------|--------|--------|
| **SanityOps Framework v1.0** (all specs) | Markdown | Included in this repo |
| **Defect Inspector CLI** | Binary / PyPI | Open source — see Quick Start below |

---

## Quick Start

```bash
# Clone and explore
git clone https://github.com/sanityops-org/sanityops-framework.git
cd sanityops-framework

# Read the specs
ls framework/ && ls inspect/ && ls risk/ && ls quality/

# Install the open-source Defect Inspector CLI
# Via PyPI:
#   pip install sanityops-defect-inspector
# Via CURL (Linux/macOS):
#   curl -fsSL https://sanityops.org/install-cli | sh
```

---

## Why This Exists: The Data

| Statistic | Source |
|-----------|--------|
| 88% of Agent projects fail to move from POC to production | IDC, 2025 |
| 42% of enterprises abandoned most AI projects in 2025 | S&P Global, 2025 |
| 84% of AI project failures stem from governance, not technology | RAND Corporation, 2024 |
| 40% of agentic AI projects predicted to fail by 2027 due to inadequate risk management | Gartner, 2025 |

We built SanityOps because we watched this happen—at scale—and couldn't find a systematic way to prevent it.

---

## Roadmap

| Milestone | Status |
|-----------|--------|
| Framework Core + All Subspecs (v1.0) | ✅ Complete |
| Defect Inspector (Open Source CLI) | ✅ Available |
| Risk Scanner / Quality Evaluator (Commercial) | ✅ Available |
| DMC (Derivative Model Capability) — *v2.0, Nov 2026* | 🔄 In Progress |
| Runtime Monitoring & Production Audit | 📋 Planned |

---

## License

CC BY-SA 4.0 — Free to use, modify, distribute, including commercially. Retain license and attribution.

---

## Contact

- **Website**: https://www.sanityops.org
- **Discussions**: https://github.com/sanityops-org/sanityops-framework/discussions
- **Email**: hello@sanityops.org

---

*SanityOps Framework v1.0 — August 2026 — Sanity AI Labs*
