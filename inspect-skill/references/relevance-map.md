---
title: Relevance Map (Lite Inspector)
description: "Candidate impact outlook for unfixed Inspect defects — QD to candidate attack surface (AS-*) and candidate failure mode (FM-*) mapping directions, condensed from framework/relevance.md v1.0. Defines no new rules or mappings."
---

> **Provenance**: Condensed from `framework/relevance.md` v1.0 (SanityOps Framework, CC BY-SA 4.0). This file is a compressed extraction for the sanityops-inspect lite inspector and defines NO new rules or mappings. relevance.md is an L2 cross-domain mapping document subordinate to the nine L1 sub-specifications; on any conflict (numbering, definitions, severity, release requirements), the source sub-specification governs.
>
> Source rule (relevance.md §0.3.1): "If there is a conflict between this specification and a source sub-specification regarding rule numbering, definitions, severity levels, or release requirements, **the corresponding source sub-specification shall take precedence**." The mapping strength, attack surfaces, candidate failure modes, validation recommendations, and diagnostic recommendations in the source do not alter the original determinations of the source sub-specifications.

## How to use

Use this file in **Stage E (Impact outlook)** only, after Stages A/B/D have produced actual FAIL findings. For **each FAIL** (and only FAILs), look up the QD ID in the tables below and emit a condensed Impact Card (template at the end of this file).

**Mandatory red lines:**

- **Map only defects that actually FAILED inspection.** Never pre-map, speculatively map, or map remediated/PASS items.
- **Candidate language only.** Every output line must read as a *candidate association*: use "may", "candidate association", "needs dynamic verification". **Never** write causal claims: "will cause", "guarantees", "ensures", "inevitably", "proves". Source principle (relevance.md §0.4-1, "Correlation is not causation"): "A `QD` defect indicates missing, ambiguous, inconsistent, or insufficiently bounded definitions; it does not automatically prove that an attack has succeeded, a runtime vulnerability exists, or a quality failure has occurred."
- **Strength is NOT severity.** Mapping strength describes association confidence / test-priority only (§1.3) and never replaces P0/P1/P2 or S0–S3. Label both explicitly whenever a strength is emitted.
- **State what was NOT run.** Every impact section must explicitly record that the Risk subsets (Risk Explicit and Risk Implicit) were **NOT executed** by the lite inspector — no `EX` classification exists and dynamic exploitability is unverified — and that per relevance.md §1.4 no assumption may be made that controls outside the artifacts are absent. Source (§1.4): "Single defect mapping should not ignore controls external to the artifact. For example, insufficient parameter constraints in a Tool Schema do not imply the backend lacks additional validation; whether it is exploitable should still be determined through dynamic validation."
- **Never convert a candidate association into a definitive root-cause claim** — not before, and especially not after, a quality failure (reverse diagnostics yield candidate investigation directions only).
- **Keep the impact outlook physically separated from the Gate/verdict conclusions.** It is advisory context, not a verdict; it must not change, soften, or escalate any Inspect conclusion.

## Mapping strength (relevance.md §1.3)

Source definition sentence: "Mapping strength reflects 'whether validation or supplementary testing should be prioritized', not vulnerability severity, nor does it replace P0/P1/P2."

| Strength | Meaning (verbatim, §1.3) | Platform behavior in the full framework |
|----------|--------------------------|------------------------------------------|
| **Strong** | Defect directly expands attack entry, or highly likely to cause specified failure mode | Automatically recommend related Risk or Quality test cases |
| **Medium** | May have impact under specific permission, data, Tool, or process conditions | Recommend based on applicability conditions |
| **Conditional** | Requires external knowledge bases, runtime environments, model behaviors, or business rules | As candidate investigation direction, no automatic conclusion |
| **Not Applicable** | Current Agent type, artifact type, or runtime conditions lack association prerequisites | Do not output this recommendation |

**Strength assignment rule for the lite inspector:** the source Appendix A tables carry **no per-row strength ratings**, and this file deliberately does not assign any (no invented strengths). When emitting an Impact Card, either omit the strength field, or assign Strong/Medium/Conditional per the §1.3 definitions with a one-line justification, labeled "provisional (lite)". Never present a strength as severity.

## Attack surface legend (verbatim, relevance.md §2.2)

| ID | Attack Surface | Definition |
|----|----------------|------------|
| `AS-01` | Instruction and Context Boundary Confusion | Mistaking untrusted input, documents, history content, or external returns as high-priority instructions. |
| `AS-02` | Input and Parameter Injection | Unconstrained user or external input entering Tools, backends, or downstream interpreters. |
| `AS-03` | Output Handling and Sensitive Data Exfiltration | Sensitive information being output, concatenated, referenced, forwarded, or written to external destinations. |
| `AS-04` | Permission, Identity, and Delegation Expansion | Broad capabilities, incorrect authorization, or chained calls leading to out-of-scope operations. |
| `AS-05` | Tool Misuse and High-Risk Side Effects | Wrong Tool selection, accidental write operations, batch operations, or unconfirmed irreversible actions. |
| `AS-06` | Resource Exhaustion and Runaway Execution | No upper limits on input, output, calls, retries, or recursion leading to resource loss of control. |
| `AS-07` | Anomaly Propagation and Cascading Failures | After Tool or dependency failure, Agent adopts undefined expansion, retry, or degradation strategies. |
| `AS-08` | Configuration, Naming, and Supply Chain Confusion | Similar Tool names, Schema changes, dangerous default values, or abnormal callback addresses leading to misuse. |
| `AS-09` | Cross-Artifact Contract Breach | Inconsistencies in authorization, parameters, output, permissions, or error strategies across Prompt, Skill, and Tool. |

Impact-dimension codes used below: `D1` = Confidentiality Harm, `D2` = Integrity Harm, `D3` = Authorization Harm (relevance.md §0.5). "Availability", "Auditability", "Integrity" appear as plain words in the source tables.

**Source caveat (relevance.md Appendix A preamble, condensed):** "This appendix defines **mapping directions**, it does not automatically determine static defects as EX risks, dynamic vulnerabilities, or actual security incidents." Risk Explicit content only indicates suggested priority review directions; specific `EX` classification must be independently determined by Risk Explicit.

## A.1 Prompt Defect Mapping (QD-P-*)

| QD ID | Candidate attack surface (AS-*) | Potential impact | Note — suggested validation directions (condensed) |
|-------|--------------------------------|------------------|------------------------------------------------------|
| `QD-P-1.1.x` Contradiction | AS-01, AS-04, AS-05 | D1, D2, D3 | Conflicting instructions, rule priority, examples overriding body rules, multi-turn context testing |
| `QD-P-1.2.x` Mismatch | AS-04, AS-09 | D2, D3, Availability | Out-of-role tasks, role and constraint conflicts, handoff and refusal testing |
| `QD-P-1.3.x` Scope Definition | AS-01, AS-04 | D1, D2, D3 | Vague quantifiers, qualifiers, adjacent permission and boundary request testing |
| `QD-P-1.4.x` Redundancy and Invalidity | AS-05, AS-09 | Availability, Auditability | Invalid Skills, unreachable branches, dead rules, and call path testing |
| `QD-P-1.5.x` Implication | AS-05, AS-07, AS-09 | D2, D3, Availability | Goal completion, resource reachability, workflow dependency, and exception path testing |
| `QD-P-1.6.1` Ambiguous Key Decision Terms | AS-01, AS-04 | D1, D2, D3 | Variants and conflict conditions testing for boundary words like "sensitive", "necessary", "reasonable" |
| `QD-P-1.6.2` Rules Dependent on Model Internal State | AS-01, AS-07 | D1, D2, D3, Availability | Stability testing of rules related to uncertainty, malicious intent, and confidence levels |
| `QD-P-1.6.3–1.6.7` Gray Zone Logic Defects | AS-01, AS-06, AS-07 | D1, D2, D3, Availability | Multi-turn conflict, recursive termination, knowledge update, implicit assumptions, and exception condition testing |
| `QD-P-2.1.x` Structure and Specification Defects | AS-09 | Availability, Auditability | Format parsing, reference resolution, structure, and critical constraint reachability testing |
| `QD-P-2.2.1` Input Source Not Declared | AS-01, AS-03 | D1, D2, D3 | Source confusion testing with user input, history, external documents, and Tool returns |
| `QD-P-2.2.2–2.2.4` Input Format, Necessity, and Missing Handling Deficiencies | AS-02, AS-07 | D2, D3, Availability | Null values, malformed formats, missing fields, default value manipulation, and encoding variant testing |
| `QD-P-2.3.1–2.3.3` Output Format, Schema, and Stability Deficiencies | AS-03, AS-09 | D1, Integrity, Auditability | Output parsing, required fields, format bypass, and repeated-run stability testing |
| `QD-P-2.3.4` Security and Privacy Filter Missing | AS-03 | D1 | PII requests, Prompt extraction, sensitive context output, and exfiltration testing |
| `QD-P-2.4.1–2.4.3` Workflow, Resource, and Call Specification Deficiencies | AS-05, AS-07, AS-09 | D2, D3, Availability | Tool selection, parameter construction, call order, and fallback call testing after failure |
| `QD-P-2.5.1` Termination Constraint Missing | AS-06 | Availability | Loop, recursion, retry, timeout, and budget exhaustion testing |
| `QD-P-2.5.2` Security Boundary Constraint Missing | AS-01, AS-03, AS-04 | D1, D2, D3 | Single-turn/multi-turn injection, indirect injection, goal hijacking, system prompt extraction testing |
| `QD-P-2.5.3` Permission Control Boundary Missing | AS-04, AS-05 | D2, D3 | Role escalation, cross-user, cross-tenant, read/write/delete, and privilege escalation testing |
| `QD-P-2.5.4` Constraint Priority Not Defined | AS-01, AS-07 | D1, D2, D3 | Security, efficiency, and task completion goal conflict testing |
| `QD-P-2.5.5` Resource Call Frequency Limit Missing | AS-06 | Availability | High frequency, concurrency, 429, call budget, and retry storm testing |
| `QD-P-2.6.x` Exception Handling Defects | AS-07 | D1, D2, D3, Availability | Timeout, permission denial, rate limiting, data format errors, and dependency failure testing |
| `QD-P-2.7.x` Example Design Defects | AS-01, AS-05 | D1, D2, D3 | Adversarial regression testing for positive examples, negative examples, boundary, and dangerous requests |

## A.2 Skill Defect Mapping (QD-S-*)

| QD ID | Candidate attack surface (AS-*) | Potential impact | Note — suggested validation directions (condensed) |
|-------|--------------------------------|------------------|------------------------------------------------------|
| `QD-S-0.x` Basic Compliance | AS-09 | Availability, Auditability | Parsing, field completeness, version, and metadata consistency testing |
| `QD-S-1.1–1.3` Input, Output, and Execution Resource Boundary Missing | AS-06 | Availability | Large input, large output, call count, timeout, and budget exhaustion testing |
| `QD-S-1.4` Permission Boundary Missing | AS-04, AS-05 | D2, D3 | Read/write/delete confusion, dangerous operations, and least privilege testing |
| `QD-S-1.5` Data Source Boundary Missing | AS-01, AS-03, AS-04 | D1, D3 | Historical session pollution, cross-user, external resources, and data source testing |
| `QD-S-2.1–2.3` Unbounded Quantity, Termination, and Open Enumeration | AS-06, AS-07 | Availability, Integrity | Full request, loop, partial completion, open output structure testing |
| `QD-S-2.4` Overly Broad Capability Verbs | AS-04, AS-05 | D2, D3 | Semantic expansion testing for words like "manage", "process", "fix" |
| `QD-S-3.1–3.3` Trigger, Non-Activation, and Ambiguity Strategy Deficiencies | AS-01, AS-04 | D1, D2, D3 | Adjacent intent, negative intent, mixed intent, and insufficient information testing |
| `QD-S-3.4` Task Scope Not Defined | AS-01, AS-05 | D2, D3 | Goal hijacking, implicit tasks, scope expansion, and indirect delegation testing |
| `QD-S-3.5–3.6` Default Behavior and Metadata Defects | AS-05, AS-09 | D2, Availability | Empty input, similar Skills, name confusion, and incorrect routing testing |
| `QD-S-4.x` Failure Expansion | AS-07 | D1, D2, D3, Availability | Tool failure, partial completion, degradation, recovery, and prohibited behavior testing |
| `QD-S-5.1` Read/Write/Delete Permissions Not Distinguished | AS-04, AS-05 | D2, D3 | Read requests inducing write/delete, permission convergence, and side effect testing |
| `QD-S-5.2` High-Risk Confirmation Missing | AS-05 | D2, D3 | Vague confirmation, negative confirmation, repeated confirmation, and cancellation confirmation testing |
| `QD-S-5.3` Environment Boundary Not Declared | AS-04, AS-05 | D2, D3 | Test/production environment confusion, production resource access testing |
| `QD-S-5.4` Chained Call Permissions Not Declared | AS-04, AS-05, AS-07 | D1, D2, D3 | Downstream Skill whitelist, call depth, permission inheritance testing |

## A.3 Tool Defect Mapping (QD-T-*)

| QD ID | Candidate attack surface (AS-*) | Potential impact | Note — suggested validation directions (condensed) |
|-------|--------------------------------|------------------|------------------------------------------------------|
| `QD-T-1.1–1.3` Structure Validity Defects | AS-05, AS-09 | D2, Availability | Tool selection, Schema parsing, required fields, enumeration, and version compatibility testing |
| `QD-T-1.4` `additionalProperties` Not Controlled | AS-02, AS-04 | D1, D2, D3 | Additional fields, reserved fields, role, tenant, and token field injection testing |
| `QD-T-2.1–2.4` Parameter Constraint Missing | AS-02, AS-06 | D2, D3, Availability | Length, format, numeric, array, combined parameter, and extreme value testing |
| `QD-T-3.1` Write Operation Not Identified | AS-05 | D2 | Write operation misselection, confirmation, rollback, and idempotency testing |
| `QD-T-3.2` Raw Input Passthrough | AS-02 | D1, D2, D3 | Parameter injection, encoding bypass, parameter pollution, and downstream passthrough testing |
| `QD-T-3.3` Batch Operation Unrestricted | AS-05, AS-06 | D2, Availability | Maximum batch, batch bypass, cancellation, interruption recovery, and duplicate submission testing |
| `QD-T-3.4` Internal Parameter Exposure | AS-04 | D1, D2, D3 | `tenantId`, `isAdmin`, role, token, and control flag tampering testing |
| `QD-T-3.5` Cross-Tool Data Flow Risk | AS-03, AS-05 | D1, D2, D3 | Taint propagation, sensitive data exfiltration, recipient manipulation, and chained call testing |
| `QD-T-4.1–4.3` Semantic Clarity Defects | AS-05, AS-08 | D2, D3, Availability | Similar Tools, near-synonym expressions, ambiguous tasks, and malicious Tool selection guidance testing |
| `QD-T-5.1–5.2` Change and Impact Assessment Defects | AS-08, AS-09 | D2, D3, Availability | Old/new Schema replay, caller compatibility, migration, and rollback testing |

## A.4 Cross Defect Mapping (QD-PS-*/QD-PT-*/QD-ST-*)

| QD ID | Candidate attack surface (AS-*) | Potential impact | Note — suggested validation directions (condensed) |
|-------|--------------------------------|------------------|------------------------------------------------------|
| `QD-PS-1.1` Skill Authorization Consistency | AS-04, AS-09 | D2, D3 | Prompt→Skill unauthorized call, name confusion, and capability expansion testing |
| `QD-PS-1.2` Trigger Condition Consistency | AS-01, AS-05 | D2, D3 | Trigger, non-trigger, adjacent intent, and mixed intent testing |
| `QD-PS-1.3–1.4` Permission and Resource Consistency | AS-03, AS-04 | D1, D2, D3 | Prompt→Skill permissions, resource sources, cross-tenant, and least privilege testing |
| `QD-PS-1.5–1.6` Failure and Output Constraint Consistency | AS-03, AS-07, AS-09 | D1, D2, Availability | End-to-end failure, recovery, output format, and data leakage testing |
| `QD-PT-2.1–2.3` Tool Existence, Call, and Parameter Contract | AS-02, AS-05, AS-09 | D2, Availability | Prompt→Tool name, parameter, call order, and compatibility testing |
| `QD-PT-2.4` Permission Granularity Consistency | AS-04, AS-05 | D2, D3 | High-risk Tool call, confirmation, permission, and side effect testing |
| `QD-PT-2.5–2.6` Error Handling and Frequency Reasonableness | AS-06, AS-07 | Availability, D2 | Rate limiting, timeout, permission errors, call budget, and duplicate execution testing |
| `QD-ST-3.1–3.3` Tool Existence, Input Constraint, Parameter Preparation | AS-02, AS-09 | D2, Availability | Skill→Tool parameter source, required fields, Schema validation testing |
| `QD-ST-3.4` Call Frequency Matching | AS-06 | Availability | Maximum call count, batch, and budget testing |
| `QD-ST-3.5` Output Structure Matching | AS-03, AS-09 | D1, Integrity, Auditability | Tool return structure, downstream parsing, citation, or format testing |
| `QD-ST-3.6` Permission Scope Matching | AS-04, AS-05 | D2, D3 | Skill→Tool actual side effects, read/write/delete, and confirmation testing |
| `QD-ST-3.7` Error Handling Coverage | AS-07, AS-09 | D1, D2, Availability | Tool error classification, degradation, stop, retry, and human takeover testing |

## A.5 Permission Defect Mapping (QD-PM-*)

> Source note (condensed): `QD-PM-*` are produced by the Inspect Permission Governance subset (permission v1.0). This table only defines mapping directions and does not automatically determine permission defects as EX risks or actual events; `EX` classification is still independently determined by Risk Explicit. The Permission subset executes after other subsets and is subject to Gate-0 preconditions; when Gate-0 is not met, no QD-PM defects are produced, and this table does not apply.

| QD ID | Candidate attack surface (AS-*) | Potential impact | Note — suggested validation directions (condensed) |
|-------|--------------------------------|------------------|------------------------------------------------------|
| `QD-PM-1.x` Permission Alignment (including 1.1 unexplainable permissions, 1.3 insufficient permissions) | AS-04 | D2, D3, Availability | Out-of-role resource access, aggregated unauthorized access, task failure or workaround due to insufficient permissions testing |
| `QD-PM-2.x` Permission Scope (resource / data / environment / condition four axes, including 2.4 environment boundary not declared) | AS-04, AS-03 | D1, D2, D3 | Out-of-scope resource access, cross-tenant data reading, test/production environment confusion, out-of-condition triggering testing |
| `QD-PM-3.x` Permission Granularity (including 3.3 role substitution, 3.4 high-risk not separated) | AS-04, AS-05 | D2, D3 | Single role completing "initiation + approval", high-risk and routine operations executed with same authority, role impersonation testing |
| `QD-PM-4.x` Permission Propagation (including 4.2 downstream exceeds upstream, 4.4 delegation escalation, 4.8 external permissions, INHERITED status) | AS-04, AS-07, AS-08 | D1, D2, D3 | Call chain permission inheritance, downstream Skill/Tool effective permissions vs upstream, delegation chain escalation, external/third-party permission source testing |
| `QD-PM-5.x` Permission Boundary (including 5.4 isolation substitutes for permission, 5.7 exemption uncontrolled) | AS-04, AS-05 | D2, D3 | Exemption trigger conditions, exemption expiration, bypass after network/environment isolation substitutes for permission constraints testing |
| `QD-PM-6.x` Permission Auditability (including 6.3 no human confirmation, 6.5 inventory not enumerable) | AS-05, AS-09 | D2, D3, Auditability | High-risk operation without direct confirmation, permission inventory not enumerable / not auditable, audit log missing testing |

## Candidate failure modes (FM-*) — from relevance.md Appendix B.1

The source Appendix A tables contain **no per-row FM mappings** and no per-row strength ratings; FM associations in the framework live in Appendix B.1 at **QD-category-group granularity** (rows group multiple QD IDs). To emit the FM field of an Impact Card:

1. Find the B.1 row below whose category description matches the defect's QD family (e.g., `QD-P-1.1.x` → "Prompt logic contradiction, mismatch, implication defects"; `QD-ST-3.x` → "Cross contract defects").
2. Copy that row's FM codes as **candidate** failure modes.
3. If a QD ID does not clearly fall into any B.1 group (notably `QD-PM-*`, which B.1 does not cover), write "no category-level FM association defined in Appendix B.1" — do not guess.

FM-* code names are defined in `quality/tool-agent.md` (L1); Appendix B.1 uses FM-01 through FM-10. RAG-Agent metric associations are reproduced in condensed form in the "Candidate RAG-Agent quality metrics" section below (from relevance.md Appendix C.1).

| QD category group (verbatim, B.1) | Candidate failure modes (FM-*) |
|-----------------------------------|--------------------------------|
| Prompt logic contradiction, mismatch, implication defects | FM-01, FM-02, FM-07, FM-09 |
| Prompt input definition defects | FM-01, FM-04 |
| Prompt output definition defects | FM-06 |
| Prompt workflow and resource defects | FM-03, FM-04, FM-05 |
| Prompt boundary, frequency, and termination defects | FM-08, FM-09, FM-10 |
| Prompt exception handling defects | FM-08, FM-10 |
| Prompt example design defects | FM-01, FM-07, FM-09 |
| Skill resource or unbounded declaration defects | FM-08, FM-10 |
| Skill trigger, ambiguity, scope defects | FM-02, FM-07, FM-09 |
| Skill failure expansion defects | FM-08, FM-09 |
| Skill permission and environment boundary defects | FM-05, FM-09 |
| Tool structure and parameter defects | FM-03, FM-04, FM-05 |
| Tool high-risk operation defects | FM-08, FM-09, FM-10 |
| Tool semantic competition defects | FM-03, FM-05 |
| Tool Schema change defects | FM-04, FM-05, FM-06 |
| Cross contract defects | FM-04, FM-05, FM-06, FM-08 |

## Candidate RAG-Agent quality metrics — from relevance.md Appendix C.1

Source boundary (relevance.md §3.3.1): RAG-Agent quality evaluates **user-visible content output and boundary handling**, and does not directly score internal components such as Prompt, retrieval, knowledge base, model, or Tool. The 12 metrics span four dimensions: Knowledge answer quality (Correctness, Completeness, Relevance, Traceability, Timeliness); Dialogue and complex task quality (Consistency, Robustness, Decomposition Capability, Coherence); Expression and compliance quality (Format compliance); Boundary and safety response quality (Boundary recognition, Safety response).

The mapping below is **candidate only**: a QD category "may affect" the listed metrics, meaning it is worth prioritizing supplementary test design or investigation — it does not mean the defect will necessarily cause a metric to lose points (§3.3.1). The lite inspector never runs the Quality subset; emit these as candidate associations, never as confirmed quality outcomes.

| QD Category | Candidate affected metrics | Recommended supplementary tests (condensed) |
|---|---|---|
| Prompt logic contradiction, mismatch, implication defects | Correctness, Relevance, Consistency, Format Compliance | Rule conflicts, role boundaries, multi-constraint Q&A |
| Prompt gray zone defects | Consistency, Robustness, Boundary Recognition, Safety Response | Vague terms, multi-turn follow-ups, conflicting rules, knowledge updates |
| Prompt input definition defects | Relevance, Robustness, Decomposition Capability, Boundary Recognition | Colloquial rewrites, missing conditions, multi-intent, abnormal formats |
| Prompt output definition defects | Completeness, Traceability, Format Compliance, Consistency | Citations, structure, disclaimers, JSON/Markdown |
| Prompt workflow, resource, and Tool defects | Correctness, Traceability, Timeliness | Knowledge source selection, retrieval Tool, citation chain, failure fallback |
| Prompt security, permission, and exception boundary defects | Boundary Recognition, Safety Response, Coherence | Unauthorized, sensitive, no-hit, handoff-required, dependency failure |
| Prompt example design defects | Correctness, Robustness, Consistency, Format Compliance | Positive/negative examples, boundary expressions, adversarial rewrites |
| Skill resource and unbounded declaration defects | Completeness, Timeliness, Robustness | Large input, multi-documents, exceeding limits, partial completion |
| Skill trigger, scope, and ambiguity defects | Relevance, Decomposition Capability, Boundary Recognition | Intent boundaries, non-activation, clarification and handoff |
| Skill failure expansion defects | Completeness, Coherence, Safety Response | No hits, low-confidence sources, source conflicts, retrieval failure |
| Skill permission and environment boundary defects | Boundary Recognition, Safety Response, Traceability | Sensitive data, user identity, production data, external resources |
| Tool parameter and semantic defects | Correctness, Relevance, Traceability, Format Compliance | Retrieval parameters, source return, citation parsing, similar Tools |
| Cross contract defects | Correctness, Completeness, Consistency, Traceability, Safety Response | End-to-end retrieval, citation, error handling, permission, output contracts |

Out of scope (not reproduced): relevance.md Appendix C.2 (RAG failure **reverse** diagnostic — requires actual Quality failures, which the lite inspector never produces) and D.3 (RAG-Agent quality **defect chains**).

## Prohibited automatic inference (verbatim, relevance.md §2.3.1)

"The following inferences are all invalid:"

- `QD-P-2.5.2 Security Boundary Missing` ≠ Automatic hit `NL-A-7` Reverse Restriction Elimination Type
- `QD-T-1.4 additionalProperties Not Controlled` ≠ Automatic hit `NR-S-3` Parameter Type/Constraint Abnormal Declaration
- `QD-PS-1.3 Permission Boundary Consistency Defect` ≠ Automatic hit `NL-B-9` Cross-Object Authorization Chain Forgery

Source closing rule: "Only when an explicit expression meeting the EX definition exists in the artifact can Risk Explicit independently determine the corresponding `EX` classification." The lite inspector never determines `EX` classifications at all (Risk Explicit is not run).

## Impact Card template (condensed from relevance.md §5.5, single-defect lite form)

```markdown
### Impact Card: <QD-ID> | <short defect name> | <P0/P1/P2> (scope)

**Static Discovery**  <!-- confirmed facts -->
- Artifact: <prompt|skill|tool>:<name>
- Version: <version label / hash>
- Evidence: <rule hit and location, one line>

**Potential Security Associations**  <!-- candidate associations, NOT confirmed impact -->
- Candidate Attack Surface: AS-xx <name> [, AS-yy ...]
- Potential Impact: D1 / D2 / D3 / Availability / Integrity / Auditability
- Mapping Strength: <Strong|Medium|Conditional — per §1.3 with one-line justification,
  labeled "provisional (lite)"> — association confidence only, NOT severity
- Note: This conclusion indicates priority for validation; it does not yet indicate that
  the backend is exploitable. (verbatim §5.5)

**Recommended Validation — NOT run by this lite inspector**  <!-- mandatory statements -->
- Risk Explicit: NOT run — no EX classification was or can be determined here (§2.3.1).
- Risk Implicit: NOT run — dynamic exploitability is unverified.
- External controls: presence/absence UNKNOWN; per relevance.md §1.4, no assumption is
  made that compensating controls outside the artifacts are absent.
- If the full framework is adopted later: Risk Explicit review of <Note directions>;
  Risk Implicit testing of <Note directions>; required conditions: shadow sandbox,
  controlled test data, call traces, Mock downstream services.

**Potential Quality Associations**  <!-- candidate -->
- Tool-Agent: FM-xx, FM-yy (category-level, from Appendix B.1 table above)
- RAG-Agent: <metrics> (candidate, from the Appendix C.1 table above; NOT a quality result)

**Current Evidence Status**
- Static Defect: Confirmed
- Dynamic Exploitability: Not verified
- Quality Association: Not verified
- Compensating Control: To be confirmed

**Remediation and Regression**
- Recommendation: <per the owning L1 sub-specification>
- Minimum Regression: Inspect re-scan of the updated artifact passing the same rule ID;
  associated Risk/Quality test cases only when those subsets are actually run.
```

Report wording (verbatim, relevance.md §5.5.1):

| Permissible Wording | Prohibited Wording |
|---------------------|--------------------|
| "May expand the attack surface" | "Has already been attacked" |
| "Recommended to prioritize validation" | "Vulnerability necessarily exists" |
| "Candidate quality root cause" | "Quality failure is caused by this defect" |
| "Relies on compensating controls" | "Completely secure" |
| "Not reproduced under current test conditions" | "Absolutely unexploitable" |

## Defect chains — out of scope (relevance.md §1.5)

The framework also defines defect chain mapping: "Defect chains are used to identify candidate exploitation or failure paths formed by multiple defects in combination" (e.g., a boundary deficiency combined with insufficient permission declaration and a high-risk Tool capability). Chains require a unique `chain_id`, retention of member defects and cross-artifact relationships, prioritized end-to-end Risk Implicit validation, coordinated remediation, and full-path regression (relevance.md §1.5, Appendix D). **Out of scope for the lite inspector v1**: this reference supports single-defect candidate mapping only — do not construct, assert, or report defect chains (`SC-*` / `QC-TA-*` / `QC-RA-*`), and never upgrade separate single-defect candidate associations into a claimed chain path.
