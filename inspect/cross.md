# SanityOps Framework

# Inspect Cross Specification

---

**Version**: v1.0

**Release Date**: September 2026

**Maintainer**: SanityOps Inspect Working Group

**License**: CC BY-SA 4.0

---

## Table of Contents

- [Foreword](#foreword)
  - [0.1 Positioning and Scope](#01-positioning-and-scope)
  - [0.2 Terminology and Numbering System](#02-terminology-and-numbering-system)
  - [0.3 Version Information](#03-version-information)
- [Part 1: Cross-Artifact Inspection Overview](#part-1-cross-artifact-inspection-overview)
  - [1.1 Why Cross-Artifact Inspection](#11-why-cross-artifact-inspection)
  - [1.2 Roles and Responsibilities of the Three Artifact Types](#12-roles-and-responsibilities-of-the-three-artifact-types)
  - [1.3 Introduction to the Three Inspection Relationships](#13-introduction-to-the-three-inspection-relationships)
  - [1.4 The Review Schema: Value and Positioning](#14-the-review-schema-value-and-positioning)
  - [1.5 Part Summary](#15-part-summary)
- [Part 2: QD-PS Inspection Items (Prompt → Skill)](#part-2-qd-ps-inspection-items-prompt--skill)
  - [2.1 Inspection Relationship Details](#21-inspection-relationship-details)
  - [2.2 Six Inspection Items in Detail](#22-six-inspection-items-in-detail)
  - [2.3 Localization and Remediation](#23-localization-and-remediation)
  - [2.4 Part Summary](#24-part-summary)
- [Part 3: QD-PT Inspection Items (Prompt → Tool)](#part-3-qd-pt-inspection-items-prompt--tool)
  - [3.1 Inspection Relationship Details](#31-inspection-relationship-details)
  - [3.2 Six Inspection Items in Detail](#32-six-inspection-items-in-detail)
  - [3.3 Localization and Remediation](#33-localization-and-remediation)
  - [3.4 Part Summary](#34-part-summary)
- [Part 4: QD-ST Inspection Items (Skill ↔ Tool)](#part-4-qd-st-inspection-items-skill--tool)
  - [4.1 Inspection Relationship Details](#41-inspection-relationship-details)
  - [4.2 Seven Inspection Items in Detail](#42-seven-inspection-items-in-detail)
  - [4.3 Localization and Remediation](#43-localization-and-remediation)
  - [4.4 Part Summary](#44-part-summary)
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
  - [6.5 Part Summary](#65-part-summary)
- [Part 7: Inspection Timing and the Ratchet Mechanism](#part-7-inspection-timing-and-the-ratchet-mechanism)
  - [7.1 Lifecycle Inspection Timing](#71-lifecycle-inspection-timing)
  - [7.2 Ratchet Mechanism and Version Binding](#72-ratchet-mechanism-and-version-binding)
  - [7.3 Part Summary](#73-part-summary)
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

**Core Inspection Dimensions**:

```
├─ QD-PS: Prompt → Skill (capability authorization and boundary delegation)
├─ QD-PT: Prompt → Tool (tool invocation contract)
└─ QD-ST: Skill ↔ Tool (capability implementation and parameter contract)
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
| **Linked Defect** | A defect involving two or more artifacts, requiring coordinated remediation |
| **L1/L2/L3** | Agent Level definitions (as defined in Inspect Prompt v1.0) |
| **P0/P1/P2** | Defect severity levels (as defined in Inspect Skill v1.0) |
| **RS-1/RS-2/RS-3** | Tool Risk Levels (referencing Inspect Tool v1.0) |
| **SS-1/SS-2/SS-3** | Skill Risk Levels (referencing Inspect Skill v1.0) |

<a id="022-numbering-system"></a>
#### 0.2.2 Numbering System

This specification uses the **QD-XY-n.m** numbering system:

```
QD-XY-n.m

├─ QD: Quality Defect
├─ XY: The two artifact types involved
│   ├─ PS: Prompt and Skill
│   ├─ PT: Prompt and Tool
│   └─ ST: Skill and Tool
├─ n: Relationship number
│   ├─ 1: Prompt → Skill relationship
│   ├─ 2: Prompt → Tool relationship
│   └─ 3: Skill ↔ Tool relationship
└─ m: Specific inspection item number
```

**Examples**:

- `QD-PS-1.1`: Prompt → Skill relationship, inspection item #1 (Skill Authorization Consistency)
- `QD-PT-2.4`: Prompt → Tool relationship, inspection item #4 (Permission Granularity Consistency)
- `QD-ST-3.6`: Skill ↔ Tool relationship, inspection item #6 (Permission Scope Match)

<a id="023-defect-level-definitions-p0p1p2"></a>
#### 0.2.3 Defect Level Definitions (P0/P1/P2)

| Symbol | Level | Meaning |
| --- | --- | --- |
| 🔴 | **P0** | Prevents Agent functionality or introduces security risk → **MUST be fixed** |
| 🟡 | **P1** | May cause behavioral instability or functional defects → **SHOULD be fixed** |
| 🟢 | **P2** | Affects readability or efficiency, but does not impact functionality → **MAY be fixed** |

**Note**: The defect severity levels in this specification follow the P0/P1/P2 definitions from Inspect Skill v1.0.

<a id="024-abbreviation-table"></a>
#### 0.2.4 Abbreviation Table

| Abbreviation | Full Name | Source Specification |
| --- | --- | --- |
| **QD-P** | Quality Defect - Prompt | Inspect Prompt v1.0 |
| **QD-T** | Quality Defect - Tool | Inspect Tool v1.0 |
| **QD-S** | Quality Defect - Skill | Inspect Skill v1.0 |
| **QD-PS** | Quality Defect - Prompt/Skill | This specification |
| **QD-PT** | Quality Defect - Prompt/Tool | This specification |
| **QD-ST** | Quality Defect - Skill/Tool | This specification |
| **L1/L2/L3** | Agent Level | Inspect Prompt v1.0 |
| **P0/P1/P2** | Defect Level | Inspect Skill v1.0 |
| **RS-1/RS-2/RS-3** | Tool Risk Level | Inspect Tool v1.0 |
| **SS-1/SS-2/SS-3** | Skill Risk Level | Inspect Skill v1.0 |

---

<a id="03-version-information"></a>
### 0.3 Version Information

<a id="031-current-version"></a>
#### 0.3.1 Current Version

- **Version**: v1.0
- **Release Status**: Initial release
- **Last Updated**: September 2026
- **Maintainer**: SanityOps Working Group

<a id="032-version-history"></a>
#### 0.3.2 Version History

| Version | Release Date | Major Changes |
| --- | --- | --- |
| v1.0 | 2026-09 | Initial release |

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
### 1.3 Introduction to the Three Inspection Relationships

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
| **Three inspection relationships** | QD-PS (authorization coverage), QD-PT (invocation contract), QD-ST (capability match) |
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
### 2.2 Six Inspection Items in Detail

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

| Situation | Severity | Description |
| --- | --- | --- |
| Skill cannot satisfy the Prompt's output requirements | P0 | Output format conflict |
| Output constraints inconsistent | P1 | Boundary definition unclear |

**Localization Mechanism**:

- Prompt side: QD-P-2.3.x Output definition
- Skill side: OUTPUT dimension

**Remediation Guidance**:

- If the Skill cannot satisfy output requirements: supplement the Skill's OUTPUT dimension declarations or adjust the Prompt's output requirements
- If output constraints are inconsistent: unify the output boundaries

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
| **Inspection item count** | 6 items (QD-PS-1.1 through 1.6) |
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
| **Permission granularity** | The Prompt's permission granularity requirements for tools | QD-P-2.5.3 Permission control boundary | Tool Risk Level (RS-1/2/3) |
| **Error handling** | The Prompt's handling of tool invocation failures | QD-P-2.6.2 Exception handling coverage | Tool's possible error types |
| **Invocation frequency** | The Prompt's invocation count/frequency limits for tools | QD-P-2.5.5 Resource invocation frequency limit | Tool's side effect documentation |

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
### 3.2 Six Inspection Items in Detail

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

**Note**: Static inspection only verifies "declaration existence." Runtime verification of "actual availability" occurs in the Validate phase.

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
| Invocation specification details inconsistent | P1 | May cause invocation efficiency or accuracy issues |

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
- The Tool's Risk Level (RS-1/RS-2/RS-3, from Inspect Tool)
- Whether high-risk Tools (RS-3) have security boundary declarations in the Prompt

**Severity Determination Rules**:

| Situation | Severity | Description |
| --- | --- | --- |
| High-risk Tool (RS-3) has no security boundary declaration in the Prompt | P0 | Security risk |
| Permission granularity is imprecise | P1 | Boundary definition unclear |

**Localization Mechanism**:

- Prompt side: QD-P-2.5.2 Security boundary constraint missing (if applicable)
- Tool side: QD-T-3.x High-risk operation identification

**Remediation Guidance**:

- If a high-risk Tool has no security boundary declaration: supplement security boundary constraints in the Prompt (QD-P-2.5.2)
- If permission granularity is imprecise: supplement permission control boundaries (QD-P-2.5.3)

#### QD-PT-2.5 Error Handling Completeness

**Defect Description**: Whether the Prompt's exception handling covers all possible error types from the Tool.

**Inspection Content**:

- The Prompt's exception handling strategy (QD-P-2.6.2)
- The Tool's possible error types (inferred from description and side effect documentation)
- Whether the Prompt handles all possible errors from the Tool

**Severity Determination Rules**:

| Situation | Severity | Description |
| --- | --- | --- |
| Critical errors not covered (e.g., possible permission errors from the Tool) | P0 | Runtime exceptions unhandled |
| Some errors not covered | P1 | Exception handling incomplete |

**Localization Mechanism**:

- Prompt side: QD-P-2.6.2 Exception handling coverage
- Tool side: Tool's possible error types (inferred from description)

**Remediation Guidance**:

- If critical errors are not covered: supplement exception handling strategy in the Prompt
- If some errors are not covered: supplement error handling declarations

#### QD-PT-2.6 Invocation Frequency Reasonableness

**Defect Description**: Whether the Prompt's invocation frequency limits are reasonable (in combination with the Tool's capabilities).

**Inspection Content**:

- The Prompt's invocation frequency limits (QD-P-2.5.5)
- The Tool's capability scope (whether it supports high-frequency invocation, batch operations)
- Whether the frequency limits are reasonable

**Severity Determination Rules**:

| Situation | Severity | Description |
| --- | --- | --- |
| Frequency limit missing, enabling potential resource abuse | P0 | Resource Runaway risk |
| Frequency limit unreasonable | P1 | May cause efficiency issues |

**Localization Mechanism**:

- Prompt side: QD-P-2.5.5 Resource invocation frequency limit missing (if applicable)
- Tool side: Tool's capability scope

**Remediation Guidance**:

- If frequency limit is missing: supplement invocation frequency limits in the Prompt
- If frequency limit is unreasonable: adjust the frequency limit (in combination with Tool capabilities)

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
| **Inspection item count** | 6 items (QD-PT-2.1 through 2.6) |
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

**Note**: Static inspection only verifies "declaration existence." Runtime verification of "actual availability" occurs in the Validate phase.

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

#### QD-ST-3.4 Invocation Frequency Match

**Defect Description**: Whether the Skill's max_tool_calls is reasonable (in combination with the Tool's capability scope).

**Inspection Content**:

- The Skill's EXECUTION dimension (max_tool_calls)
- The Tool's capability scope (whether it supports high-frequency invocation, batch operations)
- Whether the frequency limit is reasonable

**Severity Determination Rules**:

| Situation | Severity | Description |
| --- | --- | --- |
| Frequency declaration missing and Tool is a high-frequency operation tool | P0 | Resource Runaway risk |
| Frequency unreasonable | P1 | May cause efficiency issues |

**Localization Mechanism**:

- Skill side: EXECUTION dimension
- Tool side: Tool's capability scope

**Remediation Guidance**:

- If frequency declaration is missing: supplement max_tool_calls in the Skill
- If frequency is unreasonable: adjust the frequency limit

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

#### QD-ST-3.7 Error Handling Coverage

**Defect Description**: Whether the Skill's FAILURE dimension covers all possible error types from the Tool.

**Inspection Content**:

- The Skill's FAILURE dimension (on_empty_input, forbidden_behaviors)
- The Tool's possible error types (inferred from description)
- Whether the Skill handles all possible errors from the Tool

**Severity Determination Rules**:

| Situation | Severity | Description |
| --- | --- | --- |
| Critical errors not covered | P0 | Runtime exceptions unhandled |
| Some errors not covered | P1 | Exception handling incomplete |

**Localization Mechanism**:

- Skill side: FAILURE dimension
- Tool side: Tool's possible error types

**Remediation Guidance**:

- If critical errors are not covered: supplement FAILURE dimension declarations in the Skill
- If some errors are not covered: supplement error handling declarations

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

<a id="512-process-flow-and-decision-points"></a>
#### 5.1.2 Process Flow and Decision Points

| Step | Decision Point | Failure Handling |
| --- | --- | --- |
| **Step 1** | Have all three artifacts passed single-artifact inspection? | Output remediation guidance; halt cross-artifact inspection |
| **Step 2** | Successfully extracted Skill/Tool declarations? | Output advisory; continue inspection but flag missing declarations |
| **Step 3-5** | Cross-Artifact Defects discovered? | Record defects; continue inspection |
| **Step 6** | Linked defects present? | Upgrade severity; adjust remediation priority |
| **Step 7** | Unremediated P0 defects present? | Output blocking report; require re-inspection after remediation |

---

<a id="52-prerequisites-and-artifact-relationship-identification"></a>
### 5.2 Prerequisites and Artifact Relationship Identification

<a id="521-single-artifact-inspection-pass-criteria"></a>
#### 5.2.1 Single-Artifact Inspection Pass Criteria

**Pass Criteria**:

- All P0 defects have been remediated
- P1 defects have been remediated or their risk has been explicitly documented
- P2 defects are optionally handled

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

- Locate EXECUTION dimension → allowed_downstream_skills
- Extract Tool name list

---

<a id="53-automated-inspection-execution"></a>
### 5.3 Automated Inspection Execution

<a id="531-qd-ps-inspection-execution-prompt-skill"></a>
#### 5.3.1 QD-PS Inspection Execution (Prompt → Skill)

**Execution Method**: Automated (LLM Agent)

**Inspection Steps**:

1. Read the Skill declaration list from the Prompt
2. Read the Skill definitions (Review Schema six dimensions)
3. Inspect item-by-item against QD-PS-1.1 through 1.6
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
3. Inspect item-by-item against QD-PT-2.1 through 2.6
4. Record inconsistencies, mapped to specific locations in the Prompt and Tool

<a id="534-inspection-exception-handling"></a>
#### 5.3.4 Inspection Exception Handling

**Exception Types**:

| Exception | Handling |
| --- | --- |
| **Artifact parsing failure** | Output error log; prompt user to check artifact format |
| **Declaration extraction failure** | Flag missing declaration; continue inspection but output advisory |
| **Inspection item execution failure** | Record failed item; output advisory; continue with remaining items |

---

<a id="54-severity-levels-and-agent-level-binding"></a>
### 5.4 Severity Levels and Agent-Level Binding

<a id="541-three-severity-levels-p0p1p2"></a>
#### 5.4.1 Three Severity Levels (P0/P1/P2)

**Definitions** (as defined in Inspect Skill v1.0):

| Level | Symbol | Definition | Disposition Priority |
| --- | --- | --- | --- |
| **P0** | 🔴 | Prevents Agent functionality or introduces security risk | MUST be fixed |
| **P1** | 🟡 | May cause behavioral instability or functional defects | SHOULD be fixed |
| **P2** | 🟢 | Affects readability or efficiency, but does not impact functionality | MAY be fixed |

<a id="542-agent-level-definitions-l1l2l3"></a>
#### 5.4.2 Agent Level Definitions (L1/L2/L3)

**Definitions** (as defined in Inspect Prompt v1.0):

| Level | Name | Definition | Typical Characteristics |
| --- | --- | --- | --- |
| **L1** | Single-turn Task | Single invocation completes the task; no state retention | Single skill, no tool invocations, no multi-turn dialogue |
| **L2** | Multi-turn Interactive | Requires multi-turn dialogue or simple tool invocations | Multi-turn dialogue, 1-3 tools, simple workflow |
| **L3** | Complex Agent | Complex workflow, multi-tool collaboration, strong constraints | 4+ tools, complex workflow, security constraints |

<a id="543-level-determination-and-inspection-intensity-differences"></a>
#### 5.4.3 Level Determination and Inspection Intensity Differences

**Inspection Intensity Differences**:

| Agent Level | Inspection Item Count | Description |
| --- | --- | --- |
| **L1** | Basic inspection | Only core inspection items (Tool existence, permission boundaries) |
| **L2** | Standard inspection | Most inspection items |
| **L3** | Full inspection | All 19 items |

**Minimum Rule Sets** (see Appendix B for details):

- L1: 8 core inspection items
- L2: 12 standard inspection items
- L3: 19 full inspection items

<a id="544-severity-upgrade-rules"></a>
#### 5.4.4 Severity Upgrade Rules

The default severity of Cross-Artifact Defects may be upgraded based on Tool Risk Level (RS-3), Skill Risk Level (SS-3), Agent Level (L3), and linked defect relationships. For specific upgrade trigger conditions, per-item mapping tables, and the determination process, see **Appendix C: Severity Upgrade Rules in Detail**.

---

<a id="55-part-summary"></a>
### 5.5 Part Summary

| Point | Description |
| --- | --- |
| **Inspection process** | 7-step process: prerequisite verification → relationship identification → three inspection groups → impact assessment → report output |
| **Automated execution** | All inspection items are executable via automation (LLM Agent) |
| **Severity levels** | P0/P1/P2 (as defined in Inspect Skill v1.0) |
| **Agent levels** | L1/L2/L3 (as defined in Inspect Prompt v1.0) |
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

**Propagation Factors and Weights**:

| Propagation Factor | Weight | Assessment Rule |
| --- | --- | --- |
| **Involves irreversible operation** | High | If Tool is RS-3 high-risk → cross-defect directly upgraded to P0 |
| **Involves chained invocation** | Medium | If Skill allows multi-tool invocation → impact amplified; P1 upgraded to P0 (for L3) |
| **Involves sensitive data** | High | If Tool handles sensitive data → cross-defect directly upgraded to P0 |
| **Agent Level** | Medium | L3 Agent → P2 upgraded to P1; P1 upgraded to P0 |

<a id="622-linked-defect-identification"></a>
#### 6.2.2 Linked Defect Identification

**Linked Defect Definition**: A defect involving two or more artifacts, requiring coordinated remediation.

**Identification Method**:

- Multiple defects within the same inspection relationship → linked defects
- Related defects across different inspection relationships (e.g., QD-PS-1.3 + QD-ST-3.6) → linked defects

<a id="623-composite-risk-assessment"></a>
#### 6.2.3 Composite Risk Assessment

**Risk Assessment Matrix**:

| Risk Dimension | Low Risk | Medium Risk | High Risk |
| --- | --- | --- | --- |
| **Permission overflow** | P1 | P1→P0 | P0 |
| **Resource Runaway** | P1 | P1→P0 | P0 |
| **Functional blocking** | P0 | P0 | P0 |
| **Behavioral instability** | P1 | P1 | P1→P0 |

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

---

<a id="65-part-summary"></a>
### 6.5 Part Summary

| Point | Description |
| --- | --- |
| **Localization mechanism** | Three-tier: Relationship → Artifact → Field |
| **Impact assessment** | Propagation factor model; linked defect identification |
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

**Inspection Scope**: Cross-Artifact Inspection + runtime simulation (Validate phase)

**Execution Condition**: Cross-Artifact Inspection passed; no P0 defects

<a id="714-runtime-phase-periodic-re-inspection"></a>
#### 7.1.4 Runtime Phase: Periodic Re-Inspection

**Timing**: Periodic re-inspection during Agent runtime

**Inspection Scope**: Cross-Artifact Inspection (streamlined)

**Re-Inspection Frequency**:

| Agent Level | Re-Inspection Frequency | Description |
| --- | --- | --- |
| **L1** | Monthly | Single-turn task type; few changes |
| **L2** | Weekly | Multi-turn interactive type; moderate changes |
| **L3** | Daily | Complex Agent type; frequent changes |

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

## Part 8: Quantitative Scoring Mechanism

<a id="81-scoring-principles"></a>
### 8.1 Scoring Principles

<a id="811-core-principles"></a>
#### 8.1.1 Core Principles

| Principle | Description |
| --- | --- |
| **Total score of 100** | Deduction-based: baseline score (100) − defect deductions |
| **Weight ratio** | P0 : P1 : P2 = 5 : 3 : 1 |
| **Level differentiation** | Different Agent Levels (L1/L2/L3) have different inspection item counts; per-item weight adjusts automatically |
| **Mathematical self-consistency** | After all defect deductions, minimum score ≥ 0; maximum score = 100 |
| **Gate condition** | Any P0 defect present → evaluation result is FAIL (score is still output) |
| **Deduplication rule** | For the same inspection item number, the weight is deducted only once regardless of how many defect instances are found |

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

Determine L1/L2/L3 based on Agent characteristics (refer to Section 5.4.2 Agent Level Definitions).

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

- All intermediate calculation results retain full decimal precision
- Final score is **rounded to the nearest integer**
- Score is output as an integer in reports

---

<a id="83-inspection-item-distribution-table"></a>
### 8.3 Inspection Item Distribution Table

<a id="831-per-level-inspection-item-statistics"></a>
#### 8.3.1 Per-Level Inspection Item Statistics

Based on the inspection item definitions in Part 5 and the Minimum Rule Sets (Appendix B):

| Agent Level | Total Items | P0 Count | P1 Count | P2 Count | Total Weight $W_{total}$ | Base Score $base$ |
| --- | --- | --- | --- | --- | --- | --- |
| **L1** | 8 | 4 | 3 | 1 | $5\times4+3\times3+1\times1=30$ | $100/30=3.333...$ |
| **L2** | 12 | 6 | 5 | 1 | $5\times6+3\times5+1\times1=46$ | $100/46=2.174...$ |
| **L3** | 19 | 11 | 6 | 2 | $5\times11+3\times6+1\times2=75$ | $100/75=1.333...$ |

**Note**:

- L1 inspects only core inspection items (Minimum Rule Set)
- L2 inspects standard inspection items
- L3 inspects all inspection items

<a id="832-per-level-defect-deduction-values"></a>
#### 8.3.2 Per-Level Defect Deduction Values

**L1 Level**: $base = 3.333...$

| Defect Level | Deduction Calculation | Deduction Value |
| --- | --- | --- |
| P0 | $3.333...\times5$ | $16.667$ |
| P1 | $3.333...\times3$ | $10.000$ |
| P2 | $3.333...\times1$ | $3.333$ |

**L2 Level**: $base = 2.174...$

| Defect Level | Deduction Calculation | Deduction Value |
| --- | --- | --- |
| P0 | $2.174...\times5$ | $10.870$ |
| P1 | $2.174...\times3$ | $6.522$ |
| P2 | $2.174...\times1$ | $2.174$ |

**L3 Level**: $base = 1.333...$

| Defect Level | Deduction Calculation | Deduction Value |
| --- | --- | --- |
| P0 | $1.333...\times5$ | $6.667$ |
| P1 | $1.333...\times3$ | $4.000$ |
| P2 | $1.333...\times1$ | $1.333$ |

---

<a id="84-scoring-examples"></a>
### 8.4 Scoring Examples

<a id="841-example-1-l2-agent-no-p0-defects-pass"></a>
#### 8.4.1 Example 1: L2 Agent, No P0 Defects (PASS)

**Scenario**: L2 Agent (Multi-turn Interactive)

**Inspection Results**:

- Failed P0 items: 0
- Failed P1 items: 2
- Failed P2 items: 1

**Calculation**:

L2 Level:

- $W_{total} = 46$
- $base = 100/46 = 2.174...$
- P1 deduction = $2.174...\times3 = 6.522$
- P2 deduction = $2.174...\times1 = 2.174$

**Total Deduction**:
$$\text{Total Deduction} = 2 \times 6.522 + 1 \times 2.174 = 13.044 + 2.174 = 15.218$$

**Score (rounded)**:
$$Score = \text{round}(100 - 15.218) = \text{round}(84.782) = 85$$

**Gate Determination**: No P0 defects → result = PASS

**Scoring Report**:

```json
{
  "check_id": "cross-20260710-001",
  "framework": "SanityOps/Inspect Cross",
  "agent_level": "L2",
  "result": "PASS",
  "score": 85,
  "defects": [
    {"check_id": "QD-PS-1.2", "level": "P1", "found_count": 1},
    {"check_id": "QD-PT-2.6", "level": "P1", "found_count": 1},
    {"check_id": "QD-ST-3.4", "level": "P2", "found_count": 1}
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
#### 8.4.2 Example 2: L3 Agent, P0 Defects Present (FAIL)

**Scenario**: L3 Agent (Complex Agent)

**Inspection Results**:

- Failed P0 items: 2
- Failed P1 items: 1
- Failed P2 items: 0

**Calculation**:

L3 Level:

- $W_{total} = 75$
- $base = 100/75 = 1.333...$
- P0 deduction = $1.333...\times5 = 6.667$
- P1 deduction = $1.333...\times3 = 4.000$

**Total Deduction**:
$$\text{Total Deduction} = 2 \times 6.667 + 1 \times 4.000 = 13.334 + 4.000 = 17.334$$

**Score (rounded)**:
$$Score = \text{round}(100 - 17.334) = \text{round}(82.666) = 83$$

**Gate Determination**: P0 defects present → result = FAIL

**Scoring Report**:

```json
{
  "check_id": "cross-20260710-002",
  "framework": "SanityOps/Inspect Cross",
  "agent_level": "L3",
  "result": "FAIL",
  "score": 83,
  "defects": [
    {"check_id": "QD-PS-1.1", "level": "P0", "found_count": 1},
    {"check_id": "QD-ST-3.1", "level": "P0", "found_count": 1},
    {"check_id": "QD-PT-2.5", "level": "P1", "found_count": 1}
  ],
  "gate_condition": "P0 defects present; MUST remediate and re-inspect",
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
#### 8.4.3 Example 3: L1 Agent, All Passed (PASS)

**Scenario**: L1 Agent (Single-turn Task)

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
  "agent_level": "L1",
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
#### 8.5.2 Linked Defect Handling

**Linked Defect Definition**: A defect involving two or more artifacts, requiring coordinated remediation.

**Handling**:

1. Linked defects are **counted as independent inspection items** in scoring
2. Flagged as "linked defect" in the report
3. Remediation guidance prompts "coordinated remediation required"

**Example**:

QD-PS-1.3 (Permission Boundary Inconsistency) and QD-ST-3.6 (Permission Scope Mismatch) are linked defects:

- Scoring: deduct P0 deduction value for each (total of 2 deductions)
- Report: flagged as "linked defect"
- Remediation: prompt "requires simultaneous remediation of Prompt and Skill"

---

<a id="86-part-summary"></a>
### 8.6 Part Summary

| Point | Description |
| --- | --- |
| **Scoring principle** | Total score of 100; deduction-based; P0:P1:P2 = 5:3:1 |
| **Calculation steps** | Determine level → calculate weight → calculate base → calculate deductions → round |
| **Gate condition** | P0 defect present → FAIL (score still output) |
| **Deduplication rule** | Same inspection item number deducted only once |
| **Rounding** | Final score rounded to nearest integer |
| **Independence** | Cross-Artifact scoring is independent of single-artifact scoring; no weighted combination |

---

## Part 9: Appendices

### Appendix A: Complete Inspection Item List

#### A.1 QD-PS Inspection Items (Prompt → Skill)

| ID | Inspection Item Name | Severity (Default) | L1 | L2 | L3 | Description |
| --- | --- | --- | --- | --- | --- | --- |
| QD-PS-1.1 | Skill Authorization Consistency | P0 | ✓ | ✓ | ✓ | Skill defined but not authorized by Prompt |
| QD-PS-1.2 | Trigger Condition Consistency | P1 | — | ✓ | ✓ | Trigger conditions inconsistent or contradictory |
| QD-PS-1.3 | Permission Boundary Consistency | P0 | ✓ | ✓ | ✓ | Skill permissions exceed Prompt authorization |
| QD-PS-1.4 | Resource Access Consistency | P1 | — | ✓ | ✓ | Skill resources exceed Prompt authorization |
| QD-PS-1.5 | Failure Handling Consistency | P1 | — | — | ✓ | Failure handling strategy contradiction |
| QD-PS-1.6 | Output Constraint Consistency | P2 | — | — | ✓ | Output constraints inconsistent |

#### A.2 QD-PT Inspection Items (Prompt → Tool)

| ID | Inspection Item Name | Severity (Default) | L1 | L2 | L3 | Description |
| --- | --- | --- | --- | --- | --- | --- |
| QD-PT-2.1 | Tool Existence | P0 | ✓ | ✓ | ✓ | Tool declared in Prompt does not exist |
| QD-PT-2.2 | Invocation Specification Consistency | P0 | ✓ | ✓ | ✓ | Invocation method does not match Tool Schema |
| QD-PT-2.3 | Parameter Constraint Consistency | P1 | — | ✓ | ✓ | Parameter constraints inconsistent |
| QD-PT-2.4 | Permission Granularity Consistency | P0 | ✓ | ✓ | ✓ | High-risk Tool has no security boundary declaration |
| QD-PT-2.5 | Error Handling Completeness | P1 | — | — | ✓ | Does not cover all possible Tool errors |
| QD-PT-2.6 | Invocation Frequency Reasonableness | P2 | — | — | ✓ | Frequency limit missing or unreasonable |

#### A.3 QD-ST Inspection Items (Skill ↔ Tool)

| ID | Inspection Item Name | Severity (Default) | L1 | L2 | L3 | Description |
| --- | --- | --- | --- | --- | --- | --- |
| QD-ST-3.1 | Tool Existence | P0 | ✓ | ✓ | ✓ | Tool declared in Skill does not exist |
| QD-ST-3.2 | Input Constraint Consistency | P0 | — | ✓ | ✓ | Skill input constraint not supported by Tool |
| QD-ST-3.3 | Required Parameter Preparation | P0 | — | ✓ | ✓ | Tool required parameter has no source in Skill |
| QD-ST-3.4 | Invocation Frequency Match | P2 | — | — | ✓ | Frequency declaration missing or unreasonable |
| QD-ST-3.5 | Output Structure Match | P1 | — | — | ✓ | Skill output expectations do not match Tool return values |
| QD-ST-3.6 | Permission Scope Match | P0 | ✓ | ✓ | ✓ | Tool side effects exceed Skill permission declarations |
| QD-ST-3.7 | Error Handling Coverage | P1 | — | — | ✓ | Does not cover all possible Tool errors |

---

### Appendix B: Minimum Rule Sets

#### B.1 Minimum Rule Set Definition

**Minimum Rule Set**: The inspection items that must be passed for each Agent Level, forming the core basis for compliance determination.

**Core Principles**:

- L1 Minimum Rule Set ⊂ L2 Minimum Rule Set ⊂ L3 Minimum Rule Set
- Minimum Rule Sets contain only P0 inspection items
- Any P0 defect present → evaluation FAIL

#### B.2 L1 Minimum Rule Set (4 P0 Items)

| ID | Inspection Item Name | Relationship |
| --- | --- | --- |
| QD-PS-1.1 | Skill Authorization Consistency | QD-PS |
| QD-PS-1.3 | Permission Boundary Consistency | QD-PS |
| QD-PT-2.1 | Tool Existence | QD-PT |
| QD-PT-2.4 | Permission Granularity Consistency | QD-PT |

**L1 Compliance Determination**: MUST pass the above 4 P0 inspection items.

#### B.3 L2 Minimum Rule Set (6 P0 Items)

| ID | Inspection Item Name | Relationship |
| --- | --- | --- |
| QD-PS-1.1 | Skill Authorization Consistency | QD-PS |
| QD-PS-1.3 | Permission Boundary Consistency | QD-PS |
| QD-PT-2.1 | Tool Existence | QD-PT |
| QD-PT-2.2 | Invocation Specification Consistency | QD-PT |
| QD-PT-2.4 | Permission Granularity Consistency | QD-PT |
| QD-ST-3.1 | Tool Existence | QD-ST |

**L2 Compliance Determination**: MUST pass the above 6 P0 inspection items (includes L1's 4 items).

#### B.4 L3 Minimum Rule Set (11 P0 Items)

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

**L3 Compliance Determination**: MUST pass the above 11 P0 inspection items (includes L2's 6 items).

---

### Appendix C: Severity Upgrade Rules in Detail

#### C.1 Upgrade Trigger Conditions

| Trigger Condition | Upgrade Rule | Description |
| --- | --- | --- |
| **Tool is RS-3** | Associated inspection items P1→P0 | High-risk Tool defects directly upgraded to blocking level |
| **Skill is SS-3** | Associated inspection items P1→P0 | High-risk Skill defects directly upgraded to blocking level |
| **Agent is L3** | Global P2→P1, P1→P0 | Complex Agent defect severity levels comprehensively upgraded |
| **Linked defect** | Associated inspection items may upgrade | Defects involving multiple artifacts may upgrade |
| **Cross-Skill/Tool** | Associated inspection items P1→P0 | Defects involving multiple Skill or Tool invocations upgraded |

#### C.2 Upgrade Mapping Table

| Inspection Item | Default Level | RS-3/SS-3 | L3 Agent | Linked Defect |
| --- | --- | --- | --- | --- |
| QD-PS-1.2 | P1 | P0 | P0 | P0 |
| QD-PS-1.4 | P1 | P0 | P0 | P1 |
| QD-PS-1.5 | P1 | P1 | P0 | P1 |
| QD-PT-2.3 | P1 | P0 | P0 | P1 |
| QD-PT-2.5 | P1 | P1 | P0 | P1 |
| QD-ST-3.5 | P1 | P0 | P0 | P1 |
| QD-ST-3.7 | P1 | P0 | P0 | P1 |

#### C.3 Upgrade Determination Process

```
Step 1: Determine Agent Level (L1/L2/L3)
  ↓
Step 2: Identify Tool Risk Level (RS-1/RS-2/RS-3)
  ↓
Step 3: Identify Skill Risk Level (SS-1/SS-2/SS-3)
  ↓
Step 4: Determine whether linked defects exist
  ↓
Step 5: Apply upgrade rules
  ↓
Step 6: Output final severity level
```

---

### Appendix D: Remediation Ownership Summary

#### D.1 Remediation Priority Master Table

| Inspection Item | Defect Type | Remediation Priority (Tool > Skill > Prompt) |
| --- | --- | --- |
| QD-PS-1.1 | Skill Authorization Missing | Prompt side supplements authorization or removes Skill definition |
| QD-PS-1.2 | Trigger Condition Conflict | Prompt side first (Prompt is the workflow orchestrator) |
| QD-PS-1.3 | Permission Overflow | Skill side first (Skill should converge toward narrower permission) |
| QD-PS-1.4 | Resource Access Overflow | Skill side first |
| QD-PS-1.5 | Failure Handling Contradiction | Both sides, coordinated (adopt more conservative strategy) |
| QD-PS-1.6 | Output Constraint Inconsistency | Skill side first |
| QD-PT-2.1 | Tool Does Not Exist | Tool side supplements or Prompt side removes declaration |
| QD-PT-2.2 | Invocation Specification Mismatch | Tool side first (Tool Schema is the Hard Constraint) |
| QD-PT-2.3 | Parameter Constraint Inconsistency | Tool side first |
| QD-PT-2.4 | High-Risk Boundary Missing | Prompt side first (supplement security boundary declarations) |
| QD-PT-2.5 | Incomplete Error Handling | Prompt side first |
| QD-PT-2.6 | Frequency Limit Unreasonable | Prompt side first |
| QD-ST-3.1 | Tool Does Not Exist | Tool side supplements or Skill side removes declaration |
| QD-ST-3.2 | Input Constraint Not Supported | Tool side first |
| QD-ST-3.3 | Required Parameter No Source | Skill side first (supplement parameter source declaration) |
| QD-ST-3.4 | Invocation Frequency Mismatch | Skill side first |
| QD-ST-3.5 | Output Structure Mismatch | Both sides, coordinated |
| QD-ST-3.6 | Permission Scope Not Covered | Tool side first (tighten Tool side effects) |
| QD-ST-3.7 | Incomplete Error Handling | Skill side first |

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
  "version": "v1.1",
  "check_timestamp": "2026-07-10Txx:xx:xxZ",

  "agent_info": {
    "name": "Agent Name",
    "level": "L1/L2/L3",
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
  "score": 85,
  "gate_condition": "No P0 defects / P0 defects MUST be remediated",

  "defect_summary": {
    "p0_count": 0,
    "p1_count": 2,
    "p2_count": 1
  },

  "defects": [
    {
      "check_id": "QD-PS-1.2",
      "check_name": "Trigger Condition Consistency",
      "level": "P1",
      "found_count": 1,
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
| check_timestamp | Inspection timestamp |
| agent_info | Basic Agent information |
| artifact_versions | Artifact version information |
| prerequisite_check | Prerequisite check results |
| result | Inspection result (PASS/FAIL) |
| score | Score (0–100, rounded to nearest integer) |
| gate_condition | Gate condition description |
| defect_summary | Defect statistics |
| defects | Defect list |
| linkage_defects | Linked defect list |
| check_history | Inspection history |

---

### Appendix F: Usage Examples

#### F.1 L1 Agent Cross-Artifact Inspection Example

##### F.1.1 Example Agent Description

**Agent Name**: daily-weather-query

**Agent Level**: L1 (Single-turn Task)

**Artifact Composition**:

- **Prompt**: Weather query assistant; single invocation returns weather information
- **Skill**: weather-fetcher, fetches weather data
- **Tool**: weather-api, third-party weather API

**Agent Characteristics**:

- Single skill (weather query)
- No multi-turn dialogue
- 1 tool invocation
- No sensitive data handling

##### F.1.2 Inspection Execution and Defect Discovery

**Inspection Scope**: L1 Minimum Rule Set (8 core inspection items)

**Inspection Results**:

| Inspection Item | Result | Defect Description |
| --- | --- | --- |
| QD-PS-1.1 Skill Authorization Consistency | ✅ PASS | — |
| QD-PS-1.3 Permission Boundary Consistency | ✅ PASS | — |
| QD-PT-2.1 Tool Existence | ✅ PASS | — |
| QD-PT-2.4 Permission Granularity Consistency | ✅ PASS | — |
| QD-ST-3.1 Tool Existence | ✅ PASS | — |
| QD-ST-3.2 Input Constraint Consistency | ✅ PASS | — |
| QD-ST-3.6 Permission Scope Match | ✅ PASS | — |
| QD-ST-3.7 Error Handling Coverage | ⚠️ P1 | Skill's FAILURE dimension does not cover API rate-limit error |

**Defect Details**:

**QD-ST-3.7 Error Handling Coverage (P1)**

- **Localization**:
  - Skill side: FAILURE dimension → on_failure field
  - Tool side: weather-api description (may return 429 rate-limit error)
- **Original Evidence**:
  - Skill: "on_failure: report query failure to user"
  - Tool: "Possible errors: 429 Too Many Requests (API rate limit)"
- **Inconsistency**: Skill does not handle API rate-limit error

##### F.1.3 Remediation Guidance

**Defect**: QD-ST-3.7 Error Handling Coverage (P1)

**Remediation**:

- Modify Skill's FAILURE dimension:

```
on_failure:
  - "Report query failure to user"
  - "If error is API rate limit (429), wait 30 seconds and retry once"
```

##### F.1.4 Optimized Artifact Versions

**Post-Remediation Inspection Results**:

- All inspection items passed
- No P0 defects
- P1 defect remediated

---

#### F.2 L3 Agent Cross-Artifact Inspection Example

##### F.2.1 Example Agent Description

**Agent Name**: financial-analysis-agent

**Agent Level**: L3 (Complex Agent)

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

**Inspection Scope**: L3 full inspection (19 items)

**Inspection Results**:

| Inspection Item | Result | Defect Description |
| --- | --- | --- |
| QD-PS-1.1 | ✅ PASS | — |
| QD-PS-1.2 | ⚠️ P1 | report-generator trigger conditions inconsistent with Prompt workflow |
| QD-PS-1.3 | 🔴 P0 | market-data-fetcher permissions exceed Prompt authorization |
| QD-PS-1.4 | ✅ PASS | — |
| QD-PS-1.5 | ⚠️ P1 | risk-analyzer failure handling contradicts Prompt strategy |
| QD-PS-1.6 | ✅ PASS | — |
| QD-PT-2.1 | ✅ PASS | — |
| QD-PT-2.2 | ✅ PASS | — |
| QD-PT-2.3 | ⚠️ P1 | stock-api parameter constraints inconsistent with Prompt |
| QD-PT-2.4 | 🔴 P0 | risk-model-api high-risk operation has no security boundary declaration in Prompt |
| QD-PT-2.5 | ⚠️ P1 | Prompt does not handle possible 403 error from news-api |
| QD-PT-2.6 | ✅ PASS | — |
| QD-ST-3.1 | ✅ PASS | — |
| QD-ST-3.2 | ✅ PASS | — |
| QD-ST-3.3 | 🔴 P0 | stock-api required parameter has no source declaration in market-data-fetcher |
| QD-ST-3.4 | ✅ PASS | — |
| QD-ST-3.5 | ⚠️ P1 | report-generator output format does not match report-template-engine |
| QD-ST-3.6 | 🔴 P0 | market-data-fetcher permissions do not cover stock-api write operations |
| QD-ST-3.7 | ⚠️ P1 | risk-analyzer does not handle possible errors from risk-model-api |

**Linked Defect Identification**:

| Linkage ID | Defects Involved | Linkage Relationship |
| --- | --- | --- |
| **Linkage #1** | QD-PS-1.3 + QD-ST-3.6 | Permission boundary inconsistency involves Prompt, Skill, and Tool |
| **Linkage #2** | QD-PT-2.3 + QD-ST-3.3 | Parameter issues involve Prompt and Skill |
| **Linkage #3** | QD-PS-1.5 + QD-ST-3.7 | Failure handling issues involve Prompt and Skill |

**Severity Upgrades**:

- QD-PS-1.3 + QD-ST-3.6: Involves sensitive data operations → remains P0
- QD-PT-2.4: risk-model-api is RS-3 high-risk → remains P0
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
| **P1-3** | QD-PT-2.3 + QD-ST-3.3 (Linkage #2) | Unify parameter constraints |
| **P1-4** | QD-PT-2.5 | Prompt supplements 403 error handling |
| **P1-5** | QD-ST-3.5 | Unify output format |

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
- Tool (risk-model-api): RS-3 high-risk (involves risk assessment, decision recommendations)

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
| **Three Inspection Relationships** | QD-PS (authorization coverage), QD-PT (invocation contract), QD-ST (capability match) |
| **Inspection Item Count** | 19 total (QD-PS: 6, QD-PT: 6, QD-ST: 7) |
| **Severity Levels** | P0/P1/P2 (as defined in Inspect Skill v1.0) |
| **Agent Levels** | L1/L2/L3 (as defined in Inspect Prompt v1.0) |
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
v1.0  ·  July 2026
