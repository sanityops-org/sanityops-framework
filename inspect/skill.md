# SanityOps Framework

# Inspect Skill Specification

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
  - [0.3 Version and Maintenance Information](#03-version-and-maintenance-information)
- [Part 1: Quality Defect Classification System Overview](#part-1-quality-defect-classification-system-overview)
  - [1.1 Five Defect Classification Framework](#11-five-defect-classification-framework)
- [Part 2: QD-S-1 Resource Runaway (Boundary Absence)](#part-2-qd-s-1-resource-runaway-boundary-absence)
  - [2.1 Classification Positioning](#21-classification-positioning)
  - [2.2 Inspection Items in Detail](#22-inspection-items-in-detail)
  - [2.3 QD-S-1 Inspection Checklist](#23-qd-s-1-inspection-checklist)
- [Part 3: QD-S-2 Unbounded Directive](#part-3-qd-s-2-unbounded-directive)
  - [3.1 Classification Positioning](#31-classification-positioning)
  - [3.2 Inspection Items in Detail](#32-inspection-items-in-detail)
  - [3.3 QD-S-2 Inspection Checklist](#33-qd-s-2-inspection-checklist)
- [Part 4: QD-S-3 Ambiguity-Induced Inference](#part-4-qd-s-3-ambiguity-induced-inference)
  - [4.1 Classification Positioning](#41-classification-positioning)
  - [4.2 Inspection Items in Detail](#42-inspection-items-in-detail)
  - [4.3 QD-S-3 Inspection Checklist](#43-qd-s-3-inspection-checklist)
- [Part 5: QD-S-4 Failure Escalation](#part-5-qd-s-4-failure-escalation)
  - [5.1 Classification Positioning](#51-classification-positioning)
  - [5.2 Inspection Items in Detail](#52-inspection-items-in-detail)
  - [5.3 QD-S-4 Inspection Checklist](#53-qd-s-4-inspection-checklist)
- [Part 6: QD-S-5 Permission Overflow](#part-6-qd-s-5-permission-overflow)
  - [6.1 Classification Positioning](#61-classification-positioning)
  - [6.2 Inspection Items in Detail](#62-inspection-items-in-detail)
  - [6.3 QD-S-5 Inspection Checklist](#63-qd-s-5-inspection-checklist)
- [Part 7: Skill Tiered Inspection Mechanism](#part-7-skill-tiered-inspection-mechanism)
  - [7.1 Skill Risk Level Definitions](#71-skill-risk-level-definitions)
  - [7.2 Tiered Inspection Checklist](#72-tiered-inspection-checklist)
  - [7.3 Standard Inspection Process (6 Steps)](#73-standard-inspection-process-6-steps)
- [Part 8: Review Schema — Detailed Review Dimensions](#part-8-review-schema--detailed-review-dimensions)
  - [8.1 Six-Dimension Overview and Positioning](#81-six-dimension-overview-and-positioning)
  - [8.2 IDENTITY Dimension in Detail](#82-identity-dimension-in-detail)
  - [8.3 TRIGGER Dimension in Detail](#83-trigger-dimension-in-detail)
  - [8.4 INPUT Dimension in Detail](#84-input-dimension-in-detail)
  - [8.5 EXECUTION Dimension in Detail](#85-execution-dimension-in-detail)
  - [8.6 OUTPUT Dimension in Detail](#86-output-dimension-in-detail)
  - [8.7 FAILURE Dimension in Detail](#87-failure-dimension-in-detail)
- [Part 9: Usage Examples](#part-9-usage-examples)
  - [9.1 L1 Example: WeeklyReportWriter](#91-l1-example-weeklyreportwriter-personal-productivity-scenario)
  - [9.2 L3 Example: DatabaseDiagnosticReporter](#92-l3-example-databasediagnosticreporter-enterprise-operations-scenario)
- [Part 10: Relationship to Other Sub-Specifications](#part-10-relationship-to-other-sub-specifications)
  - [10.1 Placeholder Note](#101-placeholder-note)
- [Part 11: Quantitative Scoring Mechanism](#part-11-quantitative-scoring-mechanism)
  - [11.1 Scoring Principles](#111-scoring-principles)
  - [11.2 Calculation Steps](#112-calculation-steps)
  - [11.3 Inspection Item Distribution Table](#113-inspection-item-distribution-table)
  - [11.4 Defect Deduction Value Table](#114-defect-deduction-value-table)
  - [11.5 Scoring Examples](#115-scoring-examples)
  - [11.6 Multi-Defect Handling Rules](#116-multi-defect-handling-rules)
- [Appendix A: QD-S Complete Numbering Index](#appendix-a-qd-s-complete-numbering-index)
- [Appendix B: L1/L2/L3 Minimum Rule Sets](#appendix-b-l1l2l3-minimum-rule-sets)
- [Appendix C: Glossary](#appendix-c-glossary)
- [Part Summaries](#part-summaries)

---

## Foreword

<a id="01-positioning-and-scope"></a>
### 0.1 Positioning and Scope

#### 0.1.1 What This Specification Is

This specification is one of the core sub-specifications of the SanityOps Framework's Inspect Standard. It defines the quality defect inspection standards for AI Agent Skills.

This specification is designed to:

- Identify quality defects unintentionally introduced by developers in Agent Skill definitions
- Provide a unified inspection framework for Skill inspection, review, and governance
- Provide explicit rule definitions for automated inspection tooling (the Inspect Skill inspection Agent)

#### 0.1.2 What This Specification Is Not

This specification is **not**:

- A Skill development guide: it does not prescribe how to design "good" Skills
- An attack detection specification: it does not cover EX (Explicit attack risk) or IM (Implicit logic risk)
- A runtime monitoring specification: it does not address behavioral monitoring during Skill execution
- A permission management specification: it does not replace system-level permission control mechanisms

#### 0.1.3 Position Within the SanityOps Framework

```
SanityOps Framework
│
├─ Inspect (Defect Inspection)
│   ├─ Inspect Tool ← Tool Schema defect inspection
│   ├─ Inspect Prompt ← System Prompt defect inspection
│   ├─ Inspect Skill ← Skill defect inspection ← You are here
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

#### 0.1.4 Inspection Scope

This specification's inspection scope includes:

**Inspection Objects**:

- Skill natural-language descriptions
- Skill name, purpose, and capability boundaries
- Skill input, execution, and output constraints
- Skill trigger conditions and failure handling
- Skill permission declarations and tool invocations

**Core Inspection Dimensions**:

```
├─ QD-S-0: Baseline Compliance Check (entry gate)
│
├─ QD-S-1: Resource Runaway (Boundary Absence)
├─ QD-S-2: Unbounded Directive
├─ QD-S-3: Ambiguity-Induced Inference
├─ QD-S-4: Failure Escalation
└─ QD-S-5: Permission Overflow
```

#### 0.1.5 Out of Scope

This specification does **not** cover:

- Runtime parameter value validation for Skills
- Skill execution process monitoring and logging
- System-level permission control implementation
- Skill functional completeness testing

<a id="02-terminology-and-numbering-system"></a>
### 0.2 Terminology and Numbering System

#### 0.2.1 Core Terminology

| Term | Definition |
| --- | --- |
| **Skill** | A functional unit of an AI Agent, defined by its name, description, and input/output constraints |
| **Quality Defect (QD-S)** | An incomplete, ambiguous, or unbounded definition unintentionally introduced by the Skill developer |
| **Review Schema** | An intermediate review framework (6 dimensions) used by Inspect Skill to decompose and analyze Skill definitions |
| **Gap Analysis** | Dimension-by-dimension inspection of Skill definition gaps against the Review Schema |
| **LLM Default Gap-Filling Behavior** | The LLM's tendency to fill behavioral gaps with its own judgment when a Skill leaves scenarios undeclared |
| **Inferential Verification** | Static reasoning to demonstrate defect risk and remediation effectiveness |
| **EX** | Explicit Risk — explicit attack risk |
| **IM** | Implicit Risk — implicit logic risk |
| **L1/L2/L3** | Skill Risk Levels (Low/Medium/High) |
| **P0/P1/P2** | Defect Levels (Blocking/Warning/Advisory) |

#### 0.2.2 Numbering System

This specification uses the **QD-S-x.y** numbering system:

```
QD-S-x.y

├─ QD: Quality Defect
├─ S: Skill
├─ x: Defect category number
│   ├─ 0: Baseline Compliance Check
│   ├─ 1: Resource Runaway
│   ├─ 2: Unbounded Directive
│   ├─ 3: Ambiguity-Induced Inference
│   ├─ 4: Failure Escalation
│   └─ 5: Permission Overflow
└─ y: Specific defect item number
```

**Examples**:

- `QD-S-1.1`: Resource Runaway → Input Boundary Missing
- `QD-S-3.3`: Ambiguity-Induced Inference → Ambiguous Input Handling Strategy Missing

#### 0.2.3 Skill Risk Levels (L)

| Risk Level | Designation | Definition | Typical Characteristics |
| --- | --- | --- | --- |
| **Low Risk** | L1 | Text-processing only; no tool invocations | Weekly report compilation, text polishing, translation |
| **Medium Risk** | L2 | Resource access; may involve sensitive data | Data queries, knowledge retrieval, email reading |
| **High Risk** | L3 | Operation execution; irreversible operations | Data deletion, payments, permission changes |

#### 0.2.4 Defect Levels (P)

| Defect Level | Symbol | Definition | Release Recommendation |
| --- | --- | --- | --- |
| **P0** | 🔴 | Blocking: a directly realizable resource runaway or behavioral overflow path exists | MUST NOT release; MUST be fixed |
| **P1** | 🟡 | Warning: defect impacts behavioral quality; predictable unintended behavior exists | Strongly recommended to fix |
| **P2** | 🟢 | Advisory: minor specification compliance issue | Recommended to fix; MAY release |

<a id="03-version-and-maintenance-information"></a>
### 0.3 Version and Maintenance Information

#### 0.3.1 Current Version

- **Version**: v1.0
- **Release Status**: Initial release
- **Last Updated**: September 2026
- **Maintainer**: SanityOps Working Group

#### 0.3.2 Version History

| Version | Release Date | Major Changes |
| --- | --- | --- |
| v1.0 | 2026-09 | Initial release |

---

## Part 1: Quality Defect Classification System Overview

<a id="11-five-defect-classification-framework"></a>
### 1.1 Five Defect Classification Framework

Inspect Skill v1.0 classifies defects by **risk principle** rather than structural field, comprising five defect categories:

| Category | ID | Risk Principle | Typical Manifestation |
| --- | --- | --- | --- |
| **Resource Runaway** | QD-S-1 | Execution boundary constraints are missing; the LLM infers scope on its own, and the inference is typically broader | No input limit, no output size limit, no retry limit |
| **Unbounded Directive** | QD-S-2 | Unbounded language is actively included, directly driving the LLM toward unbounded execution | Uses words like all/every/keep trying without corresponding limits |
| **Ambiguity-Induced Inference** | QD-S-3 | Descriptions are vague; the LLM tends toward "reasonable assumptions" rather than stopping, producing overflow behavior | Overly broad trigger conditions, undeclared default behavior, inaccurate metadata |
| **Failure Escalation** | QD-S-4 | Failure handling is undefined; the LLM's "complete the task" objective drives it to self-expand strategies | Undefined failure behavior, forced completeness, missing prohibited behaviors |
| **Permission Overflow** | QD-S-5 | Permission boundaries are unclear; the LLM interprets broad capability descriptions as implicit authorization | Read/write/delete not distinguished, high-risk operations lack confirmation, environment boundaries missing |

---

## Part 2: QD-S-1 Resource Runaway (Boundary Absence)

<a id="21-classification-positioning"></a>
### 2.1 Classification Positioning

**Risk Principle**: The Skill does not declare critical constraint boundaries (input size, output size, execution resources, data sources). The LLM, in the absence of boundaries, infers the execution scope on its own, and the inferred result is typically broader than the developer intended, causing resource runaway.

**Typical Harms**: API cost explosion, Token Consumption runaway, execution timeout, excessive system load.

<a id="22-inspection-items-in-detail"></a>
### 2.2 Inspection Items in Detail

#### QD-S-1.1 Input Boundary Missing

**Defect Description**: The Skill does not declare an upper limit on the number of input items or a size constraint, allowing unbounded input.

**Defect Example**:

| Dimension | Content |
| --- | --- |
| **Incorrect** | `description: "Organize work notes submitted by the user and generate a weekly report."` (no maximum item count declared) |
| **Problem** | User pastes 1,000 records; the LLM attempts to process all of them |
| **Default Behavior** | Token Consumption runs away; costs accumulate |

**Remediation Example**:

```markdown
Organize work notes submitted by the user and generate a weekly report.
- Input limit: Process up to 50 work notes
- When exceeding 50: Process the first 50 and notify the user
```

**Severity**:

- L1 (Low Risk): 🟡 P1
- L2 (Medium Risk): 🔴 P0
- L3 (High Risk): 🔴 P0

#### QD-S-1.2 Output Size Missing

**Defect Description**: The Skill does not declare an upper limit on output size, potentially causing output bloat or Context Window overflow.

**Defect Example**:

| Dimension | Content |
| --- | --- |
| **Incorrect** | `description: "Generate a detailed summary of user documents."` (no summary length declared) |
| **Problem** | Ten 50KB documents → LLM generates a 500KB summary |
| **Default Behavior** | Response body explodes; Context Window overflows |

**Remediation Example**:

```markdown
Generate summaries of user documents.
- Single document summary: 200–500 words
- Multiple documents: Generate a consolidated summary, total length not exceeding 2,000 words
- When exceeding: Generate a table-of-contents-style summary with one sentence per document
```

**Severity**:

- L1 (Low Risk): 🟡 P1
- L2 (Medium Risk): 🟡 P1
- L3 (High Risk): 🔴 P0

#### QD-S-1.3 Execution Resource Boundary Missing

**Defect Description**: The Skill involves tool invocations or retries, but does not declare retry count, tool invocation count, or execution timeout.

**Defect Example**:

| Dimension | Content |
| --- | --- |
| **Incorrect** | `description: "Diagnose database issues. Keep trying until the problem is resolved."` |
| **Problem** | "Keep trying" has no termination condition |
| **Default Behavior** | Infinite retries, infinite tool invocations; costs run away |

**Remediation Example**:

```markdown
Diagnose database issues.
- Maximum query count: 5
- Single query data volume: Not exceeding 1,000 records
- Execution timeout: 60 seconds
- On timeout: Return the diagnosed content so far; inform the user that manual handling is required
```

**Severity**:

- L1 (Low Risk): 🟢 P2
- L2 (Medium Risk): 🔴 P0
- L3 (High Risk): 🔴 P0

#### QD-S-1.4 Permission Boundary Missing

**Defect Description**: The Skill does not explicitly distinguish between read/write/delete permission types, or does not declare the types of operations that are prohibited.

**Defect Example**:

| Dimension | Content |
| --- | --- |
| **Incorrect** | `description: "Assist with database issues."` ("assist" may include read, write, delete) |
| **Problem** | The LLM interprets broad capability descriptions as implicit authorization |
| **Default Behavior** | The LLM executes delete operations (as in the Replit incident) |

**Remediation Example**:

```markdown
Diagnose database issues. This Skill provides read-only diagnosis only.
- Allowed: View error messages, analyze table structures, inspect query performance
- Prohibited: UPDATE, DELETE, INSERT, DROP, ALTER, data migration, data cleanup

Irreversible operations MUST be confirmed by a human before execution.
```

**Severity**:

- L1 (Low Risk): 🟢 P2
- L2 (Medium Risk): 🟡 P1
- L3 (High Risk): 🔴 P0

#### QD-S-1.5 Data Source Boundary Missing

**Defect Description**: The Skill does not declare permitted or prohibited data sources; the LLM may collect data from conversation history or external systems on its own.

**Defect Example**:

| Dimension | Content |
| --- | --- |
| **Incorrect** | `description: "Query user information."` (no permitted data sources declared) |
| **Problem** | The LLM may collect information from conversation history, public databases, or other systems |
| **Default Behavior** | Data leaks; unauthorized access |

**Remediation Example**:

```markdown
Query user information.
- Use only content explicitly provided by the user in the current request
- Prohibited: Inferring from conversation history, pulling from external systems, collecting from default configurations
- If the needed data is not provided by the user, ask the user rather than inferring
```

**Severity**:

- L1 (Low Risk): 🟢 P2
- L2 (Medium Risk): 🟡 P1
- L3 (High Risk): 🟡 P1

<a id="23-qd-s-1-inspection-checklist"></a>
### 2.3 QD-S-1 Inspection Checklist

| ID | Inspection Item | Trigger Keywords | L1 | L2 | L3 | Inspection Method |
| --- | --- | --- | --- | --- | --- | --- |
| **QD-S-1.1** | Input Boundary Missing | accept, process, organize | P1 | P0 | P0 | Automated |
| **QD-S-1.2** | Output Size Missing | generate, output, report | P1 | P1 | P0 | Automated |
| **QD-S-1.3** | Execution Resource Boundary Missing | keep trying, until success, ensure complete | P2 | P0 | P0 | Automated |
| **QD-S-1.4** | Permission Boundary Missing | manage, handle, assist | P2 | P1 | P0 | Human |
| **QD-S-1.5** | Data Source Boundary Missing | collect, infer, supplement | P2 | P1 | P1 | Semi-automated |

---

## Part 3: QD-S-2 Unbounded Directive

<a id="31-classification-positioning"></a>
### 3.1 Classification Positioning

**Risk Principle**: The Skill actively includes directives or enumerations that are semantically unbounded, directly driving the LLM toward unbounded execution or unbounded expansion. These defects are not about "what is missing" — they are about "what was written that shouldn't have been."

**Typical Harms**: Infinite retries, infinite output expansion, automatic expansion of execution scope.

<a id="32-inspection-items-in-detail"></a>
### 3.2 Inspection Items in Detail

#### QD-S-2.1 Unbounded Quantity Declaration

**Defect Description**: Uses unbounded words such as `all / every / entire / complete` without a corresponding quantity limit.

**Defect Example**:

| Dimension | Content |
| --- | --- |
| **Incorrect** | `description: "Process all work notes and generate a complete weekly report."` |
| **Problem** | "All" and "complete" have no quantity constraints |
| **Default Behavior** | The LLM pursues exhaustive processing; Token runs away |

**Remediation Example**:

```markdown
Process work notes provided by the user (up to 50) and generate a weekly report.
- If more than 50, process the first 50 and notify the user
```

**Severity**:

- L1 (Low Risk): 🟡 P1
- L2 (Medium Risk): 🔴 P0
- L3 (High Risk): 🔴 P0

#### QD-S-2.2 Unterminated Execution Declaration

**Defect Description**: Uses words such as `keep trying / until success / ensure complete / persist until` without defining a termination condition.

**Defect Example**:

| Dimension | Content |
| --- | --- |
| **Incorrect** | `description: "Try to fix the database issue until the problem is resolved."` |
| **Problem** | "Until success" has no failure threshold and no retry limit |
| **Default Behavior** | The LLM enters an infinite retry loop; costs run away |

**Remediation Example**:

```markdown
Diagnose database issues and recommend remediation plans (not auto-executed).
- Maximum 3 rounds of diagnosis
- If the issue is not resolved after 3 rounds, return the diagnosed content so far and recommend human handling
```

**Severity**:

- L1 (Low Risk): 🟡 P1
- L2 (Medium Risk): 🔴 P0
- L3 (High Risk): 🔴 P0

#### QD-S-2.3 Open-Ended Enumeration in Structure Declaration

**Defect Description**: Output or functional structures use open-ended enumerations such as "etc.", "and others", "such as", allowing the LLM to add items on its own.

**Defect Example**:

| Dimension | Content |
| --- | --- |
| **Incorrect** | `description: "The weekly report should include: completed work, progress, problems, etc."` |
| **Problem** | "etc." implies additional sections may be added |
| **Default Behavior** | The LLM adds unrequested sections such as "risk analysis," "personal growth," "team recommendations" |

**Remediation Example**:

```markdown
The weekly report should include the following sections (and only these):
1. Completed Work
2. Progress
3. Problems or Blockers
4. Next Week's Plan

Do not add additional sections unless explicitly requested by the user.
```

**Severity**:

- L1 (Low Risk): 🟡 P1
- L2 (Medium Risk): 🟡 P1
- L3 (High Risk): 🔴 P0

#### QD-S-2.4 Broad Capability Verbs

**Defect Description**: Uses broad verbs such as `manage / handle / coordinate / automate / process / address` without explicitly excluding application scenarios via non_goals.

**Defect Example**:

| Dimension | Content |
| --- | --- |
| **Incorrect** | `description: "Assist with employee payroll-related matters."` ("handle" may include modification) |
| **Problem** | The LLM infers that "handling payroll matters" includes modifying payroll |
| **Default Behavior** | The LLM executes overflow operations |

**Remediation Example**:

```markdown
Assist with analyzing employee payroll issues. This Skill is for data query and issue analysis only.
- Allowed: View payroll data, analyze discrepancies, diagnose issues
- Prohibited: Modify payroll data, execute payments, adjust configurations

All recommendations require human confirmation before execution.
```

**Severity**:

- L1 (Low Risk): 🟢 P2
- L2 (Medium Risk): 🟡 P1
- L3 (High Risk): 🔴 P0

<a id="33-qd-s-2-inspection-checklist"></a>
### 3.3 QD-S-2 Inspection Checklist

| ID | Inspection Item | Trigger Keywords | L1 | L2 | L3 | Inspection Method |
| --- | --- | --- | --- | --- | --- | --- |
| **QD-S-2.1** | Unbounded Quantity Declaration | all, every, entire, complete | P1 | P0 | P0 | Automated |
| **QD-S-2.2** | Unterminated Execution | keep trying, until success, ensure | P1 | P0 | P0 | Automated |
| **QD-S-2.3** | Open-Ended Enumeration | etc., and others, such as | P1 | P1 | P0 | Automated |
| **QD-S-2.4** | Broad Capability Verbs | manage, handle, coordinate | P2 | P1 | P0 | Human |

---

## Part 4: QD-S-3 Ambiguity-Induced Inference

<a id="41-classification-positioning"></a>
### 4.1 Classification Positioning

**Risk Principle**: The Skill description contains semantic ambiguity or leaves critical scenarios undefined. When facing uncertainty, the LLM tends toward "reasonable assumptions" rather than stopping to ask, producing behavior that exceeds expectations.

**Typical Harms**: Mis-triggering, auto-completion of missing content, task scope expansion.

<a id="42-inspection-items-in-detail"></a>
### 4.2 Inspection Items in Detail

#### QD-S-3.1 Vague Trigger Conditions

**Defect Description**: Activation conditions are overly broad; multiple unrelated intents can trigger the Skill.

**Defect Example**:

| Dimension | Content |
| --- | --- |
| **Incorrect** | `description: "Use this Skill when the user needs help."` |
| **Problem** | "Needs help" is too broad; almost any request can trigger it |
| **Default Behavior** | The Skill is mis-triggered in inappropriate scenarios |

**Remediation Example**:

```markdown
Use only when the user explicitly requests "compile a weekly report" or "generate a weekly report."
- Trigger condition: The user provides work notes and requests a weekly report
- Do not trigger: The user only asks about the weekly report format, the user is writing a personal journal, the user is discussing work content
```

**Severity**:

- L1 (Low Risk): 🟡 P1
- L2 (Medium Risk): 🟡 P1
- L3 (High Risk): 🔴 P0

#### QD-S-3.2 Missing Deactivation Conditions

**Defect Description**: Does not declare when the Skill should **not** be triggered, causing the LLM to forcibly activate the Skill in edge scenarios.

**Defect Example**:

| Dimension | Content |
| --- | --- |
| **Incorrect** | `description: "Handle user data requests."` (does not state when to refuse) |
| **Problem** | The LLM may forcibly activate for privacy data requests, system data requests, etc. |
| **Default Behavior** | Unauthorized access or privacy leaks |

**Remediation Example**:

```markdown
Handle user data requests.
- Scenarios NOT to handle:
  - Privacy data not explicitly authorized by the user
  - Data involving other users
  - System configuration or backend data
  - Production environment sensitive data
- Such requests should be refused with an explanation of why
```

**Severity**:

- L1 (Low Risk): 🟢 P2
- L2 (Medium Risk): 🟡 P1
- L3 (High Risk): 🔴 P0

#### QD-S-3.3 Missing Ambiguous Input Handling Strategy

**Defect Description**: Does not declare how to handle incomplete or malformed input; the LLM tends to auto-complete or infer.

**Defect Example**:

| Dimension | Content |
| --- | --- |
| **Incorrect** | `description: "Organize work notes."` (does not state how to handle insufficient notes) |
| **Problem** | The LLM may supplement work content the user did not provide in order to complete the weekly report |
| **Default Behavior** | Fabricated content, false data |

**Remediation Example**:

```markdown
Organize work notes and generate a weekly report.
- If notes are insufficient: Stop and inform the user that more information is needed rather than generating false content
- If information for a section is missing: Skip that section and explain why, rather than generating examples
- Prohibited: Fabricating facts, inferring missing content, adding example data
```

**Severity**:

- L1 (Low Risk): 🟡 P1
- L2 (Medium Risk): 🟡 P1
- L3 (High Risk): 🔴 P0

#### QD-S-3.4 Undefined Task Scope

**Defect Description**: Missing non_goals declaration; does not clearly state what the Skill does NOT do, causing the LLM to expand task boundaries on its own.

**Defect Example**:

| Dimension | Content |
| --- | --- |
| **Incorrect** | `description: "Help users improve their weekly reports."` (does not state what it does NOT do) |
| **Problem** | The LLM may interpret this as permission to modify content, add analysis, improve expressions, etc. |
| **Default Behavior** | Task scope exceeds expectations |

**Remediation Example**:

```markdown
Help users improve their weekly reports.
- What it does: Format, polish expression, organize structure
- What it does NOT do:
  - Change facts or data
  - Add content the user did not provide
  - Modify the work content itself
  - Conceal negative information or problems
```

**Severity**:

- L1 (Low Risk): 🔴 P0
- L2 (Medium Risk): 🔴 P0
- L3 (High Risk): 🔴 P0

#### QD-S-3.5 Undeclared Default Behavior

**Defect Description**: Critical branches (empty input, format error, insufficient data, etc.) have no defined handling.

**Defect Example**:

| Dimension | Content |
| --- | --- |
| **Incorrect** | `description: "Generate a weekly report."` (does not state how to handle empty input) |
| **Problem** | When the user provides no work notes, the LLM may generate an example weekly report |
| **Default Behavior** | False data, fabricated content |

**Remediation Example**:

```markdown
Generate a weekly report.
- On empty input: Ask the user rather than generating an example
- On format error: Point out the error and request correction
- On insufficient data: Explain what information is missing and suggest the user supplement it
```

**Severity**:

- L1 (Low Risk): 🟡 P1
- L2 (Medium Risk): 🟡 P1
- L3 (High Risk): 🔴 P0

#### QD-S-3.6 Metadata Expression Defects

**Defect Description**: The `name` or `description` is overly broad, inaccurate, or inconsistent with the body, causing the LLM to misunderstand the Skill's capabilities at the trigger stage.

**Defect Example**:

| Dimension | Content |
| --- | --- |
| **Incorrect** | `name: "database-manager"` `description: "Read-only diagnosis"` |
| **Problem** | name implies database management capability; description says read-only → contradiction |
| **Default Behavior** | The LLM infers capabilities from the name and executes write operations |

**Remediation Example**:

```markdown
name: "readonly-database-diagnostic-reporter"
description: "Use this Skill for read-only database diagnosis"
(Name and description are consistent, avoiding capability inference confusion)
```

**Severity**:

- L1 (Low Risk): 🟡 P1
- L2 (Medium Risk): 🟡 P1
- L3 (High Risk): 🔴 P0

<a id="43-qd-s-3-inspection-checklist"></a>
### 4.3 QD-S-3 Inspection Checklist

| ID | Inspection Item | Trigger Keywords | L1 | L2 | L3 | Inspection Method |
| --- | --- | --- | --- | --- | --- | --- |
| **QD-S-3.1** | Vague Trigger Conditions | when, need, appropriate | P1 | P1 | P0 | Human |
| **QD-S-3.2** | Missing Deactivation Conditions | No "prohibited"/"do not handle" | P2 | P1 | P0 | Human |
| **QD-S-3.3** | Missing Ambiguous Input Handling | incomplete, format error, insufficient | P1 | P1 | P0 | Human |
| **QD-S-3.4** | Undefined Task Scope | No non_goals | P0 | P0 | P0 | Human |
| **QD-S-3.5** | Undeclared Default Behavior | empty, error, exception | P1 | P1 | P0 | Human |
| **QD-S-3.6** | Metadata Expression Defects | contradictory, broad, vague | P1 | P1 | P0 | Human |

---

## Part 5: QD-S-4 Failure Escalation

<a id="51-classification-positioning"></a>
### 5.1 Classification Positioning

**Risk Principle**: The Skill does not define handling strategies for failure or exception scenarios. When encountering failure, the LLM's training objective of "complete the task as best you can" drives it to proactively expand its strategy to "solve the problem," creating even greater risk.

**Typical Harms**: Auto-completing content, lowering standards after failure, infinite rewriting, fabricating data.

<a id="52-inspection-items-in-detail"></a>
### 5.2 Inspection Items in Detail

#### QD-S-4.1 Undefined Failure Behavior

**Defect Description**: Does not declare how to handle execution failure; the LLM may explore alternative paths on its own.

**Defect Example**:

| Dimension | Content |
| --- | --- |
| **Incorrect** | `description: "Query the database."` (does not state how to handle query failure) |
| **Problem** | After query failure, the LLM may attempt other queries, relax filter conditions, etc. |
| **Default Behavior** | Unpredictable behavior; may expand query scope, causing unauthorized access |

**Remediation Example**:

```markdown
Query the database.
- On query failure: Stop immediately; report the error and cause to the user
- Do NOT: Retry with other query conditions, expand search scope, lower standards
```

**Severity**:

- L1 (Low Risk): 🟡 P1
- L2 (Medium Risk): 🔴 P0
- L3 (High Risk): 🔴 P0

#### QD-S-4.2 Undeclared Partial Completion Legitimacy

**Defect Description**: Does not declare whether "partial completion is acceptable"; the LLM may forcibly pursue completeness, entering infinite iterations.

**Defect Example**:

| Dimension | Content |
| --- | --- |
| **Incorrect** | `description: "Generate a complete weekly report."` (does not state what to do when information for a section is insufficient) |
| **Problem** | The LLM may forcibly fill all sections |
| **Default Behavior** | Fabricating content or infinite rewriting until complete |

**Remediation Example**:

```markdown
Generate a weekly report.
- When information for a section is insufficient: Skip that section rather than fabricating content
- Partial completion is allowed: If information is insufficient, output what is available and note the missing parts
```

**Severity**:

- L1 (Low Risk): 🟡 P1
- L2 (Medium Risk): 🟡 P1
- L3 (High Risk): 🔴 P0

#### QD-S-4.3 Missing Post-Failure Prohibited Behaviors

**Defect Description**: Does not explicitly state what behaviors are prohibited after failure; the LLM decides on its own to lower standards or expand scope after failure.

**Defect Example**:

| Dimension | Content |
| --- | --- |
| **Incorrect** | `description: "Fix database issues."` (does not state what can be done after failure) |
| **Problem** | After diagnosis failure, the LLM may expand the operation scope "to solve the problem" |
| **Default Behavior** | Executing overflow operations or generating false data |

**Remediation Example**:

```markdown
Diagnose database issues.
- Prohibited behaviors after diagnosis failure:
  - Expanding search scope is prohibited
  - Generating false data to "cover up" errors is prohibited
  - Lowering diagnostic standards is prohibited
  - Automatically executing remediation operations is prohibited
- After failure: Return the diagnosed content so far; recommend human handling
```

**Severity**:

- L1 (Low Risk): 🟡 P1
- L2 (Medium Risk): 🟡 P1
- L3 (High Risk): 🔴 P0

#### QD-S-4.4 Undefined Error Recovery Path

**Defect Description**: Lacks clear handling directives when encountering exceptions; the LLM decides on its own whether to retry, degrade, or expand.

**Defect Example**:

| Dimension | Content |
| --- | --- |
| **Incorrect** | `description: "Handle exception conditions."` (does not state handling for specific exception types) |
| **Problem** | Different exceptions may be handled by the LLM with different strategies |
| **Default Behavior** | Unpredictable behavior |

**Remediation Example**:

```markdown
Handle exception conditions.
- API timeout: Stop the request; return the partial results obtained so far
- Data format error: Request the user to correct the format
- Insufficient permission: Stop the operation; inform the user that elevated permissions are needed
- Network error: Stop retrying (maximum 2 retries); return the error message
```

**Severity**:

- L1 (Low Risk): 🟡 P1
- L2 (Medium Risk): 🟡 P1
- L3 (High Risk): 🟡 P1

<a id="53-qd-s-4-inspection-checklist"></a>
### 5.3 QD-S-4 Inspection Checklist

| ID | Inspection Item | Trigger Keywords | L1 | L2 | L3 | Inspection Method |
| --- | --- | --- | --- | --- | --- | --- |
| **QD-S-4.1** | Undefined Failure Behavior | failure, error, exception | P1 | P0 | P0 | Human |
| **QD-S-4.2** | Undeclared Partial Completion Legitimacy | complete, all, must | P1 | P1 | P0 | Human |
| **QD-S-4.3** | Missing Post-Failure Prohibited Behaviors | No "prohibited" declaration | P1 | P1 | P0 | Human |
| **QD-S-4.4** | Undefined Error Recovery Path | exception, recovery, degradation | P1 | P1 | P1 | Human |

---

## Part 6: QD-S-5 Permission Overflow

<a id="61-classification-positioning"></a>
### 6.1 Classification Positioning

**Risk Principle**: The Skill does not explicitly declare operational permission boundaries. The LLM interprets broad capability descriptions as implicit authorization, executing high-impact operations beyond what was intended. This category differs from QD-S-1.4 in that: QD-S-1.4 addresses the complete absence of permission boundaries, while QD-S-5 addresses cases where permission declarations exist but are insufficient, or contain loopholes that can be broadly interpreted.

**Typical Harms**: Irreversible operations without confirmation, privilege escalation, data deletion, production environment damage.

<a id="62-inspection-items-in-detail"></a>
### 6.2 Inspection Items in Detail

#### QD-S-5.1 Read/Write/Delete Permissions Not Distinguished

**Defect Description**: The Skill declares it can operate on data, but does not distinguish between read, modify, and delete permission scopes.

**Defect Example**:

| Dimension | Content |
| --- | --- |
| **Incorrect** | `description: "Manage user data."` ("manage" may include read, write, delete) |
| **Problem** | The LLM infers that deletion is also a reasonable way to "manage data" |
| **Default Behavior** | Irreversible operations are executed (as in the Replit database deletion incident) |

**Remediation Example**:

```markdown
Manage user data. This Skill is for data query and reporting only.
- Allowed: View, query, generate reports
- Prohibited: Create, modify, delete, export, migrate

All modification operations MUST be handled by humans through other processes.
```

**Severity**:

- L1 (Low Risk): 🟢 P2
- L2 (Medium Risk): 🟡 P1
- L3 (High Risk): 🔴 P0

#### QD-S-5.2 Missing High-Risk Operation Confirmation Mechanism

**Defect Description**: Irreversible operations such as deletion, overwriting, data exfiltration, or payments do not have a confirmation mechanism.

**Defect Example**:

| Dimension | Content |
| --- | --- |
| **Incorrect** | `description: "Clean up expired data."` (does not state that confirmation is needed before deletion) |
| **Problem** | The LLM may directly execute deletion |
| **Default Behavior** | Data is lost and irrecoverable |

**Remediation Example**:

```markdown
Clean up expired data. This operation is irreversible.
- Before execution: Clearly list the data to be deleted to the user; require secondary confirmation
- Confirmation content: Data quantity, deletion scope, deletion consequences
- Execute deletion only after the user explicitly agrees
- After deletion: Provide an operation log and verification results
```

**Severity**:

- L1 (Low Risk): — (does not involve irreversible operations)
- L2 (Medium Risk): — (does not involve irreversible operations)
- L3 (High Risk): 🔴 P0

#### QD-S-5.3 Undeclared Environment Boundaries

**Defect Description**: Does not declare that operating on production environments is prohibited, or does not explicitly specify the permitted operational environments.

**Defect Example**:

| Dimension | Content |
| --- | --- |
| **Incorrect** | `description: "Diagnose database issues."` (does not state permitted environments) |
| **Problem** | The LLM may treat the production database as a legitimate diagnostic target |
| **Default Behavior** | Diagnostic operations are executed in the production environment, affecting production services |

**Remediation Example**:

```markdown
Diagnose database issues.
- Permitted operational environments: Test/development databases
- Prohibited operational environments: Production databases, backup databases, disaster recovery databases

If the user specifies a production database for diagnosis:
1. Secondary confirmation that it is indeed the production environment
2. Remind of risks and wait for explicit consent
3. Execute only read-only diagnosis; do not execute any modifications
```

**Severity**:

- L1 (Low Risk): 🟢 P2
- L2 (Medium Risk): 🟡 P1
- L3 (High Risk): 🔴 P0

#### QD-S-5.4 Undeclared Chained Invocation Permissions

**Defect Description**: Allows invoking other Skills but does not declare the permitted/prohibited downstream Skill scope.

**Defect Example**:

| Dimension | Content |
| --- | --- |
| **Incorrect** | `description: "Process data. May invoke other Skills."` (does not state which Skills may be invoked) |
| **Problem** | A low-permission Skill may invoke a high-permission Skill, causing privilege escalation |
| **Default Behavior** | Indirect execution of high-permission operations that should not be executed |

**Remediation Example**:

```markdown
Process data. May invoke other Skills.
- Permitted downstream Skills:
  - data-query
  - data-report-generation
- Prohibited downstream Skills:
  - data-delete
  - data-modify
  - user-permission-management

Chained invocation depth must not exceed 1 level.
```

**Severity**:

- L1 (Low Risk): 🟢 P2
- L2 (Medium Risk): 🟡 P1
- L3 (High Risk): 🔴 P0

<a id="63-qd-s-5-inspection-checklist"></a>
### 6.3 QD-S-5 Inspection Checklist

| ID | Inspection Item | Trigger Keywords | L1 | L2 | L3 | Inspection Method |
| --- | --- | --- | --- | --- | --- | --- |
| **QD-S-5.1** | Read/Write/Delete Not Distinguished | manage, handle, operate | P2 | P1 | P0 | Human |
| **QD-S-5.2** | Missing High-Risk Confirmation | delete, overwrite, payment | — | — | P0 | Human |
| **QD-S-5.3** | Undeclared Environment Boundaries | production, test, development | P2 | P1 | P0 | Human |
| **QD-S-5.4** | Undeclared Chained Invocation Permissions | invoke, downstream, chain | P2 | P1 | P0 | Human |

---

## Part 7: Skill Tiered Inspection Mechanism

<a id="71-skill-risk-level-definitions"></a>
### 7.1 Skill Risk Level Definitions

#### 7.1.1 L1 (Low Risk): Text-Processing Only

**Definition**:

- Processes only text/data provided by the user
- No tool invocations; no external system access
- No sensitive data; no irreversible operations
- Execution scope is fully bounded by user input

**Core Risk Characteristics**:

- The LLM's autonomous gap-filling scope is limited (primarily at the text content level)
- Risk primarily comes from output quality issues, not resource runaway or behavioral overflow

**Typical Examples**:

- Weekly report compilation
- Text polishing / translation
- Document summarization
- Format conversion

#### 7.1.2 L2 (Medium Risk): Resource Access

**Definition**:

- Queries external data sources (databases, knowledge bases, APIs)
- May involve sensitive data exposure risk
- No irreversible operations
- Execution scope may be expanded by the LLM

**Core Risk Characteristics**:

- The LLM may fill in query scope and data volume
- Sensitive data exposure risk exists
- Resource usage runaway risk exists

**Typical Examples**:

- Data queries
- Knowledge retrieval
- Email / message reading
- Log analysis

#### 7.1.3 L3 (High Risk): Operation Execution

**Definition**:

- Executes write operations (create, update, delete)
- Invokes external systems to execute functions
- May produce irreversible consequences
- Execution scope may be expanded by the LLM

**Core Risk Characteristics**:

- The LLM may fill in operation scope and execution parameters
- Irreversible consequence risk exists
- Resource usage runaway risk exists
- Behavioral overflow risk exists

**Typical Examples**:

- Database operations (create / update / delete)
- File operations (create / modify / delete)
- Email sending
- API invocations
- Permission operations

<a id="72-tiered-inspection-checklist"></a>
### 7.2 Tiered Inspection Checklist

#### 7.2.1 L1 (Low Risk) Inspection Checklist

**Mandatory Inspection Items** (7 items):

| ID | Inspection Item | Level | Inspection Method |
| --- | --- | --- | --- |
| QD-S-0 | Baseline Compliance | MUST pass | Automated |
| QD-S-1.1 | Input Boundary Missing | P1 | Automated |
| QD-S-1.2 | Output Size Missing | P1 | Automated |
| QD-S-2.1 | Unbounded Quantity Declaration | P1 | Automated |
| QD-S-3.4 | Undefined Task Scope | P0 | Human |
| QD-S-4.1 | Undefined Failure Behavior | P1 | Human |
| QD-S-3.6 | Metadata Expression Defects | P1 | Human |

**Optional Inspection Items** (recommended but not required):

- QD-S-3.1, QD-S-3.2, QD-S-3.3

#### 7.2.2 L2 (Medium Risk) Inspection Checklist

**Must-Pass Items** (P0 defects):

| ID | Defect Item | Inspection Method |
| --- | --- | --- |
| QD-S-0 | Baseline Compliance | Automated |
| QD-S-1.1 | Input Boundary Missing | Automated |
| QD-S-1.3 | Execution Resource Boundary Missing | Automated |
| QD-S-2.1 | Unbounded Quantity Declaration | Automated |
| QD-S-2.2 | Unterminated Execution | Automated |
| QD-S-3.4 | Undefined Task Scope | Human |
| QD-S-4.1 | Undefined Failure Behavior | Human |

**Recommended Inspection Items** (P1 defects):

- QD-S-1.2, QD-S-1.4, QD-S-1.5, QD-S-2.3, QD-S-2.4
- QD-S-3.1, QD-S-3.2, QD-S-3.3, QD-S-3.6
- QD-S-4.2, QD-S-4.3, QD-S-5.1, QD-S-5.3, QD-S-5.4

#### 7.2.3 L3 (High Risk) Inspection Checklist

**Full Inspection** (all QD-S-1 through QD-S-5):

| Category | P0 Defects | Inspection Intensity |
| --- | --- | --- |
| **QD-S-1** | All mandatory | MUST pass |
| **QD-S-2** | QD-S-2.1/2.2/2.3/2.4 | MUST pass |
| **QD-S-3** | QD-S-3.1/3.2/3.4/3.5/3.6 | MUST pass |
| **QD-S-4** | QD-S-4.1/4.2/4.3 | MUST pass |
| **QD-S-5** | QD-S-5.1/5.2/5.3/5.4 | MUST pass |

**Inspection Methods**:

- Automated: QD-S-1.x, QD-S-2.1–2.3
- Semi-automated: QD-S-2.4, QD-S-3.3
- Human: All other items

<a id="73-standard-inspection-process-6-steps"></a>
### 7.3 Standard Inspection Process (6 Steps)

```
┌──────────────────────────────────────────────────┐
│     Skill Quality Defect Inspection Process       │
│              (Inspect Skill)                      │
└──────────────────────────────────────────────────┘
                              │
                              ▼
                 ┌───────────────────────┐
                 │  Step 1: Baseline     │
                 │  Compliance Check     │
                 │  Execute QD-S-0       │
                 └───────────────────────┘
                              │
                    ┌─────────┴─────────┐
                    ▼                   ▼
            ┌─────────────┐      ┌──────────────┐
            │ PASS ✓       │      │ FAIL ✗        │
            └─────────────┘      └──────────────┘
                    │                    │
                    ▼                    ▼
         ┌─────────────────┐   ┌──────────────────┐
         │ Step 2: Skill   │   │ Output remediation│
         │ Risk Level      │   │ guidance; stop    │
         │ Determination   │   │ inspection        │
         │ Determine L1/L2/│   └──────────────────┘
         │ L3              │
         └─────────────────┘
                    │
                    ▼
         ┌─────────────────────┐
         │ Step 3: Select      │
         │ Inspection Checklist│
         │ Based on risk level │
         └─────────────────────┘
                    │
                    ▼
         ┌─────────────────────┐
         │ Step 4: Automated   │
         │ Inspection          │
         │ Execute automated   │
         │ inspection items    │
         └─────────────────────┘
                    │
                    ▼
         ┌─────────────────────┐
         │ Step 5: Semi-Auto   │
         │ and Human Inspection│
         │ Execute complex     │
         │ inspection items    │
         └─────────────────────┘
                    │
                    ▼
         ┌─────────────────────┐
         │ Step 6: Output      │
         │ Inspection Report   │
         │ Generate optimized  │
         │ version             │
         └─────────────────────┘
```

#### 7.3.1 Step 1: Baseline Compliance Check

**Execution Content**: QD-S-0 inspection (automated)

**Determination Criteria**:

- ✅ PASS: All QD-S-0.1 through 0.6 inspection items pass
- ❌ FAIL: Any item fails

**Failure Handling**:

```
Output: QD-S-0 inspection failed

Failed items:
  - QD-S-0.1: name field missing
  - QD-S-0.3: Missing quotes on YAML line 7

Handling recommendation:
  Please first address the above basic structural issues so the Skill meets
  the platform's minimum specification.
  The current Skill will not proceed to QD-S-1 through QD-S-5 inspection.
```

#### 7.3.2 Step 2: Skill Risk Level Determination

**Determination Basis**:

| Determination Question | Determination Logic |
| --- | --- |
| **Involves write operations?** | Yes → at least L2 |
| **Involves delete or irreversible operations?** | Yes → L3 |
| **Involves external system access?** | Yes → at least L2 |
| **Involves sensitive data?** | Yes → at least L2 |
| **Involves permission changes?** | Yes → L3 |

**Example Determinations**:

- "Compile weekly report" → L1 (text-processing only)
- "Query database" → L2 (resource access, sensitive data)
- "Delete user records" → L3 (irreversible operation)

#### 7.3.3 Step 3: Select Inspection Checklist

Based on the determined risk level, select the corresponding inspection checklist:

**L1 Inspection Checklist** (7 mandatory items):

| ID | Inspection Item | Method |
| --- | --- | --- |
| QD-S-0 | Baseline Compliance | Automated |
| QD-S-1.1 | Input Boundary Missing | Automated |
| QD-S-1.2 | Output Size Missing | Automated |
| QD-S-2.1 | Unbounded Quantity Declaration | Automated |
| QD-S-3.4 | Undefined Task Scope | Human |
| QD-S-4.1 | Undefined Failure Behavior | Human |
| QD-S-3.6 | Metadata Expression Defects | Human |

**L2 Inspection Checklist** (all QD-S-1/2/3/4/5 inspection items)

**L3 Inspection Checklist** (full inspection; all items)

#### 7.3.4 Step 4: Automated Inspection

**Execution Content** (tool-automated):

- QD-S-0.1 through 0.6: Structural inspection
- QD-S-1.1 through 1.3: Quantity boundary keyword scanning
- QD-S-2.1 through 2.3: Unbounded language detection (all/every/until success, etc.)
- QD-S-3.6: name/description consistency check

**Output**:

```
Automated inspection complete

Detected automated inspection items:
  ✓ QD-S-0.1 name field present
  ✓ QD-S-1.1 Input items detected; no upper limit declaration → requires human verification
  ✗ QD-S-2.1 Keyword "all" detected without corresponding constraint → P1 defect

Proceeding to Step 5: Semi-automated and human inspection
```

#### 7.3.5 Step 5: Semi-Automated and Human Inspection

**Execution Content**:

- QD-S-3.x: Trigger conditions, deactivation conditions, ambiguity handling (requires human judgment)
- QD-S-4.x: Failure behavior, partial completion strategy (requires human judgment)
- QD-S-5.x: Permission boundaries, environment declarations, chained invocation (requires human judgment)

**Inspection Method**:

- Human review of the Skill description and related fields
- Inspect for semantic gaps from the six Review Schema dimensions
- Perform Inferential Verification

**Output**:

```
Human inspection results

Detected human review items:
  ⚠️  QD-S-3.4 Missing non_goals declaration → P0 defect
  ⚠️  QD-S-5.1 Broad capability description; read/write/delete not distinguished → P0 defect
  ✓ QD-S-4.1 Failure handling declaration present → PASS

Proceeding to Step 6: Generate inspection report
```

#### 7.3.6 Step 6: Output Inspection Report

**Three Output Documents**:

**Document 1: Defect List (by priority)**

| ID | Defect Item | Level | Location | Risk Description |
| --- | --- | --- | --- | --- |
| QD-S-3.4 | Undefined Task Scope | P0 | description | Missing non_goals; task boundaries can be expanded |
| QD-S-5.1 | Read/Write/Delete Not Distinguished | P0 | description | Broad capability verbs; write permission can be inferred |
| QD-S-2.1 | Unbounded Quantity Declaration | P1 | input section | Uses "all" without corresponding constraint |

**Document 2: Optimized Skill** (retaining original platform format)

(See Usage Examples chapter for details)

**Document 3: Comparison Table (Original vs. Optimized vs. Inferential Verification)**

| Original | Optimization Suggestion | Defect ID | Inferential Verification |
| --- | --- | --- | --- |
| "Process all work notes" | "Process up to 50 work notes; truncate and notify user when exceeded" | QD-S-1.1 | LLM processes all without constraint; clear stop condition after remediation |

---

<a id="part-8-review-schema--detailed-review-dimensions"></a>
## Part 8: Review Schema — Detailed Review Dimensions

<a id="81-six-dimension-overview-and-positioning"></a>
### 8.1 Six-Dimension Overview and Positioning

The Inspect Skill Review Schema is the inspection Agent's **intermediate review framework** for systematically decomposing and analyzing Skill definitions. It is not a production format — it is a working view.

**Six Dimensions and Corresponding Risks**:

| Dimension | Review Question | Associated Defect Types | Primary Risk |
| --- | --- | --- | --- |
| **IDENTITY** | What does this Skill do, not do, and what can it access? | QD-S-3.4, QD-S-5.1 | Task scope expansion, resource overflow |
| **TRIGGER** | When should it trigger, and when should it not? | QD-S-3.1, QD-S-3.2 | Mis-triggering, excessive invocation |
| **INPUT** | Are input size, format, and overflow behavior clearly defined? | QD-S-1.1, QD-S-3.3 | Token runaway, input ambiguity |
| **EXECUTION** | Are execution boundaries, retries, tool invocations, and chained calls controlled? | QD-S-1.3, QD-S-5.4 | Infinite loops, tool abuse, permission diffusion |
| **OUTPUT** | Are output size, structure, and partial completion strategy clearly defined? | QD-S-1.2, QD-S-2.3 | Output bloat, content fabrication |
| **FAILURE** | How are failures, empty input, insufficient input, and user dissatisfaction handled? | QD-S-4.x | Auto-completion, post-failure expansion |

<a id="82-identity-dimension-in-detail"></a>
### 8.2 IDENTITY Dimension in Detail

**Review Question**: What does this Skill do, not do, and what can it access?

**Inspection Checklist**:

| Review Item | Level | Description | LLM Default Behavior When Missing |
| --- | --- | --- | --- |
| **purpose** | MUST | Precise objective description of the Skill; should constrain rather than expand capability boundaries | LLM interprets Skill scope on its own, typically broader than intended |
| **non_goals** | MUST | Explicitly declare what the Skill does NOT do | LLM expands task boundaries to "reasonably related" matters |
| **allowed_resources** | MUST | Permitted data sources (user-provided, knowledge base, external API, etc.) | LLM uses all available context, including conversation history |
| **forbidden_resources** | MUST | Prohibited data sources (production databases, backups, other users' data, etc.) | No prohibition declaration equals no access restriction |
| **allowed_operations** | SHOULD | Permitted operation types (query, aggregate, render, etc.) | LLM interprets all verbs in the capability description as authorization |
| **forbidden_operations** | MUST | Explicitly prohibited operation types (delete, modify, export, etc.) | Broad capability declarations are treated as implicit authorization for all related operations |

**Inspection Example**:

| Skill Description | IDENTITY Dimension Check | Defect Determination |
| --- | --- | --- |
| "Query user data" | purpose: query ✓ / non_goals: ❌ missing / allowed_resources: user-provided only ✓ / forbidden: ❌ others' data not prohibited | QD-S-3.4 P0 + QD-S-1.5 P1 |
| "Manage database issues" | purpose: vague / non_goals: ❌ missing / allowed_operations: ❌ read/write/delete not distinguished / forbidden_operations: ❌ missing | QD-S-5.1 P0 + QD-S-3.6 P1 |

<a id="83-trigger-dimension-in-detail"></a>
### 8.3 TRIGGER Dimension in Detail

**Review Question**: When should it trigger, and when should it not?

**Inspection Checklist**:

| Review Item | Level | Description | LLM Default Behavior When Missing |
| --- | --- | --- | --- |
| **allowed_when** | MUST | Explicit conditions under which the Skill should be activated | LLM judges whether to trigger based on vague relevance |
| **forbidden_when** | MUST | Scenarios in which the Skill should NOT be activated | LLM forcibly activates in edge scenarios |
| **ambiguity_policy** | MUST | Handling strategy when content is missing (ask_user / stop / infer) | LLM infers or completes missing content |
| **may_expand_scope** | MUST | Whether the LLM is permitted to expand the task scope | Expansion is permitted by default |

**Inspection Example**:

| Skill | TRIGGER Dimension Check | Defect Determination |
| --- | --- | --- |
| "When the user needs help" | allowed_when: vague / forbidden_when: ❌ missing | QD-S-3.1 P1 + QD-S-3.2 P1 |
| "User provides work notes and requests weekly report" | allowed_when: explicit ✓ / forbidden_when: ✓ "user has not provided notes" | PASS |

<a id="84-input-dimension-in-detail"></a>
### 8.4 INPUT Dimension in Detail

**Review Question**: Are input size, format, and overflow behavior clearly defined?

**Inspection Checklist**:

| Review Item | Level | Description | LLM Default Behavior When Missing |
| --- | --- | --- | --- |
| **max_items** | MUST | Upper limit on the number of list-type input items | Processes all submitted content without truncation |
| **max_chars** | SHOULD | Character limit for a single input item | Accepts input of arbitrary length |
| **format** | SHOULD | Input format requirements (JSON, CSV, free text, etc.) | LLM accepts any format |
| **if_exceeds** | MUST | Handling strategy when limits are exceeded (process_first_n / reject / ask) | LLM decides on its own how to handle excess input |
| **safe_defaults** | SHOULD | Default values for optional fields | LLM assumes values for missing fields |

**Inspection Example**:

| Skill Input | INPUT Dimension Check | Defect Determination |
| --- | --- | --- |
| "Accept a list of work notes" | max_items: ❌ missing / if_exceeds: ❌ missing | QD-S-1.1 P0 |
| "Process up to 50 items; truncate and notify when exceeded" | max_items: 50 ✓ / if_exceeds: explicit ✓ | PASS |

<a id="85-execution-dimension-in-detail"></a>
### 8.5 EXECUTION Dimension in Detail

**Review Question**: Are execution boundaries, retries, tool invocations, and chained calls controlled?

**Inspection Checklist**:

| Review Item | Level | Description | LLM Default Behavior When Missing |
| --- | --- | --- | --- |
| **max_tool_calls** | MUST | Maximum tool invocation count per execution | Invokes tools without limit until the task is complete |
| **max_retries** | MUST | Maximum retry count | Retries without limit |
| **timeout_seconds** | MUST | Execution timeout duration | Long-running tasks are not terminated |
| **allow_task_expansion** | MUST | Whether expansion of the original task scope is permitted | Expansion is permitted by default |
| **allow_skill_chaining** | SHOULD | Whether invoking other Skills is permitted | Chained invocation is permitted by default |
| **allowed_downstream_skills** | MUST (when chaining=true) | Whitelist of permitted downstream Skills | Any Skill, including high-permission ones, can be triggered |
| **require_user_confirmation_for** | MUST (when involving irreversible operations) | Operation types requiring user confirmation | Irreversible operations are executed without confirmation |
| **if_budget_exceeded** | MUST | Handling when resource budget is exceeded | Execution continues after resource exhaustion |

**Inspection Example**:

| Skill | EXECUTION Dimension Check | Defect Determination |
| --- | --- | --- |
| "Keep trying until success" | max_retries: ❌ missing / timeout: ❌ missing | QD-S-1.3 P0 + QD-S-2.2 P0 |
| "Maximum 3 retries, 60-second timeout" | max_retries: 3 ✓ / timeout_seconds: 60 ✓ | PASS |

<a id="86-output-dimension-in-detail"></a>
### 8.6 OUTPUT Dimension in Detail

**Review Question**: Are output size, structure, and partial completion strategy clearly defined?

**Inspection Checklist**:

| Review Item | Level | Description | LLM Default Behavior When Missing |
| --- | --- | --- | --- |
| **format** | SHOULD | Output format declaration (Markdown, JSON, structured text, etc.) | LLM selects format on its own |
| **max_total_chars** | MUST | Total output character limit | Output volume is unbounded |
| **max_items_per_section** | SHOULD | Item limit per output section | Single-section items are unbounded |
| **allow_additional_sections** | MUST | Whether the LLM is permitted to add output sections on its own | Addition is permitted by default |
| **partial_result_allowed** | MUST | Whether partial completion is permitted | LLM forcibly pursues completeness; enters infinite iterations |
| **if_input_insufficient_for_section** | MUST | Handling when input is insufficient to populate a section | LLM auto-completes or fabricates content |

**Inspection Example**:

| Skill Output | OUTPUT Dimension Check | Defect Determination |
| --- | --- | --- |
| "Generate a complete weekly report with all sections" | max_total_chars: ❌ missing / partial_result_allowed: ❌ missing | QD-S-1.2 P1 + QD-S-4.2 P1 |
| "Output not exceeding 1,500 words; skip sections with insufficient information" | max_total_chars: 1500 ✓ / partial_result_allowed: true ✓ | PASS |

<a id="87-failure-dimension-in-detail"></a>
### 8.7 FAILURE Dimension in Detail

**Review Question**: How are failures, empty input, insufficient input, and user dissatisfaction handled?

**Inspection Checklist**:

| Review Item | Level | Description | LLM Default Behavior When Missing |
| --- | --- | --- | --- |
| **on_empty_input** | MUST | Handling when input is empty (ask_user / stop / generate_template) | LLM generates example content or template fill |
| **on_insufficient_input** | MUST | Handling when input is insufficient (generate_partial / ask_user / stop) | LLM auto-completes |
| **on_user_dissatisfied** | SHOULD | Handling strategy for user dissatisfaction (max rewrite count, escalation confirmation, etc.) | Unlimited rewrites |
| **forbidden_behaviors** | MUST | Explicitly prohibited post-failure behaviors (no auto-completion, no inference, no scope expansion) | LLM selects expansion strategy on its own after failure |

**Inspection Example**:

| Skill | FAILURE Dimension Check | Defect Determination |
| --- | --- | --- |
| "No failure handling defined" | on_empty_input: ❌ missing / forbidden_behaviors: ❌ missing | QD-S-4.1 P0 |
| "On empty input: ask user; generating examples is prohibited; inferring missing content is prohibited" | on_empty_input: ask_user ✓ / forbidden_behaviors: ✓ explicit | PASS |

---

## Part 9: Usage Examples

<a id="91-l1-example-weeklyreportwriter-personal-productivity-scenario"></a>
### 9.1 L1 Example: WeeklyReportWriter (Personal Productivity Scenario)

#### 9.1.1 Original Skill

```markdown
---
name: weekly-report-writer
description: Help users turn work notes into a weekly report.
---

Use this skill when the user wants to write or polish a weekly report.

The skill should organize the user's work notes into a clear weekly report. 
It can include sections such as completed work, progress, problems, and next week's plan.

Make the report professional, concise, and suitable for workplace communication. 
Do not make negative comments about colleagues or managers. 
Do not fabricate facts.
```

#### 9.1.2 Inspection Process

**Step 1: QD-S-0 Baseline Compliance** → ✅ PASS

**Step 2: Risk Level Determination** → L1 (text-processing only; no tool invocations; no external system access)

**Step 3: Select Inspection Checklist** → L1 checklist (7 items)

**Steps 4–5: Inspection Execution**

| Inspection Item | Result | Level | Description |
| --- | --- | --- | --- |
| QD-S-1.1 Input Boundary Missing | ❌ FAIL | P0 | No upper limit declared for work note count |
| QD-S-1.2 Output Size Missing | ❌ FAIL | P1 | No total length limit declared for the weekly report |
| QD-S-2.1 Unbounded Quantity Declaration | ✓ PASS | — | No relevant unbounded language |
| QD-S-3.4 Undefined Task Scope | ❌ FAIL | P0 | Missing non_goals; "such as" implies open-ended enumeration |
| QD-S-4.1 Undefined Failure Behavior | ❌ FAIL | P0 | No handling strategy for empty input |
| QD-S-3.6 Metadata Expression Defects | ✓ PASS | — | name/description are substantially consistent |

#### 9.1.3 Inferential Verification

**Defect QD-S-1.1: Input Boundary Missing**

```
[Defect]QD-S-1.1 Input Boundary Missing

[LLM Default Behavior Inference]
  If the Skill does not declare an upper limit on the number of input work notes,
  the LLM, driven by its "complete the task as best you can" tendency,
  will attempt to process all records provided by the user. When the user pastes
  a large number of records (e.g., 500+), the LLM will expand and analyze each one,
  causing Token Consumption to far exceed expectations, resulting in cost overruns
  or response timeouts.

[Remediation Declaration]
  Process up to 50 work notes.
  When exceeding 50: Process the first 50 and notify the user:
  "Work notes exceed the 50-item limit. The first 50 have been processed.
   Please submit the remaining items separately."

[Remediation Effectiveness Demonstration]
  The upper limit (50 items) and overflow behavior (truncate and notify) are both
  explicitly defined. The LLM has a clear stop condition during execution and does
  not need to determine boundaries on its own. This remediation effectively
  eliminates the Token runaway risk.

[Verification Conclusion]Remediation is effective; risk eliminated. (Static Pass)
```

#### 9.1.4 Optimized Skill

```markdown
---
name: weekly-report-writer
description: Turn user-provided work notes into a concise, professional weekly report. Only summarizes provided content; does not infer or fabricate work details.
---

## Purpose
Help users organize their work notes into a clear weekly report for workplace communication.

## When to use
Use this skill only when the user explicitly provides work notes or bullet points and asks for a weekly report.

## Input constraints
- Process up to 50 work notes
- If more than 50 notes are provided, process the first 50 and notify: "Work notes exceed the 50-item limit. I've processed the first 50. Please submit the remaining items separately."
- Each note should be under 200 characters
- Total input should not exceed 10,000 characters

## Output format
Organize into these sections (and only these unless explicitly requested):
- Completed work
- Progress
- Problems or blockers  
- Next week's plan

Output limits:
- Total report: not exceed 1,500 Chinese characters or 1,000 English words
- Rewrite maximum once (unless user provides new specific requirements)

## Do not
- Invent facts, numbers, people, projects, dates, or outcomes
- Infer work content from chat history or context outside the current request
- Add report sections beyond those listed above
- Make negative comments about colleagues, managers, or teams

## Failure handling
- If user provides no work notes: Ask them to provide notes instead of generating a sample report
- If some sections lack information: Skip those sections and explain which information was missing
- If output is incomplete due to input limits: Return the partial report and note what was not included
```

#### 9.1.5 Governance Effect

| Dimension | Before Governance | After Governance |
| --- | --- | --- |
| **Input limit** | Undeclared | Up to 50 items; truncate and notify when exceeded |
| **Output limit** | Undeclared | Not exceeding 1,500 words; rewrite at most once |
| **Task boundary** | Vague ("such as" open enumeration) | Explicit (four sections only) |
| **Missing content handling** | Undeclared | Skip missing sections and explain why |
| **Failure handling** | Undeclared | Empty input → ask user; generating examples is prohibited |

<a id="92-l3-example-databasediagnosticreporter-enterprise-operations-scenario"></a>
### 9.2 L3 Example: DatabaseDiagnosticReporter (Enterprise Operations Scenario)

#### 9.2.1 Original Skill

```markdown
---
name: database-maintenance-assistant
description: Helps users diagnose database issues and suggest fixes.
---

Use this skill when the user needs help with database problems.

The skill can review database error messages, table information, query results, 
or user descriptions of database issues.

It should explain what may be wrong and suggest practical ways to fix the problem.

Before taking any action, explain the plan.
Do not access unrelated systems.
Be careful with sensitive data.
```

#### 9.2.2 Inspection Process

**Step 1: QD-S-0 Baseline Compliance** → ✅ PASS

**Step 2: Risk Level Determination** → L3 (involves database operations; may involve sensitive data; permission overflow risk exists)

**Step 3: Select Inspection Checklist** → L3 full inspection checklist

**Steps 4–5: Inspection Execution**

| Inspection Item | Result | Level | Description |
| --- | --- | --- | --- |
| QD-S-5.1 Read/Write/Delete Not Distinguished | ❌ FAIL | P0 | "maintenance" and "fixes" imply data modification capability |
| QD-S-5.2 Missing High-Risk Confirmation | ❌ FAIL | P0 | Involves deletion but no secondary confirmation |
| QD-S-5.3 Undeclared Environment Boundaries | ❌ FAIL | P0 | Operating on production environments is not prohibited |
| QD-S-3.6 Metadata Expression Defects | ❌ FAIL | P1 | "maintenance" in name contradicts "diagnosis" in description |
| QD-S-1.4 Permission Boundary Missing | ❌ FAIL | P0 | "Before taking any action" implies actions can be taken, but without limits |
| QD-S-4.1 Undefined Failure Behavior | ❌ FAIL | P0 | No handling strategy when diagnosis fails |

#### 9.2.3 Inferential Verification

**Defect QD-S-5.1: Read/Write/Delete Permissions Not Distinguished**

```
[Defect]QD-S-5.1 Read/Write/Delete Permissions Not Distinguished

[LLM Default Behavior Inference]
  The Skill's name contains "maintenance" and its description contains "fixes."
  In a database context, both words typically imply maintenance and repair
  capabilities, which may include data modification. When the Skill does not
  explicitly say "deletion and modification are prohibited," the LLM may
  understand these operations as permitted.

  If a user says "the data in this table is wrong," the LLM may infer that
  "needs fixing" is equivalent to "needs deletion or cleanup." This is precisely
  one of the root causes of the Replit incident: ambiguous permission boundaries
  are functionally equivalent to implicit authorization.

[Remediation Declaration]
  Rename the Skill to `readonly-database-diagnostic-reporter`
  Explicitly declare: This Skill is for read-only diagnosis only.
  The following operations are prohibited:
  - UPDATE / DELETE / INSERT / DROP / TRUNCATE / ALTER
  - Data migration, data cleanup, data backup
  - Any operation that modifies database structure or data

  All remediation recommendations are labeled as "Suggestions for human review"
  and are not directly executed.

[Remediation Effectiveness Demonstration]
  Through the explicit name and prohibition list, the LLM no longer has room
  for ambiguous inference. The permission boundary has moved from "ambiguous"
  to "absolutely clear," completely eliminating the permission overflow risk.

[Verification Conclusion]Remediation is effective; risk eliminated. (Static Pass)
```

#### 9.2.4 Optimized Skill

```markdown
---
name: readonly-database-diagnostic-reporter
description: Use this skill only for read-only database diagnosis and analysis. It analyzes user-provided database information and does NOT modify, delete, migrate, backup, or repair data.
---

## Purpose
Provide read-only diagnosis and recommendations for database issues. 
Analyze error messages, schemas, and symptoms provided by users.
Does NOT execute any modifications, deletions, repairs, or migrations.

## When to use
Use this skill ONLY when the user asks for:
- Read-only diagnosis of a database issue
- Explanation of error messages
- Analysis of table schemas or query performance
- Safe diagnostic steps the user can take

## When NOT to use
Do NOT use this skill when the user asks for:
- Database modifications (UPDATE, INSERT, DELETE, ALTER, DROP, etc.)
- Data cleanup or deletion
- Database migration or backup
- Automated repairs or fixes
- Access to production databases

## Input constraints
- Accept only read-only information provided by the user in the current request
- Do not access database directly
- Do not infer database names, credentials, or environments
- Process maximum 2,000 words of diagnostic information

## Allowed operations
- Analyze error messages
- Explain schema relationships
- Diagnose query performance issues
- Suggest safe read-only SQL examples
- Recommend diagnostic steps for the user to verify

## Prohibited operations
- UPDATE, DELETE, INSERT, DROP, TRUNCATE, ALTER
- Data repair, cleanup, migration, or generation
- Accessing production databases or external systems
- Inferring missing database credentials or configurations
- Turning suggestions into automated actions

## Output format
Clearly label all output as "ANALYSIS AND SUGGESTIONS FOR HUMAN REVIEW"
Include:
- Root cause analysis
- Safe read-only SQL examples (if helpful)
- Recommended diagnostic steps (for user to execute)
- Risks and precautions (before any human action)

Output limits:
- Maximum 2,000 words
- Do not execute any suggested actions

## Failure handling
- If production database involved: Provide read-only analysis only, recommend human review
- If environment unclear: Ask user to clarify, do not assume
- If request involves modifications: Stop and explain that this skill is read-only only
- If diagnostic fails: Return partial analysis and recommend engaging database administrator
```

#### 9.2.5 Governance Effect

| Dimension | Before Governance | After Governance |
| --- | --- | --- |
| **Permission declaration** | Vague ("maintenance", "fixes") | Explicit (readonly; explicit prohibition list) |
| **Name** | database-maintenance-assistant | readonly-database-diagnostic-reporter |
| **Capability boundary** | "explain and suggest fixes" → may infer execution authority | "read-only diagnosis" → absolutely clear |
| **Production environment** | Undeclared | Explicitly read-only analysis only; human review required |
| **Failure handling** | Undeclared | Explicit handling strategies for each failure type |
| **Suggestion execution** | "Before taking action" → implies executability | "Suggestions for human review" → explicitly not auto-executed |

---

## Part 10: Relationship to Other Sub-Specifications

<a id="101-placeholder-note"></a>
### 10.1 Placeholder Note

This chapter's full coordination relationships with Inspect Prompt and Inspect Tool require dedicated discussion, covering:

- Integration of Inspect Skill / Inspect Prompt / Inspect Tool inspection processes
- Cross-sub-specification defect propagation and linked remediation
- Collaborative workflows in actual Agent applications
- Priority management (when different sub-specifications give contradictory recommendations)

**Tentative: The content of this section is a key expansion area for future versions and will be supplemented after sufficient discussion.**

---

## Part 11: Quantitative Scoring Mechanism

<a id="111-scoring-principles"></a>
### 11.1 Scoring Principles

| Principle | Description |
| --- | --- |
| **Total score of 100** | Deduction-based: baseline score (100) − defect deductions |
| **Weight ratio** | P0 : P1 : P2 = 5 : 3 : 1 |
| **Level differentiation** | Different Skill Levels have different inspection item counts; per-item weight adjusts automatically |
| **Mathematical self-consistency** | After all defect deductions, minimum score ≥ 0; maximum score = 100 |
| **Simple rule** | For the same inspection item number, the weight is deducted only once regardless of how many defect instances are found |
| **Gate condition** | Any P0 defect → evaluation FAIL (score is still output) |

<a id="112-calculation-steps"></a>
### 11.2 Calculation Steps

**Step 1: Determine Skill Level** — Determine L1/L2/L3 according to Part 7

**Step 2: Calculate Total Weight** — Total Weight = P0 inspection item count × 5 + P1 inspection item count × 3 + P2 inspection item count × 1

**Step 3: Calculate Base Score** — Base Score = 100 / Total Weight

**Step 4: Determine Per-Defect Deduction Values**

- P0 defect deduction = Base Score × 5
- P1 defect deduction = Base Score × 3
- P2 defect deduction = Base Score × 1

**Step 5: Calculate Total Deduction** — Total Deduction = Σ(deduction for each failed inspection item number, using the highest severity level)

Note: The same inspection item is deducted only once, regardless of how many defect instances are found.

**Step 6: Calculate Actual Score** — Actual Score = max(100 − Total Deduction, 0)

**Step 7: Gate Determination**

```
if any P0 defect exists:
    evaluation result = FAIL
    output score (for analysis)
else:
    evaluation result = PASS
```

<a id="113-inspection-item-distribution-table"></a>
### 11.3 Inspection Item Distribution Table

#### L1 (Low Risk) Inspection Item Distribution

| Level | Total Items | P0 Count | P1 Count | P2 Count | Total Weight | Base Score |
| --- | --- | --- | --- | --- | --- | --- |
| **L1** | 7 | 1 | 5 | 1 | 21 | 4.76 |

**L1 Inspection Item List**:

- QD-S-0 (MUST pass)
- QD-S-1.1 (P1), QD-S-1.2 (P1)
- QD-S-2.1 (P1)
- QD-S-3.4 (P0), QD-S-3.6 (P1)
- QD-S-4.1 (P1)

#### L2 (Medium Risk) Inspection Item Distribution

| Level | Total Items | P0 Count | P1 Count | P2 Count | Total Weight | Base Score |
| --- | --- | --- | --- | --- | --- | --- |
| **L2** | 15 | 7 | 8 | 0 | 59 | 1.69 |

**L2 Inspection Item List**:

- QD-S-0 (MUST pass)
- **P0 items**: QD-S-1.1, QD-S-1.3, QD-S-2.1, QD-S-2.2, QD-S-3.4, QD-S-4.1
- **P1 items**: QD-S-1.2, QD-S-1.4, QD-S-1.5, QD-S-2.3, QD-S-2.4, QD-S-3.1, QD-S-3.2, QD-S-3.3, QD-S-3.6, QD-S-4.2, QD-S-4.3, QD-S-5.1, QD-S-5.3, QD-S-5.4 (15 items total)

#### L3 (High Risk) Inspection Item Distribution

| Level | Total Items | P0 Count | P1 Count | P2 Count | Total Weight | Base Score |
| --- | --- | --- | --- | --- | --- | --- |
| **L3** | 30 | 18 | 10 | 2 | 122 | 0.82 |

**L3 Inspection Item List**: All QD-S-0 through QD-S-5 inspection items

<a id="114-defect-deduction-value-table"></a>
### 11.4 Defect Deduction Value Table

#### L1 Defect Deduction Values

| Defect Level | Deduction Calculation | Deduction Value |
| --- | --- | --- |
| **P0** | 4.76 × 5 | 23.80 |
| **P1** | 4.76 × 3 | 14.29 |
| **P2** | 4.76 × 1 | 4.76 |

#### L2 Defect Deduction Values

| Defect Level | Deduction Calculation | Deduction Value |
| --- | --- | --- |
| **P0** | 1.69 × 5 | 8.47 |
| **P1** | 1.69 × 3 | 5.08 |
| **P2** | 1.69 × 1 | 1.69 |

#### L3 Defect Deduction Values

| Defect Level | Deduction Calculation | Deduction Value |
| --- | --- | --- |
| **P0** | 0.82 × 5 | 4.10 |
| **P1** | 0.82 × 3 | 2.46 |
| **P2** | 0.82 × 1 | 0.82 |

<a id="115-scoring-examples"></a>
### 11.5 Scoring Examples

#### Example 1: L1 Skill, 3 Defects Found

**Skill**: WeeklyReportWriter  
**Level**: L1  
**Inspection Checklist**: 7 items (QD-S-0, QD-S-1.1, QD-S-1.2, QD-S-2.1, QD-S-3.4, QD-S-3.6, QD-S-4.1)

**Inspection Results**:

- QD-S-1.1 (P1): 1 defect found ✗
- QD-S-3.4 (P0): 1 defect found ✗
- QD-S-4.1 (P0): 1 defect found ✗

**Deduction Calculation**:

```
Total Weight = 1×5 + 5×3 + 1×1 = 21
Base Score = 100 / 21 = 4.76

Defect Deductions:
- QD-S-1.1 (P1): 4.76 × 3 = 14.29
- QD-S-3.4 (P0): 4.76 × 5 = 23.80
- QD-S-4.1 (P0): 4.76 × 5 = 23.80

Total Deduction = 14.29 + 23.80 + 23.80 = 61.89
Score = 100 − 61.89 = 38.11
Gate = FAIL (2 P0 defects exist)
```

**Scoring Report**:

```json
{
  "check_id": "inspect-skill-20260710-001",
  "framework": "Inspect Skill",
  "skill_name": "weekly-report-writer",
  "level": "L1",
  "result": "FAIL",
  "score": 38.11,
  "defects": [
    {"id": "QD-S-1.1", "severity": "P1", "desc": "Input Boundary Missing"},
    {"id": "QD-S-3.4", "severity": "P0", "desc": "Undefined Task Scope"},
    {"id": "QD-S-4.1", "severity": "P0", "desc": "Undefined Failure Behavior"}
  ],
  "recommendation": "All P0 defects MUST be remediated before release"
}
```

#### Example 2: L3 Skill, 5 Defects Found

**Skill**: DatabaseDiagnosticReporter  
**Level**: L3  
**Inspection Checklist**: 30 items (full)

**Inspection Results**:

- QD-S-1.1 (P1): 1 defect found ✗
- QD-S-3.4 (P0): 1 defect found ✗
- QD-S-4.1 (P0): 1 defect found ✗
- QD-S-5.1 (P0): 1 defect found ✗
- QD-S-5.3 (P0): 1 defect found ✗

**Deduction Calculation**:

```
Total Weight = 18×5 + 10×3 + 2×1 = 122
Base Score = 100 / 122 = 0.82

Defect Deductions:
- QD-S-1.1 (P1): 0.82 × 3 = 2.46
- QD-S-3.4 (P0): 0.82 × 5 = 4.10
- QD-S-4.1 (P0): 0.82 × 5 = 4.10
- QD-S-5.1 (P0): 0.82 × 5 = 4.10
- QD-S-5.3 (P0): 0.82 × 5 = 4.10

Total Deduction = 2.46 + 4.10 + 4.10 + 4.10 + 4.10 = 18.86
Score = 100 − 18.86 = 81.14
Gate = FAIL (4 P0 defects exist)
```

**Scoring Report**:

```json
{
  "check_id": "inspect-skill-20260710-002",
  "framework": "Inspect Skill",
  "skill_name": "readonly-database-diagnostic-reporter",
  "level": "L3",
  "result": "FAIL",
  "score": 81.14,
  "defects": [
    {"id": "QD-S-1.1", "severity": "P1", "desc": "Input Boundary Missing"},
    {"id": "QD-S-3.4", "severity": "P0", "desc": "Undefined Task Scope"},
    {"id": "QD-S-4.1", "severity": "P0", "desc": "Undefined Failure Behavior"},
    {"id": "QD-S-5.1", "severity": "P0", "desc": "Read/Write/Delete Not Distinguished"},
    {"id": "QD-S-5.3", "severity": "P0", "desc": "Undeclared Environment Boundaries"}
  ],
  "recommendation": "All P0 defects MUST be remediated before release"
}
```

<a id="116-multi-defect-handling-rules"></a>
### 11.6 Multi-Defect Handling Rules

**Rule**: The same inspection item is deducted only once, regardless of how many defect instances are found.

**Examples**:

**Scenario 1**: QD-S-1.1 (P1 inspection item, base score 4.76) — 3 P1 defects found

```
Deduction = One-time deduction of 14.29 (not 14.29 × 3)
```

**Scenario 2**: QD-S-3.4 (P0 inspection item, base score 4.76) — 2 P0 defects and 1 P1 defect found

```
This item's highest defect level is P0.
Deduction = One-time deduction of 23.80 (not 23.80 + 23.80 + 14.29)
```

**Scenario 3**: Cross-level defects found for the same inspection item number

```
QD-S-2.1 (P1 inspection item): 1 P0 and 1 P1 defect found simultaneously
→ Deduct at the most severe level, P0: deduction = 14.29 (if a P0 inspection item)
  OR deduct at the item's own level, P1: deduction = 14.29 (by the inspection item's own level)
→ Rule: Take the more severe of the defect level and the inspection item level; deduct only once
```

---

## Appendix A: QD-S Complete Numbering Index

| ID | Defect Name | Category | Severity Range (original SS-1/2/3) | Severity Range (updated to L1/2/3) | Inspection Method |
| --- | --- | --- | --- | --- | --- |
| **QD-S-0.1** | Required Field Presence | Baseline Compliance | MUST pass | MUST pass | Automated |
| **QD-S-0.2** | Field Content Non-Empty | Baseline Compliance | MUST pass | MUST pass | Automated |
| **QD-S-0.3** | Syntax Parsability | Baseline Compliance | MUST pass | MUST pass | Automated |
| **QD-S-0.4** | Field Type Validity | Baseline Compliance | MUST pass | MUST pass | Automated |
| **QD-S-0.5** | No Conflicting Declarations | Baseline Compliance | MUST pass | MUST pass | Automated |
| **QD-S-0.6** | Minimum Structural Completeness | Baseline Compliance | MUST pass | MUST pass | Automated |
| **QD-S-1.1** | Input Boundary Missing | Resource Runaway | SS-1:P1, SS-2:P0, SS-3:P0 | L1:P1, L2:P0, L3:P0 | Automated |
| **QD-S-1.2** | Output Size Missing | Resource Runaway | SS-1:P1, SS-2:P1, SS-3:P0 | L1:P1, L2:P1, L3:P0 | Automated |
| **QD-S-1.3** | Execution Resource Boundary Missing | Resource Runaway | SS-1:P2, SS-2:P0, SS-3:P0 | L1:P2, L2:P0, L3:P0 | Automated |
| **QD-S-1.4** | Permission Boundary Missing | Resource Runaway | SS-1:P2, SS-2:P1, SS-3:P0 | L1:P2, L2:P1, L3:P0 | Human |
| **QD-S-1.5** | Data Source Boundary Missing | Resource Runaway | SS-1:P2, SS-2:P1, SS-3:P1 | L1:P2, L2:P1, L3:P1 | Semi-automated |
| **QD-S-2.1** | Unbounded Quantity Declaration | Unbounded Directive | SS-1:P1, SS-2:P0, SS-3:P0 | L1:P1, L2:P0, L3:P0 | Automated |
| **QD-S-2.2** | Unterminated Execution Declaration | Unbounded Directive | SS-1:P1, SS-2:P0, SS-3:P0 | L1:P1, L2:P0, L3:P0 | Automated |
| **QD-S-2.3** | Open-Ended Enumeration in Structure | Unbounded Directive | SS-1:P1, SS-2:P1, SS-3:P0 | L1:P1, L2:P1, L3:P0 | Automated |
| **QD-S-2.4** | Broad Capability Verbs | Unbounded Directive | SS-1:P2, SS-2:P1, SS-3:P0 | L1:P2, L2:P1, L3:P0 | Human |
| **QD-S-3.1** | Vague Trigger Conditions | Ambiguity-Induced Inference | SS-1:P1, SS-2:P1, SS-3:P0 | L1:P1, L2:P1, L3:P0 | Human |
| **QD-S-3.2** | Missing Deactivation Conditions | Ambiguity-Induced Inference | SS-1:P2, SS-2:P1, SS-3:P0 | L1:P2, L2:P1, L3:P0 | Human |
| **QD-S-3.3** | Missing Ambiguous Input Handling | Ambiguity-Induced Inference | SS-1:P1, SS-2:P1, SS-3:P0 | L1:P1, L2:P1, L3:P0 | Human |
| **QD-S-3.4** | Undefined Task Scope | Ambiguity-Induced Inference | SS-1:P0, SS-2:P0, SS-3:P0 | L1:P0, L2:P0, L3:P0 | Human |
| **QD-S-3.5** | Undeclared Default Behavior | Ambiguity-Induced Inference | SS-1:P1, SS-2:P1, SS-3:P0 | L1:P1, L2:P1, L3:P0 | Human |
| **QD-S-3.6** | Metadata Expression Defects | Ambiguity-Induced Inference | SS-1:P1, SS-2:P1, SS-3:P0 | L1:P1, L2:P1, L3:P0 | Human |
| **QD-S-4.1** | Undefined Failure Behavior | Failure Escalation | SS-1:P1, SS-2:P0, SS-3:P0 | L1:P1, L2:P0, L3:P0 | Human |
| **QD-S-4.2** | Undeclared Partial Completion Legitimacy | Failure Escalation | SS-1:P1, SS-2:P1, SS-3:P0 | L1:P1, L2:P1, L3:P0 | Human |
| **QD-S-4.3** | Missing Post-Failure Prohibited Behaviors | Failure Escalation | SS-1:P1, SS-2:P1, SS-3:P0 | L1:P1, L2:P1, L3:P0 | Human |
| **QD-S-4.4** | Undefined Error Recovery Path | Failure Escalation | SS-1:P1, SS-2:P1, SS-3:P1 | L1:P1, L2:P1, L3:P1 | Human |
| **QD-S-5.1** | Read/Write/Delete Not Distinguished | Permission Overflow | SS-1:P2, SS-2:P1, SS-3:P0 | L1:P2, L2:P1, L3:P0 | Human |
| **QD-S-5.2** | Missing High-Risk Confirmation | Permission Overflow | SS-1:—, SS-2:—, SS-3:P0 | L1:—, L2:—, L3:P0 | Human |
| **QD-S-5.3** | Undeclared Environment Boundaries | Permission Overflow | SS-1:P2, SS-2:P1, SS-3:P0 | L1:P2, L2:P1, L3:P0 | Human |
| **QD-S-5.4** | Undeclared Chained Invocation Permissions | Permission Overflow | SS-1:P2, SS-2:P1, SS-3:P0 | L1:P2, L2:P1, L3:P0 | Human |

---

<a id="appendix-b-l1l2l3-minimum-rule-sets"></a>
## Appendix B: L1/L2/L3 Minimum Rule Sets

### L1 (Low Risk) Minimum Rule Set

**Must-Pass Item**:

- QD-S-0 (Baseline Compliance)

**Mandatory Inspection Items** (P0+P1):

- QD-S-1.1: Input Boundary (P1)
- QD-S-1.2: Output Size (P1)
- QD-S-2.1: Unbounded Quantity (P1)
- QD-S-3.4: Task Scope (P0)
- QD-S-4.1: Failure Behavior (P1)
- QD-S-3.6: Metadata (P1)

**Optional Items** (P2):

- QD-S-3.1, QD-S-3.2, QD-S-3.3

### L2 (Medium Risk) Minimum Rule Set

**Must-Pass Item**:

- QD-S-0 (Baseline Compliance)

**Mandatory Inspection Items** (all P0):

- QD-S-1.1, QD-S-1.3
- QD-S-2.1, QD-S-2.2
- QD-S-3.4
- QD-S-4.1

**Recommended Remediation Items** (P1):

- QD-S-1.2, QD-S-1.4, QD-S-1.5
- QD-S-2.3, QD-S-2.4
- QD-S-3.1, QD-S-3.2, QD-S-3.3, QD-S-3.6
- QD-S-4.2, QD-S-4.3
- QD-S-5.1, QD-S-5.3, QD-S-5.4

### L3 (High Risk) Minimum Rule Set

**Must-Pass Item**:

- QD-S-0 (Baseline Compliance)

**Mandatory Inspection Items** (all P0):

- QD-S-1.x (all)
- QD-S-2.1, 2.2, 2.3, 2.4
- QD-S-3.1, 3.2, 3.4, 3.5, 3.6
- QD-S-4.1, 4.2, 4.3
- QD-S-5.1, 5.2, 5.3, 5.4

---

## Appendix C: Glossary

| Term | Definition | Related Defects |
| --- | --- | --- |
| **Skill** | A functional unit of an Agent, defined by its name, description, and input/output constraints | — |
| **Quality Defect** | An incomplete, ambiguous, or unbounded definition unintentionally introduced by the developer | QD-S-1~5 |
| **Review Schema** | An intermediate review framework (6 dimensions) used by the inspection Agent to decompose and analyze Skills | QD-S-3/4/5 |
| **Gap Analysis** | A method of inspecting for gaps dimension-by-dimension against the Schema | QD-S-0~5 |
| **Inferential Verification** | Static reasoning to demonstrate defect risk and remediation effectiveness | All defects |
| **LLM Default Gap-Filling Behavior** | The LLM's tendency to fill behavioral gaps on its own when a Skill leaves scenarios undeclared | QD-S-1~5 |
| **EX** | Explicit Risk — explicit attack risk | External |
| **IM** | Implicit Risk — implicit logic risk | External |
| **L1/L2/L3** | Skill Risk Levels (Low/Medium/High) | Inspection intensity classification |
| **P0/P1/P2** | Defect Levels (Blocking/Warning/Advisory) | Release decision |

---

## Part Summaries

### Part 2 Summary: QD-S-1 Resource Runaway

This part defines five categories of defects where the Skill, lacking critical boundary constraints, causes resource runaway (input boundary, output size, execution resources, permission boundaries, data sources). The common characteristic of these defects is: **the LLM infers on its own in the absence of explicit constraints, and the inferred scope is typically broader than the developer intended, leading to Token runaway, cost explosion, and even permission overflow.**

**Core Points**:

- No quantity limit → LLM processes all content
- No output limit → output bloat, response overflow
- No retry limit → infinite loops, cost runaway
- No permission declaration → broad capabilities interpreted as full authorization
- No data source limit → LLM collects conversation history and external data on its own

**Inspection Item Count**: 5

### Part 3 Summary: QD-S-2 Unbounded Directive

This part defines four categories of defects where the Skill actively includes unbounded semantics (unbounded quantities, unterminated execution, open-ended enumerations, broad verbs). These defects are not about "what is missing" — they are about "what was written that shouldn't have been": language that explicitly drives the LLM toward unbounded execution or unbounded expansion.

**Core Points**:

- `all / every / entire` without a corresponding limit → LLM pursues exhaustive processing
- `keep trying / until success` without a termination condition → infinite retries
- `such as / etc.` open-ended enumeration → LLM expands on its own
- `manage / handle / coordinate` broad verbs without non_goals → unclear permission inference

**Inspection Item Count**: 4

### Part 4 Summary: QD-S-3 Ambiguity-Induced Inference

This part defines six categories of defects where the Skill description contains semantic ambiguity or leaves critical scenarios undefined (trigger conditions, deactivation conditions, ambiguity handling, task scope, default behavior, metadata). When facing ambiguity, the LLM tends toward "reasonable assumptions" rather than stopping to ask, and the inferred results often exceed expectations.

**Core Points**:

- Broad trigger conditions → mis-triggering
- No deactivation condition declaration → LLM forcibly activates in edge scenarios
- No ambiguity handling strategy → LLM auto-completes missing content
- No non_goals → task scope is expanded
- No default behavior definition → LLM makes decisions on its own in exception scenarios
- Metadata inconsistent with body → misunderstanding at the trigger stage

**Inspection Item Count**: 6

### Part 5 Summary: QD-S-4 Failure Escalation

This part defines four categories of defects where the Skill lacks handling strategies for failure or exception scenarios (failure behavior, partial completion, post-failure prohibited behaviors, error recovery). The LLM's "complete the task as best you can" training objective drives it to proactively expand its strategy when encountering failure, creating even greater risk.

**Core Points**:

- No failure behavior definition → LLM explores alternative paths on its own
- No partial completion declaration → LLM forcibly pursues completeness
- No post-failure prohibited behaviors → LLM lowers standards or expands scope on its own
- No error recovery path → LLM decides whether to retry, degrade, or expand

**Inspection Item Count**: 4

### Part 6 Summary: QD-S-5 Permission Overflow

This part defines four categories of defects where unclear Skill permission boundaries cause permission overflow (read/write/delete permissions, high-risk operation confirmation, environment boundaries, chained invocation permissions). The distinctive feature of these defects is: ambiguous permission boundaries are functionally equivalent to implicitly granting the LLM out-of-scope permissions.

**Core Points**:

- Read/write/delete not distinguished → LLM infers broad capabilities include high-risk operations
- Irreversible operations without confirmation → operations have no gating (as in the Replit database deletion incident)
- Environment boundaries missing → production environments treated as legitimate operational targets
- Chained invocation permissions unclear → low-permission Skills can indirectly reach high-permission operations

**Inspection Item Count**: 4

### Part 7 Summary: Skill Tiered Inspection Mechanism

This part establishes a mechanism for differentiated inspection based on Skill Risk Level (L1/L2/L3). The same defect has different severity levels at different risk levels: a defect that may be P2 for a low-risk Skill becomes P0 (must-fix) for a high-risk Skill.

**Core Points**:

- L1 (Low Risk): 7 mandatory inspection items
- L2 (Medium Risk): All P0 items mandatory; P1 items recommended
- L3 (High Risk): All 30+ items mandatory; no exceptions

**Significance of Tiering**:

- Reduces inspection burden for low-risk Skills
- Provides the strictest review for high-risk Skills
- Finds a balance between resources and accuracy

### Part 8 Summary: Review Schema — Detailed Review Dimensions

The Review Schema is the Inspect Skill inspection Agent's internal working view, not a production Skill format. It decomposes Skill definitions across six dimensions, each containing MUST/SHOULD/MAY-level inspection items, helping the Agent systematically identify missing declarations.

**Core Points**:

- IDENTITY: What it does, does not do, and can access
- TRIGGER: When to activate, when to prohibit
- INPUT: Input size, format, overflow handling
- EXECUTION: Execution boundaries, retries, tool invocations, permissions
- OUTPUT: Output size, structure, partial completion strategy
- FAILURE: Handling of failures, empty input, insufficiency, dissatisfaction

**Practice Principles**:

- The inspection view is not the production format
- Missing declarations indicate "semantic gaps," not "fields that must be added"
- Final deliverables retain the original platform format

### Part 9 Summary: Usage Examples

Two real-world scenarios (L1 personal productivity, L3 enterprise operations) demonstrate the complete Inspect Skill workflow:

**L1 Example (WeeklyReportWriter)**:

- Original Skill appeared complete but lacked critical boundaries
- Inspection identified 5 defects (2 P0, 3 P1)
- After optimization: input/output/failure handling constraints are explicitly defined
- Governance effect: From unconstrained to explicitly constrained

**L3 Example (DatabaseDiagnosticReporter)**:

- Original Skill had permission inference ambiguity ("maintenance" vs. "read-only")
- Inspection identified 6 defects (5 P0, 1 P1)
- After optimization: Name changed to `readonly-xxx`; explicit prohibition list
- Governance effect: From ambiguous permissions to explicit permissions

**Common Insights**:

- Principle of least modification: Do not force format rewriting
- P0 first: Block release
- Inferential Verification: Every remediation demonstrates risk elimination
- Responsibility boundary: Output is for reference only; the developer makes the final decision

---

© 2026 Sanity AI Labs. Licensed under Creative Commons Attribution-ShareAlike 4.0 International.
https://www.sanityops.org  ·  hello@sanityops.org
v1.0  ·  July 2026
