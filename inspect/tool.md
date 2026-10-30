---
title: Inspect Tool
description: "Inspect Tool specification: defect rules for reviewing Tool Schemas and their parameter constraints."
---

# SanityOps Framework

# Inspect Tool Specification

---

**Version**: v1.0

**Release Date**: October 2026

**Maintained by**: Sanity AI Labs

**License**: CC BY-SA 4.0

**Dependent Specification**: Core v1.0 (objects, Finding, `OR-L`, versioning and evidence)

---

## Table of Contents

- [Foreword](#foreword)
  - [0.1 Positioning and Scope](#01-positioning-and-scope)
  - [0.2 Terminology and Numbering System](#02-terminology-and-numbering-system)
  - [0.3 Version and Maintenance Information](#03-version-and-maintenance-information)
- [Part 1: Structural Validity Defects](#part-1-structural-validity-defects)
  - [1.1 Positioning of This Part](#11-positioning-of-this-part)
  - [1.2 Defect Classification](#12-defect-classification)
  - [1.3 Severity Classification](#13-severity-classification)
  - [1.4 Detection Methods](#14-detection-methods)
  - [1.5 Part Summary](#15-part-summary)
- [Part 2: Parameter Constraints, High-Risk Operations, and Semantic Clarity Defects](#part-2-parameter-constraints-high-risk-operations-and-semantic-clarity-defects)
  - [2.1 Positioning of This Part](#21-positioning-of-this-part)
  - [2.2 Defect Classification](#22-defect-classification)
  - [2.3 Severity Classification](#23-severity-classification)
  - [2.4 Detection Method: Checklist Mechanism](#24-detection-method-checklist-mechanism)
  - [2.5 Part Summary](#25-part-summary)
- [Part 3: Tiered Inspection Mechanism](#part-3-tiered-inspection-mechanism)
  - [3.1 Tool Operational Risk Level Definitions (`OR-L`)](#31-tool-risk-level-definitions)
  - [3.2 Defect Level Definitions (P0/P1/P2)](#32-defect-level-definitions-p0p1p2)
  - [3.3 Tiered Inspection Checklist](#33-tiered-inspection-checklist)
  - [3.4 Standard Inspection Process](#34-standard-inspection-process)
  - [3.5 Usage Examples](#35-usage-examples)
  - [3.6 Part Summary](#36-part-summary)
- [Part 4: Schema Change and Compatibility Inspection](#part-4-schema-change-and-compatibility-inspection)
  - [4.1 Positioning of This Part](#41-positioning-of-this-part)
  - [4.2 Compatibility Inspection](#42-compatibility-inspection)
  - [4.3 Change Risk Assessment](#43-change-risk-assessment)
  - [4.4 Part Summary](#44-part-summary)
- [Part 5: Quantitative Scoring Mechanism](#part-5-quantitative-scoring-mechanism)
  - [5.1 Scoring Principles](#51-scoring-principles)
  - [5.2 Calculation Steps](#52-calculation-steps)
  - [5.3 Defect Deduction Value Table](#53-defect-deduction-value-table)
  - [5.4 Scoring Examples](#54-scoring-examples)
  - [5.5 Multi-Defect Handling Rules](#55-multi-defect-handling-rules)
- [Appendix A: Minimum Rule Sets](#appendix-a-minimum-rule-sets)
  - [A.1 L1 Minimum Rule Set (20 Items)](#a1-l1-minimum-rule-set-20-items)
  - [A.2 L2 Minimum Rule Set (25 Items)](#a2-l2-minimum-rule-set-25-items)
  - [A.3 L3 Minimum Rule Set (25 Items)](#a3-l3-minimum-rule-set-25-items)
- [Appendix B: QD-T Complete Numbering Index](#appendix-b-qd-t-complete-numbering-index)
- [Appendix C: Tool Overview](#appendix-c-tool-overview)
  - [C.1 Tool Formats](#c1-tool-formats)
  - [C.2 Quick Start](#c2-quick-start)
- [Appendix D: Exemptions and Risk Acceptance](#appendix-d-exemptions-and-risk-acceptance)
  - [D.1 Exemption Application Conditions](#d1-exemption-application-conditions)
  - [D.2 Risk Acceptance Statement](#d2-risk-acceptance-statement)
- [Appendix E: Pending Cross-Spec Alignment](#appendix-e-pending-cross-spec-alignment)

---

## Foreword

> **Document design principle: serving both inspection and audit needs.**
>
> To reduce the risk of missed findings and to preserve traceable audit evidence, this document **allows the same object to be hit by multiple inspection items across different dimensions** — this may look like "similarity / duplication / subsumption" on the surface, but it is intentional by design, not redundancy.
>
> At the quantitative scoring stage, however, to avoid double deductions and to reflect the true quality of the inspected Logic Artifact objectively, same-source deduplication and merging must follow the "Multi-Defect Handling Rules" (§5.5) of this document: one root cause and one harm path are deducted only once.
>
> If you question whether certain inspection items are "overly redundant", verify consistency with counter-examples and edge cases — confirm whether the trigger conditions truly overlap and whether the attribution reaches consistent boundary conclusions — rather than concluding from surface similarity alone.

<a id="01-positioning-and-scope"></a>
### 0.1 Positioning and Scope

<a id="011-what-this-specification-is"></a>
#### 0.1.1 What This Specification Is

This specification is one of the core sub-specifications of the SanityOps Framework. It defines the quality defect inspection standards for **Tool Schemas** in AI Agent systems.

This specification is designed to:

- Identify defects in Tool Schemas across dimensions including structural validity, parameter constraints, and semantic clarity
- Provide a unified inspection framework for Tool Schema design, review, and audit
- Provide explicit rule definitions for automated inspection tooling

<a id="012-what-this-specification-is-not"></a>
#### 0.1.2 What This Specification Is Not

This specification is **not**:

- A Tool development guide: it does not replace a Tool design guide
- A runtime security specification: it does not cover security validation during Tool execution
- A performance optimization specification: it does not address Tool execution efficiency
- An API design specification: it does not replace RESTful or GraphQL API design best practices

<a id="013-inspection-scope"></a>
#### 0.1.3 Inspection Scope

This specification's inspection scope includes:

**Inspection Objects**:

- Tool Schema definitions (including name, description, inputSchema)
- Tool parameter definitions (including type, constraints, description)
- Tool semantic definitions (including trigger conditions, side effects, relationships with other Tools)

**Core Inspection Dimensions**:

```
├─ Structural Validity (QD-T-1.x)
│   └─ Base field completeness, Schema legality
│
├─ Parameter Constraints (QD-T-2.x)
│   └─ Boundary constraints for String, Number, Array, Object
│
├─ High-Risk Operations (QD-T-3.x)
│   └─ Write operations, sensitive data, cross-Tool data flow
│
├─ Semantic Clarity (QD-T-4.x)
│   └─ Description quality, semantic competition
│
└─ Schema Changes (QD-T-5.x)
    └─ Compatibility, breaking change determination
```

<a id="014-out-of-scope"></a>
#### 0.1.4 Out of Scope

This specification does **not** cover:

- Runtime parameter value validation for Tools
- Tool execution process monitoring and logging
- Tool performance and response time
- Tool permission control implementation (only inspects Schema-level risk)

<a id="015-position-within-the-sanityops-framework"></a>
#### 0.1.5 Position Within the SanityOps Framework

```
SanityOps Framework
│
├─ Inspect (Defect Inspection)
│   ├─ Inspect Tool ← Tool Schema defect inspection ← You are here
│   ├─ Inspect Prompt ← System Prompt defect inspection
│   ├─ Inspect Skill ← Skill defect inspection
│   ├─ Inspect Cross ← Cross-Artifact defect inspection
│   └─ Inspect Permission ← Permission-responsibility proportionality inspection (QD-PM)
│
├─ Risk (Risk Scanning)
│   ├─ Risk Explicit ← Explicit Logic Artifact risk detection
│   └─ Risk Implicit ← Implicit Agent runtime vulnerability scanning
│
├─ Quality (Service Quality)
│   ├─ Quality RAG-Agent ← RAG-Agent service quality assessment
│   └─ Quality Tool-Agent ← Tool-Agent service quality assessment
│
└─ Relevance (Impact Mapping)
    └─ Relevance ← defect → risk/quality diagnostic mapping
```

<a id="016-json-schema-dialect-and-target-protocol"></a>
#### 0.1.6 JSON Schema Dialect and Target Protocol

Rule determinations in this specification use the declared **JSON Schema dialect** (Draft 2020-12 by default) and the target platform's Schema subset as inspector input parameters. Rules such as QD-T-1.3 (enum legality), QD-T-1.4 (additionalProperties policy), and QD-T-2.2 (format contract) are all determined on this basis.

Different protocols name the Tool input parameter Schema field differently. This specification uniformly refers to the **input parameter Schema**, and the inspector adapts according to the table below:

| Protocol/Platform | Input Parameter Schema Field | Note |
| -------- | ------------------ | ---- |
| MCP      | `inputSchema`      |      |
| OpenAI   | `parameters`       | Strict Mode mandates `additionalProperties: false` |
| Anthropic | `input_schema`     |      |

For a Tool without parameters, the valid input parameter Schema form is `{"type": "object", "properties": {}}` (optionally with `additionalProperties: false`); in this case, Part 2 of this specification (QD-T-2.x parameter constraints) is recorded as "not applicable".

<a id="02-terminology-and-numbering-system"></a>
### 0.2 Terminology and Numbering System

<a id="021-core-terminology"></a>
#### 0.2.1 Core Terminology

| Term | Definition |
| --- | --- |
| **Tool** | An external functional unit invocable by an AI Agent, consisting of a name, description, and input parameter Schema |
| **Tool Schema** | The structured definition of a Tool, including its name, description, and input parameter JSON Schema |
| **inputSchema** | The JSON Schema definition of the Tool's input parameters |
| **Defect** | A design issue in the Tool Schema that may cause LLM misuse, security risk, or quality problems |
| **Operational Risk Level (`OR-L`)** | The tier assigned to a Tool based on operational risk (OR-L1/OR-L2/OR-L3); not the Agent Complexity Level (`AC-L`) |
| **Defect Level** | The severity of a defect's impact on the system (P0/P1/P2) |

<a id="022-numbering-system"></a>
#### 0.2.2 Numbering System

This specification uses the **QD-T-x.y** numbering system:

```
QD-T-x.y

├─ QD: Quality Defect
├─ T: Tool Schema
├─ x: Defect category number
│   ├─ 1: Structural Validity Defects
│   ├─ 2: Parameter Constraint Defects
│   ├─ 3: High-Risk Operation Defects
│   ├─ 4: Semantic Clarity Defects
│   └─ 5: Schema Change Defects
└─ y: Specific defect item number
```

**Examples**:

- `QD-T-1.1`: Structural Validity Defects → Base Field Missing
- `QD-T-2.1`: Parameter Constraint Defects → String Without maxLength
- `QD-T-3.4`: High-Risk Operation Defects → Authorization Context Parameter Exposure

<a id="023-risk-level-symbols"></a>
#### 0.2.3 Risk Grading Note

The risk grading in this specification (OR-L1/OR-L2/OR-L3) is the **Operational Risk Level (`OR-L`)**, see §3.1; defect level symbols (`P0/P1/P2`) are defined in §3.2. No separate risk color scale is used.

<a id="024-abbreviation-table"></a>
#### 0.2.4 Abbreviation Table

| Abbreviation | Full Name | Meaning |
| --- | --- | --- |
| QD-T | Quality Defect - Tool | Tool Schema Quality Defect |
| Schema | JSON Schema | JSON data structure definition specification |

<a id="025-defect-level-definitions-p0p1p2"></a>
#### 0.2.5 Defect Level Definitions (P0/P1/P2)

| Defect Level | Symbol | Definition | Disposition Meaning |
| --- | --- | --- | --- |
| **P0** | ⛔ | Blocking | Blocks release; MUST be fixed |
| **P1** | ⚠️ | Warning | SHOULD be fixed before release |
| **P2** | ℹ️ | Advisory | SHOULD be included in the improvement plan or risk register |

<a id="03-version-and-maintenance-information"></a>
### 0.3 Version and Maintenance Information

<a id="031-current-version"></a>
#### 0.3.1 Current Version

- **Version**: v1.0
- **Release Status**: In revision (includes Pending Cross-Spec Alignment items E-1 to E-21 in Appendix E)
- **Release Basis Note**: This version contains the pending cross-spec alignment items listed in Appendix E (E-1 to E-21). Scoring results for inspection items marked PENDING are provisional and subject to review after alignment.
- **Last Updated**: October 2026
- **Maintained by**: Sanity AI Labs

<a id="032-version-history"></a>
#### 0.3.2 Version History

| Version | Release Date | Major Changes |
| ---- | ------- | -------------------------- |
| v1.0 | 2026-10 | Initial release |

<a id="033-applicability-statement"></a>
#### 0.3.3 Applicability Statement

This specification v1.0 applies to the Tool Schema quality inspection phase of the SanityOps Framework. When using this specification for Tool quality inspection, all requirements of the corresponding version SHALL be followed.

---

## Part 1: Structural Validity Defects

<a id="11-positioning-of-this-part"></a>
### 1.1 Positioning of This Part

<a id="111-inspection-objective"></a>
#### 1.1.1 Inspection Objective

This part inspects the **basic structural validity** of Tool Schemas, ensuring that Tool definitions can be correctly parsed and understood.

<a id="112-inspection-dimensions"></a>
#### 1.1.2 Inspection Dimensions

```
Structural Validity Inspection
├─ Base Field Completeness
│   └─ Whether required name, description, inputSchema are present
│
├─ Name Validity and Uniqueness
│   └─ Naming format, uniqueness within the manifest
│
├─ Required Field Correctness
│   └─ Whether the required list references fields defined in properties
│
├─ Enum Constraint Validity
│   └─ Whether enum values conflict with type or are duplicated
│
├─ additionalProperties Policy
│   └─ Whether the policy is appropriate (checked layer by layer; nested objects drop one level)
│
├─ Constraint Self-Consistency and default Validity
│   └─ min/max boundaries; whether default violates constraints
│
└─ type Declaration and Schema Complexity
    └─ Whether type is missing, overly broad, or nesting/parameter scale is excessive
```

<a id="113-relationship-to-other-parts"></a>
#### 1.1.3 Relationship to Other Parts

```
Part 1: Structural Validity ← Foundation Layer
    ↓ Ensures the Tool can be correctly parsed
Part 2: Parameter Constraints, High-Risk Operations, and Semantic Clarity ← Completeness Layer
    ↓ Ensures parameters are adequately constrained
Part 3: Tiered Inspection Mechanism ← Inspection Layer
    ↓ Determines inspection intensity based on risk level
Part 4: Schema Changes ← Change Layer
    ↓ Inspects whether changes introduce risk
Part 5: Quantitative Scoring Mechanism ← Evaluation Layer
    ↓ Converts defects into comparable scores
```

<a id="12-defect-classification"></a>
### 1.2 Defect Classification

<a id="121-base-field-missing-qd-t-11"></a>
#### 1.2.1 Base Field Missing (QD-T-1.1)

**Definition**: The Tool Schema is missing required base fields.

**Defect Description**:

```
Required fields:
├─ name: Tool name
├─ description: Tool description
└─ inputSchema: Input parameter Schema

Optional fields:
├─ outputSchema: Output parameter Schema
└─ metadata: Metadata
```

**Defect Example**:

❌ Incorrect:

```json
{
  "name": "get_weather",
  "inputSchema": {
    "type": "object",
    "properties": {
      "city": {"type": "string"}
    }
  }
}
```

The description field is missing.

✅ Correct:

```json
{
  "name": "get_weather",
  "description": "Get weather information for a specified city",
  "inputSchema": {
    "type": "object",
    "properties": {
      "city": {
        "type": "string",
        "description": "City name, e.g., Beijing, Shanghai"
      }
    },
    "required": ["city"]
  }
}
```

**Impact**:

- The LLM cannot understand the Tool's purpose
- May lead to incorrect Tool selection

**Defect Level**: P0

<a id="122-required-field-inconsistency-qd-t-12"></a>
#### 1.2.2 required References an Undefined Field (QD-T-1.2)

**Definition**: The required list references a field that is not defined in properties. Such a field reference is not illegal in general JSON Schema, but it is an explicit defect for an LLM Tool Schema.

**Supplementary Check (manual)**: Field necessity is inconsistent with the business contract—a required field is not listed in required, or a non-required field is incorrectly marked as required. This sub-item requires business semantics and cannot be determined statically from the Schema alone.

**Defect Example**:

❌ Incorrect (required references an undefined field):

```json
{
  "inputSchema": {
    "type": "object",
    "properties": {
      "city": {"type": "string"}
    },
    "required": ["city", "date"]
  }
}
```

required references "date," but "date" is not defined in properties.

✅ Correct:

```json
{
  "inputSchema": {
    "type": "object",
    "properties": {
      "city": {"type": "string"},
      "date": {"type": "string"}
    },
    "required": ["city"]
  }
}
```

**Impact**:

- A reference to an undefined field makes the required constraint impossible to validate correctly
- May mislead the LLM into generating invalid invocations

**Defect Level**: P0 (undefined field reference, automated); P1 (business necessity inconsistency, manual)

<a id="123-invalid-enum-constraints-qd-t-13"></a>
#### 1.2.3 enum–type Conflict / Duplicate Values (QD-T-1.3)

**Definition**: The enum field has defects, in two classes:

1. **Duplicate values**: duplicate elements in enum (functionally harmless but redundant) — P2.
2. **enum value conflicts with type**: an enum value does not conform to the declared type (unreachable value) — P1.

**Caliber Notes**:

- A mixed-type enum or an enum containing null is legal in general JSON Schema and MUST NOT be judged illegal wholesale; whether it is allowed depends on the declared JSON Schema dialect (see §0.1.6).
- "Empty value" means the empty string `""`; `null` is treated as an optional legal value only when explicitly included in the enum, and is not a defect.

**Defect Example**:

❌ Incorrect (duplicate values):

```json
{
  "type": "string",
  "enum": ["active", "inactive", "active"]
}
```

Duplicate values exist in the enum.

❌ Incorrect (type conflict):

```json
{
  "type": "integer",
  "enum": [1, 2, "3"]
}
```

The enum value `"3"` conflicts with type `integer` and is unreachable.

✅ Correct:

```json
{
  "type": "string",
  "enum": ["active", "inactive", "pending"]
}
```

**Impact**:

- Duplicate values cause redundancy and may mislead the LLM
- Enum values with type conflicts are unreachable, and parameter validation may fail

**Defect Level**: P1 (type conflict) / P2 (duplicate values)

<a id="124-uncontrolled-additionalproperties-qd-t-14"></a>
#### 1.2.4 Inappropriate additionalProperties Policy (QD-T-1.4)

**Definition**: The additionalProperties policy for an Object-type parameter is inappropriate—this is not "a defect whenever not explicitly declared." The policy is checked for reasonableness: closed-contract fields SHOULD declare `additionalProperties: false`; open dictionaries such as tags/metadata MAY omit it (default true, i.e., open).

**Caliber Note**: Nested objects are checked layer by layer; the defect level for nested objects is one level lower than for the root object.

**Defect Example**:

❌ Incorrect (closed-contract field does not disable additional properties):

```json
{
  "type": "object",
  "properties": {
    "name": {"type": "string"}
  }
}
```

A closed-contract field does not declare additionalProperties; arbitrary extra fields are permitted by default.

✅ Correct (closed contract):

```json
{
  "type": "object",
  "properties": {
    "name": {"type": "string"}
  },
  "additionalProperties": false
}
```

✅ Correct (open dictionary scenario permitted):

```json
{
  "type": "object",
  "properties": {
    "tags": {
      "type": "object",
      "additionalProperties": {"type": "string"}
    }
  }
}
```

**Impact**:

- An inappropriate policy may let the LLM pass unexpected fields
- Incorrectly prohibiting open-dictionary scenarios restricts legitimate input

**Defect Level**: L1 P2 / L2 P1 / L3 P1 (nested objects one level lower)

<a id="125-name-validity-uniqueness-qd-t-15"></a>
#### 1.2.5 Name Validity and Uniqueness (QD-T-1.5)

**Definition**: The Tool name is illegal or duplicated within the same Tool manifest. Legal requirements: non-empty, matching `^[a-zA-Z0-9_-]{1,64}$`, unique within the same Tool manifest; the `verb_noun` structure is recommended (style suggestion only, P2).

**Defect Example**:

❌ Incorrect (illegal characters):

```json
{
  "name": "get weather!!",
  "description": "Get weather"
}
```

❌ Incorrect (duplicate within manifest): two Tools in the same Tool manifest are both named `get_user`.

✅ Correct:

```json
{
  "name": "get_weather",
  "description": "Get weather information for a specified city"
}
```

**Impact**:

- An illegal name may cause platform parsing to fail
- Duplicate names make it impossible for the LLM to distinguish Tools

**Defect Level**: Illegal/duplicate P0 (all levels); style P2

**Inspection Method**: Automated

<a id="126-constraint-consistency-default-qd-t-16"></a>
#### 1.2.6 Constraint Self-Consistency and default (QD-T-1.6)

**Definition**: Constraints within the Schema contradict each other or the default violates a constraint, including: `minimum > maximum`, `minLength > maxLength`, `minItems > maxItems`, default violating type/enum/range, required and default coexisting (semantically contradictory and requiring explanation), and unsatisfiable combined constraints.

**Defect Example**:

❌ Incorrect (contradictory boundaries):

```json
{
  "type": "integer",
  "minimum": 10,
  "maximum": 5
}
```

❌ Incorrect (default violates enum):

```json
{
  "type": "string",
  "enum": ["active", "inactive"],
  "default": "deleted"
}
```

✅ Correct:

```json
{
  "type": "integer",
  "minimum": 5,
  "maximum": 10
}
```

**Impact**:

- Unsatisfiable constraints mean parameters can never pass validation
- A default violating constraints causes inconsistent behavior

**Defect Level**: P1 (all levels); P0 in L3 when it affects high-risk parameters

**Inspection Method**: Automated

<a id="127-type-missing-complexity-qd-t-17"></a>
#### 1.2.7 Missing type / Overly Broad Type / Schema Complexity (QD-T-1.7)

**Definition**: A parameter lacks a type, has an overly broad type, or the Schema complexity exceeds limits, including: no type, multi-type arrays, unconstrained object, nesting >4 levels, >30 parameters, abuse of `oneOf/anyOf/allOf/$ref`, and nullable union types.

**Defect Example**:

❌ Incorrect (no type and no constraint):

```json
{
  "type": "object",
  "properties": {
    "data": {}
  }
}
```

✅ Correct:

```json
{
  "type": "object",
  "properties": {
    "data": {
      "type": "object",
      "additionalProperties": false,
      "properties": {}
    }
  }
}
```

**Impact**:

- A missing type invalidates validation
- Excessive complexity makes it difficult for the LLM to generate correct invocations

**Defect Level**: L1 P2 / L2 P1 / L3 P1

**Inspection Method**: Automated

<a id="13-severity-classification"></a>
### 1.3 Severity Classification

| Defect ID | Defect Name | L1 | L2 | L3 | Inspection Method |
| -------- | -------------------------- | ---------- | ---------- | ---------------- | ---- |
| QD-T-1.1 | Base Field Missing | P0 | P0 | P0 | Automated |
| QD-T-1.2 | required References Undefined Field | P0 | P0 | P0 | Automated |
| QD-T-1.3 | enum–type Conflict / Duplicate Values | P1 / P2 | P1 / P2 | P1 / P2 | Automated |
| QD-T-1.4 | Inappropriate additionalProperties Policy | P2 | P1 | P1 | Automated |
| QD-T-1.5 | Name Validity and Uniqueness | P0 (style P2) | P0 (style P2) | P0 (style P2) | Automated |
| QD-T-1.6 | Constraint Self-Consistency and default | P1 | P1 | P1 (high-risk parameters P0) | Automated |
| QD-T-1.7 | Missing type / Complexity | P2 | P1 | P1 | Automated |

<a id="14-detection-methods"></a>
### 1.4 Detection Methods

The defects in this part can be detected automatically through **protocol meta-Schema validation + custom policy checker**:

```
Detection Tools:
├─ JSON Schema meta-Schema validator
├─ OpenAPI Schema Validator
└─ Custom policy checker

Detection Rules:
├─ Check whether required fields exist
├─ Check whether required references fields defined in properties
├─ Check name validity and uniqueness within the manifest
├─ Check whether enum conflicts with type or contains duplicates
├─ Check whether the additionalProperties policy is appropriate
├─ Check constraint self-consistency and default validity
└─ Check type declarations and Schema complexity
```

<a id="15-part-summary"></a>
### 1.5 Part Summary

This part defines the **basic structural validity inspection** for Tool Schemas, ensuring that Tool definitions can be correctly parsed and understood.

**Core Points**:

- Base fields (name, description, inputSchema) MUST be complete
- name MUST be legal and unique within the manifest
- The required list MUST reference fields defined in properties
- Enum values MUST NOT conflict with type and MUST NOT be duplicated
- The additionalProperties policy MUST be appropriate
- Constraints MUST be self-consistent, and default MUST NOT violate constraints
- type MUST be declared and complexity MUST be controllable

**Inspection Item Statistics**:

- Inspection item count: 7

---

## Part 2: Parameter Constraints, High-Risk Operations, and Semantic Clarity Defects

<a id="21-positioning-of-this-part"></a>
### 2.1 Positioning of This Part

<a id="211-inspection-objective"></a>
#### 2.1.1 Inspection Objective

This part inspects the **parameter constraint completeness**, **high-risk operation identification**, and **semantic clarity** of Tool Schemas, ensuring that parameters are adequately constrained, high-risk operations are explicitly identified, and semantics are clear and unambiguous.

<a id="212-inspection-dimensions"></a>
#### 2.1.2 Inspection Dimensions

```
Parameter Constraints, High-Risk Operations, and Semantic Clarity Inspection
├─ Parameter Constraint Defects (QD-T-2.x)
│   ├─ String constraints (length, format)
│   ├─ Number/Integer constraints (boundaries, unit/precision)
│   ├─ Array constraints (maxItems)
│   ├─ Object constraints (type declaration, complexity)
│   ├─ Query pagination and result-set caps
│   └─ Inter-parameter dependencies and exclusivity
│
├─ High-Risk Operation Defects (QD-T-3.x)
│   ├─ State change and side effect declaration
│   ├─ Untrusted input entering an executable context
│   ├─ Batch/range write operation caps
│   ├─ Authorization context parameter exposure
│   ├─ Cross-Tool data flow
│   └─ Dangerous default values and operation scope
│
└─ Semantic Clarity Defects (QD-T-4.x)
    ├─ Description quality
    ├─ Parameter-level description
    ├─ Multi-Tool semantic competition
    ├─ description–Schema consistency
    └─ Sensitive input handling declaration
```

<a id="213-relationship-to-other-parts"></a>
#### 2.1.3 Relationship to Other Parts

Building on Part 1's assurance of structural validity, this part further inspects:

- Whether parameters are adequately constrained
- Whether high-risk operations are explicitly identified
- Whether semantics are clear and unambiguous

<a id="22-defect-classification"></a>
### 2.2 Defect Classification

<a id="221-parameter-constraint-defects-qd-t-2x"></a>
#### 2.2.1 Parameter Constraint Defects (QD-T-2.x)

##### QD-T-2.1 String Type Without Length Constraint

**Definition**: A String-type parameter does not set maxLength (minLength is not required). Fields that already have `enum` / `const` / fixed-length `pattern` are automatically exempt.

**Defect Example**:

❌ Incorrect:

```json
{
  "type": "object",
  "properties": {
    "content": {
      "type": "string",
      "description": "User input content"
    }
  }
}
```

✅ Correct:

```json
{
  "type": "object",
  "properties": {
    "content": {
      "type": "string",
      "description": "User input content",
      "maxLength": 1000
    }
  }
}
```

**Impact**:

- The LLM may pass excessively long strings
- May cause excessive system load or security risks

**Defect Level**: L1 P2 / L2 P1 / L3 P1 (fields entering storage/commands/external interfaces remain P0 at L3)

**Inspection Method**: Automated

##### QD-T-2.2 String Type Without Format Constraint

**Definition**: A String parameter requiring a specific format does not set pattern. `format` is an annotation-only assertion by default in JSON Schema, so `pattern` SHOULD be preferred; if the validator's format-assertion mode is relied upon, this MUST be noted in the description.

**Defect Example**:

❌ Incorrect:

```json
{
  "type": "object",
  "properties": {
    "email": {
      "type": "string",
      "description": "User email"
    }
  }
}
```

✅ Correct:

```json
{
  "type": "object",
  "properties": {
    "email": {
      "type": "string",
      "description": "User email",
      "pattern": "^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$"
    }
  }
}
```

**Impact**:

- The LLM may pass incorrectly formatted values
- May cause business logic failures

**Defect Level**: L1 P2 / L2 P1 / L3 P1

**Inspection Method**: Semi-automated

##### QD-T-2.3 Number/Integer Type Without Boundary Constraint

**Definition**: A Number or Integer parameter does not set minimum/maximum (or exclusiveMinimum/exclusiveMaximum).

**Defect Example**:

❌ Incorrect (amount as floating-point number):

```json
{
  "type": "object",
  "properties": {
    "amount": {
      "type": "number",
      "description": "Payment amount"
    }
  }
}
```

✅ Correct (integer cents with unit and currency declared):

```json
{
  "type": "object",
  "properties": {
    "amount_cents": {
      "type": "integer",
      "description": "Payment amount, unit: cents, currency: CNY",
      "minimum": 1,
      "maximum": 10000000
    }
  }
}
```

**Impact**:

- The LLM may pass values outside the business range
- Floating-point representation of amounts easily introduces precision errors

**Defect Level**: L1 P2 / L2 P1 / L3 P1 (amount/quantity/ratio fields remain P0 at L3)

**Inspection Method**: Automated

##### QD-T-2.4 Array Type Without Length Constraint

**Definition**: An Array-type parameter does not set maxItems (minItems is not required; an empty array is often a legitimate input).

**Defect Example**:

❌ Incorrect:

```json
{
  "type": "object",
  "properties": {
    "ids": {
      "type": "array",
      "items": {"type": "string"},
      "description": "User ID list"
    }
  }
}
```

✅ Correct:

```json
{
  "type": "object",
  "properties": {
    "ids": {
      "type": "array",
      "items": {"type": "string"},
      "description": "User ID list",
      "maxItems": 100
    }
  }
}
```

**Impact**:

- The LLM may pass excessively long arrays
- May cause performance issues or denial of service

**Defect Level**: L1 P2 / L2 P1 / L3 P1

**Inspection Method**: Automated

##### QD-T-2.5 Missing Unit/Precision/Time Zone/Currency Semantics

**Definition**: Numeric or temporal parameters lack declarations of unit, precision, time zone, or currency semantics, including: amount in yuan/cents, time in seconds/milliseconds and time zone, date format, ratio vs. percentage; monetary numeric values lack `multipleOf`.

**Defect Example**:

❌ Incorrect:

```json
{
  "type": "object",
  "properties": {
    "timestamp": {
      "type": "integer",
      "description": "Timestamp"
    }
  }
}
```

The description does not state the timestamp unit (seconds/milliseconds) or time zone.

✅ Correct:

```json
{
  "type": "object",
  "properties": {
    "timestamp": {
      "type": "integer",
      "description": "Unix timestamp, unit: seconds, time zone: UTC"
    }
  }
}
```

**Impact**:

- The LLM may generate values with the wrong unit/time zone
- Missing monetary precision may cause financial discrepancies

**Defect Level**: L1 P2 / L2 P1 / L3 P0 (monetary and time-critical parameters)

**Inspection Method**: Semi-automated

##### QD-T-2.6 Query Tool Without Pagination/Result-Set Cap

**Definition**: A `list_*` / `search_*` query Tool lacks a `limit` / `page_size` parameter, or the `limit` parameter has no `maximum`.

**Defect Example**:

❌ Incorrect:

```json
{
  "name": "list_orders",
  "description": "List all orders",
  "inputSchema": {
    "type": "object",
    "properties": {
      "status": {"type": "string"}
    }
  }
}
```

No pagination/result-set cap parameter.

✅ Correct:

```json
{
  "name": "list_orders",
  "description": "List orders with pagination",
  "inputSchema": {
    "type": "object",
    "properties": {
      "status": {"type": "string"},
      "limit": {
        "type": "integer",
        "description": "Maximum number of results to return",
        "minimum": 1,
        "maximum": 100
      }
    }
  }
}
```

**Impact**:

- May return a massive amount of data at once
- May cause performance issues or memory exhaustion

**Defect Level**: L1 P1 / L2 P1 / L3 P1

**Inspection Method**: Automated

##### QD-T-2.7 Unexpressed Inter-Parameter Dependencies/Exclusivity

**Definition**: Parameters have relationships such as pairwise-required, mutually exclusive, conditionally required, or at-least-one-of, but these are not expressed via keywords such as `dependentRequired` / `oneOf`. The target platform's support for these keywords MUST be noted.

**Defect Example**:

❌ Incorrect:

```json
{
  "type": "object",
  "properties": {
    "email": {"type": "string"},
    "phone": {"type": "string"}
  }
}
```

The at-least-one-of relationship between email and phone is not expressed.

✅ Correct:

```json
{
  "type": "object",
  "properties": {
    "email": {"type": "string"},
    "phone": {"type": "string"}
  },
  "anyOf": [
    {"required": ["email"]},
    {"required": ["phone"]}
  ]
}
```

**Impact**:

- The LLM may generate invocations with missing required parameters or with mutually exclusive parameters coexisting

**Defect Level**: P1 (all levels)

**Inspection Method**: Semi-automated

> **Three-Layer Bearing of Frequency/Batch Caps** (consistent with Inspect Cross §7.4): the `maxItems` (QD-T-2.4), `limit.maximum` (QD-T-2.6), etc. in this section's parameter constraints are **artifact declaration layer** business-applicable caps delivered with the Tool; runtime Harness/API gateway rate limiting, concurrency, and timeouts are the **runtime fallback layer** global fallback values; business-side quotas, approvals, and billing are the **business quota layer**. The three layers cannot substitute for one another: the inspection of `maxItems`/`limit.maximum` in this section MUST NOT be waived on the grounds that "the Harness has a fallback"—not every deployment environment has a Harness; Harness fallback thresholds are not equal to business-applicable caps, since fallback values usually take the greatest common divisor and are maximally redundant, and cannot replace business-level constraints. This specification only judges whether the artifact declares a cap; it does not judge whether the Harness configuration is correct or whether the threshold is optimal.

<a id="222-high-risk-operation-defects-qd-t-3x"></a>
#### 2.2.2 High-Risk Operation Defects (QD-T-3.x)

##### QD-T-3.1 State Change and Material Side Effect Declaration

**Definition**: The Tool has a state change or material side effect but does not declare it in the description. A defect is determined only when the name/description presents as read-only yet a hidden side effect exists (e.g., `verify_order` actually charges the customer), or when a side effect (irreversible, externally propagated, or with financial consequences) is not declared at all; when the name already clearly expresses write intent (e.g., `update_user`), fixed warning wording is no longer required.

Structured annotations (`readOnlyHint` / `destructiveHint` / `idempotentHint`) are recommended for expression, without binding to specific wording. The description marker is only a hint to the model; confirmation/approval/permission control is not borne by this specification (for the bearing relationship, see Appendix E, E-19).

**Defect Example**:

❌ Incorrect (name presents as read-only while a hidden side effect exists):

```json
{
  "name": "verify_order",
  "description": "Verify order status"
}
```

It actually charges the customer, but the description does not declare the side effect.

✅ Correct:

```json
{
  "name": "verify_order",
  "description": "Verify the order and complete payment. [This operation produces a financial side effect.]"
}
```

**Impact**:

- The LLM may misjudge the operation type
- May cause unintended data modifications or financial loss

**Defect Level**: L2 P1 / L3 P0

**Inspection Method**: Human

##### QD-T-3.2 Untrusted Input Entering an Executable Context

<!-- PENDING: E-17 -->

**Definition**: Parameters where untrusted input enters an executable interpretation context (SQL / shell / code / template expressions / file paths / URLs). Determination basis: executable semantic features in the parameter name or description (automatically identified as suspected) + manual confirmation of whether the backend has parameterization/sandboxing/allowlisting.

URL / file path parameters without constraints (domain allowlist, protocol restrictions, directory prefix) are an explicit sub-item of this rule.

**Defect Example**:

❌ Incorrect:

```json
{
  "name": "execute_query",
  "description": "Execute user query",
  "inputSchema": {
    "type": "object",
    "properties": {
      "query": {
        "type": "string",
        "description": "User-entered query statement"
      }
    }
  }
}
```

Free-text query statements go directly into the SQL context.

✅ Correct (parameterized query fields + controlled filter structure):

```json
{
  "name": "execute_query",
  "description": "Execute structured queries",
  "inputSchema": {
    "type": "object",
    "properties": {
      "table": {
        "type": "string",
        "enum": ["users", "orders", "products"]
      },
      "filter": {
        "type": "object",
        "description": "Controlled filter conditions, parameterized by the backend",
        "properties": {
          "field": {
            "type": "string",
            "enum": ["id", "name", "email"]
          },
          "value": {
            "type": "string",
            "maxLength": 200
          }
        },
        "required": ["field", "value"],
        "additionalProperties": false
      }
    },
    "required": ["table"],
    "additionalProperties": false
  }
}
```

**Impact**:

- May cause SQL injection, command injection, and other security risks
- May lead to system compromise

**Defect Level**: L1 P1 / L2 P0 / L3 P0 (triggered by parameter characteristics, not fixed per level)

**Inspection Method**: Semi-automated

##### QD-T-3.3 Batch/Range Write Operation Without Cap

**Definition**: A batch or range write operation does not set a cap, covering three forms: array parameters (e.g., `ids`), filter conditions (empty filter = full scope), and wildcards (e.g., `*`).

**Defect Example**:

❌ Incorrect:

```json
{
  "name": "delete_users",
  "description": "Batch delete users",
  "inputSchema": {
    "type": "object",
    "properties": {
      "user_ids": {
        "type": "array",
        "items": {"type": "string"}
      }
    }
  }
}
```

✅ Correct:

```json
{
  "name": "delete_users",
  "description": "Batch delete users (up to 10)",
  "inputSchema": {
    "type": "object",
    "properties": {
      "user_ids": {
        "type": "array",
        "items": {"type": "string"},
        "maxItems": 10
      }
    },
    "required": ["user_ids"],
    "additionalProperties": false
  }
}
```

**Impact**:

- May cause large-scale accidental data deletion
- May cause system performance issues

**Defect Level**: L2 P1 / L3 P0

**Inspection Method**: Semi-automated

##### QD-T-3.4 Authorization Context Parameter Exposure

<!-- PENDING: E-14 -->

**Definition**: The Tool exposes parameters that should be controlled internally by the system, such as tenantId, admin, token, etc.

**Defect Example**:

❌ Incorrect:

```json
{
  "name": "create_user",
  "description": "Create user",
  "inputSchema": {
    "type": "object",
    "properties": {
      "name": {"type": "string"},
      "tenantId": {"type": "string"},
      "isAdmin": {"type": "boolean"}
    }
  }
}
```

Exposes tenantId and isAdmin parameters.

✅ Correct:

```json
{
  "name": "create_user",
  "description": "Create user",
  "inputSchema": {
    "type": "object",
    "properties": {
      "name": {"type": "string"}
    }
  }
}
```

tenantId is obtained from context; isAdmin is prohibited from being set via the Tool.

**Impact**:

- May cause privilege escalation
- May cause tenant data leaks

**Defect Level**: L3 P0; L1/L2 triggered by parameter characteristics (see Appendix E, E-14)

**Inspection Method**: Human

##### QD-T-3.5 Cross-Tool Data Flow

<!-- Transferred to Inspect Cross: QD-TT-5.1 (this specification retains a P2 lead) -->

**Definition (retained as a P2 lead; rule ownership has moved to QD-TT-5.1)**: The output of one Tool may be used by the LLM as input to another Tool, causing unintended data flow.

**Defect Example**:

❌ Incorrect:

```
Tool 1: get_user_email(user_id) → returns {email: "user@example.com"}
Tool 2: send_notification(email, message) → sends notification
```

The LLM may automatically pass Tool 1's email to Tool 2.

✅ Correct:

```
Tool 1: get_user_email(user_id) → returns {email: "[PROTECTED]"}
(Sensitive fields are masked)

or

Tool 2: send_notification(user_id, message) → retrieves email internally
(Does not expose the email parameter)
```

**Impact**:

- May cause data leaks
- May cause unintended operations

**Defect Level**: Transferred to Inspect Cross (QD-TT-5.1); this specification retains a P2 lead

**Inspection Method**: Semi-automated

##### QD-T-3.6 Dangerous Default Values and Operation Scope Preconditions

**Definition**: A parameter has a dangerous default value or a precondition that expands the operation scope, including: `force: default true`, `dry_run: default false`, `scope: default ALL`, empty filter representing full scope, and wildcards expanding the scope.

**Defect Example**:

❌ Incorrect:

```json
{
  "type": "object",
  "properties": {
    "force": {
      "type": "boolean",
      "description": "Whether to force deletion",
      "default": true
    }
  }
}
```

`force` defaults to true, expanding the destructive scope.

✅ Correct:

```json
{
  "type": "object",
  "properties": {
    "force": {
      "type": "boolean",
      "description": "Whether to force deletion (even if associated data exists)",
      "default": false
    }
  }
}
```

**Impact**:

- Dangerous default values may cause unexpected large-scale destruction

**Defect Level**: L2 P1 / L3 P0

**Inspection Method**: Automated + human

##### QD-T-3.7 Undeclared Operation Allowlist for Parameterized Tools

**Definition**: For parameterized/open-ended tools (`sql_query` / `exec` / `http_request` / `eval`, etc.), the operation target is determined by the actual argument ("execute arbitrary SQL," "run arbitrary commands," "call arbitrary URLs"), while the Tool Schema does not declare the permitted operation scope (table allowlist, command allowlist, domain allowlist, etc.). The permission set of such tools cannot be statically enumerated ("the set is not closed"); this is a pre-emptive blocking form, attributed from `inspect/permission.md` §2.2.5 (see QD-PM §2.8 item 4).

**Defect Example**:

❌ Incorrect:

```json
{
  "name": "sql_query",
  "description": "Execute arbitrary SQL queries",
  "inputSchema": {
    "type": "object",
    "properties": {
      "sql": { "type": "string", "description": "Arbitrary SQL statement" }
    },
    "required": ["sql"]
  }
}
```

`sql` accepts arbitrary SQL, and the operation targets (tables/databases) cannot be enumerated.

✅ Correct:

```json
{
  "name": "sql_query",
  "description": "Execute restricted queries, limited to the users and orders tables",
  "inputSchema": {
    "type": "object",
    "properties": {
      "table": { "type": "string", "enum": ["users", "orders"] },
      "filter": {
        "type": "object",
        "description": "Controlled filter conditions, parameterized by the backend",
        "properties": {
          "field": { "type": "string", "enum": ["id", "name", "email"] },
          "value": { "type": "string", "maxLength": 200 }
        },
        "required": ["field", "value"],
        "additionalProperties": false
      }
    },
    "required": ["table"]
  }
}
```

`table` is restricted by an `enum` allowlist, so the operation targets are enumerable.

**Impact**:

- The permission set cannot be statically enumerated, and the proportionality assessment cannot converge
- A single tool constitutes a data exfiltration/destruction surface (arbitrary tables, arbitrary commands, arbitrary URLs)

**Defect Level**: P0 (all levels; a non-closed set is a pre-emptive blocking form, and a hit means FAIL)

**Inspection Method**: Semi-automated

<a id="223-semantic-clarity-defects-qd-t-4x"></a>
#### 2.2.3 Semantic Clarity Defects (QD-T-4.x)

##### QD-T-4.1 Insufficient description Quality

**Definition**: The Tool's description lacks mandatory elements. Mandatory element checklist: action, object, scope/timeliness, key parameter semantics, return summary. A defect is determined only when ≥2 items are missing.

**Defect Example**:

❌ Incorrect:

```json
{
  "name": "get_data",
  "description": "Get data"
}
```

Missing most elements beyond action and object.

✅ Correct:

```json
{
  "name": "get_user_orders",
  "description": "Get the order list for a specified user. Returns orders from the last 30 days, sorted in reverse chronological order."
}
```

**Impact**:

- The LLM may misunderstand the Tool's purpose
- May lead to incorrect Tool selection

**Defect Level**: L1 P2 / L2 P1 / L3 P1

**Inspection Method**: Semi-automated

> **Cross-Subset Attribution**: Instruction injection in the description field (tool description poisoning) belongs to Risk Explicit `NR-S-5` and is not determined by this item; this item only checks "whether the description contains the mandatory elements."

##### QD-T-4.2 Undeclared Side Effects (Merged into QD-T-3.1)

This rule has been merged into QD-T-3.1 (State Change and Material Side Effect Declaration). The number is retained and is no longer used independently.

##### QD-T-4.3 Multi-Tool Semantic Competition

<!-- Transferred to Inspect Cross: QD-TT-5.2 (this specification retains a P2 lead) -->

**Definition (retained as a P2 lead; rule ownership has moved to QD-TT-5.2)**: Multiple Tools have semantically similar names or descriptions, making it difficult for the LLM to distinguish between them.

**Defect Example**:

❌ Incorrect:

```json
{
  "tools": [
    {
      "name": "get_user",
      "description": "Get user information"
    },
    {
      "name": "get_user_info",
      "description": "Get detailed user information"
    }
  ]
}
```

The two Tools have similar functionality and are difficult to distinguish.

✅ Correct:

```json
{
  "tools": [
    {
      "name": "get_user_basic",
      "description": "Get basic user information (ID, name)"
    },
    {
      "name": "get_user_profile",
      "description": "Get the user's complete profile (including contact information, preferences)"
    }
  ]
}
```

**Impact**:

- The LLM may select the wrong Tool
- May cause redundant function invocations

**Defect Level**: Transferred to Inspect Cross (QD-TT-5.2); this specification retains a P2 lead

**Inspection Method**: Semi-automated

##### QD-T-4.4 Missing Parameter-Level description

**Definition**: A property has no description.

**Defect Example**:

❌ Incorrect:

```json
{
  "type": "object",
  "properties": {
    "user_id": {"type": "string"}
  }
}
```

user_id has no description.

✅ Correct:

```json
{
  "type": "object",
  "properties": {
    "user_id": {
      "type": "string",
      "description": "Unique user identifier"
    }
  }
}
```

**Impact**:

- The LLM may misunderstand the parameter's meaning

**Defect Level**: L1 P2 / L2 P1 / L3 P1

**Inspection Method**: Automated

##### QD-T-4.5 description–Schema Inconsistency

**Definition**: Within the same Tool, the description is inconsistent with the Schema, including: the description says "up to 10" but the Schema allows 100; the description mentions a nonexistent parameter; an example value is not in the enum; a Tool named `get_*` actually writes data.

**Defect Example**:

❌ Incorrect:

```json
{
  "name": "get_report",
  "description": "Get report",
  "inputSchema": {
    "type": "object",
    "properties": {
      "limit": {
        "type": "integer",
        "description": "Return at most 10 records",
        "maximum": 100
      }
    }
  }
}
```

The description says "at most 10 records," but the Schema allows 100.

✅ Correct:

```json
{
  "name": "get_report",
  "description": "Get report",
  "inputSchema": {
    "type": "object",
    "properties": {
      "limit": {
        "type": "integer",
        "description": "Return at most 10 records",
        "maximum": 10
      }
    }
  }
}
```

**Impact**:

- The LLM may generate invocations that do not match the description

**Defect Level**: P1 (all levels)

**Inspection Method**: Semi-automated

##### QD-T-4.6 Sensitive Input Handling Declaration

**Definition**: When passwords, keys, ID numbers, etc. are legitimate input parameters, `writeOnly` / secret handling (not logged, not echoed) SHOULD be declared.

**Defect Example**:

❌ Incorrect:

```json
{
  "type": "object",
  "properties": {
    "password": {
      "type": "string",
      "description": "User password"
    }
  }
}
```

Sensitive handling is not declared.

✅ Correct:

```json
{
  "type": "object",
  "properties": {
    "password": {
      "type": "string",
      "description": "User password (sensitive field; not logged, not echoed)",
      "writeOnly": true
    }
  }
}
```

**Impact**:

- Sensitive information may be written to logs or echoed

**Defect Level**: L2 P1 / L3 P1

**Inspection Method**: Semi-automated

##### QD-T-4.7 Missing Output Contract (outputSchema)

**Definition**: The Tool does not declare outputSchema (the structured definition of output parameters), leaving downstream unable to determine its output structure.

**Defect Example**:

❌ Incorrect:

```json
{
  "name": "get_user",
  "description": "Get user information",
  "inputSchema": { "type": "object", "properties": { "user_id": {"type": "string"} } }
}
```

outputSchema is not declared.

✅ Correct:

```json
{
  "name": "get_user",
  "description": "Get user information",
  "inputSchema": { "type": "object", "properties": { "user_id": {"type": "string"} } },
  "outputSchema": {
    "type": "object",
    "properties": {
      "email": {"type": "string", "description": "User email"},
      "name": {"type": "string", "description": "User name"}
    }
  }
}
```

**Impact**:

- Downstream Tools / callers cannot determine the output structure, which may lead to misuse

**Defect Level**: Default L2/L3 P1 (advisory); if a cross-Tool data flow exists (Inspect Cross QD-TT-5.1 hit) → upgraded to P0

**Inspection Method**: Semi-automated

<a id="23-severity-classification"></a>
### 2.3 Severity Classification

| Defect Category | IDs | Item Count |
| ------- | ---- | ----- |
| Parameter Constraint Defects | QD-T-2.1 to QD-T-2.7 | 7 |
| High-Risk Operation Defects | QD-T-3.1 to QD-T-3.7 | 7 |
| Semantic Clarity Defects | QD-T-4.1 to QD-T-4.7 | 7 (of which QD-T-4.2 has been merged into QD-T-3.1) |
| **Total** | | **21** |

<a id="24-detection-method-checklist-mechanism"></a>
### 2.4 Detection Method: Checklist Mechanism

The defects in this part require **Checklist inspection** combined with **human review**:

```
Detection Process:
├─ Automated Inspection
│   ├─ JSON Schema meta-Schema validation
│   ├─ Parameter constraint completeness check (length/boundary/format/pagination)
│   ├─ Constraint self-consistency and default validity check
│   └─ Dangerous default values and high-risk keyword scanning
│
├─ Semi-Automated Inspection
│   ├─ description quality scoring and parameter-level description check
│   ├─ Unit/precision/time zone/currency semantics check
│   ├─ description–Schema consistency check
│   ├─ Sensitive input handling declaration check
│   ├─ Multi-Tool semantic similarity calculation
│   └─ Cross-Tool data flow analysis
│
└─ Human Review
    ├─ State change and side effect identification
    ├─ Untrusted input executable context confirmation
    ├─ Authorization context parameter exposure review
    └─ Semantic competition confirmation
```

<a id="25-part-summary"></a>
### 2.5 Part Summary

This part defines the **parameter constraint, high-risk operation, and semantic clarity inspection** for Tool Schemas, ensuring that parameters are adequately constrained, high-risk operations are explicitly identified, and semantics are clear and unambiguous.

**Core Points**:

- Parameters MUST have explicit constraints (length, boundary, format, unit/precision, pagination, dependency/exclusivity)
- State changes and material side effects MUST be declared
- Untrusted input MUST NOT enter an executable context
- Batch/range write operations MUST have caps
- Internal parameters MUST be isolated
- Dangerous default values MUST be avoided
- Cross-Tool data flows MUST be assessed
- Semantics MUST be clear and unambiguous

**Inspection Item Statistics**:

- Inspection item count: 21 numbered items (of which QD-T-4.2 has been merged into QD-T-3.1; QD-T-3.5 and QD-T-4.3 have been transferred to Inspect Cross QD-TT; QD-T-4.7 is newly added)

---

## Part 3: Tiered Inspection Mechanism

<a id="31-tool-risk-level-definitions"></a>
### 3.1 Tool Operational Risk Level Definitions (`OR-L`)

> **【Global Symbol Convention · Mandatory】** In the body text, tables, examples, and appendices of this document, `L1` / `L2` / `L3` are **always** shorthand for `OR-L1` / `OR-L2` / `OR-L3` (Tool Operational Risk Level); the two are completely equivalent. Except in this definition section, the `OR-` prefix is not repeated everywhere in the document. Any isolated `L1` / `L2` / `L3` **MUST NOT** be understood as `AC-L` (Agent Complexity Level) or any other grading model. This convention is mandatory for all chapters, appendices, examples, and report fields in this document.

<a id="311-agent-level-classification"></a>
#### 3.1.1 Operational Risk Level Classification

| Operational Risk Level | Designation | Definition | Typical Characteristics |
| ------- | --- | ----------- | ---------- |
| **Low Risk** | `OR-L1` | Read-only query; no state changes | Query, search, retrieve information |
| **Medium Risk** | `OR-L2` | State-changing; recoverable | Create, update, send notifications |
| **High Risk** | `OR-L3` | Irreversible / sensitive operations | Delete, payment, permission changes |

<a id="312-level-determination-criteria"></a>
#### 3.1.2 Level Determination Criteria

**`OR-L1` (Low Risk) Determination Criteria**:

- ✅ Performs data-read operations only
- ✅ Does not involve sensitive data
- ✅ Operations are repeatable with no side effects
- ✅ Failure consequence: query failure only; no other impact

**`OR-L2` (Medium Risk) Determination Criteria**:

- ✅ Performs data creation or update operations
- ✅ Changes are recoverable or overwritable
- ⚠️ May involve some sensitive data
- ⚠️ Failure consequence: data quality degradation; human intervention required

<!-- PENDING: E-15 -->

**`OR-L3` (High Risk) Determination Criteria**:

- ✅ Performs data deletion, payment, permission change, or similar operations
- ✅ Involves highly sensitive data
- ✅ Operations are irreversible or difficult to recover
- ✅ Failure consequence: data loss, financial loss, permission leaks

<a id="313-typical-examples"></a>
#### 3.1.3 Typical Examples

| Operational Risk Level | Typical Tool Examples |
| ------- | ------------------------------------------------------------- |
| `OR-L1` | get_weather, get_current_time, search_products, list_orders |
| `OR-L2` | create_user, update_profile, send_notification, add_to_cart |
| `OR-L3` | delete_user, process_payment, grant_permission, transfer_data |

<a id="32-defect-level-definitions-p0p1p2"></a>
### 3.2 Defect Level Definitions (P0/P1/P2)

<a id="321-defect-level-classification"></a>
#### 3.2.1 Defect Level Classification

| Defect Level | Symbol | Definition | Typical Defects |
| ------ | --- | ------------- | ---------------------- |
| **P0** | ⛔ | Blocks release; MUST be fixed | Base field missing, Authorization Context Parameter Exposure, Untrusted Input Entering an Executable Context |
| **P1** | ⚠️ | SHOULD be fixed before release | Insufficient parameter constraints, incomplete description |
| **P2** | ℹ️ | SHOULD be included in the improvement plan or risk register | Minor description omissions, non-critical field omissions |

<a id="322-defect-level-upgrade-rules"></a>
#### 3.2.2 Defect Level Upgrade Rules

**The same defect may have its defect level upgraded based on the Tool's Operational Risk Level**:

| Defect Example | `OR-L1` (Low Risk) | `OR-L2` (Medium Risk) | `OR-L3` (High Risk) |
| ------------------ | ------- | ------- | ------- |
| String without maxLength | P2 (Advisory) | P1 (Warning) | P1 (Blocking; executable fields P0) |
| Number without boundary | P2 (Advisory) | P1 (Warning) | P1 (Blocking; amount/quantity P0) |
| State change not declared | - | P1 (Warning) | P0 (Blocking) |
| Authorization Context Parameter Exposure | Triggered by parameter characteristics (see E-14) | Triggered by parameter characteristics (see E-14) | P0 (Blocking) |

<a id="33-tiered-inspection-checklist"></a>
### 3.3 Tiered Inspection Checklist

<a id="331-l1-low-risk-inspection-checklist"></a>
#### 3.3.1 `OR-L1` (Low Risk) Inspection Checklist

| ID | Inspection Item | Defect Level | Inspection Method |
| -------- | ---------------------------- | -------------------- | ---- |
| QD-T-1.1 | Base Field Missing | P0 | Automated |
| QD-T-1.2 | required References Undefined Field | P0 | Automated |
| QD-T-1.3 | enum–type Conflict / Duplicate Values | P1 / P2 | Automated |
| QD-T-1.4 | Inappropriate additionalProperties Policy | P2 | Automated |
| QD-T-1.5 | Name Validity and Uniqueness | P0 (style P2) | Automated |
| QD-T-1.6 | Constraint Self-Consistency and default | P1 | Automated |
| QD-T-1.7 | Missing type / Complexity | P2 | Automated |
| QD-T-2.1 | String Without maxLength | P2 | Automated |
| QD-T-2.2 | Missing Format Contract | P2 | Semi-automated |
| QD-T-2.3 | Number/Integer Without Boundary | P2 | Automated |
| QD-T-2.4 | Array Without maxItems | P2 | Automated |
| QD-T-2.5 | Unit/Precision/Time Zone/Currency | P2 | Semi-automated |
| QD-T-2.6 | Query Without Pagination/Cap | P1 | Automated |
| QD-T-2.7 | Parameter Dependency/Exclusivity | P1 | Semi-automated |
| QD-T-3.2 | Untrusted Input Executable Context | P1 (by characteristic) | Semi-automated |
| QD-T-3.4 | Authorization Context Parameter Exposure | Triggered by parameter characteristics (provisional P0, see E-14) | Human |
| QD-T-3.5 | Cross-Tool Data Flow | Transferred to cross QD-TT-5.1 | Semi-automated |
| QD-T-3.7 | Undeclared Operation Allowlist for Parameterized Tools | P0 | Semi-automated |
| QD-T-4.1 | description Quality | P2 | Semi-automated |
| QD-T-4.3 | Multi-Tool Semantic Competition | Transferred to cross QD-TT-5.2 | Semi-automated |
| QD-T-4.4 | Missing Parameter-Level description | P2 | Automated |
| QD-T-4.5 | description–Schema Inconsistency | P1 | Semi-automated |

**Inspection Item Count**: 22 numbered items (P0: 5, P1: 6, P2: 9, plus 2 transferred to cross QD-TT)

<a id="332-l2-medium-risk-inspection-checklist"></a>
#### 3.3.2 `OR-L2` (Medium Risk) Inspection Checklist

| ID | Inspection Item | Defect Level | Inspection Method |
| -------- | ---------------------------- | -------------------- | ----- |
| QD-T-1.1 | Base Field Missing | P0 | Automated |
| QD-T-1.2 | required References Undefined Field | P0 | Automated |
| QD-T-1.3 | enum–type Conflict / Duplicate Values | P1 / P2 | Automated |
| QD-T-1.4 | Inappropriate additionalProperties Policy | P1 | Automated |
| QD-T-1.5 | Name Validity and Uniqueness | P0 (style P2) | Automated |
| QD-T-1.6 | Constraint Self-Consistency and default | P1 | Automated |
| QD-T-1.7 | Missing type / Complexity | P1 | Automated |
| QD-T-2.1 | String Without maxLength | P1 | Automated |
| QD-T-2.2 | Missing Format Contract | P1 | Semi-automated |
| QD-T-2.3 | Number/Integer Without Boundary | P1 | Automated |
| QD-T-2.4 | Array Without maxItems | P1 | Automated |
| QD-T-2.5 | Unit/Precision/Time Zone/Currency | P1 | Semi-automated |
| QD-T-2.6 | Query Without Pagination/Cap | P1 | Automated |
| QD-T-2.7 | Parameter Dependency/Exclusivity | P1 | Semi-automated |
| QD-T-3.1 | State Change and Material Side Effect Declaration | P1 | Human |
| QD-T-3.2 | Untrusted Input Executable Context | P0 (by characteristic) | Semi-automated |
| QD-T-3.3 | Batch/Range Write Operation Without Cap | P1 | Semi-automated |
| QD-T-3.4 | Authorization Context Parameter Exposure | Triggered by parameter characteristics (provisional P0, see E-14) | Human |
| QD-T-3.5 | Cross-Tool Data Flow | Transferred to cross QD-TT-5.1 | Semi-automated |
| QD-T-3.6 | Dangerous Default/Operation Scope | P1 | Automated + human |
| QD-T-3.7 | Undeclared Operation Allowlist for Parameterized Tools | P0 | Semi-automated |
| QD-T-4.1 | description Quality | P1 | Semi-automated |
| QD-T-4.3 | Multi-Tool Semantic Competition | Transferred to cross QD-TT-5.2 | Semi-automated |
| QD-T-4.4 | Missing Parameter-Level description | P1 | Automated |
| QD-T-4.5 | description–Schema Inconsistency | P1 | Semi-automated |
| QD-T-4.6 | Sensitive Input Handling Declaration | P1 | Semi-automated |
| QD-T-4.7 | Missing Output Contract (outputSchema) | P1 | Semi-automated |

**Inspection Item Count**: 27 numbered items (P0: 6, P1: 19, P2: 0, plus 2 transferred to cross QD-TT)

<a id="333-l3-high-risk-inspection-checklist"></a>
#### 3.3.3 `OR-L3` (High Risk) Inspection Checklist

| ID | Inspection Item | Defect Level | Inspection Method |
| -------- | ---------------------------- | ------------------------ | ----- |
| QD-T-1.1 | Base Field Missing | P0 | Automated |
| QD-T-1.2 | required References Undefined Field | P0 | Automated |
| QD-T-1.3 | enum–type Conflict / Duplicate Values | P1 / P2 | Automated |
| QD-T-1.4 | Inappropriate additionalProperties Policy | P1 | Automated |
| QD-T-1.5 | Name Validity and Uniqueness | P0 (style P2) | Automated |
| QD-T-1.6 | Constraint Self-Consistency and default | P1 (high-risk parameters P0) | Automated |
| QD-T-1.7 | Missing type / Complexity | P1 | Automated |
| QD-T-2.1 | String Without maxLength | P1 (executable/external interface fields P0) | Automated |
| QD-T-2.2 | Missing Format Contract | P1 | Semi-automated |
| QD-T-2.3 | Number/Integer Without Boundary | P1 (amount/quantity P0) | Automated |
| QD-T-2.4 | Array Without maxItems | P1 | Automated |
| QD-T-2.5 | Unit/Precision/Time Zone/Currency | P0 (critical parameters) | Semi-automated |
| QD-T-2.6 | Query Without Pagination/Cap | P1 | Automated |
| QD-T-2.7 | Parameter Dependency/Exclusivity | P1 | Semi-automated |
| QD-T-3.1 | State Change and Material Side Effect Declaration | P0 | Human |
| QD-T-3.2 | Untrusted Input Executable Context | P0 (by characteristic) | Semi-automated |
| QD-T-3.3 | Batch/Range Write Operation Without Cap | P0 | Semi-automated |
| QD-T-3.4 | Authorization Context Parameter Exposure | P0 | Human |
| QD-T-3.5 | Cross-Tool Data Flow | Transferred to cross QD-TT-5.1 | Semi-automated |
| QD-T-3.6 | Dangerous Default/Operation Scope | P0 | Automated + human |
| QD-T-3.7 | Undeclared Operation Allowlist for Parameterized Tools | P0 | Semi-automated |
| QD-T-4.1 | description Quality | P1 | Semi-automated |
| QD-T-4.3 | Multi-Tool Semantic Competition | Transferred to cross QD-TT-5.2 | Semi-automated |
| QD-T-4.4 | Missing Parameter-Level description | P1 | Automated |
| QD-T-4.5 | description–Schema Inconsistency | P1 | Semi-automated |
| QD-T-4.6 | Sensitive Input Handling Declaration | P1 | Semi-automated |
| QD-T-4.7 | Missing Output Contract (outputSchema) | P1 (cross-Tool data flow P0) | Semi-automated |

**Inspection Item Count**: 27 numbered items (P0: 10, P1: 15, P2: 0, plus 2 transferred to cross QD-TT)

<a id="34-standard-inspection-process"></a>
### 3.4 Standard Inspection Process

<a id="341-inspection-process-flow"></a>
#### 3.4.1 Inspection Process Flow

<!-- PENDING: E-4 -->

```
┌─────────────────────────────────────────────────────────────┐
│                  Tool Schema Inspection Process              │
└─────────────────────────────────────────────────────────────┘
                                   │
                                   ▼
                       ┌───────────────────────┐
                       │ Step 1: Determine     │
                       │ Operational Risk Level│
                       │ Determine OR-L1/L2/L3 │
                       └───────────────────────┘
                                   │
                                   ▼
                       ┌───────────────────────┐
                       │ Step 2: Select        │
                       │ Inspection Checklist  │
                       │ Based on Operational  │
                       │ Risk Level            │
                       └───────────────────────┘
                                   │
                                   ▼
                       ┌───────────────────────┐
                       │ Step 3: Automated     │
                       │ Inspection            │
                       │ Execute automated     │
                       │ inspection items      │
                       └───────────────────────┘
                                   │
                          ┌────────────┴────────────┐
                          │                         │
                          ▼                         ▼
                ┌─────────────────┐      ┌─────────────────┐
                │ No P0 defects   │      │ P0 defects found │
                └─────────────────┘      └─────────────────┘
                          │                         │
                          │                         ▼
                          │              ┌─────────────────────┐
                          │              │ Output defect report │
                          │              │ Flag P0 defects      │
                          │              └─────────────────────┘
                          │                         │
                          │                         ▼
                          │              ┌─────────────────────┐
                          │              │ Re-inspect after     │
                          │              │ remediation          │
                          │              └─────────────────────┘
                          │
                          ▼
                           ┌───────────────────────┐
                           │ Step 4: Semi-Automated│
                           │ Inspection            │
                           │ Execute semi-automated│
                           │ inspection items      │
                           └───────────────────────┘
                                   │
                                   ▼
                           ┌───────────────────────┐
                           │ Step 5: Human Review   │
                           │ Execute human          │
                           │ inspection items       │
                           └───────────────────────┘
                                   │
                                   ▼
                           ┌───────────────────────┐
                           │ Step 6: Output         │
                           │ Inspection Report      │
                           │ Flag all defects and   │
                           │ recommendations        │
                           └───────────────────────┘
```

<a id="342-inspection-process-description"></a>
#### 3.4.2 Inspection Process Description

**Step 1: Determine Operational Risk Level**

Determine the Operational Risk Level (OR-L1/OR-L2/OR-L3) based on the Tool's operation type.

**Determination Basis**:

- Involves write operations → L2 minimum
- Involves irreversible operations → L3
- Involves sensitive data → L3

**Step 2: Select Inspection Checklist**

Select the corresponding inspection checklist based on the Operational Risk Level:

- L1: 22 inspection items (including 2 transferred to cross; 20 scored)
- L2: 27 inspection items (including 2 transferred to cross; 25 scored)
- L3: 27 inspection items (including 2 transferred to cross; 25 scored)

**Step 3: Automated Inspection**

Execute automatable inspection items; output a defect report.

**Step 4: Semi-Automated Inspection**

Execute inspection items that require tool assistance, such as:

- description quality scoring
- Cross-Tool data flow analysis
- Multi-Tool semantic similarity calculation

**Step 5: Human Review**

Execute inspection items that require human judgment, such as:

- Side effect identification
- Authorization context parameter exposure review
- Semantic competition confirmation

**Step 6: Output Inspection Report**

Output a complete inspection report, including:

- Operational Risk Level
- Inspection item checklist
- Defect list (sorted by defect level)
- Remediation recommendations

<a id="35-usage-examples"></a>
### 3.5 Usage Examples

<!-- PENDING: E-6 -->

<a id="351-l1-example-weather-query-tool"></a>
#### 3.5.1 L1 Example: Weather Query Tool

**Tool Definition**:

```json
{
  "name": "get_weather",
  "description": "Get weather information for a specified city",
  "inputSchema": {
    "type": "object",
    "properties": {
      "city": {
        "type": "string",
        "description": "City name"
      }
    },
    "required": ["city"]
  }
}
```

**Operational Risk Level Determination**: L1 (read-only query)

**Inspection Results**:

| Inspection Item | Result | Description |
| -------- | -------- | -------------------- |
| QD-T-1.1 | ✅ PASS | Base fields complete |
| QD-T-1.2 | ✅ PASS | required references defined fields |
| QD-T-1.4 | ℹ️ P2 | additionalProperties not declared |
| QD-T-1.5 | ✅ PASS | name is legal and unique |
| QD-T-2.1 | ℹ️ P2 | city has no maxLength |
| QD-T-4.1 | ℹ️ P2 | description lacks scope/return summary |
| QD-T-4.4 | ✅ PASS | city has a description |
| Other items | Not applicable | No enum/number/array/time/pagination/dependency, etc. |

**Remediation Recommendation**:

```json
{
  "name": "get_weather",
  "description": "Get weather information for a specified city. Returns current temperature, humidity, and weather conditions.",
  "inputSchema": {
    "type": "object",
    "properties": {
      "city": {
        "type": "string",
        "description": "City name, e.g., Beijing, Shanghai, Guangzhou",
        "maxLength": 50
      }
    },
    "required": ["city"],
    "additionalProperties": false
  }
}
```

<a id="352-l3-example-user-deletion-tool"></a>
#### 3.5.2 L3 Example: User Deletion Tool

**Tool Definition**:

```json
{
  "name": "delete_user",
  "description": "Delete user",
  "inputSchema": {
    "type": "object",
    "properties": {
      "user_id": {
        "type": "string",
        "description": "User ID"
      },
      "tenantId": {
        "type": "string",
        "description": "Tenant ID"
      },
      "force": {
        "type": "boolean",
        "description": "Force delete"
      }
    },
    "required": ["user_id"]
  }
}
```

**Operational Risk Level Determination**: L3 (irreversible operation)

**Inspection Results**:

| Inspection Item | Result | Description |
| -------- | ----- | --------------------- |
| QD-T-1.1 | ✅ PASS | Base fields complete |
| QD-T-1.2 | ✅ PASS | required references defined fields |
| QD-T-1.4 | ⚠️ P1 | additionalProperties not declared |
| QD-T-2.1 | ⚠️ P1 | user_id has no maxLength |
| QD-T-3.1 | ⛔ P0 | Deletion is an irreversible side effect and is not declared |
| QD-T-3.4 | ⛔ P0 | Exposes internal parameter tenantId |
| QD-T-4.1 | ⚠️ P1 | description is too simple |

**Remediation Recommendation**:

```json
{
  "name": "delete_user",
  "description": "Delete the specified user. This operation is irreversible and permanently deletes user data; proceed with caution.",
  "inputSchema": {
    "type": "object",
    "properties": {
      "user_id": {
        "type": "string",
        "description": "Unique user identifier",
        "maxLength": 50
      },
      "force": {
        "type": "boolean",
        "description": "Whether to force deletion (even if associated data exists). Force deletion requires backend verification that the caller has administrator privileges.",
        "default": false
      }
    },
    "required": ["user_id"],
    "additionalProperties": false
  }
}
```

(tenantId should be obtained from context and should not be exposed in the Schema)

<a id="36-part-summary"></a>
### 3.6 Part Summary

This part defines the **tiered inspection mechanism** for Tool Schemas, providing differentiated inspection intensity based on the Tool's Operational Risk Level.

**Core Points**:

- Determine the Operational Risk Level (OR-L1/OR-L2/OR-L3) based on operation type
- Different Operational Risk Levels correspond to different inspection intensities
- Defect levels may be upgraded based on the Operational Risk Level
- The standardized inspection process ensures inspection consistency

**Inspection Item Statistics**:

- L1: 22 inspection items (including 2 transferred to cross; 20 scored)
- L2: 27 inspection items (including 2 transferred to cross; 25 scored)
- L3: 27 inspection items (including 2 transferred to cross; 25 scored)

---

## Part 4: Schema Change and Compatibility Inspection

<a id="41-positioning-of-this-part"></a>
### 4.1 Positioning of This Part

<!-- PENDING: E-3 -->

<a id="411-inspection-objective"></a>
#### 4.1.1 Inspection Objective

This part inspects whether **Tool Schema changes introduce new risks or compatibility issues**. It does not address change management processes.

<a id="412-inspection-scope"></a>
#### 4.1.2 Inspection Scope

```
Schema Change Inspection
├─ Breaking Change Identification
│   ├─ Field deletion
│   ├─ Field type modification
│   ├─ New required field addition
│   └─ Enum value modification
│
├─ Compatibility Assessment
│   ├─ New optional field (compatible)
│   ├─ Relaxed constraint (compatible)
│   └─ Tightened constraint (potentially incompatible)
│
└─ Impact Scope Assessment
    ├─ Single-Tool impact
    ├─ Multi-Tool impact
    └─ System-level impact
```

<a id="42-compatibility-inspection"></a>
### 4.2 Compatibility Inspection

#### QD-T-5.1 Breaking Change Determination

**Definition**: Identify Schema changes that may cause existing invocations to fail. Severity is given by the §4.3.1 matrix per level; this section provides only compatibility facts and no longer directly assigns P levels.

**An uncontrolled breaking change = P0**. "Controlled" is defined as: version isolation/parallel versions or migration assurance, declared in the change notes.

**Change Compatibility Classification**:

| Change Type | Compatibility | Description |
| ----------------------- | ---- | ------------------------------- |
| Delete field | Breaking | Existing invocations may pass this field |
| Modify field type | Breaking | Existing invocations may pass an incorrect type |
| Add required field | Breaking | Existing invocations lack this field |
| Delete enum value | Breaking | Existing invocations may use this value |
| Tighten constraint | Conditionally compatible | Existing invocations may not satisfy the new constraint |
| Add optional field | Compatible | Fully compatible |
| Add enum value (input Schema) | Compatible | Expanding the enum set is backward compatible; only additions to output Schema enums require attention |
| Relax constraint (including removal from required) | Compatible | Constraint relaxed; generally compatible |
| Semantic change (see QD-T-5.3) | Conditionally compatible | Structure unchanged but semantics changed |

**Inspection Rules**:

- Compare old and new Schemas
- Identify change types
- Assess destructiveness and compatibility
- Output a change impact report

#### QD-T-5.2 Change Impact Assessment Omission or Error

**Definition**: The Schema change notes do not declare the impact scope, or the declared impact scope clearly does not match the facts.

**Check Content**:

- Whether the change notes declare **caller impact** (Agents using this Tool, invocation frequency, urgent invocation scenarios)
- Whether the change notes declare **data impact** (stored data, data migration, data consistency)
- Whether the change notes declare **system impact** (other Tools, system configuration, monitoring and alerting)

**Defect Level**: `OR-L1` P1 / `OR-L2` P1 / `OR-L3` P0

**Inspection Method**: Semi-automated

#### QD-T-5.3 Semantic Change

**Definition**: The field structure is unchanged, but semantics such as description, Tool name, default, unit, query scope, or side effects have changed. Deprecated fields SHOULD be marked with `deprecated` and retain old behavior for transition.

**Check Points**:

- Whether description semantic changes affect the LLM's invocation decisions
- Whether default changes alter default behavior
- Whether unit/time zone/currency changes affect numeric interpretation
- Whether query scope/side effect changes expand the impact surface
- Whether `deprecated` is used to declare deprecation and retain a transition

**Defect Level**: Per the §4.3.1 matrix (L1 P1 / L2 P1 / L3 P0)

**Inspection Method**: Automated + human

<a id="43-change-risk-assessment"></a>
### 4.3 Change Risk Assessment

<a id="431-risk-assessment-matrix"></a>
#### 4.3.1 Risk Assessment Matrix

| Change Type | L1 Tool | L2 Tool | L3 Tool |
| ----------------------- | ----- | ----- | ----- |
| Delete field | P1 | P0 | P0 |
| Modify field type | P1 | P0 | P0 |
| Add required field | P1 | P0 | P0 |
| Delete enum value | P1 | P0 | P0 |
| Tighten constraint | P2 | P1 | P0 |
| Add optional field | P2 | P2 | P2 |
| Add enum value (input Schema) | P2 | P2 | P2 |
| Relax constraint (including removal from required) | P2 | P2 | P2 |
| Semantic change | P1 | P1 | P0 |

<a id="432-change-inspection-process"></a>
#### 4.3.2 Change Inspection Process

```
Step 1: Identify change types
    ├─ Compare old and new Schemas
    └─ Flag all change points

Step 2: Assess destructiveness
    ├─ Determine the destructiveness of each change
    └─ Flag high-risk changes

Step 3: Assess impact scope
    ├─ Query caller information
    └─ Assess impact level

Step 4: Composite risk assessment
    ├─ Combine with Tool Operational Risk Level
    ├─ Combine with change destructiveness
    └─ Combine with impact scope
    └─ Output risk assessment report
```

<a id="44-part-summary"></a>
### 4.4 Part Summary

This part defines the **compatibility inspection and risk assessment** for Tool Schema changes, helping to identify and assess the risks changes may introduce.

**Core Points**:

- Breaking changes require focused attention
- Tools at different Operational Risk Levels have different sensitivity to changes
- The impact scope of changes must be comprehensively assessed

**Inspection Item Statistics**:

- Change type identification: 9 types
- Impact scope assessment: 3 dimensions
- Risk assessment matrix: 27 combinations

---

## Part 5: Quantitative Scoring Mechanism

<a id="51-scoring-principles"></a>
### 5.1 Scoring Principles

| Principle | Description |
| ------ | -------------------------- |
| Total score of 100 | Deduction-based: baseline score (100) − defect deductions |
| Weight ratio | P0 : P1 : P2 = 5 : 3 : 1 |
| Level differentiation | Different Agents have different inspection item counts; per-item weight adjusts automatically |
| Mathematical self-consistency | After all defect deductions, minimum score ≥ 0; maximum score = 100 |
| Simple rule | For the same inspection item number, the weight is deducted only once regardless of how many defect instances are found |
| Gate condition | Any P0 defect → evaluation FAIL (score is still output) |

**Four-State Inspection Result**: Each inspection item has one of the following four states:

- **Applicable**: normal determination (P0/P1/P2 or pass).
- **Not Applicable**: the inspection item does not apply to this Tool (e.g., QD-T-2.4 is not applicable if there is no array parameter); not-applicable items are removed from the weight denominator in §5.2.1.
- **Undeterminable**: cannot be graded due to PENDING alignment or lack of evidence; it is counted at the highest possible level and flagged in the report.
- **Exempted**: exemption approved through the Appendix D process; removed from the denominator and flagged in the report.

**Score Comparability Scope**: scores are comparable only within the same specification version, the same risk level, and the same inspection scope.

**Instance Counting**: scoring retains the "deduct only once per number" rule, but reports MUST also output the number of affected Tools, the number of instances, and the ratio.

<a id="52-calculation-steps"></a>
### 5.2 Calculation Steps

<!-- PENDING: E-2 -->

Step 1: Determine the Operational Risk Level  
Determine according to the `OR-L` definitions in Part 3, Section 3.1 of this document.

Step 2: Calculate Total Weight  
Total Weight = P0 inspection item count × 5 + P1 inspection item count × 3 + P2 inspection item count × 1

Step 3: Calculate Base Score  
Base Score = 100 / Total Weight

Step 4: Determine Per-Defect Deduction Values

- P0 defect deduction = Base Score × 5
- P1 defect deduction = Base Score × 3
- P2 defect deduction = Base Score × 1

Step 5: Calculate Total Deduction  
Total Deduction = Σ(deduction for each inspection item number, using the highest severity level)  
Note: The same inspection item is deducted only once, regardless of how many defect instances are found.

Step 6: Calculate Actual Score  
Actual Score = max(100 − Total Deduction, 0)

Step 7: Gate Determination

- If any P0 defect exists: evaluation result = FAIL (score is still output)
- Otherwise: evaluation result = PASS

<a id="521-inspect-tool-inspection-item-distribution-table"></a>
### 5.2.1 Inspect Tool Inspection Item Distribution Table

> Note: P0/P1/P2 counts come from the "Tiered Inspection Checklist (3.3)" for the corresponding Operational Risk Level in this document. PENDING items to be aligned are counted at the level marked in the checklist (provisionally at the highest possible level, see 5.1); conditionally upgraded items are counted at their base level.

| Operational Risk Level | Scored Items | P0 Count | P1 Count | P2 Count | Total Weight | Base Score |
| ------- | ----- | ---- | ---- | ---- | ----------------- | --------------- |
| **`OR-L1`** | 20 | 5 | 6 | 9 | $5×5+6×3+9×1=52$ | $100/52≈1.9231$ |
| **`OR-L2`** | 25 | 6 | 19 | 0 | $6×5+19×3+0×1=87$ | $100/87≈1.1494$ |
| **`OR-L3`** | 25 | 10 | 15 | 0 | $10×5+15×3+0×1=95$ | $100/95≈1.0526$ |

<a id="53-defect-deduction-value-table"></a>
### 5.3 Defect Deduction Value Table (Example)

**Using Inspect Tool L1 as an example:**

- Base Score = $100/52≈1.9231$

| Defect Level | Deduction Calculation | Deduction Value |
| ---- | ------- | ------------------ |
| P0 | Base Score × 5 | $1.9231×5≈9.6155$ |
| P1 | Base Score × 3 | $1.9231×3≈5.7693$ |
| P2 | Base Score × 1 | $1.9231×1≈1.9231$ |

<a id="54-scoring-examples"></a>
### 5.4 Scoring Examples

**Example:** `OR-L2` (Medium Risk) Tool, N=5 defects found (involving 4 inspection item numbers)

- Deducted inspection items (deduplicated by inspection item number; only the highest defect level is used):
  - QD-T-1.1 (P0): 1 found (deducted only once regardless of count)
  - QD-T-3.2 (P0): 1 found
  - QD-T-2.1 (P1): 2 found (deducted once at P1 weight)
  - QD-T-4.1 (P1): 1 found

**Deduction Values (`OR-L2`):**

- Total Weight = 87; Base Score = $100/87≈1.1494$
- P0 deduction = Base Score × 5 ≈ $1.1494×5≈5.7471$
- P1 deduction = Base Score × 3 ≈ $1.1494×3≈3.4483$

**Deduction Calculation:**

- Total Deduction = 2 × P0 deduction + 2 × P1 deduction
- Total Deduction ≈ $2×5.7471 + 2×3.4483 = 11.4943 + 6.8966 = 18.3909$
- Score = 100 − Total Deduction ≈ $100 - 18.3909 = 81.6091$

**Gate = FAIL** (P0 defects exist)

**Scoring Report:**

> Fields follow the framework/core.md §5.2 Minimum Finding Record: `finding_id` is the Finding instance ID, `rule_id` is the rule ID; `level` uses the `OR-L` prefix, and the defect severity uses the `Inspect·` prefix in a separate column from `level`.

```json
{
  "check_id": "inspect-20260710-001",
  "framework": "SanityOps/Inspect Tool",
  "level": "OR-L2",
  "result": "FAIL",
  "score": 81.6091,
  "defects": [
    {"finding_id": "F-ORG-20260710-001", "rule_id": "QD-T-1.1", "severity": "Inspect·P0", "status": "open", "found_count": 1},
    {"finding_id": "F-ORG-20260710-002", "rule_id": "QD-T-3.2", "severity": "Inspect·P0", "status": "open", "found_count": 1},
    {"finding_id": "F-ORG-20260710-003", "rule_id": "QD-T-2.1", "severity": "Inspect·P1", "status": "open", "found_count": 2},
    {"finding_id": "F-ORG-20260710-004", "rule_id": "QD-T-4.1", "severity": "Inspect·P1", "status": "open", "found_count": 1}
  ],
  "affected_tools": 2,
  "defect_instances": 5,
  "instance_ratio": "4/5 inspection items"
}
```

<a id="55-multi-defect-handling-rules"></a>
### 5.5 Multi-Defect Handling Rules

**Rule**: The same inspection item is deducted only once, regardless of how many defect instances are found.

**Examples**:

- QD-T-3.2 (P0 inspection item): 3 P0 defects found → deduct the P0 deduction value (once only)
- QD-T-4.1 (P1 inspection item): 2 P1 defects found → deduct the P1 deduction value (once only)

---

## Appendix A: Minimum Rule Sets

<a id="a1-l1-minimum-rule-set-20-items"></a>
### A.1 L1 Minimum Rule Set (20 Items)

**Must-Pass Items (P0)**:

- QD-T-1.1 Base Field Missing (P0)
- QD-T-1.2 required References Undefined Field (P0)
- QD-T-1.5 Name Validity and Uniqueness (P0)
- QD-T-3.4 Authorization Context Parameter Exposure (triggered by parameter characteristics; provisional P0, see E-14)
- QD-T-3.7 Undeclared Operation Allowlist for Parameterized Tools (P0)

**P1 Recommended-Pass Items**:

- QD-T-1.3 enum–type Conflict (duplicate values P2)
- QD-T-1.6 Constraint Self-Consistency and default
- QD-T-2.6 Query Without Pagination/Cap
- QD-T-2.7 Parameter Dependency/Exclusivity
- QD-T-3.2 Untrusted Input Executable Context (by characteristic)
- QD-T-4.5 description–Schema Inconsistency

**P2 Recommended-Pass Items**:

- QD-T-1.4 Inappropriate additionalProperties Policy
- QD-T-1.7 Missing type/Complexity
- QD-T-2.1 String Without maxLength
- QD-T-2.2 Missing Format Contract
- QD-T-2.3 Number/Integer Without Boundary
- QD-T-2.4 Array Without maxItems
- QD-T-2.5 Unit/Precision/Time Zone/Currency
- QD-T-4.1 description Quality
- QD-T-4.4 Missing Parameter-Level description

<a id="a2-l2-minimum-rule-set-25-items"></a>
### A.2 L2 Minimum Rule Set (25 Items)

**Must-Pass Items (P0)**:

- QD-T-1.1 Base Field Missing (P0)
- QD-T-1.2 required References Undefined Field (P0)
- QD-T-1.5 Name Validity and Uniqueness (P0)
- QD-T-3.2 Untrusted Input Executable Context (P0, by characteristic)
- QD-T-3.4 Authorization Context Parameter Exposure (triggered by parameter characteristics; provisional P0, see E-14)
- QD-T-3.7 Undeclared Operation Allowlist for Parameterized Tools (P0)

**P1 Recommended-Pass Items**:

- QD-T-1.3 enum–type Conflict (duplicate values P2)
- QD-T-1.4 Inappropriate additionalProperties Policy
- QD-T-1.6 Constraint Self-Consistency and default
- QD-T-1.7 Missing type/Complexity
- QD-T-2.1 to QD-T-2.7 (parameter constraints)
- QD-T-3.1 State Change and Material Side Effect Declaration
- QD-T-3.3 Batch/Range Write Operation Without Cap
- QD-T-3.6 Dangerous Default/Operation Scope
- QD-T-4.1 description Quality
- QD-T-4.4 Missing Parameter-Level description
- QD-T-4.5 description–Schema Inconsistency
- QD-T-4.6 Sensitive Input Handling Declaration
- QD-T-4.7 Missing Output Contract (outputSchema; cross-Tool data flow P0)

<a id="a3-l3-minimum-rule-set-25-items"></a>
### A.3 L3 Minimum Rule Set (25 Items)

**Must-Pass Items (P0)**:

- QD-T-1.1 Base Field Missing (P0)
- QD-T-1.2 required References Undefined Field (P0)
- QD-T-1.5 Name Validity and Uniqueness (P0)
- QD-T-2.5 Unit/Precision/Time Zone/Currency (P0, critical parameters)
- QD-T-3.1 State Change and Material Side Effect Declaration (P0)
- QD-T-3.2 Untrusted Input Executable Context (P0, by characteristic)
- QD-T-3.3 Batch/Range Write Operation Without Cap (P0)
- QD-T-3.4 Authorization Context Parameter Exposure (P0)
- QD-T-3.6 Dangerous Default/Operation Scope (P0)
- QD-T-3.7 Undeclared Operation Allowlist for Parameterized Tools (P0)

**P1 Recommended-Pass Items**:

- QD-T-1.3 enum–type Conflict (duplicate values P2)
- QD-T-1.4 Inappropriate additionalProperties Policy
- QD-T-1.6 Constraint Self-Consistency and default (high-risk parameters P0)
- QD-T-1.7 Missing type/Complexity
- QD-T-2.1 String Without maxLength (executable/external interface fields P0)
- QD-T-2.2 Missing Format Contract
- QD-T-2.3 Number/Integer Without Boundary (amount/quantity P0)
- QD-T-2.4 Array Without maxItems
- QD-T-2.6 Query Without Pagination/Cap
- QD-T-2.7 Parameter Dependency/Exclusivity
- QD-T-4.1 description Quality
- QD-T-4.4 Missing Parameter-Level description
- QD-T-4.5 description–Schema Inconsistency
- QD-T-4.6 Sensitive Input Handling Declaration
- QD-T-4.7 Missing Output Contract (outputSchema; cross-Tool data flow P0)

---

## Appendix B: QD-T Complete Numbering Index

> **Scoring Caliber Note**: This table is a complete index. Among these, `QD-T-5.x` (Schema Changes) are **change management rules** that are triggered only when an artifact version changes and an old/new Schema comparison object exists; they are not counted in the static inspection denominator of 5.2.1 (20/25/25).

| ID | Defect Name | Category | Defect Level (OR-L1/OR-L2/OR-L3) | Inspection Method |
| -------- | ------------------------ | --------- | --------------------------------- | ----- |
| QD-T-1.1 | Base Field Missing | Structural Validity | P0/P0/P0 | Automated |
| QD-T-1.2 | required References Undefined Field | Structural Validity | P0/P0/P0 | Automated |
| QD-T-1.3 | enum–type Conflict / Duplicate Values | Structural Validity | P1 / P2 | Automated |
| QD-T-1.4 | Inappropriate additionalProperties Policy | Structural Validity | P2/P1/P1 | Automated |
| QD-T-1.5 | Name Validity and Uniqueness | Structural Validity | P0 (style P2) | Automated |
| QD-T-1.6 | Constraint Self-Consistency and default | Structural Validity | P1/P1/P1 (L3 high-risk parameters P0) | Automated |
| QD-T-1.7 | Missing type / Complexity | Structural Validity | P2/P1/P1 | Automated |
| QD-T-2.1 | String Without maxLength | Parameter Constraints | P2/P1/P1 (L3 executable/external interface fields P0) | Automated |
| QD-T-2.2 | Missing Format Contract | Parameter Constraints | P2/P1/P1 | Semi-automated |
| QD-T-2.3 | Number/Integer Without Boundary | Parameter Constraints | P2/P1/P1 (L3 amount/quantity P0) | Automated |
| QD-T-2.4 | Array Without maxItems | Parameter Constraints | P2/P1/P1 | Automated |
| QD-T-2.5 | Unit/Precision/Time Zone/Currency | Parameter Constraints | P2/P1/P0 (critical parameters) | Semi-automated |
| QD-T-2.6 | Query Without Pagination/Cap | Parameter Constraints | P1/P1/P1 | Automated |
| QD-T-2.7 | Parameter Dependency/Exclusivity | Parameter Constraints | P1/P1/P1 | Semi-automated |
| QD-T-3.1 | State Change and Material Side Effect Declaration | High-Risk Operations | –/P1/P0 | Human |
| QD-T-3.2 | Untrusted Input Executable Context | High-Risk Operations | P1/P0/P0 (by characteristic) | Semi-automated |
| QD-T-3.3 | Batch/Range Write Operation Without Cap | High-Risk Operations | –/P1/P0 | Semi-automated |
| QD-T-3.4 | Authorization Context Parameter Exposure | High-Risk Operations | Triggered by parameter characteristics / Triggered by parameter characteristics / P0 | Human |
| QD-T-3.5 | Cross-Tool Data Flow | High-Risk Operations | Transferred to cross QD-TT-5.1 | Semi-automated |
| QD-T-3.6 | Dangerous Default/Operation Scope | High-Risk Operations | –/P1/P0 | Automated + human |
| QD-T-3.7 | Undeclared Operation Allowlist for Parameterized Tools | High-Risk Operations | P0/P0/P0 | Semi-automated |
| QD-T-4.1 | description Quality | Semantic Clarity | P2/P1/P1 | Semi-automated |
| QD-T-4.2 | Undeclared Side Effects (merged into QD-T-3.1) | Semantic Clarity | Merged | – |
| QD-T-4.3 | Multi-Tool Semantic Competition | Semantic Clarity | Transferred to cross QD-TT-5.2 | Semi-automated |
| QD-T-4.4 | Missing Parameter-Level description | Semantic Clarity | P2/P1/P1 | Automated |
| QD-T-4.5 | description–Schema Inconsistency | Semantic Clarity | P1/P1/P1 | Semi-automated |
| QD-T-4.6 | Sensitive Input Handling Declaration | Semantic Clarity | –/P1/P1 | Semi-automated |
| QD-T-4.7 | Missing Output Contract (outputSchema) | Semantic Clarity | –/P1/P1 (cross-Tool data flow P0) | Semi-automated |
| QD-T-5.1 | Breaking Change Determination | Schema Changes | Per §4.3.1 matrix | Automated |
| QD-T-5.2 | Change Impact Assessment Omission or Error | Schema Changes | P1/P1/P0 | Semi-automated |
| QD-T-5.3 | Semantic Change | Schema Changes | P1/P1/P0 | Automated + human |

---

## Appendix C: Tool Overview

The inspection tooling for this specification provides automated detection, assisted review, and report generation; rules requiring business semantics or implementation evidence are confirmed by the responsible party.

<a id="c1-tool-formats"></a>
### C.1 Tool Formats

- **Integration Options**: CI/CD pipeline, IDE plugin, Schema Registry integration

<a id="c2-quick-start"></a>
### C.2 Quick Start

Visit the [SanityOps Tools Website](https://www.sanityops.org/framework/try-the-tools) for detailed information.

---

## Appendix D: Exemptions and Risk Acceptance

<!-- PENDING: E-5 -->

<a id="d1-exemption-application-conditions"></a>
### D.1 Exemption Application Conditions

Exemptions may be applied for under the following circumstances:

- Legacy Tools that cannot be remediated in the short term
- Third-party Tools whose Schemas are beyond the organization's control
- Business urgency requiring temporary risk acceptance

<a id="d2-risk-acceptance-statement"></a>
### D.2 Risk Acceptance Statement

For defects that cannot be remediated, a Risk Acceptance statement must be signed:

- Risk Description: Clearly state the defect content and impact
- Impact Scope: Clearly identify the systems that may be affected
- Responsibility Confirmation: Clearly identify the responsible party and validity period

## Appendix E: Pending Cross-Spec Alignment

The items below involve responsibility boundaries with other subsets (Core / Inspect Cross / Inspect Permission / Risk / Quality / Relevance). This specification does not decide them unilaterally without consulting the corresponding subset documents. The corresponding positions in the body text are marked with `<!-- PENDING: E-x -->` (proposed new-rule items E-16 / E-18 and cross-comparison items E-20 / E-21 have no body-text anchor yet and are registered only in this table). Each item lists the rules involved, the issue, the dependent subset (see the corresponding document for details), and the disposition recommendations for both cases.

| ID | Status | Rules/Sections Involved | Issue | Dependent Subset (see details) | If covered → | If not covered → |
| ---- | ---- | ---- | ---- | ---- | ---- | ---- |
| E-1 | ✅ Resolved | Glossary, §3.1, §3.5 report level field | L1/L2/L3 assigned per Tool or per Agent; mixed usage | Core (framework/core.md Appendix A) | Cite the Core definition; add only mixed-level rules | Define both Tool risk level and Agent risk level |
| E-2 | ⏳ Pending alignment | §5.2, §5.3, "deduct once per number" | Insufficient scoring discrimination; disconnected from Ratchet/Baseline | Core (framework/core.md Baseline/Ratchet) | Declare that scoring is not used as a Ratchet basis | Switch to fixed deductions or instance-level scoring |
| E-3 | ⏳ Pending alignment | QD-T-5.x, §4, Appendix B | Change inspection not wired into checklist/scoring/Gate | Core (framework/core.md Gate) | Cross-reference the version Diff gate | Define an independent Diff gate |
| E-4 | ⏳ Pending alignment | §3.4 flow diagram | Only the automated stage blocks on P0; no loop-back; fail-fast report incomplete | Core / Inspect overview (inspect/index.md) | Delete the self-built flow and cite instead | Switch to full inspection, unified Gate, and add loop-back |
| E-5 | ⏳ Pending alignment | Appendix D | Exemptions lack approver/validity cap/review; whether P0 can be exempted | Core (framework/core.md exception management) | Keep only Tool-specific exemption conditions | Complete the closed loop; P0 exemption requires compensating controls |
| E-6 | ⏳ Pending alignment | §3.5 report format | Inspect PASS and release PASS are not distinguished | Core (framework/core.md report/Gate) | Cite Core fields | Add inspect_result and release_gate_result |
| E-7 | ✅ Resolved | Global L→P upgrade rules; L3 almost entirely P0 | Severity mechanically determined by L level | Core / Inspect overview | Re-determine after horizontal alignment with Prompt/Skill | Severity determined by consequence/reachability/scope/existing controls |
| E-8 | ✅ Resolved | §0.2.3 🔴🟡🟢, §1.5/§2.3, §5.2 impact levels | Risk symbols unused; high/medium/low ambiguous; impact levels reuse P0/P1/P2 | Core / Inspect overview | Add unified symbols and impact classification | Delete the parallel symbol system; change impact levels to I1/I2/I3 |
| E-9 | ✅ Resolved | §0.2.5 vs §3.2.1 | P1 "requires fix" vs "recommended fix" | Core (framework/core.md) | Unify according to Core | Unify as "requires fix" |
| E-10 | ✅ Resolved | QD-T-5.2 | Assessment activity was coded as a defect; depends on runtime invocation data | Core / Quality (quality/tool-agent.md) | Renamed "Change Impact Assessment Omission or Error"; levels P1/P1/P0 added | — |
| E-11 | ✅ Resolved | QD-T-3.5 Cross-Tool Data Flow | Current definition makes every multi-tool Agent non-compliant | Inspect Cross (inspect/cross.md) | Landed as QD-TT-5.1 | — |
| E-12 | ✅ Resolved | QD-T-4.3 Multi-Tool Semantic Competition | Inspection object is a Tool set; the single-Tool process cannot execute it | Inspect Cross (inspect/cross.md) | Landed as QD-TT-5.2 | — |
| E-13 | ✅ Resolved | New outputSchema / output contract | Whether it is mandatory depends on Cross | Inspect Cross (inspect/cross.md) | Landed as QD-T-4.7 | — |
| E-14 | ⏳ Pending alignment | QD-T-3.4 Authorization Context Parameter Exposure | Judging defects by field name is too broad | Inspect Permission (inspect/permission.md) | Narrow to pure Schema signals and cite QD-PM | Narrow the definition; trigger P0 at all three levels by parameter characteristics |
| E-15 | ⏳ Pending alignment | §3.1.2 risk determination criteria | Over-reliance on operation names | Inspect Permission (inspect/permission.md) | Cite its grading | Add dimensions such as data sensitivity/impact scope/financial consequence |
| E-16 | ✅ Resolved | New description poisoning check | Manipulative text | Risk Explicit (risk/explicit.md) | Do not add; only add a cross-reference | Add QD-T-3.9, P0 all levels (3.7 already used for parameterized tool operation allowlist) |
| E-17 | ⏳ Pending alignment | QD-T-3.2 narrowed evidence source | Determination conclusion depends on implementation evidence | Risk Explicit / Risk Implicit (risk/explicit.md, risk/implicit.md) | tool.md retains only Schema signals | Retain the manual confirmation step |
| E-18 | ⏳ Not landed | New idempotency/retry semantics declaration | Loop retries cause duplicate orders/transfers | Quality Tool-Agent / Relevance (quality/tool-agent.md, framework/relevance.md) | Retain the declaration-layer check but the P level may be lowered | Add QD-T-3.8 |
| E-19 | ✅ Resolved | QD-T-3.1 wording | Confirmation/approval bearing relationship | Inspect Permission / Relevance (inspect/permission.md, framework/relevance.md) | State the bearing subset | Keep neutral wording |
| E-20 | ⏳ Pending alignment | Numbering categories 1–5 vs chapter correspondence | Whether it is a unified template for Inspect | Inspect Prompt/Skill/overview (inspect/prompt.md, inspect/skill.md, inspect/index.md) | Do not change the structure | Allow A-12 chapter adjustments |
| E-21 | ⏳ Pending alignment | Part 5 unified rule table | Needs horizontal comparison with Prompt/Skill rules at the same level | Inspect Prompt/Skill (inspect/prompt.md, inspect/skill.md) | Fine-tune after alignment | Keep this table |

> **Resolved Items (2026-10)**:
> - E-1 ✅ Resolved—`OR-L` placement (see §3.1 heading, glossary, and report `level` field prefix);
> - E-7 ✅ Resolved—severity decoupled from mechanical L-level mapping (core.md §4.1 rules that "severity is determined by `OR-L` and applicability by `AC-L`");
> - E-8 ✅ Resolved—deleted the §0.2.3 🔴🟡🟢 risk symbol table (core.md §4.1 adds the exclusivity constraint for P symbols);
> - E-9 ✅ Resolved—the P0/P1/P2 wording in §3.2.1 aligned with §0.2.5 (P1 unified as "requires fix, recommended before release");
> - E-11, E-12 ✅ Transferred to Inspect Cross, landed as QD-TT-5.1 / QD-TT-5.2 (cross.md Part 4.7); this specification retains a P2 lead;
> - E-13 ✅ Landed as QD-T-4.7 (this specification §2.2.3), default L2/L3 P1, upgraded to P0 when a cross-Tool data flow (QD-TT-5.1) is hit;
> - E-16 ✅ Handled via the "add cross-reference only" path—instruction injection in the tool description field belongs to Risk Explicit `NR-S-5`, and QD-T-4.1 has a cross-subset attribution note; QD-T-3.9 is not added;
> - E-19 ✅ Closed—QD-T-3.1 wording bears to Inspect Permission QD-PM-6.3, and permission has been unified to the "human decision point (pre-authorization/confirmation/approval all acceptable)" caliber;
>
> **Items Pending Alignment / Not Landed**: E-2/3/4/5/6/10 → Core; E-14/15 → Permission or narrowing within tool; E-17 → Risk; E-18 → Quality/Tool-Agent (`QD-T-3.8` remains a candidate number and is not landed); E-20/21 → Prompt/Skill/Tool template cross-comparison. The above are deferred to the respective subset version updates and do not block this round of cross alignment.

**End of Document**

---

© 2026 Sanity AI Labs. Licensed under Creative Commons Attribution-ShareAlike 4.0 International.
https://www.sanityops.org  ·  hello@sanityops.org
v1.0  ·  October 2026
