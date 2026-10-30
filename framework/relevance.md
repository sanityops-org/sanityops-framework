---
title: Relevance
description: "How SanityOps maps discovered defects to their business and quality impact across the governance closed loop."
---

# SanityOps Framework Relevance

---

**Version**: v1.1

**Release Date**: October 2026

**Maintained by**: Sanity AI Labs

**License**: CC BY-SA 4.0

**Depends on Specification**: Core v1.1 (unified numbering, association types, causal boundaries)

---

## Table of Contents

- [Document Information](#document-information)
- [Preface](#preface)
- [0.1 Purpose](#01-purpose)
- [0.2 Scope](#02-scope)
  - [0.2.1 In Scope](#021-in-scope)
  - [0.2.2 Out of Scope](#022-out-of-scope)
- [0.3 Normative References and Version Applicability](#03-normative-references-and-version-applicability)
  - [0.3.1 Source Specification Priority Principle](#031-source-specification-priority-principle)
- [0.4 Core Principles](#04-core-principles)
- [0.5 Terms and Abbreviations](#05-terms-and-abbreviations)
  - [Abbreviations](#abbreviations)
- [Chapter 1: Unified Impact Mapping Model](#chapter-1-unified-impact-mapping-model)
- [1.1 Mapping Objectives](#11-mapping-objectives)
- [1.2 Four-Section Relationship Structure](#12-four-section-relationship-structure)
- [1.3 Mapping Strength](#13-mapping-strength)
- [1.4 Single Defect Mapping](#14-single-defect-mapping)
- [1.5 Defect Chain Mapping](#15-defect-chain-mapping)
  - [1.5.1 Defect Chain Basic Patterns](#151-defect-chain-basic-patterns)
  - [1.5.2 Typical Examples](#152-typical-examples)
- [1.6 Conclusion Priority and Conflict Handling](#16-conclusion-priority-and-conflict-handling)
- [Chapter 2: Security Impact Mapping Model](#chapter-2-security-impact-mapping-model)
- [2.1 Security Impact Dimensions](#21-security-impact-dimensions)
- [2.2 Attack Surface Classification](#22-attack-surface-classification)
- [2.3 Mapping Boundaries with Risk Explicit](#23-mapping-boundaries-with-risk-explicit)
  - [2.3.1 Prohibited Automatic Inference](#231-prohibited-automatic-inference)
- [2.4 Mapping Relationship with Risk Implicit](#24-mapping-relationship-with-risk-implicit)
  - [2.4.1 Dynamic Validation Result Feedback](#241-dynamic-validation-result-feedback)
- [2.5 High-Priority Security Mapping Rules](#25-high-priority-security-mapping-rules)
- [2.6 External Risk Classification Reference Principles](#26-external-risk-classification-reference-principles)
- [2.7 Security Defect Chains and Defense in Depth](#27-security-defect-chains-and-defense-in-depth)
  - [2.7.1 Defense Layers](#271-defense-layers)
  - [2.7.2 Handling Principles](#272-handling-principles)
- [Chapter 3: Quality Impact Mapping Model](#chapter-3-quality-impact-mapping-model)
- [3.1 Basic Principles](#31-basic-principles)
- [3.2 Tool-Agent Quality Impact Mapping](#32-tool-agent-quality-impact-mapping)
  - [3.2.1 Quality Determination Boundaries](#321-quality-determination-boundaries)
  - [3.2.2 Universal Behavior Failure Modes](#322-universal-behavior-failure-modes)
  - [3.2.3 Main Mapping Relationships](#323-main-mapping-relationships)
- [3.3 RAG-Agent Quality Impact Mapping](#33-rag-agent-quality-impact-mapping)
  - [3.3.1 Quality Determination Boundaries](#331-quality-determination-boundaries)
  - [3.3.2 Main Mapping Relationships](#332-main-mapping-relationships)
  - [3.3.3 Special Limitations](#333-special-limitations)
- [3.4 Quality Supplementary Test Design Rules](#34-quality-supplementary-test-design-rules)
- [3.5 Reverse Diagnostic Rules After Quality Failure](#35-reverse-diagnostic-rules-after-quality-failure)
- [3.6 Quality Regression Rules After Remediation](#36-quality-regression-rules-after-remediation)
- [Chapter 4: Mapping Library, Evidence, and Manual Confirmation](#chapter-4-mapping-library-evidence-and-manual-confirmation)
- [4.1 Minimum Mapping Library Records](#41-minimum-mapping-library-records)
- [4.2 Evidence Requirements and Priority](#42-evidence-requirements-and-priority)
- [4.3 Confidence and Manual Confirmation](#43-confidence-and-manual-confirmation)
  - [4.3.1 Confidence](#431-confidence)
  - [4.3.2 Manual Confirmation Status](#432-manual-confirmation-status)
- [4.4 Risk Test Template Fields](#44-risk-test-template-fields)
- [4.5 Quality Supplementary Test and Diagnostic Fields](#45-quality-supplementary-test-and-diagnostic-fields)
- [4.6 Linked Defect Chain Recording and Escalation](#46-linked-defect-chain-recording-and-escalation)
- [4.7 Mapping Maintenance and Change Control](#47-mapping-maintenance-and-change-control)
- [Chapter 5: Platform Execution, Reporting, and Governance Closed Loop](#chapter-5-platform-execution-reporting-and-governance-closed-loop)
- [5.1 Platform Execution Workflow](#51-platform-execution-workflow)
- [5.2 Automatic Recommendation Rules](#52-automatic-recommendation-rules)
- [5.3 Mapping Progress Status](#53-unified-status-model)
- [5.4 Comprehensive Gate and Release Decision Boundaries](#54-comprehensive-gate-and-release-decision-boundaries)
  - [5.4.1 Result Merging Principles](#541-result-merging-principles)
  - [5.4.2 Risk Acceptance Limitations](#542-risk-acceptance-limitations)
- [5.5 Impact Card Format in Customer Reports](#55-impact-card-format-in-customer-reports)
  - [5.5.1 Report Wording Requirements](#551-report-wording-requirements)
- [5.6 Remediation, Re-inspection, and Regression Evidence](#56-remediation-re-inspection-and-regression-evidence)
  - [5.6.1 Remediation Closed Loop](#561-remediation-closed-loop)
  - [5.6.2 Minimum Evidence Package](#562-minimum-evidence-package)
  - [5.6.3 Closure Determination](#563-closure-determination)
- [Appendix A: QD Defect to Security Impact and Validation Strategy Mapping](#appendix-a-qd-defect-to-security-impact-and-validation-strategy-mapping)
- [A.1 Prompt Defect Mapping](#a1-prompt-defect-mapping)
- [A.2 Skill Defect Mapping](#a2-skill-defect-mapping)
- [A.3 Tool Defect Mapping](#a3-tool-defect-mapping)
- [A.4 Cross Defect Mapping](#a4-cross-defect-mapping)
- [Appendix B: Tool-Agent Failure Mode and Supplementary Test Mapping](#appendix-b-tool-agent-failure-mode-and-supplementary-test-mapping)
- [B.1 QD Category to Failure Mode Mapping](#b1-qd-category-to-failure-mode-mapping)
- [B.2 Failure Fact Reverse Diagnostic Quick Reference](#b2-failure-fact-reverse-diagnostic-quick-reference)
- [Appendix C: RAG-Agent Metrics and Supplementary Test Mapping](#appendix-c-rag-agent-metrics-and-supplementary-test-mapping)
- [C.1 QD Category to RAG Quality Metrics Mapping](#c1-qd-category-to-rag-quality-metrics-mapping)
- [C.2 RAG Failure Reverse Diagnostic Quick Reference](#c2-rag-failure-reverse-diagnostic-quick-reference)
- [Appendix D: Typical Linked Defect Chains](#appendix-d-typical-linked-defect-chains)
- [D.1 Security Defect Chains](#d1-security-defect-chains)
- [D.2 Tool-Agent Quality Defect Chains](#d2-tool-agent-quality-defect-chains)
- [D.3 RAG-Agent Quality Defect Chains](#d3-rag-agent-quality-defect-chains)
- [Appendix E: Mapping Record YAML / JSON Examples](#appendix-e-mapping-record-yaml--json-examples)
- [E.1 Single Defect Mapping Record (YAML)](#e1-single-defect-mapping-record-yaml)
- [E.2 Defect Chain Record (YAML)](#e2-defect-chain-record-yaml)
- [E.3 API Return Example (JSON)](#e3-api-return-example-json)
- [Appendix F: Terminology and External Standard Mapping](#appendix-f-terminology-and-external-standard-mapping)
- [F.1 SanityOps Internal Terminology Cross-Reference](#f1-sanityops-internal-terminology-cross-reference)
- [F.2 Relationship with CIA / Authorization Model](#f2-relationship-with-cia--authorization-model)
- [F.3 Relationship with OWASP LLM / Agentic Risks](#f3-relationship-with-owasp-llm--agentic-risks)
  - [Usage Limitations](#usage-limitations)

---

## Document Information

| Item | Content |
|------|---------|
| Document Name | SanityOps Inspect Defect Impact and Linkage Mapping Specification |
| Version | v1.1 |
| Status | Released |
| Date | October 2026 |
| Applicable Framework | SanityOps Inspect, Risk, Quality Subsets |
| Maintained by | Sanity AI Labs |

---

## Preface

<a id="01-purpose"></a>
### 0.1 Purpose

SanityOps Inspect identifies quality defects in Prompts, Skills, Tool Schemas, and cross-artifact relationships; Risk audits explicit risks or validates implicit, dynamic attack risks; Quality evaluates actual Agent service quality.

Core questions differ for the three activity types:

| Subset | Core Question | Typical Output |
|--------|---------------|----------------|
| Inspect | Do artifact definitions or relationships have defects? | `QD` defects, severity levels, static evidence, remediation recommendations |
| Risk Explicit | Do artifacts contain explicit dangerous instructions or configurations? | `EX` classification, D1/D2/D3, `Explicit·P0/P1/P2` grades |
| Risk Implicit | Can risk behaviors be triggered through attack paths in controlled environments? | Dynamic attack results, exploitation evidence, handling recommendations |
| Quality Tool-Agent | Does Tool Agent stably complete target tasks? | Success/failure, reliability, quality Gate |
| Quality RAG-Agent | Are RAG Agent content outputs and boundary responses qualified? | 12 quality metrics, critical test case Gate, regression conclusions |

This specification establishes formal mapping models between Inspect defects and other subsets, enabling Inspect outputs to further answer:

1. Which security attack surfaces this defect may expand;
2. Which Risk Explicit or Risk Implicit validations should be prioritized;
3. Which Tool-Agent or RAG-Agent quality failures this defect may associate with;
4. Which Inspect defects should be prioritized when Quality discovers failures;
5. What evidence needs to be retained after remediation, and what re-inspection and regression to execute.

---

<a id="02-scope"></a>
## 0.2 Scope

<a id="021-in-scope"></a>
### 0.2.1 In Scope

This specification applies to the following static logic artifacts and their relationships:

- System prompts, role prompts, workflow prompts, and examples;
- Agent Skill name, description, trigger conditions, inputs and outputs, failure strategies, and permission declarations;
- Tool Schema `name`, `description`, `inputSchema`, parameter constraints, side effects, and changes;
- Consistency relationships between Prompt–Skill, Prompt–Tool, and Skill–Tool;
- Linkage relationships among the above artifacts in security validation, quality supplementary testing, and release governance.

<a id="022-out-of-scope"></a>
### 0.2.2 Out of Scope

This specification does not:

- Add, delete, or modify existing Inspect rules or their `QD` numbers;
- Directly determine static defects as already exploited vulnerabilities;
- Replace Risk Implicit shadow sandbox attack validation;
- Replace Quality's final determination of actual output, task success, or release quality;
- Replace IAM, network isolation, backend parameter validation, approval systems, runtime monitoring, or compliance controls;
- Perform complete root cause attribution for retrieval, re-ranking, Embedding, model weights, databases, networks, or infrastructure.

---

<a id="03-normative-references-and-version-applicability"></a>
## 0.3 Normative References and Version Applicability

This specification establishes mapping relationships based on the following SanityOps documents:

| Source Sub-specification | Adopted Version | Usage in This Specification |
|--------------------------|-----------------|----------------------------|
| Inspect Prompt | v1.1 | Uses `QD-P` numbering, definitions, and `Inspect·P0/P1/P2` rules |
| Inspect Skill | v1.1 | Uses `QD-S` numbering, Review Schema, and risk classification rules |
| Inspect Tool | v1.1 | Uses `QD-T` numbering, Schema constraints, and high-risk operation definitions |
| Inspect Cross | v1.1 | Uses `QD-PS`, `QD-PT`, `QD-ST`, `QD-SS`, `QD-TT`, `QD-CYC` numbering and consistency relationships |
| Inspect Permission | v1.1 | Uses QD-PM numbering and permission baseline domain determinations (QD-PM-1~6) |
| Risk Explicit | v1.1 | Uses `EX`, D1/D2/D3, `Explicit·P0/P1/P2` risk model |
| Risk Implicit | v1.1 | Uses shadow sandbox, dynamic attack, and continuous validation principles |
| Quality Tool-Agent | v1.1 | Uses task success/failure, reliability, and risk-driven testing principles |
| Quality RAG-Agent | v1.1 | Uses four-dimensional 12 metrics, critical test cases, and regression Gate principles |

<a id="031-source-specification-priority-principle"></a>
### 0.3.1 Source Specification Priority Principle

If there is a conflict between this specification and a source sub-specification regarding rule numbering, definitions, severity levels, or release requirements, **the corresponding source sub-specification shall take precedence**.

The mapping strength, attack surfaces, candidate failure modes, validation recommendations, and diagnostic recommendations in this specification do not alter the original determinations of the source sub-specifications.

---

<a id="04-core-principles"></a>
## 0.4 Core Principles

1. **Correlation is not causation**
   A `QD` defect indicates missing, ambiguous, inconsistent, or insufficiently bounded definitions; it does not automatically prove that an attack has succeeded, a runtime vulnerability exists, or a quality failure has occurred.

2. **Static checks do not replace dynamic validation**
   Whether a defect is exploitable, can be bypassed, or is blocked by external compensating controls should be validated by Risk Implicit in a controlled environment.

3. **Actual output takes precedence over static inference**
   Tool-Agent reliability, RAG-Agent quality metrics, and release conclusions must be based on actual Quality test results.

4. **Least privilege and least impact**
   When inconsistencies exist across multiple artifacts in permissions, constraints, resources, or failure strategies, convergence should prioritize narrower permissions, stricter constraints, and more conservative failure strategies.

5. **Single defects and defect chains are both important**
   A single defect can constitute a risk condition; when multiple defects across Prompt, Skill, and Tool compound, they may form a higher-risk linked defect chain.

6. **Evidence first, manual confirmation**
   Automated mapping is used for discovery and prioritization. Conclusions involving root cause, exploitability, risk acceptance, or release exceptions must retain evidence and undergo appropriate manual confirmation.

7. **Mapping library is versionable**
   Mapping rules, applicability conditions, test templates, confidence levels, and manual confirmation results should be versioned together with artifacts, rule libraries, and test assets.

---

<a id="05-terms-and-abbreviations"></a>
## 0.5 Terms and Abbreviations

| Term | Definition |
|------|------------|
| **Impact Mapping** | Rules that associate `QD` defects with potential attack surfaces, validation strategies, quality failure modes, and regression requirements. |
| **Attack Surface** | Behavioral entry points that may be exploited by malicious input, untrusted context, error states, or abnormal data. |
| **Defect Chain** | A candidate risk path formed by two or more interrelated defects. |
| **Mapping Strength** | The degree of association between a defect and a specific security or quality impact; not equivalent to severity level. |
| **Candidate Root Cause** | A prioritized investigation direction derived from quality failures or dynamic validation results; not a final root cause conclusion. |
| **Compensating Control** | Controls external to the artifact, such as backend validation, IAM, gateways, approval, audit, or isolation mechanisms. |
| **Static Evidence** | Artifact originals, Schemas, version hashes, rule hit locations, etc. |
| **Dynamic Evidence** | Shadow sandbox attack results, call trajectories, parameter records, logs, and runtime outputs. |
| **Quality Evidence** | Baseline test cases, Agent outputs, rule validations, Judge conclusions, metrics, and Gate results. |

### Abbreviations

| Abbreviation | Full Form |
|--------------|-----------|
| `QD` | Static logic artifact defect (a static defect defined by Inspect rules; not equivalent to a quality failure) |
| `EX` | Explicit Risk |
| `D1` | Confidentiality Impact Type Label |
| `D2` | Integrity Impact Type Label |
| `D3` | Authorization Impact Type Label |
| `Explicit·P0/P1/P2` | Risk Explicit Severity Grades |
| `FM` | Failure Mode |
| `AS` | Attack Surface |
| `Gate` | Release or Handling Gate |
| `RAG` | Retrieval-Augmented Generation |

---

## Chapter 1: Unified Impact Mapping Model

<a id="11-mapping-objectives"></a>
### 1.1 Mapping Objectives

Each Inspect defect can be mapped to four types of information:

```
QD Static Defect
   ↓
Potential Attack Surface / Candidate Behavior Failure Modes
   ↓
Risk Validation Recommendations / Quality Supplementary Test Recommendations
   ↓
Dynamic Evidence, Quality Results, Remediation and Regression Status
```

Mapping output objectives are not to replace any existing conclusions, but to provide actionable priority recommendations for subsequent activities.

<a id="12-four-section-relationship-structure"></a>
### 1.2 Four-Section Relationship Structure

A standard mapping relationship should have at least the following structure:

| Level | Content | Example |
|-------|---------|---------|
| Defect Layer | Discovered `QD` defect | `QD-T-3.2 Untrusted Input Entering an Executable Context` |
| Impact Layer | Attack surface or candidate failure mode | Parameter injection, parameter errors, downstream call failures |
| Validation Layer | Risk or Quality recommended activities | Injection testing, boundary parameter testing, abnormal input regression |
| Evidence Layer | Evidence supporting or refuting associations | Schema, call trajectories, shadow sandbox results, quality test case results |

<a id="13-mapping-strength"></a>
### 1.3 Mapping Strength

Mapping strength reflects "whether validation or supplementary testing should be prioritized", not vulnerability severity, nor does it replace `Inspect·P0/P1/P2` or `Explicit·P0/P1/P2`.

| Strength | Meaning | Platform Behavior |
|----------|---------|-------------------|
| **Strong** | Defect directly expands attack entry, or highly likely to cause specified failure mode | Automatically recommend related Risk or Quality test cases |
| **Medium** | May have impact under specific permission, data, Tool, or process conditions | Recommend based on applicability conditions |
| **Conditional** | Requires external knowledge bases, runtime environments, model behaviors, or business rules | As candidate investigation direction, no automatic conclusion |
| **Not Applicable** | Current Agent type, artifact type, or runtime conditions lack association prerequisites | Do not output this recommendation |

<a id="14-single-defect-mapping"></a>
### 1.4 Single Defect Mapping

Single defect mapping is used to identify the risk a single defect may pose under normal conditions.

| Defect Example | Candidate Impact | Recommended Action |
|----------------|------------------|-------------------|
| `QD-P-2.5.2 Missing Security Boundary Constraints` | Instruction boundary confusion, unauthorized response, sensitive information output | Injection, system prompt extraction, unauthorized request validation |
| `QD-S-4.1 Failure Behavior Undefined` | Expanded search after failure, lowered restrictions, uncontrolled error recovery | Tool failure, permission denial, insufficient data testing |
| `QD-TT-5.2 Multi-Tool Semantic Competition` | Wrong Tool selection, incorrect side effects, duplicate calls | Similar Tool, fuzzy intent, near-synonym expression testing |
| `QD-PT-2.3 Parameter Constraint Consistency` | Mismatch between Prompt parameter requirements and Tool Schema | End-to-end parameter construction, Schema validation, version regression |

Single defect mapping should not ignore controls external to the artifact. For example, insufficient parameter constraints in a Tool Schema do not imply the backend lacks additional validation; whether it is exploitable should still be determined through dynamic validation.

<a id="15-defect-chain-mapping"></a>
### 1.5 Defect Chain Mapping

Defect chains are used to identify candidate exploitation or failure paths formed by multiple defects in combination.

<a id="151-defect-chain-basic-patterns"></a>
#### 1.5.1 Defect Chain Basic Patterns

```text
Boundary deficiency
+ Insufficient permission declaration
+ Tool high-risk capability or data flow
= May form an unauthorized access or data exfiltration path
```

<a id="152-typical-examples"></a>
#### 1.5.2 Typical Examples

```text
QD-P-2.5.2 Missing Security Boundary Constraints
+ QD-S-5.1 Read/Write/Delete Permissions Not Distinguished
+ QD-T-3.2 Untrusted Input Entering an Executable Context
+ QD-TT-5.1 Cross-Tool Data Flow
= Injection → Unauthorized invocation → Sensitive data exfiltration candidate chain
```

When a defect chain is identified, the following actions should be taken:

1. Mark it with a unique `chain_id` in the report;
2. Retain the member defects and their cross-artifact relationships;
3. Prioritize end-to-end Risk Implicit validation;
4. Design coordinated remediation using least privilege, strictest constraints, and most conservative failure strategies;
5. After remediation, perform regression on the complete path, not just re-inspection of individual `QD` items.

<a id="16-conclusion-priority-and-conflict-handling"></a>
### 1.6 Conclusion Priority and Conflict Handling

Conclusions from different subsets cannot substitute for each other. When surface-level conflicts arise, they should be interpreted according to their respective problem domains.

| Situation | Correct Interpretation |
|-----------|----------------------|
| Inspect passes, but Risk Implicit attack succeeds | Static check did not find the corresponding defect, or the attack depends on runtime conditions; the security validation result is valid and should be prioritized. |
| Inspect hits `Inspect·P0`, but Risk cannot reproduce the attack | The defect still needs to be handled per Inspect rules; failure to reproduce does not mean the defect does not exist. |
| Risk Explicit finds no EX risk, but Inspect hits boundary deficiency | Absence of dangerous expression does not mean boundaries are intact; retain the QD defect and recommend dynamic validation. |
| Quality passes, but Inspect has `Inspect·P0` | Quality testing cannot waive static `Inspect·P0`; handle per the source specification's Inspect Gate. |
| Inspect passes, but Quality fails | The quality failure is valid; diagnose from knowledge, model, configuration, runtime environment, and artifact defects. |
| Quality fails, but no QD is found | Must not forcibly attribute to artifact defects; record as "unconfirmed root cause". |

---

## Chapter 2: Security Impact Mapping Model

<a id="21-security-impact-dimensions"></a>
### 2.1 Security Impact Dimensions

This specification adopts five types of potential security consequences. Among them, D1, D2, D3 correspond to Risk Explicit impact type labels, but specific grading still follows Risk Explicit v1.1 independently. Grading is determined by `Explicit·P0/P1/P2`.

| Security Consequence | Corresponding Dimension | Typical Consequences |
|----------------------|------------------------|----------------------|
| **Confidentiality Risk** | D1 | Sensitive data leakage, Prompt leakage, unauthorized reading, external data sending |
| **Integrity Risk** | D2 | Erroneous writing, deletion, payment, configuration modification, business rule bypass |
| **Authorization Risk** | D3 | Privilege escalation, identity confusion, cross-tenant access, unauthorized delegation |
| **Availability Risk** | Extended dimension | Infinite retries, call storms, resource exhaustion, timeouts and service degradation |
| **Audit and Traceability Risk** | Extended dimension | Unknown call sources, unclear data flows, inability to correlate evidence or responsible parties |

> D1/D2/D3 are the impact type labels of Risk Explicit; this specification only records their potential association directions and does not automatically produce D labels. Grading is determined by `Explicit·P0/P1/P2`.

<a id="22-attack-surface-classification"></a>
### 2.2 Attack Surface Classification

| ID | Attack Surface | Definition |
|----|---------------|------------|
| `AS-01` | Instruction and Context Boundary Confusion | Mistaking untrusted input, documents, history content, or external returns as high-priority instructions. |
| `AS-02` | Input and Parameter Injection | Unconstrained user or external input entering Tools, backends, or downstream interpreters. |
| `AS-03` | Output Handling and Sensitive Data Exfiltration | Sensitive information being output, concatenated, referenced, forwarded, or written to external destinations. |
| `AS-04` | Permission, Identity, and Delegation Expansion | Broad capabilities, incorrect authorization, or chained calls leading to out-of-scope operations. |
| `AS-05` | Tool Misuse and High-Risk Side Effects | Wrong Tool selection, accidental write operations, batch operations, or unconfirmed irreversible actions. |
| `AS-06` | Resource Exhaustion and Runaway Execution | No upper limits on input, output, calls, retries, or recursion leading to resource loss of control. |
| `AS-07` | Anomaly Propagation and Cascading Failures | After Tool or dependency failure, Agent adopts undefined expansion, retry, or degradation strategies. |
| `AS-08` | Configuration, Naming, and Supply Chain Confusion | Similar Tool names, Schema changes, dangerous default values, or abnormal callback addresses leading to misuse. |
| `AS-09` | Cross-Artifact Contract Breach | Inconsistencies in authorization, parameters, output, permissions, or error strategies across Prompt, Skill, and Tool. |

<a id="23-mapping-boundaries-with-risk-explicit"></a>
### 2.3 Mapping Boundaries with Risk Explicit

Risk Explicit audits **explicit dangerous instructions, dangerous configurations, or risk expressions already present** in artifacts; Inspect audits the completeness, clarity, boundaries, and consistency defects of artifacts.

Therefore, the relationship between the two is as follows:

| Inspect Finding | Correct Action for Risk Explicit |
|----------------|----------------------------------|
| Security boundary missing | Strengthen scanning of related artifacts; do not automatically determine an EX classification. |
| Permission control boundary missing | Prioritize checking for explicit unauthorized declarations, dangerous permission fields, or bypass expressions. |
| Tool description quality insufficient | Check descriptions, default values, examples, and structural fields for instruction injection or dangerous configurations. |
| Cross permission inconsistency | Prioritize checking cross-object risk expressions, authorization chain forgery, and structural declaration contradictions. |
| Raw input passthrough | Check for explicit dangerous parameters, script fragments, or abnormal constraints; dynamic exploitability remains under Risk Implicit. |

<a id="231-prohibited-automatic-inference"></a>
#### 2.3.1 Prohibited Automatic Inference

The following inferences are all invalid:

```text
QD-P-2.5.2 Security Boundary Missing
≠ Automatic hit NL-A-7 Reverse Restriction Elimination Type

QD-T-1.4 additionalProperties Not Controlled
≠ Automatic hit NR-S-3 Parameter Type/Constraint Abnormal Declaration

QD-PS-1.3 Permission Boundary Consistency Defect
≠ Automatic hit NL-B-9 Cross-Object Authorization Chain Forgery
```

Only when an explicit expression meeting the EX definition exists in the artifact can Risk Explicit independently determine the corresponding `EX` classification.

<a id="24-mapping-relationship-with-risk-implicit"></a>
### 2.4 Mapping Relationship with Risk Implicit

Risk Implicit should use impact mapping as the test design input for dynamic validation.

| Mapping Field | Risk Implicit Usage |
|---------------|---------------------|
| Attack surface | Select attack strategies and input variants |
| Potential impact | Define criteria for attack success, interception, or failure |
| Applicability conditions | Configure shadow sandbox, Mock data, identity, permissions, and external dependencies |
| Defect chain | Design end-to-end attack paths across Prompt, Skill, and Tool |
| Remediation recommendations | Form regression attack set after remediation |

<a id="241-dynamic-validation-result-feedback"></a>
#### 2.4.1 Dynamic Validation Result Feedback

| Risk Result | Significance for Impact Mapping |
|-------------|--------------------------------|
| **Attack successful** | Mapping gains dynamic empirical evidence; associated defect chain should be escalated in handling priority. |
| **Intercepted by external control** | Artifact-layer defects may still exist; mark as "depends on compensating controls." |
| **Model rejected or not triggered** | Not reproduced under current conditions; must not close static defect based on this. |
| **Insufficient conditions** | Cannot determine; should supplement shadow sandbox, permissions, data, or call chain conditions. |

<a id="25-high-priority-security-mapping-rules"></a>
### 2.5 High-Priority Security Mapping Rules

The complete security mapping uses **Appendix A as the sole authoritative source** (listing, rule by rule, the attack surface, impact, mapping strength, and validation recommendation for each QD rule). This section only explains how to derive the "high-priority" validation subset from Appendix A and does not maintain a second mapping table.

High priority is determined by the following rules:

1. **Rules with mapping strength `strong`**: enter the Risk validation queue first.
2. **`Inspect·P0` rules**: regardless of mapping strength, must enter Risk Explicit review or Risk Implicit validation.
3. **Cross-artifact rules** (`QD-PS`/`QD-PT`/`QD-ST`/`QD-SS`/`QD-TT`/`QD-CYC`/`QD-PM`): prioritize end-to-end validation per the defect chains in Appendix D.
4. **`Explicit·P0` explicit risks**: determined independently by Risk Explicit; outside the derivation scope of this appendix.

The platform must not maintain a second mapping table outside Appendix A. Among the derivation rules in this section, rule 1 acts on the "Mapping Strength" column of Appendix A; rule 2 relies on the severity level of the source sub-specification (Appendix A has no severity column); rule 3 depends on the defect chain definitions in Appendix D. None of the three duplicates the mapping content of Appendix A.

<a id="26-external-risk-classification-reference-principles"></a>
### 2.6 External Risk Classification Reference Principles

This specification may reference OWASP LLM / Agentic risk language to facilitate communication of threat directions, but shall not replace SanityOps numbering with external numbering.

| SanityOps Attack Surface | Reference External Risk Directions |
|--------------------------|------------------------------------|
| AS-01 | Prompt Injection, System Prompt Leakage |
| AS-02 | Improper Input Handling, Injection |
| AS-03 | Sensitive Information Disclosure, Improper Output Handling |
| AS-04 | Excessive Agency, Excessive Permissions |
| AS-05 | Tool Misuse, Unsafe Action Execution |
| AS-06 | Unbounded Consumption, Denial of Service |
| AS-07 | Insecure Error Handling, Failure Escalation |
| AS-08 | Supply Chain, Configuration Confusion |
| AS-09 | Agentic System Misconfiguration |

External mapping is for threat modeling and communication purposes only and does not constitute a declaration of conformity with any external standard.

<a id="27-security-defect-chains-and-defense-in-depth"></a>
### 2.7 Security Defect Chains and Defense in Depth

<a id="271-defense-layers"></a>
#### 2.7.1 Defense Layers

```text
Prompt: Global rules, task boundaries, permissions, and failure strategies
   ↓
Skill: Capability boundaries, trigger conditions, resource and call limits
   ↓
Tool: Hard parameter constraints, side effects, internal fields, and data flows
   ↓
Backend and Runtime Environment: IAM, server-side validation, approval, audit, isolation
```

<a id="272-handling-principles"></a>
#### 2.7.2 Handling Principles

When a defect chain spans multiple defense layers:

- Do not only fix the most superficial Prompt wording;
- Priority should be given to retaining non-bypassable hard constraints at the Tool and backend layers;
- Skills should tighten capability, permission, resource, and failure strategies;
- Prompts should fill in global boundaries, call specifications, and conflict arbitration;
- Risk validation after remediation must cover the complete attack path;
- If relying on compensating controls, the report should clearly state the control name, owner, validation evidence, and failure risk.

---

## Chapter 3: Quality Impact Mapping Model

<a id="31-basic-principles"></a>
### 3.1 Basic Principles

The relationship between Inspect defects and Quality results is a **diagnostic association**, not an automatic causal relationship.

```text
Inspect: Discovers potential problems at the artifact layer
      ↓
Quality: Observes actual Agent output or task results
      ↓
Impact Mapping: Provides candidate failure modes and priority investigation directions
      ↓
Human + Evidence: Confirm root cause, remediation, and regression
```

Quality failures may also be caused by issues in the knowledge base, retrieval, re-ranking, model version, context, runtime configuration, external services, or test assets. Therefore, Quality failures must not be used to directly assert that a particular `QD` is the sole root cause.

<a id="32-tool-agent-quality-impact-mapping"></a>
### 3.2 Tool-Agent Quality Impact Mapping

<a id="321-quality-determination-boundaries"></a>
#### 3.2.1 Quality Determination Boundaries

Quality Tool-Agent uses the final task result for binary determination:

- **Success**: Final output meets expectations, task completed;
- **Failure**: Final output does not meet expectations, task not completed, timeout, or interruption.

The overall reliability is:

$$
\text{Reliability} =
\frac{\text{Number of Successful Executions}}{\text{Total Number of Executions}}
\times 100\%
$$

Process information such as tool selection, call order, parameter generation, and output stitching serves as trajectory evidence for diagnosing failure causes and does not independently constitute a first-level quality score.

<a id="322-universal-behavior-failure-modes"></a>
#### 3.2.2 Universal Behavior Failure Modes

| ID | Candidate Failure Mode | Observable Behavior |
|----|------------------------|---------------------|
| `FM-01` | Input understanding or parsing failure | Request not recognized, field misinterpreted, incorrect extraction conditions |
| `FM-02` | Skill false trigger or missed trigger | Invoked when should not be, not invoked when should be |
| `FM-03` | Tool misselection | Capability mismatch, incorrectly invoking high-risk Tool |
| `FM-04` | Parameter generation error | Missing parameter, type error, format error, out of bounds |
| `FM-05` | Call order or contract mismatch | Upstream result not passed, downstream missing fields, incorrect order |
| `FM-06` | Output not consumable | Missing fields, invalid structure, unstable format |
| `FM-07` | Incomplete content or task expansion | Omitting required conditions, exceeding user goals, self-supplementing erroneous information |
| `FM-08` | Exception recovery failure | Runaway retries, erroneous degradation, task interruption, repeated side effects |
| `FM-09` | Boundary action error | Failure to properly handle when clarification, refusal, confirmation, or handoff is required |
| `FM-10` | Unstable execution or resource runaway | Inconsistent results for same input, looped calls, timeout, budget exhaustion |

<a id="323-main-mapping-relationships"></a>
#### 3.2.3 Main Mapping Relationships

| Inspect Defect Category | Candidate Failure Modes | Quality Tool-Agent Supplementary Test Recommendations |
|-------------------------|------------------------|------------------------------------------------------|
| Prompt role, responsibility, goal, or priority unclear | FM-01, FM-02, FM-07 | Out-of-role tasks, multi-goal conflicts, rule priority conflicts |
| Prompt input source, format, or requiredness underdefined | FM-01, FM-04 | Empty input, missing fields, malformed input, conflicting fields |
| Prompt output format or Schema incomplete | FM-06 | Downstream parsing, structured fields, format compliance testing |
| Prompt tool invocation specification missing | FM-03, FM-04, FM-05 | Tool selection, parameter dependency, call order, abnormal returns |
| Prompt termination, frequency, or retry limits missing | FM-08, FM-10 | Max call count, timeout, rate limiting, retry, and idempotency |
| Skill trigger, non-activation, or task scope unclear | FM-02, FM-07, FM-09 | Adjacent intent, negative intent, mixed intent, out-of-bounds tasks |
| Skill default, ambiguity, or failure strategy missing | FM-01, FM-07, FM-08 | Insufficient information, permission denied, insufficient data, partial completion |
| Skill permission, confirmation, or environment boundary unclear | FM-05, FM-09 | Read/write/delete, production environment, high-risk confirmation, chain calls |
| Tool parameter constraint insufficient | FM-04, FM-05, FM-08 | Type, length, format, numeric, array, and combined boundary tests |
| Tool description insufficient or Tool semantic competition | FM-03, FM-05 | Similar Tools, near-synonym expressions, ambiguous tasks, malicious guidance |
| Tool side effects, batch limits, or data flow risks | FM-08, FM-09, FM-10 | Batch, cancel, rollback, confirmation, cross-Tool value passing |
| Cross parameter, output, permission, or failure strategy inconsistency | FM-04, FM-05, FM-06, FM-08 | End-to-end contract, call chain permissions, exception chain, version compatibility |

<a id="33-rag-agent-quality-impact-mapping"></a>
### 3.3 RAG-Agent Quality Impact Mapping

<a id="331-quality-determination-boundaries"></a>
#### 3.3.1 Quality Determination Boundaries

Quality RAG-Agent evaluates user-visible content output and boundary handling, and does not directly score internal components such as Prompt, retrieval, knowledge base, model, or Tool.

Its four-dimensional 12 metrics are:

| Dimension | Metrics |
|-----------|---------|
| Knowledge answer quality | Correctness, Completeness, Relevance, Traceability, Timeliness |
| Dialogue and complex task quality | Consistency, Robustness, Decomposition Capability, Coherence |
| Expression and compliance quality | Format compliance |
| Boundary and safety response quality | Boundary recognition capability, Safety response capability |

The mapping relationship only indicates that a certain type of Inspect defect may affect the relevant quality metrics, making it worth prioritizing supplementary test design or investigation; it does not mean that the defect will necessarily cause a loss of points in that metric.

<a id="332-main-mapping-relationships"></a>
#### 3.3.2 Main Mapping Relationships

| Inspect Defect Category | Potentially Affected RAG Metrics | Recommended Supplementary Tests |
|-------------------------|----------------------------------|--------------------------------|
| Prompt logical contradiction, responsibility mismatch, unclear goals | Correctness, Relevance, Consistency, Format compliance | Rule conflicts, role boundaries, multi-constraint issues |
| Prompt gray areas and undefined priority levels | Consistency, Robustness, Boundary recognition, Safety response | Vague expressions, multi-turn probing, conflicting rules |
| Prompt input source, format, or ambiguity handling missing | Relevance, Robustness, Decomposition capability, Boundary recognition | Colloquial rewrites, missing conditions, multi-intent, abnormal formats |
| Prompt output structure, citation, or stability underdefined | Completeness, Traceability, Format compliance, Consistency | Citations, disclaimers, fields, JSON/Markdown format |
| Prompt resource, Tool, or data boundary insufficient | Correctness, Traceability, Timeliness, Safety response | Knowledge source selection, Tool failure, source conflicts, timely knowledge |
| Prompt insufficient examples or examples conflicting with rules | Correctness, Consistency, Robustness, Format compliance | Positive/negative examples, boundary expressions, adversarial rewrites |
| Skill trigger, non-activation, and task scope unclear | Relevance, Decomposition capability, Boundary recognition, Safety response | Adjacent intents, out-of-scope questions, clarification-needed and handoff-needed questions |
| Skill failure, partial completion, and recovery strategy missing | Completeness, Coherence, Safety response | No knowledge hit, retrieval failure, partial data, source conflicts |
| Tool parameter, description, side effect, or competition defects | Correctness, Relevance, Traceability, Format compliance | Retrieval/citation Tool selection, return parsing, source citation |
| Cross output, parameter, permission, or failure strategy inconsistency | Correctness, Completeness, Consistency, Format compliance, Safety response | End-to-end citation, parameter passing, permission boundaries, error chains |

<a id="333-special-limitations"></a>
#### 3.3.3 Special Limitations

The following factors may cause RAG quality failures but are not within the current full coverage scope of Inspect mapping:

- Authoritative knowledge itself being erroneous, missing, or outdated;
- Anomalies in document chunking, indexing, retrieval recall, re-ranking, or citation chains;
- Changes in model version, temperature, context window, or vendor behavior;
- Errors in the evaluation test cases, Judge, or rule validators themselves;
- Missing user identity, real-time business state, or external system state.

<a id="34-quality-supplementary-test-design-rules"></a>
### 3.4 Quality Supplementary Test Design Rules

When impact mapping generates Quality supplementary tests, the following rules shall be followed:

1. **Select test cases by risk**  
   `Inspect·P0`, exploited defect chains, critical business scenarios, or high-risk boundary scenarios should be prioritized for inclusion in the release regression set.

2. **Select perturbation methods by defect type**

   - Input boundary defects: null values, abnormal formats, excessive length, encoding, combined boundaries;

   - Trigger condition defects: adjacent intent, negative intent, mixed intent;

   - Permission defects: role, tenant, environment, read/write/delete, and confirmation status;

   - Failure strategy defects: timeout, rate limiting, permission denial, dependency unavailable;

   - Output contract defects: downstream parsing, required fields, citations, and format.

3. **Preserve the "expected action"**  
   Especially in security and boundary scenarios, `answer`, `clarify`, `limited_answer`, `deny`, or `handoff` should be specified, rather than merely evaluating the surface quality of the text.

4. **Distinguish between regression set and exploration set**  
   Discovered defects and their remediations should enter the stable regression set; exploration of unknown risks may enter the exploration set, but exploration results should be confirmed before being escalated to blocking test cases.

<a id="35-reverse-diagnostic-rules-after-quality-failure"></a>
### 3.5 Reverse Diagnostic Rules After Quality Failure

After a Quality failure, the platform should output "failure fact + candidate Inspect investigation direction + other possible causes."

> Family wildcard notations in the table below and in Appendices B/C/D (such as `QD-P-1.x`, `QD-T-4.x`) refer only to the currently effective members of that family, excluding numbers that have been deleted, deprecated, merged, or transferred; see Appendix A for the complete list.

| Observed Failure | Priority Inspect Investigation | Other Possible Causes |
|-----------------|-------------------------------|-----------------------|
| Tool selection error | `QD-T-4.1`, `QD-TT-5.2`, `QD-S-3.1`, `QD-P-2.4.3` | Model reasoning, routing, context construction |
| Missing parameter, type or format error | `QD-T-1.2`, `QD-T-2.x`, `QD-P-2.2.x`, `QD-ST-3.3` | Tool implementation, transformation layer, Mock data |
| Call order or data dependency error | `QD-P-2.4.3`, `QD-PT-2.2`, `QD-ST-3.2` | Planner, state machine, runtime orchestration |
| Output not consumable by downstream | `QD-P-2.3.1/2.3.2`, `QD-PS-1.6`, `QD-ST-3.5` | Downstream parser, interface version, implementation compatibility |
| Repeated calls or task interruption after exception | `QD-P-2.6.x`, `QD-S-4.x`, `QD-PT-2.5`, `QD-ST-3.7` | Network, rate limiting, external service, timeout configuration |
| RAG key fact error | `QD-P-1.x`, `QD-P-2.4.x`, `QD-T-4.1` | Knowledge error, retrieval failure, re-ranking, model hallucination |
| RAG answer omits restrictions or steps | `QD-P-2.3.x`, `QD-S-4.2`, `QD-S-3.4` | Incomplete baseline answer, insufficient recall, context truncation |
| RAG no citation or citation does not support conclusion | `QD-P-2.3.x`, `QD-P-2.4.x`, `QD-ST-3.5` | Knowledge metadata, retrieval and citation implementation |
| Should have refused, clarified, or handed off but answered directly | `QD-P-2.5.2/2.5.3`, `QD-S-3.2`, `QD-S-5.x`, `QD-PS-1.3` | IAM, runtime Guardrail, missing user state |
| Equivalent questions or multi-turn responses contradictory | `QD-P-1.1.x`, `QD-P-2.5.4`, `QD-S-3.5` | Session memory, context window, model version changes |

<a id="36-quality-regression-rules-after-remediation"></a>
### 3.6 Quality Regression Rules After Remediation

After remediating an Inspect defect, passing the static re-inspection alone should not be the basis for closure.

| Change Type | Minimum Regression Requirements |
|-------------|--------------------------------|
| `Inspect·P0` defect remediation | Re-run corresponding Inspect; re-run associated Risk; re-run directly affected Quality test cases and complete defect chain test cases |
| `Inspect·P1` defect remediation | Re-run corresponding Inspect; execute affected topic Quality regression; decide whether to execute Risk per mapping recommendation |
| Prompt, Skill, Tool, or Cross contract change | In addition to directly affected test cases, execute end-to-end call chain regression |
| RAG boundary, permission, citation, or safety response change | Re-run high-risk boundary, key fact, citation, and format compliance test cases |
| Tool write operation, batch operation, or data flow change | Re-run confirmation, idempotency, rollback, maximum batch, and cross-Tool data flow test cases |
| Model, knowledge snapshot, evaluator, or baseline set change | Re-assess baseline comparability per the corresponding Quality specification; establish a new baseline if necessary |

The minimum conditions for closing quality-associated items are:

```text
Remediated artifact has been versioned
+ Static defect has been re-inspected
+ Required dynamic validation completed or inapplicability reason documented
+ Affected quality test cases passed
+ Regression evidence has been archived
+ Manual confirmation of closure
```

---

## Chapter 4: Mapping Library, Evidence, and Manual Confirmation

<a id="41-minimum-mapping-library-records"></a>
### 4.1 Minimum Mapping Library Records

Each mapping rule should be independently versioned, including at least:

```yaml
mapping_id: ""
mapping_version: ""
status: active

source:
  defect_id: ""
  defect_name: ""
  artifact_type: ""
  source_standard: ""
  source_standard_version: ""

applicability:
  ac_levels: []
  or_levels: []
  required_conditions: []
  exclusions: []

security_associations: []
quality_associations: []

evidence_requirements:
  static: []
  dynamic: []
  quality: []

limitations: []
review_status: draft
```

Mapping library rules and specific finding records must be separated:

- **Mapping library rules**: Describe which QD(s) may typically be associated with what risks;
- **Specific finding records**: Describe whether a specific artifact hits the rule, whether it is applicable, and the actual validation results.

<a id="42-evidence-requirements-and-priority"></a>
### 4.2 Evidence Requirements and Priority

| Evidence Type | Primary Use | Priority |
|---|---|---|
| Artifact original text, Schema, version hash | Prove static defects and mapping prerequisites | High |
| Prompt, Skill, Tool call trajectories | Prove actual execution behavior and chain relationships | High |
| Shadow sandbox attack results | Prove exploitability, interception, or insufficient conditions | High |
| Quality baseline test cases, outputs, scores, and Gate | Prove actual quality performance | High |
| Backend validation, IAM, approval, or gateway configuration | Prove compensating controls | High |
| LLM inspection notes | Auxiliary explanation, generate candidate associations | Medium |
| Keywords, similarity, or heuristic rules | Initial screening and candidate discovery | Low to Medium |

Evidence should include minimum reproducible information:

```text
Artifact version
+ Rule version
+ Mapping library version
+ Evaluation environment
+ Execution time
+ Original input and key output
+ Evaluator or evaluator version
```

<a id="43-confidence-and-manual-confirmation"></a>
### 4.3 Confidence and Manual Confirmation

<a id="431-confidence"></a>
#### 4.3.1 Confidence

| Confidence | Applicable Scenarios |
|---|---|
| **High** | Clear static evidence exists, and dynamic validation or quality results support the association. |
| **Medium** | Static evidence is clear, but dynamic or quality empirical evidence is lacking. |
| **Low** | Association primarily relies on heuristics, similarity, or external condition assumptions. |

Confidence does not equal:

- Inspect severity level;
- Risk Explicit explicit-risk grade;
- Risk Implicit Signal;
- Quality score or Gate.

<a id="432-manual-confirmation-status"></a>
#### 4.3.2 Manual Confirmation Status

| Status | Definition |
|---|---|
| `unreviewed` | Auto-generated, not yet manually reviewed |
| `reviewed` | Manually confirmed static defects and mapping applicability |
| `validated` | Supported by dynamic or quality evidence |
| `rejected` | Manually determined mapping not applicable to this instance |
| `needs_more_evidence` | Needs supplementary environment, logs, permissions, or test assets |

> Review status is consistent with Core §5.6.2 and does not include `closed`; closure is a Finding lifecycle status (core §5.3), not a review status.

<a id="44-risk-test-template-fields"></a>
### 4.4 Risk Test Template Fields

When influencing mapping output of Risk test recommendations, at least the following should be declared:

| Field | Description |
|---|---|
| `test_id` | Test template identifier |
| `source_defects` | Associated QD or defect chain members |
| `attack_surface` | Corresponding `AS` number |
| `test_goal` | Attack target to be validated |
| `preconditions` | Identity, permissions, data, Mock, Tool, and environment prerequisites |
| `input_strategy` | Injection, boundary values, encoding variants, multi-turn, or cross-Tool strategies |
| `success_criteria` | What behavior determines attack success |
| `termination_status` | A/B/C/D |
| `evidence_to_capture` | Call trajectories, parameters, logs, status changes, and output |
| `safety_constraints` | Shadow sandbox isolation, anonymization, Mock, side-effect restrictions |
| `regression_scope` | Templates and variants to re-run after remediation |

<a id="45-quality-supplementary-test-and-diagnostic-fields"></a>
### 4.5 Quality Supplementary Test and Diagnostic Fields

| Field | Description |
|---|---|
| `quality_test_id` | Supplementary test template or test case identifier |
| `quality_target` | Tool-Agent or RAG-Agent |
| `source_defects` | Associated QD or defect chain |
| `candidate_failure_modes` | Tool-Agent `FM` list |
| `candidate_metrics` | RAG-Agent applicable metrics list |
| `test_scenario` | Normal, boundary, abnormal, permission, failure, or regression scenario |
| `expected_action` | When necessary: `answer`, `clarify`, `limited_answer`, `deny`, `handoff` |
| `pass_criteria` | Tool-Agent task success conditions, or RAG-Agent metrics and key gate conditions |
| `diagnostic_evidence` | Call chain, output, citations, scoring rationale, version, and logs |
| `other_possible_causes` | Candidate root cause directions not belonging to Inspect |

<a id="46-linked-defect-chain-recording-and-escalation"></a>
### 4.6 Linked Defect Chain Recording and Escalation

Defect chain records should include at least:

| Field | Description |
|---|---|
| `chain_id` | Stable unique identifier |
| `chain_name` | Human-readable name |
| `chain_type` | `security`, `tool_quality`, or `rag_quality` |
| `members` | Member QDs, artifacts, versions, and roles in the chain |
| `chain_hypothesis` | Description of candidate attack or failure path |
| `required_conditions` | Permissions, data, Tool, or environment conditions required for the chain to hold |
| `potential_impacts` | D1/D2/D3, availability, auditability, or quality impact |
| `validation_plan` | End-to-end Risk or Quality test plan |
| `chain_status` | Open, validating, confirmed, remediated, closed |
| `owners` | Prompt, Skill, Tool, security, and quality responsible parties |

When any of the following conditions are met, a single defect should be escalated to defect chain governance:

- Two or more P0/P1 defects connected across artifacts;
- Reachable path from untrusted input to high-risk Tool exists;
- Reachable path from sensitive data source to external output Tool exists;
- Quality or Risk evidence shows multiple artifacts jointly contributing to failure;
- Single-point remediation cannot eliminate the complete risk path.

<a id="47-mapping-maintenance-and-change-control"></a>
### 4.7 Mapping Maintenance and Change Control

Mapping rules require periodic calibration, especially when the following occur:

- Inspect QD definitions, numbering, or severity levels are updated;
- Risk attack strategies, termination status, or Gate rules are updated;
- Quality metrics, baseline sets, thresholds, or evaluators are updated;
- New high-frequency production failures or novel attack patterns emerge;
- Artifact types expand to include Memory, Workflow, MCP, A2A, or IAM.

Mapping library changes should be recorded:

```text
Reason for change
+ Affected QD / AS / FM / Quality metrics
+ Differences between old and new versions
+ Calibration evidence
+ Reviewer
+ Effective date
```

---

## Chapter 5: Platform Execution, Reporting, and Governance Closed Loop

<a id="51-platform-execution-workflow"></a>
### 5.1 Platform Execution Workflow

```
1. Inspect discovers QD defects
          ↓
2. Read mapping library, version, and applicability conditions
          ↓
3. Generate security associations, quality associations, and defect chain candidates
          ↓
4. Recommend Risk and Quality supplementary tests
          ↓
5. Collect dynamic validation, quality assessment, and compensating control evidence
          ↓
6. Manual confirmation of applicability, root cause, and remediation plan
          ↓
7. Execute re-inspection, regression, and closure approval
```

The automation system should distinguish between:

- **Statically confirmed facts**: e.g., QD has been hit;
- **Mapping inferences**: e.g., a certain attack surface may exist;
- **Dynamically confirmed facts**: e.g., attack succeeded, external interception, or insufficient conditions;
- **Quality confirmed facts**: e.g., critical test case failure, insufficient reliability, or regression degradation;
- **Manual conclusions**: e.g., root cause confirmation, risk acceptance, or closure.

<a id="52-automatic-recommendation-rules"></a>
### 5.2 Automatic Recommendation Rules

After Inspect hits a defect, the platform may automatically output:

1. Potential attack surfaces and potential impacts;
2. Recommended Risk Explicit review directions;
3. Recommended Risk Implicit test templates;
4. Recommended Tool-Agent or RAG-Agent supplementary tests;
5. Associable defect chains;
6. Required evidence and applicability conditions;
7. Minimum regression requirements after remediation.

The platform must NOT automatically output the following conclusions:

- "This defect constitutes an exploitable vulnerability";
- "The attack has succeeded";
- "This defect is the sole root cause of the quality failure";
- "External controls are sufficient to permanently replace artifact remediation";
- "Not executing the mapping recommendation means the risk does not exist."

<a id="53-unified-status-model"></a>
### 5.3 Mapping Progress Status

The 11 statuses in this section are **Relevance mapping progress statuses**, describing "how far the impact mapping and validation of a given QD has progressed", and are **not** Finding lifecycle statuses. Finding status, review status, and closure conditions always follow `framework/core.md` §5.3 and §5.6.2; the statuses in this section must not be used to substitute for or close a Finding.

| Status | Definition |
|--------|------------|
| `OPEN` | QD discovered, impact mapping not yet completed |
| `MAPPED` | Security and quality associations generated |
| `VALIDATION_RECOMMENDED` | Risk recommended, not yet executed |
| `VALIDATED_EXPLOITABLE` | Risk Implicit resulted in attack success A |
| `VALIDATED_COMPENSATED` | Third-party interception B occurred, artifact-level risk still requires tracking |
| `VALIDATED_REJECTED` | LLM rejected C; static defect not automatically closed |
| `VALIDATION_INCONCLUSIVE` | Insufficient conditions D or insufficient evidence |
| `QUALITY_ASSOCIATED` | Association clues exist with actual quality failure |
| `FIXED_PENDING_REGRESSION` | Fixed, pending re-inspection, dynamic validation, or quality regression |
| `CLOSED` | Required re-inspection and regression completed, confirmed closed |
| `ACCEPTED_EXCEPTION` | Approved time-limited risk acceptance, must record validity period and compensating controls |

**Cross-reference with Core Finding statuses** (for report interoperability only; does not change the semantics of either side):

| Mapping Progress Status | Corresponding Core Finding Status (core §5.3) |
|-------------------------|-----------------------------------------------|
| `OPEN` / `MAPPED` / `VALIDATION_RECOMMENDED` | `open` |
| `VALIDATED_EXPLOITABLE` / `VALIDATED_COMPENSATED` / `VALIDATED_REJECTED` | `confirmed` (all have dynamic validation results as support) |
| `QUALITY_ASSOCIATED` | `open` (association clues do not yet constitute "confirmed through the prescribed process"; record `review_status` separately) |
| `VALIDATION_INCONCLUSIVE` | `open` (record `review_status = needs_more_evidence` separately) |
| `FIXED_PENDING_REGRESSION` | `mitigated` |
| `CLOSED` | `closed` |
| `ACCEPTED_EXCEPTION` | `accepted` |

> Core's `invalid` (false positive or not applicable) has no corresponding progress status in this section; when a mapping does not hold, the Finding should be marked `invalid` and the exclusion rationale recorded.

<a id="54-comprehensive-gate-and-release-decision-boundaries"></a>
### 5.4 Comprehensive Gate and Release Decision Boundaries

This section only explains **how conclusions from multiple sources are merged and presented when they coexist**; it does not define a Relevance-side Gate: Relevance itself produces no Gate and must not substitute for any Gate of Inspect, Risk Explicit, Risk Implicit, or Quality (core §6.1).

<a id="541-result-merging-principles"></a>
#### 5.4.1 Result Merging Principles

| Situation | Comprehensive Handling |
|-----------|----------------------|
| Risk Implicit results in A | Handle per Risk Implicit Gate; Quality pass does not exempt. |
| Inspect has a blocking `Inspect·P0` | Handle per Inspect rules; dynamic non-reproduction does not automatically exempt. |
| Quality critical test case fails or Gate does not pass | Handle per corresponding Quality rules; Inspect serves only as diagnostic support. |
| Risk Explicit discovers high-risk EX | Handle per Explicit rules; should associate related QD or defect chains, but does not replace their remediation. |
| All dynamic validations result in D | Must not determine security pass; should mark validation as invalid and supplement conditions. |
| Only B or C exists | Handle per Risk Implicit original rules; should record dependency on external controls or model rejection uncertainty. |
| Mapping recommendation not executed | The recommendation itself does not constitute an automatic FAIL; however, if the source specification or change policy requires validation, it cannot be considered as having completed pre-release proof. |

<a id="542-risk-acceptance-limitations"></a>
#### 5.4.2 Risk Acceptance Limitations

Risk acceptance is only applicable to scenarios where the source specification permits exceptions, and must at minimum document:

- The specific QD, EX, attack result, or quality failure being accepted;
- The business justification for not remediating;
- Verified compensating controls;
- Residual risk description;
- Responsible person and approver;
- Expiration date and review conditions;
- Required monitoring, alerting, and subsequent regression.

Attack success A, critical quality gate failure, or `Inspect·P0` / `Explicit·P0` situations where the source specification explicitly prohibits exceptions must NOT be downgraded or exempted through this specification's "mapping conclusions."

<a id="55-impact-card-format-in-customer-reports"></a>
### 5.5 Impact Card Format in Customer Reports

Customer-facing reports must clearly separate "confirmed facts" from "candidate associations."

```markdown
### Impact Card: QD-T-3.2 | Untrusted Input Entering an Executable Context | Inspect·P0 (Applies to OR-L2 / OR-L3)

**Static Discovery**
- Artifact: `tool:search_customer`
- Version: `sha256:...`
- Evidence: Parameter `query` is a free-form string, without declared format, pattern, or allowlist constraints.

**Potential Security Associations**
- Attack Surface: AS-02 Input and Parameter Injection
- Potential Impact: D1 (Confidentiality), D2 (Integrity), D3 (Authorization)
- Mapping Strength: Strong
- Note: This conclusion indicates priority for validation; it does not yet indicate that the backend is exploitable.

**Recommended Validation**
- Risk Explicit: Review parameter description, default values, and examples for explicit dangerous expressions.
- Risk Implicit: Parameter injection, encoding variants, boundary parameters, and downstream passthrough testing.
- Required Conditions: Shadow sandbox, controlled test data, call traces, and Mock downstream services.

**Potential Quality Associations**
- Tool-Agent: FM-04 Parameter Generation Error, FM-05 Call Contract Mismatch, FM-08 Exception Recovery Failure.
- Recommended Supplementary Tests: Missing parameters, illegal formats, oversized input, downstream error returns.

**Current Evidence Status**
- Static Defect: Confirmed
- Dynamic Exploitability: Not verified
- Quality Association: Not verified
- Compensating Control: To be confirmed

**Remediation and Regression**
- Recommendation: Define structured parameters, format constraints, allowlist, and backend validation.
- Minimum Regression: Inspect Tool re-inspection + associated Risk + illegal parameter Quality test cases.
```

<a id="551-report-wording-requirements"></a>
#### 5.5.1 Report Wording Requirements

| Permissible Wording | Prohibited Wording |
|--------------------|--------------------|
| "May expand the attack surface" | "Has already been attacked" |
| "Recommended to prioritize validation" | "Vulnerability necessarily exists" |
| "Candidate quality root cause" | "Quality failure is caused by this defect" |
| "Relies on compensating controls" | "Completely secure" |
| "Not reproduced under current test conditions" | "Absolutely unexploitable" |

<a id="56-remediation-re-inspection-and-regression-evidence"></a>
### 5.6 Remediation, Re-inspection, and Regression Evidence

<a id="561-remediation-closed-loop"></a>
#### 5.6.1 Remediation Closed Loop

```
Discovery
→ Mapping
→ Validation / Supplementary Testing
→ Manual Confirmation
→ Remediation
→ Static Re-inspection
→ Dynamic Security Regression
→ Quality Regression
→ Closure Approval
```

<a id="562-minimum-evidence-package"></a>
#### 5.6.2 Minimum Evidence Package

Each closed high-priority defect or defect chain must retain at minimum:

| Category | Minimum Evidence |
|----------|-----------------|
| Pre-remediation | Original artifact version, QD evidence, mapping version, initial risk description |
| Remediation content | Pull Request, change description, new artifact version, approval record |
| Static re-inspection | Inspect re-inspection report and rule version |
| Dynamic validation | Risk test cases, environment, A/B/C/D results, traces, and logs |
| Quality regression | Test suite, test case version, outputs, reliability or metrics, Gate conclusion |
| Compensating controls | IAM, backend validation, approval, gateway, or isolation configuration and verification evidence |
| Closure conclusion | Responsible person, reviewer, closure date, residual risk, and subsequent monitoring requirements |

<a id="563-closure-determination"></a>
#### 5.6.3 Closure Determination

For defect chains that have been dynamically validated as exploitable, closure must not rely solely on "attack payloads no longer succeeding." At minimum, confirm:

1. The original static defect has been remediated or formally accepted as an exception;
2. Similar variants and adjacent attack paths have been regressed;
3. High-risk Tools and backend still retain hard protections;
4. Quality regression has not introduced task failures or boundary behavior degradation;
5. Artifact, test, environment, and evidence versions are all traceable.

---

## Appendix A: QD Defect to Security Impact and Validation Strategy Mapping

> This appendix defines **mapping directions**, it does not automatically determine static defects as EX risks, dynamic vulnerabilities, or actual security incidents.
>
> Risk Explicit content in this appendix only indicates suggested priority review directions; specific `EX` classification must be independently determined by Risk Explicit.

<a id="a1-prompt-defect-mapping"></a>
### A.1 Prompt Defect Mapping

| QD Rule | Name | Applicability | Primary Attack Surface | Potential Impact | Mapping Strength | Recommended Validation |
| --- | --- | --- | --- | --- | --- | --- |
| `QD-P-1.1.1` | Direct Contradiction | AC-L1~L3 | AS-01, AS-05 | D2, D3 | Strong | Conflicting instructions, rule priority, examples overriding body rules, multi-turn context testing |
| `QD-P-1.1.2` | Priority Conflict | AC-L1~L3 | AS-01, AS-05 | D2, D3 | Strong | Rule priority, security and task objective conflicts, multi-turn context testing |
| `QD-P-1.1.3` | Example-Rule Contradiction | AC-L1~L3 | AS-01 | D2, D3 | Strong | Examples overriding body rules, multi-turn context testing |
| `QD-P-1.2.1` | Role-Responsibility Mismatch | AC-L1~L3 | AS-04, AS-09 | D2, D3, Availability | Strong | Out-of-role tasks, responsibility and constraint conflicts, handoff and refusal testing |
| `QD-P-1.2.2` | Role-Output Style Mismatch | AC-L1~L3 | AS-03 | Auditability | Medium | Output style consistency, tone and role matching testing |
| `QD-P-1.2.3` | Constraint-Responsibility Mismatch | AC-L1~L3 | AS-04, AS-09 | D2, D3 | Strong | Responsibility and constraint conflicts, handoff and refusal testing |
| `QD-P-1.2.4` | Identity and Anthropomorphization Boundaries | AC-L1~L3 | AS-01, AS-04 | D1, D3 | Medium | Identity declaration, anthropomorphic tone, over-trust and privilege-guidance testing |
| `QD-P-1.3.1` | Quantifier Misuse | AC-L1~L3 | AS-01, AS-04 | D2, D3 | Medium | Vague quantifier variants, adjacent permission and boundary request testing |
| `QD-P-1.3.2` | Vague Qualifiers | AC-L1~L3 | AS-01, AS-04 | D2, D3 | Medium | Qualifier boundaries, adjacent permission and boundary request testing |
| `QD-P-1.3.3` | Undefined Boundaries | AC-L1~L3 | AS-01, AS-04 | D1, D2, D3 | Strong | Adjacent permission and boundary requests, out-of-bounds and scope expansion testing |
| `QD-P-1.4.1` | Duplicate Constraints and Redundant Expressions (suggestion item) | AC-L1~L3 | AS-06 | Availability, Auditability | Conditional | Duplicate rule consistency, redundancy resolution, and token budget testing |
| `QD-P-1.4.3` | Invalid Skill Definitions | AC-L2/L3 | AS-05, AS-09 | D2, D3, Availability | Strong | Invalid Skill references, unreachable branches, dead rules, and call path testing |
| `QD-P-1.5.1` | Responsibilities Do Not Support the Objective | AC-L1~L3 | AS-05, AS-07, AS-09 | D2, D3, Availability | Strong | Objective completion, workflow dependency, and exception path testing |
| `QD-P-1.5.2` | Resources Do Not Support Workflow | AC-L2/L3 | AS-05, AS-07, AS-09 | D2, D3, Availability | Strong | Resource reachability, workflow dependency, and exception path testing |
| `QD-P-1.6.1` | Critical Decision Word Vagueness | AC-L1~L3 | AS-01, AS-04 | D1, D2, D3 | Strong | Boundary-word variants such as "sensitive", "necessary", "reasonable", and conflict condition testing |
| `QD-P-1.6.2` | Rules Depending on Model Internal State | AC-L1~L3 | AS-01, AS-07 | D1, D2, D3, Availability | Conditional | Stability testing of rules related to uncertainty, malicious intent, and confidence levels |
| `QD-P-1.6.3` | Soft Rule Interweaving Without Arbitration | AC-L1~L3 | AS-01, AS-07 | D1, D2, D3, Availability | Strong | Soft rule conflicts, absence of arbitration, multi-turn conflict condition testing |
| `QD-P-1.6.4` | Reasoning Method Constraints | AC-L1~L3 | AS-01 | Availability | Conditional | Reasoning-constraint followability and cross-turn consistency testing |
| `QD-P-1.6.5` | Self-Referential or Recursive Constraints | AC-L1~L3 | AS-06, AS-07 | Availability | Medium | Recursion termination, self-reference resolution, and resource exhaustion testing |
| `QD-P-1.6.6` | Implicit Assumption Dependency | AC-L1~L3 | AS-01, AS-07 | D2, Availability | Conditional | Implicit premise, knowledge update, and abnormal condition testing |
| `QD-P-1.6.7` | Non-Monotonic Reasoning Defects | AC-L1~L3 (N/A for single-turn) | AS-07 | D2, Availability | Conditional | Cross-turn state, committed conclusions, and new-information revision testing |
| `QD-P-1.6.8` | Rule Followability | AC-L1~L3 | AS-01 | Availability | Conditional | Stability testing of unreliable-capability constraints such as counting, timing, and arithmetic |
| `QD-P-2.1.2` | Reference Clarity | AC-L2/L3 | AS-09 | Availability, Auditability | Medium | Reference resolution, format parsing, critical constraint reachability testing |
| `QD-P-2.1.3` | Structural Hierarchy Reasonableness (suggestion item) | AC-L1~L3 | AS-01 | Availability, Auditability | Conditional | Paragraph length, hierarchy depth, critical constraint reachability testing |
| `QD-P-2.1.5` | Context Budget Encroachment (suggestion item) | AC-L1~L3 | AS-06 | Availability | Conditional | Context budget occupancy, critical constraints being encroached testing |
| `QD-P-2.2.1` | Undeclared Input Source | AC-L1~L3 (N/A when the input source is self-evident) | AS-01, AS-03 | D1, D2, D3 | Strong | Source confusion testing across user input, history records, external documents, and Tool returns |
| `QD-P-2.2.2` | Unconstrained Input Format | AC-L1~L3 | AS-02, AS-07 | D2, D3, Availability | Strong | Null values, malformed formats, missing fields, encoding variant testing |
| `QD-P-2.2.3` | Required/Optional Not Distinguished | AC-L1~L3 (N/A for free-text input) | AS-02, AS-07 | D2, D3, Availability | Strong | Missing fields, default value manipulation, and encoding variant testing |
| `QD-P-2.2.4` | Undefined Missing-Input Handling | AC-L1~L3 | AS-02, AS-07 | D2, D3, Availability | Strong | Null values, missing fields, default value manipulation, and encoding variant testing |
| `QD-P-2.3.1` | Undefined Output Format | AC-L1~L3 (applies when output is machine-consumed) | AS-03, AS-09 | D1, D2, Auditability | Strong | Output parsing, required fields, format bypass testing |
| `QD-P-2.3.2` | Incomplete Output Schema | AC-L1~L3 (N/A when structured output is not declared) | AS-03, AS-09 | D1, D2, Auditability | Strong | Structured output, Schema validation, and required field testing |
| `QD-P-2.3.4` | Missing Security/Privacy Filtering | AC-L1~L3 (otherwise N/A) | AS-03 | D1 | Conditional | PII requests, Prompt extraction, sensitive context output and exfiltration testing |
| `QD-P-2.3.5` | Factuality and Hallucination Control Declaration | AC-L2/L3 (N/A without retrieval/tools/external knowledge) | AS-03 | D2, Auditability | Conditional | Unsupported fabrication, hallucination, and factuality regression testing |
| `QD-P-2.3.6` | Output Length and Truncation | AC-L1~L3 | AS-03 | D2, Availability | Medium | Oversized output, maximum length, and truncation completeness testing |
| `QD-P-2.3.7` | Output Language/Localization and Conventions | AC-L1~L3 (N/A for single region) | AS-03 | D2, Auditability | Conditional | Language, time zone, currency, unit, and percentage convention testing |
| `QD-P-2.4.1` | Incomplete Workflow Steps | AC-L2/L3 | AS-05, AS-07, AS-09 | D2, D3, Availability | Strong | Step order, prerequisites, missing steps, failure fallback testing |
| `QD-P-2.4.2` | Undeclared Resources/Tools | AC-L2/L3 | AS-05, AS-09 | D2, D3, Availability | Strong | Undeclared tool/resource, call path reachability testing |
| `QD-P-2.4.3` | Incorrect Tool Invocation Parameters or Order | AC-L2/L3 | AS-05, AS-09 | D2, D3, Availability | Medium | Parameter construction, call order, alternative call after failure testing |
| `QD-P-2.4.4` | Multi-Turn Context, State, and Memory Boundaries | AC-L2/L3 (N/A for single-turn stateless) | AS-01, AS-07 | D1, D2, D3 | Medium | Multi-turn state pollution, memory boundaries, cross-turn context testing |
| `QD-P-2.5.1` | Missing Termination Constraints | AC-L2/L3 | AS-06 | Availability | Strong | Loop, recursion, retry, timeout, and budget exhaustion testing |
| `QD-P-2.5.2` | Missing Security Boundary Constraints | AC-L1~L3 | AS-01, AS-03, AS-04 | D1, D2, D3 | Strong | Single-turn/multi-turn injection, indirect injection, goal hijacking, system prompt extraction testing |
| `QD-P-2.5.3` | Missing Permission Control Boundaries | AC-L2/L3 | AS-04, AS-05 | D2, D3 | Strong | Role escalation, cross-user, cross-tenant, read/write/delete, and privilege escalation testing |
| `QD-P-2.5.4` | Undefined Constraint Priority | AC-L2/L3 | AS-01, AS-07 | D1, D2, D3 | Strong | Security, efficiency, and task completion objective conflict testing |
| `QD-P-2.5.6` | Instruction-Data Trust Boundary | AC-L2/L3 | AS-01, AS-02 | D1, D2, D3 | Strong | Instruction/data confusion, injection, and goal hijacking testing |
| `QD-P-2.5.7` | Human Confirmation for High-Risk/Irreversible Operations | AC-L2/L3 (N/A when no such operations exist) | AS-05 | D2, D3 | Conditional | High-risk operation confirmation, cancellation, rollback, and side effect testing |
| `QD-P-2.5.8` | System Prompt Confidentiality and Leak Response | AC-L2/L3 | AS-01, AS-03 | D1 | Strong | System prompt extraction, leak response, and confidentiality declaration testing |
| `QD-P-2.5.9` | Industry Compliance and Disclaimer Boundaries | AC-L1~L3 (otherwise N/A) | AS-05 | D2, Auditability | Conditional | Medical/financial/legal domain disclaimer and out-of-scope compliance testing |
| `QD-P-2.6.1` | Runtime Exceptions Not Covered | AC-L2/L3 | AS-07 | D1, D2, D3, Availability | Strong | Timeout, permission denial, rate limiting, data format errors, and dependency failure testing |
| `QD-P-2.6.2` | Missing Degradation and Recovery Strategy | AC-L3 | AS-07 | Availability | Medium | Degradation, recovery, partial completion, and exception path testing |
| `QD-P-2.6.3` | Unreasonable Retry Mechanism | AC-L3 | AS-06, AS-07 | Availability | Medium | Retry count, backoff, duplicate execution, and idempotency testing |
| `QD-P-2.6.4` | Out-of-Scope Request Refusal and Human Handoff | AC-L1~L3 | AS-01, AS-04 | D2, D3 | Strong | Refusal template, handoff target, escalation conditions, and out-of-scope request testing |
| `QD-P-2.7.1` | Insufficient Positive Example Representativeness (suggestion item) | AC-L1~L3 | AS-01, AS-05 | D2 | Conditional | Positive example coverage and adversarial regression testing |
| `QD-P-2.7.2` | Insufficient Counter-Example Coverage (suggestion item) | AC-L1~L3 | AS-01, AS-05 | D2 | Conditional | Counter-example coverage and dangerous request adversarial testing |
| `QD-P-2.7.3` | Missing Boundary-Case Examples (suggestion item) | AC-L1~L3 | AS-01, AS-05 | D2 | Conditional | Boundary case and dangerous request adversarial regression testing |

> **Notes**:
> - Suggestion items (ungraded) carry optimization value only: no deduction, no blocking, no waiver, and their mapping strength is uniformly marked `conditional`.
> - Deprecated/deleted/merged rules are no longer mapped: `QD-P-2.5.5` (deprecated), `QD-P-2.1.1` (deleted; its injection point merged into 2.5.6), `QD-P-1.4.2` (deleted), `QD-P-2.3.3` (deleted), `QD-P-2.1.4` (merged into 1.4.1).

<a id="a2-skill-defect-mapping"></a>
### A.2 Skill Defect Mapping

| QD Rule | Name | Applicability | Primary Attack Surface | Potential Impact | Mapping Strength | Recommended Validation |
| --- | --- | --- | --- | --- | --- | --- |
| `QD-S-0.1~0.9` | Basic Compliance | OR-L1~L3 | AS-09 | Availability, Auditability | Medium | Parsing, field completeness, version and metadata consistency testing |
| `QD-S-1.1` | Input Boundary Missing | OR-L1~L3 (N/A when platform budget evidence exists) | AS-06 | Availability | Strong | Large input, call count, timeout, and budget exhaustion testing |
| `QD-S-1.2` | Output Size Missing | OR-L1~L3 | AS-06 | Availability | Strong | Large output, maximum length, and budget exhaustion testing |
| `QD-S-1.3` | Execution Resource Boundary Missing | OR-L1~L3 (downgraded to SHOULD / N/A with traceable configuration evidence) | AS-06 | Availability | Strong | Timeout, maximum call count, budget exhaustion, and loop testing |
| `QD-S-1.4` | Permission Boundary Missing | OR-L1~L3 | AS-04, AS-05 | D2, D3 | Strong | Read/write/delete confusion, dangerous operations, and least privilege testing |
| `QD-S-1.5` | Data Source Boundary Missing | OR-L1~L3 | AS-01, AS-03, AS-04 | D1, D3 | Medium | Historical session pollution, cross-user, external resources, and data source testing |
| `QD-S-2.1` | Unbounded Quantity Declaration | OR-L1~L3 | AS-06 | Availability | Conditional | Full-request, unbounded quantity, and budget exhaustion testing |
| `QD-S-2.2` | Unterminated Execution Declaration | OR-L1~L3 | AS-06 | Availability | Conditional | Loop, until-success, timeout, and budget exhaustion testing |
| `QD-S-2.3` | Open-Ended Enumeration in Structure Declaration | OR-L1~L3 | AS-06, AS-07 | Availability, D2 | Medium | Open output structure, enumeration explosion, and parsing testing |
| `QD-S-2.4` | Broad Capability Verbs | OR-L1~L3 | AS-04, AS-05 | D2, D3 | Conditional | Semantic expansion testing for words like "manage", "process", "fix" |
| `QD-S-3.1` | Vague Trigger Conditions | OR-L1~L3 | AS-01, AS-04 | D1, D2, D3 | Medium | Adjacent intent, mixed intent, and false trigger testing |
| `QD-S-3.2` | Missing Deactivation Conditions | OR-L1~L3 (counter-example may be waived when positive triggers are sufficiently bounded) | AS-01, AS-04 | D2, D3 | Medium | Negative intent, non-trigger scenarios, and false trigger testing |
| `QD-S-3.3` | Missing Ambiguous Input Handling Strategy | OR-L1~L3 | AS-01 | D2 | Medium | Insufficient information, format errors, ambiguous input, and fabricated content testing |
| `QD-S-3.4` | Undefined Task Scope | OR-L1~L3 | AS-01, AS-05 | D2, D3 | Strong | Goal hijacking, implicit tasks, scope expansion, and indirect delegation testing |
| `QD-S-3.5` | Undeclared Default Behavior | OR-L1~L3 | AS-05, AS-09 | D2, Availability | Medium | Empty input, default behavior, and error routing testing |
| `QD-S-3.6` | Metadata Expression Defects | OR-L1~L3 | AS-08 | D2, Availability | Medium | Similar Skills, name confusion, and incorrect routing testing |
| `QD-S-3.7` | Output Structure Contract Missing | OR-L1~L3 | AS-03, AS-09 | D2, Availability, Auditability | Medium | Output format, required fields, empty results, and downstream parsing consistency testing |
| `QD-S-4.1` | Undefined Failure Behavior | OR-L1~L3 | AS-07 | Availability | Strong | Tool failure, exception paths, and failure behavior testing |
| `QD-S-4.2` | Undeclared Partial Completion Legitimacy | OR-L1~L3 | AS-07 | D2, Availability | Medium | Partial completion, half-completed states, and consistency testing |
| `QD-S-4.3` | Missing Post-Failure Prohibited Behaviors | OR-L1~L3 | AS-05, AS-07 | D2, D3 | Medium | Post-failure prohibited behavior, fallback, and side effect testing |
| `QD-S-4.4` | Undefined Error Recovery Path | OR-L1~L3 (N/A for L1 without tool calls) | AS-07 | Availability | Medium | Error recovery, retry, degradation, and human takeover testing |
| `QD-S-5.1` | Read/Write/Delete Permissions Not Distinguished | OR-L1~L3 | AS-04, AS-05 | D2, D3 | Strong | Read request inducing write/delete, permission convergence, and side effect testing |
| `QD-S-5.2` | Missing High-Risk Operation Confirmation Mechanism | OR-L3 | AS-05 | D2, D3 | Strong | Vague confirmation, negative confirmation, repeated confirmation, and cancellation confirmation testing |
| `QD-S-5.3` | Undeclared Environment Boundaries | OR-L1~L3 (condition: multiple environments reachable, otherwise N/A) | AS-04, AS-05 | D2, D3 | Medium | Test/production environment confusion and production resource access testing |
| `QD-S-5.4` | Undeclared Chained Invocation Permissions | OR-L1~L3 (condition: `allow_skill_chaining=true`, otherwise N/A) | AS-04, AS-05, AS-07 | D1, D2, D3 | Medium | Downstream Skill whitelist, call depth, and permission inheritance testing |

> **Notes**:
> - QD-S-0.x are entry thresholds (basic compliance): no P grading, no deduction, no scoring, pass/not-pass only, uniformly mapped to AS-09.
> - Same-root deduplication: QD-S-1.4 / QD-S-2.4 are counted into QD-S-5.1; QD-S-2.1 / QD-S-2.2 are the automatic trigger word lists for QD-S-1.1 / QD-S-1.3 respectively; QD-S-4.3 is counted into QD-S-4.1.

<a id="a3-tool-defect-mapping"></a>
### A.3 Tool Defect Mapping

| QD Rule | Name | Applicability | Primary Attack Surface | Potential Impact | Mapping Strength | Recommended Validation |
| --- | --- | --- | --- | --- | --- | --- |
| `QD-T-1.1` | Base Field Missing | OR-L1~L3 | AS-05, AS-09 | D2, Availability | Medium | Tool selection, Schema parsing, required fields, enumeration, and version compatibility testing |
| `QD-T-1.2` | required References Undefined Field | OR-L1~L3 | AS-02, AS-09 | D2, Availability | Medium | `required` referencing an undefined field, required fields, Schema parsing, and version compatibility testing |
| `QD-T-1.3` | enum–type Conflict / Duplicate Values | OR-L1~L3 | AS-02, AS-09 | D2, Availability | Medium | enum–type conflict, duplicate values, Schema validation, and version compatibility testing |
| `QD-T-1.4` | Inappropriate additionalProperties Policy | OR-L1~L3 | AS-02, AS-04 | D1, D2, D3 | Strong | Additional fields, reserved fields, role, tenant, and token field injection testing |
| `QD-T-1.5` | Name Validity and Uniqueness | OR-L1~L3 | AS-05, AS-08 | D2, Availability | Medium | Name validity, uniqueness, similar Tool name confusion, and incorrect routing testing |
| `QD-T-1.6` | Constraint Self-Consistency and default | OR-L1~L3 | AS-02, AS-09 | D2, Availability | Medium | `default` and constraint self-consistency, Schema validation, and default value manipulation testing |
| `QD-T-1.7` | Missing type / Overly Broad Type | OR-L1~L3 | AS-02, AS-09 | D2, Availability | Medium | Missing/overly broad `type`, type confusion, and Schema parsing testing |
| `QD-T-2.1` | String Type Without Length Constraint | OR-L1~L3 | AS-02, AS-06 | D2, D3, Availability | Medium | Oversized strings, length boundaries, resource exhaustion, and extreme value testing |
| `QD-T-2.2` | String Type Without Format Constraint | OR-L1~L3 | AS-02, AS-07 | D2, D3, Availability | Medium | Format, encoding variants, malformed input, and extreme value testing |
| `QD-T-2.3` | Number/Integer Type Without Boundary Constraint | OR-L1~L3 | AS-02, AS-06 | D2, D3, Availability | Medium | Numeric boundaries, overflow, zero values, and extreme value testing |
| `QD-T-2.4` | Array Type Without Length Constraint | OR-L1~L3 | AS-02, AS-06 | D2, D3, Availability | Medium | Array length, batch elements, and extreme value testing |
| `QD-T-2.5` | Missing Unit/Precision/Time Zone/Currency Semantics | OR-L1~L3 | AS-02, AS-09 | D2, Availability | Medium | Unit, currency, precision, time zone semantics, and end-to-end consistency testing |
| `QD-T-2.6` | Query Tool Without Pagination/Result-Set Cap | OR-L1~L3 | AS-06 | D2, Availability | Medium | Pagination, result-set cap, full return, and budget exhaustion testing |
| `QD-T-2.7` | Unexpressed Inter-Parameter Dependencies/Exclusivity | OR-L1~L3 | AS-02, AS-07 | D2, Availability | Medium | Inter-parameter dependency, exclusivity, combined conditions, and conflicting field testing |
| `QD-T-3.1` | State Change and Material Side Effect Declaration | OR-L2/L3 | AS-05 | D2, D3 | Strong | State change, write operation misselection, confirmation, rollback, and idempotency testing |
| `QD-T-3.2` | Untrusted Input Entering an Executable Context | OR-L1~L3 | AS-02 | D1, D2, D3 | Strong | Parameter injection, encoding bypass, parameter pollution, and downstream passthrough testing |
| `QD-T-3.3` | Batch/Range Write Operation Without Cap | OR-L2/L3 | AS-05, AS-06 | D2, Availability | Medium | Maximum batch, batch bypass, cancellation, interruption recovery, and duplicate submission testing |
| `QD-T-3.4` | Authorization Context Parameter Exposure | OR-L1~L3 | AS-04 | D1, D2, D3 | Strong | `tenantId`, `isAdmin`, role, token, and control flag tampering testing |
| `QD-T-3.6` | Dangerous Default Values and Operation Scope Preconditions | OR-L2/L3 | AS-05 | D2, D3 | Medium | Dangerous default values, operation scope preconditions, and default behavior trigger testing |
| `QD-T-3.7` | Undeclared Operation Allowlist for Parameterized Tools | OR-L1~L3 | AS-02, AS-04, AS-05 | D1, D2, D3 | Strong | Out-of-allowlist operation injection, arbitrary SQL/command execution, unauthorized table access, and direct reach of dangerous actions testing |
| `QD-T-4.1` | Insufficient description Quality | OR-L1~L3 | AS-05, AS-08 | D2, D3, Availability | Medium | Similar Tools, near-synonym expressions, ambiguous tasks, and malicious Tool selection guidance testing |
| `QD-T-4.4` | Missing Parameter-Level description | OR-L1~L3 | AS-05, AS-08 | D2, Availability | Medium | Parameter semantics, similar parameter confusion, and parameter construction testing |
| `QD-T-4.5` | description–Schema Inconsistency | OR-L1~L3 | AS-05, AS-08 | D2, Availability | Medium | description–Schema consistency, parameter construction, and Schema validation testing |
| `QD-T-4.6` | Sensitive Input Handling Declaration | OR-L2/L3 | AS-03 | D1 | Conditional | Sensitive input, PII, credential handling, and exfiltration testing |
| `QD-T-4.7` | Missing Output Contract (outputSchema) | OR-L2/L3 | AS-03, AS-09 | D1, D2, Availability | Medium | Output structure, required fields, and downstream parsing consistency testing |
| `QD-T-5.1` | Breaking Change Determination | Change inspection | AS-08, AS-09 | D2, D3, Availability | Conditional | Old/new Schema replay, caller compatibility, migration, and rollback testing |
| `QD-T-5.2` | Change Impact Assessment Omission or Error | Change inspection | AS-08, AS-09 | D2, D3, Availability | Conditional | Old/new Schema replay, caller compatibility, migration, and rollback testing |
| `QD-T-5.3` | Semantic Change | Change inspection | AS-08, AS-09 | D2, D3, Availability | Conditional | Semantic change, old/new Schema replay, caller compatibility, and migration rollback testing |

> **Notes**:
> - Transferred rules (cross-Tool semantics moved to the Cross namespace): `QD-T-3.5` Cross-Tool Data Flow → `QD-TT-5.1`; `QD-T-4.3` Multi-Tool Semantic Competition → `QD-TT-5.2`.
> - Merged rules: `QD-T-4.2` Undeclared Side Effects → merged into `QD-T-3.1` (State Change and Material Side Effect Declaration).
> - `QD-T-5.x` are change inspection items, currently not connected to the checklist/scoring/Gate; mapping strength is uniformly marked `conditional`.

<a id="a4-cross-defect-mapping"></a>
### A.4 Cross Defect Mapping

| QD Rule | Name | Applicability | Primary Attack Surface | Potential Impact | Mapping Strength | Recommended Validation |
| --- | --- | --- | --- | --- | --- | --- |

**QD-PS · Prompt→Skill (7 items)**

| QD Rule | Name | Applicability | Primary Attack Surface | Potential Impact | Mapping Strength | Recommended Validation |
| --- | --- | --- | --- | --- | --- | --- |
| `QD-PS-1.1` | Skill Authorization Consistency | AC-L1~L3 | AS-04, AS-09 | D2, D3 | Strong | Prompt→Skill unauthorized invocation, name confusion, and capability expansion testing |
| `QD-PS-1.2` | Trigger Condition Consistency | AC-L2/L3 | AS-01, AS-05 | D2, D3 | Medium | Trigger, non-trigger, adjacent intent, and mixed intent testing |
| `QD-PS-1.3` | Permission Boundary Consistency | AC-L1~L3 | AS-04, AS-09 | D2, D3 | Strong | Prompt→Skill permission boundaries, unauthorized access, and least privilege testing |
| `QD-PS-1.4` | Resource Access Consistency | AC-L2/L3 | AS-03, AS-04 | D1, D2, D3 | Medium | Prompt→Skill resource sources, cross-tenant, and data leakage testing |
| `QD-PS-1.5` | Failure Handling Consistency | AC-L3 | AS-07, AS-09 | D2, Availability | Medium | End-to-end failure, recovery, and exception path testing |
| `QD-PS-1.6` | Output Constraint Consistency | AC-L3 | AS-03, AS-09 | D1, D2, Auditability | Medium | Output format, data leakage, and downstream parsing testing |
| `QD-PS-1.7` | Orchestration Order and Prerequisite Consistency | AC-L2/L3 | AS-05, AS-09 | D2, Availability | Medium | Step order, prerequisites, missing steps, failure fallback testing |

**QD-PT · Prompt→Tool (7 items)**

| QD Rule | Name | Applicability | Primary Attack Surface | Potential Impact | Mapping Strength | Recommended Validation |
| --- | --- | --- | --- | --- | --- | --- |
| `QD-PT-2.1` | Tool Existence | AC-L1~L3 | AS-05, AS-09 | D2, Availability | Strong | Prompt→Tool name, existence, and call path reachability testing |
| `QD-PT-2.2` | Invocation Specification Consistency | AC-L1~L3 | AS-02, AS-09 | D2, Availability | Strong | Prompt→Tool invocation specification, parameter, and call order consistency testing |
| `QD-PT-2.3` | Parameter Constraint Consistency | AC-L2/L3 | AS-02, AS-09 | D2, Availability | Medium | Prompt→Tool parameter constraints, Schema validation, and compatibility testing |
| `QD-PT-2.4` | Permission Granularity Consistency | AC-L1~L3 | AS-04, AS-05 | D2, D3 | Strong | High-risk Tool invocation, confirmation, permission, and side effect testing |
| `QD-PT-2.5` | Key Error Handling Coverage | AC-L3 | AS-07 | D2, Availability | Medium | Rate limiting, timeout, permission errors, and error classification handling testing |
| `QD-PT-2.6` | Business-Level Invocation Frequency / Batch Expectation Declaration | AC-L3 | AS-06 | Availability | Medium | Invocation frequency, batch, call budget, and duplicate execution testing |
| `QD-PT-2.7` | Parameter Semantics and Unit Consistency | AC-L2/L3 | AS-02, AS-09 | D2, Availability | Medium | Unit, currency, precision, time zone, and semantic convention end-to-end testing |

**QD-ST · Skill→Tool (7 items)**

| QD Rule | Name | Applicability | Primary Attack Surface | Potential Impact | Mapping Strength | Recommended Validation |
| --- | --- | --- | --- | --- | --- | --- |
| `QD-ST-3.1` | Tool Existence | AC-L1~L3 | AS-05, AS-09 | D2, Availability | Strong | Skill→Tool name, existence, and call path reachability testing |
| `QD-ST-3.2` | Input Constraint Consistency | AC-L2/L3 | AS-02, AS-09 | D2, Availability | Medium | Skill→Tool input constraints, Schema validation, and boundary testing |
| `QD-ST-3.3` | Required Parameter Preparation | AC-L2/L3 | AS-02, AS-09 | D2, Availability | Medium | Skill→Tool parameter sources, required fields, and Schema validation testing |
| `QD-ST-3.4` | Business-Level Invocation Frequency / Batch Expectation Declaration | AC-L3 | AS-06 | Availability | Medium | Maximum call count, batch, and budget testing |
| `QD-ST-3.5` | Output Structure Match | AC-L3 | AS-03, AS-09 | D1, D2, Auditability | Medium | Tool return structure, downstream parsing, citation, or format testing |
| `QD-ST-3.6` | Permission Scope Match | AC-L1~L3 | AS-04, AS-05 | D2, D3 | Strong | Skill→Tool actual side effects, read/write/delete, and confirmation testing |
| `QD-ST-3.7` | Key Error Handling Coverage | AC-L3 | AS-07, AS-09 | D1, D2, Availability | Medium | Tool error classification, degradation, stop, retry, and human takeover testing |

**QD-CYC · Circular Invocation (3 items)**

| QD Rule | Name | Applicability | Primary Attack Surface | Potential Impact | Mapping Strength | Recommended Validation |
| --- | --- | --- | --- | --- | --- | --- |
| `QD-CYC-1.1` | Cross-Artifact Circular Invocation | AC-L2/L3 | AS-06 | Availability | Medium | Loop termination, cross-artifact circular invocation, and resource exhaustion testing |
| `QD-CYC-1.2` | Multi-Agent Circular Invocation | AC-L3 | AS-06 | Availability | Medium | Multi-Agent circular invocation, loop termination, and resource exhaustion testing |
| `QD-CYC-1.3` | Skill-to-Skill Handoff Loop | AC-L2/L3 | AS-06 | Availability | Medium | Handoff termination conditions, maximum rounds, and downstream allowlist closed-loop testing |

**QD-SS · Skill↔Skill (2 items)**

| QD Rule | Name | Applicability | Primary Attack Surface | Potential Impact | Mapping Strength | Recommended Validation |
| --- | --- | --- | --- | --- | --- | --- |
| `QD-SS-4.1` | Trigger Condition Conflict | AC-L2/L3 | AS-01, AS-05 | D2, D3 | Medium | Overlapping triggers, adjacent/negative intent, and Skill priority testing |
| `QD-SS-4.2` | Name Uniqueness / Near-Duplicate Misleading | AC-L2/L3 | AS-05, AS-08 | D2, D3 | Medium | Misselection caused by identical names, spelling/singular-plural/synonym similarity testing |

**QD-TT · Tool↔Tool (3 items)**

| QD Rule | Name | Applicability | Primary Attack Surface | Potential Impact | Mapping Strength | Recommended Validation |
| --- | --- | --- | --- | --- | --- | --- |
| `QD-TT-5.1` | Cross-Tool Data Flow | AC-L2/L3 | AS-03, AS-05 | D1, D2, D3 | Strong | Cross-Tool data flow, data exfiltration, and end-to-end consistency testing |
| `QD-TT-5.2` | Multi-Tool Semantic Competition | AC-L2/L3 | AS-05, AS-08 | D2, D3 | Strong | Misselection caused by similar Tools, near-synonym requests, and semantic competition testing |
| `QD-TT-5.3` | Cross-Tool Data Structure Bridging | AC-L3 | AS-03, AS-09 | D2, Availability | Medium | Cross-Tool data structure bridging, downstream parsing, and Schema consistency testing |

> **Notes**:
> - QD-PS-1.6 and QD-ST-3.5 are same-root (output constraint/structure consistency); the deduplication primary is QD-ST-3.5.
> - QD-TT-5.1 / QD-TT-5.2 carry over from the Tool subset's QD-T-3.5 (Cross-Tool Data Flow) / QD-T-4.3 (Multi-Tool Semantic Competition); the original namespace no longer maps them repeatedly.

## A.5 Permission Defect Mapping

> `QD-PM-*` are produced by the Inspect Permission Governance subset (permission v1.1). This table only defines mapping directions,
> and does not automatically determine permission defects as EX risks or actual events; `EX` classification is still independently determined by Risk Explicit.
> The Permission subset executes after other subsets and is subject to Gate-0 preconditions; when Gate-0 is not met,
> no QD-PM defects are produced, and this table does not apply.

| QD Rule | Name | Applicability | Primary Attack Surface | Potential Impact | Mapping Strength | Recommended Validation |
| --- | --- | --- | --- | --- | --- | --- |
| `QD-PM-1.1~1.7` | Permission Alignment (responsibility proportionality; 1.7 is fixed P2) | AC-L1~L4 (1.6 aggregated capability is a conditional item, requiring a multi-permission combination form) | AS-04 | D2, D3, Availability | Strong | Out-of-role resource access, aggregated unauthorized access, and task failure or workaround due to insufficient permissions testing |
| `QD-PM-2.1~2.8` | Permission Scope (resource/data/environment/condition four axes) | AC-L1~L4 (2.5/2.6/2.7 are conditional items requiring the corresponding forms) | AS-04, AS-03 | D1, D2, D3 | Strong | Out-of-scope resource access, cross-tenant data reading, test/production environment confusion, and out-of-condition triggering testing |
| `QD-PM-3.1~3.6` | Permission Granularity (including 3.3 role substitution and 3.4 high-risk not separated, fixed P0) | AC-L1~L4 (3.4/3.5/3.6 are conditional items) | AS-04, AS-05 | D2, D3 | Strong | A single role completing "initiation + approval", high-risk and routine operations executed with the same authority, and role impersonation testing |
| `QD-PM-4.1~4.8` | Permission Propagation (including 4.2 downstream exceeds upstream, 4.4 delegation escalation, 4.8 external permissions; also the INHERITED overlap marker) | AC-L1~L4 (4.3/4.4/4.5/4.6 delegation chain items are AC-L4 only; 4.7 is AC-L2+; 4.8 is a conditional item) | AS-04, AS-07, AS-08 | D1, D2, D3 | Strong | Call chain permission inheritance, downstream vs upstream, delegation chain escalation, and external permission source testing |
| `QD-PM-5.1~5.7` | Permission Boundary (including 5.4 isolation substituting for fixed P0, 5.7 exemption uncontrolled) | AC-L1~L4 (5.4 applies unconditionally; 5.5/5.7 are conditional items requiring the corresponding forms) | AS-04, AS-05 | D2, D3 | Strong | Exemption trigger conditions, exemption expiration, and bypass after isolation substitutes for permission constraints testing |
| `QD-PM-6.1~6.7` | Permission Auditability (including 6.3 no human confirmation fixed P0, 6.5 inventory not enumerable fixed P0, 6.7 fixed P1) | AC-L1~L4 (6.6 requires AC-L2+; 6.1/6.2/6.3/6.4/6.7 are conditional items requiring OR-L2+/L3 or regulated data) | AS-05, AS-09 | D2, D3, Auditability | Medium (the group contains 6.3/6.5 fixed P0; group-level strength does not represent grading) | High-risk operation direct reach without confirmation, permission inventory not enumerable / not reviewable, and audit log missing testing |

> **Note**: QD-PM totals 43 items and is mapped here in 6 groups. The attack surfaces and impact types of group members use the group-level mapping as a common direction, but the recommended validation column of each group already lists the differentiated directions within the group; the group-level "mapping strength" indicates how strongly the group as a whole should be prioritized for validation and does not represent the severity level of member rules (see §1.3).

---

## Appendix B: Tool-Agent Failure Mode and Supplementary Test Mapping

> **Family wildcard convention**: Family wildcard notations in Appendices B/C/D such as `QD-P-1.x`, `QD-P-2.3.x`, `QD-T-2.x`, `QD-T-4.x`, and `QD-S-4.x` refer only to the **currently effective** members of that family, excluding numbers that have been deleted (`QD-P-2.1.1`, `QD-P-1.4.2`, `QD-P-2.3.3`), deprecated (`QD-P-2.5.5`), merged (`QD-T-4.2`), or transferred (`QD-T-3.5`→`QD-TT-5.1`, `QD-T-4.3`→`QD-TT-5.2`). The complete list of effective members is defined by Appendix A.

<a id="b1-qd-category-to-failure-mode-mapping"></a>
### B.1 QD Category to Failure Mode Mapping

| QD Category | Candidate Failure Modes | Recommended Supplementary Tests |
|-------------|------------------------|--------------------------------|
| Prompt logic contradiction, mismatch, implication defects | FM-01, FM-02, FM-07, FM-09 | Conflicting rules, out-of-role tasks, goal and constraint conflicts |
| Prompt input definition defects | FM-01, FM-04 | Empty input, missing fields, format errors, conflicting fields |
| Prompt output definition defects | FM-06 | Downstream parsing, Schema, required fields, stability |
| Prompt workflow and resource defects | FM-03, FM-04, FM-05 | Tool selection, parameter construction, call order, dependency passing |
| Prompt boundary, frequency, and termination defects | FM-08, FM-09, FM-10 | Maximum call count, confirmation, rate limiting, timeout, budget |
| Prompt exception handling defects | FM-08, FM-10 | Timeout, 429, permission denial, partial success, and idempotency |
| Prompt example design defects | FM-01, FM-07, FM-09 | Positive/negative examples, boundary examples, dangerous requests, multi-turn regression |
| Skill resource or unbounded declaration defects | FM-08, FM-10 | Large input, large batch, loop, budget, and timeout |
| Skill trigger, ambiguity, scope defects | FM-02, FM-07, FM-09 | Adjacent intent, negative intent, mixed intent, insufficient information |
| Skill failure expansion defects | FM-08, FM-09 | Tool failure, permission denial, insufficient data, partial completion |
| Skill permission and environment boundary defects | FM-05, FM-09 | Read/write/delete, production environment, chained calls, and confirmation |
| Tool structure and parameter defects | FM-03, FM-04, FM-05 | Schema, type, format, boundary values, extra fields |
| Tool high-risk operation defects | FM-08, FM-09, FM-10 | Write operations, batch, rollback, data flow, idempotency |
| Tool semantic competition defects | FM-03, FM-05 | Similar Tools, near-synonym requests, ambiguous tasks |
| Tool Schema change defects | FM-04, FM-05, FM-06 | Historical call replay, old/new version compatibility |
| Cross contract defects | FM-04, FM-05, FM-06, FM-08 | Prompt→Skill→Tool end-to-end call chain testing |
| Inter-Skill trigger conflict and name similarity (`QD-SS`) | FM-02, FM-03, FM-07 | Overlapping triggers, adjacent/negative intent, and misselection by identical or similar names testing |
| Cross-Tool data structure incompatibility (`QD-TT-5.3`) | FM-05, FM-06 | Type incompatibility, missing serialization/conversion step, and downstream parsing failure testing |
| Skill-to-Skill handoff loop (`QD-CYC-1.3`) | FM-08, FM-10 | Handoff termination conditions, maximum rounds, and downstream allowlist closed-loop testing |
| Permission proportionality defects (`QD-PM`) | FM-05, FM-09, FM-10 | Out-of-role unauthorized invocation, high-risk operations without confirmation, and task failure or workaround due to insufficient permissions testing |

<a id="b2-failure-fact-reverse-diagnostic-quick-reference"></a>
### B.2 Failure Fact Reverse Diagnostic Quick Reference

| Observed Failure | Priority Investigation Direction |
|-----------------|--------------------------------|
| Wrong Skill or Tool selected | `QD-S-3.1`, `QD-S-3.6`, `QD-T-4.1`, `QD-TT-5.2`, `QD-SS-4.1`, `QD-SS-4.2`, `QD-P-2.4.3` |
| Parameter missing, incorrect, or malformed format | `QD-P-2.2.x`, `QD-T-1.2`, `QD-T-2.x`, `QD-PT-2.3`, `QD-PT-2.7`, `QD-ST-3.3` |
| Call order, dependency, or state passing errors | `QD-P-2.4.1/2.4.3`, `QD-PS-1.7`, `QD-PT-2.2`, `QD-ST-3.1–3.3` |
| Downstream cannot consume output | `QD-P-2.3.x`, `QD-PS-1.6`, `QD-ST-3.5`, `QD-TT-5.3` |
| Repeated calls or direct interruption after exception | `QD-P-2.6.x`, `QD-S-4.x`, `QD-PT-2.5`, `QD-ST-3.7` |
| High-risk action missing confirmation | `QD-P-2.5.3`, `QD-S-5.2`, `QD-T-3.1`, `QD-PT-2.4`, `QD-ST-3.6` |
| Inconsistent results for same input | `QD-P-1.1.x`, `QD-P-1.6.x`, `QD-P-2.3.1/2.3.2`, `QD-S-3.5` |
| Call loops, abnormal cost, or timeout | `QD-P-2.5.1`, `QD-P-2.6.3`, `QD-S-1.3`, `QD-S-2.2`, `QD-CYC-1.3`, `QD-ST-3.4` |

---

## Appendix C: RAG-Agent Metrics and Supplementary Test Mapping

<a id="c1-qd-category-to-rag-quality-metrics-mapping"></a>
### C.1 QD Category to RAG Quality Metrics Mapping

| QD Category | Potentially Affected Metrics | Recommended Supplementary Tests |
|-------------|------------------------------|--------------------------------|
| Prompt logic contradiction, mismatch, implication defects | Correctness, Relevance, Consistency, Format Compliance | Rule conflicts, role boundaries, multi-constraint Q&A |
| Prompt gray zone defects | Consistency, Robustness, Boundary Recognition, Safety Response | Vague terms, multi-turn follow-ups, conflicting rules, knowledge updates |
| Prompt input definition defects | Relevance, Robustness, Decomposition Capability, Boundary Recognition | Colloquial rewrites, missing conditions, multi-intent, abnormal formats |
| Prompt output definition defects | Completeness, Traceability, Format Compliance, Consistency | Citations, structure, disclaimers, JSON/Markdown |
| Prompt workflow, resource, and Tool defects | Correctness, Traceability, Timeliness | Knowledge source selection, retrieval Tool, citation chain, and failure fallback |
| Prompt security, permission, and exception boundary defects | Boundary Recognition, Safety Response, Coherence | Unauthorized, sensitive, no-hit, handoff-required, and dependency failure |
| Prompt example design defects | Correctness, Robustness, Consistency, Format Compliance | Positive/negative examples, boundary expressions, adversarial rewrites |
| Skill resource and unbounded declaration defects | Completeness, Timeliness, Robustness | Large input, multi-documents, exceeding limits, partial completion |
| Skill trigger, scope, and ambiguity defects | Relevance, Decomposition Capability, Boundary Recognition | Intent boundaries, non-activation, clarification and handoff |
| Skill failure expansion defects | Completeness, Coherence, Safety Response | No hits, low-confidence sources, source conflicts, retrieval failure |
| Skill permission and environment boundary defects | Boundary Recognition, Safety Response, Traceability | Sensitive data, user identity, production data, external resources |
| Tool parameter and semantic defects | Correctness, Relevance, Traceability, Format Compliance | Retrieval parameters, source return, citation parsing, similar Tools |
| Cross contract defects | Correctness, Completeness, Consistency, Traceability, Safety Response | End-to-end retrieval, citation, error handling, permission, and output contracts |
| Inter-Skill trigger conflict and name similarity (`QD-SS`) | Relevance, Correctness, Boundary Recognition | Overlapping triggers, misselection by similar names, and direct answering where clarification is due |
| Cross-Tool data structure incompatibility (`QD-TT-5.3`) | Correctness, Traceability, Format Compliance | Retrieval result field type mismatch, missing serialization, and citation parsing failure |
| Skill-to-Skill handoff loop (`QD-CYC-1.3`) | Timeliness, Coherence | Handoff without termination, repeated routing, and response timeout |
| Permission proportionality defects (`QD-PM`) | Boundary Recognition, Safety Response, Traceability | Unauthorized retrieval, cross-tenant data access, and direct answering where refusal is due |

<a id="c2-rag-failure-reverse-diagnostic-quick-reference"></a>
### C.2 RAG Failure Reverse Diagnostic Quick Reference

| Quality Failure Fact | Priority Inspect Investigation Direction | Non-Inspect Causes to Exclude Simultaneously |
|--------------------|------------------------------------------|---------------------------------------------|
| Critical fact error | `QD-P-1.x`, `QD-P-2.4.x`, `QD-T-4.x`, `QD-ST-3.5` | Outdated knowledge, retrieval recall, re-ranking, model hallucination |
| Missing exceptions, limitations, or steps | `QD-P-2.3.x`, `QD-S-3.4`, `QD-S-4.2` | Incomplete baseline answers, context truncation, knowledge gaps |
| Off-topic response or missing multiple requests | `QD-P-1.2.x`, `QD-S-3.1/3.4`, `QD-T-4.x` | Intent recognition implementation, context construction, model capability |
| No citation or citation does not support conclusion | `QD-P-2.3.x`, `QD-P-2.4.x`, `QD-ST-3.5` | Retrieval metadata, citation chain implementation, knowledge base structure |
| Using outdated rules | `QD-P-1.6.7`, `QD-S-1.5`, `QD-T-5.x` | Knowledge snapshot, document lifecycle, index updates |
| Should have refused, clarified, or handed off but answered directly | `QD-P-2.5.2/2.5.3`, `QD-S-3.2`, `QD-S-5.x`, `QD-PS-1.3`, `QD-PM-5.x` | IAM, runtime Guardrail, identity context |
| Safety response correct but missing explanation, path, or alternative | `QD-P-2.3.x`, `QD-P-2.7.x`, `QD-S-4.x` | Business rules, response templates, evaluation criteria |
| Multi-turn self-contradiction | `QD-P-1.1.x`, `QD-P-1.6.x`, `QD-P-2.5.4`, `QD-S-3.5` | Session memory, context window, model or configuration changes |

---

## Appendix D: Typical Linked Defect Chains

> Defect chains represent candidate risk paths or failure modes formed by multiple interrelated static defects weakening defense depth or causing task failures.
> Defect chains do not represent that attacks, data leakage, or quality failures have occurred; they still require confirmation by Risk or Quality results.

<a id="d1-security-defect-chains"></a>
### D.1 Security Defect Chains

| ID | Defect Chain | Candidate Risk Result | Recommended Validation |
|----|--------------|----------------------|------------------------|
| `SC-01` | `QD-P-2.5.2` Missing Security Boundary Constraints + `QD-S-3.2` Missing Deactivation Conditions + `QD-T-3.2` Untrusted Input Entering an Executable Context | Indirect Prompt Injection inducing unauthorized Tool calls | Untrusted document/web content injection, encoding variants, end-to-end Tool call testing |
| `SC-02` | `QD-P-2.5.3` Missing Permission Control Boundaries + `QD-S-5.1` Read/Write/Delete Permissions Not Distinguished + `QD-T-3.1` State Change and Material Side Effect Declaration | Users inducing write, delete, or change with low-risk requests | Read request to write/delete operations, implicit confirmation, rollback, and audit testing |
| `SC-03` | `QD-S-5.2` Missing High-Risk Operation Confirmation Mechanism + `QD-T-3.3` Batch/Range Write Operation Without Cap + `QD-T-3.1` State Change and Material Side Effect Declaration | Batch deletion, batch exfiltration, or batch updates | Maximum batch, duplicate submission, interruption recovery, confirmation bypass testing |
| `SC-04` | `QD-S-1.5` Data Source Boundary Missing + `QD-TT-5.1` Cross-Tool Data Flow + `QD-P-2.3.4` Missing Security/Privacy Filtering | Cross-source aggregation of sensitive data to external Tool exfiltration | Tainted data flow, cross-tenant, external recipients, and anonymization testing |
| `SC-05` | `QD-S-5.3` Undeclared Environment Boundaries + `QD-S-5.4` Undeclared Chained Invocation Permissions + `QD-ST-3.6` Permission Scope Matching Defect | Test or low-privilege Skill indirectly operating production resources | Environment isolation, call chain permission inheritance, production operation simulation testing |
| `SC-06` | `QD-P-2.5.1` Missing Termination Constraints + `QD-S-1.3` Execution Resource Boundary Missing + `QD-S-2.2` Unterminated Execution Declaration | Infinite loop, call storm, cost or resource exhaustion | Maximum rounds, timeout, 429, budget exhaustion, and loop termination testing |
| `SC-07` | `QD-P-2.6.3` Unreasonable Retry Mechanism + `QD-S-4.1` Undefined Failure Behavior + `QD-T-3.1` State Change and Material Side Effect Declaration | Failure retry leading to duplicate payment, creation, or exfiltration | Idempotency, network interruption, partial success, duplicate request testing |
| `SC-08` | `QD-P-1.1.3` Example-Rule Contradiction + `QD-P-2.5.4` Undefined Constraint Priority + `QD-TT-5.2` Multi-Tool Semantic Competition | Examples inducing model to bypass rules and select the wrong Tool | Example-driven, multi-rule conflict, similar Tool selection testing |
| `SC-09` | `QD-T-1.4` Inappropriate `additionalProperties` Policy + `QD-T-3.4` Authorization Context Parameter Exposure + `QD-PT-2.4` Permission Granularity Consistency Defect | Forging tenant, role, or internal control fields to achieve privilege escalation | Additional fields, reserved fields, tenant ID, admin flag tampering testing |
| `SC-10` | `QD-P-2.2.1` Undeclared Input Source + `QD-S-3.4` Undefined Task Scope + `QD-TT-5.1` Cross-Tool Data Flow | Untrusted content changing task goals and guiding data exfiltration | Indirect injection, goal hijacking, and data exfiltration Tool chain testing |
| `SC-11` | `QD-PM-4.2` Downstream Exceeds Upstream + `QD-S-5.4` Undeclared Chained Invocation Permissions + `QD-ST-3.6` Permission Scope Matching Defect | Low-permission entry Skill indirectly obtains downstream high-permission Tool effective authority through call chain (ASI03 direction: un-scoped privilege inheritance) | Per-hop effective permission comparison in call chain, downstream Tool executing with upstream identity, INHERITED permission reclamation testing |
| `SC-12` | `QD-PM-4.4` Delegation Escalation + `QD-S-3.4` Undefined Task Scope + `QD-P-2.5.2` Missing Security Boundary Constraints | Goal hijacking obtains permissions beyond the initiator through delegation/sub-Agent and expands laterally (ASI01 → ASI03 direction) | Indirect injection triggering delegation, delegation chain permission upper bound, sub-task permission vs parent task comparison testing |
| `SC-13` | `QD-PM-3.4` High-Risk Not Separated + `QD-PM-6.3` No Human Confirmation + `QD-T-3.1` State Change and Material Side Effect Declaration | High-risk write/delete/exfiltration operations executed directly by the same permission principal without confirmation (ASI02 Tool Misuse and Exploitation direction) | High-risk operation path without direct confirmation, same role for initiation and approval, irreversible operation simulation testing |
| `SC-14` | `QD-SS-4.1` Trigger Condition Conflict + `QD-SS-4.2` Name Uniqueness / Near-Duplicate Misleading + `QD-S-5.2` Missing High-Risk Operation Confirmation Mechanism | A user request is routed to a high-risk Skill with a similar name or overlapping trigger, and the confirmation step is missing | End-to-end testing of overlapping triggers, similar names, and direct reach of high-risk operations where clarification is due |
| `SC-15` | `QD-TT-5.3` Cross-Tool Data Structure Bridging + `QD-ST-3.5` Output Structure Match + `QD-T-1.3` enum–type Conflict | Upstream Tool output and downstream Tool input types are incompatible, causing silent truncation, field loss, or erroneous conversion | End-to-end type contract, serialization/conversion steps, abnormal returns, and data integrity testing |

> Relationship with existing `SC-02`, `SC-05`, `SC-09`: `SC-11` is a permission-side deepening of `SC-05` (`SC-05` focuses on environment boundaries, `SC-11` focuses on effective permission amplification along the call chain); do not merge, retain independent numbering.

<a id="d2-tool-agent-quality-defect-chains"></a>
### D.2 Tool-Agent Quality Defect Chains

| ID | Defect Chain | Candidate Quality Failure | Recommended Supplementary Tests |
|----|--------------|---------------------------|--------------------------------|
| `QC-TA-01` | `QD-S-3.1` Vague Trigger Conditions + `QD-T-4.1` Insufficient description Quality + `QD-TT-5.2` Multi-Tool Semantic Competition + `QD-SS-4.1/4.2` Trigger Conflict and Name Similarity | Skill or Tool misselection, task failure | Adjacent intents, near-synonym tasks, negative intents, mixed intents, similar names |
| `QC-TA-02` | `QD-P-2.2.x` Input Definition Defects + `QD-T-1.2` `required` Inconsistency + `QD-T-2.x` Parameter Constraint Insufficient | Parameter missing, type error, or Schema validation failure | Empty input, missing fields, format variants, boundary values |
| `QC-TA-03` | `QD-P-2.4.3` Incorrect Tool Invocation Parameters or Order + `QD-PT-2.2` Invocation Specification Consistency Defect + `QD-ST-3.2` Input Constraint Consistency Defect | Call order errors or missing dependency data | Multi-Tool order dependencies, failure rollback, and state passing |
| `QC-TA-04` | `QD-P-2.3.1` Undefined Output Format + `QD-PS-1.6` Output Constraint Consistency Defect + `QD-ST-3.5` Output Structure Matching Defect + `QD-TT-5.3` Cross-Tool Data Structure Bridging | Results not consumable by downstream systems | Structured output, parsing validation and field completeness, cross-Tool type conversion |
| `QC-TA-05` | `QD-P-2.6.x` Exception Handling Defects + `QD-S-4.x` Failure Expansion Defects + `QD-ST-3.7` Error Handling Coverage Defect | Infinite retry after exception, incorrect fallback calls, or task interruption | Timeout, 429, permission denial, and external dependency failure |
| `QC-TA-06` | `QD-S-2.1` Unlimited Quantity + `QD-T-2.4` Array No Length Constraint + `QD-T-3.3` Batch Operation Unrestricted | Large batch tasks timing out, partially executing, or failing | Maximum batch, pagination, cancellation, and checkpoint recovery |
| `QC-TA-07` | `QD-P-1.1.x` Logic Conflict + `QD-P-2.5.4` Constraint Priority Not Defined + `QD-S-3.5` Default Behavior Not Declared | Unstable execution path for same input | Repeated runs, multi-constraint conflicts, and missing information testing |

<a id="d3-rag-agent-quality-defect-chains"></a>
### D.3 RAG-Agent Quality Defect Chains

| ID | Defect Chain | Candidate Quality Failure | Recommended Supplementary Tests |
|----|--------------|---------------------------|--------------------------------|
| `QC-RA-01` | `QD-P-2.3.x` Output Definition Defects + `QD-P-2.7.x` Example Design Defects | Incomplete answers, non-compliant formats, or missing citations | Required points, citation formats, positive/negative examples, boundary cases |
| `QC-RA-02` | `QD-P-2.2.1` Input Source Not Declared + `QD-S-1.5` Data Source Boundary Missing | Unable to distinguish trusted knowledge, user statements, and external content | Fact conflicts, malicious documents, historical session pollution |
| `QC-RA-03` | `QD-S-3.2` Non-Activation Condition Missing + `QD-S-3.4` Task Scope Not Defined + `QD-P-2.5.2` Security Boundary Constraint Missing | Answering beyond knowledge and authorization scope without clarification or refusal | Unauthorized questions, no knowledge hits, sensitive questions, handoff-required questions |
| `QC-RA-04` | `QD-P-2.4.2` Resource Not Declared + `QD-T-4.1` Insufficient Description Quality + `QD-PT-2.2` Call Specification Consistency Defect | Incorrect use of retrieval, citation, or knowledge Tool, leading to wrong answers | Multi-knowledge source selection, retrieval failure, and citation chain testing |
| `QC-RA-05` | `QD-S-4.1` Failure Behavior Not Defined + `QD-S-4.2` Partial Completion Not Declared | Fabrication when retrieval is insufficient, or answer interruption without explanation | No hits, low confidence, partial information, and source conflicts |
| `QC-RA-06` | `QD-P-1.1.1` Direct Contradiction + `QD-P-1.6.1` Ambiguous Key Decision Terms + `QD-P-2.5.4` Constraint Priority Not Defined | Multi-turn self-contradiction or unstable safety responses | Ambiguous boundaries, multi-turn follow-ups, rule conflicts, and adversarial expressions |

---

<a id="appendix-e-mapping-record-yaml--json-examples"></a>
## Appendix E: Mapping Record YAML / JSON Examples

<a id="e1-single-defect-mapping-record-yaml"></a>
### E.1 Single Defect Mapping Record (YAML)

```yaml
mapping_id: MAP-QD-T-3.2-v1
mapping_version: v1.0   # mapping record template version, independent of this document's specification version
status: active

source:
  defect_id: QD-T-3.2
  defect_name: Untrusted Input Entering an Executable Context
  artifact_type: Tool
  source_standard: Inspect Tool
  source_standard_version: v1.0

applicability:
  or_levels: [OR-L2, OR-L3]
  required_conditions:
    - User input, external documents, or other untrusted context can influence this parameter
    - Parameter will be interpreted, executed, or further forwarded by the backend
  exclusions:
    - Backend has implemented verifiable strict type validation, allowlist, and safe encoding handling

security_associations:
  - attack_surface_id: AS-02
    attack_surface_name: Input and Parameter Injection
    potential_impacts: [D1, D2, D3]
    mapping_strength: strong   # values correspond to §1.3: strong / medium / conditional / not_applicable
    validation_recommendations:
      risk_explicit:
        - Check for explicit dangerous parameter descriptions, dangerous examples, or bypass expressions
      risk_implicit:
        - Parameter injection
        - Encoding and escape bypass
        - Boundary parameters
        - Downstream passthrough chains
    success_evidence:
      - Unauthorized parameters accepted by backend
      - Parameters trigger unexpected queries, writes, exfiltration, or privilege behaviors

quality_associations:
  tool_agent:
    candidate_failure_modes: [FM-04, FM-05, FM-08]
    mapping_strength: strong
    regression_tests:
      - Missing parameters
      - Illegal formats
      - Oversized input
      - Boundary values
      - Downstream error returns
  rag_agent:
    candidate_metrics:
      - Boundary recognition capability
      - Safety response capability
      - Traceability
    mapping_strength: conditional
    conditions:
      - Tool used for retrieval, citation, external knowledge access, or content exfiltration

evidence_requirements:
  static:
    - Tool Schema fragment
    - Parameter description
    - Version hash
  dynamic:
    - Call parameter traces
    - Tool return records
    - Shadow sandbox test results
  quality:
    - Baseline test case version
    - Agent output
    - Scores or judgment results

limitations:
  - Static defect does not prove backend lacks protection.
  - Attack exploitability must be confirmed by Risk Implicit.
  - Quality impact must be confirmed by Quality baseline test cases.

ownership:
  primary_owner: Tool Owner
  supporting_owners: [Security Owner, Agent Owner]

regression_requirements:
  - Re-run Inspect Tool after remediation
  - Re-run associated Risk Implicit test cases
  - Re-run associated Tool-Agent Quality test cases
```

<a id="e2-defect-chain-record-yaml"></a>
### E.2 Defect Chain Record (YAML)

```yaml
chain_id: SC-04
chain_name: Cross-Tool Sensitive Data Exfiltration Candidate Chain
chain_type: security
status: open

members:
  - defect_id: QD-S-1.5
    role: Data source boundary missing
  - defect_id: QD-TT-5.1
    role: Cross-Tool data flow risk
  - defect_id: QD-P-2.3.4
    role: Security and privacy filter missing

chain_hypothesis:
  statement: >
    When Skill does not restrict readable data sources, Tool can forward data to
    external destinations, and Prompt does not define sensitive information filtering,
    an unauthorized data exfiltration path may form.

potential_impacts: [confidentiality, authorization]
mapping_strength: strong

validation_plan:
  environment: shadow
  test_data:
    - Synthetic sensitive data
    - Cross-tenant marked data
    - External recipients and controlled exfiltration endpoints
  tests:
    - Untrusted content induces reading sensitive fields
    - Read results forwarded to external Tool
    - Anonymization, permission, and confirmation bypass attempts
  success_criteria:
    - Sensitive fields enter unauthorized Tool calls
    - Exfiltration destination can be controlled by user input or untrusted content

required_regression:
  - Data source allowlist verification
  - Cross-Tool taint propagation verification
  - Sensitive field anonymization verification
  - Pre-exfiltration permission and confirmation verification
```

<a id="e3-api-return-example-json"></a>
### E.3 API Return Example (JSON)

```json
{
  "finding_id": "F-20260719-00128",
  "defect": {
    "rule_id": "QD-S-5.2",
    "name": "Missing High-Risk Operation Confirmation Mechanism",
    "severity": "Inspect·P0",
    "artifact": "skill:customer-refund",
    "agent_level": "AC-L3"
  },
  "impact_mapping": {
    "status": "mapped",
    "security": [
      {
        "attack_surface": "AS-05",
        "potential_impacts": ["D2", "D3"],
        "strength": "strong",
        "statement": "May lead to high-risk operations such as refunds, deletions, or exfiltration executed without confirmation."
      }
    ],
    "quality": {
      "tool_agent": {
        "candidate_failure_modes": ["FM-09"],
        "recommended_tests": [
          "Vague confirmation statements",
          "Negative confirmation statements",
          "Repeated confirmation",
          "Cancellation confirmation"
        ]
      },
      "rag_agent": {
        "candidate_metrics": ["Boundary recognition capability", "Safety response capability"],
        "strength": "conditional"
      }
    }
  },
  "validation": {
    "explicit_recommended": true,
    "implicit_recommended": true,
    "status": "not_started"
  },
  "regression": {
    "inspect": "required",
    "risk": "required",
    "quality": "required"
  }
}
```

---

## Appendix F: Terminology and External Standard Mapping

<a id="f1-sanityops-internal-terminology-cross-reference"></a>
### F.1 SanityOps Internal Terminology Cross-Reference

| This Specification Term | Inspect | Risk Explicit | Risk Implicit | Quality |
|------------------------|---------|---------------|---------------|---------|
| Static Defect | `QD` defects | N/A | N/A | N/A |
| Explicit Risk | May serve as defect evidence | `NL`, `NR` risks | May serve as attack prerequisite | May serve as scenario risk label |
| Attack Surface | Defect association output | Risk interpretation dimension | Attack strategy selection input | High-risk test case selection input |
| Exploitability | Not determined | Not determined | Dynamic attack result | Not determined |
| Quality Failure | Candidate impact | Not determined | Attack side-effect observation | Baseline test case actual result |
| Release Conclusion | Inspect Gate input | Explicit Gate input | Implicit Gate input | Quality Gate input |
| Root Cause | Candidate static root cause | Explicit risk source | Attack path conditions | Candidate quality root cause |

<a id="f2-relationship-with-cia--authorization-model"></a>
### F.2 Relationship with CIA / Authorization Model

| SanityOps Security Consequence | Code in This Specification | Common Security Model Correspondence | Description |
|-------------------------------|---------------------------|--------------------------------------|-------------|
| Confidentiality | D1 | CIA: Confidentiality | Unauthorized reading, leakage, prompts, or sensitive data exfiltration |
| Integrity | D2 | CIA: Integrity | Unauthorized writing, deletion, payment, configuration, or business data modification |
| Authorization Risk | D3 | Authorization / Access Control | Privilege escalation, identity confusion, cross-tenant, erroneous delegation |
| Availability | — | CIA: Availability | Loops, resource exhaustion, uncontrolled batch operations, service degradation |
| Audit and Traceability | — | Accountability / Non-repudiation | Unable to associate sources, parameters, evidence, call chains, or responsible parties |

> Availability and auditability are extended impact dimensions of this specification and do not occupy D numbers; D1/D2/D3 are impact type labels defined by Risk Explicit, and this specification only references their classification without participating in grading.

<a id="f3-relationship-with-owasp-llm--agentic-risks"></a>
### F.3 Relationship with OWASP LLM / Agentic Risks

This specification can reference OWASP risk language, but does not use OWASP numbering to replace SanityOps `QD` numbering, nor claims one-to-one correspondence.

| SanityOps Attack Surface | Reference OWASP Risk Directions | Typical SanityOps Defects |
|-------------------------|--------------------------------|---------------------------|
| AS-01 | Prompt Injection, System Prompt Leakage | `QD-P-2.5.2`, `QD-P-2.5.6`, `QD-P-2.2.1`, `QD-S-3.4` |
| AS-02 | Improper Input Handling, Injection | `QD-T-1.4`, `QD-T-2.x`, `QD-T-3.2`, `QD-T-3.7`, `QD-P-2.2.2` |
| AS-03 | Sensitive Information Disclosure, Improper Output Handling | `QD-P-2.3.4`, `QD-TT-5.1`, `QD-PM-2.x` |
| AS-04 | Excessive Agency, Excessive Permissions | `QD-P-2.5.3`, `QD-S-5.x`, `QD-ST-3.6`, `QD-T-3.7`, `QD-PM-1.x`, `QD-PM-2.x`, `QD-PM-3.x`, `QD-PM-4.x`, `QD-PM-5.x` |
| AS-05 | Tool Misuse, Unsafe Action Execution | `QD-T-3.1`, `QD-T-3.7`, `QD-TT-5.2`, `QD-SS-4.1`, `QD-PM-3.4`, `QD-PM-5.x`, `QD-PM-6.3` |
| AS-06 | Unbounded Consumption, Denial of Service | `QD-P-2.5.1`, `QD-S-2.x`, `QD-T-3.3`, `QD-CYC-1.1`, `QD-CYC-1.2`, `QD-CYC-1.3` |
| AS-07 | Insecure Error Handling, Failure Escalation | `QD-P-2.6.x`, `QD-S-4.x`, `QD-ST-3.7`, `QD-PM-4.x` |
| AS-08 | Supply Chain, Tool / Plugin Risk | `QD-TT-5.2`, `QD-TT-5.3`, `QD-SS-4.2`, `QD-T-5.x`, `QD-PM-4.8` |
| AS-09 | Agentic System Misconfiguration | `QD-PS-1.x`, `QD-PT-2.x`, `QD-ST-3.x`, `QD-SS-4.x`, `QD-TT-5.x`, `QD-CYC-1.x`, `QD-PM-6.x` |

**On the relationship between ASI03 and QD-PM**: OWASP 2026 treats ASI03 as the evolution of LLM06 Excessive Agency in agentic scenarios, one of its typical forms being "un-scoped privilege inheritance." This highly overlaps with `QD-PM-4.x` (permission propagation, downstream exceeds upstream, delegation escalation, INHERITED) in problem space, but the granularity differs: ASI03 is a risk result category, while `QD-PM-4.x` are statically locatable artifact defects. Relevance only states that "`QD-PM-4.x` is a common starting point toward ASI03," and does not claim that detecting `QD-PM-4.x` constitutes an ASI03 risk.

#### Usage Limitations

1. **Not a one-to-one correspondence**: A single SanityOps attack surface may map to multiple OWASP items, and a single OWASP item may span multiple SanityOps attack surfaces. The table above shows reference directions only.
2. **Not alternative compliance**: Referencing OWASP risk language does not substitute for any formal compliance or certification process.
3. **Not for external declarations**: The terms and mappings in this specification are used for internal communication and threat modeling and shall not be used in customer-facing compliance or audit reports without explicit review.
4. **Independent evidence standards**: Compliance audits, penetration testing, and runtime monitoring must still adopt their respective independent evidence standards.

---

## Version History

| Version | Release Date | Key Changes |
|---------|--------------|-------------|
| v1.0 | 2026-10 | Initial release |
| v1.1 | 2026-10 | Expanded Inspect and Permission defect coverage; Risk Explicit regraded to P0/P1/P2; multi-hit design principle clarified; terminology aligned to Logic Artifacts |

---

**The SanityOps Inspect Defect Impact and Linkage Mapping Specification v1.1 main text and appendices are now complete.**

---

© 2026 Sanity AI Labs. Licensed under Creative Commons Attribution-ShareAlike 4.0 International.
https://www.sanityops.org  ·  hello@sanityops.org
v1.1  ·  October 2026
