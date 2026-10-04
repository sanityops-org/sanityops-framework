---
title: Framework
description: "Entry point for the SanityOps framework documentation: overview, core concepts, relevance, hands-on tools, FAQ, and samples."
---

# SanityOps Framework

**The root of the SanityOps methodology — the governance foundation that defines what SanityOps is, how the closed loop works, and how the three downstream subsets (Inspect, Risk, Quality) connect.**

---

## Why This Section?

SanityOps is an open, vendor-neutral methodology for AI Agent governance, built on logic-artifact defect inspection and extending into Risk scanning and Quality assessment. This section holds the normative core of the framework itself — before you dive into the three professional subsystems and the surrounding ecosystem.

---

## Framework Documents

<div class="grid cards" markdown>

- ### [Framework Overview](./overview.md)

    The complete whitepaper — what SanityOps is, why it exists, and how everything fits together.

    A 14-section end-to-end narrative covering the three enterprise challenges, the root cause, the three professional systems, lifecycle integration, boundaries, outputs, and FAQ. **Start here for the big picture.**

- ### [Core Specification](./core.md)

    The normative foundation of the framework.

    Defines the governance closed loop, the unified object and artifact model, terminology and numbering rules, the Ratchet Mechanism, and release gates.

- ### [Relevance](./relevance.md)

    The impact-mapping specification.

    Maps defects discovered during inspection to their downstream impact on Risk and Quality, completing the governance feedback loop.

- ### [Try the Tools](./try-the-tools.md)

    Openness overview and tooling entry points.

    How to access the open-source Inspect CLI, the Risk and Quality SaaS demos, and self-hosted deployment options.

- ### [FAQ](./FAQ.md)

    Frequently asked questions.

    Answers to common questions for AI service managers, developers, operators, and security teams, with sources cited from the official specifications.

- ### [Samples](../samples/index.md)

    Worked examples from the tools.

    Illustrative Logic Artifacts and defect inspection reports produced by the SanityOps tools, showing findings, risk validation rounds, and remediation tracking.

</div>

---

## How the Framework Connects

```
Framework (Core + Overview + Relevance)   ← You are here
    │
    ├─ Inspect   (defect discovery)
    ├─ Risk      (explicit + implicit security)
    └─ Quality   (service quality & reliability)
```

**The Framework is the spine. Core defines the rules, Relevance links findings back to impact, and Overview gives you the map. From here, proceed to Inspect → Risk → Quality, then explore the ecosystem in Compare.**

---

## Recommended Reading Path

A recommended reading path through the core documents. You can also jump directly to any section that interests you.

### 1. Overview

Start here for the big picture — what SanityOps is, why it exists, and how the professional systems fit together.

→ [Overview](./overview.md)

### 2. Core Framework

Understand the governance closed loop, the Ratchet Mechanism, release gates, and the framework's structural foundation.

→ [Core Specification](./core.md)

### 3. Inspect

Learn how to statically scan System Prompts, Skills, and Tool Schemas for definition defects and boundary issues, then check whether granted permissions are proportionate to assigned responsibilities.

> **Note**: Run Inspect Permission last, after the other Inspect sub-specifications, and subject to the Gate-0 precondition.

→ [Inspect Introduction](../inspect/)

### 4. Risk

Audit explicit risks in logic artifacts, then validate implicit vulnerabilities through dynamic attack simulation in shadow sandboxes.

→ [Risk Introduction](../risk/)

### 5. Quality

Quantitatively assess user-visible output quality and task reliability — the final gate before production release.

→ [Quality Introduction](../quality/)

### 6. Relevance

Map defects discovered during inspection to their potential impact on risk and quality, completing the governance feedback loop.

→ [Relevance](./relevance.md)

### 7. Compare

Understand how SanityOps relates to adjacent tools and evaluation frameworks in the broader ecosystem.

→ [Compare](../compare/)

## Quick Links

| If you are a... | Start with |
|:---|:---|
| **First-time reader** | [Overview](./overview.md) |
| **Agent developer** | [Inspect](../inspect/) → [Risk](../risk/) |
| **Security auditor** | [Risk Explicit](../risk/explicit.md) → [Risk Implicit](../risk/implicit.md) |
| **QA engineer** | [Quality RAG-Agent](../quality/rag-agent.md) or [Quality Tool-Agent](../quality/tool-agent.md) |
| **Platform / CI/CD engineer** | [Core Specification](./core.md) |
