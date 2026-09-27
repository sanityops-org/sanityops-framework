# SanityOps Framework Core

---

**Version**: v1.0

**Release Date**: July 2026

**Maintainer**: SanityOps Working Group

**License**: CC BY-SA 4.0

---

## Table of Contents

- [Document Information](#document-information)
- [Foreword](#foreword)
- [0.1 Purpose](#01-purpose)
- [0.2 What Core Is](#02-what-core-is)
- [0.3 What Core Is Not](#03-what-core-is-not)
- [0.4 Normative Language](#04-normative-language)
- [0.5 Source-Specification Precedence and Migration Principles](#05-source-specification-precedence-and-migration-principles)
- [Chapter 1: Framework Positioning, Governance Objects, and Lifecycle Boundaries](#chapter-1-framework-positioning-governance-objects-and-lifecycle-boundaries)
- [1.1 Positioning of SanityOps](#11-positioning-of-sanityops)
- [1.2 Logic Artifacts as First-Class Governance Assets](#12-logic-artifacts-as-first-class-governance-assets)
  - [1.2.1 Definition](#121-definition)
  - [1.2.2 Minimum Governance Requirements](#122-minimum-governance-requirements)
- [1.3 Core Problems and Specification Domains](#13-core-problems-and-specification-domains)
- [1.4 The Non-Substitutability Principle](#14-the-non-substitutability-principle)
- [1.5 The Full-Lifecycle Governance Closed Loop](#15-the-full-lifecycle-governance-closed-loop)
- [Chapter 2: Unified Object and Artifact Model](#chapter-2-unified-object-and-artifact-model)
- [2.1 Core Objects](#21-core-objects)
- [2.2 Current Coverage and Extension Objects](#22-current-coverage-and-extension-objects)
- [2.3 Artifact Relationships](#23-artifact-relationships)
- [2.4 Version Boundaries and Minimum Identification](#24-version-boundaries-and-minimum-identification)
- [Chapter 3: Unified Terminology, Naming, and Numbering Rules](#chapter-3-unified-terminology-naming-and-numbering-rules)
- [3.1 Formal Names and Historical Aliases](#31-formal-names-and-historical-aliases)
- [3.2 Numbering Namespaces](#32-numbering-namespaces)
- [3.3 Distinguishing Rules from Instances](#33-distinguishing-rules-from-instances)
- [3.4 Terminology Boundaries](#34-terminology-boundaries)
- [Chapter 4: Grading Models and Risk Semantics](#chapter-4-grading-models-and-risk-semantics)
- [4.1 Grading Models Must Not Be Conflated](#41-grading-models-must-not-be-conflated)
- [4.2 Agent Complexity Level: `AC-L`](#42-agent-complexity-level-ac-l)
- [4.3 Operation Risk Level: `OR-L`](#43-operation-risk-level-or-l)
- [4.4 Business Impact Level: `BI-L`](#44-business-impact-level-bi-l)
- [4.5 Change Level: `CH-L`](#45-change-level-ch-l)
- [4.6 Inspect Defect Disposition Priority: `P0/P1/P2`](#46-inspect-defect-disposition-priority-p0p1p2)
- [4.7 Risk Explicit Severity Level: `S0–S3`](#47-risk-explicit-severity-level-s0s3)
- [4.8 Risk Implicit Termination Status: `A/B/C/D`](#48-risk-implicit-termination-status-abcd)
- [4.9 Composite Risk Profile Expression](#49-composite-risk-profile-expression)
- [Chapter 5: Unified Finding, Evidence, and Traceability Model](#chapter-5-unified-finding-evidence-and-traceability-model)
- [5.1 Definition of a Finding](#51-definition-of-a-finding)
- [5.2 Minimum Finding Record](#52-minimum-finding-record)
- [5.3 Finding Statuses](#53-finding-statuses)
- [5.4 Evidence Tiers](#54-evidence-tiers)
- [5.5 Evidence Sufficiency and Conclusion Strength](#55-evidence-sufficiency-and-conclusion-strength)
- [5.6 Confidence and Review Status](#56-confidence-and-review-status)
  - [5.6.1 Confidence](#561-confidence)
  - [5.6.2 Review Status](#562-review-status)
- [5.7 Not Applicable: `N/A`](#57-not-applicable-na)
- [Chapter 6: Conclusions, Gates, and Release Decision Boundaries](#chapter-6-conclusions-gates-and-release-decision-boundaries)
- [6.1 Gate Independence](#61-gate-independence)
- [6.2 Release Summary Status](#62-release-summary-status)
- [6.3 Minimum Evidence Requirements for Release Conclusions](#63-minimum-evidence-requirements-for-release-conclusions)
- [6.4 Constraints on `PASS_WITH_EXCEPTION`](#64-constraints-on-pass_with_exception)
- [6.5 Conflicts and Insufficient Evidence](#65-conflicts-and-insufficient-evidence)
- [6.6 Precedence in Sub-Specification Conflicts](#66-precedence-in-sub-specification-conflicts)
- [Chapter 7: Cross-Subset Integration and Causal Boundaries](#chapter-7-cross-subset-integration-and-causal-boundaries)
- [7.1 Standard Integration Closed Loop](#71-standard-integration-closed-loop)
- [7.2 Scope of Relevance](#72-scope-of-relevance)
- [7.3 Prohibited Inferences](#73-prohibited-inferences)
- [7.4 Finding Association Types](#74-finding-association-types)
- [7.5 Single Defects, Defect Chains, and Common-Cause Issues](#75-single-defects-defect-chains-and-common-cause-issues)
  - [7.5.1 Single Defects](#751-single-defects)
  - [7.5.2 Defect Chains](#752-defect-chains)
  - [7.5.3 Common-Cause Issues](#753-common-cause-issues)
- [7.6 Remediation and Regression Integration Principles](#76-remediation-and-regression-integration-principles)
- [Chapter 8: Versioning, Change, Baseline, and Compatibility](#chapter-8-versioning-change-baseline-and-compatibility)
- [8.1 Version Objects Must Be Separated](#81-version-objects-must-be-separated)
- [8.2 Definition of a Baseline](#82-definition-of-a-baseline)
- [8.3 Change Level Determination](#83-change-level-determination)
- [8.4 Minimum Re-Inspection and Regression Principles](#84-minimum-re-inspection-and-regression-principles)
- [8.5 Rule or Evaluator Changes](#85-rule-or-evaluator-changes)
- [8.6 Compatibility Principles](#86-compatibility-principles)
- [8.7 Document Dependencies and Applicable Versions](#87-document-dependencies-and-applicable-versions)
- [Chapter 9: Governance Roles, Remediation, and Exceptions](#chapter-9-governance-roles-remediation-and-exceptions)
- [9.1 Minimum Role Model](#91-minimum-role-model)
- [9.2 Remediation Responsibility and Closed Loop](#92-remediation-responsibility-and-closed-loop)
- [9.3 Exceptions and Risk Acceptance](#93-exceptions-and-risk-acceptance)
- [9.4 Minimum Conditions for Exception Approval](#94-minimum-conditions-for-exception-approval)
- [9.5 Exception Review, Expiry, and Revocation](#95-exception-review-expiry-and-revocation)
- [9.6 Risk Acceptance and Release Responsibility Boundaries](#96-risk-acceptance-and-release-responsibility-boundaries)
- [Chapter 10: Implementation Maturity and Extension Roadmap](#chapter-10-implementation-maturity-and-extension-roadmap)
- [10.1 Implementation Principles](#101-implementation-principles)
- [10.2 Implementation Phases](#102-implementation-phases)
- [10.3 Future Specialized Specification Extension Order](#103-future-specialized-specification-extension-order)
- [10.4 Current Coverage Statement](#104-current-coverage-statement)
- [Appendix A: Core Terminology Quick Reference](#appendix-a-core-terminology-quick-reference)
- [Appendix B: Status, Level, and Grading Model Quick Reference](#appendix-b-status-level-and-grading-model-quick-reference)
- [B.1 Grading Models](#b1-grading-models)
- [B.2 Conclusions and Disposition Levels](#b2-conclusions-and-disposition-levels)
- [B.3 Finding Lifecycle Statuses](#b3-finding-lifecycle-statuses)
- [Appendix C: Unified Record Templates](#appendix-c-unified-record-templates)
- [C.1 Finding Record](#c1-finding-record)
- [C.2 Evidence Record](#c2-evidence-record)
- [C.3 Exception Record](#c3-exception-record)
- [Appendix D: Document Dependency and Compatibility Matrix](#appendix-d-document-dependency-and-compatibility-matrix)
- [Appendix E: Existing Specification Consistency Migration Checklist](#appendix-e-existing-specification-consistency-migration-checklist)
- [Appendix F: Cross-Subset Release Report Example](#appendix-f-cross-subset-release-report-example)
- [Closing Statement](#closing-statement)

---

## Document Information

| Field | Value |
| --- | --- |
| Document Title | SanityOps Framework Core: Terminology, Objects, and Decision Baselines |
| Short Name | SanityOps Core |
| Version | v1.0 |
| Status | Published |
| Date | September 2026 |
| Scope | All current and future SanityOps sub-specifications, rule assets, tool implementations, reports, CI/CD pipelines, and governance processes |
| Maintainer | SanityOps Working Group |
| Document Nature | Framework-level normative baseline |

---

# Foreword

<a id="01-purpose"></a>
## 0.1 Purpose

The SanityOps Framework has evolved into a specification system spanning Logic Artifact Defect Inspection, Explicit Risk Audit, dynamic risk validation, Tool-Agent quality assessment, RAG-Agent quality assessment, and defect impact mapping.

As these specifications matured independently across different phases, inconsistencies inevitably emerged: the same term carrying different meanings across documents, the same level designation mapping to different risk dimensions, abbreviations diverging, and conclusion boundaries becoming susceptible to misinterpretation.

This specification establishes the **common semantic layer** for SanityOps. It defines, in a unified manner:

- The framework's positioning, object boundaries, and lifecycle boundaries;
- Common governance requirements for Logic Artifacts and related assets;
- Core terminology, namespaces, abbreviations, and version expressions;
- The scope of applicability for grading, severity, status, and Gate models;
- Minimum requirements for Findings, evidence, human review, and release summaries;
- Collaboration relationships, conclusion boundaries, and conflict resolution principles across sub-specifications;
- Consistency migration principles for existing specifications.

<a id="02-what-core-is"></a>
## 0.2 What Core Is

SanityOps Core is a **framework-level internal convention specification**. It is not merely a glossary.

It defines the common language that every sub-specification depends on:

```text
Object Language
+ Evidence Language
+ Status Language
+ Decision Language
+ Version Language
```

Core does not replace any sub-specification's rules, scoring, thresholds, inspection items, or Gates.

<a id="03-what-core-is-not"></a>
## 0.3 What Core Is Not

This specification does **not**:

1. Create, delete, or modify existing `QD`, `EX`, `AS`, or `FM` identifiers;
2. Alter the independent adjudication rules of Inspect, Risk, or Quality;
3. Automatically equate a Static Defect with a vulnerability, a successful attack, or a quality failure;
4. Automatically equate a single score, a single test run, or an external control interception with a releasable conclusion;
5. Substitute for an organization's IAM, backend controls, network security, privacy compliance, production monitoring, or industry regulatory obligations;
6. Claim that SanityOps has achieved complete coverage of specialized inspection requirements for Knowledge, Memory, Workflow, Identity, A2A, MCP, or Connector domains.

<a id="04-normative-language"></a>
## 0.4 Normative Language

Unless otherwise defined by a specific sub-specification, the following terms carry these meanings:

| Term | Meaning |
| --- | --- |
| **MUST** | Non-compliance disqualifies a claim of conformance to the corresponding requirement. |
| **SHOULD** | Generally expected; where not met, the rationale, residual risk, and alternative measures MUST be documented. |
| **MAY** | Optional; adoption is at the discretion of the organization, business context, or implementation. |
| **MUST NOT** | Prohibited. |
| **NOT APPLICABLE** | The preconditions for applicability are not satisfied for the current object or condition. The basis for this applicability determination MUST be documented. |

<a id="05-source-specification-precedence-and-migration-principles"></a>
## 0.5 Source-Specification Precedence and Migration Principles

With the publication of Core:

1. **Domain-specific rules take precedence.**  
   For rules, scoring, thresholds, defect definitions, and Gates within the respective domains of Inspect, Risk, and Quality, the corresponding domain-specific sub-specification governs.

2. **Common semantics take precedence.**  
   For terminology, object identification, version evidence, status expression, and cross-subset conclusion boundaries, Core serves as the unified baseline.

3. **Historical rules are not silently rewritten.**  
   Content in existing documents that is inconsistent with Core does not automatically become invalid upon Core's publication. Such discrepancies SHALL be registered as consistency migration items and explicitly revised in subsequent maintenance versions.

4. **Substantive changes and editorial revisions are separated.**
   - Revisions to terminology, abbreviations, cross-references, and report fields MAY use a patch version.
   - Substantive changes to scoring, rules, thresholds, Gates, or scope of applicability MUST follow the corresponding formal change process.

---

# Chapter 1: Framework Positioning, Governance Objects, and Lifecycle Boundaries

<a id="11-positioning-of-sanityops"></a>
## 1.1 Positioning of SanityOps

SanityOps is a **vendor-neutral quality, security, and governance framework for the full lifecycle of enterprise-grade AI Agents**.

Its core objective is not to guarantee that Agents are always correct or absolutely secure. Rather, it is:

> To bring the controllable, versionable, and verifiable Logic Artifacts, behavioral risks, and quality outcomes of enterprise Agents into a continuous cycle of inspection, validation, regression, and evidence governance — systematically reducing the uncertainty of Agent behavior and the business and security risks that uncertainty creates.

SanityOps is designed primarily for enterprise AI/Agent applications. Coverage of all personal-user Agents, open-ended creative tools, or general-purpose chat products is not a primary design objective.

<a id="12-logic-artifacts-as-first-class-governance-assets"></a>
## 1.2 Logic Artifacts as First-Class Governance Assets

<a id="121-definition"></a>
### 1.2.1 Definition

Based on three criteria — the hosting field, content independence, and direct influence on the LLM — the Logic Artifacts defined by SanityOps are limited to three types: **System Prompt**, **Skill**, and **Tool Schema**.

<a id="122-minimum-governance-requirements"></a>
### 1.2.2 Minimum Governance Requirements

Every applicable Logic Artifact MUST support the following capabilities:

```text
Identifiable
+ Versionable
+ Traceable
+ Inspectable
+ Verifiable
+ Regressible
+ Auditable
```

Natural-language form does not reduce governance requirements. Prompts, Skills, and Tool Schemas SHOULD NOT be treated as mere "configuration" or "copy." They are engineering assets that can materially influence the behavioral boundaries of an Agent.

<a id="13-core-problems-and-specification-domains"></a>
## 1.3 Core Problems and Specification Domains

| Domain | Core Problem | Primary Conclusions |
| --- | --- | --- |
| **Inspect** | Do artifact definitions or cross-artifact relationships contain Static Defects? | `QD`, static evidence, severity level, remediation recommendations |
| **Risk** | Do artifacts contain Explicit Risks, or can security-risk behaviors be triggered under controlled conditions? | `EX`, D1/D2/D3, S-levels, A/B/C/D, Signal, validation evidence |
| **Quality** | Does the Agent's actual task execution — or the user-visible service — meet the defined quality bar? | Reliability, quality metrics, test case results, Quality Gate, regression conclusions |
| **Relevance** | Which Attack Surfaces, validation strategies, Failure Modes, and regression requirements might a Static Defect correlate with? | `AS`, `FM`, Defect Chains, mapping recommendations, Candidate Root Causes |

<a id="14-the-non-substitutability-principle"></a>
## 1.4 The Non-Substitutability Principle

The following inferences are **not valid**:

```text
Inspect PASS ≠ Security PASS
Inspect PASS ≠ Quality PASS
Risk exploitation not successful ≠ Static Defects absent
Risk Explicit no EX hit ≠ Artifact boundaries are complete
Quality PASS ≠ No security risks exist
Quality FAIL ≠ A specific QD has been proven as the sole root cause
External control interception ≠ Agent itself possesses sufficient safety constraints
Single test PASS ≠ Long-term security or quality assurance
```

Each sub-specification draws conclusions only within the boundaries of its own evidence domain.

<a id="15-the-full-lifecycle-governance-closed-loop"></a>
## 1.5 The Full-Lifecycle Governance Closed Loop

The target closed loop for SanityOps is:

```text
Design & Build
    ↓
Logic Artifact Versioning
    ↓
Inspect — Static Defect Inspection
    ↓
Risk — Risk Audit and Dynamic Validation
    ↓
Quality — Service Quality Assessment
    ↓
Release Authorization and Exception Decisions
    ↓
Runtime Monitoring, Change Assessment, and Regression
    ↓
Incident Review, Rule Calibration, and Asset Improvement
```

SanityOps currently defines:

- Inspect;
- Risk Explicit;
- Risk Implicit;
- Quality Tool-Agent;
- Quality RAG-Agent;
- Inspect defect impact and cross-subset mapping.

Production runtime monitoring, production auditing, incident response, Knowledge governance, Memory governance, Identity governance, and A2A governance are future extension directions. They MUST NOT be represented as fully covered, specialized specification capabilities at this time.

---

# Chapter 2: Unified Object and Artifact Model

<a id="21-core-objects"></a>
## 2.1 Core Objects

| Object | Definition |
| --- | --- |
| **Agent** | An application entity that receives input, uses a model for decision-making, and may generate content, invoke tools, or execute tasks. |
| **Prompt** | A directive asset that defines role, task, boundaries, rules, context handling, output, or invocation requirements. |
| **Skill** | A behavior definition oriented toward a specific task or capability scope, typically including trigger conditions, inputs/outputs, permissions, resources, and failure strategies. |
| **Tool** | An external capability interface invocable by an Agent or Skill. |
| **Tool Schema** | A structured definition of a Tool's name, description, input parameters, return structure, side effects, and constraints. |
| **Workflow** | An orchestration definition for multi-step execution, routing, state, dependencies, retries, recovery, or human handoff. |
| **Knowledge Source** | A governed knowledge asset and its metadata, used to support retrieval, citation, answering, or decision-making. |
| **Memory** | State and information assets retained, read, updated, or reused by an Agent within or across sessions. |
| **Identity / Policy** | Assets related to identity, roles, authorization, approval, tenancy, data access, and policy enforcement. |
| **External Connector** | An MCP Server, Webhook, Callback, external API, plugin, or other external connectivity capability. |
| **Evaluation Asset** | Test cases, rules, evaluators, Judge Prompts, scoring configurations, Baselines, and regression assets. |
| **Control** | A technical or administrative measure for preventing, limiting, detecting, intercepting, auditing, or recovering from risk behaviors. |
| **Finding** | A specific inspection, validation, or quality discovery produced for a particular artifact, version, and environment. |
| **Exception** | An approved, traceable, time-limited Risk Acceptance or rule exception. |

<a id="22-current-coverage-and-extension-objects"></a>
## 2.2 Current Coverage and Extension Objects

| Object | Dedicated Specification Exists? | Current Status |
| --- | --- | --- |
| Prompt | Yes, Inspect Prompt | Covered |
| Skill | Yes, Inspect Skill | Covered |
| Tool / Tool Schema | Yes, Inspect Tool | Covered |
| Prompt–Skill–Tool Cross | Yes, Inspect Cross | Covered |
| Permission | Yes, Inspect Permission | Covered |
| Explicit Risk Expression | Yes, Risk Explicit | Covered |
| Dynamic Attack Validation | Yes, Risk Implicit | Covered |
| Tool-Agent Task Quality | Yes, Quality Tool-Agent | Covered |
| RAG Content and Boundary Response Quality | Yes, Quality RAG-Agent | Covered |
| Defect Impact and Cross-Subset Mapping | Yes, Relevance | Covered |
| Knowledge / RAG Contract | No | Extension object |
| Workflow / State | No | Extension object |
| Memory | No | Extension object |
| Identity / Policy | No | Extension object |
| A2A / MCP / Connector | No | Extension object |

For extension objects, Core defines only the unified object, version, and evidence interfaces. Prior to the publication of dedicated specifications, no corresponding `QD`, Gate, or coverage conclusions SHALL be fabricated.

<a id="23-artifact-relationships"></a>
## 2.3 Artifact Relationships

The artifact relationships of a typical Agent can be abstracted as:

```text
Prompt
  ↓ Defines global objectives, boundaries, rules, and workflow requirements
Skill
  ↓ Defines capability scope, trigger conditions, permissions, and failure strategies
Tool / Tool Schema
  ↓ Defines invocable capabilities, parameters, side effects, and Hard Constraints
Backend / Runtime
  ↓ Enforces IAM, validation, approval, audit, isolation, and monitoring
```

For systems that include retrieval, memory, orchestration, or multi-Agent collaboration, this extends to:

```text
Prompt / Skill / Workflow
        ↓
Knowledge / Memory / Identity / Policy
        ↓
Tool / Connector / A2A / MCP
        ↓
Backend / Runtime / External Service
```

<a id="24-version-boundaries-and-minimum-identification"></a>
## 2.4 Version Boundaries and Minimum Identification

Any conclusion eligible for release, audit, regression, or root-cause investigation MUST be associated with the following minimum version information:

```text
Agent Identifier
+ Artifact Identifier
+ Artifact Version or Immutable Hash
+ Dependency Artifact Versions
+ Model and Runtime Configuration Version
+ Environment Identifier
+ Rule or Evaluator Version
+ Test Asset or Knowledge Snapshot Version
+ Execution Timestamp
```

Where not all fields are available, the missing items and their impact on conclusion confidence, comparability, or applicability MUST be explicitly documented.

---

# Chapter 3: Unified Terminology, Naming, and Numbering Rules

<a id="31-formal-names-and-historical-aliases"></a>
## 3.1 Formal Names and Historical Aliases

The following are Core's recommended formal names:

| Formal Name | Acceptable Historical Aliases | Requirement for Subsequent Documents |
| --- | --- | --- |
| `Inspect Prompt` | Inspect Prompt Standard | Use formal name |
| `Inspect Skill` | Inspect Skill Standard | Use formal name |
| `Inspect Tool` | Inspect Tool Standard | Use formal name |
| `Inspect Cross` | Inspect CROSS, Inspect Cross Standard | Use `Inspect Cross` |
| `Inspect Permission` | Inspect Permission Standard | Use formal name |
| `Risk Explicit` | Risk EX, Explicit | May note `EX` as classification prefix on first occurrence |
| `Risk Implicit` | Risk IM, Implicit | May note `IM` as historical abbreviation on first occurrence |
| `Quality Tool-Agent` | Sanity Quality Tool-Agent, Quality Tool Agent | Use `Quality Tool-Agent` |
| `Quality RAG-Agent` | Quality RAG Agent | Use `Quality RAG-Agent` |
| `Relevance` | Inspect Defect Impact Mapping Specification | Use full document title or `Relevance` |

Aliases in historical documents do not automatically constitute errors, but subsequent revisions and new documents SHALL adopt the formal names uniformly.

<a id="32-numbering-namespaces"></a>
## 3.2 Numbering Namespaces

| Object Type | Numbering Example | Maintained By | Purpose |
| --- | --- | --- | --- |
| Prompt Defect | `QD-P-*` | Inspect Prompt | Prompt Static Defects |
| Skill Defect | `QD-S-*` | Inspect Skill | Skill Static Defects |
| Tool Defect | `QD-T-*` | Inspect Tool | Tool / Schema Static Defects |
| Cross Defect | `QD-PS-*`, `QD-PT-*`, `QD-ST-*` | Inspect Cross | Cross-Artifact relationship defects |
| Permission Defect | `QD-PM-*` | Inspect Permission | Permission-responsibility proportionality defects |
| Explicit Risk | `NL-A-*`, `NL-B-*`, `NR-O-*`, `NR-S-*` | Risk Explicit | Explicit Risk classification |
| Attack Surface | `AS-*` | Relevance | Security impact mapping |
| Behavioral Failure Mode | `FM-*` | Relevance | Tool-Agent quality diagnostic mapping |
| Security Defect Chain | `SC-*` | Relevance | Candidate security integration paths |
| Tool-Agent Quality Chain | `QC-TA-*` | Relevance | Candidate task quality integration paths |
| RAG-Agent Quality Chain | `QC-RA-*` | Relevance | Candidate content quality integration paths |
| Finding Instance | `F-*` | Platform or implementing organization | Actual discovery on a specific object |
| Exception Instance | `EXC-*` | Governance process | Risk Acceptance or rule exception |

<a id="33-distinguishing-rules-from-instances"></a>
## 3.3 Distinguishing Rules from Instances

A clear distinction MUST be maintained between "rule definitions" and "actual Findings."

```text
QD-T-3.2
= A reusable defect rule definition

F-20260719-00128
= A Finding instance on a specific Tool, at a specific version, in a specific environment
```

A single `QD` can produce multiple Findings across multiple artifacts, versions, or environments. A single Finding can also be associated with multiple QD, EX, AS, FM, or Defect Chain entries.

<a id="34-terminology-boundaries"></a>
## 3.4 Terminology Boundaries

| Term | Correct Definition | MUST NOT Be Conflated With |
| --- | --- | --- |
| `QD` | Static Logic Artifact Defect | Dynamic vulnerability, successful attack, quality failure |
| `EX` | Explicit Risk expression or dangerous configuration classification within an artifact | Inspect defect identifier |
| `A/B/C/D` | Risk Implicit attack test case Termination Status | Defect severity level or quality score |
| `FM` | Candidate behavioral Failure Mode for Tool-Agent | Confirmed root cause |
| `AS` | Potential Attack Surface classification | Confirmed security incident |
| Finding | An actual discovery record on a specific object | The rule itself |
| Control | A measure for preventing, limiting, intercepting, or auditing risk | A purely natural-language declaration |
| Exception | An approved, time-limited Risk Acceptance | An unresolved issue or a default exemption |
| Baseline | A confirmed, comparable versioned snapshot | Any arbitrary historical result |

---

# Chapter 4: Grading Models and Risk Semantics

<a id="41-grading-models-must-not-be-conflated"></a>
## 4.1 Grading Models Must Not Be Conflated

SanityOps employs multiple grading models for distinct purposes. They answer different questions and **MUST NOT be substituted for one another merely because they all use L, P, S, or numeric designations**.

| Grade Code | Formal Name | Question Answered | Primary Source |
| --- | --- | --- | --- |
| `AC-L` | Agent Complexity Level | How complex is the Agent's structure, collaboration pattern, and execution form? | Inspect Prompt, Inspect Cross, Inspect Permission |
| `OR-L` | Operation Risk Level | How high is the risk of the operations a Skill or Tool can perform? | Inspect Skill, Inspect Tool, Inspect Permission |
| `BI-L` | Business Impact Level | How severe are the business consequences of task failure or incorrect results? | Quality Tool-Agent |
| `CH-L` | Change Level | What is the scale, impact scope, and regression intensity of the change? | Quality RAG-Agent and subsequent change governance |
| `P0/P1/P2` | Inspect Defect Disposition Priority | At what priority should discovered Static Defects be addressed? | All Inspect sub-specifications |
| `S0–S3` | Risk Explicit Severity Level | How severe is the Explicit Risk? | Risk Explicit |
| `A/B/C/D` | Risk Implicit Termination Status | What is the result of a dynamic attack attempt, and where does the responsibility boundary lie? | Risk Implicit |

Subsequent documents, reports, APIs, and tool interfaces MUST NOT use isolated expressions such as "L2," "high risk," or "severity level 3." The governing model MUST be included, e.g., `OR-L2`, `BI-L3`, `S3`.

<a id="42-agent-complexity-level-ac-l"></a>
## 4.2 Agent Complexity Level: `AC-L`

`AC-L` describes an Agent's technical form, collaboration complexity, and execution chain depth. Its purpose is to determine the applicable Inspect depth, Cross inspection scope, and validation combinations.

| Level | Meaning | Examples |
| --- | --- | --- |
| `AC-L1` | Single task, limited context, no Tool use or low-complexity Tool use | Single-turn content generation, constrained knowledge Q&A |
| `AC-L2` | Presence of Skills, Tools, or limited multi-step execution | Query-type Tool-Agent, basic RAG-Agent |
| `AC-L3` | Multiple Skills, multiple Tools, chained invocation, state passing, or high-risk operations | Business process Agent, operations execution Agent |
| `AC-L4` | Multi-Agent collaboration, dynamic planning, complex state machines, cross-domain delegation, or extensive external connectivity | Enterprise multi-Agent systems |

`AC-L` does not directly indicate data sensitivity, actual business impact, or security vulnerability severity.

> Note: Where existing sub-specifications contain Agent complexity tiers with different counts or different descriptions, they SHALL be mapped to `AC-L` in subsequent consistency revisions. They MUST NOT be automatically treated as equivalent prior to explicit mapping.

<a id="43-operation-risk-level-or-l"></a>
## 4.3 Operation Risk Level: `OR-L`

`OR-L` describes the operational risk a given Skill, Tool, or execution path can produce. Its focus is on permissions, side effects, irreversibility, impact scope, and data exfiltration capability.

| Level | Meaning | Examples |
| --- | --- | --- |
| `OR-L1` | Low risk, read-only, no sensitive data, or no external side effects | Local format conversion, public information query |
| `OR-L2` | Limited side effects or constrained sensitive data handling | Internal queries, controlled notifications, draft generation |
| `OR-L3` | High-risk writes, deletions, data exfiltration, permission changes, batch operations, or sensitive data handling | Refunds, production configuration changes, external email dispatch |

`OR-L` determines whether controls such as confirmation, approval, idempotency, audit, rollback, least privilege, and dynamic validation are required.

`OR-L` is not equivalent to an Agent's structural complexity. For example, a structurally simple Agent that can read a full medical dataset may be `AC-L1` and `OR-L3`.

<a id="44-business-impact-level-bi-l"></a>
## 4.4 Business Impact Level: `BI-L`

`BI-L` describes the potential business consequences of Tool-Agent task failure, incorrect execution, or erroneous results. Its focus is not the operation itself, but the impact of task failure on users, business, compliance, and the organization.

| Level | Meaning | Examples |
| --- | --- | --- |
| `BI-L1` | Limited impact, easily correctable, no material effect on core business | Internal low-priority information aggregation |
| `BI-L2` | Impacts local processes, requires manual correction, or may affect user experience | Routine customer service assistance, internal process queries |
| `BI-L3` | May affect critical business, customer rights, compliance, financials, or production stability | Financial processing, medical assistance, production operations, critical customer matters |

`BI-L` is primarily used for test case coverage, metric thresholds, human review, and release requirements in Quality Tool-Agent.

`BI-L` is not equivalent to `OR-L`. A read-only query Tool may be `OR-L1`, but if used for a high-stakes decision, its task error could be `BI-L3`.

<a id="45-change-level-ch-l"></a>
## 4.5 Change Level: `CH-L`

`CH-L` describes the potential regression impact scope of a change, to determine the minimum depth of re-inspection, re-validation, and quality regression.

| Level | Meaning | Typical Changes |
| --- | --- | --- |
| `CH-L1` | Local, low-impact change | Copy, non-decision-affecting examples, low-risk format adjustments |
| `CH-L2` | Change affecting a single artifact or limited execution path | Prompt rules, Tool parameters, Skill trigger condition adjustments |
| `CH-L3` | Change affecting multiple artifacts, permissions, data flows, workflows, or critical behavioral paths | New Tool, high-risk operation modification, retrieval strategy adjustment |
| `CH-L4` | Systemic or infrastructure-level change | Model switch, Agent architecture adjustment, identity policy restructure, cross-Agent delegation change |

`CH-L` is Core's unified change semantic. Which specific `CH-L` levels require re-execution of which sub-specifications is governed by Chapter 8 and the regression requirements of each domain-specific specification.

<a id="46-inspect-defect-disposition-priority-p0p1p2"></a>
## 4.6 Inspect Defect Disposition Priority: `P0/P1/P2`

`P0/P1/P2` denotes only the **disposition priority of an Inspect Finding**. The specific defect levels and blocking rules remain governed by the corresponding Inspect sub-specification.

| Level | Meaning | Minimum Disposition Principle |
| --- | --- | --- |
| `P0` | Blocking Defect or unacceptable Static Risk | MUST be fixed. May only proceed under an Exception with explicit, time-limited, and compensating-control-backed approval, and only when the corresponding Inspect sub-specification and organizational risk policy explicitly permit exceptions. Undisposed P0 items SHALL NOT pass the corresponding Inspect Gate. |
| `P1` | Major Defect or medium-to-high risk issue | SHOULD be fixed before release. Where a reasonable exception exists, residual risk, disposition plan, approval, and expiration date MUST be documented. |
| `P2` | Improvement Item, low-priority issue, or limited-applicability issue | SHOULD be incorporated into an improvement plan or risk register. Whether it blocks release is determined by the domain-specific specification and business policy. |

`P0` is not equivalent to:

- Risk Explicit `S3`;
- Risk Implicit attack success status `A`;
- `OR-L3` or `BI-L3`;
- Highest business impact or highest legal risk.

These may be correlated, but they MUST be recorded separately.

<a id="47-risk-explicit-severity-level-s0s3"></a>
## 4.7 Risk Explicit Severity Level: `S0–S3`

`S0–S3` is the Exclusive Risk severity expression specific to Risk Explicit. Its definition, adjudication evidence, and Gate impact are governed by Risk Explicit.

Core stipulates:

1. `S0–S3` MUST NOT be used to re-grade `QD` items;
2. `S0–S3` MUST NOT substitute for Quality scores, success rates, or Business Impact Levels;
3. A single object may simultaneously have a `P0` Finding and an `S3` Explicit Risk, but both MUST retain independent evidence and independent adjudication rationales;
4. "Highest risk" in reports MUST specify its risk domain, e.g., "Highest Risk Explicit risk is `S3`."

<a id="48-risk-implicit-termination-status-abcd"></a>
## 4.8 Risk Implicit Termination Status: `A/B/C/D`

`A/B/C/D` records the Termination Status of a dynamic attack attempt and the corresponding responsibility boundary.

| Status | Meaning | Supportable Conclusion Boundary |
| --- | --- | --- |
| `A` | Attack succeeded, or target risk behavior was observed | Dynamic risk evidence exists for this test case, artifact version, environment, and preconditions |
| `B` | Blocked by external control or runtime guardrail | The external control is effective under this test case; does not automatically prove the Agent's own artifacts are safe |
| `C` | Agent / model refused or did not comply with attack directives | Target risk behavior was not observed in this test; does not automatically prove the absence of other bypass paths |
| `D` | Insufficient conditions, environment unavailable, dependencies missing, or result indeterminable | Does not constitute a security pass or fail conclusion; missing conditions MUST be documented |

`A/B/C/D` does not indicate severity, remediation priority, or quality level.

<a id="49-composite-risk-profile-expression"></a>
## 4.9 Composite Risk Profile Expression

For release, audit, or governance reports, different risk dimensions SHOULD be expressed side-by-side rather than compressed into a sourceless "aggregate risk level."

```yaml
risk_profile:
  agent_complexity: AC-L3
  operation_risk: OR-L3
  business_impact: BI-L2
  change_level: CH-L3
  highest_inspect_priority: P0
  highest_explicit_risk: S2
  implicit_validation_status: B
```

If an organization requires an aggregate risk score, a separate scoring model — with weights, applicability conditions, versioning, and review mechanisms — MUST be defined. The multiple grading dimensions in Core MUST NOT be mechanically summed or automatically converted into one another.

---

# Chapter 5: Unified Finding, Evidence, and Traceability Model

<a id="51-definition-of-a-finding"></a>
## 5.1 Definition of a Finding

A **Finding** is a traceable conclusion record produced against a specific object, version, environment, and rule or evaluation condition.

Findings may originate from:

- Inspect static inspection;
- Risk Explicit Explicit Risk Audit;
- Risk Implicit dynamic attack validation;
- Quality assessment;
- Human review, incident post-mortem, or runtime monitoring.

A Finding is not the rule itself, not a risk level in itself, and not equivalent to a final release decision.

<a id="52-minimum-finding-record"></a>
## 5.2 Minimum Finding Record

Every Finding eligible for entry into reports, Gates, Exception processes, regression, or audit scope MUST record at least the following fields:

```yaml
finding_id: F-<organization>-<unique-id>
finding_type: inspect | explicit_risk | implicit_validation | quality | review
status: open | confirmed | mitigated | accepted | closed | invalid

source:
  standard: ""
  standard_version: ""
  rule_id: ""
  rule_version: ""

subject:
  agent_id: ""
  artifact_type: ""
  artifact_id: ""
  artifact_version: ""
  dependency_versions: []

execution_context:
  environment: ""
  model_or_runtime_version: ""
  evaluator_or_tool_version: ""
  test_asset_or_baseline_version: ""
  executed_at: ""

determination:
  summary: ""
  severity_or_result: ""
  applicability: applicable | not_applicable | uncertain
  confidence: low | medium | high
  review_status: unreviewed | reviewed | validated | rejected | needs_more_evidence

evidence:
  - evidence_id: ""
    evidence_type: ""
    location_or_reference: ""
    excerpt_or_hash: ""
    collected_at: ""

links:
  related_findings: []
  related_qd: []
  related_ex: []
  related_as: []
  related_fm: []
  related_exception: []

ownership:
  owner: ""
  reviewer: ""
  due_date: ""
```

Implementations MAY add organization-specific fields, but MUST NOT remove key fields that enable locating the object, version, evidence source, and basis of determination.

<a id="53-finding-statuses"></a>
## 5.3 Finding Statuses

| Status | Meaning |
| --- | --- |
| `open` | Generated; not yet confirmed or disposed. |
| `confirmed` | Confirmed via the prescribed automated or human review process. |
| `mitigated` | Fix or Compensating Control implemented; awaiting or undergoing regression confirmation. |
| `accepted` | Valid Risk Acceptance or Exception approval obtained. |
| `closed` | Fix, regression, and closure conditions all satisfied. |
| `invalid` | Determined upon review to be a false positive, not applicable, or insufficiently evidenced to stand. |

`accepted` does not mean the risk has disappeared. `mitigated` does not mean the control has been dynamically validated. `closed` MUST retain historical evidence and the basis for closure.

<a id="54-evidence-tiers"></a>
## 5.4 Evidence Tiers

| Evidence Type | Typical Content | Conclusions It Can Support | Conclusions It Cannot Support Alone |
| --- | --- | --- | --- |
| Static Evidence | Prompt fragments, Skill definitions, Schema, configurations, rule hits | Static Defects, Explicit Risks, contract inconsistencies | Dynamic exploitability, production impact has occurred |
| Dynamic Evidence | Invocation traces, request parameters, returned results, logs, state changes | Attack results under specific test conditions, control interception, runtime behavior | Permanent safety across all scenarios |
| Quality Evidence | Test case inputs, actual outputs, scores, Judge results, metrics | Quality results under specified Baselines and versions | Complete security or sole root cause |
| Control Evidence | IAM policies, server-side validation, approval records, gateway rules, audit configurations | Control existence, control design and configuration state | Control effectiveness across all attack scenarios |
| Human Evidence | Review opinions, approvals, root-cause analyses, Exception decisions | Human confirmation, governance decisions, and responsibility attribution | Substitution for required technical or test evidence |

<a id="55-evidence-sufficiency-and-conclusion-strength"></a>
## 5.5 Evidence Sufficiency and Conclusion Strength

Conclusion strength MUST match the evidence type:

```text
Static Evidence
→ Can confirm "definition-layer defect or risk expression exists"

Dynamic Evidence
→ Can confirm "behavioral result observed under this environment, path, and precondition"

Quality Evidence
→ Can confirm "quality requirement met or not met under this evaluation set and threshold"

Control Evidence
→ Can confirm "control has been declared, configured, or deployed"

Multiple evidence types combined, with human review
→ Can support stronger judgments on root cause, fix effectiveness, or release decisions
```

No report SHALL use language exceeding the ceiling of the available evidence.

<a id="56-confidence-and-review-status"></a>
## 5.6 Confidence and Review Status

<a id="561-confidence"></a>
### 5.6.1 Confidence

| Confidence | Meaning |
| --- | --- |
| `low` | Automated determination, insufficient evidence fragments, heavy reliance on assumptions, or presence of significant alternative explanations. |
| `medium` | Evidence substantially complete, but lacking human confirmation, dynamic validation, or critical context. |
| `high` | Evidence sufficient, artifact and environment locatable, and reviewed or validated per the applicable process. |

Confidence describes the **credibility of the current determination**, not the severity of the risk.

<a id="562-review-status"></a>
### 5.6.2 Review Status

| Status | Meaning |
| --- | --- |
| `unreviewed` | The prescribed automated or human review has not yet been completed. |
| `reviewed` | Initial review completed. |
| `validated` | Further confirmed via applicable dynamic validation, quality assessment, or control testing. |
| `rejected` | Determined upon review to be unfounded, a false positive, or not applicable. |
| `needs_more_evidence` | Cannot confirm; requires supplementary version, environment, invocation chain, or test evidence. |

<a id="57-not-applicable-na"></a>
## 5.7 Not Applicable: `N/A`

`N/A` can only indicate that the applicability preconditions for the current inspection item are not satisfied. It MUST NOT be used as a means to evade inspection, lower the release bar, or substitute for an Exception process.

Each `N/A` determination MUST at minimum record:

```text
Rule or Inspection Item
+ Object and Version
+ Rationale for Non-Applicability
+ Applicability Assessor
+ Assessment Date
+ Re-evaluation Trigger Point upon Condition Change
```

If a determination cannot be made due to missing evidence, `uncertain` or `needs_more_evidence` SHALL be used. `N/A` MUST NOT be applied.

---

# Chapter 6: Conclusions, Gates, and Release Decision Boundaries

<a id="61-gate-independence"></a>
## 6.1 Gate Independence

The Gates of Inspect, Risk Explicit, Risk Implicit, and Quality serve independent purposes and rest on independent evidence foundations.

| Gate | Primary Basis | Question Answered |
| --- | --- | --- |
| Inspect Gate | `QD` Findings, severity levels, static evidence | Do artifact definitions contain Blocking Defects? |
| Risk Explicit Gate | `EX`, risk levels, explicit evidence | Do artifacts explicitly express dangerous objectives, dangerous rules, or dangerous configurations? |
| Risk Implicit Gate | Dynamic attack results, control status, environmental evidence | Can target risk behavior be triggered under controlled conditions? |
| Quality Gate | Test cases, metrics, thresholds, Baselines, and regression evidence | Does actual task quality meet requirements? |

The passing of any single Gate SHALL NOT automatically substitute for any other applicable Gate.

<a id="62-release-summary-status"></a>
## 6.2 Release Summary Status

Organizations, platforms, or final reports MAY use the following composite release statuses, while preserving the original conclusions:

| Composite Status | Meaning |
| --- | --- |
| `PASS` | All applicable mandatory Gates passed; no undisposed Blocking Defects exist. |
| `PASS_WITH_EXCEPTION` | An approved, traceable, unexpired Exception exists; residual risk, Compensating Controls, and responsible parties are clearly identified. |
| `FAIL` | Any undisposed and unacceptable blocking conclusion exists, or a mandatory Gate has not passed. |
| `NEEDS_REVIEW` | Unresolved conflicts exist in applicability, evidence, conclusions, or responsibilities, preventing a reliable release judgment. |
| `ERROR` | Artifacts, versions, environments, dependencies, evaluators, or inputs are incomplete, rendering inspection or assessment incapable of valid execution. |

This status is a **release summary wrapper**; it does not replace the original conclusions of any sub-specification.

For example:

```yaml
release_summary:
  status: NEEDS_REVIEW
  source_results:
    inspect_gate: PASS
    risk_explicit_gate: PASS
    risk_implicit_gate: NEEDS_REVIEW
    quality_tool_agent_gate: PASS
  exceptions:
    - EXC-20260719-003
```

<a id="63-minimum-evidence-requirements-for-release-conclusions"></a>
## 6.3 Minimum Evidence Requirements for Release Conclusions

A release summary MUST, at minimum, be able to answer:

1. Which Agent and Logic Artifact versions are included in this release;
2. Which sub-specifications are applicable, which were determined `N/A`, and the rationale;
3. Which rules, evaluators, Baselines, knowledge snapshots, and environments were used;
4. Which unclosed Findings exist, their severity, and their owners;
5. Whether any Exceptions exist, along with Compensating Controls, approvers, and expiration dates;
6. Which dynamic validations or quality regressions were not executed, failed, or had insufficient evidence;
7. The final release decision-maker and decision time.

<a id="64-constraints-on-pass_with_exception"></a>
## 6.4 Constraints on `PASS_WITH_EXCEPTION`

`PASS_WITH_EXCEPTION` MAY only be used when all of the following conditions are simultaneously met:

- The Exception has a unique `EXC-*` identifier;
- The corresponding Finding, artifact version, residual risk, and business justification are traceable;
- Compensating Controls have been assessed and documented;
- The Exception has a clearly identified approver, expiration date, and review trigger conditions;
- No legal, regulatory, contractual, or organizationally non-waivable security requirements are violated;
- Dynamic attack success, major quality failures, or incomplete mandatory validations have not been simply converted into Exceptions to bypass disposition.

Whether P0, S3, or dynamic attack success can be accepted as an Exception SHALL be separately governed by the organization's risk policy and the corresponding sub-specification. Core does not confer automatic exemption eligibility.

<a id="65-conflicts-and-insufficient-evidence"></a>
## 6.5 Conflicts and Insufficient Evidence

When different sub-specifications or different evidence sources produce superficially contradictory conclusions:

1. **Preserve original conclusions.** Do not overwrite one result with another.
2. **Verify that the object, version, environment, and test preconditions are consistent.**
3. **Identify differences in conclusion domains.** For example, Static Defects, dynamic exploitability, and quality performance are not the same judgment.
4. **Establish linked Findings or root-cause investigation records.**
5. Until conflicts are resolved, the composite status SHALL be `NEEDS_REVIEW`, unless a domain-specific specification or organizational policy stipulates a stricter blocking requirement.

Example:

```text
Inspect hits QD-T-3.2 (Raw Input Passthrough)
+ Risk Implicit yields B (external interception) in the current gateway environment
```

This indicates:

- The Static Defect SHALL still be disposed per Inspect rules;
- The gateway provided external protection evidence for the current attack test case;
- The QD MUST NOT be deleted on this basis, nor the Agent's own artifacts declared free of risk;
- Whether release can proceed depends on the corresponding Gates, Compensating Controls, business risk, and Exception policy.

<a id="66-precedence-in-sub-specification-conflicts"></a>
## 6.6 Precedence in Sub-Specification Conflicts

When a conflict in expression exists between Core and a domain-specific sub-specification:

1. For domain-specific rules, thresholds, scoring, defect definitions, and Gates: the domain-specific sub-specification governs.
2. For terminology, object identification, version evidence, conclusion boundaries, and summary expression: Core governs.
3. For conflicts that cannot be clearly classified: register as a consistency migration item and adjudicate via the specification maintenance process.
4. Prior to adjudication, the historical adjudication results of existing rules MUST NOT be silently altered by an interpretation of Core.

---

# Chapter 7: Cross-Subset Integration and Causal Boundaries

<a id="71-standard-integration-closed-loop"></a>
## 7.1 Standard Integration Closed Loop

The sub-specifications of SanityOps SHALL form the following closed loop:

```text
Logic Artifacts and Their Versions
    ↓
Inspect: Discover Static Defects (QD)
    ↓
Relevance: Map candidate Attack Surfaces, Failure Modes, test and remediation directions
    ↓
Risk: Confirm Explicit Risks or dynamic behavioral evidence under controlled conditions
    ↓
Quality: Assess actual task, output, and service quality
    ↓
Human Review: Judge root cause, control effectiveness, remediation scope, and residual risk
    ↓
Fix, Re-Inspect, Regress, Release, or Exception Decision
```

This closed loop is designed to establish traceable **candidate associations and validation paths** — not to automatically derive a definitive conclusion in one sub-specification from the result of another.

<a id="72-scope-of-relevance"></a>
## 7.2 Scope of Relevance

Relevance connects Inspect, Risk, and Quality, but its mapping conclusions constitute risk associations and validation recommendations.

Relevance can support:

- Deriving candidate Attack Surfaces (`AS`) from `QD` items;
- Recommending Risk Explicit audit directions from `QD` items;
- Recommending Risk Implicit attack validation directions from `QD` items;
- Deriving candidate quality Failure Modes (`FM`) from `QD` items;
- Identifying Security Defect Chains (`SC-*`) that may jointly amplify risk;
- Identifying Quality Chains (`QC-TA-*`, `QC-RA-*`) that may jointly affect task or content quality;
- Recommending the validation and regression scope to be executed after remediation.

Relevance MUST NOT be used alone to support:

- Claiming a `QD` as a successfully exploited vulnerability;
- Claiming an `AS` as a confirmed security incident;
- Claiming an `FM` as a confirmed quality root cause;
- Directly converting an association mapping into a Risk or Quality FAIL;
- Treating a Defect Chain as a confirmed complete attack chain or failure chain.

<a id="73-prohibited-inferences"></a>
## 7.3 Prohibited Inferences

The following inferences are prohibited:

| Invalid Inference | Correct Expression |
| --- | --- |
| "A QD hit means a vulnerability exists." | "A QD hit indicates a Static Defect exists, which may form a corresponding Attack Surface." |
| "An EX hit means the attack has already succeeded." | "An EX hit indicates the artifact contains an Explicit Risk expression requiring audit." |
| "Risk B means the Agent is safe." | "An external control intercepted under the current environment and test case." |
| "Quality FAIL means the Prompt is the root cause." | "Quality FAIL may trigger a candidate root-cause investigation of the Prompt and associated artifacts." |
| "A control is configured, therefore it is effective." | "Control configuration proves the control exists; effectiveness still requires applicable test or runtime evidence." |
| "One regression pass means the risk is permanently eliminated." | "No related issues were observed within the scope of the current version, environment, test cases, and evidence." |

<a id="74-finding-association-types"></a>
## 7.4 Finding Association Types

Cross-subset Finding associations SHALL be annotated with a relationship type. Bare links that imply causation are not sufficient.

| Relationship Type | Meaning |
| --- | --- |
| `maps_to` | A rule or Finding maps to a candidate Attack Surface, Failure Mode, or test direction. |
| `suggests_validation` | Recommends executing a specific Risk or Quality validation. |
| `correlates_with` | Correlated across the same object, version, environment, or test case, but causation is not confirmed. |
| `candidate_root_cause_for` | Identified as a Candidate Root Cause for a problem, pending confirmation. |
| `confirmed_root_cause_for` | Root cause confirmed through sufficient technical and human evidence. |
| `mitigates` | A control or fix is designed to reduce the risk of a specific Finding. |
| `validated_mitigation_for` | Control or fix has been confirmed effective through applicable validation. |
| `supersedes` | A Finding is superseded by a subsequent Finding due to artifact version or rule changes. |
| `duplicates` | Two Findings are confirmed to be duplicate records of the same issue. |

<a id="75-single-defects-defect-chains-and-common-cause-issues"></a>
## 7.5 Single Defects, Defect Chains, and Common-Cause Issues

<a id="751-single-defects"></a>
### 7.5.1 Single Defects

When an issue is independently identified by a single rule in a single specific artifact, and there is insufficient evidence of a cross-artifact amplification relationship, it SHALL be retained as an independent Finding.

<a id="752-defect-chains"></a>
### 7.5.2 Defect Chains

When multiple defects are mutually dependent within the same execution path, jointly amplify risk, or may form a risk path, a Defect Chain MAY be established.

Establishing a Defect Chain requires at minimum:

```text
Chain Identifier
+ Associated Findings
+ Involved Artifacts and Versions
+ Connection Relationships
+ Potential Security or Quality Consequences
+ Evidence Level
+ Validation Status
+ Remediation Priority Order
```

A Defect Chain is not a replacement for its member Findings. Each member Finding SHALL still independently retain its rule, evidence, and disposition status.

<a id="753-common-cause-issues"></a>
### 7.5.3 Common-Cause Issues

When multiple Findings, upon analysis, may stem from the same design, configuration, process, or organizational cause, a "common-cause candidate" MAY be established.

For example:

```text
Multiple Tools simultaneously lack input boundaries
→ Candidate common cause: Tool Schema design template does not require input trust boundary declarations
```

Prior to root-cause confirmation, `candidate_root_cause_for` SHALL be used. Original Findings MUST NOT be directly closed or merged.

<a id="76-remediation-and-regression-integration-principles"></a>
## 7.6 Remediation and Regression Integration Principles

When remediating a Finding, the impact on associated objects SHALL be assessed:

| Remediation Location | Minimum Integration Scope to Assess |
| --- | --- |
| Prompt | Prompt itself, associated Skills, output constraints, Quality regression |
| Skill | Trigger conditions, permissions, failure strategies, associated Tools, Cross inspection |
| Tool / Schema | Parameter contracts, backend implementation, permissions, approval, callers, dynamic validation |
| Knowledge / Retrieval | Knowledge snapshots, citation quality, RAG evaluation, and contamination risk validation |
| Workflow / State | Routing, state transitions, retries, recovery, cross-artifact invocation chains |
| Identity / Policy | Roles, tenants, least privilege, approval, audit, and associated Tools |
| Runtime / Guardrail | External interception effectiveness, degradation paths, whether the Agent's own defects persist |

Remediation SHALL follow the **principle of least-risk remediation**: prioritize constraints at locations that can be reliably enforced, have clearly defined impact scope, and are auditable and verifiable. Prompt text supplementation SHALL NOT substitute for backend controls on high-risk operations.

---

# Chapter 8: Versioning, Change, Baseline, and Compatibility

<a id="81-version-objects-must-be-separated"></a>
## 8.1 Version Objects Must Be Separated

SanityOps requires at minimum the following version objects to be distinguished:

| Version Type | Example | Description |
| --- | --- | --- |
| Specification Version | `Inspect Tool v1.0` | The document version defining rules, terminology, and adjudication requirements. |
| Rule or Mapping Library Version | `relevance-map-1.0.0` | Machine-executable rule, detector, mapping, or template versions. |
| Artifact Version | Git commit, immutable hash, release package version | The version of the Logic Artifact being inspected, validated, or assessed. |
| Runtime Version | Model version, Agent Runtime, framework, Connector version | The runtime environment version influencing actual behavior. |
| Evaluation Asset Version | Test case set, Judge Prompt, scorer, threshold configuration version | The evaluation assets underpinning Quality or Risk. |
| Data Snapshot Version | Knowledge base, index, memory data, policy data snapshot | The data version influencing retrieval, decision, and permission outcomes. |

A single "version number" MUST NOT be used to vaguely represent all of the above.

<a id="82-definition-of-a-baseline"></a>
## 8.2 Definition of a Baseline

A **Baseline** is a confirmed, reproducible, comparable, versioned result snapshot used to identify quality degradation, validation differences, control changes, or rule changes.

A valid Baseline requires at minimum:

```text
Object and Artifact Version
+ Runtime Environment and Model Version
+ Knowledge or Data Snapshot
+ Rule, Evaluator, and Test Asset Versions
+ Original Results and Summary Conclusions
+ Generation Timestamp
+ Review or Confirmation Status
```

Historical results that lack records of critical environment or asset versions MAY serve as references, but SHALL NOT serve as strict regression Baselines.

<a id="83-change-level-determination"></a>
## 8.3 Change Level Determination

Changes SHALL be assigned a `CH-L` based on the affected objects, behavioral boundaries, data flows, permissions, and external dependencies. The determination SHALL NOT be based solely on the number of changed files or the size of textual diffs.

The following circumstances are typically at least `CH-L3`:

- Adding, replacing, or removing a high-risk Tool;
- Expanding Tool permissions, data scope, tenant scope, or data exfiltration capability;
- Modifying approval, confirmation, IAM, policy, or audit chains;
- Modifying retrieval strategy, knowledge source scope, or memory write policy;
- Modifying critical business processes, state machines, routing, or delegation rules;
- Modifying the model, structured output mode, context assembly, or system-level Prompt;
- Modifying external Connectors, MCP Servers, Webhooks, or Callbacks.

<a id="84-minimum-re-inspection-and-regression-principles"></a>
## 8.4 Minimum Re-Inspection and Regression Principles

| Change Level | Minimum Requirement |
| --- | --- |
| `CH-L1` | Assess applicable localized Inspect; where user-visible output is affected, execute relevant Quality smoke checks. |
| `CH-L2` | Re-run Inspect, Cross inspection, and relevant Quality regression for affected artifacts; decide whether to supplement Risk based on risk assessment. |
| `CH-L3` | Re-run Inspect, Cross, applicable Risk, and Quality regression for affected artifacts and dependency paths; review related Exceptions and Baselines. |
| `CH-L4` | Re-perform system-level applicability assessment; execute the full, or an approved tailored, Inspect, Risk, and Quality suite; rebuild or re-confirm Baselines. |

The above are minimum principles. Where `OR-L`, `BI-L`, regulatory requirements, or organizational policy are higher, the more stringent requirement SHALL apply.

<a id="85-rule-or-evaluator-changes"></a>
## 8.5 Rule or Evaluator Changes

Changes to rule libraries, mapping libraries, detectors, Judge Prompts, scorers, thresholds, or test assets may alter the comparability of historical conclusions.

When such changes occur, the following SHALL be documented:

```text
Changed Object and Version
+ Reason for Change
+ Expected Impact on Rules, Findings, or Metrics
+ Whether Historical Baselines Need Re-Running
+ Result Comparability Statement
+ Effective Date and Rollback Method
```

The following circumstances typically require re-evaluation of affected objects:

- Addition or adjustment of P0 rules;
- Fixing systematic false negatives or false positives in detectors;
- Changing Quality Gate thresholds;
- Changing core evaluation test cases, Judges, or scoring logic;
- Changing attack test payloads, success criteria, or control attribution logic;
- Changing impact strength or recommended validation paths in Relevance mappings.

<a id="86-compatibility-principles"></a>
## 8.6 Compatibility Principles

Compatibility relationships SHALL be maintained between sub-specifications, rule libraries, tool implementations, and report templates.

| Situation | Compatibility Handling |
| --- | --- |
| Only non-breaking fields, aliases, or clarifications added | Backward compatibility MAY be maintained. |
| Formal terminology changed but historical mapping preserved | Alias cross-reference and migration notes SHALL be provided. |
| Rule semantics, scoring, thresholds, or Gates modified | Treated as a substantive change; incompatible scope SHALL be identified. |
| Rule or identifier deprecated | Identifier MUST NOT be reused; deprecation note, replacement rule, and historical result interpretation SHALL be preserved. |
| New tool version cannot interpret old results | Incompatibility SHALL be explicitly declared; re-run recommendations or conversion tools SHALL be provided. |

<a id="87-document-dependencies-and-applicable-versions"></a>
## 8.7 Document Dependencies and Applicable Versions

Each SanityOps sub-specification SHALL declare in its document information or appendix:

```text
Dependent Core Version
+ Dependent Other Specification Versions
+ Corresponding Rule / Mapping Library Version
+ Whether Known Incompatibilities Exist
```

Before a complete compatibility matrix is established, reports SHALL at minimum record the actual versions of each specification used. A bare "conforms to SanityOps" statement is not sufficient.

---

# Chapter 9: Governance Roles, Remediation, and Exceptions

<a id="91-minimum-role-model"></a>
## 9.1 Minimum Role Model

Organizations MAY merge roles according to their scale, but MUST NOT eliminate separation of duties, approval traceability, or review requirements.

| Role | Core Responsibilities |
| --- | --- |
| Artifact Owner | Maintains Prompt, Skill, Tool, Workflow, Knowledge, and other artifacts; implements fixes and provides version evidence. |
| Agent / Application Owner | Responsible for the Agent's business objectives, architecture, dependencies, release scope, and lifecycle. |
| Security Owner | Reviews security risks, control design, dynamic validation, Compensating Controls, and residual risk. |
| Quality Owner | Maintains quality test cases, Baselines, thresholds, regression, and quality conclusions. |
| Business Owner | Confirms business impact, acceptable risk, human handoff, and business continuity requirements. |
| Release Owner | Makes the release decision after confirming applicable Gates, Findings, Exceptions, and release summary status. |
| Exception Approver | Approves, rejects, renews, or revokes Risk Acceptances within authorized scope. |
| Specification / Platform Owner | Maintains rules, mappings, tool versions, audit records, and compatibility information. |

A single person MAY hold multiple roles. However, for high-risk changes, P0, S3, dynamic attack success, or high-business-impact scenarios, the Artifact Owner and Exception Approver SHALL NOT be the same person.

<a id="92-remediation-responsibility-and-closed-loop"></a>
## 9.2 Remediation Responsibility and Closed Loop

Every confirmed Finding MUST have at minimum:

```text
Owner
+ Disposition Path
+ Target Version or Completion Date
+ Fix or Compensating Control Description
+ Re-Inspection / Regression Requirements
+ Closure Criteria
```

Typical disposition paths include:

| Disposition | Applicable Circumstances |
| --- | --- |
| `fix` | Modify the artifact, backend implementation, policy, or configuration to eliminate the root cause. |
| `mitigate` | Add an auditable Compensating Control when the root cause cannot be immediately eliminated. |
| `accept` | Accept residual risk within authorized scope and time limits. |
| `defer` | Non-blocking issue enters an explicit version plan; MUST NOT be used to bypass risks requiring immediate disposition. |
| `invalidate` | Confirmed upon review to be a false positive, not applicable, or insufficiently evidenced. |

After remediation is complete, a Finding SHALL NOT be closed based solely on code or configuration changes. Re-inspection, regression, or dynamic validation commensurate with the risk and Change Level MUST be executed.

<a id="93-exceptions-and-risk-acceptance"></a>
## 9.3 Exceptions and Risk Acceptance

An Exception is a **time-limited and traceable** Risk Acceptance for a specific Finding or requirement. It is not a permanent exemption.

Each Exception requires at minimum:

```yaml
exception_id: EXC-<organization>-<unique-id>
status: proposed | approved | rejected | expired | revoked | closed

scope:
  finding_ids: []
  rule_ids: []
  agent_id: ""
  artifact_versions: []
  environment: ""

risk:
  original_determination: ""
  residual_risk: ""
  business_justification: ""

controls:
  compensating_controls: []
  validation_evidence: []
  monitoring_requirements: []

governance:
  requested_by: ""
  reviewed_by: ""
  approved_by: ""
  approved_at: ""
  effective_from: ""
  expires_at: ""
  review_trigger: []

closure:
  remediation_plan: ""
  revalidation_requirement: ""
  closure_evidence: []
```

<a id="94-minimum-conditions-for-exception-approval"></a>
## 9.4 Minimum Conditions for Exception Approval

An Exception MUST simultaneously satisfy:

1. Scope is clearly bounded to the Agent, artifact version, environment, and associated Findings;
2. Original risk and residual risk are documented;
3. The business or technical reason why immediate remediation is not possible is stated;
4. Feasible Compensating Controls and their limitations have been identified;
5. Owner, approver, expiration date, and early review trigger conditions are clearly defined;
6. A remediation plan and post-expiration re-validation requirements are defined;
7. No legal, regulatory, contractual, data protection, or organizationally non-waivable requirements are violated.

The following SHALL NOT be treated as "default exceptions":

- Object or version cannot be located;
- Minimum evidence is not available;
- Exception has no expiration date;
- Exception lacks authorized approval;
- Repeated renewal substitutes for a remediation plan;
- A bare Prompt declaration substitutes for executable controls required for high-risk operations.

<a id="95-exception-review-expiry-and-revocation"></a>
## 9.5 Exception Review, Expiry, and Revocation

An Exception MUST be reviewed, and SHALL automatically become invalid if necessary, when any of the following occurs:

- A substantive change to the associated artifact, model, Tool, permissions, knowledge source, or runtime environment;
- A related security incident, quality incident, customer complaint, or audit finding;
- A Compensating Control fails, is bypassed, or evidence cannot be obtained;
- `expires_at` is reached;
- Rules, regulatory requirements, or organizational risk policies change;
- A `CH-L3` or `CH-L4` change affects the original Exception scope.

Upon expiry or revocation, the associated release status SHALL NOT continue to use `PASS_WITH_EXCEPTION` unless re-approved.

<a id="96-risk-acceptance-and-release-responsibility-boundaries"></a>
## 9.6 Risk Acceptance and Release Responsibility Boundaries

Risk Acceptance does not alter the factual Finding, nor does it reduce its original severity.

```text
P0 Finding + Approved Exception
≠ P0 disappears

S3 Explicit Risk + Approved Exception
≠ S3 is automatically downgraded

Dynamic attack success + Temporary Compensating Control
≠ The attack path has been permanently eliminated
```

Risk Acceptance only represents that an authorized entity accepts the residual risk within the specified scope, duration, and Compensating Control conditions. The Release Owner remains responsible for making an independent release decision based on the applicable Gates, business impact, control evidence, and Exception status.

---

# Chapter 10: Implementation Maturity and Extension Roadmap

<a id="101-implementation-principles"></a>
## 10.1 Implementation Principles

SanityOps MAY be adopted in phases. Organizations are not required to implement all capabilities at once in the initial phase, but they SHOULD:

- Clearly state the scope of specifications currently adopted;
- Document unadopted capabilities and their risk boundaries;
- Prioritize more complete controls for high `OR-L`, high `BI-L`, or high `CH-L` scenarios;
- Avoid representing "not yet built" as "passed" or "not applicable."

<a id="102-implementation-phases"></a>
## 10.2 Implementation Phases

| Phase | Objective | Minimum Capabilities |
| --- | --- | --- |
| Foundation Governance | Make Logic Artifacts visible and locatable | Artifact inventory, versioning, ownership, basic Inspect, Finding ledger |
| Verifiable | Make critical risk and quality results reproducible | Risk controlled environment, Quality test cases, Baselines, regression records |
| Governable | Make release and risk decisions auditable | Unified Findings, Gate summaries, Exceptions, approvals, and evidence retention |
| Sustainable Operations | Close the loop between change and production feedback | Change tiering, continuous regression, runtime monitoring, incident review, rule calibration |
| Scalable Governance | Cover complex enterprise Agent architectures | Knowledge, Workflow, Memory, Identity, A2A, Connector specialized specifications and controls |

These phases are for construction guidance. They do not constitute an organizational maturity rating, certification level, or compliance statement.

<a id="103-future-specialized-specification-extension-order"></a>
## 10.3 Future Specialized Specification Extension Order

Subsequent Inspect or governance specifications are recommended to extend in the following order:

```text
Inspect RAG / Knowledge Contract
→ Inspect Workflow / State
→ Inspect Memory
→ Inspect Identity & Policy
→ Inspect A2A / MCP / Connector
→ Runtime Monitoring, Production Audit, and Incident Review
```

The priority is based on: the prevalence of the object in enterprise Agents, its impact on quality and security, its dependency relationship with the existing Prompt–Skill–Tool system, and implementability.

<a id="104-current-coverage-statement"></a>
## 10.4 Current Coverage Statement

All external materials, product interfaces, or evaluation reports SHALL accurately describe SanityOps' current coverage status:

- Objects with existing dedicated specification coverage MAY be declared as inspected, validated, or assessed per the corresponding specification;
- Objects without dedicated specification coverage MAY only be declared as incorporated into the unified object, version, and evidence model;
- The fact that an object is defined in Core does NOT justify a claim that the object has been fully inspected or certified by SanityOps.

---

# Appendix A: Core Terminology Quick Reference

| Term | Definition |
| --- | --- |
| Agent | An application entity that uses a model to process input and may generate content, invoke tools, or execute tasks. |
| Logic Artifact | A versioned asset that defines, constrains, guides, invokes, orchestrates, authorizes, remembers, retrieves, or evaluates Agent behavior. |
| Inspect | The specification domain for Static Defect Inspection of Logic Artifacts and their cross-artifact relationships. |
| Risk Explicit | The specification domain for auditing Explicit Risk expressions, objectives, or configurations within Logic Artifacts. |
| Risk Implicit | The specification domain for validating dynamic attack paths, risk behaviors, or control interception under controlled conditions. |
| Quality | The specification domain for assessing task, output, or service quality, threshold adjudication, and regression analysis. |
| Relevance | The specification linking Inspect, Risk, and Quality through defect impact mapping and cross-subset integration. |
| `QD` | A Static Logic Artifact Defect defined by Inspect rules. |
| `EX` | An Explicit Risk expression or dangerous configuration classification defined in Risk Explicit. |
| `AS` | A candidate Attack Surface defined by Relevance. |
| `FM` | A candidate behavioral Failure Mode defined by Relevance. |
| Finding | An instantiated discovery record produced against a specific object, version, environment, and rule. |
| Control | A technical or administrative measure for preventing, limiting, detecting, intercepting, auditing, or recovering from risk behaviors. |
| Baseline | A confirmed, reproducible, comparable result snapshot. |
| Regression | Comparative validation of a changed object against an established Baseline or expected result. |
| Gate | An independent adjudication mechanism for whether a specific rule domain or evaluation domain meets entry criteria. |
| Exception | An approved, traceable, time-limited Risk Acceptance or rule exception. |
| Compensating Control | An alternative or supplementary control for reducing residual risk when the root cause cannot be immediately eliminated. |
| Candidate Root Cause | A possible root cause with associated evidence, but not yet sufficiently confirmed. |

---

# Appendix B: Status, Level, and Grading Model Quick Reference

<a id="b1-grading-models"></a>
## B.1 Grading Models

| Code | Meaning | What It Does NOT Indicate |
| --- | --- | --- |
| `AC-L` | Agent structural and collaboration complexity | Business impact or vulnerability severity |
| `OR-L` | Operational permission, side effect, and data risk | Agent technical complexity |
| `BI-L` | Business consequences of task error | Tool operational permission risk |
| `CH-L` | Change impact and regression scope | Current inherent system risk |

<a id="b2-conclusions-and-disposition-levels"></a>
## B.2 Conclusions and Disposition Levels

| Status / Level | Domain | Meaning |
| --- | --- | --- |
| `P0/P1/P2` | Inspect | Static Finding disposition priority |
| `S0–S3` | Risk Explicit | Explicit Risk severity level |
| `A/B/C/D` | Risk Implicit | Dynamic attack test Termination Status |
| `PASS` | Release Summary | All applicable mandatory Gates passed |
| `PASS_WITH_EXCEPTION` | Release Summary | Valid, approved Exception exists |
| `FAIL` | Release Summary | Unacceptable blocking conclusion exists or mandatory Gate failed |
| `NEEDS_REVIEW` | Release Summary | Unresolved conflict in evidence, applicability, or conclusions |
| `ERROR` | Release Summary | Inspection or assessment conditions incomplete, unexecutable, or invalid |

<a id="b3-finding-lifecycle-statuses"></a>
## B.3 Finding Lifecycle Statuses

```text
open
  → confirmed
  → mitigated
  → closed

open / confirmed
  → accepted

open / confirmed
  → invalid
```

An `accepted` Finding continues to exist; its risk is accepted only within the approved scope and duration.

---

# Appendix C: Unified Record Templates

<a id="c1-finding-record"></a>
## C.1 Finding Record

```yaml
finding_id: F-ORG-20260719-0001
finding_type: inspect
status: open

source:
  standard: Inspect Tool
  standard_version: "v1.0"
  rule_id: QD-T-3.2
  rule_version: "2.4.0"

subject:
  agent_id: agent-payment-ops
  artifact_type: tool_schema
  artifact_id: refund.execute
  artifact_version: "sha256:..."
  dependency_versions:
    - prompt: "sha256:..."
    - skill: "sha256:..."

execution_context:
  environment: staging
  model_or_runtime_version: "..."
  evaluator_or_tool_version: "..."
  test_asset_or_baseline_version: "..."
  executed_at: "2026-07-19T10:00:00Z"

determination:
  summary: "Refund amount parameter lacks enforceable server-side boundary constraints."
  severity_or_result: P0
  applicability: applicable
  confidence: high
  review_status: reviewed

evidence:
  - evidence_id: EV-001
    evidence_type: static_artifact
    location_or_reference: "refund.execute.parameters.amount"
    excerpt_or_hash: "..."
    collected_at: "2026-07-19T10:00:00Z"

links:
  related_findings: []
  related_qd: ["QD-T-3.2"]
  related_ex: []
  related_as: ["AS-..."]
  related_fm: []
  related_exception: []

ownership:
  owner: "payment-platform-team"
  reviewer: "security-reviewer"
  due_date: "2026-07-26"
```

<a id="c2-evidence-record"></a>
## C.2 Evidence Record

```yaml
evidence_id: EV-001
evidence_type: static_artifact | dynamic_trace | quality_result | control_configuration | human_review
subject_reference:
  agent_id: ""
  artifact_id: ""
  artifact_version: ""
environment: ""
collected_at: ""
collector: ""
integrity:
  source_uri: ""
  content_hash: ""
  retention_reference: ""
summary: ""
```

<a id="c3-exception-record"></a>
## C.3 Exception Record

```yaml
exception_id: EXC-ORG-20260719-0003
status: approved

scope:
  finding_ids: ["F-ORG-20260719-0001"]
  rule_ids: ["QD-T-3.2"]
  agent_id: "agent-payment-ops"
  artifact_versions: ["sha256:..."]
  environment: "production"

risk:
  original_determination: "P0: Insufficient parameter boundary constraints"
  residual_risk: "Excess refund risk under specific anomalous invocation paths"
  business_justification: "Emergency fix window constrained"

controls:
  compensating_controls:
    - "Server-side refund cap validation"
    - "Dual approval"
    - "Refund audit alerting"
  validation_evidence:
    - "EV-..."
  monitoring_requirements:
    - "Daily anomalous refund monitoring"

governance:
  requested_by: ""
  reviewed_by: ""
  approved_by: ""
  approved_at: ""
  effective_from: ""
  expires_at: ""
  review_trigger:
    - "Tool or approval policy change"
    - "Anomalous refund event"

closure:
  remediation_plan: "v1.8 unifies Schema and server-side contract"
  revalidation_requirement: "Re-run Inspect Tool and Risk Implicit"
  closure_evidence: []
```

---

# Appendix D: Document Dependency and Compatibility Matrix

> This table expresses the logical dependencies established by Core. It does not replace the precise version compatibility matrices maintained by each sub-specification going forward.

| Sub-Specification | Primary Core Content Dependency | Key Relationships with Other Specifications |
| --- | --- | --- |
| Inspect Prompt | Objects, Findings, `AC-L`, versioning and evidence | Outputs `QD-P-*` to Relevance |
| Inspect Skill | Objects, Findings, `OR-L`, versioning and evidence | Outputs `QD-S-*` to Relevance |
| Inspect Tool | Objects, Findings, `OR-L`, versioning and evidence | Outputs `QD-T-*` to Relevance; strong association with Risk / Quality |
| Inspect Cross | Object relationships, `AC-L`, versioning and evidence | Handles Prompt–Skill–Tool contract and boundary issues |
| Inspect Permission | Objects, Findings, `OR-L`, `AC-L`, versioning and evidence | Outputs `QD-PM-*` to Relevance; subject to Gate-0 preconditions |
| Risk Explicit | `S0–S3`, Findings, evidence boundaries | May reference Inspect / Relevance risk signals |
| Risk Implicit | `A/B/C/D`, dynamic evidence, control boundaries | Consumes Inspect / Relevance validation recommendations; outputs dynamic validation evidence |
| Quality Tool-Agent | `BI-L`, Baselines, quality evidence | May associate with `FM-*` and Candidate Root Causes |
| Quality RAG-Agent | `CH-L`, Baselines, quality evidence | Depends on knowledge snapshots, evaluation assets, and change traceability |
| Relevance | Unified numbering, association types, causal boundaries | Connects Inspect, Risk, and Quality |
| Control Assurance Standard (planned; name and numbering not yet frozen) | Control, Evidence, Exception, dynamic validation | Will define `CA-*` enforceability levels |

---

# Appendix E: Existing Specification Consistency Migration Checklist

This appendix guides patch-version revisions of existing documents. Except where explicitly marked as "requires rule adjudication," none of these items alter the existing rule definitions themselves.

| ID | Migration Item | Documents Involved | Recommended Handling | Type |
| --- | --- | --- | --- | --- |
| `MIG-01` | `L1/L2/L3` carries multiple meanings | Inspect, Quality documents | Add `AC-L`, `OR-L`, `BI-L`, or `CH-L` prefix on first occurrence; retain legacy expression mapping notes | Terminology unification |
| `MIG-02` | `Risk IM` and `Risk Implicit` coexist | Risk, Relevance, reference documents | Unify formal name as `Risk Implicit`; retain historical abbreviation notes | Naming unification |
| `MIG-03` | `Risk EX` and `Risk Explicit` coexist | Risk, Relevance, reference documents | Unify formal name as `Risk Explicit` | Naming unification |
| `MIG-04` | Inspect Cross capitalization and abbreviation not fully consistent | Inspect Cross, Relevance | Unify as `Inspect Cross` | Naming unification |
| `MIG-05` | Quality failures may be described as "caused by" a Static Defect | Quality, Relevance | Change to "candidate root cause," "associated Failure Mode," or "recommended investigation direction"; use confirmed root cause only when sufficient evidence exists | Causal boundary |
| `MIG-06` | Tool-Agent and RAG-Agent quality models not fully consistent | Quality Tool-Agent, Quality RAG-Agent | Core retains two independent models; cross-documents MUST NOT imply a shared metric system | Scope clarification |
| `MIG-07` | Artifact, rule, evaluator, and Baseline version recording granularity inconsistent | All documents | Reference Core Chapter 8; supplement minimum version field requirements | Evidence unification |
| `MIG-08` | `PASS/FAIL/ERROR` may be used at different levels | All documents | Clarify the relationship between original Gate conclusions and release summary status; MUST NOT substitute one for another | Status unification |
| `MIG-09` | External interception may be misread as Agent's own security | Risk Implicit, Relevance | Add cross-reference that "B only proves external control intercepted in the current test case" | Conclusion boundary |
| `MIG-10` | `QD`, `EX`, `AS`, `FM` and Finding instances may be conflated | Inspect, Risk, Quality, Relevance | Supplement "rule definition vs. Finding instance" explanation | Object unification |
| `MIG-11` | Exception, remediation, regression, and Risk Acceptance fields scattered | Relevance, Quality, Risk | Subsequently reference Core's Exception minimum record model uniformly | Governance unification |
| `MIG-12` | Knowledge, Memory, Workflow, and other objects may have descriptions but no dedicated rules | All documents | Mark as extension objects; MUST NOT be represented as fully covered | Coverage boundary |
| `MIG-13` | Historical framework quantity or tier expressions such as "Six Subsets" may be outdated | Framework descriptions, overview materials | Unify to current specification register; express by capability domain rather than simple count | Framework narrative |
| `MIG-14` | Evidence levels for Defect Chains, Attack Chains, and Quality Chains may not be unified | Relevance | Adopt association types and candidate causal boundaries; do not automatically upgrade mappings to facts | Evidence unification |
| `MIG-15` | `P0/P1/P2` and `S0–S3` may be misread as the same risk scale | Inspect, Risk, Relevance, report templates | Add level applicability domain descriptions; identify full prefix in reports | Risk semantics |
| `MIG-16` | `N/A` rationale and review conditions not unified | All documents and tool implementations | Adopt Core Section 5.7 minimum requirements | Applicability governance |

---

# Appendix F: Cross-Subset Release Report Example

```yaml
sanityops_release_report:
  report_id: SRR-ORG-20260719-001
  generated_at: "2026-07-19T12:00:00Z"

  subject:
    agent_id: "customer-service-agent"
    release_version: "2026.07.19-rc1"
    environment: "staging"

  profile:
    agent_complexity: AC-L3
    operation_risk: OR-L2
    business_impact: BI-L2
    change_level: CH-L3

  artifacts:
    - artifact_type: system_prompt
      artifact_id: "customer-service-main"
      version: "sha256:..."
    - artifact_type: skill
      artifact_id: "order-refund"
      version: "sha256:..."
    - artifact_type: tool_schema
      artifact_id: "refund.query"
      version: "sha256:..."

  applicability:
    inspect_prompt: applicable
    inspect_skill: applicable
    inspect_tool: applicable
    inspect_cross: applicable
    risk_explicit: applicable
    risk_implicit: applicable
    quality_tool_agent: applicable
    quality_rag_agent: not_applicable
    quality_rag_agent_reason: "Current version does not use retrieval-augmented pipeline"

  source_results:
    inspect:
      status: PASS
      open_p0: 0
      open_p1: 1
    risk_explicit:
      status: PASS
      highest_risk: S1
    risk_implicit:
      status: PASS
      results:
        A: 0
        B: 2
        C: 5
        D: 0
    quality_tool_agent:
      status: PASS
      baseline: "tool-quality-baseline-2026.07.01"
      regressions: 0

  open_findings:
    - finding_id: F-ORG-20260719-014
      rule_id: QD-S-...
      priority: P1
      disposition: "planned_fix"
      due_date: "2026-07-30"

  exceptions: []

  release_summary:
    status: PASS
    decision_by: "release-owner"
    decision_at: "2026-07-19T12:10:00Z"
    rationale: "All applicable mandatory Gates passed; no open P0, no active Exceptions."
```

---

# Closing Statement

The purpose of SanityOps Core is not to mask the differences between various risk types under a uniform label. It is to ensure that:

```text
Different objects can be accurately identified
Different conclusions can be correctly understood
Different evidence can be reliably traced
Different Gates can be independently executed
Different risks can be explicitly disposed
Different versions can be continuously compared
```

Only when the common objects, terminology, evidence, and decision boundaries are stable can Inspect, Risk, Quality, Relevance, and the specialized specifications to come together form an enterprise Agent governance framework that is realizable, auditable, and sustainably evolvable.

---

© 2026 Sanity AI Labs. Licensed under Creative Commons Attribution-ShareAlike 4.0 International.
https://www.sanityops.org  ·  hello@sanityops.org
v1.0  ·  September 2026
