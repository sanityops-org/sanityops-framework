---
title: Inspect Prompt
description: "Inspect Prompt specification: defect rules for reviewing System Prompts as Logic Artifacts."
---

# SanityOps Framework

# Inspect Prompt Specification

---

**Version**: v1.1

**Release Date**: October 2026

**Maintained by**: Sanity AI Labs

**License**: CC BY-SA 4.0

**Dependent Specification**: Core v1.1 (objects, Finding, `AC-L`, versioning and evidence)

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
  - [1.6 Gray-Zone Logic Defects](#16-gray-zone-logic-defects-qd-p-16)
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
  - [3.1 Agent Level Definitions (`AC-L`)](#31-agent-level-definitions)
  - [3.2 Defect Severity Level Definitions](#32-defect-severity-level-definitions)
  - [3.3 Tiered Inspection Checklist](#33-tiered-inspection-checklist)
    - [3.3.1 Checklist Design Principles](#331-checklist-design-principles)
    - [3.3.2 Complete Tiered Inspection Checklist](#332-complete-tiered-inspection-checklist)
    - [3.3.3 Inspection Item Statistics](#333-inspection-item-statistics)
    - [3.3.4 Four-State Inspection Results](#334-inspection-result-four-states)
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
- [Version History](#version-history)

---

## Foreword

> **Document design principle: serving both inspection and audit needs.**
>
> To reduce the risk of missed findings and to preserve traceable audit evidence, this document **allows the same object to be hit by multiple inspection items across different dimensions** — this may look like "similarity / duplication / subsumption" on the surface, but it is intentional by design, not redundancy.
>
> At the quantitative scoring stage, however, to avoid double deductions and to reflect the true quality of the inspected Logic Artifact objectively, same-source deduplication and merging must follow the "Multi-Defect Handling Rules" (§4.6) of this document: one root cause and one harm path are deducted only once.
>
> If you question whether certain inspection items are "overly redundant", verify consistency with counter-examples and edge cases — confirm whether the trigger conditions truly overlap and whether the attribution reaches consistent boundary conclusions — rather than concluding from surface similarity alone.

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
| **Orchestration and references to tools/Skills in the body** | How tools/Skills are invoked, parameterized, and constrained in the prompt body |
| **Final effective prompt and assembly contract** | The assembly result of template variables/placeholders (source, substitution, naming consistency) |
| **Example Design** | Positive examples, counter-examples, and boundary-condition examples |
| **Metadata declaration** | Version, owner, change log, target model (precondition) |

<a id="014-out-of-scope"></a>
#### 0.1.4 Out of Scope

| Out-of-Scope Item | Rationale |
| --- | --- |
| **Runtime behavior** | Belongs to the Risk subset |
| **Tool Schema** | Belongs to Inspect Tool (QD-T) scope |
| **Infrastructure configuration** | Belongs to the deployment layer |
| **Business process design** | Belongs to the product design layer |

**Tool/permission responsibility attribution** (to avoid double registration with QD-T / Cross / QD-PM):

| Situation | Attribution |
| --- | --- |
| Prompt body specifies wrong tool parameters | QD-P |
| Tool Schema missing parameters/return values | QD-T |
| Prompt and Tool declarations inconsistent | Cross (QD-PT) |
| Authorization-responsibility proportionality | QD-PM |

> The engineering implementation details of the assembly contract (placeholder source resolution, null-value behavior, high-trust-zone concatenation, etc.) are left for evaluation after code-contract is formalized.

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
├─ Quality (Service Quality)
│   ├─ Quality RAG-Agent ← RAG-Agent service quality assessment
│   └─ Quality Tool-Agent ← Tool-Agent service quality assessment
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
| **QD** | Quality Defect |
| **AC-L1/L2/L3** | Agent Level definitions (see Chapter 3) |
| **Checklist** | Quality Inspection Checklist |
| **Schema** | Data Structure Definition |
| **API** | Application Programming Interface |

<a id="025-defect-level-definitions-p0p1p2"></a>
#### 0.2.5 Defect Level Definitions (P0/P1/P2)

| Symbol | Level | Meaning |
| --- | --- | --- |
| 🔴 | **P0** | Prevents Agent functionality or introduces security risk → **MUST be fixed** |
| 🟡 | **P1** | May cause behavioral instability or functional defects → **SHOULD be fixed before release** |
| 🟢 | **P2** | Affects readability or efficiency, but does not impact functionality → **SHOULD be included in the improvement plan or risk register** |

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
| **Contextually self-contained** | In most cases, can be determined without external knowledge or domain experts |
| **Binary-decidable** | In most cases present or absent, but a gray zone exists (see 1.6) |
| **LLM-endogenous capability** | Mainstream LLMs have acquired the relevant logical reasoning capabilities during pre-training |

<a id="112-detection-method"></a>
#### 1.1.2 Detection Method

| Detection Aspect | Description |
| --- | --- |
| **Trigger condition** | Direct reading of the System Prompt text; no explicit guidance or special instructions needed |
| **Detection efficiency** | Discoverable in a single read; no multi-turn dialogue or tool assistance required |
| **Accuracy** | Implementers MUST report and continuously monitor on their own annotated sets; the following figures are empirical references (typical manifestations ≈ ≥90%) |
| **False positive rate** | Depends on whether applicability preconditions are explicit; boundary-ambiguous cases may produce false positives and require human review |

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
| **Fixed** | "You may access directories explicitly specified by the user (e.g., /tmp/user_workspace). Accessing other user directories under /etc or /home, or any file containing sensitive data such as national ID numbers or bank account numbers, is prohibited." |

##### QD-P-1.1.2 Priority Conflict

**Definition**: Multiple constraints or directives conflict in specific scenarios, and no priority rules are defined.

**Detection Principle**: The LLM can identify the intersection points of multiple constraints in specific scenarios and detect the absence of decision rules.

**Typical Manifestations**:

- Multiple "MUST" constraints cannot be simultaneously satisfied in specific scenarios
- Security constraints conflict with efficiency constraints; no arbitration defined
- Multi-dimensional evaluation criteria have no weight definitions

**Severity**: P1 (L1/L2) / P0 (L3)

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
| **Defective** | Rule: "Answers MUST be concise, no more than 50 characters." Example: "User: What's the weather today? Assistant: Today is sunny with temperatures between 22 and 28 degrees Celsius, moderate humidity, very suitable for outdoor activities. I recommend bringing sunglasses and sunscreen, staying hydrated, avoiding prolonged sun exposure, and adding clothing as temperatures vary between morning and evening." (clearly exceeds 50 characters) |
| **Diagnosis** | The example output clearly exceeds 50 characters, contradicting the rule; this weakens the rule's binding force |
| **Fixed** | Rule: "Answers MUST be concise, no more than 50 characters." Example: "User: What's the weather today? Assistant: Sunny, 25°C, suitable for outdoor activities." |

<a id="122-mismatch-defects-qd-p-12"></a>
#### 1.2.2 Mismatch Defects (QD-P-1.2)

##### QD-P-1.2.1 Role-Responsibility Mismatch

**Definition**: The identity/capability scope defined by the role does not match the behavioral requirements defined by the responsibilities. Determination should be based on capability, authorization, or task conflicts, not on the semantics of the role name; if the role has declared a handoff mechanism (responsibility has been transferred out), it does not constitute a defect. If it constitutes a defect, it is P0.

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

**Definition**: The identity/style defined by the role is inconsistent with the required output style. It is determined as a defect only when the style requirement is explicitly incompatible.

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

##### QD-P-1.2.4 Identity and Anthropomorphization Boundaries

**Definition**: The prompt does not declare an AI identity, or allows the Agent to impersonate a real person or organization, leading to user misunderstanding or trust abuse.

**Detection Principle**: The LLM can identify the semantic conflict between "claiming to be a real person/organization" and "declaring itself as AI," but may not proactively notice the absence of an identity declaration.

**Typical Manifestations**:

- Does not declare itself as an AI assistant
- Allows the Agent to claim to be a real person, doctor, lawyer, or other identity
- Allows the Agent to impersonate a specific organization or brand

**Severity**: P1 (AC-L1/AC-L2/AC-L3); P0 when facing consumer (C-end) users

**Remediation Guidance**:

- Explicitly declare the AI identity in the System Prompt
- Prohibit impersonating real persons or organizations
- When professional identities are involved, state the "assistive" nature

<a id="123-scope-definition-defects-qd-p-13"></a>
#### 1.2.3 Scope Definition Defects (QD-P-1.3)

##### QD-P-1.3.1 Quantifier Misuse

**Definition**: Misuse of universal quantifiers (∀) and existential quantifiers (∃), leading to incorrect semantic scope. It is determined as a defect only when quantifier misuse produces a logical conflict with other rules; being "overly absolute" alone is not reported.

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

**Definition**: Qualifier words are semantically vague, leading to unclear behavioral boundaries for critical decisions. Critical decision boundaries must be specific; stylistic descriptions may allow discretion.

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
| **Fixed** | "Answer length is controlled by request type: factual queries no more than 50 characters; analytical requests 100–200 characters; if more detail is needed, provide a summary first and then ask the user." |

##### QD-P-1.3.3 Undefined Boundaries

**Definition**: Critical behavioral boundaries are undefined, preventing the Agent from determining whether behavior exceeds its scope.

**Detection Principle**: The LLM can identify boundary-absence issues at critical decision points.

**Typical Manifestations**:

- Authorization scope boundaries are undefined
- Prohibition scope boundaries are undefined
- Handoff conditions are undefined

**Severity**: P1 (L1) / P0 (L2/L3)

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

##### QD-P-1.4.1 Duplicate Constraints and Redundant Expressions

**Definition**: The same constraint appears repeatedly in multiple locations, or multiple constraints semantically overlap, or the prompt language is redundant (repetitive expressions, overly long definitions, unnecessary modifiers) and only increases Token Consumption. Intentional repetition of safety/compliance constraints does not count as a defect.

**Detection Principle**: The LLM discovers semantically duplicate or linguistically redundant constraints during processing.

**Typical Manifestations**:

- The same constraint appears repeatedly in different paragraphs
- Multiple constraints express the same meaning
- Examples repeat rules already stated in the body
- Repetitive expressions, overly long definitions, unnecessary modifiers

**Severity**: Suggestion item (ungraded) — no deduction, no launch blocking, no waiver required; optimization advice only

**Remediation Guidance**:

- Merge duplicate constraints
- Remove redundant expressions and unnecessary modifiers
- Retain the most precise version

**Example**:

| Version | Content |
| --- | --- |
| **Defective** | "You MUST protect user privacy. Leaking any user personal information is prohibited. All data involving privacy must be handled confidentially." |
| **Diagnosis** | Three semantically overlapping constraints; increased redundancy |
| **Fixed** | "Leaking user personal information is prohibited, including but not limited to name, contact information, financial data, and other sensitive information." |

##### QD-P-1.4.3 Invalid Skill Definitions

**Definition**: A Skill/tool is defined, but its trigger conditions or usage scenarios are unclear, or it conflicts with other rules such that it is never invoked.

**Detection Principle**: The LLM can analyze the Skill's definition and trigger conditions, discovering usage barriers.

**Typical Manifestations**:

- A Skill is defined but has no invocation scenario
- The Skill's trigger conditions conflict with constraints
- The Skill's parameter definitions do not match actual requirements

**Severity**: — (L1) / P1 (L2) / P0 (L3)

**Remediation Guidance**:

- Clarify the Skill's trigger scenarios
- Ensure the Skill is compatible with constraints
- Align Skill parameters with actual requirements

**Example**:

| Version | Content |
| --- | --- |
| **Defective** | "Skill: send_email — sends email. Constraint: Any external communication is prohibited." |
| **Diagnosis** | The constraint prohibits all external communication; the send_email Skill directly conflicts with the constraint and is never invoked |
| **Fixed** | "Skill: send_email — sends email. Constraint: Emails may be sent only to recipients explicitly specified by the user, and user confirmation MUST be obtained before sending." |

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
| **Fixed** | "Objective: Help users complete financial planning. Responsibilities: (1) Understand the user's financial situation; (2) Provide personalized financial advice; (3) Introduce types and risks of financial products (not constituting investment advice); (4) Track plan execution progress." |

##### QD-P-1.5.2 Resources Do Not Support the Workflow

**Definition**: The workflow-defined steps require certain resources, but the resource definitions do not include them.

**Detection Principle**: The LLM can analyze the resource requirements of workflow steps and align them with resource definitions.

**Typical Manifestations**:

- A workflow step mentions "query the database" but no database resource is defined
- A workflow step mentions "invoke an API" but no API definition is provided
- A workflow step mentions "use tool X" but the tool is not authorized

**Severity**: — (L1) / P0 (L2/L3)

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

> **Note**: This part has no Section 1.3; the number is reserved to keep subsequent section numbers (1.4–1.8) unchanged.

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
| **Remediation priority** | P0 defects MUST be fixed; P1 defects SHOULD be fixed before release; P2 defects MAY be handled as appropriate |
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

<a id="16-gray-zone-logic-defects-qd-p-16"></a>
### 1.6 Gray-Zone Logic Defects (QD-P-1.6)

<a id="160-positioning-of-this-section"></a>
#### 1.6.0 Positioning of This Section (section-level note; does not occupy a QD number)

**Definition**: Gray-Zone Defects are logic problems that the LLM **has the capability to identify, but detection reliability is unstable**. Unlike the defects in Sections 1.2.1–1.2.5, these problems lack the "binary-decidable" characteristic — the LLM can accurately identify them in some contexts, but may miss or misjudge them in others.

| Comparison Dimension | 1.2.1–1.2.5 Reliably Detectable Defects | 1.6 Gray-Zone Defects |
| --- | --- | --- |
| Detection stability | Relatively high (empirical; requires annotated-set validation) | Relatively low (empirical; requires annotated-set validation) |
| Trigger method | Direct reading suffices | Requires specific context or prompting to trigger |
| False positive rate | Depends on whether applicability preconditions are explicit | Medium; depends on applicability preconditions |
| False negative rate | Low | Relatively high |
| Handling strategy | Trust LLM results | LLM results + human review |

**Detection Reliability Tiers**:

| Reliability Tier | Designation | Meaning |
| --- | --- | --- |
| Conditionally reliable | 🟠 | Can be stably detected under specific conditions; unstable otherwise |
| Partially reliable | 🟠🟠 | Can identify the presence of a problem, but difficult to accurately characterize and provide remediation guidance |
| Unstable | 🟠🟠🟠 | Sometimes discovered, sometimes completely missed; depends on specific phrasing |

##### QD-P-1.6.1 Critical Decision Word Vagueness

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

**Severity**: P1 (default at all levels); upgraded to P0 (all levels) when vague words carry security or permission decisions

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

##### QD-P-1.6.2 Rules Depending on Model Internal State

**Definition**: Prompt rules depend on the LLM's internal state (e.g., confidence, intent judgment, motivation inference), when the LLM cannot actually reliably access or report these states. It is determined as a defect only when a critical decision (security/permission/funds) relies solely on model self-assessment with no observable trigger.

**Detection Principle**: The LLM can understand the literal meaning of the rule, but **struggles to recognize the meta-problem that "it cannot reliably assess its own internal state."** It may superficially comply with the rule while actually "simulating" confidence judgments.

**Typical Manifestations**:

- "When you are uncertain, ask the user rather than guessing"
- "When you judge the user's intent to be malicious, refuse to answer"
- "When you have high confidence in an answer, answer directly; when confidence is low, provide multiple options"
- "If you think the user is testing you, remain cautious"

**Detection Reliability**: Unstable

**Severity**: P1 (AC-L1/AC-L2/AC-L3)

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

##### QD-P-1.6.3 Soft Rule Interweaving Without Arbitration

**Definition**: Multiple Soft Rules (non-Hard Constraints) interweave in practical scenarios, producing implicit conflicts, and no arbitration mechanism is defined. It is determined as a defect only when a concrete scenario of actual incompatibility can be given.

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

**Severity**: P1 (default at all levels); upgraded to P0 (all levels) when the interwoven conflict involves security or permission

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

##### QD-P-1.6.4 Reasoning Method Constraints

**Definition**: The prompt imposes constraints on the LLM's **reasoning method itself** (e.g., "MUST strictly use deduction," "Using induction is prohibited"), while the compatibility of the LLM's actual reasoning mechanisms with these constraints is uncertain. It is determined as a defect only when "unverifiable internal reasoning methods" are used as a compliance guarantee; requiring output of reasoning steps or step-by-step reasoning does not count as a defect.

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
| **Fixed** | "In your answer, output the reasoning process in the following format: (1) List known premises; (2) Derive step by step, annotating the basis rule for each step; (3) State the conclusion." |

##### QD-P-1.6.5 Self-Referential or Recursive Constraints

**Definition**: The prompt contains self-referential constraints (rules referencing themselves) or recursive constraints (rule trigger conditions depending on the rule's own execution results), leading to logical loops or undecidability. Only recursion without a termination condition, unsatisfiable self-reference, or circular dependency is determined as a defect; "self-check once before output" is not reported.

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

##### QD-P-1.6.6 Implicit Assumption Dependency

**Definition**: Prompt rules depend on unstated assumptions (e.g., assuming the model possesses a certain capability, assuming the user has a certain background, assuming the environment meets a certain condition), and these assumptions may not hold. It is determined as a defect only when the assumption is critical, non-obvious, and has no external safeguard.

**Detection Reliability**: Conditionally reliable

**Severity**: P1 (AC-L1/AC-L2/AC-L3)

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

##### QD-P-1.6.7 Non-Monotonic Reasoning Defects

**Definition**: Prompt rules are designed based on "static knowledge," but in actual scenarios, new information may invalidate previous conclusions (non-monotonicity), and the prompt does not define knowledge update and conclusion revision mechanisms. It is determined only when cross-turn state or already-committed conclusions exist; single-turn scenarios are Not Applicable (N/A).

**Detection Reliability**: Unstable

**Severity**: P1 (AC-L1/AC-L2/AC-L3)

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

##### QD-P-1.6.8 Rule Followability

**Definition**: The prompt requires the model to perform operations it fundamentally cannot reliably complete (e.g., precise counting, timing, complex arithmetic, obtaining real-time information), making the rule itself unfollowable.

**Detection Principle**: The LLM may "claim" to comply with such rules but in fact cannot execute them reliably; this is a generalization of QD-P-1.6.2.

**Detection Reliability**: Conditionally reliable

**Severity**: P1 (AC-L1/AC-L2/AC-L3)

**Remediation Guidance**:

- Replace "capabilities unreliable within the model" with observable constraints or tool invocations
- For operations requiring precision, require completion through tools

<a id="17-gray-zone-summary"></a>
### 1.7 Gray-Zone Summary

#### 1.7.1 Detection Reliability Summary

| Defect Type | Detection Reliability | Severity (Default Level) | Core Difficulty |
| --- | --- | --- | --- |
| QD-P-1.6.1 | Partially reliable | P1 (default at all levels; upgraded to P0 for security/permission decisions) | LLM may not recognize severity upgrade |
| QD-P-1.6.2 | Unstable | P1 (AC-L1/AC-L2/AC-L3) | LLM cannot introspect its own capability boundaries |
| QD-P-1.6.3 | Conditionally reliable | P1 (default at all levels; upgraded to P0 for security/permission conflicts) | Requires reasoning to intersection scenarios to discover |
| QD-P-1.6.4 | Unstable | P1 (AC-L1/AC-L2/AC-L3) | LLM cannot determine its own reasoning method |
| QD-P-1.6.5 | Unstable | P1 (AC-L1/AC-L2/AC-L3) | Complex recursion treated as normal rules |
| QD-P-1.6.6 | Conditionally reliable | P1 (AC-L1/AC-L2/AC-L3) | Requires meta-reasoning to discover implicit premises |
| QD-P-1.6.7 | Unstable | P1 (AC-L1/AC-L2/AC-L3) | Requires simulating rule interactions under dynamic scenarios |
| QD-P-1.6.8 | Conditionally reliable | P1 (AC-L1/AC-L2/AC-L3) | Requires unreliable model capabilities (counting/timing/arithmetic) |

#### 1.7.2 Handling Strategy

```
Gray-Zone Defect Handling Strategy:

1. Detection Phase:
   - Explicitly mention these defect types in the inspection instruction
   - Example instruction: "Pay special attention to the following gray-zone issues: [list QD-P-1.6.1–QD-P-1.6.8]"

2. Assessment Phase:
   - Gray-zone defects reported by LLM → Human review confirmation
   - Gray-zone defects not reported by LLM but discovered by humans → Supplementary inspection

3. Remediation Phase:
   - Automatically detected gray-zone defects → Record as "pending confirmation"; do not count toward Gate blocking
   - After human review confirmation → Count according to the default levels in 3.3.2; confirmed P0 items are handled via the exception process
   - P1 gray-zone defects → SHOULD be fixed before release; define a fallback strategy

4. Framework Positioning:
   - The gray zone is the transition band from "Part 1 (LLM Autonomous)" to "Part 2 (Requires Explicit Prompts)"
   - Handling approach: Light explicit prompting + human review
```

#### 1.7.3 Relationship to Part 1 and Part 2

```
Detection Reliability Spectrum:

Part 1 1.2.1–1.2.5 ──→ Gray Zone 1.6 ──→ Part 2
   Reliable Detection      Unstable Detection      Requires Explicit Prompts
   Direct Reading          Light Prompt + Review    Checklist Inspection
   ≥ 90%                   40%–70%                  Requires Structured Guidance
```

---

<a id="18-complete-part-1-structure"></a>
### 1.8 Complete Part 1 Structure

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
│   ├─ QD-P-1.2.3 Constraint-Responsibility Mismatch
│   └─ QD-P-1.2.4 Identity and Anthropomorphization Boundaries
│
├─ QD-P-1.3 Scope Definition Defects (Reliable Detection)
│   ├─ QD-P-1.3.1 Quantifier Misuse
│   ├─ QD-P-1.3.2 Vague Qualifiers
│   └─ QD-P-1.3.3 Undefined Boundaries
│
├─ QD-P-1.4 Redundancy and Invalidity Defects (Reliable Detection)
│   ├─ QD-P-1.4.1 Duplicate Constraints and Redundant Expressions (suggestion item, ungraded)
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
    ├─ QD-P-1.6.7 Non-Monotonic Reasoning Defects
    └─ QD-P-1.6.8 Rule Followability
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
| **False positive rate** | Depends on whether applicability preconditions are explicit (structured inspection reduces ambiguity) |

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

> **Section note**: QD-P-2.1.1 (Format Compliance) has been deleted; its injection-related point "unclosed code blocks or delimiters" has been merged into QD-P-2.5.6. QD-P-2.1.4 (Language Conciseness) has been merged into QD-P-1.4.1. In this section, QD-P-2.1.2 (Reference Clarity) retains its grading; QD-P-2.1.3 and QD-P-2.1.5 are **suggestion items (ungraded)** — no deduction, no blocking, no waiver.

##### QD-P-2.1.2 Reference Clarity

**Definition**: References within the prompt are unclear, potentially causing incorrect tool invocation parameters.

**Why the LLM does not proactively notice**: The LLM is insensitive to reference clarity and will not proactively discover "vague reference" issues.

**Typical Manifestations**:

- "Use the database" → Which database?
- "Invoke the API" → Which API?
- "Process the file" → Which file?

**Severity**: — (L1) / P1 (L2/L3)

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

**Severity**: Suggestion item (ungraded) — no deduction, no launch blocking, no waiver required; optimization advice only

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

##### QD-P-2.1.5 Context Budget Encroachment

**Definition**: The prompt, examples, and tool descriptions jointly encroach on the context window, leaving insufficient room for reasoning and generation.

**Why the LLM does not proactively notice**: The LLM will not proactively discover the completeness gap of "context budget encroachment."

**Typical Manifestations**:

- The total length of prompt + examples + tool descriptions is not assessed
- No truncation strategy is defined for insufficient context

**Severity**: Suggestion item (ungraded) — no deduction, no launch blocking, no waiver required; optimization advice only

**Remediation Guidance**:

- Assess the context footprint of the prompt and tool descriptions
- Define truncation and degradation strategies for insufficient context

<a id="222-input-definition-defects-qd-p-22"></a>
#### 2.2.2 Input Definition Defects (QD-P-2.2)

##### QD-P-2.2.1 Undeclared Input Source

**Definition**: The Agent's input source is not declared, preventing the Agent from determining the data source. It is judged N/A only when the input source is self-evident (user messages only); it is judged P0 only when multiple sources exist.

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

**Definition**: The input data format is not constrained, potentially causing parsing failures. L2 is judged P0 only when structured input is accepted.

**Why the LLM does not proactively notice**: The LLM will not proactively discover the completeness gap of "unconstrained input format."

**Typical Manifestations**:

- Not declaring the input data format (e.g., CSV, JSON, text)

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
| **Fixed** | "Process CSV or JSON files uploaded by the user." |

##### QD-P-2.2.3 Required/Optional Not Distinguished

**Definition**: The required vs. optional nature of input parameters is not distinguished, potentially causing processing failures. It is determined as a defect only when structured input is accepted; free-text input is generally N/A.

**Why the LLM does not proactively notice**: The LLM will not proactively discover the completeness gap of "required/optional not distinguished."

**Typical Manifestations**:

- Required parameters are not marked
- Default values for optional parameters are not defined

**Severity**: — (L1, free-text input) / P1 (L1, structured input) / P0 (L2/L3, only when structured input is accepted)

**Remediation Guidance**:

- Explicitly mark required parameters
- Define default values for optional parameters
- Define handling when parameters are missing

**Example**:

| Version | Content |
| --- | --- |
| **Defective** | "Query user information." |
| **Diagnosis** | Required/optional parameters are not distinguished; may cause processing failures |
| **Fixed** | "Query user information. Required parameter: User ID. Optional parameter: Query scope (default: basic information only)." |

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

**Definition**: The output format is not defined, preventing downstream systems from correctly parsing the output. It is judged P0 only when the output is machine-consumed and there is no external structured output contract; otherwise P1/N/A.

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

**Definition**: The output Schema definition is incomplete, preventing downstream systems from correctly parsing the output. It is triggered only when structured output has been declared; Agents without a declared structured output are judged N/A. It is judged P0 only when the output is machine-consumed and there is no external structured output contract; otherwise P1/N/A.

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
| **Diagnosis** | Field types are not defined; downstream cannot determine the data types of summary/metrics |
| **Fixed** | "Output JSON format, including summary (string) and metrics (object)." |

##### QD-P-2.3.4 Missing Security/Privacy Filtering

**Definition**: Security and privacy filtering mechanisms are not defined, potentially causing privacy leaks. It is determined as a defect only when personal data is involved; the criteria for personal data (PII) are given in Risk Explicit NR-S-10.

**Why the LLM does not proactively notice**: The LLM will not proactively discover the security gap of "missing security/privacy filtering."

**Typical Manifestations**:

- Sensitive data filtering rules are not defined
- Privacy data handling methods are not defined
- Security output constraints are not defined

**Severity**: P0 when personal data is involved; otherwise N/A

**Remediation Guidance**:

- Define sensitive data filtering rules
- Define privacy data handling methods
- Define security output constraints

**Example**:

| Version | Content |
| --- | --- |
| **Defective** | "Output user information." |
| **Diagnosis** | Privacy filtering is not defined; may cause privacy leaks |
| **Fixed** | "Output user information. Privacy filtering: Mask national ID numbers, bank card numbers, contact information, and other sensitive information; output only the minimal fields required for the business, and de-identify direct identifiers such as names." |

##### QD-P-2.3.5 Factuality and Hallucination Control Declaration

**Definition**: The truthfulness constraints on output are not declared, so the Agent may fabricate facts without evidence. It applies only when the Agent involves retrieval, tools, or external knowledge and its output may be treated as fact.

**Why the LLM does not proactively notice**: The LLM will not proactively discover the completeness gap of "missing factuality constraint declaration."

**Typical Manifestations**:

- Does not require "answer only based on the provided materials/tool results"
- Does not require "explicitly state that you do not know when there is no evidence"
- Does not prohibit fabricating citations, data, URLs, or field values

**Severity**: — (L1) / P0 (L2/L3)

> **Cross-subset attribution**: This item only checks "whether the factuality and hallucination control declaration exists"; factuality/hallucination control is the first priority of Quality RAG-Agent, and the factuality of actual output is verified by RAG-Agent quality assessment.

**Remediation Guidance**:

- Declare that answers are based only on the provided materials or tool results
- Require explicitly stating "I don't know" rather than guessing when there is no evidence
- Prohibit fabricating citations, data, URLs, or field values

**Example**:

| Version | Content |
| --- | --- |
| **Defective** | "Answer any question about the company's finances." |
| **Diagnosis** | No factuality constraint is declared; the Agent may fabricate unfounded financial data |
| **Fixed** | "Answer only based on the provided financial materials and tool query results; when the materials are insufficient, explicitly state 'no basis found in the materials'; fabricating data, citations, or URLs is prohibited." |

##### QD-P-2.3.6 Output Length and Truncation

**Definition**: The maximum output length and the over-length truncation strategy are not defined, potentially causing output to be truncated downstream or the context to overflow.

**Why the LLM does not proactively notice**: The LLM will not proactively discover the completeness gap of "undefined output length."

**Typical Manifestations**:

- Maximum output length is not defined
- Truncation or segmentation strategy for over-length output is not defined

**Severity**: P2 (AC-L1/AC-L2/AC-L3)

**Remediation Guidance**:

- Define the maximum output length
- Define truncation, segmentation, or summarization strategies for over-length output

##### QD-P-2.3.7 Output Language/Localization and Conventions

**Definition**: The output language, time zone, currency, units, and percentage conventions are not defined, causing inconsistent conventions in multi-region scenarios.

**Why the LLM does not proactively notice**: The LLM will not proactively discover the completeness gap of "undefined localization conventions."

**Typical Manifestations**:

- Output language is not defined
- Time zone, currency, and units are not defined
- Numeric conventions such as percentages are not defined

**Severity**: P1 in multi-region scenarios; N/A in single-region scenarios

**Remediation Guidance**:

- Define the output language and time zone
- Define currency, unit, and percentage conventions

<a id="224-workflow-and-resource-defects-qd-p-24"></a>
#### 2.2.4 Workflow and Resource Defects (QD-P-2.4)

##### QD-P-2.4.1 Incomplete Workflow Steps

**Definition**: Workflow step definitions are incomplete, potentially causing functional gaps. A defect is determined only when dependencies are not declared, the order is contradictory, or undefined steps are referenced; "missing a critical step" is recorded as insufficient evidence.

**Why the LLM does not proactively notice**: The LLM will not proactively discover the structural gap of "incomplete workflow steps."

**Typical Manifestations**:

- Workflow step dependencies are not defined
- Workflow step order is contradictory
- The workflow references undefined steps

**Severity**: — (L1) / P1 (L2) / P0 (L3)

**Remediation Guidance**:

- Complete the workflow steps
- Define step order and dependencies
- Add step descriptions

**Example**:

| Version | Content |
| --- | --- |
| **Defective** | "Workflow: (1) Invoke data cleaning; (2) Generate report." |
| **Diagnosis** | Step (1) references an undefined "data cleaning" step |
| **Fixed** | "Workflow: (1) Clean data using the data cleaning tool (clean_data); (2) Generate report. Step dependencies: (2) depends on (1)." |

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

##### QD-P-2.4.3 Incorrect Tool Invocation Parameters or Order

**Definition**: The prompt body explicitly writes wrong tool invocation parameters (name, type) or invocation order, potentially causing invocation failures. It checks only "wrongly written" cases in the body; handling after tool invocation failure belongs to QD-P-2.6.1 (Runtime Exceptions Not Covered).

**Why the LLM does not proactively notice**: The LLM will not proactively discover the structural gap of "wrong parameters or order written in the body."

**Typical Manifestations**:

- Tool parameter names or types are written incorrectly in the body
- Tool invocation order is written incorrectly in the body

**Severity**: — (L1) / P1 (L2/L3)

**Remediation Guidance**:

- Correct the parameter names and types in the body
- Correct the invocation order in the body

**Example**:

| Version | Content |
| --- | --- |
| **Defective** | "First call query_user_data (parameter: userID), then call clean_data (parameter: userId)." |
| **Diagnosis** | The same field has inconsistent parameter names across tools (userID vs. userId), and the invocation order is the reverse of the data dependency |
| **Fixed** | "First call clean_data (parameter: userId), then call query_user_data (parameter: userId)." |

##### QD-P-2.4.4 Multi-Turn Context, State, and Memory Boundaries

**Definition**: The scope of historical context use, truncation behavior, and cross-session memory in multi-turn conversations are not declared, causing state inconsistency. It applies only when multi-turn conversation or cross-session state exists; single-turn stateless Agents are judged N/A.

**Why the LLM does not proactively notice**: The LLM will not proactively discover the completeness gap of "undeclared memory boundaries."

**Typical Manifestations**:

- The retention scope of historical context is not declared
- The truncation behavior of context is not declared
- The use of cross-session memory is not declared

**Severity**: — (L1) / P1 (L2/L3)

**Remediation Guidance**:

- Declare the scope of historical context use and truncation behavior
- Declare the read/write boundaries of cross-session memory

<a id="225-constraint-and-boundary-defects-qd-p-25"></a>
#### 2.2.5 Constraint and Boundary Defects (QD-P-2.5)

##### QD-P-2.5.1 Missing Termination Constraints

**Definition**: The task's completion conditions or abandonment conditions are not defined, potentially causing infinite loops or resource exhaustion.

**Why the LLM does not proactively notice**: The LLM will not proactively discover the completeness gap of "missing termination constraints."

**Typical Manifestations**:

- Task completion conditions are not defined
- Task abandonment conditions are not defined
- How to report partial success is not defined
- Which step failures MUST NOT lead to claiming overall success is not defined

**Severity**: — (L1) / P1 (L2) / P0 (L3)

**Remediation Guidance**:

- Define completion conditions and abandonment conditions
- Define how to report partial success
- Clarify which step failures MUST NOT lead to claiming overall success

**Example**:

| Version | Content |
| --- | --- |
| **Defective** | "Continuously monitor user messages and process them." |
| **Diagnosis** | Completion/abandonment conditions are not defined; may cause infinite loops |
| **Fixed** | "Monitor user messages and process them. Completion conditions: The user explicitly ends the session or the task objective is achieved; abandonment condition: three consecutive failures to make progress. For partial success, state what has been completed and what has not." |

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

**Severity**: — (L1) / P1 (L2) / P0 (L3)

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

> **Deprecated**: Frequency limits are essentially runtime configuration; this item has been removed from QD-P and is managed by runtime configuration (Harness). Business-level invocation frequency/batch expectations are now handled by Inspect Cross `QD-PT-2.6` / `QD-ST-3.4`. The number is retained for traceability only and is no longer a QD-P inspection item.

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

##### QD-P-2.5.6 Instruction-Data Trust Boundary (Injection Defense Declaration)

**Definition**: The trust boundary between instructions and external data (user input, retrieved content, tool returns) is not declared, and the defense declaration against injection attacks is missing.

**Why the LLM does not proactively notice**: The LLM will not proactively discover the security gap of "missing injection defense declaration."

**Typical Manifestations**:

- Does not declare that external data MUST NOT be executed as instructions
- Does not distinguish the sources of high-trust instructions and low-trust data
- Does not declare how injected content is identified and isolated
- Code blocks or delimiters are not closed, allowing external data to escape the instruction boundary

**Severity**: — (L1) / P0 (L2/L3)

**Remediation Guidance**:

- Declare the trust boundary between instructions and data
- Clarify that external data MUST NOT override system instructions
- Define strategies for identifying and isolating injected content

> This item only checks "missing or contradictory declarations"; actual resistance to injection is verified by the Risk Implicit subset.

##### QD-P-2.5.7 Human Confirmation for High-Risk/Irreversible Operations

**Definition**: The prompt does not declare that high-risk/irreversible operations (fund transfers, deletion, external sending, production changes, etc.) require human confirmation before execution. It applies only when the Agent has such side-effecting operations.

**Why the LLM does not proactively notice**: The LLM will not proactively discover the security gap of "missing human confirmation gate for high-risk operations."

**Typical Manifestations**:

- Operations such as funds, deletion, external sending, or production changes do not require user confirmation
- No secondary confirmation mechanism is defined for irreversible operations
- High-risk actions are executed automatically without a human gate

**Severity**: P0 (L2/L3) when high-risk/irreversible operations are involved; N/A when no such operations exist

**Remediation Guidance**:

- Define a list of high-risk/irreversible operations
- Require user confirmation before executing operations on the list
- Clarify the boundary between "automatic execution" and "requiring human confirmation"

**Example**:

| Version | Content |
| --- | --- |
| **Defective** | "Automatically delete log files older than 30 days." |
| **Diagnosis** | Deletion is irreversible and does not require human confirmation; may cause accidental deletion |
| **Fixed** | "Before deleting logs, list the files to be deleted and obtain user confirmation; emergency automatic cleanup is performed only when pre-authorized by the user and with an audit record." |

##### QD-P-2.5.8 System Prompt Confidentiality and Leak Response

**Definition**: The confidentiality requirements for the System Prompt itself and the response when it leaks are not declared.

**Why the LLM does not proactively notice**: The LLM will not proactively discover the security gap of "missing prompt confidentiality declaration."

**Typical Manifestations**:

- Does not declare that the System Prompt MUST NOT be output externally
- Does not declare the response after a leak
- Confidentiality declarations are excessive, causing normal functions to be refused

**Severity**: — (L1) / P1 (L2/L3)

**Remediation Guidance**:

- Declare the confidentiality requirements for the System Prompt
- Define the response when a leak occurs
- Balance confidentiality with normal functionality (avoid excessive refusal)

> This item only checks "whether confidentiality and response are declared"; actual prompt leak verification is the responsibility of the Risk Implicit subset.

##### QD-P-2.5.9 Industry Compliance and Disclaimer Boundaries

**Definition**: Industry compliance constraints and disclaimer boundaries (e.g., medical, financial, legal) are not declared, potentially leading to non-compliant advice.

**Why the LLM does not proactively notice**: The LLM will not proactively discover the security gap of "undeclared compliance boundaries."

**Typical Manifestations**:

- Industry compliance constraints are not declared
- Disclaimer and referral boundaries are not declared
- Professional advice is provided without stating qualification boundaries

**Severity**: Triggered by domain (P0 in medical/financial/legal domains; N/A in other domains)

**Remediation Guidance**:

- Declare industry compliance constraints
- Define disclaimers and referral mechanisms

<a id="226-exception-handling-defects-qd-p-26"></a>
#### 2.2.6 Exception Handling Defects (QD-P-2.6)

##### QD-P-2.6.1 Runtime Exceptions Not Covered

**Definition**: Handling of runtime exceptions is not defined, potentially causing Agent crashes.

**Why the LLM does not proactively notice**: The LLM will not proactively discover the completeness gap of "runtime exceptions not covered."

**Typical Manifestations**:

- Handling of tool invocation failures is not defined
- Handling of data parsing failures is not defined
- Handling of external system exceptions is not defined

**Severity**: — (L1) / P1 (L2) / P0 (L3)

**Remediation Guidance**:

- Define handling of tool invocation failures
- Define handling of data parsing failures
- Define handling of external system exceptions

**Example**:

| Version | Content |
| --- | --- |
| **Defective** | "Invoke the API to query data." |
| **Diagnosis** | Handling when the API call fails is not defined |
| **Fixed** | "Invoke the API to query data. Exception handling: If the API call fails, attempt to use local cached data (the cache MUST be within the authorized scope and marked with its timeliness); if the local cache has no data or has expired, prompt the user and provide an alternative." |

##### QD-P-2.6.2 Missing Degradation and Recovery Strategy

**Definition**: The handling method upon failure (degradation, recovery, or stop-and-report) is not declared, potentially preventing the Agent from recovering or causing it to continue executing erroneously.

**Why the LLM does not proactively notice**: The LLM will not proactively discover the completeness gap of "missing degradation and recovery strategy."

**Typical Manifestations**:

- Functional degradation strategies are not defined
- Error recovery strategies are not defined
- "Stop and report" is not treated as a legitimate handling method

**Severity**: — (L1/L2) / P1 (L3)

**Remediation Guidance**:

- Define functional degradation strategies
- Define error recovery strategies
- Treat "stop and report" as one of the legitimate failure-handling methods

**Example**:

| Version | Content |
| --- | --- |
| **Defective** | "Analyze user data." |
| **Diagnosis** | The failure handling method is not declared |
| **Fixed** | "Analyze user data. Failure handling: If full analysis fails, provide a simplified analysis; if the simplified analysis also fails, stop and report the error, and prompt the user to retry later." |

##### QD-P-2.6.3 Unreasonable Retry Mechanism

**Definition**: The retry mechanism is unreasonably defined, potentially causing resource waste or repeated side effects.

**Why the LLM does not proactively notice**: The LLM will not proactively discover the completeness gap of "unreasonable retry mechanism."

**Typical Manifestations**:

- Retry count limit is not defined
- Whether write operations may be blindly retried is not defined
- Handling when a timeout leaves the result unknown (check status first to confirm whether it has executed) is not defined

**Severity**: — (L1/L2) / P1 (L3)

**Remediation Guidance**:

- Define retry count limit
- Clarify whether write operations may be retried and their idempotency requirements
- Define handling when a timeout leaves the result unknown (check status first to confirm whether it has executed)

**Boundary with QD-P-2.6.2**: This item only checks "retry count limit, whether write operations are blindly retried, and whether status is checked first when a timeout leaves the result unknown"; the final handling "stop and report" belongs to QD-P-2.6.2 (Missing Degradation and Recovery Strategy). The two MUST NOT register duplicate defects for the same "stop and report" gap.

**Example**:

| Version | Content |
| --- | --- |
| **Defective** | "If the API call fails, retry." |
| **Diagnosis** | The retry count limit is not defined, and handling for write operations/timeout scenarios is not specified |
| **Fixed** | "If a read-only API call fails, retry up to 3 times; for write operations, do not blindly retry — check status before retrying to confirm it has not executed; if the result is unknown, stop and report." |

##### QD-P-2.6.4 Out-of-Scope Request Refusal and Human Handoff

**Definition**: The refusal template, referral targets, and escalation conditions for out-of-scope requests are not defined, causing the Agent to handle them beyond its scope.

**Why the LLM does not proactively notice**: The LLM will not proactively discover the completeness gap of "undefined out-of-scope refusal."

**Typical Manifestations**:

- The refusal template for out-of-scope requests is not defined
- Referral targets (human, expert, other systems) are not defined
- Escalation conditions are not defined

**Severity**: P1 (L1/L2) / P0 (L3)

**Remediation Guidance**:

- Define the refusal template
- Define referral targets and escalation conditions

<a id="227-example-design-defects-qd-p-27"></a>
#### 2.2.7 Example Design Defects (QD-P-2.7)

> The **injection of harmful content in examples** (example poisoning) is outside the scope of this category and is scanned by Risk Explicit (see NL-A-6 embedded disguise, NR-S-5 tool-description field instruction poisoning, NR-S-6 parameter default/example value injection).
>
> All three items in this category (QD-P-2.7.1–2.7.3) are **suggestion items (ungraded)**: they have optimization value but do not directly determine output quality or safety; no deduction, no launch blocking, no waiver required.

##### QD-P-2.7.1 Insufficient Positive Example Representativeness

**Definition**: Positive examples lack sufficient representativeness, potentially preventing the Agent from correctly understanding expected behavior.

**Why the LLM does not proactively notice**: The LLM will not proactively discover the structural gap of "insufficient positive example representativeness."

**Typical Manifestations**:

- Positive example scenario coverage is insufficient
- Positive examples are too simplistic and do not cover boundary cases
- Positive examples are inconsistent with rules

**Severity**: Suggestion item (ungraded) — no deduction, no launch blocking, no waiver required; optimization advice only

> The injection of harmful content in examples (example poisoning) does not belong to this item; it belongs to Risk Explicit (NL-A-6 / NR-S-5 / NR-S-6).

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

**Severity**: Suggestion item (ungraded) — no deduction, no launch blocking, no waiver required; optimization advice only

> The injection of harmful content in examples (example poisoning) does not belong to this item; it belongs to Risk Explicit (NL-A-6 / NR-S-5 / NR-S-6).

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

**Severity**: Suggestion item (ungraded) — no deduction, no launch blocking, no waiver required; optimization advice only

> The injection of harmful content in examples (example poisoning) does not belong to this item; it belongs to Risk Explicit (NL-A-6 / NR-S-5 / NR-S-6).

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

**Pre-check (metadata declaration)**: Before starting the completeness inspection, first verify that the artifact's metadata declarations are complete — version, owner, change log, target model. If metadata is missing or inconsistent with reality, record it as a precondition issue and do not enter the defect inspection items below (metadata is a precondition; see 0.1.3).

```
□ Structural and Normative (QD-P-2.1)
  □ Reference Clarity (QD-P-2.1.2): Are pronouns explicit? Do references have sources?
  □ [Suggestion] Structural Hierarchy Reasonableness (QD-P-2.1.3): Are paragraphs too long? Is the nesting depth excessive?
  □ [Suggestion] Is the context budget assessed (do the prompt/examples/tool descriptions encroach on the context)? (QD-P-2.1.5)

□ Input Definition (QD-P-2.2)
  □ Are all input sources declared? (QD-P-2.2.1)
  □ Are all input formats constrained? (QD-P-2.2.2)
  □ Are required and optional inputs distinguished? (QD-P-2.2.3; applies only to structured input)
  □ Is handling of missing input defined? (QD-P-2.2.4)

□ Output Definition (QD-P-2.3)
  □ Is the output format defined? (QD-P-2.3.1)
  □ Is the output Schema complete? (QD-P-2.3.2; applies only when structured output is declared)
  □ Are privacy masking rules defined? (QD-P-2.3.4)
  □ Is the factuality and hallucination control declaration defined? (QD-P-2.3.5)
  □ Are the maximum output length and over-length truncation strategy defined? (QD-P-2.3.6)
  □ Are the output language/time zone/currency/unit/percentage conventions defined? (QD-P-2.3.7)

□ Workflow and Resources (QD-P-2.4)
  □ Are workflow steps complete? (QD-P-2.4.1)
  □ Are all tool invocations declared? (QD-P-2.4.2)
  □ Are the tool parameters and invocation order in the body written incorrectly? (QD-P-2.4.3)
  □ Are the multi-turn context scope, truncation, and cross-session memory declared? (QD-P-2.4.4; applies only to multi-turn/cross-session)

□ Constraints and Boundaries (QD-P-2.5)
  □ Are termination constraints (completion/abandonment conditions) defined? (QD-P-2.5.1)
  □ Are security boundaries (prohibited operations) defined? (QD-P-2.5.2)
  □ Are permission control boundaries (read-only/read-write) defined? (QD-P-2.5.3)
  □ Are constraint priorities defined? (QD-P-2.5.4)
  □ Is the instruction-data trust boundary (injection defense declaration, code block/delimiter closure) defined? (QD-P-2.5.6)
  □ Is human confirmation for high-risk/irreversible operations declared? (QD-P-2.5.7)
  □ Are System Prompt confidentiality and leak response declared? (QD-P-2.5.8)
  □ Are industry compliance and disclaimer boundaries declared? (QD-P-2.5.9)

□ Exception Handling (QD-P-2.6)
  □ Are runtime exceptions (tool failure, timeout) covered? (QD-P-2.6.1)
  □ Are degradation and recovery strategies defined? (QD-P-2.6.2)
  □ Is the retry mechanism reasonable (count limit, whether write operations are blindly retried, whether status is checked first on timeout)? (QD-P-2.6.3)
  □ Are the refusal template, referral targets, and escalation conditions for out-of-scope requests defined? (QD-P-2.6.4)

□ Example Design (QD-P-2.7) — all are suggestion items (ungraded)
  □ Do positive examples cover typical scenarios? (QD-P-2.7.1)
  □ Do counter-examples cover typical errors? (QD-P-2.7.2)
  □ Are there examples for boundary cases? (QD-P-2.7.3)
```

<a id="232-detection-process"></a>
#### 2.3.2 Detection Process

```
Detection Process:

Step 1: Structure Scan (suggestion item, ungraded — optional, non-blocking)
  → Optionally use format checking tools (e.g., Markdown linter)
  → Check format compliance and code block closure

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
### 2.4 Defect Severity Classification

The definitions and disposition principles of defect severity levels (P0/P1/P2) are given in [0.2.5](#025-defect-level-definitions-p0p1p2) and are not repeated here. The default level applicable to each defect item is governed by the [3.3.2 Complete Tiered Inspection Checklist](#332-complete-tiered-inspection-checklist).

<a id="25-part-summary"></a>
### 2.5 Part Summary

<a id="251-core-points"></a>
#### 2.5.1 Core Points

The defects listed in this part all fall within the scope of things the LLM **will not proactively notice**. This means:

- **For authors**: These elements MUST be proactively completed during the authoring phase
- **For inspection processes**: A Checklist MUST be used for item-by-item inspection; cannot rely on the LLM to autonomously discover
- **For framework design**: This part is the core value of the framework, ensuring completeness

<a id="252-relationship-to-part-1"></a>
#### 2.5.2 Relationship to Part 1

| Dimension | Part 1 | Part 2 |
| --- | --- | --- |
| **Problem nature** | "Written incorrectly" | "Didn't write the critical content" |
| **Detection method** | Direct reading | Checklist inspection |
| **LLM role** | Proactive discovery | Passive response |
| **Framework value** | List common errors; help avoid | Ensure completeness; no missing critical content |

<a id="253-practice-recommendations"></a>
#### 2.5.3 Practice Recommendations

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
   - P1 defects SHOULD be fixed before release
   - P2 defects MAY be handled as appropriate

4. Continuous Improvement:
   - Supplement the Checklist based on issues discovered in actual operation
   - Supplement domain-specific inspection items based on domain characteristics
```

---

<a id="3-tiered-inspection-mechanism"></a>
## 3 Tiered Inspection Mechanism

<a id="31-agent-level-definitions"></a>
### 3.1 Agent Level Definitions (`AC-L`)

> **[Global symbol convention · Mandatory]** Throughout the body, tables, examples, and appendices of this document, `L1` / `L2` / `L3` are **always** shorthand for `AC-L1` / `AC-L2` / `AC-L3` (Agent complexity levels) and are fully equivalent. Except in this definition section, the `AC-` prefix is not repeated everywhere. Any isolated `L1` / `L2` / `L3` **MUST NOT** be interpreted as `OR-L` (operational risk level) or any other grading model. This convention is mandatory for all chapters, appendices, examples, and report fields.

<a id="311-three-agent-levels"></a>
#### 3.1.1 Three Agent Levels

| Level | Name | Definition | Typical Characteristics |
| --- | --- | --- | --- |
| **AC-L1** | Single-turn Task | Single invocation completes the task; no state retention | Single skill, no tool invocations, no multi-turn dialogue, no complex reasoning |
| **AC-L2** | Multi-turn Interactive | Requires multi-turn dialogue or simple tool invocations | Multi-turn dialogue, 1–3 tools, simple workflow, limited state |
| **AC-L3** | Complex Agent | Complex workflow, multi-tool collaboration, strong constraints | 4+ tools, complex workflow, security constraints, permission control, exception handling |

<a id="312-three-level-agent-determination-criteria"></a>
#### 3.1.2 Three-Level Agent Determination Criteria

| Level | Determination Criteria (any 2 or more satisfied) |
| --- | --- |
| **AC-L1** | ✓ Single skill (e.g., translation, summarization, Q&A)<br>✓ No tool invocations<br>✓ No multi-turn dialogue<br>✓ No complex reasoning |
| **AC-L2** | ✓ Multi-turn dialogue<br>✓ 1–3 tool invocations<br>✓ Simple workflow (≤ 5 steps)<br>✓ Limited state management |
| **AC-L3** | ✓ 4+ tool invocations<br>✓ Complex workflow (> 5 steps)<br>✓ Security-sensitive (involves privacy/permissions)<br>✓ Requires exception handling mechanisms |

> When an Agent satisfies the determination criteria of multiple levels, take the highest level.

<a id="313-typical-examples-by-agent-level"></a>
#### 3.1.3 Typical Examples by Agent Level

| Level | Typical Examples |
| --- | --- |
| **AC-L1** | Translation assistant, summarization, single-turn Q&A, format conversion, simple classification |
| **AC-L2** | Customer service bot, document Q&A, simple search assistant, schedule management, email assistant |
| **AC-L3** | Financial analysis Agent, code execution Agent, data processing Agent, security-sensitive Agent, multi-system collaboration Agent |

---

<a id="32-defect-severity-level-definitions"></a>
### 3.2 Defect Severity Level Definitions

<a id="321-three-severity-levels"></a>
#### 3.2.1 Three Severity Levels

The definitions and disposition principles of P0/P1/P2 are given in [0.2.5](#025-defect-level-definitions-p0p1p2) and are not repeated here.

<a id="322-relationship-between-severity-level-and-agent-level"></a>
#### 3.2.2 Relationship Between Severity Level and Agent Level

**Core Principle**: The **semantics** of defect severity (the meaning of P0/P1/P2) are independent of Agent Level, but the **value** of the same defect's severity varies with Agent Level (see 3.2.3). System Prompts have no operational-risk dimension; their defect severity levels are determined by `AC-L` (see framework/core.md §4.1).

| Relationship | Description |
| --- | --- |
| **Defect severity semantics** | The meaning of P0/P1/P2 is uniformly defined in 0.2.5 and is independent of Agent Level |
| **Defect severity value** | The same defect may take different levels at different Agent Levels; see the default levels in 3.3.2 |
| **Agent Level** | Determines "which items to inspect" — i.e., the inspection scope |
| **Default levels and arbitration** | The default level applicable to each defect item is governed by 3.3.2; if the "Severity" field in the body conflicts with it, 3.3.2 prevails |

<a id="323-rules-for-severity-variation-across-agent-levels"></a>
#### 3.2.3 Rules for Severity Variation Across Agent Levels

| Variation Pattern | Description | Typical Example |
| --- | --- | --- |
| **🟡→🟡→🔴** | Impact scope progressively amplifies; upgraded to blocking at L3 | Priority conflict (L1/L2 P1 → L3 P0) |
| **🟡→🔴→🔴** | Becomes a blocking condition at L2; remains blocking at L3 | Undefined output format (L1 P1 → L2/L3 P0) |
| **🔴→🔴→🔴** | Blocking at all levels; impact independent of complexity | Direct contradiction, missing security boundary constraints |
| **🟡→🟡→🟡** | Consistent impact across all levels; does not change with complexity | Quantifier misuse, vague qualifiers |
| **🟢→🟢→🟢** | Optional at all levels; limited impact scope | Output length and truncation |

**Downgrade and adjustment rules**: The levels listed in 3.3.2 are default levels and may be adjusted with human review and a recorded rationale in the following cases: the inspection item does not apply to the Agent → record N/A (removed from $W_{total}$); a gray-zone defect is automatically detected → record "pending confirmation," and after human review confirmation count it at the default level; narrow the criteria according to each item's applicability preconditions. Adjustments MUST NOT be used to eliminate a confirmed P0 defect unless the exception process is followed (see 0.2.5). Items whose notes say "upgraded to P0 when XX" (e.g., QD-P-1.2.4 upgraded to P0 for C-end users) are counted at the marked level by default; after the upgrade condition is triggered and confirmed by human review, they are counted at the upgraded level.

---

<a id="33-tiered-inspection-checklist"></a>
### 3.3 Tiered Inspection Checklist

<a id="331-checklist-design-principles"></a>
#### 3.3.1 Checklist Design Principles

| Principle | Description |
| --- | --- |
| **Upward-compatible** | Higher-level inspection items include lower-level items (L3 ⊃ L2 ⊃ L1) |
| **Core-focused** | L1 is mainly P0 and covers necessary P1 items; L2 extends coverage of more P1/P0 items; L3 provides full coverage and upgrades some items to P0. Tier differences come mainly from "upgrading levels" rather than merely adding items |
| **Number-ordered** | Inspection items are ordered by Part 1 and Part 2 numbering |
| **Suggestion items separated** | Ungraded suggestion items (optimization value only) are not included in the tiered checklist, scoring, or Gate; they are listed separately |

<a id="332-complete-tiered-inspection-checklist"></a>
#### 3.3.2 Complete Tiered Inspection Checklist

> The severity level of each defect listed below at the corresponding Agent Level is the **default level**. Adjustments confirmed by human review MUST have a recorded rationale (see 3.2.2).

**Part 1: Logic Defects Within LLM Autonomous Detection Capability**

| QD-P ID | Defect Name | L1 | L2 | L3 | Severity Variation Notes |
| --- | --- | --- | --- | --- | --- |
| **QD-P-1.1.1** | Direct Contradiction | 🔴 | 🔴 | 🔴 | P0 at all levels; direct contradiction is unacceptable in any Agent |
| **QD-P-1.1.2** | Priority Conflict | 🟡 | 🟡 | 🔴 | L1/L2 P1; L3 upgraded to P0 (conflict impact is greater in complex Agents) |
| **QD-P-1.1.3** | Example-Rule Contradiction | 🔴 | 🔴 | 🔴 | P0 at all levels; the demonstrative effect of examples overrides rule definitions |
| **QD-P-1.2.1** | Role-Responsibility Mismatch | 🔴 | 🔴 | 🔴 | P0 at all levels; role semantic scope not matching responsibility requirements is blocking in any scenario |
| **QD-P-1.2.2** | Role-Output Style Mismatch | 🟡 | 🟡 | 🟡 | P1 at all levels; style mismatch affects output consistency but does not block functionality |
| **QD-P-1.2.3** | Constraint-Responsibility Mismatch | 🔴 | 🔴 | 🔴 | P0 at all levels; a constraint prohibiting core responsibility behavior is blocking in any scenario |
| **QD-P-1.2.4** | Identity and Anthropomorphization Boundaries | 🟡 | 🟡 | 🟡 | P1 at all levels; upgraded to P0 for consumer (C-end) users |
| **QD-P-1.3.1** | Quantifier Misuse | 🟡 | 🟡 | 🟡 | P1 at all levels; quantifier semantic scope errors affect behavioral boundaries but do not block |
| **QD-P-1.3.2** | Vague Qualifiers | 🟡 | 🟡 | 🟡 | P1 at all levels; vague qualifiers cause unstable behavioral boundaries |
| **QD-P-1.3.3** | Undefined Boundaries | 🟡 | 🔴 | 🔴 | L1 P1; L2/L3 upgraded to P0 (boundary gaps have greater impact in multi-tool/complex workflows) |
| **QD-P-1.4.3** | Invalid Skill Definitions | — | 🟡 | 🔴 | L1 has no Skills; L2 P1; L3 P0 (invalid Skills in complex Agents may cause functional gaps) |
| **QD-P-1.5.1** | Responsibilities Do Not Support Objective | 🔴 | 🔴 | 🔴 | P0 at all levels; responsible behaviors insufficient to accomplish the objective |
| **QD-P-1.5.2** | Resources Do Not Support Workflow | — | 🔴 | 🔴 | L1 has no workflow; L2/L3 P0 (workflow steps cannot execute) |
| **QD-P-1.6.1** | Critical Decision Word Vagueness | 🟡 | 🟡 | 🟡 | P1 at all levels; upgraded to P0 (all levels) when carrying security or permission decisions |
| **QD-P-1.6.2** | Rules Depending on Model Internal State | 🟡 | 🟡 | 🟡 | P1 at all levels; reported only when a critical decision (security/permission/funds) relies solely on model self-assessment with no observable trigger |
| **QD-P-1.6.3** | Soft Rule Interweaving Without Arbitration | 🟡 | 🟡 | 🟡 | P1 at all levels; upgraded to P0 (all levels) when the conflict involves security or permission |
| **QD-P-1.6.4** | Reasoning Method Constraints | 🟡 | 🟡 | 🟡 | P1 at all levels; the LLM cannot guarantee its internal reasoning method |
| **QD-P-1.6.5** | Self-Referential or Recursive Constraints | 🟡 | 🟡 | 🟡 | P1 at all levels; simple self-reference may be harmless, complex recursion may cause anomalies |
| **QD-P-1.6.6** | Implicit Assumption Dependency | 🟡 | 🟡 | 🟡 | P1 at all levels; reported only for critical, non-obvious assumptions without external safeguards |
| **QD-P-1.6.7** | Non-Monotonic Reasoning Defects | 🟡 | 🟡 | 🟡 | P1 when cross-turn state/committed conclusions exist; single-turn N/A |
| **QD-P-1.6.8** | Rule Followability | 🟡 | 🟡 | 🟡 | P1 at all levels; reported only when unreliable model capabilities (counting/timing/arithmetic) are required |

**Part 2: Defects Requiring Explicit Prompts**

| QD-P ID | Defect Name | L1 | L2 | L3 | Severity Variation Notes |
| --- | --- | --- | --- | --- | --- |
| **QD-P-2.1.2** | Reference Clarity | — | 🟡 | 🟡 | L1 has no tools; L2/L3 P1; vague references may cause incorrect tool invocation parameters |
| **QD-P-2.2.1** | Undeclared Input Source | 🔴 | 🔴 | 🔴 | P0 at all levels; workflow cannot execute |
| **QD-P-2.2.2** | Unconstrained Input Format | 🟡 | 🔴 | 🔴 | L1 P1; L2/L3 P0 only when structured input is accepted (missing input format causes parsing failures) |
| **QD-P-2.2.3** | Required/Optional Not Distinguished | 🟡 | 🔴 | 🔴 | L1 P1; L2/L3 P0 only when structured input is accepted |
| **QD-P-2.2.4** | Undefined Missing-Input Handling | 🟡 | 🔴 | 🔴 | L1 P1; L2/L3 P0 (missing-input impact is greater in complex Agents) |
| **QD-P-2.3.1** | Undefined Output Format | 🟡 | 🔴 | 🔴 | L1 P1; L2/L3 P0 (output is parsed by downstream tools; non-compliant format causes tool invocation failures) |
| **QD-P-2.3.2** | Incomplete Output Schema | 🟡 | 🔴 | 🔴 | Triggered only when structured output is declared; L1 P1; L2/L3 P0 |
| **QD-P-2.3.4** | Missing Security/Privacy Filtering | — | — | — | P0 at all levels when personal data is involved; otherwise N/A (PII criteria see NR-S-10) |
| **QD-P-2.3.5** | Factuality and Hallucination Control Declaration | — | 🔴 | 🔴 | L2/L3 P0; factuality/hallucination control is the first priority of RAG-Agent; L1 has no retrieval/tools → N/A |
| **QD-P-2.3.6** | Output Length and Truncation | 🟢 | 🟢 | 🟢 | P2 at all levels; maximum length and over-length strategy are undefined |
| **QD-P-2.3.7** | Output Localization and Conventions | — | — | — | P1 in multi-region scenarios; N/A in single-region scenarios; language/time zone/currency/unit conventions |
| **QD-P-2.4.1** | Incomplete Workflow Steps | — | 🟡 | 🔴 | L1 has no workflow; L2 P1; L3 P0 (missing steps in complex workflows have greater impact) |
| **QD-P-2.4.2** | Undeclared Resources/Tools | — | 🔴 | 🔴 | L1 has no tools; L2/L3 P0 (tool invocation fails) |
| **QD-P-2.4.3** | Incorrect Tool Invocation Parameters or Order | — | 🟡 | 🟡 | L2/L3 P1; only when parameters or invocation order are written incorrectly in the body |
| **QD-P-2.4.4** | Multi-Turn Context and Memory Boundaries | — | 🟡 | 🟡 | Applies only to multi-turn/cross-session; L2/L3 P1 |
| **QD-P-2.5.1** | Missing Termination Constraints | — | 🟡 | 🔴 | L1 has no retries; L2 P1; L3 P0 (may cause resource exhaustion) |
| **QD-P-2.5.2** | Missing Security Boundary Constraints | 🔴 | 🔴 | 🔴 | P0 at all levels; may cause security incidents |
| **QD-P-2.5.3** | Missing Permission Control Boundaries | — | 🟡 | 🔴 | L1 has no permission control; L2 P1; L3 P0 (may cause privilege escalation) |
| **QD-P-2.5.4** | Undefined Constraint Priority | — | 🟡 | 🔴 | L1 constraints are simple and do not need priority; L2 P1; L3 P0 |
| **QD-P-2.5.6** | Instruction-Data Trust Boundary | — | 🔴 | 🔴 | L2/L3 P0 (missing injection defense declaration); actual resistance is verified by Risk Implicit |
| **QD-P-2.5.7** | Human Confirmation for High-Risk Operations | — | — | — | L2/L3 P0 when high-risk irreversible operations such as funds/deletion/sending/production changes are involved; otherwise N/A |
| **QD-P-2.5.8** | System Prompt Confidentiality and Leak Response | — | 🟡 | 🟡 | L2/L3 P1 (confidentiality/leak response declaration); actual leaks are verified by Risk Implicit |
| **QD-P-2.5.9** | Industry Compliance and Disclaimer Boundaries | — | — | — | P0 in medical/financial/legal domains; N/A in other domains |
| **QD-P-2.6.1** | Runtime Exceptions Not Covered | — | 🟡 | 🔴 | L1 has no tools; L2 P1; L3 P0 (exception impact is greater in complex Agents) |
| **QD-P-2.6.2** | Missing Degradation and Recovery Strategy | — | — | 🟡 | L3 inspection only; P1; "stop and report" is a legitimate handling method |
| **QD-P-2.6.3** | Unreasonable Retry Mechanism | — | — | 🟡 | L3 inspection only; P1 (count limit/blind retry of write operations/status not checked on timeout) |
| **QD-P-2.6.4** | Out-of-Scope Request Refusal and Human Handoff | 🟡 | 🟡 | 🔴 | L1/L2 P1; L3 P0 (refusal template/referral/escalation conditions) |

> **Suggestion items (ungraded; not included in the tiered checklist, scoring, or Gate)**: QD-P-1.4.1 (Duplicate Constraints and Redundant Expressions), QD-P-2.1.3 (Structural Hierarchy Reasonableness), QD-P-2.1.5 (Context Budget Encroachment), QD-P-2.7.1 (Insufficient Positive Example Representativeness), QD-P-2.7.2 (Insufficient Counter-Example Coverage), QD-P-2.7.3 (Missing Boundary-Case Examples). These items have optimization value only: no deduction, no launch blocking, no waiver required.

<a id="333-inspection-item-statistics"></a>
#### 3.3.3 Inspection Item Statistics

| Agent Level | Total Items | P0 Items | P1 Items | P2 Items |
| --- | --- | --- | --- | --- |
| **L1** | 28 | 7 | 20 | 1 |
| **L2** | 42 | 17 | 24 | 1 |
| **L3** | 44 | 25 | 18 | 1 |

> **Counting basis**:
> - The "Total Items" column counts only inspection items **applicable** at that level (marked 🔴/🟡/🟢 in 3.3.2); items marked `-` (not applicable) are not counted. Therefore L3's 44 items = 48 rows in 3.3.2 − 4 "domain-triggered, no fixed level" conditional items (QD-P-2.3.4 / QD-P-2.3.7 / QD-P-2.5.7 / QD-P-2.5.9).
> - Conditional items whose notes say "upgraded/triggered when XX" are counted at the **default marked level**; upgrades are counted only after human review confirmation.
> - **Suggestion items (ungraded) are not counted**: QD-P-1.4.1, 2.1.3, 2.1.5, and 2.7.1–2.7.3 — 6 items in total — are not included in the table above and do not participate in scoring or the Gate.
> - **QD-P-2.5.5 (Missing Resource Invocation Frequency Limits) is deprecated and not counted** (the number is retained for traceability only). Business-level invocation frequency/batch expectations are now handled by Inspect Cross `QD-PT-2.6` / `QD-ST-3.4` (artifact declaration layer), layered with the runtime fallback layer of Harness/gateways and the business quota layer (see Inspect Cross §7.4); Harness fallback values are not equivalent to business-applicable upper limits.
> - **L2→L3 adds only 2 items** (QD-P-2.6.2, 2.6.3); the difference comes mainly from **level upgrades**: 8 items are upgraded from P1 to P0 (QD-P-1.1.2, 1.4.3, 2.4.1, 2.5.1, 2.5.3, 2.5.4, 2.6.1, 2.6.4), raising L3's P0 count from 17 to 25.

<a id="334-inspection-result-four-states"></a>
#### 3.3.4 Four-State Inspection Results

In addition to "pass/fail," each inspection item also permits the following results, to avoid misclassifying inapplicable or undeterminable cases as defects:

| Result | Meaning | Impact on Scoring |
| --- | --- | --- |
| **Pass** | The item applies and no defect is found | No deduction |
| **Fail** | The item applies and a defect is found | Deduct according to the corresponding level |
| **Not Applicable (N/A)** | The item does not apply to this Agent (e.g., "incorrect tool invocation parameters or order" for an Agent without tools) | Removed from the $W_{total}$ denominator |
| **Insufficient Evidence** | Whether a defect exists cannot be determined from the static text; human judgment is required | Neither pass nor defect; recorded as "pending confirmation" |
| **Suggestion (ungraded)** | Items with optimization value only; not in the tiered checklist | No deduction, no blocking, waiver-free |

**Applicability preconditions**: Each rule SHOULD state its applicability preconditions; rules without stated preconditions apply to all Agent Levels by default. Automatic detection results for gray-zone defects (QD-P-1.6.x) are recorded as "pending confirmation" by default and counted at the default level after human review confirmation (see [1.7](#17-gray-zone-summary)). Suggestion items (ungraded) are not included in the tiered checklist, scoring, or Gate and are recorded only as optimization advice.

---

<a id="34-inspection-process"></a>
### 3.4 Inspection Process

<a id="341-standard-inspection-process"></a>
#### 3.4.1 Standard Inspection Process

```
Inspection Process:

Step 1: Determine Agent Level
  → Determine AC-L1/AC-L2/AC-L3 based on Agent characteristics
  → Refer to determination criteria (any 2 or more satisfied); when the boundary is unclear, take the highest level and state the basis for the level determination in the report
  → If the determination is wrong, correction upon review is allowed; the correction rationale and new level MUST be recorded

Step 2: Determine Inspection Scope
  → Applicable items at this level = this level's checklist (3.3.2) − items judged "Not Applicable (N/A)"
  → Items judged not applicable MUST state the basis, to avoid being mistaken for missed inspection
  → Reference default counts: AC-L1 ≈ 28 items, AC-L2 ≈ 42 items, AC-L3 ≈ 44 items (actual counts follow applicable items)

Step 3: Execute Inspection
  → Inspect item by item in numerical order
  → Apply the severity level determination for the corresponding level

Step 4: Classify and Handle
  → P0 failed → MUST be fixed
  → P1 failed → The Inspect Gate may pass, but the item MUST be fixed before release; if it cannot be fixed, an EXC-* exception approval MUST be obtained per core §9.3/§9.4
  → P2 failed → SHOULD be included in the improvement plan or risk register (handle as appropriate)
  → Suggestion item (ungraded) → Record optimization advice; no blocking, waiver-free

Step 5: Confirm Pass
  → All P0 inspection items passed
  → P1 inspection items are on the "fix before release" list or have obtained an EXC-* exception (Inspect Gate PASS ≠ release PASS)
  → Generate inspection report (including level determination basis, N/A basis, P1 risk list, suggestion item list)
```

<a id="342-recommended-inspection-timing"></a>
#### 3.4.2 Recommended Inspection Timing

| Timing | Applicable Levels | Inspection Method |
| --- | --- | --- |
| **Authoring phase** | AC-L1/AC-L2/AC-L3 | Lite self-check (use the Minimum Rule Set; see Appendix A) |
| **Review phase** | AC-L1/AC-L2/AC-L3 | Full Checklist inspection (see 2.3.1) |
| **Pre-launch** | AC-L1/AC-L2/AC-L3 | Minimum Rule Set + human review of gray-zone defects (see 1.7 and Appendix A) |
| **Continuous iteration** | — | For each update, automated Agent Checklist inspection is recommended |
| **Troubleshooting** | AC-L1/AC-L2/AC-L3 | Prioritize the corresponding level's P0 items when Agent behavior is anomalous |

<a id="343-recommended-review-methods"></a>
#### 3.4.3 Recommended Review Methods

Recommended review methods are given in [3.6.3 Practice Recommendations](#363-practice-recommendations).

---

<a id="35-usage-examples"></a>
### 3.5 Usage Examples

> Result markers: ❌ = P0 (MUST fix), ⚠️ = P1 (SHOULD fix before release), 🔸 = P2 (SHOULD be included in the improvement plan or risk register), ✅ = pass.

<a id="351-l1-agent-inspection-example"></a>
#### 3.5.1 L1 Agent Inspection Example

**Scenario**: Translation Assistant

**Level Determination**: L1 (single skill, no tool invocations, no multi-turn dialogue)

**Inspection Scope**: 28 items

**Sample Inspection Results**:

| QD-P ID | Defect Name | Result | Severity | Handling |
| --- | --- | --- | --- | --- |
| QD-P-1.1.1 | Direct Contradiction | ✅ PASS | P0 | — |
| QD-P-1.1.2 | Priority Conflict | ✅ PASS | P1 | — |
| QD-P-1.2.1 | Role-Responsibility Mismatch | ✅ PASS | P0 | — |
| QD-P-1.3.1 | Quantifier Misuse | ⚠️ FAIL | P1 | SHOULD fix before release |
| QD-P-2.2.1 | Undeclared Input Source | ✅ PASS | P0 | — |
| QD-P-2.3.1 | Undefined Output Format | ⚠️ FAIL | P1 | SHOULD fix before release |

**Conclusion**: All P0 items passed; P1 items failed and SHOULD be fixed before launch.

<a id="352-l2-agent-inspection-example"></a>
#### 3.5.2 L2 Agent Inspection Example

**Scenario**: Customer Service Bot

**Level Determination**: L2 (multi-turn dialogue, 1–3 tools, simple workflow)

**Inspection Scope**: 42 items

**Sample Inspection Results**:

| QD-P ID | Defect Name | Result | Severity | Handling |
| --- | --- | --- | --- | --- |
| QD-P-1.1.1 | Direct Contradiction | ✅ PASS | P0 | — |
| QD-P-1.3.3 | Undefined Boundaries | ❌ FAIL | P0 | **MUST fix** |
| QD-P-2.3.2 | Incomplete Output Schema | ✅ PASS | P0 | — |
| QD-P-2.4.2 | Undeclared Resources/Tools | ❌ FAIL | P0 | **MUST fix** |
| QD-P-2.5.1 | Missing Termination Constraints | ⚠️ FAIL | P1 | SHOULD fix before release |

**Conclusion**: P0 items failed; MUST be fixed before launch.

<a id="353-l3-agent-inspection-example"></a>
#### 3.5.3 L3 Agent Inspection Example

**Scenario**: Financial Analysis Agent

**Level Determination**: L3 (4+ tools, complex workflow, security-sensitive)

**Inspection Scope**: 44 items (full coverage)

**Sample Inspection Results**:

| QD-P ID | Defect Name | Result | Severity | Handling |
| --- | --- | --- | --- | --- |
| QD-P-1.1.2 | Priority Conflict | ❌ FAIL | P0 | **MUST fix** |
| QD-P-1.6.1 | Critical Decision Word Vagueness | ❌ FAIL | P0 | **MUST fix** |
| QD-P-2.3.4 | Missing Security/Privacy Filtering | ❌ FAIL | P0 | **MUST fix** |
| QD-P-2.5.6 | Instruction-Data Trust Boundary | ❌ FAIL | P0 | **MUST fix** |
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
   → Determine the level based on Agent characteristics (AC-L1/AC-L2/AC-L3)
   → Design with reference to the corresponding level's inspection checklist

2. Inspection Phase:
   → Use the corresponding level's inspection checklist for item-by-item inspection
   → P0 MUST be fixed; P1 SHOULD be fixed before release

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

> **Supplementary notes**:
> - The score reflects "relative completeness after defect deductions"; it is **not** the probability that a defect causes an incident, nor does it replace compliance determination.
> - Different Agent Levels (AC-L1/AC-L2/AC-L3) have different total weights $W_{total}$, so **scores across levels are not directly comparable**.
> - The scoring report SHOULD include `found_count` (the number of findings per item) for audit and trend analysis.
> - When the Agent level determination changes, the original level's score SHOULD be retained as a baseline, and the migration rationale recorded.

<a id="42-calculation-steps"></a>
### 4.2 Calculation Steps

**Step 1: Determine Agent Level**

- Determine AC-L1/AC-L2/AC-L3 according to Chapter 3 of this document.

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

> Rounding rule: $base$ retains two decimal places (e.g., $0.56$) for subsequent deduction calculations; the final $Score$ retains two decimal places.

**Step 4: Determine Per-Defect Deduction Values**

- $P0$ defect deduction = $base \times 5$
- $P1$ defect deduction = $base \times 3$
- $P2$ defect deduction = $base \times 1$

**Step 5: Calculate Total Deduction**

- Total deduction = deduct once for each "failed inspection item number" according to its severity level.
- **The same inspection item number is deducted only once, regardless of how many defect instances are found.**

**Step 6: Calculate Actual Score**

- Actual score:

  $$
  Score=\max(100-\text{Total Deduction},0)
  $$

**Step 7: Gate Determination**

- If any `P0` defect exists → result = FAIL (score is still output)
- Otherwise → Inspect Gate result = PASS (P1 does not block the Inspect Gate, but MUST be fixed before release or an EXC-* exception obtained; this result is not equivalent to a release-summary PASS — see core §6.1/§6.2)

<a id="43-per-sub-standard-inspection-item-distribution-table"></a>
### 4.3 Per-Sub-Standard Inspection Item Distribution Table (Inspect Prompt)

Based on the statistics from Section 3.3.3:

| Agent Level | Total Items | P0 Count | P1 Count | P2 Count | Total Weight $W_{total}$ | Base Score $base$ |
| --- | --- | --- | --- | --- | --- | --- |
| **L1** | 28 | 7 | 20 | 1 | $5\cdot7+3\cdot20+1\cdot1=96$ | $100/96=1.04$ |
| **L2** | 42 | 17 | 24 | 1 | $5\cdot17+3\cdot24+1\cdot1=158$ | $100/158=0.63$ |
| **L3** | 44 | 25 | 18 | 1 | $5\cdot25+3\cdot18+1\cdot1=180$ | $100/180=0.56$ |

<a id="44-defect-deduction-value-table"></a>
### 4.4 Defect Deduction Value Table (Example)

| Agent Level | Base Score $base$ | P0 Deduction (×5) | P1 Deduction (×3) | P2 Deduction (×1) |
| --- | --- | --- | --- | --- |
| **L1** | 1.04 | 5.20 | 3.12 | 1.04 |
| **L2** | 0.63 | 3.15 | 1.89 | 0.63 |
| **L3** | 0.56 | 2.80 | 1.68 | 0.56 |

<a id="45-scoring-examples"></a>
### 4.5 Scoring Examples (Including Gate: FAIL)

**Example Scenario**: L2 Agent  
After inspection, the failed items (deduplicated by inspection item number) are:

- Failed `P0` inspection items: 2
- Failed `P1` inspection items: 1
- Failed `P2` inspection items: 0  
  Therefore, `P0` defect exists → Gate = FAIL.

L2:

- $W_{total}=158$
- $base=100/158=0.63$
- $P0$ deduction = $base\times5 = 3.15$
- $P1$ deduction = $base\times3 = 1.89$

**Total Deduction**:
$$
\text{Total Deduction} = 2\cdot3.15 + 1\cdot1.89
= 6.30 + 1.89
= 8.19
$$

**Score**:
$$
Score = 100 - 8.19 = 91.81
$$

**Result**:

- result = FAIL (P0 exists)
- score = 91.81

**Scoring Report (Example JSON)**:

> Fields follow framework/core.md §5.2 Minimum Finding Record: `finding_id` is the Finding instance ID and `rule_id` is the rule ID; the two MUST NOT be merged. Severity carries the `Inspect·` domain prefix.

```json
{
  "inspection_id": "inspect-20261010-001",
  "framework": "SanityOps/Inspect Prompt",
  "spec_version": "v1.1",
  "checker_version": "1.0.0",
  "artifact_version": "1.0.0",
  "agent_level": "AC-L2",
  "result": "FAIL",
  "score": 91.81,
  "defects": [
    {
      "finding_id": "F-ORG-20261010-001",
      "rule_id": "QD-P-1.1.1",
      "severity": "Inspect·P0",
      "status": "open",
      "applicability": "applicable",
      "evidence": "Prompt body, paragraph 2: <verbatim excerpt>",
      "rationale": "The same behavior is simultaneously permitted and prohibited",
      "reviewer": "<reviewer>",
      "waiver": null,
      "found_count": 1
    },
    {
      "finding_id": "F-ORG-20261010-002",
      "rule_id": "QD-P-2.2.4",
      "severity": "Inspect·P0",
      "status": "open",
      "applicability": "applicable",
      "evidence": "Prompt body, paragraph 5: <verbatim excerpt>",
      "rationale": "Handling when input is missing is not defined",
      "reviewer": "<reviewer>",
      "waiver": null,
      "found_count": 1
    },
    {
      "finding_id": "F-ORG-20261010-003",
      "rule_id": "QD-P-1.3.2",
      "severity": "Inspect·P1",
      "status": "open",
      "applicability": "applicable",
      "evidence": "Prompt body, paragraph 3: <verbatim excerpt>",
      "rationale": "The qualifier 'appropriate' does not define a judgment boundary",
      "reviewer": "<reviewer>",
      "waiver": null,
      "found_count": 1
    }
  ]
}
```

<a id="46-multi-defect-handling-rules"></a>
### 4.6 Multi-Defect Handling Rules

- **Same inspection item number is counted as at most one failure**: Repeated triggering of the same inspection item results in only one deduction of that item's corresponding severity-level weight.
- **Multiple defects falling under the same inspection item do not incur duplicate deductions**: For example, if the same QD-P number has multiple issues in a single inspection, it is still handled as "that number failed once."
- **Primary defect consolidation**: If the same fact hits multiple semantically overlapping numbers, deduct only under one primary number and record the others as "related" without duplicate deduction.
- **Gate and level are based on the severity level at the Agent's level**.

**Known semantic overlap groups** (the primary number is the one whose definition fits best; the others are recorded as related):

| Primary Number | Related Numbers |
| --- | --- |
| QD-P-1.1.2 | QD-P-1.6.3, QD-P-2.5.4 |
| QD-P-1.3.2 | QD-P-1.6.1 |
| QD-P-1.3.3 | QD-P-2.5.2, QD-P-2.5.3 |
| QD-P-1.5.2 | QD-P-2.4.2 |
| QD-P-2.2.3 | QD-P-2.2.4 |
| QD-P-1.6.5 | QD-P-2.5.1 |
| QD-P-2.6.2 | QD-P-2.6.3 |
| QD-P-2.1.2 | QD-P-2.4.2 |

> Overlap groups merged or downgraded in this revision and no longer participating in deductions: QD-P-2.1.4 (merged into QD-P-1.4.1), QD-P-2.7.1/2.7.3 (both downgraded to suggestion items). The division of labor between QD-P-2.4.3 and QD-P-2.6.1 is annotated in their definitions and is no longer listed as an overlap group.

---

## Appendix A: Minimum Rule Sets

> **Minimum Rule Sets** define the inspection items that MUST be passed for each Agent Level, forming the core basis for compliance determination.

<a id="a1-l1-minimum-rule-set"></a>
### A.1 L1 Minimum Rule Set (7 P0 Items)

| QD-P ID | Defect Name | Category |
| --- | --- | --- |
| QD-P-1.1.1 | Direct Contradiction | Contradiction |
| QD-P-1.1.3 | Example-Rule Contradiction | Contradiction |
| QD-P-1.2.1 | Role-Responsibility Mismatch | Mismatch |
| QD-P-1.2.3 | Constraint-Responsibility Mismatch | Mismatch |
| QD-P-1.5.1 | Responsibilities Do Not Support Objective | Implication |
| QD-P-2.2.1 | Undeclared Input Source | Input Definition |
| QD-P-2.5.2 | Missing Security Boundary Constraints | Constraints/Boundaries |

> **L1 Agent Compliance Determination**: MUST pass the above 7 P0 inspection items. P1 items SHOULD be fixed before release; P2 items SHOULD be included in the improvement plan or risk register.

<a id="a2-l2-minimum-rule-set"></a>
### A.2 L2 Minimum Rule Set (17 P0 Items)

| QD-P ID | Defect Name | Category |
| --- | --- | --- |
| QD-P-1.1.1 | Direct Contradiction | Contradiction |
| QD-P-1.1.3 | Example-Rule Contradiction | Contradiction |
| QD-P-1.2.1 | Role-Responsibility Mismatch | Mismatch |
| QD-P-1.2.3 | Constraint-Responsibility Mismatch | Mismatch |
| QD-P-1.3.3 | Undefined Boundaries | Scope Definition |
| QD-P-1.5.1 | Responsibilities Do Not Support Objective | Implication |
| QD-P-1.5.2 | Resources Do Not Support Workflow | Implication |
| QD-P-2.2.1 | Undeclared Input Source | Input Definition |
| QD-P-2.2.2 | Unconstrained Input Format | Input Definition |
| QD-P-2.2.3 | Required/Optional Not Distinguished | Input Definition |
| QD-P-2.2.4 | Undefined Missing-Input Handling | Input Definition |
| QD-P-2.3.1 | Undefined Output Format | Output Definition |
| QD-P-2.3.2 | Incomplete Output Schema | Output Definition |
| QD-P-2.3.5 | Factuality and Hallucination Control Declaration | Output Definition |
| QD-P-2.4.2 | Undeclared Resources/Tools | Workflow/Resources |
| QD-P-2.5.2 | Missing Security Boundary Constraints | Constraints/Boundaries |
| QD-P-2.5.6 | Instruction-Data Trust Boundary | Constraints/Boundaries |

> **L2 Agent Compliance Determination**: MUST pass the above 17 P0 inspection items. P1 items SHOULD be fixed before release; P2 items SHOULD be included in the improvement plan or risk register.

<a id="a3-l3-minimum-rule-set"></a>
### A.3 L3 Minimum Rule Set (25 P0 Items)

| QD-P ID | Defect Name | Category |
| --- | --- | --- |
| QD-P-1.1.1 | Direct Contradiction | Contradiction |
| QD-P-1.1.2 | Priority Conflict | Contradiction |
| QD-P-1.1.3 | Example-Rule Contradiction | Contradiction |
| QD-P-1.2.1 | Role-Responsibility Mismatch | Mismatch |
| QD-P-1.2.3 | Constraint-Responsibility Mismatch | Mismatch |
| QD-P-1.3.3 | Undefined Boundaries | Scope Definition |
| QD-P-1.4.3 | Invalid Skill Definitions | Redundancy/Invalidity |
| QD-P-1.5.1 | Responsibilities Do Not Support Objective | Implication |
| QD-P-1.5.2 | Resources Do Not Support Workflow | Implication |
| QD-P-2.2.1 | Undeclared Input Source | Input Definition |
| QD-P-2.2.2 | Unconstrained Input Format | Input Definition |
| QD-P-2.2.3 | Required/Optional Not Distinguished | Input Definition |
| QD-P-2.2.4 | Undefined Missing-Input Handling | Input Definition |
| QD-P-2.3.1 | Undefined Output Format | Output Definition |
| QD-P-2.3.2 | Incomplete Output Schema | Output Definition |
| QD-P-2.3.5 | Factuality and Hallucination Control Declaration | Output Definition |
| QD-P-2.4.1 | Incomplete Workflow Steps | Workflow/Resources |
| QD-P-2.4.2 | Undeclared Resources/Tools | Workflow/Resources |
| QD-P-2.5.1 | Missing Termination Constraints | Constraints/Boundaries |
| QD-P-2.5.2 | Missing Security Boundary Constraints | Constraints/Boundaries |
| QD-P-2.5.3 | Missing Permission Control Boundaries | Constraints/Boundaries |
| QD-P-2.5.4 | Undefined Constraint Priority | Constraints/Boundaries |
| QD-P-2.5.6 | Instruction-Data Trust Boundary | Constraints/Boundaries |
| QD-P-2.6.1 | Runtime Exceptions Not Covered | Exception Handling |
| QD-P-2.6.4 | Out-of-Scope Request Refusal and Human Handoff | Exception Handling |

> **L3 Agent Compliance Determination**: MUST pass the above 25 P0 inspection items. P1 items SHOULD be fixed before release; P2 items SHOULD be included in the improvement plan or risk register.

#### A.3.1 Conditionally Triggered P0 Items (Not Included in the Fixed Count)

The following 3 items are treated as P0 when their trigger conditions are met. Because "whether triggered" depends on artifact facts, they are not included in the fixed P0 counts (7/17/25) of A.1–A.3, nor in the scoring denominator (§4.2). During inspection, determine item by item whether they are triggered:

| QD-P ID | Defect Name | Trigger Condition | When Not Triggered |
| --- | --- | --- | --- |
| QD-P-2.3.4 | Missing Security/Privacy Filtering | Processing involves personal data (PII) | N/A |
| QD-P-2.5.7 | Human Confirmation for High-Risk/Irreversible Operations | Possesses side-effecting operations such as funds/deletion/sending/production changes (L2/L3) | N/A |
| QD-P-2.5.9 | Industry Compliance and Disclaimer Boundaries | Regulated domains such as medical/financial/legal | N/A |

Once triggered, it is P0 and MUST be fixed; if not triggered, mark `N/A` and remove it from the denominator (see §3.3.4).

<a id="a4-minimum-rule-set-usage-notes"></a>
### A.4 Minimum Rule Set Usage Notes

#### A.4.1 Rapid Determination Process

```
Step 1: Determine Agent Level (AC-L1/AC-L2/AC-L3)
  → Refer to 3.1 Agent Level Definitions

Step 2: Execute the corresponding level's Minimum Rule Set inspection
  → L1: Inspect 7 items
  → L2: Inspect 17 items (includes L1's 7 items)
  → L3: Inspect 25 items (includes L2's 17 items)

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

## Version History

- **v1.0** (October 2026): Initial release.
- **v1.1** (October 2026): Expanded Inspect and Permission defect coverage; Risk Explicit regraded to P0/P1/P2; multi-hit design principle clarified; terminology aligned to Logic Artifacts.

---

© 2026 Sanity AI Labs. Licensed under Creative Commons Attribution-ShareAlike 4.0 International.
https://www.sanityops.org  ·  hello@sanityops.org
v1.1  ·  October 2026
