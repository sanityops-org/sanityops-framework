---
title: Inspection Results
description: "Version-bound inspection records over the three test cases: lite skill, CLI, manual re-scan, and the platform's Voyager reports."
---

# Inspection Results

Records produced by inspecting the [test cases](../cases/) with different tools. Each record is a **snapshot bound to the tool and rule version stated in its header** — results are not re-run on every release. For a current conclusion, re-run the inspection with `sanityops-cli`.

| Record | Tool | Tool version | Rule version | Date | Cases |
|---|---|---|---|---|---|
| [Energy](./lite-skill/energy-management-assistant__lite-skill-1.1.0.md) · [Freight](./lite-skill/freight-logistics-assistant__lite-skill-1.1.0.md) · [Medication](./lite-skill/medication-information-assistant__lite-skill-1.1.0.md) | `sanityops-inspect-lite` | v1.1.0 | v1.1 | 2026-11-04 | one per case |
| [Three agents under the CLI](./cli/three-agents__cli-0.1.9__2026-11-02.md) | `sanityops-cli` + manual triage | v0.1.9 | v1.0 / v1.1 | 2026-11-02 | all three |
| [Three agents, static re-scan](./manual-rescan/three-agents__manual-rescan-1.1__2026-11-02.md) | manual, against the L1 sub-specifications | — | v1.1 | 2026-11-02 | all three |
| Platform reports | SanityOps Platform | — | v1.0 | 2026-09 | Voyager (not one of the three cases) |

## Same cases, different tools

| Case | Lite skill v1.1.0 | CLI v0.1.9 (after triage) | Manual re-scan v1.1 |
|---|---|---|---|
| Energy | 1 P0 · 3 P1 · 1 P2 | FAIL — 1 confirmed P0 (input-constraint mismatch) | PASS — 3 P1 |
| Freight | 0 P0 · 0 P1 · 0 P2 (assessment incomplete: NEEDS_REVIEW) | FAIL — 1 confirmed P0 (input-constraint mismatch) | PASS — 1 P1 |
| Medication | 1 P0 · 1 P1 | FAIL — 0 P0, 2 P1 | PASS — 2 P1 |

Three different conclusions over the same three artifacts is the intended lesson, not a contradiction to hide: the three runs answer different questions with different rule versions and different levels of evidence.

### Why the numbers differ

- **The CLI run's raw output was dominated by false positives.** Roughly 48 `QC-1.1` hits ("`Dict`/`Any` not defined") came from the bundle-splitting step, not from the artifacts; 12 `QC-0.2` hits were code-fence style lint; several "section missing / truncated" P0s were hallucinations of the weak inspection model (`deepseek-flash`) — those sections are present in the source. The CLI report documents the triage that removes them.
- **Read-only artifacts cap severity.** All three agents only read local datasets, so findings that would be P0 for a write-capable agent (retry amplification, unbounded string parameters) land at P1/P2. The CLI's raw P0 grade on `QD-T-3.5` (ID chaining) assumed a write surface that does not exist here.
- **The manual re-scan and the CLI disagree on one class.** The CLI confirms P0 input-constraint mismatches (the energy `scope` pattern accepts values above 100%; the freight city-name pattern is ASCII-only and rejects non-ASCII names); the manual re-scan does not record them. This divergence is **not resolved** — it should be settled by re-running the CLI with a stronger model and adjudicating that finding pair.
- **The lite skill and the manual re-scan use the same rule version but different scopes.** The lite run applies the condensed v2 checklists stage by stage; the manual re-scan reads the L1 sub-specifications directly. Where they disagree, the source sub-specification governs.

## Platform reports (Voyager)

Formal PDF reports for the "Voyager" sample agent — a different artifact set from the three cases above — covering Inspect, Risk (Explicit & Implicit), and Quality, each with an audit and a summary.

- Inspect — [audit](/samples/report/Voyager_inspect-audit_20260927.pdf) · [summary](/samples/report/Voyager_inspect-summary_20260927.pdf)
- Risk Explicit — [audit](/samples/report/Voyager_explicit-audit_20260927.pdf) · [summary](/samples/report/Voyager_explicit-summary_20260927.pdf)
- Risk Implicit — [audit](/samples/report/Voyager_implicit-audit_20260926.pdf) · [summary](/samples/report/Voyager_implicit-summary_20260926.pdf)
- Quality — [audit](/samples/report/Voyager_quality-audit_20260927.pdf) · [summary](/samples/report/Voyager_quality-summary_20260927.pdf)

## Not covered by these records

Risk Implicit (runtime exploitability in a shadow sandbox) and the runtime Quality subsets (RAG-Agent / Tool-Agent) are not part of the static records above. Per `framework/core.md` §1.4, Inspect, Risk, and Quality are independent and their conclusions are not substitutable.
