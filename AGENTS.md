# AGENTS.md — Guide for AI Agents Working in This Repository

This file tells AI/automation agents how the SanityOps documentation is organized, where normative authority lives, and how edits must respect the document hierarchy.

It is a **map of relationships and authority**, not a restatement of any specification. When this guide conflicts with a normative document, the normative document wins; please report the mismatch instead of silently following this file.

Last updated: 2026-10-07 · Framework v1.0

---

## 1. What This Repository Is

- A **pure documentation repository** (VitePress site + GitHub `README.md`). There is no executable framework source here.
- The SanityOps Framework is an open specification (CC BY-SA 4.0) for AI Agent continuous governance, built on Logic Artifact defect inspection.
- The implementing CLI lives in a **separate repository**: `sanityops-org/sanityops-cli` (Apache 2.0). Do not look for tool source code here.
- "Logic Artifacts" covered by v1.0 are strictly three types: **System Prompt, Skill, Tool Schema** (plus Permission as a cross-cutting inspection aspect).

---

## 2. Four-Layer Document Hierarchy

```
L0  framework/core.md            Normative foundation (common semantics)
L1  inspect/* risk/* quality/*   Domain authorities (9 sub-specifications)
L2  framework/relevance.md       Cross-domain mapping (consumes L1, never overrides it)
L3  Everything else              Derived / explanatory / non-normative
```

### L0 — Foundation: `framework/core.md`

The single framework-level normative baseline. It defines the **common semantic layer** that every other document depends on:

- Terminology (Appendix A glossary), object model, formal names and aliases
- Grading models: `AC-L`, `OR-L`, `BI-L`, `CH-L`, `P0/P1/P2`, `S0–S3`, `A/B/C/D`
- Numbering namespaces, Finding/Evidence model, Gate independence and release summary rules
- Versioning, Baseline, exceptions, and cross-subset conflict resolution

Core does **not** create, delete, or modify any domain rule (`QD`/`EX`/`AS`/`FM`), scoring, threshold, or domain Gate (see core.md §0.3).

**Precedence (core.md §0.5, §6.6):**
- Domain-specific rules, scoring, thresholds, defect definitions, Gates → the owning L1 sub-specification governs.
- Terminology, object identification, version evidence, status expression, cross-subset conclusion boundaries → Core governs.

### L1 — Domain Authorities (9 normative sub-specifications)

Each owns a unique numbering namespace and is the **sole definition site** for its rules. Rules must be edited only in their owning document.

| File | Namespace | Answers |
|---|---|---|
| `inspect/prompt.md` | `QD-P-*` | Is the System Prompt free of static defects? |
| `inspect/skill.md` | `QD-S-*` | Is the Skill definition free of static defects? |
| `inspect/tool.md` | `QD-T-*` | Is the Tool Schema free of static defects? |
| `inspect/cross.md` | `QD-PS-*`, `QD-PT-*`, `QD-ST-*` | Are Prompt–Skill–Tool contracts mutually consistent? |
| `inspect/permission.md` | `QD-PM-*` | Are declared authorities proportionate to assigned responsibilities? |
| `risk/explicit.md` | `EX-*` (`NL-A/B`, `NR-O/S`), `D1–D3`, `S0–S3` | Does artifact text explicitly express dangerous content/configuration? |
| `risk/implicit.md` | `A/B/C/D` termination statuses | Can defects be exploited at runtime (shadow sandbox validation)? |
| `quality/rag-agent.md` | 4 dimensions / 12 metrics, three-layer Gates | Does RAG-Agent output meet the quality bar? |
| `quality/tool-agent.md` | Reliability metric, Ratchet Mechanism | Does the Tool-Agent complete tasks reliably? |

**The Inspect, Risk, and Quality subsets have no authority over one another.** Their Gates are independent and their conclusions are non-substitutable (core.md §1.4, §6.1):

```
Inspect PASS ≠ Security PASS ≠ Quality PASS
Risk not reproduced ≠ no static defect
Quality FAIL ≠ a specific QD is the proven sole root cause
```

### L2 — Cross-Domain Mapping: `framework/relevance.md`

Maps Inspect defects (`QD`) to candidate Attack Surfaces (`AS-*`), Failure Modes (`FM-*`), security/quality defect chains (`SC-*`, `QC-TA-*`, `QC-RA-*`), and validation/regression recommendations.

It explicitly subordinates itself to all nine L1 documents (relevance.md §0.3.1): on numbering, definitions, severity, or release requirements, **the source sub-specification takes precedence**. Its output is *candidate association only* — "correlation is not causation" — and must never alter a source conclusion.

### L3 — Derived / Non-Normative Documents

These explain, navigate, or exemplify. They **must never define or redefine rules**:

- `framework/overview.md` and `README.md` — narrative whitepaper; near-mirrors of each other; terms defer to Core Appendix A.
- `framework/FAQ.md` — Q&A digest; every answer cites its normative source.
- `framework/try-the-tools.md` — tool access/installation guide (CLI vs SaaS).
- All `index.md` files — navigation hubs only.
- `compare/*` — ecosystem positioning; `sanityops-positioning.md` is the overview, the other four files (FDE, Harness, Promptfoo, RAGAS, SkillSpector) are topic branches.
- `samples/artifacts/*.md` (3 agents) and `samples/report/*.pdf` (8 reports) — **instance outputs** (analogous to `F-*` Finding instances in core.md §3.3), not rule definitions.
- `samples/inspect-skill-artifacts-samples/*` — instance outputs of the lite inspector: combined source-logic-artifact + inspection-report records for external agents; non-normative.
- `inspect-skill/*` — the `sanityops-inspect-lite` inspector deliverable (SKILL.md, a non-normative `README.md` auxiliary guide, and condensed `references/` checklists). It is a **condensed extraction** of the nine L1 sub-specifications and `relevance.md`, defines no new rules, and never overrides its sources; `inspect-skill/_process/**` is a non-published workspace.
- `community/*`, `legal/*` — independent of the specification system; never cite them as normative basis.

---

## 3. Execution / Dependency Order

Authority dependencies inside Inspect are strictly ordered (`inspect/permission.md` §0.1.5, Gate-0 precondition):

```
QD-P / QD-S / QD-T (single artifacts, fix all P0)
        ↓
QD-PS / QD-PT / QD-ST (Cross, fix all P0)
        ↓
Gate-0 pre-check
        ↓
QD-PM (Permission; must run last, never in parallel)
        ↓
Risk Explicit → Risk Implicit
        ↓
Quality (RAG-Agent and/or Tool-Agent; final release gate)
```

Relevance bridges the stages after Inspect produces defects. Every stage re-runs when Logic Artifact versions change; the Ratchet Mechanism binds scores to versions to prevent regression.

---

## 4. Arbitration Rules for Overlap Zones

1. **`QD-S-5.x` vs `QD-PM-*`**: `QD-S-5` covers permission-statement defects *inside one Skill*; `QD-PM` covers responsibility–authority proportionality *across the whole Agent*. Different domains.
2. **Missing boundary (`QD`) vs dangerous expression (`EX`)**: incomplete/ambiguous boundaries belong to Inspect; an `EX` hit requires an explicit dangerous expression that meets the Risk Explicit definition. No automatic inference either direction (relevance.md §2.3.1 lists three prohibited equations).
3. **Explicit vs Implicit**: statically readable danger → Explicit; vulnerabilities observable only at runtime → Implicit. Implicit outcomes `B` (blocked externally) or `C` (model refused) **must not close** the underlying static defect.
4. **Permission PASS scope**: it validates only what is *declared in the artifacts*. It says nothing about actual IAM/IdP configuration, PEP/PDP enforcement, or runtime monitoring (permission.md §0.1.4).
5. **Quality failures are not root-cause proof**: a failed quality test yields candidate investigation directions (`FM`, reverse diagnostics); root cause may instead lie in retrieval, knowledge, model, runtime, or test assets.

Known documentation gap: `inspect/skill.md` Part 10 ("Relationship to Other Sub-Specifications") is still a placeholder. Do not fabricate its intended content.

---

## 5. Editing Rules for Agents

- **Add or change a defect/risk/quality rule** → edit only the owning L1 file and its namespace; then check cross-references in `relevance.md` appendices, `core.md` §3.2 namespace table, and `FAQ.md` source citations.
- **Change a term, level code, or cross-subset conclusion wording** → `framework/core.md` is the authority; update dependent documents consistently.
- **Never** introduce new rules, thresholds, or numbering in L3 files (overview, README, FAQ, index, compare, samples).
- **Never** convert Relevance's candidate associations into definitive causal statements.
- **Never** delete a `QD` Finding based on a Risk Implicit `B`/`C` result or an external control interception.
- Preserve document conventions: front matter (`title`/`description`), version block (v1.0, September 2026), normative keywords per RFC-style usage defined in core.md §0.4.
- This is a VitePress site: every root-level `.md` can become a public route. Keep content suitable for publication; legal texts under `legal/` must not be substantively edited without owner review.
- Samples in `samples/artifacts/` are versioned post-remediation records ("Fixed Artifacts"); do not silently align them to new rule versions — their metadata reflects specific inspection rounds.

---

## 6. Suggested Reading Order

1. `framework/overview.md` — big picture
2. `framework/core.md` — common semantics (reference as needed)
3. `inspect/` prompt → skill → tool → cross → permission
4. `risk/explicit.md` → `risk/implicit.md`
5. `quality/rag-agent.md` and/or `quality/tool-agent.md`
6. `framework/relevance.md` — how the stages connect
7. `framework/FAQ.md` — curated Q&A with source pointers
8. `samples/` — concrete artifacts and PDF reports
