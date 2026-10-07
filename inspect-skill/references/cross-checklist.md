---
title: Inspect Cross Checklist (Lite)
description: "Condensed cross-artifact consistency checklist (QD-PS / QD-PT / QD-ST) for the sanityops-inspect lite inspector, extracted from inspect/cross.md v1.0."
---

# Cross-Artifact Consistency Checklist (Lite Inspector)

> **Provenance**: Condensed from `inspect/cross.md` v1.0 (SanityOps Framework, CC BY-SA 4.0). This file is a compressed extraction for the sanityops-inspect lite inspector and defines NO new rules. On any conflict, `inspect/cross.md` governs.

## How to Use

- **Entry precondition — upstream P0 must be clear first.** Cross runs only after single-artifact inspection has passed. Spec wording (cross.md §5.2.1): *"Inspection Entry Condition: Single-artifact inspection has passed, and no undisposed P0 defects remain."* If any upstream single-artifact P0 is unfixed, do **not** run this checklist: record the run as **"NOT EXECUTED due to unfixed upstream P0"** with remediation guidance — this is an execution status, **NOT a FAIL verdict**. The spec's own failure handling (§5.1.2, Step 1) is: *"Output remediation guidance; halt cross-artifact inspection"*.
- **Confirm artifact version consistency before starting** (§5.2.2): Prompt, Skill, and Tool version numbers, update timestamps, and sources must be consistent; if not, ask the user for confirmation before proceeding.
- **Determine the Agent tier (L1/L2/L3)** and run the corresponding scope (two layers, do not collapse them):
  1. **Evaluation scope — which items get a verdict** — per §5.4.3 inspection intensity, with item composition taken from the Appendix A applicability column in the tables below:
     - **L1 basic** = the 7 items marked applicable at L1 in Appendix A (QD-PS-1.1, QD-PS-1.3, QD-PT-2.1, QD-PT-2.2, QD-PT-2.4, QD-ST-3.1, QD-ST-3.6). Source gap: §5.4.3/§8.3.1 state "8 core items" but never enumerate the 8th item; the lite inspector evaluates the 7 explicitly applicable items and records the source gap — it must not invent an 8th item.
     - **L2 standard (12 items)** = QD-PS-1.1/1.2/1.3/1.4, QD-PT-2.1/2.2/2.3/2.4, QD-ST-3.1/3.2/3.3/3.6.
     - **L3 full (19 items)** = all items in Appendix A below.
  2. **Blocking core — which FAILs block release** — the tier's Appendix B P0 minimum set (L1 = 4, L2 = 6, L3 = 9 rows in the B.4 table under an "11 items" heading), plus any item whose severity is upgraded to P0 by Appendix C. Items evaluated at P1/P2 do not block but must still be reported. The source-internal discrepancies between Appendix A applicability, the §8.3.1 statistics (8/12/19 with 4-3-1 / 6-5-1 / 11-6-2 splits), and Appendix B are documented in the note under Appendix B; this file does not adjudicate them.
- **Inspect only cross-artifact relationships** — the three pairs defined by the spec (§0.1.5): QD-PS (Prompt → Skill), QD-PT (Prompt → Tool), QD-ST (Skill ↔ Tool). Do not re-check single-artifact internal defects already owned by QD-P / QD-S / QD-T.
- **For each rule, output: rule ID + verdict (PASS / FAIL with severity) + evidence quoting BOTH artifact locations** (three-tier localization: relationship level → artifact level → field level, cross.md §6.1.1).
- **Apply default severities from Appendix A**, then apply the severity upgrade rules (Appendix C) when the Tool is RS-3, the Skill is SS-3, the Agent is L3, or linked defects exist.
- **Verdict rule**: any P0 defect present → evaluation FAIL (Appendix B.1: *"Any P0 defect present → evaluation FAIL"*). A final report with unremediated P0 defects must follow Step 7: *"Output blocking report; require re-inspection after remediation"*.
- **Respect the scope exclusions** listed under "Does NOT Check" below — a Cross result says nothing about single-artifact internals, runtime behavior, or system-level permission enforcement.

## Appendix A — Complete Inspection Item List (19 items)

Default severity and per-level applicability are reproduced from `inspect/cross.md` Appendix A. "A applies at" is the Appendix A applicability mark (the tiers at which the item gets a verdict); "B blocking core" marks the tiers whose Appendix B minimum P0 set includes the item.

### QD-PS — Prompt → Skill (6 items)

| ID | Rule name | Definition (condensed) | Typical manifestation | Level | A applies at | B blocking core |
| --- | --- | --- | --- | --- | --- | --- |
| QD-PS-1.1 | Skill Authorization Consistency | Whether the available Skills declared in the Prompt match the defined Skills (whether a Skill is defined but outside the Prompt's authorization scope) | Skill defined but not authorized by Prompt | P0 | L1/L2/L3 | L1/L2/L3 |
| QD-PS-1.2 | Trigger Condition Consistency | Whether the Prompt workflow's trigger conditions match the Skill's TRIGGER dimension (allowed_when / forbidden_when) | Trigger conditions inconsistent or contradictory | P1 | L2/L3 | — |
| QD-PS-1.3 | Permission Boundary Consistency | Whether the permission scope authorized by the Prompt covers the Skill's allowed_operations | Skill permissions exceed Prompt authorization | P0 | L1/L2/L3 | L1/L2/L3 |
| QD-PS-1.4 | Resource Access Consistency | Whether the resources declared by the Prompt align with the Skill's allowed_resources | Skill resources exceed Prompt authorization | P1 | L2/L3 | — |
| QD-PS-1.5 | Failure Handling Consistency | Whether the Prompt's exception handling strategy aligns with the Skill's FAILURE dimension (on_empty_input, on_insufficient_input, forbidden_behaviors) | Failure handling strategy contradiction | P1 | L3 | — |
| QD-PS-1.6 | Output Constraint Consistency | Whether the Prompt's output requirements are satisfied by the Skill's OUTPUT dimension (max_total_chars, format, partial_result_allowed) | Output constraints inconsistent | P2 | L3 | — |

### QD-PT — Prompt → Tool (6 items)

| ID | Rule name | Definition (condensed) | Typical manifestation | Level | A applies at | B blocking core |
| --- | --- | --- | --- | --- | --- | --- |
| QD-PT-2.1 | Tool Existence | Whether the Tools declared in the Prompt exist in the known Tool Schema list and names are consistent | Tool declared in Prompt does not exist | P0 | L1/L2/L3 | L1/L2/L3 |
| QD-PT-2.2 | Invocation Specification Consistency | Whether the Prompt's tool invocation specification (QD-P-2.4.3) matches the Tool's Schema (name, description, inputSchema) | Invocation method does not match Tool Schema | P0 | L1/L2/L3 | L2/L3 |
| QD-PT-2.3 | Parameter Constraint Consistency | Whether the Prompt's parameter constraints align with the Tool's inputSchema (required, properties, maxLength, pattern, etc.) | Parameter constraints inconsistent | P1 | L2/L3 | — |
| QD-PT-2.4 | Permission Granularity Consistency | Whether the Prompt's permission declarations match the Tool's Risk Level — high-risk Tools (RS-3) must have security boundary declarations in the Prompt | High-risk Tool has no security boundary declaration | P0 | L1/L2/L3 | L1/L2/L3 |
| QD-PT-2.5 | Error Handling Completeness | Whether the Prompt's exception handling covers all possible error types from the Tool (inferred from description and side effect documentation) | Does not cover all possible Tool errors | P1 | L3 | — |
| QD-PT-2.6 | Invocation Frequency Reasonableness | Whether the Prompt's invocation frequency limits are reasonable, in combination with the Tool's capabilities | Frequency limit missing or unreasonable | P2 | L3 | — |

### QD-ST — Skill ↔ Tool (7 items)

| ID | Rule name | Definition (condensed) | Typical manifestation | Level | A applies at | B blocking core |
| --- | --- | --- | --- | --- | --- | --- |
| QD-ST-3.1 | Tool Existence | Whether the Tools declared by the Skill (if any, in the EXECUTION dimension or allowed_downstream_skills) exist in the known Tool Schema list and names are consistent | Tool declared in Skill does not exist | P0 | L1/L2/L3 | L2/L3 |
| QD-ST-3.2 | Input Constraint Consistency | Whether the Skill's INPUT dimension constraints (max_items, format, if_exceeds) are supported by the Tool's inputSchema (maxLength, pattern, maxItems, etc.) | Skill input constraint not supported by Tool | P0 | L2/L3 | L3 |
| QD-ST-3.3 | Required Parameter Preparation | Whether the Tool's required parameters (inputSchema.required) have source declarations in the Skill (e.g., from user input or other tool output) | Tool required parameter has no source in Skill | P0 | L2/L3 | L3 |
| QD-ST-3.4 | Invocation Frequency Match | Whether the Skill's max_tool_calls (EXECUTION dimension) is reasonable, in combination with the Tool's capability scope | Frequency declaration missing or unreasonable | P2 | L3 | — |
| QD-ST-3.5 | Output Structure Match | Whether the Skill's OUTPUT dimension expectations (format, max_total_chars) match the Tool's return value structure (inferred from description or examples) | Skill output expectations do not match Tool return values | P1 | L3 | — |
| QD-ST-3.6 | Permission Scope Match | Whether the Skill's permission declarations (allowed_operations / forbidden_operations) cover the Tool's side effects (write operations, sensitive data handling) | Tool side effects exceed Skill permission declarations | P0 | L1/L2/L3 | L3 |
| QD-ST-3.7 | Error Handling Coverage | Whether the Skill's FAILURE dimension (on_empty_input, forbidden_behaviors) covers all possible error types from the Tool | Does not cover all possible Tool errors | P1 | L3 | — |

## Appendix B — Minimum Rule Sets (P0-only, tiered by Agent level)

Structure per `inspect/cross.md` Appendix B, verbatim tiering and counts. Core principles (B.1):

- L1 Minimum Rule Set ⊂ L2 Minimum Rule Set ⊂ L3 Minimum Rule Set
- Minimum Rule Sets contain only P0 inspection items
- Any P0 defect present → evaluation FAIL

**L1 Minimum Rule Set (4 P0 Items)** — *"MUST pass the above 4 P0 inspection items."*

| ID | Inspection Item Name | Relationship |
| --- | --- | --- |
| QD-PS-1.1 | Skill Authorization Consistency | QD-PS |
| QD-PS-1.3 | Permission Boundary Consistency | QD-PS |
| QD-PT-2.1 | Tool Existence | QD-PT |
| QD-PT-2.4 | Permission Granularity Consistency | QD-PT |

**L2 Minimum Rule Set (6 P0 Items)** — *"MUST pass the above 6 P0 inspection items (includes L1's 4 items)."*

| ID | Inspection Item Name | Relationship |
| --- | --- | --- |
| QD-PS-1.1 | Skill Authorization Consistency | QD-PS |
| QD-PS-1.3 | Permission Boundary Consistency | QD-PS |
| QD-PT-2.1 | Tool Existence | QD-PT |
| QD-PT-2.2 | Invocation Specification Consistency | QD-PT |
| QD-PT-2.4 | Permission Granularity Consistency | QD-PT |
| QD-ST-3.1 | Tool Existence | QD-ST |

**L3 Minimum Rule Set (11 P0 Items)** — *"MUST pass the above 11 P0 inspection items (includes L2's 6 items)."*

| ID | Inspection Item Name | Relationship |
| --- | --- | --- |
| QD-PS-1.1 | Skill Authorization Consistency | QD-PS |
| QD-PS-1.3 | Permission Boundary Consistency | QD-PS |
| QD-PT-2.1 | Tool Existence | QD-PT |
| QD-PT-2.2 | Invocation Specification Consistency | QD-PT |
| QD-PT-2.4 | Permission Granularity Consistency | QD-PT |
| QD-ST-3.1 | Tool Existence | QD-ST |
| QD-ST-3.2 | Input Constraint Consistency | QD-ST |
| QD-ST-3.3 | Required Parameter Preparation | QD-ST |
| QD-ST-3.6 | Permission Scope Match | QD-ST |

> **Source count note** (reproduced, not adjudicated): four source-internal discrepancies coexist — (a) the B.4 heading and compliance line state "11 P0 Items", but the B.4 table lists 9 rows, which are exactly the 9 items carrying default P0 in Appendix A; (b) §5.4.3/§8.3.1 state per-level inspection intensity as 8 (L1) / 12 (L2) / 19 (L3) items, while Appendix B minimum sets are P0-only (4 / 6 / heading-11); (c) the Appendix A applicability marks enumerate 7 items at L1 (all default P0) and 12 at L2 (9 P0 / 3 P1), whereas §8.3.1 splits the same tiers as 4 P0/3 P1/1 P2 and 6 P0/5 P1/1 P2; (d) §8.3.1 counts 11 P0 at L3 but Appendix A lists 9 default P0 (and applying Appendix C's blanket "L3: P1→P0" would yield 16, not 11). The lite inspector evaluates the Appendix A-applicable items, applies Appendix C upgrades as written, and treats Appendix B as the blocking core; it does not adjudicate these discrepancies — defer to `inspect/cross.md`.

## Scoring note (§8.3, optional)

Source weights per the §8.3.1 statistics table: **L1** W = 5×4 + 3×3 + 1×1 = **30**, base = 100/30 ≈ **3.333**; **L2** W = 5×6 + 3×5 + 1×1 = **46**, base = 100/46 ≈ **2.174**; **L3** W = 5×11 + 3×6 + 1×2 = **75**, base = 100/75 ≈ **1.333**. Per failed item deduct base × 5 / 3 / 1 (once per item regardless of instance count); any P0 → FAIL (score still output). **These statistics are not derivable from Appendix A + Appendix C as written (see source count note)**; compute an indicative score only if the user asks, use the source's §8.3.1 values verbatim, and label it "indicative (lite minimal set), not the full-spec score".

## Inspection Process (cross.md Part 5.1.1 — Seven Steps)

1. **Prerequisite Verification** — Confirm all three artifacts passed their single-artifact inspections with no undisposed P0, and versions are consistent. Entry condition (§5.2.1, verbatim): *"Inspection Entry Condition: Single-artifact inspection has passed, and no undisposed P0 defects remain."* On failure: *"Output remediation guidance; halt cross-artifact inspection"* — a run stopped here is "NOT EXECUTED due to unfixed upstream P0", not a FAIL.
2. **Artifact Relationship Identification** — Extract the Skill and Tool declaration lists: from the Prompt's QD-P-2.4.2 resource/tool declaration section, and from the Skill's EXECUTION dimension (allowed_downstream_skills). If extraction fails, flag the missing declaration and continue with an advisory.
3. **QD-PS Check (Prompt → Skill)** — Run QD-PS-1.1 through 1.6 item-by-item; record inconsistencies mapped to specific locations in both the Prompt and the Skill.
4. **QD-ST Check (Skill ↔ Tool)** — Run QD-ST-3.1 through 3.7; map findings to Skill and Tool locations.
5. **QD-PT Check (Prompt → Tool)** — Run QD-PT-2.1 through 2.6; map findings to Prompt and Tool locations.
6. **Impact Assessment** — Identify linked defects (defects involving multiple artifacts); upgrade severity where applicable and adjust remediation priority.
7. **Output Report** — Produce the defect list and remediation guidance. If unremediated P0 defects remain (§5.1.2, Step 7, verbatim): *"Output blocking report; require re-inspection after remediation"*.

## Severity and Level Tables

**Defect severity** (cross.md §5.4.1, as defined in Inspect Skill v1.0):

| Level | Symbol | Definition | Disposition Priority |
| --- | --- | --- | --- |
| P0 | 🔴 | Prevents Agent functionality or introduces security risk | MUST be fixed |
| P1 | 🟡 | May cause behavioral instability or functional defects | SHOULD be fixed |
| P2 | 🟢 | Affects readability or efficiency, but does not impact functionality | MAY be fixed |

**Agent complexity levels** (cross.md §5.4.2, as defined in Inspect Prompt v1.0):

| Level | Name | Definition |
| --- | --- | --- |
| L1 | Single-turn Task | Single invocation completes the task; no state retention |
| L2 | Multi-turn Interactive | Requires multi-turn dialogue or simple tool invocations |
| L3 | Complex Agent | Complex workflow, multi-tool collaboration, strong constraints |

**Severity upgrade triggers** (cross.md Appendix C.1):

| Trigger Condition | Upgrade Rule |
| --- | --- |
| Tool is RS-3 | Associated inspection items P1→P0 |
| Skill is SS-3 | Associated inspection items P1→P0 |
| Agent is L3 | Global P2→P1, P1→P0 |
| Linked defect | Associated inspection items may upgrade |
| Cross-Skill/Tool | Associated inspection items P1→P0 |

Per-item upgrade mapping (Appendix C.2) — applies only to these 7 upgradable items:

| Inspection Item | Default | RS-3/SS-3 | L3 Agent | Linked Defect |
| --- | --- | --- | --- | --- |
| QD-PS-1.2 | P1 | P0 | P0 | P0 |
| QD-PS-1.4 | P1 | P0 | P0 | P1 |
| QD-PS-1.5 | P1 | P1 | P0 | P1 |
| QD-PT-2.3 | P1 | P0 | P0 | P1 |
| QD-PT-2.5 | P1 | P1 | P0 | P1 |
| QD-ST-3.5 | P1 | P0 | P0 | P1 |
| QD-ST-3.7 | P1 | P0 | P0 | P1 |

## Does NOT Check (Scope Exclusions, cross.md's Own Wording)

- *"it does not duplicate the inspection content of Inspect Prompt, Inspect Tool, or Inspect Skill"* (§0.1.2) — no re-checking of single-artifact internal defects already owned by QD-P / QD-S / QD-T.
- *"It does not re-discover defects already covered by single-artifact inspection"* (§0.1.3) — Cross focuses on **Hidden Defects Under Reasonable Expression**: each artifact individually valid, but semantic conflicts or constraint gaps emerge when combined.
- *"it does not prescribe how to design 'good' cross-artifact relationships"* (§0.1.2) — not a development guide.
- *"it does not address cross-artifact behavior monitoring during Agent execution"* / *"It does not cover dynamic monitoring of cross-artifact behavior at runtime"* (§0.1.2 / §0.1.3) — no runtime behavior monitoring.
- *"it does not replace system-level permission control mechanisms"* (§0.1.2) — not a permission management specification.
- Tool/Skill existence checks are declaration-only: *"Static inspection only verifies 'declaration existence.' Runtime verification of 'actual availability' occurs during Risk Implicit validation."* (notes to QD-PT-2.1 and QD-ST-3.1).
