---
title: Inspect Cross
description: "Inspect Cross specification: cross-artifact consistency checks across System Prompts, Skills, and Tool Schemas."
---

# SanityOps Framework

# Inspect Cross Specification

---

**Version**: v1.1

**Release Date**: October 2026

**Maintained by**: Sanity AI Labs

**License**: CC BY-SA 4.0

**Dependency**: Core v1.1 (object relationships, `AC-L`, versioning and evidence)

---

## Table of Contents

- [Foreword](#foreword)
  - [0.1 Positioning and Scope](#01-positioning-and-scope)
  - [0.2 Terminology and Numbering System](#02-terminology-and-numbering-system)
  - [0.3 Version Information](#03-version-information)
- [Part 1: Cross-Artifact Inspection Overview](#part-1-cross-artifact-inspection-overview)
  - [1.1 Why Cross-Artifact Inspection](#11-why-cross-artifact-inspection)
  - [1.2 Roles and Responsibilities of the Three Artifact Types](#12-roles-and-responsibilities-of-the-three-artifact-types)
  - [1.3 Introduction to the Inspection Relationships](#13-introduction-to-the-three-inspection-relationships)
  - [1.4 The Review Schema: Value and Positioning](#14-the-review-schema-value-and-positioning)
  - [1.5 Part Summary](#15-part-summary)
- [Part 2: QD-PS Inspection Items (Prompt → Skill)](#part-2-qd-ps-inspection-items-prompt--skill)
  - [2.1 Inspection Relationship Details](#21-inspection-relationship-details)
  - [2.2 Seven Inspection Items in Detail](#22-six-inspection-items-in-detail)
  - [2.3 Localization and Remediation](#23-localization-and-remediation)
  - [2.4 Part Summary](#24-part-summary)
- [Part 3: QD-PT Inspection Items (Prompt → Tool)](#part-3-qd-pt-inspection-items-prompt--tool)
  - [3.1 Inspection Relationship Details](#31-inspection-relationship-details)
  - [3.2 Seven Inspection Items in Detail](#32-six-inspection-items-in-detail)
  - [3.3 Localization and Remediation](#33-localization-and-remediation)
  - [3.4 Part Summary](#34-part-summary)
- [Part 4: QD-ST Inspection Items (Skill ↔ Tool)](#part-4-qd-st-inspection-items-skill--tool)
  - [4.1 Inspection Relationship Details](#41-inspection-relationship-details)
  - [4.2 Seven Inspection Items in Detail](#42-seven-inspection-items-in-detail)
  - [4.3 Localization and Remediation](#43-localization-and-remediation)
  - [4.4 Part Summary](#44-part-summary)
- [Part 4.5: Circular Invocation Inspection (Cross-Cutting)](#part-45-circular-invocation-inspection-cross-cutting)
  - [4.5.1 Circular Invocation Overview](#45-circular-invocation-overview)
  - [4.5.2 Three Inspection Items in Detail](#453-two-inspection-items-in-detail)
  - [4.5.3 Localization and Remediation](#454-localization-and-remediation)
  - [4.5.4 Part Summary](#455-part-summary)
- [Part 4.6: Skill↔Skill Inspection (QD-SS)](#part-46-skill-skill-inspection-qd-ss)
  - [4.6.1 Skill↔Skill Inspection Overview](#461-skill-skill-inspection-overview)
  - [4.6.2 Two Inspection Items in Detail](#462-two-inspection-items)
  - [4.6.3 Localization and Remediation](#463-location-and-repair)
  - [4.6.4 Part Summary](#464-part-summary)
- [Part 4.7: Tool↔Tool Inspection (QD-TT)](#part-47-tool-tool-inspection-qd-tt)
  - [4.7.1 Tool↔Tool Inspection Overview](#471-tool-tool-inspection-overview)
  - [4.7.2 Three Inspection Items in Detail](#472-two-inspection-items)
  - [4.7.3 Localization and Remediation](#473-location-and-repair)
  - [4.7.4 Part Summary](#474-part-summary)
- [Part 5: Inspection Process and Severity Mechanisms](#part-5-inspection-process-and-severity-mechanisms)
  - [5.1 Inspection Process Overview](#51-inspection-process-overview)
  - [5.2 Prerequisites and Artifact Relationship Identification](#52-prerequisites-and-artifact-relationship-identification)
  - [5.3 Automated Inspection Execution](#53-automated-inspection-execution)
  - [5.4 Severity Levels and Agent-Level Binding](#54-severity-levels-and-agent-level-binding)
  - [5.5 Part Summary](#55-part-summary)
- [Part 6: Localization and Remediation Mechanisms](#part-6-localization-and-remediation-mechanisms)
  - [6.1 Defect Localization Mechanism](#61-defect-localization-mechanism)
  - [6.2 Impact Assessment Model](#62-impact-assessment-model)
  - [6.3 Remediation Priority Rules](#63-remediation-priority-rules)
  - [6.4 Remediation Example Set](#64-remediation-example-set)
    - [6.4.1 Permission Inconsistency Remediation Example](#641-permission-inconsistency-remediation-example)
    - [6.4.2 Trigger Condition Conflict Remediation Example](#642-trigger-condition-conflict-remediation-example)
    - [6.4.3 Parameter Constraint Inconsistency Remediation Example](#643-parameter-constraint-inconsistency-remediation-example)
    - [6.4.4 Failure Handling Conflict Remediation Example](#644-failure-handling-conflict-remediation-example)
    - [6.4.5 Linked Defect Remediation Example](#645-linked-defect-remediation-example)
    - [6.4.6 Circular Invocation Remediation Example](#646-circular-invocation-remediation-example)
    - [6.4.7 Multi-Agent Circular Invocation Remediation Example](#647-multi-agent-circular-invocation-remediation-example)
  - [6.5 Part Summary](#65-part-summary)
- [Part 7: Inspection Timing and the Ratchet Mechanism](#part-7-inspection-timing-and-the-ratchet-mechanism)
  - [7.1 Lifecycle Inspection Timing](#71-lifecycle-inspection-timing)
  - [7.2 Ratchet Mechanism and Version Binding](#72-ratchet-mechanism-and-version-binding)
  - [7.3 Part Summary](#73-part-summary)
  - [7.4 Three-Layer Carrying of Frequency and Batch Constraints](#74-frequency-and-batch-constraints-three-layers)
- [Part 8: Quantitative Scoring Mechanism](#part-8-quantitative-scoring-mechanism)
  - [8.1 Scoring Principles](#81-scoring-principles)
  - [8.2 Calculation Steps](#82-calculation-steps)
  - [8.3 Inspection Item Distribution Table](#83-inspection-item-distribution-table)
  - [8.4 Scoring Examples](#84-scoring-examples)
  - [8.5 Multi-Defect Handling Rules](#85-multi-defect-handling-rules)
  - [8.6 Part Summary](#86-part-summary)
- [Part 9: Appendices](#part-9-appendices)
  - [Appendix A: Complete Inspection Item List](#appendix-a-complete-inspection-item-list)
  - [Appendix B: Minimum Rule Sets](#appendix-b-minimum-rule-sets)
  - [Appendix C: Severity Upgrade Rules in Detail](#appendix-c-severity-upgrade-rules-in-detail)
  - [Appendix D: Remediation Ownership Summary](#appendix-d-remediation-ownership-summary)
  - [Appendix E: Inspection Report Template](#appendix-e-inspection-report-template)
  - [Appendix F: Usage Examples](#appendix-f-usage-examples)
- [Part 10: Summary](#part-10-summary)

---

## Foreword

> **Document design principle: serving both inspection and audit needs.**
>
> To reduce the risk of missed findings and to preserve traceable audit evidence, this document **allows the same object to be hit by multiple inspection items across different dimensions** — this may look like "similarity / duplication / subsumption" on the surface, but it is intentional by design, not redundancy.
>
> At the quantitative scoring stage, however, to avoid double deductions and to reflect the true quality of the inspected Logic Artifact objectively, same-source deduplication and merging must follow the "Multi-Defect Handling Rules" (§8.5) of this document: one root cause and one harm path are deducted only once.
>
> If you question whether certain inspection items are "overly redundant", verify consistency with counter-examples and edge cases — confirm whether the trigger conditions truly overlap and whether the attribution reaches consistent boundary conclusions — rather than concluding from surface similarity alone.

<a id="01-positioning-and-scope"></a>
### 0.1 Positioning and Scope

<a id="011-what-this-specification-is"></a>
#### 0.1.1 What This Specification Is

This specification is one of the core sub-specifications of the SanityOps Framework's Inspect Standard. It defines the inspection standard for **Cross-Artifact Consistency** across AI Agent artifacts.

This specification is designed to:

- Identify consistency defects between the three artifact types — Prompt, Skill, and Tool
- Provide a unified inspection framework for cross-artifact inspection, review, and governance
- Provide explicit rule definitions for automated inspection tooling (the Inspect Cross inspection Agent)

<a id="012-what-this-specification-is-not"></a>
#### 0.1.2 What This Specification Is Not

This specification is **not**:

- A repetition of single-artifact inspection specifications: it does not duplicate the inspection content of Inspect Prompt, Inspect Tool, or Inspect Skill
- A development guide: it does not prescribe how to design "good" cross-artifact relationships
- A runtime monitoring specification: it does not address cross-artifact behavior monitoring during Agent execution
- A permission management specification: it does not replace system-level permission control mechanisms

<a id="013-inspection-prerequisites-and-boundaries"></a>
#### 0.1.3 Inspection Prerequisites and Boundaries

**Inspection Prerequisites**:

- All three artifact types (Prompt, Skill, Tool) have passed their respective single-artifact inspections (Inspect Prompt, Inspect Tool, Inspect Skill)
- All P0 defects have been remediated
- Artifact version consistency has been confirmed

**Inspection Boundaries**:

- This specification focuses on **Hidden Defects Under Reasonable Expression** — situations where each artifact is individually valid, but semantic conflicts or constraint gaps emerge when they are combined
- It does not re-discover defects already covered by single-artifact inspection
- It does not cover dynamic monitoring of cross-artifact behavior at runtime

<a id="014-position-within-the-sanityops-framework"></a>
#### 0.1.4 Position Within the SanityOps Framework

```
SanityOps Framework
│
├─ Inspect (Defect Inspection)
│   ├─ Inspect Tool ← Tool Schema defect inspection
│   ├─ Inspect Prompt ← System Prompt defect inspection
│   ├─ Inspect Skill ← Skill defect inspection
│   ├─ Inspect Cross ← Cross-Artifact defect inspection ← You are here
│   └─ Inspect Permission ← Permission-responsibility proportionality inspection (QD-PM)
│
├─ Risk (Risk Scanning)
│   ├─ Risk Explicit ← Explicit Logic Artifact risk detection
│   └─ Risk Implicit ← Implicit Agent runtime vulnerability scanning
│
└─ Quality (Service Quality)
    ├─ Quality RAG-Agent ← RAG-Agent service quality assessment
    └─ Quality Tool-Agent ← Tool-Agent service quality assessment
│
└─ Relevance (Impact Mapping)
    └─ Relevance ← defect → risk/quality diagnostic mapping
```

<a id="015-inspection-order-and-scope"></a>
#### 0.1.5 Inspection Order and Scope

**Execution Order**:

- Step 1: Execute Inspect Prompt, Inspect Tool, Inspect Skill single-artifact inspections
- Step 2: Remediate defects discovered by single-artifact inspection
- Step 3: Execute Inspect Cross cross-artifact inspection
- Step 4: Remediate defects discovered by cross-artifact inspection

**Inspection Scope**:

**Inspection Objects**:

- Consistency between Prompt and Skill
- Consistency between Prompt and Tool
- Consistency between Skill and Tool
- Consistency between Skill and Skill
- Consistency between Tool and Tool

**Core Inspection Dimensions**:

```
├─ QD-PS: Prompt → Skill (capability authorization and boundary delegation)
├─ QD-PT: Prompt → Tool (tool invocation contract)
├─ QD-ST: Skill ↔ Tool (capability implementation and parameter contract)
├─ QD-SS: Skill ↔ Skill (trigger conflicts and name uniqueness)
├─ QD-TT: Tool ↔ Tool (cross-tool data flow and semantic competition)
└─ QD-CYC: Circular Invocation (cross-cutting)
```

---

<a id="02-terminology-and-numbering-system"></a>
### 0.2 Terminology and Numbering System

<a id="021-core-terminology"></a>
#### 0.2.1 Core Terminology

| Term | Definition |
| --- | --- |
| **Cross-Artifact Defect** | A consistency issue between Prompt, Skill, and Tool artifacts where each artifact is individually valid but semantic conflicts arise when combined |
| **Constraint Propagation Chain** | The path through which constraint declarations in one artifact type propagate to another via invocation relationships |
| **Authorization Coverage** | Whether the authorization scope granted by the Prompt to a Skill or Tool covers the capabilities declared by that Skill or Tool |
| **Capability Boundary Match** | Whether a Skill's capability declarations are consistent with the actual capabilities of its associated Tools |
| **Hidden Defect Under Reasonable Expression** | An inconsistency that emerges from artifact combinations, where each artifact's expression is individually specification-compliant |
| **Linked Defect** | A defect where the same root cause simultaneously hits ≥2 inspection item numbers, and the evidence falls in the same field/declaration and remediation is inseparable (see 6.2.2) |
| **AC-L1/L2/L3** | Agent complexity levels (as defined in Inspect Prompt v1.1) |
| **OR-L1/L2/L3** | Tool / Skill operation risk levels (as defined in Inspect Tool / Skill v1.1) |
| **P0/P1/P2** | Defect severity levels (as defined in Inspect Skill v1.1) |

<a id="022-numbering-system"></a>
#### 0.2.2 Numbering System

This specification uses the **QD-XY-n.m** numbering system:

```
QD-XY-n.m

├─ QD: Quality Defect
├─ XY: The two artifact types involved
│   ├─ PS: Prompt and Skill
│   ├─ PT: Prompt and Tool
│   ├─ ST: Skill and Tool
│   ├─ SS: Skill and Skill
│   ├─ TT: Tool and Tool
│   └─ CYC: Circular Invocation (cross-cutting, see Part 4.5)
├─ n: Relationship number
│   ├─ 1: Prompt → Skill relationship
│   ├─ 2: Prompt → Tool relationship
│   ├─ 3: Skill ↔ Tool relationship
│   ├─ 4: Skill ↔ Skill relationship
│   ├─ 5: Tool ↔ Tool relationship
│   └─ 1: Circular Invocation category (QD-CYC)
└─ m: Specific inspection item number
```

**Special Notes**:

- `QD-CYC-1.1` / `QD-CYC-1.2` / `QD-CYC-1.3`: respectively cross-artifact circular invocation, multi-Agent circular invocation, and Skill-to-Skill handoff loops; `CYC` denotes circular invocation and does not follow the two-letter artifact pairing pattern. For `QD-CYC`, the relationship number `n` is fixed to `1` (the Circular Invocation category) rather than a Prompt/Skill/Tool relationship index, and `m` distinguishes the three sub-items.
- These items are positioned in **Part 4.5: Circular Invocation Inspection (Cross-Cutting)**.

**Examples**:

- `QD-PS-1.1`: Prompt → Skill relationship, inspection item #1 (Skill Authorization Consistency)
- `QD-PT-2.4`: Prompt → Tool relationship, inspection item #4 (Permission Granularity Consistency)
- `QD-ST-3.6`: Skill ↔ Tool relationship, inspection item #6 (Permission Scope Match)
- `QD-SS-4.1`: Skill ↔ Skill relationship, inspection item #1 (Trigger Condition Conflict)
- `QD-TT-5.1`: Tool ↔ Tool relationship, inspection item #1 (Cross-Tool Data Flow)

<a id="023-defect-level-definitions-p0p1p2"></a>
#### 0.2.3 Defect Level Definitions (P0/P1/P2)

| Symbol | Level | Meaning |
| --- | --- | --- |
| 🔴 | **P0** | Prevents Agent functionality or introduces security risk → **MUST be fixed** |
| 🟡 | **P1** | May cause behavioral instability or functional defects → **SHOULD be fixed** |
| 🟢 | **P2** | Affects readability or efficiency, but does not impact functionality → **MAY be fixed** |

**Note**: The defect severity levels in this specification follow the P0/P1/P2 definitions from Inspect Skill v1.1.

<a id="024-abbreviation-table"></a>
#### 0.2.4 Abbreviation Table

| Abbreviation | Full Name | Source Specification |
| --- | --- | --- |
| **QD-P** | Quality Defect - Prompt | Inspect Prompt v1.1 |
| **QD-T** | Quality Defect - Tool | Inspect Tool v1.1 |
| **QD-S** | Quality Defect - Skill | Inspect Skill v1.1 |
| **QD-PS** | Quality Defect - Prompt/Skill | This specification |
| **QD-PT** | Quality Defect - Prompt/Tool | This specification |
| **QD-ST** | Quality Defect - Skill/Tool | This specification |
| **QD-SS** | Quality Defect - Skill/Skill | This specification |
| **QD-TT** | Quality Defect - Tool/Tool | This specification |
| **QD-CYC** | Quality Defect - Circular Invocation | This specification |
| **AC-L1/L2/L3** | Agent complexity level | Inspect Prompt v1.1 |
| **OR-L1/L2/L3** | Tool/Skill operation risk level | Inspect Tool / Skill v1.1 |
| **P0/P1/P2** | Defect Level | Inspect Skill v1.1 |

---

<a id="03-version-information"></a>
### 0.3 Version Information

<a id="031-current-version"></a>
#### 0.3.1 Current Version

- **Version**: v1.1
- **Release Status**: Released
- **Last Updated**: October 2026
- **Maintained by**: Sanity AI Labs

<a id="032-version-history"></a>
#### 0.3.2 Version History

| Version | Release Date | Major Changes |
| --- | --- | --- |
| v1.0 | 2026-10 | Initial release |
| v1.1 | 2026-10 | Expanded Inspect and Permission defect coverage; Risk Explicit regraded to P0/P1/P2; multi-hit design principle clarified; terminology aligned to Logic Artifacts |

---

## Part 1: Cross-Artifact Inspection Overview

<a id="11-why-cross-artifact-inspection"></a>
### 1.1 Why Cross-Artifact Inspection

<a id="111-the-limitations-of-single-artifact-inspection"></a>
#### 1.1.1 The Limitations of Single-Artifact Inspection

Inspect Prompt, Inspect Tool, and Inspect Skill each independently inspect one artifact type. They share the following limitations:

| Limitation | Description |
| --- | --- |
| **Blind-spot coverage gaps** | Cannot discover issues where each artifact is individually valid, but semantic conflicts arise when combined |
| **Missing constraint propagation** | A constraint declared in one artifact type may have no corresponding implementation in another |
| **Authorization boundary inconsistency** | The authorization scope in the Prompt may not match the declared capabilities of the Skill or Tool |
| **Broken failure handling chain** | The Prompt's failure handling strategy may have no concrete implementation at the Skill or Tool level |

<a id="112-hidden-defects-under-reasonable-expression"></a>
#### 1.1.2 Hidden Defects Under Reasonable Expression

**Core Definition**: Cross-Artifact Inspection focuses on problems where the expression of each artifact is individually specification-compliant, but semantic conflicts or constraint gaps emerge when they are combined.

**Typical Scenarios**:

| Scenario | Artifact State | Hidden Defect |
| --- | --- | --- |
| **Permission authorization inconsistency** | Prompt declares "read-only permission" ✓; Skill declares "manage data" ✓ | Combined: Skill's "manage" exceeds Prompt's "read-only" authorization → permission overflow |
| **Trigger condition conflict** | Prompt workflow requires "strict triggering" ✓; Skill trigger condition is vague ✓ | Combined: Skill may be incorrectly triggered in inappropriate scenarios → uncontrollable behavior |
| **Parameter constraint gap** | Tool's inputSchema has no maxLength ✓; Prompt has no parameter constraints ✓ | Combined: LLM can pass excessively long parameters → Token runaway |

<a id="113-the-value-of-cross-artifact-inspection"></a>
#### 1.1.3 The Value of Cross-Artifact Inspection

| Value Dimension | Description |
| --- | --- |
| **Blind-spot coverage** | Discovers linked defects that single-artifact inspection cannot reach |
| **Constraint propagation validation** | Ensures the "promise → implementation → usage" constraint chain is complete |
| **Authorization coverage verification** | Ensures the Prompt's authorization scope covers the declared capabilities of Skills and Tools |
| **Security boundary coordination** | Ensures high-risk operations have corresponding boundaries at all three layers — Prompt, Skill, and Tool |

---

<a id="12-roles-and-responsibilities-of-the-three-artifact-types"></a>
### 1.2 Roles and Responsibilities of the Three Artifact Types

<a id="121-prompt-workflow-orchestrator-and-global-constraint-center"></a>
#### 1.2.1 Prompt: Workflow Orchestrator and Global Constraint Center

**Core Positioning**: The top-level designer of Agent behavior, defining "Who, What, How, When, Why."

**Primary Responsibilities**:

- **Identity and role definition** (QD-P-1.2.x): Clear role identity, well-defined responsibility scope
- **Workflow and resource declaration** (QD-P-2.4.x): Available resource/tool list, workflow step definitions
- **Global constraints and boundaries** (QD-P-2.5.x): Security boundary constraints, permission control boundaries
- **Exception and failure handling** (QD-P-2.6.x): Runtime exception coverage, failure handling strategy
- **Input/output specification** (QD-P-2.2.x, 2.3.x): Input source declaration, output format definition

**What It Passes to Other Artifacts**:

| Direction | Content Passed |
| --- | --- |
| **→ Skill** | Capability authorization, trigger conditions, permission boundaries, failure handling strategy |
| **→ Tool** | Tool invocation specification, parameter constraints, permission granularity, error handling |

<a id="122-skill-capability-boundary-declarer-and-resource-control-unit"></a>
#### 1.2.2 Skill: Capability Boundary Declarer and Resource Control Unit

**Core Positioning**: The boundary guardian of a single capability, defining "what it can do, what it cannot do, and to what extent."

**Primary Responsibilities** (based on the six Review Schema dimensions):

- **IDENTITY**: Precise objective description, explicit non_goals declaration, permitted/forbidden resources and operations
- **TRIGGER**: When it should trigger, when it should not trigger
- **INPUT**: Input size limits, format requirements, overflow behavior
- **EXECUTION**: Maximum tool invocation count, maximum retry count, timeout duration
- **OUTPUT**: Output size limits, output structure definition, partial completion strategy
- **FAILURE**: Failure behavior definition, empty input handling, insufficient input handling

**What It Passes to Other Artifacts**:

| Direction | Content Passed |
| --- | --- |
| **→ Prompt** | Capability availability, trigger condition recommendations, failure handling requirements |
| **→ Tool** | Input constraints, output expectations, invocation frequency limits |

<a id="123-tool-execution-contract-and-parameter-constraint-endpoint"></a>
#### 1.2.3 Tool: Execution Contract and Parameter Constraint Endpoint

**Core Positioning**: The contract guarantor for concrete operations, defining "how to correctly invoke and what to return."

**Primary Responsibilities**:

- **Structural validity** (QD-T-1.x): Complete base fields, required/properties consistency
- **Parameter constraint completeness** (QD-T-2.x): String/numeric/array parameter constraints
- **High-risk operation identification** (QD-T-3.x): Write operation markers, sensitive data operations, Cross-Tool Data Flow Risk
- **Semantic clarity** (QD-T-4.x): Description quality, side effect documentation

**What It Passes to Other Artifacts**:

| Direction | Content Passed |
| --- | --- |
| **→ Prompt** | Availability, permission requirements, error types |
| **→ Skill** | Input parameter requirements, output format, side effect documentation |

---

<a id="13-introduction-to-the-three-inspection-relationships"></a>
### 1.3 Introduction to the Inspection Relationships

This section introduces the three base relationships (QD-PS / QD-PT / QD-ST) and the three extended relationships (QD-CYC / QD-SS / QD-TT).

<a id="131-qd-ps-prompt-skill-capability-authorization-and-boundary-delegation"></a>
#### 1.3.1 QD-PS: Prompt → Skill (Capability Authorization and Boundary Delegation)

**Inspection Focus**: Does the Prompt's authorization scope cover the Skill's declared boundaries?

**Content Passed**:

- **Authorization transfer**: Which Skills the Prompt declares as available
- **Trigger transfer**: The Prompt's workflow trigger conditions
- **Boundary transfer**: The Prompt's permission boundaries
- **Failure transfer**: The Prompt's exception handling strategy

**Typical Defect Patterns**:

- A Skill is defined but not within the Prompt's authorization scope
- A Skill's trigger conditions are inconsistent with the Prompt's workflow
- A Skill's permission declarations exceed the Prompt's authorization scope
- A Skill's failure handling contradicts the Prompt's exception handling strategy

<a id="132-qd-pt-prompt-tool-tool-invocation-contract"></a>
#### 1.3.2 QD-PT: Prompt → Tool (Tool Invocation Contract)

**Inspection Focus**: Do the Prompt's tool invocation constraints match the Tool's actual capabilities?

**Content Passed**:

- **Invocation specification transfer**: How the Prompt defines tool invocation
- **Parameter constraint transfer**: The Prompt's parameter constraints during invocation
- **Permission granularity transfer**: The Prompt's permission granularity requirements for tools
- **Error handling transfer**: The Prompt's handling of tool invocation failures

**Typical Defect Patterns**:

- A Tool declared in the Prompt does not exist
- The Prompt's invocation specification does not match the Tool Schema
- A high-risk Tool has no security boundary declaration in the Prompt
- The Prompt does not handle all possible error types from the Tool

<a id="133-qd-st-skill-tool-capability-implementation-and-parameter-contract"></a>
#### 1.3.3 QD-ST: Skill ↔ Tool (Capability Implementation and Parameter Contract)

**Inspection Focus**: Do the Skill's capability boundaries match the Tool's actual capabilities?

**Content Passed** (bidirectional):

**Skill → Tool**:

- Input constraint transfer: The Skill's INPUT dimension constraints
- Invocation frequency transfer: The Skill's EXECUTION dimension limits
- Permission scope transfer: The Skill's allowed_operations

**Tool → Skill**:

- Parameter requirement transfer: The Tool's required fields
- Error type transfer: The Tool's possible error types
- Side effect transfer: The Tool's write operations, sensitive data handling

**Typical Defect Patterns**:

- A Tool declared by the Skill does not exist
- The Skill's input constraints are not supported by the Tool Schema
- The Tool's required parameters have no source declaration in the Skill
- The Skill's permission boundaries do not cover the Tool's side effects

**Note**: There are also three extended relationships: QD-CYC (circular invocation, see Part 4.5), QD-SS (Skill↔Skill, see Part 4.6), and QD-TT (Tool↔Tool, see Part 4.7).

---

<a id="14-the-review-schema-value-and-positioning"></a>
### 1.4 The Review Schema: Value and Positioning

<a id="141-what-the-review-schema-is"></a>
#### 1.4.1 What the Review Schema Is

**Core Definition**: The Review Schema is the **intermediate review framework** used by the Inspect Skill inspection Agent to systematically decompose and analyze Skill definitions. It is not a production format — it is a working view.

**Six Dimensions**:

| Dimension | Review Question | Associated Defect Types |
| --- | --- | --- |
| **IDENTITY** | What does this Skill do, not do, and what can it access? | QD-S-3.4, QD-S-5.1 |
| **TRIGGER** | When should it trigger, and when should it not? | QD-S-3.1, QD-S-3.2 |
| **INPUT** | Are input size, format, and overflow behavior clearly defined? | QD-S-1.1, QD-S-3.3 |
| **EXECUTION** | Are execution boundaries, retries, tool invocations, and chained calls controlled? | QD-S-1.3, QD-S-5.4 |
| **OUTPUT** | Are output size, structure, and partial completion strategy clearly defined? | QD-S-1.2, QD-S-2.3 |
| **FAILURE** | How are failures, empty inputs, insufficient inputs, and user dissatisfaction handled? | QD-S-4.x |

<a id="142-why-the-review-schema-is-needed"></a>
#### 1.4.2 Why the Review Schema Is Needed

**Core Value**:

| Value | Description |
| --- | --- |
| **Systematic omission prevention** | Six dimensions ensure no critical inspection points are missed |
| **Risk behavior presets** | Each dimension flags the "LLM default behavior when absent," helping inspectors anticipate risk |
| **Organizational framework** | Provides structured organization for inspection items, facilitating automated inspection |

<a id="143-how-the-review-schema-is-used"></a>
#### 1.4.3 How the Review Schema Is Used

| Inspection Relationship | Review Schema Usage | Rationale |
| --- | --- | --- |
| **QD-ST** | ✅ Use all six dimensions as the organizational framework for inspection items | Ensures systematic coverage of the Skill side; prevents omission |
| **QD-PS** | ⚠️ Selectively use TRIGGER and FAILURE dimensions | Helps align Prompt and Skill trigger and failure handling |
| **QD-PT** | ❌ Not needed | Directly compares the Prompt's tool invocation specification against the Tool Schema |

<a id="144-the-review-schema-does-not-constrain-llm-reasoning-flexibility"></a>
#### 1.4.4 The Review Schema Does Not Constrain LLM Reasoning Flexibility

**Key Clarification**: The Review Schema is the "skeleton of the inspection checklist." It does not constrain the LLM's reasoning flexibility.

| Usage | Description |
| --- | --- |
| **Organizational framework** | The Review Schema organizes inspection items to ensure systematic coverage |
| **Does not constrain reasoning** | Issues discovered by the LLM beyond the schema are equally valid; the Review Schema only ensures no critical dimensions are missed |
| **Final deliverable** | Inspection output retains the original platform format; the Review Schema is an intermediate working view |

---

<a id="15-part-summary"></a>
### 1.5 Part Summary

| Point | Description |
| --- | --- |
| **Cross-Artifact Inspection positioning** | Discovers Hidden Defects Under Reasonable Expression — each artifact is individually valid but semantic conflicts arise when combined |
| **Three artifact roles** | Prompt = workflow orchestrator, Skill = capability boundary declarer, Tool = execution contract guarantor |
| **Inspection relationships** | QD-PS (authorization coverage), QD-PT (invocation contract), QD-ST (capability match), QD-SS (Skill trigger conflicts/names), QD-TT (Tool data flow/semantic competition), QD-CYC (circular invocation) |
| **Review Schema value** | An organizational framework for systematic omission prevention; does not constrain LLM reasoning flexibility |

---

<a id="part-2-qd-ps-inspection-items-prompt--skill"></a>
## Part 2: QD-PS Inspection Items (Prompt → Skill)

<a id="21-inspection-relationship-details"></a>
### 2.1 Inspection Relationship Details

<a id="211-content-passed-authorization-trigger-boundary-failure-resources-output"></a>
#### 2.1.1 Content Passed: Authorization, Trigger, Boundary, Failure, Resources, Output

The QD-PS relationship inspects six categories of content passed from Prompt to Skill:

| Transfer Category | Specific Content | Prompt Reference | Skill Reference |
| --- | --- | --- | --- |
| **Capability authorization** | Which Skills the Prompt declares as available | QD-P-2.4.2 Resource/tool declaration | IDENTITY dimension |
| **Trigger conditions** | The Prompt's workflow trigger conditions | Workflow step descriptions | TRIGGER dimension |
| **Permission boundaries** | The permission scope authorized by the Prompt | QD-P-2.5.3 Permission control boundary | allowed_operations |
| **Resource access** | The resources declared as available by the Prompt | QD-P-2.4.2 Resource declaration | allowed_resources |
| **Failure handling** | The Prompt's failure handling strategy | QD-P-2.6.x Exception handling | FAILURE dimension |
| **Output constraints** | The Prompt's output requirements | QD-P-2.3.x Output definition | OUTPUT dimension |

<a id="212-inspection-focus-authorization-coverage-boundary-alignment"></a>
#### 2.1.2 Inspection Focus: Authorization Coverage, Boundary Alignment

**Core Inspection Questions**:

- Does the Prompt's authorization scope cover the Skill's declared boundaries?
- Are the Skill's trigger conditions consistent with the Prompt's workflow?
- Are the Skill's permission declarations more permissive than the Prompt's authorization (a risk)?
- Does the Skill's failure handling contradict the Prompt's exception handling strategy?

<a id="213-common-defect-patterns"></a>
#### 2.1.3 Common Defect Patterns

| Defect Pattern | Risk Description | Severity |
| --- | --- | --- |
| **Authorization missing** | Skill is defined but not authorized by the Prompt | P0 |
| **Trigger conflict** | Prompt requires strict triggering; Skill trigger condition is vague | P1 |
| **Permission overflow** | Skill's declared permissions exceed Prompt's authorization | P0 |
| **Failure strategy contradiction** | Prompt prohibits retries; Skill declares retries allowed | P1 |

---

<a id="22-six-inspection-items-in-detail"></a>
### 2.2 Seven Inspection Items in Detail

#### QD-PS-1.1 Skill Authorization Consistency

**Defect Description**: Whether the available Skills declared in the Prompt match the defined Skills.

**Inspection Content**:

- Which Skills are declared in the Prompt (in the resource/tool declaration section)
- Whether the defined Skill names are consistent with the Prompt's declarations
- Whether a Skill is defined but not within the Prompt's authorization scope

**Severity Determination Rules**:

| Situation | Severity | Description |
| --- | --- | --- |
| Skill not within Prompt authorization scope but defined | P0 | Implicit authorization risk exists |
| Skill defined but Prompt has no explicit authorization declaration | P1 | Authorization boundary unclear |

**Localization Mechanism**:

- Prompt side: QD-P-2.4.2 Resource/tool declaration
- Skill side: Skill name field

**Remediation Guidance**:

- If a Skill is defined but not authorized: add authorization declaration in the Prompt, or remove the Skill definition
- If authorization declarations and Skill names are inconsistent: unify the names

#### QD-PS-1.2 Trigger Condition Consistency

**Defect Description**: Whether the Prompt workflow's trigger conditions match the Skill's TRIGGER dimension.

**Inspection Content**:

- The trigger conditions defined in the Prompt workflow (when to invoke the Skill)
- The Skill's TRIGGER dimension (allowed_when, forbidden_when)
- Whether trigger conditions are inconsistent or contradictory

**Severity Determination Rules**:

| Situation | Severity | Description |
| --- | --- | --- |
| Trigger conditions contradictory (Prompt requires triggering but Skill declares it should not trigger) | P0 | Workflow cannot execute |
| Trigger conditions inconsistent | P1 | May cause incorrect triggering or non-triggering |

**Localization Mechanism**:

- Prompt side: Workflow step descriptions
- Skill side: TRIGGER dimension

**Remediation Guidance**:

- If trigger conditions are contradictory: unify trigger conditions (typically deferring to the Prompt, as the workflow orchestrator)
- If trigger conditions are inconsistent: supplement the Skill's forbidden_when declaration

#### QD-PS-1.3 Permission Boundary Consistency

**Defect Description**: Whether the permission scope authorized by the Prompt covers the Skill's allowed_operations.

**Inspection Content**:

- The permission scope authorized by the Prompt (QD-P-2.5.3 Permission control boundary)
- The Skill's allowed_operations and forbidden_operations
- Whether the Skill's declared permissions exceed the Prompt's authorization

**Severity Determination Rules**:

| Situation | Severity | Description |
| --- | --- | --- |
| Skill's declared permissions exceed Prompt's authorization | P0 | Permission overflow risk |
| Permission boundary declarations inconsistent | P1 | Boundary definition unclear |

**Localization Mechanism**:

- Prompt side: QD-P-2.5.3 Permission control boundary
- Skill side: IDENTITY dimension → allowed_operations

**Remediation Guidance**:

- If Skill permissions exceed Prompt authorization: tighten the Skill's allowed_operations (principle of least risk)
- If permission declarations are inconsistent: unify the permission boundaries

#### QD-PS-1.4 Resource Access Consistency

**Defect Description**: Whether the resources declared by the Prompt align with the Skill's allowed_resources.

**Inspection Content**:

- The available resources declared by the Prompt (QD-P-2.4.2 Resource declaration)
- The Skill's allowed_resources and forbidden_resources
- Whether the Skill's declared resources exceed the Prompt's authorization

**Severity Determination Rules**:

| Situation | Severity | Description |
| --- | --- | --- |
| Skill's declared resources exceed Prompt's authorization | P0 | Resource access overflow |
| Resource declarations inconsistent | P1 | Boundary definition unclear |

**Localization Mechanism**:

- Prompt side: QD-P-2.4.2 Resource declaration
- Skill side: IDENTITY dimension → allowed_resources

**Remediation Guidance**:

- If Skill resources exceed Prompt authorization: supplement the Prompt's resource authorization or tighten the Skill's allowed_resources
- If resource declarations are inconsistent: unify the resource boundaries

#### QD-PS-1.5 Failure Handling Consistency

**Defect Description**: Whether the Prompt's exception handling strategy aligns with the Skill's FAILURE dimension.

**Inspection Content**:

- The Prompt's exception handling strategy (QD-P-2.6.x)
- The Skill's FAILURE dimension (on_empty_input, on_insufficient_input, forbidden_behaviors)
- Whether failure handling strategies are contradictory

**Severity Determination Rules**:

| Situation | Severity | Description |
| --- | --- | --- |
| Failure handling strategy contradiction (e.g., Prompt prohibits retries but Skill declares retries) | P0 | Behavior uncontrollable |
| Failure handling strategies inconsistent | P1 | Boundary definition unclear |

**Localization Mechanism**:

- Prompt side: QD-P-2.6.x Exception handling
- Skill side: FAILURE dimension

**Remediation Guidance**:

- If failure handling is contradictory: unify the failure handling strategy (typically deferring to the Prompt)
- If failure handling is inconsistent: supplement the Skill's FAILURE dimension declarations

#### QD-PS-1.6 Output Constraint Consistency

**Defect Description**: Whether the Prompt's output requirements are satisfied by the Skill's OUTPUT dimension.

**Inspection Content**:

- The Prompt's output requirements (QD-P-2.3.x Output definition)
- The Skill's OUTPUT dimension (max_total_chars, format, partial_result_allowed)
- Whether the Skill can satisfy the Prompt's output requirements

**Severity Determination Rules**:

- Default P2, with no `OR-L3` upgrade (see Appendix C.2).
- Same-source as QD-ST-3.5; the same finding is not scored independently. Severe output contract defects (output requirements unsatisfiable, format conflict) are determined by the primary item QD-ST-3.5 as P1/P0.

**Localization Mechanism**:

- Prompt side: QD-P-2.3.x Output definition
- Skill side: OUTPUT dimension

**Remediation Guidance**:

- If the Skill cannot satisfy output requirements: supplement the Skill's OUTPUT dimension declarations or adjust the Prompt's output requirements
- If output constraints are inconsistent: unify the output boundaries

> **Same-Source Note**: Same-source as QD-ST-3.5; the same finding is not scored independently; the primary item is QD-ST-3.5.

#### QD-PS-1.7 Orchestration Order and Prerequisite Consistency

**Defect Description**: Whether the set of prerequisites declared by a Skill is ordered before the step that invokes that Skill in the Prompt orchestration.

**Inspection Content**:

- The prerequisites declared by the Skill (required artifacts / preceding steps)
- The order of the Prompt's workflow `steps`
- Whether the artifacts required by the prerequisites are included in the outputs of preceding steps

**Severity Determination Rules**:

| Situation | Severity | Description |
| --- | --- | --- |
| Artifacts required by prerequisites ⊄ outputs of preceding steps | P1 | Orchestration order error |
| A skipped prerequisite involves an irreversible operation (payment, deletion, sending) | P0 | Irreversible operation risk |

**Applicability**: From `AC-L2` (`AC-L1` has no Skill orchestration, N/A); the Skill declares no prerequisites/dependencies → N/A.

**Localization Mechanism**:

- Skill side: invocation preconditions declared in description / EXECUTION (required artifacts, preceding steps, dependent data)
- Prompt side: workflow `steps`

**Remediation Guidance**:

- In the Prompt orchestration steps, place the steps required by the prerequisites before the step that invokes the Skill
- If a prerequisite involves an irreversible operation, it must be explicitly blocked; skipping steps is prohibited

**Basis**: skill.md 10.1 already assigns "cross-artifact ordering/contract" to Cross; its Part 12 candidate `QD-S-3.8` also notes that "cross-artifact ordering belongs to Inspect Cross" (that number is a candidate and has not yet been merged into the formal inspection items).

---

<a id="23-localization-and-remediation"></a>
### 2.3 Localization and Remediation

<a id="231-localization-mechanism-prompt-side-skill-side"></a>
#### 2.3.1 Localization Mechanism (Prompt Side / Skill Side)

**Three-Tier Localization**:

```
Relationship level → QD-PS (Prompt → Skill)
Artifact level → Prompt side + Skill side
Field level → Prompt's QD-P reference location + Skill's Review Schema dimension location
```

**Localization Table Example** (QD-PS-1.3 Permission Boundary Inconsistency):

| Tier | Location |
| --- | --- |
| **Relationship level** | QD-PS (Prompt → Skill) |
| **Prompt side** | QD-P-2.5.3 Permission control boundary missing (if applicable) |
| **Skill side** | Review Schema IDENTITY dimension → allowed_operations field |

<a id="232-remediation-ownership-rules"></a>
#### 2.3.2 Remediation Ownership Rules

**Remediation Priority** (principle of least risk):

| Defect Type | Remediation Priority | Rationale |
| --- | --- | --- |
| **Permission inconsistency** | Skill side first | Skill is the boundary guardian; should converge toward the narrower permission |
| **Trigger condition conflict** | Prompt side first | Prompt is the workflow orchestrator; trigger conditions defer to the Prompt |
| **Resource access overflow** | Skill side first | Skill should converge toward the Prompt's authorized resource scope |
| **Failure handling contradiction** | Both sides, coordinated | Adopt the more conservative strategy |
| **Output constraint inconsistency** | Skill side first | Skill should satisfy the Prompt's output requirements |

---

<a id="24-part-summary"></a>
### 2.4 Part Summary

| Point | Description |
| --- | --- |
| **Inspection relationship positioning** | Prompt → Skill, inspecting authorization coverage and boundary alignment |
| **Inspection item count** | 7 items (QD-PS-1.1 through 1.7) |
| **Core inspection focus** | Whether the Skill's declared capabilities fall within the Prompt's authorization scope |
| **Remediation principle** | Principle of least risk; Skill side converges toward the narrower boundary |

---

<a id="part-3-qd-pt-inspection-items-prompt--tool"></a>
## Part 3: QD-PT Inspection Items (Prompt → Tool)

<a id="31-inspection-relationship-details"></a>
### 3.1 Inspection Relationship Details

<a id="311-content-passed-invocation-specification-parameter-constraints-permission-granularity-error-handling-frequency"></a>
#### 3.1.1 Content Passed: Invocation Specification, Parameter Constraints, Permission Granularity, Error Handling, Frequency

The QD-PT relationship inspects five categories of content passed from Prompt to Tool:

| Transfer Category | Specific Content | Prompt Reference | Tool Reference |
| --- | --- | --- | --- |
| **Invocation specification** | How the Prompt defines tool invocation | QD-P-2.4.3 Tool invocation specification | Tool name/description |
| **Parameter constraints** | The Prompt's parameter constraints during invocation | Tool parameter definitions | inputSchema constraints |
| **Permission granularity** | The Prompt's permission granularity requirements for tools | QD-P-2.5.3 Permission control boundary | Tool Risk Level (OR-L1/L2/L3) |
| **Error handling** | The Prompt's handling of tool invocation failures | QD-P-2.6.2 Exception handling coverage | Tool's possible error types |
| **Invocation frequency** | The Prompt's invocation count/frequency limits for tools | QD-P-2.4.3 Invocation specification section | Tool's side effect documentation |

<a id="312-inspection-focus-contract-match-high-risk-boundaries"></a>
#### 3.1.2 Inspection Focus: Contract Match, High-Risk Boundaries

**Core Inspection Questions**:

- Do the Prompt's tool invocation constraints match the Tool Schema?
- Do the Prompt's permission declarations cover the Tool's high-risk operations?
- Does the Prompt's exception handling cover all possible errors from the Tool?

<a id="313-common-defect-patterns"></a>
#### 3.1.3 Common Defect Patterns

| Defect Pattern | Risk Description | Severity |
| --- | --- | --- |
| **Tool does not exist** | A Tool declared in the Prompt does not exist in the known Tool list | P0 |
| **Invocation method mismatch** | The Prompt's invocation specification is inconsistent with the Tool Schema | P0 |
| **High-risk boundary missing** | A high-risk Tool has no security boundary declaration in the Prompt | P0 |
| **Incomplete error handling** | The Prompt does not handle all possible errors from the Tool | P1 |

---

<a id="32-six-inspection-items-in-detail"></a>
### 3.2 Seven Inspection Items in Detail

#### QD-PT-2.1 Tool Existence

**Defect Description**: Whether the Tools declared in the Prompt exist in the known Tool Schema list.

**Inspection Content**:

- Which Tools are declared in the Prompt (in the resource/tool declaration section)
- Whether the corresponding Tool exists in the Tool Schema list
- Whether Tool names are consistent

**Severity Determination Rules**:

| Situation | Severity | Description |
| --- | --- | --- |
| Tool does not exist | P0 | Tool invocation fails; Agent functionality cannot be realized |
| Tool exists but version mismatch | P1 | May cause compatibility issues |

**Localization Mechanism**:

- Prompt side: QD-P-2.4.2 Resource/tool declaration
- Tool side: Tool name field

**Remediation Guidance**:

- If Tool does not exist: remove the Tool declaration from the Prompt, or supplement the Tool Schema
- If Tool names are inconsistent: unify the names

**Note**: Static inspection only verifies "declaration existence." Runtime verification of "actual availability" occurs during Risk Implicit validation.

#### QD-PT-2.2 Invocation Specification Consistency

**Defect Description**: Whether the Prompt's tool invocation specification matches the Tool's Schema.

**Inspection Content**:

- The Prompt's tool invocation specification (QD-P-2.4.3)
- The Tool's name, description, inputSchema
- Whether the invocation method is consistent (e.g., whether the invocation method described in the Prompt matches the Tool definition)

**Severity Determination Rules**:

| Situation | Severity | Description |
| --- | --- | --- |
| Invocation method mismatch prevents invocation | P0 | Tool invocation fails |
| A provable equivalent mapping exists | P1 | Different wording but semantically mappable |
| Invocation specification details inconsistent | P1 | May cause invocation efficiency or accuracy issues |

**Evidence Requirement for Equivalent Mapping**: The mapping pair must be written in the report (e.g., "the user's question" ↦ the `query` parameter); a downgrade cannot be based on an unmappable claim.

**Localization Mechanism**:

- Prompt side: QD-P-2.4.3 Tool invocation specification
- Tool side: Tool description

**Remediation Guidance**:

- If invocation method is mismatched: unify the invocation specification (typically deferring to the Tool Schema)
- If invocation specification details are inconsistent: supplement the Prompt's tool invocation specification

#### QD-PT-2.3 Parameter Constraint Consistency

**Defect Description**: Whether the Prompt's parameter constraints align with the Tool's inputSchema.

**Inspection Content**:

- The Prompt's parameter constraint definitions (in the tool invocation specification)
- The Tool's inputSchema (required, properties, maxLength, pattern, etc.)
- Whether the Prompt's required parameters are supported by the Tool, and whether the Tool's supported constraints have corresponding declarations in the Prompt

**Severity Determination Rules**:

| Situation | Severity | Description |
| --- | --- | --- |
| Prompt requires a parameter the Tool does not support | P0 | Tool invocation fails |
| Parameter constraint details inconsistent | P1 | May cause parameter validation failure |

**Localization Mechanism**:

- Prompt side: Tool parameter definitions
- Tool side: inputSchema

**Remediation Guidance**:

- If the Prompt requires a parameter the Tool does not support: remove the parameter requirement from the Prompt, or supplement the Tool parameter
- If parameter constraints are inconsistent: unify the constraints (Tool Schema is the Hard Constraint; the Prompt should converge toward the Tool)

#### QD-PT-2.4 Permission Granularity Consistency

**Defect Description**: Whether the Prompt's permission declarations match the Tool's Risk Level.

**Inspection Content**:

- The Prompt's permission declarations (QD-P-2.5.3 Permission control boundary)
- The Tool's Risk Level (OR-L1/L2/L3, from Inspect Tool)
- Whether high-risk Tools (OR-L3) have security boundary declarations in the Prompt

**Severity Determination Rules**:

| Situation | Severity | Description |
| --- | --- | --- |
| High-risk Tool (OR-L3) has no security boundary declaration in the Prompt | P0 | Security risk |
| Permission granularity is imprecise | P1 | Boundary definition unclear |

**Localization Mechanism**:

- Prompt side: QD-P-2.5.2 Security boundary constraint missing (if applicable)
- Tool side: QD-T-3.x High-risk operation identification

**Remediation Guidance**:

- If a high-risk Tool has no security boundary declaration: supplement security boundary constraints in the Prompt (QD-P-2.5.2)
- If permission granularity is imprecise: supplement permission control boundaries (QD-P-2.5.3)

#### QD-PT-2.5 Key Error Handling Coverage

**Defect Description**: Whether the Prompt's exception handling covers the three classes of critical errors the Tool may produce.

**Inspection Content** (converged to three classes of critical errors):

1. Permission/authentication class (401 / 403 / insufficient scope)
2. Parameter class (400 / validation failure / missing required field)
3. Timeout and resource class (timeout / rate limit)

**Severity Determination Rules**:

| Situation | Severity | Description |
| --- | --- | --- |
| One of the three classes has no corresponding strategy at all in the Prompt's exception handling | P1 | Exception handling gap |
| The "permission class" among the three is not covered | P0 | Permission errors unhandled (instance upgrade) |
| Not covered outside the three classes | Not a defect | Enumerating all errors is not required |
| Tool description gives no error information at all | Insufficient evidence (NEEDS_REVIEW) | Not a defect |

**Localization Mechanism**:

- Prompt side: QD-P-2.6.2 Exception handling coverage
- Tool side: error information in the Tool description

**Remediation Guidance**:

- If one of the three classes has no strategy: supplement the corresponding exception handling strategy in the Prompt
- If the permission class is not covered: prioritize supplementing permission/authentication error handling

#### QD-PT-2.6 Business-Level Invocation Frequency / Batch Expectation Declaration

**Defect Description**: Whether the Prompt declares the business-level expectations for invoking this tool — the scale of a single invocation (one record per call vs. one batch per call), the per-call return cap, and the number of invocations corresponding to a single user request.

**Inspection Content**:

- The Prompt's business-level invocation expectations (scale, return cap, invocation count)
- The capabilities/limits declared by the Tool (`limit.maximum` / `maxItems` / batch-related description)
- Whether the expectations directly contradict the Tool's capabilities/limits

**Severity Determination Rules**:

| Situation | Severity | Description |
| --- | --- | --- |
| No business-level expectation declared at all | P2 | Frequency/batch expectation missing |
| Declared but directly contradicts the Tool's capabilities/limits (e.g., requires "fetch all orders at once" while the Tool has `limit.maximum`) | P1 | Contradicts the hard limit |
| Declared and not contradictory | Pass | - |

**Localization Mechanism**:

- Prompt side: workflow steps and the invocation specification section (QD-P-2.4.3)
- Tool side: `limit.maximum` / `maxItems` / batch-related description
- (QD-P-2.5.5 is deprecated and is not used as a localization anchor)

**Remediation Guidance**:

- If not declared: supplement the business-level invocation expectations in the Prompt
- If contradictory with the Tool's limit: adjust the expectation to match the Tool's hard limit

**Boundary**: Only judges "whether a business-level expectation is declared" and "whether it contradicts the Tool's declaration"; "whether the threshold is optimal" and "whether the Harness is configured correctly" are outside this specification's scope (see 7.4). The proportionality of Agent-level frequency constraints belongs to permission.md QD-PM-2.7.

#### QD-PT-2.7 Parameter Semantics and Unit Consistency

**Defect Description**: Whether the semantic caliber of same-named parameters is consistent between the Prompt and the Tool.

**Inspection Content**:

- The semantic caliber of same-named parameters on the Prompt and Tool sides
- Currency (yuan vs. cents), time zone (UTC vs. UTC+8), unit (seconds vs. milliseconds, kg vs. g), encoding (ISO8601 vs. custom), percentage (0–1 vs. 0–100), identifier semantics (internal id vs. external account)

**Severity Determination Rules**:

| Situation | Severity | Description |
| --- | --- | --- |
| Parameter semantics/unit caliber inconsistent | P1 | Semantic caliber inconsistent |
| Write operation involving funds, measurement, or time windows with inconsistent caliber | P0 | High-risk write operation (instance upgrade) |

**Applicability**: From `AC-L2` (`AC-L1` has no tool invocation parameter semantics, N/A); the same-named parameter has no semantic caliber declared on the Prompt side → insufficient evidence (NEEDS_REVIEW), not a defect.

**Localization Mechanism**:

- Prompt side: QD-P-2.3.7 (output language/localization and caliber)
- Tool side: `unit` / description of the `inputSchema`

**Remediation Guidance**:

- If the caliber is inconsistent: unify to the Tool's authoritative declaration (the `inputSchema`'s `unit` / description)
- If a write operation involves funds/measurement/time windows: remediate first to avoid numeric errors

---

<a id="33-localization-and-remediation"></a>
### 3.3 Localization and Remediation

<a id="331-localization-mechanism-prompt-side-tool-side"></a>
#### 3.3.1 Localization Mechanism (Prompt Side / Tool Side)

**Three-Tier Localization**:

```
Relationship level → QD-PT (Prompt → Tool)
Artifact level → Prompt side + Tool side
Field level → Prompt's QD-P reference location + Tool's Schema field location
```

**Localization Table Example** (QD-PT-2.4 Permission Granularity Inconsistency):

| Tier | Location |
| --- | --- |
| **Relationship level** | QD-PT (Prompt → Tool) |
| **Prompt side** | QD-P-2.5.2 Security boundary constraint missing (if applicable) |
| **Tool side** | QD-T-3.x High-risk operation identification |

<a id="332-remediation-ownership-rules"></a>
#### 3.3.2 Remediation Ownership Rules

**Remediation Priority** (principle of least risk):

| Defect Type | Remediation Priority | Rationale |
| --- | --- | --- |
| **Tool does not exist** | Tool side first | Tool Schema is the underlying Hard Constraint |
| **Invocation specification mismatch** | Tool side first | Tool Schema is the Hard Constraint |
| **Parameter constraint inconsistency** | Tool side first | Tool inputSchema is the Hard Constraint |
| **High-risk boundary missing** | Prompt side first | Prompt should supplement security boundary declarations |
| **Incomplete error handling** | Prompt side first | Prompt should supplement exception handling strategy |

---

<a id="34-part-summary"></a>
### 3.4 Part Summary

| Point | Description |
| --- | --- |
| **Inspection relationship positioning** | Prompt → Tool, inspecting invocation contract match |
| **Inspection item count** | 7 items (QD-PT-2.1 through 2.7) |
| **Core inspection focus** | Whether the Prompt's tool invocation constraints match the Tool Schema |
| **Remediation principle** | Tool Schema is the Hard Constraint; the Prompt should converge toward the Tool |

---

<a id="part-4-qd-st-inspection-items-skill--tool"></a>
## Part 4: QD-ST Inspection Items (Skill ↔ Tool)

<a id="41-inspection-relationship-details"></a>
### 4.1 Inspection Relationship Details

<a id="411-bidirectional-transfer-skill-tool-and-tool-skill"></a>
#### 4.1.1 Bidirectional Transfer: Skill → Tool and Tool → Skill

The QD-ST relationship inspects the bidirectional transfer between Skill and Tool:

**Skill → Tool Transfer**:

| Transfer Category | Specific Content | Skill Reference | Tool Reference |
| --- | --- | --- | --- |
| **Input constraints** | The Skill's INPUT dimension constraints | INPUT dimension (max_items, format) | inputSchema constraints |
| **Invocation frequency** | The Skill's EXECUTION dimension limits | EXECUTION dimension (max_tool_calls) | Tool's capability scope |
| **Permission scope** | The Skill's allowed_operations | IDENTITY dimension | Tool's side effects |

**Tool → Skill Transfer**:

| Transfer Category | Specific Content | Tool Reference | Skill Reference |
| --- | --- | --- | --- |
| **Parameter requirements** | The Tool's required fields | inputSchema.required | Skill's INPUT dimension |
| **Error types** | The Tool's possible error types | Tool description | FAILURE dimension |
| **Side effects** | The Tool's write operations, sensitive data handling | QD-T-3.x | forbidden_operations |

<a id="412-inspection-focus-capability-boundary-match-parameter-contract"></a>
#### 4.1.2 Inspection Focus: Capability Boundary Match, Parameter Contract

**Core Inspection Questions**:

- Are the Skill's input constraints supported by the Tool Schema?
- Do the Tool's required parameters have source declarations in the Skill?
- Do the Skill's permission boundaries cover the Tool's side effects?

<a id="413-review-schema-usage-in-qd-st"></a>
#### 4.1.3 Review Schema Usage in QD-ST

**Usage**: The Review Schema's six dimensions serve as the analytical framework for the Skill side, aligned dimension-by-dimension with the Tool Schema.

| Review Schema Dimension | Corresponding Tool Inspection Point |
| --- | --- |
| **IDENTITY** | allowed_operations vs. Tool side effects |
| **TRIGGER** | Trigger timing vs. Tool invocation timing (indirectly associated) |
| **INPUT** | max_items/format vs. Tool inputSchema |
| **EXECUTION** | max_tool_calls vs. Tool capability scope |
| **OUTPUT** | Output expectations vs. Tool return value structure |
| **FAILURE** | Failure handling vs. Tool error types |

<a id="414-common-defect-patterns"></a>
#### 4.1.4 Common Defect Patterns

| Defect Pattern | Risk Description | Severity |
| --- | --- | --- |
| **Tool does not exist** | A Tool declared by the Skill does not exist in the known Tool list | P0 |
| **Input constraint not supported** | The Skill's required input constraints are not supported by the Tool | P0 |
| **Required parameter has no source** | The Tool's required parameter has no source declaration in the Skill | P0 |
| **Permission boundary does not cover** | The Skill's permission declarations do not cover the Tool's side effects | P0 |

---

<a id="42-seven-inspection-items-in-detail"></a>
### 4.2 Seven Inspection Items in Detail

#### QD-ST-3.1 Tool Existence

**Defect Description**: Whether the Tools declared by the Skill (if any) exist in the known Tool Schema list.

**Inspection Content**:

- Whether the Skill declares invocable Tools (in the EXECUTION dimension or allowed_downstream_skills)
- Whether the corresponding Tool exists in the Tool Schema list
- Whether Tool names are consistent

**Severity Determination Rules**:

| Situation | Severity | Description |
| --- | --- | --- |
| Tool does not exist | P0 | Tool invocation fails |
| Tool exists but version mismatch | P1 | May cause compatibility issues |

**Localization Mechanism**:

- Skill side: EXECUTION dimension → allowed_downstream_skills
- Tool side: Tool name field

**Remediation Guidance**:

- If Tool does not exist: remove the Tool declaration from the Skill, or supplement the Tool Schema
- If Tool names are inconsistent: unify the names

**Note**: Static inspection only verifies "declaration existence." Runtime verification of "actual availability" occurs during Risk Implicit validation.

#### QD-ST-3.2 Input Constraint Consistency

**Defect Description**: Whether the Skill's INPUT dimension constraints are supported by the Tool's inputSchema.

**Inspection Content**:

- The Skill's INPUT dimension (max_items, format, if_exceeds)
- The Tool's inputSchema (maxLength, pattern, maxItems, etc.)
- Whether the Skill's required input constraints are supported by the Tool

**Severity Determination Rules**:

| Situation | Severity | Description |
| --- | --- | --- |
| Skill's required input constraint not supported by Tool | P0 | Input validation fails |
| Input constraint details inconsistent | P1 | May cause input handling issues |

**Localization Mechanism**:

- Skill side: INPUT dimension
- Tool side: inputSchema

**Remediation Guidance**:

- If Skill constraint is not supported by Tool: adjust the Skill's INPUT dimension or supplement the Tool constraint
- If constraints are inconsistent: unify the constraints (Tool Schema is the Hard Constraint)

#### QD-ST-3.3 Required Parameter Preparation

**Defect Description**: Whether the Tool's required parameters have source declarations in the Skill.

**Inspection Content**:

- The Tool's inputSchema.required fields
- Whether the Skill has source declarations for the corresponding parameters (e.g., from user input, from other tool output)
- Whether the Tool's required parameters are prepared by the Skill

**Severity Determination Rules**:

| Situation | Severity | Description |
| --- | --- | --- |
| Tool's required parameter has no source declaration in Skill | P0 | Tool invocation fails |
| Source declaration is unclear | P1 | May cause parameter preparation issues |

**Localization Mechanism**:

- Skill side: Skill workflow or INPUT dimension
- Tool side: inputSchema.required

**Remediation Guidance**:

- If a required parameter has no source declaration: supplement parameter source declaration in the Skill
- If source declaration is unclear: clarify the parameter source

#### QD-ST-3.4 Skill Business-Level Invocation Frequency / Batch Expectation Declaration

**Defect Description**: Whether the Skill's EXECUTION dimension declares the business-level invocation cap per execution (`max_tool_calls`) and the per-execution processing scale.

**Inspection Content**:

- The Skill's `max_tool_calls` and per-execution processing scale
- The Tool's declared `maxItems` / `limit.maximum`
- Whether the declared values directly contradict the Tool's hard limit

**Severity Determination Rules**:

| Situation | Severity | Description |
| --- | --- | --- |
| Neither `max_tool_calls` nor the per-execution processing scale is declared | P2 | Business-level expectation missing |
| Declared but directly contradicts the Tool's hard limit (Skill allows 100 records, Tool caps at 10) | P1 | Contradicts the hard limit |
| Declared and not contradictory | Pass | - |

**Localization Mechanism**:

- Skill side: EXECUTION dimension (`max_tool_calls` / `max_retries` / `timeout_seconds`)
- Tool side: `maxItems` / `limit.maximum`

**Remediation Guidance**:

- If not declared: supplement `max_tool_calls` and the per-execution processing scale in the Skill
- If contradictory with the Tool's hard limit: adjust the declared values to match the Tool's hard limit

**Boundary (division of labor with skill.md)**: Whether the Skill-side `max_tool_calls` / `max_retries` / `timeout_seconds` exist belongs to skill.md QD-S-1.3; this section only judges "whether the declared values contradict the Tool's hard limit." Already covered by QD-S-1.3 and not contradictory → N/A (record the basis "QD-S-1.3 already determined").

#### QD-ST-3.5 Output Structure Match

**Defect Description**: Whether the Skill's OUTPUT dimension expectations match the Tool's return value structure.

**Inspection Content**:

- The Skill's OUTPUT dimension (format, max_total_chars)
- The Tool's return value structure (inferred from description or examples)
- Whether the Skill's output expectations are consistent with the Tool's return values

**Severity Determination Rules**:

| Situation | Severity | Description |
| --- | --- | --- |
| Skill cannot process Tool return value structure | P0 | Output processing fails |
| Output expectations inconsistent | P1 | May cause output processing issues |

**Localization Mechanism**:

- Skill side: OUTPUT dimension
- Tool side: Tool return value structure

**Remediation Guidance**:

- If output structure is mismatched: adjust the Skill's OUTPUT dimension or supplement Tool return value documentation
- If output expectations are inconsistent: unify the output format

#### QD-ST-3.6 Permission Scope Match

**Defect Description**: Whether the Skill's permission declarations are consistent with the Tool's side effects.

**Inspection Content**:

- The Skill's allowed_operations and forbidden_operations
- The Tool's side effects (QD-T-3.x: write operations, sensitive data handling)
- Whether the Skill's permission boundaries cover the Tool's side effects

**Severity Determination Rules**:

| Situation | Severity | Description |
| --- | --- | --- |
| Tool's side effects exceed Skill's permission declarations | P0 | Permission overflow risk |
| Permission boundary details inconsistent | P1 | Boundary definition unclear |

**Localization Mechanism**:

- Skill side: IDENTITY dimension → allowed_operations
- Tool side: QD-T-3.x High-risk operation identification

**Remediation Guidance**:

- If Tool side effects exceed Skill permissions: tighten the Tool's side effects or expand the Skill's permissions (principle of least risk prioritizes tightening the Tool)
- If permission boundaries are inconsistent: unify the permission boundaries

#### QD-ST-3.7 Key Error Handling Coverage

**Defect Description**: Whether the Skill's FAILURE dimension covers the three classes of critical errors the Tool may produce.

**Inspection Content** (converged to three classes of critical errors):

1. Permission/authentication class (401 / 403 / insufficient scope)
2. Parameter class (400 / validation failure / missing required field)
3. Timeout and resource class (timeout / rate limit)

**Severity Determination Rules**:

| Situation | Severity | Description |
| --- | --- | --- |
| One of the three classes has no corresponding strategy at all in the Skill's exception handling | P1 | Exception handling gap |
| The "permission class" among the three is not covered | P0 | Permission errors unhandled (instance upgrade) |
| Not covered outside the three classes | Not a defect | Enumerating all errors is not required |
| Tool description gives no error information at all | Insufficient evidence (NEEDS_REVIEW) | Not a defect |

**Localization Mechanism**:

- Skill side: FAILURE dimension
- Tool side: error information in the Tool description

**Remediation Guidance**:

- If one of the three classes has no strategy: supplement FAILURE dimension declarations in the Skill
- If the permission class is not covered: prioritize supplementing permission/authentication error handling

---

<a id="43-localization-and-remediation"></a>
### 4.3 Localization and Remediation

<a id="431-localization-mechanism-skill-side-tool-side"></a>
#### 4.3.1 Localization Mechanism (Skill Side / Tool Side)

**Three-Tier Localization**:

```
Relationship level → QD-ST (Skill ↔ Tool)
Artifact level → Skill side + Tool side
Field level → Skill's Review Schema dimension location + Tool's Schema field location
```

**Localization Table Example** (QD-ST-3.6 Permission Scope Mismatch):

| Tier | Location |
| --- | --- |
| **Relationship level** | QD-ST (Skill ↔ Tool) |
| **Skill side** | Review Schema IDENTITY dimension → allowed_operations field |
| **Tool side** | QD-T-3.x High-risk operation identification |

<a id="432-remediation-ownership-rules"></a>
#### 4.3.2 Remediation Ownership Rules

**Remediation Priority** (principle of least risk):

| Defect Type | Remediation Priority | Rationale |
| --- | --- | --- |
| **Tool does not exist** | Tool side first | Tool Schema is the underlying Hard Constraint |
| **Input constraint inconsistency** | Tool side first | Tool inputSchema is the Hard Constraint |
| **Required parameter has no source** | Skill side first | Skill should supplement parameter source |
| **Invocation frequency mismatch** | Skill side first | Skill should supplement frequency limits |
| **Output structure mismatch** | Both sides, coordinated | Unify output format |
| **Permission scope mismatch** | Tool side first | Tool side effects are the Hard Constraint |
| **Incomplete error handling** | Skill side first | Skill should supplement FAILURE dimension |

---

<a id="44-part-summary"></a>
### 4.4 Part Summary

| Point | Description |
| --- | --- |
| **Inspection relationship positioning** | Skill ↔ Tool, inspecting capability boundary match and parameter contract |
| **Inspection item count** | 7 items (QD-ST-3.1 through 3.7) |
| **Core inspection focus** | Whether the Skill's capability boundaries match the Tool's actual capabilities |
| **Review Schema usage** | Six dimensions serve as the analytical framework for the Skill side |
| **Remediation principle** | Tool Schema is the Hard Constraint; the Skill should converge toward the Tool |

---

<a id="part-45-circular-invocation-inspection-cross-cutting"></a>
## Part 4.5: Circular Invocation Inspection (Cross-Cutting)

**Positioning Note**: QD-CYC is a cross-cutting inspection group, independent of the QD-ST (Skill ↔ Tool) relationship defined in Part 4. It is numbered `Part 4.5` for document continuity only — to avoid renumbering Parts 5 through 10 — and does not imply that circular invocation inspection is a sub-topic of QD-ST.

<a id="45-circular-invocation-overview"></a>
### 4.5.1 Circular Invocation Overview

<a id="451-why-circular-invocation-inspection"></a>
#### 4.5.1.1 Why Circular Invocation Inspection

**Problem**: Circular invocation patterns can cause Agents to enter infinite loops, leading to resource exhaustion and non-termination.

**Three Types of Circular Invocation**:

| Type | Description | Example |
| --- | --- | --- |
| **Cross-Artifact Circular Invocation** | Feedback loops across Prompt, Skill, and Tool artifacts | Skill output re-enters Prompt workflow; Tool callback re-triggers Prompt |
| **Multi-Agent Circular Invocation** | Peer-to-peer invocation loops between Agent roles | Reviewer ↔ Revisor calling each other in a loop |
| **Skill-to-Skill Handoff Loop** | Multiple Skills routed to each other via handoff, forming a loop without a termination condition | Skill-A output is routed to Skill-B, and B routes back to A |

<a id="452-boundary-between-two-types"></a>
#### 4.5.1.2 Boundaries Between the Three Types

| Dimension | Cross-Artifact (QD-CYC-1.1) | Multi-Agent (QD-CYC-1.2) | Skill-to-Skill Loop (QD-CYC-1.3) |
| --- | --- | --- | --- |
| **Scope** | Heterogeneous (across artifact types) | Homogeneous (within same level) | Homogeneous (within the Skill layer) |
| **Pattern** | Prompt ↔ Skill ↔ Tool feedback | Agent A ↔ Agent B peer invocation | Skill-A ↔ Skill-B handoff loop |
| **Detection** | Semantic analysis of invocation chains | Semantic analysis of orchestration roles | Analysis of handoff chains and `allowed_downstream_skills` |

---

<a id="453-two-inspection-items-in-detail"></a>
### 4.5.2 Three Inspection Items in Detail

#### QD-CYC-1.1 Cross-Artifact Circular Invocation

**Defect Description**: Whether circular invocation patterns exist across Prompt, Skill, and Tool artifacts (e.g., Skill output/trigger re-enters Prompt workflow, Tool callback/notification re-triggers Prompt, Tool side effects/notification re-trigger the invoking Skill).

**Inspection Content**:

- Prompt workflow/orchestration step definitions
- Skill TRIGGER / OUTPUT / EXECUTION dimensions (trigger conditions, output feedback, tool invocation chains)
- Tool description side effects/notification semantics
- Whether invocation relationship chains form closed loops (LLM semantic analysis)

**Severity Determination Rules**:

| Situation | Severity | Description |
| --- | --- | --- |
| Definitive circular loop (explicit bidirectional/cyclic invocation) | P0 | Agent cannot terminate |
| Potential circular pattern (feedback semantics without explicit termination) | P1 | May cause non-termination |

**Localization Mechanism**:

- Prompt side: workflow/orchestration step definitions
- Skill side: TRIGGER / OUTPUT / EXECUTION dimensions
- Tool side: description → side effect/notification semantics

**Remediation Guidance**:

- Add explicit termination conditions or maximum iteration counts; or split circular flow into linear workflow; or constrain Tool callback capabilities

**Examples**:

*Example 1: Skill Output Re-enters Prompt (P0)*

```yaml
# PROBLEMATIC: Skill output triggers Prompt re-invocation
# Prompt workflow:
workflow:
  steps:
    - call_skill: data_processor
      on_output: |
        If the output contains "incomplete", re-invoke the Prompt 
        to request more input from the user.
      # ^ This creates a loop: Skill output → Prompt re-invoke

# Skill definition:
trigger:
  condition: "user provides data"
output:
  format: "processed_data or incomplete_marker"
```

*Remediation*:

```yaml
# FIXED: Add explicit termination condition
workflow:
  steps:
    - call_skill: data_processor
      on_output: |
        Process the output. If "incomplete", request more input.
        MAX_RETRIES: 3  # Explicit termination after 3 attempts
      retry_count: 0
```

*Example 2: Tool Callback Re-triggers Prompt (P1)*

```yaml
# PROBLEMATIC: Tool callback notification re-triggers workflow
# Tool Schema:
tools:
  - name: long_running_task
    description: |
      Starts a background task. When complete, sends a notification
      that triggers the Agent to process results and potentially
      start another task.
    # ^ Callback creates potential loop if not bounded

# Prompt:
workflow:
  on_tool_notification: |
    When receiving notification from long_running_task,
    analyze results and invoke the same tool again if needed.
```

*Remediation*:

```yaml
# FIXED: Add iteration counter and termination
workflow:
  max_iterations: 5
  iteration_count: 0
  on_tool_notification: |
    Increment iteration_count.
    If iteration_count >= max_iterations, terminate with summary.
    Otherwise, process results and conditionally re-invoke.
```

*Example 3: Tool Side Effect Re-triggers Skill (P1)*

```yaml
# PROBLEMATIC: Tool writes data that triggers Skill again
# Tool:
- name: update_database
  description: "Updates database and emits change event"
  
# Skill:
trigger:
  condition: "database change event detected"
execution:
  tools:
    - update_database  # Skill calls Tool that triggers Skill
```

*Remediation*:

```yaml
# FIXED: Add trigger source filtering
trigger:
  condition: "database change event detected"
  exclude_source: "self_triggered"  # Ignore events from own writes
execution:
  tools:
    - update_database
```

---

#### QD-CYC-1.2 Multi-Agent Circular Invocation

**Defect Description**: Whether circular invocation patterns exist between multiple Agent roles defined in the Prompt orchestration (e.g., Reviewer and Revisor calling each other in an infinite loop).

**Inspection Content**:

- Agent roles and their invocation relationships defined in the Prompt (orchestration logic)
- Whether invocation relationship chains between Agent roles form closed loops (LLM semantic analysis)

**Severity Determination Rules**:

| Situation | Severity | Description |
| --- | --- | --- |
| Definitive circular loop (Agent A and Agent B explicitly call each other) | P0 | Cannot terminate |
| Potential circular pattern (iteration/review/feedback semantics without explicit termination) | P1 | May cause non-termination |

**Localization Mechanism**:

- Prompt side: workflow/orchestration step definitions (Agent role declarations and invocation relationships)

**Remediation Guidance**:

- Explicitly set maximum iteration counts; or split circular flow into linear workflow; or introduce termination conditions

**Examples**:

*Example 1: Reviewer ↔ Revisor Circular Delegation (P0)*

```yaml
# PROBLEMATIC: Two agents call each other indefinitely
# Prompt defines two roles:
agents:
  reviewer:
    role: "Review code for issues"
    workflow: |
      1. Analyze the code
      2. If issues found, delegate to revisor for fixes
      3. After revisor completes, review again
      # ^ No termination: reviewer → revisor → reviewer loop
      
  revisor:
    role: "Fix code based on review feedback"
    workflow: |
      1. Receive feedback from reviewer
      2. Apply fixes
      3. Submit back to reviewer for verification
      # ^ Creates the loop back to reviewer
```

*Remediation*:

```yaml
# FIXED: Add iteration limit and termination condition
agents:
  reviewer:
    role: "Review code for issues"
    max_review_rounds: 3
    workflow: |
      1. Analyze the code
      2. If issues found AND review_round < max_review_rounds:
         - delegate to revisor for fixes
      3. Else: approve or reject with final notes
      4. After revisor completes, increment review_round
      5. If review_round >= max_review_rounds, finalize
      
  revisor:
    role: "Fix code based on review feedback"
    workflow: |
      1. Receive feedback from reviewer
      2. Apply fixes
      3. Return to reviewer (reviewer controls termination)
```

*Example 2: Iterative Refinement Without Termination (P1)*

```yaml
# PROBLEMATIC: Continuous refinement loop
agents:
  optimizer:
    role: "Optimize content"
    workflow: |
      Analyze content and suggest improvements.
      If improvements possible, invoke critic for evaluation.
      
  critic:
    role: "Evaluate optimizations"
    workflow: |
      Evaluate the optimized content.
      If not optimal, invoke optimizer again.
      # ^ Loop: optimizer → critic → optimizer
```

*Remediation*:

```yaml
# FIXED: Linear workflow with explicit iterations
workflow:
  max_iterations: 5
  steps:
    - iteration: 1
      agent: optimizer
      output: optimized_v1
    - agent: critic
      input: optimized_v1
      output: feedback_v1
    - condition: "feedback_v1.score < threshold AND iteration < max_iterations"
      then:
        - agent: optimizer
          input: feedback_v1
          output: optimized_v2
      else: finalize
```

*Example 3: Multi-Agent Debate Without Resolution (P1)*

```yaml
# PROBLEMATIC: Agents debate indefinitely
agents:
  proposer:
    role: "Propose solutions"
    workflow: |
      Propose a solution.
      Wait for challenger critique.
      If challenged, revise and re-propose.
      
  challenger:
    role: "Challenge proposals"
    workflow: |
      Critique the proposal.
      If proposal has issues, return to proposer.
      # ^ No path to resolution
```

*Remediation*:

```yaml
# FIXED: Add resolution mechanism
agents:
  proposer:
    role: "Propose solutions"
    max_revisions: 3
    workflow: |
      Propose a solution.
      Wait for challenger critique.
      If challenged AND revision_count < max_revisions:
        - revise and re-propose
        - increment revision_count
      Else:
        - escalate to arbiter for final decision
        
  challenger:
    role: "Challenge proposals"
    workflow: |
      Critique the proposal.
      Return critique to proposer.
      
  arbiter:
    role: "Make final decision"
    workflow: |
      Review all proposals and critiques.
      Select final solution and terminate.
```

#### QD-CYC-1.3 Skill-to-Skill Handoff Loop

**Defect Description**: The output of Skill-A is routed to Skill-B, and B's output routes back to A, with no termination condition / maximum round across the whole chain.

**Inspection Content**:

- Each Skill's OUTPUT and `allowed_downstream_skills`
- Whether the handoff chain between Skills forms a loop without a termination condition

**Severity Determination Rules**:

| Situation | Severity | Description |
| --- | --- | --- |
| Skill handoff forms a loop without a termination condition | P1 | May cause non-termination |
| Explicitly bidirectional and the chain contains an OR-L3 Skill | P0 | High-risk Skill loop (instance upgrade) |

**Applicability**: From `AC-L2`; the Agent contains only a single Skill, or the Skills declare no `allowed_downstream_skills` (no handoff chain) → N/A.

**Localization Mechanism**:

- Each Skill's OUTPUT and `allowed_downstream_skills`

**Remediation Guidance**:

- Add a termination condition or maximum rounds to the loop chain
- If the chain contains an OR-L3 Skill, block the loop first

---

<a id="454-localization-and-remediation"></a>
### 4.5.3 Localization and Remediation

<a id="4541-localization-mechanism-cross-cutting"></a>
#### 4.5.3.1 Localization Mechanism (Cross-Cutting)

**Three-Tier Localization**:

```
Relationship level → QD-CYC (Circular Invocation)
Artifact level → Prompt side (+ Skill side / Tool side for QD-CYC-1.1)
Field level → Prompt's workflow/orchestration definitions
```

<a id="4542-remediation-ownership-rules"></a>
#### 4.5.3.2 Remediation Ownership Rules

**Remediation Priority**:

| Defect Type | Remediation Priority | Rationale |
| --- | --- | --- |
| **Cross-Artifact circular invocation** | Prompt side first | Prompt is the workflow orchestrator; termination logic belongs in orchestration |
| **Multi-Agent circular invocation** | Prompt side first | Prompt defines Agent roles and their relationships |
| **Skill-to-Skill handoff loop** | Skill side first | The handoff chain is defined in each Skill's `allowed_downstream_skills` |

---

<a id="455-part-summary"></a>
### 4.5.4 Part Summary

| Point | Description |
| --- | --- |
| **Inspection relationship positioning** | Cross-cutting, inspecting circular invocation patterns across artifacts and Agent roles |
| **Inspection item count** | 3 items (QD-CYC-1.1, QD-CYC-1.2, QD-CYC-1.3) |
| **Core inspection focus** | Whether invocation relationships contain closed loops that prevent termination |
| **Detection method** | LLM semantic analysis of invocation chains and orchestration logic |
| **Remediation principle** | Add termination conditions; Prompt side owns orchestration logic |

---

<a id="part-46-skill-skill-inspection-qd-ss"></a>
## Part 4.6: Skill↔Skill Inspection (QD-SS)

**Positioning Note**: QD-SS inspects declaration consistency between multiple Skills within the same Agent (trigger condition conflicts and name uniqueness). It is numbered `Part 4.6`, continuing the numbering approach of `Part 4.5` (QD-CYC), for document continuity only — to avoid renumbering Parts 5 through 10 — and does not imply that QD-SS is a sub-topic of QD-ST or QD-CYC.

<a id="461-skill-skill-inspection-overview"></a>
### 4.6.1 Skill↔Skill Inspection Overview

**Why inspect**: When an Agent has multiple Skills, overlapping trigger conditions or similar names between Skills can prevent the LLM from determining a unique executor during routing or cause mis-invocation, resulting in uncontrollable behavior.

**Inspection Objects**: The trigger conditions (trigger) and names (name) declared by all Skills within the same Agent.

<a id="462-two-inspection-items"></a>
### 4.6.2 Two Inspection Items in Detail

<a id="qd-ss-41-trigger-conflict"></a>
#### QD-SS-4.1 Trigger Condition Conflict

**Defect Description**: Multiple Skills declare overlapping or contradictory trigger conditions, so that the same user input activates multiple Skills at once and no unique executor can be determined.

**Defect Example**:

| Dimension | Content |
| --- | --- |
| **Skill-A** | `trigger: "triggered when the user asks about order status"` |
| **Skill-B** | `trigger: "triggered when the user mentions orders"` |
| **Problem** | The input "check the order status for me" hits both A and B; the model cannot decide which one to use |

**Severity**: Default P1; if a Skill involved in the conflict is `OR-L3` (e.g., can cancel orders, transfer funds) → upgrade to P0.

**Remediation Example**: Narrow the trigger conditions or declare priority — `Skill-A: trigger = "when the user asks about order status (exact match)"`; `Skill-B: trigger = "when the user mentions orders (and is not querying status)"`.

<a id="qd-ss-42-name-uniqueness"></a>
#### QD-SS-4.2 Name Uniqueness / Near-Duplicate Misleading

**Defect Description**: Multiple Skills have the same or highly similar names (similar spelling, singular/plural, synonyms), causing the LLM to mis-invoke during routing.

**Criterion**: After name normalization (lowercase, separator removal, singular/plural reduction, synonym table), Levenshtein ≤ 2, or the names are synonym-equivalent → hit.

**Defect Example**:

| Dimension | Content |
| --- | --- |
| **Skill-A** | `name: "cancel_order"` |
| **Skill-B** | `name: "cancel_orders"` (plural difference only) |
| **Problem** | The LLM easily routes "cancel order" to the wrong one |

**Severity**: Default P2; if the similarity would cause mis-invocation of an `OR-L3` Skill → upgrade to P0.

**Remediation Example**: Rename or add a disambiguating suffix — `cancel_order` and `cancel_orders_batch`.

**Boundary (with Risk Explicit's `NR-S-8`)**: QD-SS-4.2 judges "unintentional name similarity at the definition layer"; `EX·NR-S-8` judges "explicitly malicious naming misleading" (deliberate phishing). The same phenomenon is not double-counted.

<a id="463-location-and-repair"></a>
### 4.6.3 Localization and Remediation

**Localization Mechanism**: The defect falls on the Skill side — two `trigger` / `name` declarations; the relationship level is recorded as `QD-SS`.

**Remediation Ownership**:

- Trigger conflict → narrow the trigger conditions or declare priority (Skill side);
- Name similarity → rename or add a disambiguating suffix (Skill side).

<a id="464-part-summary"></a>
### 4.6.4 Part Summary

| Point | Description |
| --- | --- |
| **Inspection relationship positioning** | Skill ↔ Skill, inspecting trigger condition conflicts and name uniqueness |
| **Inspection item count** | 2 items (QD-SS-4.1, QD-SS-4.2) |
| **Core inspection focus** | Routing determinism among multiple Skills |
| **Remediation principle** | Narrow trigger conditions; disambiguate names |

---

<a id="part-47-tool-tool-inspection-qd-tt"></a>
## Part 4.7: Tool↔Tool Inspection (QD-TT)

**Positioning Note**: QD-TT inspects the data flow and semantic competition between multiple Tools within the same Agent. It carries over from Inspect Tool's QD-T-3.5 (Cross-Tool Data Flow) and QD-T-4.3 (Multi-Tool Semantic Competition); because both take a Tool set as their inspection object and exceed the scope of single-artifact inspection, they are transferred to this specification. It is numbered `Part 4.7`, continuing the numbering approach of `Part 4.6` (QD-SS).

<a id="471-tool-tool-inspection-overview"></a>
### 4.7.1 Tool↔Tool Inspection Overview

**Why inspect**: When an Agent has multiple Tools, data flow between Tools can leak sensitive data; semantic similarity between Tools can cause the LLM to mis-invoke.

**Inspection Objects**: The input/output (inputSchema/outputSchema), name, and description declarations of all Tools within the same Agent.

<a id="472-two-inspection-items"></a>
### 4.7.2 Three Inspection Items in Detail

<a id="qd-tt-51-cross-tool-dataflow"></a>
#### QD-TT-5.1 Cross-Tool Data Flow

**Defect Description**: One Tool outputs sensitive data (PII, credentials, keys) that is consumed by another Tool and used for dangerous operations such as external transmission or writing, forming a sensitive data flow.

**Defect Example**:

| Dimension | Content |
| --- | --- |
| **Tool-A** | `get_user_email(user_id)` → returns `{email: "user@example.com"}` |
| **Tool-B** | `send_notification(email, message)` → sends email externally |
| **Problem** | The PII output by A is consumed by B and sent externally, forming a data leakage chain |

**Severity**: Default P1; if it is "sensitive output + dangerous consumption" (e.g., PII exfiltration, credential writing) → P0. Harmless data flows (e.g., `get_time → write log`) do not hit.

**Remediation Example**: A masks sensitive fields (`email → [PROTECTED]`), or B changes to internal retrieval (`send_notification(user_id, message)`).

<a id="qd-tt-52-multi-tool-semantic-competition"></a>
#### QD-TT-5.2 Multi-Tool Semantic Competition

**Defect Description**: Multiple Tools have similar name or description semantics, making it difficult for the LLM to distinguish them during routing.

**Defect Example**:

| Dimension | Content |
| --- | --- |
| **Tool-A** | `name="get_user"`, `description="get user information"` |
| **Tool-B** | `name="get_user_info"`, `description="get detailed user information"` |
| **Problem** | The two Tools are similar; the LLM cannot easily distinguish them |

**Severity**: Default P1; if their behavior differs greatly (one is read-only, the other can delete) → P0.

**Remediation Example**: Disambiguate the names — `get_user_basic` and `get_user_profile`.

#### QD-TT-5.3 Cross-Tool Data Structure Bridging

**Defect Description**: The type of Tool-A's `outputSchema` is incompatible with Tool-B's `inputSchema`, and there is no serialization/conversion step in the Skill.

**Inspection Content**:

- The field types of Tool-A's `outputSchema`
- The corresponding field types of Tool-B's `inputSchema`
- Whether the Skill's EXECUTION steps contain serialization/conversion

**Defect Example**:

| Dimension | Content |
| --- | --- |
| **Tool-A** | `outputSchema: {items: array}` |
| **Tool-B** | `inputSchema: {items: string}` |
| **Problem** | A outputs an array, B requires a string, and the Skill has no conversion step |

**Severity**: P2.

**Applicability**: From `AC-L3` (a data flow requires ≥2 Tools); the Tool declares no `outputSchema`, or there is no downstream consumption → N/A.

**Remediation Example**: Add serialization/conversion in the Skill's EXECUTION steps (e.g., `JSON.stringify(items)`).

<a id="473-location-and-repair"></a>
### 4.7.3 Localization and Remediation

**Localization Mechanism**: The defect falls on the Tool side — both ends of the data flow (output/input), or the name/description of two similar Tools; the relationship level is recorded as `QD-TT`.

**Remediation Ownership**:

- Cross-Tool data flow → mask sensitive fields or change the dangerous Tool to internal retrieval (Tool side);
- Semantic competition → disambiguate names or supplement descriptions (Tool side).

<a id="474-part-summary"></a>
### 4.7.4 Part Summary

| Point | Description |
| --- | --- |
| **Inspection relationship positioning** | Tool ↔ Tool, inspecting cross-Tool data flow and semantic competition |
| **Inspection item count** | 3 items (QD-TT-5.1, QD-TT-5.2, QD-TT-5.3) |
| **Core inspection focus** | Data flow sensitivity and routing determinism among multiple Tools |
| **Remediation principle** | Mask sensitive fields; disambiguate names |

---

## Part 5: Inspection Process and Severity Mechanisms

<a id="51-inspection-process-overview"></a>
### 5.1 Inspection Process Overview

<a id="511-seven-step-inspection-process"></a>
#### 5.1.1 Seven-Step Inspection Process

```
┌──────────────────────────────────────────────────┐
│    Cross-Artifact Consistency Inspection Process  │
│              (Inspect Cross)                      │
└──────────────────────────────────────────────────┘
                                │
                                ▼
                    ┌───────────────────────┐
                    │  Step 1: Prerequisite  │
                    │  Verification          │
                    │  Confirm all three     │
                    │  artifacts pass single │
                    │  artifact inspection   │
                    └───────────────────────┘
                                │
                                ▼
                    ┌───────────────────────┐
                    │  Step 2: Artifact      │
                    │  Relationship          │
                    │  Identification        │
                    │  Extract Skill/Tool    │
                    │  declarations          │
                    └───────────────────────┘
                                │
                                ▼
                    ┌───────────────────────┐
                    │  Step 3: QD-PS Check   │
                    │  Prompt → Skill        │
                    └───────────────────────┘
                                │
                                ▼
                    ┌───────────────────────┐
                    │  Step 4: QD-ST Check   │
                    │  Skill ↔ Tool          │
                    └───────────────────────┘
                                │
                                ▼
                    ┌───────────────────────┐
                    │  Step 5: QD-PT Check   │
                    │  Prompt → Tool         │
                    └───────────────────────┘
                                │
                                ▼
                    ┌───────────────────────┐
                    │  Step 6: Impact        │
                    │  Assessment            │
                    │  Linked defect         │
                    │  identification and    │
                    │  prioritization        │
                    └───────────────────────┘
                                │
                                ▼
                    ┌───────────────────────┐
                    │  Step 7: Output Report │
                    │  Defect list /         │
                    │  Remediation guidance  │
                    └───────────────────────┘
```

> **Where extended relationships execute**: QD-SS, QD-TT, and QD-CYC execute together within the relationship inspection stage of Steps 3–5 (see 5.3.5, 5.3.6, and 5.3.4 respectively) and do not change the seven-step skeleton above.

<a id="512-process-flow-and-decision-points"></a>
#### 5.1.2 Process Flow and Decision Points

| Step | Decision Point | Failure Handling |
| --- | --- | --- |
| **Step 1** | Have all three artifacts passed single-artifact inspection? | Output remediation guidance; halt cross-artifact inspection |
| **Step 2** | Successfully extracted Skill/Tool declarations? | Output advisory; continue inspection but flag missing declarations |
| **Step 3-5** | Cross-artifact/multi-artifact defects discovered? | Record defects; continue inspection |
| **Step 6** | Linked defects present? | Upgrade severity; adjust remediation priority |
| **Step 7** | Unremediated P0 defects present? | Output blocking report; require re-inspection after remediation |

---

<a id="52-prerequisites-and-artifact-relationship-identification"></a>
### 5.2 Prerequisites and Artifact Relationship Identification

<a id="521-single-artifact-inspection-pass-criteria"></a>
#### 5.2.1 Single-Artifact Inspection Pass Criteria

**Pass Criteria**:

- All P0 defects have been remediated
- P1 defects have been listed in the "fix before release" list or have obtained an EXC-* exception
- P2 defects have been incorporated into the improvement plan or risk ledger

**Inspection Entry Condition**: Single-artifact inspection has passed, and no undisposed P0 defects remain.

<a id="522-artifact-version-consistency-confirmation"></a>
#### 5.2.2 Artifact Version Consistency Confirmation

**Confirmation Content**:

- Prompt, Skill, and Tool version numbers are consistent
- Artifact update timestamps are consistent
- Artifact sources are consistent (same Agent project)

**Failure Handling**: When versions are inconsistent, prompt the user for confirmation before executing cross-artifact inspection.

<a id="523-artifact-relationship-extraction-methods"></a>
#### 5.2.3 Artifact Relationship Extraction Methods

**Skill Declaration Extraction from Prompt**:

- Locate QD-P-2.4.2 Resource/tool declaration section
- Extract Skill name list

**Tool Declaration Extraction from Prompt**:

- Locate QD-P-2.4.2 Resource/tool declaration section
- Extract Tool name list

**Tool Declaration Extraction from Skill**:

- Locate the tool invocation declarations in the EXECUTION dimension — the `tools` list, or tool names explicitly referenced in the body/steps — and extract the Tool name list
- `allowed_downstream_skills` is a downstream Skill whitelist, used only for Skill-chain analysis in QD-SS / QD-CYC-1.3, and must not be used for Tool existence inspection

---

<a id="53-automated-inspection-execution"></a>
### 5.3 Automated Inspection Execution

<a id="531-qd-ps-inspection-execution-prompt-skill"></a>
#### 5.3.1 QD-PS Inspection Execution (Prompt → Skill)

**Execution Method**: Automated (LLM Agent)

**Inspection Steps**:

1. Read the Skill declaration list from the Prompt
2. Read the Skill definitions (Review Schema six dimensions)
3. Inspect item-by-item against QD-PS-1.1 through 1.7
4. Record inconsistencies, mapped to specific locations in the Prompt and Skill

<a id="532-qd-st-inspection-execution-skill-tool"></a>
#### 5.3.2 QD-ST Inspection Execution (Skill ↔ Tool)

**Execution Method**: Automated (LLM Agent)

**Inspection Steps**:

1. Read Tool declarations from the Skill (if any)
2. Read Tool Schema definitions
3. Inspect item-by-item against QD-ST-3.1 through 3.7
4. Record inconsistencies, mapped to specific locations in the Skill and Tool

<a id="533-qd-pt-inspection-execution-prompt-tool"></a>
#### 5.3.3 QD-PT Inspection Execution (Prompt → Tool)

**Execution Method**: Automated (LLM Agent)

**Inspection Steps**:

1. Read the Tool declaration list from the Prompt
2. Read Tool Schema definitions
3. Inspect item-by-item against QD-PT-2.1 through 2.7
4. Record inconsistencies, mapped to specific locations in the Prompt and Tool

<a id="534-qd-cyc-inspection-execution-cross-cutting"></a>
#### 5.3.4 QD-CYC Inspection Execution (Cross-Cutting)

**Execution Method**: Automated (LLM Agent)

**Inspection Steps**:

1. Read Prompt workflow/orchestration definitions
2. Read Skill declarations (TRIGGER / OUTPUT / EXECUTION dimensions) and Tool declarations
3. Perform semantic analysis of invocation chains to detect closed loops
4. Inspect against QD-CYC-1.1 (Cross-Artifact Circular Invocation), QD-CYC-1.2 (Multi-Agent Circular Invocation), and QD-CYC-1.3 (Skill-to-Skill Handoff Loop)
5. Record circular invocation patterns, mapped to specific locations in the Prompt (and Skill/Tool where applicable)

**Detection Method**:

- **QD-CYC-1.1**: Analyze whether Skill output/trigger re-enters Prompt workflow, Tool callback re-triggers Prompt, or Tool side effects re-trigger Skill
- **QD-CYC-1.2**: Analyze whether Agent roles defined in Prompt orchestration have circular invocation relationships (e.g., Agent A calls Agent B, Agent B calls Agent A)
- **QD-CYC-1.3**: Analyze whether each Skill's OUTPUT and `allowed_downstream_skills` form a handoff loop without a termination condition

<a id="535-qd-ss-inspection-execution"></a>
#### 5.3.5 QD-SS Inspection Execution (Skill ↔ Skill)

**Execution Method**: Automated (LLM Agent)

**Inspection Steps**:

1. Read the trigger and name declarations of all Skills within the same Agent
2. Inspect against QD-SS-4.1 (Trigger Condition Conflict) and QD-SS-4.2 (Name Uniqueness / Near-Duplicate Misleading)
3. Record conflicts/similarities, mapped to the trigger / name locations of the specific Skills

**Detection Method**:

- **QD-SS-4.1**: Analyze whether the triggers of the Skills overlap under the same user input
- **QD-SS-4.2**: Analyze whether the names of the Skills are identical or highly similar (spelling, singular/plural, synonyms)

<a id="536-qd-tt-inspection-execution"></a>
#### 5.3.6 QD-TT Inspection Execution (Tool ↔ Tool)

**Execution Method**: Automated (LLM Agent)

**Inspection Steps**:

1. Read the inputSchema/outputSchema, name, and description declarations of all Tools within the same Agent
2. Inspect against QD-TT-5.1 (Cross-Tool Data Flow), QD-TT-5.2 (Multi-Tool Semantic Competition), and QD-TT-5.3 (Cross-Tool Data Structure Bridging)
3. Record data flows/similarities, mapped to the output/input and name/description locations of the specific Tools

**Detection Method**:

- **QD-TT-5.1**: Analyze whether each Tool's output contains sensitive fields that are consumed by other Tools for dangerous operations
- **QD-TT-5.2**: Analyze whether each Tool's name/description is similar in a way that makes it hard for the LLM to distinguish
- **QD-TT-5.3**: Analyze whether each Tool's output/inputSchema types are incompatible and the Skill has no conversion step

<a id="537-inspection-exception-handling"></a>
#### 5.3.7 Inspection Exception Handling

**Exception Types**:

| Exception | Handling |
| --- | --- |
| **Artifact parsing failure** | Output error log; prompt user to check artifact format |
| **Declaration extraction failure** | Flag missing declaration; continue inspection but output advisory |
| **Inspection item execution failure** | Record failed item; output advisory; continue with remaining items |

<a id="538-check-item-judgment-states-five-states"></a>
#### 5.3.8 Check Item Judgment States (Five States)

| State | Meaning | Counted in scoring/denominator |
| --- | --- | --- |
| **Pass** | Applicable and no defect found | Yes (no deduction) |
| **Defect** | Applicable and a defect is found | Yes (deduction) |
| **Not Applicable (N/A)** | Not possessed by the AC-L level or the artifact form | No; the basis for the determination must be recorded |
| **Insufficient Evidence** | Applicable, but cannot be determined from the static text | No; output `NEEDS_REVIEW` |
| **Not Inspected** | Should have been inspected but was not executed for process reasons (including unmet prerequisites) | No; must not be recorded as pass |

**Rules**:

1. "Insufficient Evidence" and "Not Inspected" must not be recorded as pass;
2. "Not Applicable" must state its basis (e.g., "the deliverable has no Tool Schema", "the Agent has only 1 Skill");
3. **N/A discipline**: an N/A without a basis is treated as not inspected, counted in the denominator at the item's default severity, and counted as a failure;
4. The "declaration extraction failure" in 5.3.7 is reclassified per this section: if the artifact form does not possess it → N/A (record the basis); if the field exists but its semantics cannot be determined → Insufficient Evidence; neither may be directly recorded as "declaration missing → defect".

---

<a id="54-severity-levels-and-agent-level-binding"></a>
### 5.4 Severity Levels and Agent-Level Binding

<a id="541-three-severity-levels-p0p1p2"></a>
#### 5.4.1 Three Severity Levels (P0/P1/P2)

**Definitions** (as defined in Inspect Skill v1.1):

| Level | Symbol | Definition | Disposition Priority |
| --- | --- | --- | --- |
| **P0** | 🔴 | Prevents Agent functionality or introduces security risk | MUST be fixed |
| **P1** | 🟡 | May cause behavioral instability or functional defects | SHOULD be fixed |
| **P2** | 🟢 | Affects readability or efficiency, but does not impact functionality | MAY be fixed |

<a id="542-agent-level-definitions-l1l2l3"></a>
#### 5.4.2 Agent Complexity Level Definitions (`AC-L`, following AC-L1/AC-L2/AC-L3)

**Definitions** (as defined in Inspect Prompt v1.1):

| Level | Name | Definition | Typical Characteristics |
| --- | --- | --- | --- |
| **AC-L1** | Single-turn Task | Single invocation completes the task; no state retention | Single skill, no tool invocations, no multi-turn dialogue |
| **AC-L2** | Multi-turn Interactive | Requires multi-turn dialogue or simple tool invocations | Multi-turn dialogue, 1-3 tools, simple workflow |
| **AC-L3** | Complex Agent | Complex workflow, multi-tool collaboration, strong constraints | 4+ tools, complex workflow, security constraints |

> **`AC-L4` Note**: core.md §4.2 defines `AC-L4` (multi-Agent collaboration). This specification currently refines only up to `AC-L3`; `AC-L4` Agents are inspected at the `AC-L3` full level (i.e., all 29 applicable items are inspected), and their dedicated inspection intensity and minimum rule set are deferred to a later version.

<a id="543-level-determination-and-inspection-intensity-differences"></a>
#### 5.4.3 Level Determination and Inspection Intensity Differences

**Inspection Intensity Differences**:

| AC-L Level | Applicable Items | Description |
| --- | --- | --- |
| **AC-L1** | 7 items | All are P0 core items (Appendix B) |
| **AC-L2** | 20 items | Adds multi-artifact and semantic checks (QD-SS/QD-TT/QD-CYC, etc.) |
| **AC-L3** | 29 items | Full inspection, covering all applicable items of the six relationship groups |

**Inspection Scope** (see Appendix A for item-by-item check-offs and Appendix B for the P0 minimum sets):

- AC-L1: 7 core inspection items
- AC-L2: 20 standard inspection items
- AC-L3: 29 full inspection items

<a id="544-severity-upgrade-rules"></a>
#### 5.4.4 Severity Upgrade Rules

The default severity of Cross-Artifact Defects may be upgraded based on Tool Risk Level (OR-L3) and Skill Risk Level (OR-L3). For specific upgrade trigger conditions, the per-item mapping table, and the determination process, see **Appendix C: Severity Upgrade Rules in Detail**; for the relationship between default levels and instance upgrades, see 5.4.5.

<a id="545-default-level-and-instance-upgrade"></a>
#### 5.4.5 Default Levels and Instance Upgrades

The "Severity (Default)" column in Appendix A gives the default level; the "→ P0" branches in each inspection item's body are instance upgrade rules, and the upgrade rationale and evidence must be recorded in the report. The two are not contradictory: Appendix A sets the baseline, and the in-body branches set the upgrade conditions. When Appendix A and the body differ in tier, Appendix A is taken as the default and the in-body branch as the upgrade condition.

---

<a id="55-part-summary"></a>
### 5.5 Part Summary

| Point | Description |
| --- | --- |
| **Inspection process** | 7-step process: prerequisite verification → relationship identification → six inspection groups → impact assessment → report output |
| **Automated execution** | All inspection items are executable via automation (LLM Agent) |
| **Severity levels** | P0/P1/P2 (as defined in Inspect Skill v1.1) |
| **Agent complexity levels** | AC-L (AC-L1/AC-L2/AC-L3, as defined in Inspect Prompt v1.1) |
| **Level binding** | Different Agent levels correspond to different inspection intensity |

---

## Part 6: Localization and Remediation Mechanisms

<a id="61-defect-localization-mechanism"></a>
### 6.1 Defect Localization Mechanism

<a id="611-three-tier-localization-relationship-artifact-field"></a>
#### 6.1.1 Three-Tier Localization: Relationship → Artifact → Field

**Localization Tiers**:

```
Tier 1: Relationship level
  → QD-PS / QD-PT / QD-ST
  → Identifies the artifact pair involved

Tier 2: Artifact level
  → Prompt side + Skill side / Tool side
  → Identifies the specific artifacts involved

Tier 3: Field level
  → Prompt's QD-P reference location / Skill's Review Schema dimension / Tool's Schema field
  → Identifies the specific fields involved
```

<a id="612-localization-table-design-and-usage"></a>
#### 6.1.2 Localization Table Design and Usage

**Localization Table Template**:

| Tier | Location | Original Evidence |
| --- | --- | --- |
| **Relationship level** | QD-XY | Inspection relationship number |
| **Artifact level (Side A)** | QD-X reference location | Original text excerpt |
| **Artifact level (Side B)** | QD-Y reference location | Original text excerpt |
| **Field level (Side A)** | Specific field | Field value |
| **Field level (Side B)** | Specific field | Field value |

<a id="613-localization-example"></a>
#### 6.1.3 Localization Example

**Example**: QD-PS-1.3 Permission Boundary Inconsistency

| Tier | Location | Original Evidence |
| --- | --- | --- |
| **Relationship level** | QD-PS (Prompt → Skill) | — |
| **Prompt side** | QD-P-2.5.3 Permission control boundary | "You may access the user order database" |
| **Skill side** | IDENTITY dimension → allowed_operations | "allowed_operations: query, update, delete" |
| **Inconsistency** | Prompt authorizes "access"; Skill declares "delete" | — |

---

<a id="62-impact-assessment-model"></a>
### 6.2 Impact Assessment Model

<a id="621-impact-propagation-factors"></a>
#### 6.2.1 Impact Propagation Factors

> The upgrade rules for impact propagation factors have been merged into Appendix C; the sole sources of severity are the "default level" in Appendix A + the "instance upgrade rules" in 5.4.5 + the "OR-L3 upgrade table" in Appendix C.2. This section no longer separately specifies upgrade conditions.

<a id="622-linked-defect-identification"></a>
#### 6.2.2 Linked Defect Identification

**Linked Defect**: The same root cause simultaneously hits ≥2 inspection item numbers, and satisfies both of the following —

1. The evidence text of both items falls in the same field or the same declaration segment;
2. When remediating either inspection item, the remediation does not hold unless the other location is also changed.

"Both belong to cross-artifact inspection" does not constitute linkage.

<a id="623-composite-risk-assessment"></a>
#### 6.2.3 Composite Risk Assessment

> The composite risk assessment matrix has been removed; its upgrade factors (permission overflow / resource runaway / behavioral instability, etc.) are expressed uniformly through OR-L3 (operation risk level) and the "→ P0" branches in each inspection item's body, see 5.4.5 and Appendix C.

---

<a id="63-remediation-priority-rules"></a>
### 6.3 Remediation Priority Rules

<a id="631-principle-of-least-risk"></a>
#### 6.3.1 Principle of Least Risk

**Core Principle**: When remediating, prioritize the solution that introduces the least risk.

**Specific Rules**:

- Permission inconsistency → converge toward the narrower permission
- Constraint inconsistency → converge toward the stricter constraint
- Failure handling contradiction → choose the more conservative strategy

<a id="632-remediation-ownership-rules"></a>
#### 6.3.2 Remediation Ownership Rules

**Remediation Priority** (tool-first principle):

| Priority | Artifact | Rationale |
| --- | --- | --- |
| **First priority** | Tool Schema | Tool is the structural contract foundation; Hard Constraints cannot be bypassed |
| **Second priority** | Skill boundary declarations | Skill is the boundary guardian; only after boundaries are clarified does the LLM have clear constraints |
| **Third priority** | Prompt workflow specification | Prompt is the top-level design; supplementation ensures global consistency |

> **Exception**: When the defect is substantively a missing upstream declaration (QD-PS-1.2, QD-PT-2.4, QD-PT-2.5, QD-PT-2.6, QD-CYC-*), the Prompt side supplements the declaration, with higher priority than the Tool side.

<a id="633-remediation-priority-ordering"></a>
#### 6.3.3 Remediation Priority Ordering

**Ordering Rules**:

1. Fix P0 defects first (blocking level)
2. Fix linked defects next (defects involving multiple artifacts)
3. Fix P1/P2 defects last

---

<a id="64-remediation-example-set"></a>
### 6.4 Remediation Example Set

<a id="641-permission-inconsistency-remediation-example"></a>
#### 6.4.1 Permission Inconsistency Remediation Example

**Defect**: QD-PS-1.3 Permission Boundary Inconsistency

**Original**:

- Prompt: "You may access the user order database"
- Skill: "allowed_operations: query, update, delete"

**Remediation Options** (principle of least risk):

- **Option A** (modify Skill): Change Skill's allowed_operations to "query"
- **Option B** (modify Prompt): Prompt supplements "Permission: query only (SELECT); update and delete prohibited"

**Recommendation**: Option A (modify Skill), because the Skill is the boundary guardian and should converge toward the narrower permission.

<a id="642-trigger-condition-conflict-remediation-example"></a>
#### 6.4.2 Trigger Condition Conflict Remediation Example

**Defect**: QD-PS-1.2 Trigger Condition Inconsistency

**Original**:

- Prompt: "Trigger weekly-report-writer when the user requests a weekly report"
- Skill: "allowed_when: when the user needs help"

**Remediation** (deferring to Prompt):

- Modify Skill's allowed_when: "Only when the user explicitly requests 'compile weekly report' or 'generate weekly report'"

<a id="643-parameter-constraint-inconsistency-remediation-example"></a>
#### 6.4.3 Parameter Constraint Inconsistency Remediation Example

**Defect**: QD-PT-2.3 Parameter Constraint Inconsistency

**Original**:

- Prompt: "Invoke the search tool, passing the user query"
- Tool: inputSchema.required = ["query", "limit"], but Prompt does not declare the limit parameter

**Remediation** (converging toward Tool):

- Modify Prompt: "Invoke the search tool, passing the user query (query) and result count limit (limit, default 10)"

<a id="644-failure-handling-conflict-remediation-example"></a>
#### 6.4.4 Failure Handling Conflict Remediation Example

**Defect**: QD-PS-1.5 Failure Handling Contradiction

**Original**:

- Prompt: "Stop immediately on tool invocation failure; report error to user"
- Skill: "on_failure: attempt other query conditions"

**Remediation** (deferring to Prompt):

- Modify Skill: "on_failure: Stop immediately; report error to user. Attempting other query conditions is prohibited"

<a id="645-linked-defect-remediation-example"></a>
#### 6.4.5 Linked Defect Remediation Example

**Defect**: QD-PS-1.3 + QD-ST-3.6 (Permission Boundary Inconsistency + Permission Scope Mismatch)

**Original**:

- Prompt: "You may access the user order database"
- Skill: "allowed_operations: query, update, delete"
- Tool: QD-T-3.1 Write operation marker (Tool supports update, delete)

**Remediation** (coordinated):

1. **Tool side**: Retain write operation marker (Tool is the Hard Constraint)
2. **Skill side**: Change allowed_operations to "query"
3. **Prompt side**: Supplement "Permission: query only (SELECT); update and delete prohibited"

<a id="646-circular-invocation-remediation-example"></a>
#### 6.4.6 Circular Invocation Remediation Example

**Defect**: QD-CYC-1.1 Cross-Artifact Circular Invocation

**Original**:

```yaml
# Prompt workflow
workflow:
  steps:
    - call_skill: data_enricher
      on_output: |
        If output.status == "needs_more_data":
          # Re-invoke the same workflow to get more input
          restart_workflow()
        else:
          return output
```

**Problem**: The Skill's output can trigger the Prompt to restart, creating a potential infinite loop.

**Remediation** (add explicit termination):

```yaml
# Fixed Prompt workflow
workflow:
  max_enrichment_rounds: 3
  enrichment_count: 0
  steps:
    - call_skill: data_enricher
      on_output: |
        enrichment_count += 1
        If output.status == "needs_more_data" AND enrichment_count < max_enrichment_rounds:
          request_additional_input()
          continue_to_next_iteration()
        else:
          return output
```

**Key Changes**:

1. Added `max_enrichment_rounds: 3` — explicit upper bound
2. Added `enrichment_count` counter — tracks iterations
3. Modified condition to check both status AND count
4. Provides graceful termination path when limit reached

---

<a id="647-multi-agent-circular-invocation-remediation-example"></a>
#### 6.4.7 Multi-Agent Circular Invocation Remediation Example

**Defect**: QD-CYC-1.2 Multi-Agent Circular Invocation

**Original**:

```yaml
# Prompt defines two agents
agents:
  code_generator:
    role: "Generate code based on requirements"
    workflow: |
      1. Generate code
      2. Send to code_reviewer for review
      3. If review_feedback received, revise and send back to reviewer
      
  code_reviewer:
    role: "Review generated code"
    workflow: |
      1. Review code from code_generator
      2. If issues found, send feedback to code_generator
      3. If no issues, approve
      # ^ Loop: generator → reviewer → generator
```

**Problem**: The two agents can indefinitely bounce work back and forth.

**Remediation** (add iteration limit and linearize):

```yaml
# Fixed Prompt with bounded iterations
workflow:
  max_review_rounds: 3
  current_round: 0
  
  steps:
    - agent: code_generator
      output: generated_code
      
    - while: current_round < max_review_rounds
      steps:
        - agent: code_reviewer
          input: generated_code
          output: review_result
          
        - condition: review_result.status == "approved"
          then:
            - finalize_and_return generated_code
            - break
          else:
            - agent: code_generator
              input: review_result.feedback
              output: generated_code
            - current_round += 1
            
    - if: current_round >= max_review_rounds
      then:
        - return generated_code with note: "Max iterations reached"
```

**Key Changes**:

1. Moved iteration control to top-level workflow (not agent logic)
2. Added explicit `max_review_rounds` limit
3. Used `while` loop with counter instead of agent-to-agent delegation
4. Added termination condition on approval or max rounds
5. Agents no longer directly invoke each other

---

<a id="65-part-summary"></a>
### 6.5 Part Summary

| Point | Description |
| --- | --- |
| **Localization mechanism** | Three-tier: Relationship → Artifact → Field |
| **Impact assessment** | Severity derives solely from Appendix C.2; linkage only affects tagging and remediation order |
| **Remediation principle** | Principle of least risk; tool-first principle |
| **Remediation priority** | P0 first → linked defects next → P1/P2 last |

---

## Part 7: Inspection Timing and the Ratchet Mechanism

<a id="71-lifecycle-inspection-timing"></a>
### 7.1 Lifecycle Inspection Timing

<a id="711-development-phase-single-artifact-inspection"></a>
#### 7.1.1 Development Phase: Single-Artifact Inspection

**Timing**: On each artifact commit

**Inspection Scope**: Single-artifact inspection

**Cross-Artifact Inspection**: Not yet executed

<a id="712-integration-phase-cross-artifact-inspection"></a>
#### 7.1.2 Integration Phase: Cross-Artifact Inspection

**Timing**: When multiple artifact versions are merged

**Inspection Scope**: Cross-Artifact Inspection

**Execution Condition**: All artifacts have passed single-artifact inspection

<a id="713-release-phase-full-validation"></a>
#### 7.1.3 Release Phase: Full Validation

**Timing**: Full validation before release

**Inspection Scope**: Cross-Artifact Inspection + runtime simulation (Risk Implicit)

**Execution Condition**: Cross-Artifact Inspection passed; no P0 defects

<a id="714-runtime-phase-periodic-re-inspection"></a>
#### 7.1.4 Runtime Phase: Periodic Re-Inspection

**Timing**: Periodic re-inspection during Agent runtime

**Inspection Scope**: Cross-Artifact Inspection (streamlined)

**Re-Inspection Frequency**:

| AC-L Level | Re-Inspection Frequency | Description |
| --- | --- | --- |
| **AC-L1** | Monthly | Single-turn task type; few changes |
| **AC-L2** | Weekly | Multi-turn interactive type; moderate changes |
| **AC-L3** | Daily | Complex Agent type; frequent changes |

**Trigger Conditions**:

- Artifact version update
- User-reported anomalies
- Runtime monitoring identifies potential issues

<a id="715-degradation-phase-triggered-re-inspection"></a>
#### 7.1.5 Degradation Phase: Triggered Re-Inspection

**Timing**: When artifact degradation is detected

**Degradation Signals**:

- Single-artifact inspection discovers new defects
- Runtime monitoring detects anomalous behavior
- User complaints or negative feedback

**Handling**:

1. Trigger full Cross-Artifact Inspection
2. Record degradation cause
3. Re-inspect after remediation
4. Update inspection history chain

---

<a id="72-ratchet-mechanism-and-version-binding"></a>
### 7.2 Ratchet Mechanism and Version Binding

<a id="721-inspection-history-chain-maintenance"></a>
#### 7.2.1 Inspection History Chain Maintenance

```
Inspection History Chain
│
├─ Inspection Record #1
│   ├─ Timestamp: 2026-07-01
│   ├─ Artifact Versions: Prompt v1.0, Skill v1.0, Tool v1.0
│   ├─ Inspection Result: PASS
│   └─ Defect List: None
│
├─ Inspection Record #2 (continued)
│   ├─ Timestamp: 2026-07-05
│   ├─ Artifact Versions: Prompt v1.1, Skill v1.1, Tool v1.0
│   ├─ Inspection Result: FAIL
│   └─ Defect List:
│       ├─ QD-PS-1.3 Permission Boundary Inconsistency (P0)
│       └─ QD-PT-2.5 Incomplete Error Handling (P1)
│
└─ Inspection Record #3
    ├─ Timestamp: 2026-07-06
    ├─ Artifact Versions: Prompt v1.2, Skill v1.2, Tool v1.0
    ├─ Inspection Result: PASS
    └─ Defect List: None
```

<a id="722-ratchet-forward-mechanism"></a>
#### 7.2.2 Ratchet-Forward Mechanism

**Forward Rules**:

1. After each inspection completes, the result is appended to the history chain
2. The history chain may only be updated when:
   - Re-inspection occurs after defect remediation
   - Re-inspection occurs after artifact version update
3. Deletion of historical records is prohibited

**Backward Trigger Mechanism**:

- When new defects are discovered, trace the history chain to determine if this is degradation
- If degradation (previously passed, now failed): record the degradation cause
- After degradation remediation: continue appending records forward

<a id="723-version-binding-and-re-inspection-triggers"></a>
#### 7.2.3 Version Binding and Re-Inspection Triggers

**Version Binding Rules**:

```
Artifact Version Binding
├─ Prompt Version: v1.2
├─ Skill Version: v1.2
└─ Tool Version: v1.0

Inspection Result Binding: Based on artifact version combination
```

**Re-Inspection Trigger Conditions**:

| Trigger Event | Inspection Scope | Execution Timing |
| --- | --- | --- |
| **Artifact version update** | Full Cross-Artifact Inspection | After version update |
| **Single-artifact inspection discovers defect** | Full Cross-Artifact Inspection | After defect remediation |
| **Runtime anomaly** | Targeted inspection of relevant items | On anomaly occurrence |
| **User feedback** | Targeted inspection of relevant items | After feedback confirmation |
| **Periodic re-inspection** | Streamlined Cross-Artifact Inspection | Periodic execution |

---

<a id="73-part-summary"></a>
### 7.3 Part Summary

| Point | Description |
| --- | --- |
| **Inspection timing** | Development (single-artifact) → Integration (cross-artifact) → Release (full validation) |
| **Ratchet mechanism** | Inspection history chain is append-only; version-bound |
| **Re-inspection triggers** | Version update, defect remediation, runtime anomaly, user feedback, periodic re-inspection |
| **Degradation detection** | Trace history when new defects are discovered; determine if degradation |

---

<a id="74-frequency-and-batch-constraints-three-layers"></a>
### 7.4 Three-Layer Carrying of Frequency and Batch Constraints

Frequency/batch caps are carried by three layers, and the three layers cannot substitute for one another:

| Layer | Carried By | Nature |
| --- | --- | --- |
| ① Artifact declaration layer | The Prompt's business-level invocation expectations, the Skill's `max_tool_calls` / `max_retries` / `timeout_seconds`, the Tool's `limit.maximum` / `maxItems` | Business-applicable caps, delivered with the artifacts |
| ② Runtime fallback layer | Rate limiting, concurrency, and timeouts of the Harness / API gateway | Global fallback values |
| ③ Business quota layer | Business-side quotas, approvals, billing gates | Commercial and compliance constraints |

**Two determination disciplines**:

1. The artifact-layer inspection must not be cancelled or downgraded on the grounds that "the Harness has a fallback." Not all deployment environments have a Harness — local debugging, standalone deployment, and third-party-hosted Agents commonly have no gateway; in such cases the artifact declarations are the only source of constraint. Even where a Harness exists, the declarations must be retained.
2. The Harness's thresholds are not equivalent to business-applicable caps. Fallback values are the greatest common divisor chosen "so as not to harm any Agent," and their redundancy is usually maximal. Evaluating business reasonableness with fallback values would judge a Skill that "should query per order" as compliant.

The business-level expectations carried by layer ① are exactly what **QD-PT-2.6** (Prompt side) and **QD-ST-3.4** (Skill side) inspect.

**This specification only judges**: whether the artifact declares business-level expectations; whether those expectations directly contradict the Tool's declared capabilities/limits. **This specification does not judge**: whether the Harness is configured correctly; whether the thresholds are optimal; whether runtime enforcement actually holds.

---

## Part 8: Quantitative Scoring Mechanism

<a id="81-scoring-principles"></a>
### 8.1 Scoring Principles

<a id="811-core-principles"></a>
#### 8.1.1 Core Principles

| Principle | Description |
| --- | --- |
| **Total score of 100** | Deduction-based: baseline score (100) − defect deductions |
| **Weight ratio** | P0 : P1 : P2 = 5 : 3 : 1 |
| **Level differentiation** | Different AC-L levels (AC-L1/AC-L2/AC-L3) have different inspection item counts; per-item weight adjusts automatically |
| **Mathematical self-consistency** | After all defect deductions, minimum score ≥ 0; maximum score = 100 |
| **Gate condition** | Any P0 defect present → evaluation result is FAIL (score is still output) |
| **Deduplication rule** | For the same inspection item number, the weight is deducted only once regardless of how many defect instances are found; for same-source across numbers, see 8.5.2 |

<a id="812-relationship-to-inspect-prompttoolskill-scoring"></a>
#### 8.1.2 Relationship to Inspect Prompt/Tool/Skill Scoring

| Specification | Inspection Object | Scoring Scope | Relationship |
| --- | --- | --- | --- |
| **Inspect Prompt** | Prompt artifact | Single-artifact score | Prerequisite for Cross-Artifact Inspection |
| **Inspect Tool** | Tool artifact | Single-artifact score | Prerequisite for Cross-Artifact Inspection |
| **Inspect Skill** | Skill artifact | Single-artifact score | Prerequisite for Cross-Artifact Inspection |
| **Inspect Cross** | Cross-Artifact relationships | Cross-Artifact score | Executed after single-artifact scores pass; independent scoring system |

**Important Note**: Inspect Cross scoring is independent of single-artifact scoring; the two are not combined into a weighted composite. The Cross-Artifact Inspection pass condition is: all single-artifact inspections pass (no P0 defects) AND Cross-Artifact Inspection passes (no P0 defects).

---

<a id="82-calculation-steps"></a>
### 8.2 Calculation Steps

<a id="821-calculation-formula"></a>
#### 8.2.1 Calculation Formula

**Step 1: Determine Agent Level**

Determine AC-L1/AC-L2/AC-L3 based on Agent characteristics (refer to Section 5.4.2 AC-L Level Definitions).

**Step 2: Calculate Total Weight**

$$W_{total} = 5 \times N_{P0} + 3 \times N_{P1} + 1 \times N_{P2}$$

Where $N_{P0}$, $N_{P1}$, $N_{P2}$ are the inspection item counts applicable to the Agent Level (see Section 8.3 Inspection Item Distribution Table).

**Step 3: Calculate Base Score**

$$base = \frac{100}{W_{total}}$$

**Step 4: Calculate Per-Defect Deduction Values**

- P0 defect deduction = $base \times 5$
- P1 defect deduction = $base \times 3$
- P2 defect deduction = $base \times 1$

**Step 5: Calculate Total Deduction**

$$\text{Total Deduction} = \sum_{i=1}^{n_{P0}} (\text{P0 deduction}) + \sum_{j=1}^{n_{P1}} (\text{P1 deduction}) + \sum_{k=1}^{n_{P2}} (\text{P2 deduction})$$

Where $n_{P0}$, $n_{P1}$, $n_{P2}$ are the actual counts of failed inspection items (deduplicated by item number).

**Step 6: Calculate Actual Score**

$$Score = \max(100 - \text{Total Deduction}, 0)$$

**Step 7: Gate Determination**

- If any P0 defect present → result = FAIL
- Otherwise → result = PASS

<a id="822-rounding-rules"></a>
#### 8.2.2 Rounding Rules

- `W_total` is an integer
- `base` retains three decimal places for subsequent multiplication
- Per-tier deduction values are calculated from the three-decimal `base` and retain three decimal places
- The final score is rounded to the nearest integer; only the integer is output in reports

---

<a id="83-inspection-item-distribution-table"></a>
### 8.3 Inspection Item Distribution Table

<a id="831-per-level-inspection-item-statistics"></a>
#### 8.3.1 Per-Level Inspection Item Statistics

Based on the inspection item definitions in Part 5, derived from the item-by-item check-offs and default severities in Appendix A:

| AC-L Level | Total Items | P0 Count | P1 Count | P2 Count | Total Weight $W_{total}$ | Base Score $base$ |
| --- | --- | --- | --- | --- | --- | --- |
| **AC-L1** | 7 | 7 | 0 | 0 | $5\times7=35$ | $100/35\approx2.857$ |
| **AC-L2** | 20 | 9 | 10 | 1 | $5\times9+3\times10+1\times1=76$ | $100/76\approx1.316$ |
| **AC-L3** | 29 | 9 | 15 | 5 | $5\times9+3\times15+1\times5=95$ | $100/95\approx1.053$ |

> **Caliber Note**: The "Total Items" column gives the applicable item counts from the item-by-item check-offs in Appendix A (AC-L1=7, AC-L2=20, AC-L3=29); the P0 counts therein are consistent with the Minimum Rule Sets in Appendix B (7/9/9). The three calibers (applicable scope / P0 minimum set / scoring denominator) have been unified.

**Composition Detail**:

| Group | L1 | L2 | L3 |
| --- | --- | --- | --- |
| QD-PS | 1.1, 1.3 (2) | 1.1–1.4, 1.7 (5) | 1.1–1.7 (7) |
| QD-PT | 2.1, 2.2, 2.4 (3) | 2.1–2.4, 2.7 (5) | 2.1–2.7 (7) |
| QD-ST | 3.1, 3.6 (2) | 3.1, 3.2, 3.3, 3.6 (4) | 3.1–3.7 (7) |
| QD-CYC | — | 1.1, 1.3 (2) | 1.1, 1.2, 1.3 (3) |
| QD-SS | — | 4.1, 4.2 (2) | 4.1, 4.2 (2) |
| QD-TT | — | 5.1, 5.2 (2) | 5.1–5.3 (3) |
| **Total** | **7** | **20** | **29** |

**Note**:

- AC-L1 inspects 7 core applicable items (all P0)
- AC-L2 inspects 20 applicable items
- AC-L3 inspects 29 applicable items (full)

<a id="832-per-level-defect-deduction-values"></a>
#### 8.3.2 Per-Level Defect Deduction Values

| AC-L | base | P0 | P1 | P2 |
| --- | --- | --- | --- | --- |
| L1 | 2.857 | 14.286 | 8.571 | 2.857 |
| L2 | 1.316 | 6.580 | 3.948 | 1.316 |
| L3 | 1.053 | 5.265 | 3.159 | 1.053 |

---

<a id="84-scoring-examples"></a>
### 8.4 Scoring Examples

<a id="841-example-1-l2-agent-no-p0-defects-pass"></a>
#### 8.4.1 Example 1: AC-L2 Agent, No P0 Defects (PASS)

**Scenario**: AC-L2 Agent (Multi-turn Interactive)

**Inspection Results**:

- Failed P0 items: 0
- Failed P1 items: 2
- Failed P2 items: 1

**Calculation**:

AC-L2 Level:

- $W_{total} = 76$
- $base = 100/76 \approx 1.316$
- P1 deduction = $1.316\times3 \approx 3.948$
- P2 deduction = $1.316\times1 \approx 1.316$

**Total Deduction**:
$$\text{Total Deduction} = 2 \times 3.948 + 1 \times 1.316 = 9.212$$

**Score (rounded)**:
$$Score = \text{round}(100 - 9.212) = \text{round}(90.788) = 91$$

**Gate Determination**: No P0 defects → result = PASS

**Scoring Report**:

```json
{
  "check_id": "cross-20260710-001",
  "framework": "SanityOps/Inspect Cross",
  "agent_level": "AC-L2",
  "result": "PASS",
  "score": 91,
  "defects": [
    {"rule_id": "QD-PS-1.2", "severity": "Inspect·P1", "found_count": 1},
    {"rule_id": "QD-PT-2.3", "severity": "Inspect·P1", "found_count": 1},
    {"rule_id": "QD-SS-4.2", "severity": "Inspect·P2", "found_count": 1}
  ],
  "check_timestamp": "2026-07-10T14:30:00Z",
  "artifact_versions": {
    "prompt": "v1.2",
    "skill": "v1.1",
    "tool": "v1.0"
  }
}
```

---

<a id="842-example-2-l3-agent-p0-defects-present-fail"></a>
#### 8.4.2 Example 2: AC-L3 Agent, P0 Defects Present (FAIL)

**Scenario**: AC-L3 Agent (Complex Agent)

**Inspection Results**:

- Failed P0 items: 2
- Failed P1 items: 1
- Failed P2 items: 0

**Calculation**:

AC-L3 Level:

- $W_{total} = 95$
- $base = 100/95 \approx 1.053$
- P0 deduction = $1.053\times5 \approx 5.265$
- P1 deduction = $1.053\times3 \approx 3.159$

**Total Deduction**:
$$\text{Total Deduction} = 2 \times 5.265 + 1 \times 3.159 = 13.689$$

**Score (rounded)**:
$$Score = \text{round}(100 - 13.689) = \text{round}(86.311) = 86$$

**Gate Determination**: P0 defects present → result = FAIL

**Scoring Report**:

```json
{
  "check_id": "cross-20260710-002",
  "framework": "SanityOps/Inspect Cross",
  "agent_level": "AC-L3",
  "result": "FAIL",
  "score": 86,
  "defects": [
    {"rule_id": "QD-PS-1.1", "severity": "Inspect·P0", "found_count": 1},
    {"rule_id": "QD-ST-3.6", "severity": "Inspect·P0", "found_count": 1},
    {"rule_id": "QD-PT-2.5", "severity": "Inspect·P1", "found_count": 1}
  ],
  "gate_condition": "Inspect·P0 defect present; MUST remediate and re-inspect",
  "check_timestamp": "2026-07-10T15:00:00Z",
  "artifact_versions": {
    "prompt": "v2.0",
    "skill": "v2.0",
    "tool": "v1.5"
  }
}
```

---

<a id="843-example-3-l1-agent-all-passed-pass"></a>
#### 8.4.3 Example 3: AC-L1 Agent, All Passed (PASS)

**Scenario**: AC-L1 Agent (Single-turn Task)

**Inspection Results**:

- Failed P0 items: 0
- Failed P1 items: 0
- Failed P2 items: 0

**Calculation**:

Total Deduction = 0

**Score**:
$$Score = 100 - 0 = 100$$

**Gate Determination**: No P0 defects → result = PASS

**Scoring Report**:

```json
{
  "check_id": "cross-20260710-003",
  "framework": "SanityOps/Inspect Cross",
  "agent_level": "AC-L1",
  "result": "PASS",
  "score": 100,
  "defects": [],
  "check_timestamp": "2026-07-10T16:00:00Z",
  "artifact_versions": {
    "prompt": "v1.0",
    "skill": "v1.0",
    "tool": "v1.0"
  }
}
```

---

<a id="85-multi-defect-handling-rules"></a>
### 8.5 Multi-Defect Handling Rules

<a id="851-deduplication-rule"></a>
#### 8.5.1 Deduplication Rule

**Core Rule**: For the same inspection item number, the weight is deducted only once regardless of how many defect instances are found.

**Example**:

Inspection discovers:

- QD-PS-1.3: 2 instances of permission inconsistency found
- QD-ST-3.6: 3 instances of permission scope mismatch found

**Deduction Calculation**:

- QD-PS-1.3 (P0): deduct one P0 deduction value
- QD-ST-3.6 (P0): deduct one P0 deduction value

**Total Deduction** = 2 × P0 deduction value

**Note**: Although 5 defect instances were found, they involve only 2 inspection item numbers, so only 2 deductions apply.

<a id="852-linked-defect-handling"></a>
#### 8.5.2 Linked and Same-Source Defect Handling

1. **Scoring**: Multiple numbers falling in the same same-source group are deducted only once, taking the highest severity among them.
2. **Report**: Retain all numbers and all evidence; list them as one group in `linkage_defects`, marking the primary item number.
3. **Remediation**: Indicate "coordinated remediation required" and list the numbers that a single remediation can close simultaneously.
4. **Denominator unchanged**: Same-source deduplication only reduces the number of deductions; it does not remove items from the denominator. The denominator always equals the applicable item count of that AC-L level.

**Same-Source Groups (conditional; counted once only if the group's merge condition is met)**

| Group | Numbers | Merge Condition (same fact) |
| --- | --- | --- |
| Tool existence | QD-PT-2.1 ↔ QD-ST-3.1 | The same non-existent Tool name is referenced by both the Prompt and the Skill |
| Permission boundary | QD-PS-1.3 ↔ QD-PS-1.4 ↔ QD-ST-3.6 | Evidence falls in the same `allowed_operations` / `allowed_resources` declaration, and a single remediation closes all of them |
| Parameter constraints | QD-PT-2.3 ↔ QD-ST-3.2 | The same constraint gap on the same parameter |
| Output contract | QD-PS-1.6 ↔ QD-ST-3.5 | The same structural mismatch in the same output (primary item QD-ST-3.5) |
| Error handling | QD-PT-2.5 ↔ QD-ST-3.7 | The same class of critical error for the same Tool has no strategy on either side |

> Note: QD-PT-2.7 is a Prompt↔Tool inspection item with no Skill-side same-source counterpart, so it does not participate in same-source deduplication (it may overlap with QD-ST-3.2 only when a caliber gap also constitutes an input constraint inconsistency; when in doubt, treat them as different sources).

**Outside the groups, always score separately**. When the determination is uncertain, treat them as "different sources" and mark the determination basis in the report.

---

<a id="86-part-summary"></a>
### 8.6 Part Summary

| Point | Description |
| --- | --- |
| **Scoring principle** | Total score of 100; deduction-based; P0:P1:P2 = 5:3:1 |
| **Calculation steps** | Determine level → calculate weight → calculate base → calculate deductions → round |
| **Gate condition** | P0 defect present → FAIL (score still output) |
| **Deduplication rule** | Same inspection item number deducted only once; same-source deducted only once, denominator unchanged |
| **Rounding** | Final score rounded to nearest integer |
| **Independence** | Cross-Artifact scoring is independent of single-artifact scoring; no weighted combination |

---

## Part 9: Appendices

### Appendix A: Complete Inspection Item List

#### A.1 QD-PS Inspection Items (Prompt → Skill)

| ID | Inspection Item Name | Severity (Default) | AC-L1 | AC-L2 | AC-L3 | Description |
| --- | --- | --- | --- | --- | --- | --- |
| QD-PS-1.1 | Skill Authorization Consistency | P0 | ✓ | ✓ | ✓ | Skill defined but not authorized by Prompt |
| QD-PS-1.2 | Trigger Condition Consistency | P1 | — | ✓ | ✓ | Trigger conditions inconsistent or contradictory |
| QD-PS-1.3 | Permission Boundary Consistency | P0 | ✓ | ✓ | ✓ | Skill permissions exceed Prompt authorization |
| QD-PS-1.4 | Resource Access Consistency | P1 | — | ✓ | ✓ | Skill resources exceed Prompt authorization |
| QD-PS-1.5 | Failure Handling Consistency | P1 | — | — | ✓ | Failure handling strategy contradiction |
| QD-PS-1.6 | Output Constraint Consistency | P2 | — | — | ✓ | Output constraints inconsistent |
| QD-PS-1.7 | Orchestration Order and Prerequisite Consistency | P1 | — | ✓ | ✓ | Prerequisites not satisfied before invocation |

#### A.2 QD-PT Inspection Items (Prompt → Tool)

| ID | Inspection Item Name | Severity (Default) | AC-L1 | AC-L2 | AC-L3 | Description |
| --- | --- | --- | --- | --- | --- | --- |
| QD-PT-2.1 | Tool Existence | P0 | ✓ | ✓ | ✓ | Tool declared in Prompt does not exist |
| QD-PT-2.2 | Invocation Specification Consistency | P0 | ✓ | ✓ | ✓ | Invocation method does not match Tool Schema |
| QD-PT-2.3 | Parameter Constraint Consistency | P1 | — | ✓ | ✓ | Parameter constraints inconsistent |
| QD-PT-2.4 | Permission Granularity Consistency | P0 | ✓ | ✓ | ✓ | High-risk Tool has no security boundary declaration |
| QD-PT-2.5 | Key Error Handling Coverage | P1 | — | — | ✓ | Key errors not covered |
| QD-PT-2.6 | Business-Level Frequency Expectation Declaration | P2 | — | — | ✓ | Business-level frequency/batch expectation missing |
| QD-PT-2.7 | Parameter Semantics and Unit Consistency | P1 | — | ✓ | ✓ | Parameter semantics/unit caliber inconsistent |

#### A.3 QD-ST Inspection Items (Skill ↔ Tool)

| ID | Inspection Item Name | Severity (Default) | AC-L1 | AC-L2 | AC-L3 | Description |
| --- | --- | --- | --- | --- | --- | --- |
| QD-ST-3.1 | Tool Existence | P0 | ✓ | ✓ | ✓ | Tool declared in Skill does not exist |
| QD-ST-3.2 | Input Constraint Consistency | P0 | — | ✓ | ✓ | Skill input constraint not supported by Tool |
| QD-ST-3.3 | Required Parameter Preparation | P0 | — | ✓ | ✓ | Tool required parameter has no source in Skill |
| QD-ST-3.4 | Business-Level Frequency Expectation Declaration | P2 | — | — | ✓ | Business-level frequency/batch expectation missing |
| QD-ST-3.5 | Output Structure Match | P1 | — | — | ✓ | Skill output expectations do not match Tool return values |
| QD-ST-3.6 | Permission Scope Match | P0 | ✓ | ✓ | ✓ | Tool side effects exceed Skill permission declarations |
| QD-ST-3.7 | Key Error Handling Coverage | P1 | — | — | ✓ | Key errors not covered |

#### A.4 QD-CYC Inspection Items (Cross-Cutting)

| ID | Inspection Item Name | Severity (Default) | AC-L1 | AC-L2 | AC-L3 | Description |
| --- | --- | --- | --- | --- | --- | --- |
| QD-CYC-1.1 | Cross-Artifact Circular Invocation | P1 | — | ✓ | ✓ | Closed loop across Prompt/Skill/Tool invocation relationships detected by LLM semantic analysis |
| QD-CYC-1.2 | Multi-Agent Circular Invocation | P1 | — | — | ✓ | Closed loop across multiple agent roles in the Prompt orchestration detected by LLM semantic analysis |
| QD-CYC-1.3 | Skill-to-Skill Handoff Loop | P1 | — | ✓ | ✓ | Skill-to-Skill handoff loop without a termination condition |

**Note**: QD-CYC items carry a default severity of P1. A definitive closed loop (explicit bidirectional/cyclic invocation) is determined directly as P0 per the in-item Severity Determination Rules in Part 4.5.2; this P0 is not an Appendix C upgrade and is independent of the OR-L3 trigger in Appendix C.2. QD-CYC-1.2 applies only when the Prompt orchestration declares ≥2 Agent roles; otherwise N/A (record the basis).

#### A.5 QD-SS Inspection Items (Skill ↔ Skill)

| ID | Inspection Item Name | Severity (Default) | AC-L1 | AC-L2 | AC-L3 | Description |
| --- | --- | --- | --- | --- | --- | --- |
| QD-SS-4.1 | Trigger Condition Conflict | P1 | — | ✓ | ✓ | Multiple Skills' triggers overlap; multiple Skills activate simultaneously under the same input |
| QD-SS-4.2 | Name Uniqueness | P2 | — | ✓ | ✓ | Multiple Skill names are identical or highly similar, causing mis-invocation |

**Note**: QD-SS-4.1 defaults to P1 and is upgraded to P0 when an `OR-L3` Skill is involved; QD-SS-4.2 defaults to P2, is upgraded to P1 when `OR-L3` is involved, and is upgraded to P0 when the similarity causes mis-invocation of an `OR-L3` Skill.

#### A.6 QD-TT Inspection Items (Tool ↔ Tool)

| ID | Inspection Item Name | Severity (Default) | AC-L1 | AC-L2 | AC-L3 | Description |
| --- | --- | --- | --- | --- | --- | --- |
| QD-TT-5.1 | Cross-Tool Data Flow | P1 | — | ✓ | ✓ | Sensitive output is dangerously consumed, forming a data leakage chain |
| QD-TT-5.2 | Multi-Tool Semantic Competition | P1 | — | ✓ | ✓ | Multiple Tools' name/description similarity causes mis-invocation |
| QD-TT-5.3 | Cross-Tool Data Structure Bridging | P2 | — | — | ✓ | output/inputSchema types incompatible with no conversion |

**Note**: QD-TT-5.1 defaults to P1 and is upgraded to P0 for "sensitive output + dangerous consumption"; QD-TT-5.2 defaults to P1 and is upgraded to P0 when behavior differs greatly.

---

### Appendix B: Minimum Rule Sets

#### B.1 Minimum Rule Set Definition

**Minimum Rule Set**: The set of **P0 inspection items** that each AC-L level must pass, forming the core basis for compliance determination. It is derived from the item-by-item check-offs in Appendix A: among the applicable items of a level, any item whose default severity is P0 is included in that level's Minimum Rule Set.

**Core Principles**:

- AC-L1 Minimum Rule Set ⊆ AC-L2 Minimum Rule Set ⊆ AC-L3 Minimum Rule Set (P0 items are monotonically non-decreasing across levels; AC-L3 and AC-L2 have the same P0 set, because the items newly applicable at L3 are all P1/P2)
- Minimum Rule Sets contain only P0 inspection items
- Any P0 defect present → evaluation FAIL

> The denominator (applicable item count) may change across versions, while the P0 minimum set does not; the two calibers are carried by Appendix A and Appendix B respectively.

#### B.2 AC-L1 Minimum Rule Set (7 P0 Items)

| ID | Inspection Item Name | Relationship |
| --- | --- | --- |
| QD-PS-1.1 | Skill Authorization Consistency | QD-PS |
| QD-PS-1.3 | Permission Boundary Consistency | QD-PS |
| QD-PT-2.1 | Tool Existence | QD-PT |
| QD-PT-2.2 | Invocation Specification Consistency | QD-PT |
| QD-PT-2.4 | Permission Granularity Consistency | QD-PT |
| QD-ST-3.1 | Tool Existence | QD-ST |
| QD-ST-3.6 | Permission Scope Match | QD-ST |

**AC-L1 Compliance Determination**: MUST pass the above 7 P0 inspection items.

#### B.3 AC-L2 Minimum Rule Set (9 P0 Items)

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

**AC-L2 Compliance Determination**: MUST pass the above 9 P0 inspection items (includes AC-L1's 7 items).

#### B.4 AC-L3 Minimum Rule Set (9 P0 Items)

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

**AC-L3 Compliance Determination**: MUST pass the above 9 P0 inspection items (the same as AC-L2, because the items newly applicable at AC-L3 are all P1/P2 and no new P0 items are added).

---

### Appendix C: Severity Upgrade Rules in Detail

#### C.1 Upgrade Trigger Conditions

| Trigger Condition | Upgrade Rule | Description |
| --- | --- | --- |
| **Tool is OR-L3** | Associated inspection items P1→P0 | High-risk Tool defects directly upgraded to blocking level |
| **Skill is OR-L3** | Associated inspection items P1→P0 | High-risk Skill defects directly upgraded to blocking level |

> Instance upgrades (the "→ P0" branches in each inspection item's body) are described in 5.4.5; linkage only affects tagging and remediation order and is no longer an upgrade trigger condition.

#### C.2 Upgrade Mapping Table

| Inspection Item | Default Level | OR-L3 |
| --- | --- | --- |
| QD-PS-1.2 | P1 | P0 |
| QD-PS-1.4 | P1 | P0 |
| QD-PS-1.5 | P1 | P0 |
| QD-PS-1.7 | P1 | P0 |
| QD-PT-2.3 | P1 | P0 |
| QD-PT-2.5 | P1 | — |
| QD-PT-2.7 | P1 | P0 |
| QD-ST-3.5 | P1 | P0 |
| QD-ST-3.7 | P1 | — |
| QD-SS-4.1 | P1 | P0 |
| QD-SS-4.2 | P2 | P1 (mis-invoking OR-L3 → P0) |
| QD-TT-5.1 | P1 | P0 |
| QD-TT-5.2 | P1 | P0 |
| QD-CYC-1.1 | P1 | P0 |
| QD-CYC-1.2 | P1 | P0 |
| QD-CYC-1.3 | P1 | P0 |

> **General Rule**: Items with a default of P2 are upgraded at most to P1 under OR-L3; they are upgraded to P0 only when the item's own rule declares that it "causes mis-invocation of an OR-L3 operation" (currently only QD-SS-4.2). P2 items (QD-PS-1.6 / QD-PT-2.6 / QD-ST-3.4 / QD-TT-5.3) have no OR-L3 upgrade and remain P2; any upgrade requires writing a "→ P1" instance upgrade condition in the respective inspection item's body.

#### C.3 Upgrade Determination Process

```
Step 1: Identify Tool Risk Level (OR-L1/L2/L3)
  ↓
Step 2: Identify Skill Risk Level (OR-L1/L2/L3)
  ↓
Step 3: Apply upgrade rules (the OR-L3 mapping in Appendix C.2 + the "→ P0" instance upgrades in each inspection item's body)
  ↓
Step 4: Output final severity level
```

---

### Appendix D: Remediation Ownership Summary

#### D.1 Remediation Priority Master Table

| Inspection Item | Defect Type | Remediation Priority (judged item by item; default Tool > Skill > Prompt) |
| --- | --- | --- |
| QD-PS-1.1 | Skill Authorization Missing | Prompt side supplements authorization or removes Skill definition |
| QD-PS-1.2 | Trigger Condition Conflict | Prompt side first (Prompt is the workflow orchestrator) |
| QD-PS-1.3 | Permission Overflow | Skill side first (Skill should converge toward narrower permission) |
| QD-PS-1.4 | Resource Access Overflow | Skill side first |
| QD-PS-1.5 | Failure Handling Contradiction | Both sides, coordinated (adopt more conservative strategy) |
| QD-PS-1.6 | Output Constraint Inconsistency | Skill side first |
| QD-PS-1.7 | Orchestration Order / Prerequisite Missing | Prompt side first (place the declaration before the workflow steps) |
| QD-PT-2.1 | Tool Does Not Exist | Tool side supplements or Prompt side removes declaration |
| QD-PT-2.2 | Invocation Specification Mismatch | Tool side first (Tool Schema is the Hard Constraint) |
| QD-PT-2.3 | Parameter Constraint Inconsistency | Tool side first |
| QD-PT-2.4 | High-Risk Boundary Missing | Prompt side first (supplement security boundary declarations) |
| QD-PT-2.5 | Key Error Handling Coverage | Prompt side first |
| QD-PT-2.6 | Business-Level Frequency Expectation Missing | Prompt side first |
| QD-PT-2.7 | Parameter Semantics / Unit Caliber Inconsistent | Tool side first (unify to the `inputSchema`'s unit/description) |
| QD-ST-3.1 | Tool Does Not Exist | Tool side supplements or Skill side removes declaration |
| QD-ST-3.2 | Input Constraint Not Supported | Tool side first |
| QD-ST-3.3 | Required Parameter No Source | Skill side first (supplement parameter source declaration) |
| QD-ST-3.4 | Business-Level Frequency Expectation Missing | Skill side first |
| QD-ST-3.5 | Output Structure Mismatch | Both sides, coordinated |
| QD-ST-3.6 | Permission Scope Not Covered | Tool side first (tighten Tool side effects) |
| QD-ST-3.7 | Key Error Handling Coverage | Skill side first |
| QD-SS-4.1 | Trigger Condition Conflict | Skill side first (narrow the trigger or declare priority) |
| QD-SS-4.2 | Skill Name Similarity | Skill side first (rename or add a disambiguating suffix) |
| QD-TT-5.1 | Cross-Tool Data Flow | Tool side first (mask sensitive fields or switch to internal retrieval) |
| QD-TT-5.2 | Multi-Tool Semantic Competition | Tool side first (disambiguate names or supplement descriptions) |
| QD-TT-5.3 | Cross-Tool Data Structure Incompatible | Skill side first (add serialization/conversion in EXECUTION) |
| QD-CYC-1.1 | Cross-Artifact Circular Invocation | Prompt side first (add termination / max iteration); Skill side constrain downstream invocation; Tool side constrain callback |
| QD-CYC-1.2 | Multi-Agent Circular Invocation | Prompt side first (add termination / max iteration; split loop into linear flow) |
| QD-CYC-1.3 | Skill-to-Skill Handoff Loop | Skill side first (add termination conditions / maximum rounds to the downstream whitelist) |

#### D.2 Principle of Least Risk Application

**Core Principle**: When remediating, prioritize the solution that introduces the least risk.

**Specific Applications**:

| Defect Type | Least-Risk Approach |
| --- | --- |
| Permission inconsistency | Converge toward the narrower permission |
| Constraint inconsistency | Converge toward the stricter constraint |
| Failure handling contradiction | Choose the more conservative strategy (e.g., prohibit retries, report errors immediately) |
| Unclear boundary definition | Clarify boundaries; tighten rather than relax |

---

### Appendix E: Inspection Report Template

#### E.1 Report Structure

```json
{
  "check_id": "cross-20260710-xxx",
  "framework": "SanityOps/Inspect Cross",
  "version": "v1.0",
  "scoring_version": "v1.0",
  "check_timestamp": "2026-07-10Txx:xx:xxZ",

  "agent_info": {
    "name": "Agent Name",
    "level": "AC-L1/AC-L2/AC-L3",
    "description": "Agent Description"
  },

  "artifact_versions": {
    "prompt": "v1.0",
    "skill": "v1.0",
    "tool": "v1.0"
  },

  "prerequisite_check": {
    "prompt_passed": true,
    "skill_passed": true,
    "tool_passed": true,
    "all_passed": true
  },

  "result": "PASS/FAIL",
  "score": 87,
  "gate_condition": "No Inspect·P0 defects / Inspect·P0 defects MUST be remediated",

  "release_summary": {
    "status": "PASS/PASS_WITH_EXCEPTION/FAIL/NEEDS_REVIEW/ERROR",
    "source_results": {
      "inspect_cross_gate": "PASS",
      "risk_explicit_gate": "N/A",
      "risk_implicit_gate": "N/A",
      "quality_gate": "N/A"
    },
    "exceptions": []
  },

  "defect_summary": {
    "p0_count": 0,
    "p1_count": 2,
    "p2_count": 1
  },

  "defects": [
    {
      "finding_id": "F-ORG-20260710-001",
      "rule_id": "QD-PS-1.2",
      "check_name": "Trigger Condition Consistency",
      "severity": "Inspect·P1",
      "status": "open",
      "found_count": 1,
      "judgment": "Defect",
      "location": {
        "relation": "QD-PS (Prompt → Skill)",
        "prompt_side": "Workflow step description",
        "skill_side": "TRIGGER dimension",
        "evidence": {
          "prompt": "Original excerpt...",
          "skill": "Original excerpt..."
        }
      },
      "description": "Trigger conditions inconsistent: Prompt requires strict triggering; Skill trigger condition is vague",
      "fix_suggestion": "Unify trigger conditions (deferring to Prompt)",
      "fix_priority": "Prompt side first"
    }
  ],

  "linkage_defects": [],
  "na_without_basis": [],

  "check_history": {
    "previous_check_id": "cross-20260709-xxx",
    "is_regression": false
  }
}
```

#### E.2 Field Descriptions

| Field | Description |
| --- | --- |
| check_id | Unique inspection identifier |
| framework | Inspection framework name |
| version | Inspection specification version |
| scoring_version | Scoring rule version |
| check_timestamp | Inspection timestamp |
| agent_info | Basic Agent information |
| artifact_versions | Artifact version information |
| prerequisite_check | Prerequisite check results |
| result | Inspection result (PASS/FAIL) |
| score | Score (0–100, rounded to nearest integer) |
| gate_condition | Gate condition description |
| release_summary | Release summary shell (references the five states in core.md §6.2; this field does not replace the original conclusions of each sub-specification) |
| defect_summary | Defect statistics |
| defects | Defect list (each item includes a `judgment` determination state) |
| linkage_defects | Linked defect list |
| na_without_basis | List of N/A items without a basis |
| check_history | Inspection history |

---

### Appendix F: Usage Examples

#### F.1 AC-L1 Agent Cross-Artifact Inspection Example

##### F.1.1 Example Agent Description

**Agent Name**: daily-weather-query

**Agent Level**: AC-L1 (Single-turn Task)

**Artifact Composition**:

- **Prompt**: Weather query assistant; single invocation returns weather information
- **Skill**: weather-fetcher, fetches weather data
- **Tool**: weather-api, third-party weather API

**Agent Characteristics**:

- Single skill (weather query)
- No multi-turn dialogue
- 1 tool invocation
- No sensitive data handling

##### F.1.2 Inspection Execution and Conclusion

**Inspection Scope**: AC-L1 Minimum Rule Set (7 P0 items)

**Inspection Results**:

| Inspection Item | Result |
| --- | --- |
| QD-PS-1.1 Skill Authorization Consistency | ✅ PASS |
| QD-PS-1.3 Permission Boundary Consistency | ✅ PASS |
| QD-PT-2.1 Tool Existence | ✅ PASS |
| QD-PT-2.2 Invocation Specification Consistency | ✅ PASS |
| QD-PT-2.4 Permission Granularity Consistency | ✅ PASS |
| QD-ST-3.1 Tool Existence | ✅ PASS |
| QD-ST-3.6 Permission Scope Match | ✅ PASS |

**Conclusion**: All 7 P0 items pass, with no defects; Gate = PASS. All 7 AC-L1 items are P0 (there are no P1/P2 items); for a full "defect discovery → remediation" demonstration, see F.2 (the AC-L3 example).

---

#### F.2 AC-L3 Agent Cross-Artifact Inspection Example

##### F.2.1 Example Agent Description

**Agent Name**: financial-analysis-agent

**Agent Level**: AC-L3 (Complex Agent)

**Artifact Composition**:

- **Prompt**: Financial analysis assistant; supports multi-source data queries, report generation, risk assessment
- **Skills**:
  - market-data-fetcher (market data retrieval)
  - report-generator (report generation)
  - risk-analyzer (risk assessment)
- **Tools**:
  - stock-api (stock data API)
  - news-api (news data API)
  - report-template-engine (report template engine)
  - risk-model-api (risk model API)

**Agent Characteristics**:

- Multi-skill collaboration
- 4 tool invocations
- Complex workflow
- Sensitive data handling (financial data)

##### F.2.2 Inspection Execution and Linked Defect Discovery

**Inspection Scope**: AC-L3 full inspection (29 items)

**Inspection Results**:

| Inspection Item | Result | Defect Description |
| --- | --- | --- |
| QD-PS-1.1 | ✅ PASS | — |
| QD-PS-1.2 | ⚠️ P1 | report-generator trigger conditions inconsistent with Prompt workflow |
| QD-PS-1.3 | 🔴 P0 | market-data-fetcher permissions exceed Prompt authorization |
| QD-PS-1.4 | ✅ PASS | — |
| QD-PS-1.5 | ⚠️ P1 | risk-analyzer failure handling contradicts Prompt strategy |
| QD-PS-1.6 | ✅ PASS | — |
| QD-PS-1.7 Orchestration Order and Prerequisite Consistency | ⚠️ P1 | report-generator's prerequisite "data source validation" is not ordered before the invocation in the Prompt steps |
| QD-PT-2.1 | ✅ PASS | — |
| QD-PT-2.2 | ✅ PASS | — |
| QD-PT-2.3 | ⚠️ P1 | stock-api parameter constraints inconsistent with Prompt |
| QD-PT-2.4 | 🔴 P0 | risk-model-api high-risk operation has no security boundary declaration in Prompt |
| QD-PT-2.5 | ⚠️ P1 | Prompt does not handle possible 403 error from news-api |
| QD-PT-2.6 | ✅ PASS | — |
| QD-PT-2.7 Parameter Semantics and Unit Consistency | ✅ PASS | stock-api's `price` and the Prompt both use "yuan" |
| QD-ST-3.1 | ✅ PASS | — |
| QD-ST-3.2 | ✅ PASS | — |
| QD-ST-3.3 | 🔴 P0 | stock-api required parameter has no source declaration in market-data-fetcher |
| QD-ST-3.4 | ✅ PASS | — |
| QD-ST-3.5 | ⚠️ P1 | report-generator output format does not match report-template-engine |
| QD-ST-3.6 | 🔴 P0 | market-data-fetcher permissions do not cover stock-api write operations |
| QD-ST-3.7 | ⚠️ P1 | risk-analyzer does not handle possible errors from risk-model-api |
| QD-CYC-1.1 | ✅ PASS | — |
| QD-CYC-1.2 | ✅ PASS | — |
| QD-CYC-1.3 Skill-to-Skill Handoff Loop | ✅ PASS | The three Skills do not hand off to one another |
| QD-SS-4.1 | ✅ PASS | The triggers of the three Skills do not overlap |
| QD-SS-4.2 | ✅ PASS | The names of the three Skills are not similar to one another |
| QD-TT-5.1 | ✅ PASS | No cross-Tool data flow was found in which sensitive output is dangerously consumed |
| QD-TT-5.2 | ✅ PASS | The name/description semantics of the four Tools are distinguishable |
| QD-TT-5.3 Cross-Tool Data Structure Bridging | ✅ PASS | report-template-engine accepts a string, and the upstream has already serialized it |

**Linked Defect Identification**:

| Linkage ID | Defects Involved | Linkage Relationship |
| --- | --- | --- |
| **Linkage #1** | QD-PS-1.3 + QD-ST-3.6 | Permission boundary inconsistency involves Prompt, Skill, and Tool |
| **Linkage #3** | QD-PS-1.5 + QD-ST-3.7 | Failure handling issues involve Prompt and Skill |

**Severity Upgrades**:

- QD-PS-1.3 + QD-ST-3.6: Involves sensitive data operations → remains P0
- QD-PT-2.4: risk-model-api is OR-L3 high-risk → remains P0
- QD-ST-3.3: Required parameter missing → remains P0

##### F.2.3 Remediation Guidance and Prioritization

**Remediation Priority Ordering**:

| Priority | Defect ID(s) | Remediation Guidance |
| --- | --- | --- |
| **P0-1** | QD-PS-1.3 + QD-ST-3.6 (Linkage #1) | Coordinated remediation: tighten Skill permissions; Prompt supplements security boundary |
| **P0-2** | QD-PT-2.4 | Prompt supplements risk-model-api security boundary declaration |
| **P0-3** | QD-ST-3.3 | Skill supplements parameter source declaration |
| **P1-1** | QD-PS-1.2 | Unify trigger conditions |
| **P1-2** | QD-PS-1.5 + QD-ST-3.7 (Linkage #3) | Unify failure handling strategy |
| **P1-3** | QD-PT-2.3 (standalone) | Unify parameter constraints |
| **P1-4** | QD-PT-2.5 | Prompt supplements 403 error handling |
| **P1-5** | QD-ST-3.5 | Unify output format |
| **P1-6** | QD-PS-1.7 | Place "data source validation" before the Prompt steps |

**Detailed Remediation Plans**:

**Defect**: QD-PS-1.3 + QD-ST-3.6 (Linkage #1)

**Original**:

- Prompt: "You may access market data APIs"
- Skill (market-data-fetcher): "allowed_operations: query, update"
- Tool (stock-api): QD-T-3.1 Write operation marker (supports data writes)

**Remediation** (three-party coordination):

1. **Tool side**: Retain write operation marker (Hard Constraint)
2. **Skill side**: Change allowed_operations to "query"
3. **Prompt side**: Supplement "Permission: query only (SELECT); writes prohibited"

---

**Defect**: QD-PT-2.4 High-Risk Operation Without Security Boundary Declaration

**Original**:

- Prompt: No security boundary declared for risk-model-api
- Tool (risk-model-api): OR-L3 high-risk (involves risk assessment, decision recommendations)

**Remediation**:

- Prompt supplements security boundary declaration:

```
Security Boundaries:
- risk-model-api is used only for risk assessment; does not directly execute trades
- Risk assessment results require human confirmation before execution
- Automatic execution of trading decisions is prohibited
```

---

**Defect**: QD-ST-3.3 Required Parameter Without Source Declaration

**Original**:

- Skill (market-data-fetcher): No parameter source declaration
- Tool (stock-api): inputSchema.required = ["symbol", "date_range"]

**Remediation**:

- Skill supplements parameter source declaration:

```
INPUT:
  - symbol: Obtained from user input
  - date_range: Obtained from user input; default to last 30 days
```

##### F.2.4 Optimized Artifact Versions

**Post-Remediation Inspection Results**:

- All P0 defects remediated
- All P1 defects remediated
- Inspection passed

**Post-Remediation Artifact Versions**:

- Prompt: v1.2 (supplemented security boundaries, parameter declarations, error handling)
- Skill (market-data-fetcher): v1.1 (tightened permissions, supplemented parameter sources)
- Skill (report-generator): v1.1 (unified trigger conditions, output format)
- Skill (risk-analyzer): v1.1 (unified failure handling, error coverage)
- Tools: Original versions retained

---

## Part 10: Summary

<a id="101-specification-core-points"></a>
### 10.1 Specification Core Points

| Point | Description |
| --- | --- |
| **Inspection Objects** | Cross-Artifact Consistency across Prompt, Skill, and Tool |
| **Inspection Focus** | Hidden Defects Under Reasonable Expression — each artifact individually valid but semantic conflicts arise when combined |
| **Inspection Relationships** | Six inspection groups: QD-PS (authorization coverage), QD-PT (invocation contract), QD-ST (capability match), QD-SS (Skill-to-Skill conflicts), QD-TT (Tool-to-Tool data flow/semantic competition), QD-CYC (circular invocation, cross-cutting) |
| **Inspection Item Count** | 29 total (QD-PS: 7, QD-PT: 7, QD-ST: 7, QD-SS: 2, QD-TT: 3, QD-CYC: 3); applicable per AC-L as 7/20/29 |
| **Severity Levels** | P0/P1/P2 (as defined in Inspect Skill v1.1) |
| **Agent Levels** | AC-L1/AC-L2/AC-L3 (as defined in Inspect Prompt v1.1) |
| **Quantitative Scoring** | Total score of 100; deduction-based; P0:P1:P2 = 5:3:1; rounded to nearest integer |
| **Gate Condition** | Any P0 defect present → FAIL |
| **Remediation Principle** | Principle of least risk; Tool > Skill > Prompt |

<a id="102-relationship-to-other-sub-specifications"></a>
### 10.2 Relationship to Other Sub-Specifications

| Sub-Specification | Inspection Object | Relationship |
| --- | --- | --- |
| **Inspect Prompt** | Prompt artifact | Single-artifact inspection; prerequisite for Cross-Artifact Inspection |
| **Inspect Tool** | Tool artifact | Single-artifact inspection; prerequisite for Cross-Artifact Inspection |
| **Inspect Skill** | Skill artifact | Single-artifact inspection; prerequisite for Cross-Artifact Inspection |
| **Inspect Cross** | Cross-Artifact relationships | Executed after single-artifact inspections pass; independent scoring system |

<a id="103-practice-recommendations"></a>
### 10.3 Practice Recommendations

| Phase | Recommendation |
| --- | --- |
| **Development** | Execute single-artifact inspection first; remediate P0 defects before developing the next artifact |
| **Integration** | Execute Cross-Artifact Inspection; prioritize remediation of P0 defects and linked defects |
| **Release** | Execute full validation (Cross-Artifact Inspection + runtime simulation) |
| **Runtime** | Periodic re-inspection; monitor for degradation signals |
| **Remediation Decisions** | Tool Schema is the Hard Constraint; prioritize Tool-side remediation; Skill converges toward Tool |

---

© 2026 Sanity AI Labs. Licensed under Creative Commons Attribution-ShareAlike 4.0 International.
https://www.sanityops.org  ·  hello@sanityops.org
v1.1  ·  October 2026
