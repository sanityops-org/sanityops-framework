---
title: SanityOps Inspect Lite — README
description: "Background, lite-vs-full comparison, upgrade path, worked samples, and FAQ for the sanityops-inspect-lite inspector (SanityOps Framework v1.0). Non-normative auxiliary guide."
---

# SanityOps Inspect Lite — README

This file is the **auxiliary guide** for the `sanityops-inspect-lite` inspector. It covers how to use it, background, the lite-vs-full comparison, how to upgrade to the official tooling, worked samples, and FAQ. For the operational rules — inputs, the five-stage flow, run modes, and the output contract — see [SKILL.md](SKILL.md).

This is a **non-normative** document. It defines no new rules and never overrides the SanityOps Framework specification or the condensed checklists in `references/`.

---

## Background

The SanityOps Framework v1.0 is an open specification (CC BY-SA 4.0) for continuous governance of AI Agents, built on static defect inspection of three Logic Artifact types: **System Prompt**, **Skill**, and **Tool Schema** (Permission is a cross-cutting aspect).

The `sanityops-inspect-lite` skill is a **zero-install inspector** that the host model executes by applying condensed checklists. It is **detect-only**: it reports defects but never rewrites artifacts, never runs the Risk subsets, and never runs the Quality subsets.

It is **not** the official engine. The official tooling is the `sanityops-cli` and the SanityOps Platform (see [Upgrade path](#upgrade-path)).

## How to use

The skill is executed by a **host model** (the agent you run it in). There is no executable, no install step, and no network call.

1. **Get the skill.** Clone the framework repo and use the `inspect-skill/` folder, or download just that folder:

   ```
   git clone https://github.com/sanityops-org/sanityops-framework.git
   ```

   The skill package is `inspect-skill/` (`SKILL.md` + `references/` + this `README.md`).

2. **Load it into an agent.**
   - **Agent skill (recommended):** install the `inspect-skill/` folder as a skill in a skill-aware agent platform. The `description` in SKILL.md's front matter auto-triggers it when the user asks to inspect, audit, or check logic artifacts.
   - **Paste-in fallback:** for a model without skill support, provide `SKILL.md` together with the `references/` files as instructions — the model reads the checklists while running the flow.

3. **Provide the inputs** (SKILL.md §2): the artifacts to inspect (System Prompt / Skill / Tool Schema), the tier declarations (Prompt/Skill L1/L2/L3 and each Tool's risk level), and a version label. The model then runs the five-stage flow and emits the report.

## Lite vs full comparison

| Capability | Lite inspector (this skill) | Full (CLI / SanityOps Platform) |
|---|---|---|
| Inspect rule coverage | Condensed minimal sets (QD-P/QD-S/QD-T L1/L2/L3; Cross L1 8 / L2 12 / L3 19 items) | Full specification |
| Permission check | 12-item Quick Mode | Full 43-item set |
| Risk Explicit (`EX-*`) | Not run | Run (dangerous-expression classification) |
| Risk Implicit | Not run | Run (shadow-sandbox dynamic exploitability validation) |
| Quality (RAG-Agent / Tool-Agent) | Not run (candidate `FM-*`/metric mapping only) | Run (4-dimension 12 metrics, three-layer gates, Ratchet) |
| Defect chains (`SC-*` / `QC-*`) | Out of scope | Supported |
| Remediation / repair | None (detect-only) | CLI `inspect repair` generates fixed artifacts |
| Version-level evidence chain | None | Platform archives results into a traceable, auditable evidence chain |

The comparison above is illustrative; on any specific number, the owning sub-specification governs.

## Upgrade path

- **Open-source CLI** (full Inspect + suggestions + remediation): [sanityops-org/sanityops-cli](https://github.com/sanityops-org/sanityops-cli) (Apache 2.0).
- **SanityOps Platform** (Risk + Quality + correlated root-cause analysis + version evidence chain): live demo at <https://demo.sanityops.org/> (invite-only early access; request a code via <mailto:hello@sanityops.org>).
- **Enterprise self-hosted** (code-reviewable under NDA): contact <mailto:hello@sanityops.org>.

Install and quick-start instructions are in [Try the Tools](../framework/try-the-tools.md).

## Worked samples

Instance outputs of the lite inspector (non-normative `F-*`-level records) live in `samples/inspect-skill-artifacts-samples/`:

| Sample | Subject |
|---|---|
| [anthropics-skills-pdf.md](../samples/inspect-skill-artifacts-samples/anthropics-skills-pdf.md) | anthropics/skills `pdf` Skill — Stage A QD-S |
| [gpt-researcher.md](../samples/inspect-skill-artifacts-samples/gpt-researcher.md) | gpt-researcher Prompt + Tool — Stage A QD-P / QD-T |
| [crewai-markdown-validator.md](../samples/inspect-skill-artifacts-samples/crewai-markdown-validator.md) | crewAI-examples markdown_validator Prompt + Tool |
| [tau-bench-airline.md](../samples/inspect-skill-artifacts-samples/tau-bench-airline.md) | sierra-research/tau-bench airline (Prompt + 14 Tool Schemas) |
| [tau-bench-retail.md](../samples/inspect-skill-artifacts-samples/tau-bench-retail.md) | sierra-research/tau-bench retail (Prompt + 16 Tool Schemas) |
| [self-check-report.md](../samples/inspect-skill-artifacts-samples/self-check-report.md) | Dogfooding: the lite inspector applied to its own package (Round 1 + Round 2) |

## FAQ

**Is this the official SanityOps tool?**
No. It is a condensed skill-rule package applied by a host model. For the official result, use `sanityops-cli` (see [Upgrade path](#upgrade-path)).

**Can it fix my artifacts?**
No. It is detect-only. The CLI provides remediation via `sanityops-cli inspect repair`.

**Does it check security or quality?**
No. It only produces *candidate* attack-surface / failure-mode / metric associations for defects it found. Risk (Explicit/Implicit) and Quality are run by the full tooling, not by this skill.

**Where are the authoritative rules?**
In the nine L1 sub-specifications under `inspect/`, `risk/`, and `quality/`, plus `framework/relevance.md`. The files in `references/` are condensed extractions and define no new rules.
