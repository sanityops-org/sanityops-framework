---
title: Tool Schema Inspection Checklist (Lite)
description: "Condensed QD-T inspection checklist for the sanityops-inspect lite inspector: Tool risk tiering (L1/L2/L3), minimal rule sets per tier with defect levels, and the scoring note. Extracted from inspect/tool.md v1.0; defines no new rules."
---

# Tool Schema Inspection Checklist (QD-T, Lite)

> **Provenance**: Condensed from `inspect/tool.md` v1.0 (SanityOps Framework, CC BY-SA 4.0). This file is a compressed extraction for the sanityops-inspect lite inspector and defines NO new rules. On any conflict, `inspect/tool.md` governs.

## How to use

- **Tier the Tool first** (inspect/tool.md §3.1, §3.4.2): read-only with no state change → **L1**; creates/updates recoverable state → **L2**; irreversible or sensitive operations → **L3**. Determination basis: any write operation → **L2 minimum**; irreversible operations → **L3**; sensitive data → **L3**. State the determination in the report.
- **Run the tier's full checklist table** below. The tier tables are nested — the L2 table contains all L1 items, and the L3 table contains all L2 items — so running the tier's table covers the lower tiers automatically (Appendix A minimal sets match these tables: 7 / 12 / 16 items).
- **QD-T-1.x and QD-T-2.x are mechanical**: decide by direct schema reading only (field presence, `required` vs `properties`, enum contents, `additionalProperties`, length/format/boundary keywords). Per §1.4 these are JSON-Schema-validator-automatable.
- **Judgment items**: QD-T-3.1/3.4 and QD-T-4.1/4.2 require reading description semantics and tool relationships (marked *Human* in the spec); QD-T-3.2/3.3/3.5 and QD-T-4.3 are *Semi-automated* (keyword scanning + reasoning). Per §2.4, combine automated constraint checks with this review.
- **Output one verdict per rule** in the Stage-A contract form: `QD-T-x.y | PASS/FAIL | evidence: field path / JSON pointer / line`. Every FAIL must quote a short excerpt of the offending schema text.
- **Any P0 FAIL blocks downstream stages** (Mode 2): finish the Stage A report and mark later stages "Not Executed — not executed because upstream P0 findings are unfixed".
- **Must-pass vs recommended-pass** (Appendix A): in every tier, the tier's P0 items are the must-pass items; P1/P2 items are recommended-pass.
- The **Level column is tier-specific**: the same rule carries different levels at different tiers (defect-level upgrade rules, §3.2.2). Use the level shown in the tier's own table.

## Tool risk tiers (§3.1)

| Tier | Designation | Definition | Determination criteria | Typical tools |
| --- | --- | --- | --- | --- |
| **L1** | Low Risk | Read-only query; no state changes | Data-read operations only; no sensitive data; repeatable, no side effects; failure consequence = query failure only | `get_weather`, `get_current_time`, `search_products`, `list_orders` |
| **L2** | Medium Risk | State-changing; recoverable | Creates or updates data; changes recoverable or overwritable; may involve some sensitive data; failure consequence = data quality degradation requiring human intervention | `create_user`, `update_profile`, `send_notification`, `add_to_cart` |
| **L3** | High Risk | Irreversible / sensitive operations | Deletion, payment, permission change or similar; highly sensitive data; irreversible or hard to recover; failure consequence = data loss, financial loss, permission leaks | `delete_user`, `process_payment`, `grant_permission`, `transfer_data` |

## L1 (Low Risk) minimal set — 7 items (P0: 2, P1: 2, P2: 3)

| ID | Rule name | Definition (condensed) | Typical manifestation | Level | Method |
| --- | --- | --- | --- | --- | --- |
| QD-T-1.1 | Base Field Missing | Tool Schema missing required base fields: `name`, `description`, `inputSchema` (`outputSchema`, `metadata` are optional) | Object has `name` + `inputSchema` but no `description` | P0 | Automated |
| QD-T-1.2 | Required Field Inconsistency | `required` lists fields not present in `properties`, or required fields are not listed in `required` | `properties` has only `city`, but `required` is `["city","date"]` | P0 | Automated |
| QD-T-1.3 | Invalid Enum Constraints | `enum` definition invalid: empty values, duplicate values, or type inconsistencies | `"enum": ["active","inactive","active"]` — duplicate value | P1 | Automated |
| QD-T-1.4 | Uncontrolled additionalProperties | Object-type parameter does not explicitly declare `additionalProperties`, so arbitrary extra fields are accepted by default | Object schema with `properties` but no `"additionalProperties": false` | P1 | Automated |
| QD-T-2.1 | String Without Length Constraint | String-type parameter has no `maxLength`/`minLength` set | `{"type":"string","description":"User input content"}` with no length bounds | P2 | Automated |
| QD-T-2.3 | Number Without Boundary | Number-type parameter has no `minimum`/`maximum` (or `exclusiveMinimum`/`exclusiveMaximum`) set | `{"type":"number","description":"Payment amount"}` with no bounds | P2 | Automated |
| QD-T-4.1 | Insufficient Description Quality | Tool or parameter description is unclear, incomplete, or ambiguous | `"description": "Get data"` — overly vague | P2 | Semi-automated |

## L2 (Medium Risk) minimal set — 12 items (P0: 5, P1: 7, P2: 0)

| ID | Rule name | Definition (condensed) | Typical manifestation | Level | Method |
| --- | --- | --- | --- | --- | --- |
| QD-T-1.1 | Base Field Missing | Tool Schema missing required base fields: `name`, `description`, `inputSchema` | Object has `name` + `inputSchema` but no `description` | P0 | Automated |
| QD-T-1.2 | Required Field Inconsistency | `required` lists fields not present in `properties`, or required fields are not listed in `required` | `required` includes `"date"` but `date` is not defined in `properties` | P0 | Automated |
| QD-T-1.3 | Invalid Enum Constraints | `enum` definition invalid: empty values, duplicate values, or type inconsistencies | Duplicate values in an `enum` array | P0 | Automated |
| QD-T-1.4 | Uncontrolled additionalProperties | Object-type parameter does not explicitly declare `additionalProperties` | Object schema with no `additionalProperties` declaration | P0 | Automated |
| QD-T-2.1 | String Without Length Constraint | String-type parameter has no `maxLength`/`minLength` set | String parameter with no length bounds | P1 | Automated |
| QD-T-2.2 | String Without Format Constraint | String parameter requiring a specific format has no `pattern` or `format` set | `"email"` string parameter with no `"format": "email"` | P1 | Automated |
| QD-T-2.3 | Number Without Boundary | Number-type parameter has no `minimum`/`maximum` (or exclusive variants) set | Payment `amount` number with no bounds | P1 | Automated |
| QD-T-2.4 | Array Without Length Constraint | Array-type parameter has no `maxItems`/`minItems` set | `"ids"` array of strings with no item-count bounds | P1 | Automated |
| QD-T-3.1 | Write Operation Not Identified | Tool performing write operations does not explicitly state in its description that the operation will modify data | `"description": "Update user information"` with no write-operation notice (correct form appends an explicit "[This operation will modify data…]" statement) | P1 | Human |
| QD-T-3.2 | Raw Input Passthrough | Tool accepts raw user input and passes it directly to backend systems | `execute_query` taking a free-form `query` string (correct form uses structured, enum-constrained fields such as `table`/`field`) | P0 | Semi-automated |
| QD-T-4.1 | Insufficient Description Quality | Tool or parameter description is unclear, incomplete, or ambiguous | `"description": "Get data"` | P1 | Semi-automated |
| QD-T-4.2 | Undeclared Side Effects | Execution produces side effects (e.g., sending emails, modifying data) not declared in the description | `submit_form` described only as "Submit form", without declaring the confirmation email it sends | P1 | Human |

## L3 (High Risk) minimal set — 16 items (P0: 14, P1: 2, P2: 0)

| ID | Rule name | Definition (condensed) | Typical manifestation | Level | Method |
| --- | --- | --- | --- | --- | --- |
| QD-T-1.1 | Base Field Missing | Tool Schema missing required base fields: `name`, `description`, `inputSchema` | Missing `description` field | P0 | Automated |
| QD-T-1.2 | Required Field Inconsistency | `required` lists fields not present in `properties`, or required fields are not listed in `required` | `required` references an undefined property | P0 | Automated |
| QD-T-1.3 | Invalid Enum Constraints | `enum` definition invalid: empty values, duplicate values, or type inconsistencies | Duplicate values in an `enum` array | P0 | Automated |
| QD-T-1.4 | Uncontrolled additionalProperties | Object-type parameter does not explicitly declare `additionalProperties` | Object schema with no `additionalProperties` declaration | P0 | Automated |
| QD-T-2.1 | String Without Length Constraint | String-type parameter has no `maxLength`/`minLength` set | String parameter with no length bounds | P0 | Automated |
| QD-T-2.2 | String Without Format Constraint | String parameter requiring a specific format has no `pattern` or `format` set | `email` parameter with no format/pattern | P1 | Automated |
| QD-T-2.3 | Number Without Boundary | Number-type parameter has no `minimum`/`maximum` (or exclusive variants) set | Payment `amount` with no bounds | P0 | Automated |
| QD-T-2.4 | Array Without Length Constraint | Array-type parameter has no `maxItems`/`minItems` set | ID array with no item-count bounds | P0 | Automated |
| QD-T-3.1 | Write Operation Not Identified | Tool performing write operations does not explicitly state in its description that the operation will modify data | Update/delete-style description with no write-operation notice | P0 | Human |
| QD-T-3.2 | Raw Input Passthrough | Tool accepts raw user input and passes it directly to backend systems | Free-form `query` string passed through to execution | P0 | Semi-automated |
| QD-T-3.3 | Batch Operation Without Limit | Batch-operation Tool sets no limit on operation quantity | `delete_users` taking a `user_ids` array without `maxItems` (correct form: `maxItems: 10`, limit stated in description) | P0 | Semi-automated |
| QD-T-3.4 | Internal Parameter Exposure | Tool exposes parameters that should be controlled internally by the system, such as `tenantId`, `admin`, `token` | `create_user` exposing `tenantId` and `isAdmin` in `properties` (correct form: taken from context / prohibited via Tool) | P0 | Human |
| QD-T-3.5 | Cross-Tool Data Flow Risk | One Tool's output may be used by the LLM as another Tool's input, causing unintended data flow | `get_user_email(user_id)` output fed into `send_notification(email, message)` (correct form: mask sensitive fields, or take `user_id` and resolve the email internally) | P0 | Semi-automated |
| QD-T-4.1 | Insufficient Description Quality | Tool or parameter description is unclear, incomplete, or ambiguous | `"description": "Get data"` | P0 | Semi-automated |
| QD-T-4.2 | Undeclared Side Effects | Execution produces side effects (e.g., sending emails, modifying data) not declared in the description | Form submission silently sending a confirmation email | P0 | Human |
| QD-T-4.3 | Multi-Tool Semantic Competition | Multiple Tools have semantically similar names or descriptions, making it difficult for the LLM to distinguish them | `get_user` vs `get_user_info` with near-identical descriptions | P1 | Semi-automated |

## Appendix B index — QD-T complete numbering (inspect/tool.md)

| ID | Defect name | Category | Base level | Applies to |
| --- | --- | --- | --- | --- |
| QD-T-1.1 | Base Field Missing | Structural Validity | P0 | L1/L2/L3 |
| QD-T-1.2 | Required Field Inconsistency | Structural Validity | P0 | L1/L2/L3 |
| QD-T-1.3 | Invalid Enum Constraints | Structural Validity | P1 | L1/L2/L3 |
| QD-T-1.4 | Uncontrolled additionalProperties | Structural Validity | P1 | L1/L2/L3 |
| QD-T-2.1 | String Without Length Constraint | Parameter Constraints | P1 | L2/L3 |
| QD-T-2.2 | String Without Format Constraint | Parameter Constraints | P1 | L2/L3 |
| QD-T-2.3 | Number Without Boundary | Parameter Constraints | P1 | L2/L3 |
| QD-T-2.4 | Array Without Length Constraint | Parameter Constraints | P1 | L2/L3 |
| QD-T-3.1 | Write Operation Not Identified | High-Risk Operations | P1 | L2/L3 |
| QD-T-3.2 | Raw Input Passthrough | High-Risk Operations | P0 | L2/L3 |
| QD-T-3.3 | Batch Operation Without Limit | High-Risk Operations | P0 | L3 |
| QD-T-3.4 | Internal Parameter Exposure | High-Risk Operations | P0 | L3 |
| QD-T-3.5 | Cross-Tool Data Flow Risk | High-Risk Operations | P0 | L3 |
| QD-T-4.1 | Insufficient Description Quality | Semantic Clarity | P1 | L2/L3 |
| QD-T-4.2 | Undeclared Side Effects | Semantic Clarity | P1 | L2/L3 |
| QD-T-4.3 | Multi-Tool Semantic Competition | Semantic Clarity | P1 | L2/L3 |
| QD-T-5.1 | Breaking Change Determination | Schema Changes | P0 | L2/L3 |
| QD-T-5.2 | Change Impact Assessment | Schema Changes | P1 | L2/L3 |

> QD-T-5.x belong to Part 4 (Schema Change and Compatibility Inspection) and are **outside the lite minimal sets** above — do not emit them in Stage A verdicts.

## Scoring note (§5, optional)

Weights P0:P1:P2 = 5:3:1; Total Weight = (tier P0 count × 5) + (P1 × 3) + (P2 × 1) → L1 = 19, L2 = 44, L3 = 76; Base Score = 100 / Total Weight (≈5.2632 / 2.2727 / 1.3158).

Per failed item deduct Base × 5 / 3 / 1 (highest severity, once per item regardless of instance count); Score = max(100 − deductions, 0); **any P0 → FAIL** (score still output). Compute an indicative score only if the user asks, and label it "indicative (lite minimal set), not the full-spec score".

> **Source arithmetic note** (reproduced verbatim, not corrected): `inspect/tool.md` §5.2 states the L2 total as **44** and base 100/44 ≈ 2.2727, although 5×5 + 7×3 = **46** arithmetically. The lite inspector uses the source's published value (44) verbatim — it defines no new rules and does not silently "fix" source numbers; on conflict `inspect/tool.md` governs.
