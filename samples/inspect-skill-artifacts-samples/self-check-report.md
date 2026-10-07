---
title: Self-Check Report — sanityops-inspect Applied to Its Own Package
description: Dogfooding inspection record — the sanityops-inspect lite inspector package inspected against the inspect/skill.md baseline and category rules, plus full syntax checks. Round 1 (build) and Round 2 (Permission checklist extraction), 2026-10-06.
---

# Self-Check Report — sanityops-inspect (Round 1)

**Date**: 2026-10-06

**Inspected object**: `inspect-skill/` package (SKILL.md + 5 reference files), build 2026-10-06

**Rule basis**: `inspect/skill.md` v1.0 — QD-S-0 baseline compliance (6 items, entry gate) + selected category rules (QD-S-3.4, QD-S-3.6, QD-S-4.1, QD-S-1.1), followed by a full syntax check of all six files.

**Scope note**: the package is a Skill-type logic artifact. Its declared risk level is **L1** (text-processing only; the Skill definition itself invokes no tools — the host environment's own file/network tool use is outside the Skill definition). This self-check is itself an instance output of the lite inspector; per framework convention it is a Finding-level record, not a rule definition.

## Stage A verdicts

| Rule | Verdict | Evidence |
| --- | --- | --- |
| QD-S-0.1 Required Field Presence | PASS | SKILL.md front matter carries `name`, `description`, `license`; all five reference files carry `title` + `description` |
| QD-S-0.2 Field Content Non-Empty | PASS | All front-matter fields non-empty across 6/6 files (syntax sweep) |
| QD-S-0.3 Syntax Parsability | PASS | YAML front matter opens and closes correctly in 6/6 files (sweep: closed at line 3–4) |
| QD-S-0.4 Field Type Validity | PASS | `name: sanityops-inspect` (string), `description` (string), `license: CC BY-SA 4.0` (string) |
| QD-S-0.5 No Conflicting Declarations | PASS | Stage order consistent across §4/§5/§6; the §8 reference table lists exactly the 5 files that exist (5/5 name matches); Gate-0 output block matches permission.md §9.2.4 wording; Quick Mode 12 IDs match permission.md Appendix D.1 |
| QD-S-0.6 Minimum Structural Completeness | PASS | SKILL.md carries 9 sections (purpose / inputs / precedence / flow / modes / output contract / do-not list / references / provenance) |
| QD-S-3.4 Undefined Task Scope (non_goals) | PASS | §1 "It is **not**" list explicitly declares non-goals (not the CLI; not a security/quality gate; not a repair tool; not a runtime auditor) |
| QD-S-3.6 Metadata Expression Defects | PASS | `name` and `description` match package behavior; description states trigger scenarios ("inspect, audit, or check an agent's system prompt, skill definition, or tool schemas") |
| QD-S-4.1 Undefined Failure Behavior | PASS | §2 requires recording explicitly what is missing; Mode 2 defines blocking behavior; Gate-0 non-pass output is fully specified (§4 Stage C) |
| QD-S-1.1 Input Boundary Missing | ADVISORY (P2-level note) | No explicit size cap for user-supplied artifacts; input size is bounded by the host context window, not by the Skill definition |

## Full syntax check (all 6 files)

| File | Lines | Front matter | Code-fence parity | H2 sections |
| --- | --- | --- | --- | --- |
| SKILL.md | 171 | closed @4 | 4 marks, even | 9 |
| references/prompt-checklist.md | 152 | closed @3 | 0 marks | 5 |
| references/skill-checklist.md | 197 | closed @3 | 0 marks | 7 |
| references/tool-checklist.md | 106 | closed @3 | 0 marks | 7 |
| references/cross-checklist.md | 160 | closed @3 | 0 marks | 6 |
| references/relevance-map.md | 238 | closed @3 | 2 marks, even | 12 |

Cross-reference check: SKILL.md references `references/{prompt,skill,tool,cross}-checklist.md` and `references/relevance-map.md` — all 5 resolve to existing files.

## Findings summary

- **P0: 0 · P1: 0 · P2 advisory: 1** (QD-S-1.1 input-boundary note above).
- One gap was found and remediated **during drafting, before this round**: `references/skill-checklist.md` lacked a scoring note while SKILL.md §6.5 references "the checklist's stated deduction weights" — a Part 11 scoring note (weights 5:3:1) was added, then this self-check was run.
- Source-internal discrepancies discovered in the five source sub-specifications during extraction (e.g., prompt.md §3.3.3 "35 P0" vs. 34 in the §3.3.2 matrix and Appendix A; cross.md Appendix B.4 heading "11" vs. 9 table rows; tool.md two inline level assignments) are recorded as "source count notes" inside the respective checklist files without adjudication — they are observations about the source specifications, not defects of this package, and remediation belongs to the upstream specifications' maintainers.

## Round 1 status board

```
Stage A (Single-artifact):  Executed — QD-S baseline + selected categories on 6 files
Stage B (Cross):            Not Executed — package contains a single Skill artifact; no Prompt/Tool pairs to cross-check
Stage C (Gate-0):           Not Executed — Stage B not applicable
Stage D (Permission QD-PM): Not Executed — Stage B not applicable
Stage E (Impact outlook):   Executed (vacuous) — no rule-level FAIL recorded; no Impact Cards emitted
```

*This record was produced by the sanityops-inspect lite inspector itself (detect-only; no fixes were applied as part of this inspection round).*

---

# Round 2 — Permission checklist extraction (2026-10-06)

**Change trigger**: structural asymmetry review — of the five Inspect domains, four had dedicated condensed files while QD-PM content (Gate-0 + Quick Mode) was embedded in SKILL.md §4-C/§4-D with rule names only (no condensed definitions).

**Change made (restructuring only; no rule semantics changed)**:

- Added `references/permission-checklist.md` (142 lines), condensed from `inspect/permission.md` v1.0 (AC-L/OR-L definitions sourced to `framework/core.md` §4.2–§4.3): how-to-use/N-A discipline; AC-L1–L4 + OR-L1–L3 tables; the two binding rules; severity mapping R1–R5; classification-basis evidence format; §9.4.4 anti-patterns; Gate-0 nature, G0-1..G0-4 conditions, and the §9.2.4 "Not Executed" output block; the 12 Quick Mode items with per-item determination / applicability / **item-specific inline severity**; INHERITED relationships; mandatory declared-only scope statement.
- SKILL.md §4-C and §4-D slimmed from inline tables/block to flow skeletons that point to the new file's §2–§5; §3 "five files" → "six files"; §8 reference table now lists 6 references. SKILL.md 171 → 135 lines.

**Re-checked verdicts (changed surface)**:

| Rule | Verdict | Evidence |
| --- | --- | --- |
| QD-S-0.1 Required Field Presence | PASS | New file front matter carries `title` + `description` (L1–L4) |
| QD-S-0.2 Field Content Non-Empty | PASS | Both fields non-empty |
| QD-S-0.3 Syntax Parsability | PASS | Front matter closed at L4 |
| QD-S-0.5 No Conflicting Declarations | PASS | §8 table lists exactly the 6 files that exist (6/6); SKILL.md §4-C/§4-D pointers target sections that exist (permission-checklist §2/§3.2/§3.3/§4/§5); Gate-0 block and Quick Mode IDs now live in the new file and match permission.md §9.2.4 and Appendix D.1 |
| Content fidelity spot check | PASS | All 12 D.1 IDs present once (1.1, 1.3, 2.4, 3.3, 3.4, 4.2, 4.4, 4.8, 5.4, 5.7, 6.3, 6.5); fixed-P0 set matches R1 (3.4/5.4/6.3/6.5); item-specific severities captured verbatim (2.4 write/delete→P0, read-only→P1; 3.3 OR-L3-capable→P0 else P1; 4.4 AC-L4-only with OR-L2→P0 via R4; 4.8/5.7 conditional with OR-L3→P0 else P1; 1.3 circumvent-path grading; 6.5/4.2 INHERITED notes) |
| QD-S-1.1 Input Boundary Missing | ADVISORY unchanged | Same P2-level note as Round 1 |

**Syntax check (7/7 files after change)**:

| File | Lines | Front matter | Code-fence parity | H2 sections |
| --- | --- | --- | --- | --- |
| SKILL.md | 135 | closed @4 | 2 marks, even | 9 |
| references/prompt-checklist.md | 152 | closed @3 | 0 marks | 5 |
| references/skill-checklist.md | 197 | closed @3 | 0 marks | 7 |
| references/tool-checklist.md | 106 | closed @3 | 0 marks | 7 |
| references/cross-checklist.md | 160 | closed @3 | 0 marks | 6 |
| references/permission-checklist.md | 142 | closed @4 | 4 marks, even | 6 |
| references/relevance-map.md | 238 | closed @3 | 2 marks, even | 12 |

Cross-reference check: SKILL.md references `references/{prompt,skill,tool,cross,permission}-checklist.md` and `references/relevance-map.md` — all **6 resolve** to existing files; all intra-file section pointers (§2, §3.2, §3.3, §4, §5) resolve.

**Findings summary**: **P0: 0 · P1: 0 · P2 advisory: 1** (unchanged from Round 1). No rule semantics were added, removed, or adjudicated in this round; the Round 1 source-discrepancy notes remain open at their upstream specifications.

## Round 2 status board

```
Stage A (Single-artifact):  Executed — QD-S baseline re-run on changed surface (SKILL.md + new permission-checklist); 0 P0/P1
Stage B (Cross):            Not Executed — package contains a single Skill artifact; no Prompt/Tool pairs to cross-check
Stage C (Gate-0):           Not Executed — Stage B not applicable
Stage D (Permission QD-PM): Not Executed — Stage B not applicable
Stage E (Impact outlook):   Executed (vacuous) — no rule-level FAIL recorded; no Impact Cards emitted
```
