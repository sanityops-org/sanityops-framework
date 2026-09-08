# SanityOps Framework Overview

# — AI Agent Continuous Governance

---

**Version**: v1.0

**Release Date**: July 2026

**Maintained by**: SanityOps Working Group

**License**: CC BY-SA 4.0

---

## Table of Contents

- [Section 1: Three Challenges in Enterprise AI Deployment](#section-1-three-challenges-in-enterprise-ai-deployment)
  - [1.1 First Challenge: Uncommitable Quality](#11-first-challenge-uncommitable-quality)
  - [1.2 Second Challenge: Invisible Security Black Holes](#12-second-challenge-invisible-security-black-holes)
  - [1.3 Third Challenge: Root Cause Localization Black Hole](#13-third-challenge-root-cause-localization-black-hole)
  - [1.4 Real Cost of the Problems](#14-real-cost-of-the-problems)
- [Section 2: Root Cause — The "Missing Compiler" for Logic Artifacts](#section-2-root-cause--the-missing-compiler-for-logic-artifacts)
  - [2.1 Logic Artifacts Are Like "Code Without a Compiler"](#21-logic-artifacts-are-like-code-without-a-compiler)
  - [2.2 Industry Status: Universality and Persistence of Defects](#22-industry-status-universality-and-persistence-of-defects)
    - [2.2.1 Universality of Defects](#221-universality-of-defects)
    - [2.2.2 Persistence of Defects](#222-persistence-of-defects)
  - [2.3 Why This Makes Enterprise AI Applications Difficult](#23-why-this-makes-enterprise-ai-applications-difficult)
- [Section 3: What Is SanityOps](#section-3-what-is-sanityops)
- [Section 4: Three Professional Systems (Loosely Coupled, Independent)](#section-4-three-professional-systems-loosely-coupled-independent)
  - [4.1 Inspect — Logic Artifact Compiler Checks](#41-inspect--logic-artifact-compiler-checks)
  - [4.2 Risk — Agent Security Risk Detection](#42-risk--agent-security-risk-detection)
  - [4.3 Quality — Agent Output Quality Assessment](#43-quality--agent-output-quality-assessment)
  - [4.4 Independent Business Value of the Three](#44-independent-business-value-of-the-three)
- [Section 5: Integration with Full Lifecycle and Driving Mechanism](#section-5-integration-with-full-lifecycle-and-driving-mechanism)
  - [5.1 How to Drive the SanityOps Closed Loop](#51-how-to-drive-the-sanityops-closed-loop)
  - [5.2 How to Integrate with Logic Artifact Version Iteration](#52-how-to-integrate-with-logic-artifact-version-iteration)
- [Section 6: Relationship Between SanityOps and Related Ecosystems](#section-6-relationship-between-sanityops-and-related-ecosystems)
  - [6.1 Inspect (Static Defect Inspection of Logic Artifacts)](#61-inspect-static-defect-inspection-of-logic-artifacts)
  - [6.2 Risk (Explicit Risk Audit and Implicit Risk Attack Validation)](#62-risk-explicit-risk-audit-and-implicit-risk-attack-validation)
  - [6.3 Quality (Service Quality and Reliability)](#63-quality-service-quality-and-reliability)
- [Section 7: What SanityOps Is Not (Clear Boundaries)](#section-7-what-sanityops-is-not-clear-boundaries)
- [Section 8: Current Status of SanityOps Framework (v1.0 Completed)](#section-8-current-status-of-sanityops-framework-v10-completed)
  - [8.1 Open-Source Framework (Apache License 2.0)](#81-open-source-framework-apache-license-20)
  - [8.2 Commercial Platform (Enterprise Tooling)](#82-commercial-platform-enterprise-tooling)
- [Section 9: What SanityOps Output Looks Like](#section-9-what-sanityops-output-looks-like)
  - [9.1 Inspect Output (Defect Discovery)](#91-inspect-output-defect-discovery)
  - [9.2 Relevance Output (Diagnostic Association)](#92-relevance-output-diagnostic-association)
  - [9.3 Risk Implicit Output (Attack Validation)](#93-risk-implicit-output-attack-validation)
  - [9.4 Quality Output (Quality Assessment)](#94-quality-output-quality-assessment)
  - [9.5 Release Decision Report (Gate Summary)](#95-release-decision-report-gate-summary)
- [Section 10: Quick Start](#section-10-quick-start)
  - [10.1 Get the Open-Source Framework](#101-get-the-open-source-framework)
  - [10.2 Use the Commercial Platform (SaaS / On-Premises)](#102-use-the-commercial-platform-saas-on-premises)
  - [10.3 Command Line Tools](#103-command-line-tools)
  - [10.4 CI/CD Integration Example](#104-cicd-integration-example)
- [Section 11: Recommended Reading Path](#section-11-recommended-reading-path)
- [Section 12: License and Open Source Commitment](#section-12-license-and-open-source-commitment)
  - [12.1 Framework Open Source License](#121-framework-open-source-license)
  - [12.2 Why Release as Open Source](#122-why-release-as-open-source)
- [Section 13: About Us](#section-13-about-us)
- [Section 14: We Need Your Feedback](#section-14-we-need-your-feedback)
- [Appendix A: Frequently Asked Questions (FAQ)](#appendix-a-frequently-asked-questions-faq)
- [Final Words](#final-words)
- [Quick Navigation](#quick-navigation)

---

<a id="section-1-three-challenges-in-enterprise-ai-deployment"></a>
## Section 1: Three Challenges in Enterprise AI Deployment

<a id="11-first-challenge-uncommitable-quality"></a>
### 1.1 First Challenge: Uncommitable Quality

When deploying RAG Agents for clients, we found that even when **functionality appears normal**, real-world operations still exhibit the following issues:

> Missing critical information, incorrect recommendations, outdated references, or even semantically identical questions receiving different answers each time.

**For enterprise applications, such output quality issues are common, unpredictable, yet fatal.**

To-C scenarios can tolerate "occasional issues"; but To-B core businesses require **taking responsibility for output quality**. An Agent with "unreliable reliability" cannot be deployed on enterprise critical decision paths.

The prevalence of this problem has become a major obstacle to enterprise AI deployment — we will illustrate this with data later.

---

<a id="12-second-challenge-invisible-security-black-holes"></a>
### 1.2 Second Challenge: Invisible Security Black Holes

Then, clients asked a simple but fatal question:

> **"If someone attacks this Agent using multi-turn or fragmented methods, will user data be leaked? Will permission controls be bypassed?"**

To this, we had no answer, because we knew: **current mainstream Guardrails, constrained by the impossible triangle, lack the capability to detect complex yet typical logic attacks in real-time.**

And this fundamental security capability gap, when challenged by compliance and audit requirements, almost equals a direct death sentence for all core business Agent deployment applications.

Similarly, this problem is highly prevalent, and because security audit has veto power, the statistics are even more severe.

---

<a id="13-third-challenge-root-cause-localization-black-hole"></a>
### 1.3 Third Challenge: Root Cause Localization Black Hole

Most frustrating of all, when we discover these two types of problems using various tools, we can **only point to general problem directions**:

- "This Agent's output is unstable, seemingly related to some phrasing in the system prompt"
- "This system has information leakage risks, probably somewhere in Skill parameter passing"

**But we cannot precisely locate:**

- "Which specific Prompt instruction caused this error?"
- "Is it unclear Tool definition boundaries, or contradictory Skill logic?"

The result is constant trial-and-error fixes to these logic artifacts, frequent iterations, new problems discovered, mutual interference during iterations, forming new potential problems, cycling endlessly under fragile reliability and security.

---

<a id="14-real-cost-of-the-problems"></a>
### 1.4 Real Cost of the Problems

These three challenges are not isolated cases — latest data proves their universality.

**Huge gap between enterprise Agent adoption and productionization**:

While 79% of enterprises have adopted AI Agents, only **11% are actually running in production**, and **6% are trusted for core business** [ref:37]. The deeper problem: **88% of Agent projects fail to move from POC to production** [ref:34].

**Enterprises abandoning AI projects at scale**:

**42% of enterprises abandoned most AI projects in 2025**, a 147% increase from 2024 [ref:21,25]. Gartner predicts **40% of agentic AI projects will fail by 2027 due to inadequate risk management** [ref:38].

**Root cause points to governance defects**:

Key data: **84% of AI project failures stem from governance and organizational issues, not technical issues** [ref:27].

**Current Status Summary**:

This means the enterprise AI dilemma is a systemic problem, not a technical one:

- ❌ **Difficult to move from experiment to production** (88% failure rate)
- ❌ **Unable to take responsibility for output quality** (lack of governance framework)
- ❌ **Unable to commit to security** (cannot audit and prove)
- ❌ **Ultimately: enterprise abandonment** (42% new abandonment rate)

---

**It is this dilemma that drives our thinking about SanityOps.**

---

<a id="section-2-root-cause--the-missing-compiler-for-logic-artifacts"></a>
## Section 2: Root Cause — The "Missing Compiler" for Logic Artifacts

Looking back now, what is the root cause of these three challenges? Let's think in reverse:

<a id="21-logic-artifacts-are-like-code-without-a-compiler"></a>
### 2.1 Logic Artifacts Are Like "Code Without a Compiler"

In traditional software development, code must pass **compiler checks** before running: Is the syntax correct? Do types match? Are symbols defined? Are interfaces aligned?

Compilers **force** code to comply with strict structural constraints — this is why traditional software has "structural defect rates" far lower than AI applications.

**But in Agent development**, logic artifacts (Prompts, Skills, Tool Schemas, Agent invocation relationships, etc.):

- ❌ Have no compiler check mechanism
- ❌ Only have writing guidelines, no mandatory static checks
- ✅ Naturally have extremely high flexibility and rapid iteration capabilities

**This flexibility is an advantage of the AI era**, but it also introduces a "compiler-level blind spot". Problems in logic artifacts such as **definition defects, unclear boundaries, contradictory constraints, incomplete information** are not discovered at "writing" time, but are **directly projected into LLM reasoning processes**, becoming:

- Root causes of quality issues
- Root causes of security risks
- Root causes of difficult localization

---

<a id="22-industry-status-universality-and-persistence-of-defects"></a>
### 2.2 Industry Status: Universality and Persistence of Defects

<a id="221-universality-of-defects"></a>
#### 2.2.1 Universality of Defects

Unfortunately, we could not find trustworthy statistics on logic artifact defect ratios, but when we ourselves began **systematic, scientific, rigorous defect detection** on real logic artifacts from hundreds of real Agents, the data surprised us:

**In our defect checks of logic artifact combinations from hundreds of real Agents, except for a few simple business Agent artifacts, complex business Agent logic artifact combinations almost 100% have more or fewer defects.**

More surprisingly, even certain Agents whose logic artifacts were written by LLMs did not have defects as occasional phenomena. The reasons are probably two-fold:

First, related to the lack of rigor in the prompts generating these logic artifacts — that is, lack of systematic methodology support;

Second, **a principled misconception**: LLMs optimize for "generating useful content," not "satisfying strict constraints" — these are fundamentally different objectives. **Generative reasoning and constraint-based verification are inherently distinct modes**, akin to human "fast intuition" versus "deliberate verification." Consequently:

- LLM-generated artifacts **also have widespread defects**, though types and distribution differ from human-written ones;
- As LLM capabilities improve, defect **occurrence rates will decrease**, but defects will **not disappear** as long as "response speed" and "constraint completeness" remain trade-offs;
- This is why LLM generation **cannot replace** independent, structured inspection — the fundamental reason SanityOps exists.

<a id="222-persistence-of-defects"></a>
#### 2.2.2 Persistence of Defects

Because the cost of adjusting logic artifacts is extremely low, and the remediation effects are directly perceptible, teams frequently make **instant, temporary, unplanned fine-grained adjustments**. This "hotfix" phenomenon is very common and covers the full lifecycle of Agents.

According to unofficial statistics of this type, a typical enterprise Agent logic artifact combination undergoes 50-100 frequent iterations throughout its lifecycle.

And because logic artifacts themselves have no strict quality and security constraint mechanisms, theoretically every iteration brings uncertainty impacts on quality and security. More critically, in most cases, how to quantitatively assess the impact on reliability and security after iteration is also missing.

This creates a vicious cycle: **defect issues → rapid hotfix → new uncertainty risks → further hotfixes**. In this cycle, Agent logic artifact quality does not fundamentally improve; instead, due to frequent unplanned adjustments, system maintainability, traceability, and predictability gradually decline.

Therefore, logic artifact defects are not just a **technical-level quality issue**, but also a **structural engineering management issue** — lack of systematic methodology, toolchains, and quality control mechanisms put enterprise Agents in a passive state of "high-frequency fixes, low-efficiency iterations" in production.

---

<a id="23-why-this-makes-enterprise-ai-applications-difficult"></a>
### 2.3 Why This Makes Enterprise AI Applications Difficult

**The trust crisis in enterprise AI is not rooted in LLMs not being powerful enough or Agent frameworks not being complete enough, but in logic artifacts falling into the aforementioned "high-frequency fixes, low-efficiency iterations" trap during production.** This directly leads to the three challenges:

- **Uncommitable quality:** Definition defects and unclear boundaries in logic artifacts are directly projected into LLM reasoning, causing output quality fluctuations and inability to take responsibility for core business.
- **Invisible security black holes:** Missing permission controls and lax Tool Schema definitions expand attack surfaces, preventing core business Agents from passing compliance audits.
- **Root cause localization black hole:** Frequent and uncontrolled hotfixes complicate problem troubleshooting, preventing precise defect localization, reducing remediation efficiency, and introducing new risks.

This dilemma forces enterprises to face two choices: either **ignore business department AI needs and shelve core business deployments**, waiting for a distant "mature solution"; or **risk reputation damage and compliance risks by deploying edge business with defects**; never truly maximizing AI value.

Gartner also points out that **84% of AI project failures stem from governance and organizational issues, not technology itself.** This clearly indicates that the biggest obstacle to current enterprise AI deployment is, on one hand, the lack of systematic quality and security assurance mechanisms like traditional software "compilers" for logic artifacts, and on the other hand, the lack of quality monitoring and vulnerability scanning mechanisms like traditional IT to discover problems and trace back to defect root causes.

---

<a id="section-3-what-is-sanityops"></a>
## Section 3: What Is SanityOps

> **SanityOps is a full-lifecycle governance system for enterprise AI Agent reliability and security.**
> 
> SanityOps believes that among various factors affecting Agent reliability and security, logic artifact defects are not only the most important root cause but also the most controllable clue. Therefore, SanityOps builds a **defect inspection, risk validation, and quality assessment** three-in-one bidirectional closed-loop structure; forward, starting from defect inspection and remediation, fundamentally improves service quality and reduces risk exposure; backward, assesses Agent quality and risks, discovers problems, and traces back to root cause defects.

**Keyword Interpretation:**

- **"Governance system"**: Not "testing tools" or "security scanners", but full-chain governance from **design → inspection → validation → assessment → decision → deployment → monitoring → improvement**
- **"Logic artifacts"**: Prompts, Skills, Tool Schemas, Agent designs, cross-artifact relationships, and all other **structured artifacts that constrain and guide LLMs**
- **"Full lifecycle"**: Not "pre-deployment admission inspection", but **continuously driving complete governance closed loops around every logic artifact change**

---

<a id="section-4-three-professional-systems-loosely-coupled-independent"></a>
## Section 4: Three Professional Systems (Loosely Coupled, Independent)

SanityOps consists of three **independent, complete, and flexibly combinable** professional systems.

<a id="41-inspect--logic-artifact-compiler-checks"></a>
### 4.1 Inspect — Logic Artifact Compiler Checks

**Core question**: Does the **definition layer** of logic artifacts have defects?

**Specifically includes**:

Includes four sub-tools for defect inspection of System Prompts, Skills, Tool Schemas, and CROSS cross-artifacts.

- **Non-standard**: Structure and style do not conform to accepted norms
- **Incomplete**: Critical information missing, constraint conditions incomplete
- **Unclear**: Concept definitions vague, boundaries unclear
- **Contradictory**: Multiple constraint conditions conflict with each other
- **Information structure errors**: Dependencies between artifacts are unreasonable

**Independent value** (even without Risk/Quality, Inspect alone has value):

- Help developers write **more rigorously structured artifacts**
- Establish **artifact version control and regression inspection baselines**
- Drive the entire team to improve **logic artifact writing standards**

**Output**:

- Defect discovery (QD)
- Defect classification and prioritization
- Remediation recommendations

---

<a id="42-risk--agent-security-risk-detection"></a>
### 4.2 Risk — Agent Security Risk Detection

**Core question**: Does the Agent have **active or passive risk exposure surfaces** in static artifacts or runtime?

**Specifically includes**:

**Explicit Risk (Risk Explicit)**:

- Do artifacts contain deliberately retained dangerous instructions? Common in internet services
- Example: Privilege escalation, hijacking, exposure, etc. instructions dispersed across different artifacts but with logical relationships

**Implicit Risk (Risk Implicit)**:

- During Agent runtime, are there non-subjective defects or vulnerabilities exploitable by attack methods?
- Example: Using imprecise definitions and constraints to achieve prompt injection, breaking boundary controls

**Independent value** (even without Inspect/Quality, Risk alone has value):

- Provide **independent security audits** to meet enterprise compliance and trust needs
- Help enterprises **quantify security risk severity**
- Form **deliverable security proofs** for investors and clients
- Discover and remediate vulnerable attack exposure surfaces before risks materialize

**Output**:

- Explicit risk classification and evidence
- Implicit risk validation results and attack paths
- Risk levels and remediation optimization recommendations

---

<a id="43-quality--agent-output-quality-assessment"></a>
### 4.3 Quality — Agent Output Quality Assessment

**Core question**: Does the Agent's **actual output** or **task completion quality** meet business requirements?

**Specifically includes**:

- 4-dimension 12-metric service quality assessment for RAG Agents
- Result-oriented evaluation paths for Tool Agent correct invocations

**Independent value** (even without Inspect/Risk, Quality alone has value):

- Establish **quantitative assessment of Agent output quality**
- Help enterprises **define "can deploy" quality thresholds**
- Form **continuous monitoring and improvement feedback loops**

**Output**:

- Quantitative scores covering multiple metrics and businesses
- Failure modes and root cause localization recommendations
- Reliability assessment and improvement recommendations

---

<a id="44-independent-business-value-of-the-three"></a>
### 4.4 Independent Business Value of the Three

Imagine medical diagnosis:

- **Blood test**: Independently discovers certain biochemical indicator abnormalities (like Quality)
- **X-ray**: Independently discovers certain structural problems (like Risk)
- **Pathology**: Independently discovers cellular-level root causes (like Inspect)

Each type of examination has independent value and can be done alone; but combined use leads to more accurate diagnosis.

**SanityOps's three systems are exactly the same**:

- Enterprises can **do only Risk**: Focus on "will it be attacked"
- Enterprises can **do only Quality**: Focus on "output quality reliability"
- Enterprises can **do only Inspect**: Focus on "are artifact definitions rigorous"
- Of course, we recommend users **do all three**: Obtain comprehensive governance closed loop

---

<a id="section-5-integration-with-full-lifecycle-and-driving-mechanism"></a>
## Section 5: Integration with Full Lifecycle and Driving Mechanism

<a id="51-how-to-drive-the-sanityops-closed-loop"></a>
### 5.1 How to Drive the SanityOps Closed Loop?

As described in Section 2.2.2, due to the high frequency and quantity of Agent logic artifact "hotfix" iterations compared to traditional programs, and covering the full lifecycle from development to production, and the close relationship between logic artifact defects and Agent quality and risk, when users adopt the complete SanityOps solution, every version iteration of logic artifacts should trigger the SanityOps closed loop.

And in practice, between each version and quantitative scores, the ratchet mechanism is used for binding, ensuring Agent quality and security levels continuously improve and cannot regress.

<a id="52-how-to-integrate-with-logic-artifact-version-iteration"></a>
### 5.2 How to Integrate with Logic Artifact Version Iteration?

Many understand "full lifecycle" as "admission inspection from development to deployment", but SanityOps means something completely different:

```
Logic Artifact Iteration (v1)
    ↓
Execute Inspect + Risk + Quality Complete Closed Loop —[Generate Evidence Chain]
    ↓
Fix Defects, Accumulate Regression Rules, Exception Policies, Compensatory Controls —[Accumulate Knowledge]
    ↓
Logic Artifact Iteration (v2) —[Restart the closed loop each time, based on previous rules]
    ↓
Execute Inspect + Risk + Quality —[Check New Issues + Regression Verification]
    ↓
Iteration (v3) / (v4) / ... —[Continuous Loop, Forming Traceable Governance Rhythm]
    ↓
Deployment Decision: Aggregate All Gate Conclusions (Inspect / Risk / Quality)
    ↓
Post-Deployment Monitoring → Incident Feedback → Rule Calibration → Next Iteration
```

**Key points**:

- **Every version change** triggers complete governance closed loop, not just one inspection
- **Evidence continuously accumulates**, forming auditable complete chains
- **Knowledge continuously precipitates**, subsequent iteration efficiency and accuracy continuously improve
- **Governance becomes the norm**, not "pre-deployment pain" or "post-incident emergency"

---

![](/assets/sanityops.svg)

---

<a id="section-6-relationship-between-sanityops-and-related-ecosystems"></a>
## Section 6: Relationship Between SanityOps and Related Ecosystems

Before deeply understanding SanityOps, it is necessary to explain its relationship with existing Agent-related tools and standards.

SanityOps is first a **quality, security, and governance framework for enterprise AI Agents**. It is not responsible for building, orchestrating, or running Agents, but provides systematic inspection, auditing, and quality measurement capabilities for already-built logic artifacts (System Prompts, Skills, Tool Schemas) and their execution results.

To avoid confusion, the following explains the relationship between SanityOps and representative objects in adjacent domains according to its three subsets. For a more complete item-by-item comparison, see the [SanityOps Positioning](/compare/sanityops-positioning.html).

<a id="61-inspect-static-defect-inspection-of-logic-artifacts"></a>
### 6.1 **Inspect (Static Defect Inspection of Logic Artifacts)**

Inspect focuses on logical defects in Prompts, Skills, Tool Schemas themselves and their cross-artifact consistency — contradictions, ambiguities, resource runaway, permission overflow, etc. This is closer to static inspection of "code" itself, rather than the process of building Agents.

Currently, the industry lacks equivalent solutions specifically for systematic static defect inspection of Agent logic artifacts, which is the gap Inspect attempts to fill.

<a id="62-risk-explicit-risk-audit-and-implicit-risk-attack-validation"></a>
### 6.2 **Risk (Explicit Risk Audit and Implicit Risk Attack Validation)**

Risk covers two types of work: explicit risk audit of backend logic artifacts, and dynamic validation of implicit vulnerabilities through actual attack execution.

As reference, OWASP-related standards describe "final forms of attacks" (symptoms), while SanityOps focuses on "preconditions for successful attacks" (root causes). The two are causal chain relationships, not substitution relationships.

Compared to traditional Red Teams or template-based testing tools like Promptfoo that rely on generic attack libraries and blind testing methods, SanityOps Risk emphasizes generating targeted attacks from enterprise-specific artifact defects and completing validation in shadow environments, thus having differentiated design in terms of relevance, production risk, and result quantification.

<a id="63-quality-service-quality-and-reliability"></a>
### 6.3 **Quality (Service Quality and Reliability)**

Quality is divided into Tool Agent and RAG Agent evaluation systems by Agent type, because their output essences differ: Tool Agent outputs are structured and binary-determinable, suitable for single reliability metric measurement; RAG Agent outputs are natural language and continuous distribution, requiring multi-dimensional continuous metric systems.

This distinction is also a difference between SanityOps and some generalized evaluation tools: among internationally representative related tools, RAGAS is an open-source standard widely cited and adopted at the RAG evaluation methodology level, while LangSmith Evaluations relies on mainstream Agent building ecosystems and has high enterprise practice penetration; SanityOps Quality, while referencing such evaluation ideas, further links quality results with defect governance, release gates, and version regression to form closed loops.

---

<a id="section-7-what-sanityops-is-not-clear-boundaries"></a>
## Section 7: What SanityOps Is Not (Clear Boundaries)

To ensure enterprises have clear expectations, SanityOps explicitly states the following **non-commitments**:

| Domain                           | SanityOps Role                                                                             | Who Is Responsible                            |
| -------------------------------- | ------------------------------------------------------------------------------------------ | --------------------------------------------- |
| **IAM / Access Control**         | Does not replace; only verifies whether artifacts correctly express permission constraints | Enterprise IAM systems                        |
| **Network and Backend Security** | Does not replace; compensating controls provided by external systems                       | Enterprise infrastructure security            |
| **Production Monitoring**        | Does not replace; SanityOps is pre-deployment decision                                     | Post-deployment continuous monitoring systems |
| **Model Fine-tuning**            | Not involved; accepts given LLM                                                            | Model-level optimization                      |
| **Data Quality**                 | Does not inspect; assumes data already conforms to specifications                          | Data governance systems                       |

**SanityOps output value lies in**: enabling enterprises to make more **reliable decisions** before release, and through **continuous governance** reducing post-deployment rework, localization, and regression costs.

---

<a id="section-8-current-status-of-sanityops-framework-v10-completed"></a>
## Section 8: Current Status of SanityOps Framework (v1.0 Completed)

<a id="81-open-source-framework-apache-license-20"></a>
### 8.1 Open-Source Framework (Apache License 2.0)

SanityOps **core specifications and governance logic** have been released as open source, freely available for review, use, modification, and derivation:

**10 complete sub-frameworks or methodology white papers**:

1. **Core v1.0**: Unified terminology, object model, evidence standards, Gate definitions, classification and decision semantics
2. **Inspect Prompt v1.0**: System Prompt static defect framework
3. **Inspect Skill v1.0**: Skill static defect framework
4. **Inspect Tool v1.0**: Tool Schema static defect framework
5. **Inspect CROSS v1.0**: Cross-artifact static defect framework
6. **Risk Explicit v1.0**: Explicit risk classification and audit framework
7. **Risk Implicit v1.0**: Runtime risk detection methodology white paper
8. **Quality Tool-Agent v1.0**: Tool-Agent service quality assessment methodology white paper
9. **Quality RAG-Agent v1.0**: RAG-Agent service quality assessment framework
10. **Relevance v1.0**: Inspect defect and Risk/Quality diagnostic mapping framework

**Benefits of open-source framework**:

- ✅ Enterprises can **independently review** our governance logic
- ✅ Enterprises can **self-develop** without depending on commercial tools
- ✅ Community can **iteratively improve** and continuously optimize specifications
- ✅ Establish **industry consensus** and form de facto governance standards

**Repository**: https://github.com/sanityops-org/sanityops-framework
**License**: CC BY-SA 4.0

---

<a id="82-commercial-platform-enterprise-tooling"></a>
### 8.2 Commercial Platform (Enterprise Tooling)

Based on the open-source Framework, we provide **rich tooling delivery**:

**SaaS / On-Premises Deployment**:

- ✅ SaaS support: CLI, API; Web support for user-based version management, alerts, dashboards, reports, etc.
- ✅ On-premises support: Full platform components and management functions; support CLI, API, Web access to local services; support user-customized LLMs

**Platform Features**:

- **Automated Detection**: Large-scale automated execution of Inspect / Risk / Quality
- **Version Management**: Conclusion management for defect inspection, quality assessment, and risk detection based on artifact versions
- **Result Visualization**: Dashboards for backtracking analysis and search localization, and online exportable reports
- **Compliance and Audit**: Complete evidence chains, decision traces, compliance reports
- **Integration Ecosystem**: On-premises deployment seamlessly collaborates with enterprise existing CI/CD, code repositories, knowledge bases

---

<a id="section-9-what-sanityops-output-looks-like"></a>
## Section 9: What SanityOps Output Looks Like

Regardless of form (open-source tools, SaaS, CLI, API), SanityOps artifacts follow unified "evidence and decision" language:

<a id="91-inspect-output-defect-discovery"></a>
### 9.1 Inspect Output (Defect Discovery)

```
Defect ID: QD-2024-001
Artifact: Agent_SkillA_v2
Defect Type: Unclear boundaries
Severity: P1
Description: The "input parameter range" definition for this Skill is incomplete
     Missing handling constraints for "extreme values" (NULL, empty string, oversized values)
Remediation: Clearly define valid parameter ranges, boundary value handling rules
```

<a id="92-relevance-output-diagnostic-association"></a>
### 9.2 Relevance Output (Diagnostic Association)

```
Defect ID: QD-2024-001
Association Recommendations:
  - May cause Risk Implicit risk: Bypass parameter validation by injecting extreme values
  - May cause Quality issue: Unstable handling results for certain input types
Suggested Priority Validation: Dynamically test this Skill's response to extreme values
```

<a id="93-risk-implicit-output-attack-validation"></a>
### 9.3 Risk Implicit Output (Attack Validation)

```
Validation Result: Confirmed exploitable
Attack Path: Inject oversized value → Skill parameter validation fails → Agent degrades to default behavior
Severity: S1
Evidence: [Attack reproduction logs, stack traces, data snapshots]
Root Cause Direction (from Relevance diagnosis): QD-2024-001 (defect located)
Compensating Control: Add parameter length limit at Tool level
```

<a id="94-quality-output-quality-assessment"></a>
### 9.4 Quality Output (Quality Assessment)

```
Task Scenario: RAG recall accuracy
Quality Metrics:
  - Accuracy: 87% (target: 95%)
  - Coverage: 92% (target: 95%)
  - Hallucination Rate: 3.2% (target: <2%)
Failure Analysis:
  - Hallucinations mainly from Agent's "reasoning supplement" phase
  - Root Cause Direction (from Relevance diagnosis): QD-2024-002 (Prompt instruction ambiguous)
Improvement Recommendations: Limit Agent reasoning supplement, strengthen Prompt constraint expressions
```

<a id="95-release-decision-report-gate-summary"></a>
### 9.5 Release Decision Report (Gate Summary)

```
Artifact Version: Agent_RAG_v3.2.1
Assessment Date: 2024-XX-XX

[Inspect Gate]
Status: ⚠️ Conditional pass (1 P1 defect exists, listed in remediation plan)
Conclusion: Allow proceeding to next stage, but P1 defect must be fixed in v3.2.2

[Risk Gate]
Status: ✅ Pass (explicit risks: 0; implicit risks: 1 low-risk, compensating control exists)
Conclusion: From security perspective, meets deployment criteria

[Quality Gate]
Status: ⚠️ Conditional pass (quality metrics reached 92%, below target 95%)
Conclusion: Allow limited-scope deployment, need to establish monitoring alerts

[Comprehensive Decision]
✅ Allow deployment (restricted scope)
Requirements:
  - User scope: Internal test users
  - Monitoring metrics: Hallucination rate, accuracy, abnormal requests
  - Re-evaluation cycle: Complete re-assessment after 7 days
  - Rollback conditions: Hallucination rate >5% or S0 attack evidence appears
```

---

<a id="section-10-quick-start"></a>
## Section 10: Quick Start

<a id="101-get-the-open-source-framework"></a>
### 10.1 Get the Open-Source Framework

```bash
git clone https://github.com/sanityops-org/sanityops-framework.git
cd framework

# View complete specification documents
ls -la docs/

# View reference implementations
ls -la reference-impl/

# View usage examples
ls -la examples/
```

**Framework includes**:

- 10 complete Markdown specification documents
- Reference implementations (Python / Go)
- Defect mapping libraries and diagnostic engines
- Practical cases and best practices

---

<a id="102-use-the-commercial-platform-saas-on-premises"></a>
### 10.2 Use the Commercial Platform (SaaS / On-Premises)

**Trial Link**: https://www.sanityops.org/try

**Features**:

- Web UI: Upload artifacts via browser, view analysis results
- 3 artifacts free trial
- Support exporting complete reports

**Enterprise Deployment**:

- On-premises deployment (running in VPC)
- Hybrid deployment (data local, services cloud)
- Custom integration (Slack, DingTalk, enterprise knowledge bases, etc.)

**Contact Sales**: partnership@sanityops.org, master.leoyoung@gmail.com

---

<a id="103-command-line-tools"></a>
### 10.3 Command Line Tools

```bash
# Installation
pip install sanityops-cli

# Inspect: Check artifacts for specification defects
sanityops inspect <artifact-path>

# Risk: Security risk audit
sanityops risk --explicit <artifact-path>          # Explicit risks
sanityops risk --implicit <artifact-path>          # Implicit risks (environment configuration required)

# Quality: Quality assessment
sanityops quality --task <task-definition>

# Generate report
sanityops report <session-id> --format json|html

# Version control and regression
sanityops compare v1.0 v2.0 --show-delta
```

---

<a id="104-cicd-integration-example"></a>
### 10.4 CI/CD Integration Example

```yaml
# .github/workflows/sanityops-check.yml
name: SanityOps Checks

on: [push, pull_request]

jobs:
  inspect:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: sanityops/inspect-action@v1
        with:
          artifacts-path: ./agents/
          fail-on: P0,P1

  risk:
    runs-on: ubuntu-latest
    steps:
      - uses: sanityops/risk-action@v1
        with:
          artifacts-path: ./agents/
          risk-threshold: S0,S1

  quality:
    runs-on: ubuntu-latest
    steps:
      - uses: sanityops/quality-action@v1
        with:
          task-config: ./quality/config.yaml
          min-score: 90
```

---

<a id="section-11-recommended-reading-path"></a>
## Section 11: Recommended Reading Path

To quickly build a deep understanding of SanityOps, reading in the following order is recommended:

<a id="entry-path-30-minutes"></a>
### Entry Path (30 minutes)

1. **This document (Overview)** ← You are here
   Quickly understand "what SanityOps is, why it is needed, and how to use it"

<a id="foundation-path-3-4-hours"></a>
### Foundation Path (3-4 hours)

2. **[Core v1.0](https://github.com/sanityops-org/sanityops-framework/blob/main/framework/core.md)**
   Unified terminology, object model, classification systems, Gate semantics. **Why**: Build a common language, understand key distinctions such as "Inspect pass ≠ Security pass"

3. **[Relevance v1.0](https://github.com/sanityops-org/sanityops-framework/blob/main/framework/relevance.md)**
   How defects map to risk and quality inspection recommendations. **Why**: Understand how the three systems relate to each other and form a closed loop

<a id="professional-path-select-by-business-need"></a>
### Professional Path (Select by business need)

4. **[Inspect Prompt v1.0](https://github.com/sanityops-org/sanityops-framework/blob/main/inspect/prompt.md)**
+ **[Inspect Skill v1.0](https://github.com/sanityops-org/sanityops-framework/blob/main/inspect/skill.md)**

+ **[Inspect Tool v1.0](https://github.com/sanityops-org/sanityops-framework/blob/main/inspect/tool.md)**

+ **[Inspect CROSS v1.0](https://github.com/sanityops-org/sanityops-framework/blob/main/inspect/cross.md)**
   Static defect specifications, defect classifications, inspection checklists. **Suitable for**: Those who want to deeply understand "what constitutes a good artifact definition"
5. **[Risk Explicit v1.0](https://github.com/sanityops-org/sanityops-framework/blob/main/risk/explicit.md) + [Risk Implicit v1.0](https://github.com/sanityops-org/sanityops-framework/blob/main/risk/implicit.md)**
   Explicit and implicit risks, validation methods, attack scenarios. **Suitable for**: Teams responsible for Agent security audits

6. **[Quality Tool-Agent v1.0](https://github.com/sanityops-org/sanityops-framework/blob/main/quality/tool-agent.md) + [Quality RAG-Agent v1.0](https://github.com/sanityops-org/sanityops-framework/blob/main/quality/rag-agent.md)**
   Quality assessment metrics, threshold definitions, implementation cases. **Suitable for**: Teams responsible for Agent service quality

---

<a id="section-12-license-and-open-source-commitment"></a>
## Section 12: License and Open Source Commitment

<a id="121-framework-open-source-license"></a>
### 12.1 Framework Open Source License

**SanityOps Framework uses Apache License 2.0**

This means:

- ✅ Free use: Personal, enterprise, academic all free
- ✅ Free modification: Can modify specifications or implementations as needed
- ✅ Free distribution: Can share modified versions with others
- ✅ Commercial derivative: Can develop commercial products based on Framework
- ✅ Patent protection: We commit not to file patent lawsuits against Framework users

**Only requirement**: Retain open-source license and copyright notices

See: [LICENSE](https://github.com/sanityops-org/sanityops-framework/blob/main/LICENSE)

<a id="122-why-release-as-open-source"></a>
### 12.2 Why Release as Open Source

1. **Transparency**: Enterprises have the right to review our governance logic, not blindly trust
2. **Standardization**: Through open source, drive industry consensus on "Agent governance"
3. **Long-term value**: Open-source frameworks build trust and community better than any marketing
4. **Business model separation**: Framework open source + Platform commercial, each serving its role

---

<a id="section-13-about-us"></a>
## Section 13: About Us

SanityOps is a startup team focused on AI support system theory construction and tool implementation.

We witnessed at large internet companies:

- How traditional code quality systems evolved from "chaos" to "reliability"
- How enterprise security defenses transformed from "post-incident emergency" to "prevention"
- How complex systems with millions of lines of code achieved "monthly worry-free releases" through governance processes

**Now, we see AI Agents repeating this history** — enterprise AI applications urgently need a "from scratch" support system.

This is not academic research, nor self-indulgent framework design — this is **an engineering solution from real customer pain points**.

---

<a id="section-14-we-need-your-feedback"></a>
## Section 14: We Need Your Feedback

SanityOps is an **emerging, industry-level framework**. We sincerely invite criticism, suggestions, and case sharing.

<a id="feedback-channels"></a>
### Feedback Channels

- 📧 **Specification Discussion**: [discuss@sanityops.org](mailto:discuss@sanityops.org)
- 🐛 **Bug Reports / Improvement Suggestions**: [GitHub Issues](https://github.com/sanityops-org/sanityops-framework/issues)
- 💬 **Community Discussion**: [Discord](https://discord.gg/sanityops) (to be established)
- 📝 **Case Sharing**: [Case Library](https://github.com/sanityops-org/sanityops-framework/discussions/cases) (to be added)

<a id="we-especially-welcome"></a>
### We Especially Welcome

- 🔍 **Professional criticism**: Pointing out specification deficiencies, omissions, improvement opportunities
- 🛠️ **Self-implementations and feedback**: Enterprise-level implementations based on Framework, performance data, improvement suggestions
- 📚 **Application cases**: How you use SanityOps in enterprises, actual effects
- 🌍 **International adaptation**: Multi-language translation, regionalization suggestions

---

<a id="appendix-a-frequently-asked-questions-faq"></a>
## Appendix A: Frequently Asked Questions (FAQ)

<a id="q1-what-is-the-difference-between-sanityops-and-autotest-autobench"></a>
### Q1: What is the difference between SanityOps and AutoTest / AutoBench?

**AutoTest / AutoBench**: Automated testing, verifying "whether Agent performance in a scenario meets expectations"
**SanityOps**: Defect detection and root cause localization, answering "why performance does not meet expectations"

Complementary: Benchmark discovers problems → SanityOps localizes root causes → Fix → Benchmark again

---

<a id="q2-we-already-have-our-own-quality-assessment-process-do-we-still-need-the-quality-module"></a>
### Q2: We already have our own quality assessment process, do we still need the Quality module?

**Yes**. SanityOps Quality is:

- Standardized assessment framework (easy cross-team, cross-project benchmarking)
- Diagnostic association with defects (through Relevance, directly pointing to root causes)
- Continuous governance rhythm (forms closed loop with Inspect / Risk, rather than independent assessment)

---

<a id="q3-we-are-a-small-team-wont-inspectriskquality-all-be-too-complex"></a>
### Q3: We are a small team, won't Inspect/Risk/Quality all be too complex?

**Don't need to do all**. Recommend:

1. **Phase 1**: Do only Inspect (compiler checks for artifact definitions)
2. **Phase 2**: Add Quality (define quality thresholds)
3. **Phase 3**: Add Risk (if data security is involved)

Implement gradually by business priority.

---

<a id="q4-is-the-open-source-framework-sufficient-for-self-building"></a>
### Q4: Is the open-source Framework sufficient for self-building?

**Theoretically yes**. But requires:

- Deep understanding of specifications (may need 2-3 weeks study + discussion)
- Self-development of detection tools and dashboards (1-3 months effort)
- Continuous maintenance and specification upgrades

**Commercial Platform value**: Save tool development time, immediately obtain enterprise-level capabilities.

---

<a id="q5-what-is-the-relationship-between-sanityops-and-complianceaudit-systems"></a>
### Q5: What is the relationship between SanityOps and compliance/audit systems?

SanityOps is **technical governance** (Agent's own definitions and behaviors)
Compliance/audit systems are **business governance** (whether compliant with laws, regulations, enterprise policies)

SanityOps provides "**auditable evidence chains**" for compliance systems (what is the basis for each release decision).

---

<a id="final-words"></a>
## Final Words

**The era of AI applications has arrived, but "quality and security" remain the biggest constraints on development.**

SanityOps does not want to "solve all problems", but is committed to building for the industry a mapping theory, implementation methods, and tool platform around the relationship between AI applications and "defects, quality, and security" — filling a gap and fixing a blind spot for industry development.

**Join us in supporting the future of enterprise AI applications.**

---

<a id="data-source-references"></a>
## Data Source References

| ref ID    | Data                                                                                            | Original Source                                                                              | Link                                                                                                                                                                      |
|:--------- | ----------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ref:37    | 79% enterprises adopted AI Agents, only 11% in production, 6% trusted for core business         | Harvard Business Review Analytic Services (Dec 2025), sponsored by Workato and AWS           | [Fortune Report](https://fortune.com/2025/12/09/harvard-business-review-survey-only-6-percent-companies-trust-ai-agents/)                                                 |
| ref:34    | 88% of Agent projects fail to move from POC to production                                       | IDC (in partnership with Lenovo, 2025)                                                       | [Atlan Citation](https://atlan.com/know/ai-agent/ai-agent-scaling-in-production/)                                                                                         |
| ref:21,25 | 42% of enterprises abandoned most AI projects in 2025, 147% increase from 2024                  | S&P Global Market Intelligence (2025)                                                        | [AWS Official Blog Citation](https://aws.amazon.com/blogs/machine-learning/practical-implementation-considerations-to-close-the-ai-value-gap/)                         |
| ref:38    | 40% of agentic AI projects will be canceled by end of 2027                                      | Gartner (June 25, 2025 official press release)                                               | [Gartner Newsroom](https://www.gartner.com/en/newsroom/press-releases/2025-06-25-gartner-predicts-over-40-percent-of-agentic-ai-projects-will-be-canceled-by-end-of-2027) |
| ref:27    | 84% of AI project failures stem from governance and organizational issues, not technical issues | RAND Corporation (Aug 2024), The Root Causes of Failure for Artificial Intelligence Projects | [RAND Full Report](https://www.rand.org/pubs/research_reports/RRA2680-1.html)                                                                                             |

---

<a id="quick-navigation"></a>
## Quick Navigation

- 🌐 **Official Website**: [https://www.sanityops.org](https://www.sanityops.org)
- 📚 **Framework Open Source Repository**: [https://github.com/sanityops-org/sanityops-framework](https://github.com/sanityops-org/sanityops-framework)
- 🚀 **SaaS Trial**: [https://www.sanityops.org/try](https://www.sanityops.org/try)
- 💬 **Community Discussion**: [GitHub Discussions](https://github.com/sanityops-org/sanityops-framework/discussions)
- 📧 **Contact Us**: [hello@sanityops.org](mailto:hello@sanityops.org)

---

© 2026 Sanity AI Labs. Licensed under Creative Commons Attribution-ShareAlike 4.0 International.
https://www.sanityops.org  ·  hello@sanityops.org
v1.0  ·  July 2026
