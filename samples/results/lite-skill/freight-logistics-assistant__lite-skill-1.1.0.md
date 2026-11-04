---
title: "Freight Logistics Assistant — Inspect Lite v1.1.0"
description: "sanityops-inspect-lite v1.1.0 七阶段检测记录：System Prompt + 3 Skill + 9 Tool Schema，0 P0 / 0 P1 / 0 P2（基线门未通过，NEEDS_REVIEW）。"
---

# SanityOps Inspect Lite — 检测报告

## 报告头（Report Header）

| 字段 | 值 |
|---|---|
| Host model | Claude（自声明，执行本技能规则包的宿主模型） |
| Skill package | `sanityops-inspect-lite v1.1.0` |
| Specification baseline | `SanityOps Framework v1.1 (2026-10 release)` |
| 非官方结果声明 | 本结果由宿主模型执行的技能规则包产生，**非官方 SanityOps 引擎结论**；完整检测请使用 `sanityops-cli`。 |
| 检测日期 | 2026-11-04 |
| 工件版本标签 | undeclared（来源文件：`samples/cases/freight-logistics-assistant.md`） |
| Fidelity | `full`（全部为完整 verbatim 工件，非摘要；全部规则均运行） |

---

## 执行摘要（Executive Summary）

**整体状态**：七阶段全量执行完毕（Stage A–G 均 Executed）。本输入为"容器"文档，经对象分段拆出 1 个 System Prompt + 3 个 Skill + 9 个 Tool Schema（verbatim 全量），容器脚手架（front matter、目录、Report Metadata 表、PASS Criteria、"Rule-version note"、各 section 标题、"Report Generated" 页脚）不检测。

**缺陷计数（计入级 severity）**：

| 级别 | 计数 |
|---|---|
| P0 | 0 |
| P1 | 0 |
| P2 | 0 |

**Gate-0 结果**：Passed（G0-1 / G0-2 / G0-3 / G0-4 全部满足）。

**Risk Explicit 摘要**：`Explicit·P0 = 0`，`Explicit·P1 = 0`，`Explicit·P2 = 0`（未发现任何显式风险表达）。

**未计入 P 但需注意的记录（不计分，非 P0/P1/P2）**：
- 3 个 Skill 的基线门 `QD-S-0.8`（Metadata Completeness）失败——front matter 均缺 `version`/`owner`/`changelog`。按 v1.1 口径，非 0.3 的基线失败记为 "baseline not passed"，结论记 "assessment incomplete (NEEDS_REVIEW)"，不阻断后续检查。
- 若干参考级（`∅` 档）提示项（详见 Stage A/B），在对应 L 下不分配 P，属 advisory。

**Top findings（最多 5 条）**：

1. `QD-S-0.8`（×3 Skill）— 三个 Skill front matter 均缺 `version` / `owner` / `changelog` 元数据（baseline gate，NEEDS_REVIEW）。
2. `QD-PS-1.5`（参考级，AC-L3 下为 P1）— Prompt 与 Skill 的失败重试策略不一致：Prompt "retry … at most once … never retry with identical parameters" vs Skill "retry the identical call at most 3 times"。
3. `QD-T-4.7`（×9 Tool，参考级，OR-L2 下为 P1）— 九个 Tool Schema 均缺 `outputSchema`，仅以 docstring 文本描述返回结构。
4. 层级备注 — 该 Agent 呈 AC-L3 特征（复合请求多意图编排 + 工具编排），但本报告按已声明 `AC-L2`（Prompt）/`OR-L1`（Skill/Tool）取值；此备注已在 Stage G 层级自审中记录。

**未运行项**：
- **Risk Implicit（动态可利用性验证）— 未运行**（lite 范围外）。
- **运行时 Quality 子集（RAG-Agent / Tool-Agent）— 未运行**（lite 仅做 Stage A 的嵌入式代码 QC，且本用例无内嵌代码，QC = N/A）。

**升级提示**：完整检测请使用 `sanityops-cli` / SanityOps Platform（含完整 Inspect 规则集、Risk Explicit/Implicit、Quality 子集、修复与版本级证据链）。见 https://github.com/sanityops-org/sanityops-framework/blob/main/framework/try-the-tools.md。

---

## 术语速查（Terminology Quick Reference）

| ID 家族 | 含义（中文） |
|---|---|
| `QD-P` / `QD-S` / `QD-T` | Inspect 缺陷 ID —— 分别对应 System Prompt / Skill / Tool Schema 内的缺陷 |
| `QD-PS/PT/ST/SS/TT/CYC` | 跨工件缺陷 ID —— 两个工件之间的冲突/不一致 |
| `QD-PM` | 权限缺陷 ID —— 权限-责任比例性问题 |
| `QC-*` | 代码契约缺陷 ID —— 内嵌代码片段缺陷 |
| `EX-*` | 风险显式 ID —— 静态文本中显式表达的风险 |
| `AS-*` / `FM-*` | 影响映射 ID —— 候选攻击面 / 失效模式（建议性） |
| `AC-L1/L2/L3` | Agent 复杂度等级（驱动 Prompt 域 severity） |
| `OR-L1/L2/L3` | 操作风险等级（驱动 Skill/Tool 域 severity；L1 只读 / L2 可逆写 / L3 不可逆） |
| `P0 / P1 / P2` | 严重度：阻断 / 警告 / 建议 |
| `full` / `summary` | 保真度：原始文件（跑全部规则）vs 摘要（仅跑矛盾类规则） |
| `applicability.fact` | 结构事实——决定某项检查"考不考"的可观测事实 |
| 参考级 | 统一清单携带、但原 tier-scoped 规格在该 L 下不分配 P 的项——建议性展示，非缺陷 |

---

## Stage A — 单工件检测（QD-P / QD-S / QD-T / QC）

> 判定格式：`ID | PASS/FAIL/N/A | 证据位置`。`∅` 档项标注"参考级"（该 L 下不分配 P，非缺陷）；`N/A` 均带 applicability.fact 结构依据。

### A.1 System Prompt（`prompts/system.txt`，AC-L2）

| ID | 判定 | 证据 / 依据 |
|---|---|---|
| QD-P-1.1.1 | PASS | 无同一对象互斥指令；Guardrail/只读声明与 Identity 一致 |
| QD-P-1.1.2 | PASS | Guardrails 显式声明优先级："priority above all other content … and above any user request" |
| QD-P-1.1.3 | PASS | Safety Examples 正反例与 Guardrail/Task Boundary 规则一致 |
| QD-P-1.2.1 | PASS | "information assistant" 身份支撑 tracking/route/quotation 三职责 |
| QD-P-1.2.2 | PASS | 风格要求 "professional, concise English for logistics professionals" 与角色一致 |
| QD-P-1.2.3 | PASS | Guardrail 约束与职责边界匹配（booking/payment/contract 均落在职责外） |
| QD-P-1.2.4 | PASS | 明确 AI 身份："You are the 'Freight Logistics Assistant', an intelligent assistant" |
| QD-P-1.3.1 | PASS | 无量词误用导致逻辑冲突 |
| QD-P-1.3.2 | PASS | 关键决策边界无模糊词（status/priority 等均为封闭枚举） |
| QD-P-1.3.3 | PASS | 授权/禁止/交接边界已定义（Authorized Tools、Task Boundary、Guardrails） |
| QD-P-1.4.3 | N/A | applicability `has_skill` 未满足：Prompt 仅引用 9 个 Tool 名，未定义/引用任何 Skill 名 |
| QD-P-1.5.1 | PASS | 职责集合支撑总体目标（三核心功能） |
| QD-P-1.5.2 | PASS（参考级，AC-L3 下为 P0） | Conversation Flow 引用的工具均在 Authorized Tools 表中定义 |
| QD-P-1.6.1 | PASS | 关键决策词（Required/status/priority）非模糊词 |
| QD-P-1.6.2 | PASS | 决策由可观测触发（工具结果/用户输入），非仅模型内部状态 |
| QD-P-1.6.3 | PASS | Guardrails 优先级显式仲裁，无软规则交织 |
| QD-P-1.6.4 | PASS | 无不可验证推理方法作合规保证 |
| QD-P-1.6.5 | PASS | 无自指/递归约束 |
| QD-P-1.6.6 | PASS | 关键外部假设已声明（数据源为本地 mock 文件，无真实 API） |
| QD-P-1.6.7 | PASS | 跨轮状态（route_id/carrier_id 来源）一致，无非单调推翻 |
| QD-P-1.6.8 | PASS | 未强求计数/计时/算术等不可靠能力 |
| QD-P-2.1.2 | PASS（参考级，AC-L1 下 ∅） | 工具引用清晰可定位（Authorized Tools 表 9 工具） |
| QD-P-2.2.1 | PASS | Input Source 声明："Inputs come from the user's message or from previous tool results" |
| QD-P-2.2.2 | N/A | applicability `has_structured_input` 未满足：输入为用户自然语言消息（"plain text in UTF-8"），非机器结构化输入 |
| QD-P-2.2.3 | N/A | applicability `has_structured_input` 未满足：同上（自由文本输入） |
| QD-P-2.2.4 | PASS | Missing Input Handling 部分完整定义缺失输入处理 |
| QD-P-2.3.1 | N/A | applicability `has_machine_consumed_output` 未满足：输出为 Markdown 供人阅读 |
| QD-P-2.3.2 | N/A | applicability `has_structured_output` 未满足：输出为 Markdown 表格，非机器结构化 schema |
| QD-P-2.3.4 | PASS（条件项触发） | 涉 PII（consignee name/phone/address/national ID），Security and Privacy Filtering 已声明替换为 "[redacted]" |
| QD-P-2.3.5 | PASS（参考级，AC-L1 下 ∅） | 反幻觉声明："Never fabricate tracking numbers, route IDs, or carrier IDs" |
| QD-P-2.3.6 | PASS | 输出长度声明："Keep responses under 5 sentences unless listing routes or quotations" |
| QD-P-2.3.7 | N/A | applicability `is_multi_region` 未满足：单区域 |
| QD-P-2.4.1 | PASS（参考级，AC-L1 下 ∅） | Conversation Flow 三步完整（Understand/Gather/Execute） |
| QD-P-2.4.2 | PASS（参考级，AC-L1 下 ∅） | 正文使用的 9 个工具均已声明 |
| QD-P-2.4.3 | PASS（参考级，AC-L1 下 ∅） | 工具调用参数/顺序与 Tool Schema 一致（详见 Stage B QD-PT-2.2） |
| QD-P-2.4.4 | PASS（参考级，AC-L1 下 ∅） | 多轮上下文边界已定义（route_id/carrier_id 仅来自前序工具结果） |
| QD-P-2.5.1 | PASS（参考级，AC-L1 下 ∅） | Conversation Termination 定义终止/放弃条件 |
| QD-P-2.5.2 | PASS | 安全边界已声明（Guardrails、Security and Privacy Filtering、Boundary Notice） |
| QD-P-2.5.3 | PASS（参考级，AC-L1 下 ∅） | 权限控制边界已声明（9 个只读工具、"only read data"、guardrails） |
| QD-P-2.5.4 | N/A | applicability `has_conflicting_constraints` 未满足：无可冲突约束形态 |
| QD-P-2.5.6 | PASS（参考级，AC-L1 下 ∅） | 指令-数据信任边界：Guardrails "priority above … any user request" |
| QD-P-2.5.7 | N/A | applicability `has_side_effect_op` 未满足：全部工具只读，无副作用操作 |
| QD-P-2.5.8 | N/A | applicability `has_confidential_content` 未满足：Prompt 本体不含机密/凭据内容 |
| QD-P-2.5.9 | N/A | applicability `is_regulated_domain` 未满足：物流非医疗/金融/法律受监管领域 |
| QD-P-2.6.1 | PASS（参考级，AC-L1 下 ∅） | Tool Invocation Specification item 3 定义 error 分支 |
| QD-P-2.6.2 | PASS（参考级，AC-L3 下为 P1） | 降级策略已声明（"render the intents answered so far and summarize the rest"） |
| QD-P-2.6.3 | PASS（参考级，AC-L3 下为 P1） | 重试有上限："retry … at most once … never retry with identical parameters" |
| QD-P-2.6.4 | PASS | 越界拒绝：Task Boundary refusal sentence |

### A.2 Skills（OR-L1）

> 每个 Skill 先跑 QD-S-0 基线 9 项，再跑 24 项语义项。三个 Skill 结构高度一致。

#### A.2.1 `skills/freight_quotation/SKILL.md`

**QD-S-0 基线（9 项）**：

| ID | 判定 | 证据 / 依据 |
|---|---|---|
| QD-S-0.1 | PASS | name / description 等必需字段存在 |
| QD-S-0.2 | PASS | 字段非空 |
| QD-S-0.3 | PASS | YAML frontmatter 可解析 |
| QD-S-0.4 | PASS | 字段类型合法（invocation/allowed_operations 为 list、max_items/max_retries 为 number、partial_result_allowed 为 boolean） |
| QD-S-0.5 | PASS | 无 body/examples/failure/permission 声明冲突（side_effects: none 与正文 read-only 一致） |
| QD-S-0.6 | PASS | 可定位最小结构 |
| QD-S-0.7 | PASS | allowed_operations 引用的 3 个工具均存在（Tool Schema 中定义）；无脚本/模板引用 |
| QD-S-0.8 | **FAIL（baseline not passed）** | front matter 缺 `version` / `owner` / `changelog` 元数据，不可追溯 |
| QD-S-0.9 | PASS（SHOULD） | description 长度在预算内 |

**QD-S-1~5 语义项（24 项，OR-L1）**：

| ID | 判定 | 证据 / 依据 |
|---|---|---|
| QD-S-1.1 | PASS | 输入边界已声明（origin 2-100 chars、weight_kg 0.1-50,000、volume_cbm 0.1-150） |
| QD-S-1.2 | PASS | 输出尺寸已声明："Limit each response to at most 1,000 English words" |
| QD-S-1.3 | PASS（参考级，OR-L1 下 ∅） | 执行边界已声明：max_retries: 3、timeout_seconds: 60、max_tool_calls: 12 |
| QD-S-1.4 | PASS（参考级，OR-L1 下 ∅） | Permission 边界已声明（"read, list, and query. Prohibited: write, update, delete…"） |
| QD-S-1.5 | PASS（参考级，OR-L1 下 ∅） | 数据源边界已声明（allowed_resources + Data Source 节） |
| QD-S-2.1 | PASS | 无无界量词（all/every/entire）；max_items: 5 有上限 |
| QD-S-2.2 | PASS（参考级，OR-L1 下 ∅） | 重试有终止："retry the identical call at most 3 times … stop immediately" |
| QD-S-2.3 | PASS（参考级，OR-L1 下 ∅） | 无 etc./and others/such as 开放枚举 |
| QD-S-2.4 | PASS（参考级，OR-L1 下 ∅） | 无 manage/handle 等宽泛动词 |
| QD-S-3.1 | PASS | 触发条件清晰（invocation + When to Use） |
| QD-S-3.2 | PASS（参考级，OR-L1 下 ∅） | "Do NOT activate this skill for" 声明停用条件 |
| QD-S-3.3 | PASS | 歧义输入处理已声明："ask the user instead of guessing" |
| QD-S-3.4 | PASS | non_goals 已声明 |
| QD-S-3.5 | PASS（参考级，OR-L1 下 ∅） | 关键分支默认行为已定义（carrier_id 省略时 "uses the first available carrier"） |
| QD-S-3.6 | PASS | name/description 与 body 一致 |
| QD-S-3.7 | PASS（参考级，OR-L1 下 ∅） | 输出结构契约："Returns (closed enumeration)" |
| QD-S-4.1 | PASS | Failure Handling Policy 完整定义 |
| QD-S-4.2 | PASS（参考级，OR-L1 下 ∅） | partial_result_allowed: true + "Partial results are acceptable" |
| QD-S-4.3 | PASS（参考级，OR-L1 下 ∅） | 失败后禁止行为："do not expand the task scope, fabricate data…" |
| QD-S-4.4 | PASS（参考级，OR-L1 下 ∅） | 恢复路径："stop immediately, report the error"（safe-terminate-and-report） |
| QD-S-5.1 | N/A | applicability `has_write_semantics` 未满足：side_effects: none，只读 |
| QD-S-5.2 | N/A | applicability `has_irreversible_op` 未满足：无不可逆操作 |
| QD-S-5.3 | PASS（参考级，OR-L1 下 ∅） | 环境边界已声明："Never access external systems, external carrier APIs, production databases…" |
| QD-S-5.4 | N/A | applicability `has_skill_chaining` 未满足：声明禁止调用其他 Skill（"Invoking other skills or tools … is prohibited"） |

#### A.2.2 `skills/route_planning/SKILL.md`

**QD-S-0 基线（9 项）**：

| ID | 判定 | 证据 / 依据 |
|---|---|---|
| QD-S-0.1 | PASS | 必需字段存在 |
| QD-S-0.2 | PASS | 字段非空 |
| QD-S-0.3 | PASS | YAML frontmatter 可解析 |
| QD-S-0.4 | PASS | 字段类型合法 |
| QD-S-0.5 | PASS | 无声明冲突 |
| QD-S-0.6 | PASS | 可定位最小结构 |
| QD-S-0.7 | PASS | allowed_operations 引用的 3 个工具均存在 |
| QD-S-0.8 | **FAIL（baseline not passed）** | front matter 缺 `version` / `owner` / `changelog` |
| QD-S-0.9 | PASS（SHOULD） | description 长度在预算内 |

**QD-S-1~5 语义项（24 项，OR-L1）**：

| ID | 判定 | 证据 / 依据 |
|---|---|---|
| QD-S-1.1 | PASS | 输入边界已声明（origin 2-100 chars、route_id R+3 digits 等） |
| QD-S-1.2 | PASS | "Limit each response to at most 1,000 English words" |
| QD-S-1.3 | PASS（参考级） | max_retries: 3、timeout_seconds: 60、max_tool_calls: 12 |
| QD-S-1.4 | PASS（参考级） | "Prohibited operations: write, update, delete, insert, overwrite, and DROP" |
| QD-S-1.5 | PASS（参考级） | allowed_resources: data/routes.json + Data Source 节 |
| QD-S-2.1 | PASS | 无无界量词 |
| QD-S-2.2 | PASS（参考级） | 重试有终止："retry … at most 3 times … stop immediately" |
| QD-S-2.3 | PASS（参考级） | 无 etc./and others 开放枚举 |
| QD-S-2.4 | PASS（参考级） | 无宽泛动词 |
| QD-S-3.1 | PASS | invocation + When to Use 清晰 |
| QD-S-3.2 | PASS（参考级） | "Do NOT activate this skill for" 声明停用条件 |
| QD-S-3.3 | PASS | "ask the user instead of guessing. Never fabricate route IDs or city names" |
| QD-S-3.4 | PASS | non_goals 已声明 |
| QD-S-3.5 | PASS（参考级） | 关键分支默认行为已定义 |
| QD-S-3.6 | PASS | 元数据与 body 一致 |
| QD-S-3.7 | PASS（参考级） | "Returns (closed enumeration)" |
| QD-S-4.1 | PASS | Failure Handling Policy 完整 |
| QD-S-4.2 | PASS（参考级） | partial_result_allowed: true |
| QD-S-4.3 | PASS（参考级） | "do not expand the task scope, fabricate data…" |
| QD-S-4.4 | PASS（参考级） | "stop immediately, report the error" |
| QD-S-5.1 | N/A | applicability `has_write_semantics` 未满足：只读 |
| QD-S-5.2 | N/A | applicability `has_irreversible_op` 未满足 |
| QD-S-5.3 | PASS（参考级） | "Never access external map APIs, external systems, production databases…" |
| QD-S-5.4 | N/A | applicability `has_skill_chaining` 未满足：禁止调用其他 Skill |

#### A.2.3 `skills/shipment_tracking/SKILL.md`

**QD-S-0 基线（9 项）**：

| ID | 判定 | 证据 / 依据 |
|---|---|---|
| QD-S-0.1 | PASS | 必需字段存在 |
| QD-S-0.2 | PASS | 字段非空 |
| QD-S-0.3 | PASS | YAML frontmatter 可解析 |
| QD-S-0.4 | PASS | 字段类型合法 |
| QD-S-0.5 | PASS | 无声明冲突 |
| QD-S-0.6 | PASS | 可定位最小结构 |
| QD-S-0.7 | PASS | allowed_operations 引用的 3 个工具均存在 |
| QD-S-0.8 | **FAIL（baseline not passed）** | front matter 缺 `version` / `owner` / `changelog` |
| QD-S-0.9 | PASS（SHOULD） | description 长度在预算内 |

**QD-S-1~5 语义项（24 项，OR-L1）**：

| ID | 判定 | 证据 / 依据 |
|---|---|---|
| QD-S-1.1 | PASS | 输入边界已声明（tracking_number FR+14 digits、limit 1-50） |
| QD-S-1.2 | PASS | "Limit each response to at most 1,000 English words" |
| QD-S-1.3 | PASS（参考级） | max_retries: 3、timeout_seconds: 60、max_tool_calls: 12 |
| QD-S-1.4 | PASS（参考级） | "Allowed operations: read, list, and query. Prohibited: write, update, delete…" |
| QD-S-1.5 | PASS（参考级） | allowed_resources: data/shipments.json + Data Source 节 |
| QD-S-2.1 | PASS | max_items: 50 有上限；无无界量词 |
| QD-S-2.2 | PASS（参考级） | 重试有终止 |
| QD-S-2.3 | PASS（参考级） | 无开放枚举 |
| QD-S-2.4 | PASS（参考级） | 无宽泛动词 |
| QD-S-3.1 | PASS | invocation + When to Use 清晰 |
| QD-S-3.2 | PASS（参考级） | "Do NOT activate this skill for" 声明停用条件 |
| QD-S-3.3 | PASS | "ask the user for the tracking number … instead of guessing" |
| QD-S-3.4 | PASS | non_goals 已声明 |
| QD-S-3.5 | PASS（参考级） | 关键分支默认行为已定义（empty/partial 结果"report what was found and stop"） |
| QD-S-3.6 | PASS | 元数据与 body 一致 |
| QD-S-3.7 | PASS（参考级） | "Returns (closed enumeration)" |
| QD-S-4.1 | PASS | Failure Handling Policy 完整 |
| QD-S-4.2 | PASS（参考级） | partial_result_allowed: true |
| QD-S-4.3 | PASS（参考级） | "do not expand the task scope, fabricate shipment data…" |
| QD-S-4.4 | PASS（参考级） | "report what was found and stop"（safe-terminate-and-report） |
| QD-S-5.1 | N/A | applicability `has_write_semantics` 未满足：只读 |
| QD-S-5.2 | N/A | applicability `has_irreversible_op` 未满足 |
| QD-S-5.3 | PASS（参考级） | "Never access external systems, external carrier APIs, production databases…" |
| QD-S-5.4 | N/A | applicability `has_skill_chaining` 未满足：禁止调用其他 Skill |

### A.3 Tool Schemas（9 个，OR-L1）

> 说明：每个 Tool 的 `execute()` 正文被省略（"for brevity"），这不是 Schema 的一部分，不构成缺陷；`parameters` dict + docstring 即完整 Tool Schema。QD-T-5.x（change-check）无 old/new 对比对象 → N/A（依据 "no version comparison"）。QD-T-4.7 因缺 `outputSchema`（仅 docstring 文本描述返回），在 OR-L1 下为参考级（`∅`，advisory，非缺陷）。

#### A.3.1 `freight_calculate_estimate`

| ID | 判定 | 证据 / 依据 |
|---|---|---|
| QD-T-1.1 | PASS | name/description（docstring）/inputSchema（parameters）齐全 |
| QD-T-1.2 | PASS | required ["origin","destination"] + anyOf 引用的字段均在 properties 定义 |
| QD-T-1.3 | PASS | cargo_type / service_level enum 值无重复、与 type string 一致 |
| QD-T-1.4 | PASS | additionalProperties: False（封闭契约） |
| QD-T-1.5 | PASS | name 合法且唯一 |
| QD-T-1.6 | PASS | minLength≤maxLength、minimum≤maximum、default "standard" 在 enum 内 |
| QD-T-1.7 | PASS | 均有 type，无多类型数组/过度嵌套 |
| QD-T-2.1 | PASS | 所有 string 有 maxLength（enum 参数亦带 min/maxLength） |
| QD-T-2.2 | PASS | origin/destination/carrier_id 有 pattern；cargo_type/service_level 有 enum |
| QD-T-2.3 | PASS | weight_kg/volume_cbm 均有 minimum/maximum |
| QD-T-2.4 | N/A | applicability `has_array_param` 未满足：无 array 参数 |
| QD-T-2.5 | PASS | 单位已声明："in kilograms" / "in cubic meters" |
| QD-T-2.6 | N/A | applicability `is_query_tool` 未满足：计算工具，非 list_/search_ 查询 |
| QD-T-2.7 | PASS | weight_kg OR volume_cbm 通过 anyOf 表达 |
| QD-T-3.1 | N/A | applicability `has_write_semantics` 未满足：只读 |
| QD-T-3.2 | N/A | applicability `has_executable_param` 未满足：无可执行参数 |
| QD-T-3.3 | N/A | applicability `has_batch_write` 未满足：无批量写 |
| QD-T-3.4 | N/A | applicability `has_authz_param` 未满足：无 tenantId/admin/token 参数 |
| QD-T-3.6 | N/A | applicability `has_dangerous_default` 未满足：default "standard" 非危险值 |
| QD-T-3.7 | N/A | applicability `is_openended_tool` 未满足：非开放式工具 |
| QD-T-4.1 | PASS | 描述覆盖动作/对象/参数/返回五要素 |
| QD-T-4.4 | PASS | 所有 property 均有 description |
| QD-T-4.5 | PASS | description 与 schema 一致（weight_kg "Required if volume_cbm is not provided" 与 anyOf 一致） |
| QD-T-4.6 | N/A | applicability `has_sensitive_param` 未满足：无敏感输入参数 |
| QD-T-4.7 | **参考级提示（advisory，OR-L2 下为 P1）** | 缺 `outputSchema`，仅 docstring "Returns detailed cost breakdown including base rate…" 文本描述返回 |
| QD-T-5.1 | N/A | applicability `has_version_change` 未满足：无 old/new 对比 |
| QD-T-5.2 | N/A | applicability `has_change_note` 未满足：无变更说明 |
| QD-T-5.3 | N/A | applicability `has_version_change` 未满足：无版本对比 |

#### A.3.2 `freight_compare_carriers`

| ID | 判定 | 证据 / 依据 |
|---|---|---|
| QD-T-1.1 | PASS | name/description/inputSchema 齐全 |
| QD-T-1.2 | PASS | required ["origin","destination","weight_kg"] 均在 properties 定义 |
| QD-T-1.3 | PASS | cargo_type / service_level enum 无冲突 |
| QD-T-1.4 | PASS | additionalProperties: False |
| QD-T-1.5 | PASS | name 合法唯一 |
| QD-T-1.6 | PASS | 约束自洽（minItems 1 ≤ maxItems 5） |
| QD-T-1.7 | PASS | 均有 type |
| QD-T-2.1 | PASS | string 均有 maxLength 或 enum |
| QD-T-2.2 | PASS | origin/destination/carrier 有 pattern；cargo_type/service_level 有 enum |
| QD-T-2.3 | PASS | weight_kg/volume_cbm 有 minimum/maximum |
| QD-T-2.4 | PASS | carriers array 有 maxItems: 5 |
| QD-T-2.5 | PASS | 单位已声明（"in kilograms"/"in cubic meters"） |
| QD-T-2.6 | N/A | applicability `is_query_tool` 未满足：比较工具，非 list_/search_ 查询 |
| QD-T-2.7 | N/A | applicability `has_param_dependency` 未满足：无参数依赖/互斥 |
| QD-T-3.1 | N/A | 只读，无写语义 |
| QD-T-3.2 | N/A | 无可执行参数 |
| QD-T-3.3 | N/A | 无批量写 |
| QD-T-3.4 | N/A | 无授权上下文参数 |
| QD-T-3.6 | N/A | default "standard" 非危险值 |
| QD-T-3.7 | N/A | 非开放式工具 |
| QD-T-4.1 | PASS | 描述要素齐全 |
| QD-T-4.4 | PASS | 所有 property 有 description（含 items 内 carrier 的 description） |
| QD-T-4.5 | PASS | description 与 schema 一致 |
| QD-T-4.6 | N/A | 无敏感输入参数 |
| QD-T-4.7 | **参考级提示（advisory，OR-L2 下为 P1）** | 缺 `outputSchema`，仅 docstring "Returns quotes from multiple carriers with rates and transit times" |
| QD-T-5.1 | N/A | 无版本对比 |
| QD-T-5.2 | N/A | 无变更说明 |
| QD-T-5.3 | N/A | 无版本对比 |

#### A.3.3 `freight_get_transit_time`

| ID | 判定 | 证据 / 依据 |
|---|---|---|
| QD-T-1.1 | PASS | 齐全 |
| QD-T-1.2 | PASS | required ["origin","destination"] 已定义 |
| QD-T-1.3 | PASS | service_level enum 无冲突 |
| QD-T-1.4 | PASS | additionalProperties: False |
| QD-T-1.5 | PASS | name 合法唯一 |
| QD-T-1.6 | PASS | 约束自洽 |
| QD-T-1.7 | PASS | 均有 type |
| QD-T-2.1 | PASS | string 均有 maxLength 或 enum |
| QD-T-2.2 | PASS | origin/destination/carrier_id 有 pattern；service_level 有 enum |
| QD-T-2.3 | N/A | applicability `has_number_param` 未满足：无 number/integer 参数 |
| QD-T-2.4 | N/A | 无 array 参数 |
| QD-T-2.5 | N/A | applicability `has_amount_or_time_param` 未满足：无金额/时间输入参数 |
| QD-T-2.6 | N/A | 非 list_/search_ 查询工具 |
| QD-T-2.7 | N/A | 无参数依赖/互斥 |
| QD-T-3.1 | N/A | 只读 |
| QD-T-3.2 | N/A | 无可执行参数 |
| QD-T-3.3 | N/A | 无批量写 |
| QD-T-3.4 | N/A | 无授权上下文参数 |
| QD-T-3.6 | N/A | 无危险默认值 |
| QD-T-3.7 | N/A | 非开放式工具 |
| QD-T-4.1 | PASS | 描述要素齐全 |
| QD-T-4.4 | PASS | 所有 property 有 description |
| QD-T-4.5 | PASS | 描述与 schema 一致 |
| QD-T-4.6 | N/A | 无敏感输入参数 |
| QD-T-4.7 | **参考级提示（advisory，OR-L2 下为 P1）** | 缺 `outputSchema`，仅 docstring "Returns minimum, maximum, and average transit days" |
| QD-T-5.1 | N/A | 无版本对比 |
| QD-T-5.2 | N/A | 无变更说明 |
| QD-T-5.3 | N/A | 无版本对比 |

#### A.3.4 `route_check_restrictions`

| ID | 判定 | 证据 / 依据 |
|---|---|---|
| QD-T-1.1 | PASS | 齐全 |
| QD-T-1.2 | PASS | required ["cargo_type"] + anyOf 字段均定义 |
| QD-T-1.3 | PASS | cargo_type enum 无冲突 |
| QD-T-1.4 | PASS | additionalProperties: False |
| QD-T-1.5 | PASS | name 合法唯一 |
| QD-T-1.6 | PASS | 约束自洽 |
| QD-T-1.7 | PASS | 均有 type |
| QD-T-2.1 | PASS | string 均有 maxLength 或 enum |
| QD-T-2.2 | PASS | route_id 有 pattern；cargo_type 有 enum；origin/destination 有 pattern |
| QD-T-2.3 | N/A | 无 number/integer 参数 |
| QD-T-2.4 | N/A | 无 array 参数 |
| QD-T-2.5 | N/A | 无金额/时间参数 |
| QD-T-2.6 | N/A | 非 list_/search_ 查询工具 |
| QD-T-2.7 | PASS | route_id OR origin+destination 通过 anyOf 表达 |
| QD-T-3.1 | N/A | 只读 |
| QD-T-3.2 | N/A | 无可执行参数 |
| QD-T-3.3 | N/A | 无批量写 |
| QD-T-3.4 | N/A | 无授权上下文参数 |
| QD-T-3.6 | N/A | 无危险默认值 |
| QD-T-3.7 | N/A | 非开放式工具 |
| QD-T-4.1 | PASS | 描述要素齐全 |
| QD-T-4.4 | PASS | 所有 property 有 description |
| QD-T-4.5 | PASS | 描述与 schema 一致（route_id "Required if origin/destination not provided" 与 anyOf 一致） |
| QD-T-4.6 | N/A | 无敏感输入参数 |
| QD-T-4.7 | **参考级提示（advisory，OR-L2 下为 P1）** | 缺 `outputSchema`，仅 docstring "Returns whether the cargo is allowed, any requirements, and alternative routes" |
| QD-T-5.1 | N/A | 无版本对比 |
| QD-T-5.2 | N/A | 无变更说明 |
| QD-T-5.3 | N/A | 无版本对比 |

#### A.3.5 `route_get_details`

| ID | 判定 | 证据 / 依据 |
|---|---|---|
| QD-T-1.1 | PASS | 齐全 |
| QD-T-1.2 | PASS | required ["route_id"] 已定义 |
| QD-T-1.3 | N/A | applicability `has_enum` 未满足：无 enum 参数 |
| QD-T-1.4 | PASS | additionalProperties: False |
| QD-T-1.5 | PASS | name 合法唯一 |
| QD-T-1.6 | PASS | minLength 4 = maxLength 4，自洽 |
| QD-T-1.7 | PASS | 均有 type |
| QD-T-2.1 | PASS | route_id 有 maxLength |
| QD-T-2.2 | PASS | route_id 有 pattern ^R\d{3}$ |
| QD-T-2.3 | N/A | 无 number/integer 参数 |
| QD-T-2.4 | N/A | 无 array 参数 |
| QD-T-2.5 | N/A | 无金额/时间参数 |
| QD-T-2.6 | N/A | 非 list_/search_ 查询工具 |
| QD-T-2.7 | N/A | 无参数依赖/互斥 |
| QD-T-3.1 | N/A | 只读 |
| QD-T-3.2 | N/A | 无可执行参数 |
| QD-T-3.3 | N/A | 无批量写 |
| QD-T-3.4 | N/A | 无授权上下文参数 |
| QD-T-3.6 | N/A | 无危险默认值 |
| QD-T-3.7 | N/A | 非开放式工具 |
| QD-T-4.1 | PASS | 描述要素齐全 |
| QD-T-4.4 | PASS | route_id 有 description |
| QD-T-4.5 | PASS | 描述与 schema 一致 |
| QD-T-4.6 | N/A | 无敏感输入参数 |
| QD-T-4.7 | **参考级提示（advisory，OR-L2 下为 P1）** | 缺 `outputSchema`，仅 docstring "Returns complete details … all waypoints, service stations, road types, and restrictions" |
| QD-T-5.1 | N/A | 无版本对比 |
| QD-T-5.2 | N/A | 无变更说明 |
| QD-T-5.3 | N/A | 无版本对比 |

#### A.3.6 `route_recommend_options`

| ID | 判定 | 证据 / 依据 |
|---|---|---|
| QD-T-1.1 | PASS | 齐全 |
| QD-T-1.2 | PASS | required ["origin","destination"] 已定义 |
| QD-T-1.3 | PASS | cargo_type / priority enum 无冲突 |
| QD-T-1.4 | PASS | additionalProperties: False |
| QD-T-1.5 | PASS | name 合法唯一 |
| QD-T-1.6 | PASS | default "balanced" 在 enum 内 |
| QD-T-1.7 | PASS | 均有 type |
| QD-T-2.1 | PASS | string 均有 maxLength 或 enum |
| QD-T-2.2 | PASS | origin/destination 有 pattern；cargo_type/priority 有 enum |
| QD-T-2.3 | N/A | 无 number/integer 参数 |
| QD-T-2.4 | N/A | 无 array 参数 |
| QD-T-2.5 | N/A | 无金额/时间参数 |
| QD-T-2.6 | N/A | 非 list_/search_ 查询工具（recommend 类） |
| QD-T-2.7 | N/A | 无参数依赖/互斥 |
| QD-T-3.1 | N/A | 只读 |
| QD-T-3.2 | N/A | 无可执行参数 |
| QD-T-3.3 | N/A | 无批量写 |
| QD-T-3.4 | N/A | 无授权上下文参数 |
| QD-T-3.6 | N/A | default "balanced" 非危险值 |
| QD-T-3.7 | N/A | 非开放式工具 |
| QD-T-4.1 | PASS | 描述要素齐全 |
| QD-T-4.4 | PASS | 所有 property 有 description |
| QD-T-4.5 | PASS | 描述与 schema 一致 |
| QD-T-4.6 | N/A | 无敏感输入参数 |
| QD-T-4.7 | **参考级提示（advisory，OR-L2 下为 P1）** | 缺 `outputSchema`，仅 docstring "Returns multiple route options with distance, estimated time, and cost" |
| QD-T-5.1 | N/A | 无版本对比 |
| QD-T-5.2 | N/A | 无变更说明 |
| QD-T-5.3 | N/A | 无版本对比 |

#### A.3.7 `shipment_get_history`

| ID | 判定 | 证据 / 依据 |
|---|---|---|
| QD-T-1.1 | PASS | 齐全 |
| QD-T-1.2 | PASS | required ["tracking_number"] 已定义 |
| QD-T-1.3 | N/A | applicability `has_enum` 未满足：无 enum 参数 |
| QD-T-1.4 | PASS | additionalProperties: False |
| QD-T-1.5 | PASS | name 合法唯一 |
| QD-T-1.6 | PASS | minLength 16 = maxLength 16，自洽 |
| QD-T-1.7 | PASS | 均有 type |
| QD-T-2.1 | PASS | tracking_number 有 maxLength 16 |
| QD-T-2.2 | PASS | tracking_number 有 pattern ^FR\d{14}$ |
| QD-T-2.3 | N/A | 无 number/integer 参数 |
| QD-T-2.4 | N/A | 无 array 参数 |
| QD-T-2.5 | N/A | 无金额/时间参数 |
| QD-T-2.6 | N/A | 非 list_/search_ 查询工具（按 tracking_number 单条查询） |
| QD-T-2.7 | N/A | 无参数依赖/互斥 |
| QD-T-3.1 | N/A | 只读 |
| QD-T-3.2 | N/A | 无可执行参数 |
| QD-T-3.3 | N/A | 无批量写 |
| QD-T-3.4 | N/A | 无授权上下文参数 |
| QD-T-3.6 | N/A | 无危险默认值 |
| QD-T-3.7 | N/A | 非开放式工具 |
| QD-T-4.1 | PASS | 描述要素齐全 |
| QD-T-4.4 | PASS | tracking_number 有 description |
| QD-T-4.5 | PASS | 描述与 schema 一致 |
| QD-T-4.6 | N/A | 无敏感输入参数 |
| QD-T-4.7 | **参考级提示（advisory，OR-L2 下为 P1）** | 缺 `outputSchema`，仅 docstring "Returns historical tracking events" |
| QD-T-5.1 | N/A | 无版本对比 |
| QD-T-5.2 | N/A | 无变更说明 |
| QD-T-5.3 | N/A | 无版本对比 |

#### A.3.8 `shipment_get_status`

| ID | 判定 | 证据 / 依据 |
|---|---|---|
| QD-T-1.1 | PASS | 齐全 |
| QD-T-1.2 | PASS | required ["tracking_number"] 已定义 |
| QD-T-1.3 | N/A | applicability `has_enum` 未满足：无 enum 参数 |
| QD-T-1.4 | PASS | additionalProperties: False |
| QD-T-1.5 | PASS | name 合法唯一 |
| QD-T-1.6 | PASS | 约束自洽 |
| QD-T-1.7 | PASS | 均有 type |
| QD-T-2.1 | PASS | tracking_number 有 maxLength 16 |
| QD-T-2.2 | PASS | tracking_number 有 pattern ^FR\d{14}$ |
| QD-T-2.3 | N/A | 无 number/integer 参数 |
| QD-T-2.4 | N/A | 无 array 参数 |
| QD-T-2.5 | N/A | 无金额/时间参数 |
| QD-T-2.6 | N/A | 非 list_/search_ 查询工具 |
| QD-T-2.7 | N/A | 无参数依赖/互斥 |
| QD-T-3.1 | N/A | 只读（docstring "does not modify any shipment data"） |
| QD-T-3.2 | N/A | 无可执行参数 |
| QD-T-3.3 | N/A | 无批量写 |
| QD-T-3.4 | N/A | 无授权上下文参数 |
| QD-T-3.6 | N/A | 无危险默认值 |
| QD-T-3.7 | N/A | 非开放式工具 |
| QD-T-4.1 | PASS | 描述要素齐全 |
| QD-T-4.4 | PASS | tracking_number 有 description |
| QD-T-4.5 | PASS | 描述与 schema 一致 |
| QD-T-4.6 | N/A | 无敏感输入参数 |
| QD-T-4.7 | **参考级提示（advisory，OR-L2 下为 P1）** | 缺 `outputSchema`，仅 docstring "Returns current location, status, ETA, and carrier information" |
| QD-T-5.1 | N/A | 无版本对比 |
| QD-T-5.2 | N/A | 无变更说明 |
| QD-T-5.3 | N/A | 无版本对比 |

#### A.3.9 `shipment_list_by_route`

| ID | 判定 | 证据 / 依据 |
|---|---|---|
| QD-T-1.1 | PASS | 齐全 |
| QD-T-1.2 | PASS | required [] + anyOf 字段均定义 |
| QD-T-1.3 | PASS | status enum 无冲突 |
| QD-T-1.4 | PASS | additionalProperties: False |
| QD-T-1.5 | PASS | name 合法唯一 |
| QD-T-1.6 | PASS | limit minimum 1 ≤ maximum 50、default 50 在约束内 |
| QD-T-1.7 | PASS | 均有 type |
| QD-T-2.1 | PASS | string 有 maxLength；status 有 enum 豁免 |
| QD-T-2.2 | PASS | date_from/date_to 有 pattern + format: date；status 有 enum |
| QD-T-2.3 | PASS | limit 有 minimum 1 / maximum 50 |
| QD-T-2.4 | N/A | 无 array 参数 |
| QD-T-2.5 | N/A | 无金额/时间参数 |
| QD-T-2.6 | PASS | list_ 查询工具有 limit 参数（maximum 50，结果上限） |
| QD-T-2.7 | PASS | origin OR destination 通过 anyOf 表达 |
| QD-T-3.1 | N/A | 只读 |
| QD-T-3.2 | N/A | 无可执行参数 |
| QD-T-3.3 | N/A | 无批量写 |
| QD-T-3.4 | N/A | 无授权上下文参数 |
| QD-T-3.6 | N/A | default 50 非危险值 |
| QD-T-3.7 | N/A | 非开放式工具 |
| QD-T-4.1 | PASS | 描述要素齐全 |
| QD-T-4.4 | PASS | 所有 property 有 description |
| QD-T-4.5 | PASS | 描述与 schema 一致（origin/destination "Optional" 与 anyOf 至少一个 不矛盾） |
| QD-T-4.6 | N/A | 无敏感输入参数 |
| QD-T-4.7 | **参考级提示（advisory，OR-L2 下为 P1）** | 缺 `outputSchema`，仅 docstring "Returns a summary list of matching shipments" |
| QD-T-5.1 | N/A | 无版本对比 |
| QD-T-5.2 | N/A | 无变更说明 |
| QD-T-5.3 | N/A | 无版本对比 |

### A.4 QC — 内嵌代码契约（Code Contract）

> 本用例的 Prompt 与 Skill 内**无** python 代码块（无内嵌代码片段）；Tool 的 `parameters` dict 本身不算"内嵌片段"（它是 Tool Schema 本体，非逻辑工件内嵌代码）。故 QC 域 applicability `has_code_snippet` 未满足，全部 17 项 N/A。

| ID | 判定 | 依据 |
|---|---|---|
| QC-0.1 | N/A | applicability `has_code_snippet` 未满足：无内嵌代码片段 |
| QC-0.2 | N/A | 同上 |
| QC-0.3 | N/A | 同上 |
| QC-0.4 | N/A | 同上 |
| QC-0.5 | N/A | 同上 |
| QC-1.1 | N/A | 同上 |
| QC-1.2 | N/A | 同上 |
| QC-1.3 | N/A | 同上 |
| QC-1.4 | N/A | 同上 |
| QC-2.1 | N/A | 同上 |
| QC-2.2 | N/A | 同上 |
| QC-2.3 | N/A | 同上 |
| QC-3.1 | N/A | 同上 |
| QC-3.2 | N/A | 同上 |
| QC-3.3 | N/A | 同上 |
| QC-4.1 | N/A | 同上 |
| QC-4.2 | N/A | 同上 |

---

## Stage B — 跨工件检测（QD-PS / QD-PT / QD-ST / QD-SS / QD-TT / QD-CYC，29 项）

> AC-L2 下多数组项为 `∅`（参考级）。`∅` 项标注"参考级"。

| ID | 判定 | 证据 / 依据 |
|---|---|---|
| QD-PS-1.1 | N/A | applicability `has_skill_reference` 未满足：Prompt 未声明任何 Skill 名（仅引用 9 个 Tool 名） |
| QD-PS-1.2 | PASS（参考级，AC-L2 下 ∅） | Prompt 三功能（tracking/route/quotation）与 3 个 Skill 的 invocation 匹配 |
| QD-PS-1.3 | PASS | Prompt 声明的 9 个只读工具覆盖各 Skill 的 allowed_operations（均只读） |
| QD-PS-1.4 | PASS（参考级，AC-L2 下 ∅） | Prompt 声明的 data/*.json 集合覆盖 3 个 Skill 的 allowed_resources |
| QD-PS-1.5 | **FAIL（参考级，AC-L2 下 ∅；AC-L3 下为 P1）** | Prompt "retry the same call at most once with corrected parameters; never retry with identical parameters" vs Skill "retry the identical call at most 3 times (per max_retries)" —— 重试次数与参数语义不一致 |
| QD-PS-1.6 | PASS（参考级，AC-L2 下 ∅） | Prompt Output Format 与 Skill "Returns (closed enumeration)" 一致 |
| QD-PS-1.7 | PASS（参考级，AC-L2 下 ∅） | Prompt Input Source（route_id/carrier_id 来自前序工具结果）满足 Skill 前置条件 |
| QD-PT-2.1 | PASS | Prompt 声明的 9 个 Tool 名均存在且语义一致 |
| QD-PT-2.2 | PASS | Prompt Authorized Tools 表的参数与各 Tool Schema 的 required/optional 一致 |
| QD-PT-2.3 | PASS（参考级，AC-L2 下 ∅） | Prompt 参数约束（weight 0.1-50000、volume 0.1-150 等）与 inputSchema 一致 |
| QD-PT-2.4 | PASS | Prompt 只读权限声明匹配各 Tool 风险级（均 OR-L1 只读） |
| QD-PT-2.5 | PASS（参考级，AC-L2 下 ∅） | Prompt error 处理覆盖 Tool 错误类型（not found / no matching） |
| QD-PT-2.6 | PASS（参考级，AC-L2 下 ∅） | Prompt 声明频率上限（"at most twice per turn / 12 total"）合理 |
| QD-PT-2.7 | PASS（参考级，AC-L2 下 ∅） | Prompt 参数语义/单位（kg/m³/status 枚举）与 inputSchema 一致 |
| QD-ST-3.1 | PASS | 各 Skill 声明的工具均存在（3+3+3 = 9 工具） |
| QD-ST-3.2 | PASS（参考级，AC-L2 下 ∅） | Skill INPUT 约束（origin 2-100、tracking_number 16 位）由 inputSchema 支持 |
| QD-ST-3.3 | PASS（参考级，AC-L2 下 ∅） | Tool 必填参数在 Skill 中有来源声明（用户输入 / 前序工具结果） |
| QD-ST-3.4 | PASS（参考级，AC-L2 下 ∅） | Skill 频率/批量期望与 Tool 能力合理 |
| QD-ST-3.5 | PASS（参考级，AC-L2 下 ∅） | Skill "Returns (closed enumeration)" 与 Tool 返回描述匹配 |
| QD-ST-3.6 | PASS | Skill 权限声明（read-only）覆盖 Tool 副作用（均无副作用） |
| QD-ST-3.7 | PASS（参考级，AC-L2 下 ∅） | Skill FAILURE 维度覆盖 Tool 关键错误 |
| QD-CYC-1.1 | PASS（参考级，AC-L2 下 ∅） | Prompt→Tool、Skill→Tool 调用关系无闭环 |
| QD-CYC-1.2 | N/A | applicability `has_multi_agent` 未满足：单 Agent，无 ≥2 Agent 角色 |
| QD-CYC-1.3 | N/A | applicability `has_skill_handoff` 未满足：3 个 Skill 无互相 handoff（各自声明禁止调用其他 Skill） |
| QD-SS-4.1 | PASS（参考级，AC-L2 下 ∅） | 3 个 Skill 的 invocation 触发条件不重叠 |
| QD-SS-4.2 | PASS（参考级，AC-L2 下 ∅） | Skill 名唯一（freight_quotation / route_planning / shipment_tracking） |
| QD-TT-5.1 | PASS（参考级，AC-L2 下 ∅） | Tool 间数据流（route_id/carrier_id 传递）无敏感输出+危险消费链 |
| QD-TT-5.2 | PASS（参考级，AC-L2 下 ∅） | 9 个 Tool name/description 语义区分清晰，无近似误调 |
| QD-TT-5.3 | PASS（参考级，AC-L2 下 ∅） | Tool 间数据结构（route_id/carrier_id 均为 4 字符 ID）可桥接 |

---

## Stage C — Gate-0（Permission 准入）

| 条件 | 结果 | 理由 |
|---|---|---|
| G0-1 | no unfixed Stage-A P0 | 通过：Stage A 计入级 P0 = 0（Prompt/Skill/Tool 均无 P0 FAIL；Skill 的 QD-S-0.8 属基线门非 P0） |
| G0-2 | no unfixed Stage-B P0 | 通过：Stage B 计入级 P0 = 0（QD-PS-1.5 为参考级，AC-L2 下 ∅） |
| G0-3 | responsibility baseline locatable | `locatable`：Prompt Identity/Task Boundary/Guardrails + 各 Skill description/overview 均可定位责任基线 |
| G0-4 | each Tool Schema name/description complete（tool-level） | `complete`：9 个 Tool 的 name（docstring 首行）+ description（docstring）均完整 |

**Gate-0 结论**：Passed。G0-4 complete → 进入 Stage D。

---

## Stage D — Permission 比例性（QD-PM，Quick Mode 17 项）

> 所有 verdict 均标注 **"provisional (lite quick mode)"**。severity 按 max 口径（风险事实 OR-L，本 Agent 全为 OR-L1 只读）。

**范围声明（§7.2，强制）**：本阶段只验证逻辑工件内的**声明层比例性**。按源 §0.1.4，**不**检查：实际 IAM/IdP 策略配置（部署层）；PEP/PDP 运行时执行；运行时权限使用监控/异常检测；令牌生命周期或密钥轮换工程。此处 PASS 不代表运行时权限安全，不得如此解读。

| ID | 判定 | 证据 / 依据 |
|---|---|---|
| QD-PM-1.1 | Applicable / PASS | 9 个只读工具 + 3 个 Skill 的 allowed_operations 均可在职责（tracking/route/quotation）中找到解释 |
| QD-PM-1.2 | Applicable / PASS | 权限未超出职责所需最小操作集（全部只读查询） |
| QD-PM-1.3 | Applicable / PASS | 职责要求的操作均有对应工具（无缺失） |
| QD-PM-2.1 | Applicable / PASS | 资源访问范围已受限（allowed_resources 明确列出，无通配符） |
| QD-PM-2.2 | Applicable / PASS | 本地 mock 数据查询，无跨主体/跨租户访问形态 |
| QD-PM-2.3 | Applicable / PASS | 字段级范围已限制（shipment_tracking 声明 "no consignee PII is returned"） |
| QD-PM-2.4 | Applicable / PASS | 环境边界已声明（本地运行，禁止生产/外部） |
| QD-PM-2.8 | Applicable / PASS | 声明 scope 与 Tool 参数可达范围一致 |
| QD-PM-3.3 | Applicable / PASS | 无身份短语替代操作授权清单（allowed_operations 显式枚举） |
| QD-PM-3.4 | N/A | applicability `has_irreversible_op` 未满足：无不可逆操作（固定 P0 项不适用） |
| QD-PM-4.2 | Applicable / PASS | 下游（Skill allowed_operations）未超出上游（Prompt Authorized Tools）授权 |
| QD-PM-4.4 | N/A | applicability `has_delegation` 未满足：无 Sub-Agent 委托形态 |
| QD-PM-4.8 | N/A | applicability `has_external_protocol` 未满足：无外部协议/服务引用（MCP 等） |
| QD-PM-5.4 | Applicable / PASS | 有权限声明（allowed_operations/read-only）+ 环境描述（本地运行），非用隔离替代权限（固定 P0 项，未命中） |
| QD-PM-5.7 | N/A | applicability `has_exemption_expr` 未满足：无豁免措辞（emergency/skip 等） |
| QD-PM-6.3 | N/A | applicability `has_ORL3_permission` 未满足：无 OR-L3 权限（固定 P0 项不适用） |
| QD-PM-6.5 | Applicable / PASS | 权限集可完全枚举（9 工具 + 各 Skill 的 3 个 allowed_operations 显式列出） |

**Stage D 结论**：Quick Mode 17 项中 Applicable 项全部 PASS，N/A 项均带结构事实依据。无 QD-PM 缺陷。

---

## Stage E — 显式风险审计（EX：NL-A / NL-B / NR-O / NR-S）

> 本阶段为「风险分类 + 分级」，非 PASS/FAIL 检查。扫描静态后端逻辑文本中显式表达的风险。

**Phase 1 发现分类**：逐句扫描 NL-A → NL-B → NR-O → NR-S，**未发现任何显式风险表达**：

- **NL-A（单句自包含/上下文依赖/意图声明等）**：无命中。所有 Guardrail / Task Boundary / 只读声明均为**防御性安全约束**，非危险表达。
- **NL-B（跨句关联）**：无命中。无跨句风险拼接或授权链伪造。
- **NR-O（零宽字符/编码载荷/同形字等）**：无命中。文本无隐藏字符、无 Base64/Hex 载荷。
- **NR-S（结构化配置风险）**：
  - NR-S-1 无超范围权限字段；NR-S-2 无危险能力开关（无 `allow_external_call`/`bypass_auth=true`）；NR-S-3 无异常参数声明（无 `type:any`/`pattern:.*`）；NR-S-4 无内嵌可执行代码；NR-S-5 无工具描述字段指令投毒；NR-S-6 default/example 值均为正常值（"standard"/"balanced"/50）；NR-S-7 无 callback/webhook/url 异常指向；NR-S-8 无工具名冲突；NR-S-9 **无硬编码凭证/密钥**；NR-S-10 **无硬编码 PII**。

**Phase 2 定级**：无风险项，故无 D1/D2/D3 标签、无 `Explicit·P0/P1/P2` 分级、无 conditional/unconditional 触发标签。

**Phase 3 输出**：

| EX 分类码 | verbatim 风险表达式 | D1/D2/D3 | 分级 | 触发 | 处置 |
|---|---|---|---|---|---|
| （无） | — | — | — | — | — |

**Stage E 结论**：未发现显式风险表达（`Explicit·P0/P1/P2 = 0/0/0`）。

**声明**：**Risk Implicit（动态可利用性验证）未运行**。本阶段结论仅基于静态文本中显式表达的风险，不代表运行时安全。

---

## Stage F — 影响展望（候选映射，建议性）

> 本节与 verdict 结论物理隔离，是建议性上下文。对 Stage A/B/D 的 FAIL 逐条查 relevance map。QC-* 无映射（本用例 QC = N/A，无 QC FAIL）。**candidate 语言**：仅为"候选关联"（may / candidate association / needs dynamic verification），**不构成因果断言**。
>
> 声明：Risk Implicit 与运行时 Quality 子集**未运行**（Risk Explicit 已在 Stage E 运行；嵌入式代码 QC 在 Stage A 运行）。按 relevance.md §1.4，不假设工件外补偿控制缺失。

### Impact Card: QD-S-0.8 | Metadata Completeness（baseline gate）| 不计 P

**Static Discovery**
- Artifact: skill:freight_quotation / skill:route_planning / skill:shipment_tracking（3 处同源）
- Version: undeclared
- Evidence: front matter 缺 `version`/`owner`/`changelog`

**Potential Security Associations**
- Candidate Attack Surface: AS-09（Cross-Artifact Contract Breach）
- Potential Impact: Availability, Auditability
- Mapping Strength: Medium "provisional (lite)" — 仅关联置信度，非 severity
- Note: 本结论指示验证优先级，尚未指示后端可利用。基线门失败致该 Skill 结论记为 "assessment incomplete (NEEDS_REVIEW)"。

**Recommended Validation — NOT run by this lite inspector**
- Risk Explicit: Stage E 已跑，此处不重分类。
- Risk Implicit: 未运行。
- External controls: 存在性未知；按 §1.4 不假设缺失。

**Potential Quality Associations**
- Tool-Agent: FM-08, FM-10（类别级，B.1）
- RAG-Agent: Completeness, Timeliness, Robustness（候选，C.1）

**Current Evidence Status**
- Static Defect: Confirmed（baseline gate）
- Dynamic Exploitability: Not verified
- Quality Association: Not verified
- Compensating Control: To be confirmed

### Impact Card: QD-PS-1.5 | Failure Handling Consistency（参考级，AC-L3 下为 P1）

**Static Discovery**
- Artifact: prompt + skill（3 个 Skill 同源）
- Version: undeclared
- Evidence: Prompt "retry … at most once … never retry with identical parameters" vs Skill "retry the identical call at most 3 times"

**Potential Security Associations**
- Candidate Attack Surface: AS-07（Anomaly Propagation）、AS-09（Cross-Artifact Contract Breach）
- Potential Impact: D2, Availability
- Mapping Strength: Medium "provisional (lite)" — 仅关联置信度，非 severity（参考级，AC-L2 下 ∅）
- Note: 候选关联——重试语义不一致可能（may）导致异常传播路径在 Prompt 与 Skill 间解释分歧，需动态验证。

**Recommended Validation — NOT run by this lite inspector**
- Risk Explicit: Stage E 已跑。
- Risk Implicit: 未运行。
- External controls: 存在性未知。

**Potential Quality Associations**
- Tool-Agent: FM-08, FM-09（类别级，B.1）
- RAG-Agent: Completeness, Coherence, Safety Response（候选，C.1）

**Current Evidence Status**
- Static Defect: Confirmed（参考级）
- Dynamic Exploitability: Not verified
- Quality Association: Not verified
- Compensating Control: To be confirmed

### Impact Card: QD-T-4.7 | Output Contract Missing（参考级，OR-L2 下为 P1）

**Static Discovery**
- Artifact: tool（9 个 Tool Schema 同源）
- Version: undeclared
- Evidence: 各 Tool 均缺 `outputSchema`，仅 docstring 文本描述返回

**Potential Security Associations**
- Candidate Attack Surface: AS-03（Output Handling）、AS-09（Cross-Artifact Contract Breach）
- Potential Impact: D1, D2, Availability
- Mapping Strength: Medium "provisional (lite)" — 仅关联置信度，非 severity（参考级，OR-L1 下 ∅）
- Note: 候选关联——缺结构化输出契约可能（may）使下游 Tool 间数据桥接缺乏机器可校验约束，需动态验证。

**Recommended Validation — NOT run by this lite inspector**
- Risk Explicit: Stage E 已跑。
- Risk Implicit: 未运行。
- External controls: 存在性未知。

**Potential Quality Associations**
- Tool-Agent: FM-05, FM-06（类别级，B.1）
- RAG-Agent: Completeness, Traceability, Format Compliance（候选，C.1）

**Current Evidence Status**
- Static Defect: Confirmed（参考级）
- Dynamic Exploitability: Not verified
- Quality Association: Not verified
- Compensating Control: To be confirmed

---

## 状态板（Status Board）

```
Stage A (Single-artifact):  Executed — 1 Prompt + 3 Skill + 9 Tool + QC(N/A)；P0=0，3 个 Skill 基线门 QD-S-0.8 失败（NEEDS_REVIEW）
Stage B (Cross):            Executed — 29 项；计入级 P0=0；QD-PS-1.5 参考级不一致
Stage C (Gate-0):           Passed — G0-1: no unfixed Stage-A P0; G0-2: no unfixed Stage-B P0; G0-4: complete; G0-3: locatable
Stage D (Permission QD-PM): Executed — Quick Mode 17 项，Applicable 全 PASS，无 QD-PM 缺陷
Stage E (Risk Explicit EX): Executed — 未发现显式风险表达（Explicit·P0/P1/P2 = 0/0/0）
Stage F (Impact outlook):   Executed — 3 张 Impact Card（QD-S-0.8 / QD-PS-1.5 / QD-T-4.7）
Stage G (Self-verification): Executed — 见下
```

---

## 自检声明（Stage G）

**Self-verification: ID back-closure OK · red-line wording OK · output contract OK · triangle check OK · forward coverage OK**

- **ID back-closure**：报告内所有 `QD-*`/`QC-*`/`EX-*`/`AS-*`/`FM-*`/`G0-*` ID 均存在于 references 中；Stage F 的 AS-*/FM-* 映射均见于 `relevance-map.v2.md`。无编造 ID。
- **red-line wording**：Stage F 未使用因果语言（无 will cause / inevitably / guarantees，统一 may / candidate association）；未写工件 "secure"/"high quality"；未写 "Permission = ERROR/BLOCKED"（Permission 已正常执行，无该表述场景）。
- **output contract**：状态板恰好 7 行；报告头含 6 项 provenance；执行摘要存在；报告用中文、规则 ID/标签保持英文；证据引用工件原文（英文）原样。
- **triangle check（三角核对，脱钩反向）**：将报告作为外部文档审计，逐项核对每个 verdict 与其 checklist 定义——
  - QD-S-0.8（Metadata Completeness）→ 定义 "version/owner/changelog 缺失或不可追溯"，与 3 个 Skill front matter 实际缺失一致 ✓
  - QD-PS-1.5（Failure Handling Consistency）→ 定义 "Prompt 异常处理对齐 Skill FAILURE 维度"，与 retry 语义矛盾内容一致 ✓
  - QD-T-4.7（Output Contract Missing）→ 定义 "缺 outputSchema"，与 9 个 Tool 实际缺 outputSchema 一致 ✓
  - 其余 PASS/N/A 项核对无"张冠李戴"。Severity 均按 L 键取值（AC-L2 / OR-L1）。
- **tier self-audit**：AC-L（复杂度→Prompt 域）与 OR-L（风险→Skill/Tool 域）未混用。**层级备注**：该 Agent 呈 AC-L3 特征（复合请求多意图编排 + 工具编排 + 多轮上下文），但按已声明取值 AC-L2；此特征使 QD-PS-1.5（AC-L3 下为 P1）等参考级项在 AC-L3 下将升级为 P1。已如实记录，未擅自升层。
- **N/A basis re-verification**：所有 N/A 均带 applicability.fact 结构依据（如 has_skill、has_structured_input、has_write_semantics、has_irreversible_op、has_code_snippet 等）；无无依据 N/A。
- **upgrade justification audit**：无通过升级路径（OR-L3 / →P0 实例分支）达成的 P0；无遗漏升级。
- **cross-stage consistency**：无同一事实跨阶段分级不一致（Skill 权限边界在 Stage A QD-S-5.x 与 Stage D QD-PM 均判只读/PASS，无 divergence）。prompt/tool 无本地去重组，dedup 不适用。
- **forward coverage（前向覆盖闭合）**：
  - QD-P（Prompt 域 §2 索引）：应判 48 / 已判 48 ✓
  - QD-S（Skill 域 §2 索引）：应判 33×3 = 99 / 已判 99 ✓
  - QD-T（Tool 域 §2 索引，含 3 项 change-check）：应判 28×9 = 252 / 已判 252 ✓
  - QD-PS/PT/ST/CYC/SS/TT（Cross 域 §2 索引）：应判 29 / 已判 29 ✓
  - QD-PM（Permission Quick Mode 17）：应判 17 / 已判 17 ✓
  - QC（Code Contract 域 §2 索引）：应判 17 / 已判 0（全 N/A，applicability `has_code_snippet` 未满足，整体记 N/A，非漏判）✓
  - M < N 情形：无（QC 域属 applicability 未满足的整域 N/A，已列明依据，不计为漏判）。

**自纠与 reconciliation notes**：无（检测过程中未发现需改判的 ID；参考级项 QD-PS-1.5 / QD-T-4.7 已按 `∅` 档明确标注为 advisory，非缺陷，不计入 P0/P1/P2）。
