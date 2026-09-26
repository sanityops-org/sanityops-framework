# Try the Tools

---

> The SanityOps governance **specification is fully open source**; the openness of the implementation tools varies by subset. The table below makes this distinction clear at a glance.

## Openness Overview

| Core Subset | Spec License | Tool License / Delivery                               | Audience                                |
| ----------- | ------------ | ----------------------------------------------------- | --------------------------------------- |
| **Inspect** | CC BY-SA 4.0 | **Apache 2.0** (open-source CLI) + SaaS / self-hosted | Everyone                                |
| **Risk**    | CC BY-SA 4.0 | Closed-source SaaS / self-hosted (code-reviewable)    | Paying enterprise customers (under NDA) |
| **Quality** | CC BY-SA 4.0 | Closed-source SaaS / self-hosted (code-reviewable)    | Paying enterprise customers (under NDA) |

> The specification is always open — anyone can inspect, study, and independently implement the methodology behind all three subsets. Tool openness differs: **Inspect**'s tooling itself is open source; **Risk** and **Quality** are offered as SaaS for trial, with enterprise customers granted code-review access under a self-hosted deployment.

---

## Inspect — Open-Source CLI

Defect Inspector is fully open source, allowing the community to freely use, audit, modify, and build upon it.

- **GitHub Repository**: [sanityops-cli](https://github.com/sanityops-org/sanityops-cli) — Apache 2.0

- **Use Case**: Static defect inspection of **Logic Artifacts** (System Prompts, Skills, Tool Schemas), suitable for local development or CI/CD integration.

- **Note**: The open-source CLI provides the full Inspect capability (inspection, suggestions, and remediation). On the Platform, Inspect results are cross-linked with Risk and Quality findings and archived into the version-level evidence chain.

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

Artifact entries accept any plaintext format (`.md`, `.json`, `.py`, `.ts`, …). To configure credentials through the environment instead of the file, drop the `model:` section and set `LLM_PROVIDER`, `LLM_API_KEY`, `LLM_MODEL_ID`, and `LLM_BASE_URL`.

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

**4. Generate fixes (optional)**

```bash
sanityops-cli inspect repair
```

Reads the latest inspection report and produces repaired artifacts. Use `--report <path>` to target a specific report.

### Two Ways to Run the CLI

| Mode | What you need | What happens |
| --- | --- | --- |
| **Local only** | An LLM API key in `model.api_key` | Inspection runs entirely on your machine. No account and no upload required. |
| **Connected to the Platform** | Additionally a Platform API key in `server.api_key` | Inspection still runs locally; the scanned artifacts are then pushed to a Platform project as a new version. |

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

> The [repository README](https://github.com/sanityops-org/sanityops-cli) is the authoritative reference for the CLI — every command, flag, and configuration key is documented there.

---

## Risk, Quality & Permission — Hosted Platform

Risk Scanner, Quality Evaluator, and the Permission baseline are delivered as a hosted platform, with self-hosted deployments for enterprise. Their methodology is fully open source; the tool implementation is not currently released as public source code.

| Module | What it adds |
| --- | --- |
| **Defects** | Inspect results, cross-linked with Risk and Quality findings |
| **Quality** | Agent and LLM service quality assessment |
| **Security** | Explicit risk audit and Implicit risk validation |
| **Permission** | Permission baseline (preview) — authority granted vs. responsibility held |
| **Overview** | Governance posture, version timeline, and trend across runs |

Beyond the modules themselves, the Platform is what turns a point-in-time scan into governance: artifact versioning, check history, defect → risk/quality correlation, and exportable reports you can hand to an auditor.

### Getting Access

- **Live Demo**: https://demo.sanityops.org/
- The demo platform is currently in an early access phase. Because core detection features rely on third-party LLM API calls, access is invite-only to keep service quality high and inference cost manageable.
- **How to request access**: Open the demo and click **Register**. A code is required to complete registration — click the **Get Code** button next to the **Invitation code** field, and the dialog shows the address to write to. Send your request from the email address you register with to [hello@sanityops.org](mailto:hello@sanityops.org), describing your use case, and we will send you an invite code.
- **Usage quota**: The CLI's local mode is unmetered — it runs on your own model credentials. For the hosted platform there is no fixed public per-day limit; quota is confirmed together with your invite code.
- **Module availability** depends on your invitation code — modules that are not enabled on your account are shown greyed out. **Permission** is available on every account.

> Once you are signed in, the Platform walks you through the rest in place: creating a project, pulling artifacts from Git or adding them manually, configuring an LLM or agent endpoint, running a check, and exporting the report. This page does not duplicate that walkthrough.

### Enterprise Self-Hosted Deployment

- Full-stack self-hosted deployment (detection engine, database, dashboards) within your enterprise VPC;
- **Decoupled model layer**: bring your own LLM, including locally hosted models, with no dependency on external APIs;
- **Code-reviewable access (under NDA)**: contracted enterprise customers may obtain source-code review access under NDA to independently verify how governance logic is implemented — consistent with the transparency principle behind open-sourcing our Framework: **governance tooling should be transparent, not a black box.**
- **Contact Sales**: [partnership@sanityops.org](mailto:partnership@sanityops.org) · [master.leoyoung@gmail.com](mailto:master.leoyoung@gmail.com)

---

## Why Are Inspect, Risk, and Quality Unified into the SanityOps Platform?

The Inspect ruleset and CLI are open source — you can use it independently for static defect checking. Risk and Quality can likewise be adopted as standalone capabilities. The methodology behind all three is fully decoupled: **you can use just one, or combine them freely.**

Within the SanityOps Platform, however, we integrate all three into a unified system, for the following reasons:

- **Correlated Root-Cause Analysis**: Defects surfaced by Inspect are mapped against Risk's attack-surface findings and Quality's failure-mode patterns, enabling rapid root-cause localization behind output anomalies or risk incidents;
- **Logical Artifact Version Management**: Every artifact iteration (e.g., `Agent_RAG_v3.2.1 → v3.2.2`) has its defect inspection, risk audit, and quality evaluation results consolidated into a traceable, auditable evidence chain;
- **Analytics Dashboards & Reporting**: Searchable, exportable dashboards and compliance reports support cross-version trend comparisons of governance posture.

> In short: **the open-source tools give you point-in-time detection capability; the Platform gives you correlated root-cause analysis and version traceability in a continuous governance loop.** Each subset works independently — the Platform's value lies in organizing them into a persistent and auditable governance system, rather than simply bundling features together.

---

## Quick Start

| What do you want to do?                                  | Recommended path                                                                                               |
| -------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| Run static defect checks and integrate it yourself       | Download the [open-source Inspect tool](https://github.com/sanityops-org/sanityops-cli)          |
| Connect your CLI runs to the Platform                    | Take an API key from **Personal → API Keys**, then `sanityops-cli config server.api_key`                        |
| Experience the full governance loop                      | Request an invite code and try the [live demo](https://demo.sanityops.org/)                                     |
| Deploy independently, with custom models and code review | Contact [partnership@sanityops.org](mailto:partnership@sanityops.org) or [master.leoyoung@gmail.com](mailto:master.leoyoung@gmail.com) to discuss self-hosted deployment |
| Learn the methodology and implement it yourself          | Read the [open-source Framework specification](https://github.com/sanityops-org/sanityops-framework/tree/main) |
