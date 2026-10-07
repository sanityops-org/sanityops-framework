---
title: Skill Inspection Checklist (Lite Inspector)
description: Condensed QD-S checklist for the sanityops-inspect lite inspector — QD-S-0 baseline gate, L1/L2/L3 minimum rule sets, the L1 mandatory checklist, the six-step inspection flow, and the six-dimension Review Schema, extracted from inspect/skill.md v1.0. Defines no new rules.
---

> Condensed from `inspect/skill.md` v1.0 (SanityOps Framework, CC BY-SA 4.0). This file is a compressed extraction for the sanityops-inspect lite inspector and defines NO new rules. On any conflict, `inspect/skill.md` governs.

# Skill Inspection Checklist (QD-S)

## 1. How to use

- **Run the QD-S-0 baseline FIRST.** It is the entry gate: if any of the six baseline items fails, output the failed items with remediation guidance and **stop** — the Skill does not proceed to QD-S-1 through QD-S-5 inspection (source §7.3.1).
- **Determine the Skill risk level (L1/L2/L3) next** (Step 2 below), then apply **only** the matching minimum rule set from Section 4. Items outside the applicable minimum set are out of the lite scope — never emit IDs that are not in this file.
- **One verdict line per rule**: `QD-S-x.y | PASS/FAIL | evidence: file, section/line`. Every FAIL must quote the offending artifact text (short verbatim excerpt). Mark a rule FAIL only when its definition is met; do not infer defects beyond the definition.
- **Severity semantics** (source §0.2.4): **P0** (blocking) — MUST NOT release, MUST be fixed; any P0 finding blocks downstream stages of the lite inspection flow. **P1** (warning) — strongly recommended to fix. **P2** (advisory) — recommended to fix, MAY release.
- **Risk-level semantics** (source §0.2.3): **L1** = text-processing only, no tool invocations; **L2** = resource access, may involve sensitive data; **L3** = operation execution, irreversible operations.
- **Human-judgment rules** (QD-S-3.x, QD-S-4.x, QD-S-5.x, and QD-S-1.4 per Appendix A) are evaluated through the Part 8 Review Schema gap analysis (Section 6) plus **Inferential Verification** — static reasoning that demonstrates the defect risk and remediation effectiveness (source §0.2.1).
- **The final Skill report is organized by the six Review Schema dimensions** (IDENTITY / TRIGGER / INPUT / EXECUTION / OUTPUT / FAILURE, Section 6), followed by a defect list sorted by priority — P0 findings first — mirroring the source's Step 6 output (§7.3.6).

## 2. QD-S-0 Baseline Compliance (entry gate) — 6 items

All six items are **MUST pass** and are checked by automated structural inspection (source Appendix A; §7.3.1, §7.3.4). A PASS on all six is required before any QD-S-1 through QD-S-5 rule is evaluated.

| ID | Name | Definition (condensed faithfully) | Typical manifestation | Level |
| --- | --- | --- | --- | --- |
| QD-S-0.1 | Required Field Presence | All fields required by the Skill definition format are present. | A required field such as `name` is missing (source example: "QD-S-0.1: name field missing"). | MUST pass |
| QD-S-0.2 | Field Content Non-Empty | Each required field, once present, carries non-empty content. | A required field is present but empty. | MUST pass |
| QD-S-0.3 | Syntax Parsability | The Skill definition parses as valid syntax (e.g., the platform's YAML front matter). | A syntax error such as missing quotes on a YAML line (source example). | MUST pass |
| QD-S-0.4 | Field Type Validity | Each field's value matches the expected type of that field. | A field holds a value whose type does not match the field's expectation. | MUST pass |
| QD-S-0.5 | No Conflicting Declarations | The definition contains no declarations that contradict each other. | Two or more declarations in the definition are mutually contradictory. | MUST pass |
| QD-S-0.6 | Minimum Structural Completeness | The definition meets the minimum structural completeness required of a Skill definition. | The definition is missing minimum structural elements expected of a Skill definition. | MUST pass |

> Source note: `inspect/skill.md` defines QD-S-0.1–0.6 by name, category ("Baseline Compliance"), and a MUST-pass requirement (Appendix A), plus the automated structural checks and failure examples in §7.3.1/§7.3.4; it contains no per-item prose definitions. The Definition column above is a direct expansion of each official item name — no new rules are introduced.

## 3. Defect levels and risk levels (reference)

**Defect levels (P)** — source §0.2.4:

| Level | Meaning | Release recommendation |
| --- | --- | --- |
| P0 🔴 | Blocking: a directly realizable resource runaway or behavioral overflow path exists | MUST NOT release; MUST be fixed |
| P1 🟡 | Warning: defect impacts behavioral quality; predictable unintended behavior exists | Strongly recommended to fix |
| P2 🟢 | Advisory: minor specification compliance issue | Recommended to fix; MAY release |

**Skill risk levels (L)** — source §0.2.3:

| Level | Designation | Definition |
| --- | --- | --- |
| L1 | Low Risk | Text-processing only; no tool invocations |
| L2 | Medium Risk | Resource access; may involve sensitive data |
| L3 | High Risk | Operation execution; irreversible operations |

## 4. Minimum rule sets (Appendix B, L1/L2/L3 tiers)

Rule names are verbatim from Appendix A ("QD-S Complete Numbering Index"); the Level column gives the rule's defect level **at that tier**. Apply only the tier matching the determined Skill risk level.

### 4.1 L1 (Low Risk) minimum rule set

**Must-pass item**: QD-S-0 (Baseline Compliance — Section 2).

**Mandatory inspection items** (6):

| ID | Name | Definition (condensed faithfully) | Typical manifestation | Level |
| --- | --- | --- | --- | --- |
| QD-S-1.1 | Input Boundary Missing | No upper limit declared on the number or size of inputs, allowing unbounded input. | User submits far more items than intended (e.g., 1,000 records) and the LLM processes all of them; token consumption and cost run away. | P1 |
| QD-S-1.2 | Output Size Missing | No upper limit declared on output size, potentially causing output bloat or Context Window overflow. | Ten 50KB documents produce a 500KB summary; the response body explodes and the context window overflows. | P1 |
| QD-S-2.1 | Unbounded Quantity Declaration | Uses unbounded words such as `all / every / entire / complete` without a corresponding quantity limit. | "Process all work notes" with no cap — the LLM pursues exhaustive processing; tokens run away. | P1 |
| QD-S-3.4 | Undefined Task Scope | Missing `non_goals` declaration — does not state what the Skill does NOT do; the LLM expands task boundaries on its own. | "Help users improve their weekly reports" is read as permission to modify content or add analysis; task scope exceeds expectations. | P0 |
| QD-S-4.1 | Undefined Failure Behavior | Does not declare how to handle execution failure; the LLM may explore alternative paths on its own. | After a failed query, the LLM retries with other conditions or relaxes filters; may expand query scope, causing unauthorized access. | P1 |
| QD-S-3.6 | Metadata Expression Defects | `name` or `description` is overly broad, inaccurate, or inconsistent with the body; the LLM misunderstands the Skill's capabilities at the trigger stage. | `name: "database-manager"` vs. description "read-only" — the LLM infers write capability from the name and executes write operations. | P1 |

**Optional items** (recommended but not required):

| ID | Name | Definition (condensed faithfully) | Typical manifestation | Level |
| --- | --- | --- | --- | --- |
| QD-S-3.1 | Vague Trigger Conditions | Activation conditions are overly broad; multiple unrelated intents can trigger the Skill. | "Use this Skill when the user needs help" — almost any request can trigger it; mis-triggering in inappropriate scenarios. | P1 |
| QD-S-3.2 | Missing Deactivation Conditions | Does not declare when the Skill should NOT be triggered; the LLM forcibly activates it in edge scenarios. | "Handle user data requests" without refusal conditions — activated for privacy/system data requests; unauthorized access or privacy leaks. | P2 |
| QD-S-3.3 | Missing Ambiguous Input Handling | Does not declare how to handle incomplete or malformed input; the LLM tends to auto-complete or infer. | Notes are insufficient — the LLM fabricates content to complete the weekly report; false data. | P1 |

> Source note: Appendix B groups these three optional items under "Optional Items (P2)", while Appendix A and the per-rule Severity blocks assign L1 levels QD-S-3.1 = P1, QD-S-3.2 = P2, QD-S-3.3 = P1. The per-rule Level column follows Appendix A; the optional (not required) grouping follows Appendix B.

### 4.2 L2 (Medium Risk) minimum rule set

**Must-pass item**: QD-S-0 (Baseline Compliance — Section 2).

**Mandatory inspection items** (6, all P0):

| ID | Name | Definition (condensed faithfully) | Typical manifestation | Level |
| --- | --- | --- | --- | --- |
| QD-S-1.1 | Input Boundary Missing | No upper limit declared on the number or size of inputs, allowing unbounded input. | User submits far more items than intended and the LLM processes all of them; token consumption and cost run away. | P0 |
| QD-S-1.3 | Execution Resource Boundary Missing | The Skill involves tool invocations or retries but declares no retry count, tool-invocation count, or execution timeout. | "Keep trying" with no termination condition — infinite retries and tool invocations; costs run away. | P0 |
| QD-S-2.1 | Unbounded Quantity Declaration | Uses unbounded words such as `all / every / entire / complete` without a corresponding quantity limit. | "Process all work notes" with no cap — the LLM pursues exhaustive processing; tokens run away. | P0 |
| QD-S-2.2 | Unterminated Execution Declaration | Uses `keep trying / until success / ensure complete / persist until` without defining a termination condition. | "Until success" with no failure threshold — the LLM enters an infinite retry loop; costs run away. | P0 |
| QD-S-3.4 | Undefined Task Scope | Missing `non_goals` declaration — does not state what the Skill does NOT do; the LLM expands task boundaries on its own. | "Help users improve their weekly reports" is read as permission to modify content or add analysis; task scope exceeds expectations. | P0 |
| QD-S-4.1 | Undefined Failure Behavior | Does not declare how to handle execution failure; the LLM may explore alternative paths on its own. | After a failed query, the LLM retries with other conditions or relaxes filters; may expand query scope, causing unauthorized access. | P0 |

**Recommended remediation items** (14, P1):

| ID | Name | Definition (condensed faithfully) | Typical manifestation | Level |
| --- | --- | --- | --- | --- |
| QD-S-1.2 | Output Size Missing | No upper limit declared on output size, potentially causing output bloat or Context Window overflow. | Ten 50KB documents produce a 500KB summary; the response body explodes. | P1 |
| QD-S-1.4 | Permission Boundary Missing | No explicit distinction between read/write/delete permission types, and no declaration of prohibited operation types. | Broad capability text ("assist with database issues") is read as implicit authorization; the LLM executes delete operations. | P1 |
| QD-S-1.5 | Data Source Boundary Missing | No permitted or prohibited data sources declared; the LLM may collect data from conversation history or external systems on its own. | The LLM pulls information from conversation history or public databases; data leaks, unauthorized access. | P1 |
| QD-S-2.3 | Open-Ended Enumeration in Structure | Output or functional structures use open-ended enumerations such as "etc.", "and others", "such as", allowing the LLM to add items on its own. | "…problems, etc." — the LLM adds unrequested sections such as "risk analysis", "personal growth". | P1 |
| QD-S-2.4 | Broad Capability Verbs | Uses broad verbs such as `manage / handle / coordinate / automate / process / address` without excluding application scenarios via `non_goals`. | "Handle payroll matters" is read as including modification; the LLM executes overflow operations. | P1 |
| QD-S-3.1 | Vague Trigger Conditions | Activation conditions are overly broad; multiple unrelated intents can trigger the Skill. | "Use this Skill when the user needs help" — almost any request can trigger it. | P1 |
| QD-S-3.2 | Missing Deactivation Conditions | Does not declare when the Skill should NOT be triggered; the LLM forcibly activates it in edge scenarios. | Activated for privacy/system data requests; unauthorized access or privacy leaks. | P1 |
| QD-S-3.3 | Missing Ambiguous Input Handling | Does not declare how to handle incomplete or malformed input; the LLM tends to auto-complete or infer. | Insufficient notes — the LLM fabricates content; false data. | P1 |
| QD-S-3.6 | Metadata Expression Defects | `name` or `description` is overly broad, inaccurate, or inconsistent with the body; the LLM misunderstands capabilities at the trigger stage. | Name implies management capability while description says read-only — the LLM infers writes from the name. | P1 |
| QD-S-4.2 | Undeclared Partial Completion Legitimacy | Does not declare whether "partial completion is acceptable"; the LLM may forcibly pursue completeness, entering infinite iterations. | "Generate a complete weekly report" with insufficient section data — forced filling of all sections; fabricated content or infinite rewriting. | P1 |
| QD-S-4.3 | Missing Post-Failure Prohibited Behaviors | Does not explicitly state what behaviors are prohibited after failure; the LLM decides on its own to lower standards or expand scope. | After diagnosis failure, the LLM expands the operation scope "to solve the problem"; overflow operations or false data. | P1 |
| QD-S-5.1 | Read/Write/Delete Not Distinguished | The Skill declares it can operate on data but does not distinguish read, modify, and delete permission scopes. | "Manage user data" — deletion is read as a reasonable way to "manage data"; irreversible operations are executed. | P1 |
| QD-S-5.3 | Undeclared Environment Boundaries | Does not declare that operating on production environments is prohibited, or does not specify the permitted operational environments. | The production database is treated as a legitimate diagnostic target; diagnostics run against production and affect services. | P1 |
| QD-S-5.4 | Undeclared Chained Invocation Permissions | Allows invoking other Skills but does not declare the permitted/prohibited downstream Skill scope. | A low-permission Skill invokes a high-permission Skill — privilege escalation; indirect execution of high-permission operations. | P1 |

> Source note: Appendix A assigns QD-S-3.5 (Undeclared Default Behavior) an L2 level of P1, but Appendix B's L2 set does not list it. The omission is the source's own scoping decision; this file reproduces Appendix B as written.

### 4.3 L3 (High Risk) minimum rule set

**Must-pass item**: QD-S-0 (Baseline Compliance — Section 2).

**Mandatory inspection items** (21):

| ID | Name | Definition (condensed faithfully) | Typical manifestation | Level |
| --- | --- | --- | --- | --- |
| QD-S-1.1 | Input Boundary Missing | No upper limit declared on the number or size of inputs, allowing unbounded input. | Unbounded input processed in full; token consumption and cost run away. | P0 |
| QD-S-1.2 | Output Size Missing | No upper limit declared on output size, potentially causing output bloat or Context Window overflow. | Response body explodes; context window overflows. | P0 |
| QD-S-1.3 | Execution Resource Boundary Missing | The Skill involves tool invocations or retries but declares no retry count, tool-invocation count, or execution timeout. | "Keep trying" with no termination condition — infinite retries and tool invocations. | P0 |
| QD-S-1.4 | Permission Boundary Missing | No explicit distinction between read/write/delete permission types, and no declaration of prohibited operation types. | Broad capability text is read as implicit authorization; the LLM executes delete operations. | P0 |
| QD-S-1.5 | Data Source Boundary Missing | No permitted or prohibited data sources declared; the LLM may collect data from conversation history or external systems on its own. | The LLM pulls data from conversation history or external systems; data leaks, unauthorized access. | P1 |
| QD-S-2.1 | Unbounded Quantity Declaration | Uses unbounded words such as `all / every / entire / complete` without a corresponding quantity limit. | Exhaustive processing of "all" items; tokens run away. | P0 |
| QD-S-2.2 | Unterminated Execution Declaration | Uses `keep trying / until success / ensure complete / persist until` without defining a termination condition. | Infinite retry loop; costs run away. | P0 |
| QD-S-2.3 | Open-Ended Enumeration in Structure | Output or functional structures use open-ended enumerations such as "etc.", "and others", "such as", allowing the LLM to add items on its own. | The LLM adds unrequested sections or items. | P0 |
| QD-S-2.4 | Broad Capability Verbs | Uses broad verbs such as `manage / handle / coordinate / automate / process / address` without excluding application scenarios via `non_goals`. | Broad verbs are read as authorization for all related operations; overflow operations executed. | P0 |
| QD-S-3.1 | Vague Trigger Conditions | Activation conditions are overly broad; multiple unrelated intents can trigger the Skill. | Almost any request can trigger the Skill; mis-triggering. | P0 |
| QD-S-3.2 | Missing Deactivation Conditions | Does not declare when the Skill should NOT be triggered; the LLM forcibly activates it in edge scenarios. | Forced activation for privacy/system data; unauthorized access or privacy leaks. | P0 |
| QD-S-3.4 | Undefined Task Scope | Missing `non_goals` declaration — does not state what the Skill does NOT do; the LLM expands task boundaries on its own. | Task boundaries expanded to "reasonably related" matters. | P0 |
| QD-S-3.5 | Undeclared Default Behavior | Critical branches (empty input, format error, insufficient data, etc.) have no defined handling. | With no work notes provided, the LLM generates an example weekly report; fabricated content. | P0 |
| QD-S-3.6 | Metadata Expression Defects | `name` or `description` is overly broad, inaccurate, or inconsistent with the body; the LLM misunderstands capabilities at the trigger stage. | Contradictory name/description drives capability misinference and write operations. | P0 |
| QD-S-4.1 | Undefined Failure Behavior | Does not declare how to handle execution failure; the LLM may explore alternative paths on its own. | Unpredictable post-failure behavior; may expand query scope, causing unauthorized access. | P0 |
| QD-S-4.2 | Undeclared Partial Completion Legitimacy | Does not declare whether "partial completion is acceptable"; the LLM may forcibly pursue completeness, entering infinite iterations. | Forced filling of all sections; fabricated content or infinite rewriting. | P0 |
| QD-S-4.3 | Missing Post-Failure Prohibited Behaviors | Does not explicitly state what behaviors are prohibited after failure; the LLM decides on its own to lower standards or expand scope. | Overflow operations or false data generated "to solve the problem". | P0 |
| QD-S-5.1 | Read/Write/Delete Not Distinguished | The Skill declares it can operate on data but does not distinguish read, modify, and delete permission scopes. | Deletion read as a reasonable way to "manage data"; irreversible operations executed. | P0 |
| QD-S-5.2 | Missing High-Risk Confirmation | Irreversible operations such as deletion, overwriting, data exfiltration, or payments do not have a confirmation mechanism. | "Clean up expired data" without confirmation — the LLM directly executes deletion; data lost irrecoverably. | P0 |
| QD-S-5.3 | Undeclared Environment Boundaries | Does not declare that operating on production environments is prohibited, or does not specify the permitted operational environments. | Production database treated as a legitimate diagnostic target; production services affected. | P0 |
| QD-S-5.4 | Undeclared Chained Invocation Permissions | Allows invoking other Skills but does not declare the permitted/prohibited downstream Skill scope. | Low-permission Skill invokes high-permission Skill — privilege escalation. | P0 |

> Source notes: (a) Appendix B labels the L3 mandatory list "(all P0)", but Appendix A and the per-rule Severity block assign QD-S-1.5 an L3 level of P1; the per-rule Level column follows Appendix A. (b) Appendix B's L3 mandatory list omits QD-S-3.3 (L3:P0 per Appendix A) and QD-S-4.4 (L3:P1), while §7.2.3 elsewhere declares "full inspection (all QD-S-1 through QD-S-5)" with QD-S-3.3 semi-automated and QD-S-4.4 human. This file reproduces Appendix B as written; on conflict, `inspect/skill.md` governs.

## 5. Standard inspection flow (§7.3, six steps)

1. **Baseline Compliance Check** — execute QD-S-0 (items 0.1–0.6, automated structural checks). PASS requires all six items to pass; on any FAIL, output the failed items with remediation guidance and stop — the Skill does not proceed to QD-S-1 through QD-S-5 inspection.
2. **Skill Risk Level Determination** — determine L1/L2/L3: write operations, external system access, or sensitive data → at least L2; delete or irreversible operations, or permission changes → L3; otherwise L1 (text-processing only). Examples from the source: "compile weekly report" → L1; "query database" → L2; "delete user records" → L3.
3. **Select Inspection Checklist** — by risk level: L1 = the 7 mandatory items of §7.2.1 (below); L2 = all QD-S-1/2/3/4/5 items; L3 = full inspection (all items). For the lite inspector this means applying the matching Appendix B minimum set from Section 4.
4. **Automated Inspection** — structural checks (QD-S-0.1–0.6), quantity-boundary keyword scanning (QD-S-1.1–1.3), unbounded-language detection (QD-S-2.1–2.3: "all", "every", "until success", etc.), and name/description consistency (QD-S-3.6).
5. **Semi-Automated and Human Inspection** — judge QD-S-3.x (trigger conditions, deactivation conditions, ambiguity handling), QD-S-4.x (failure behavior, partial-completion strategy), and QD-S-5.x (permission boundaries, environment declarations, chained invocation) by reviewing the Skill description against the six Review Schema dimensions and performing Inferential Verification.
6. **Output Inspection Report** — a defect list sorted by priority (ID, defect item, level, location, risk description) plus, in the full spec, an optimized Skill and an original-vs-optimized comparison table with inferential verification. The lite inspector is **detect-only**: it emits the defect list and evidence, never an optimized artifact.

### 5.1 L1 (Low Risk) mandatory inspection checklist (§7.2.1, 7 items)

| ID | Inspection Item | Level | Inspection Method |
| --- | --- | --- | --- |
| QD-S-0 | Baseline Compliance | MUST pass | Automated |
| QD-S-1.1 | Input Boundary Missing | P1 | Automated |
| QD-S-1.2 | Output Size Missing | P1 | Automated |
| QD-S-2.1 | Unbounded Quantity Declaration | P1 | Automated |
| QD-S-3.4 | Undefined Task Scope | P0 | Human |
| QD-S-4.1 | Undefined Failure Behavior | P1 | Human |
| QD-S-3.6 | Metadata Expression Defects | P1 | Human |

Optional (recommended, not required): QD-S-3.1, QD-S-3.2, QD-S-3.3 (source §7.2.1).

## 6. Review Schema (Part 8) — six review dimensions

The Review Schema is the inspection framework for systematically decomposing and analyzing Skill definitions (an intermediate working view, not a production format). Organize the final Skill report's findings under these dimensions.

| Dimension | Review Question | Associated Defect Types |
| --- | --- | --- |
| **IDENTITY** | What does this Skill do, not do, and what can it access? | QD-S-3.4, QD-S-5.1 |
| **TRIGGER** | When should it trigger, and when should it not? | QD-S-3.1, QD-S-3.2 |
| **INPUT** | Are input size, format, and overflow behavior clearly defined? | QD-S-1.1, QD-S-3.3 |
| **EXECUTION** | Are execution boundaries, retries, tool invocations, and chained calls controlled? | QD-S-1.3, QD-S-5.4 |
| **OUTPUT** | Are output size, structure, and partial completion strategy clearly defined? | QD-S-1.2, QD-S-2.3 |
| **FAILURE** | How are failures, empty input, insufficient input, and user dissatisfaction handled? | QD-S-4.x |

Review items per dimension (MUST items are the gap-analysis core; source §8.2–8.7):

- **IDENTITY**: purpose (MUST), non_goals (MUST), allowed_resources (MUST), forbidden_resources (MUST), forbidden_operations (MUST), allowed_operations (SHOULD).
- **TRIGGER**: allowed_when (MUST), forbidden_when (MUST), ambiguity_policy (MUST — ask_user / stop / infer), may_expand_scope (MUST).
- **INPUT**: max_items (MUST), if_exceeds (MUST — process_first_n / reject / ask), max_chars (SHOULD), format (SHOULD), safe_defaults (SHOULD).
- **EXECUTION**: max_tool_calls (MUST), max_retries (MUST), timeout_seconds (MUST), allow_task_expansion (MUST), if_budget_exceeded (MUST), allow_skill_chaining (SHOULD), allowed_downstream_skills (MUST when chaining=true), require_user_confirmation_for (MUST when irreversible operations are involved).
- **OUTPUT**: max_total_chars (MUST), allow_additional_sections (MUST), partial_result_allowed (MUST), if_input_insufficient_for_section (MUST), format (SHOULD), max_items_per_section (SHOULD).
- **FAILURE**: on_empty_input (MUST — ask_user / stop / generate_template), on_insufficient_input (MUST — generate_partial / ask_user / stop), forbidden_behaviors (MUST — e.g., no auto-completion, no inference, no scope expansion), on_user_dissatisfied (SHOULD — rewrite limits, escalation confirmation).

## 7. Scoring note (Part 11, optional)

Weights P0:P1:P2 = 5:3:1; Total Weight = (applicable P0 item count × 5) + (P1 × 3) + (P2 × 1); Base Score = 100 / Total Weight; per failed item deduct Base × 5 / 3 / 1 (highest severity, once per item number regardless of defect instances); Score = max(100 − deductions, 0); **any P0 → evaluation FAIL** (score is still output). Compute an indicative score only if the user asks, and label it "indicative (lite minimal set), not the full-spec score".
