# SanityOps Framework

# Knowledge Router

---

**License**: CC BY 4.0

---

## Table of Contents

- [1. Framework Overview](#1-framework-overview)
- [2. Document Index](#2-document-index)
- [3. Query Routing Rules](#3-query-routing-rules)
  - [3.1 Routing by Question Type](#31-routing-by-question-type)
  - [3.2 Routing by Numbering Prefix](#32-routing-by-numbering-prefix)
- [4. Level/Threshold Quick Reference](#4-levelthreshold-quick-reference)
- [5. Cross-Document Workflows](#5-cross-document-workflows)
  - [5.1 Complete Audit Workflow](#51-complete-audit-workflow)
  - [5.2 Defect Remediation Closed Loop](#52-defect-remediation-closed-loop)
- [6. Important Constraints (LLM Must Read)](#6-important-constraints-llm-must-read)

---

> LLM navigation entry. Route to target documents based on question type, then load original chapters as needed.
> This file serves for routing only and does not replace original content.

---

## 1. Framework Overview

```
SanityOps Six-Subset Framework
│
├─ Inspect (Defect Inspection) ── Static review of logic artifact quality defects
│   ├─ Inspect Tool v1.0      QD-T-*    Tool Schema defects
│   ├─ Inspect Prompt v1.0    QD-P-*    System Prompt defects
│   ├─ Inspect Skill v1.0     QD-S-*    Skill definition defects
│   └─ Inspect Cross v1.0     QD-PS/PT/ST-*   Cross-artifact relationship defects
│
├─ Risk (Risk Scanning) ── Static explicit risk + dynamic attack validation
│   ├─ Risk Explicit v1.0     EX-*      Explicit risk audit (32 subcategories + S0-S3)
│   └─ Risk Implicit v1.0     A/B/C/D   Implicit risk validation (shadow environment dynamic attacks)
│
├─ Quality (Service Quality) ── Agent actual runtime quality assessment
│   ├─ Quality Tool-Agent v1.0    Reliability (binary determination + ratchet mechanism)
│   └─ Quality RAG-Agent v1.0    Four-dimensional 12-metric model (continuous scoring)
│
├─ Relevance v1.0 ── Central mapping (QD→security impact/quality impact + defect chains)
├─ Core v1.0 ── Basic concepts (terminology/object model/evidence/Gate/maturity)
└─ Overview v1.0 ── High-level overview (background/positioning/lifecycle/implementation path)
```

---

## 2. Document Index

| # | File | Role | Core Keywords | When to Consult |
|---|------|------|---------------|-----------------|
| 1 | `Core_v1.0.md` | Basic specification | finding_id, artifact_type, evidence, PASS/FAIL/ERROR, ML1-ML5, P0/P1/P2 | When understanding terminology definitions, Gate decision rules, or object models |
| 2 | `Overview_v1.0.md` | High-level overview | Six-subset framework, lifecycle closed loop, implementation path, evidence chain | First-time framework understanding, external introduction, positioning subset relationships |
| 3 | `Inspect Tool v1.0.md` | Tool Schema inspection | QD-T-1~5, structural validity, parameter constraints, high-risk operations, RS | Reviewing Tool definition quality, Schema validity, parameter risks |
| 4 | `Inspect Prompt_v1.0.md` | System Prompt inspection | QD-P-1 (logic defects), QD-P-2 (explicit defects), contradictions/ambiguities/constraints | Reviewing System Prompt quality, instruction consistency checks |
| 5 | `Inspect Skill_v1.0.md` | Skill inspection | QD-S-1~5, Review Schema (6 dimensions), resource runaway, permission overflow | Reviewing Skill definition completeness, boundary constraints, failure handling |
| 6 | `Inspect Cross_v1.0.md` | Cross-artifact inspection | QD-PS, QD-PT, QD-ST, Prompt-Skill-Tool relationship consistency | Checking multi-artifact reference validity, declaration consistency, authorization chains |
| 7 | `Risk Explicit_v1.0.md` | Explicit risk audit | EX, NL-A/B, NR-O/S, D1/D2/D3, S0-S3, 32 subcategories | Auditing explicit dangerous expressions in backend logic, risk level determination |
| 8 | `Risk Implicit_v1.0.md` | Implicit risk validation | A/B/C/D, Signal, shadow environment, artifact-driven attacks, OWASP | Dynamic attack testing, validating runtime vulnerability exploitability |
| 9 | `Quality Tool-Agent_v1.0.md` | Tool-Agent quality assessment | Reliability, binary nature, L1/L2/L3 (test strictness), ratchet mechanism | Assessing Tool-Agent task success rates, release gate decisions |
| 10 | `Quality RAG-Agent_v1.0.md` | RAG-Agent assessment | Four-dimensional 12-metric model, correctness/fidelity/completeness, baseline test cases | Assessing RAG-Agent output quality, knowledge accuracy |
| 11 | `Relevance_v1.0.md` | Central mapping | AS-01~09, FM-01~10, SC/QCTA/QCRA defect chains, mapping strength | Deriving security/quality impacts from QD defects, linkage validation recommendations |

---

## 3. Query Routing Rules

### 3.1 Routing by Question Type

| User Question Type | → Target Document | → Key Chapters |
|--------------------|-------------------|----------------|
| "What defects does this Tool Schema have?" | Inspect Tool v1.0 | Corresponding QD-T category + quantitative scoring |
| "Is there a problem with this System Prompt?" | Inspect Prompt v1.0 | QD-P-1 (logic) / QD-P-2 (explicit) |
| "Is this Skill definition complete?" | Inspect Skill v1.0 | QD-S-1~5 + Review Schema |
| "Do the Prompt and Tool references match?" | Inspect Cross v1.0 | QD-PT chapters |
| "Are there explicit security risks here? How severe?" | Risk Explicit v1.0 | Corresponding EX subcategory + Part 4 S0-S3 |
| "Can this Agent be attacked?" | Risk Implicit v1.0 | Chapter 4 A/B/C/D + Chapter 6 Signal |
| "Is the Agent running stably? What's the success rate?" | Quality Tool-Agent v1.0 | Reliability formula + Chapter 4 assessment workflow |
| "How to assess RAG answer quality?" | Quality RAG-Agent v1.0 | Chapter 3 Four-dimensional 12-metric model |
| "What security issues could this defect cause?" | Relevance v1.0 | Chapter 2 Security impact mapping + Appendix A |
| "What Agent functionality could this defect affect?" | Relevance v1.0 | Chapter 3 Quality impact mapping + Appendix B/C |
| "What risks do multiple defects combined pose?" | Relevance v1.0 | Appendix D Defect chains |
| "What is finding_id? How does Gate determine?" | Core_v1.0 | Chapter 5 Finding model + Chapter 6 Gate |
| "What is SanityOps overall?" | Overview_v1.0 | Full text |

### 3.2 Routing by Numbering Prefix

| Prefix | Meaning | Source Document |
|--------|---------|-----------------|
| `QD-T-*` | Tool Schema quality defects | Inspect Tool v1.0 |
| `QD-P-*` | System Prompt quality defects | Inspect Prompt v1.0 |
| `QD-S-*` | Skill quality defects | Inspect Skill v1.0 |
| `QD-PS-*` | Prompt-Skill relationship defects | Inspect Cross v1.0 |
| `QD-PT-*` | Prompt-Tool relationship defects | Inspect Cross v1.0 |
| `QD-ST-*` | Skill-Tool relationship defects | Inspect Cross v1.0 |
| `EX-*` / `NL-*` / `NR-*` | Explicit risk classification | Risk Explicit v1.0 |
| `AS-01~09` | Attack surface classification | Relevance v1.0 |
| `FM-01~10` | Failure mode classification | Relevance v1.0 |
| `SC-*` / `QC-TA-*` / `QC-RA-*` | Defect chains | Relevance v1.0 |

---

## 4. Level/Threshold Quick Reference

| Item | Level System | Source |
|------|--------------|--------|
| Inspect defect severity | P0 (blocking) / P1 (warning) / P2 (suggestion) | Core, Inspect suite |
| Risk Explicit risk level | S0 (none) / S1 (medium) / S2 (high) / S3 (critical) | Risk Explicit |
| Risk Implicit termination status | A (success) / B (external block) / C (LLM refusal) / D (condition not met) | Risk Implicit |
| Risk Implicit Signal | >=900 excellent / 700-899 good / 500-699 at risk / <500 weak | Risk Implicit |
| Agent risk level | L1 (query) / L2 (state change) / L3 (irreversible) | Various Inspect / Quality |
| Quality Tool-Agent pass rate | L1: 30 times/90% / L2: 50 times/95% / L3: 100 times/100% | Quality Tool-Agent |
| Quality RAG disposition category | answer / clarify / limited_answer / deny / handoff | Quality RAG-Agent |
| Gate decision | PASS / FAIL / ERROR | Core |
| Maturity | ML1-ML5 | Core |
| Mapping strength | Strong / Medium / Conditional / Not applicable | Relevance |

---

## 5. Cross-Document Workflows

### 5.1 Complete Audit Workflow

```
Logic artifact submission
    │
    ▼
Inspect Tool + Prompt + Skill + Cross  ──→ QD defect list
    │
    ▼
Risk Explicit ──→ EX risk report (S0-S3)
    │
    ▼
Risk Implicit ──→ Dynamic attack validation (A/B/C/D + Signal)
    │
    ▼
Quality Tool-Agent / RAG-Agent ──→ Reliability / Quality score
    │
    ▼
Relevance ──→ Defect→impact mapping + remediation recommendations
    │
    ▼
Core ──→ Comprehensive Gate decision (PASS/FAIL) ← Aggregate from all subsets
```

### 5.2 Defect Remediation Closed Loop

```
Defect discovery (Inspect)
    → Relevance maps security/quality impacts
    → Risk Explicit reviews explicit risk → Risk Implicit dynamic validation
    → Post-remediation Quality regression testing
    → Core Gate decision on pass/fail
```

---

## 6. Important Constraints (LLM Must Read)

- **Subset specification priority**: Rules, scoring, and thresholds within each Inspect/Risk/Quality domain take precedence from their respective specifications; Core does not override
- **Association ≠ causation**: Relevance's QD→security/quality mappings are recommendations, not substitutes for actual Risk/Quality validation
- **No automatic inference**: QD defects cannot be automatically equated to EX risk classifications (e.g., QD-P-2.5.2 ≠ automatic NL-A-7)
- **Static ≠ dynamic**: Inspect checks "declaration existence", Risk Implicit validates "actual exploitability"
- **Source priority**: If Relevance conflicts with source subset specifications, the source subset takes precedence
- **Batch isolation**: Full text ~186K tokens, exceeding most LLM windows; must load on demand, no full ingestion

---

© 2026 SanityOps. Licensed under Creative Commons Attribution 4.0 International.
https://www.sanityops.org  ·  hello@sanityops.org
v1.0  ·  July 2026
