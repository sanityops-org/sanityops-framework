---
title: Try the Tools
description: "Hands-on guide to the SanityOps tools, Defect Inspector and Risk Scanner, with CLI install and quick-start instructions."
---

# Try the Tools

---

> The SanityOps governance **specification is fully open source**; the openness of the implementation tools varies by subset. The table below makes this distinction clear at a glance.

## Openness Overview

| Core Subset | Spec License | Tool License / Delivery                               | Audience                                |
| ----------- | ------------ | ----------------------------------------------------- | --------------------------------------- |
| **Inspect** | CC BY-SA 4.0 | **Apache 2.0** (open-source CLI) + SaaS / self-hosted | Everyone                                |
| **Risk**    | CC BY-SA 4.0 | **Risk Explicit**: Apache 2.0 (open-source CLI); **Risk Implicit**: closed-source SaaS / self-hosted (code-reviewable) | Explicit: everyone; Implicit: paying enterprise customers (under NDA) |
| **Quality** | CC BY-SA 4.0 | Closed-source SaaS / self-hosted (code-reviewable)    | Paying enterprise customers (under NDA) |

> The specification is always open — anyone can inspect, study, and independently implement the methodology behind all three subsets. Tool openness differs: **Inspect** and **Risk Explicit** tooling is open source; **Risk Implicit** and **Quality** are offered as SaaS for trial, with enterprise customers granted code-review access under a self-hosted deployment.

---

## Inspect — Open-Source Tooling, Free for Everyone

Defect Inspector is fully open source, allowing the community to freely use, audit, modify, and build upon it.

- **GitHub Repository**: [sanityops-cli](https://github.com/sanityops-org/sanityops-cli) — Apache 2.0

- **Use Case**: Static defect inspection of **Logic Artifacts** (System Prompt / Skill / Tool Schema), their cross-artifact relationships, and Permission — plus **Risk Explicit** checks, suitable for local development or CI/CD integration.

- **Note**: The open-source CLI covers two things: the full Inspect inspection (including Permission) and Risk Explicit; and CI/CD integration — it can act as a client of the SanityOps Platform. The remaining capabilities (e.g., Risk Implicit, Quality evaluation, and the version-level evidence chain) are delivered on the Platform.

> **Quick try without the CLI**: [sanityops-inspect-lite](https://github.com/sanityops-org/sanityops-inspect-lite) is a detect-only, report-only skill applied by your host model — no CLI, no scripts, no network call. It covers a condensed subset of Inspect (single-artifact checks, Cross-Artifact contracts, and Permission quick mode) plus a lite Risk Explicit scan; it does not run Risk Implicit or runtime Quality, and it never repairs artifacts — for the complete Inspect ruleset and Risk Explicit, use the CLI below; remediation and the remaining capabilities are delivered on the Platform.
>
> **How to use it**: in Claude Code, add the marketplace and install the plugin —
> `/plugin marketplace add sanityops-org/sanityops-inspect-lite` then `/plugin install sanityops-inspect-lite@sanityops`.
> For any other agent, `git clone` the repository and load **both** skills from `plugins/sanityops-inspect-lite/skills/` — `pre-inspect-extract/` (extraction layer) and `sanityops-inspect-lite/` (seven-stage inspector) — as skills, or paste `SKILL.md` and the reference checklists in as instructions. Then provide the artifacts to inspect, their tier declarations, and a version label; the skill runs its seven-stage flow and emits the report.

### Install

**Requirements**: Python ≥ 3.11, and an LLM API key of your own (see Step 2 below — the inspection model runs on your credentials).

```
# macOS / Linux — install script
curl -fsSL https://downloads.sanityops.org/sanityops-cli/install.sh | bash

# Windows — PowerShell
irm https://downloads.sanityops.org/sanityops-cli/install.ps1 | iex

# Or via PyPI
pip install sanityops-cli

# Or from source
git clone https://github.com/sanityops-org/sanityops-cli.git
cd sanityops-cli
pip install -e .
```

Both install scripts verify the downloaded binary against `checksums.txt` before installing. If you would rather read the PowerShell script before running it:

```powershell
irm https://downloads.sanityops.org/sanityops-cli/install.ps1 -OutFile install.ps1
Get-Content .\install.ps1
.\install.ps1
```

### Quick Start

**1. Create the configuration**

```bash
sanityops-cli init
```

This writes `.sanityops/inspect_config.yaml` into the current directory, along with a `.sanityops/.gitignore` so credentials stay out of version control.

**2. Configure your artifacts and model**

Edit the generated file — point it at your artifacts and supply the LLM credentials that run the inspection:

```yaml
project:
  id: "00000000-0000-0000-0000-000000000000"   # placeholder; replaced automatically on first upload
  name: ""

model:                                          # optional — remove to use LLM_* env vars instead
  provider: anthropic                           # anthropic, openai, azure, etc.
  api_key: ""                                   # Required: keep this file out of git
  model_id: claude-sonnet-4-20250514
  base_url: ""                                  # optional: custom endpoint

prompts:
  - file: prompts/system_prompt.md

tools:
  - file: tools/search_tools.json

skills:
  - file: skills/code_review.md                 # file only, not directories
```

Artifact entries accept any plaintext format (`.md`, `.json`, `.py`, `.ts`, ...). To configure credentials through the environment instead of the file, drop the `model:` section and set `LLM_PROVIDER`, `LLM_API_KEY`, `LLM_MODEL_ID`, and `LLM_BASE_URL`.

**3. Run the inspection**

```bash
sanityops-cli inspect                       # standard depth (L2)
sanityops-cli inspect --check-level L1      # fast
sanityops-cli inspect --check-level L3      # deep
```

| Level | Description | Use Case |
| --- | --- | --- |
| L1 | Fast | Quick validation during development |
| L2 | Standard | Default, balanced depth for regular use |
| L3 | Deep | Comprehensive analysis for production releases |

Add `--skip-defect-check` to scan and upload artifacts without running the defect analysis, `--config <path>` to use a config file elsewhere, and `--model` / `--provider` to override the model for one run.

### Two Ways to Run the CLI

| Mode | What you need | What happens |
| --- | --- | --- |
| **Local only** | An LLM API key in `model.api_key` | Inspect (including Permission) and Risk Explicit run entirely on your machine. No account and no upload required. |
| **As a Platform client** | An LLM API key in `model.api_key` + a Platform API key in `server.api_key` | Checks still run locally; your Logic Artifacts are synchronized to a Platform project as a new version, where the remaining capabilities are delivered. |

Both modes require your own LLM API key — connecting to the Platform only adds artifact synchronization; the model is never run by the Platform.

To connect the CLI to the Platform, take an API key from **Personal → API Keys** and store it:

```bash
sanityops-cli config server.api_key        # masked prompt
sanityops-cli config --list                # verify
```

A project is created automatically on the first upload, and its id is written back into your config file. If no Platform API key is set, the upload step is skipped silently and the CLI stays fully local. `SANITYOPS_API_KEY` and `SANITYOPS_BASE_URL` environment variables override the stored values.

### CI/CD Integration

1. Commit `.sanityops/inspect_config.yaml` to the repository — the generated `.sanityops/.gitignore` already prevents secrets from being committed.
2. Inject the LLM credentials as pipeline secrets via the `LLM_*` environment variables described above.
3. Run the inspection as a step:

```bash
sanityops-cli inspect
```

---

## Risk & Quality — Try the Demo, or Deploy for Your Enterprise

The Risk Scanner's implicit-validation capability and the Quality Evaluator are delivered as SaaS and self-hosted deployments. Their methodology is fully open source; their tool implementation is not currently released as public source code. Risk Explicit is also available in the open-source CLI.

- **Live Demo**: https://demo.sanityops.org/
  - The demo platform is currently in an early access phase. Because core detection features rely on third-party LLM API calls, access is invite-only to keep service quality high and inference cost manageable.
  - **How to request access**: Open the demo and click **Register**. A code is required to complete registration — click **Get Code** on the registration form and the dialog shows the address to write to. Send your request from the email address you register with to `hello@sanityops.org`, describing your use case, and we will send you an invite code.
  - **Usage quota**: The CLI's local mode is unmetered — it runs on your own model credentials. For the hosted platform there is no fixed public per-day limit; quota is confirmed together with your invite code.
- **Enterprise Self-Hosted Deployment**:
  - Full-stack self-hosted deployment (detection engine, database, dashboards) within your enterprise VPC;
  - **Decoupled model layer**: bring your own LLM, including locally hosted models, with no dependency on external APIs;
  - **Code-reviewable access (under NDA)**: contracted enterprise customers may obtain source-code review access under NDA to independently verify how governance logic is implemented — consistent with the transparency principle behind open-sourcing our Framework: **governance tooling should be transparent, not a black box.**
- **Contact Sales**: `hello@sanityops.org`

---

## Why Are Inspect, Risk, and Quality Unified into the SanityOps Platform?

The Inspect ruleset and CLI are open source — you can use them independently for static defect and explicit-risk checking. Risk Implicit and Quality can likewise be adopted as standalone capabilities. The methodology behind all three is fully decoupled: **you can use just one, or combine them freely.**

Within the SanityOps Platform, however, we integrate all three into a unified system, for the following reasons:

- **Correlated Root-Cause Analysis**: Defects surfaced by Inspect are mapped against Risk's attack-surface findings and Quality's failure-mode patterns, enabling rapid root-cause localization behind output anomalies or risk incidents;
- **Logical Artifact Version Management**: Every artifact iteration (e.g., `Agent_RAG_v3.2.1 → v3.2.2`) has its defect inspection, risk audit, and quality evaluation results consolidated into a traceable, auditable evidence chain;
- **Analytics Dashboards & Reporting**: Searchable, exportable dashboards and compliance reports support cross-version trend comparisons of governance posture.

> In short: **the open-source tools give you point-in-time detection capability; the Platform gives you correlated root-cause analysis, version traceability, and a continuous governance loop.** Each subset works independently — the Platform's value lies in organizing them into a persistent and auditable governance system, rather than simply bundling features together.

---

## Quick Start

| What do you want to do?                                  | Recommended path                                                                                               |
| -------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| Run static defect checks and integrate it yourself       | Download the [open-source Inspect tool](https://github.com/sanityops-org/sanityops-cli)          |
| Connect your CLI runs to the Platform                    | Take an API key from **Personal → API Keys**, then `sanityops-cli config server.api_key`                        |
| Experience the full governance loop                      | Request an invite code and try the [live demo](https://demo.sanityops.org/)                                     |
| Deploy independently, with custom models and code review | Contact `hello@sanityops.org` to discuss self-hosted deployment                                                |
| Learn the methodology and implement it yourself          | Read the [open-source Framework specification](https://github.com/sanityops-org/sanityops-framework/tree/main) |
