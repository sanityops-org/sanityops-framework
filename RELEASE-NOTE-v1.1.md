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
- Six `sanityops-inspect-lite` instance records added under `samples/inspect-skill-artifacts-samples/` (non-normative).

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
| Risk Explicit regraded to `P0/P1/P2` | Re-map any `D1–D3` severity statements to the new grading |
| Inspect item numbering expanded | Re-run Inspect; historical findings keep their original numbering |
| Terminology "Logic Artifacts" | Update custom checklists and internal docs that quote older wording |

There are no breaking changes to the Core object model, terminology glossary, or Gate independence rules.

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

## Documentation & Links

- [Full Documentation](https://github.com/sanityops-org/sanityops-framework)
- [Website](https://www.sanityops.org/)
- [Discussions](https://github.com/sanityops-org/sanityops-framework/discussions)
- [Report an issue](https://github.com/sanityops-org/sanityops-framework/issues)
- [v1.0 release note](RELEASE-NOTE-v1.0.md)

---

_SanityOps Framework v1.1 — October 2026_
