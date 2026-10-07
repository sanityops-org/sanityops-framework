---
title: "External Inspection Sample — crewAI-examples markdown_validator (Prompt + Tool)"
description: "sanityops-inspect lite inspection of the crewAI-examples markdown_validator crew (single agent, single LangChain tool): provenance, artifact outline with short attributed quotes, Stage A QD-P (L2) and QD-T (L1) verdicts, Mode 2 blocking, downstream-stage status, and the five-stage status board."
---

# External Inspection Sample — crewAI-examples markdown_validator (Prompt + Tool)

> Instance output of the **sanityops-inspect** lite inspector (SanityOps Framework v1.0 condensed checklists, detect-only). This is an **F-* level instance record**, not a rule definition; the normative sources remain `inspect/prompt.md`, `inspect/tool.md`, `inspect/cross.md`, `inspect/permission.md`, and `framework/relevance.md`.

## Part 0 — Provenance

| Item | Value |
|---|---|
| Repository | https://github.com/crewAIInc/crewAI-examples (project path `markdown_validator/`) |
| Branch / HEAD SHA | `main` · SHA unrecorded (fetched via raw.githubusercontent.com; GitHub API rate-limited at fetch time) |
| Artifact license | **No repo-level LICENSE found (404 at fetch time)** — treated as all-rights-reserved; artifacts are therefore outlined structurally with only short attributed quotes (≤ 10 lines total), per the anthropics/skills precedent |
| Fetched | 2026-10-07 |
| Fetched files | `src/markdown_validator/config/agents.yaml`, `src/markdown_validator/config/tasks.yaml`, `src/markdown_validator/crew.py`, `src/markdown_validator/tools/markdownTools.py`, `src/markdown_validator/main.py` |
| Artifact version label | `crewAI-examples/markdown_validator@main (fetched 2026-10-07, SHA unrecorded)` |
| Host model | Moonshot AI/Kimi-K3 |
| Skill package | sanityops-inspect v1.0.0 |
| Specification baseline | SanityOps Framework v1.0 (September 2026) |
| Non-official-result statement | *This result is produced by the skill rule package applied by the host model; it is NOT a conclusion of the official SanityOps engine. For a full inspection use sanityops-cli.* |
| Inspection date | 2026-10-07 |
| Report copyright | Report text © SanityOps contributors, CC BY-SA 4.0 |

**Artifact-type inventory:** System-Prompt artifacts = the CrewAI YAML pair (`agents.yaml` role/goal/backstory + `tasks.yaml` description/expected_output), which CrewAI composes into the agent's system and task prompts at runtime. Tool artifact = the LangChain `@tool` definition in `markdownTools.py`. `crew.py` is wiring (YAML binding, tool attachment, `Process.sequential`) and `main.py` is an entry point — neither contains logic-artifact text. **No Skill-definition artifact exists.**

## Part 1 — Source Logic Artifacts (outline + attributed short quotes)

All quoted lines © the crewAI-examples authors; quoted here for inspection evidence under the all-rights-reserved handling stated above. Local filenames flatten `/` to `_` (e.g. `src_markdown_validator_config_agents.yaml`); line numbers refer to the original repo files.

### 1.1 `config/agents.yaml` — single agent `Requirements_Manager` (11 lines)

Structure: `role` ("Requirements Manager") · `goal` (four clauses: produce a detailed list of markdown linting results; give a summary with actionable tasks to address them; write the response as a handoff to a developer to fix the issues; prohibition clause below) · `backstory` (expert business analyst and software QA specialist giving thorough, actionable feedback as a detailed list of changes and tasks).

Quoted (agents.yaml L8, goal clause 4):

```text
DO NOT provide examples of how to fix the issues or recommend other tools to use.
```

### 1.2 `config/tasks.yaml` — single task `syntax_review_task` (19 lines)

Structure: `description` = use `markdown_validation_tool` to review the file(s) at `{filename}` (L3); pass only the file path (L4); an explicit call-format example (`Action: markdown_validation_tool` / `Action Input: {filename}`, L5–8); summarize the tool results into "a list of changes the developer should make to the document" (L10–11); three prohibition/criticality clauses (L12–14, quoted below); a tool-skip escape clause (L16–17, quoted below). `expected_output` (L18–19): a list of changes the developer should make to the document based on the markdown validation results.

Quoted (tasks.yaml L12, L14, L16–17):

```text
DO NOT recommend ways to update the document.
It is critical to your task to only respond with a list of changes.
If you already know the answer or if you do not need to use a tool, 
return it as your Final Answer.
```

### 1.3 `tools/markdownTools.py` — tool definition (54 lines)

LangChain `@tool("markdown_validation_tool")` on `markdown_validation_tool(file_path: str) -> str` (L6–7). Description = docstring. Quoted (L9):

```text
A tool to review files for markdown syntax errors.
```

Behavior outline: `os.path.exists` guard returns an error string for a missing path (L19–20); `PyMarkdownApi().scan_path(...)` performs the scan (L24); `format_scan_result` returns either "No markdown validation issues found." or one `File: … Line: … Rule: …` line per scan failure (L33–54). **No static JSON Schema literal exists** — the inputSchema is generated at runtime by LangChain from the function signature (same environment fact as the gpt-researcher sample).

### 1.4 `crew.py` / `main.py` — no logic artifacts

`crew.py` (36 lines): `@CrewBase` class binding the two YAML configs; `Agent(config=..., tools=[markdown_validation_tool], allow_delegation=False)`; one task bound to the agent; `Crew(process=Process.sequential)`. `main.py` (75 lines): builds a `ChatOpenAI` LLM (`gpt-4o-mini` default, temperature 0.1), reads `filename` from `sys.argv[1]`, raises `ValueError` when absent, kicks off the crew, prints the result.

## Part 2 — Inspection Results

### Stage A-1 — System Prompt (QD-P)

#### Tier determination: **L2 Multi-turn Interactive**

Basis (prompt-checklist §3.1, ≥ 2 criteria): 1 tool invocation (within the 1–3 band) ✓; simple workflow ≤ 5 steps (single task: scan → summarize) ✓; limited state management (single pass, no retained state) ✓; multi-turn dialogue ✗. Three criteria satisfied → L2; the L2 minimum set (18 P0 items, = L1's 8 + 10) applies.

The inspected surface is the **composed prompt** (agents.yaml + tasks.yaml as assembled by CrewAI); verdicts judge that aggregate surface.

#### L2 minimum set — 18 P0 items

| ID | V | Evidence (verbatim, short) / basis |
|---|---|---|
| **QD-P-1.1.1 Direct Contradiction** | **FAIL** | The goal mandates "a summary with actionable tasks to address the validation results … handing it to a developer to fix the issues" (agents.yaml L6–7) while the task prohibits "DO NOT recommend ways to update the document" and requires "only … a list of changes" (tasks.yaml L12–14) — and the task itself first demands "a list of changes the developer should make" (L10–11). Mutually exclusive directives on the same output within one composed context |
| QD-P-1.1.3 Example-Rule Contradiction | PASS | The single call-format example (tasks.yaml L5–8, `Action Input: {filename}`) matches its own rule "pass only the file path" (L4) |
| QD-P-1.2.1 Role-Responsibility Mismatch | PASS | Backstory "expert business analyst and software QA specialist" (agents.yaml L10) supports the lint-review responsibility; the "Requirements Manager" title is odd but not responsibility-blocking |
| QD-P-1.2.3 Constraint-Responsibility Mismatch | PASS | The prohibitions (no fix examples, no content changes, no other tools) bound but do not prohibit the core list-changes responsibility |
| QD-P-1.5.1 Responsibilities Support Objective | PASS | Scan → summarize responsibilities support the "detailed list of the markdown linting results" objective |
| QD-P-2.2.1 Undeclared Input Source | PASS | Source declared: "the file(s) at this path: {filename}" (tasks.yaml L3) — a user-supplied path, bound from `sys.argv[1]` in main.py |
| **QD-P-2.3.4 Missing Security/Privacy Filtering** | **FAIL** | No sensitive-data filtering, privacy handling, or security output constraint anywhere in the YAML pair; arbitrary local file content flows into the model context and back to console output |
| **QD-P-2.5.2 Missing Security Boundary Constraints** | **FAIL** | No prohibited-operation or access boundary; the agent may point the tool at ANY local path with no boundary statement in either artifact |
| **QD-P-1.3.3 Undefined Boundaries** | **FAIL** | Authorization scope (which paths/directories are in scope), prohibition scope, and handoff conditions are all undefined |
| QD-P-1.5.2 Resources Support Workflow | PASS | The sole workflow step (call the tool) has its resource declared by name (tasks.yaml L3–7) |
| **QD-P-1.6.1 Critical Decision Word Vagueness** | **FAIL** | "If you already know the answer or if you do not need to use a tool" (tasks.yaml L16–17) defines a tool-skip trigger with no criteria — for a deterministic file-scan task this licenses returning fabricated lint results as "Final Answer" |
| **QD-P-2.2.2 Unconstrained Input Format** | **FAIL** | `{filename}` carries no format constraint (absolute/relative, extension, size) and no encoding or size limit is declared in prompt text |
| QD-P-2.2.3 Required/Optional Not Distinguished | PASS | Single input `{filename}`, obviously required; no optional parameters exist — distinction morphology trivial, basis recorded |
| **QD-P-2.2.4 Undefined Missing-Input Handling** | **FAIL** | No model-side behavior is defined for a missing/invalid filename: the `ValueError` lives in main.py code (invisible to the model) and the tool's "Error: The provided file path does not exist." string has no prompt-level handling instruction |
| QD-P-2.3.1 Undefined Output Format | PASS | Output format declared via `expected_output`: "A list of changes the developer should make to the document…" (tasks.yaml L18–19); the consumer is human console output |
| QD-P-2.3.2 Incomplete Output Schema | PASS | The output contract is the list itself; no downstream machine parser requires a field-level schema — morphology minimal, basis recorded |
| QD-P-2.4.2 Undeclared Resources/Tools | PASS | `markdown_validation_tool` declared by name in the task (L3, L7) |
| **QD-P-2.4.3 Missing Tool Invocation Specification** | **FAIL** | Parameter and call-format specification exists (L4–8), but failure handling is undefined: tool error strings (e.g. path-not-exists) have no specified agent behavior |

**Stage A-1 totals: 8 P0 FAIL · 10 PASS (of the 18-item L2 minimum P0 set).** P0 items failed once each: 1.1.1, 1.3.3, 1.6.1, 2.2.2, 2.2.4, 2.3.4, 2.4.3, 2.5.2.

### Stage A-2 — Tool Schema (QD-T)

#### Tier determination: `markdown_validation_tool` = **L1 Low Risk**

Basis (tool-checklist §3.1): data-read only, no state change, repeatable, no side effects; failure consequence = scan failure only. (The tool reads a user-specified local path — the arbitrary-path exposure is surfaced prompt-side at QD-P-2.5.2 / QD-P-2.3.4.)

#### L1 minimum set — 7 items (mechanical verdicts against the static artifact; runtime schema is LangChain-generated)

| ID | V | Level | Evidence / basis |
|---|---|---|---|
| QD-T-1.1 Base Field Missing | PASS | P0 | `name` set explicitly in `@tool("markdown_validation_tool")` (L6); description = docstring (L9); inputSchema generated from `file_path: str` (L7) — all three base fields deterministically present |
| QD-T-1.2 Required Field Inconsistency | PASS | P0 | Sole parameter `file_path` has no default → required; single-property schema, no mismatch possible |
| QD-T-1.3 Invalid Enum Constraints | N/A | — | No enum-valued parameter exists (determination basis recorded) |
| QD-T-1.4 Uncontrolled additionalProperties | **FAIL** | P1 | No static inputSchema text declares `additionalProperties`; the generated object schema's behavior is framework-version-dependent and unverifiable from the artifact (markdownTools.py L6–16) |
| QD-T-2.1 String Without Length Constraint | **FAIL** | P2 | `file_path: str` (L7) with docstring only — no `maxLength`/`minLength` |
| QD-T-2.3 Number Without Boundary | N/A | — | No number-type parameter |
| QD-T-4.1 Insufficient Description Quality | PASS | P2 | Docstring states purpose, parameter, and return semantics ("A tool to review files for markdown syntax errors.", L9) — adequate for L1 |

**Stage A-2 totals: 0 P0 · 1 P1 (QD-T-1.4) · 1 P2 (QD-T-2.1) · 3 PASS · 2 N/A.**

#### Mode decision

Prompt Stage A-1 carries 8 unfixed P0 findings → **Mode 2 (P0 blocking)** per SKILL.md §5 and the cross-checklist entry precondition ("Single-artifact inspection has passed, and no undisposed P0 defects remain"). Downstream stages are not executed.

### Stage B — Cross-artifact inspection (QD-PS / QD-PT / QD-ST)

Not executed (status board). Applicability map for the re-run: **QD-PT applicable** — the task prompt directs tool use against a LangChain-generated schema; QD-PT-2.1/2.2/2.4 are the candidate P0 items. **QD-PS and QD-ST N/A** — no Skill-definition artifact exists; recorded as determination basis, not FAIL.

### Stage C — Gate-0

Not executed (status board). At re-run, G0-1 is known-unsatisfied (8 prompt P0); G0-3 (locatable responsibility-boundary statements) and G0-4 (per-field Tool Schema completeness) also have open evidence (no boundary statements; no static schema text), but Gate-0 does not produce numbers and is not itself a FAIL.

### Stage D — Permission proportionality (QD-PM, Quick Mode)

Not executed (status board). Two independent reasons: (1) Mode 2 — upstream P0 unfixed; (2) Permission quick mode requires the full artifact set (Prompt + Skill + all Tool Schemas), and no Skill artifact exists → "incomplete artifact set".

### Stage E — Impact outlook

Not executed in this blocked run (Mode 2 stops after Stage A). Candidate AS-*/FM-* Impact Cards for the 8 prompt P0 + 2 tool findings will be produced, in candidate-only language with strength labeled separately from severity, on the unblocked re-run — or as an explicitly advisory-only pass on request. Risk Explicit/Implicit subsets were not run in either case.

### Status board

```text
Stage A (Single-artifact):  Executed — Prompt QD-P (L2, 18-item set: 8 P0 FAIL, 10 PASS) and Tool QD-T (markdown_validation_tool L1: 0 P0, 1 P1, 1 P2, 3 PASS, 2 N/A); no Skill artifact exists
Stage B (Cross):            Not Executed — not executed because upstream P0 findings are unfixed (QD-PT applicable at re-run; QD-PS/QD-ST N/A — no Skill artifact)
Stage C (Gate-0):           Not Executed — not executed because upstream P0 findings are unfixed
Stage D (Permission QD-PM): Not Executed — not executed because upstream P0 findings are unfixed; additionally "incomplete artifact set" (no Skill artifact)
Stage E (Impact outlook):   Not Executed — not executed because upstream P0 findings are unfixed
```

**Inspector scope reminder:** detect-only — no fixed prompts/schemas were generated; these static findings say nothing about Risk (Explicit/Implicit) or Quality outcomes, and a future Permission quick-mode pass validates declared proportionality only — not IAM/PEP/runtime enforcement.
