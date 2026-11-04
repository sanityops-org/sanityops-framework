---
title: CLI Inspection Report (sanityops-cli v0.1.9)
description: "sanityops-cli v0.1.9 L3 inspection of the three sample agents, with per-agent metrics, triaged findings (confirmed vs. model false-positives), and Gate conclusions."
---

# CLI Inspection Report — Three Sample Agents

This report is the **machine-generated result** of running the official `sanityops-cli` (v0.1.9) over the three sample agents in `samples/cases/`, followed by a manual triage pass that separates confirmed defects from model/artifact false positives.

## Run Metadata

| Field | Value |
|---|---|
| CLI | `sanityops-cli` v0.1.9 (Apache 2.0) |
| Python | 3.14.5 (win32/AMD64) |
| Check level | L3 (deep) |
| Inspection model | `deepseek-flash` (OpenAI-compatible endpoint `https://api.deepseek.com/v1`) |
| Date | 2026-11-02 |
| Input artifacts | Extracted from `samples/cases/*.md` into one Prompt + N Skills + M Tool schemas per agent |
| Raw reports | `.sanityops/cli-run/<agent>/results/inspect-*.md` |

> **Method note**: each `*-assistant.md` bundle was split deterministically into loadable per-type files (System Prompt → `prompt.md`; each `SKILL.md`; each tool `parameters` schema → `.py`). The CLI then ran QC lint (no LLM) followed by LLM defect analysis at L3.

---

## 1. Raw Summary (per agent)

| Agent | Artifacts | QC lint | LLM defects | Severity | Gate |
|---|---|---|---|---|---|
| Energy Management Assistant | 1p / 3s / 6t | 16 P1 (0 P0) | 33 | P0: 13 · P1: 14 · P2: 6 | **FAIL** |
| Freight Logistics Assistant | 1p / 3s / 9t | 22 P1 (0 P0) | 24 | P0: 10 · P1: 7 · P2: 7 | **FAIL** |
| Medication Information Assistant | 1p / 1s / 5t | 10 P1 (0 P0) | 20 | P0: 10 · P1: 7 · P2: 3 | **FAIL** |

The **Permission (QD-PM)** stage was reported as *skipped* in all three runs — the CLI did not execute the responsibility–authority proportionality check (Gate-0 prerequisites were not satisfied given the P0 findings upstream).

---

## 2. Triage Overview

The raw CLI output mixes **confirmed defects** with two systematic classes of **false positives**. This section separates them.

### 2.1 Confirmed cross-artifact findings (valid, reproduce against source)

These were independently re-verified against the source artifacts and are genuine contract inconsistencies between Prompt ↔ Skill ↔ Tool.

| # | Rule | Severity | Agents | Finding |
|---|---|---|---|---|
| F-1 | QD-PS-1.5 | P1 | all 3 | **Retry-policy contradiction** — Prompt limits to *"retry at most once / do not retry identical call"*, but every Skill front-matter declares `max_retries: 3` and the failure policy says *"retry the identical call up to 3 times"*. |
| F-2 | QD-ST-3.5 | P1 | all 3 | **Output-structure mismatch** — Skill "closed enumeration" return fields do not match the Tool's declared return values. Sharpest case: `medication_check_interactions` **duplicates** `interactions_found`/`interactions` and **omits** `medications_checked`/`foods_included` returned by the Tool. Freight route/shipment and energy carbon/opportunity fields diverge likewise. |
| F-3 | QD-PS-1.6 | P2 | energy, freight, medication | **Output-constraint inconsistency** — Prompt's mandatory output schema (and its exact *"licensed engineering staff"* disclaimer) is not satisfiable from the Skill's declared output; `efficiency_optimization` restates the disclaimer as *"qualified"* staff. |
| F-4 | QD-ST-3.2 | P0/P1 | energy, freight | **Input-constraint mismatch** — energy `scope` pattern `^\d{1,3}(\.\d+)?%$` accepts >100% for a "percentage of facility" field; freight `origin`/`destination` Skill wording says "letters" but the Tool pattern is ASCII-only (`[A-Za-z0-9]`), rejecting non-ASCII city names (Zürich, São Paulo, 北京). |
| F-5 | QD-PS-1.2 | P1 | energy | **Trigger-condition conflict** — Prompt fires `energy_calculate_carbon_footprint` / `energy_suggest_renewables` on explicit carbon/renewables mention even when framed as ESG reporting, while the Skills' `forbidden_when` excludes ESG reporting. |
| F-6 | QD-PT-2.3 | P1 | energy | **Parameter unit inconsistency** — `budget_constraint` is USD in the Prompt, "local currency" in the Tool schema. |

### 2.2 Over-severity (read-only chaining flagged as P0)

| Rule | Raw | Assessment |
|---|---|---|
| QD-T-3.5 | P0 (all 3) | The Tools accept IDs sourced from a prior tool result (`analysis_results`, `medication_id`, `route_id`). This is **legitimate read-only ID resolution**, not unauthorized sensitive-data chaining. Per `inspect/tool.md`, this rule's ownership moved to `QD-TT-5.1` with only a **P2 lead** retained here — the P0 grade is not justified for read-only lookups. |

### 2.3 False positives (do not represent defects in the artifacts)

| Class | Count (approx.) | Cause |
|---|---|---|
| QC-1.1 "`Dict`/`Any` not defined" | ~48 P1 | **Extraction artifact** — tool files contain only the `parameters` dict snippet; the `from typing import Dict, Any` import lives in the (omitted) file body. Not a real defect. |
| QC-0.2 "code block lacks language" | 12 P1 | Style lint on bare ``` blocks in prompt examples; not a logic-artifact defect. |
| QDP "section missing / truncated" (e.g. "Principle 2/3 do not exist", "no Conversation Flow", "truncated Output Format") | ~several P0 | **Model hallucination** — these sections are present and complete in the source prompts (verified). |
| QDP "no frequency limit / no positive examples / no boundary examples / no error handling" | ~several P0 | **Model hallucination** — each prompt declares tool-call caps, positive/boundary examples, and error handling. |

The last two rows are attributable to the weak inspection model (`deepseek-flash`) and to the scanner's file-read window, not to the artifacts.

---

## 3. Per-Agent Notes

**Energy** — strongest genuine findings: F-1 (retry), F-4 (`scope` >100%), F-5 (ESG trigger), F-6 (currency). The prompt's own "Three Core Principles" were mis-reported as truncated (they are intact).

**Freight** — strongest genuine findings: F-1 (retry), F-2 (route/shipment output fields), F-4 (ASCII city-name pattern). The `route_planning` skill also lacks a `max_items` input-count limit (QDS-1.1) unlike its siblings.

**Medication** — strongest genuine findings: F-1 (retry, plus `max_retries: 3` front-matter conflicting with "stop immediately" body), F-2 (duplicated + incomplete `medication_check_interactions` Returns). Also flagged: the prompt's ambiguity-handling (partial match) vs the Tool's partial-match contract (QD-PT-2.2).

---

## 4. Gate Conclusion

| Agent | Static Gate (CLI L3) | After triage |
|---|---|---|
| Energy | FAIL | **FAIL** — confirmed P0 (F-4 scope constraint) + several P1 |
| Freight | FAIL | **FAIL** — confirmed P0 (F-4 ASCII pattern) + several P1 |
| Medication | FAIL | **FAIL** — confirmed P1 (no P0); the duplicated Returns is the clearest single defect |

**Overall**: the CLI's raw "FAIL" conclusions stand after triage, but not for the reasons the raw report emphasizes. The genuine blocking items are **cross-artifact contract inconsistencies** (F-1 … F-6), most of which are P1; the two defensible P0s are the **input-constraint mismatches** (F-4). The large P0 count in the raw output is dominated by model hallucinations and the QC-lint extraction artifacts, which should be disregarded.

### Recommendations

1. **Re-run with a stronger model** (e.g. Claude Sonnet / GPT-4-class) — `deepseek-flash` produces the "missing section" hallucinations; a stronger model would yield a cleaner finding set. The CLI supports this via `--model` / `--provider` or the config `model:` section.
2. **Fix the confirmed P1/P0 items** in order F-1 → F-4 → F-2/F-3 (the retry contradiction and input-constraint mismatches are the highest-value, lowest-effort fixes).
3. **Run Permission (QD-PM)** after clearing Gate-0 P0s — the CLI skipped it this run.
4. **Do not** chase the QC-1.1 "`Dict`/`Any`" items (extraction artifact) or the QDP "missing section" items (hallucinations).
