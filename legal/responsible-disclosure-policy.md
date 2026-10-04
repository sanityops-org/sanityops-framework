---
title: Responsible Disclosure Policy
description: How to report security vulnerabilities in SanityOps responsibly.
outline: false
---

# Responsible Disclosure Policy

**Effective Date:** 2026-08-10

Sanity AI Labs values the contributions of independent security researchers in helping us maintain the security of the SanityOps open-source CLI, website, and hosted Services. This Responsible Disclosure Policy explains how to report a suspected vulnerability and what you can expect from us.

## 1. Scope

This policy applies to:

- The SanityOps website and account/authentication systems;
- Hosted Demo and closed-source Platform tooling;
- The publicly available SanityOps CLI and open-source repositories.

Self-hosted/private deployments are out of scope, as we do not operate or have visibility into such environments.

## 2. How to Report

Please submit a report to **[security@sanityops.org](mailto:security@sanityops.org)**, including:

- A description of the vulnerability and its potential impact;
- Step-by-step reproduction instructions or proof-of-concept;
- Any relevant logs, screenshots, or affected URLs/endpoints;
- Your contact information (optional, for follow-up).

We encourage encrypting sensitive report details where possible and will respond with a secure channel if needed.

## 3. Our Commitment

Upon receiving a valid report, we will:

- Acknowledge receipt within a reasonable timeframe;
- Investigate and validate the reported issue;
- Keep you informed of remediation progress where appropriate;
- Credit researchers who responsibly disclose valid findings, upon request (we do not currently operate a paid bug bounty program).

## 4. Guidelines for Researchers

To qualify for safe-harbor treatment under this policy, please:

- Provide us reasonable time to investigate and remediate an issue before any public disclosure;
- Avoid accessing, modifying, or deleting data that does not belong to you;
- Avoid degrading the availability or integrity of our Services (e.g., no denial-of-service testing);
- Interact only with accounts you own or have explicit permission to test;
- Not exploit a vulnerability beyond what is necessary to demonstrate it.

Reports and testing conducted in good faith and in accordance with these guidelines will not result in legal action initiated by Sanity AI Labs.

## 5. Out of Scope

The following are generally considered out of scope:

- Vulnerabilities in third-party AI infrastructure providers (e.g., underlying LLM providers) — please report these directly to the relevant provider;
- Issues in self-hosted/private deployments;
- Social engineering, physical security, or denial-of-service attacks;
- Reports without a credible, demonstrable security impact.

## 6. Contact

For all security-related reports and inquiries: **[security@sanityops.org](mailto:security@sanityops.org)**
