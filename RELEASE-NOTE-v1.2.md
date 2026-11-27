# SanityOps Framework v1.2

**Release Date**: November 2026
**Release Tag**: `v1.2.0`
**License**: CC BY-SA 4.0 (Framework specification) · Apache 2.0 (Inspect CLI)

> A Relevance mapping correction release. SanityOps v1.2 corrects two normative errors in the Relevance mapping specification and aligns its record contracts, examples, and scope statement with Core and Permission.

---

## Versioning

- **`v1.2.0`** is the SemVer tag for this release, tagging the framework snapshot.
- The document version `v1.2` applies only to `framework/relevance.md`; the other ten normative documents remain at `v1.1`.
- The Framework specification and the Inspector CLI are **versioned independently**. Only the Framework carries the `v1.2.0` label here; the CLI follows its own version line in [`sanityops-org/sanityops-cli`](https://github.com/sanityops-org/sanityops-cli).
- `v1.0.0`, `v1.1.0`, and `v1.1.1` remain available under their original tags.

---

## What Changed Since v1.1 (incl. the v1.1.1 errata)

### Relevance (framework/relevance.md)

Two normative corrections and a set of record-contract / consistency alignments.

**Normative corrections**

- **§5.3 Mapping Progress Status** — corrected an instruction that said a failed mapping should mark the source Finding `invalid`. A failed mapping now sets the mapping review status to `rejected`, or records the mapping strength as `not_applicable`, without changing the source Finding. The source Finding is only marked `invalid` when it is itself confirmed on review to be a false positive or not applicable, per Core §5.3.
- **A.5 Permission Defect Mapping (QD-PM-6.1~6.7)** — corrected the per-item Applicability cell to match `inspect/permission.md`: 6.1/6.5 apply at all levels; 6.2/6.4 require `OR-L2+`; 6.3 requires `OR-L3`; 6.6 requires `AC-L2+`; 6.7 requires regulated data.

**Record-contract alignment with Core**

- **§4.6 Linked Defect Chain Recording** — the record now references the minimum requirements of Core §7.5.2; added `evidence_level` and `remediation_priority` fields; `members` now records member Findings.
- **§5.4.2 Risk Acceptance Limitations** — now references Core §9.3–§9.4 for the complete Exception Record.
- **E.2 Defect Chain Record (YAML)** — example aligned to Core §7.5.2: member `finding_id` / artifact / version, `chain_status`, `required_conditions`, `evidence_level`, and `remediation_priority` keyed by Finding ID.

**Consistency and presentation**

- **§3.6 Quality Regression Rules** — added the CH-L minimum re-inspection and regression reference (Core §8.3–§8.4) for P2 findings not listed separately.
- **§0.2.1 In Scope** — scope statement now lists multi-Skill / multi-Tool circular-call relationships and QD-PM responsibility–permission proportionality mapping.
- **E.3 API Return Example** — added a note that the JSON is the impact-mapping projection of a Finding, not a complete Finding Record; normalized the example `finding_id` to the `F-<organization>-<unique-id>` format.
- **Table of Contents** — added the missing A.5 entry and an in-page anchor for the A.5 section.

---

## Metadata

- `CITATION.cff`, `package.json`, and `.zenodo.json` are unified to `1.2.0` (previously `1.1.1` / `1.1.0` / `1.1.0`; the mismatch was a residual from the v1.1.1 errata, which advanced only `CITATION.cff`).

---

## Errata / Notes

- `inspect/skill.md` §10.4 received a citation-only fix: the "Implicit B/C must not close the static defect" rule now cites `core.md §4.8; relevance.md §2.4.1` (previously referenced the repo-internal `AGENTS.md`). The rule text and the document version `v1.1` are unchanged.
- All other normative documents remain at `v1.1`.
- No `QD` rules, severities, thresholds, or Gates were added, removed, or modified by this release.
