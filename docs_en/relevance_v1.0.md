# SanityOps Framework Relevance

---

**Version**: v1.0

**Release Date**: July 2026

**Maintained by**: SanityOps Working Group

**License**: CC BY 4.0

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
- [5.3 Unified Status Model](#53-unified-status-model)
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
| Version | v1.0 |
| Status | Released |
| Date | July 2026 |
| Applicable Framework | SanityOps Inspect, Risk, Quality Subsets |
| Maintained by | SanityOps Specification Working Group |

---

## Preface

### 0.1 Purpose

SanityOps Inspect identifies quality defects in Prompts, Skills, Tool Schemas, and cross-artifact relationships; Risk audits explicit risks or validates implicit, dynamic attack risks; Quality evaluates actual Agent service quality.

Core questions differ for the three activity types:

| Subset | Core Question | Typical Output |
|--------|---------------|----------------|
| Inspect | Do artifact definitions or relationships have defects? | `QD` defects, severity levels, static evidence, remediation recommendations |
| Risk Explicit | Do artifacts contain explicit dangerous instructions or configurations? | `EX` classification, D1/D2/D3, S levels, deductions |
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

## 0.2 Scope

### 0.2.1 In Scope

This specification applies to the following static logic artifacts and their relationships:

- System prompts, role prompts, workflow prompts, and examples;
- Agent Skill name, description, trigger conditions, inputs and outputs, failure strategies, and permission declarations;
- Tool Schema `name`, `description`, `inputSchema`, parameter constraints, side effects, and changes;
- Consistency relationships between Prompt–Skill, Prompt–Tool, and Skill–Tool;
- Linkage relationships among the above artifacts in security validation, quality supplementary testing, and release governance.

### 0.2.2 Out of Scope

This specification does not:

- Add, delete, or modify existing Inspect rules or their `QD` numbers;
- Directly determine static defects as already exploited vulnerabilities;
- Replace Risk Implicit shadow environment attack validation;
- Replace Quality's final determination of actual output, task success, or release quality;
- Replace IAM, network isolation, backend parameter validation, approval systems, runtime monitoring, or compliance controls;
- Perform complete root cause attribution for retrieval, re-ranking, Embedding, model weights, databases, networks, or infrastructure.

---

## 0.3 Normative References and Version Applicability

This specification establishes mapping relationships based on the following SanityOps documents:

| Source Sub-specification | Adopted Version | Usage in This Specification |
|--------------------------|-----------------|----------------------------|
| Inspect Prompt | v1.0 | Uses `QD-P` numbering, definitions, and P0/P1/P2 rules |
| Inspect Skill | v1.0 | Uses `QD-S` numbering, Review Schema, and risk classification rules |
| Inspect Tool | v1.0 | Uses `QD-T` numbering, Schema constraints, and high-risk operation definitions |
| Inspect Cross | v1.0 | Uses `QD-PS`, `QD-PT`, `QD-ST` numbering and consistency relationships |
| Risk Explicit | v1.0 | Uses `EX`, D1/D2/D3, S0–S3 risk model |
| Risk Implicit | v1.0 | Uses shadow environment, dynamic attack, and continuous validation principles |
| Quality Tool-Agent | v1.0 | Uses task success/failure, reliability, and risk-driven testing principles |
| Quality RAG-Agent | v1.0 | Uses four-dimensional 12 metrics, critical test cases, and regression Gate principles |

### 0.3.1 Source Specification Priority Principle

If there is a conflict between this specification and a source sub-specification regarding rule numbering, definitions, severity levels, or release requirements, **the corresponding source sub-specification shall take precedence**.

The mapping strength, attack surfaces, candidate failure modes, validation recommendations, and diagnostic recommendations in this specification do not alter the original determinations of the source sub-specifications.

---

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
| **Dynamic Evidence** | Shadow environment attack results, call trajectories, parameter records, logs, and runtime outputs. |
| **Quality Evidence** | Baseline test cases, Agent outputs, rule validations, Judge conclusions, metrics, and Gate results. |

### Abbreviations

| Abbreviation | Full Form |
|--------------|-----------|
| `QD` | Quality Defect |
| `EX` | Explicit Risk |
| `D1` | Confidentiality Harm Dimension |
| `D2` | Integrity Harm Dimension |
| `D3` | Authorization Harm Dimension |
| `S0–S3` | Risk Explicit Severity Levels |
| `FM` | Failure Mode |
| `AS` | Attack Surface |
| `Gate` | Release or Handling Gate |
| `RAG` | Retrieval-Augmented Generation |

---

## Chapter 1: Unified Impact Mapping Model

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

### 1.2 Four-Section Relationship Structure

A standard mapping relationship should have at least the following structure:

| Level | Content | Example |
|-------|---------|---------|
| Defect Layer | Discovered `QD` defect | `QD-T-3.2 Raw Input Passthrough` |
| Impact Layer | Attack surface or candidate failure mode | Parameter injection, parameter errors, downstream call failures |
| Validation Layer | Risk or Quality recommended activities | Injection testing, boundary parameter testing, abnormal input regression |
| Evidence Layer | Evidence supporting or refuting associations | Schema, call trajectories, shadow environment results, quality test case results |

### 1.3 Mapping Strength

Mapping strength reflects "whether validation or supplementary testing should be prioritized", not vulnerability severity, nor does it replace P0/P1/P2.

| Strength | Meaning | Platform Behavior |
|----------|---------|-------------------|
| **Strong** | Defect directly expands attack entry, or highly likely to cause specified failure mode | Automatically recommend related Risk or Quality test cases |
| **Medium** | May have impact under specific permission, data, Tool, or process conditions | Recommend based on applicability conditions |
| **Conditional** | Requires external knowledge bases, runtime environments, model behaviors, or business rules | As candidate investigation direction, no automatic conclusion |
| **Not Applicable** | Current Agent type, artifact type, or runtime conditions lack association prerequisites | Do not output this recommendation |

### 1.4 Single Defect Mapping

Single defect mapping is used to identify the risk a single defect may pose under normal conditions.

| Defect Example | Candidate Impact | Recommended Action |
|----------------|------------------|-------------------|
| `QD-P-2.5.2 Missing Security Boundary Constraints` | Instruction boundary confusion, unauthorized response, sensitive information output | Injection, system prompt extraction, unauthorized request validation |
| `QD-S-4.1 Failure Behavior Undefined` | Expanded search after failure, lowered restrictions, uncontrolled error recovery | Tool failure, permission denial, insufficient data testing |
| `QD-T-4.3 Multi-Tool Semantic Competition` | Wrong Tool selection, incorrect side effects, duplicate calls | Similar Tool, fuzzy intent, near-synonym expression testing |
| `QD-PT-2.3 Parameter Constraint Consistency` | Mismatch between Prompt parameter requirements and Tool Schema | End-to-end parameter construction, Schema validation, version regression |

Single defect mapping should not ignore controls external to the artifact. For example, insufficient parameter constraints in a Tool Schema do not imply the backend lacks additional validation; whether it is exploitable should still be determined through dynamic validation.

### 1.5 Defect Chain Mapping

Defect chains are used to identify candidate exploitation or failure paths formed by multiple defects in combination.

#### 1.5.1 Defect Chain Basic Patterns

```text
Boundary deficiency
+ Insufficient permission declaration
+ Tool high-risk capability or data flow
= May form an unauthorized access or data exfiltration path
```

#### 1.5.2 Typical Examples

```text
QD-P-2.5.2 Missing Security Boundary Constraints
+ QD-S-5.1 Read/Write/Delete Permissions Not Distinguished
+ QD-T-3.2 Raw Input Passthrough
+ QD-T-3.5 Cross-Tool Data Flow Risk
= Injection → Unauthorized invocation → Sensitive data exfiltration candidate chain
```

When a defect chain is identified, the following actions should be taken:

1. Mark it with a unique `chain_id` in the report;
2. Retain the member defects and their cross-artifact relationships;
3. Prioritize end-to-end Risk Implicit validation;
4. Design coordinated remediation using least privilege, strictest constraints, and most conservative failure strategies;
5. After remediation, perform regression on the complete path, not just re-inspection of individual `QD` items.

### 1.6 Conclusion Priority and Conflict Handling

Conclusions from different subsets cannot substitute for each other. When surface-level conflicts arise, they should be interpreted according to their respective problem domains.

| Situation | Correct Interpretation |
|-----------|----------------------|
| Inspect passes, but Risk Implicit attack succeeds | Static check did not find the corresponding defect, or the attack depends on runtime conditions; the security validation result is valid and should be prioritized. |
| Inspect hits P0, but Risk cannot reproduce the attack | The defect still needs to be handled per Inspect rules; failure to reproduce does not mean the defect does not exist. |
| Risk Explicit finds no EX risk, but Inspect hits boundary deficiency | Absence of dangerous expression does not mean boundaries are intact; retain the QD defect and recommend dynamic validation. |
| Quality passes, but Inspect has P0 | Quality testing cannot waive static P0; handle per the source specification's Inspect Gate. |
| Inspect passes, but Quality fails | The quality failure is valid; diagnose from knowledge, model, configuration, runtime environment, and artifact defects. |
| Quality fails, but no QD is found | Must not forcibly attribute to artifact defects; record as "unconfirmed root cause". |

---

## Chapter 2: Security Impact Mapping Model

### 2.1 Security Impact Dimensions

This specification adopts five types of potential security consequences. Among them, D1, D2, D3 correspond to Risk Explicit harm dimensions, but specific level determinations still follow Risk Explicit v1.0 independently.

| Security Consequence | Corresponding Dimension | Typical Consequences |
|----------------------|------------------------|----------------------|
| **Confidentiality Risk** | D1 | Sensitive data leakage, Prompt leakage, unauthorized reading, external data sending |
| **Integrity Risk** | D2 | Erroneous writing, deletion, payment, configuration modification, business rule bypass |
| **Authorization Risk** | D3 | Privilege escalation, identity confusion, cross-tenant access, unauthorized delegation |
| **Availability Risk** | Extended dimension | Infinite retries, call storms, resource exhaustion, timeouts and service degradation |
| **Audit and Traceability Risk** | Extended dimension | Unknown call sources, unclear data flows, inability to correlate evidence or responsible parties |

> D1/D2/D3 are the formal harm dimensions of Risk Explicit; this specification only records their potential association directions and does not automatically produce D-level determinations.

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

### 2.4 Mapping Relationship with Risk Implicit

Risk Implicit should use impact mapping as the test design input for dynamic validation.

| Mapping Field | Risk Implicit Usage |
|---------------|---------------------|
| Attack surface | Select attack strategies and input variants |
| Potential impact | Define criteria for attack success, interception, or failure |
| Applicability conditions | Configure shadow environment, Mock data, identity, permissions, and external dependencies |
| Defect chain | Design end-to-end attack paths across Prompt, Skill, and Tool |
| Remediation recommendations | Form regression attack set after remediation |

#### 2.4.1 Dynamic Validation Result Feedback

| Risk Result | Significance for Impact Mapping |
|-------------|--------------------------------|
| **Attack successful** | Mapping gains dynamic empirical evidence; associated defect chain should be escalated in handling priority. |
| **Intercepted by external control** | Artifact-layer defects may still exist; mark as "depends on compensating controls." |
| **Model rejected or not triggered** | Not reproduced under current conditions; must not close static defect based on this. |
| **Insufficient conditions** | Cannot determine; should supplement shadow environment, permissions, data, or call chain conditions. |

### 2.5 High-Priority Security Mapping Rules

The following table contains document-level high-priority mappings. The complete rule set is provided in the appendix.

| QD Defect | Primary Attack Surface | Potential Impact | Recommended Validation |
|-----------|----------------------|------------------|----------------------|
| `QD-P-2.2.1` Input Source Not Declared | AS-01, AS-03 | D1, D2, D3 | Source confusion testing with user input, history records, external documents, and Tool returns |
| `QD-P-2.3.4` Security and Privacy Filter Missing | AS-03 | D1 | Sensitive information requests, Prompt extraction, sensitive field output, and exfiltration inducement |
| `QD-P-2.4.3` Tool Call Specification Missing | AS-05, AS-09 | D2, D3, Availability | Illegal call order, missing parameters, abnormal Tool returns, and alternative calls |
| `QD-P-2.5.1` Termination Constraint Missing | AS-06 | Availability | Loops, recursion, retries, timeouts, and budget exhaustion |
| `QD-P-2.5.2` Security Boundary Constraint Missing | AS-01, AS-03, AS-04 | D1, D2, D3 | Single/multi-round injection, indirect injection, unauthorized requests, system prompt extraction |
| `QD-P-2.5.3` Permission Control Boundary Missing | AS-04, AS-05 | D2, D3 | Role escalation, cross-user, cross-tenant, read/write/delete, and confirmation workflow |
| `QD-P-2.6.3` Retry Mechanism Unreasonable | AS-06, AS-07 | D2, Availability | Idempotency, duplicate submission, partial success, maximum retries, and backoff |
| `QD-S-1.5` Data Source Boundary Missing | AS-03, AS-04 | D1, D3 | Historical session pollution, cross-user data, unauthorized external source access |
| `QD-S-3.2` Non-Activation Condition Missing | AS-01, AS-04 | D1, D2, D3 | Adjacent intents, sensitive requests, system data, production environment requests |
| `QD-S-3.4` Task Scope Not Clearly Defined | AS-01, AS-05 | D2, D3 | Task expansion, goal hijacking, implied operations, and injection-style delegation |
| `QD-S-4.1` Failure Behavior Not Defined | AS-07 | D1, D2, D3, Availability | Tool failure, permission denial, insufficient data, abnormal degradation, and error recovery |
| `QD-S-5.1` Read/Write/Delete Permissions Not Differentiated | AS-04, AS-05 | D2, D3 | Read request inducing write/delete, least privilege, and side-effect testing |
| `QD-S-5.2` High-Risk Operation Confirmation Mechanism Missing | AS-05 | D2, D3 | Delete, payment, exfiltration, overwrite operation confirmation bypass and undo |
| `QD-S-5.3` Environment Boundary Not Declared | AS-04, AS-05 | D2, D3 | Test/production environment confusion, production resource access, and read-only restrictions |
| `QD-S-5.4` Chained Call Permission Not Declared | AS-04, AS-05, AS-07 | D1, D2, D3 | Downstream Skill whitelist, permission inheritance, call depth, and high-privilege reach |
| `QD-T-1.4` additionalProperties Not Controlled | AS-02, AS-04 | D1, D2, D3 | Additional fields, reserved fields, permission fields, and tenant field injection |
| `QD-T-3.1` Write Operation Not Identified | AS-05 | D2 | Tool misselection, write operation confirmation, duplicate submission, and rollback |
| `QD-T-3.2` Raw Input Passthrough | AS-02 | D1, D2, D3 | Parameter injection, encoding bypass, boundary parameters, downstream passthrough |
| `QD-T-3.3` Batch Operation Unrestricted | AS-05, AS-06 | D2, Availability | Maximum batch, batch bypass, duplicate submission, and interruption recovery |
| `QD-T-3.4` Internal Parameter Exposure | AS-04 | D1, D2, D3 | `tenantId`, role, token, admin flag tampering |
| `QD-T-3.5` Cross-Tool Data Flow Risk | AS-03, AS-05 | D1, D2, D3 | Sensitive data source to exfiltration Tool, taint propagation, recipient manipulation |
| `QD-T-4.2` Side Effect Not Declared | AS-05 | D2, D3 | State change, email sending, external calls, write consequence observation |
| `QD-PS-1.3` Permission Boundary Consistency | AS-04, AS-09 | D2, D3 | Prompt→Skill authorization chain and permission convergence testing |
| `QD-PT-2.4` Permission Granularity Consistency | AS-04, AS-05, AS-09 | D2, D3 | Prompt→Tool high-risk actions, confirmation, and permission testing |
| `QD-ST-3.6` Permission Scope Match | AS-04, AS-05, AS-09 | D2, D3 | Skill→Tool actual side effects, least privilege, and confirmation testing |
| `QD-PT-2.5` / `QD-ST-3.7` Error Handling Gap | AS-07, AS-09 | D1, D2, D3, Availability | End-to-end testing for permission errors, rate limiting, timeouts, format errors, and dependency exceptions |

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

### 2.7 Security Defect Chains and Defense in Depth

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

### 3.2 Tool-Agent Quality Impact Mapping

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

### 3.3 RAG-Agent Quality Impact Mapping

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

#### 3.3.3 Special Limitations

The following factors may cause RAG quality failures but are not within the current full coverage scope of Inspect mapping:

- Authoritative knowledge itself being erroneous, missing, or outdated;
- Anomalies in document chunking, indexing, retrieval recall, re-ranking, or citation chains;
- Changes in model version, temperature, context window, or vendor behavior;
- Errors in the evaluation test cases, Judge, or rule validators themselves;
- Missing user identity, real-time business state, or external system state.

### 3.4 Quality Supplementary Test Design Rules

When impact mapping generates Quality supplementary tests, the following rules shall be followed:

1. **Select test cases by risk**  
   P0 defects, exploited defect chains, critical business scenarios, or high-risk boundary scenarios should be prioritized for inclusion in the release regression set.

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

### 3.5 Reverse Diagnostic Rules After Quality Failure

After a Quality failure, the platform should output "failure fact + candidate Inspect investigation direction + other possible causes."

| Observed Failure | Priority Inspect Investigation | Other Possible Causes |
|-----------------|-------------------------------|-----------------------|
| Tool selection error | `QD-T-4.1`, `QD-T-4.3`, `QD-S-3.1`, `QD-P-2.4.3` | Model reasoning, routing, context construction |
| Missing parameter, type or format error | `QD-T-1.2`, `QD-T-2.x`, `QD-P-2.2.x`, `QD-ST-3.3` | Tool implementation, transformation layer, Mock data |
| Call order or data dependency error | `QD-P-2.4.3`, `QD-PT-2.2`, `QD-ST-3.2` | Planner, state machine, runtime orchestration |
| Output not consumable by downstream | `QD-P-2.3.1/2.3.2`, `QD-PS-1.6`, `QD-ST-3.5` | Downstream parser, interface version, implementation compatibility |
| Repeated calls or task interruption after exception | `QD-P-2.6.x`, `QD-S-4.x`, `QD-PT-2.5`, `QD-ST-3.7` | Network, rate limiting, external service, timeout configuration |
| RAG key fact error | `QD-P-1.x`, `QD-P-2.4.x`, `QD-T-4.1` | Knowledge error, retrieval failure, re-ranking, model hallucination |
| RAG answer omits restrictions or steps | `QD-P-2.3.x`, `QD-S-4.2`, `QD-S-3.4` | Incomplete baseline answer, insufficient recall, context truncation |
| RAG no citation or citation does not support conclusion | `QD-P-2.3.x`, `QD-P-2.4.x`, `QD-ST-3.5` | Knowledge metadata, retrieval and citation implementation |
| Should have refused, clarified, or handed off but answered directly | `QD-P-2.5.2/2.5.3`, `QD-S-3.2`, `QD-S-5.x`, `QD-PS-1.3` | IAM, runtime Guardrail, missing user state |
| Equivalent questions or multi-turn responses contradictory | `QD-P-1.1.x`, `QD-P-2.5.4`, `QD-S-3.5` | Session memory, context window, model version changes |

### 3.6 Quality Regression Rules After Remediation

After remediating an Inspect defect, passing the static re-inspection alone should not be the basis for closure.

| Change Type | Minimum Regression Requirements |
|-------------|--------------------------------|
| P0 defect remediation | Re-run corresponding Inspect; re-run associated Risk; re-run directly affected Quality test cases and complete defect chain test cases |
| P1 defect remediation | Re-run corresponding Inspect; execute affected topic Quality regression; decide whether to execute Risk per mapping recommendation |
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
  agent_levels: []
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

### 4.2 Evidence Requirements and Priority

| Evidence Type | Primary Use | Priority |
|---|---|---|
| Artifact original text, Schema, version hash | Prove static defects and mapping prerequisites | High |
| Prompt, Skill, Tool call trajectories | Prove actual execution behavior and chain relationships | High |
| Shadow environment attack results | Prove exploitability, interception, or insufficient conditions | High |
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

### 4.3 Confidence and Manual Confirmation

#### 4.3.1 Confidence

| Confidence | Applicable Scenarios |
|---|---|
| **High** | Clear static evidence exists, and dynamic validation or quality results support the association. |
| **Medium** | Static evidence is clear, but dynamic or quality empirical evidence is lacking. |
| **Low** | Association primarily relies on heuristics, similarity, or external condition assumptions. |

Confidence does not equal:

- Inspect severity level;
- Risk Explicit S level;
- Risk Implicit Signal;
- Quality score or Gate.

#### 4.3.2 Manual Confirmation Status

| Status | Definition |
|---|---|
| `unreviewed` | Auto-generated, not yet manually reviewed |
| `reviewed` | Manually confirmed static defects and mapping applicability |
| `validated` | Supported by dynamic or quality evidence |
| `rejected` | Manually determined mapping not applicable to this instance |
| `needs_more_evidence` | Needs supplementary environment, logs, permissions, or test assets |
| `closed` | Remediation, re-inspection, and necessary regression all completed |

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
| `safety_constraints` | Shadow environment isolation, anonymization, Mock, side-effect restrictions |
| `regression_scope` | Templates and variants to re-run after remediation |

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

### 5.3 Unified Status Model

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

### 5.4 Comprehensive Gate and Release Decision Boundaries

#### 5.4.1 Result Merging Principles

| Situation | Comprehensive Handling |
|-----------|----------------------|
| Risk Implicit results in A | Handle per Risk Implicit Gate; Quality pass does not exempt. |
| Inspect has a blocking P0 | Handle per Inspect rules; dynamic non-reproduction does not automatically exempt. |
| Quality critical test case fails or Gate does not pass | Handle per corresponding Quality rules; Inspect serves only as diagnostic support. |
| Risk Explicit discovers high-risk EX | Handle per Explicit rules; should associate related QD or defect chains, but does not replace their remediation. |
| All dynamic validations result in D | Must not determine security pass; should mark validation as invalid and supplement conditions. |
| Only B or C exists | Handle per Risk Implicit original rules; should record dependency on external controls or model rejection uncertainty. |
| Mapping recommendation not executed | The recommendation itself does not constitute an automatic FAIL; however, if the source specification or change policy requires validation, it cannot be considered as having completed pre-release proof. |

#### 5.4.2 Risk Acceptance Limitations

Risk acceptance is only applicable to scenarios where the source specification permits exceptions, and must at minimum document:

- The specific QD, EX, attack result, or quality failure being accepted;
- The business justification for not remediating;
- Verified compensating controls;
- Residual risk description;
- Responsible person and approver;
- Expiration date and review conditions;
- Required monitoring, alerting, and subsequent regression.

Attack success A, critical quality gate failure, or P0/S3 situations where the source specification explicitly prohibits exceptions must NOT be downgraded or exempted through this specification's "mapping conclusions."

### 5.5 Impact Card Format in Customer Reports

Customer-facing reports must clearly separate "confirmed facts" from "candidate associations."

```markdown
### Impact Card: QD-T-3.2 | Raw Input Passthrough | P0 (Applies to L2/L3)

**Static Discovery**
- Artifact: `tool:search_customer`
- Version: `sha256:...`
- Evidence: Parameter `query` is a free-form string, without declared format, pattern, or allowlist constraints.

**Potential Security Associations**
- Attack Surface: AS-02 Input and Parameter Injection
- Potential Impact: Confidentiality, Integrity, Authorization
- Mapping Strength: Strong
- Note: This conclusion indicates priority for validation; it does not yet indicate that the backend is exploitable.

**Recommended Validation**
- Risk Explicit: Review parameter description, default values, and examples for explicit dangerous expressions.
- Risk Implicit: Parameter injection, encoding variants, boundary parameters, and downstream passthrough testing.
- Required Conditions: Shadow environment, controlled test data, call traces, and Mock downstream services.

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

#### 5.5.1 Report Wording Requirements

| Permissible Wording | Prohibited Wording |
|--------------------|--------------------|
| "May expand the attack surface" | "Has already been attacked" |
| "Recommended to prioritize validation" | "Vulnerability necessarily exists" |
| "Candidate quality root cause" | "Quality failure is caused by this defect" |
| "Relies on compensating controls" | "Completely secure" |
| "Not reproduced under current test conditions" | "Absolutely unexploitable" |

### 5.6 Remediation, Re-inspection, and Regression Evidence

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

### A.1 Prompt Defect Mapping

| QD Category | Primary Attack Surface | Potential Impact | Recommended Validation |
|-------------|----------------------|------------------|----------------------|
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

### A.2 Skill Defect Mapping

| QD Category | Primary Attack Surface | Potential Impact | Recommended Validation |
|-------------|----------------------|------------------|----------------------|
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

### A.3 Tool Defect Mapping

| QD Category | Primary Attack Surface | Potential Impact | Recommended Validation |
|-------------|----------------------|------------------|----------------------|
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

### A.4 Cross Defect Mapping

| QD Category | Primary Attack Surface | Potential Impact | Recommended Validation |
|-------------|----------------------|------------------|----------------------|
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

---

## Appendix B: Tool-Agent Failure Mode and Supplementary Test Mapping

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

### B.2 Failure Fact Reverse Diagnostic Quick Reference

| Observed Failure | Priority Investigation Direction |
|-----------------|--------------------------------|
| Wrong Skill or Tool selected | `QD-S-3.1`, `QD-S-3.6`, `QD-T-4.1`, `QD-T-4.3`, `QD-P-2.4.3` |
| Parameter missing, incorrect, or malformed format | `QD-P-2.2.x`, `QD-T-1.2`, `QD-T-2.x`, `QD-PT-2.3`, `QD-ST-3.3` |
| Call order, dependency, or state passing errors | `QD-P-2.4.1/2.4.3`, `QD-PT-2.2`, `QD-ST-3.1–3.3` |
| Downstream cannot consume output | `QD-P-2.3.x`, `QD-PS-1.6`, `QD-ST-3.5` |
| Repeated calls or direct interruption after exception | `QD-P-2.6.x`, `QD-S-4.x`, `QD-PT-2.5`, `QD-ST-3.7` |
| High-risk action missing confirmation | `QD-P-2.5.3`, `QD-S-5.2`, `QD-T-3.1`, `QD-PT-2.4`, `QD-ST-3.6` |
| Inconsistent results for same input | `QD-P-1.1.x`, `QD-P-1.6.x`, `QD-P-2.3.3`, `QD-S-3.5` |
| Call loops, abnormal cost, or timeout | `QD-P-2.5.1/2.5.5`, `QD-P-2.6.3`, `QD-S-1.3`, `QD-S-2.2`, `QD-ST-3.4` |

---

## Appendix C: RAG-Agent Metrics and Supplementary Test Mapping

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

### C.2 RAG Failure Reverse Diagnostic Quick Reference

| Quality Failure Fact | Priority Inspect Investigation Direction | Non-Inspect Causes to Exclude Simultaneously |
|--------------------|------------------------------------------|---------------------------------------------|
| Critical fact error | `QD-P-1.x`, `QD-P-2.4.x`, `QD-T-4.x`, `QD-ST-3.5` | Outdated knowledge, retrieval recall, re-ranking, model hallucination |
| Missing exceptions, limitations, or steps | `QD-P-2.3.x`, `QD-S-3.4`, `QD-S-4.2` | Incomplete baseline answers, context truncation, knowledge gaps |
| Off-topic response or missing multiple requests | `QD-P-1.2.x`, `QD-S-3.1/3.4`, `QD-T-4.x` | Intent recognition implementation, context construction, model capability |
| No citation or citation does not support conclusion | `QD-P-2.3.x`, `QD-P-2.4.x`, `QD-ST-3.5` | Retrieval metadata, citation chain implementation, knowledge base structure |
| Using outdated rules | `QD-P-1.6.7`, `QD-S-1.5`, `QD-T-5.x` | Knowledge snapshot, document lifecycle, index updates |
| Should have refused, clarified, or handed off but answered directly | `QD-P-2.5.2/2.5.3`, `QD-S-3.2`, `QD-S-5.x`, `QD-PS-1.3` | IAM, runtime Guardrail, identity context |
| Safety response correct but missing explanation, path, or alternative | `QD-P-2.3.x`, `QD-P-2.7.x`, `QD-S-4.x` | Business rules, response templates, evaluation criteria |
| Multi-turn self-contradiction | `QD-P-1.1.x`, `QD-P-1.6.x`, `QD-P-2.5.4`, `QD-S-3.5` | Session memory, context window, model or configuration changes |

---

## Appendix D: Typical Linked Defect Chains

> Defect chains represent candidate risk paths or failure modes formed by multiple interrelated static defects weakening defense depth or causing task failures.
> Defect chains do not represent that attacks, data leakage, or quality failures have occurred; they still require confirmation by Risk or Quality results.

### D.1 Security Defect Chains

| ID | Defect Chain | Candidate Risk Result | Recommended Validation |
|----|--------------|----------------------|------------------------|
| `SC-01` | `QD-P-2.5.2` Security Boundary Constraint Missing + `QD-S-3.2` Non-Activation Condition Missing + `QD-T-3.2` Raw Input Passthrough | Indirect Prompt Injection inducing unauthorized Tool calls | Untrusted document/web content injection, encoding variants, end-to-end Tool call testing |
| `SC-02` | `QD-P-2.5.3` Permission Control Boundary Missing + `QD-S-5.1` Read/Write/Delete Permissions Not Distinguished + `QD-T-3.1` Write Operation Not Identified | Users inducing write, delete, or change with low-risk requests | Read request to write/delete operations, implicit confirmation, rollback, and audit testing |
| `SC-03` | `QD-S-5.2` High-Risk Confirmation Missing + `QD-T-3.3` Batch Operation Unrestricted + `QD-T-4.2` Side Effect Not Declared | Batch deletion, batch exfiltration, or batch updates | Maximum batch, duplicate submission, interruption recovery, confirmation bypass testing |
| `SC-04` | `QD-S-1.5` Data Source Boundary Missing + `QD-T-3.5` Cross-Tool Data Flow Risk + `QD-P-2.3.4` Security and Privacy Filter Missing | Cross-source aggregation of sensitive data to external Tool exfiltration | Tainted data flow, cross-tenant, external recipients, and anonymization testing |
| `SC-05` | `QD-S-5.3` Environment Boundary Not Declared + `QD-S-5.4` Chained Call Permissions Not Declared + `QD-ST-3.6` Permission Scope Matching Defect | Test or low-privilege Skill indirectly operating production resources | Environment isolation, call chain permission inheritance, production operation simulation testing |
| `SC-06` | `QD-P-2.5.1` Termination Constraint Missing + `QD-P-2.5.5` Resource Call Frequency Limit Missing + `QD-S-2.2` No Termination Condition Execution | Infinite loop, call storm, cost or resource exhaustion | Maximum rounds, timeout, 429, budget exhaustion, and loop termination testing |
| `SC-07` | `QD-P-2.6.3` Unreasonable Retry Mechanism + `QD-S-4.1` Failure Behavior Not Defined + `QD-T-4.2` Side Effect Not Declared | Failure retry leading to duplicate payment, creation, or exfiltration | Idempotency, network interruption, partial success, duplicate request testing |
| `SC-08` | `QD-P-1.1.3` Example Contradicts Rules + `QD-P-2.5.4` Constraint Priority Not Defined + `QD-T-4.3` Multi-Tool Semantic Competition | Examples inducing model to bypass rules and select the wrong Tool | Example-driven, multi-rule conflict, similar Tool selection testing |
| `SC-09` | `QD-T-1.4` `additionalProperties` Not Controlled + `QD-T-3.4` Internal Parameter Exposure + `QD-PT-2.4` Permission Granularity Consistency Defect | Forging tenant, role, or internal control fields to achieve privilege escalation | Additional fields, reserved fields, tenant ID, admin flag tampering testing |
| `SC-10` | `QD-P-2.2.1` Input Source Not Declared + `QD-S-3.4` Task Scope Not Defined + `QD-T-3.5` Cross-Tool Data Flow Risk | Untrusted content changing task goals and guiding data exfiltration | Indirect injection, goal hijacking, and data exfiltration Tool chain testing |

### D.2 Tool-Agent Quality Defect Chains

| ID | Defect Chain | Candidate Quality Failure | Recommended Supplementary Tests |
|----|--------------|---------------------------|--------------------------------|
| `QC-TA-01` | `QD-S-3.1` Trigger Condition Ambiguous + `QD-T-4.1` Insufficient Description Quality + `QD-T-4.3` Multi-Tool Semantic Competition | Skill or Tool misselection, task failure | Adjacent intents, near-synonym tasks, negative intents, mixed intents |
| `QC-TA-02` | `QD-P-2.2.x` Input Definition Defects + `QD-T-1.2` `required` Inconsistency + `QD-T-2.x` Parameter Constraint Insufficient | Parameter missing, type error, or Schema validation failure | Empty input, missing fields, format variants, boundary values |
| `QC-TA-03` | `QD-P-2.4.3` Tool Call Specification Missing + `QD-PT-2.2` Call Specification Consistency Defect + `QD-ST-3.2` Input Constraint Consistency Defect | Call order errors or missing dependency data | Multi-Tool order dependencies, failure rollback, and state passing |
| `QC-TA-04` | `QD-P-2.3.1` Output Format Not Defined + `QD-PS-1.6` Output Constraint Consistency Defect + `QD-ST-3.5` Output Structure Matching Defect | Results not consumable by downstream systems | Structured output, parsing validation, and field completeness |
| `QC-TA-05` | `QD-P-2.6.x` Exception Handling Defects + `QD-S-4.x` Failure Expansion Defects + `QD-ST-3.7` Error Handling Coverage Defect | Infinite retry after exception, incorrect fallback calls, or task interruption | Timeout, 429, permission denial, and external dependency failure |
| `QC-TA-06` | `QD-S-2.1` Unlimited Quantity + `QD-T-2.4` Array No Length Constraint + `QD-T-3.3` Batch Operation Unrestricted | Large batch tasks timing out, partially executing, or failing | Maximum batch, pagination, cancellation, and checkpoint recovery |
| `QC-TA-07` | `QD-P-1.1.x` Logic Conflict + `QD-P-2.5.4` Constraint Priority Not Defined + `QD-S-3.5` Default Behavior Not Declared | Unstable execution path for same input | Repeated runs, multi-constraint conflicts, and missing information testing |

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

## Appendix E: Mapping Record YAML / JSON Examples

### E.1 Single Defect Mapping Record (YAML)

```yaml
mapping_id: MAP-QD-T-3.2-v1
mapping_version: v1.0
status: active

source:
  defect_id: QD-T-3.2
  defect_name: Raw Input Passthrough
  artifact_type: Tool
  source_standard: Inspect Tool
  source_standard_version: v1.0

applicability:
  agent_levels: [L2, L3]
  required_conditions:
    - User input, external documents, or other untrusted context can influence this parameter
    - Parameter will be interpreted, executed, or further forwarded by the backend
  exclusions:
    - Backend has implemented verifiable strict type validation, allowlist, and safe encoding handling

security_associations:
  - attack_surface_id: AS-02
    attack_surface_name: Input and Parameter Injection
    potential_impacts: [confidentiality, integrity, authorization]
    mapping_strength: strong
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
    - Shadow environment test results
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

### E.2 Defect Chain Record (YAML)

```yaml
chain_id: SC-04
chain_name: Cross-Tool Sensitive Data Exfiltration Candidate Chain
chain_type: security
status: open

members:
  - defect_id: QD-S-1.5
    role: Data source boundary missing
  - defect_id: QD-T-3.5
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

### E.3 API Return Example (JSON)

```json
{
  "finding_id": "F-20260719-00128",
  "defect": {
    "id": "QD-S-5.2",
    "name": "High-Risk Operation Confirmation Mechanism Missing",
    "severity": "P0",
    "artifact": "skill:customer-refund"
    "agent_level": "L3"
  },
  "impact_mapping": {
    "status": "mapped",
    "security": [
      {
        "attack_surface": "AS-05",
        "potential_impacts": ["integrity", "authorization"],
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

### F.2 Relationship with CIA / Authorization Model

| SanityOps Security Consequence | Common Security Model Correspondence | Description |
|-------------------------------|--------------------------------------|-------------|
| Confidentiality | CIA: Confidentiality | Unauthorized reading, leakage, prompts, or sensitive data exfiltration |
| Integrity | CIA: Integrity | Unauthorized writing, deletion, payment, configuration, or business data modification |
| Authorization Risk | Authorization / Access Control | Privilege escalation, identity confusion, cross-tenant, erroneous delegation |
| Availability | CIA: Availability | Loops, resource exhaustion, uncontrolled batch operations, service degradation |
| Audit and Traceability | Accountability / Non-repudiation | Unable to associate sources, parameters, evidence, call chains, or responsible parties |

### F.3 Relationship with OWASP LLM / Agentic Risks

This specification can reference OWASP risk language, but does not use OWASP numbering to replace SanityOps `QD` numbering, nor claims one-to-one correspondence.

| SanityOps Attack Surface | Reference OWASP Risk Directions | Typical SanityOps Defects |
|-------------------------|--------------------------------|---------------------------|
| AS-01 | Prompt Injection, System Prompt Leakage | `QD-P-2.5.2`, `QD-P-2.2.1`, `QD-S-3.4` |
| AS-02 | Improper Input Handling, Injection | `QD-T-1.4`, `QD-T-2.x`, `QD-T-3.2` |
| AS-03 | Sensitive Information Disclosure, Improper Output Handling | `QD-P-2.3.4`, `QD-T-3.5` |
| AS-04 | Excessive Agency, Excessive Permissions | `QD-P-2.5.3`, `QD-S-5.x`, `QD-ST-3.6` |
| AS-05 | Tool Misuse, Unsafe Action Execution | `QD-T-3.1`, `QD-T-4.2`, `QD-T-4.3` |
| AS-06 | Unbounded Consumption, Denial of Service | `QD-P-2.5.1`, `QD-S-2.x`, `QD-T-3.3` |
| AS-07 | Insecure Error Handling, Failure Escalation | `QD-P-2.6.x`, `QD-S-4.x`, `QD-ST-3.7` |
| AS-08 | Supply Chain, Tool / Plugin Risk | `QD-T-4.3`, `QD-T-5.x` |
| AS-09 | Agentic System Misconfiguration | `QD-PS`, `QD-PT`, `QD-ST` |

#### Usage Limitations

1. **Not a one-to-one correspondence**: A single SanityOps attack surface may map to multiple OWASP items, and a single OWASP item may span multiple SanityOps attack surfaces. The table above shows reference directions only.
2. **Not alternative compliance**: Referencing OWASP risk language does not substitute for any formal compliance or certification process.
3. **Not for external declarations**: The terms and mappings in this specification are used for internal communication and threat modeling and shall not be used in customer-facing compliance or audit reports without explicit review.
4. **Independent evidence standards**: Compliance audits, penetration testing, and runtime monitoring must still adopt their respective independent evidence standards.

---

**The SanityOps Inspect Defect Impact and Linkage Mapping Specification v1.0 main text and appendices are now complete.**

---

© 2026 SanityOps. Licensed under Creative Commons Attribution 4.0 International.
https://www.sanityops.org  ·  hello@sanityops.org
v1.0  ·  July 2026