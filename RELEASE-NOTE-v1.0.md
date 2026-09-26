# SanityOps Framework v1.0

**Release Date**: July 2026  
**Version**: v1.0  
**License**: CC BY-SA 4.0

---

## What's New

### Framework Core
- Complete governance framework for AI Agent Logic Artifacts
- Unified terminology and evidence standards
- Gate-based release workflow

### Specification Documents (10)
| Module | Documents |
|--------|-----------|
| Inspect | Prompt, Skill, Tool, Cross-Artifact defect inspection |
| Risk | Explicit risk audit, Implicit attack validation |
| Quality | Tool-Agent reliability, RAG-Agent assessment |
| Relevance | Defect-to-risk/quality diagnostic mapping |

### Open Source Tooling
- **Defect Inspector CLI** — Static defect inspection for Logic Artifacts

---

## Distribution

The Framework and the CLI are versioned independently — only the Framework carries the v1.0 label.

| What | Where |
|------|-------|
| Framework specification | [GitHub repository](https://github.com/sanityops-org/sanityops-framework) — CC BY-SA 4.0 |
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

See [Try the Tools](/framework/try-the-tools) for install options, configuration, and check levels.

---

## Documentation

- [Full Documentation](https://github.com/sanityops-org/sanityops-framework)
- [Website](https://www.sanityops.org)
- [Discussions](https://github.com/sanityops-org/sanityops-framework/discussions)

---

## Known Issues

None.

---

## Breaking Changes

None (initial release).

---

*SanityOps Framework v1.0 — July 2026*
