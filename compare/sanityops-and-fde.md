# The Relationship Between SanityOps and FDE



---

## 1. Foundational Positioning

| Dimension             | FDE (Frontier Deployment Engineer)                                 | SanityOps (with DMC, v2.0 Preview)                                                                                               |
| --------------------- | ------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------- |
| **Essential Nature**  | Hybrid engineering role (person)                                   | AI system governance framework (methodology + tooling)                                                                           |
| **Core Objective**    | Transform AI capabilities into business outcomes                   | Ensure AI system logic is correct, risks are controllable, and quality is assessable                                             |
| **Operational Layer** | Business site + engineering implementation + continuous operations | Logic design layer + runtime verification layer                                                                                  |
| **Deliverables**      | Production systems, reusable assets, business value                | Defect reports, risk assessments, quality gates, model capability matrices                                                       |
| **Key Activities**    | On-site deployment, closed-loop delivery, Harness engineering      | Inspect (defect inspection), Risk (risk scanning), Quality (quality assessment), DMC (model capability assessment, v2.0 preview) |

**In one sentence**: FDE is the executor; SanityOps is the engineering methodology and tooling set that enables FDE to deliver high-quality AI systems.

---

## 2. Where SanityOps Fits in the FDE Workflow

The complete FDE workflow and SanityOps support relationship is as follows:

```
FDE Workflow                    SanityOps Support Phase
─────────────────────────────────────────────────────────────
1. Business Problem Definition  ←→    Inspect: Ensure clear requirement boundaries
2. AI Task Design               ←→    DMC: Assess whether the model can handle the task
3. Engineering Implementation   ←→    Inspect: Logic Artifact quality inspection
4. Production Validation        ←→    Risk + Quality: Security and quality validation
5. Continuous Operations        ←→    Quality: Runtime quality monitoring and re-verification
```

**Gate Decision Point**: The SanityOps Gate aggregates results from Inspect, Risk, and Quality to make release decisions — serving as the critical checkpoint for FDE to deploy systems into production.

---

## 3. Mapping SanityOps Subsets to FDE Capabilities

### 3.1 Inspect (Defect Inspection) ↔ FDE's "Engineering Delivery" Capability

Inspect performs static defect inspection on Logic Artifacts (System Prompt, Skill, Tool Schema), serving as the core quality assurance during FDE's **engineering implementation phase**.

| Inspect Check Item                       | FDE Responsibility                                                                    | Typical Defect Example                                                                                              |
| ---------------------------------------- | ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| **Dangling References / Pseudo-Actions** | Ensure consistency between Skill and Tool Schema to prevent model hallucination calls | `booking_management.policy.allowed_actions` includes `add_service`, but this tool does not exist in the Tool Schema |
| **Missing Parameter Constraints**        | Complete boundary constraints in Tool Schema                                          | `request_refund.amount_requested` lacks a `maximum` constraint, creating over-refund risk                           |
| **Cross-Artifact Consistency**           | Ensure consistency across Prompt, Skill, Schema, and code                             | System Prompt requires name masking as `CHEN / M***`, but code outputs full names directly                          |
| **Security / PII Rules**                 | Implement desensitization, validation, and confirmation gates as security boundaries  | `checkin_boarding` involves mutating tools but lacks `require_confirmation`                                         |
| **Missing Confirmation Gates**           | Set up human confirmation mechanisms for mutating operations                          | `cancel_booking`'s `refund_requested` defaults to `true`, potentially bypassing policy confirmation                 |

**Key Principle**: Inspect is the prerequisite gate for DMC — Logic Artifacts must pass quality inspection before being used to generate DMC test cases.

### 3.2 DMC (Derivative Model Capability Assessment, v2.0 Preview) ↔ FDE's "Model Selection" Decisions

> **Note**: DMC (Derivative Model Capability) is a module introduced in SanityOps v2.0 (expected release: November 2026) and is currently in preview.

DMC assesses the **derivative model itself** (quantized, pruned, distilled, or fine-tuned models) across five capability dimensions, providing FDE with objective evidence for **model selection and task matching**.

| DMC Assessment Dimension  | Assessment Content                    | FDE Application Scenario                                                                                                         |
| ------------------------- | ------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| **Complex Reasoning**     | Multi-step inference capability       | Determine whether the derivative model can handle multi-step compliance reasoning tasks (e.g., refund eligibility determination) |
| **Long Context**          | Long-text positioning and correlation | Assess model capability for long-text scenarios such as historical order retrieval                                               |
| **Domain Expertise**      | Industry rule mastery                 | Verify model mastery of enterprise-specific knowledge such as EU261 regulations                                                  |
| **Safety Boundaries**     | Refusal when appropriate              | Confirm whether the model maintains safe refusal capabilities after compression                                                  |
| **Instruction Following** | Format constraint execution           | Verify stability of structured constraints such as JSON format output                                                            |

**Key DMC Boundaries**:

- **Tests the model only, not the Agent system** — Directly calls the model API to send questions, bypassing tools, environment, and orchestration
- **Does not participate in Gate decisions** — Outputs a decision matrix for FDE reference, does not directly determine production release
- **Requires Logic Artifacts to pass Inspect first** — Defective Logic Artifacts will contaminate assessment results

**FDE Decision Basis**: DMC outputs a "model × task type" decision matrix (generative / evidence-based / execution-based × five dimensions), not an overall score. FDE uses this to determine "whether this model can handle this type of work."

### 3.3 Risk (Risk Scanning) ↔ FDE's "Security Governance" Capability

Risk dynamically validates Agent system behavior under attack, serving as the security assurance during FDE's **production validation phase**.

| Risk Scan Item                   | FDE Responsibility                                                                                    |
| -------------------------------- | ----------------------------------------------------------------------------------------------------- |
| **Injection Attack Testing**     | Verify completeness of Tool parameter validation to prevent path traversal such as `../../etc/passwd` |
| **Privilege Escalation Testing** | Ensure authentication mechanisms are effective to prevent unauthorized access                         |
| **PII Leakage Testing**          | Verify implementation of data desensitization rules to prevent sensitive information disclosure       |
| **Tool Abuse Testing**           | Detect whether the model may call unauthorized tools or perform out-of-scope operations               |

**Division of Labor with Inspect**: Inspect discovers design defects such as "parameter lacks validation"; Risk validates whether that defect can actually be exploited.

### 3.4 Quality (Quality Assessment) ↔ FDE's "Continuous Operations" Capability

Quality assesses Agent runtime output quality, supporting FDE's **continuous operations** phase.

| Quality Assessment Item       | FDE Responsibility                                                                                        |
| ----------------------------- | --------------------------------------------------------------------------------------------------------- |
| **Output Stability**          | Monitor model response consistency and detect drift                                                       |
| **Effectiveness Assessment**  | Establish evaluation sets and drive iteration through the "define-measure-attribute-improve-regress" loop |
| **Business Metrics Tracking** | Monitor accuracy, processing time, user satisfaction, and other business outcomes                         |

---

## 4. Key Collaborative Relationships

### 4.1 How FDE Uses SanityOps

FDE is not a passive user of SanityOps but an **active quality accountability owner**:

1. **Logic Artifact Design Phase**: Use Inspect rules to guide Prompt, Skill, and Schema design to avoid congenital defects
2. **Development Phase**: Run Inspect checks and fix defects before entering DMC assessment
3. **Model Selection Phase**: Reference the DMC decision matrix to select derivative models suitable for the task type
4. **Pre-Production**: Validate security boundaries through Risk and confirm runtime quality through Quality
5. **Post-Production**: Continuously monitor using Quality, accumulate real-world samples, and build up reusable assets

### 4.2 How SanityOps Empowers FDE

| FDE Capability Dimension               | SanityOps Empowerment Approach                                                            |
| -------------------------------------- | ----------------------------------------------------------------------------------------- |
| **Business Problem Definition**        | Inspect provides acceptance criteria for "clear rule boundaries"                          |
| **AI Engineering Delivery**            | Inspect + Risk + Quality provide end-to-end quality validation                            |
| **Harness Continuous Taming**          | Logic Artifact quality checks ensure Harness has correct rules to execute                 |
| **EDD and Production Operations**      | Quality provides the measurement foundation for evaluation-driven development             |
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
└── Inspect check: Discovers amount_requested lacks upper bound constraint (defect TS-03)

Phase 2: Defect Remediation
├── FDE fix: Adds amount ≤ order actual payment amount constraint
└── Inspect re-verification: Pass

Phase 3: Model Selection
├── FDE prepares to deploy INT4 quantized model
├── DMC assessment: Discovers this model has excessive failure rate in "complex reasoning" dimension
└── FDE decision: Decomposes multi-step compliance reasoning tasks into single-step checks (system compensation)

Phase 4: Production Validation
├── Risk scan: Validates refund tool parameter injection protection
├── Quality assessment: Confirms refund accuracy meets business requirements
└── Gate decision: PASS

Phase 5: Continuous Operations
├── Quality monitoring: Tracks refund success rate, user satisfaction
└── Assetize: accumulate evaluation sets and defect patterns as reusable assets
```

---

## 6. Summary

| Question               | Answer                                                                                                                                                       |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **What is SanityOps?** | An AI system governance framework providing Inspect, Risk, and Quality quality assurance systems; DMC (v2.0 preview) supplements model capability assessment |
| **What is FDE?**       | Frontier Deployment Engineer — a hybrid engineering role responsible for transforming AI capabilities into business outcomes                                 |
| **Relationship?**      | SanityOps is FDE's **quality infrastructure** — FDE uses SanityOps to ensure delivered systems are "worth deploying" and "risks are controllable"            |
| **Core Value?**        | FDE engineering delivery capability × SanityOps quality governance capability = **Reliable deployment of enterprise-grade AI systems**                       |

---

## Appendix: Reference Documents

- [SanityOps Framework Core](../framework/core.html) — Framework core terminology and decision baselines
- [SanityOps and Harness](./sanityops-and-harness.html) — The relationship between SanityOps and Harness
- [DMC v1.4](../DMC/DMC.html) — Derivative model capability assessment methodology (v2.0 preview)

---

*This document is based on SanityOps Framework v1.0 and DMC v1.4*
