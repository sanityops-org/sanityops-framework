---
title: "External Inspection Sample — anthropics/skills `pdf` Skill"
description: "sanityops-inspect lite inspection of the anthropics/skills pdf Skill at a pinned commit: provenance, structural outline (proprietary-license limited excerpts), Stage A QD-S verdicts, and the five-stage status board."
---

# External Inspection Sample — anthropics/skills `pdf`

> Instance output of the **sanityops-inspect** lite inspector (SanityOps Framework v1.0 condensed checklists, detect-only). This is an **F-* level instance record**, not a rule definition; the normative sources remain `inspect/skill.md`, `inspect/cross.md`, `inspect/permission.md`, and `framework/relevance.md`.

## Part 0 — Provenance

| Item | Value |
|---|---|
| Repository | https://github.com/anthropics/skills |
| Branch / HEAD SHA | `main` · `683bc88e56f3e09ba94f7055977f3d3aa499f202` (commit 2026-10-05) |
| Inspected skill | `pdf` (repo path `skills/pdf/`) |
| Artifacts fetched | `SKILL.md`, `reference.md`, `forms.md`, `LICENSE.txt` (2026-10-06) |
| Not fetched | 8 `scripts/*.py` files (executable code, not a Logic Artifact) and binaries — recorded in the fetch manifest only |
| Artifact license | **Anthropic proprietary** — `LICENSE.txt`: "© 2025 Anthropic, PBC. All rights reserved."; use governed by Anthropic's Terms of Service; no extraction, no derivatives, no distribution |
| Inspector | sanityops-inspect lite (five-stage gated flow, minimal rule sets), run 2026-10-06 |
| Report copyright | Report text © SanityOps contributors, CC BY-SA 4.0. Embedded short excerpts remain © 2025 Anthropic, PBC, reproduced as minimal evidence only |

**Full-text note:** because the source artifacts carry a no-derivative / no-distribution license, Part 1 does **not** reproduce their full text. It gives a structural outline (headings + line references) and short verbatim excerpts (≤ 10 lines each) solely where inspection evidence requires quoting. Exact bytes can be fetched at the pinned SHA above.

## Part 1 — Source Logic Artifacts (outline + evidence excerpts)

### 1.1 `skills/pdf/SKILL.md` (314 lines)

- Front matter (L1–L5): fields `name: pdf`, `description` (one long routing sentence), `license: Proprietary`.
- `# PDF Processing Guide` → `## Overview` (L9): routes advanced use to `REFERENCE.md`, form filling to `FORMS.md`.
- `## Quick Start` (L13): pypdf read / page-count / text-extract snippet.
- `## Python Libraries` (L28): `### pypdf` (merge/split/metadata/rotate), `### pdfplumber` (text/tables/advanced tables), `### reportlab` (create, multi-page, Unicode sub/superscript warning L171).
- `## Command-Line Tools` (L189): pdftotext, qpdf, `### pdftk (if available)` (L219).
- `## Common Tasks` (L231): OCR scanned PDFs, watermark, image extraction, password protection.
- `## Quick Reference` (L296): task→tool table. `## Next Steps` (L309).

Evidence excerpts used below:

```yaml
name: pdf
description: Use this skill whenever the user wants to do anything with PDF files. This includes reading or extracting text/tables from PDFs, combining or merging multiple PDFs into one, splitting PDFs apart, rotating pages, adding watermarks, creating new PDFs, filling PDF forms, encrypting/decrypting PDFs, extracting images, and OCR on scanned PDFs to make them searchable. If the user mentions a .pdf file or asks to produce one, use this skill.
```

```python
# L263-265 — watermark, no page/file cap
for page in reader.pages:
    page.merge_page(watermark)
```

```python
# L473-477 — batch over a directory glob, no count/size limit
def batch_process_pdfs(input_dir, operation='merge'):
    pdf_files = glob.glob(os.path.join(input_dir, "*.pdf"))
```

### 1.2 `skills/pdf/forms.md` (294 lines)

- L1 opening directive: "**CRITICAL: You MUST complete these steps in order. Do not skip ahead to writing code.**"
- Pre-check: `python scripts/check_fillable_fields <file.pdf>`; branches "Fillable fields" / "Non-fillable fields".
- Fillable path: extract field info JSON → convert pages to PNG → author `field_values.json` → run `fill_fillable_fields.py`; L76: failed validation → correct and retry (no attempt cap).
- Non-fillable path: Approach A (structure coordinates), Approach B (visual estimation with ImageMagick zoom crops), Hybrid; `check_bounding_boxes.py` validation gate; fill → render → verify.

Evidence excerpt:

```text
# forms.md L74-76 — retry with no termination threshold
Run the `fill_fillable_fields.py` script ... This script will verify that the field IDs
and values you provide are valid; if it prints error messages, correct the appropriate
fields and try again.
```

### 1.3 `skills/pdf/reference.md` (612 lines)

- pypdfium2 rendering/extraction; JavaScript libraries (pdf-lib, pdfjs-dist); advanced CLI (bbox extraction, image conversion, qpdf page manipulation/optimize/repair/encryption L331–L341); advanced pdfplumber/reportlab; complex workflows (batch with per-file try/except L473–L507, chunked large-PDF processing L549–L565); troubleshooting (encrypted PDFs — hard-coded `reader.decrypt("password")` example L574–L579; corrupted PDFs; OCR fallback); third-party license list.

### 1.4 Out-of-scope observations (not lite-rule findings; no rule ID invented)

- `SKILL.md` L11/L311–L313 and `reference.md` L2 point readers to `REFERENCE.md` / `FORMS.md` (uppercase), while the fetched files are lowercase `reference.md` / `forms.md`. On case-sensitive file systems the references do not resolve. The condensed QD-S minimum set contains no broken-reference rule, so this is recorded as an observation only.
- Executable `scripts/*.py` were not inspected (executable code is outside the three Logic Artifact types).

## Part 2 — Inspection Results

### Stage A — Single-artifact inspection (QD-S, Skill only)

#### A.0 QD-S-0 Baseline Compliance (entry gate, run first)

| ID | Verdict | Evidence |
|---|---|---|
| QD-S-0.1 Required Field Presence | PASS | `SKILL.md` L2–L4: `name`, `description` present (plus extra `license`) |
| QD-S-0.2 Field Content Non-Empty | PASS | All present fields carry non-empty content (L2–L4) |
| QD-S-0.3 Syntax Parsability | PASS | YAML front matter L1–L5 is well-formed; markdown body parses |
| QD-S-0.4 Field Type Validity | PASS | `name` and `description` are strings (L2–L3) |
| QD-S-0.5 No Conflicting Declarations | PASS | No mutually contradictory declarations between front matter and body |
| QD-S-0.6 Minimum Structural Completeness | PASS | Identity + trigger front matter plus an executable instruction body and two referenced guides |

**Baseline result: 6/6 PASS → proceed to tiered inspection.**

#### A.1 Skill risk-level determination

**Determined level: L3 (High Risk).** Basis per skill-checklist §5 step 2 ("operation execution; irreversible operations → L3"): the Skill directs execution of Python scripts and CLIs that **write to the user's file system** — merging/splitting to new files, writing form annotations, adding passwords (`encrypt`/`decrypt`, SKILL.md L279–L294, reference.md L331–L341), with overwrite-capable output paths. These are file-system state-changing operations, beyond L2 resource access. Determination caveat: no explicit *delete* operation was found; the L3 call rests on operation execution plus encryption/overwrite exposure. A reviewer judging only explicit irreversibility could place it at L2 — the source sub-specification governs the final tier call.

#### A.2 L3 minimum rule set — 21 mandatory items

Findings are organized by the six Review Schema dimensions (IDENTITY / TRIGGER / INPUT / EXECUTION / OUTPUT / FAILURE), then listed by priority.

| ID | Rule (short) | Verdict | Level | Evidence (verbatim excerpt) |
|---|---|---|---|---|
| QD-S-1.1 | Input Boundary Missing | **FAIL** | P0 | No cap on file count/size/page count: `pdf_files = glob.glob(os.path.join(input_dir, "*.pdf"))` (reference.md L474); OCR/conversion loops process every page; no `max_items`-equivalent anywhere in the three files |
| QD-S-1.2 | Output Size Missing | **FAIL** | P0 | No output size ceiling; multi-file merge concatenates without limit (`for pdf_file in [...]: for page in reader.pages: writer.add_page(page)`, SKILL.md L37–L40); no `max_total_chars`-equivalent |
| QD-S-1.3 | Execution Resource Boundary Missing | **FAIL** | P0 | The Skill mandates script/CLI invocations ("You MUST complete these steps in order", forms.md L1) but declares no retry count, invocation cap, or timeout |
| QD-S-1.4 | Permission Boundary Missing | **FAIL** | P0 | Read (extract/OCR), write (merge/split/fill/watermark/encrypt outputs) coexist with no read/write/delete distinction and no declared prohibited operations |
| QD-S-1.5 | Data Source Boundary Missing | **FAIL** | P1 | No permitted/prohibited source locations declared (any directory path accepted by the snippets) |
| QD-S-2.1 | Unbounded Quantity Declaration | **FAIL** | P0 | "Apply watermark to all pages" (SKILL.md L259–L264); "Extract all images" (L273–L277); `for page in reader.pages` patterns with no quantity limit |
| QD-S-2.2 | Unterminated Execution Declaration | **FAIL** | P0 | "if it prints error messages, correct the appropriate fields and try again" (forms.md L76) — retry with no failure threshold |
| QD-S-2.3 | Open-Ended Enumeration | PASS | — | No "etc. / and others / such as" open-ended output-structure enumeration found; the description's capability list is finite |
| QD-S-2.4 | Broad Capability Verbs | **FAIL** | P0 | "Use this skill whenever the user wants to **do anything with PDF files**" (SKILL.md L3) — maximal-scope verb phrase with no `non_goals` exclusion |
| QD-S-3.1 | Vague Trigger Conditions | **FAIL** | P0 | Trigger fires on mere mention: "If the user mentions a .pdf file or asks to produce one, use this skill" (L3) — discussion of a PDF would activate it |
| QD-S-3.2 | Missing Deactivation Conditions | **FAIL** | P0 | No `forbidden_when`/deactivation statement (e.g., encrypted file without password, untrusted/hostile PDF, system directories) anywhere in the set |
| QD-S-3.4 | Undefined Task Scope | **FAIL** | P0 | No `non_goals` declaration; nothing states what the Skill must not do with PDFs |
| QD-S-3.5 | Undeclared Default Behavior | **FAIL** | P0 | Critical branches undefined: encrypted-PDF handling shows a hard-coded sample `reader.decrypt("password")` (reference.md L577) with no stop/ask branch when the password is unknown; corrupted-file path has no defined default |
| QD-S-3.6 | Metadata Expression Defects | PASS | — | `name: pdf` matches the description and body scope; no read-only-vs-write metadata contradiction (the breadth defect is captured by QD-S-2.4/3.1, not here) |
| QD-S-4.1 | Undefined Failure Behavior | **FAIL** | P0 | Optional-dependency pattern "pdftk (if available)" (SKILL.md L219) and script validation loops define no overall failure-termination behavior; the model is left to choose alternative paths |
| QD-S-4.2 | Undeclared Partial Completion Legitimacy | **FAIL** | P0 | Batch snippet catches per-file errors and `continue`s (reference.md L479–L485) without declaring whether partial completion is acceptable to the user |
| QD-S-4.3 | Missing Post-Failure Prohibited Behaviors | **FAIL** | P0 | No statement forbidding standard-lowering or scope expansion after failure (e.g., switching libraries, relaxing coordinates when validation fails) |
| QD-S-5.1 | Read/Write/Delete Not Distinguished | **FAIL** | P0 | Extract (read), create/merge/fill/encrypt (write) are presented as one undifferentiated capability; no delete prohibition is declared |
| QD-S-5.2 | Missing High-Risk Confirmation | **FAIL** | P0 | File-system state changes — encryption, writing annotations, output paths that can equal the input path — carry no "confirm before overwriting/encrypting" requirement |
| QD-S-5.3 | Undeclared Environment Boundaries | **FAIL** | P0 | No permitted-environment statement (working/temp directories) and no prohibition on system or production locations |
| QD-S-5.4 | Undeclared Chained Invocation Permissions | N/A | — | Determination basis: the morphology does not exist — the Skill invokes local scripts/CLIs only; it neither invokes nor permits invoking other Skills |

**Stage A totals: 17 P0 FAIL · 1 P1 FAIL · 2 PASS · 1 N/A.**

Six-dimension summary: IDENTITY fails (no non-goals, no permission scoping); TRIGGER fails (over-broad trigger, no deactivation); INPUT fails (no item/size caps, unbounded "all"); EXECUTION fails (no retry/timeout/budget, no environment boundary, no high-risk confirmation, chaining N/A); OUTPUT fails (no size cap, no partial-completion policy); FAILURE fails (no default branches, no termination, no prohibited post-failure behaviors).

#### Mode decision

P0 findings exist after Stage A → **Mode 2 (P0 blocking)**: per SKILL.md §5, downstream stages are not executed.

### Stage B — Cross-artifact inspection (QD-PS / QD-PT / QD-ST)

Not executed (see status board). Applicability note for the re-run: the set contains a single artifact type; QD-PS/QD-PT/QD-ST would be N/A because no System Prompt or Tool Schema artifacts exist (relationships to the non-fetched `scripts/*.py` are out of scope — executable code is not a Logic Artifact).

### Stage C — Gate-0

Not executed (see status board). At a re-run after remediation, G0-1 ("no unfixed P0 in single-artifact inspection") is the condition currently known to be unsatisfied.

### Stage D — Permission proportionality (QD-PM, Quick Mode)

Not executed (see status board). Two independent reasons apply: (1) Mode 2 blocking — upstream P0 findings are unfixed; (2) even after remediation, Permission quick mode requires the full artifact set (Prompt + Skill + all Tool Schemas), and this set supplies only a Skill ("incomplete artifact set").

### Stage E — Impact outlook

Not executed in this blocked run (Mode 2 stops after Stage A; Stage E consumes Stage A/B/D FAILs in an unblocked run). Candidate AS-*/FM-* impact cards for the 18 findings will be emitted, in advisory candidate-only language, when the Skill is re-inspected after remediation — or upon explicit request for an advisory-only outlook on the current record.

### Status board

```text
Stage A (Single-artifact):  Executed — Skill QD-S only; QD-S-0 6/6 PASS; L3 set: 17 P0 FAIL, 1 P1 FAIL, 2 PASS, 1 N/A
Stage B (Cross):            Not Executed — not executed because upstream P0 findings are unfixed
Stage C (Gate-0):           Not Executed — not executed because upstream P0 findings are unfixed
Stage D (Permission QD-PM): Not Executed — not executed because upstream P0 findings are unfixed; additionally "incomplete artifact set" (no Prompt or Tool Schema artifacts)
Stage E (Impact outlook):   Not Executed — not executed because upstream P0 findings are unfixed
```

**Inspector scope reminder:** detect-only — no fixed artifact was generated; Inspect results say nothing about Risk (Explicit/Implicit) or Quality outcomes; Permission quick mode, when eventually run, validates declared proportionality only, not IAM/PEP/runtime enforcement.
