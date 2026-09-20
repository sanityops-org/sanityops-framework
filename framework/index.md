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

- ### [Read the Framework](./read-the-framework.md)

    A guided reading path through the core documents.

    Seven recommended steps from Overview through Core, Inspect, Risk, Quality, Relevance, and Compare, plus role-based quick links.

- ### [Try the Tools](./try-the-tools.md)

    Openness overview and tooling entry points.

    How to access the open-source Inspect CLI, the Risk and Quality SaaS demos, and self-hosted deployment options.

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

## Quick Start

1. Read the [Framework Overview](./overview.md) for the full picture
2. Study the [Core Specification](./core.md) for the normative rules
3. Follow [Read the Framework](./read-the-framework.md) for a guided path, or jump straight into [Inspect](../inspect/)
