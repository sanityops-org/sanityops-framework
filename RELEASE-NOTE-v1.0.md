# SanityOps Framework v1.0

**Release Date**: October 2026  
**Release Tag**: `v1.0.0`  
**License**: CC BY-SA 4.0 (Framework specification) · Apache 2.0 (Inspect CLI)

> The first public release of SanityOps — a vendor-neutral framework for the continuous governance of AI Agent logic artifacts, covering Inspect, Risk, Quality, and Relevance end to end.

---

## Versioning

- **`v1.0.0`** is the SemVer tag for this release; **"v1.0"** is the product name. They refer to the same artifact.
- The Framework specification and the Inspector CLI are **versioned independently**. Only the Framework carries the `v1.0.0` label here; the CLI follows its own version line in [`sanityops-org/sanityops-cli`](https://github.com/sanityops-org/sanityops-cli).

---

## Highlights

- **A complete methodology** — from defect inspection of logical artifacts (Prompt / Skill / Tool Schema / Permission), through explicit and implicit risk auditing, to RAG-Agent and Tool-Agent quality evaluation, linked by defect-to-risk/quality relevance mapping.
- **Open-source Inspect CLI** — static defect inspection for logical artifacts, runnable locally or in CI/CD.
- **Enterprise governance loop** — near-real-time Git synchronization and production-equivalent shadow sandboxes, with a Baseline + Gate ratchet mechanism for release decisions.

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

### Sample Assets

- **Sample agents** — System Prompts, Skills, and Tool Schemas for three example agents (energy management, freight logistics, medication information) under [`samples/artifacts/`](samples/artifacts/).
- **Sample audit reports** — formal PDF reports for the "Voyager" sample agent, spanning Inspect, Risk (Explicit & Implicit), and Quality, under [`public/samples/report/`](public/samples/report/).

---

## Compatibility

| Component | Version | License | Availability |
|-----------|---------|---------|--------------|
| Framework specification | `v1.0.0` (this release) | CC BY-SA 4.0 | This repository |
| Inspector CLI | independent version line | Apache 2.0 | `pip install sanityops-cli` · [`sanityops-cli`](https://github.com/sanityops-org/sanityops-cli) |
| Risk Scanner & Quality Evaluator | commercial line | commercial | SaaS / self-hosted |

The full commercial suite (Defect Inspector, Risk Scanner, Quality Evaluator) is offered as **SaaS / self-hosted**. The open-source Inspector CLI supports check levels L1/L2/L3.

---

## Terminology & Rules

- All terms (logical artifact, ratchet mechanism, shadow sandbox, explicit/implicit risk, Gate, Baseline, Harness, etc.) are standardized against the **Core Appendix A terminology glossary**.
- Defect categories, grading rules, and Gate decision criteria are defined in their respective specification documents.
- A future change to terminology definitions, grading semantics, or Gate criteria that changes the meaning of historical reports will be released as a **MAJOR** version with an explicit old↔new mapping.

---

## Distribution

| What | Where |
|------|-------|
| Framework specification | [sanityops-org/sanityops-framework](https://github.com/sanityops-org/sanityops-framework) — CC BY-SA 4.0 |
| Defect Inspector CLI | `pip install sanityops-cli`, or the [install scripts](https://github.com/sanityops-org/sanityops-cli#installation) for macOS, Linux, and Windows |
| CLI source and releases | [sanityops-org/sanityops-cli](https://github.com/sanityops-org/sanityops-cli) — Apache 2.0 |

---

## Quick Start

```bash
# Install via PyPI
pip install sanityops-cli

# Create .sanityops/inspect_config.yaml and list your artifacts
sanityops-cli init

# Run inspection — requires an LLM API key of your own
sanityops-cli inspect
```

See [Try the Tools](framework/try-the-tools.md) for install options, configuration, and check levels.

---

## Migration

This is the initial public release; there is no prior version to migrate from.

- Start from the guided reading path: [Framework Home](framework/index.md).
- The project follows Semantic Versioning. Breaking changes will be reserved for MAJOR releases and documented with migration steps.

---

## Verification

- **Framework specification** — archived under the `v1.0.0` tag; the specification text is immutable for this release.
- **Inspector CLI** — verify the install with `sanityops-cli --version`, then run `sanityops-cli inspect` against your own artifacts.
- **Sample reports** — review the reproducible PDF audit reports under [`public/samples/report/`](public/samples/report/).

---

## Known Limitations

- The Inspector CLI requires your own LLM API key; inference cost is not included.
- Risk scanning and quality evaluation (Risk Scanner, Quality Evaluator) are commercial and not part of the open-source CLI.
- The live demo at `demo.sanityops.org` is invite-only due to LLM inference costs.
- This release covers the Inspect / Risk / Quality / Relevance scope above; A2A service-contract inspection and derivative-model (DMC) evaluation are planned for v1.1.

---

## Breaking Changes

None (initial release).

---

## Documentation & Links

- [Full Documentation](https://github.com/sanityops-org/sanityops-framework)
- [Website](https://www.sanityops.org)
- [Discussions](https://github.com/sanityops-org/sanityops-framework/discussions)
- [Report an issue](https://github.com/sanityops-org/sanityops-framework/issues)

---

*SanityOps Framework v1.0 — October 2026*
