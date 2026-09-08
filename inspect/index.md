# Inspect — Logic Artifact Inspection

**The entry point for AI Agent defect discovery. Systematically scans System Prompts, Skills, and Tool Schemas for quality defects and consistency breaks before deployment.**

---

## Why Inspect?

The reliability of an AI Agent depends on the quality of its **Logic Artifacts** — System Prompts, Skill descriptions, and Tool Schemas. These artifacts are highly susceptible to hidden defects introduced during the design phase:

- Contradictory instructions, scope ambiguity, and implicit assumptions in Prompts
- Unbounded execution, resource runaway, and permission overflow in Skills
- Missing parameter constraints, semantic ambiguity, and unprotected high-risk operations in Tool Schemas
- Authorization mismatches, trigger condition conflicts, and broken constraint chains across artifacts

**Inspect serves as the first static quality defense line — before the Agent enters Risk scanning and Quality assessment.**

---

## Four Sub-Specifications

<div class="grid cards" markdown>

- ### [Inspect Prompt](./prompt.md)

    Static defect inspection framework for System Prompts.

    Covers contradiction, mismatch, scope definition, redundancy, implicit assumptions, gray zones, and other defect types. Supports L1/L2/L3 tiered inspection and P0/P1/P2 defect severity classification.

    **Numbering system**: QD-P-x.y

- ### [Inspect Skill](./skill.md)

    Quality defect inspection standard for Skills.

    Five defect categories: Resource Runaway (QD-S-1), Unbounded Directive (QD-S-2), Ambiguity-Induced Inference (QD-S-3), Failure Escalation (QD-S-4), Permission Overflow (QD-S-5). Includes the six-dimension Review Schema analysis framework.

    **Numbering system**: QD-S-x.y

- ### [Inspect Tool](./tool.md)

    Defect inspection specification for Tool Schemas.

    Covers Structural Validity (QD-T-1.x), Parameter Constraints (QD-T-2.x), High-Risk Operations (QD-T-3.x), Semantic Clarity (QD-T-4.x), and Schema Change and Compatibility (QD-T-5.x).

    **Numbering system**: QD-T-x.y

- ### [Inspect Cross](./cross.md)

    Cross-Artifact consistency inspection standard.

    Three inspection relationships: Prompt → Skill (QD-PS), Prompt → Tool (QD-PT), Skill ↔ Tool (QD-ST), with 19 inspection items that uncover hidden defects undetectable by single-artifact inspection.

    **Numbering system**: QD-PS/PT/ST-n.m

</div>

---

## Defect Severity Levels

| Level | Meaning | Disposition |
|:---:|:---|:---|
| **P0** | Blocking: prevents Agent functionality or introduces security risk | MUST be fixed |
| **P1** | Warning: may cause behavioral instability or functional defects | SHOULD be fixed |
| **P2** | Advisory: affects readability or efficiency, does not impact functionality | MAY be fixed |

---

## Tiered Inspection Mechanism

Different Agent risk levels apply different inspection intensity:

| Agent Level | Typical Characteristics | Inspection Strategy |
|:---:|:---|:---|
| **L1** | Text processing only, no tool invocations | Minimum rule set |
| **L2** | Resource access, medium permissions | Standard rule set |
| **L3** | Sensitive operations, high permissions | Full rule set |

---

## Position Within the SanityOps Framework

```
Inspect (Defect Inspection) ── You are here
    │
    ▼
Risk (Risk Scanning) ── Explicit + Implicit
    │
    ▼
Quality (Service Quality) ── RAG Agent + Tool Agent
    │
    ▼
Relevance (Relevance Assessment)
```

**Inspect is the first gate of SanityOps. Discover defects → classify severity → recommend fixes, ensuring that only quality-verified Logic Artifacts proceed to downstream stages.**

---

## Quick Start

1. Read the [Overview](/framework/overview) for the full SanityOps framework picture
2. Navigate to the sub-specification matching your artifact type and begin inspection
3. After completing single-artifact inspection, run [Inspect Cross](./cross.md) for cross-artifact consistency inspection
