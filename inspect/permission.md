# SanityOps Framework

# Inspect Permission Governance Specification

(Permission Baseline Domain)

---

**Version**: v1.1

**Release Date**: September 2026

**Maintained by**: SanityOps Inspect Working Group

**License**: CC BY-SA 4.0

---

> **Note:**
>
> Although the Permission subset (Inspect Permission Governance Specification, Permission Baseline Domain) has already reached a mature version (v1.1), it has not yet been integrated with the other SanityOps subsets. Its official release is therefore deferred and will be released together with SanityOps Framework v2.0.

---

## Preface

### 0.1 Positioning and Scope

#### 0.1.1 Position of This Subset Within the Framework

The Inspect Permission Governance Specification (Permission Baseline Domain) (prefix `QD-PM`) is the **fifth subset of the Inspect dimension** in the SanityOps Framework, alongside existing Prompt (`QD-P`), Skill (`QD-S`), Tool (`QD-T`), and Cross (`QD-PS` / `QD-PT` / `QD-ST`).

The other four subsets answer **"whether Logic Artifacts are written correctly and consistent with each other"**; this subset answers a separate question:

> **Whether the authority granted to this Agent is proportionate to the responsibilities assigned to it.**

##### 0.1.1.0 Significance for Enterprise-Level Implementation

In addition to serving as a static inspection specification for Inspect, this subset provides strong guidance for **enterprise users establishing AI service permission management systems, policies, and platforms**: it extracts permissions from "a scattered side aspect of Artifacts" into a **Permission Baseline Domain** that can be independently executed, concluded, and integrated with downstream systems (see 1.5, Appendix E). Its outputs—including responsibility-permission proportionality determinations, permission inventories, and their business purpose descriptions—can serve as **direct inputs** for enterprises to formulate least-privilege policies, approval and audit workflows, and IAM / PEP / runtime monitoring platforms (see 0.1.4 Downstream Integration Interface Description). Enterprises that use this subset as the kernel to build permission management systems and governance platforms are advised to follow a phased roadmap of "static extraction and determination → declaration-grant deviation detection → runtime monitoring and aggregated governance," and to elevate the control granularity of high-risk permissions (`OR-L3`) from the operation level to the permission-item level.

> **Limitation Note**: The guidance in this subsection is positioned solely as "providing a usable specification kernel and connection interfaces." It does not promise, nor replace, the enterprise's own IAM policy implementation, runtime execution, and monitoring, or other downstream capabilities (see 0.1.4). Any interpretation of this subset's PASS conclusion as "runtime permission security" constitutes misuse.

#### 0.1.2 Industry Background

The rationale for elevating permissions from "a side aspect checked incidentally" to "an independent inspection subset" is not internal structural aesthetics, but external risk taxonomy and the governance needs of the framework itself:

- OWASP lists **Excessive Agency** as a standalone risk item in its Generative AI risk list, noting that its root causes can be categorized into three types: excessive functionality, excessive permissions, and excessive autonomy [1]. The inspection objects of this subset overlap significantly with "excessive permissions."
- The existence of this risk item does not depend on any statistical baseline: as long as an Agent's permission set could, at runtime, be combined by the LLM into a call path outside its responsibilities, "permission proportionality" must be governed as an independent object.

> **Limitation Note**: This section only cites publicly retrievable risk taxonomy entries. It does not cite any research conclusions or statistical figures that cannot be sourced, nor does it derive any Check Item thresholds or scoring parameters from them.

#### 0.1.3 Inspection Objects

The inspection objects of this subset are fully consistent with other Inspect subsets and remain **Logic Artifacts**:

| Artifact      | Parts Serving as Permission Evidence                                      |
| ------------- | ------------------------------------------------------------------------- |
| System Prompt | Role definition, responsibility boundary statements, prohibitions, approval and confirmation requirements |
| Skill         | Capability declarations, allowed operation scopes, permission boundary declarations, delegation relationships |
| Tool Schema   | `name`, `description`, parameter definitions and constraints, operation semantics (read/write/delete/external send) |

#### 0.1.4 Out of Scope

Following Inspect's existing scope division principles—runtime behavior belongs to the Risk subset, and infrastructure configuration belongs to the deployment layer—this subset additionally specifies the following exclusions:

| Out-of-Scope Item                | Belongs To          | Description                                                                 |
| -------------------------------- | ------------------- | --------------------------------------------------------------------------- |
| Actual policy configuration in IAM / IdP | Deployment Layer    | This subset inspects "authority declared in Logic Artifacts," not "permissions actually granted by the platform" |
| Runtime permission enforcement (PEP/PDP)   | Runtime Execution Layer | Static inspection does not verify whether enforcement points actually intercept |
| Runtime permission usage monitoring and anomaly detection | Risk Subset / Observability Layer | Belongs to behavioral evidence, not configuration evidence |
| Token lifecycle, key rotation engineering implementation | Deployment Layer    | This subset only inspects whether corresponding constraints are **declared** in Artifacts |

> **Boundary Between "In-Artifact Declaration" and "Platform Actual Configuration"**: This subset distinguishes between two types of authorization facts—
> - **In-Artifact Declaration (within this subset)**: Text or configuration delivered alongside the Artifact that declares credentials or authorization scopes, such as credential fields in Tool Schema, `allowed_operations` in Skill, OAuth scopes / service accounts / accessible directories declared in the Agent manifest. This constitutes the **Channel A** of §2.2.2;
> - **Platform Actual Configuration (deployment layer)**: Real, effective policy bindings and runtime grants in IAM / IdP. This subset does not read or verify this layer.
>
> When an Artifact does not declare a credential scope, this subset shall not attempt to complement it by probing the runtime environment; such cases are handled under "incomplete permission set" per 4.8 / 6.5.

> **Downstream Integration Interface Description**: The above exclusions and this subset form an upstream-downstream relationship. The outputs of Permission (responsibility-permission proportionality determination, permission inventory and business purpose descriptions) can serve as **inputs** for IAM policy design, PEP rule generation, and runtime monitoring baselines. However, SanityOps does not promise, nor replace, these downstream capabilities. Any interpretation of this subset's PASS conclusion as "runtime permission security" constitutes misuse.

---

#### 0.1.5 Inspection Order and Prerequisites

##### 0.1.5.1 Four-Step Order

Permission inspection **must not** be executed in parallel with other Inspect subsets; it must be placed last in the established sequence:

```
Step 1  Single-Artifact Inspection (QD-P / QD-S / QD-T)  
        → Fix all P0  
Step 2  Cross-Artifact Inspection (QD-PS / QD-PT / QD-ST)  
        → Fix all P0  
Step 3  Gate-0 Pre-check  
Step 4  Permission Inspection (QD-PM)  
```

##### 0.1.5.2 Rationale for the Order

Permission determination is a **semantic determination**: it requires the determiner to first know "what are the responsibility boundaries of this Agent," and then assess "whether the authority it possesses exceeds those boundaries." This determination chain depends on a **trusted Responsibility Baseline**.

If the Responsibility Baseline itself contains Defects—contradictory responsibility scope statements in the Prompt, inconsistent capability declarations between Skill and Prompt, Tool `description` that cannot determine true operation semantics—then proportionality determination loses its reference object. In this situation, having an LLM perform the determination produces not "inspection results," but "reasoning noise on false premises." Therefore, the ordering constraint is a **structural requirement** of this subset, not a process recommendation.

##### 0.1.5.3 Gate-0 Prerequisites

Step 3 verifies the following four conditions; all must be satisfied to proceed to Step 4:

| ID       | Prerequisite                                                   | Verification Method           |
| -------- | -------------------------------------------------------------- | ----------------------------- |
| **G0-1** | No unrepaired P0 in Single-Artifact Inspection (QD-P / QD-S / QD-T) | Read upstream inspection conclusions       |
| **G0-2** | No unrepaired P0 in Cross-Artifact Inspection (QD-PS / QD-PT / QD-ST) | Read upstream inspection conclusions       |
| **G0-3** | Responsibility boundary statements exist and can be located to specific positions in Artifacts | Positional verification, locatable references required |
| **G0-4** | For each Tool Schema, `name`, `description`, and parameter descriptions are complete and sufficient to determine operation semantics | Completeness verification          |

##### 0.1.5.4 Handling Gate-0 Non-Satisfaction

When any Gate-0 condition is not satisfied:

- Permission **does not produce a Defect/Finding list**;
- Permission **does not produce a score**;
- Permission outputs an "assessment cannot be effectively executed" signal upstream, accompanied by the specific unsatisfied condition ID (G0-1 ~ G0-4) and blocking reason.

This signal is **aggregated by the Core layer** and reflected in the overall evaluation conclusion as the existing `ERROR` state.

> **Hierarchical Expression Convention**: `ERROR` is a state description by the Core layer for the overall evaluation process, not a determination result of the subset. Therefore, it must not be written as "Permission determined as ERROR"; it should be written as "Permission was not executed due to unmet Gate-0 conditions, aggregated by Core as `ERROR`." Likewise, this subset **does not use** self-coined state terms such as `BLOCKED`.

---

### 0.2 Terminology and Numbering System

#### 0.2.1 Numbering Format

```
QD-PM-<Group Number>.<Sequence Number>  

Examples:  
  QD-PM-1.1   Permission Alignment Group, Item 1  
  QD-PM-5.3   Permission Boundary Group, Item 3  
```

The prefix `QD-PM` is isomorphic with existing Inspect subset prefixes `QD-P` / `QD-S` / `QD-T` / `QD-PS` / `QD-PT` / `QD-ST`.

#### 0.2.2 Six Inspection Groups

| Group # | Group Name | Core Question                                             |
| ----- | ----- | ------------------------------------------------ |
| **1** | Permission Alignment | Do the granted permissions correspond to real responsibilities? Are there unrelated or missing permissions?                     |
| **2** | Permission Scope | Is the resource, data, and environment scope covered by permissions restricted to what responsibilities require?                       |
| **3** | Permission Granularity | Are permissions divided into appropriate granularity? Are coarse-grained permissions used in place of precise authorization?                    |
| **4** | Permission Propagation | Are permissions correctly narrowed in the Prompt → Skill → Tool chain and multi-Agent delegation? |
| **5** | Permission Boundary | Are boundaries explicitly declared, susceptible to expansive interpretation, or replaced by isolation instead of authorization control?                  |
| **6** | Permission Auditability | Can the business purpose, decision basis, and operational traces of permissions be traced and audited?                      |

#### 0.2.3 Principles for Numbering and Level Determination

This subset adopts numbering and leveling isomorphic to existing SanityOps Inspect subsets, establishing the following three principles:

1. **No parallel numbering system is introduced**—Multi-dimensional numbering schemes overlapping with `QD-*` would create dual numbering for the same fact; this subset does not adopt them;
2. **No parallel severity vocabulary is introduced**—Classifications such as `CRITICAL / HIGH / MEDIUM / LOW` are incompatible with the framework's existing `P0 / P1 / P2` and would break scoring isomorphism if mixed; this subset does not adopt them;
3. **No out-of-scope items are promised**—Runtime isolation escape, token engineering implementation, etc., fall outside this subset's scope (see 0.1.4) and are not promised in the form of Check Items.

All risk insights of this subset are grouped autonomously according to the relational morphology of "alignment—scope—granularity—propagation—boundary—auditability" (see 13.4), and do not inherit numbering, terminology, or level vocabulary from any external scheme.

#### 0.2.4 Key Terms

| Term            | Definition                                                                 |
| ------------- | ------------------------------------------------------------------ |
| **Responsibility Baseline** | The extractable, locatable Agent responsibility boundary description derived from the System Prompt (and Skill declarations when necessary), serving as the sole reference for Proportionality determination |
| **Proportionality** | The matching relationship between the permission set and the Responsibility Baseline. Disproportionality includes two directions: Excessive Permission and Insufficient Permission                               |
| **Excessive Permission** | A permission for which the Responsibility Baseline cannot explain its business purpose, or whose scope exceeds what responsibilities require                                     |
| **Insufficient Permission** | An operation required by the Responsibility Baseline lacks the corresponding permission, causing the Agent to inevitably fail or inevitably bypass                                 |
| **INHERITED** | A marker state indicating that the issue at this location has already been logged by the Cross subset, and Permission does not score it again                        |

---

### 0.3 Version Information

| Item    | Value                                                          |
| ---- | ---------------------------------------------------------- |
| Document Name | SanityOps Framework — Inspect Permission Governance Specification (Permission Baseline Domain)        |
| Version   | v1.1                                                       |
| Dimension | Inspect                                                    |
| Numbering Prefix | `QD-PM`                                                    |
| Dependencies | Core v1.0 (leveling model, state terminology, evidence requirements); Inspect v1.0 (conventions, scoring isomorphism, Cross inspection relationships) |
| Execution Position | Fourth step of Inspect process, after Gate-0                                    |
| Status   | Iterative release (added Part II extraction layer, Appendix C walkthrough examples, Appendix D minimal rule set, and Appendix E interface schema)                                                       |

---

## Part I Permission Inspection Overview

### 1.1 Why Permissions Require Independent Inspection

The fundamental assumption of traditional permission governance is: **the permission consumer is a deterministic program**—with fixed code paths, the "granted permissions" largely align with "permissions actually used," allowing control points to be placed on the resource side.

Agents break this assumption. Agent behavior is determined by LLMs at runtime; the same set of permissions can be combined into completely different invocation paths depending on context. This leads to two consequences:

1. **Granting equals risk exposure**: Any permission granted but not required by the responsibility is not an "idle permission," but a real path that the LLM may choose at any time.
2. **Issues originate at the configuration layer**: Permission defects are formed when the Agent's Logic Artifacts are written; runtime controls can only intercept the portion expressible by rules.

Therefore, permissions must be inspected **at the configuration layer, statically**—this is precisely the scope of SanityOps Inspect.

### 1.2 Basic Determination Structure of Inspection

For each permission, this subset requires one of three determinations:

| Determination | Meaning | Disposition |
| ------ | ------------------- | ----------- |
| **Proportional** | Permission can be explained by the responsibility baseline, and scope does not exceed requirements | Pass |
| **Excessive** | Permission cannot be explained by the responsibility baseline, or scope exceeds requirements | Narrow or Remove |
| **Insufficient** | Operations required by responsibility baseline have no corresponding permission | Supplement authorization or narrow responsibility declaration |

"Excessive" and "Insufficient" are **two directions of the same proportionality determination**; neither can be checked alone. Checking only for excess pushes the Agent toward "inevitable failure or inevitable circumvention"; checking only for insufficiency is equivalent to abandoning the principle of least privilege.

> **Construction Method Guide**: The construction methods for inspection objects (permission items and responsibility baselines) are found in Part II (Extraction Layer).

### 1.3 Inspection Inputs and Outputs

**Inputs**:

- Three types of Logic Artifacts (System Prompt, Skill, Tool Schema);
- Inspection conclusions from upstream Step 1 / Step 2 (used for Gate-0);
- The Agent's AC-L and OR-L classifications.

**Outputs**:

- Defect list (number, location, determination basis, severity level);
- Permission-Responsibility mapping table (source of responsibility baseline for each permission, or marked as unexplainable);
- Quantitative score (see Part XII for details);
- Permission baseline recommendations for downstream IAM / PEP (non-mandatory output).

### 1.4 Classification Binding

This subset uses the two classification models from Core with **separation of concerns**. According to Core's definitions, AC-L describes the Agent's technical form and collaboration complexity, used to determine applicable Inspect depth and scope, and does not directly indicate data sensitivity or security severity; OR-L describes permissions, side effects, irreversibility, and impact scope, used to determine the intensity of confirmation, approval, audit, and least-privilege control requirements. The two are clearly distinguished in Core's classification model and do not represent each other.

Based on this, this subset establishes two binding rules:

> **Rule 1 (Applicability determined by AC-L)**  
> Whether a check item **is applicable** to this evaluation depends on whether the Agent's AC-L introduces the corresponding structural form.  
> Example: Check items for multi-Agent delegation in the permission propagation group are only applicable under AC-L4; AC-L1 ~ AC-L3 do not have this form, so corresponding check items are marked N/A.  
> **Supplement**: Check items marked as "conditional" in 9.3.3 are the only supplementary channel—their form availability is determined by OR-L or artifact facts (e.g., time constraint items require "time-period semantics or OR-L3"). Here OR-L only determines whether the form **exists**, not its severity; once applicability is confirmed, severity levels are still determined by Rule 2.

> **Rule 2 (Severity determined by OR-L)**  
> The **severity level** (P0 / P1 / P2) of a defect depends on the OR-L of the operation corresponding to that permission.  
> Example: For the same "permission scope exceeds responsibility requirements," when applied to read-only queries (OR-L1), it is classified as P1; when applied to production environment writes or data exfiltration (OR-L3), it is classified as P0.

The significance of this separation is: **applicability of check items is a structural fact; severity of defects is a risk fact**. Confusing the two produces two types of systematic errors.

---

### 1.5 Relationship with Other Inspect Subsets

#### 1.5.1 Rationale: Why Permissions Deserve Extraction as an Independent Subset

Existing Inspect subsets already contain scattered permission-related check items. Therefore, a question that must be answered directly: **Since these check items already exist, why create a new subset?**

The answer is: In enterprise multi-Agent environments, fine-grained permission management has evolved from "one aspect of logical consistency" to an **independent security governance objective**. When an organization runs dozens to hundreds of Agents in parallel, delegating tasks to each other and sharing Tools and data channels, what governance needs to answer is no longer just "are this Agent's artifacts written consistently," but:

- What powers does this Agent actually possess?
- Which responsibility does each power correspond to?
- Do these powers combined constitute aggregated risks not visible within a single artifact?
- When it delegates tasks, are powers narrowed or amplified?

These questions **cannot be read from any single artifact or single artifact pair**; inspection must be reorganized with "permission" itself as the subject.

#### 1.5.2 Causes of Overlap

Permission and Cross have superficial overlap in check item names. This overlap is not redundancy but stems from **fundamentally different ways of asking questions**:

| | Cross Subset | Permission Subset |
| ------------ | --------------------------- | ------------------------------- |
| Core Question | **Whether statements are consistent** (consistency) | **Whether power is proportional** (proportionality) |
| Determination Basis | Artifact A statement vs Artifact B statement | Permission set vs Responsibility baseline |
| Typical Conclusion | "Skill-declared operations exceed Prompt authorization scope" | "Although this operation is authorized by Prompt, the responsibility baseline cannot explain its necessity" |
| Cases where both consistent but problems remain | Cannot detect | Can detect (artifacts consistently grant excessive permissions) |

The key is in the last row: **Cross checks will pass when all artifacts are "consistently written wrong."**

#### 1.5.3 Significance of Overlap

Retaining this overlap is **intentional design**, for three reasons:

1. **Defense in depth**: Permission is a secondary verification of Cross remediation actions.
2. **Different determination bases**: Even when checking the same location, Cross bases its determination on another artifact's statement, while Permission bases its on the responsibility baseline.
3. **Different output destinations**: Cross outputs serve artifact revision itself; Permission outputs also serve downstream permission baseline design and audit trails.

#### 1.5.4 Handling Differences for Overlapping Hits

When the same location is hit by both Cross and Permission, handle according to the following rules:

| Scenario | Handling |
| --------------------------- | -------------------------------------------------------------------- |
| Same location already created as Cross item and not yet fixed | **Cross takes priority for qualitative remediation**. Permission marks this item as INHERITED, records it in the list for traceability, but **does not double-count** |
| Cross remediation complete, proportionality consequently holds | Permission closes this item, does not create |
| Cross remediation complete, but proportionality **still does not hold** | Permission **independently creates item**, re-classifies according to this subset's numbering and determination basis (based on OR-L), counts normally |
| Only Permission hits (Cross determined consistent) | Permission independently creates item, counts normally |

> **Scoring Independence Principle**: Permission scores are **mutually independent** from other Inspect subset scores and must not be weighted and combined into a single composite score.

---

### 1.6 Summary of This Part

| Key Point | Description |
| --------------- | -------------------------------------------------- |
| **Subset Positioning** | Fifth subset of Inspect, numbered QD-PM, inspection objects remain Logic Artifacts |
| **Core Question** | Whether power and responsibility are proportional (including both excessive and insufficient directions) |
| **Execution Position** | Last in four-stage sequence, executes after Gate-0 passes |
| **When Prerequisites Not Met** | No list, no score, outputs "assessment cannot be effectively executed" signal, aggregated by Core as ERROR |
| **Classification Binding** | Applicability determined by AC-L (mark N/A if not applicable; "conditional" items triggered by artifact facts or OR-L); severity levels determined by OR-L |
| **Inspection Groups** | Six groups: Permission Alignment / Scope / Granularity / Propagation / Boundary / Auditability |
| **Relationship with Cross** | Different ways of asking (consistency vs proportionality); overlap is defense in depth; overlapping hits marked INHERITED without double-counting |
| **Boundary Discipline** | IAM deployment, runtime execution, and monitoring are downstream integration interfaces, not capability commitments of this framework |

---
## Part II Extraction Layer — Construction of Permission Items and Responsibility Baselines

**Positioning**: Located after Gate-0 and before QD-PM-1~6 determinations, covering **Step 5 (Permission Set Enumeration)** and **Step 6 (Responsibility Baseline Extraction)** of the process. The outputs are three tables: **Baseline Table**, **Permission Item Table**, and **Mapping Table Skeleton**.

The determination layer does not create new tables; it only attaches IDs to the mapping table. This discipline is the sole interface between the extraction layer and the determination layer.

**Key Property — Reentrancy**: The extraction layer is not a one-time pre-layer. After Group 3 (granularity) repairs change the permission item set, **Groups 1 and 2 must be re-run** on the new set; the two blocking points (3.3, 4.8) also re-enter at **Step 5**. Therefore, the extraction layer will be executed at least twice and must maintain identifier stability after re-entry (see §2.4.5).

**Ordering of Step 5 and Step 6**: There is no data dependency between them — enumeration is a mechanical collection from the Tool/credential side, while baselines are constructed as a reference frame from the Prompt side. Determination occurs at Step 7. Therefore, the order of these two steps does not affect the conclusion; the numbering sequence does not constitute a logical sequence. The only requirement is: **Before entering Step 7, both tables must be complete**.

---

### 2.0 Output Model (All Three Tables Delivered at Once)

#### 2.0.1 Table 1 Baseline Table

| Baseline ID | Class | Original Text Location | Normalized Expression | Constrained By | Mark |
| ----------- | ----- | ---------------------- | --------------------- | -------------- | ---- |
| D-01        | D     | §2 Sentence 1          | Read order status     | R-01           | —    |
| D-02        | D     | §3 Sentence 2          | Modify delivery address | R-01         | —    |
| D-03        | D     | §2 Sentence 3          | Write customer profile | —             | `DERIVED` |
| R-01        | R     | §1 Sentence 3          | Test environment only | —              | —    |
| C-01        | C     | §1 Sentence 1          | Serve East China customers | —           | —    |

#### 2.0.2 Table 2a Permission Item Core Table (Scope Four Axes)

| Permission Item ID | Channel | Operation Semantics | Resource Axis | Data Axis | Environment Axis | Condition Axis | Change Type |
| ------------------ | ------- | ------------------- | ------------- | --------- | ---------------- | -------------- | ----------- |

#### 2.0.3 Table 2b Permission Item I/O and Location Table

| Permission Item ID | Accepts Input | Produces Output | Prompt Layer | Skill Layer | Tool Layer |
| ------------------ | ------------- | --------------- | ------------ | ----------- | ---------- |

#### 2.0.4 Table 3 Mapping Table (Extraction Layer's Sole Deliverable)

With permission item ID as the primary key, one row strings together:

```
ID | Operation Semantics | Scope Four Axes | I/O | Three-Layer Location | Corresponding Baseline ID | Determination | Defect ID | Severity Level
```

The columns "Determination", "Defect ID", and "Severity Level" are filled by the determination layer; all other columns are filled by the extraction layer.

#### 2.0.5 Three Interface Disciplines

1. **Who builds the table is responsible for completeness** — the extraction layer is responsible for no missing rows; **who fills the column is responsible for correctness** — the determination layer is responsible for correct conclusions. Responsibilities do not cross.
2. **Extraction layer failures must manifest as a visible object in the table**, not as blanks outside the table. Subsequent mechanical validation (empty determination column in mapping table = hit) cannot catch skipped rows that are not in the table at all.
3. **The denominator unit is check items, not permission items** (see §2.3.5). The number of rows in the mapping table is unrelated to the denominator.

---

### 2.1 Baseline Filling Rules

#### 2.1.1 Three Classes of Statements Enter the Baseline

| Class | Characteristics | Examples |
| ----- | --------------- | ---------- |
| **D (Duty)** | What the Agent must do to **external systems** | [Query order status] |
| **R (Restriction)** | Explicit prohibitions or limitations | [Must not modify orders][Only operate in test environment] |
| **C (Context)** | Background settings defining the scope of affected objects | [You serve East China customers] |

**Not entering the baseline**: Tone requirements ("be polite"), output format requirements, role persona rhetoric ("you are a senior consultant"). These do not produce external operations and are unrelated to permissions.

**Class C must not swallow exemption expressions.** Expressions like [in emergency situations, modify first and report later] belong to **uncontrolled exemption** (5.7), entering only 5.7, **not the baseline**. If treated as Class C context, 5.7 loses its trigger source.

> Why D/R/C must be separated: Class D is the source of "should-have permissions", while R/C classes are the source of "should-have constraints". Once constraint classes are merged into a Class D, they lose their downstream comparison anchor. The reason cross-layer constraint disappearance (4.1) can be detected is precisely because Class R has independent IDs.

#### 2.1.2 Three Questions Per Sentence

For each sentence in the System Prompt, ask:

1. Does it require the Agent to touch anything outside the workpiece? No → discard.
2. What does it touch, what action does it perform? → Record as Class D, written as `verb + object`.
3. Does it impose restrictions on other sentences? → Record as Class R/C, and register **the constrained Class D ID(s)** (can be "all").

#### 2.1.3 Covering Verbs Must Be Expanded (Including `DERIVED` Constraints)

**Covering verbs**: maintain, manage, process, responsible for, synchronize, optimize, follow up, assist.

Rule: **Must not enter baseline as-is.** Two handling options:

- **Can be inferred downstream** — if Tool side only has `update_profile`, then [maintain customer profile] can be expanded to `write customer profile`;
- **Cannot be inferred** — record as `(action type undeterminable)`, routed per §2.5.

**Baselines obtained by reverse inference must be marked `DERIVED`, and only support "insufficient" direction determinations, never for exempting "excessive" permissions.**

> **Example**: [You are **responsible for** maintaining the accuracy of customer profiles, and **handle** problems promptly when discovered.]  
> On the surface, zero permission declaration, but actually implies write access. If taken into baseline as-is, the determination layer would default it as a read operation, and the actual delete permission existing on the Tool side would be judged as "commensurate" — a complete silent miss.  
> After expanding to `D-03 write customer profile (DERIVED)`, it can be used to discover "address modification mentioned in §3 has no corresponding permission" (insufficient direction); but **cannot** be used to justify `update_profile` itself as commensurate (excessive direction). Using permission set reverse-inferred baselines to exempt the permission set always yields "commensurate" — this is circular reasoning.

#### 2.1.4 Routing for Ambiguous Baselines

Gate-0's G0-3 only performs existence validation of "responsibility boundary statements **exist or not**", leaving judgment issues to QD-PM-1.4. Therefore:

> **"Exists but ambiguous" does not return to Gate-0; all are established as "baseline undeterminable" rows within the extraction layer, passing `UNRESOLVED` markers downstream.**

Reasons:

1. Gate-0 is not scored, does not produce lists; one return resets the entire report; while "one of three duties is ambiguous" should not invalidate the other two.
2. Ambiguity is a **local** fact; Gate-0 manages **global** admission, granularity mismatch.
3. After `UNRESOLVED` passes down, 1.4 has corresponding check items to catch it.

**Boundary**: After expansion, no Class D statements are valid (entire Prompt consists of covering verbs) → belongs to G0-3's "substantive absence", return to Gate-0. Criterion is **quantity**, not quality.

---

### 2.2 Permission Item Filling Rules

#### 2.2.1 Minimum Unit Criteria

> **One permission item = one operation semantics × one resource type. Scope four axes and I/O are its attributes, not new permission items.**

"Independently grantable" is the criterion: if two actions cannot be separately granted in a real authorization system, they are one item.

#### 2.2.2 Five Source Channels

Misses almost all come from "only scanned T channel".

| Channel | Source | Common Misses |
| ------- | ------ | ------------- |
| **T (Tool)** | Tool Schema, function by function | Basically none |
| **S (Skill)** | Capabilities declared by Skill but with no corresponding function on Tool side | Often missed |
| **X (External)** | MCP Server, external APIs, operations introduced by plugins | Very often missed |
| **G (Delegation)** | Operations delegated to sub-Agents | Very often missed |
| **A (Authorization)** | Credentials and authorization scope declared in the workpiece (Agent manifest / OAuth scope in Tool credential fields, API key scope, runtime account, mounted directories) | No one scans |

> **Default handling**: When a channel has no corresponding source in this Agent (e.g., no external protocols, no delegation, workpiece does not declare credentials), mark that channel as `N/A`, do not produce permission items, and do not require table filling.

> **Example (X channel)**: Skill declares connection to MCP Server `k8s-ops`.  
> Scanning only T channel, Tool Schema may only have `call_mcp(server, payload)`, looking like a normal line. In reality, `k8s-ops` behind it is a complete set of cluster write operations.  
> Rule: X channel requires **explicit listing of introduced operation lists** in the workpiece; if not listed → that branch's permission set is incomplete, record a set-level object (§2.2.5), not a `call_mcp` line.  
> **Boundary**: Only judge "whether it's written in the workpiece", not the actual policy on the external server side — that belongs to deployment layer, not extraction scope.

> **Example (A channel)**: An Agent's workpiece manifest declares its runtime account credential scope as `reports:write`, while Tool Schema only declares `read_report`.  
> Both are **declarations within the workpiece**, belonging to facts checkable by this subset. **The core action of A channel is difference verification with T channel**: when credential declaration is wider than tool declaration, it's a solid defect source (connects to 4.8, 6.7). Not scanning A channel, this line is never visible.  
> **Boundary (reiterating 0.1.4)**: A channel only reads credentials and authorization scope declared in the workpiece, not actual policy configurations in IAM/IdP; when workpiece does not declare credential scope, route per 4.8/6.5's "incomplete permission set", must not be filled by runtime detection.

#### 2.2.3 Field Values

| Field | Value | When Missing |
| ----- | ----- | ------------ |
| Channel | T / S / X / G / A | Required |
| Operation Semantics | read / write / delete / exfiltrate / execute | Undeterminable → `?` |
| Resource Axis | Which object instances can be acted upon | Not declared → `∅` |
| Data Axis | Which fields can be read/written | Not declared → `∅` |
| Environment Axis | In which environments can be executed | Not declared → `∅` |
| Condition Axis | Under what prerequisites can be executed | Not declared → `∅` |
| Accepts Input | Data domain consumed by this operation | Not declared → `∅` |
| Produces Output | Data domain produced by this operation | Not declared → `∅` |
| Location | Position in Prompt / Skill / Tool layers respectively | Required (§2.4.4) |

Four axes are taken from the scope group's dimension decomposition (resource / data / environment / condition).

> **Why I/O columns are necessary**: 1.6 requires severity rating based on combined achievable effects, not individual permissions. For combinations to be calculable, there must be connection points of "who produces, who consumes". A typical chain is "read + export + exfiltrate = data exfiltration chain".  
> Without I/O columns, "combined effects rated separately" cannot be grounded — combinations cannot be calculated, relying only on reviewers' intuition to pair. With I/O, determination rules become mechanical: **when A's output domain ∩ B's input domain ≠ ∅, A and B constitute combination candidates**.

#### 2.2.4 `∅` and `?` Must Be Separated

This is the pair most easily merged and least mergeable:

- **`∅`** = **Not written** in the workpiece for this scope limitation → points to "excessive scope" class defects.
- **`?`** = **Written but incomprehensible** in the workpiece → points to "unclear semantics" class defects.

> **Example**: `sync_records(source, target)`.  
> Operation semantics = `?` (is sync read or bidirectional write, unclear); Environment axis = `∅` (no environment field in parameters at all).  
> Both lead to completely different remediation actions: the former requires supplementary semantic explanation, the latter requires adding parameters or changing Tool design. Merging into one "unknown", remediation suggestions cannot be sent.

**Cross-reference**: `?` items do not participate in normal merging (§2.2.2), uniformly collected into "undeterminable group" as separate columns, otherwise the mapping table would be inflated by `?` rows.

#### 2.2.5 Parameterized Tools: The Third Form of Non-Closed Sets

`sql_query(sql)`, `http_request(url, method, body)`, `eval(expr)`, `shell(cmd)` and similar tools, as long as fields are complete, can pass existence validation; but their operation semantics and resource scope are **entirely determined by actual arguments**, which workpiece declarations cannot constrain.

| Trigger Condition | Classification |
| --------------- | -------------- |
| Operation objects determined by **actual arguments** | Non-closed set |

It parallels the other two forms:

1. Replacing list with identity ("has same permissions as operations engineer");
2. Open loading ("call required tools as needed");
3. **Operation objects determined by actual arguments** (this section).

**All three are set-level, follow §2.5's blocking point path, must not be downgraded to item-level `?`.** Treating it as "unclear semantics" systematically underestimates severity.

---

### 2.3 Merging and Splitting Rules

#### 2.3.1 Atomic Unit

**Operation semantics as the standard, resource type as the boundary; scope four axes and I/O are attributes.**

> **Prohibit over-splitting**: `get_order` has all four axes as `∅`. If split by each axis, the same fact would be repeatedly counted as defects in four check items. Correct approach: one permission item, four attribute cells all marked `∅`, with scope group's four check items reading different cells of the same row.

> **Prohibit under-merging**: `order_admin` one tool contains read, write, delete. If treated as "one item", R2's "take highest `OR-L` value among contained" would merge read/write/delete into one value, and 1.6's aggregation determination loses combination base. Correct approach: split into three items, each paired with baseline; the **combined effect** of the three is rated separately, not changing the determination of the three items themselves.

#### 2.3.2 Merge Criteria: All Four Same

1. Same operation semantics;
2. Same resource type;
3. Same scope four axes values (`∅` and `∅` considered same, `?` and `?` **considered different** — two incomprehensible things cannot be assumed to be the same);
4. At **same link layer level**.

#### 2.3.3 Cross-Layer Merging Prohibited

"Same" permissions appearing in Prompt layer, Skill layer, and Tool layer **are not merged into one row**, but merged into **one row with three cells**.

> **Why**: 4.1's identification method is "upstream has restriction, midstream none, downstream parameter has no carrier". This judgment requires three-layer values present simultaneously. Once cross-layer merged into one row, three cells become one, this defect is permanently missed — and silently, with no abnormality visible in the report.

| Permission Item ID | Operation Semantics | Prompt Layer | Skill Layer | Tool Layer |
| ------------------ | ------------------- | ------------ | ----------- | ---------- |
| P-003              | Write order record  | Environment limited: test (R-01) | Not mentioned | Parameter has no environment field |

Reading this row, the defect surfaces itself.

#### 2.3.4 Delegation Bilateral Merging Prohibited

Main Agent and sub-Agent permission items belong to two separate sets, even with identical operation semantics they are not merged. The core of delegation checking is "whether sub-side narrows relative to main-side", merging eliminates the comparison object.

#### 2.3.5 Denominator Discipline (And Correcting a Common Misstatement)

> Common claim: *Not deduplicating → inflated denominator → diluted score.* **This is wrong.**

Denominator is calculated by **check items**, not permission items: `W = 5×N_P0 + 3×N_P1 + 1×N_P2`, `N/A` and `INHERITED` excluded from denominator, and duplicate failures are absorbed at scoring step 6 by "deduplicate by ID, take highest level for that item". That is, **counting a few more permission items changes the denominator not at all.**

The real costs of insufficient deduplication are three others:

| Cost | Consequence |
| ---- | ----------- |
| **Rating base distortion** | When one permission covers multiple operations, take highest `OR-L` value; not split then read/write/delete merged into one value, 1.6's combination determination loses combination base |
| **Same check item repeatedly triggered** | Same fact recorded once in each group, defect list loses priority distinction |
| **Ratchet comparison misalignment** | Mapping table is mandatory output of ratchet comparison; row-to-row mismatch prevents judging whether repair occurred |

**Therefore: Deduplication must be completed before ID assignment** (§2.4.2's fingerprint depends on it), and row count changes caused by splitting must be explicitly recorded through "change type" (§2.4.3).

---

### 2.4 Identification and Change Tracking

#### 2.4.1 ID's Responsibility

ID is not numbering aesthetics, but making **defect → repair → re-check** three steps closed.

> **Example**: `notify_user` judged as irrelevant permission, report gives "suggest removal"; next round re-check, the tool is renamed to `send_notice`.  
> Without stable ID: re-check treats this as "a new permission", old defect "disappeared", report shows repair complete — actually nothing was repaired.  
> With stable ID: ID binds to operation semantics not function name, after renaming still hits same ID, ratchet judges as "not repaired".

#### 2.4.2 Fingerprint

```
Fingerprint = Channel + Operation Semantics Family
```

Re-check matches previous round's mapping table by fingerprint: match found → use previous round's ID; no match → assign new ID.

> **Fingerprint must only contain parts that shouldn't change during repair.**  
> `Resource type` **cannot enter fingerprint** — "excessive permission scope" most common repair is narrowing resource type; once in fingerprint, a successful repair would be judged as "old item disappeared + new item appeared".  
> Scope four axes similarly, most frequently repaired parts, none enter fingerprint.

#### 2.4.3 Change Type (Required)

| Value | Meaning |
| ----- | ------- |
| `NEW` | Did not exist in previous round |
| `SPLIT` | Split from one item into multiple |
| `MERGED` | Merged from multiple items into one |
| `NARROWED` | Scope narrowed |
| `REMOVED` | Disappeared in this round |
| `—` | No change |

> **Why only marking `NEW` is insufficient**: When splitting `order_admin` per §2.3.1, inevitably "old ID disappears, three new IDs appear". Without change type, ratchet would record a **successful granularity repair** as silent addition, repair recorded as degradation.

#### 2.4.4 Location Three Cells

| Layer | Value Form | Special Values |
| ----- | ---------- | -------------- |
| Prompt | Baseline ID (e.g., D-02 / R-01) | `Not mentioned` |
| Skill | Skill name + capability entry | `Not mentioned` / `No Skill layer` |
| Tool | Function name + parameter name | `No corresponding Tool` |

`Not mentioned` and `No Skill layer` must be distinguished: former means layer exists but not written, is a defect signal; latter means architecturally no such layer, does not constitute defect.

#### 2.4.5 Reentrancy Stability

Extraction layer will be re-run (3→1, 2 re-run; 3.3/4.8 re-enter Step 5). **Hard requirements of this section are only mandatory in multi-round mode (ratchet enabled)**; single-round check does not output "fingerprint" and "change type" fields (corresponding columns may be left empty). Hard requirements for multi-round re-entry:

1. **Fingerprint and ID must be stable across rounds** — after re-run, row numbers may change, ID cannot;
2. **Re-entry is not restart** — when re-entering, use this round's confirmed baselines/permission items as starting point, only re-extract changed parts;
3. **Pre-re-entry conclusions must be voided and marked** — partial conclusions already produced after blocking point hit must be marked "based on incomplete permission set", and voided after re-run;
4. **Change type must reflect changes caused by re-entry**, must not make a re-run look like a completely new check.

---

### 2.5 Extraction Failure Handling Summary Table

This is the most critical interface of the entire layer: it must simultaneously catch G0-3, G0-4, 3.3/4.8 blocking, 6.5 fallback, and overlap arbitration.

#### 2.5.1 Four-Level Routing (Mutually Exclusive and Exhaustive)

| Priority | Scope | Fact | Routing | Consequence |
| -------- | ----- | ---- | ------- | ----------- |
| 1 | **Global** | Workpiece missing / cannot parse / field form incomplete / baseline substantive absence | **Gate-0** (G0-3, G0-4) | No list, no score, Core summarizes as `ERROR` |
| 2 | **Set-level** | Permission set **itself non-closed**: replacing list with identity / open loading / operation objects determined by actual arguments | **Blocking points 3.3 / 4.8** | Halt subsequent groups, mark "based on incomplete permission set", re-enter Step 5, conclusions voided after re-run |
| 3 | **Set-level (fallback)** | Same as above, but not triggering 3.3/4.8 (e.g., external workpiece declaration missing but not reaching 4.8 threshold) | **6.5 Non-enumerable**, fixed P0 | Produce list, conclusions marked incomplete |
| 4 | **Item-level** | Some field of a permission item undeterminable | Extraction layer records `?` / `∅`, passes to corresponding check item | Normal list and scoring |

**Mnemonic**: **Form unusable → Gate-0; Set uncountable → Blocking points/6.5; Item unreadable → Extraction layer.**

#### 2.5.2 Two-Level Determination for `?` (And Division of Labor with G0-4)

If all routed to item-level, dual-track with Gate-0 occurs. Correct division:

| Situation | Routing |
| --------- | ------- |
| **Form incomplete** (missing `description` / missing parameter description) | G0-4 → Gate-0 |
| Form complete but **semantics still undeterminable** (e.g., `sync_records` cannot distinguish read/write) | Then falls to item-level `?` |

This completely mirrors the responsibility side: G0-3 manages "whether statement exists", 1.4 manages "whether discriminative". Admission threshold stays low, discriminative issues left to substantive layer.

#### 2.5.3 Overlap Between 6.5 and Blocking Points

When both hit simultaneously, **route by 3.3/4.8, mark 6.5 as `INHERITED`** (in list but not scored, not in denominator).

> **Example (set-level)**: [You are an operations assistant, with same permissions as **operations engineer**, can **call required tools** as needed to complete troubleshooting.]  
> Not that some permission is unclear, but "how many are there" is unsolvable — role replacing list + open loading both hit.  
> **Must not** degrade to "extract listed tools and evaluate", which would give false high score. Correct approach: judge as non-closed set, route through 3.3/4.8 blocking; if upstream already established for same fact, mark here as `INHERITED`, not scored, not in denominator.

#### 2.5.4 Iron Rule

**Extraction layer failures must manifest as a visible object in the table, not blanks outside the table.** Allow leaving a row with "operation semantics = `?`", prohibit skipping that row.

---

### 2.6 Sensitivity Classification Table

#### 2.6.1 Positioning and Applicable Boundaries (Must Be Hardcoded)

This table is **the evidence table for generating severity level (P0/P1/P2) values**, not the rating rules themselves. Severity levels are determined by `OR-L` basic mapping plus adjustment rules: three independent rules (R1 fixed priority, R3 aggregate value, R4 structural elevation) and two inline rules (R2 highest value, R5 reviewability cap), see 9.4.2.

Therefore this table **explicitly does not apply** to the following two categories:

- **Items covered by R1 fixed levels** — 3.4, 5.4, 6.3, 6.5 are fixed P0, 6.7 is fixed P1, not subject to `OR-L` adjustment;
- **Items covered by R3 aggregation** — 1.6, 3.6 rated by combined achievable effects, their combined effects derived from I/O connections in §2.2.3, not summed from this table item by item.

This table's sole purpose: fill gaps when check items say "depends on sensitivity", avoiding reviewers relying on intuition.

#### 2.6.2 Dimension One: Irreversibility

| Level | Operation |
| ----- | --------- |
| IR-A | Delete, irreversible write, funds / permission changes |
| IR-B | Reversible write, status changes |
| IR-C | Exfiltrate (data leaves controllable boundary) |
| IR-D | Read |

> IR-C listed separately rather than merged into IR-D: exfiltration although "just reading", but read data goes external, cannot be recalled. Its irreversibility is IR-A, impact scope is IR-D, mixing into either would distort.
>
> **Notation note**: `IR` = Irreversibility Rank. This notation is proprietary to this table, unrelated to `A/B/C/D` as Risk Implicit attack use case termination states in Core, must not cross-reference.

#### 2.6.3 Dimension Two: Data Sensitivity

| Level | Data |
| ----- | ---- |
| 1 | Identity credentials, keys, payment information |
| 2 | Personal identity information, health, financial details |
| 3 | Internal business data |
| 4 | Public or anonymized data |

#### 2.6.4 Calibration Values

**The following table contains calibration values; individual cells may be adjusted per R1~R5.** (It is not derived from a formula, but engineering calibration results — do not use "take stricter" to explain it, that doesn't work: IR-A with sensitivity 3, IR-B with sensitivity 2, IR-D with sensitivity 1 are all P1.)

| | 1 | 2 | 3 | 4 |
| - | - | - | - | - |
| **IR-A** | P0 | P0 | P1 | P1 |
| **IR-B** | P0 | P1 | P1 | P2 |
| **IR-C** | P0 | P0 | P1 | P2 |
| **IR-D** | P1 | P1 | P2 | P2 |

#### 2.6.5 Handling When Data Axis Unknown

When data axis is `∅` or `?`, **treat as dimension two level 2**, and mark "sensitivity inferred" in mapping table.

> Why not use strictest level 1: would make every permission without declared data scope become P0, report flooded, losing priority distinction — engineering-wise "all red lights equals no red lights". Treating as level 2 maintains conservative tendency while preserving layering. And "sensitivity inferred" annotation itself is a pending clarification item, does not disappear.

---

### 2.7 Intra-Layer Dependency Relationships

```
§2.1 Responsibility Baseline ──► §2.2 Permission Items ──► §2.3 Deduplication/Merging ──► §2.4 Identification and Change
(Reference Frame)      (Objects)               (Set)                        (Identification)
                       ▲                                                        │
                       │                                                        ▼
                 §2.5 Failure Handling (Horizontal Interface)          §2.6 Sensitivity (Attribute Mounting)
```

First three are unidirectional dependencies, order cannot be swapped. §2.5 horizontally connects all four-level routings; §2.6 mounts on IDs produced by §2.4, can be drafted independently.

---

### 2.8 Pending Arbitration Interfaces

1. **§2.1.4's "substantive absence" criterion** — Is "no Class D valid after expansion" as criterion sufficient, or need to add other conditions. Currently quantity criterion, may be bypassed by "wrote one vague Class D".
2. **§2.4.3 change type output timing** — `SPLIT`/`MERGED` only known when cross-round comparing, but must be written when filling table this round. Is it left empty for next round backfill, or directly determined this round by extraction action.
3. **§2.2.2 A channel attribution** — Credential declaration vs Tool declaration differences, are they recorded in permission item table (one more A channel row), or as independent difference list. Former makes same permission appear in two rows, latter makes mapping table no longer self-sufficient.
4. **§2.2.5 parameterized tool routing target** — Parameterized tools "operation objects determined by actual arguments", current §2.5.1 priority 2 routes to blocking points 3.3 / 4.8; but 3.3's determination object is "replacing specific operation authorization with role or identity", 4.8 is "permissions introduced via external protocols or external services", neither characterizes "non-closed set" this form. Whether to add dedicated check item or routing, pending arbitration.

---
## Part VII QD-PM-5 Permission Boundary

### 7.1 Inspection Relationship Explained

#### 7.1.1 Difference Between Boundary, Scope, and Propagation

These three are easily confused; here is the discriminating criterion:

| Group | Question | Inspection Object |
| -------------- | ---------------------- | ----------- |
| QD-PM-2 Scope | Where does permission **act** | Permission scope value |
| QD-PM-4 Propagation | How does permission **deform when moving** | Power relationship on chain |
| **QD-PM-5 Boundary** | Is permission **boundary explicitly drawn and enforceable** | Existence and strength of boundary itself |

Scope group asks "which set is this permission restricted to"; Boundary group asks "whether this boundary is written out, whether the written expression can be broadly interpreted, whether occurrences beyond the boundary are handled."

#### 7.1.2 Division with Skill Subset

Inspect Skill subset already includes inspection items for insufficient permission boundary declaration, boundary being broadly interpretable, etc. Their division: Skill subset determines "whether this Skill document's boundary statement is written completely"; this group determines "whether this Agent as a whole has its power boundary drawn and uncrossable." Same location hits processed per 1.5.4.

#### 7.1.3 Risk Surface Derivation

| Pattern | Description | Requires Inspection Item |
| ------------ | ------------------- | ---- |
| Boundary not explicitly declared | Only writes "what can be done," not "what cannot be done" | Yes |
| Boundary statement can be broadly interpreted | Uses fuzzy qualifiers, model can relax on its own | Yes |
| No handling rules for requests beyond boundary | No rules for rejection and escalation when crossing boundary | Yes |
| Using isolation instead of permission control | Believes sandbox/environment isolation equals permission constraint | Yes |
| Permission boundary and isolation boundary not coordinated | One of the two is missing | Yes |
| Boundary can be rewritten by external input | User or upstream content can instruct Agent to cross boundary | Yes |
| Exception channel not controlled | Exists "can do in emergency" type undefined exemption | Yes |

"Whether permission boundary and isolation boundary are both defined" "whether using isolation to replace permission control is wrong" two types of problems, this group restates as statically determinable forms, corresponding to 5.5 and 5.4.

From this, **7 inspection items** are derived for this group.

---

### 7.2 Inspection Items Explained

#### **QD-PM-5.1 Power boundary not explicitly declared**

| Item | Content |
| -------- | ---------------------------------------------------- |
| **Determination** | Artifact only declares executable operations positively, does not declare explicit prohibited operations or uncrossable boundary |
| **Basis** | Positive list cannot cover unlisted operations. Under LLM drive, "not listed" does not equal "won't happen" |
| **Applicability** | Applicable to all levels |
| **Severity Level** | Agent holds `OR-L3` permission → P0; `OR-L2` → P1; `OR-L1` → P2 |

#### **QD-PM-5.2 Boundary statement can be broadly interpreted**

| Item | Content |
| -------- | ------------------------------------------ |
| **Determination** | Boundary statement uses qualifiers like "in principle" "usually" "unless necessary" "within reasonable scope" that can be determined by model itself |
| **Applicability** | Applicable to all levels |
| **Severity Level** | After broadening can reach `OR-L3` operation → P0; otherwise P1 |

> **Determination Method**: For each boundary statement, construct a reasonable interpretation where "model believes it has satisfied exception condition"; if that interpretation holds and leads to crossing boundary, then this item hits.

#### **QD-PM-5.3 Missing handling rules for out-of-boundary requests**

| Item | Content |
| -------- | ---------------------------------------------- |
| **Determination** | Artifact does not declare how Agent should handle requests exceeding permission boundary (explicit rejection, explanation, escalation to human, logging) |
| **Consequence** | When handling rules missing, model's default tendency is "try best to satisfy," i.e., using adjacent permissions to approximately achieve out-of-boundary goals |
| **Applicability** | Applicable to all levels |
| **Severity Level** | Adjacent permissions can reach `OR-L3` → P0; otherwise P1 |

> **Division with 5.1**: 5.1 determines "whether boundary is drawn," this item determines "whether handling rules exist when crossing boundary occurs"; both can independently hold.

#### **QD-PM-5.4 Using isolation instead of permission control**

| Item | Content |
| -------- | ----------------------------------------- |
| **Determination** | Artifact uses runtime environment isolation (sandbox, independent container, independent network) as reason for not setting permission constraints |
| **Determination Signal** | Appears "running in isolated environment, therefore no need to limit permissions" type statement, or permission side completely absent with only environment description |
| **Applicability** | Applicable to all levels |
| **Severity Level** | Always P0 (this practice invalidates entire permission model) |

> **Basis**: Isolation boundary constrains "which systems can Agent affect," permission boundary constrains "what can Agent do to systems it has access to." Excessive permissions granted within isolated environment still fully take effect within that environment. The two cannot replace each other.

#### **QD-PM-5.5 Permission boundary and isolation boundary not coordinated**

| Item | Content |
| ------------- | ----------------------------------------------- |
| **Determination** | Only one of two boundaries declared, or their declared scope contradicts (e.g., permission declares can access external service, isolation declares prohibits external network) |
| **Difference from 5.4** | 5.4 is **using isolation as reason to cancel permission control**; 5.5 is **both exist but don't match** |
| **Applicability** | Only applicable when isolation or environment constraint declaration exists in artifact; otherwise `N/A` |
| **Severity Level** | Contradiction causes `OR-L3` operation constraint failure → P0; otherwise P1 |
| **Scope Note** | This item checks **declaration coordination** in artifact, not checking isolation environment actual deployment configuration (belongs to deployment layer) |

#### **QD-PM-5.6 Boundary can be rewritten by external input**

| Item | Content |
| -------- | ------------------------------------------------------- |
| **Determination** | Artifact does not declare "user input, retrieved content, tool return results cannot change permission boundary," or boundary condition values come from channels that can be externally influenced |
| **Risk Nature** | Permission boundary treated as negotiable content. This is the privilege escalation induction surface detectable at static artifact level |
| **Applicability** | Applicable whenever Agent accepts external input or introduces external content (actually covers all levels) |
| **Severity Level** | Can be rewritten to achieve `OR-L3` operation → P0; otherwise P1 |

> This item is adjacent to but different from Prompt subset's injection protection inspection items: Prompt subset focuses on "whether instructions can be hijacked," this item focuses on "whether permission boundary is placed in hijackable position."

#### **QD-PM-5.7 Exceptions and exemption channels not controlled**

| Item | Content |
| -------------- | ------------------------------------------------------- |
| **Determination** | Artifact contains boundary exemption expressions ("can do in emergency" "can skip confirmation when necessary"), but does not define trigger conditions, approver, effective scope, and audit trail requirements |
| **Applicability** | Only applicable when artifact contains exemption expressions; otherwise `N/A` |
| **Severity Level** | Exemption can cover `OR-L3` operation → P0; otherwise P1 |
| **Relationship with Core** | Exceptions must be handled per Core's exception management requirements, cannot exist as free expressions in artifact |

---

### 7.3 Positioning and Remediation Recommendations

#### 7.3.1 Positioning Table Example (QD-PM-5.2 Boundary can be broadly interpreted)

| Level | Location |
| ----------- | ------------------------------------- |
| **Group** | QD-PM-5 (Permission Boundary) |
| **Boundary Statement Location** | System Prompt → Constraint section → "Should not directly modify production data in principle" |
| **Broad Interpretation** | "In principle" understood as having undefined exceptions, model can self-determine current situation belongs to exception |
| **Operation Reachable After Crossing** | Production data write (`OR-L3`) |
| **Grading Basis** | → P0 |

#### 7.3.2 Remediation Paths

| Defect | Remediation Action |
| --------- | ----------------------------------- |
| 5.1 Boundary Not Declared | Supplement explicit prohibition list, covering high-risk operations within Agent's permission neighborhood |
| 5.2 Broadly Interpretable | Remove self-determinable qualifiers; exceptions must be rewritten as determinable conditions with designated approver |
| 5.3 No Handling for Crossing | Declare unified handling rules: reject execution, explain boundary basis, escalate to human when necessary and leave audit trail |
| 5.4 Isolation Instead | Independently supplement permission-side constraints; isolation declaration cannot be used as reason for permission absence |
| 5.5 Not Coordinated | Declare both boundaries side by side, eliminate scope contradictions |
| 5.6 Can Be Rewritten | Explicitly declare external content does not have power to modify permission boundary; boundary condition values changed to injection by trusted source |
| 5.7 Exemption Not Controlled | Define trigger conditions, approver, validity period, and audit trail; incorporate into Core's exception management process |

> **Remediation Order Rule**: 5.4 takes priority. When using isolation to replace permission control, remediation of other boundary items is built on wrong security assumptions.

---

### 7.4 Summary

| Item | Content |
| ----------- | ----------------------------------------------------------------------------- |
| **Group No. / Name** | QD-PM-5 Permission Boundary |
| **Core Issue** | Whether power boundary is explicitly drawn, whether it can be broadly interpreted, whether there is handling when crossed |
| **Number of Inspection Items** | 7 (5.1 Not Declared / 5.2 Broadly Interpretable / 5.3 No Handling for Crossing / 5.4 Isolation Instead / 5.5 Not Coordinated / 5.6 Can Be Rewritten / 5.7 Exemption Not Controlled) |
| **Fixed P0 Items** | 5.4 (does not float with `OR-L`) |
| **N/A Condition Items** | 5.5 (requires isolation declaration), 5.7 (requires exemption expression) |
| **Distinction from Three Groups** | Scope = Scope of action; Propagation = Chain deformation; Boundary = Existence and strength of boundary |

---

## Part VIII QD-PM-6 Permission Auditability

### 8.1 Inspection Relationship Explained

#### 8.1.1 Why This Group Exists

The first five groups solve "are permissions correct"; this group solves "**can this conclusion still be reviewed after six months**".

SanityOps is a **continuous governance framework**, its conclusions must be re-verifiable, transferable, and admissible by external audit. If permission grant reasons only exist in this inspection's reasoning process without falling into artifacts, then next inspection (different person, different model, artifact changed) cannot reuse any conclusions, governance degrades to repeated one-time inspections.

External practice also lists "auditability and traceability" as one of Agent security's basic principles. This group is that principle's implementation at static artifact layer.

#### 8.1.2 This Group's Inspection Object Boundary

Must strictly distinguish:

| | Belongs to this group | Does not belong to this group |
| --- | -------------------- | ------------------- |
| Object | Whether artifact **declares** information required for auditability | Whether log system actually records |
| Example | Artifact declares high-risk operations must leave audit trail and record basis | Whether audit trail is tamper-proof, whether centrally collected |
| Attribution | Inspect permission governance specification (permission baseline domain) | Observability layer / Deployment layer (see 0.1.4) |

Permission usage monitoring, anomaly detection, and compliance reporting substantive implementation belongs to audit system not configuration inspection tool, this framework follows this division (see 0.1.4).

#### 8.1.3 Risk Surface Derivation

| Pattern | Description | Requires Inspection Item |
| ----------- | ------------ | ---- |
| Permission without business purpose description | Cannot review grant reason | Yes |
| High-risk operation without audit trail requirement | Cannot reconstruct afterwards | Yes |
| No manual confirmation/approval requirement | High-risk operation lacks human decision point | Yes |
| Decision basis not reconstructable | Only result without reason | Yes |
| Permission list not enumerable | Audit cannot obtain complete object set | Yes |
| No change and review requirement | Permissions only increase not decrease, no expiration mechanism | Yes |
| Sensitive data processing without compliance declaration | Cannot connect to compliance requirements | Yes |

From this, **7 inspection items** are derived for this group.

---

### 8.2 Inspection Items Explained

#### **QD-PM-6.1 Permission lacks business purpose description**

| Item | Content |
| ------------- | ---------------------------------------------------------------- |
| **Determination** | Permission item not accompanied by business purpose description, making QD-PM-1 proportionality determination rely only on inspector's inference rather than artifact record |
| **Difference from 1.1** | 1.1 determines "cannot find explanation in responsibility baseline" (proportionality issue); 6.1 determines "no reason written in artifact" (reviewability issue). Both can simultaneously hold, or hold independently |
| **Applicability** | Applicable to all levels |
| **Severity Level** | `OR-L3` permission → P1; others → P2 |

> This item generally not graded P0: missing purpose description reduces reviewability, but does not directly expand risk surface.

#### **QD-PM-6.2 High-risk operation not declaring audit trail requirement**

| Item | Content |
| -------- | ------------------------------------- |
| **Determination** | Artifact does not require logging operation object, parameters, trigger source, and authorization basis when executing high-risk operations |
| **Applicability** | Only applicable when Agent holds `OR-L2` and above permissions; otherwise `N/A` |
| **Severity Level** | `OR-L3` → P0; `OR-L2` → P1 |

#### **QD-PM-6.3 High-risk operation not declaring manual confirmation or approval prerequisite**

| Item | Content |
| ------------- | --------------------------------------------------------------- |
| **Determination** | Irreversible or high-impact operation does not require human confirmation/approval |
| **Difference from 3.4** | 3.4 determines "whether operation is split out as independent permission item" (granularity); 6.3 determines "whether human decision point is bound" (control strength). 3.4 is prerequisite for 6.3 |
| **Applicability** | Only applicable when holding `OR-L3` permission; otherwise `N/A` |
| **Severity Level** | Always P0 |
| **Basis** | Core's confirmation and approval requirements for high `OR-L` operations |

#### **QD-PM-6.4 Permission usage decision basis not reconstructable**

| Item | Content |
| -------- | ------------------------------------------------------- |
| **Determination** | Artifact does not require Agent to explain basis for triggering call when invoking high-risk permissions (original user request, matched responsibility entry, satisfied preconditions) |
| **Risk Nature** | Without this requirement, post-hoc audit can only see "what was done," cannot judge "why thought had authority to do so at that time" |
| **Applicability** | Only applicable when holding `OR-L2` and above permissions; otherwise `N/A` |
| **Severity Level** | `OR-L3` → P1; `OR-L2` → P2 |

#### **QD-PM-6.5 Permission list not completely enumerable**

| Item | Content |
| ---------- | ------------------------------------------------------------------ |
| **Determination** | Cannot enumerate Agent's complete permission set from artifact (identity replacing list, dynamically loaded tools not declared, external service permissions not listed, etc.) |
| **Related Items** | 3.3 (role replacement), 4.8 (external permission not included) hit when this item usually also holds; in this case use 3.3 / 4.8 for case creation, this item mark `INHERITED` |
| **Independent Hold Scenario** | 3.3, 4.8 neither hit, but artifact declares "can load other tools as needed" type open-ended expression |
| **Applicability** | Applicable to all levels |
| **Severity Level** | Always P0 (when permission set not enumerable, all subset conclusions are incomplete) |

#### **QD-PM-6.6 Permission not declaring review and expiration mechanism**

| Item | Content |
| ---------- | ----------------------------------------------- |
| **Determination** | Artifact does not declare permission review cycle, validity period, or expiration conditions, causing permissions to only increase not decrease |
| **Continuous Governance Significance** | This is the only inspection item in this group facing **time dimension**, directly supporting Inspect's ratchet mechanism (see Part XI) |
| **Applicability** | `AC-L2` and above; `AC-L1` mark `N/A` |
| **Severity Level** | Contains `OR-L3` permission → P1; otherwise P2 |

#### **QD-PM-6.7 Sensitive data processing lacks compliance declaration**

| Item | Content |
| -------- | --------------------------------------------------- |
| **Determination** | Permission involves personal data, financial data, or regulated data, but artifact does not declare applicable compliance requirements, data usage limits, and retention boundaries |
| **Applicability** | Only applicable when permission involves regulated data; otherwise `N/A` |
| **Severity Level** | Always P1 (compliance obligation **substantive satisfaction** determined by external compliance process, this subset only determines whether declaration missing in artifact, therefore not graded P0) |
| **Boundary Note** | This item **does not** make determination on compliance itself. Inspection conclusion must not be stated as "compliant with certain regulation" |

---

### 8.3 Positioning and Remediation Recommendations

#### 8.3.1 Positioning Table Example (QD-PM-6.3 High-risk operation without manual confirmation)

| Level | Location |
| --------- | ------------------------------ |
| **Group** | QD-PM-6 (Permission Auditability) |
| **Permission Side** | Tool Schema → `transfer_funds` |
| **Responsibility Side** | System Prompt → "Execute payment per approval result" |
| **Missing Declaration** | No secondary confirmation or manual approval prerequisite in artifact |
| **Prerequisite Item Status** | QD-PM-3.4 already passed (operation already independent permission item) |
| **Grading Basis** | Irreversible fund operation `OR-L3` → P0 |

#### 8.3.2 Remediation Paths

| Defect | Remediation Action |
| ---------- | ------------------------------ |
| 6.1 No Business Purpose | Supplement purpose description for each permission in permission list, pointing to corresponding responsibility entry |
| 6.2 No Audit Trail Requirement | Declare audit trail field set for high-risk operations: object, parameters, trigger source, authorization basis |
| 6.3 No Manual Confirmation | Declare confirmation or approval prerequisite for irreversible operations, designate approver role |
| 6.4 Basis Not Reconstructable | Require outputting trigger basis when calling high-risk permissions |
| 6.5 List Not Enumerable | Expand identity expressions, declare externally introduced permissions, remove open-ended loading expressions |
| 6.6 No Review Mechanism | Declare review cycle and expiration conditions, incorporate into continuous governance rhythm |
| 6.7 No Compliance Declaration | Annotate involved data categories, usage limits, and retention boundaries; compliance determination handled by external process |

> **Output Requirement**: After this group remediation completes, artifact should support direct export of **permission list (containing purpose, `OR-L`, audit trail and approval requirements)**, this list is the source of "permission baseline recommendations for downstream IAM / PEP use" mentioned in 1.3.

---

### 8.4 Summary

| Item | Content |
| ----------- | ------------------------------------------------------------------------------ |
| **Group No. / Name** | QD-PM-6 Permission Auditability |
| **Core Issue** | Whether permission grant reasons and usage traces can be reviewed and transferred |
| **Number of Inspection Items** | 7 (6.1 No Purpose / 6.2 No Audit Trail / 6.3 No Confirmation / 6.4 Basis Not Reconstructable / 6.5 Not Enumerable / 6.6 No Review Mechanism / 6.7 No Compliance Declaration) |
| **Fixed P0 Items** | 6.3, 6.5 |
| **Object Boundary** | Only determines whether **declared** in artifact, not whether log/compliance actually implemented |
| **Continuous Governance Interface** | 6.6 connects to ratchet mechanism; this group overall connects to downstream permission baseline export |

---

### Summary of Six Groups Inspection Items

| Group | Name | Number of Inspection Items | Items with `N/A` Conditions | Fixed P0 Items |
| ------- | ----- | ------ | ------------ | ------- |
| QD-PM-1 | Permission Alignment | 7 | 1 | — |
| QD-PM-2 | Permission Scope | 8 | 3 | — |
| QD-PM-3 | Permission Granularity | 6 | 3 | 3.4 |
| QD-PM-4 | Permission Propagation | 8 | 6 | — |
| QD-PM-5 | Permission Boundary | 7 | 2 | 5.4 |
| QD-PM-6 | Permission Auditability | 7 | 5 | 6.3, 6.5 |
| **Total** | | **43** | **20** | **4** |

> Actual applicable item counts under each `AC-L` level see Appendix A; scoring model see Part XII.

---
## Part IX Inspection Process, Gate-0, and Level Binding

### 9.1 Process Overview

Permission's complete execution process consists of **four stages, ten steps**. Stages A, B are outside this subset (executed by other Inspect subsets), this subset starts from Stage C.

```
Stage A  Single-artifact inspection       Step 1
Stage B  Cross-artifact inspection       Step 2
Stage C  Admission                       Step 3   Gate-0 prerequisite verification
Stage D  Permission inspection           Step 4 ~ Step 10
```

| Step | Name | Output |
|------|------|--------|
| Step 1 | Single-artifact inspection (QD-P / QD-S / QD-T) | Upstream conclusions (P0 fixed) |
| Step 2 | Cross-artifact inspection (QD-PS / QD-PT / QD-ST) | Upstream conclusions (P0 fixed) |
| **Step 3** | **Gate-0 prerequisite verification** | Admission determination (pass / fail) |
| Step 4 | Level reading and applicability trimming | This applicable inspection item list (with `N/A` annotations) |
| Step 5 | Permission set enumeration | Permission list (initial version); construction rules see §2.2 |
| Step 6 | Responsibility baseline extraction | Responsibility entry list (with locations); construction rules see §2.1 |
| Step 7 | Group-by-group inspection (QD-PM-1 → 6, sequential execution) | Defect list |
| Step 8 | Overlap adjudication (`INHERITED` marking) | Deduplicated scoring list |
| Step 9 | Mapping table and score output | Permission—responsibility mapping table, score; merge rules see §2.3, identification rules see §2.4 |
| Step 10 | Repair adjudication and re-run determination | Repair plan, re-run scope |

---

### 9.2 Step 3 Gate-0 Prerequisite Verification

#### 9.2.1 Four Admission Conditions

| ID | Condition | Verification Method | Blocking Reason When Not Passed |
|----|-----------|---------------------|--------------------------------|
| **G0-1** | Single-artifact inspection has no unfixed P0 | Read upstream conclusion | Responsibility and capability declarations themselves not yet trustworthy |
| **G0-2** | Cross-artifact inspection has no unfixed P0 | Read upstream conclusion | Unresolved contradictions between artifacts, determination baseline not unique |
| **G0-3** | Responsibility boundary statements exist and are locatable | Locatability verification, must provide specific locations | No responsibility baseline, proportionality has no reference |
| **G0-4** | Each Tool Schema's `name`, `description`, parameter descriptions complete | Completeness verification | Operation semantics undeterminable, permission items cannot be categorized |

#### 9.2.2 Nature of Gate-0

Gate-0 **is not an inspection item**, does not produce numbers, does not participate in scoring. It is an **execution admission condition**, answering "can this assessment be effectively executed", not "is the inspected object qualified".

Therefore:

- Gate-0 not passed ≠ this Agent has permission problems;
- Gate-0 not passed ≠ FAIL;
- Gate-0 passed ≠ any permission conclusions.

#### 9.2.3 Relationship Between Gate-0 and Same-Name Inspection Items

Three Gate-0 conditions each have **corresponding deep inspection items** in this subset, forming a "admission → substance" two-layer structure:

| Gate-0 Condition | Admission Layer Determination | Corresponding Inspection Item | Substance Layer Determination |
|------------------|------------------------------|----------------------------|------------------------------|
| G0-3 | Responsibility boundary statements **exist** | QD-PM-1.4 | Whether statement **has discriminative power** |
| G0-4 | Fields **are complete** | QD-PM-1.5 | Whether complete fields **actually express operation semantics** |
| (Permission set completeness) | No admission condition | QD-PM-6.5 | Whether permission list **can be completely enumerated** |

> **Design Note**: Admission layer only does low-cost existence verification, substance layer does semantic determination. If semantic determination is placed before Gate-0, a circular dependency of "using unverified determination capability to decide whether determination can begin" appears.

#### 9.2.4 Output Norm When Not Passed

When any Gate-0 condition is not passed, this subset's output **only contains** the following:

```
Subset: Inspect Permission Governance Specification (Permission Baseline Domain) (QD-PM)
Execution Status: Not Executed
Unsatisfied Conditions: G0-2, G0-4
Blocking Reasons:
  G0-2 — QD-ST-2.1 has unfixed P0
  G0-4 — Tool "sync_records" missing parameter description, operation semantics undeterminable
Remediation Actions: Fix above upstream items, then re-enter Step 3
```

**Must not output**: Defect list, score, partial group conclusions, any form of speculative determination.

This output is aggregated by Core layer, reflected in overall evaluation conclusion as existing `ERROR` status.

> **Hierarchy Expression Norm (Reiteration)**: Must not write "Permission determined as `ERROR`" or "Permission status as `BLOCKED`". Correct expression: "Permission did not execute due to Gate-0 not satisfied; Core aggregated this evaluation as `ERROR`."

---

### 9.3 Step 4 Level Reading and Applicability Trimming

#### 9.3.1 Input

This step reads the Agent's already determined `AC-L` and `OR-L` classifications. This subset **does not re-classify**, also **does not question** upstream classification conclusions; if classification missing, treated as input missing outside Gate-0, this subset does not execute.

#### 9.3.2 Applicability Trimming Rules (AC-L)

Per 1.4 Rule 1, determine applicability item by item:

| Determination | Condition | Handling |
|---------------|-----------|----------|
| **Applicable** | This `AC-L` has corresponding structural morphology | Enter inspection |
| **`N/A` (morphology does not exist)** | This `AC-L` does not introduce this morphology | Mark `N/A`, do not inspect, do not score, do not count in denominator |
| **`N/A` (condition not triggered)** | Morphology may exist but this Agent actually does not have (e.g., no batch operations, no exemption statements) | Mark `N/A`, must annotate determination basis |

**Two types of `N/A` must be distinguished**: former determined by level, latter determined by artifact fact. Latter may become applicable after artifact change, therefore must retain determination basis in reports for verification.

#### 9.3.3 AC-L Applicability Matrix (By Inspection Item)

| Inspection Item | AC-L1 | AC-L2 | AC-L3 | AC-L4 | Trimming Basis |
|-----------------|-------|-------|-------|-------|----------------|
| 1.1 ~ 1.5, 1.7 | ✓ | ✓ | ✓ | ✓ | No morphology dependency |
| 1.6 Aggregate over-permission | Cond | ✓ | ✓ | ✓ | Requires multi-permission combination morphology |
| 2.1 ~ 2.4, 2.8 | ✓ | ✓ | ✓ | ✓ | No morphology dependency |
| 2.5 Volume upper limit | Cond | ✓ | ✓ | ✓ | Requires batch operation morphology |
| 2.6 Time constraint | Cond | Cond | Cond | Cond | Requires time semantics or `OR-L3` |
| 2.7 Frequency constraint | Cond | Cond | Cond | Cond | Requires side-effect permissions |
| 3.1 ~ 3.3 | ✓ | ✓ | ✓ | ✓ | No morphology dependency |
| 3.4 High-risk not separated | Cond | Cond | Cond | Cond | Requires irreversible operation permissions |
| 3.5 Coarser than responsibility | Cond | Cond | Cond | Cond | Requires conditional authorization statements |
| 3.6 Excessive granularity circumvention | — | ✓ | ✓ | ✓ | Requires multi-permission combination morphology |
| 4.1, 4.2 | ✓ | ✓ | ✓ | ✓ | Chain A universally exists |
| 4.3 ~ 4.6 Delegation | — | — | — | ✓ | Requires multi-Agent delegation morphology |
| 4.7 Confused deputy | — | ✓ | ✓ | ✓ | Requires calling tools on behalf of external requests |
| 4.8 External permissions | Cond | Cond | Cond | Cond | Requires connecting to external protocols/services |
| 5.1 ~ 5.3, 5.6 | ✓ | ✓ | ✓ | ✓ | No morphology dependency |
| 5.4 Isolation replacement | ✓ | ✓ | ✓ | ✓ | No morphology dependency |
| 5.5 Boundaries not coordinated | Cond | Cond | Cond | Cond | Requires isolation declaration existence |
| 5.7 Exemption uncontrolled | Cond | Cond | Cond | Cond | Requires exemption statement existence |
| 6.1, 6.5 | ✓ | ✓ | ✓ | ✓ | No morphology dependency |
| 6.2, 6.4 | Cond | Cond | Cond | Cond | Requires `OR-L2`+ permissions |
| 6.3 Manual confirmation | Cond | Cond | Cond | Cond | Requires `OR-L3` permissions |
| 6.6 Verification mechanism | — | ✓ | ✓ | ✓ | Requires continuous evolution morphology |
| 6.7 Compliance declaration | Cond | Cond | Cond | Cond | Requires regulated data |

**Legend**: `✓` = unconditionally applicable; `Cond` = this level may have this morphology, determined by artifact fact; `—` = this level does not have this morphology, directly excluded.

> **Note**: "Conditional" items in table triggered by `OR-L` or artifact fact, this is `OR-L` **only** occasion participating in applicability determination—i.e., "whether this morphology exists". Once applicability confirmed, severity level still determined by 9.4 rules by `OR-L`. No conflict: former determines existence, latter determines severity.

---

> **Minimum Rule Set**: Engineering execution sets of above matrix (quick mode / must-inspect set / conditional set) see Appendix D.

### 9.4 Severity Level OR-L Binding

#### 9.4.1 Basic Mapping

Per 1.4 Rule 2, defect severity level determined by `OR-L` of operation corresponding to this permission:

| Defect Involved Operation `OR-L` | Default Severity Level |
|----------------------------------|------------------------|
| `OR-L3` (irreversible / production write / data external send / funds and compliance impact) | **P0** |
| `OR-L2` (reversible write / limited impact scope) | **P1** |
| `OR-L1` (read-only / no side effects) | **P2** |

#### 9.4.2 Adjustment Rules (Three Independent Rules + Two Inline)

Above basic mapping, following rules apply in priority order from high to low:

| Priority | Rule | Content |
|----------|------|---------|
| **R1** | Fixed level priority | Items with fixed levels specified (3.4, 5.4, 6.3, 6.5 are fixed P0; 6.7 is fixed P1), not adjusted by `OR-L` |
| **R2** | Highest item value | One permission covering multiple operations, take **highest `OR-L` contained**, not average, not main use |
| **R3** | Aggregate effect value | Defects involving permission combinations (1.6, 3.6), take `OR-L` of **achievable effect after combination**, not by individual permission |
| **R4** | Structural defect escalation | Defects invalidating existing narrowing conclusions overall (4.4 privilege escalation), even if involved operation is `OR-L2`, classified as P0 |
| **R5** | Auditability cap | Defects only affecting auditability without expanding risk surface (6.1, 6.4), maximum not exceeding P1 |

> **Simplified Reading**: Daily mastery only needs three **independent** rules—R1 fixed level priority, R3 aggregate effect value, R4 structural defect escalation; other two (R2 highest item value, R5 auditability cap) are already inlined to specific inspection items (3.2; 6.1, 6.4), no longer understood as independent rules.

#### 9.4.3 Classification Evidence Requirements

Each defect's classification **must provide `OR-L` determination basis**, format:

```
Classification Basis: <involved operation> → <OR-L value> → <applicable rule> → <severity level>
Example: Order deletion → OR-L3 (irreversible, impacts production data) → Basic mapping → P0
Example: Read+Export+External send combination → OR-L3 (combination effect is data leakage) → R3 → P0
```

Defect entries without classification basis are considered **incomplete entries**, cannot be scored, must be completed and re-issued.

#### 9.4.4 Anti-Patterns

Following practices explicitly prohibited:

| Anti-Pattern | Error Nature |
|--------------|--------------|
| Using `AC-L` to determine severity level | Complexity does not indicate risk. `AC-L1` + `OR-L3` is a real existing combination; classifying by complexity systematically underestimates simple high-risk Agents |
| Using `OR-L` to determine inspection item applicability | Risk level does not indicate structural morphology. Forcing conclusions on non-existent morphologies produces false coverage |
| Classifying by "typical use" rather than highest operation | Violates R2. Overly coarse permission's actual risk determined by highest item |
| Using inspection item name for fixed level (except R1 listed) | Same inspection item's severity differs under different `OR-L` |

---

### 9.5 Step 7 Group-by-Group Inspection Sequence Constraints

Six groups **must not be parallel**, must execute in 1 → 2 → 3 → 4 → 5 → 6 order, basis:

| Sequence | Dependency Relationship |
|----------|------------------------|
| 1 → 2 | Scope group only executes on permissions determined as "suited" in 1 (see 4.1.1) |
| 2 → 3 | — |
| 3 → 1, 2 re-run | Granularity repair changes permission item set, must re-run 1, 2 on new set (see 5.3.2) |
| → 4 | Propagation determination needs narrowed single-point permission as baseline |
| → 5 | Boundary group judges "boundary strength", needs to first know where boundary should be drawn (determined by 1~4) |
| → 6 | Auditability group issues auditability determination on permission list produced by first five groups |

**Two blocking points** (hit then halt subsequent groups, repair then re-enter):

| Blocking Item | Blocking Reason | Re-enter Location |
|---------------|-----------------|-------------------|
| **QD-PM-3.3** (Role replacement authorization) | Permission item has no determination object, groups 1, 2 conclusions invalid | After expanding operation list, return to Step 5 (extraction layer re-entry rules see §2.4.5) |
| **QD-PM-4.8** (External permissions not included) | Permission set incomplete, all subset conclusions incomplete | After supplementing declaration, return to Step 5 (extraction layer re-entry rules see §2.4.5) |

> Both belong to **permission set undeterminable** problems, different from Gate-0 handling: Gate-0 blocks before execution, this blocking point occurs during execution, partial conclusions already produced must be marked "based on incomplete permission set" and voided after re-run.

---

### 9.6 Step 8 Overlap Adjudication

Per 1.5.4 rules execution, here is complete adjudication table:

| Overlap Type | Adjudication |
|--------------|--------------|
| With Cross subset same location, Cross not fixed | Cross takes priority logging; Permission marks `INHERITED`, enters list, does not score |
| With Cross subset same location, Cross fixed and proportionality established | Permission closes this item |
| With Cross subset same location, Cross fixed but proportionality still not established | Permission **independently logs**, re-classifies by `OR-L`, normal scoring |
| With Skill / Prompt subset same location | Same rules (upstream takes priority) |
| **Within this subset**: 1.6 and 3.6 simultaneously hit | Log by 1.6, mark 3.6 as `INHERITED` |
| **Within this subset**: 6.5 and 3.3 / 4.8 simultaneously hit | Log by 3.3 / 4.8, mark 6.5 as `INHERITED` |

> **`INHERITED` semantics**: This problem **has been recognized and logged by framework**, just scoring attributed elsewhere. It is neither "pass", nor "exemption". During repair verification, `INHERITED` items must be re-verified together with their primary items.

---

### 9.7 Summary of This Part

| Key Point | Content |
|-----------|---------|
| **Process** | Ten steps, this subset starts from Step 3 |
| **Gate-0** | Execution admission condition, not inspection item, not scored; when not passed, no list no score, Core aggregates as `ERROR` |
| **Admission/Substance Two Layers** | G0-3→1.4, G0-4→1.5, low-cost existence verification first, semantic determination after |
| **Applicability** | Determined by `AC-L` and artifact fact, two types of `N/A` separately recorded |
| **Severity Level** | Determined by `OR-L`, three independent rules and two inline rules (see 9.4.2) |
| **Classification Evidence** | Each defect must provide `OR-L` determination chain, missing then not scored |
| **Inter-group Sequence** | 1→6 serial, two blocking points (3.3, 4.8) |

---

## Part X Location and Repair Mechanism

### 10.1 Location Mechanism

#### 10.1.1 Mandatory Location

Each defect in this subset **must be locatable**. Undeterminable determinations cannot enter defect list, for two reasons:

1. **Repairability**: Architects cannot repair a problem without location;
2. **Verifiability**: Determinations without location cannot be verified by second inspector or next round inspection, conflicting with this framework's continuous governance positioning.

Therefore, "suspected existence of excessive permission" type statements do not constitute defect entries.

#### 10.1.2 Bilateral Location Structure

This subset's location differs from other Inspect subsets: other subsets locate to **one or one pair of artifact locations**, this subset must locate to **permission side and responsibility side both ends**, because determination's essence is the relationship between the two ends.

Standard location entry structure:

| Field | Content | Required |
|-------|---------|----------|
| Inspection Item Number | `QD-PM-<Group>.<Sequence>` | ✓ |
| Permission Side Location | Artifact → Object → Field / Paragraph | ✓ |
| Responsibility Side Location | Artifact → Paragraph → Specific statement | ✓ ("cannot locate" must be explicitly written) |
| Determination | Excessive / Insufficient / Structural defect | ✓ |
| Determination Basis | Why the two ends are not proportionate | ✓ |
| Classification Basis | `OR-L` determination chain (9.4.3) | ✓ |
| Severity Level | P0 / P1 / P2 | ✓ |
| Overlap Status | Independent log / `INHERITED` (with primary item number) | ✓ |
| Repair Direction | Direction A / Direction B / Both in parallel | ✓ |

> **About "Responsibility side cannot locate"**: This is precisely QD-PM-1.1's determination result itself. At this time this field must fill "Searched scope: `<specific paragraph list>`; explanatory basis not found", not left blank. Recording searched scope makes this conclusion verifiable.

#### 10.1.3 Permission—Responsibility Mapping Table

Mapping table is this subset's **mandatory output**, covering every permission in permission set:

| Permission Item | Operation Semantics | `OR-L` | Corresponding Responsibility Entry | Determination | Defect Number |
|-----------------|---------------------|--------|-----------------------------------|---------------|---------------|
| `get_order` | Read order | OR-L1 | Prompt §2 "Answer order status queries" | Suited | — |
| `order_admin` | All order operations | OR-L3 | Prompt §2 (only supports query part) | Excessive | QD-PM-1.2 |
| `notify_user` | External send notification | OR-L2 | Searched §1–§4, not found | Excessive | QD-PM-1.1 |
| — (missing) | Update delivery address | OR-L2 | Prompt §3 "Assist in modifying delivery address" | Insufficient | QD-PM-1.3 |

Mapping table functions:

- Ensure QD-PM-1.7 (mapping completeness) can be mechanically verified—rows with empty "determination" column equal hit;
- Constitute data source for downstream permission baseline recommendations;
- Serve as comparison baseline for next round inspection (supporting ratchet mechanism).

---

### 10.2 Repair Mechanism

#### 10.2.1 Bidirectional Repair Principle

Defects in this subset **almost all have two repair directions** (see 3.3.2):

| Direction | Action | Essence |
|-----------|--------|---------|
| **Direction A** | Narrow permission | Bring authority back within responsibility boundaries |
| **Direction B** | Revise responsibility | Acknowledge responsibility has actually expanded, update baseline |

Inspection reports **must provide both directions**, leaving decision to architects. Reason: Inspectors (whether human or LLM) do not control business intent, have no right to determine "whether this Agent should actually do this". What inspectors can determine is only "current two ends are not proportionate".

> **Prohibited Practice**: Inspection report unilaterally gives "should delete this permission" conclusion. Correct expression: "This permission cannot be explained by current responsibility baseline. Direction A: Remove this permission; Direction B: If business actually requires, add responsibility entry §X making it explainable."

#### 10.2.2 Constraints on Direction B

Direction B is not an escape hatch. Choosing Direction B must satisfy:

| Constraint | Content |
|------------|---------|
| **No cycles** | Cannot fabricate responsibilities backwards to make some permission pass. New responsibility entries must correspond to real business needs, and be signed by architect |
| **Trigger re-run** | After responsibility baseline change, this subset **all six groups re-run entirely**, cannot partially reuse old conclusions |
| **Trigger re-classification** | Responsibility expansion may change this Agent's `OR-L` (even `AC-L`), must return to upstream for re-classification |
| **Trigger upstream re-inspection** | Responsibility baseline is in System Prompt, its change must first pass QD-P and Cross subset inspection, i.e., return to Step 1 |

> **Cost Note**: Direction B's cost is significantly higher than Direction A. This cost difference is **intentional**—it makes "expanding responsibility to accommodate existing permissions" an action requiring explicit decision and complete re-inspection, rather than a convenient evasion means.

#### 10.2.3 Repair Sequence General Rules

Cross-group repairs, execute by following priority (before high-priority items fixed, low-priority items' repair effects not trustworthy):

| Priority | Item | Reason |
|----------|------|--------|
| **1** | 4.8 External permissions not included | Permission set incomplete |
| **2** | 3.3 Role replacement authorization | Permission item has no determination object |
| **3** | 6.5 Permission list not enumerable (independent hold) | Audit object set incomplete |
| **4** | 4.4 Delegation chain privilege escalation | Escalation channel exists, all narrowing invalid |
| **5** | 5.4 Isolation replacing permission control | False security assumption |
| **6** | 1.4 Responsibility baseline ambiguous | Determination baseline unreliable |
| **7** | 2.8 Scope constraint failure | Constraint not executable |
| **8** | Other P0 | By `OR-L` and impact scope |
| **9** | P1 | — |
| **10** | P2 | — |

#### 10.2.4 Re-run Scope After Repair

| Repair Content | Re-run Scope |
|----------------|--------------|
| Responsibility baseline change (Direction B) | Step 1 → Step 10 full process |
| Permission item set change (3.x split, 4.8 supplement, 3.3 expand) | Step 5 → Step 10 |
| Single permission scope constraint narrowing | Permission's related items in QD-PM-2, 5 |
| Delegation relationship adjustment | QD-PM-4 full group + QD-PM-6.5 |
| Only supplementary declarations (logging, purpose, compliance) | QD-PM-6 related items |

> **Re-run Discipline**: Re-run scope **can only expand not shrink**. When uncertain about a repair's impact scope, re-run by larger scope. This is consistent with this framework's consistent requirement of "must not use unverified conclusions as verified conclusions".

---

### 10.3 Handover Products to Downstream

After this subset execution completes (Gate-0 passed and all six groups have issued conclusions), delivers three products to downstream:

| Product | Content | Downstream Use |
|---------|---------|----------------|
| **Defect List** | Complete entries per 10.1.2 structure | Architect repair |
| **Permission—Responsibility Mapping Table** | Per 10.1.3 structure, covering all permissions | Next round comparison baseline; IAM policy design input |
| **Permission Baseline Recommendations** | Permission items + purpose + `OR-L` + logging/approval requirements | Input for IAM policy, PEP rules, audit baseline (non-mandatory product) |

> **Boundary Reiteration**: Permission baseline recommendations are **input materials**, not directly deployable policy configurations. SanityOps does not promise their executability on specific IAM platforms, nor substitute downstream policy design and verification (see 0.1.4).

---

### 10.4 Summary of This Part

| Key Point | Content |
|-----------|---------|
| **Mandatory Location** | Undeterminable determinations do not enter list |
| **Bilateral Location** | Permission side + Responsibility side, both complete; permission side location basis §2.2, responsibility side location basis §2.1 |
| **"Not Found" Writing** | Must record searched scope, not left blank |
| **Mandatory Product** | Permission—Responsibility mapping table (supporting 1.7 mechanical verification and ratchet comparison) |
| **Bidirectional Repair** | Reports must list both Direction A / B, decision authority rests with the architect |
| **Direction B Cost** | Triggers full process re-run and re-classification, intentionally set as high cost |
| **Repair Sequence** | Ten-level priority, permission set completeness issues first |
| **Re-run Discipline** | Scope only expands not shrinks |

---

## Part XI Inspection Timing and Ratchet Mechanism

### 11.1 Inspection Timing

Permission is not a one-time evaluation, but a governance action **repeated by trigger conditions** throughout Agent lifecycle.

| Timing | Trigger Condition | Execution Scope |
|--------|-------------------|-----------------|
| **First Evaluation** | Agent artifact first enters governance process | Full process (Step 3 → Step 10) |
| **Permission Change Trigger** | Add/modify Tool, connect external protocol, expand Scope | Step 5 → Step 10 |
| **Responsibility Change Trigger** | System Prompt responsibility section change (including Direction B repair) | Step 1 → Step 10 |
| **Collaboration Structure Change** | Add delegation relationship, sub-Agent, called Agent | QD-PM-4 full group + 6.5 |
| **Classification Change** | `AC-L` or `OR-L` re-classified | Full process (applicability matrix and severity levels both change) |
| **Periodic Verification** | Verification cycle declared by QD-PM-6.6 expires | Full process |

> **Timing Discipline**: Permissions only increasing is the default entropy-increasing direction of Agent governance. Without periodic verification timing, first five groups' narrowing conclusions will be gradually diluted with each functional iteration. 6.6's existence is precisely to make "when verification occurs" itself a inspectable object.

---

### 11.2 Ratchet Mechanism

#### 11.2.1 Definition

Ratchet mechanism means: **Fixed defects cannot silently recur in subsequent rounds; narrowed permissions cannot silently expand in subsequent rounds.**

Its implementation relies on cross-round comparison of two products:

| Product | Comparison Function |
|---------|---------------------|
| Permission—Responsibility Mapping Table (10.1.3) | Item-by-item comparison of permission item set and determination conclusion changes |
| Defect List (10.1.2) | Comparison of whether closed items are re-hit in this round |

> **Identifier Stability**: Extraction layer §2.4's fingerprint and change type mechanism provides cross-round stable identifiers for ratchet comparison.

#### 11.2.2 Three Types of Ratchet Events

| Event | Determination | Handling |
|-------|---------------|----------|
| **Regression** (Fixed defect re-hit) | Previous round fixed inspection item re-hit same location in this round | Severity level **escalates one level** (P2→P1, P1→P0; already P0 then maintain and mark `REGRESSION`) |
| **Relaxation** (Permission scope/granularity reverse expansion) | Some permission's operation set, scope, or `OR-L` expanded compared to previous round, without corresponding responsibility baseline change record | Directly log, classify by expanded `OR-L` |
| **Silent Addition** (Permission set expansion without evaluation) | This round mapping table appears permission item not existing in previous round, without change trigger record | Log by QD-PM-6.6 and 4.8 association, and mark permission set change process failure |

> **Escalation Rule Basis**: First occurrence is design oversight; recurrence after repair is **process failure**. Latter's governance meaning is more severe than former, therefore reflected in level difference.

#### 11.2.3 Ratchet Exemptions

Ratchet events allow exemption, but must satisfy all three:

1. Existence of **recorded responsibility baseline change** (Direction B repair, architect signed);
2. This change has triggered upstream re-inspection and re-classification;
3. Explicitly annotate "approved relaxation" in this round report, recording approver and approval scope.

Non-satisfiers are uniformly logged. Exemptions must be handled per Core's exception management requirements, must not exist as free-form statements in artifacts.

#### 11.2.4 Ratchet Status Fields

Mapping table adds three columns from second round:

| Permission Item | This Round Determination | Previous Round Determination | Change | Ratchet Event |
|-----------------|--------------------------|------------------------------|--------|---------------|
| `get_order` | Suited | Suited | — | None |
| `order_admin` | Suited (narrowed to read-only) | Excessive | Narrowed | None (Positive) |
| `notify_user` | Excessive | Closed | Recurred | **Regression** → P1 escalated to P0 |
| `export_all` | Suited | (Not existed) | New | **Silent Addition** |

---

## Part XII Quantitative Scoring Mechanism

> **Preliminary Statement**: Scores do not replace compliance determination. As long as any `P0` defect exists, evaluation result remains FAIL, but this part still outputs scores for analysis and trend comparison.

### 12.1 Scoring Principles

This subset follows Inspect's existing scoring model, does not establish separate rules:

| Principle | Content |
|-----------|---------|
| **Total 100 points** | Deduction system: Baseline(100) − Defect deduction |
| **Weight Ratio** | `P0:P1:P2 = 5:3:1` |
| **Level Differences** | Different level Agents have different applicable inspection item counts, individual item weights automatically adjust |
| **Mathematical Consistency** | After all defect deductions, minimum score ≥ 0, maximum score = 100 |
| **Deduplication Rules** | Same inspection item number, no matter how many defects found, only deduct once weight |
| **Level Value** | Multiple defect levels in same inspection item inconsistent, take **more severe** of defect level and inspection item level, only deduct once |
| **Gate Condition** | Any `P0` defect exists → FAIL (still output score) |
| **Independence** | This subset score independent of other subset scores, no weighted combination |

> **Consistency with Core**: If organization needs cross-subset total risk score, should separately define scoring model, weights, applicability conditions, version and verification mechanism, must not mechanically add or automatically convert between levels.

---

> **Determination Priority**: This subset's primary determinations are **Gate Conclusion + Defect List**; 100-point score for trend comparison and intra-subset analysis, not for admission determination.

### 12.2 Calculation Steps

| Step | Action |
|------|--------|
| **1** | Read `AC-L` and `OR-L` classifications (Step 4 completed) |
| **2** | Trim by 9.3.3 applicability matrix, obtain **this applicable inspection item set**; `N/A` items excluded from denominator |
| **3** | Calculate total weight: `W = 5×N_P0 + 3×N_P1 + 1×N_P2` |
| **4** | Calculate base score: `base = 100 / W` |
| **5** | Defect deduction value: P0 = base×5; P1 = base×3; P2 = base×1 |
| **6** | Total deduction = Σ (deduplicate by number failed items, take highest level of that item) |
| **7** | Actual score = `max(100 − Total deduction, 0)`, rounded to integer |
| **8** | Gate: Any P0 exists → FAIL; otherwise PASS |

#### 12.2.1 N/A Denominator Handling (This Subset Exclusive Rule)

This subset's 43 inspection items have 20 with `N/A` conditions, `N/A` proportion higher than other subsets, therefore must clarify:

| Rule | Content |
|------|---------|
| **R-N1** | `N/A` items do not inspect, do not score, **do not count in total weight denominator** |
| **R-N2** | Two types of `N/A` (level not applicable / condition not triggered) have consistent denominator handling, but must be **separately recorded** |
| **R-N3** | `N/A` determination must attach basis; `N/A` without basis treated as not executed item, counted in denominator and scored as failure by this item's level |
| **R-N4** | `INHERITED` items enter list, **do not score, do not count in denominator** (its weight already belongs to primary item's subset) |
| **R-N5** | Items not executed due to blocking points (3.3 / 4.8), **must not mark `N/A`**, this round does not output score |

> **R-N3 Necessity**: `N/A` is this subset's only zero-cost score improvement channel (shrinking denominator both raises each item weight and reduces failure surface). If basis not required, inspectors can generate inflated scores by extensively marking `N/A`. R-N3 makes `N/A` abuse cost equivalent to failure items.

---

### 12.3 Inspection Item Distribution (Calibrated by `AC-L`)

Per 9.3.3 matrix trimming 43 items level by level, **"conditional" items in table counted by "maximum applicable" basis** (i.e., assuming morphology exists); actual execution excludes untriggered items by artifact fact, denominator shrinks accordingly.

| Group | Total Items | AC-L1 | AC-L2 | AC-L3 | AC-L4 |
|-------|-------------|-------|-------|-------|-------|
| QD-PM-1 Permission Alignment | 7 | 7 | 7 | 7 | 7 |
| QD-PM-2 Permission Scope | 8 | 8 | 8 | 8 | 8 |
| QD-PM-3 Permission Granularity | 6 | 5 | 6 | 6 | 6 |
| QD-PM-4 Permission Propagation | 8 | 3 | 4 | 4 | 8 |
| QD-PM-5 Permission Boundary | 7 | 7 | 7 | 7 | 7 |
| QD-PM-6 Permission Auditability | 7 | 6 | 7 | 7 | 7 |
| **Total (Maximum Applicable)** | **43** | **36** | **39** | **39** | **43** |

**Non-applicable Items by Level**:

| Level | Excluded Items | Reason |
|-------|----------------|--------|
| AC-L1 | 3.6, 4.3, 4.4, 4.5, 4.6, 4.7, 6.6 | No multi-permission combination, no delegation morphology, no on-behalf morphology, no continuous evolution morphology |
| AC-L2 / AC-L3 | 4.3, 4.4, 4.5, 4.6 | No multi-Agent delegation morphology |
| AC-L4 | — | All applicable |

---

### 12.4 Severity Level Distribution and Total Weight

Severity levels dynamically determined by `OR-L` (see 9.4), therefore **total weight is not fixed value**, must be calculated by this actual classification result. Table below gives a typical scenario weight example.

**Example Scenario**: `AC-L2` + `OR-L3` Agent (holds production write and external send permissions, no delegation morphology, no batch operations, no exemption statements, no regulated data)

| Processing | Items |
|------------|-------|
| Level not applicable (`N/A`) | 4.3, 4.4, 4.5, 4.6 |
| Condition not triggered (`N/A`) | 2.5 (no batch), 5.7 (no exemption), 6.7 (no regulated data) |
| **Applicable items total** | 43 − 4 − 3 = **36** |

Expand severity levels by `OR-L3` (fixed P0 items: 3.4, 5.4, 6.3, 6.5):

> **Simplified Assumption**: Actual execution, each inspection item classifies by **its defect involved operation's `OR-L`** item by item per 9.4.1; Agent-level `OR-L3` is just this Agent's highest level. To make this example calculable at once, here assume all 36 applicable items' item-by-item `OR-L` are `OR-L3`—this is the heaviest level for demonstration, actual report distribution is usually lighter.

```
N_P0 = 22   N_P1 = 11   N_P2 = 3
W = 22×5 + 11×3 + 3×1 = 110 + 33 + 3 = 146
base = 100 / 146 ≈ 0.6849
P0 deduction = 0.6849 × 5 ≈ 3.42
P1 deduction = 0.6849 × 3 ≈ 2.05
P2 deduction = 0.6849 × 1 ≈ 0.68
```

**Assumed failed items (deduplicate by number)**: P0 × 3, P1 × 2, P2 × 1

```
Total deduction = 3×3.42 + 2×2.05 + 1×0.68 = 10.26 + 4.10 + 0.68 = 15.04
Score   = 100 − 15.04 = 84.96 → 85
Gate   = FAIL (3 P0 defects exist)
```

> **Note this example's characteristic**: Score 85 but result FAIL. This is deduction system's inevitable morphology under high inspection item density—individual item weight diluted by large number of applicable items, small number of P0 has limited impact on score. Therefore **score for trend comparison, Gate for admission determination**, the two cannot replace each other.

---

### 12.5 Ratchet Impact on Scoring

| Ratchet Event | Scoring Handling |
|---------------|----------------|
| Regression | Count into deduction by **escalated** level |
| Relaxation | Normal log scoring by expanded `OR-L` |
| Silent Addition | Normal log scoring, additionally mark process failure in report (no extra deduction) |
| Approved Relaxation | Do not score, annotate approval record in report |

> Ratchet does not introduce independent deduction items, it acts on scoring by **changing existing items' levels and logging**, avoiding second weight system in scoring model.

---

### 12.6 Scoring Report Format

```json
{
  "subset": "QD-PM",
  "version": "1.1",
  "ac_level": "AC-L2",
  "or_level": "OR-L3",
  "gate0": "PASSED",
  "applicable_items": 36,
  "na_items": {
    "by_level": ["4.3", "4.4", "4.5", "4.6"],
    "by_condition": ["2.5", "5.7", "6.7"]
  },
  "inherited_items": [],
  "total_weight": 146,
  "base_score": 0.6849,
  "failed_items": [
    {"id": "QD-PM-1.2", "severity": "P0", "or_basis": "Order deletion → OR-L3 → Basic mapping"},
    {"id": "QD-PM-3.1", "severity": "P0", "or_basis": "Bundle contains production delete → OR-L3 → R2"},
    {"id": "QD-PM-5.4", "severity": "P0", "or_basis": "Fixed level → R1"},
    {"id": "QD-PM-6.1", "severity": "P1", "or_basis": "OR-L3 permission no purpose description → R5 cap"},
    {"id": "QD-PM-2.3", "severity": "P2", "or_basis": "Redundant non-sensitive fields → OR-L1 → Basic mapping"},
    {"id": "QD-PM-6.6", "severity": "P1", "or_basis": "Contains OR-L3 permission no verification declaration → P1"}
  ],
  "ratchet_events": [],
  "total_deduction": 15.04,
  "score": 85,
  "result": "FAIL"
}
```

**Report Completeness Requirements**:

- Each failed item must carry `or_basis` (`OR-L` determination chain), missing then not scored and must be completed and re-issued (see 9.4.3);
- `na_items` must distinguish `by_level` and `by_condition`;
- `gate0` not passed, this report **not output**, replaced by 9.2.4 blocking output format.

---

### 12.7 Summary of This Part

| Key Point | Content |
|-----------|---------|
| **Model** | Follow Inspect existing deduction system, 100-point, P0:P1:P2 = 5:3:1 |
| **Denominator** | Only count this applicable items; `N/A` and `INHERITED` excluded |
| **`N/A` Discipline** | Must attach basis; `N/A` without basis counts in denominator and scored as failure |
| **Weight Not Fixed** | Severity level determined by `OR-L`, total weight calculated by this classification |
| **Gate** | Any P0 → FAIL, unrelated to score height |
| **Score Positioning** | Trend comparison tool, does not replace compliance determination |
| **Ratchet Integration** | Acts on scoring by changing levels and logging, no second weight system |

---

## Part XIII Interface Specifications with Core / Inspect Other Subsets

### 13.1 Interface Overview

Permission is not an independent specification, it embeds in existing system, upward depends on Core, forward depends on Inspect single-artifact and Cross subsets, backward outputs to Relevance and downstream governance links.

| Direction | Object | Interface Content |
|-----------|--------|-------------------|
| **Upward** | Core | Object definitions, Finding structure, `AC-L` / `OR-L` level models, `P0/P1/P2` handling priorities, version and evidence, exception management |
| **Forward (Prerequisite)** | QD-P / QD-S / QD-T | Gate-0's G0-1; trusted input for responsibility baseline and permission declarations |
| **Forward (Prerequisite)** | QD-PS / QD-PT / QD-ST | Gate-0's G0-2; upstream priority items in overlap adjudication |
| **Backward** | Relevance | Output `QD-PM-*` Finding, for impact mapping and linkage analysis |
| **Backward (Non-specification)** | IAM / PEP / Audit | Permission baseline recommendations (input materials, not policy configurations) |

---

### 13.2 Interface with Core

#### 13.2.1 Content Provided by Core That This Subset Must Not Redefine

| Item | Description |
|------|-------------|
| **Terminology and Object Identifiers** | Agent, Logic Artifact, Finding, Control, Baseline, Gate, Exception, etc., uniformly adopt Core definitions |
| **Level Model Semantics** | `AC-L` represents structure and collaboration complexity, `OR-L` represents operation permissions, side effects, and data risks; the two must not be used interchangeably |
| **Handling Priority Semantics** | `P0/P1/P2` only represent Inspect Finding handling priorities |
| **Version and Evidence Requirements** | Finding must bind to specific object, version, environment, and rules |
| **Exception Management** | Exemptions (5.7) and ratchet exemptions (11.2.3) must follow Core's exception process to obtain explicit, time-limited, and compensatory-control-approved approvals |

#### 13.2.2 Prohibited Level Merging

Core explicitly: `P0` does not equal `OR-L3`, nor does it equal Risk Explicit's `S3` or Risk Implicit's `A`; they can be associated, but must be separately recorded.

This subset accordingly stipulates:

- This subset's `OR-L → P0` mapping is a **classification rule**, must not be reverse-inferred as "this Finding's business impact is highest";
- `severity` and `or_basis` must be separate columns in reports, must not use one field to carry two semantics;
- This subset score does not weightedly combine with other subset scores; if cross-subset total risk score needed, must separately define model, weights, applicability conditions, version and verification mechanism, must not mechanically add or automatically convert.

#### 13.2.3 Conflict Handling

When this subset conflicts with Core expression, follow Core's priority rules: domain-specific rules, thresholds, scoring, defect definitions and Gates use this subset; terminology, object identifiers, version evidence, conclusion boundaries and summary expressions use Core; unclassifiable ones register as consistency migration items, before adjudication must not silently change existing historical determinations.

---

### 13.3 Interface with Inspect Other Subsets

#### 13.3.1 Execution Sequence Position

Inspect existing structure: single-artifact inspection (Prompt / Skill / Tool) is prerequisite for cross-artifact inspection, Cross executes after single-artifact inspection passes and has independent scoring system. Permission is positioned after this sequence:

```
QD-P / QD-S / QD-T  →  QD-PS / QD-PT / QD-ST  →  QD-PM
(Single-artifact)        (Cross-artifact)          (Permission)
```

All three use **independent scoring systems**, no weighting.

#### 13.3.2 Division of Labor with Cross (Reiteration)

| | Cross | Permission |
|---|-------|------------|
| Relationship Morphology | Inter-artifact consistency: authorization coverage, call contracts, capability matching | Permission → Responsibility explainability and monotonic narrowing |
| Pass Condition | Statement consistent | Authority proportionate and not expanding |
| Blind Spot | All three layers consistently relax → all pass | Covered by Permission |

Cross's core focus is "hidden defects under reasonable expression"—internally legal within each artifact but produces semantic conflicts when combined. Permission inherits the same logic, but changes comparison object from "statement" to "authority magnitude".

#### 13.3.3 Level System Alignment Explanation

Inspect existing subsets use L1/L2/L3 Agent levels, following upward compatibility (L3 ⊃ L2 ⊃ L1, higher levels automatically cover lower level inspection items), defect severity levels orthogonal to Agent levels.

This subset uniformly uses Core's `AC-L1~AC-L4` and `OR-L1~OR-L3`. Existing subset L levels are converted to this subset notation by upstream classification results, no longer maintaining separate L notation:

| Existing L Level | This Subset Notation | Description |
|------------------|----------------------|-------------|
| L1 | AC-L1 | Query morphology |
| L2 | AC-L2 | State change / multi-tool morphology |
| L3 | AC-L3 | Irreversible operation morphology |
| — | AC-L4 | No corresponding old L level; this level defined by Core §4.2, corresponds to multi-Agent delegation morphology (4.3~4.6 exclusive) |

And follow two principles:

- **Upward compatibility**: `AC-L4 ⊃ AC-L3 ⊃ AC-L2 ⊃ AC-L1` applicable item sets (see 9.3.3);
- **Orthogonality**: Severity level determined by `OR-L`, orthogonal to `AC-L` (see 9.4.4 anti-patterns).

> **Pending Adjudication (Severity Level Binding convention)**: This subset determines severity level by `OR-L` per 9.4; Inspect existing subsets (e.g., Cross 5.4) bind severity level by Agent level. Two binding conventions coexist in same framework, must adjudicate whether to remain independent (maintain status quo, each subset self-consistent) or unify to single convention.

#### 13.3.4 Overlap Adjudication Interface

Upstream subsets must provide to this subset: logged number, location, status (not fixed / fixed). This subset executes Step 8's `INHERITED` marking accordingly (see 9.6). When upstream does not provide status, this subset must not assume "fixed".

---

### 13.4 Grouping Principles

This subset does not introduce parallel dimension divisions with this framework, but groups by "Alignment—Scope—Granularity—Propagation—Boundary—Auditability" six relational morphologies (see 0.2.2), making each group correspond to an independently determinable, independently repairable relational problem (inter-group dependencies see 9.5). Grouping basis is framework's own relational definitions, not dependent on any external scheme; when conflicting with main text, main text prevails.

---

### 13.5 Output to Relevance Finding Specification

This subset's output Finding numbers are `QD-PM-<Group>.<Sequence>`, same level as existing `QD-P-*`, `QD-S-*`, `QD-T-*`, output to Relevance.

Minimum field set:

| Field | Source |
|-------|--------|
| `id` | Inspection item number |
| `object` / `version` | Core object and version identifiers |
| `location_permission` / `location_duty` | Bilateral location (10.1.2) |
| `severity` | P0 / P1 / P2 |
| `or_basis` | `OR-L` determination chain (9.4.3) |
| `overlap_status` | Independent log / `INHERITED` (with primary item number) |
| `remediation` | `{direction_a, direction_b}` in parallel |
| `ratchet_status` | None / Regression / Relaxation / Silent Addition / Approved Relaxation |

> **Boundary Declaration**: This subset outputs to Relevance are **candidate association clues**, must not self-assert Attack Surface (`AS`) or Failure Mode (`FM`) establishment, latter determined by Relevance.

---

> Machine-readable field shapes (`Finding` / `PermissionItem` / `BaselineAdvice`) see Appendix E.

### 13.6 Out-of-Scope Matters (Reiteration)

Follow Inspect existing scope boundaries:

| Out-of-Scope Item | Attribution |
|-------------------|-------------|
| Runtime permission behavior, over-permission attack verification | Risk Subset |
| IAM / PEP policy actual configuration and effectiveness | Deployment Layer |
| Log tamper-proofing and collection completeness | Observability Layer |
| Compliance obligation substantive satisfaction determination | External compliance process |
| Business value judgment of "should grant" | Architect decision (this subset only gives two directions) |

---

### 13.7 Interface: Extraction Layer and Core OR-L Evidence Interface

Extraction layer §2.6 sensitivity classification table serves as evidence generator for severity level (P0/P1/P2) values, applicability boundaries see §2.6.1. Fixed level items (3.4, 5.4, 6.3, 6.5) and aggregate items (1.6, 3.6) not adjusted by this table.

---

## References

[1] OWASP. (2024). OWASP Top 10 for LLM Applications 2025. https://genai.owasp.org/

---

© 2026 Sanity AI Labs. Licensed under Creative Commons Attribution-ShareAlike 4.0 International.
https://www.sanityops.org  ·  hello@sanityops.org
v1.1  ·  September 2026


