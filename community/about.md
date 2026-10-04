---
title: About SanityOps
description: "About SanityOps and Sanity AI Labs: mission, maintainers, project status, and contact information."
---

# About SanityOps

---

Sanity AI Labs is a small team focused on research and tooling for AI agent quality, safety, and governance. We develop and maintain SanityOps.

## Why We Started

Two years ago, before SanityOps, we tried to build an enterprise collaboration platform where AI could work as a shared teammate, rather than a private chat window. That attempt failed.

During a client demo, an ordinary business question exposed failures in the routing and retrieval logic. The harder problem was that we could not adequately explain why it had failed.

That experience pushed us toward a more fundamental question: how do we inspect the logic that defines an agent, validate its risks, and assess whether it is ready for real-world use?

SanityOps grew out of that question.

## What We Build

SanityOps is a quality, safety, and governance framework for AI agents. It connects three activities: inspecting the logical artifacts that define agent behavior, validating security risks, and evaluating the quality of the service users receive.

We publish the methodology as an open specification and build tools that implement it. The Inspector CLI is open source; the broader Platform, including Risk and Quality tools, is offered commercially through SaaS and self-hosted deployments.

Our goal is not to promise perfect correctness or absolute safety. It is to support repeatable validation, traceable evidence, and better-informed release decisions.

## Open by Design

**Open specification.** The framework specification is released under CC BY-SA 4.0. Anyone can review its reasoning, challenge its assumptions, adapt it under the license, or implement it independently.

**Open-source inspection.** The Inspector CLI is released under Apache 2.0. It can run entirely locally with your own model credentials: no SanityOps account is required, and artifacts are not uploaded to the SanityOps Platform unless you choose to. Model requests go to the endpoint you configure.

**Deployment under your control.** Enterprise deployments can be self-hosted, with support for your own model endpoints, including locally hosted models. In a self-hosted / private deployment, all customer data stays within your own environment and is never transmitted to the public SanityOps Platform. Contracted enterprise customers can also obtain source-code review access under NDA.

**Open to correction.** We welcome criticism, counterexamples, and practical experience. Review the specifications, open an issue, and tell us where the methodology does not hold up.

## Our Scope

SanityOps complements existing engineering and security systems. It does not replace IAM enforcement, infrastructure security, production monitoring, model fine-tuning, or data governance.

## Contact

If you are building, evaluating, or deploying AI agents and encounter a problem the framework does not cover, we would like to hear about it.

- **General inquiries:** [hello@sanityops.org](mailto:hello@sanityops.org)
- **Partnership:** [partnership@sanityops.org](mailto:partnership@sanityops.org)
- **Security & compliance:** [security@sanityops.org](mailto:security@sanityops.org)
