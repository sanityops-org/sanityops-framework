---
title: Security Statement
description: Security Statement for SanityOps — technical and organizational security measures.
outline: false
---

# Security Statement

**Effective Date:** 2026-08-10

Sanity AI Labs ("SanityOps," "we," "us," or "our") takes the security of our systems, services, and your data seriously. This Security Statement describes the technical and organizational measures we apply to protect the SanityOps open-source CLI, website, and hosted Demo/Platform services (collectively, the "Services").

## 1. Scope

This statement applies to:

- The SanityOps website and account registration system;
- Hosted Demo and closed-source tooling requiring registration;
- Artifacts (e.g., prompts, agent configurations) uploaded by registered users and stored on our servers.

This statement does **not** apply to self-hosted / private deployments of SanityOps, where security is the sole responsibility of the deploying organization, as SanityOps does not receive or process any data from such deployments.

## 2. Data Protection Measures

We apply industry-standard safeguards appropriate to the nature of the data we process, including:

- Encryption of data in transit (TLS) between your device and our Services;
- Access controls restricting internal access to user data on a need-to-know basis;
- Periodic review of access permissions to administrative and production systems;
- Use of reputable, US-based third-party AI infrastructure providers (e.g., Google Gemini, together.ai) for processing that requires model inference; we do not route such processing through providers based outside the United States.

## 3. Account Security

- Users may register via email or OAuth (Google/GitHub). We recommend enabling any available account protection features offered by your OAuth provider.
- Users are responsible for maintaining the confidentiality of their credentials and for all activity occurring under their account.

## 4. Data Retention and Deletion

- Free-tier user artifacts are automatically deleted after six (6) months of account inactivity.
- Paid-tier user artifacts are automatically deleted after six (6) months of inactivity following subscription cancellation.
- Uploaded artifacts are **not** used to train SanityOps' own models.

## 5. No Guarantee / As-Is Disclaimer

The Demo and free-tier Services are provided "as is" and "as available," without warranties of any kind, including without limitation any guarantee of uptime, availability, or Service Level Agreement (SLA). SanityOps makes commercially reasonable efforts to maintain security and availability but cannot guarantee uninterrupted or error-free operation.

## 6. Reporting a Security Concern

If you believe you have discovered a security vulnerability in our Services, please refer to our [Responsible Disclosure Policy](./responsible-disclosure-policy) and contact us at **[security@sanityops.org](mailto:security@sanityops.org)**.

## 7. Changes to This Statement

We may update this Security Statement from time to time. Material changes will be reflected by updating the effective date above.


