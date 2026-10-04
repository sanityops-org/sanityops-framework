---
title: SanityOps and FDE
description: "How the SanityOps governance framework serves as quality infrastructure for Forward Deployed Engineers."
---

# The Relationship Between SanityOps and FDE

---

## Table of Contents

- [1. Foundational Positioning](#1-foundational-positioning)
- [2. Where SanityOps Fits in the FDE Workflow](#2-where-sanityops-fits-in-the-fde-workflow)
- [3. Mapping SanityOps Subsets to FDE Capabilities](#3-mapping-sanityops-subsets-to-fde-capabilities)
- [4. Key Collaborative Relationships](#4-key-collaborative-relationships)
- [5. Typical Workflow Example](#5-typical-workflow-example)
- [6. Summary](#6-summary)
- [7. Appendix: Reference Documents](#7-appendix-reference-documents)

---

## 1. Foundational Positioning

| Dimension | FDE (Forward Deployed Engineer) | SanityOps |
|-----------|-----------------------------------|----------------------|
| **Essential Nature** | Hybrid engineering role (person) | AI system governance framework (methodology + tooling) |
| **Core Objective** | Transform AI capabilities into business outcomes | Ensure AI system logic is correct, risks are controllable, and quality is assessable |
| **Operational Layer** | Business site + engineering implementation + continuous operations | Logic design layer + runtime verification layer |
| **Deliverables** | Production systems, reusable assets, business value | Defect reports, risk assessments, quality gates |
| **Key Activities** | On-site deployment, closed-loop delivery, Harness engineering | Inspect (defect inspection), Risk (risk scanning), Quality (quality assessment) |

**In one sentence**: FDE is the executor; SanityOps is the engineering methodology and tooling set that enables FDE to deliver high-quality AI systems.

---

## 2. Where SanityOps Fits in the FDE Workflow

The complete FDE workflow and SanityOps support relationship is as follows:

```
FDE Workflow                    SanityOps Support Phase
─────────────────────────────────────────────────────────────
1. Business Problem Definition  ←→    Inspect: Ensure clear requirement boundaries
2. Engineering Implementation   ←→    Inspect: Logic Artifact quality inspection
3. Production Validation        ←→    Risk + Quality: Security and quality validation
4. Continuous Operations        ←→    Quality: Runtime quality monitoring and re-verification
```

**Gate Decision Point**: The SanityOps Gate aggregates results from Inspect, Risk, and Quality to make release decisions — serving as the critical checkpoint for FDE to deploy systems into production.

---

## 3. Mapping SanityOps Subsets to FDE Capabilities

### 3.1 Inspect (Defect Inspection) ↔ FDE's "Engineering Delivery" Capability

Inspect performs static defect inspection on Logic Artifacts (System Prompt, Skill, Tool Schema), serving as the core quality assurance during FDE's **engineering implementation phase**.

| Inspect Check Item | FDE Responsibility | Typical Defect Example |
|-------------------|-------------------|----------------------|
| **Dangling References / Pseudo-Actions** | Ensure consistency between Skill and Tool Schema to prevent model hallucination calls | `booking_management.policy.allowed_actions` includes `add_service`, but this tool does not exist in the Tool Schema |
| **Missing Parameter Constraints** | Complete boundary constraints in Tool Schema | `request_refund.amount_requested` lacks a `maximum` constraint, creating over-refund risk |
| **Cross-Artifact Consistency** | Ensure consistency across Prompt, Skill, Schema, and code | System Prompt requires name masking as `CHEN / M***`, but code outputs full names directly |
| **Security / PII Rules** | Implement desensitization, validation, and confirmation gates as security boundaries | `checkin_boarding` involves mutating tools but lacks `require_confirmation` |
| **Missing Confirmation Gates** | Set up human confirmation mechanisms for mutating operations | `cancel_booking`'s `refund_requested` defaults to `true`, potentially bypassing policy confirmation |

### 3.2 Risk (Risk Scanning) ↔ FDE's "Security Governance" Capability

Risk dynamically validates Agent system behavior under attack, serving as the security assurance during FDE's **production validation phase**.

| Risk Scan Item | FDE Responsibility |
|---------------|-------------------|
| **Injection Attack Testing** | Verify completeness of Tool parameter validation to prevent path traversal such as `../../etc/passwd` |
| **Privilege Escalation Testing** | Ensure authentication mechanisms are effective to prevent unauthorized access |
| **PII Leakage Testing** | Verify implementation of data desensitization rules to prevent sensitive information disclosure |
| **Tool Abuse Testing** | Detect whether the model may call unauthorized tools or perform out-of-scope operations |

**Division of Labor with Inspect**: Inspect discovers design defects such as "parameter lacks validation"; Risk validates whether that defect can actually be exploited.

### 3.3 Quality (Quality Assessment) ↔ FDE's "Continuous Operations" Capability

Quality assesses Agent runtime output quality, supporting FDE's **continuous operations** phase.

| Quality Assessment Item | FDE Responsibility |
|------------------------|-------------------|
| **Output Stability** | Monitor model response consistency and detect drift |
| **Effectiveness Assessment** | Establish evaluation sets and drive iteration through the "define-measure-attribute-improve-regress" loop |
| **Business Metrics Tracking** | Monitor accuracy, processing time, user satisfaction, and other business outcomes |

---

## 4. Key Collaborative Relationships

### 4.1 How FDE Uses SanityOps

FDE is not a passive user of SanityOps but an **active quality accountability owner**:

1. **Logic Artifact Design Phase**: Use Inspect rules to guide Prompt, Skill, and Schema design to avoid congenital defects
2. **Development Phase**: Run Inspect checks and fix defects
3. **Pre-Production**: Validate security boundaries through Risk and confirm runtime quality through Quality
4. **Post-Production**: Continuously monitor using Quality, accumulate real-world samples, and build up reusable assets

### 4.2 How SanityOps Empowers FDE

| FDE Capability Dimension | SanityOps Empowerment Approach |
|-------------------------|------------------------------|
| **Business Problem Definition** | Inspect provides acceptance criteria for "clear rule boundaries" |
| **AI Engineering Delivery** | Inspect + Risk + Quality provide end-to-end quality validation |
| **Harness Continuous Taming** | Logic Artifact quality checks ensure Harness has correct rules to execute |
| **EDD and Production Operations** | Quality provides the measurement foundation for evaluation-driven development |
| **On-Site Leadership and Asset Reuse** | Defect reports, evaluation sets, and assessment matrices become reusable knowledge assets |

### 4.3 Integration with Harness

The relationship between SanityOps and Harness is detailed in the standalone document [SanityOps and Harness](./sanityops-and-harness.md). The core points FDE needs to understand are:

- **SanityOps** ensures that "the rules themselves are worth executing" (blueprint correctness)
- **Harness** is responsible for "the rules being executed correctly" (runtime reliability)
- **Integration Point**: After Inspect-discovered defects are fixed, constraints in the Tool Schema become the basis for Harness runtime interception

---

## 5. Typical Workflow Example

Using the "airline customer service Agent refund function" as an example, this demonstrates how FDE uses SanityOps:

```
Phase 1: Logic Artifact Design
├── FDE writes System Prompt: Defines refund rules (7-day limit, perishable exceptions, etc.)
├── FDE writes Skill: Defines refund decision workflow
├── FDE writes Tool Schema: Defines request_refund parameter constraints
└── Inspect check: Discovers amount_requested lacks upper bound constraint (defect QD-T-2.3)

Phase 2: Defect Remediation
├── FDE fix: Adds amount ≤ order actual payment amount constraint
└── Inspect re-verification: Pass

Phase 3: Production Validation
├── Risk scan: Validates refund tool parameter injection protection
├── Quality assessment: Confirms refund accuracy meets business requirements
└── Gate decision: PASS

Phase 4: Continuous Operations
├── Quality monitoring: Tracks refund success rate, user satisfaction
└── Assetize: accumulate evaluation sets and defect patterns as reusable assets
```

---

## 6. Summary

| Question | Answer |
|---------|--------|
| **What is SanityOps?** | An AI system governance framework providing Inspect, Risk, and Quality quality assurance systems |
| **What is FDE?** | Forward Deployed Engineer — a hybrid engineering role responsible for transforming AI capabilities into business outcomes |
| **Relationship?** | SanityOps is FDE's **quality infrastructure** — FDE uses SanityOps to ensure delivered systems are "worth deploying" and "risks are controllable" |
| **Core Value?** | FDE engineering delivery capability × SanityOps quality governance capability = **Reliable deployment of enterprise-grade AI systems** |

---

## 7. Appendix: Reference Documents

- [SanityOps Framework Core](/framework/core) — Framework core terminology and decision baselines
- [SanityOps and Harness](/compare/sanityops-and-harness) — The relationship between SanityOps and Harness
