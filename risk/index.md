# Risk — Agent Security Risk Detection

**Proactive security validation for AI Agents. Audits explicit risks embedded in Logic Artifacts and dynamically validates implicit vulnerabilities through attack execution in shadow environments.**

---

## Why Risk?

Inspect verifies that Logic Artifacts are well-formed — but even well-formed artifacts can harbor security risks that static inspection alone cannot surface:

- **Explicit risks**: Dangerous instructions, privilege escalation paths, or hijacking triggers deliberately or inadvertently expressed in System Prompts, Skills, or Tool Schemas — readable yet easily overlooked in manual review
- **Implicit risks**: Runtime vulnerabilities that only emerge under multi-turn logic attacks, where imprecise definitions and boundary gaps become exploitable attack surfaces

Traditional runtime Guardrails face an **impossible triangle** of real-time detection, complex attack logic, and massive context — making them structurally incapable of catching sophisticated logic attacks. Meanwhile, generic Red Teaming tools rely on blind testing with no awareness of artifact-specific weaknesses.

**Risk bridges this gap: audit what can be seen statically, then validate what can only be found dynamically.**

---

## Two Sub-Specifications

<div class="grid cards" markdown>

- ### [Risk Explicit](./explicit-v1.0.md)

    Static audit of explicit risks expressed in Logic Artifacts.

    Scans System Prompts, Skills, and Tool Schemas for dangerous content across 32 subcategories in 4 families: Continuous NL (NL-A), Non-Continuous NL (NL-B), Obfuscated Coding (NR-O), and Structured Configuration (NR-S). Applies a three-dimension harm assessment model — **confidentiality (D1)**, **integrity (D2)**, and **authorization (D3)** — with quantified **S0/S1/S2/S3** severity levels.

    **Numbering system**: EX-x.y — NL-A, NL-B, NR-O, NR-S

- ### [Risk Implicit](./implicit-v1.0.md)

    Dynamic validation of implicit runtime vulnerabilities.

    Generates artifact-driven, targeted attack test cases from Inspect defect data, executes them against the Agent in a **Shadow Environment**, and classifies outcomes into four termination statuses: **A** (Attack Successful), **B** (Blocked by Third Party), **C** (LLM Refused), and **D** (Test Conditions Not Met). Produces a **Signal Score** and Gate decision for release admission.

    **Four core design principles**: Relevance, Safety, Measurability, Integrability

</div>

---

## Explicit Risk: Audit Dimensions

| Family | Type | Count | Description |
|:---|:---|:---:|:---|
| **NL-A** | Continuous Natural Language | 9 | Risk semantics complete within a single sentence or adjacent statements |
| **NL-B** | Non-Continuous Natural Language | 10 | Risk fragments dispersed across multiple locations, requiring association analysis |
| **NR-O** | Obfuscated Coding | 5 | Hidden instruction content identifiable after decoding |
| **NR-S** | Structured Configuration | 8 | Implicit dangerous configurations identifiable through field validation |

**Harm Assessment Model** (three independent dimensions):

| Dimension | Focus |
|:---:|:---|
| **D1** | Confidentiality — data exposure, information leakage |
| **D2** | Integrity — unauthorized modification, logic tampering |
| **D3** | Authorization — privilege escalation, permission bypass |

---

## Implicit Risk: Validation Flow

```
Inspect Defect Data
    │
    ▼
Attack Strategy Derivation ── artifact-driven, not blind
    │
    ▼
Test Case Generation ── parameterized, targeted
    │
    ▼
Shadow Environment Execution ── safe isolation
    │
    ▼
Termination Status Classification ── A / B / C / D
    │
    ▼
Signal Score → Gate Decision
```

---

## Severity Levels

| Level | Meaning | Disposition |
|:---:|:---|:---|
| **S0** | Critical: confirmed exploitable with severe business impact | MUST remediate immediately |
| **S1** | High: confirmed exploitable with significant impact | MUST remediate before release |
| **S2** | Medium: potentially exploitable or partial impact | SHOULD remediate |
| **S3** | Low: theoretical risk, limited exploitability | MAY accept or monitor |

---

## Position Within the SanityOps Framework

```
Inspect (Defect Inspection) ── finds the defects
    │
    ▼
Risk (Risk Scanning) ── You are here
    │   ├─ Explicit: audits dangerous content in artifacts
    │   └─ Implicit: validates exploitable attack surfaces at runtime
    │
    ▼
Quality (Service Quality) ── RAG Agent + Tool Agent
    │
    ▼
Relevance (Relevance Assessment)
```

**Risk answers the question Inspect cannot: given the defects found, is the Agent actually vulnerable to attack? It provides independent, auditable security proofs for compliance, investor, and customer requirements.**

---

## Quick Start

1. Complete [Inspect](/inspect/) first — Risk Explicit and Implicit both depend on defect data from Inspect
2. Run [Risk Explicit](./explicit-v1.0.md) to audit artifacts for dangerous expressions, scripts, and dangerous authorizations
3. Run [Risk Implicit](./implicit-v1.0.md) in a Shadow Environment to validate whether identified defects form real attack surfaces
4. Feed results to [Relevance](/relevance/v1.0) for defect → risk diagnostic mapping
