# The Relationship Between SanityOps and Harness: A Brief Overview

---

## 1. Principles

An Agent system can be understood as two parts: **Logic Design (Blueprint)** and **Runtime Implementation (Execution Engine)**.

- **SanityOps** operates at the logic design layer: System Prompt → Skill → Tool Schema, sequentially defining the Agent's goal boundaries, capability scope, and hard constraints on callable capabilities. Through three core phases — Inspect (static defect inspection), Risk (risk validation), and Quality (service quality assessment) — it answers "whether this design blueprint is correct and whether boundaries are clear."
- **Harness** operates at the runtime layer: it is the glue code outside the Model, responsible for tool call orchestration, control loops, context management, and safety guardrails, transforming the rules defined in the blueprint into actual executable behavior.

**Core Principle**: The parameter constraints defined in the Tool Schema are precisely the rules Harness relies on for runtime orchestration and interception. If the blueprint itself has defects (e.g., a parameter "lacks constraints and format validation"), Harness cannot automatically fill this gap even when operating strictly according to the rules.

**Position of the Gate**: The SanityOps Gate aggregates results from Inspect, Risk, and Quality to make release decisions, while Harness is the **execution carrier** of Gate decisions — the Gate determines "whether it can run," and Harness is responsible for "how it runs and how to intercept during execution."

---

## 2. Functional Comparison

| Dimension              | SanityOps                                                                 | Harness                                                                                       |
| ---------------------- | ------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| **Layer**              | Logic design layer (static + validation)                                  | Runtime execution layer (dynamic)                                                             |
| **Core Objects**       | Prompt, Skill, Tool Schema                                                | Tool call orchestration, control loops, context management                                    |
| **Core Question**      | Are the rules written correctly and completely?                           | Are the rules executed correctly and properly enforced?                                       |
| **Typical Actions**    | Static inspection, constructing attack test cases for validation, scoring | Actually calling tools, intercepting or allowing based on rules, maintaining multi-step state |
| **Security Mechanism** | Logic vulnerability scanning (discovering design defects)                 | Runtime guardrails (rate limiting, timeout circuit breakers, permission validation)           |
| **Explicit Boundary**  | Does not handle building, orchestrating, or running Agents                | Does not judge whether rule designs themselves are reasonable                                 |

**Key Distinction**: SanityOps Risk validates whether Tool Schema defects can be actually exploited by **constructing attack test cases and dynamically validating in shadow sandboxes**. Harness safety guardrails are **runtime protection** (call frequency, timeouts, permissions, etc.). The two are complementary, not substitutes.

---

## 3. Example: Path Traversal Risk from Missing Parameter Validation

Suppose an Agent has a "file read" tool with the following parameter definition in its Tool Schema:

```json
{ "file_path": { "type": "string" } }
```

That is: the parameter type is only specified as "string," with no format restrictions, path whitelist, or length constraints.

**What SanityOps Does**:
During the Inspect phase, static inspection of this Tool Schema discovers the defect "parameter lacks constraints and format validation," recording it as a structured defect entry that clearly identifies the root cause and attack surface, with remediation recommendations (e.g., add regex validation, path whitelist). Subsequently, the Risk phase may construct a real attack input (e.g., passing `../../etc/passwd` as `file_path` for path traversal attempts) to validate whether this defect can actually be exploited, thereby confirming the risk level. This entire process occurs **before Agent production deployment**, producing a written conclusion of "whether this tool's definition itself has problems."

**What Harness Does**:
During actual Agent runtime, when the model decides to call the "file read" tool and passes a `file_path` parameter value, Harness is responsible for actually executing this call: passing the parameter to the underlying file system interface, obtaining results, formatting the results, and feeding them back to the model for use in the next reasoning step. **If the Tool Schema originally had no path validation rules, and Harness has no additional validation logic at runtime, then regardless of what path is passed, Harness will "faithfully" execute it** — because the basis for its execution itself lacks interception rules.

**Key Integration Point**: It is precisely because SanityOps discovered and drove the remediation of the "missing parameter validation" defect before production deployment, and the Tool Schema was supplemented with path whitelist constraints, that Harness has a basis for action at runtime and can intercept requests for non-whitelist paths before actual execution. **Without this SanityOps step, even if Harness is technically robust, it would only be "faithfully executing a rule without guardrails."**

This remediation closed loop (SanityOps discovery → Logic Artifact update → Harness execution of new rules) is the typical collaboration pattern between SanityOps and Harness.

---

## 4. Summary in One Sentence

**Harness enables Agents to actually run according to the rules; SanityOps ensures these rules themselves are worth executing, and guides Harness on when to allow execution through Gate decisions.**
