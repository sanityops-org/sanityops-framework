# Quality — Agent Service Quality Assessment

**Quantitative assessment of AI Agent output quality and task completion reliability. Establishes measurable quality thresholds, release gates, and continuous improvement loops for enterprise deployment decisions.**

---

## Why Quality?

Inspect finds defects in Logic Artifacts. Risk validates whether those defects form real attack surfaces. But neither answers the question that matters most for go/no-go decisions:

> **Does this Agent consistently produce outputs that meet business requirements?**

Quality fills this gap with two complementary assessment methodologies tailored to the two dominant Agent types in enterprise deployment:

- **Tool Agents** execute deterministic tasks — ticket dispatch, payment processing, order management — where outputs are binary (success/failure). They need a single reliability metric with risk-driven test rigor.
- **RAG Agents** answer knowledge-based questions — customer support, policy lookup, technical guidance — where outputs are natural language and quality is multi-dimensional. They need a structured, metric-graded assessment across multiple quality dimensions.

**Quality provides standardized, repeatable, auditable measurement — so release decisions are based on evidence, not intuition.**

---

## Two Sub-Specifications

<div class="grid cards" markdown>

- ### [Quality RAG-Agent](./rag-agent-v1.0.md)

    Multi-dimensional quality assessment for knowledge-based RAG Agents.

    Evaluates Agent outputs across **4 dimensions and 12 metrics**: Knowledge Answer Quality (Correctness, Completeness, Relevance, Traceability, Timeliness), Dialogue and Complex Task Quality (Consistency, Robustness, Decomposition Capability, Coherence), Expression and Compliance Quality (Format Compliance), and Boundary and Safety Response Quality (Boundary Recognition, Safe Response). Uses Baseline Test Cases, Controlled Blind Testing, and a three-layer Release Gate.

    **Assessment types**: Rule Verification, LLM-as-Judge, Embedding Assistance

- ### [Quality Tool-Agent](./tool-agent-v1.0.md)

    Reliability-focused assessment for deterministic Tool Agents.

    Measures **reliability** as a single core metric — the probability of successful task completion across multiple independent executions. Applies risk-driven test rigor with differentiated test counts and pass rate thresholds per **L1/L2/L3** risk classification. Enforces a **Ratchet Mechanism** that binds version history to quality scores, preventing regression.

    **Core principle**: binary outputs demand statistical measurement, not continuous scoring

</div>

---

## RAG-Agent: 4 Dimensions × 12 Metrics

| Category | Metrics | Count |
|:---|:---|:---:|
| **A — Knowledge Answer Quality** | Correctness, Completeness, Relevance, Traceability, Timeliness | 5 |
| **B — Dialogue and Complex Task Quality** | Consistency, Robustness, Decomposition Capability, Coherence | 4 |
| **C — Expression and Compliance Quality** | Format Compliance | 1 |
| **D — Boundary and Safety Response Quality** | Boundary Recognition Capability, Safe Response Capability | 2 |

**Gate structure** (three independent layers — no single score can mask a gate failure):

| Layer | What it guards |
|:---|:---|
| **Critical Test Case Gate** | Must-pass facts, rules, and high-risk boundary scenarios |
| **Metric and Dimension Gate** | Per-dimension minimum thresholds |
| **Regression Degradation Gate** | No version-to-version quality regression |

---

## Tool-Agent: Risk-Driven Reliability Assessment

| Risk Level | Typical Impact | Test Count | Pass Rate Threshold |
|:---:|:---|:---:|:---:|
| **L1** | Low — internal tooling, non-critical workflows | 30 | 90% |
| **L2** | Medium — customer-facing, business operations | 50 | 95% |
| **L3** | High — financial, compliance, security-critical | 100 | 100% |

**Assessment workflow**: Risk Classification → Parameter Configuration → Mock Data Generation → Shadow Environment Execution → Reliability Calculation → Gate Determination → Result Output

---

## Position Within the SanityOps Framework

```
Inspect (Defect Inspection) ── finds the defects
    │
    ▼
Risk (Risk Scanning) ── validates the attack surfaces
    │
    ▼
Quality (Service Quality) ── You are here
    │   ├─ RAG-Agent: measures answer quality across 12 metrics
    │   └─ Tool-Agent: measures task reliability as a single score
    │
    ▼
Relevance (Relevance Assessment)
```

**Quality is the final gate before deployment. It answers: given that defects are known and risks are validated, does this Agent actually perform well enough to ship? Output is a quantified, auditable, version-bound assessment — not a subjective impression.**

---

## Quick Start

1. Complete [Inspect](/inspect/) and [Risk](/risk/) first — Quality assessment is most effective when defect and risk context is available
2. Identify your Agent type: Tool Agent (deterministic tasks) or RAG Agent (knowledge Q&A)
3. For Tool Agents: follow [Quality Tool-Agent](./tool-agent-v1.0.md) to configure risk level, test counts, and pass rate thresholds
4. For RAG Agents: follow [Quality RAG-Agent](./rag-agent-v1.0.md) to establish Baseline Test Cases and run the 12-metric assessment
5. Feed results to [Relevance](/framework/relevance-v1.0) for quality failure → defect diagnostic mapping
