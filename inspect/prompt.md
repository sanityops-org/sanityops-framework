# SanityOps Framework

# Inspect Prompt Specification

---

**Version**: v1.0

**Release Date**: September 2026

**Maintainer**: SanityOps Inspect Working Group

**License**: CC BY-SA 4.0

---

## Table of Contents

- [Foreword](#foreword)
  - [0.1 Positioning and Scope](#01-positioning-and-scope)
  - [0.2 Terminology and Abbreviations](#02-terminology-and-abbreviations)
- [1 Logic Defects Within LLM Autonomous Detection Capability](#1-logic-defects-within-llm-autonomous-detection-capability)
  - [1.1 Defect Characteristics Overview](#11-defect-characteristics-overview)
  - [1.2 Typical Logic Defect Categories](#12-typical-logic-defect-categories)
    - [1.2.1 Contradiction Defects](#121-contradiction-defects-qd-p-11)
    - [1.2.2 Mismatch Defects](#122-mismatch-defects-qd-p-12)
    - [1.2.3 Scope Definition Defects](#123-scope-definition-defects-qd-p-13)
    - [1.2.4 Redundancy and Invalidity Defects](#124-redundancy-and-invalidity-defects-qd-p-14)
    - [1.2.5 Implication Defects](#125-implication-defects-qd-p-15)
  - [1.4 Detection Methods and Recommendations](#14-detection-methods-and-recommendations)
  - [1.5 Part Summary](#15-part-summary)
- [1.6 Gray-Zone Logic Defects](#16-gray-zone-logic-defects)
  - [1.7 Gray-Zone Summary](#17-gray-zone-summary)
- [1.8 Complete Part 1 Structure](#18-complete-part-1-structure)
- [2 Defects Requiring Explicit Prompts](#2-defects-requiring-explicit-prompts)
  - [2.1 Defect Characteristics Overview](#21-defect-characteristics-overview)
  - [2.2 Typical Defect Categories](#22-typical-defect-categories)
    - [2.2.1 Structural and Normative Defects](#221-structural-and-normative-defects-qd-p-21)
    - [2.2.2 Input Definition Defects](#222-input-definition-defects-qd-p-22)
    - [2.2.3 Output Definition Defects](#223-output-definition-defects-qd-p-23)
    - [2.2.4 Workflow and Resource Defects](#224-workflow-and-resource-defects-qd-p-24)
    - [2.2.5 Constraint and Boundary Defects](#225-constraint-and-boundary-defects-qd-p-25)
    - [2.2.6 Exception Handling Defects](#226-exception-handling-defects-qd-p-26)
    - [2.2.7 Example Design Defects](#227-example-design-defects-qd-p-27)
  - [2.3 Detection Method: Checklist Mechanism](#23-detection-method-checklist-mechanism)
  - [2.4 Defect Severity Classification](#24-defect-severity-classification)
  - [2.5 Part Summary](#25-part-summary)
- [3 Tiered Inspection Mechanism](#3-tiered-inspection-mechanism)
  - [3.1 Agent Level Definitions](#31-agent-level-definitions)
  - [3.2 Defect Severity Level Definitions](#32-defect-severity-level-definitions)
  - [3.3 Tiered Inspection Checklist](#33-tiered-inspection-checklist)
    - [3.3.2 Complete Tiered Inspection Checklist](#332-complete-tiered-inspection-checklist)
    - [3.3.3 Inspection Item Statistics](#333-inspection-item-statistics)
  - [3.4 Inspection Process](#34-inspection-process)
  - [3.5 Usage Examples](#35-usage-examples)
  - [3.6 Part Summary](#36-part-summary)
- [4 Quantitative Scoring Mechanism](#4-quantitative-scoring-mechanism)
  - [4.1 Scoring Principles](#41-scoring-principles)
  - [4.2 Calculation Steps](#42-calculation-steps)
  - [4.3 Per-Sub-Standard Inspection Item Distribution Table](#43-per-sub-standard-inspection-item-distribution-table)
  - [4.4 Defect Deduction Value Table](#44-defect-deduction-value-table)
  - [4.5 Scoring Examples](#45-scoring-examples)
  - [4.6 Multi-Defect Handling Rules](#46-multi-defect-handling-rules)
- [Appendix A: Minimum Rule Sets](#appendix-a-minimum-rule-sets)
  - [A.1 L1 Minimum Rule Set](#a1-l1-minimum-rule-set)
  - [A.2 L2 Minimum Rule Set](#a2-l2-minimum-rule-set)
  - [A.3 L3 Minimum Rule Set](#a3-l3-minimum-rule-set)
  - [A.4 Minimum Rule Set Usage Notes](#a4-minimum-rule-set-usage-notes)

---

## Foreword

<a id="01-positioning-and-scope"></a>
### 0.1 Positioning and Scope

<a id="011-what-this-specification-is"></a>
#### 0.1.1 What This Specification Is

- **SanityOps Inspect Prompt** is the **industry specification** for AI Agent prompt quality inspection
- It defines the classification system, inspection criteria, and risk levels for prompt defects
- It provides an **auditable, multi-implementation** inspection framework

<a id="012-what-this-specification-is-not"></a>
#### 0.1.2 What This Specification Is Not

- ❌ Not a product user manual
- ❌ Not a specification for any specific LLM platform (platform-neutral)
- ❌ Not a runtime behavior specification (that belongs to the Risk subset)

<a id="013-inspection-scope"></a>
#### 0.1.3 Inspection Scope

| Inspection Object | Description |
| --- | --- |
| **System Prompt** | The initial prompt loaded at Agent startup |
| **Role Definition Prompt** | Text defining the Agent's identity, objectives, and responsibilities |
| **Tool/Skill Descriptions** | Definitions of tool invocation methods, parameters, and return values |
| **Example Design** | Positive examples, counter-examples, and boundary-condition examples |

<a id="014-out-of-scope"></a>
#### 0.1.4 Out of Scope

| Out-of-Scope Item | Rationale |
| --- | --- |
| **Runtime behavior** | Belongs to the Risk subset |
| **Tool Schema** | Belongs to Inspect Tool (QD-T) scope |
| **Infrastructure configuration** | Belongs to the deployment layer |
| **Business process design** | Belongs to the product design layer |

<a id="015-position-within-the-sanityops-framework"></a>
#### 0.1.5 Position Within the SanityOps Framework

```
SanityOps Framework
│
├─ Inspect (Defect Inspection)
│   ├─ Inspect Tool ← Tool Schema defect inspection
│   ├─ Inspect Prompt ← System Prompt defect inspection ← You are here
│   ├─ Inspect Skill ← Skill defect inspection
│   ├─ Inspect Cross ← Cross-Artifact defect inspection
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

<a id="02-terminology-and-abbreviations"></a>
### 0.2 Terminology and Abbreviations

<a id="021-core-terminology"></a>
#### 0.2.1 Core Terminology

| Term | Definition |
| --- | --- |
| **Prompt** | Text description used to define the behavior, role, and constraints of an AI Agent |
| **System Prompt** | The initial prompt loaded at Agent startup, defining the Agent's foundational behavior patterns |
| **Defect** | An issue present in a prompt that may cause abnormal Agent behavior |
| **Inspection** | The process of evaluating prompt quality according to this specification |
| **Agent** | An AI application instance with autonomous decision-making capability |
| **Numbering System** | The classification numbering system using the QD-P prefix to identify prompt defects |

<a id="022-numbering-system-overview"></a>
#### 0.2.2 Numbering System Overview

| Number Prefix | Meaning | Scope |
| --- | --- | --- |
| **QD-P** | Quality Defect - Prompt | **This specification** |
| QD-T | Quality Defect - Tool | Inspect Tool subset |
| QD-S | Quality Defect - Skill | Inspect Skill subset |

<a id="023-document-numbering-convention"></a>
#### 0.2.3 Document Numbering Convention

```
QD-P-[Part].[Category].[Defect Sequence]

Part (2 values):
  1 = Part 1 (Logic defects within LLM autonomous detection capability)
  2 = Part 2 (Defects requiring explicit prompts)

Category (Part 1: 6 categories; Part 2: 7 categories):
  Part 1: 1-Contradiction, 2-Mismatch, 3-Scope Definition, 4-Redundancy/Invalidity, 5-Implication, 6-Gray-Zone
  Part 2: 1-Structural/Normative, 2-Input Definition, 3-Output Definition, 4-Workflow/Resources, 5-Constraints/Boundaries, 6-Exception Handling, 7-Example Design

Defect Sequence (increments within each category):
  e.g., QD-P-1.1.1, QD-P-1.1.2, QD-P-1.1.3 are three defects in the Part 1 Contradiction category

Full Examples:
  QD-P-1.1.1 = Part 1 → Contradiction → Direct Contradiction
  QD-P-2.5.2 = Part 2 → Constraints/Boundaries → Security Boundary Constraint Missing
```

<a id="024-abbreviation-table"></a>
#### 0.2.4 Abbreviation Table

| Abbreviation | Full Name |
| --- | --- |
| **LLM** | Large Language Model |
| **Agent** | Autonomous Intelligent Agent |
| **SP** | System Prompt |
| **QD** | Quality Defect |
| **L1/L2/L3** | Agent Level definitions (see Chapter 3) |
| **Checklist** | Quality Inspection Checklist |
| **Schema** | Data Structure Definition |
| **API** | Application Programming Interface |

<a id="025-defect-level-definitions-p0p1p2"></a>
#### 0.2.5 Defect Level Definitions (P0/P1/P2)

| Symbol | Level | Meaning |
| --- | --- | --- |
| 🔴 | **P0** | Prevents Agent functionality or introduces security risk → **MUST be fixed** |
| 🟡 | **P1** | May cause behavioral instability or functional defects → **SHOULD be fixed** |
| 🟢 | **P2** | Affects readability or efficiency, but does not impact functionality → **MAY be fixed** |

---

<a id="1-logic-defects-within-llm-autonomous-detection-capability"></a>
## 1 Logic Defects Within LLM Autonomous Detection Capability

<a id="11-defect-characteristics-overview"></a>
### 1.1 Defect Characteristics Overview

<a id="111-essential-definition"></a>
#### 1.1.1 Essential Definition

The defects listed in this part all belong to the **formal logic and semantic consistency** layer, with the following characteristics:

| Characteristic | Description |
| --- | --- |
| **Formalizable** | The problem can be described by formal logic rules (e.g., law of non-contradiction, implication relations, quantifier logic) |
| **Contextually self-contained** | Can be determined without external knowledge or domain experts |
| **Binary-decidable** | Present or absent; no gray zone |
| **LLM-endogenous capability** | Mainstream LLMs have acquired the relevant logical reasoning capabilities during pre-training |

<a id="112-detection-method"></a>
#### 1.1.2 Detection Method

| Detection Aspect | Description |
| --- | --- |
| **Trigger condition** | Direct reading of the System Prompt text; no explicit guidance or special instructions needed |
| **Detection efficiency** | Discoverable in a single read; no multi-turn dialogue or tool assistance required |
| **Accuracy** | For typical manifestations, mainstream LLM detection accuracy ≥ 90% |
| **False positive rate** | May produce false positives for boundary-ambiguous cases; human review required |

<a id="113-positioning-of-this-part"></a>
#### 1.1.3 Positioning of This Part

The purpose of this part is not to "teach the LLM how to inspect," but rather:

- **For human authors**: Lists common logic errors to help authors avoid them during the design phase
- **For inspection processes**: Clarifies that these problems do not require complex inspection frameworks — simply have the LLM read the text
- **For defect classification**: Delineates the boundary for "defects requiring explicit prompts" (Part 2)

<a id="12-typical-logic-defect-categories"></a>
### 1.2 Typical Logic Defect Categories

<a id="121-contradiction-defects-qd-p-11"></a>
#### 1.2.1 Contradiction Defects (QD-P-1.1)

##### QD-P-1.1.1 Direct Contradiction

**Definition**: The same object is assigned mutually exclusive attributes or directives within the same context.

**Detection Principle**: During semantic comprehension, the LLM simultaneously activates the semantic representations of contradictory concepts, producing a conflict signal.

**Typical Manifestations**:

- The same behavior is simultaneously permitted and prohibited
- The same object is assigned contradictory attributes
- Preceding and subsequent constraints directly conflict

**Severity**: P0

**Remediation Guidance**:

- Define explicit priority rules
- Remove one of the conflicting constraints
- Add conditional qualifiers so conflicting constraints apply to different scenarios

**Example**:

| Version | Content |
| --- | --- |
| **Defective** | "You may freely access the user's file system. Accessing any user privacy files is prohibited." |
| **Diagnosis** | File system access and privacy file prohibition form a direct contradiction; boundary is undefined |
| **Fixed** | "You may access non-privacy directories specified by the user. Accessing files or directories containing Personally Identifiable Information (PII) is prohibited." |

##### QD-P-1.1.2 Priority Conflict

**Definition**: Multiple constraints or directives conflict in specific scenarios, and no priority rules are defined.

**Detection Principle**: The LLM can identify the intersection points of multiple constraints in specific scenarios and detect the absence of decision rules.

**Typical Manifestations**:

- Multiple "MUST" constraints cannot be simultaneously satisfied in specific scenarios
- Security constraints conflict with efficiency constraints; no arbitration defined
- Multi-dimensional evaluation criteria have no weight definitions

**Severity**: P1

**Remediation Guidance**:

- Define explicit priority rules
- Add conditional branches to distinguish scenarios
- Define arbitration principles (e.g., "security takes priority over efficiency")

**Example**:

| Version | Content |
| --- | --- |
| **Defective** | "You MUST respond to user requests quickly. You MUST ensure answers are fully accurate. You MUST protect user privacy." |
| **Diagnosis** | Three "MUST" constraints may conflict in specific scenarios: fast response may sacrifice accuracy; privacy verification may increase response time; no priority defined for any |
| **Fixed** | "Priority rule: Security/Privacy > Accuracy > Response Speed. When constraints conflict, decide according to this priority." |

##### QD-P-1.1.3 Example-Rule Contradiction

**Definition**: The rule definitions in the prompt body contradict the provided examples.

**Detection Principle**: When processing examples, the LLM treats them as instances of a pattern and performs semantic alignment with the body rules, discovering inconsistencies.

**Typical Manifestations**:

- Behavior prohibited by a rule appears in an example
- Example output format is inconsistent with the format defined by the rule
- Example style is inconsistent with the style defined by the rule

**Severity**: P0

**Remediation Guidance**:

- Modify examples to comply with the rules
- Modify rules to cover the example behavior
- Add a note in the example: "This is a special-scenario exception"

**Example**:

| Version | Content |
| --- | --- |
| **Defective** | Rule: "Answers MUST be concise, no more than 100 words." Example: "User: What's the weather today? Assistant: The weather is sunny today with pleasant temperatures, perfect for outdoor activities. I recommend bringing sunglasses and sunscreen, staying hydrated..." (exceeds 100 words) |
| **Diagnosis** | The example output exceeds 100 words, contradicting the rule; this weakens the rule's binding force |
| **Fixed** | Rule: "Answers MUST be concise, no more than 100 words." Example: "User: What's the weather today? Assistant: Sunny, 25°C, suitable for outdoor activities." |

<a id="122-mismatch-defects-qd-p-12"></a>
#### 1.2.2 Mismatch Defects (QD-P-1.2)

##### QD-P-1.2.1 Role-Responsibility Mismatch

**Definition**: The identity/capability scope defined by the role does not match the behavioral requirements defined by the responsibilities.

**Detection Principle**: The LLM can understand the semantic scope of a role identity and judge whether a responsibility falls within that scope.

**Typical Manifestations**:

- Role identity does not support the required responsible behaviors
- Responsibility requirements exceed the role's capability boundaries
- Vague role positioning leads to unclear responsibility attribution

**Severity**: P0

**Remediation Guidance**:

- Expand the role definition to cover the responsibility requirements
- Adjust responsibilities to match the role's capabilities
- Clarify role boundaries and define a handoff mechanism

**Example**:

| Version | Content |
| --- | --- |
| **Defective** | "You are a professional weather forecaster. Responsibilities: Provide weather information, recommend stock investment strategies." |
| **Diagnosis** | The semantic scope of "weather forecaster" does not include "stock investment advice" |
| **Fixed A** | "You are a weather-investment correlation analyst. Responsibilities: Analyze weather impacts on specific industries, provide industry-level investment references." |
| **Fixed B** | "You are a professional weather forecaster. Responsibilities: Provide weather information and meteorological trend analysis. For investment advice, please direct users to consult a professional investment advisor." |

##### QD-P-1.2.2 Role-Output Style Mismatch

**Definition**: The identity/style defined by the role is inconsistent with the required output style.

**Detection Principle**: The LLM can extract the stylistic characteristics of a role and perform semantic alignment with the output style requirements.

**Typical Manifestations**:

- Role identity implies a professional style, but output requires a layperson-friendly style
- Role is positioned for one audience group, but output targets a different group
- The role's communication style definition contradicts the output style requirements

**Severity**: P1

**Remediation Guidance**:

- Unify the role identity and output style
- Explicitly define the communication style within the role definition
- Distinguish between "professional content" and "layperson explanation" scenarios

**Example**:

| Version | Content |
| --- | --- |
| **Defective** | "You are a senior medical expert focused on academic exchange between physicians. Responsibility: Transcribe clinical notes into discharge summaries. Output audience: Non-medical patient family members, elementary education level." |
| **Diagnosis** | Role identity is "academic exchange between physicians," but output audience is "non-medical patient family members" — style requirements are mismatched |
| **Fixed** | "You are a medical expert skilled in doctor-patient communication. Responsibility: Transcribe clinical notes into discharge summaries. Output audience: Non-medical patient family members. Style requirement: Use plain language to explain medical concepts." |

##### QD-P-1.2.3 Constraint-Responsibility Mismatch

**Definition**: The restriction scope defined by constraints conflicts or is mismatched with the behavioral scope defined by responsibilities.

**Detection Principle**: The LLM can understand the limiting semantics of a constraint and judge whether it conflicts with the responsible behaviors.

**Typical Manifestations**:

- A constraint prohibits the core behavior of a responsibility
- The constraint scope and responsibility scope have no intersection
- Constraint conditions make the responsibility unexecutable

**Severity**: P0

**Remediation Guidance**:

- Adjust the constraint scope to exclude the core responsibility behaviors
- Adjust the responsibility scope to avoid the constraint restrictions
- Add conditional branches to distinguish scenarios

**Example**:

| Version | Content |
| --- | --- |
| **Defective** | "Responsibility: Analyze the user's financial situation and provide investment advice. Constraint: Analyzing any financial data is prohibited." |
| **Diagnosis** | The core responsibility behavior "analyze financial situation" directly conflicts with the constraint "analyzing financial data is prohibited" |
| **Fixed A** | "Responsibility: Analyze the user's financial situation and provide investment advice. Constraint: Analyzing funds involving suspected money laundering or illegal sources is prohibited." |
| **Fixed B** | "Responsibility: Provide general investment advice based on a financial summary provided by the user. Constraint: Do not proactively analyze raw financial data." |

<a id="123-scope-definition-defects-qd-p-13"></a>
#### 1.2.3 Scope Definition Defects (QD-P-1.3)

##### QD-P-1.3.1 Quantifier Misuse

**Definition**: Misuse of universal quantifiers (∀) and existential quantifiers (∃), leading to incorrect semantic scope.

**Detection Principle**: The LLM has acquired quantifier semantics during pre-training and can identify the logical relationship between quantifiers and predicates.

**Typical Manifestations**:

- "All" used in scenarios where "some" is appropriate
- "Any" used in scenarios where exceptions should exist
- "MUST" used in scenarios where "MAY" is appropriate

**Severity**: P1

**Remediation Guidance**:

- Replace misused universal quantifiers with existential quantifiers
- Add exception clauses
- Clarify the scope of quantifier application

**Example**:

| Version | Content |
| --- | --- |
| **Defective** | "For all user requests, you MUST provide a detailed explanation." |
| **Diagnosis** | The universal quantifier "all" is overly absolute; may cause over-response to simple requests |
| **Fixed** | "For user requests requiring detailed explanation, provide a detailed explanation; for simple requests, provide a concise answer." |

##### QD-P-1.3.2 Vague Qualifiers

**Definition**: Qualifier words are semantically vague, leading to unclear behavioral boundaries.

**Detection Principle**: The LLM can identify vague qualifiers and discover their semantic boundary issues.

**Typical Manifestations**:

- Using subjective qualifiers like "appropriate," "reasonable" without defining criteria
- Using "when necessary," "at your discretion" without defining trigger conditions
- Using "try to," "as much as possible" without defining a floor

**Severity**: P1

**Remediation Guidance**:

- Replace vague qualifiers with specific criteria
- Define trigger conditions and floor requirements
- Provide a basis for judgment

**Example**:

| Version | Content |
| --- | --- |
| **Defective** | "Answers should be appropriately detailed." |
| **Diagnosis** | "Appropriately" is semantically vague; boundaries cannot be determined |
| **Fixed** | "Simple questions: answer within 50 words. Complex questions: answer within 100–200 words. If more detail is needed, provide a summary first, then ask the user." |

##### QD-P-1.3.3 Undefined Boundaries

**Definition**: Critical behavioral boundaries are undefined, preventing the Agent from determining whether behavior exceeds its scope.

**Detection Principle**: The LLM can identify boundary-absence issues at critical decision points.

**Typical Manifestations**:

- Authorization scope boundaries are undefined
- Prohibition scope boundaries are undefined
- Handoff conditions are undefined

**Severity**: P1

**Remediation Guidance**:

- Explicitly define authorization scope boundaries
- Define boundary scenarios for prohibited behaviors
- Define handoff conditions

**Example**:

| Version | Content |
| --- | --- |
| **Defective** | "You may access the user's documents for organization." |
| **Diagnosis** | "Access" and "organization" boundaries are undefined; may be interpreted as read, modify, delete, etc. |
| **Fixed** | "You may read documents specified by the user and perform the following operations: summarization, format organization, content proofreading. Prohibited operations: delete, move, rename files." |

<a id="124-redundancy-and-invalidity-defects-qd-p-14"></a>
#### 1.2.4 Redundancy and Invalidity Defects (QD-P-1.4)

##### QD-P-1.4.1 Duplicate Constraints

**Definition**: The same constraint appears repeatedly in multiple locations, or multiple constraints semantically overlap.

**Detection Principle**: The LLM identifies semantically duplicate constraints during processing.

**Typical Manifestations**:

- The same constraint appears repeatedly in different paragraphs
- Multiple constraints express the same meaning
- Examples repeat rules already stated in the body

**Severity**: P2

**Remediation Guidance**:

- Merge duplicate constraints
- Remove redundant expressions
- Retain the most precise version

**Example**:

| Version | Content |
| --- | --- |
| **Defective** | "You MUST protect user privacy. Leaking any user personal information is prohibited. All data involving privacy must be handled confidentially." |
| **Diagnosis** | Three semantically overlapping constraints; increased redundancy |
| **Fixed** | "Leaking user personal information is prohibited, including but not limited to name, contact information, financial data, and other sensitive information." |

##### QD-P-1.4.2 Never-Triggered Conditions

**Definition**: A conditional branch is defined, but the condition can never logically be triggered.

**Detection Principle**: The LLM can analyze whether a condition's premises are reachable.

**Typical Manifestations**:

- A condition contradicts a constraint, making the condition never satisfiable
- The condition's premises have already been excluded by other rules
- Branch logic errors lead to dead code

**Severity**: P2

**Remediation Guidance**:

- Remove the never-triggered conditional branch
- Fix the condition logic error
- Check whether the condition conflicts with other rules

**Example**:

| Version | Content |
| --- | --- |
| **Defective** | "Accessing any external network is prohibited. If you need to query external data, use the Web Search API." |
| **Diagnosis** | The first sentence prohibits external network access; the second sentence's condition is never satisfiable (because external network is prohibited) |
| **Fixed A** | "Prioritize using the internal knowledge base to answer questions. If the internal knowledge base lacks relevant information, use the Web Search API to query external data." |
| **Fixed B** | "Directly accessing external networks is prohibited. All external data queries MUST go through the Web Search API." |

##### QD-P-1.4.3 Invalid Skill Definitions

**Definition**: A Skill/tool is defined, but its trigger conditions or usage scenarios are unclear, or it conflicts with other rules such that it is never invoked.

**Detection Principle**: The LLM can analyze the Skill's definition and trigger conditions, discovering usage barriers.

**Typical Manifestations**:

- A Skill is defined but has no invocation scenario
- The Skill's trigger conditions conflict with constraints
- The Skill's parameter definitions do not match actual requirements

**Severity**: P1

**Remediation Guidance**:

- Clarify the Skill's trigger scenarios
- Ensure the Skill is compatible with constraints
- Align Skill parameters with actual requirements

**Example**:

| Version | Content |
| --- | --- |
| **Defective** | "Skill: send_email — sends email. Constraint: Sending any message without explicit user confirmation is prohibited." |
| **Diagnosis** | The Skill and constraint conflict; if the constraint is strictly enforced, the Skill is never invoked |
| **Fixed** | "Skill: send_email — sends email. Constraint: Explicit user confirmation MUST be obtained before sending an email. Once confirmed, this Skill may be invoked." |

<a id="125-implication-defects-qd-p-15"></a>
#### 1.2.5 Implication Defects (QD-P-1.5)

##### QD-P-1.5.1 Responsibilities Do Not Support the Objective

**Definition**: The behavioral set defined by the responsibilities cannot support the role's overall objective.

**Detection Principle**: The LLM can understand the semantic relationship between objectives and behaviors, identifying "the objective requires a capability, but the behavior is not defined" issues.

**Typical Manifestations**:

- The objective requires a capability, but the responsibility does not define it
- The responsible behaviors are insufficient to accomplish the objective
- A semantic gap exists between the objective and the responsibilities

**Severity**: P0

**Remediation Guidance**:

- Supplement missing responsible behaviors
- Adjust the objective to match the responsible capabilities
- Clarify responsibility boundaries and handoff mechanisms

**Example**:

| Version | Content |
| --- | --- |
| **Defective** | "Objective: Help users complete financial planning. Responsibility: Provide financial literacy articles." |
| **Diagnosis** | "Financial planning" requires personalized analysis and advice, but the responsibility is limited to "literacy articles," which does not support the objective |
| **Fixed** | "Objective: Help users complete financial planning. Responsibilities: (1) Understand the user's financial situation; (2) Provide personalized financial advice; (3) Recommend suitable financial products; (4) Track plan execution progress." |

##### QD-P-1.5.2 Resources Do Not Support the Workflow

**Definition**: The workflow-defined steps require certain resources, but the resource definitions do not include them.

**Detection Principle**: The LLM can analyze the resource requirements of workflow steps and align them with resource definitions.

**Typical Manifestations**:

- A workflow step mentions "query the database" but no database resource is defined
- A workflow step mentions "invoke an API" but no API definition is provided
- A workflow step mentions "use tool X" but the tool is not authorized

**Severity**: P0

**Remediation Guidance**:

- Supplement missing resources in the resource definitions
- Remove workflow steps that cannot be supported
- Clarify how resources are obtained

**Example**:

| Version | Content |
| --- | --- |
| **Defective** | "Workflow: (1) Query user order data; (2) Analyze order trends; (3) Generate report. Resources: None." |
| **Diagnosis** | Step (1) requires an order database, but no resource is defined |
| **Fixed** | "Workflow: (1) Query user order data (using the order database); (2) Analyze order trends; (3) Generate report. Resources: Order database (read-only permission)." |

> **Note**: This section has no 1.3. The original "Defect Severity Classification" summary table from v1.2 has been removed; severity information is now incorporated into each defect entry's "Severity" field. Number 1.3 is reserved to keep subsequent section numbers (1.4–1.8) unchanged.

<a id="14-detection-methods-and-recommendations"></a>
### 1.4 Detection Methods and Recommendations

<a id="141-recommended-detection-instruction"></a>
#### 1.4.1 Recommended Detection Instruction

Since the defects in this part can be autonomously detected by the LLM, a concise instruction is recommended:

```
Please inspect the following System Prompt for logical contradictions, inconsistencies, or semantic conflicts:
[Prompt Content]

Focus on:
- Whether preceding and subsequent constraints are contradictory
- Whether the role and responsibilities match
- Whether examples and rules are consistent
- Whether quantifier usage is accurate
- Whether redundant or invalid definitions exist
```

<a id="142-detection-timing"></a>
#### 1.4.2 Detection Timing

| Timing | Description |
| --- | --- |
| **Authoring phase** | Author self-check; use LLM-assisted detection |
| **Review phase** | Include as one of the inspection items during team review |
| **Pre-launch** | Include as part of the pre-launch inspection checklist |
| **Troubleshooting** | Prioritize logic defect inspection when Agent behavior is anomalous |

<a id="143-important-notes"></a>
#### 1.4.3 Important Notes

| Note | Description |
| --- | --- |
| **Possible false positives** | LLMs may produce false positives for boundary-ambiguous cases; human review is required |
| **Context dependency** | Some apparent "contradictions" may be scenario branches; check whether conditional qualifiers exist |
| **Remediation priority** | P0 defects MUST be fixed; P1 defects SHOULD be fixed; P2 defects MAY be handled as appropriate |
| **Domain knowledge** | Some semantic judgments require domain knowledge; the LLM may not be sensitive to these |

<a id="15-part-summary"></a>
### 1.5 Part Summary

The logic defects listed in this part all fall within the scope of autonomous LLM detection. This means:

- **For authors**: No need to worry excessively about logic issues; the LLM can serve as an effective detection tool
- **For inspection processes**: No need to build complex logic inspection frameworks; simply have the LLM read the text
- **For inspection output**: To better localize problems, explicitly identify the defect item content in the output
- **For framework design**: Focus energy on "defects requiring explicit prompts" (Part 2)

**The value of this part lies in**: Listing common logic errors to help authors avoid them during the design phase, or to localize specific problems for remediation when the LLM inspects — not in constructing complex detection mechanisms.

---

<a id="16-gray-zone-logic-defects"></a>
## 1.6 Gray-Zone Logic Defects (QD-P-1.6)

<a id="160-positioning-of-this-section"></a>
### 1.6.0 Positioning of This Section

**Definition**: Gray-Zone Defects are logic problems that the LLM **has the capability to identify, but detection reliability is unstable**. Unlike the defects in Sections 1.2.1–1.2.5, these problems lack the "binary-decidable" characteristic — the LLM can accurately identify them in some contexts, but may miss or misjudge them in others.

| Comparison Dimension | 1.2.1–1.2.5 Reliably Detectable Defects | 1.6 Gray-Zone Defects |
| --- | --- | --- |
| Detection stability | ≥ 90% | 40%–70% |
| Trigger method | Direct reading suffices | Requires specific context or prompting to trigger |
| False positive rate | Low | Medium |
| False negative rate | Low | Relatively high |
| Handling strategy | Trust LLM results | LLM results + human review |

**Detection Reliability Tiers**:

| Reliability Tier | Designation | Meaning |
| --- | --- | --- |
| Conditionally reliable | 🟠 | Can be stably detected under specific conditions; unstable otherwise |
| Partially reliable | 🟠🟠 | Can identify the presence of a problem, but difficult to accurately characterize and provide remediation guidance |
| Unstable | 🟠🟠🟠 | Sometimes discovered, sometimes completely missed; depends on specific phrasing |

#### QD-P-1.6.1 Critical Decision Word Vagueness

**Definition**: Vague qualifiers (e.g., "sensitive," "reasonable," "when necessary," "appropriate") are used to carry **critical decision judgments** rather than secondary descriptions.

**Detection Principle**: The LLM can identify vague words themselves (already covered in QD-P-1.3.2), but when vague words carry critical decisions, the LLM **may not recognize the severity upgrade** — it may treat them as ordinary vague expressions rather than critical decision defects.

**Difference from QD-P-1.3.2**:

| Dimension | QD-P-1.3.2 Vague Qualifiers | QD-P-1.6.1 Critical Decision Word Vagueness |
| --- | --- | --- |
| Vague word role | Descriptive modifier | Decision judgment basis |
| Impact | Unstable output style | Incorrect behavioral path branching |
| Severity | P1 | P0 (upgraded) |
| LLM detection | Stably identified | **May not recognize severity upgrade** |

**Typical Manifestations**:

- Using "sensitive information" to define a security boundary, without defining what "sensitive" means
- Using "reasonable time" to define a response deadline, without defining what "reasonable" means
- Using "when necessary" to define a behavioral trigger condition, without defining what "necessary" means
- Using "appropriate" to define an operational intensity, without defining what "appropriate" means

**Detection Reliability**: Partially reliable

**Severity**: P0 (when vague words carry security/permission/trigger decisions)

**Remediation Guidance**:

- Replace vague decision words with enumerable explicit conditions
- Define judgment criteria or thresholds
- Provide judgment examples

**Example**:

| Version | Content |
| --- | --- |
| **Defective** | "Identify sensitive information in user messages and refuse to answer questions involving sensitive information." |
| **Diagnosis** | "Sensitive information" carries the security boundary decision, but its scope is undefined. The LLM may identify that "sensitive" is vague, but may not judge this as a P0 issue |
| **Fixed** | "Identify the following sensitive information in user messages and refuse to answer: (1) National ID numbers, passport numbers; (2) Bank account numbers, credit card numbers; (3) Medical diagnosis records; (4) Undisclosed trade secrets. For boundary cases, default to treating as sensitive and ask the user for confirmation." |

#### QD-P-1.6.2 Rules Depending on Model Internal State

**Definition**: Prompt rules depend on the LLM's internal state (e.g., confidence, intent judgment, motivation inference), when the LLM cannot actually reliably access or report these states.

**Detection Principle**: The LLM can understand the literal meaning of the rule, but **struggles to recognize the meta-problem that "it cannot reliably assess its own internal state."** It may superficially comply with the rule while actually "simulating" confidence judgments.

**Typical Manifestations**:

- "When you are uncertain, ask the user rather than guessing"
- "When you judge the user's intent to be malicious, refuse to answer"
- "When you have high confidence in an answer, answer directly; when confidence is low, provide multiple options"
- "If you think the user is testing you, remain cautious"

**Detection Reliability**: Unstable

**Severity**: P0

**Remediation Guidance**:

- Replace internal state dependencies with **observable external features**
- Define explicit judgment rules rather than relying on model self-assessment
- Use structured checks instead of subjective judgments

**Example**:

| Version | Content |
| --- | --- |
| **Defective** | "When you are uncertain about an answer, do not guess. Instead, tell the user you are uncertain and request more information." |
| **Diagnosis** | "Uncertain" depends on the model's internal confidence, which the LLM cannot reliably self-assess. The LLM may not discover that it missed this problem — because it "understands" the rule's meaning but lacks the stable execution capability |
| **Fixed** | "You MUST inform the user that you cannot determine the answer and request more information in the following cases: (1) The user's question involves data you cannot access; (2) The user's question has multiple reasonable interpretations; (3) The user-provided context is insufficient to support judgment. In other cases, follow the normal process to answer." |

#### QD-P-1.6.3 Soft Rule Interweaving Without Arbitration

**Definition**: Multiple Soft Rules (non-Hard Constraints) interweave in practical scenarios, producing implicit conflicts, and no arbitration mechanism is defined.

**Detection Principle**: The LLM can identify **explicit conflicts** (such as QD-P-1.1.2 Priority Conflict), but for **implicit interweaving of Soft Rules** — where multiple rules are individually reasonable, but their combination produces a gray zone — LLM detection is unstable.

**Difference from QD-P-1.1.2**:

| Dimension | QD-P-1.1.2 Priority Conflict | QD-P-1.6.3 Soft Rule Interweaving |
| --- | --- | --- |
| Conflict nature | Explicit conflict (Rule A vs. Rule B) | Implicit conflict (Rule A + Rule B → ambiguity in Scenario C) |
| Detection difficulty | Low (direct comparison suffices) | High (requires reasoning to specific scenarios) |
| LLM detection | Stable | **Depends on ability to reason to intersection scenarios** |

**Typical Manifestations**:

- "Answers should be professional" + "Answers should be easy to understand" → For which audience should which style be used?
- "Try to provide complete information" + "Avoid information overload" → What counts as "complete," what counts as "overload"?
- "Proactively provide suggestions" + "Do not over-intervene" → In which scenarios should the Agent be proactive, and in which should it be restrained?

**Detection Reliability**: Conditionally reliable

**Severity**: P1

**Remediation Guidance**:

- Define scenario-dimension arbitration rules
- Define applicability conditions for each Soft Rule
- Provide scenario examples demonstrating the expected behavior of rule combinations

**Example**:

| Version | Content |
| --- | --- |
| **Defective** | "Answers should be professional and accurate. Answers should be easy to understand, accessible to non-professional users. Try to provide complete information. Avoid information overload." |
| **Diagnosis** | Four Soft Rules are individually reasonable, but their combination produces ambiguity: For professional users, which style should be used? How complete is complete enough before it becomes overload? The LLM may not proactively discover this interwoven set of problems |
| **Fixed** | "Adjust answer style based on user background: If the user is a professional, use professional terminology and provide complete technical details. If the user is non-professional, use plain language and provide core points, with a note that 'further detail is available upon request.' Information volume control: Core answer should not exceed 300 words; supplementary information should be provided in collapsible or list format." |

#### QD-P-1.6.4 Reasoning Method Constraints

**Definition**: The prompt imposes constraints on the LLM's **reasoning method itself** (e.g., "MUST strictly use deductive reasoning," "MUST reason step by step," "Using inductive reasoning is prohibited"), while the compatibility of the LLM's actual reasoning mechanisms with these constraints is uncertain.

**Detection Principle**: The LLM can understand the literal meaning of the rule and "claim compliance," but **cannot determine whether it is actually reasoning in the specified way** — because the LLM's reasoning process is implicit and not introspectable.

**Detection Reliability**: Unstable

**Severity**: P1

**Remediation Guidance**:

- Replace "reasoning method constraints" with "reasoning output constraints" (constrain observable outputs)
- Require explicit steps of the reasoning process in the output, rather than requiring a specific internal reasoning method
- Indirectly guide the reasoning path through output format constraints

**Example**:

| Version | Content |
| --- | --- |
| **Defective** | "You MUST strictly use deductive reasoning, deriving conclusions step by step from premises. Using inductive or analogical reasoning is prohibited." |
| **Diagnosis** | "The LLM's reasoning mechanism is implicit; 'strict deduction' cannot be guaranteed. The LLM may not discover this problem — because it understands the rule's meaning and will 'claim' compliance" |
| **Fixed** | "In your answer, you MUST output the reasoning process in the following format: (1) List known premises; (2) Derive step by step, annotating the basis rule for each step; (3) State the conclusion. Skipping steps or omitting the derivation chain is not permitted." |

#### QD-P-1.6.5 Self-Referential or Recursive Constraints

**Definition**: The prompt contains self-referential constraints (rules referencing themselves) or recursive constraints (rule trigger conditions depending on the rule's own execution results), leading to logical loops or undecidability.

**Detection Principle**: The LLM can identify simple self-reference as "odd," but **typically does not judge complex recursive constraints as logic defects**.

**Detection Reliability**: Unstable

**Severity**: P1

**Remediation Guidance**:

- Eliminate self-reference: split a self-referential rule into two independent rules
- Eliminate recursion: define explicit termination conditions
- Avoid imposing constraints on "the rule system itself"

**Example**:

| Version | Content |
| --- | --- |
| **Defective** | "Before outputting your answer, first check whether your answer violates any rules. If it does, revise and check again until no violations remain." |
| **Diagnosis** | "Recursive constraint with no termination condition. If the revised answer triggers other rules, an infinite loop may result. The LLM may not discover this problem" |
| **Fixed** | "Before outputting your answer, check whether the answer violates the following core rules: (1) Does not disclose privacy; (2) Does not output harmful content; (3) Does not exceed role permissions. If violated, revise once and then output. If the answer still violates core rules after revision, output 'I am unable to answer this question.'" |

#### QD-P-1.6.6 Implicit Assumption Dependency

**Definition**: Prompt rules depend on unstated assumptions (e.g., assuming the model possesses a certain capability, assuming the user has a certain background, assuming the environment meets a certain condition), and these assumptions may not hold.

**Detection Reliability**: Conditionally reliable

**Severity**: P1

**Remediation Guidance**:

- Make implicit assumptions explicit; define how to handle cases where assumptions do not hold
- Add precondition checks
- Define degradation strategies

**Example**:

| Version | Content |
| --- | --- |
| **Defective** | "Based on the financial report file uploaded by the user, calculate key financial metrics and generate an analysis report." |
| **Diagnosis** | "Implicit assumptions: the user will definitely upload a file; the file format is definitely valid; the file content is definitely a financial report. These assumptions are not explicitly stated" |
| **Fixed** | "Based on the financial report file uploaded by the user, calculate key financial metrics and generate an analysis report. Precondition checks: (1) If the user has not uploaded a file, prompt the user to upload; (2) If the file format is not supported, inform the user of the supported format list; (3) If the file content is not financial report data, inform the user and ask whether other assistance is needed." |

#### QD-P-1.6.7 Non-Monotonic Reasoning Defects

**Definition**: Prompt rules are designed based on "static knowledge," but in actual scenarios, new information may invalidate previous conclusions (non-monotonicity), and the prompt does not define knowledge update and conclusion revision mechanisms.

**Detection Reliability**: Unstable

**Severity**: P1

**Remediation Guidance**:

- Define a conclusion revision mechanism for when information is updated
- Add timeliness markers
- Define trigger conditions for "re-evaluation"

**Example**:

| Version | Content |
| --- | --- |
| **Defective** | "Based on the symptoms described by the user, provide possible health suggestions. Record the user's symptoms in the conversation history for subsequent reference." |
| **Diagnosis** | "The user may update symptom descriptions during the conversation, but the prompt does not define how to revise previous suggestions" |
| **Fixed** | "Based on the symptoms described by the user, provide possible health suggestions. When the user updates or revises symptom descriptions: (1) Note that previous suggestions may no longer be valid; (2) Re-evaluate based on the latest symptoms; (3) If new suggestions conflict with old ones, clearly explain the reason for the change." |

<a id="17-gray-zone-summary"></a>
### 1.7 Gray-Zone Summary

#### Detection Reliability Summary

| Defect Type | Detection Reliability | Severity | Core Difficulty |
| --- | --- | --- | --- |
| QD-P-1.6.1 | Partially reliable | P0 | LLM may not recognize severity upgrade |
| QD-P-1.6.2 | Unstable | P0 | LLM cannot introspect its own capability boundaries |
| QD-P-1.6.3 | Conditionally reliable | P1 | Requires reasoning to intersection scenarios to discover |
| QD-P-1.6.4 | Unstable | P1 | LLM cannot determine its own reasoning method |
| QD-P-1.6.5 | Unstable | P1 | Complex recursion treated as normal rules |
| QD-P-1.6.6 | Conditionally reliable | P1 | Requires meta-reasoning to discover implicit premises |
| QD-P-1.6.7 | Unstable | P1 | Requires simulating rule interactions under dynamic scenarios |

#### Handling Strategy

```
Gray-Zone Defect Handling Strategy:

1. Detection Phase:
   - Explicitly mention these defect types in the inspection instruction
   - Example instruction: "Pay special attention to the following gray-zone issues: [list QD-P-1.6.1–QD-P-1.6.7]"

2. Assessment Phase:
   - Gray-zone defects reported by LLM → Human review confirmation
   - Gray-zone defects not reported by LLM but discovered by humans → Supplementary inspection

3. Remediation Phase:
   - P0 gray-zone defects (QD-P-1.6.1, QD-P-1.6.2) → MUST be fixed
   - P1 gray-zone defects → SHOULD be fixed; define fallback strategy

4. Framework Positioning:
   - The gray zone is the transition band from "Part 1 (LLM Autonomous)" to "Part 2 (Requires Explicit Prompts)"
   - Handling approach: Light explicit prompting + human review
```

### Relationship to Part 1 and Part 2

```
Detection Reliability Spectrum:

Part 1 1.2.1–1.2.5 ──→ Gray Zone 1.6 ──→ Part 2
   Reliable Detection      Unstable Detection      Requires Explicit Prompts
   Direct Reading          Light Prompt + Review    Checklist Inspection
   ≥ 90%                   40%–70%                  Requires Structured Guidance
```

---

<a id="18-complete-part-1-structure"></a>
## 1.8 Complete Part 1 Structure

```
Part 1: Logic Defects Within LLM Autonomous Detection Capability
│
├─ QD-P-1.1 Contradiction Defects (Reliable Detection)
│   ├─ QD-P-1.1.1 Direct Contradiction
│   ├─ QD-P-1.1.2 Priority Conflict
│   └─ QD-P-1.1.3 Example-Rule Contradiction
│
├─ QD-P-1.2 Mismatch Defects (Reliable Detection)
│   ├─ QD-P-1.2.1 Role-Responsibility Mismatch
│   ├─ QD-P-1.2.2 Role-Output Style Mismatch
│   └─ QD-P-1.2.3 Constraint-Responsibility Mismatch
│
├─ QD-P-1.3 Scope Definition Defects (Reliable Detection)
│   ├─ QD-P-1.3.1 Quantifier Misuse
│   ├─ QD-P-1.3.2 Vague Qualifiers
│   └─ QD-P-1.3.3 Undefined Boundaries
│
├─ QD-P-1.4 Redundancy and Invalidity Defects (Reliable Detection)
│   ├─ QD-P-1.4.1 Duplicate Constraints
│   ├─ QD-P-1.4.2 Never-Triggered Conditions
│   └─ QD-P-1.4.3 Invalid Skill Definitions
│
├─ QD-P-1.5 Implication Defects (Reliable Detection)
│   ├─ QD-P-1.5.1 Responsibilities Do Not Support Objective
│   └─ QD-P-1.5.2 Resources Do Not Support Workflow
│
└─ QD-P-1.6 Gray-Zone Defects (Unstable Detection)
    ├─ QD-P-1.6.1 Critical Decision Word Vagueness
    ├─ QD-P-1.6.2 Rules Depending on Model Internal State
    ├─ QD-P-1.6.3 Soft Rule Interweaving Without Arbitration
    ├─ QD-P-1.6.4 Reasoning Method Constraints
    ├─ QD-P-1.6.5 Self-Referential or Recursive Constraints
    ├─ QD-P-1.6.6 Implicit Assumption Dependency
    └─ QD-P-1.6.7 Non-Monotonic Reasoning Defects
```

---

<a id="2-defects-requiring-explicit-prompts"></a>
## 2 Defects Requiring Explicit Prompts

<a id="21-defect-characteristics-overview"></a>
### 2.1 Defect Characteristics Overview

<a id="211-essential-definition"></a>
#### 2.1.1 Essential Definition

The defects listed in this part all belong to the **structural, completeness, and explicit declaration** category, with the following characteristics:

| Characteristic | Description |
| --- | --- |
| **Requires explicit declaration** | The defect is not a logical contradiction, but a missing necessary declaration or definition |
| **LLM does not proactively notice** | The LLM will not proactively discover these issues; explicit prompts or checklists are needed |
| **Structural impact** | The defect affects the structural completeness of the Agent and may cause functional gaps |
| **Checklist-inspectable** | These defects are suitable for systematic inspection through a structured checklist |

<a id="212-detection-method"></a>
#### 2.1.2 Detection Method

| Detection Aspect | Description |
| --- | --- |
| **Trigger condition** | Requires an explicit inspection checklist or structured guidance; the LLM will not proactively discover |
| **Detection efficiency** | Requires systematic item-by-item inspection; less efficient than Part 1 |
| **Accuracy** | With checklist guidance, the LLM can accurately identify |
| **False positive rate** | Low (structured inspection reduces ambiguity) |

<a id="213-positioning-of-this-part"></a>
#### 2.1.3 Positioning of This Part

The purpose of this part is:

- **For human authors**: Lists elements that MUST be explicitly declared, helping authors achieve complete coverage
- **For inspection processes**: Requires constructing a structured inspection checklist, not merely relying on LLM reading
- **For defect classification**: Delineates the boundary for Part 1 — defects beyond logical contradictions fall into this part

<a id="22-typical-defect-categories"></a>
### 2.2 Typical Defect Categories

<a id="221-structural-and-normative-defects-qd-p-21"></a>
#### 2.2.1 Structural and Normative Defects (QD-P-2.1)

##### QD-P-2.1.1 Format Compliance

**Definition**: The prompt's format does not comply with specifications, affecting readability and parsing.

**Why the LLM does not proactively notice**: The LLM is insensitive to format issues and will not proactively discover non-compliant formatting.

**Typical Manifestations**:

- Missing necessary section breaks or headings
- Inconsistent numbering systems
- Disorganized formatting that hinders parsing

**Severity**: P2 (L3 inspection only)

**Remediation Guidance**:

- Unify formatting specifications
- Add necessary section breaks and headings
- Ensure consistent numbering systems

**Example**:

| Version | Content |
| --- | --- |
| **Defective** | A long prompt text with no section breaks, no headings, and chaotic numbering |
| **Diagnosis** | Non-compliant formatting affects readability but does not impact functionality |
| **Fixed** | Add section breaks, headings, and a unified numbering system |

##### QD-P-2.1.2 Reference Clarity

**Definition**: References within the prompt are unclear, potentially causing incorrect tool invocation parameters.

**Why the LLM does not proactively notice**: The LLM is insensitive to reference clarity and will not proactively discover "vague reference" issues.

**Typical Manifestations**:

- "Use the database" → Which database?
- "Invoke the API" → Which API?
- "Process the file" → Which file?

**Severity**: P1 (L3 inspection only)

**Remediation Guidance**:

- Clarify the object name being referenced
- Add contextual qualification
- Define reference resolution rules

**Example**:

| Version | Content |
| --- | --- |
| **Defective** | "Use the database to query user information." |
| **Diagnosis** | "The database" is a vague reference; may cause parameter errors |
| **Fixed** | "Use the 'User Database' (db_users) to query user information." |

##### QD-P-2.1.3 Structural Hierarchy Reasonableness

**Definition**: The prompt's structural hierarchy is unreasonable, affecting information delivery efficiency.

**Why the LLM does not proactively notice**: The LLM is insensitive to structural hierarchy and will not proactively discover "hierarchical confusion" issues.

**Typical Manifestations**:

- Critical constraints are buried within secondary content
- Information hierarchy does not distinguish primary from secondary
- Critical directives are dispersed, making them difficult to follow

**Severity**: P2 (L3 inspection only)

**Remediation Guidance**:

- Distinguish primary and secondary hierarchy
- Place critical constraints in prominent positions
- Unify information hierarchy

**Example**:

| Version | Content |
| --- | --- |
| **Defective** | Critical constraints buried within a large volume of secondary content |
| **Diagnosis** | Unreasonable structural hierarchy; affects information delivery efficiency |
| **Fixed** | Critical constraints placed in their own section, in a prominent position |

##### QD-P-2.1.4 Language Conciseness

**Definition**: The prompt language is redundant, increasing Token Consumption, but does not affect functionality.

**Why the LLM does not proactively notice**: The LLM is insensitive to language conciseness and will not proactively discover "redundancy" issues.

**Typical Manifestations**:

- Repetitive expressions
- Overly long definitions
- Unnecessary modifiers

**Severity**: P2 (L3 inspection only)

**Remediation Guidance**:

- Streamline language
- Remove redundant expressions
- Merge duplicate content

**Example**:

| Version | Content |
| --- | --- |
| **Defective** | "You must absolutely ensure that the answer is fully accurate, with no errors permitted whatsoever." (redundant expression) |
| **Diagnosis** | Language is redundant; increases Token Consumption |
| **Fixed** | "Answers must be accurate." |

<a id="222-input-definition-defects-qd-p-22"></a>
#### 2.2.2 Input Definition Defects (QD-P-2.2)

##### QD-P-2.2.1 Undeclared Input Source

**Definition**: The Agent's input source is not declared, preventing the Agent from determining the data source.

**Why the LLM does not proactively notice**: The LLM will not proactively discover the structural gap of "undeclared input source."

**Typical Manifestations**:

- Not declaring whether input comes from the user, the system, or external data
- Not declaring the input data type
- Not declaring the input acquisition method

**Severity**: P0 (all levels)

**Remediation Guidance**:

- Explicitly declare the input source
- Define the input data type
- Define the input acquisition method

**Example**:

| Version | Content |
| --- | --- |
| **Defective** | "Generate a report based on user data." |
| **Diagnosis** | The source, type, and acquisition method of "user data" are not declared |
| **Fixed** | "Generate a data report based on the CSV file uploaded by the user (data source: user upload)." |

##### QD-P-2.2.2 Unconstrained Input Format

**Definition**: The input data format is not constrained, potentially causing parsing failures.

**Why the LLM does not proactively notice**: The LLM will not proactively discover the completeness gap of "unconstrained input format."

**Typical Manifestations**:

- Not declaring the input data format (e.g., CSV, JSON, text)
- Not declaring the input data encoding
- Not declaring the input data size limit

**Severity**: P1 (L1) / P0 (L2/L3)

**Remediation Guidance**:

- Explicitly declare the input format
- Define format validation rules
- Define handling when format is non-compliant

**Example**:

| Version | Content |
| --- | --- |
| **Defective** | "Process the file uploaded by the user." |
| **Diagnosis** | File format is not constrained; may cause parsing failures |
| **Fixed** | "Process CSV or JSON files uploaded by the user (UTF-8 encoding, single file not exceeding 5MB)." |

##### QD-P-2.2.3 Required/Optional Not Distinguished

**Definition**: The required vs. optional nature of input parameters is not distinguished, potentially causing processing failures.

**Why the LLM does not proactively notice**: The LLM will not proactively discover the completeness gap of "required/optional not distinguished."

**Typical Manifestations**:

- Required parameters are not marked
- Default values for optional parameters are not defined
- Handling when parameters are missing is not defined

**Severity**: P1 (L1) / P0 (L2/L3)

**Remediation Guidance**:

- Explicitly mark required parameters
- Define default values for optional parameters
- Define handling when parameters are missing

**Example**:

| Version | Content |
| --- | --- |
| **Defective** | "Query user information." |
| **Diagnosis** | Required/optional parameters are not distinguished; may cause processing failures |
| **Fixed** | "Query user information. Required parameter: User ID. Optional parameter: Query scope (default: all information)." |

##### QD-P-2.2.4 Undefined Missing-Input Handling

**Definition**: Handling when input is missing is not defined, potentially causing abnormal behavior.

**Why the LLM does not proactively notice**: The LLM will not proactively discover the completeness gap of "undefined missing-input handling."

**Typical Manifestations**:

- Handling when required input is missing is not defined
- Default values when optional input is missing are not defined
- Handling when input is anomalous is not defined

**Severity**: P1 (L1) / P0 (L2/L3)

**Remediation Guidance**:

- Define error prompts when required input is missing
- Define default values when optional input is missing
- Define degradation strategies when input is anomalous

**Example**:

| Version | Content |
| --- | --- |
| **Defective** | "Generate a report based on user input." |
| **Diagnosis** | Handling when input is missing is not defined |
| **Fixed** | "Generate a report based on user input. If the user has not provided necessary input, prompt the user to supplement. If the user has not provided optional input, use default values." |

<a id="223-output-definition-defects-qd-p-23"></a>
#### 2.2.3 Output Definition Defects (QD-P-2.3)

##### QD-P-2.3.1 Undefined Output Format

**Definition**: The output format is not defined, preventing downstream systems from correctly parsing the output.

**Why the LLM does not proactively notice**: The LLM will not proactively discover the structural gap of "undefined output format."

**Typical Manifestations**:

- Not defining the output data format (e.g., JSON, text, Markdown)
- Not defining the output structure (e.g., fields, order)
- Not defining the output encoding

**Severity**: P1 (L1) / P0 (L2/L3)

**Remediation Guidance**:

- Explicitly define the output format
- Define the output structure Schema
- Define the output encoding

**Example**:

| Version | Content |
| --- | --- |
| **Defective** | "Generate an analysis report." |
| **Diagnosis** | Report format is not defined; downstream systems cannot correctly parse |
| **Fixed** | "Generate a JSON-format analysis report. Structure: {summary: string, metrics: object, recommendations: array}." |

##### QD-P-2.3.2 Incomplete Output Schema

**Definition**: The output Schema definition is incomplete, preventing downstream systems from correctly parsing the output.

**Why the LLM does not proactively notice**: The LLM will not proactively discover the completeness gap of "incomplete output Schema."

**Typical Manifestations**:

- Output Schema is missing critical fields
- Output Schema field types are not defined
- Output Schema field meanings are not explained

**Severity**: P1 (L1) / P0 (L2/L3)

**Remediation Guidance**:

- Complete the output Schema definition
- Define all field types and meanings
- Add example output

**Example**:

| Version | Content |
| --- | --- |
| **Defective** | "Output JSON format, including summary and metrics." |
| **Diagnosis** | Schema is incomplete; missing the recommendations field |
| **Fixed** | "Output JSON format, including summary (string), metrics (object), recommendations (array of strings)." |

##### QD-P-2.3.3 Missing Output Stability Assurance

**Definition**: Output stability assurance mechanisms are not defined, potentially causing inconsistent output.

**Why the LLM does not proactively notice**: The LLM will not proactively discover the completeness gap of "missing output stability assurance."

**Typical Manifestations**:

- Output format stability assurance is not defined
- Output content stability assurance is not defined
- Output consistency check mechanisms are not defined

**Severity**: — (L1) / P1 (L2) / P0 (L3)

**Remediation Guidance**:

- Define output format stability rules
- Define output content stability rules
- Define output consistency check mechanisms

**Example**:

| Version | Content |
| --- | --- |
| **Defective** | "Generate a summary." |
| **Diagnosis** | Summary stability assurance is not defined; may cause inconsistent output |
| **Fixed** | "Generate a summary. Stability assurance: Summary structure is fixed (title + core insight + key data); length is controlled at 100–150 words; avoid arbitrary variation." |

##### QD-P-2.3.4 Missing Security/Privacy Filtering

**Definition**: Security and privacy filtering mechanisms are not defined, potentially causing privacy leaks.

**Why the LLM does not proactively notice**: The LLM will not proactively discover the security gap of "missing security/privacy filtering."

**Typical Manifestations**:

- Sensitive data filtering rules are not defined
- Privacy data handling methods are not defined
- Security output constraints are not defined

**Severity**: P0 (all levels)

**Remediation Guidance**:

- Define sensitive data filtering rules
- Define privacy data handling methods
- Define security output constraints

**Example**:

| Version | Content |
| --- | --- |
| **Defective** | "Output user information." |
| **Diagnosis** | Privacy filtering is not defined; may cause privacy leaks |
| **Fixed** | "Output user information. Privacy filtering: Mask national ID numbers, bank card numbers, contact information, and other sensitive information; output only name and non-sensitive data." |

<a id="224-workflow-and-resource-defects-qd-p-24"></a>
#### 2.2.4 Workflow and Resource Defects (QD-P-2.4)

##### QD-P-2.4.1 Incomplete Workflow Steps

**Definition**: Workflow step definitions are incomplete, potentially causing functional gaps.

**Why the LLM does not proactively notice**: The LLM will not proactively discover the structural gap of "incomplete workflow steps."

**Typical Manifestations**:

- Workflow is missing critical steps
- Workflow step order is unreasonable
- Workflow step dependencies are not defined

**Severity**: — (L1) / P1 (L2) / P0 (L3)

**Remediation Guidance**:

- Complete the workflow steps
- Define step order and dependencies
- Add step descriptions

**Example**:

| Version | Content |
| --- | --- |
| **Defective** | "Workflow: (1) Query data; (2) Generate report." |
| **Diagnosis** | Missing the "data analysis" step; may result in insufficient report quality |
| **Fixed** | "Workflow: (1) Query data; (2) Analyze data; (3) Generate report. Step dependencies: (2) depends on (1); (3) depends on (2)." |

##### QD-P-2.4.2 Undeclared Resources/Tools

**Definition**: The resources or tools used are not declared, preventing the Agent from determining available resources.

**Why the LLM does not proactively notice**: The LLM will not proactively discover the structural gap of "undeclared resources/tools."

**Typical Manifestations**:

- Not declaring the databases, APIs, or tools used
- Not declaring resource/tool access permissions
- Not declaring resource/tool usage methods

**Severity**: — (L1) / P0 (L2/L3)

**Remediation Guidance**:

- Explicitly declare the resources/tools used
- Define resource/tool access permissions
- Define resource/tool usage methods

**Example**:

| Version | Content |
| --- | --- |
| **Defective** | "Query data." |
| **Diagnosis** | The database or API used is not declared |
| **Fixed** | "Query data using the 'User Database' (db_users, read-only permission)." |

##### QD-P-2.4.3 Missing Tool Invocation Specification

**Definition**: Tool invocation specifications are not defined, potentially causing invocation failures or privilege escalation.

**Why the LLM does not proactively notice**: The LLM will not proactively discover the structural gap of "missing tool invocation specification."

**Typical Manifestations**:

- Tool invocation parameter specifications are not defined
- Tool invocation sequence specifications are not defined
- Handling when tool invocation fails is not defined

**Severity**: — (L1) / P0 (L2/L3)

**Remediation Guidance**:

- Define tool invocation parameter specifications
- Define tool invocation sequence specifications
- Define handling when tool invocation fails

**Example**:

| Version | Content |
| --- | --- |
| **Defective** | "Invoke the API to query data." |
| **Diagnosis** | API invocation specification is not defined; may cause invocation failures |
| **Fixed** | "Invoke the API to query data. Invocation specification: API name = query_user_data, required parameter = userId, optional parameter = scope. On failure: prompt the user and attempt the local data source." |

<a id="225-constraint-and-boundary-defects-qd-p-25"></a>
#### 2.2.5 Constraint and Boundary Defects (QD-P-2.5)

##### QD-P-2.5.1 Missing Termination Constraints

**Definition**: Termination constraints are not defined, potentially causing infinite loops or resource exhaustion.

**Why the LLM does not proactively notice**: The LLM will not proactively discover the completeness gap of "missing termination constraints."

**Typical Manifestations**:

- Loop termination conditions are not defined
- Recursion termination conditions are not defined
- Maximum iteration count is not defined

**Severity**: — (L1) / P1 (L2) / P0 (L3)

**Remediation Guidance**:

- Define loop termination conditions
- Define recursion termination conditions
- Define maximum iteration count

**Example**:

| Version | Content |
| --- | --- |
| **Defective** | "Continuously monitor user messages and process them." |
| **Diagnosis** | Termination conditions are not defined; may cause infinite loops |
| **Fixed** | "Monitor user messages and process them. Termination conditions: User sends 'end' or no new messages for more than 5 minutes. Maximum iterations: 100." |

##### QD-P-2.5.2 Missing Security Boundary Constraints

**Definition**: Security boundary constraints are not defined, potentially causing security risks.

**Why the LLM does not proactively notice**: The LLM will not proactively discover the security gap of "missing security boundary constraints."

**Typical Manifestations**:

- Prohibited operations are not defined
- Sensitive data access boundaries are not defined
- External system access boundaries are not defined

**Severity**: P0 (all levels)

**Remediation Guidance**:

- Explicitly define prohibited operations
- Define sensitive data access boundaries
- Define external system access boundaries

**Example**:

| Version | Content |
| --- | --- |
| **Defective** | "Access the user's file system." |
| **Diagnosis** | Security boundaries are not defined; may cause privilege escalation |
| **Fixed** | "Access the user's file system. Security boundaries: Only access directories specified by the user. Accessing directories containing 'privacy' or 'sensitive' keywords is prohibited. Delete and move operations are prohibited." |

##### QD-P-2.5.3 Missing Permission Control Boundaries

**Definition**: Permission control boundaries are not defined, potentially causing privilege escalation.

**Why the LLM does not proactively notice**: The LLM will not proactively discover the security gap of "missing permission control boundaries."

**Typical Manifestations**:

- The Agent's permission scope is not defined
- Permission elevation conditions are not defined
- Handling of privilege escalation operations is not defined

**Severity**: — (L1) / P1 (L2) / P0 (L3)

**Remediation Guidance**:

- Define the Agent's permission scope
- Define permission elevation conditions
- Define handling of privilege escalation operations

**Example**:

| Version | Content |
| --- | --- |
| **Defective** | "Manage user data." |
| **Diagnosis** | Permission boundaries are not defined; may cause privilege escalation |
| **Fixed** | "Manage user data. Permission boundaries: Query and update only. Delete is prohibited. Cross-user operations are prohibited. Accessing data for which permission has not been granted is prohibited." |

##### QD-P-2.5.4 Undefined Constraint Priority

**Definition**: Arbitration rules for multiple constraints in potential conflict scenarios are not defined.

**Why the LLM does not proactively notice**: The LLM can identify explicit conflicts, but will not proactively discover "missing arbitration for potential conflicts."

**Difference from QD-P-1.1.2 "Priority Conflict"**:

- QD-P-1.1.2: An explicit conflict exists (e.g., "MUST A" and "A is prohibited"); the LLM can discover it
- QD-P-2.5.4: The constraints themselves are not in conflict, but arbitration rules for potential conflicts are not defined

**Typical Manifestations**:

- Multiple "SHOULD" constraints have potential conflicts
- Multiple optimization objectives have potential conflicts
- Decision rules for when conflicts occur are not defined

**Severity**: P1 (L1) / P0 (L2/L3)

**Remediation Guidance**:

- Identify potential constraint conflict scenarios
- Define priority rules
- Define arbitration principles

**Example**:

| Version | Content |
| --- | --- |
| **Defective** | "Should respond quickly. Should answer completely. Should protect privacy." |
| **Diagnosis** | Potential conflict (fast vs. complete); arbitration rules are not defined |
| **Fixed** | "Priority rule: Privacy/Security > Completeness > Response Speed. When constraints conflict, decide according to this priority." |

##### QD-P-2.5.5 Missing Resource Invocation Frequency Limits

**Definition**: Resource invocation frequency limits are not defined, potentially causing resource abuse.

**Why the LLM does not proactively notice**: The LLM will not proactively discover the completeness gap of "missing resource invocation frequency limits."

**Typical Manifestations**:

- API invocation frequency limits are not defined
- Database query frequency limits are not defined
- External system access frequency limits are not defined

**Severity**: — (L1) / P1 (L2) / P0 (L3)

**Remediation Guidance**:

- Define API invocation frequency limits
- Define database query frequency limits
- Define external system access frequency limits

**Example**:

| Version | Content |
| --- | --- |
| **Defective** | "Invoke the API to query data." |
| **Diagnosis** | Invocation frequency limits are not defined; may cause API abuse |
| **Fixed** | "Invoke the API to query data. Frequency limit: Maximum 10 calls per minute. When the limit is exceeded, cache results and prompt the user to try again later." |

<a id="226-exception-handling-defects-qd-p-26"></a>
#### 2.2.6 Exception Handling Defects (QD-P-2.6)

##### QD-P-2.6.1 Runtime Exceptions Not Covered

**Definition**: Handling of runtime exceptions is not defined, potentially causing Agent crashes.

**Why the LLM does not proactively notice**: The LLM will not proactively discover the completeness gap of "runtime exceptions not covered."

**Typical Manifestations**:

- Handling of tool invocation failures is not defined
- Handling of data parsing failures is not defined
- Handling of external system exceptions is not defined

**Severity**: — (L1) / P0 (L3)

**Remediation Guidance**:

- Define handling of tool invocation failures
- Define handling of data parsing failures
- Define handling of external system exceptions

**Example**:

| Version | Content |
| --- | --- |
| **Defective** | "Invoke the API to query data." |
| **Diagnosis** | Handling when the API call fails is not defined |
| **Fixed** | "Invoke the API to query data. Exception handling: If the API call fails, attempt the local cache. If the local cache has no data, prompt the user and provide an alternative." |

##### QD-P-2.6.2 Missing Degradation and Recovery Strategy

**Definition**: Degradation and recovery strategies are not defined, potentially preventing the Agent from recovering.

**Why the LLM does not proactively notice**: The LLM will not proactively discover the completeness gap of "missing degradation and recovery strategy."

**Typical Manifestations**:

- Functional degradation strategies are not defined
- Error recovery strategies are not defined
- Methods for recovering from anomalous states are not defined

**Severity**: — (L1) / P0 (L3)

**Remediation Guidance**:

- Define functional degradation strategies
- Define error recovery strategies
- Define methods for recovering from anomalous states

**Example**:

| Version | Content |
| --- | --- |
| **Defective** | "Analyze user data." |
| **Diagnosis** | Degradation and recovery strategy is not defined |
| **Fixed** | "Analyze user data. Degradation strategy: If full analysis fails, provide a simplified analysis. Recovery strategy: If simplified analysis fails, prompt the user and log the error. On the next session, prompt the user to retry." |

##### QD-P-2.6.3 Unreasonable Retry Mechanism

**Definition**: The retry mechanism is unreasonably defined, potentially causing resource waste.

**Why the LLM does not proactively notice**: The LLM will not proactively discover the completeness gap of "unreasonable retry mechanism."

**Typical Manifestations**:

- Retry count limit is not defined
- Retry interval is not defined
- Handling after retry failure is not defined

**Severity**: — (L1) / P1 (L3)

**Remediation Guidance**:

- Define retry count limit
- Define retry interval
- Define handling after retry failure

**Example**:

| Version | Content |
| --- | --- |
| **Defective** | "If the API call fails, retry." |
| **Diagnosis** | Retry count and interval are not defined; may cause infinite retries |
| **Fixed** | "If the API call fails, retry up to 3 times, with a 1-second interval. If all 3 attempts fail, prompt the user and log the error." |

<a id="227-example-design-defects-qd-p-27"></a>
#### 2.2.7 Example Design Defects (QD-P-2.7)

##### QD-P-2.7.1 Insufficient Positive Example Representativeness

**Definition**: Positive examples lack sufficient representativeness, potentially preventing the Agent from correctly understanding expected behavior.

**Why the LLM does not proactively notice**: The LLM will not proactively discover the structural gap of "insufficient positive example representativeness."

**Typical Manifestations**:

- Positive example scenario coverage is insufficient
- Positive examples are too simplistic and do not cover boundary cases
- Positive examples are inconsistent with rules

**Severity**: P1 (L1/L2) / P0 (L3)

**Remediation Guidance**:

- Supplement positive examples to cover more scenarios
- Add boundary-case positive examples
- Ensure positive examples are consistent with rules

**Example**:

| Version | Content |
| --- | --- |
| **Defective** | Examples only cover simple scenarios; boundary cases are not covered |
| **Diagnosis** | Insufficient positive example representativeness; may prevent the Agent from handling boundary cases |
| **Fixed** | Supplement examples covering boundary cases, such as "how to handle when user input is too long," "how to handle when user input is missing" |

##### QD-P-2.7.2 Insufficient Counter-Example Coverage

**Definition**: Counter-examples do not cover typical error patterns, preventing the Agent from correctly handling errors.

**Why the LLM does not proactively notice**: The LLM will not proactively judge "counter-example coverage adequacy."

**Typical Manifestations**:

- No counter-examples are provided
- Counter-example types are monotonous
- Counter-examples do not cover typical error patterns

**Severity**: P1 (L1/L2) / P0 (L3)

**Remediation Guidance**:

- Identify typical error patterns
- Provide counter-examples for each error type
- Explain the error cause and correct approach for each counter-example

**Example**:

| Version | Content |
| --- | --- |
| **Defective** | (No counter-examples provided) |
| **Diagnosis** | No counter-examples provided; Agent may not correctly handle errors |
| **Fixed** | Counter-example: 1. User: "Check my bank card balance for me." Incorrect response: "Sure, your bank card balance is XXX." Error cause: Directly querying bank card balance involves privacy, and the system does not have this permission. Correct response: "Sorry, I cannot check bank card balances. Please log into your banking app or contact bank customer service." |

##### QD-P-2.7.3 Missing Boundary-Case Examples

**Definition**: No examples are provided for boundary cases (e.g., empty input, excessively long input, anomalous input).

**Why the LLM does not proactively notice**: The LLM will not proactively consider "boundary cases."

**Typical Manifestations**:

- No boundary-case examples are provided
- Boundary-case examples are incomplete

**Severity**: P1 (L1/L2) / P0 (L3)

**Remediation Guidance**:

- Identify boundary cases (empty input, excessively long input, anomalous format, etc.)
- Provide examples for boundary cases
- Define handling methods for boundary cases

**Example**:

| Version | Content |
| --- | --- |
| **Defective** | Example: Normal user query |
| **Diagnosis** | No boundary-case examples provided |
| **Fixed** | Boundary-case examples: 1. Empty input: User: (empty) Assistant: "Hello, how can I help you?" 2. Excessively long input: User: (text exceeding 1,000 words) Assistant: "Your input is quite long. I have extracted the key information for analysis..." (summarized processing) |

<a id="23-detection-method-checklist-mechanism"></a>
### 2.3 Detection Method: Checklist Mechanism

<a id="231-completeness-inspection-checklist"></a>
#### 2.3.1 Completeness Inspection Checklist

```
□ Structural and Normative
  □ Format Compliance: Is the Markdown hierarchy correct? Are code blocks properly closed?
  □ Reference Clarity: Are pronouns explicit? Do references have sources?
  □ Structural Hierarchy Reasonableness: Are paragraphs too long? Is the nesting depth excessive?
  □ Language Conciseness: Are there redundant expressions?

□ Input Definition
  □ Are all input sources declared?
  □ Are all input formats constrained?
  □ Are required and optional inputs distinguished?
  □ Is handling of missing input defined?

□ Output Definition
  □ Is the output format defined?
  □ Is the output Schema complete?
  □ Is the output stability mechanism defined?
  □ Are privacy masking rules defined?

□ Workflow and Resources
  □ Are workflow steps complete?
  □ Are all tool invocations declared?
  □ Are tool invocation specifications (parameters, return values, error handling, permissions) defined?
  □ Are tool permissions scoped?

□ Constraints and Boundaries
  □ Are termination constraints (max retries, timeout) defined?
  □ Are security boundaries (prohibited operations) defined?
  □ Are permission control boundaries (read-only/read-write) defined?
  □ Are constraint priorities defined?

□ Exception Handling
  □ Are runtime exceptions (tool failure, timeout) covered?
  □ Are degradation and recovery strategies defined?
  □ Is the retry mechanism (count, interval, conditions) reasonable?

□ Example Design
  □ Do positive examples cover typical scenarios?
  □ Do counter-examples cover typical errors?
  □ Are there examples for boundary cases?
```

<a id="232-detection-process"></a>
#### 2.3.2 Detection Process

```
Detection Process:

Step 1: Structure Scan
  → Use format checking tools (e.g., Markdown linter)
  → Check format compliance

Step 2: Completeness Inspection
  → Use the Checklist to inspect the completeness of input, output, resource, and exception definitions item by item
  → Flag missing items

Step 3: Boundary Inspection
  → Use the boundary-scenario Checklist to inspect constraint and boundary coverage
  → Flag boundary gaps

Step 4: Example Inspection
  → Inspect the coverage of positive examples, counter-examples, and boundary cases
  → Flag missing examples

Step 5: Domain Adaptation Inspection
  → Combine with domain rule libraries to inspect domain-specific defects
  → Flag domain adaptation issues
```

<a id="24-defect-severity-classification"></a>
## 2.4 Defect Severity Classification

| Level | Symbol | Definition | Typical Defects | Disposition Priority |
| --- | --- | --- | --- | --- |
| **P0** | 🔴 | Prevents Agent functionality or introduces security risk | Missing termination constraints, missing security boundaries, unconstrained permissions, missing tool invocation specifications, undefined missing-input handling, uncovered runtime exceptions | **MUST be fixed** |
| **P1** | 🟡 | May cause behavioral instability or functional defects | Incomplete input/output definitions, undefined constraint priority, missing degradation strategy, unreasonable retry mechanism, insufficient example coverage | **SHOULD be fixed** |
| **P2** | 🟢 | Affects readability or efficiency, but does not impact functionality | Format compliance, language conciseness, structural hierarchy reasonableness | **MAY be fixed** |

<a id="25-part-summary"></a>
## 2.5 Part Summary

<a id="251-core-points"></a>
### 2.5.1 Core Points

The defects listed in this part all fall within the scope of things the LLM **will not proactively notice**. This means:

- **For authors**: These elements MUST be proactively completed during the authoring phase
- **For inspection processes**: A Checklist MUST be used for item-by-item inspection; cannot rely on the LLM to autonomously discover
- **For framework design**: This part is the core value of the framework, ensuring completeness

<a id="252-relationship-to-part-1"></a>
### 2.5.2 Relationship to Part 1

| Dimension | Part 1 | Part 2 |
| --- | --- | --- |
| **Problem nature** | "Written incorrectly" | "Didn't write the critical content" |
| **Detection method** | Direct reading | Checklist inspection |
| **LLM role** | Proactive discovery | Passive response |
| **Framework value** | List common errors; help avoid | Ensure completeness; no missing critical content |

<a id="253-practice-recommendations"></a>
### 2.5.3 Practice Recommendations

```
Practice Recommendations:

1. Authoring Phase:
   - Use the Completeness Checklist as an authoring template
   - Ensure every inspection item has a definition

2. Review Phase:
   - Part 1 defects: Have the LLM directly read and inspect
   - Part 2 defects: Use the Checklist for item-by-item inspection

3. Pre-Launch:
   - P0 defects MUST be fixed
   - P1 defects SHOULD be fixed
   - P2 defects MAY be handled as appropriate

4. Continuous Improvement:
   - Supplement the Checklist based on issues discovered in actual operation
   - Supplement domain-specific inspection items based on domain characteristics
```

---

<a id="3-tiered-inspection-mechanism"></a>
## 3 Tiered Inspection Mechanism

<a id="31-agent-level-definitions"></a>
### 3.1 Agent Level Definitions

<a id="311-three-agent-levels"></a>
#### 3.1.1 Three Agent Levels

| Level | Name | Definition | Typical Characteristics |
| --- | --- | --- | --- |
| **L1** | Single-turn Task | Single invocation completes the task; no state retention | Single skill, no tool invocations, no multi-turn dialogue, no complex reasoning |
| **L2** | Multi-turn Interactive | Requires multi-turn dialogue or simple tool invocations | Multi-turn dialogue, 1–3 tools, simple workflow, limited state |
| **L3** | Complex Agent | Complex workflow, multi-tool collaboration, strong constraints | 4+ tools, complex workflow, security constraints, permission control, exception handling |

<a id="312-three-level-agent-determination-criteria"></a>
#### 3.1.2 Three-Level Agent Determination Criteria

| Level | Determination Criteria (any 2 or more satisfied) |
| --- | --- |
| **L1** | ✓ Single skill (e.g., translation, summarization, Q&A)<br>✓ No tool invocations<br>✓ No multi-turn dialogue<br>✓ No complex reasoning |
| **L2** | ✓ Multi-turn dialogue<br>✓ 1–3 tool invocations<br>✓ Simple workflow (≤ 5 steps)<br>✓ Limited state management |
| **L3** | ✓ 4+ tool invocations<br>✓ Complex workflow (> 5 steps)<br>✓ Security-sensitive (involves privacy/permissions)<br>✓ Requires exception handling mechanisms |

<a id="313-typical-examples-by-agent-level"></a>
#### 3.1.3 Typical Examples by Agent Level

| Level | Typical Examples |
| --- | --- |
| **L1** | Translation assistant, summarization, single-turn Q&A, format conversion, simple classification |
| **L2** | Customer service bot, document Q&A, simple search assistant, schedule management, email assistant |
| **L3** | Financial analysis Agent, code execution Agent, data processing Agent, security-sensitive Agent, multi-system collaboration Agent |

---

<a id="32-defect-severity-level-definitions"></a>
### 3.2 Defect Severity Level Definitions

<a id="321-three-severity-levels"></a>
#### 3.2.1 Three Severity Levels

| Level | Symbol | Definition | Disposition Priority |
| --- | --- | --- | --- |
| **P0** | 🔴 | Prevents Agent functionality or introduces security risk | **MUST be fixed** |
| **P1** | 🟡 | May cause behavioral instability or functional defects | **SHOULD be fixed** |
| **P2** | 🟢 | Affects readability or efficiency, but does not impact functionality | **MAY be fixed** |

<a id="322-relationship-between-severity-level-and-agent-level"></a>
#### 3.2.2 Relationship Between Severity Level and Agent Level

**Core Principle**: Defect Severity Level and Agent Level are two orthogonal dimensions, but the severity of the same defect may differ across different Agent Levels.

| Relationship | Description |
| --- | --- |
| **Defect Severity Level** | Determines "whether it MUST be fixed"; in principle, independent of Agent Level |
| **Agent Level** | Determines "which items to inspect" — i.e., the inspection scope |
| **Synergy** | Agent Level determines the inspection scope → defects within that scope are handled according to their Severity Level |
| **Special Case** | The same defect may have its severity upgraded at different Agent Levels (because complexity amplifies the impact scope) |

<a id="323-rules-for-severity-variation-across-agent-levels"></a>
#### 3.2.3 Rules for Severity Variation Across Agent Levels

| Variation Pattern | Description | Typical Example |
| --- | --- | --- |
| **🟢→🟡→🔴** | Impact scope progressively amplifies; severity progressively upgrades | Insufficient example coverage (L1P2→L3P0) |
| **🟡→🔴→🔴** | Becomes a blocking condition at L2; remains blocking at L3 | Undefined output format (L1P1→L2/L3P0) |
| **🔴→🔴→🔴** | Blocking at all levels; impact independent of complexity | Direct contradiction, missing security boundary constraints |
| **🟡→🟡→🟡** | Consistent impact across all levels; does not change with complexity | Role definition clarity, language conciseness |
| **🟢→🟢→🟢** | Optional at all levels; limited impact scope | Format compliance (L3 inspection only) |

---

<a id="33-tiered-inspection-checklist"></a>
### 3.3 Tiered Inspection Checklist

<a id="331-checklist-design-principles"></a>
#### 3.3.1 Checklist Design Principles

| Principle | Description |
| --- | --- |
| **Upward-compatible** | Higher-level inspection items include lower-level items (L3 ⊃ L2 ⊃ L1) |
| **Core-focused** | L1 focuses on P0 defects; L2 progressively covers P1; L3 provides full coverage |
| **Number-ordered** | Inspection items are ordered by Part 1 and Part 2 numbering (QD-P-1.1.1 → QD-P-1.6.7 → QD-P-2.1.1 → QD-P-2.7.3) |

<a id="332-complete-tiered-inspection-checklist"></a>
#### 3.3.2 Complete Tiered Inspection Checklist

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

<a id="333-inspection-item-statistics"></a>
#### 3.3.3 Inspection Item Statistics

| Agent Level | Total Items | P0 Items | P1 Items | P2 Items |
| --- | --- | --- | --- | --- |
| **L1** | 30 | 8 | 20 | 2 |
| **L2** | 40 | 18 | 20 | 2 |
| **L3** | 47 | 35 | 7 | 5 |

---

<a id="34-inspection-process"></a>
### 3.4 Inspection Process

<a id="341-standard-inspection-process"></a>
#### 3.4.1 Standard Inspection Process

```
Inspection Process:

Step 1: Determine Agent Level
  → Determine L1/L2/L3 based on Agent characteristics
  → Refer to determination criteria (any 2 or more satisfied)

Step 2: Determine Inspection Scope
  → Determine the number of inspection items based on Agent Level
  → L1: 30 items, L2: 40 items, L3: 47 items

Step 3: Execute Inspection
  → Inspect item by item in numerical order
  → Apply the severity level determination for the corresponding level

Step 4: Classify and Handle
  → P0 not passed → MUST be fixed
  → P1 not passed → SHOULD be fixed (document risk)
  → P2 not passed → MAY be fixed (handle as appropriate)

Step 5: Confirm Pass
  → All P0 inspection items passed
  → P1 inspection items assessed (fixed or risk accepted)
  → Generate inspection report
```

<a id="342-recommended-inspection-timing"></a>
#### 3.4.2 Recommended Inspection Timing

| Timing | Applicable Levels | Inspection Method |
| --- | --- | --- |
| **Authoring phase** | L1/L2/L3 | Due to the large number of inspection items, full automated Agent Checklist inspection is recommended |
| **Review phase** | L2/L3 | Due to the large number of inspection items, full automated Agent Checklist inspection is recommended |
| **Pre-launch** | L3 | Due to the large number of inspection items, full automated Agent Checklist inspection is recommended |
| **Continuous iteration** | — | Automated Agent Checklist inspection is recommended for each update |
| **Troubleshooting** | L1/L2/L3 | Prioritize inspection of the corresponding level's P0 items when Agent behavior is anomalous |

<a id="343-recommended-review-methods"></a>
#### 3.4.3 Recommended Review Methods

| Agent Level | Review Method |
| --- | --- |
| **L1** | Develop a Checklist based on lifecycle phases |
| **L2** | Develop a Checklist based on lifecycle phases |
| **L3** | Develop a Checklist based on lifecycle phases |

---

<a id="35-usage-examples"></a>
### 3.5 Usage Examples

<a id="351-l1-agent-inspection-example"></a>
#### 3.5.1 L1 Agent Inspection Example

**Scenario**: Translation Assistant

**Level Determination**: L1 (single skill, no tool invocations, no multi-turn dialogue)

**Inspection Scope**: 30 items

**Sample Inspection Results**:

| QD-P ID | Defect Name | Result | Severity | Handling |
| --- | --- | --- | --- | --- |
| QD-P-1.1.1 | Direct Contradiction | ✅ PASS | P0 | — |
| QD-P-1.1.2 | Priority Conflict | ✅ PASS | P1 | — |
| QD-P-1.2.1 | Role-Responsibility Mismatch | ✅ PASS | P0 | — |
| QD-P-1.3.1 | Quantifier Misuse | ⚠️ FAIL | P1 | SHOULD fix |
| QD-P-2.2.1 | Undeclared Input Source | ✅ PASS | P0 | — |
| QD-P-2.3.1 | Undefined Output Format | ⚠️ FAIL | P1 | SHOULD fix |

**Conclusion**: All P0 items passed; P1 items failed. Recommended to fix before launch.

<a id="352-l2-agent-inspection-example"></a>
#### 3.5.2 L2 Agent Inspection Example

**Scenario**: Customer Service Bot

**Level Determination**: L2 (multi-turn dialogue, 1–3 tools, simple workflow)

**Inspection Scope**: 40 items

**Sample Inspection Results**:

| QD-P ID | Defect Name | Result | Severity | Handling |
| --- | --- | --- | --- | --- |
| QD-P-1.1.1 | Direct Contradiction | ✅ PASS | P0 | — |
| QD-P-1.3.3 | Undefined Boundaries | ❌ FAIL | P0 | **MUST fix** |
| QD-P-1.5.2 | Resources Do Not Support Workflow | ✅ PASS | P0 | — |
| QD-P-2.4.2 | Undeclared Resources/Tools | ❌ FAIL | P0 | **MUST fix** |
| QD-P-2.5.1 | Missing Termination Constraints | ⚠️ FAIL | P1 | SHOULD fix |

**Conclusion**: P0 items failed; MUST be fixed before launch.

<a id="353-l3-agent-inspection-example"></a>
#### 3.5.3 L3 Agent Inspection Example

**Scenario**: Financial Analysis Agent

**Level Determination**: L3 (4+ tools, complex workflow, security-sensitive)

**Inspection Scope**: 47 items (full coverage)

**Sample Inspection Results**:

| QD-P ID | Defect Name | Result | Severity | Handling |
| --- | --- | --- | --- | --- |
| QD-P-1.1.2 | Priority Conflict | ❌ FAIL | P0 | **MUST fix** |
| QD-P-1.6.1 | Critical Decision Word Vagueness | ❌ FAIL | P0 | **MUST fix** |
| QD-P-2.3.4 | Missing Security/Privacy Filtering | ❌ FAIL | P0 | **MUST fix** |
| QD-P-2.5.5 | Missing Resource Invocation Frequency Limits | ⚠️ FAIL | P0 | **MUST fix** |
| QD-P-2.6.1 | Runtime Exceptions Not Covered | ❌ FAIL | P0 | **MUST fix** |

**Conclusion**: P0 items failed; MUST all be fixed before launch.

---

<a id="36-part-summary"></a>
### 3.6 Part Summary

<a id="361-core-points"></a>
#### 3.6.1 Core Points

| Point | Description |
| --- | --- |
| **Tiering mechanism value** | Addresses the complexity problem in practice; reduces inspection cost for simple Agents |
| **Upward-compatible** | L3 ⊃ L2 ⊃ L1; higher levels include lower-level inspection items |
| **Severity level orthogonality** | Defect Severity Level is orthogonal to Agent Level, but the same defect may be upgraded at different levels |
| **Standardized inspection process** | Determine level → Determine scope → Execute inspection → Classify and handle → Confirm pass |

<a id="362-relationship-to-chapters-1-and-2"></a>
#### 3.6.2 Relationship to Chapters 1 and 2

| Dimension | Part 1 | Part 2 | Part 3 |
| --- | --- | --- | --- |
| **Positioning** | LLM autonomously detectable defects | Defects requiring explicit prompts | Tiered inspection mechanism |
| **Value** | List common errors; help avoid | Ensure completeness; no missing critical content | Provide tiered Checklist; reduce adoption cost |
| **Detection method** | Direct reading | Checklist inspection | Tiered Checklist inspection |
| **LLM role** | Proactive discovery | Passive response | Passive response (by level) |

<a id="363-practice-recommendations"></a>
#### 3.6.3 Practice Recommendations

```
Practice Recommendations:

1. Agent Design Phase:
   → Determine the level based on Agent characteristics (L1/L2/L3)
   → Design with reference to the corresponding level's inspection checklist

2. Inspection Phase:
   → Use the corresponding level's inspection checklist for item-by-item inspection
   → P0 MUST be fixed; P1 SHOULD be fixed

3. Agent Upgrade Phase:
   → If Agent complexity increases, re-determine the level
   → Re-inspect using the new level's inspection checklist

4. Team Collaboration:
   → L1: Single-person rapid review
   → L2: Two-person standard review
   → L3: Multi-person full review meeting
```

---

<a id="4-quantitative-scoring-mechanism"></a>
## 4 Quantitative Scoring Mechanism

> This chapter defines a quantifiable, reviewable scoring method for Inspect Prompt results.  
> **Note**: The score does not replace compliance determination. If any `P0` defect exists, the result is still FAIL, but the score is still output for analysis.

<a id="41-scoring-principles"></a>
### 4.1 Scoring Principles

| Principle | Description |
| --- | --- |
| Total score of 100 | Deduction-based: baseline score (100) − defect deductions |
| Weight ratio | `P0 : P1 : P2 = 5 : 3 : 1` |
| Level differentiation | Different Agent Levels have different inspection item counts; per-item weight adjusts automatically |
| Mathematical self-consistency | After all defect deductions, minimum score ≥ 0; maximum score = 100 |
| Simple rule | For the same inspection item number, the weight is deducted only once regardless of how many defect instances are found |
| Gate condition | Any `P0` defect → evaluation FAIL (score is still output) |

<a id="42-calculation-steps"></a>
### 4.2 Calculation Steps

**Step 1: Determine Agent Level**

- Determine L1/L2/L3 according to Chapter 3 of this document.

**Step 2: Calculate Total Weight**

- Total weight $W_{total}$:

  $$
  W_{total} = 5\cdot N_{P0} + 3\cdot N_{P1} + 1\cdot N_{P2}
  $$

  Where $N_{P0},N_{P1},N_{P2}$ come from the applicable inspection item statistics for that Agent Level (Section 3.3.3).

**Step 3: Calculate Base Score**

- Base score:

  $$
  base=\frac{100}{W_{total}}
  $$

**Step 4: Determine Per-Defect Deduction Values**

- $P0$ defect deduction = $base \times 5$
- $P1$ defect deduction = $base \times 3$
- $P2$ defect deduction = $base \times 1$

**Step 5: Calculate Total Deduction**

- Total deduction = sum of per-severity deductions for each failed inspection item number.
- **The same inspection item number is deducted only once, regardless of how many defect instances are found.**

**Step 6: Calculate Actual Score**

- Actual score:

  $$
  Score=\max(100-\text{Total Deduction},0)
  $$

**Step 7: Gate Determination**

- If any `P0` defect exists → result = FAIL (score is still output)
- Otherwise → result = PASS

<a id="43-per-sub-standard-inspection-item-distribution-table"></a>
### 4.3 Per-Sub-Standard Inspection Item Distribution Table (Inspect Prompt)

Based on the statistics from Section 3.3.3:

| Agent Level | Total Items | P0 Count | P1 Count | P2 Count | Total Weight $W_{total}$ | Base Score $base$ |
| --- | --- | --- | --- | --- | --- | --- |
| **L1** | 30 | 8 | 20 | 2 | $5\cdot8+3\cdot20+1\cdot2=102$ | $100/102=0.98$ |
| **L2** | 40 | 18 | 20 | 2 | $5\cdot18+3\cdot20+1\cdot2=152$ | $100/152=0.66$ |
| **L3** | 47 | 35 | 7 | 5 | $5\cdot35+3\cdot7+1\cdot5=201$ | $100/201=0.50$ |

<a id="44-defect-deduction-value-table"></a>
### 4.4 Defect Deduction Value Table (Example: Inspect Prompt L1)

L1: $base=0.98$

| Defect Level | Deduction Calculation | Deduction Value |
| --- | --- | --- |
| P0 | $base \times 5$ | $0.98\times5=4.90$ |
| P1 | $base \times 3$ | $0.98\times3=2.94$ |
| P2 | $base \times 1$ | $0.98\times1=0.98$ |

<a id="45-scoring-examples"></a>
### 4.5 Scoring Examples (Including Gate: FAIL)

**Example Scenario**: L2 Agent  
After inspection, the failed items (deduplicated by inspection item number) are:

- Failed `P0` items: 2
- Failed `P1` items: 1
- Failed `P2` items: 0  
  Therefore, `P0` defect exists → Gate = FAIL.

L2:

- $W_{total}=152$
- $base=100/152=0.66$
- $P0$ deduction = $base\times5 = 3.29$
- $P1$ deduction = $base\times3 = 1.97$

**Total Deduction**:
$$
\text{Total Deduction} = 2\cdot3.29 + 1\cdot1.97
= 6.58 + 1.97
= 8.55
$$

**Score**:
$$
Score = 100 - 8.55 = 91.45
$$

**Result**:

- result = FAIL (P0 exists)
- score = 91.45

**Scoring Report (Example JSON)**:

```json
{
  "check_id": "inspect-20260710-001",
  "framework": "SanityOps/Inspect Prompt",
  "level": "L2",
  "result": "FAIL",
  "score": 91.45,
  "defects": [
    {"check_id": "QD-P-1.1.1", "level": "P0", "found_count": 1},
    {"check_id": "QD-P-2.2.4", "level": "P0", "found_count": 1},
    {"check_id": "QD-P-1.3.2", "level": "P1", "found_count": 1}
  ]
}
```

<a id="46-multi-defect-handling-rules"></a>
### 4.6 Multi-Defect Handling Rules

- **Same inspection item number is counted as at most one failure**: Repeated triggering of the same inspection item results in only one deduction of that item's corresponding severity-level weight.
- **Multiple defects falling under the same inspection item do not incur duplicate deductions**: For example, if the same QD-P number has multiple issues in a single inspection, it is still handled as "that number failed once."
- **Gate and level are based on the severity level at the Agent's level**.

---

## Appendix A: Minimum Rule Sets

> **Minimum Rule Sets** define the inspection items that MUST be passed for each Agent Level, forming the core basis for compliance determination.

<a id="a1-l1-minimum-rule-set"></a>
### A.1 L1 Minimum Rule Set (8 P0 Items)

| QD-P ID | Defect Name | Category |
| --- | --- | --- |
| QD-P-1.1.1 | Direct Contradiction | Contradiction |
| QD-P-1.1.3 | Example-Rule Contradiction | Contradiction |
| QD-P-1.2.1 | Role-Responsibility Mismatch | Mismatch |
| QD-P-1.2.3 | Constraint-Responsibility Mismatch | Mismatch |
| QD-P-1.5.1 | Responsibilities Do Not Support Objective | Implication |
| QD-P-2.2.1 | Undeclared Input Source | Input Definition |
| QD-P-2.3.4 | Missing Security/Privacy Filtering | Output Definition |
| QD-P-2.5.2 | Missing Security Boundary Constraints | Constraints/Boundaries |

> **L1 Agent Compliance Determination**: MUST pass the above 8 P0 inspection items. P1 items SHOULD be fixed; P2 items MAY be fixed.

<a id="a2-l2-minimum-rule-set"></a>
### A.2 L2 Minimum Rule Set (18 P0 Items)

| QD-P ID | Defect Name | Category |
| --- | --- | --- |
| QD-P-1.1.1 | Direct Contradiction | Contradiction |
| QD-P-1.1.3 | Example-Rule Contradiction | Contradiction |
| QD-P-1.2.1 | Role-Responsibility Mismatch | Mismatch |
| QD-P-1.2.3 | Constraint-Responsibility Mismatch | Mismatch |
| QD-P-1.3.3 | Undefined Boundaries | Scope Definition |
| QD-P-1.5.1 | Responsibilities Do Not Support Objective | Implication |
| QD-P-1.5.2 | Resources Do Not Support Workflow | Implication |
| QD-P-1.6.1 | Critical Decision Word Vagueness | Gray-Zone |
| QD-P-2.2.1 | Undeclared Input Source | Input Definition |
| QD-P-2.2.2 | Unconstrained Input Format | Input Definition |
| QD-P-2.2.3 | Required/Optional Not Distinguished | Input Definition |
| QD-P-2.2.4 | Undefined Missing-Input Handling | Input Definition |
| QD-P-2.3.1 | Undefined Output Format | Output Definition |
| QD-P-2.3.2 | Incomplete Output Schema | Output Definition |
| QD-P-2.3.4 | Missing Security/Privacy Filtering | Output Definition |
| QD-P-2.4.2 | Undeclared Resources/Tools | Workflow/Resources |
| QD-P-2.4.3 | Missing Tool Invocation Specification | Workflow/Resources |
| QD-P-2.5.2 | Missing Security Boundary Constraints | Constraints/Boundaries |

> **L2 Agent Compliance Determination**: MUST pass the above 18 P0 inspection items. P1 items SHOULD be fixed; P2 items MAY be fixed.

<a id="a3-l3-minimum-rule-set"></a>
### A.3 L3 Minimum Rule Set (34 P0 Items)

| QD-P ID | Defect Name | Category |
| --- | --- | --- |
| QD-P-1.1.1 | Direct Contradiction | Contradiction |
| QD-P-1.1.2 | Priority Conflict | Contradiction |
| QD-P-1.1.3 | Example-Rule Contradiction | Contradiction |
| QD-P-1.2.1 | Role-Responsibility Mismatch | Mismatch |
| QD-P-1.2.3 | Constraint-Responsibility Mismatch | Mismatch |
| QD-P-1.3.3 | Undefined Boundaries | Scope Definition |
| QD-P-1.5.1 | Responsibilities Do Not Support Objective | Implication |
| QD-P-1.5.2 | Resources Do Not Support Workflow | Implication |
| QD-P-1.6.1 | Critical Decision Word Vagueness | Gray-Zone |
| QD-P-1.6.2 | Rules Depending on Model Internal State | Gray-Zone |
| QD-P-1.6.3 | Soft Rule Interweaving Without Arbitration | Gray-Zone |
| QD-P-1.6.6 | Implicit Assumption Dependency | Gray-Zone |
| QD-P-1.6.7 | Non-Monotonic Reasoning Defects | Gray-Zone |
| QD-P-2.2.1 | Undeclared Input Source | Input Definition |
| QD-P-2.2.2 | Unconstrained Input Format | Input Definition |
| QD-P-2.2.3 | Required/Optional Not Distinguished | Input Definition |
| QD-P-2.2.4 | Undefined Missing-Input Handling | Input Definition |
| QD-P-2.3.1 | Undefined Output Format | Output Definition |
| QD-P-2.3.2 | Incomplete Output Schema | Output Definition |
| QD-P-2.3.3 | Missing Output Stability Assurance | Output Definition |
| QD-P-2.3.4 | Missing Security/Privacy Filtering | Output Definition |
| QD-P-2.4.1 | Incomplete Workflow Steps | Workflow/Resources |
| QD-P-2.4.2 | Undeclared Resources/Tools | Workflow/Resources |
| QD-P-2.4.3 | Missing Tool Invocation Specification | Workflow/Resources |
| QD-P-2.5.1 | Missing Termination Constraints | Constraints/Boundaries |
| QD-P-2.5.2 | Missing Security Boundary Constraints | Constraints/Boundaries |
| QD-P-2.5.3 | Missing Permission Control Boundaries | Constraints/Boundaries |
| QD-P-2.5.4 | Undefined Constraint Priority | Constraints/Boundaries |
| QD-P-2.5.5 | Missing Resource Invocation Frequency Limits | Constraints/Boundaries |
| QD-P-2.6.1 | Runtime Exceptions Not Covered | Exception Handling |
| QD-P-2.6.2 | Missing Degradation and Recovery Strategy | Exception Handling |
| QD-P-2.7.1 | Insufficient Positive Example Representativeness | Example Design |
| QD-P-2.7.2 | Insufficient Counter-Example Coverage | Example Design |
| QD-P-2.7.3 | Missing Boundary-Case Examples | Example Design |

> **L3 Agent Compliance Determination**: MUST pass the above 34 P0 inspection items. P1 items SHOULD be fixed; P2 items MAY be fixed.

<a id="a4-minimum-rule-set-usage-notes"></a>
### A.4 Minimum Rule Set Usage Notes

#### A.4.1 Rapid Determination Process

```
Step 1: Determine Agent Level (L1/L2/L3)
  → Refer to 3.1 Agent Level Definitions

Step 2: Execute the corresponding level's Minimum Rule Set inspection
  → L1: Inspect 8 items
  → L2: Inspect 18 items (includes L1's 8 items)
  → L3: Inspect 34 items (includes L2's 18 items)

Step 3: Compliance Determination
  → All P0 inspection items passed → Compliant
  → Any P0 inspection item failed → Non-compliant
```

#### A.4.2 Upward Compatibility

- **L2 Minimum Rule Set** includes all content from the **L1 Minimum Rule Set**
- **L3 Minimum Rule Set** includes all content from the **L2 Minimum Rule Set**
- When inspecting a higher-level Agent, lower-level inspection items are automatically covered

#### A.4.3 Version Evolution

- Minimum Rule Sets are adjusted as specification versions are updated
- When new defect types are added, assess whether they should be included in the Minimum Rule Set
- When defect severity levels are adjusted, re-assess the Minimum Rule Set

---

© 2026 Sanity AI Labs. Licensed under Creative Commons Attribution-ShareAlike 4.0 International.
https://www.sanityops.org  ·  hello@sanityops.org
v1.0  ·  September 2026
