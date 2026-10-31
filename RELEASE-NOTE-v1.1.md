# SanityOps Framework v1.1

**Release Date**: October 2026  
**Release Tag**: `v1.1.0`  
**License**: CC BY-SA 4.0 (Framework specification) · Apache 2.0 (Inspect CLI)

> A specification-consistency release. SanityOps v1.1 aligns every normative document on a single document version, expands Inspect and Permission defect coverage, regrades Risk Explicit to `P0/P1/P2`, and states the multi-hit inspection design principle explicitly.

---

## Versioning

- **`v1.1.0`** is the SemVer tag for this release; **"v1.1"** is the product name. They refer to the same artifact.
- All twelve normative documents now carry `**Version**: v1.1`, so a report citing "Inspect Tool v1.1" resolves to exactly one text.
- The Framework specification and the Inspector CLI are **versioned independently**. Only the Framework carries the `v1.1.0` label here; the CLI follows its own version line in [`sanityops-org/sanityops-cli`](https://github.com/sanityops-org/sanityops-cli).
- `v1.0.0` remains available under its original tag and release note.

---

## What Changed Since v1.0.0

### Inspect

- **Expanded defect coverage** across `inspect/prompt.md`, `inspect/skill.md`, `inspect/tool.md`, `inspect/cross.md`, and `inspect/permission.md`; the Inspect and Relevance specifications were rewritten for the broader rule set.
- **Permission Quick Mode** grown to 17 items with refined selection criteria.
- **Multi-hit design principle** stated in the foreword of all five Inspect sub-specifications: one object may legitimately be hit by several inspection items across dimensions, and same-source deductions are merged at scoring time per each document's own deduplication rules (§4.6, §5.5, §8.5, §9.6/§12.1–§12.2, §11.6 respectively).
- **Stable heading anchors** added so Permission table-of-contents links resolve.

### Risk

- **Risk Explicit regraded to `P0/P1/P2`**, with `risk/explicit.md` reworked and `framework/relevance.md` / `inspect/cross.md` aligned to the new grading.

### Terminology and Presentation

- Terminology normalized to **Logic Artifacts** throughout; the Inspect use case is stated more precisely.
- The obsolete `inspect-skill` landing page was removed; the lite inspector deliverable lives in its own repository.
- Six `sanityops-inspect-lite` instance records added under `samples/inspect-skill-artifacts-samples/` (non-normative). Four remain in this repository: the `anthropics/skills pdf` record was withdrawn for licence reasons (the source artifacts carry a no-derivative / no-distribution licence), and the self-check report is maintained in the `sanityops-inspect-lite` repository only.

---

## What's in This Release

### Framework Core (1 specification)

- Governance model for AI Agent logical artifacts, unified terminology, and Gate-based release workflow.

### Specification Documents (11)

| Module | Documents | Focus |
|--------|-----------|-------|
| **Core** | `core` | Baseline & Gate release workflow |
| **Inspect** | `prompt`, `skill`, `tool`, `cross`, `permission` | Defect and permission-proportionality inspection |
| **Risk** | `explicit`, `implicit` | Explicit artifact risk audit and implicit runtime attack validation |
| **Quality** | `rag-agent`, `tool-agent` | Service-quality evaluation for RAG-Agents and Tool-Agents |
| **Relevance** | `relevance` | Defect → risk/quality diagnostic mapping |

### Open-Source Tooling

- **Defect Inspector CLI** — static defect inspection for logical artifacts. Install via `pip install sanityops-cli`.
- **`sanityops-inspect-lite`** — condensed, detect-only Markdown inspector for agent runtimes. Install as a Claude Code plugin from [`sanityops-org/sanityops-inspect-lite`](https://github.com/sanityops-org/sanityops-inspect-lite).

### Sample Assets

- **Sample agents** — System Prompts, Skills, and Tool Schemas for three example agents (energy management, freight logistics, medication information) under [`samples/artifacts/`](samples/artifacts/).
- **Sample audit reports** — formal PDF reports for the "Voyager" sample agent, spanning Inspect, Risk (Explicit & Implicit), and Quality, under [`public/samples/report/`](public/samples/report/).

---

## Compatibility

| Component | Version | License | Availability |
|-----------|---------|---------|--------------|
| Framework specification | `v1.1.0` (this release) | CC BY-SA 4.0 | This repository |
| Inspector CLI | independent version line | Apache 2.0 | `pip install sanityops-cli` · [`sanityops-cli`](https://github.com/sanityops-org/sanityops-cli) |
| Risk Scanner & Quality Evaluator | commercial line | commercial | SaaS / self-hosted |

Reports produced against v1.0.0 remain valid records of the rules in force at that time; do not restate them under v1.1 without re-inspection.

---

## Migration from v1.0.0

| Change | Action |
|--------|--------|
| Specification documents bumped to v1.1 | Update the rule/standard version recorded in report metadata |
| Risk Explicit regraded to `P0/P1/P2` | Re-map any `S0–S3` severity statements to the new `Explicit·P0/P1/P2` grading; `D1/D2/D3` are retained as traceability-only impact type labels |
| Inspect item numbering expanded | Re-run Inspect; historical findings keep their original numbering |
| Terminology "Logic Artifacts" | Update custom checklists and internal docs that quote older wording |

There are no breaking changes to the Core object model, terminology glossary, or Gate independence rules. However, Risk Explicit grading is **tightened**: the same risk item can change blocking conclusion (for example, complete data/conversation leakage is `S1` under v1.0 but `P0` under v1.1). v1.0 reports MUST NOT be restated under v1.1 terminology without re-inspection.

---

## Verification

- **Framework specification** — archived under the `v1.1.0` tag; the specification text is immutable for this release.
- **Inspector CLI** — verify the install with `sanityops-cli --version`, then run `sanityops-cli inspect` against your own artifacts.
- **Sample reports** — review the reproducible PDF audit reports under [`public/samples/report/`](public/samples/report/).

---

## Known Limitations

- The Inspector CLI requires your own LLM API key; inference cost is not included.
- Risk scanning and quality evaluation (Risk Scanner, Quality Evaluator) are commercial and not part of the open-source CLI.
- The live demo at `demo.sanityops.org` is invite-only due to LLM inference costs.
- A2A service-contract inspection and derivative-model (DMC) evaluation, previously slated for v1.1, are now planned for **v1.2**.

---

## Errata

This section records post-release documentation corrections. The normative specification text under the `v1.1.0` tag is immutable; these corrections apply to the working branch and are binding for readers of this note.

### E-1: Risk Explicit grading is a tightening, not a rename

Under v1.0, `S0–S3` was derived by merging three harm dimensions (`D1/D2/D3`). Under v1.1, `Explicit·P0/P1/P2` is graded directly by worst possible consequence, and `D1/D2/D3` are retained only as traceability labels that do not participate in grading. The quantified score (0–20) and CVSS approximation were removed.

**Consequence**: The same risk item can change blocking conclusion across versions — for example, complete data/conversation leakage is `S1` (medium) under v1.0 but `P0` (block release) under v1.1. Reports produced against v1.0 MUST NOT be restated under v1.1 without re-inspection.

### E-2: Migration table correction

The migration row "Re-map any `D1–D3` severity statements" was corrected to "Re-map any `S0–S3` severity statements". `D1/D2/D3` are not severity levels and are not re-mapped; they remain as impact type labels.

### E-3: Known residual in `framework/core.md`

`framework/core.md` §1.3 still lists `S-levels` in the Risk row of the "Core Problems and Specification Domains" table. This is a normative-body residual that cannot be corrected as an erratum and will be fixed in the next specification version. The correct term is `Explicit·P0/P1/P2`.

### E-4: Known residual in `framework/relevance.md`

A mapping-record example in `framework/relevance.md` still carries `source_standard_version: v1.0` for a `source_standard: Inspect Tool` entry. Inspect Tool is v1.1 in this release, so the example value is stale. This is a normative-body residual that cannot be corrected as an erratum and will be fixed in the next specification version.

---

## Documentation & Links

- [Full Documentation](https://github.com/sanityops-org/sanityops-framework)
- [Website](https://www.sanityops.org/)
- [Discussions](https://github.com/sanityops-org/sanityops-framework/discussions)
- [Report an issue](https://github.com/sanityops-org/sanityops-framework/issues)
- [v1.0 release note](RELEASE-NOTE-v1.0.md)

---

_SanityOps Framework v1.1 — October 2026_
