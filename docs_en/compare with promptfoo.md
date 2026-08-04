# Appendix: Technical Comparison — Risk Implicit vs. Promptfoo

---

## Table of Contents

- [1. Foundational Positioning](#1-foundational-positioning)
- [2. Root-Cause Localization Capability](#2-root-cause-localization-capability)
- [3. Sandbox Isolation and Default Execution Environment](#3-sandbox-isolation-and-default-execution-environment)
- [4. Attack Test Case Generation Mechanism](#4-attack-test-case-generation-mechanism)
- [5. Result Adjudication Mechanism](#5-result-adjudication-mechanism)
  - [5.1 Risk Implicit: Four Termination Statuses + Signal/Gate](#51-risk-implicit-four-termination-statuses--signalgate)
  - [5.2 Promptfoo: Evaluation and Red Team Output](#52-promptfoo-evaluation-and-red-team-output)
- [6. Attack Test Case Assetization and Iterative Regression — A Component of the Ratchet Mechanism](#6-attack-test-case-assetization-and-iterative-regression--a-component-of-the-ratchet-mechanism)
- [7. Static-Dynamic Complementarity: Explicit and Implicit](#7-static-dynamic-complementarity-explicit-and-implicit)
- [8. CI/CD Automation Capability](#8-cicd-automation-capability)
- [9. OWASP Coverage Capability](#9-owasp-coverage-capability)
- [10. Delivery and Deployment Model](#10-delivery-and-deployment-model)
- [11. Overall Conclusion](#11-overall-conclusion)

---

## 1. Foundational Positioning

Risk Implicit and Promptfoo sit at different layers of the AI security stack. Their divergence is not about relative capability — it is about what question each tool is designed to answer.

| Dimension | Risk Implicit | Promptfoo |
| --- | --- | --- |
| Core Problem | Answers not only _whether_ a breach occurred, but _why_ it occurred and _which Logic Artifact_ was responsible. | Determines whether an attack payload was defended against (Pass/Fail), producing plugin- and strategy-level statistics. |
| System Affiliation | Operates independently, or as an integral module within the SanityOps Framework — interoperating with Explicit (static audit), Inspect, and Quality. | A standalone prompt evaluation and Red Teaming tool. |
| Inspection Target | Vulnerability of enterprise AI Agents, with particular focus on Logic Artifacts (Prompt, Skill, Tool Schema). | Model/application endpoint behavior in response to adversarial inputs. |

## 2. Root-Cause Localization Capability

This is where the two systems diverge most sharply.

Unlike existing enterprise tools that can only gesture at "likely a prompt issue," Implicit provides granular, clause-level traceability. While solutions like Promptfoo Enterprise offer broad, category-based remediation guidance — "improve your prompt," "strengthen guardrails" — without parsing the user's own Logic Artifacts, every test case in Implicit is mapped directly to a specific source clause. For example:

```json
{"defect_id": "QD-T-3.2", "layer": "Tool", "root_cause": "Parameter defined as string type in Tool Schema, with no constraints and no format validation", "remediation": "..."}
```

By tracing the full chain — **OWASP symptom → SanityOps root cause → precise clause localization → severity-ranked remediation (P0–P2)** — Implicit bridges the gap between surface-level attack detection and exact artifact remediation. The `defect_id`, `layer`, and `root_cause` fields are bound directly to the specific artifact clauses statically resolved during the Inspect phase, with attack chain attribution organized across the four-layer defense model: Prompt, Skill, Tool, and Cross. This is not a conceptual aspiration; it is an explicitly documented mechanism in the framework specification.

Promptfoo Enterprise, by contrast, stops at the plugin category. It can tell you that a Prompt Injection category attack succeeded, but it cannot tell you _which line_ of your system prompt, _which_ Tool parameter definition, or _which_ Skill clause created the vulnerability. The remediation advice is generic because the tool never inspects the internal structure of the user's artifacts in the first place.

## 3. Sandbox Isolation and Default Execution Environment

In Red Teaming and simulated attack workflows, sandboxing serves to contain adversarial actions and prevent interference with production systems. The two tools take fundamentally different approaches here.

| Dimension | Risk Implicit | Promptfoo |
| --- | --- | --- |
| Isolation Mechanism | Built-in Shadow Environment; attack validation executes within isolated replicas managed by the framework. | No built-in isolation. |
| Default Request Target | Isolated replicas, automatically provisioned and maintained by the framework. | A user-configured `target` — which may be production, staging, or a test endpoint. The tool makes no distinction and enforces no restrictions. |
| Environment Maintenance | Fully automated by the framework. | Entirely user-managed. If isolation is desired, the user must build, maintain, and synchronize the environment with each artifact iteration. |
| Production Interference Risk | Mitigated by architectural default. | Gated entirely on user configuration discipline. The tool provides neither safeguards nor warnings. |

Promptfoo's own documentation is clear on this point: "Red Team scanning requires sending real inference requests to the model provider's API." Third-party evaluations describe the workflow as pointing 50+ attack plugins at a live, running endpoint via YAML configuration. Its self-hosting capability addresses _where results are stored_ — not whether the target under test is isolated from production. In practical terms, avoiding production interference is left entirely to the user's operational discipline and carries its own maintenance cost.

## 4. Attack Test Case Generation Mechanism

The generation strategy reflects each tool's relationship to the target's internals.

Implicit generates customized attack cases per Agent, driven by the mapping between risk principles and the specific Logic Artifact defects surfaced during Inspect. The pipeline is: **Defect Information → Attack Strategy Derivation → Test Case Template Generation → Environment Adaptation → Executable Script**. Because the generation process starts from concrete defect entries — a missing constraint on a Tool parameter, an ambiguous Skill directive, a contradictory Prompt clause — the resulting attacks are tailored to the actual weaknesses of the specific Agent under test.

Promptfoo, by contrast, operates as an external black-box tester. Its test cases are assembled from a plugin library (covering Prompt Injection, privilege escalation, jailbreak, and other categories) combined with a strategy library (multi-turn, encoding transformation, and similar techniques). The test target is the application's exposed guardrail behavior, not its internal artifact structure. This is template-driven generation: the same plugin configurations are applied regardless of the target's internal architecture.

| Dimension | Risk Implicit | Promptfoo |
| --- | --- | --- |
| Generation Origin | Defect entries from Inspect, mapped through attack principles. Artifact-aware. | Plugin library + strategy library. Artifact-agnostic. |
| Understanding of Target Internals | Yes — generates targeted attacks grounded in the specific defect localization of Tool Schema, Prompt, and Skill artifacts. | No — positioned as external black-box testing; does not depend on static analysis of internal implementation. |

The qualitative distinction is clear: Implicit is **artifact-driven**; Promptfoo is **strategy/template-driven**. This is not a difference of degree — it is a difference in architectural philosophy.

## 5. Result Adjudication Mechanism

### 5.1 Risk Implicit: Four Termination Statuses + Signal/Gate

Risk Implicit employs a multi-layered adjudication model that distinguishes not just _whether_ an attack succeeded, but _how_ the system responded — and what that response implies about the underlying defect.

| Mechanism | Description |
| --- | --- |
| Termination Status Classification | **A** — Attack successfully exploited. **B** — Blocked by an external mechanism (e.g., a guardrail). **C** — Rejected by the LLM itself. **D** — Precondition not satisfied; adjudicated as invalid. |
| Signal Calculation | Base = valid test cases × 100. Deductions: A = −100/case; B = −50/case; C = −10/case. D cases are excluded from the valid count. |
| Gate Decision | Any A → **FAIL**. No A, with B/C present → **PASS**. All D → **ERROR**. Gate priority supersedes Signal: even a high Signal score cannot override the presence of a single A. |
| Dynamic Transition | As defenses evolve, the same defect's Termination Status can migrate from A → B → C, enabling continuous measurement of security posture improvement over time. |

### 5.2 Promptfoo: Evaluation and Red Team Output

Promptfoo's adjudication model is assertion-driven, with statistical aggregation across plugin and strategy dimensions.

| Mechanism | Description |
| --- | --- |
| Baseline Output | Assertion-level Pass/Fail, with user-customizable scoring logic. |
| Red Team Categorical Statistics | Attack success rates aggregated by plugin (vulnerability category) and strategy dimension, mappable to OWASP and other risk taxonomies. More granular than a single pass rate. |
| Adaptive Guardrails (Enterprise) | Automatically converts Red Team-discovered vulnerabilities into context-aware filtering rules, forming a "discover → defend" loop. Enterprise-exclusive; not available in the OSS edition. |

## 6. Attack Test Case Assetization and Iterative Regression — A Component of the Ratchet Mechanism

The Implicit specification articulates a principle that goes beyond one-shot testing: "Every validation run produces a quantifiable Security Signal, enabling cross-version comparison, trend tracking, and continuous improvement. The Ratchet Mechanism ensures that the security posture can only rise or hold — it can never regress."

This is not merely a statement of intent. The mechanism is operationalized through several concrete design choices:

- **Test cases as versioned assets.** The attack test case corpus is managed as a persistent, versioned asset. After each Logic Artifact iteration, the full historical corpus is re-executed to confirm that defects have been genuinely remediated — a single passing result does not certify an improvement.
- **Dynamic Termination Status transitions.** Rules such as "D → A/B/C: after improving the test environment, re-execute to obtain valid results" ensure that previously invalidated tests are not silently discarded but are reactivated when conditions allow.
- **Traceability in the release report.** The Core document's release report template includes `rule_id`, evaluator version, and test asset version fields, providing the structural foundation for auditability across iterations.

Promptfoo's YAML configuration files can, of course, be version-controlled alongside the codebase. But the framework lacks a _designed-in_ mechanism that treats the test case corpus as a security asset and mandates forced regression re-testing to verify genuine remediation. This is a difference in design objectives: Promptfoo is an evaluation tool; Implicit is a component of a continuous risk management system.

## 7. Static-Dynamic Complementarity: Explicit and Implicit

The SanityOps Governance Closed Loop, as defined in the Core specification, follows a deliberate sequence: **Inspect (Static Defect) → Risk Explicit (Explicit Risk Audit) → Risk Implicit (Dynamic Validation) → Quality**.

Risk Explicit audits the static text of Logic Artifacts — System Prompts, Skills, Tool Schemas — for Explicit Risks across both NL (Natural Language) and NR (Non-Readable) risk families, classified at S0–S3 severity. It is typically applied to artifacts sourced from the internet or third parties, where the provenance and authoring intent cannot be assumed safe.

Risk Implicit then takes those same artifacts and subjects them to dynamic, runtime validation — generating artifact-driven attacks against the defects surfaced by Inspect and audited by Explicit. Together, they form a complete static + dynamic dual-layer coverage model.

Promptfoo has no corresponding static audit module. Its capabilities are concentrated on the dynamic evaluation side. In a Promptfoo-only workflow, the static analysis gap must be filled by other tooling or manual review.

## 8. CI/CD Automation Capability

Both tools support CI/CD integration, but the adjudication models differ in ways that matter for pipeline decision-making.

| Dimension | Risk Implicit | Promptfoo |
| --- | --- | --- |
| CI Integration | Endogenous Ratchet Mechanism for automated pass/block decisions within CI/CD pipelines — a native framework capability. | Official GitHub Action (`promptfoo-action`) that runs evaluations on PR triggers and posts results as comments. Pass/fail thresholds in Red Team configurations drive pipeline decisions. |
| Adjudication Granularity | Gate decisions based on Termination Status classification — distinguishing whether a defect was _actually exploited_ (A) vs. merely triggered and blocked (B/C). | Thresholds based on assertion pass rates and plugin success rates. |

The critical difference is semantic clarity: Implicit's Gate distinguishes between "the attack was blocked" and "the attack succeeded," while Promptfoo's thresholds operate on aggregate pass rates. For a CI/CD pipeline deciding whether to block a release, the distinction between "we were attacked but survived" and "we were breached" is material — and Implicit's model captures it explicitly.

## 9. OWASP Coverage Capability

The following table compares coverage across the OWASP risk categories most relevant to LLM and Agentic AI systems. The key distinction is not _whether_ a category is covered, but _at what depth_ the validation operates.

| Risk Category | Risk Implicit (Artifact-Driven) | Promptfoo (Strategy/Plugin-Driven) | Nature of Difference |
| --- | --- | --- | --- |
| Prompt Injection / System Prompt Leakage | Generates targeted attacks rooted in Prompt structural defects. | Has corresponding plugins; tests without relying on internal structure. | Depth, not coverage. |
| Excessive Agency / Tool Misuse / Privilege Abuse | Validates cross-Tool exploit chains using Tool Schema and the permission model. | Has Agent Red Team guidance; internal permission logic understanding depends on user-configured assertions. | Implicit is architecturally better suited to validating deep permission-boundary vulnerabilities. |
| Sensitive Info Disclosure / Improper Output Handling | Validates in conjunction with data flow and artifact analysis. | Has corresponding plugins and assertion mechanisms. | Both can cover; depth depends on whether internal implementation is understood. |
| Data/Model Poisoning, Supply Chain, Vector Weaknesses | Not claimed — validation target is Agent runtime behavior, not data/model provenance. | Likewise does not cover data poisoning at the source. | Both are constrained by the third-party perspective. |
| Multi-Agent Communication (A2A), Cascading Failures | Not described at the multi-Agent system level. | Likewise lacks corresponding capability. | Both are constrained to a single-Agent perspective. |

Both systems are comparably limited in addressing risks that require access to the data, model, or supply-chain source, as well as multi-Agent system-level risks. For the principal risk categories verifiable through runtime behavior — injection, privilege escalation, output handling — Implicit's artifact-driven approach enables deeper exploit-chain validation rather than surface-level triggering alone. This is a difference in validation depth, not an absolute gap in the number of categories covered.

## 10. Delivery and Deployment Model

The delivered SanityOps Risk tooling provides a fully web-based operational interface with dashboard and report export capabilities. Promptfoo likewise offers web UI capabilities. Both systems meet the baseline for operational usability in this dimension. This is a productization concern, not a technical-principle differentiator, and is therefore noted here for completeness rather than included in the core comparison.

## 11. Overall Conclusion

The distinction between Risk Implicit and Promptfoo is not a matter of which tool is "stronger." They operate at fundamentally different layers of the problem space:

- **Promptfoo** answers the detection question: _Has the system been breached?_
- **Risk Implicit** answers the governance question: _How do we leverage defect knowledge and attack principles to efficiently generate validation cases, discover genuine vulnerabilities, and — critically — drive the remediation of the underlying defects?_

This is the difference between a detection tool and a **discovery → validation → localization → remediation** Risk Governance Closed Loop. The divergence reflects the design objectives of two distinct classes of tools, not a competition within a shared objective. Organizations evaluating both should assess which layer of the problem they need to solve — and whether the two can, in fact, be deployed complementarily.