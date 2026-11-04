---
title: Test Cases
description: "Three complete example agents — System Prompt, Skills, and Tool Schemas — used as inspection inputs across the samples."
---

# Test Cases

Three complete agents, each packaged as a single bundle file: the System Prompt, its Skills (`SKILL.md`), and its Tool Schemas. They are **inputs, not results** — the same case can be inspected by the lite skill, the CLI, or the platform, under any rule version.

Each bundle is a **Fixed Artifacts** snapshot: the post-remediation version of an agent whose original defects had already been repaired. That is why the cases themselves no longer carry blocking defects — what differs between tools is *what they find on a clean artifact*, not whether the artifact is broken.

| Case | Domain | Artifacts | Notes |
|---|---|---|---|
| [Energy Management Assistant](./energy-management-assistant.md) | Energy | 1 Prompt · 3 Skills · 6 Tools | Read-only over a local dataset; AC-L2 prompt, OR-L1 skills/tools |
| [Freight Logistics Assistant](./freight-logistics-assistant.md) | Freight logistics | 1 Prompt · 3 Skills · 9 Tools | Read-only over a local dataset; AC-L2 prompt, OR-L1 skills/tools |
| [Medication Information Assistant](./medication-information-assistant.md) | Healthcare | 1 Prompt · 1 Skill · 5 Tools | Read-only over a local dataset; AC-L2 prompt, OR-L1 skills/tools |

## How to use a case

- **With the lite skill** — hand the whole bundle to `sanityops-inspect-lite`; it segments the file into a Prompt, Skills, and Tool Schemas itself, and reports per rule ID.
- **With the CLI** — split the bundle into loadable per-type files first (System Prompt → `prompt.md`, each `SKILL.md`, each tool `parameters` schema), then run `sanityops-cli` at the desired check level.
- **As a reference** — the bundles show how a Prompt, its Skills, and its Tool Schemas reference each other (tool names, parameter names, return fields), which is exactly what the cross-artifact checks operate on.

Results produced from these cases are under [Results](../results/).
