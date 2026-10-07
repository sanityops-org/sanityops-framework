---
title: "External Inspection Sample — tau-bench retail (Prompt + 16 Tool Schemas)"
description: "sanityops-inspect lite inspection of the sierra-research/tau-bench retail agent (policy system prompt + 16 static tool schemas): provenance, verbatim prompt and structured schema extracts, Stage A QD-P (L3) and QD-T (L1/L2/L3) verdicts, Mode 2 blocking, downstream-stage status, and the five-stage status board."
---

# External Inspection Sample — tau-bench retail (Prompt + 16 Tool Schemas)

> Instance output of the **sanityops-inspect** lite inspector (SanityOps Framework v1.0 condensed checklists, detect-only). This is an **F-* level instance record**, not a rule definition; the normative sources remain `inspect/prompt.md`, `inspect/tool.md`, `inspect/cross.md`, `inspect/permission.md`, and `framework/relevance.md`.

## Part 0 — Provenance

| Item | Value |
|---|---|
| Repository | https://github.com/sierra-research/tau-bench (retail domain: `tau_bench/envs/retail/`) |
| Branch / HEAD SHA | `main` · SHA unrecorded (fetched via raw.githubusercontent.com; GitHub API rate-limited at fetch time; latest commit 2025-01-21 per GitHub web UI) |
| Artifact license | MIT License, © 2024 Sierra (`LICENSE`) — prompt text reproduced verbatim under that license |
| Fetched | 2026-10-07 |
| Fetched files | `tau_bench/envs/retail/wiki.md`, `tau_bench/envs/retail/tools/__init__.py` + 16 `tools/*.py`, `LICENSE` (19 files; see `_process/fetch/MANIFEST.md` Target 3) |
| Artifact version label | `tau-bench retail@main (fetched 2026-10-07, SHA unrecorded)` |
| Host model | Moonshot AI/Kimi-K3 |
| Skill package | sanityops-inspect v1.0.0 |
| Specification baseline | SanityOps Framework v1.0 (September 2026) |
| Non-official-result statement | *This result is produced by the skill rule package applied by the host model; it is NOT a conclusion of the official SanityOps engine. For a full inspection use sanityops-cli.* |
| Inspection date | 2026-10-07 |
| Report copyright | Report text © SanityOps contributors, CC BY-SA 4.0 |

**Artifact-type inventory:** System-Prompt artifact = `wiki.md` (the retail agent policy, injected as the agent's instructions). Tool artifacts = 16 tool classes, each exposing a **static JSON schema** via `get_info()` (unlike the LangChain-generated schemas in the gpt-researcher and crewAI samples, these schemas are fully inspectable static text); `tools/__init__.py` is the authoritative registry (`ALL_TOOLS`). **No Skill-definition artifact exists.** Executable `invoke()` bodies are implementation code, not logic artifacts; they were read only to verify description/side-effect claims.

## Part 1 — Source Logic Artifacts

### 1.1 `wiki.md` — System Prompt (verbatim, 81 lines, © 2024 Sierra, MIT)

```text
# Retail agent policy

As a retail agent, you can help users cancel or modify pending orders, return or exchange delivered orders, modify their default user address, or provide information about their own profile, orders, and related products.

- At the beginning of the conversation, you have to authenticate the user identity by locating their user id via email, or via name + zip code. This has to be done even when the user already provides the user id.

- Once the user has been authenticated, you can provide the user with information about order, product, profile information, e.g. help the user look up order id.

- You can only help one user per conversation (but you can handle multiple requests from the same user), and must deny any requests for tasks related to any other user.

- Before taking consequential actions that update the database (cancel, modify, return, exchange), you have to list the action detail and obtain explicit user confirmation (yes) to proceed.

- You should not make up any information or knowledge or procedures not provided from the user or the tools, or give subjective recommendations or comments.

- You should at most make one tool call at a time, and if you take a tool call, you should not respond to the user at the same time. If you respond to the user, you should not make a tool call.

- You should transfer the user to a human agent if and only if the request cannot be handled within the scope of your actions.

## Domain basic

- All times in the database are EST and 24 hour based. For example "02:30:00" means 2:30 AM EST.

- Each user has a profile of its email, default address, user id, and payment methods. Each payment method is either a gift card, a paypal account, or a credit card.

- Our retail store has 50 types of products. For each type of product, there are variant items of different options. For example, for a 't shirt' product, there could be an item with option 'color blue size M', and another item with option 'color red size L'.

- Each product has an unique product id, and each item has an unique item id. They have no relations and should not be confused.

- Each order can be in status 'pending', 'processed', 'delivered', or 'cancelled'. Generally, you can only take action on pending or delivered orders.

- Exchange or modify order tools can only be called once. Be sure that all items to be changed are collected into a list before making the tool call!!!

## Cancel pending order

- An order can only be cancelled if its status is 'pending', and you should check its status before taking the action.

- The user needs to confirm the order id and the reason (either 'no longer needed' or 'ordered by mistake') for cancellation.

- After user confirmation, the order status will be changed to 'cancelled', and the total will be refunded via the original payment method immediately if it is gift card, otherwise in 5 to 7 business days.

## Modify pending order

- An order can only be modified if its status is 'pending', and you should check its status before taking the action.

- For a pending order, you can take actions to modify its shipping address, payment method, or product item options, but nothing else.

### Modify payment

- The user can only choose a single payment method different from the original payment method.

- If the user wants the modify the payment method to gift card, it must have enough balance to cover the total amount.

- After user confirmation, the order status will be kept 'pending'. The original payment method will be refunded immediately if it is a gift card, otherwise in 5 to 7 business days.

### Modify items

- This action can only be called once, and will change the order status to 'pending (items modifed)', and the agent will not be able to modify or cancel the order anymore. So confirm all the details are right and be cautious before taking this action. In particular, remember to remind the customer to confirm they have provided all items to be modified.

- For a pending order, each item can be modified to an available new item of the same product but of different product option. There cannot be any change of product types, e.g. modify shirt to shoe.

- The user must provide a payment method to pay or receive refund of the price difference. If the user provides a gift card, it must have enough balance to cover the price difference.

## Return delivered order

- An order can only be returned if its status is 'delivered', and you should check its status before taking the action.

- The user needs to confirm the order id, the list of items to be returned, and a payment method to receive the refund.

- The refund must either go to the original payment method, or an existing gift card.

- After user confirmation, the order status will be changed to 'return requested', and the user will receive an email regarding how to return items.

## Exchange delivered order

- An order can only be exchanged if its status is 'delivered', and you should check its status before taking the action. In particular, remember to remind the customer to confirm they have provided all items to be exchanged.

- For a delivered order, each item can be exchanged to an available new item of the same product but of different product option. There cannot be any change of product types, e.g. modify shirt to shoe.

- The user must provide a payment method to pay or receive refund of the price difference. If the user provides a gift card, it must have enough balance to cover the price difference.

- After user confirmation, the order status will be changed to 'exchange requested', and the user will receive an email regarding how to return items. There is no need to place a new order.
```

### 1.2 Tool Schemas — structured extracts (16 tools)

Registry (`tools/__init__.py` L21–38, `ALL_TOOLS`): calculate, cancel_pending_order, exchange_delivered_order_items, find_user_id_by_email, find_user_id_by_name_zip, get_order_details, get_product_details, get_user_details, list_all_product_types, modify_pending_order_address, modify_pending_order_items, modify_pending_order_payment, modify_user_address, return_delivered_order_items, think, transfer_to_human_agents.

Every schema is a static `get_info()` literal of the form `{"type": "function", "function": {name, description, parameters: {"type": "object", "properties": {...}, "required": [...]}}}`. **None of the 16 declares `additionalProperties`** (verified file-by-file). Parameter inventory (all parameters required unless noted; every parameter is `type: string` unless noted; descriptions give an example value in every schema):

| Tool | Parameters | Description gist (condensed) |
|---|---|---|
| calculate | `expression` | Mathematical expression evaluator ('2 + 2'; numbers/operators/parens/spaces) |
| think | `thought` | Append a thought to the log; obtains no new information, changes no database |
| get_product_details | `product_id` | Inventory details of a product ('6086499569'; warns product id ≠ item id) |
| list_all_product_types | — (empty `properties`, empty `required`) | Name + product id of all 50 product types |
| get_order_details | `order_id` ('#W0000000', '#' prefix called out) | Status and details of an order |
| get_user_details | `user_id` ('sara_doe_496') | Details of a user, **including their orders**; `invoke()` returns the full profile incl. payment methods and balances |
| find_user_id_by_email | `email` ('something@example.com') | Find user id by email; error if not found |
| find_user_id_by_name_zip | `first_name`, `last_name`, `zip` | Find user id by name+zip; "By default, find user id by email, and only call this function if the user is not found by email or cannot remember email" |
| transfer_to_human_agents | `summary` | Transfer to a human with an issue summary; only if the user explicitly asks, or the issue cannot be resolved with available tools |
| modify_pending_order_address | `order_id`, `address1`, `address2`, `city`, `state` ('CA'), `country`, `zip` ('12345') | Modify shipping address of a pending order; explain detail and obtain explicit (yes/no) confirmation |
| modify_user_address | `user_id`, `address1`, `address2`, `city`, `state`, `country`, `zip` | Modify default address of a user; same confirmation sentence |
| cancel_pending_order | `order_id`; `reason` with **enum** `["no longer needed", "ordered by mistake"]` | Cancel a pending order; confirmation required; status → 'cancelled'; refund timing by payment type described |
| modify_pending_order_items | `order_id`, `item_ids` (**array** of strings), `new_item_ids` (**array** of strings), `payment_method_id` | Modify items to same-product variants; callable once; confirmation required. **Description does not state that `payment_method_id` is charged/refunded the price difference** |
| modify_pending_order_payment | `order_id`, `payment_method_id` | Modify payment method of a pending order; confirmation required. **`payment_method_id` description says it pays/receives refund "for the item price difference" — a same-total payment-method swap has no price difference (copy-pasted text)** |
| exchange_delivered_order_items | `order_id`, `item_ids` (**array**), `new_item_ids` (**array**), `payment_method_id` | Exchange delivered-order items to same-product variants; once-only; confirmation required. **Price-difference charge/refund not stated in the description** |
| return_delivered_order_items | `order_id`, `item_ids` (**array**), `payment_method_id` | Return delivered-order items; status → 'return requested'; confirmation; follow-up email. **`payment_method_id` description cites "the item price difference", which does not exist for a return (copy-pasted text)** |

Representative verbatim schema (`cancel_pending_order.py` L49–77, © 2024 Sierra, MIT):

```json
{
  "type": "function",
  "function": {
    "name": "cancel_pending_order",
    "description": "Cancel a pending order. If the order is already processed or delivered, it cannot be cancelled. The agent needs to explain the cancellation detail and ask for explicit user confirmation (yes/no) to proceed. If the user confirms, the order status will be changed to 'cancelled' and the payment will be refunded. The refund will be added to the user's gift card balance immediately if the payment was made using a gift card, otherwise the refund would take 5-7 business days to process. The function returns the order details after the cancellation.",
    "parameters": {
      "type": "object",
      "properties": {
        "order_id": {"type": "string", "description": "The order id, such as '#W0000000'. Be careful there is a '#' symbol at the beginning of the order id."},
        "reason": {"type": "string", "enum": ["no longer needed", "ordered by mistake"], "description": "The reason for cancellation, which should be either 'no longer needed' or 'ordered by mistake'."}
      },
      "required": ["order_id", "reason"]
    }
  }
}
```

## Part 2 — Inspection Results

### Stage A-1 — System Prompt (QD-P)

#### Tier determination: **L3 Complex Agent**

Basis (prompt-checklist §3.1, ≥ 2 criteria): 16 tool invocations (≥ 4) ✓; complex multi-step workflows (authenticate → look up → check status → confirm → write, per operation) ✓; security-sensitive (mandatory authentication, PII, payment/refund operations) ✓; exception-handling mechanisms required (status gating, error paths) ✓. Four criteria → L3. Per the checklist's source count note, the table below evaluates **Appendix A.3's 34-item compliance set plus matrix item QD-P-1.4.3** (35 P0 rows); P1/P2 matrix items are not itemized in this lite run, consistent with the gpt-researcher sample.

#### L3 minimum set — 35 P0 rows

| ID | V | Evidence (verbatim, short) / basis |
|---|---|---|
| **QD-P-1.1.1 Direct Contradiction** | **FAIL** | L31 states blanket "Exchange or modify order tools can only be called once", while the Modify section offers three independent modify actions (address L45, payment L47–53, items L55–61) and restates once-only only for items (L57) — under L31 a single `modify_pending_order_address` call would exhaust the allowance and make item modification impossible; under the Modify section the three actions are separately available |
| QD-P-1.1.3 Example-Rule Contradiction | PASS | The policy contains no examples, so no example can contradict a rule (example absence is scored at 2.7.x, not here) |
| QD-P-1.2.1 Role-Responsibility Mismatch | PASS | "retail agent" role (L3) matches the order-service responsibilities |
| QD-P-1.2.3 Constraint-Responsibility Mismatch | PASS | Authentication (L5), confirmation (L11), and one-call-per-turn (L15) constraints bound but do not prohibit the core service responsibilities |
| QD-P-1.5.1 Responsibilities Support Objective | PASS | Cancel/modify/return/exchange/lookup responsibility set supports the stated retail-service objective |
| QD-P-2.2.1 Undeclared Input Source | PASS | Input source is the authenticated user's conversation, declared throughout (L5, L11) |
| **QD-P-2.3.4 Missing Security/Privacy Filtering** | **FAIL** | The agent processes PII (name, zip, address, email) and payment data (gift card balances, paypal/credit card ids), but no sensitive-data filtering, privacy handling, or security output constraint is defined anywhere |
| QD-P-2.5.2 Missing Security Boundary Constraints | PASS | Boundaries are defined: mandatory authentication even when the user id is given (L5); one user per conversation with denial of other users' tasks (L9); own-data-only information scope (L7); status-gated write operations (L29, L35, L43, L65, L75) |
| QD-P-1.3.3 Undefined Boundaries | PASS | Authorization scope (own data, one user), prohibition scope ("but nothing else", L45), and handoff conditions ("if and only if …", L17) are all defined |
| QD-P-1.5.2 Resources Support Workflow | PASS | Every workflow action maps to a declared tool (find_user_id_by_email/name_zip for L5; get_order_details for status checks; the four write tools; transfer_to_human_agents for L17) |
| **QD-P-1.6.1 Critical Decision Word Vagueness** | **FAIL** | "Generally, you can only take action on pending or delivered orders" (L29) — "Generally" carries the core status-gating decision while leaving its exceptions undefined |
| QD-P-2.2.2 Unconstrained Input Format | PASS | Inputs are natural-language conversation; structured identifiers are format-documented at schema level ('#W0000000', '1008292230') |
| QD-P-2.2.3 Required/Optional Not Distinguished | PASS | Per-operation required inputs are enumerated ("The user needs to confirm the order id and the reason …", L37; "… the list of items to be returned, and a payment method …", L67) |
| **QD-P-2.2.4 Undefined Missing-Input Handling** | **FAIL** | No model-side behavior is defined when authentication fails through both channels ("Error: user not found" from both find tools), or when the user cannot supply a required order id / payment method |
| QD-P-2.3.1 Undefined Output Format | PASS | Output is human-facing conversation; the pre-write "list the action detail" step (L11) fixes the confirmation output structure |
| QD-P-2.3.2 Incomplete Output Schema | PASS | No downstream machine parser consumes the output — schema morphology minimal; basis recorded |
| QD-P-2.4.2 Undeclared Resources/Tools | PASS | Tools are declared to the model through the function-calling channel as 16 static schemas; the prompt's action vocabulary maps 1:1 onto them |
| **QD-P-2.4.3 Missing Tool Invocation Specification** | **FAIL** | Sequencing rules are rich (one call per turn and call/response exclusivity L15; confirmation before consequential calls L11; status check before action; once-only L31/L57), but failure handling is undefined — tool error strings ("Error: order not found", "Error: non-pending order cannot be cancelled", …) have no specified agent behavior |
| QD-P-1.1.2 Priority Conflict | PASS | No simultaneous-MUST conflict found beyond the L31 finding (scored at 1.1.1); constraints partition cleanly by operation and order status |
| QD-P-1.6.2 Rules Depending on Model Internal State | PASS | No rules keyed on confidence/uncertainty/intent judgment |
| QD-P-1.6.3 Soft Rule Interweaving Without Arbitration | PASS | Directives are predominantly hard constraints; no unarbitrated soft-rule interweave found |
| QD-P-1.6.6 Implicit Assumption Dependency | PASS | The riskiest assumption is handled explicitly ("This has to be done even when the user already provides the user id", L5); gift-card sufficiency checks are delegated to tools |
| QD-P-1.6.7 Non-Monotonic Reasoning Defects | PASS | Confirmation gates keep every conclusion revisable until commit; once-only rules define post-commit immutability explicitly (L57) |
| QD-P-2.3.3 Missing Output Stability Assurance | PASS | Content stability is provided by the grounding constraint "You should not make up any information or knowledge or procedures not provided from the user or the tools" (L13) plus confirmation-before-write |
| QD-P-2.4.1 Incomplete Workflow Steps | PASS | Each operation flow is complete: precondition (status check) → detail listing → explicit confirmation → state effect (L35–39, L43–61, L65–71, L75–81) |
| QD-P-2.5.1 Missing Termination Constraints | PASS | No autonomous loops exist; per-turn cap of one tool call (L15); terminal handoff path (L17) |
| QD-P-2.5.3 Missing Permission Control Boundaries | PASS | Permission scope is defined (authenticated user's own data only; denial of cross-user requests; status-gated writes); no elevation morphology exists |
| QD-P-2.5.4 Undefined Constraint Priority | PASS | Constraints partition by operation/status; conflict scenarios (e.g. modify a delivered order) resolve through the explicit gating rules |
| QD-P-2.5.5 Missing Resource Invocation Frequency Limits | PASS | "You should at most make one tool call at a time" (L15) plus once-only limits on exchange/modify (L31, L57). Observation (no rule ID): no per-session cumulative cap |
| **QD-P-2.6.1 Runtime Exceptions Not Covered** | **FAIL** | Tool error classes — "order not found", "non-pending order cannot be cancelled", "invalid reason", "insufficient gift card balance …", "user not found", "payment method not found" — have no prompt-defined handling behavior |
| **QD-P-2.6.2 Missing Degradation and Recovery Strategy** | **FAIL** | No degradation or recovery strategy is declared for failed tool executions; what happens after an error string is returned is undefined (the transfer rule covers only out-of-scope requests) |
| **QD-P-2.7.1 Insufficient Positive Example Representativeness** | **FAIL** | Zero positive examples in the entire policy (no authentication example, no confirmation example, no per-operation walkthrough) |
| **QD-P-2.7.2 Insufficient Counter-Example Coverage** | **FAIL** | Zero counter-examples (e.g. acting on a 'processed' order, skipping authentication, second modify-items call) |
| **QD-P-2.7.3 Missing Boundary-Case Examples** | **FAIL** | No boundary-case examples (unknown user, wrong-status order, empty item list, insufficient gift card balance) |
| QD-P-1.4.3 Invalid Skill Definitions | N/A | No Skill definitions exist in this artifact set (morphology absent); row included per the checklist's source count note (matrix shows L3 P0; Appendix A.3 omits it) |

**Stage A-1 totals: 10 P0 FAIL · 24 PASS · 1 N/A (35 rows).** P0 items failed once each: 1.1.1, 1.6.1, 2.2.4, 2.3.4, 2.4.3, 2.6.1, 2.6.2, 2.7.1, 2.7.2, 2.7.3.

### Stage A-2 — Tool Schemas (QD-T, 16 tools)

#### Tier determinations (tool-checklist §3.1)

| Tier | Tools | Basis |
|---|---|---|
| **L1** (4) | calculate, think, get_product_details, list_all_product_types | Read-only / side-effect-free; catalog or computation data only; failure consequence = query failure |
| **L2** (3) | modify_pending_order_address, modify_user_address, transfer_to_human_agents | Recoverable writes (address re-modifiable while pending) / external side effect without business-data write (handoff) |
| **L3** (9) | find_user_id_by_email, find_user_id_by_name_zip, get_user_details, get_order_details, cancel_pending_order, modify_pending_order_items, modify_pending_order_payment, exchange_delivered_order_items, return_delivered_order_items | Sensitive-data handling (PII auth factors, full profile incl. payment methods and balances, payment history) → L3 per the "sensitive data" determination basis; and/or irreversible financial operations (refunds, price-difference charges, once-only locks) |

#### L1 set (7 items) — verdict matrix

P = PASS · F = FAIL(level) · — = N/A (basis recorded)

| Item | calculate | think | get_product_details | list_all_product_types |
|---|---|---|---|---|
| QD-T-1.1 Base Field Missing (P0) | P | P | P | P |
| QD-T-1.2 Required Field Inconsistency (P0) | P | P | P | P (empty `required` matches empty `properties`) |
| QD-T-1.3 Invalid Enum Constraints (P1) | — | — | — | — |
| QD-T-1.4 Uncontrolled additionalProperties (P1) | **F(P1)** | **F(P1)** | **F(P1)** | **F(P1)** |
| QD-T-2.1 String Without Length Constraint (P2) | **F(P2)** | **F(P2)** | **F(P2)** | — (no string parameter) |
| QD-T-2.3 Number Without Boundary (P2) | — | — | — | — |
| QD-T-4.1 Insufficient Description Quality (P2) | P | P | P | P |

FAIL evidence (L1): 1.4 — no `additionalProperties` declaration in any of the four `parameters` objects (e.g. calculate.py L25–34). 2.1 — `expression` (calculate L28–31), `thought` (think L26–29), `product_id` (get_product_details L26–29): unbounded strings.

#### L2 set (12 items) — verdict matrix

| Item | modify_pending_order_address | modify_user_address | transfer_to_human_agents |
|---|---|---|---|
| QD-T-1.1 (P0) | P | P | P |
| QD-T-1.2 (P0) | P | P | P |
| QD-T-1.3 (P0) | — | — | — |
| QD-T-1.4 Uncontrolled additionalProperties (P0) | **F(P0)** | **F(P0)** | **F(P0)** |
| QD-T-2.1 String Without Length Constraint (P1) | **F(P1)** | **F(P1)** | **F(P1)** |
| QD-T-2.2 String Without Format Constraint (P1) | **F(P1)** | **F(P1)** | — (`summary` is free text; no conventional format required) |
| QD-T-2.3 (P1) | — | — | — |
| QD-T-2.4 (P1) | — | — | — |
| QD-T-3.1 Write Operation Not Identified (P1) | P ("Modify the shipping address…" + confirmation sentence) | P ("Modify the default address…" + confirmation) | P (action and trigger conditions stated) |
| QD-T-3.2 Raw Input Passthrough (P0) | P (structured per-field address write; no interpreter passthrough) | P | P (summary logged for a human queue; no backend interpreter) |
| QD-T-4.1 Insufficient Description Quality (P1) | P | P | P |
| QD-T-4.2 Undeclared Side Effects (P1) | P (address update declared) | P | P (transfer declared) |

FAIL evidence (L2): 1.4 — no `additionalProperties` (e.g. modify_pending_order_address.py L46–87). 2.1 — all address fields unbounded (L53–76). 2.2 — `state` ('CA') and `zip` ('12345') carry conventional formats but no `pattern`/`format` (L65–76).

#### L3 set (16 items) — verdict matrix

Tools abbreviated: F-EMAIL = find_user_id_by_email · F-NZ = find_user_id_by_name_zip · G-USER = get_user_details · G-ORD = get_order_details · CANCEL = cancel_pending_order · M-ITEMS = modify_pending_order_items · M-PAY = modify_pending_order_payment · EXCH = exchange_delivered_order_items · RET = return_delivered_order_items

| Item | F-EMAIL | F-NZ | G-USER | G-ORD | CANCEL | M-ITEMS | M-PAY | EXCH | RET |
|---|---|---|---|---|---|---|---|---|---|
| QD-T-1.1 (P0) | P | P | P | P | P | P | P | P | P |
| QD-T-1.2 (P0) | P | P | P | P | P | P | P | P | P |
| QD-T-1.3 (P0) | — | — | — | — | P (enum valid) | — | — | — | — |
| QD-T-1.4 additionalProperties (P0) | **F** | **F** | **F** | **F** | **F** | **F** | **F** | **F** | **F** |
| QD-T-2.1 String w/o Length (P0) | **F** | **F** | **F** | **F** | **F** | **F** | **F** | **F** | **F** |
| QD-T-2.2 String w/o Format (P1) | **F** (email, no format) | **F** (zip, no pattern) | — (user_id, no conventional format) | **F** (order_id '#' format, no pattern) | **F** (order_id) | **F** (order_id) | **F** (order_id) | **F** (order_id) | **F** (order_id) |
| QD-T-2.3 (P0) | — | — | — | — | — | — | — | — | — |
| QD-T-2.4 Array w/o Length (P0) | — | — | — | — | — | **F** | — | **F** | **F** |
| QD-T-3.1 Write Not Identified (P0) | — (read-only) | — | — | — | P (cancel + status/refund effects + confirmation all stated) | P (modify + once-only + confirmation stated) | P | P | P (status change + email stated) |
| QD-T-3.2 Raw Input Passthrough (P0) | P (equality lookup) | P | P (key lookup) | P | P (dict-key lookup; reason enum-constrained) | P | P | P | P |
| QD-T-3.3 Batch Without Limit (P0) | — | — | — | — | — (single order) | **F** (item arrays, no maxItems) | — | **F** | **F** |
| QD-T-3.4 Internal Parameter Exposure (P0) | P | P | P | P | P | P | P | P | P |
| QD-T-3.5 Cross-Tool Data Flow (P0) | P (returns a bare identifier; chaining is by design) | P | **F** (returns the full profile incl. unmasked payment methods and balances into the model context; masking would not break the designed id-chaining) | P (payment ids/amounts are the designed inputs of the write tools) | P | P | P | P | P |
| QD-T-4.1 Description Quality (P0) | P | P | P | P | P | P | **F** (`payment_method_id` described as paying/refunding "the item price difference" — a same-total payment-method swap has none; copy-pasted text) | P | **F** (same copy-pasted "item price difference" text for a return, where no price difference exists) |
| QD-T-4.2 Undeclared Side Effects (P0) | — (read-only) | — | — | — | P (refund mechanics stated) | **F** (description never states that `payment_method_id` is charged/refunded the price difference; `invoke()` L62–72 appends payment history and debits gift-card balance) | P (charge/refund IS the declared payment-method modification) | **F** (same omission as M-ITEMS; `invoke()` charges the difference) | P (refund destination set via declared parameter; status change + email declared) |
| QD-T-4.3 Multi-Tool Semantic Competition (P1) | P (find-by-email vs find-by-name-zip distinguished by the "by default" precedence note) | P | P | P | P | P | P | P | P |

**Stage A-2 totals (item-level):** P0 FAILs — L1: 0 · L2: 3 (1.4 ×3) · L3: 29 (1.4 ×9, 2.1 ×9, 2.4 ×3, 3.3 ×3, 3.5 ×1, 4.1 ×2, 4.2 ×2). P1 FAILs — L1: 4 (1.4 ×4) · L2: 5 (2.1 ×3, 2.2 ×2) · L3: 9 (2.2 ×8 tools; 4.3 none). P2 FAILs — L1: 3 (2.1 ×3). Every P0 item failed once per tool as shown in the matrices.

#### Mode decision

Stage A-1 carries 10 unfixed prompt P0 findings and Stage A-2 carries tool P0 findings → **Mode 2 (P0 blocking)** per SKILL.md §5 and the cross-checklist entry precondition. Downstream stages are not executed.

### Stage B — Cross-artifact inspection (QD-PS / QD-PT / QD-ST)

Not executed (status board). Applicability map for the re-run: **QD-PT applicable** — the prompt references tool actions (L31 "Exchange or modify order tools …") against 16 fully static schemas; QD-PT-2.1/2.2/2.4 are the candidate P0 items. **QD-PS and QD-ST N/A** — no Skill-definition artifact exists; recorded as determination basis, not FAIL.

### Stage C — Gate-0

Not executed (status board). At re-run, G0-1 and G0-2 are known-unsatisfied (10 prompt P0; tool P0). G0-3 (locatable responsibility-boundary statements) and G0-4 (per-field Tool Schema completeness) would likely pass here — responsibility statements exist in wiki.md L3–17 and every schema field is described — but Gate-0 does not produce numbers and is not itself a FAIL.

### Stage D — Permission proportionality (QD-PM, Quick Mode)

Not executed (status board). Two independent reasons: (1) Mode 2 — upstream P0 unfixed; (2) Permission quick mode requires the full artifact set (Prompt + Skill + all Tool Schemas), and no Skill artifact exists → "incomplete artifact set".

### Stage E — Impact outlook

Not executed in this blocked run (Mode 2 stops after Stage A). Candidate AS-*/FM-* Impact Cards for the prompt and tool findings will be produced, in candidate-only language with strength labeled separately from severity, on the unblocked re-run — or as an explicitly advisory-only pass on request. Risk Explicit/Implicit subsets were not run in either case.

### Status board

```text
Stage A (Single-artifact):  Executed — Prompt QD-P (L3, 35 rows: 10 P0 FAIL, 24 PASS, 1 N/A) and Tool QD-T (16 tools tiered L1×4/L2×3/L3×9: 32 tool-level P0 FAIL instances across the matrices); no Skill artifact exists
Stage B (Cross):            Not Executed — not executed because upstream P0 findings are unfixed (QD-PT applicable at re-run; QD-PS/QD-ST N/A — no Skill artifact)
Stage C (Gate-0):           Not Executed — not executed because upstream P0 findings are unfixed
Stage D (Permission QD-PM): Not Executed — not executed because upstream P0 findings are unfixed; additionally "incomplete artifact set" (no Skill artifact)
Stage E (Impact outlook):   Not Executed — not executed because upstream P0 findings are unfixed
```

**Inspector scope reminder:** detect-only — no fixed prompts/schemas were generated; these static findings say nothing about Risk (Explicit/Implicit) or Quality outcomes, and a future Permission quick-mode pass validates declared proportionality only — not IAM/PEP/runtime enforcement.
