---
title: System Prompt Inspection Checklist (Lite)
description: "Condensed QD-P inspection checklist for the sanityops-inspect lite inspector: Agent tiering (L1/L2/L3), the complete tiered inspection checklist matrix with per-tier severity, cumulative minimum rule sets (L1=8 / L2=18 / L3=34 P0 items) with condensed definitions and typical manifestations, and the scoring note. Extracted from inspect/prompt.md v1.0; defines no new rules."
---

# System Prompt Inspection Checklist (QD-P, Lite)

> **Provenance**: Condensed from `inspect/prompt.md` v1.0 (SanityOps Framework, CC BY-SA 4.0). This file is a compressed extraction for the sanityops-inspect lite inspector and defines NO new rules. On any conflict, `inspect/prompt.md` governs.

## How to use

- **Determine the Agent tier first** (§3.1.2 — a level applies when **any 2 or more** of its criteria are satisfied): **L1** Single-turn Task (single skill, no tool invocations, no multi-turn dialogue, no complex reasoning); **L2** Multi-turn Interactive (multi-turn dialogue, 1–3 tools, simple workflow ≤ 5 steps, limited state management); **L3** Complex Agent (4+ tools, workflow > 5 steps, security-sensitive, requires exception handling). State the determination in the report.
- **Inspect the tier's checklist scope** (§3.3.2 matrix below; §3.4.1): L1 = 30 items, L2 = 40 items, L3 = 47 items. The checklist is upward-compatible (L3 ⊃ L2 ⊃ L1, §3.3.1), so a higher tier automatically covers all lower-tier items. Items marked "—" do not apply at that tier.
- **Severity is tier-specific** (§3.2.2, §3.2.3): the same defect may upgrade across tiers (e.g., Undefined Output Format P1 at L1 → P0 at L2/L3). Always apply the severity shown in the inspected tier's column of the matrix.
- **Minimum rule sets are the compliance basis** (Appendix A): a tier is compliant only if **all of its P0 items pass** — L1: 8 items; L2: 18 (includes L1's 8); L3: 34 (includes L2's 18). Any P0 item failed → Non-compliant. P1 items SHOULD be fixed; P2 items MAY be fixed.
- **Output one verdict per rule** in the form `QD-P-x.y.z | PASS/FAIL | evidence: file/section/line in the inspected artifact`, quoting a short excerpt of the offending text for every FAIL.
- **Any P0 finding blocks downstream stages**: report it and stop progression to subsequent governance stages.
- **Detection nature differs by Part** (spec structure): Part 1 (QD-P-1.x) logic defects are detectable by semantic reading of the prompt text (§1); Part 2 (QD-P-2.x) defects are completeness/security gaps that require the explicit checklist — the LLM will not proactively notice them (§2.1.2, §2.3). Gray-zone items (QD-P-1.6.x) carry reduced detection-reliability labels in the spec (Partially reliable / Unstable / Conditionally reliable, §1.6); keep the label in mind when judging them.

## Agent tiers (§3.1)

| Level | Name | Definition | Determination criteria (any 2 or more satisfied) |
| --- | --- | --- | --- |
| **L1** | Single-turn Task | Single invocation completes the task; no state retention | Single skill; no tool invocations; no multi-turn dialogue; no complex reasoning |
| **L2** | Multi-turn Interactive | Requires multi-turn dialogue or simple tool invocations | Multi-turn dialogue; 1–3 tool invocations; simple workflow (≤ 5 steps); limited state management |
| **L3** | Complex Agent | Complex workflow, multi-tool collaboration, strong constraints | 4+ tool invocations; complex workflow (> 5 steps); security-sensitive (privacy/permissions); requires exception handling mechanisms |

## Complete tiered inspection checklist (§3.3.2)

Severity per tier: 🔴 = P0, 🟡 = P1, 🟢 = P2, — = item not inspected at that tier.

**Part 1: Logic Defects Within LLM Autonomous Detection Capability**

| QD-P ID | Defect Name | L1 | L2 | L3 | Severity Variation Notes |
| --- | --- | --- | --- | --- | --- |
| **QD-P-1.1.1** | Direct Contradiction | 🔴 | 🔴 | 🔴 | P0 at all levels; direct contradiction is unacceptable in any Agent |
| **QD-P-1.1.2** | Priority Conflict | 🟡 | 🟡 | 🔴 | L1/L2 P1; L3 upgraded to P0 (conflict impact is greater in complex Agents) |
| **QD-P-1.1.3** | Example-Rule Contradiction | 🔴 | 🔴 | 🔴 | P0 at all levels; the demonstrative effect of examples overrides rule definitions |
| **QD-P-1.2.1** | Role-Responsibility Mismatch | 🔴 | 🔴 | 🔴 | P0 at all levels; role semantic scope not matching responsibility requirements is blocking in any scenario |
| **QD-P-1.2.2** | Role-Output Style Mismatch | 🟡 | 🟡 | 🟡 | P1 at all levels; style mismatch affects output consistency but does not block functionality |
| **QD-P-1.2.3** | Constraint-Responsibility Mismatch | 🔴 | 🔴 | 🔴 | P0 at all levels; a constraint prohibiting core responsibility behavior is blocking in any scenario |
| **QD-P-1.3.1** | Quantifier Misuse | 🟡 | 🟡 | 🟡 | P1 at all levels; quantifier semantic scope errors affect behavioral boundaries but do not block |
| **QD-P-1.3.2** | Vague Qualifiers | 🟡 | 🟡 | 🟡 | P1 at all levels; vague qualifiers cause unstable behavioral boundaries |
| **QD-P-1.3.3** | Undefined Boundaries | 🟡 | 🔴 | 🔴 | L1 P1; L2/L3 upgraded to P0 (boundary gaps have greater impact in multi-tool/complex workflows) |
| **QD-P-1.4.1** | Duplicate Constraints | 🟢 | 🟢 | 🟢 | P2 at all levels; redundancy does not affect functionality |
| **QD-P-1.4.2** | Never-Triggered Conditions | 🟢 | 🟢 | 🟢 | P2 at all levels; dead code does not affect functionality |
| **QD-P-1.4.3** | Invalid Skill Definitions | — | 🟡 | 🔴 | L1 has no Skills; L2 P1; L3 P0 (invalid Skills in complex Agents may cause functional gaps) |
| **QD-P-1.5.1** | Responsibilities Do Not Support Objective | 🔴 | 🔴 | 🔴 | P0 at all levels; responsible behaviors insufficient to accomplish the objective |
| **QD-P-1.5.2** | Resources Do Not Support Workflow | — | 🔴 | 🔴 | L1 has no workflow; L2/L3 P0 (workflow steps cannot execute) |
| **QD-P-1.6.1** | Critical Decision Word Vagueness | 🟡 | 🔴 | 🔴 | L1 P1; L2/L3 P0 (upgraded when vague words carry security/permission decisions) |
| **QD-P-1.6.2** | Rules Depending on Model Internal State | 🟡 | 🟡 | 🔴 | L1/L2 P1; L3 P0 (internal state dependency risk is greater in complex Agents) |
| **QD-P-1.6.3** | Soft Rule Interweaving Without Arbitration | 🟡 | 🟡 | 🔴 | L1/L2 P1; L3 P0 (Soft Rule interweaving impact is greater in complex Agents) |
| **QD-P-1.6.4** | Reasoning Method Constraints | 🟡 | 🟡 | 🟡 | P1 at all levels; the LLM cannot guarantee its internal reasoning method |
| **QD-P-1.6.5** | Self-Referential or Recursive Constraints | 🟡 | 🟡 | 🟡 | P1 at all levels; simple self-reference may be harmless, complex recursion may cause anomalies |
| **QD-P-1.6.6** | Implicit Assumption Dependency | 🟡 | 🟡 | 🔴 | L1/L2 P1; L3 P0 (implicit assumption failure impact is greater in complex Agents) |
| **QD-P-1.6.7** | Non-Monotonic Reasoning Defects | 🟡 | 🟡 | 🔴 | L1/L2 P1; L3 P0 (dynamic scenario rule interaction impact is greater in complex Agents) |

**Part 2: Defects Requiring Explicit Prompts**

| QD-P ID | Defect Name | L1 | L2 | L3 | Severity Variation Notes |
| --- | --- | --- | --- | --- | --- |
| **QD-P-2.1.1** | Format Compliance | — | — | 🟢 | L3 inspection only; P2; affects readability but not functionality |
| **QD-P-2.1.2** | Reference Clarity | — | — | 🟡 | L3 inspection only; P1; vague references in complex Agents may cause incorrect tool invocation parameters |
| **QD-P-2.1.3** | Structural Hierarchy Reasonableness | — | — | 🟢 | L3 inspection only; P2; affects information delivery efficiency but not functionality |
| **QD-P-2.1.4** | Language Conciseness | — | — | 🟢 | L3 inspection only; P2; increases Token Consumption but does not affect functionality |
| **QD-P-2.2.1** | Undeclared Input Source | 🔴 | 🔴 | 🔴 | P0 at all levels; workflow cannot execute |
| **QD-P-2.2.2** | Unconstrained Input Format | 🟡 | 🔴 | 🔴 | L1 P1; L2/L3 P0 (missing input format in multi-tool/complex workflows causes parsing failures) |
| **QD-P-2.2.3** | Required/Optional Not Distinguished | 🟡 | 🔴 | 🔴 | L1 P1; L2/L3 P0 (undefined required nature in complex Agents causes processing failures) |
| **QD-P-2.2.4** | Undefined Missing-Input Handling | 🟡 | 🔴 | 🔴 | L1 P1; L2/L3 P0 (missing-input impact is greater in complex Agents) |
| **QD-P-2.3.1** | Undefined Output Format | 🟡 | 🔴 | 🔴 | L1 P1; L2/L3 P0 (output is parsed by downstream tools; non-compliant format causes tool invocation failures) |
| **QD-P-2.3.2** | Incomplete Output Schema | 🟡 | 🔴 | 🔴 | L1 P1; L2/L3 P0 (downstream systems cannot correctly parse output) |
| **QD-P-2.3.3** | Missing Output Stability Assurance | — | 🟡 | 🔴 | L1 single invocation does not need stability; L2 P1; L3 P0 |
| **QD-P-2.3.4** | Missing Security/Privacy Filtering | 🔴 | 🔴 | 🔴 | P0 at all levels (may cause privacy leaks) |
| **QD-P-2.4.1** | Incomplete Workflow Steps | — | 🟡 | 🔴 | L1 has no workflow; L2 P1; L3 P0 (missing steps in complex workflows have greater impact) |
| **QD-P-2.4.2** | Undeclared Resources/Tools | — | 🔴 | 🔴 | L1 has no tools; L2/L3 P0 (tool invocation fails) |
| **QD-P-2.4.3** | Missing Tool Invocation Specification | — | 🔴 | 🔴 | L1 has no tools; L2/L3 P0 (tool invocation fails or privilege escalation) |
| **QD-P-2.5.1** | Missing Termination Constraints | — | 🟡 | 🔴 | L1 has no retries; L2 P1; L3 P0 (may cause resource exhaustion) |
| **QD-P-2.5.2** | Missing Security Boundary Constraints | 🔴 | 🔴 | 🔴 | P0 at all levels; may cause security incidents |
| **QD-P-2.5.3** | Missing Permission Control Boundaries | — | 🟡 | 🔴 | L1 has no permission control; L2 P1; L3 P0 (may cause privilege escalation) |
| **QD-P-2.5.4** | Undefined Constraint Priority | — | 🟡 | 🔴 | L1 constraints are simple and do not need priority; L2 P1; L3 P0 |
| **QD-P-2.5.5** | Missing Resource Invocation Frequency Limits | — | 🟡 | 🔴 | L1 has no resource invocations; L2 P1; L3 P0 (may cause resource abuse) |
| **QD-P-2.6.1** | Runtime Exceptions Not Covered | — | — | 🔴 | L3 inspection only; P0 (exception impact is greater in complex Agents) |
| **QD-P-2.6.2** | Missing Degradation and Recovery Strategy | — | — | 🔴 | L3 inspection only; P0 (complex Agents require degradation mechanisms) |
| **QD-P-2.6.3** | Unreasonable Retry Mechanism | — | — | 🟡 | L3 inspection only; P1 (may cause resource waste) |
| **QD-P-2.7.1** | Insufficient Positive Example Representativeness | 🟡 | 🟡 | 🔴 | L1/L2 P1; L3 P0 (insufficient examples in complex Agents may cause critical step execution errors) |
| **QD-P-2.7.2** | Insufficient Counter-Example Coverage | 🟡 | 🟡 | 🔴 | L1/L2 P1; L3 P0 (missing counter-examples in complex Agents may cause repeated errors) |
| **QD-P-2.7.3** | Missing Boundary-Case Examples | 🟡 | 🟡 | 🔴 | L1/L2 P1; L3 P0 (missing boundary cases in complex Agents have greater impact) |

**Inspection item statistics (§3.3.3)** — also the per-tier item counts (N_P0, N_P1, N_P2) used by the scoring formula:

| Agent Level | Total Items | P0 Items | P1 Items | P2 Items |
| --- | --- | --- | --- | --- |
| **L1** | 30 | 8 | 20 | 2 |
| **L2** | 40 | 18 | 20 | 2 |
| **L3** | 47 | 35 | 7 | 5 |

> **Source count note** (reproduced, not adjudicated): the §3.3.2/§3.3.3 matrix contains **35 P0 items at L3**, but Appendix A.3's L3 minimum rule set lists **34 P0 items** — it omits **QD-P-1.4.3 Invalid Skill Definitions** (shown as L3 🔴 P0 in the matrix). The lite inspector evaluates the full tier matrix (so QD-P-1.4.3 gets a verdict at L3 with its matrix level), while reporting Appendix A.3's 34-item set as the source's stated compliance basis; on conflict `inspect/prompt.md` governs.

## Minimum rule sets (Appendix A) — condensed

The sets are **cumulative**: the L2 set includes all L1 items, and the L3 set includes all L2 items (§A.4.2 Upward Compatibility). The tables below are therefore structured cumulatively; every item listed is a **P0** item at the tier whose set it belongs to (Appendix A: "MUST pass the above N P0 inspection items"; P1 SHOULD be fixed, P2 MAY be fixed).

### L1 minimum rule set — 8 P0 items (§A.1)

| ID | Rule name | Definition (condensed) | Typical manifestation | Level |
| --- | --- | --- | --- | --- |
| QD-P-1.1.1 | Direct Contradiction | The same object is assigned mutually exclusive attributes or directives within the same context. | The same behavior is simultaneously permitted and prohibited; contradictory attributes on one object; preceding and subsequent constraints directly conflict | P0 |
| QD-P-1.1.3 | Example-Rule Contradiction | The rule definitions in the prompt body contradict the provided examples. | Behavior prohibited by a rule appears in an example; example output format or style inconsistent with the rule-defined format or style | P0 |
| QD-P-1.2.1 | Role-Responsibility Mismatch | The identity/capability scope defined by the role does not match the behavioral requirements defined by the responsibilities. | Role identity does not support the required responsible behaviors; responsibilities exceed the role's capability boundaries; vague role positioning leads to unclear responsibility attribution | P0 |
| QD-P-1.2.3 | Constraint-Responsibility Mismatch | The restriction scope defined by constraints conflicts or is mismatched with the behavioral scope defined by responsibilities. | A constraint prohibits the core behavior of a responsibility; constraint scope and responsibility scope have no intersection; constraint conditions make the responsibility unexecutable | P0 |
| QD-P-1.5.1 | Responsibilities Do Not Support Objective | The behavioral set defined by the responsibilities cannot support the role's overall objective. | The objective requires a capability the responsibilities do not define; responsible behaviors are insufficient to accomplish the objective; a semantic gap exists between objective and responsibilities | P0 |
| QD-P-2.2.1 | Undeclared Input Source | The Agent's input source is not declared, preventing the Agent from determining the data source. | Source (user / system / external data), input data type, or acquisition method not declared | P0 |
| QD-P-2.3.4 | Missing Security/Privacy Filtering | Security and privacy filtering mechanisms are not defined, potentially causing privacy leaks. | Sensitive data filtering rules, privacy data handling methods, or security output constraints not defined | P0 |
| QD-P-2.5.2 | Missing Security Boundary Constraints | Security boundary constraints are not defined, potentially causing security risks. | Prohibited operations, sensitive data access boundaries, or external system access boundaries not defined | P0 |

### L2 minimum rule set = L1's 8 items + the following 10 = 18 P0 items (§A.2)

| ID | Rule name | Definition (condensed) | Typical manifestation | Level |
| --- | --- | --- | --- | --- |
| QD-P-1.3.3 | Undefined Boundaries | Critical behavioral boundaries are undefined, preventing the Agent from determining whether behavior exceeds its scope. | Authorization scope, prohibition scope, or handoff conditions undefined | P0 |
| QD-P-1.5.2 | Resources Do Not Support Workflow | The workflow-defined steps require certain resources, but the resource definitions do not include them. | A workflow step mentions querying a database, invoking an API, or using tool X, but no corresponding resource is defined or authorized | P0 |
| QD-P-1.6.1 | Critical Decision Word Vagueness | Vague qualifiers (e.g., "sensitive," "reasonable," "when necessary," "appropriate") are used to carry critical decision judgments rather than secondary descriptions. | A vague word defines a security boundary, response deadline, behavioral trigger condition, or operational intensity without defining its criteria | P0 |
| QD-P-2.2.2 | Unconstrained Input Format | The input data format is not constrained, potentially causing parsing failures. | Input data format (e.g., CSV, JSON, text), encoding, or size limit not declared | P0 |
| QD-P-2.2.3 | Required/Optional Not Distinguished | The required vs. optional nature of input parameters is not distinguished, potentially causing processing failures. | Required parameters not marked; default values for optional parameters undefined; handling when parameters are missing undefined | P0 |
| QD-P-2.2.4 | Undefined Missing-Input Handling | Handling when input is missing is not defined, potentially causing abnormal behavior. | Handling when required input is missing, defaults when optional input is missing, or handling of anomalous input not defined | P0 |
| QD-P-2.3.1 | Undefined Output Format | The output format is not defined, preventing downstream systems from correctly parsing the output. | Output data format (e.g., JSON, text, Markdown), output structure (fields, order), or encoding not defined | P0 |
| QD-P-2.3.2 | Incomplete Output Schema | The output Schema definition is incomplete, preventing downstream systems from correctly parsing the output. | Output Schema missing critical fields; field types undefined; field meanings unexplained | P0 |
| QD-P-2.4.2 | Undeclared Resources/Tools | The resources or tools used are not declared, preventing the Agent from determining available resources. | Databases, APIs, or tools used not declared; access permissions or usage methods not declared | P0 |
| QD-P-2.4.3 | Missing Tool Invocation Specification | Tool invocation specifications are not defined, potentially causing invocation failures or privilege escalation. | Invocation parameter specifications, invocation sequence specifications, or failure handling not defined | P0 |

### L3 minimum rule set = L2's 18 items + the following 16 = 34 P0 items (§A.3)

| ID | Rule name | Definition (condensed) | Typical manifestation | Level |
| --- | --- | --- | --- | --- |
| QD-P-1.1.2 | Priority Conflict | Multiple constraints or directives conflict in specific scenarios, and no priority rules are defined. | Multiple "MUST" constraints cannot be simultaneously satisfied in specific scenarios; security vs. efficiency conflicts with no arbitration; multi-dimensional evaluation criteria have no weights | P0 |
| QD-P-1.6.2 | Rules Depending on Model Internal State | Prompt rules depend on the LLM's internal state (e.g., confidence, intent judgment, motivation inference), which the LLM cannot reliably access or report. | Rules keyed on "when you are uncertain," "when you judge the user's intent to be malicious," "when you have high confidence," "if you think the user is testing you" | P0 |
| QD-P-1.6.3 | Soft Rule Interweaving Without Arbitration | Multiple Soft Rules (non-Hard Constraints) interweave in practical scenarios, producing implicit conflicts, and no arbitration mechanism is defined. | Individually reasonable rules whose combination is ambiguous: "be professional" + "be easy to understand"; "provide complete information" + "avoid overload"; "be proactive" + "do not over-intervene" | P0 |
| QD-P-1.6.6 | Implicit Assumption Dependency | Prompt rules depend on unstated assumptions (model capability, user background, environment conditions) that may not hold. | Rules assuming e.g. that the user will upload a file, the format is valid, or the content matches expectations, with no precondition checks or handling when assumptions fail | P0 |
| QD-P-1.6.7 | Non-Monotonic Reasoning Defects | Prompt rules are designed based on static knowledge, but new information may invalidate previous conclusions, and no knowledge-update or conclusion-revision mechanism is defined. | No mechanism for revising earlier conclusions when the user updates or corrects information during the conversation | P0 |
| QD-P-2.3.3 | Missing Output Stability Assurance | Output stability assurance mechanisms are not defined, potentially causing inconsistent output. | Output format stability, output content stability, or output consistency check mechanisms not defined | P0 |
| QD-P-2.4.1 | Incomplete Workflow Steps | Workflow step definitions are incomplete, potentially causing functional gaps. | Workflow missing critical steps; unreasonable step order; step dependencies not defined | P0 |
| QD-P-2.5.1 | Missing Termination Constraints | Termination constraints are not defined, potentially causing infinite loops or resource exhaustion. | Loop or recursion termination conditions not defined; maximum iteration count not defined | P0 |
| QD-P-2.5.3 | Missing Permission Control Boundaries | Permission control boundaries are not defined, potentially causing privilege escalation. | Agent permission scope not defined; permission elevation conditions not defined; handling of privilege escalation operations not defined | P0 |
| QD-P-2.5.4 | Undefined Constraint Priority | Arbitration rules for multiple constraints in potential conflict scenarios are not defined (the constraints themselves are not in explicit conflict — cf. QD-P-1.1.2). | Multiple "SHOULD" constraints or optimization objectives with potential conflicts; decision rules for when conflicts occur not defined | P0 |
| QD-P-2.5.5 | Missing Resource Invocation Frequency Limits | Resource invocation frequency limits are not defined, potentially causing resource abuse. | API, database query, or external system access frequency limits not defined | P0 |
| QD-P-2.6.1 | Runtime Exceptions Not Covered | Handling of runtime exceptions is not defined, potentially causing Agent crashes. | Handling of tool invocation failures, data parsing failures, or external system exceptions not defined | P0 |
| QD-P-2.6.2 | Missing Degradation and Recovery Strategy | Degradation and recovery strategies are not defined, potentially preventing the Agent from recovering. | Functional degradation strategies, error recovery strategies, or recovery methods for anomalous states not defined | P0 |
| QD-P-2.7.1 | Insufficient Positive Example Representativeness | Positive examples lack sufficient representativeness, potentially preventing the Agent from correctly understanding expected behavior. | Positive example scenario coverage insufficient; examples too simplistic and not covering boundary cases; examples inconsistent with rules | P0 |
| QD-P-2.7.2 | Insufficient Counter-Example Coverage | Counter-examples do not cover typical error patterns, preventing the Agent from correctly handling errors. | No counter-examples provided; counter-example types monotonous; typical error patterns not covered | P0 |
| QD-P-2.7.3 | Missing Boundary-Case Examples | No examples are provided for boundary cases (e.g., empty input, excessively long input, anomalous input). | No boundary-case examples provided, or boundary-case examples incomplete | P0 |

## Scoring note

Deduction weights **P0 : P1 : P2 = 5 : 3 : 1** (source: `inspect/prompt.md` §4.1); the same inspection item number is deducted only once regardless of instance count (§4.6), and any P0 defect → FAIL with the score still output (§4.1) — the lite inspector reports verdicts and evidence, and computes an indicative numeric score only on request.
