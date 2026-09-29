# Appendix: Technical Comparison Inspect & Risk vs. NVIDIA SkillSpector

---

## Table of Contents

- [0. Scope of Comparison](#0-scope-of-comparison)
- [1. Bottom Line First (TL;DR)](#1-bottom-line-first-tldr)
- [2. Paradigm Layer: Scanning Action vs. Governance Closed Loop](#2-paradigm-layer-scanning-action-vs-governance-closed-loop)
- [3. Structure Layer: Governance Objects](#3-structure-layer-governance-objects)
- [4. Lifecycle Layer: Coverage by Phase](#4-lifecycle-layer-coverage-by-phase)
- [5. Methodology Layer: Where the Determination Comes From](#5-methodology-layer-where-the-determination-comes-from)
- [6. Output Layer: Conclusion Form and Actionability](#6-output-layer-conclusion-form-and-actionability)
- [7. Capability Matrix (Quick Reference)](#7-capability-matrix-quick-reference)
- [8. Coordination Recommendations](#8-coordination-recommendations)

---

<a id="0-scope-of-comparison"></a>
## 0. Scope of Comparison

---

SkillSpector is a security scanner for AI Agent Skills. SanityOps is a governance framework spanning three dimensions: Inspect, Risk, and Quality. The comparable surface between the two is **Inspect (Defect Inspection) + Risk (Risk Scanning)**. The Quality subset, which assesses user-visible service quality, has no counterpart in SkillSpector and is therefore **excluded from this comparison** to keep it fair.

Both are production-grade tooling: SkillSpector ships as a CLI / Docker image. On the SanityOps side, the corresponding tools are **Defect Inspector** (the Inspect implementation; open source, CLI, SaaS + self-hosted) and **Risk Scanner** (the Risk implementation; SaaS + self-hosted).

---

<a id="1-bottom-line-first-tldr"></a>

## 1. Bottom Line First (TL;DR)

|                        | NVIDIA SkillSpector                                                                                                                                                                                                                                                                 | SanityOps Inspect + Risk                                                                                                                         |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| In one sentence        | "Can this Skill package be installed?"                                                                                                                                                                                                                                              | "Will this logic design cause the Agent to do the wrong thing, how much risk does it carry, and what needs to be re-verified after remediation?" |
| Essential nature       | A security scanner (one scan, install recommendation)                                                                                                                                                                                                                               | A Governance Closed Loop (inspection triggered on every Logic Artifact iteration)                                                                |
| Strongest capabilities | Malicious code patterns, dependency CVEs / supply chain                                                                                                                                                                                                                             | Logic design defects, Cross-Artifact Consistency, runtime dynamic attack validation                                                              |
| Blind spots            | No logic-design perspective, no cross-artifact perspective, does not execute the target                                                                                                                                                                                             | Does not perform dependency CVE / supply chain detection                                                                                         |
| Verdict                | **Complementary, not substitutable.** Use SkillSpector to gate externally sourced Skills at the door; use SanityOps for end-to-end governance of internally developed Logic Artifacts. SanityOps explicitly does not replace existing security frameworks it coordinates with them. |                                                                                                                                                  |

---

<a id="2-paradigm-layer-scanning-action-vs-governance-closed-loop"></a>

## 2. Paradigm Layer: Scanning Action vs. Governance Closed Loop

| Dimension         | SkillSpector                 | Inspect + Risk                                                |
| ----------------- | ---------------------------- | ------------------------------------------------------------- |
| Unit of delivery  | One scan → one report        | One governance cycle: Inspect → Risk Explicit → Risk Implicit |
| Trigger timing    | Before installation / import | On every Logic Artifact iteration                             |
| Focus             | Security                     | Defect + risk (with linkage to Quality)                       |
| Intensity scaling | None (uniform scan)          | Agent tiering L1/L2/L3 determines the inspection item count   |

---

<a id="3-structure-layer-governance-objects"></a>

## 3. Structure Layer: Governance Objects

**SkillSpector**: Inspects the Skill package everything inside it, including SKILL.md, scripts, and the dependency manifest. Accepts Git repositories, URLs, zips, directories, and single files.

**SanityOps Inspect + Risk**: Inspects three types of Logic Artifacts plus their cross-artifact relationships:

```
Inspect (Defect Inspection)
├─ Inspect Prompt   → System Prompt
├─ Inspect Skill    → Skill
├─ Inspect Tool     → Tool Schema
└─ Inspect Cross    → Cross-Artifact relationships
Risk (Risk Scanning)
├─ Risk Explicit    → Explicit Risks in Logic Artifacts (including embedded scripts, Python/Shell, etc.)
└─ Risk Implicit    → Implicit runtime vulnerabilities
```

**Key structural difference**: SkillSpector is bounded by the *package*. It cannot answer questions such as "Does the System Prompt actually authorize this Skill's declared capability?" or "Does the Skill's declared permission scope match its Tool Schemas?" these Cross-Artifact Consistency questions are the exclusive province of Inspect Cross.

---

<a id="4-lifecycle-layer-coverage-by-phase"></a>

## 4. Lifecycle Layer: Coverage by Phase

| Phase                                                    | SkillSpector                                                       | Inspect + Risk                                                                                                           |
| -------------------------------------------------------- | ------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------ |
| Design / development (logic defects)                     | ✗                                                                  | ✓ Inspect                                                                                                                |
| Import / pre-release (supply chain, CVE, malicious code) | ✓ Core strength                                                    | Partial (Risk Explicit covers risk expressions in artifacts and scripts, but not dependency CVEs)                        |
| Pre-release (Explicit Risk audit and rating)             | Partial                                                            | ✓ Risk Explicit                                                                                                          |
| Runtime (dynamic attack validation)                      | ✗ (the trust model stipulates the scanned Skill is never executed) | ✓ Risk Implicit, executed in isolated Shadow Sandboxes                                                                |
| Post-remediation re-check                                | Baseline suppression (filters known items)                         | Structured re-check: re-run Risk Explicit after fixing defects; address Explicit Risks first, then run runtime detection |

---

<a id="5-methodology-layer-where-the-determination-comes-from"></a>

## 5. Methodology Layer: Where the Determination Comes From

| Dimension               | SkillSpector                                                | Inspect                                                           | Risk Explicit                                                 | Risk Implicit                                                                     |
| ----------------------- | ----------------------------------------------------------- | ----------------------------------------------------------------- | ------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| Basis for determination | Vulnerability pattern library (68 patterns / 17 categories) | Rule-based inspection items + six-dimension review framework      | 32 Explicit Risk categories + three-dimension harm assessment | Attack test cases derived from defects                                            |
| Driving mode            | Pattern-driven                                              | Rule / checklist-driven                                           | Semantic classification-driven                                | **Artifact-Driven** (understands internal structure to generate targeted attacks) |
| Input source            | The scanned package                                         | Raw artifacts                                                     | Artifacts that have passed Inspect                            | Inspect defect list + Explicit results                                            |
| Executes the target?    | No                                                          | No                                                                | No                                                            | Yes (Shadow Sandbox)                                                          |
| Human involvement       | Essentially none                                            | Explicitly divided into automated / semi-automated / human review | Semi-automated + human rating                                 | Semi-automated                                                                    |

**Structural difference**: SkillSpector's recall ceiling is set by its pattern library anything outside the library is invisible to it. SanityOps' recall ceiling is set by the depth of its rule system and artifact understanding, and the tiering mechanism balances cost against inspection intensity.

---

<a id="6-output-layer-conclusion-form-and-actionability"></a>

## 6. Output Layer: Conclusion Form and Actionability

| Dimension                | SkillSpector                                                                             | Inspect                                        | Risk Explicit                                                          |
| ------------------------ | ---------------------------------------------------------------------------------------- | ---------------------------------------------- | ---------------------------------------------------------------------- |
| Conclusion form          | 0–100 risk score + severity + install recommendation (`SAFE / CAUTION / DO_NOT_INSTALL`) | Defect list + remediation recommendations      | Risk item list + severity level + deduction                            |
| Rating system            | LOW / MEDIUM / HIGH / CRITICAL                                                           | P0 / P1 / P2; P0 constitutes the Gate          | D1/D2/D3 → S-level                                                     |
| Localization granularity | File : line number + confidence                                                          | Rule ID + artifact entry                       | Risk item + owning artifact                                            |
| Root-cause answer        | "Which line of code is dangerous"                                                        | "Which design element is missing a constraint" | "Why the defense fell, and which Logic Artifact went wrong" (Implicit) |
| Pass criterion           | Human decision based on score                                                            | All P0 passed + P1 assessed → report issued    | Decision after risk rating                                             |

---

<a id="7-capability-matrix-quick-reference"></a>

## 7. Capability Matrix (Quick Reference)

| Capability                                            | SkillSpector | Inspect      | Risk Explicit                     | Risk Implicit |
| ----------------------------------------------------- | ------------ | ------------ | --------------------------------- | ------------- |
| Malicious code / dangerous function patterns          | ✓            | ✗            | ✓ (embedded scripts in artifacts) | ✗             |
| Dependency CVEs / supply chain                        | ✓            | ✗            | ✗                                 | ✗             |
| Text-level Explicit Risks (incl. encoded obfuscation) | Partial      | ✗            | ✓                                 | ✗             |
| Logic design defects                                  | ✗            | ✓            | ✗                                 | ✗             |
| Cross-Artifact Consistency                            | ✗            | ✓            | ✗                                 | Indirect      |
| Runtime attack validation                             | ✗            | ✗            | ✗                                 | ✓             |
| Root-cause localization to Logic Artifact             | ✗            | ✓            | ✓                                 | ✓             |
| Quantitative risk rating                              | ✓ (0–100)    | ✓ (P0/P1/P2) | ✓ (S-level)                       | ✓             |

---

<a id="8-coordination-recommendations"></a>

## 8. Coordination Recommendations

1. **Externally sourced Skills** → gate with SkillSpector first. Dependency CVEs, supply chain, and malicious code are its core strengths, and SanityOps does not cover them.
2. **Internally developed Logic Artifacts** → run the SanityOps pipeline: Inspect → Risk Explicit → operate the Agent to collect runtime data → Risk Implicit.
3. **When both are in use**, SkillSpector's findings can serve as supplementary input to Inspect / Risk Explicit, while the SanityOps side supplies the Cross-Artifact Consistency and runtime validation that SkillSpector lacks.
4. SkillSpector's position in the SanityOps ecosystem mirrors Promptfoo's position relative to Risk Implicit: a **cooperable, dedicated external tool** each independently usable on its own.
