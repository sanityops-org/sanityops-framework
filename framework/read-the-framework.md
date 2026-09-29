# Read the Framework

Welcome to the SanityOps Framework — a vendor-neutral methodology for AI Agent governance, built on logic-artifact inspection, risk validation, and quality assessment.

This guide recommends a reading path through the core documents. You can also jump directly to any section that interests you.

---

## Recommended Reading Path

### 1. Overview

Start here for the big picture — what SanityOps is, why it exists, and how the professional systems fit together.

→ [Overview](/framework/overview)

### 2. Core Framework

Understand the governance closed loop, the Ratchet Mechanism, release gates, and the framework's structural foundation.

→ [Core Specification](/framework/core)

### 3. Inspect

Learn how to statically scan System Prompts, Skills, and Tool Schemas for definition defects and boundary issues, then check whether granted permissions are proportionate to assigned responsibilities.

> **Note**: Run Inspect Permission last, after the other Inspect sub-specifications, and subject to the Gate-0 precondition.

→ [Inspect Introduction](/inspect/)

### 4. Risk

Audit explicit risks in logic artifacts, then validate implicit vulnerabilities through dynamic attack simulation in shadow sandboxes.

→ [Risk Introduction](/risk/)

### 5. Quality

Quantitatively assess user-visible output quality and task reliability — the final gate before production release.

→ [Quality Introduction](/quality/)

### 6. Relevance

Map defects discovered during inspection to their potential impact on risk and quality, completing the governance feedback loop.

→ [Relevance](/framework/relevance)

### 7. Compare

Understand how SanityOps relates to adjacent tools and evaluation frameworks in the broader ecosystem.

→ [Compare](/compare/)

---

## Quick Links

| If you are a… | Start with |
|:---|:---|
| **First-time reader** | [Overview](/framework/overview) |
| **Agent developer** | [Inspect](/inspect/) → [Risk](/risk/) |
| **Security auditor** | [Risk Explicit](/risk/explicit) → [Risk Implicit](/risk/implicit) |
| **QA engineer** | [Quality RAG-Agent](/quality/rag-agent) or [Quality Tool-Agent](/quality/tool-agent) |
| **Platform / CI/CD engineer** | [Core Specification](/framework/core) |
