# SanityOps Framework

# Inspect Tool Specification

---

**Version**: v1.0

**Release Date**: July 2026

**Maintainer**: SanityOps Inspect Working Group

**License**: CC BY 4.0

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
- [Part 2: Parameter Constraint and High-Risk Operation Defects](#part-2-parameter-constraint-and-high-risk-operation-defects)
  - [2.1 Positioning of This Part](#21-positioning-of-this-part)
  - [2.2 Defect Classification](#22-defect-classification)
  - [2.3 Severity Classification](#23-severity-classification)
  - [2.4 Detection Method: Checklist Mechanism](#24-detection-method-checklist-mechanism)
  - [2.5 Part Summary](#25-part-summary)
- [Part 3: Tiered Inspection Mechanism](#part-3-tiered-inspection-mechanism)
  - [3.1 Tool Risk Level Definitions](#31-tool-risk-level-definitions)
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
  - [A.1 L1 Minimum Rule Set](#a1-l1-minimum-rule-set-7-items)
  - [A.2 L2 Minimum Rule Set](#a2-l2-minimum-rule-set-12-items)
  - [A.3 L3 Minimum Rule Set](#a3-l3-minimum-rule-set-16-items)
- [Appendix B: QD-T Complete Numbering Index](#appendix-b-qd-t-complete-numbering-index)
- [Appendix C: Tool Overview](#appendix-c-tool-overview)
  - [C.1 Tool Formats](#c1-tool-formats)
  - [C.2 Quick Start](#c2-quick-start)
- [Appendix D: Exemptions and Risk Acceptance](#appendix-d-exemptions-and-risk-acceptance)
  - [D.1 Exemption Application Conditions](#d1-exemption-application-conditions)
  - [D.2 Risk Acceptance Statement](#d2-risk-acceptance-statement)

---

## Foreword

<a id="01-positioning-and-scope"></a>
### 0.1 Positioning and Scope

<a id="011-what-this-specification-is"></a>
#### 0.1.1 What This Specification Is

This specification is one of the core sub-specifications of the SanityOps Framework. It defines the quality defect inspection standards for **Tool Schemas** in AI Agent systems.

This specification is designed to:

- Identify defects in Tool Schemas across dimensions including Structural Validity, Parameter Constraints, and Semantic Clarity
- Provide a unified inspection framework for Tool Schema design, review, and audit
- Provide explicit rule definitions for automated inspection tooling

<a id="012-what-this-specification-is-not"></a>
#### 0.1.2 What This Specification Is Not

This specification is **not**:

- A Tool development guide: it does not prescribe how to design "good" Tools
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
│   └─ Write operations, sensitive data, Cross-Tool Data Flow
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
SanityOps Six-Subset Framework
│
├─ Inspect (Defect Inspection)
│   ├─ Inspect Tool ← Tool Schema defect inspection ← You are here
│   ├─ Inspect Prompt ← System Prompt defect inspection
│   ├─ Inspect Skill ← Skill defect inspection
│   └─ Inspect Cross ← Cross-Artifact defect inspection
│
├─ Risk (Risk Scanning)
│   ├─ Risk Explicit ← Explicit Logic Artifact risk detection
│   └─ Risk Implicit ← Implicit Agent runtime vulnerability scanning
│
└─ Quality (Service Quality)
    └─ Quality ← Agent and (local) LLM service quality assessment
```

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
| **Agent Level** | The tier (L1/L2/L3) assigned to a Tool based on its operational risk level |
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
- `QD-T-3.4`: High-Risk Operation Defects → Internal Parameter Exposure

<a id="023-risk-level-symbols"></a>
#### 0.2.3 Risk Level Symbols

| Risk Level | Symbol | Definition | Typical Characteristics |
| --- | --- | --- | --- |
| **High Risk** | 🔴 | May cause data loss, permission leaks, or severe consequences | Irreversible operations, sensitive data, Cross-Tool Data Flow |
| **Medium Risk** | 🟡 | May cause data quality issues or functional anomalies | Write operations, insufficient parameter constraints, semantic ambiguity |
| **Low Risk** | 🟢 | May cause reduced efficiency or comprehension difficulty | Query operations, incomplete descriptions, minor defects |

<a id="024-abbreviation-table"></a>
#### 0.2.4 Abbreviation Table

| Abbreviation | Full Name | Meaning |
| --- | --- | --- |
| QD-T | Quality Defect - Tool | Tool Schema Quality Defect |
| RS | Risk Sensitivity | Risk sensitivity level |
| Schema | JSON Schema | JSON data structure definition specification |

<a id="025-defect-level-definitions-p0p1p2"></a>
#### 0.2.5 Defect Level Definitions (P0/P1/P2)

| Defect Level | Symbol | Definition | Disposition Meaning |
| --- | --- | --- | --- |
| **P0** | ⛔ | Blocking | Blocks release; MUST be fixed |
| **P1** | ⚠️ | Warning | Requires fix; recommended before release |
| **P2** | ℹ️ | Advisory | Recommended optimization; MAY be deferred |

<a id="03-version-and-maintenance-information"></a>
### 0.3 Version and Maintenance Information

<a id="031-current-version"></a>
#### 0.3.1 Current Version

- **Version**: v2.3
- **Release Status**: Internal industry specification version
- **Last Updated**: July 2026
- **Maintainer**: SanityOps Working Group

<a id="032-version-history"></a>
#### 0.3.2 Version History

| Version | Release Date | Major Changes |
| --- | --- | --- |
| v2.3 | 2026-07 | Added standardized foreword, Tool Risk Level definitions, tiered inspection mechanism |
| v2.2 | 2026-07 | Added QD-T numbering system; completed rule code index |
| v2.1 | 2026-06 | Added high-risk operation inspection, Cross-Tool Data Flow inspection |
| v2.0 | 2026-05 | Restructured as a formal specification; added parameter constraint inspection |

<a id="033-applicability-statement"></a>
#### 0.3.3 Applicability Statement

This specification v2.3 applies to the Tool Schema quality inspection phase of the SanityOps Framework. When using this specification for Tool quality inspection, all requirements of the corresponding version SHALL be followed.

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
├─ Required Field Correctness
│   └─ Whether the required list matches properties
│
├─ Enum Constraint Validity
│   └─ Whether enum values are valid and free of duplicates
│
└─ additionalProperties Control
    └─ Whether additional properties are explicitly prohibited or declared
```

<a id="113-relationship-to-other-parts"></a>
#### 1.1.3 Relationship to Other Parts

```
Part 1: Structural Validity ← Foundation Layer
    ↓ Ensures the Tool can be correctly parsed
Part 2: Parameter Constraints and High-Risk Operations ← Completeness Layer
    ↓ Ensures parameters are adequately constrained
Part 3: Tiered Inspection Mechanism ← Inspection Layer
    ↓ Determines inspection intensity based on risk level
Part 4: Schema Changes ← Change Layer
    ↓ Inspects whether changes introduce risk
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
#### 1.2.2 Required Field Inconsistency (QD-T-1.2)

**Definition**: The required list contains fields not present in properties, or required fields are not listed in required.

**Defect Example**:

❌ Incorrect:

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

required includes "date," but "date" is not defined in properties.

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

- Schema validation may fail
- The LLM may be misled into invoking required parameters

**Defect Level**: P0

<a id="123-invalid-enum-constraints-qd-t-13"></a>
#### 1.2.3 Invalid Enum Constraints (QD-T-1.3)

**Definition**: The enum field definition is invalid, including empty values, duplicate values, or type inconsistencies.

**Defect Example**:

❌ Incorrect:

```json
{
  "type": "string",
  "enum": ["active", "inactive", "active"]
}
```

Duplicate values exist in the enum.

✅ Correct:

```json
{
  "type": "string",
  "enum": ["active", "inactive", "pending"]
}
```

**Impact**:

- Parameter validation may fail
- The LLM may select incorrect values

**Defect Level**: P1

<a id="124-uncontrolled-additionalproperties-qd-t-14"></a>
#### 1.2.4 Uncontrolled additionalProperties (QD-T-1.4)

**Definition**: Object-type parameters do not explicitly declare additionalProperties, allowing arbitrary extra fields.

**Defect Example**:

❌ Incorrect:

```json
{
  "type": "object",
  "properties": {
    "name": {"type": "string"}
  }
}
```

additionalProperties is not declared; arbitrary extra fields are permitted by default.

✅ Correct:

```json
{
  "type": "object",
  "properties": {
    "name": {"type": "string"}
  },
  "additionalProperties": false
}
```

**Impact**:

- The LLM may pass unexpected fields
- May lead to security risks

**Defect Level**: P1

<a id="13-severity-classification"></a>
### 1.3 Severity Classification

| Defect ID | Defect Name | Defect Level | Description |
| --- | --- | --- | --- |
| QD-T-1.1 | Base Field Missing | P0 | Prevents the Tool from being correctly understood |
| QD-T-1.2 | Required Field Inconsistency | P0 | Causes Schema validation failure |
| QD-T-1.3 | Invalid Enum Constraints | P1 | May cause parameter validation failure |
| QD-T-1.4 | Uncontrolled additionalProperties | P1 | May allow unexpected fields to be passed |

<a id="14-detection-methods"></a>
### 1.4 Detection Methods

The defects in this part can be detected automatically through **JSON Schema format validation**:

```
Detection Tools:
├─ JSON Schema Validator
├─ OpenAPI Schema Validator
└─ Custom Schema Checker

Detection Rules:
├─ Check whether required fields exist
├─ Check whether required and properties are consistent
├─ Check whether enum values are valid
└─ Check whether additionalProperties is explicitly declared
```

<a id="15-part-summary"></a>
### 1.5 Part Summary

This part defines the **basic structural validity inspection** for Tool Schemas, ensuring that Tool definitions can be correctly parsed and understood.

**Core Points**:

- Base fields (name, description, inputSchema) MUST be complete
- The required list MUST be consistent with properties
- Enum constraints MUST be valid and free of duplicates
- additionalProperties MUST be explicitly declared

**Inspection Item Statistics**:

- Inspection item count: 4
- High-risk items: 2
- Medium-risk items: 2

---

## Part 2: Parameter Constraint and High-Risk Operation Defects

<a id="21-positioning-of-this-part"></a>
### 2.1 Positioning of This Part

<a id="211-inspection-objective"></a>
#### 2.1.1 Inspection Objective

This part inspects the **parameter constraint completeness** and **high-risk operation identification** of Tool Schemas, ensuring that parameters are adequately constrained and high-risk operations are explicitly identified.

<a id="212-inspection-dimensions"></a>
#### 2.1.2 Inspection Dimensions

```
Parameter Constraint and High-Risk Operation Inspection
├─ Parameter Constraint Defects (QD-T-2.x)
│   ├─ String Constraints
│   ├─ Number Constraints
│   ├─ Array Constraints
│   └─ Object Constraints
│
├─ High-Risk Operation Defects (QD-T-3.x)
│   ├─ Write Operation Inspection
│   ├─ Sensitive Data Inspection
│   ├─ Internal Parameter Exposure
│   └─ Cross-Tool Data Flow
│
└─ Semantic Clarity Defects (QD-T-4.x)
    ├─ Description Quality
    ├─ Side Effect Declaration
    └─ Multi-Tool Semantic Competition
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

**Definition**: A String-type parameter does not have maxLength or minLength set.

**Defect Example**:

❌ Incorrect:

```json
{
  "name": "content",
  "type": "string",
  "description": "User input content"
}
```

✅ Correct:

```json
{
  "name": "content",
  "type": "string",
  "description": "User input content",
  "maxLength": 1000,
  "minLength": 1
}
```

**Impact**:

- The LLM may pass excessively long strings
- May cause excessive system load or security risks

**Defect Level**: P1 (L1/L2), P0 (L3)

##### QD-T-2.2 String Type Without Format Constraint

**Definition**: A String parameter requiring a specific format does not have pattern or format set.

**Defect Example**:

❌ Incorrect:

```json
{
  "name": "email",
  "type": "string",
  "description": "User email"
}
```

✅ Correct:

```json
{
  "name": "email",
  "type": "string",
  "description": "User email",
  "format": "email"
}
```

**Impact**:

- The LLM may pass incorrectly formatted values
- May cause business logic failures

**Defect Level**: P1 (L2), P0 (L3)

##### QD-T-2.3 Number Type Without Boundary Constraint

**Definition**: A Number-type parameter does not have minimum/maximum or exclusiveMinimum/exclusiveMaximum set.

**Defect Example**:

❌ Incorrect:

```json
{
  "name": "amount",
  "type": "number",
  "description": "Payment amount"
}
```

✅ Correct:

```json
{
  "name": "amount",
  "type": "number",
  "description": "Payment amount",
  "minimum": 0.01,
  "maximum": 100000
}
```

**Impact**:

- The LLM may pass values outside the business range
- May cause calculation errors or security risks

**Defect Level**: P1 (L2), P0 (L3)

##### QD-T-2.4 Array Type Without Length Constraint

**Definition**: An Array-type parameter does not have maxItems or minItems set.

**Defect Example**:

❌ Incorrect:

```json
{
  "name": "ids",
  "type": "array",
  "items": {"type": "string"},
  "description": "User ID list"
}
```

✅ Correct:

```json
{
  "name": "ids",
  "type": "array",
  "items": {"type": "string"},
  "description": "User ID list",
  "maxItems": 100,
  "minItems": 1
}
```

**Impact**:

- The LLM may pass excessively long arrays
- May cause performance issues or denial of service

**Defect Level**: P1 (L2), P0 (L3)

<a id="222-high-risk-operation-defects-qd-t-3x"></a>
#### 2.2.2 High-Risk Operation Defects (QD-T-3.x)

##### QD-T-3.1 Write Operation Not Identified

**Definition**: A Tool that performs write operations does not explicitly state in its description that "this operation will modify data."

**Defect Example**:

❌ Incorrect:

```json
{
  "name": "update_user",
  "description": "Update user information"
}
```

Does not explicitly state that this is a write operation.

✅ Correct:

```json
{
  "name": "update_user",
  "description": "Update user information. [This operation will modify data. Please confirm that parameters are correct.]"
}
```

**Impact**:

- The LLM may misjudge the operation type
- May cause unintended data modifications

**Defect Level**: P1 (L2), P0 (L3)

##### QD-T-3.2 Raw Input Passthrough

**Definition**: The Tool accepts raw user input and passes it directly to backend systems.

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

Directly passes user input.

✅ Correct:

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
      "field": {
        "type": "string",
        "enum": ["id", "name", "email"]
      }
    }
  }
}
```

**Impact**:

- May cause SQL injection, command injection, and other security risks
- May lead to system compromise

**Defect Level**: P0 (L2/L3)

##### QD-T-3.3 Batch Operation Without Limit

**Definition**: A batch operation Tool does not set an operation quantity limit.

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
    }
  }
}
```

**Impact**:

- May cause large-scale accidental data deletion
- May cause system performance issues

**Defect Level**: P0 (L3)

##### QD-T-3.4 Internal Parameter Exposure

**Definition**: The Tool exposes parameters that should be controlled internally by the system, such as tenantId, admin, token, etc.

**Defect Example**:

❌ Incorrect:

```json
{
  "name": "create_user",
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

**Defect Level**: P0 (L3)

##### QD-T-3.5 Cross-Tool Data Flow Risk

**Definition**: The output of one Tool may be used by the LLM as input to another Tool, causing unintended data flow.

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

**Defect Level**: P0 (L3)

<a id="223-semantic-clarity-defects-qd-t-4x"></a>
#### 2.2.3 Semantic Clarity Defects (QD-T-4.x)

##### QD-T-4.1 Insufficient Description Quality

**Definition**: The description of a Tool or parameter is unclear, incomplete, or ambiguous.

**Defect Example**:

❌ Incorrect:

```json
{
  "name": "get_data",
  "description": "Get data"
}
```

The description is overly vague.

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

**Defect Level**: P1 (L2), P0 (L3)

##### QD-T-4.2 Undeclared Side Effects

**Definition**: The Tool's execution produces side effects (e.g., sending emails, modifying data), but these are not declared in the description.

**Defect Example**:

❌ Incorrect:

```json
{
  "name": "submit_form",
  "description": "Submit form"
}
```

Does not state that a confirmation email will be sent.

✅ Correct:

```json
{
  "name": "submit_form",
  "description": "Submit form. [This operation will send a confirmation email to the user's email address.]"
}
```

**Impact**:

- The LLM cannot anticipate the consequences of the operation
- May cause user complaints

**Defect Level**: P1 (L2/L3)

##### QD-T-4.3 Multi-Tool Semantic Competition

**Definition**: Multiple Tools have semantically similar names or descriptions, making it difficult for the LLM to distinguish between them.

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

**Defect Level**: P1 (L3)

<a id="23-severity-classification"></a>
### 2.3 Severity Classification

| Defect Category | Item Count | High-Risk Items | Medium-Risk Items | Low-Risk Items |
| --- | --- | --- | --- | --- |
| Parameter Constraint Defects | 4 | 0 | 4 | 0 |
| High-Risk Operation Defects | 5 | 5 | 0 | 0 |
| Semantic Clarity Defects | 3 | 0 | 3 | 0 |
| **Total** | **12** | **5** | **7** | **0** |

<a id="24-detection-method-checklist-mechanism"></a>
### 2.4 Detection Method: Checklist Mechanism

The defects in this part require **Checklist inspection** combined with **human review**:

```
Detection Process:
├─ Automated Inspection
│   ├─ JSON Schema format validation
│   ├─ Parameter constraint completeness check
│   └─ High-risk keyword scanning
│
├─ Semi-Automated Inspection
│   ├─ Description quality scoring
│   ├─ Multi-Tool semantic similarity calculation
│   └─ Cross-Tool Data Flow analysis
│
└─ Human Review
    ├─ Side effect identification
    ├─ Internal Parameter Exposure review
    └─ Semantic competition confirmation
```

<a id="25-part-summary"></a>
### 2.5 Part Summary

This part defines the **parameter constraint and high-risk operation inspection** for Tool Schemas, ensuring that parameters are adequately constrained and high-risk operations are explicitly identified.

**Core Points**:

- Parameters MUST have explicit constraints
- Write operations MUST be explicitly identified
- Internal parameters MUST be isolated
- Cross-Tool Data Flow MUST be assessed
- Semantics MUST be clear and unambiguous

**Inspection Item Statistics**:

- Inspection item count: 12
- High-risk items: 5
- Medium-risk items: 7

---

## Part 3: Tiered Inspection Mechanism

<a id="31-tool-risk-level-definitions"></a>
### 3.1 Tool Risk Level Definitions

<a id="311-agent-level-classification"></a>
#### 3.1.1 Agent Level Classification

| Agent Level | Designation | Definition | Typical Characteristics |
| --- | --- | --- | --- |
| **Low Risk** | L1 | Read-only query; no state changes | Query, search, retrieve information |
| **Medium Risk** | L2 | State-changing; recoverable | Create, update, send notifications |
| **High Risk** | L3 | Irreversible / sensitive operations | Delete, payment, permission changes |

<a id="312-level-determination-criteria"></a>
#### 3.1.2 Level Determination Criteria

**L1 (Low Risk) Determination Criteria**:

- ✅ Performs data-read operations only
- ✅ Does not involve sensitive data
- ✅ Operations are repeatable with no side effects
- ✅ Failure consequence: query failure only; no other impact

**L2 (Medium Risk) Determination Criteria**:

- ✅ Performs data creation or update operations
- ✅ Changes are recoverable or overwritable
- ⚠️ May involve some sensitive data
- ⚠️ Failure consequence: data quality degradation; human intervention required

**L3 (High Risk) Determination Criteria**:

- ✅ Performs data deletion, payment, permission change, or similar operations
- ✅ Involves highly sensitive data
- ✅ Operations are irreversible or difficult to recover
- ❌ Failure consequence: data loss, financial loss, permission leaks

<a id="313-typical-examples"></a>
#### 3.1.3 Typical Examples

| Agent Level | Typical Tool Examples |
| --- | --- |
| L1 | get_weather, get_current_time, search_products, list_orders |
| L2 | create_user, update_profile, send_notification, add_to_cart |
| L3 | delete_user, process_payment, grant_permission, transfer_data |

<a id="32-defect-level-definitions-p0p1p2"></a>
### 3.2 Defect Level Definitions (P0/P1/P2)

<a id="321-defect-level-classification"></a>
#### 3.2.1 Defect Level Classification

| Defect Level | Symbol | Definition | Typical Defects |
| --- | --- | --- | --- |
| **P0** | ⛔ | MUST be fixed; release is not permitted otherwise | Base field missing, Internal Parameter Exposure, Raw Input Passthrough |
| **P1** | ⚠️ | SHOULD be fixed; may cause functional anomalies | Insufficient parameter constraints, incomplete description |
| **P2** | ℹ️ | MAY be fixed; affects efficiency or readability | Minor description omissions, non-critical field omissions |

<a id="322-defect-level-upgrade-rules"></a>
#### 3.2.2 Defect Level Upgrade Rules

**The same defect may have its defect level upgraded based on the Tool's Agent Level**:

| Defect Example | L1 (Low Risk) | L2 (Medium Risk) | L3 (High Risk) |
| --- | --- | --- | --- |
| String without maxLength | P2 (Advisory) | P1 (Warning) | P0 (Blocking) |
| Number without boundary | P2 (Advisory) | P1 (Warning) | P0 (Blocking) |
| Write operation not identified | — | P1 (Warning) | P0 (Blocking) |
| Internal Parameter Exposure | — | — | P0 (Blocking) |

<a id="33-tiered-inspection-checklist"></a>
### 3.3 Tiered Inspection Checklist

<a id="331-l1-low-risk-inspection-checklist"></a>
#### 3.3.1 L1 (Low Risk) Inspection Checklist

| ID | Inspection Item | Defect Level | Inspection Method |
| --- | --- | --- | --- |
| QD-T-1.1 | Base Field Missing | P0 | Automated |
| QD-T-1.2 | Required Field Inconsistency | P0 | Automated |
| QD-T-1.3 | Invalid Enum Constraints | P1 | Automated |
| QD-T-1.4 | Uncontrolled additionalProperties | P1 | Automated |
| QD-T-2.1 | String Without Length Constraint | P2 | Automated |
| QD-T-2.3 | Number Without Boundary | P2 | Automated |
| QD-T-4.1 | Insufficient Description Quality | P2 | Semi-automated |

**Inspection Item Count**: 7 (P0: 2, P1: 2, P2: 3)

<a id="332-l2-medium-risk-inspection-checklist"></a>
#### 3.3.2 L2 (Medium Risk) Inspection Checklist

| ID | Inspection Item | Defect Level | Inspection Method |
| --- | --- | --- | --- |
| QD-T-1.1 | Base Field Missing | P0 | Automated |
| QD-T-1.2 | Required Field Inconsistency | P0 | Automated |
| QD-T-1.3 | Invalid Enum Constraints | P0 | Automated |
| QD-T-1.4 | Uncontrolled additionalProperties | P0 | Automated |
| QD-T-2.1 | String Without Length Constraint | P1 | Automated |
| QD-T-2.2 | String Without Format Constraint | P1 | Automated |
| QD-T-2.3 | Number Without Boundary | P1 | Automated |
| QD-T-2.4 | Array Without Length Constraint | P1 | Automated |
| QD-T-3.1 | Write Operation Not Identified | P1 | Human |
| QD-T-3.2 | Raw Input Passthrough | P0 | Semi-automated |
| QD-T-4.1 | Insufficient Description Quality | P1 | Semi-automated |
| QD-T-4.2 | Undeclared Side Effects | P1 | Human |

**Inspection Item Count**: 12 (P0: 5, P1: 7, P2: 0)

<a id="333-l3-high-risk-inspection-checklist"></a>
#### 3.3.3 L3 (High Risk) Inspection Checklist

| ID | Inspection Item | Defect Level | Inspection Method |
| --- | --- | --- | --- |
| QD-T-1.1 | Base Field Missing | P0 | Automated |
| QD-T-1.2 | Required Field Inconsistency | P0 | Automated |
| QD-T-1.3 | Invalid Enum Constraints | P0 | Automated |
| QD-T-1.4 | Uncontrolled additionalProperties | P0 | Automated |
| QD-T-2.1 | String Without Length Constraint | P0 | Automated |
| QD-T-2.2 | String Without Format Constraint | P1 | Automated |
| QD-T-2.3 | Number Without Boundary | P0 | Automated |
| QD-T-2.4 | Array Without Length Constraint | P0 | Automated |
| QD-T-3.1 | Write Operation Not Identified | P0 | Human |
| QD-T-3.2 | Raw Input Passthrough | P0 | Semi-automated |
| QD-T-3.3 | Batch Operation Without Limit | P0 | Semi-automated |
| QD-T-3.4 | Internal Parameter Exposure | P0 | Human |
| QD-T-3.5 | Cross-Tool Data Flow Risk | P0 | Semi-automated |
| QD-T-4.1 | Insufficient Description Quality | P0 | Semi-automated |
| QD-T-4.2 | Undeclared Side Effects | P0 | Human |
| QD-T-4.3 | Multi-Tool Semantic Competition | P1 | Semi-automated |

**Inspection Item Count**: 16 (P0: 14, P1: 2, P2: 0)

<a id="34-standard-inspection-process"></a>
### 3.4 Standard Inspection Process

<a id="341-inspection-process-flow"></a>
#### 3.4.1 Inspection Process Flow

```
┌─────────────────────────────────────────────────────────────┐
│                  Tool Schema Inspection Process              │
└─────────────────────────────────────────────────────────────┘
                                   │
                                   ▼
                       ┌───────────────────────┐
                       │ Step 1: Determine     │
                       │ Agent Level           │
                       │ Determine L1/L2/L3    │
                       └───────────────────────┘
                                   │
                                   ▼
                       ┌───────────────────────┐
                       │ Step 2: Select        │
                       │ Inspection Checklist  │
                       │ Based on Agent Level  │
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

**Step 1: Determine Agent Level**

Determine the Agent Level (L1/L2/L3) based on the Tool's operation type.

**Determination Basis**:

- Involves write operations → L2 minimum
- Involves irreversible operations → L3
- Involves sensitive data → L3

**Step 2: Select Inspection Checklist**

Select the corresponding inspection checklist based on the Agent Level:

- L1: 7 inspection items
- L2: 12 inspection items
- L3: 16 inspection items

**Step 3: Automated Inspection**

Execute automatable inspection items; output a defect report.

**Step 4: Semi-Automated Inspection**

Execute inspection items that require tool assistance, such as:

- Description quality scoring
- Cross-Tool Data Flow analysis
- Multi-Tool semantic similarity calculation

**Step 5: Human Review**

Execute inspection items that require human judgment, such as:

- Side effect identification
- Internal Parameter Exposure review
- Semantic competition confirmation

**Step 6: Output Inspection Report**

Output a complete inspection report, including:

- Agent Level
- Inspection item checklist
- Defect list (sorted by defect level)
- Remediation recommendations

<a id="35-usage-examples"></a>
### 3.5 Usage Examples

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

**Agent Level Determination**: L1 (read-only query)

**Inspection Results**:

| Inspection Item | Result | Description |
| --- | --- | --- |
| QD-T-1.1 | ✅ PASS | Base fields complete |
| QD-T-1.2 | ✅ PASS | required is consistent |
| QD-T-2.1 | ⚠️ P1 | city has no maxLength |
| QD-T-4.1 | ⚠️ P1 | description is relatively simple |

**Remediation Recommendation**:

```json
{
  "name": "get_weather",
  "description": "Get weather information for a specified city. Returns temperature, humidity, weather conditions, etc.",
  "inputSchema": {
    "type": "object",
    "properties": {
      "city": {
        "type": "string",
        "description": "City name, e.g., Beijing, Shanghai, Guangzhou",
        "maxLength": 50
      }
    },
    "required": ["city"]
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

**Agent Level Determination**: L3 (irreversible operation)

**Inspection Results**:

| Inspection Item | Result | Description |
| --- | --- | --- |
| QD-T-1.1 | ⛔ P0 | Base fields complete |
| QD-T-1.2 | ✅ PASS | required is consistent |
| QD-T-3.1 | ⛔ P0 | Write operation not identified as "this operation will delete data" |
| QD-T-3.4 | ⛔ P0 | Exposes internal parameter tenantId |
| QD-T-4.1 | ⛔ P0 | description is incomplete |

**Remediation Recommendation**:

```json
{
  "name": "delete_user",
  "description": "Delete the specified user. [This operation is irreversible and will permanently delete user data. Please proceed with caution.]",
  "inputSchema": {
    "type": "object",
    "properties": {
      "user_id": {
        "type": "string",
        "description": "User ID; must be a valid user identifier",
        "maxLength": 50
      },
      "force": {
        "type": "boolean",
        "description": "Whether to force delete (even if associated data exists)",
        "default": false
      }
    },
    "required": ["user_id"]
  }
}
```

(tenantId should be obtained from context and should not be exposed in the Schema)

<a id="36-part-summary"></a>
### 3.6 Part Summary

This part defines the **tiered inspection mechanism** for Tool Schemas, providing differentiated inspection intensity based on the Tool's Agent Level.

**Core Points**:

- Determine the Agent Level (L1/L2/L3) based on operation type
- Different Agent Levels correspond to different inspection intensities
- Defect levels may be upgraded based on the Agent Level
- The standardized inspection process ensures inspection consistency

**Inspection Item Statistics**:

- L1: 7 inspection items
- L2: 12 inspection items
- L3: 16 inspection items

---

## Part 4: Schema Change and Compatibility Inspection

<a id="41-positioning-of-this-part"></a>
### 4.1 Positioning of This Part

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

**Definition**: Identify Schema changes that may cause existing invocations to fail.

**Breaking Change Types**:

| Change Type | Destructiveness | Description |
| --- | --- | --- |
| Delete field | P0 | Existing invocations may pass this field |
| Modify field type | P0 | Existing invocations may pass incorrect types |
| Add required field | P0 | Existing invocations lack this field |
| Remove from required | P1 | Constraint relaxed; generally compatible |
| Add optional field | P2 | Fully compatible |
| Add enum value | P1 | Existing invocations may not recognize it |
| Delete enum value | P0 | Existing invocations may use this value |
| Tighten constraint | P0 | Existing invocations may not satisfy the new constraint |
| Relax constraint | P2 | Generally compatible |

**Inspection Rules**:

- Compare old and new Schemas
- Identify change types
- Assess destructiveness
- Output a change impact report

#### QD-T-5.2 Change Impact Assessment

**Definition**: Assess the impact scope of Schema changes.

**Impact Scope Assessment**:

```
Impact Scope Dimensions:
├─ Caller Impact
│   ├─ How many Agents use this Tool
│   ├─ What is the invocation frequency
│   └─ Are there urgent invocation scenarios
│
├─ Data Impact
│   ├─ Whether stored data is affected
│   ├─ Whether data migration is affected
│   └─ Whether data consistency is affected
│
└─ System Impact
    ├─ Whether other Tools are affected
    ├─ Whether system configuration is affected
    └─ Whether monitoring and alerting are affected
```

**Impact Levels**:

| Impact Level | Definition | Handling Recommendation |
| --- | --- | --- |
| P0 High Impact | Used by multiple Agents; high invocation frequency | Requires comprehensive assessment; incremental change |
| P1 Medium Impact | Used by a few Agents; moderate invocation frequency | Require notification to relevant parties |
| P2 Low Impact | Used by a single Agent; low invocation frequency | Direct change permitted |

<a id="43-change-risk-assessment"></a>
### 4.3 Change Risk Assessment

<a id="431-risk-assessment-matrix"></a>
#### 4.3.1 Risk Assessment Matrix

| Change Type | L1 Tool | L2 Tool | L3 Tool |
| --- | --- | --- | --- |
| Delete field | P1 Medium Risk | P0 High Risk | P0 High Risk |
| Modify field type | P1 Medium Risk | P0 High Risk | P0 High Risk |
| Add required field | P1 Medium Risk | P0 High Risk | P0 High Risk |
| Tighten constraint | P2 Low Risk | P1 Medium Risk | P0 High Risk |
| Add optional field | P2 Low Risk | P2 Low Risk | P2 Low Risk |

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
    ├─ Combine with Tool Agent Level
    ├─ Combine with change destructiveness
    └─ Combine with impact scope
    └─ Output risk assessment report
```

<a id="44-part-summary"></a>
### 4.4 Part Summary

This part defines the **compatibility inspection and risk assessment** for Tool Schema changes, helping to identify and assess the risks changes may introduce.

**Core Points**:

- Breaking changes require focused attention
- Tools at different Agent Levels have different sensitivity to changes
- The impact scope of changes must be comprehensively assessed

**Inspection Item Statistics**:

- Change type identification: 9 types
- Impact scope assessment: 3 dimensions
- Risk assessment matrix: 15 combinations

---

## Part 5: Quantitative Scoring Mechanism

<a id="51-scoring-principles"></a>
### 5.1 Scoring Principles

| Principle | Description |
| --- | --- |
| Total score of 100 | Deduction-based: baseline score (100) − defect deductions |
| Weight ratio | P0 : P1 : P2 = 5 : 3 : 1 |
| Level differentiation | Different Agent Levels have different inspection item counts; per-item weight adjusts automatically |
| Mathematical self-consistency | After all defect deductions, minimum score ≥ 0; maximum score = 100 |
| Simple rule | For the same inspection item number, the weight is deducted only once regardless of how many defect instances are found |
| Gate condition | Any P0 defect → evaluation FAIL (score is still output) |

<a id="52-calculation-steps"></a>
### 5.2 Calculation Steps

**Step 1: Determine Agent Level**  
Determine L1/L2/L3 according to the definitions in Part 3, Section 3.1 of this document.

**Step 2: Calculate Total Weight**  
Total Weight = P0 inspection item count × 5 + P1 inspection item count × 3 + P2 inspection item count × 1

**Step 3: Calculate Base Score**  
Base Score = 100 / Total Weight

**Step 4: Determine Per-Defect Deduction Values**

- P0 defect deduction = Base Score × 5
- P1 defect deduction = Base Score × 3
- P2 defect deduction = Base Score × 1

**Step 5: Calculate Total Deduction**  
Total Deduction = Σ(deduction for each failed inspection item number, using the highest severity level)  
Note: The same inspection item is deducted only once, regardless of how many defect instances are found.

**Step 6: Calculate Actual Score**  
Actual Score = max(100 − Total Deduction, 0)

**Step 7: Gate Determination**

- If any P0 defect exists: evaluation result = FAIL (score is still output)
- Otherwise: evaluation result = PASS

<a id="521-inspect-tool-inspection-item-distribution-table"></a>
### 5.2.1 Inspect Tool Inspection Item Distribution Table

> Note: P0/P1/P2 counts are from the "Tiered Inspection Checklist (3.3)" for the corresponding Agent Level in this document.

| Agent Level | Total Items | P0 Count | P1 Count | P2 Count | Total Weight | Base Score |
| --- | --- | --- | --- | --- | --- | --- |
| **L1** | 7 | 2 | 2 | 3 | $2×5+2×3+3×1=19$ | $100/19≈5.2632$ |
| **L2** | 12 | 5 | 7 | 0 | $5×5+7×3+0×1=44$ | $100/44≈2.2727$ |
| **L3** | 16 | 14 | 2 | 0 | $14×5+2×3+0×1=76$ | $100/76≈1.3158$ |

<a id="53-defect-deduction-value-table-example"></a>
### 5.3 Defect Deduction Value Table (Example)

**Using Inspect Tool L1 as an example:**

- Base Score = $100/19≈5.2632$

| Defect Level | Deduction Calculation | Deduction Value |
| --- | --- | --- |
| P0 | Base Score × 5 | $5.2632×5≈26.3158$ |
| P1 | Base Score × 3 | $5.2632×3≈15.7895$ |
| P2 | Base Score × 1 | $5.2632×1≈5.2632$ |

<a id="54-scoring-examples"></a>
### 5.4 Scoring Examples

**Example**: L2 Agent, N=5 defects found (involving 4 inspection item numbers)

- Deducted inspection items (deduplicated by inspection item number; only the highest defect level is used):
  - QD-T-1.1 (P0): 1 found (deducted only once regardless of count)
  - QD-T-3.2 (P0): 1 found
  - QD-T-2.1 (P1): 2 found (deducted once at P1 weight)
  - QD-T-4.2 (P1): 1 found

**Deduction Values (L2):**

- Total Weight = 44; Base Score = $100/44≈2.2727$
- P0 deduction = Base Score × 5 ≈ $2.2727×5≈11.3636$
- P1 deduction = Base Score × 3 ≈ $2.2727×3≈6.8182$

**Deduction Calculation:**

- Total Deduction = 2 × P0 deduction + 2 × P1 deduction
- Total Deduction ≈ $2×11.3636 + 2×6.8182 = 22.7272 + 13.6364 = 36.3636$
- Score = 100 − Total Deduction ≈ $100 - 36.3636 = 63.6364$

**Gate = FAIL** (P0 defects exist)

**Scoring Report:**

```json
{
  "check_id": "inspect-20260710-001",
  "framework": "SanityOps/Inspect Tool",
  "level": "L2",
  "result": "FAIL",
  "score": 63.6364,
  "defects": [
    {"check_id": "QD-T-1.1", "level": "P0", "found_count": 1},
    {"check_id": "QD-T-3.2", "level": "P0", "found_count": 1},
    {"check_id": "QD-T-2.1", "level": "P1", "found_count": 2},
    {"check_id": "QD-T-4.2", "level": "P1", "found_count": 1}
  ]
}
```

<a id="55-multi-defect-handling-rules"></a>
### 5.5 Multi-Defect Handling Rules

**Rule**: The same inspection item is deducted only once, regardless of how many defect instances are found.

**Examples**:

- QD-T-3.2 (P0 inspection item): 3 P0 defects found → deduct P0 deduction value (once only)
- QD-T-4.2 (P1 inspection item): 2 P1 defects found → deduct P1 deduction value (once only)

---

## Appendix A: Minimum Rule Sets

### A.1 L1 Minimum Rule Set (7 Items)

**Must-Pass Items**:

- QD-T-1.1 Base Field Missing (P0)
- QD-T-1.2 Required Field Inconsistency (P0)

**P1 Recommended-Pass Items**:

- QD-T-1.3 Invalid Enum Constraints (P1)
- QD-T-1.4 Uncontrolled additionalProperties (P1)

**P2 Recommended-Pass Items**:

- QD-T-2.1 String Without Length Constraint (P2)
- QD-T-2.3 Number Without Boundary (P2)
- QD-T-4.1 Insufficient Description Quality (P2)

### A.2 L2 Minimum Rule Set (12 Items)

**Must-Pass Items**:

- QD-T-1.1 Base Field Missing (P0)
- QD-T-1.2 Required Field Inconsistency (P0)
- QD-T-1.3 Invalid Enum Constraints (P0)
- QD-T-1.4 Uncontrolled additionalProperties (P0)
- QD-T-3.2 Raw Input Passthrough (P0)

**Recommended-Pass Items**:

- QD-T-2.1 String Without Length Constraint (P1)
- QD-T-2.2 String Without Format Constraint (P1)
- QD-T-2.3 Number Without Boundary (P1)
- QD-T-2.4 Array Without Length Constraint (P1)
- QD-T-3.1 Write Operation Not Identified (P1)
- QD-T-4.1 Insufficient Description Quality (P1)
- QD-T-4.2 Undeclared Side Effects (P1)

### A.3 L3 Minimum Rule Set (16 Items)

**Must-Pass Items (all)**:

- QD-T-1.1 ~ QD-T-1.4 (Structural Validity)
- QD-T-2.1 ~ QD-T-2.4 (Parameter Constraints, except QD-T-2.2)
- QD-T-3.1 ~ QD-T-3.5 (High-Risk Operations)
- QD-T-4.1 ~ QD-T-4.2 (Semantic Clarity)

**Recommended-Pass Items**:

- QD-T-2.2 String Without Format Constraint (P1)
- QD-T-4.3 Multi-Tool Semantic Competition (P1)

---

## Appendix B: QD-T Complete Numbering Index

| ID | Defect Name | Category | Defect Level | Applicable Agent Levels |
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

---

## Appendix C: Tool Overview

All inspection items in this specification can be automated through the official SanityOps tooling.

### C.1 Tool Formats

- **Community Edition**: Open-source CLI tool; supports L1/L2-level inspection
- **Commercial Edition**: Web platform + API interface; full L1/L2/L3 support
- **Integration Options**: CI/CD pipeline, IDE plugin, Schema Registry integration

### C.2 Quick Start

Visit the [SanityOps Tools Website](https://tools.sanityops.io/) for detailed information.

---

## Appendix D: Exemptions and Risk Acceptance

### D.1 Exemption Application Conditions

Exemptions may be applied for under the following circumstances:

- Legacy Tools that cannot be remediated in the short term
- Third-party Tools whose Schemas are beyond the organization's control
- Business urgency requiring temporary risk acceptance

### D.2 Risk Acceptance Statement

For defects that cannot be remediated, a Risk Acceptance statement must be signed:

- Risk Description: Clearly state the defect content and impact
- Impact Scope: Clearly identify the systems that may be affected
- Responsibility Confirmation: Clearly identify the responsible party and validity period

**End of Document**

---

© 2026 SanityOps. Licensed under Creative Commons Attribution 4.0 International.
https://www.sanityops.org  ·  hello@sanityops.org
v1.0  ·  July 2026
