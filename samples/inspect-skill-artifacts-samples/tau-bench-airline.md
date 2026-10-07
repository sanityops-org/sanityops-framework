---
title: "External Inspection Sample — tau-bench airline (Prompt + 14 Tool Schemas)"
description: "sanityops-inspect lite inspection of the sierra-research/tau-bench airline agent (policy system prompt + 14 static tool schemas): provenance, verbatim prompt and schema extracts, Stage A QD-P (L3) and QD-T (L1/L2/L3) verdicts, Mode 2 blocking, and the five-stage status board."
---

# External Inspection Sample — tau-bench airline (Prompt + 14 Tool Schemas)

> Instance output of the **sanityops-inspect** lite inspector (SanityOps Framework v1.0 condensed checklists, detect-only). This is an **F-* level instance record**, not a rule definition; the normative sources remain `inspect/prompt.md`, `inspect/tool.md`, `inspect/cross.md`, `inspect/permission.md`, and `framework/relevance.md`.

## Part 0 — Provenance

| Item | Value |
|---|---|
| Repository | https://github.com/sierra-research/tau-bench (airline domain: `tau_bench/envs/airline/`) |
| Branch / HEAD SHA | `main` · SHA unrecorded (fetched via raw.githubusercontent.com; GitHub API rate-limited at fetch time) |
| Artifact license | MIT License, © 2024 Sierra (`LICENSE`) |
| Fetched | 2026-10-07 |
| Fetched files | `wiki.md`, `tools/__init__.py` + 14 `tools/*.py`, `LICENSE` (17 files) |
| Artifact version label | `tau-bench airline@main (fetched 2026-10-07, SHA unrecorded)` |
| Host model | Moonshot AI/Kimi-K3 |
| Skill package | sanityops-inspect v1.0.0 |
| Specification baseline | SanityOps Framework v1.0 (September 2026) |
| Non-official-result statement | *This result is produced by the skill rule package applied by the host model; it is NOT a conclusion of the official SanityOps engine. For a full inspection use sanityops-cli.* |
| Inspection date | 2026-10-07 |
| Report copyright | Report text © SanityOps contributors, CC BY-SA 4.0 |

**Artifact-type inventory:** System-Prompt artifact = `wiki.md` (airline agent policy). Tool artifacts = 14 tool classes, each exposing a **static JSON schema** via `get_info()`. **No Skill-definition artifact exists.**

## Part 1 — Source Logic Artifacts (verbatim)

### 1.1 `wiki.md` — System Prompt (70 lines, © 2024 Sierra, MIT)

```text
# Airline Agent Policy

The current time is 2024-05-15 15:00:00 EST.

As an airline agent, you can help users book, modify, or cancel flight reservations.

- Before taking any actions that update the booking database (booking, modifying flights, editing baggage, upgrading cabin class, or updating passenger information), you must list the action details and obtain explicit user confirmation (yes) to proceed.

- You should not provide any information, knowledge, or procedures not provided by the user or available tools, or give subjective recommendations or comments.

- You should only make one tool call at a time, and if you make a tool call, you should not respond to the user simultaneously. If you respond to the user, you should not make a tool call at the same time.

- You should deny user requests that are against this policy.

- You should transfer the user to a human agent if and only if the request cannot be handled within the scope of your actions.

## Domain Basic

- Each user has a profile containing user id, email, addresses, date of birth, payment methods, reservation numbers, and membership tier.

- Each reservation has an reservation id, user id, trip type (one way, round trip), flights, passengers, payment methods, created time, baggages, and travel insurance information.

- Each flight has a flight number, an origin, destination, scheduled departure and arrival time (local time), and for each date:
  - If the status is "available", the flight has not taken off, available seats and prices are listed.
  - If the status is "delayed" or "on time", the flight has not taken off, cannot be booked.
  - If the status is "flying", the flight has taken off but not landed, cannot be booked.

## Book flight

- The agent must first obtain the user id, then ask for the trip type, origin, destination.

- Passengers: Each reservation can have at most five passengers. The agent needs to collect the first name, last name, and date of birth for each passenger. All passengers must fly the same flights in the same cabin.

- Payment: each reservation can use at most one travel certificate, at most one credit card, and at most three gift cards. The remaining amount of a travel certificate is not refundable. All payment methods must already be in user profile for safety reasons.

- Checked bag allowance: If the booking user is a regular member, 0 free checked bag for each basic economy passenger, 1 free checked bag for each economy passenger, and 2 free checked bags for each business passenger. If the booking user is a silver member, 1 free checked bag for each basic economy passenger, 2 free checked bag for each economy passenger, and 3 free checked bags for each business passenger. If the booking user is a gold member, 2 free checked bag for each basic economy passenger, 3 free checked bag for each economy passenger, and 3 free checked bags for each business passenger. Each extra baggage is 50 dollars.

- Travel insurance: the agent should ask if the user wants to buy the travel insurance, which is 30 dollars per passenger and enables full refund if the user needs to cancel the flight given health or weather reasons.

## Modify flight

- The agent must first obtain the user id and the reservation id.

- Change flights: Basic economy flights cannot be modified. Other reservations can be modified without changing the origin, destination, and trip type. Some flight segments can be kept, but their prices will not be updated based on the current price. The API does not check these for the agent, so the agent must make sure the rules apply before calling the API!

- Change cabin: all reservations, including basic economy, can change cabin without changing the flights. Cabin changes require the user to pay for the difference between their current cabin and the new cabin class. Cabin class must be the same across all the flights in the same reservation; changing cabin for just one flight segment is not possible.

- Change baggage and insurance: The user can add but not remove checked bags. The user cannot add insurance after initial booking.

- Change passengers: The user can modify passengers but cannot modify the number of passengers. This is something that even a human agent cannot assist with.

- Payment: If the flights are changed, the user needs to provide one gift card or credit card for payment or refund method. The agent should ask for the payment or refund method instead.

## Cancel flight

- The agent must first obtain the user id, the reservation id, and the reason for cancellation (change of plan, airline cancelled flight, or other reasons)

- All reservations can be cancelled within 24 hours of booking, or if the airline cancelled the flight. Otherwise, basic economy or economy flights can be cancelled only if travel insurance is bought and the condition is met, and business flights can always be cancelled. The rules are strict regardless of the membership status. The API does not check these for the agent, so the agent must make sure the rules apply before calling the API!

- The agent can only cancel the whole trip that is not flown. If any of the segments are already used, the agent cannot help and transfer is needed.

- The refund will go to original payment methods in 5 to 7 business days.

## Refund

- If the user is silver/gold member or has travel insurance or flies business, and complains about cancelled flights in a reservation, the agent can offer a certificate as a gesture after confirming the facts, with the amount being $100 times the number of passengers.

- If the user is silver/gold member or has travel insurance or flies business, and complains about delayed flights in a reservation and wants to change or cancel the reservation, the agent can offer a certificate as a gesture after confirming the facts and changing or cancelling the reservation, with the amount being $50 times the number of passengers.

- Do not proactively offer these unless the user complains about the situation and explicitly asks for some compensation. Do not compensate if the user is regular member and has no travel insurance and flies (basic) economy.
```

### 1.2 Tool Schemas — structured extracts (14 tools)

Registry (`tools/__init__.py`): book_reservation, calculate, cancel_reservation, get_reservation_details, get_user_details, list_all_airports, search_direct_flight, search_onestop_flight, send_certificate, think, transfer_to_human_agents, update_reservation_baggages, update_reservation_flights, update_reservation_passengers.

Every schema is a static `get_info()` literal of the form `{"type": "function", "function": {name, description, parameters}}`. **None of the 14 declares `additionalProperties`.**

| Tool | Parameters | Description (verbatim) |
|---|---|---|
| calculate | `expression` (string) | "Calculate the result of a mathematical expression." |
| think | `thought` (string) | "Use the tool to think about something. It will not obtain new information or change the database, but just append the thought to the log. Use it when complex reasoning is needed." |
| list_all_airports | — (empty) | "List all airports and their cities." |
| search_direct_flight | `origin`, `destination`, `date` (strings) | "Search direct flights between two cities on a specific date." |
| search_onestop_flight | `origin`, `destination`, `date` (strings) | "Search **direct** flights between two cities on a specific date." (copy-paste error — should say one-stop) |
| get_user_details | `user_id` | "Get the details of an user, including their reservations." |
| get_reservation_details | `reservation_id` | "Get the details of a reservation." |
| transfer_to_human_agents | `summary` | "Transfer the user to a human agent, with a summary of the user's issue. Only transfer if the user explicitly asks for a human agent, or if the user's issue cannot be resolved by the agent with the available tools." |
| book_reservation | `user_id`, `origin`, `destination`, `flight_type`(enum one_way/round_trip), `cabin`(enum), `flights`(array of {flight_number,date}), `passengers`(array of {first_name,last_name,dob}), `payment_methods`(array of {payment_id,amount:number}), `total_baggages`(int), `nonfree_baggages`(int), `insurance`(enum yes/no) | "Book a reservation." |
| cancel_reservation | `reservation_id` | "Cancel the whole reservation." |
| update_reservation_flights | `reservation_id`, `cabin`(enum), `flights`(array), `payment_id` | "Update the flight information of a reservation." |
| update_reservation_baggages | `reservation_id`, `total_baggages`(int), `nonfree_baggages`(int), `payment_id` | "Update the baggage information of a reservation." |
| update_reservation_passengers | `reservation_id`, `passengers`(array) | "Update the passenger information of a reservation." |
| send_certificate | `user_id`, `amount`(number) | "Send a certificate to a user. Be careful!" |

Notable copy-paste / description defects (verbatim): `send_certificate.user_id` description = "The ID of the user to **book the reservation**, such as 'sara_doe_496'."; `get_reservation_details.invoke` returns "Error: **user** not found" (should be "reservation"); `search_onestop_flight` description reads "Search **direct** flights…".

## Part 2 — Inspection Results

### Stage A-1 — System Prompt (QD-P)

#### Tier determination: **L3 Complex Agent**

Basis (prompt-checklist §3.1, ≥2 criteria): 14 tool invocations (≥4) ✓; complex multi-step workflows (book/modify/cancel with multi-step confirmation) ✓; security-sensitive (PII incl. date-of-birth + payment/refund operations) ✓; exception handling required (status gating, error paths) ✓. Four criteria → L3. The table evaluates Appendix A.3's 34-item compliance set plus matrix item QD-P-1.4.3 (35 rows).

#### L3 minimum set — 35 rows

| ID | V | Evidence (verbatim, short) / basis |
|---|---|---|
| QD-P-1.1.1 Direct Contradiction | PASS | Change-flights (L44) vs change-cabin (L46) govern different operations; no same-context mutually-exclusive directives found |
| QD-P-1.1.3 Example-Rule Contradiction | PASS | Policy contains no examples |
| QD-P-1.2.1 Role-Responsibility Mismatch | PASS | "airline agent" role (L5) matches book/modify/cancel responsibilities |
| QD-P-1.2.3 Constraint-Responsibility Mismatch | PASS | Confirmation (L7), one-call-per-turn (L11), deny (L13) bound but do not prohibit core responsibilities |
| QD-P-1.5.1 Responsibilities Support Objective | PASS | Book/modify/cancel/refund responsibility set supports the stated objective |
| QD-P-2.2.1 Undeclared Input Source | PASS | Input source is the user conversation; per-operation inputs enumerated (L30, L42, L56) |
| **QD-P-2.3.4 Missing Security/Privacy Filtering** | **FAIL** | Processes date-of-birth (L32), email/addresses/payment methods (L19); no sensitive-data filtering or privacy constraint defined anywhere |
| **QD-P-2.5.2 Missing Security Boundary Constraints** | **FAIL** | No authentication requirement (cf. retail wiki L5 "authenticate via email or name+zip") and no one-user-per-conversation isolation (cf. retail L9); only L13 "deny user requests that are against this policy" |
| QD-P-1.3.3 Undefined Boundaries | PASS | Authorization scope (book/modify/cancel/refund), prohibition (deny L13), handoff (L15) all defined |
| QD-P-1.5.2 Resources Support Workflow | PASS | Each action maps to a declared tool (book→book_reservation, search→search_*_flight, …) |
| QD-P-1.6.1 Critical Decision Word Vagueness | PASS | Directives use must/cannot/only; no vague word carries a security/permission decision |
| QD-P-2.2.2 Unconstrained Input Format | PASS | Structured identifiers (IATA codes, 'YYYY-MM-DD') are format-documented at schema level |
| QD-P-2.2.3 Required/Optional Not Distinguished | PASS | Required inputs enumerated per operation (L30, L32, L34, L42, L56) |
| **QD-P-2.2.4 Undefined Missing-Input Handling** | **FAIL** | No model-side behavior when authentication/lookup fails or the user cannot supply a required user_id/reservation_id |
| QD-P-2.3.1 Undefined Output Format | PASS | Human-facing conversation; pre-write "list the action details" (L7) fixes the confirmation structure |
| QD-P-2.3.2 Incomplete Output Schema | PASS | No downstream machine parser; minimal morphology, basis recorded |
| QD-P-2.4.2 Undeclared Resources/Tools | PASS | Tools declared via 14 static function-calling schemas |
| **QD-P-2.4.3 Missing Tool Invocation Specification** | **FAIL** | Sequencing/confirmation rules rich, but failure handling undefined — tool error strings ("Error: user not found", "Error: reservation not found", …) have no specified agent behavior |
| QD-P-1.1.2 Priority Conflict | PASS | Constraints partition cleanly by operation; no unarbitrated MUST conflict found |
| QD-P-1.6.2 Rules Depending on Model Internal State | PASS | No confidence/uncertainty/intent-keyed rules |
| QD-P-1.6.3 Soft Rule Interweaving Without Arbitration | PASS | Directives predominantly hard constraints |
| QD-P-1.6.6 Implicit Assumption Dependency | PASS | Riskiest assumptions made explicit ("The API does not check these for the agent, so the agent must make sure…", L44/L58) |
| QD-P-1.6.7 Non-Monotonic Reasoning Defects | PASS | Confirmation gates keep conclusions revisable until commit |
| QD-P-2.3.3 Missing Output Stability Assurance | PASS | Grounding (L9 "should not provide any information… not provided by the user or available tools") + confirmation-before-write |
| QD-P-2.4.1 Incomplete Workflow Steps | PASS | Book/modify/cancel flows complete (precondition → detail listing → confirmation → effect) |
| QD-P-2.5.1 Missing Termination Constraints | PASS | No autonomous loops; one-call-per-turn (L11) |
| **QD-P-2.5.3 Missing Permission Control Boundaries** | **FAIL** | No authentication scope and no cross-user isolation (contrast retail); an authenticated-by-nothing agent could access other users' reservation data |
| QD-P-2.5.4 Undefined Constraint Priority | PASS | Constraints partition by operation/status; conflicts resolve through explicit gating |
| **QD-P-2.5.5 Missing Resource Invocation Frequency Limits** | **FAIL** | Only "one tool call at a time" (L11); no cumulative or once-only limit (retail has explicit once-only at L31/L57) — modify/cancel can be invoked unboundedly |
| **QD-P-2.6.1 Runtime Exceptions Not Covered** | **FAIL** | Tool error classes have no prompt-defined handling |
| **QD-P-2.6.2 Missing Degradation and Recovery Strategy** | **FAIL** | No degradation/recovery strategy for failed tool executions |
| **QD-P-2.7.1 Insufficient Positive Example Representativeness** | **FAIL** | Zero examples in the entire policy |
| **QD-P-2.7.2 Insufficient Counter-Example Coverage** | **FAIL** | Zero counter-examples |
| **QD-P-2.7.3 Missing Boundary-Case Examples** | **FAIL** | No boundary-case examples (unknown user, wrong-status flight, insufficient balance) |
| QD-P-1.4.3 Invalid Skill Definitions | N/A | No Skill definitions exist (morphology absent) |

**Stage A-1 totals: 11 P0 FAIL · 23 PASS · 1 N/A (35 rows).** P0 items failed once each: 2.2.4, 2.3.4, 2.4.3, 2.5.2, 2.5.3, 2.5.5, 2.6.1, 2.6.2, 2.7.1, 2.7.2, 2.7.3.

### Stage A-2 — Tool Schemas (QD-T, 14 tools)

#### Tier determinations (tool-checklist §3.1)

| Tier | Tools | Basis |
|---|---|---|
| **L1** (5) | calculate, think, list_all_airports, search_direct_flight, search_onestop_flight | Read-only, no state change, non-personal data (flights/airports are public catalog data) |
| **L2** (1) | transfer_to_human_agents | External side effect (handoff) without business-data write |
| **L3** (8) | get_user_details, get_reservation_details, book_reservation, cancel_reservation, update_reservation_flights, update_reservation_baggages, update_reservation_passengers, send_certificate | Sensitive-data handling (PII + payment methods/balances + payment history) and/or irreversible financial operations (payment deduction, refund, once-only booking) |

#### P0 verdicts (L3 set, 14 P0 items; L1/L2 P0 items reported where applicable)

| ID | Finding |
|---|---|
| QD-T-1.4 Uncontrolled additionalProperties (P0 at L2/L3) | **All 9 non-L1 tools FAIL** — no `additionalProperties` declaration (e.g. book_reservation L113–224, send_certificate L37–51) |
| QD-T-2.1 String Without Length Constraint (P0 at L3) | **All 8 L3 tools FAIL** — every string parameter (user_id, reservation_id, origin, …) lacks `maxLength`/`minLength` |
| QD-T-2.3 Number Without Boundary (P0 at L3) | **FAIL** — `send_certificate.amount` (number, L45) and `book_reservation.payment_methods[].amount` (number, L190) lack `minimum`/`maximum` |
| QD-T-2.4 Array Without Length Constraint (P0 at L3) | **FAIL** — `book_reservation.flights/passengers/payment_methods`, `update_reservation_flights.flights`, `update_reservation_passengers.passengers` arrays lack `maxItems` (policy's "at most five passengers" is not reflected in schema) |
| QD-T-3.1 Write Operation Not Identified (P0 at L3) | **FAIL** — `book_reservation` "Book a reservation." (L112), `cancel_reservation` "Cancel the whole reservation." (L38), the three `update_reservation_*` ("Update the … information of a reservation.") are write/irreversible operations whose descriptions carry no write-operation notice and no confirmation requirement (contrast retail's cancel_pending_order) |
| QD-T-3.3 Batch Operation Without Limit (P0 at L3) | **FAIL** — passenger/payment arrays unconstrained in schema |
| QD-T-3.5 Cross-Tool Data Flow Risk (P0 at L3) | **FAIL** — `get_user_details` returns the full profile incl. payment methods/balances (invoke L13, description L22 "including their reservations") into model context; `get_reservation_details` returns payment_history — masking would not break the designed id-chaining |
| QD-T-4.1 Insufficient Description Quality (P0 at L3) | **FAIL** — `send_certificate` "Send a certificate to a user. Be careful!" (L36) with `user_id` described as "to **book the reservation**" (L41, copy-paste); `search_onestop_flight` described as "Search **direct** flights" (L54, copy-paste from search_direct_flight) |
| QD-T-4.2 Undeclared Side Effects (P0 at L3) | **FAIL** — `cancel_reservation` description (L38) omits the refund/status-change side effects (invoke L20–29); `update_reservation_flights`/`_baggages` omit the payment deduction side effect |

**Stage A-2 totals:** L1 tools 0 P0 (search_onestop's "direct" description is QD-T-4.1 = P2 at L1, non-blocking); L2 `transfer_to_human_agents` 1 P0 (1.4 additionalProperties); L3 tools carry the P0 findings listed above (1.4 ×8, 2.1 ×8, plus 2.3/2.4/3.1/3.3/3.5/4.1/4.2 across the financial/update tools).

#### Mode decision

Stage A-1 carries 11 unfixed prompt P0 findings and Stage A-2 carries tool P0 findings → **Mode 2 (P0 blocking)**. Downstream stages are not executed.

### Stage B / C / D / E

**Not Executed** — not executed because upstream P0 findings are unfixed (SKILL.md §5 Mode 2). Applicability for a re-run: QD-PT applicable (prompt references tools); QD-PS/QD-ST N/A (no Skill artifact); Permission would additionally record "incomplete artifact set" (no Skill artifact).

### Status board

```text
Stage A (Single-artifact):  Executed — Prompt QD-P (L3, 35 rows: 11 P0 FAIL, 23 PASS, 1 N/A) and Tool QD-T (14 tools tiered L1×5/L2×1/L3×8: P0 across additionalProperties/length-boundary/write-not-identified/description-quality/side-effects); no Skill artifact exists
Stage B (Cross):            Not Executed — not executed because upstream P0 findings are unfixed (QD-PT applicable at re-run; QD-PS/QD-ST N/A — no Skill artifact)
Stage C (Gate-0):           Not Executed — not executed because upstream P0 findings are unfixed
Stage D (Permission QD-PM): Not Executed — not executed because upstream P0 findings are unfixed; additionally "incomplete artifact set" (no Skill artifact)
Stage E (Impact outlook):   Not Executed — not executed because upstream P0 findings are unfixed
```

**Inspector scope reminder:** detect-only — no fixed prompts/schemas were generated; these static findings say nothing about Risk (Explicit/Implicit) or Quality outcomes, and a future Permission quick-mode pass validates declared proportionality only — not IAM/PEP/runtime enforcement.
