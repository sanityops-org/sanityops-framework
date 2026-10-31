---
title: Samples
description: "Sample logical artifacts and formal audit reports demonstrating SanityOps Inspect, Risk, and Quality governance in practice."
---

# Samples

End-to-end examples of SanityOps governance, from raw logical artifacts to formal audit reports.

## [Sample Logical Artifacts](./artifacts/index.md)

System Prompts, Skills, and Tool Schemas for three example agents — Energy Management, Freight Logistics, and Medication Information — each with its defect inspection and remediation record.

## [Sample Audit Reports](./report/index.md)

Formal PDF reports for the "Voyager" sample agent, spanning Inspect, Risk (Explicit & Implicit), and Quality — each with a full audit report and an executive summary.

## Inspection Records

External-agent records produced by the `sanityops-inspect-lite` inspector: each pairs a source logic artifact with its inspection report. Non-normative `F-*`-level instance outputs.

## Test-Case Inventory

Seven inspection targets are maintained here — four external inspection records and three original "Fixed Artifacts" agents — holding **66 logic artifacts** in total. All seven are type-identifiable, bounded, declarative, and statically readable, so each is usable as an inspection test case. The two entries marked † inspect a *composed* surface rather than a single file; their verdicts apply to that aggregate surface.

| Record | Source | Collected / authored | Version anchor | Upstream licence | Logic artifacts | Composition |
|---|---|---|---|---|---|---|
| [tau-bench-retail.md](./inspect-skill-artifacts-samples/tau-bench-retail.md) | [sierra-research/tau-bench](https://github.com/sierra-research/tau-bench) · `tau_bench/envs/retail/` | 2026-10-07 | `main`, SHA unrecorded | MIT, © 2024 Sierra | **17** | 1 System Prompt + 16 Tool Schemas |
| [tau-bench-airline.md](./inspect-skill-artifacts-samples/tau-bench-airline.md) | [sierra-research/tau-bench](https://github.com/sierra-research/tau-bench) · `tau_bench/envs/airline/` | 2026-10-07 | `main`, SHA unrecorded | MIT, © 2024 Sierra | **15** | 1 System Prompt + 14 Tool Schemas |
| [gpt-researcher.md](./inspect-skill-artifacts-samples/gpt-researcher.md) † | [assafelovic/gpt-researcher](https://github.com/assafelovic/gpt-researcher) | 2026-10-06 | `0957c301` (2026-09-26) | Apache-2.0 | **2** | 1 composed System Prompt (prompt library across 4 files) + 1 Tool definition |
| [crewai-markdown-validator.md](./inspect-skill-artifacts-samples/crewai-markdown-validator.md) † | [crewAIInc/crewAI-examples](https://github.com/crewAIInc/crewAI-examples) · `markdown_validator/` | 2026-10-07 | `main`, SHA unrecorded | None found — all rights reserved | **2** | 1 composed System Prompt (`agents.yaml` + `tasks.yaml`) + 1 Tool definition |
| [energy-management-assistant.md](./artifacts/energy-management-assistant.md) | Original (Sanity AI Labs) | Inspected 2026-09-30, gated 2026-10-02 | `sanityops-cli` v0.1.5, v1.0 rules | CC BY-SA 4.0 (own work) | **10** | 1 System Prompt + 3 Skills + 6 Tool Schemas |
| [freight-logistics-assistant.md](./artifacts/freight-logistics-assistant.md) | Original (Sanity AI Labs) | Inspected 2026-09-30, gated 2026-10-02 | `sanityops-cli` v0.1.5, v1.0 rules | CC BY-SA 4.0 (own work) | **13** | 1 System Prompt + 3 Skills + 9 Tool Schemas |
| [medication-information-assistant.md](./artifacts/medication-information-assistant.md) | Original (Sanity AI Labs) | Inspected 2026-09-30, gated 2026-10-02 | `sanityops-cli` v0.1.5, v1.0 rules | CC BY-SA 4.0 (own work) | **7** | 1 System Prompt + 1 Skill + 5 Tool Schemas |
| **Total** | 4 external + 3 original | — | — | MIT ×2 · Apache-2.0 ×1 · all-rights-reserved ×1 · own ×3 | **66** | 7 System Prompts + 8 Skills + 51 Tool Schemas |

**Licence handling.** MIT and Apache-2.0 sources are quoted verbatim with attribution and their licence noted in the record. The crewAI record (no repo `LICENSE`) reproduces isolated short quotes only, each tagged with its source line. A sixth external record — the `anthropics/skills` `pdf` skill — was withdrawn because its artifacts carry a no-derivative / no-distribution licence (see RELEASE-NOTE v1.1).

**Verdict scope.** The three "Fixed Artifacts" records are historical post-repair snapshots bound to the v1.0 rule set and `sanityops-cli` v0.1.5; they are not re-aligned to later rule versions, so a re-scan under newer rules may surface additional findings. The four external records were produced against an earlier five-stage skill revision and carry a stale-notice; some cited rule IDs have since been deleted, transferred, or merged.
