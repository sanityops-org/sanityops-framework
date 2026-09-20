# About — SanityOps

---

## Building the Governance Layer for AI Agents

SanityOps didn't start as a framework. It started as a failure we couldn't explain.

## Our Origin

Before SanityOps existed, we were building something else entirely: an enterprise collaboration platform meant to let teams work with AI as a shared teammate, not a private chat window.

It worked well in internal testing. Then we demoed it to a client.

A reasonable, ordinary business question — nothing designed to trip the system up — was enough to break it in front of the room. The routing logic and retrieval pipeline simply collapsed. What made it worse wasn't the failure itself. It was that we had no way to explain *why* it happened. No dashboard, no metric, nothing that could tell us where the system had drifted from real business data. Standard testing approaches gave us nothing to work with.

So we went looking for an answer. We looked at the evaluation projects available at the time and found they weren't built for the complexity of real enterprise deployments. And when we looked for an industry standard for evaluating enterprise-grade AI agents before they went live, we found there wasn't one. Every benchmark measured how well a model could answer questions. None of them measured whether an agent would embarrass you in front of a customer.

There was no standard to follow, so we had to build one first — before we could build anything else.

That's where SanityOps began.

## What We Learned Next

Once we started defining what "quality" meant for an enterprise agent, a second problem surfaced: in this context, quality and safety are really the same question — both are about what an agent's output actually contains and does.

That's a different kind of problem than traditional IT security. Classic security defends network perimeters and code-level vulnerabilities. Agent risk lives somewhere else — in language itself. A carefully worded prompt can redirect business logic without ever touching a firewall. We call this a semantic attack surface, and it doesn't show up in any conventional security scan.

This is why SanityOps treats **Inspect**, **Risk**, and **Quality** as one connected discipline instead of three separate tools bolted together.

## What We Build

SanityOps is a continuous governance framework for AI agents. It inspects the logical artifacts that define agent behavior — system prompts, skills, tool schemas — for defects that are otherwise invisible until they surface in production. It evaluates explicit and implicit risk. It measures the service quality users actually experience, not just benchmark scores.

We don't promise perfect correctness or absolute safety. No framework honestly can. What we commit to is making agent behavior auditable: explicit standards, repeatable validation, and evidence-based decisions before something ships — and continuously after.

## Open by Design

The framework's core specifications and governance logic are open source, released under CC BY-SA 4.0. Enterprises can review our reasoning, adapt it, or build on it independently — nothing here is a black box you have to trust blindly.

We believe governance standards for AI agents should converge the way code quality and security practices eventually did in traditional software: not through one vendor's proprietary method, but through shared, inspectable, community-tested standards.

## What SanityOps Is Not

To keep expectations honest, SanityOps does not replace:

| Domain                            | Our Role                                                                             | Who Owns It                  |
| --------------------------------- | ------------------------------------------------------------------------------------ | ---------------------------- |
| IAM / Access Control              | We verify artifacts express permission constraints correctly — we don't enforce them | Your IAM system              |
| Network & Infrastructure Security | Not our layer                                                                        | Your infrastructure security |
| Production Monitoring             | We inform pre-release decisions                                                      | Your live monitoring systems |
| Model Fine-tuning                 | Out of scope — we work with the model you give us                                    | Model-layer optimization     |
| Data Governance                   | We assume compliant data going in                                                    | Your data governance         |

## Join the Work

SanityOps grew out of real deployments, not a lab exercise — and it's still shaped that way. If you're evaluating, deploying, or governing AI agents in production and hitting problems the current standards don't cover, we want to hear about it.

Review the specifications. Open an issue. Tell us where it breaks.

## Contact

- **General inquiries**: [hello@sanityops.org](mailto:hello@sanityops.org)
- **Partnership**: [partnership@sanityops.org](mailto:partnership@sanityops.org)
- **Security & compliance**: [security@sanityops.org](mailto:security@sanityops.org)
