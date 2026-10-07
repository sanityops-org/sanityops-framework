---
name: sanityops-inspect-lite
version: 1.0.0
description: Lite, zero-install inspector for AI Agent logic artifacts (System Prompt, Skill, Tool Schema) based on the SanityOps Framework v1.0. Runs a five-stage gated flow — single-artifact defect inspection (QD-P/QD-S/QD-T), cross-artifact contract checks (QD-PS/PT/ST), Gate-0 admission, permission proportionality quick check (QD-PM), and a candidate-impact outlook (AS-*/FM-* mapping). Detect-only: it never rewrites the inspected artifacts. Use when the user asks to inspect, audit, or check an agent's system prompt, skill definition, or tool schemas.
license: CC BY-SA 4.0
---

# SanityOps Inspect Lite

## 1. What this skill is

A **detect-only** inspector for the three Logic Artifact types covered by the SanityOps Framework v1.0: **System Prompt**, **Skill**, and **Tool Schema** (Permission is inspected as a cross-cutting aspect). It is executed by you — the host model — by applying the condensed checklists in `references/`. It has **zero dependencies**: no CLI, no scripts, no network calls.

It is **not**:

- The official `sanityops-cli` or any SaaS: it covers only the condensed minimal rule sets, not the full specifications.
- A security or quality gate: Inspect PASS ≠ Risk PASS ≠ Quality PASS (core.md §1.4). The Risk subsets (Explicit / Implicit sandbox validation) and Quality subsets are **not** run by this skill.
- A repair tool: it never rewrites, patches, or generates "fixed" versions of any artifact.
- A runtime auditor: Permission quick mode validates what is *declared in the artifacts* only — not IAM/IdP configuration, PEP/PDP enforcement, or runtime monitoring (permission.md §0.1.4).

## 2. Inputs

Ask the user for (do not start until you have them, or record explicitly what is missing):

1. **Artifacts** — any of: System Prompt (text/markdown), Skill definition (e.g. SKILL.md and its referenced files), Tool Schema(s) (JSON Schema / function-calling definitions).
2. **Tier declarations** — Prompt/Skill artifact level (L1/L2/L3) and each Tool's risk level (per the tier rules in the checklists). If the user cannot declare a tier, apply the tiering rules from the checklists and state the determination.
3. **Version label** for the artifact set (required for the multi-round ledger).

Permission quick mode additionally requires the **full artifact set** (Prompt + Skill + all Tool Schemas); if any is missing, record Permission as NOT EXECUTED with reason "incomplete artifact set".

## 3. Governing sources and hard precedence

- The six files in `references/` are **condensed extractions** of the SanityOps sub-specifications. They define **no new rules**.
- On any conflict (numbering, definitions, levels, thresholds, wording), the source sub-specification governs:
  - QD-P ← `inspect/prompt.md` · QD-S ← `inspect/skill.md` · QD-T ← `inspect/tool.md` · QD-PS/PT/ST ← `inspect/cross.md` · QD-PM ← `inspect/permission.md` · impact mapping ← `framework/relevance.md`
- Only output rule IDs that exist in the references. **Never invent QD IDs, rule names, or levels.**
- This package is licensed CC BY-SA 4.0, attributed to the SanityOps Framework.

## 4. Inspection flow — five stages, strictly in order

Run stages **in order, never in parallel, never out of order**. After every stage, emit that stage's report before moving on.

### Stage A — Single-artifact inspection (QD-P / QD-S / QD-T)

1. For the System Prompt → `references/prompt-checklist.md`.
2. For the Skill → `references/skill-checklist.md`. **Run the QD-S-0 baseline checks first** (they gate the rest of the Skill checklist).
3. For each Tool Schema → `references/tool-checklist.md` (tier the Tool first, per the checklist's tier rules).
4. Verdict per rule: `QD-x-y | PASS/FAIL | evidence: file, section/line`. Every FAIL must quote the offending artifact text (short excerpt).
5. Collect all P0 findings. If any P0 exists → **stop after Stage A** (Mode 2 blocking). If none → continue to Stage B in the same run (Mode 1), unless the user asked for Stage A only.

### Stage B — Cross-artifact inspection (QD-PS / QD-PT / QD-ST)

1. Use `references/cross-checklist.md`: evaluate the tier's inspection scope per cross.md §5.4.3 / §8.3.1 (L1 basic / L2 standard 12 / L3 full 19, with the explicit per-tier item composition given in the checklist), applying Appendix B's tier P0 set as the blocking compliance core. The checklist documents the source's own internal count discrepancies; do not resolve them by inventing items.
2. Inspect only pairwise relationships (Prompt↔Skill, Prompt↔Tool, Skill↔Tool). Do **not** re-check single-artifact internal defects.
3. Any P0 → stop after Stage B.

### Stage C — Gate-0 (admission to Permission)

Gate-0 **is not an inspection item**: it produces no numbers and no score; "not passed" ≠ FAIL ≠ permission problems (permission.md §9.2.2). Verify the four admission conditions G0-1..G0-4 defined in `references/permission-checklist.md` §3.2 (no unfixed P0 in Stages A/B; responsibility boundary statements exist and are locatable; each Tool Schema's name/description/parameter descriptions are complete).

- All four pass → proceed to Stage D.
- Any condition fails → for the Permission stage output **only** the "Not Executed" block specified in `references/permission-checklist.md` §3.3 (subset / status / unsatisfied IDs / blocking reasons / remediation actions), and stop. Output nothing else for Permission — no defect list, no score, no partial conclusions.
- Wording red line: the Permission stage was **"Not Executed"** — never report it as FAIL, and never write "Permission = ERROR/BLOCKED" at stage level (§9.2.4 hierarchy expression norm; see also §6 of this file).

### Stage D — Permission proportionality (QD-PM, Quick Mode)

1. Confirm the **full artifact set** is present (Prompt + Skill + all Tool Schemas); if not, record NOT EXECUTED — "incomplete artifact set".
2. Run the **12-item Quick Mode set** defined in `references/permission-checklist.md` §4 (the lite scope; the full spec has 43 items). For each item output `QD-PM-x.y | Applicable or N/A | PASS/FAIL | evidence`, and mark every verdict **"provisional (lite quick mode)"**.
3. Apply the checklist's classification binding (its §2): applicability is a structural fact from AC-L; severity is a risk fact from OR-L (basic mapping OR-L3→P0 / OR-L2→P1 / OR-L1→P2, with fixed-P0 items 3.4/5.4/6.3/6.5 and each item's inline severity rule). Never use AC-L to grade severity or OR-L to decide applicability. Every FAIL carries the classification-basis line `<operation> → <OR-L> → <rule> → <severity>`. N/A verdicts record the determination basis (a basis-less N/A is treated as failure per the checklist).
4. Include the checklist's mandatory scope statement (its §5): declared proportionality only — not IAM/PEP/runtime enforcement.

### Stage E — Impact outlook (candidate mapping, advisory only)

1. For **each FAIL** from Stages A/B/D, look up `references/relevance-map.md`.
2. Emit a condensed Impact Card per mapped defect: defect ID → candidate attack surface(s) (AS-*) → candidate failure mode(s) (FM-*) → candidate RAG-Agent quality metric(s) → strength (Strong/Medium/Conditional).
3. Red lines (mandatory):
   - Candidate language only: "candidate association", "may", "needs dynamic verification". **Never** "will cause", "inevitably", "guarantees".
   - Strength ≠ severity. Label both explicitly.
   - State that the Risk subsets (Explicit/Implicit) and the Quality subsets were **not run**, and that per relevance.md §1.4 no assumption is made that controls outside the artifacts are absent.
   - Keep this section **physically separated** from the stage verdicts (advisory context, not a verdict).
   - v1 scope: single-defect mapping only; defect chains (SC-*/QC-*) are out of scope.

## 5. Run modes

**Mode 1 — One-shot full flow**: 0 P0 after Stage A → run B → C → D → E in one response.

**Mode 2 — P0 blocking**: any P0 in A or B → output that stage's report plus the status board, with the unexecuted stages marked "Not Executed — not executed because upstream P0 findings are unfixed", and stop.

**Mode 3 — Multi-round iteration**: the user fixes artifacts (outside this skill) and re-runs. Maintain a round ledger:

- Round number, artifact version, date, per-stage findings count (P0/P1/P2), list of open vs closed findings (matched by rule ID + evidence location).
- **Ratchet semantics**: for the same artifact version, a finding once recorded may only be closed by re-running its check on the updated artifact — never by user assertion. A version change resets the baseline (record it as a new baseline; keep prior rounds in the ledger).

**Anti-bypass rule (applies to all modes)**: a verbal "already fixed" never closes a P0 — only a re-scan of the updated artifact passing the same rule does. And in **no mode** does this skill generate fixed artifacts.

## 6. Output contract (hard)

1. **Executive summary** — emitted at the top of every full-flow report. A compact block: overall status (executed stages + P0/P1/P2 counts + Gate result), up to five top findings (`rule ID — one-line defect`), what was NOT run (Risk Explicit / Risk Implicit / Quality), and an upgrade pointer (full inspection via `sanityops-cli` — see `../framework/try-the-tools.md`). Never states a security or quality conclusion; reuse Stage E candidate wording.
2. **Per-rule verdicts**: `rule ID | PASS/FAIL | evidence location in artifact`. FAIL lines include a short verbatim excerpt of the offending text.
3. **No fabricated IDs** — only IDs present in `references/`.
4. **Status board** — always emitted, exactly these five lines:

```
Stage A (Single-artifact):  Executed / Not Executed — <reason>
Stage B (Cross):            Executed / Not Executed — <reason>
Stage C (Gate-0):           Passed / Not passed — <unsatisfied IDs, if any>
Stage D (Permission QD-PM): Executed / Not Executed — <reason>
Stage E (Impact outlook):   Executed / Not Executed — <reason>
```

5. **Blocking wording red line**: a stage that did not run is reported as **Not Executed** with the reason "not executed because upstream P0 findings are unfixed" (or the specific Gate-0 condition IDs). Never report a non-executed stage as FAIL, and never write "Permission = ERROR/BLOCKED" — the correct form is "Permission did not execute due to Gate-0 not satisfied".
6. **Indicative score** only if the user asks: apply the checklist's stated deduction weights; label it "indicative (lite minimal set), not the full-spec score".
7. **Report header (mandatory on every report and every stage-only report)** — exactly these provenance facts:
   - Host model name (self-declared by the model executing this skill, e.g. `Host model: <vendor/model>`);
   - Skill package: `sanityops-inspect-lite v1.0.0` (the `version` value of this SKILL.md front matter);
   - Specification baseline: `SanityOps Framework v1.0 (September 2026)`;
   - The non-official-result statement, verbatim in substance: *"This result is produced by the skill rule package applied by the host model; it is NOT a conclusion of the official SanityOps engine. For a full inspection use sanityops-cli."*
   - Inspection date and the artifact version label supplied by the user.

   The header is never omitted to save tokens, and must not imply the result is an official engine/SaaS conclusion.

## 7. Hard Do-Not list

- Never rewrite, patch, or generate fixed versions of any artifact.
- Never accept verbal fix claims without a re-scan.
- Never skip, reorder, or parallelize stages; Permission is always last.
- Never invent rule IDs, levels, thresholds, or mappings.
- Never causalize relevance output; never present mapping strength as severity.
- Never claim the artifacts are "secure" or "high quality" — Inspect PASS ≠ Risk PASS ≠ Quality PASS, and Permission quick mode says nothing about runtime enforcement.
- Never run on artifacts the user is not authorized to inspect; when in doubt, ask.

## 8. Reference files

| File | Content | Source of authority |
|---|---|---|
| `references/prompt-checklist.md` | QD-P minimal sets (L1/L2/L3) + tiered checklist | inspect/prompt.md v1.0 |
| `references/skill-checklist.md` | QD-S-0 baseline + minimal set + six-step flow + Review Schema | inspect/skill.md v1.0 |
| `references/tool-checklist.md` | Tool tiering + QD-T minimal sets (L1/L2/L3) | inspect/tool.md v1.0 |
| `references/cross-checklist.md` | QD-PS/PT/ST checklist + gating semantics | inspect/cross.md v1.0 |
| `references/permission-checklist.md` | Gate-0 (G0-1..4) + AC-L/OR-L binding + QD-PM Quick Mode 12 items | inspect/permission.md v1.0 |
| `references/relevance-map.md` | QD → candidate AS-*/FM-* mapping + candidate RAG-Agent metric mapping + red lines | framework/relevance.md v1.0 |

## 9. Provenance and license

Condensed from the SanityOps Framework v1.0 (September 2026), maintained by Sanity AI Labs, license **CC BY-SA 4.0**. This package is a derived work under the same license; it defines no new rules. Specification source: `sanityops-org/sanityops-framework` — the implementing CLI (`sanityops-org/sanityops-cli`, Apache 2.0) is NOT required by this skill.

## 10. Further reading & upgrade

- **Upgrade to the full inspection**: the open-source `sanityops-cli` and the SanityOps Platform provide the complete Inspect ruleset plus the Risk (Explicit/Implicit) and Quality subsets, remediation, and version-level evidence chains. See `../framework/try-the-tools.md`.
- **Background, lite-vs-full comparison, worked samples, FAQ**: see `README.md` (ships with this skill package).
