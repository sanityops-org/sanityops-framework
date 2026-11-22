---
title: Samples
description: "One example agent and the reports produced on it: the logic artifacts, the Skill/CLI report, and the platform's specification reports."
---

# Samples

One complete example agent, and the reports that inspection produced on it. Four deliverables are grouped below: the **logic artifacts** (the input), the **Skill/CLI report**, and the platform's **specification reports** (summary and audit).

## Case: Medication Information Assistant

_This agent was drafted by an LLM from a business-requirements brief, the way teams commonly generate agents today. It was not created as a test fixture: the model was not told its output would be inspected, and no defects were seeded — every finding below emerged naturally from the generation process._

_Healthcare · 1 Prompt · 1 Skill · 5 Tool Schemas_

| Deliverable | Details | Open |
|---|---|---|
| Logic Artifacts | System Prompt + 1 Skill + 5 Tool Schemas | [Read →](/samples/cases/medication-information-assistant) |
| Skill/CLI Report | `sanityops-inspector` v2.0.0 · 2026-11-21 | [Read →](/samples/results/inspector/medication-information-assistant__inspector-2.0.0__2026-11-21) |
| Platform report — summary | PDF · 2026-11-20 · 5.4 MB | [Open PDF →](/samples/report/medication-information-assistant__specification-summary__2026-11-20.pdf) |
| Platform report — audit | PDF · 2026-11-20 · 9.5 MB | [Open PDF →](/samples/report/medication-information-assistant__specification-audit__2026-11-20.pdf) |

The inspector skill and `sanityops-cli` share the same inspection engine and produce identical reports; a single record is kept as the **Skill/CLI Report**.

**Bundle format.** The System Prompt, Skill, and five Tool Schemas are consolidated into one Markdown document for readability only — it is not a required input format. The tools extract logic artifacts from your own separate files automatically. See [Try the Tools](/framework/try-the-tools).

_The platform reports cover static inspection only. Runtime evaluations — Implicit Risk (red-team in a shadow sandbox) and Quality (RAG-Agent / Tool-Agent) — are separate platform outputs not included in this sample set._

::: warning Results are version snapshots
Every page under `results/` is bound to the tool and rule version stated in its header (for example `sanityops-inspector v2.0.0`, SanityOps Framework v1.1). Results are **not re-run on every release**. For a current conclusion, re-run the inspection with `sanityops-cli` — see [Try the Tools](/framework/try-the-tools).
:::
