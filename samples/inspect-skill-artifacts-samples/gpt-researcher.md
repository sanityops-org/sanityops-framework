---
title: "External Inspection Sample — gpt-researcher Prompt & Tool Artifacts"
description: "sanityops-inspect lite inspection of gpt-researcher logic artifacts (prompt library + LangChain tool definitions) at a pinned commit: provenance, verbatim artifacts, Stage A QD-P/QD-T verdicts, cross/Permission status, and the five-stage status board."
---

# External Inspection Sample — gpt-researcher (Prompt + Tool)

> Instance output of the **sanityops-inspect** lite inspector (SanityOps Framework v1.0 condensed checklists, detect-only). This is an **F-* level instance record**, not a rule definition; the normative sources remain `inspect/prompt.md`, `inspect/tool.md`, `inspect/cross.md`, `inspect/permission.md`, and `framework/relevance.md`.

## Part 0 — Provenance

| Item | Value |
|---|---|
| Repository | https://github.com/assafelovic/gpt-researcher |
| Branch / HEAD SHA | `main` · `0957c301ed06c2a5857b834358c7227c739041d4` (merge of PR #2173, 2026-09-26) |
| Artifact license | Apache License 2.0 (`LICENSE`) — embedded prompt text reproduced under that license, © the gpt-researcher contributors |
| Fetched | 2026-10-06 |
| Fetched files | `gpt_researcher/prompts.py`, `gpt_researcher/actions/agent_creator.py`, `gpt_researcher/skills/deep_research.py`, `gpt_researcher/skills/image_generator.py`, `gpt_researcher/utils/tools.py`, `LICENSE` |
| Checked & discarded | `agent.py`, `skills/{researcher,writer,browser,context_manager,curator,__init__}.py`, `actions/query_processing.py`, `mcp/tool_selector.py`, `json_schema_generator.py` (no prompt constants or schema definitions) |
| Environment fact | **No static tool/function-calling JSON schema files exist in this revision.** Tool schemas are generated at runtime by LangChain from `@tool`-decorated signatures (`bind_tools`); `create_custom_tool` accepts `parameter_schema` as an **optional** dict |
| Inspector | sanityops-inspect lite (five-stage gated flow, minimal rule sets), run 2026-10-06 |
| Report copyright | Report text © SanityOps contributors, CC BY-SA 4.0 |

**Artifact-type inventory:** System-Prompt artifacts = the template strings below (a parameterized `PromptFamily` library plus embedded prompts in two skill-modules and one fallback). Tool artifacts = the LangChain tool definitions in `utils/tools.py`. **No Skill-definition artifact exists** — the `skills/` directory contains Python orchestration code, not Skill definitions.

## Part 1 — Source Logic Artifacts (verbatim)

Only Logic-Artifact text is reproduced: prompt template literals and tool definitions, with file:line provenance. Python imports, class machinery, parsing code, and orchestration are omitted.

### 1.1 `gpt_researcher/prompts.py`

**(L54–83) `generate_mcp_tool_selection_prompt` — system/user template:**

```text
You are a research assistant helping to select the most relevant tools for a research query.

RESEARCH QUERY: "{query}"

AVAILABLE TOOLS:
{json.dumps(tools_info, indent=2)}

TASK: Analyze the tools and select EXACTLY {max_tools} tools that are most relevant for researching the given query.

SELECTION CRITERIA:
- Choose tools that can provide information, data, or insights related to the query
- Prioritize tools that can search, retrieve, or access relevant content
- Consider tools that complement each other (e.g., different data sources)
- Exclude tools that are clearly unrelated to the research topic

Return a JSON object with this exact format:
{
  "selected_tools": [
    {
      "index": 0,
      "name": "tool_name",
      "relevance_score": 9,
      "reason": "Detailed explanation of why this tool is relevant"
    }
  ],
  "selection_reasoning": "Overall explanation of the selection strategy"
}

Select exactly {max_tools} tools, ranked by relevance to the research query.
```

**(L105–118) `generate_mcp_research_prompt`:**

```text
You are a research assistant with access to specialized tools. Your task is to research the following query and provide comprehensive, accurate information.

RESEARCH QUERY: "{query}"

INSTRUCTIONS:
1. Use the available tools to gather relevant information about the query
2. Call multiple tools if needed to get comprehensive coverage
3. If a tool call fails or returns empty results, try alternative approaches
4. Synthesize information from multiple sources when possible
5. Focus on factual, relevant information that directly addresses the query

AVAILABLE TOOLS: {tool_names}

Please conduct thorough research and provide your findings. Use the tools strategically to gather the most relevant and comprehensive information.
```

**(L142–175) `generate_image_analysis_prompt`:**

```text
Analyze the following research report sections and identify which {max_images} sections would benefit MOST from a visual illustration or diagram.

RESEARCH TOPIC: {query}

REPORT SECTIONS:
{sections_text}

For each recommended section, provide:
1. The section number (1-indexed)
2. A specific, detailed image prompt that would create an informative illustration
3. A brief explanation of why this section benefits from visualization

IMPORTANT GUIDELINES:
- Choose sections where visual representation would genuinely aid understanding
- Focus on concepts, processes, comparisons, data flows, or statistics that are inherently visual
- Avoid sections that are purely textual analysis, introductions, or conclusions
- The image prompt should be specific enough to generate a relevant, professional illustration
- Images should be informative and educational, not decorative
- Consider diagrams, flowcharts, comparison charts, or conceptual illustrations

Respond in JSON format:
{
    "suggestions": [
        {
            "section_number": 1,
            "section_header": "Section Title",
            "image_prompt": "Detailed prompt for generating an informative illustration...",
            "image_type": "diagram|flowchart|comparison|concept|data_visualization",
            "reason": "Why this section benefits from visualization"
        }
    ]
}

Return ONLY the JSON, no additional text.
```

**(L193–210) `generate_image_prompt_enhancement`:**

```text
Create a professional, informative illustration for a research report.

RESEARCH TOPIC: {research_topic}

IMAGE DESCRIPTION: {base_prompt}

CONTEXT FROM REPORT:
{section_content[:800]}

STYLE REQUIREMENTS:
- Professional and clean design suitable for academic/business reports
- Clear, easy-to-understand visual elements
- Modern, minimalist aesthetic
- Use a professional color palette (blues, teals, grays)
- Avoid excessive text in the image
- High contrast for readability
- If showing data or comparisons, use clear labels and legends
- Suitable for both digital viewing and printing
```

**(L239–259) `generate_search_queries_prompt` (conditional context prefix + body):**

```text
You are a seasoned research assistant tasked with generating search queries to find relevant information for the following task: "{task}".
Context: {context}

Use this context to inform and refine your search queries. The context provides real-time web information that can help you generate more specific and relevant queries. Consider any current events, recent developments, or specific details mentioned in the context that could enhance the search queries.
```

```text
Write {max_iterations} search queries to research the following task: "{task}"

Each query must be a plain natural language phrase. Do not use search operator syntax
such as site:, filetype:, inurl:, intitle:, OR, AND, or NOT — these operators are
not universally supported and will return empty results on many search backends.

Assume the current date is {datetime.now(timezone.utc).strftime('%B %d, %Y')} if required.

{context_prompt}
You must respond with a list of strings in the following format: ["query 1", "query 2"].
The response should contain ONLY the list.
```

**(L277–316) `generate_report_prompt` (reference/tone conditionals + body):**

```text
[web source] You MUST write all used source urls at the end of the report as references, and make sure to not add duplicated sources, but only one reference for each.
Every url should be hyperlinked: [url website](url)
Additionally, you MUST include hyperlinks to the relevant URLs wherever they are referenced in the report:
eg: Author, A. A. (Year, Month Date). Title of web page. Website Name. [url website](url)

[local source] You MUST write all used source document names at the end of the report as references, and make sure to not add duplicated sources, but only one reference for each.
```

```text
Information: "{context}"
---
Using the above information, answer the following query or task: "{question}" in a detailed report --
The report should focus on the answer to the query, should be well structured, informative,
in-depth, and comprehensive, with facts and numbers if available and at least {total_words} words.
You should strive to write the report as long as you can using all relevant and necessary information provided.

Please follow all of the following guidelines in your report:
- You MUST determine your own concrete and valid opinion based on the given information. Do NOT defer to general and meaningless conclusions.
- You MUST write the report with markdown syntax and {report_format} format.
- Structure your report with clear markdown headers: use # for the main title, ## for major sections, and ### for subsections.
- Use markdown tables when presenting structured data or comparisons to enhance readability.
- You MUST prioritize the relevance, reliability, and significance of the sources you use. Choose trusted sources over less reliable ones.
- You must also prioritize new articles over older articles if the source can be trusted.
- You MUST NOT include a table of contents, but DO include proper markdown headers (# ## ###) to structure your report clearly.
- Use in-text citation references in {report_format} format and it must be made with markdown hyperlink placed at the end of the sentence or paragraph that references them like this: ([in-text citation](url)).
- Every substantive claim, figure or quote MUST carry an in-text citation to the source it came from. Do NOT cite sources that do not appear in the provided information.
- Don't forget to add a reference list at the end of the report in {report_format} format.
- {reference_prompt}
- {tone_prompt}
You MUST write the report in the following language: {language}.
Assume that the current date is {date.today()}.
```

**(L320–350) `curate_sources`:**

```text
Your goal is to evaluate and curate the provided scraped content for the research task: "{query}"
    while prioritizing the inclusion of relevant and high-quality information, especially sources containing statistics, numbers, or concrete data.

The final curated list will be used as context for creating a research report, so prioritize:
- Retaining as much original information as possible, with extra emphasis on sources featuring quantitative data or unique insights
- Including a wide range of perspectives and insights
- Filtering out only clearly irrelevant or unusable content

EVALUATION GUIDELINES:
1. Assess each source based on:
   - Relevance: Include sources directly or partially connected to the research query. Err on the side of inclusion.
   - Credibility: Favor authoritative sources but retain others unless clearly untrustworthy.
   - Currency: Prefer recent information unless older articles are essential or valuable.
   - Objectivity: Retain sources with bias if they provide a unique or complementary perspective.
   - Quantitative Value: Give higher priority to sources with statistics, numbers, or other concrete data.
2. Source Selection:
   - Include as many relevant sources as possible, up to {max_results}, focusing on broad coverage and diversity.
   - Prioritize sources with statistics, numerical data, or verifiable facts.
   - Overlapping content is acceptable if it adds depth, especially when data is involved.
   - Exclude sources only if they are entirely irrelevant, severely outdated, or unusable due to poor content quality.
3. Content Retention:
   - DO NOT rewrite, summarize, or condense any source content.
   - Retain all usable information, cleaning up only clear garbage or formatting issues.
   - Keep marginally relevant or incomplete sources if they contain valuable data or insights.

SOURCES LIST TO EVALUATE:
{sources}

You MUST return your response in the EXACT sources JSON list format as the original sources.
The response MUST not contain any markdown format or additional text (like ```json), just the JSON list!
```

**(L377–390) `generate_resource_report_prompt` (composed body, verbatim):**

```text
"""{context}"""

Based on the above information, generate a bibliography recommendation report for the following question or topic: "{question}". The report should provide a detailed analysis of each recommended resource, explaining how each source can contribute to finding answers to the research question.
Focus on the relevance, reliability, and significance of each source.
Ensure that the report is well-structured, informative, in-depth, and follows Markdown syntax.
Use markdown tables and other formatting features when appropriate to organize and present information clearly.
Include relevant facts, figures, and numbers whenever available.
The report should have a minimum length of {total_words} words.
You MUST write the report in the following language: {language}.
You MUST include all relevant source urls.
Every url should be hyperlinked: [url website](url)
{reference_prompt}
```

**(L396) `generate_custom_report_prompt`:** `"{context}"\n\n{query_prompt}`

**(L408–415) `generate_outline_report_prompt`:**

```text
"""{context}""" Using the above information, generate an outline for a research report in Markdown syntax for the following question or topic: "{question}". The outline should provide a well-structured framework for the research report, including the main sections, subsections, and key points to be covered. The research report should be detailed, informative, in-depth, and a minimum of {total_words} words. Use appropriate Markdown syntax to format the outline and ensure readability. Consider using markdown tables and other formatting features where they would enhance the presentation of information.
```

**(L455–487) `generate_deep_research_prompt`:**

```text
Using the following hierarchically researched information and citations:

"{context}"

Write a comprehensive research report answering the query: "{question}"

The report should:
1. Synthesize information from multiple levels of research depth
2. Integrate findings from various research branches
3. Present a coherent narrative that builds from foundational to advanced insights
4. Maintain proper citation of sources throughout
5. Be well-structured with clear sections and subsections
6. Have a minimum length of {total_words} words
7. Follow {report_format} format with markdown syntax
8. Use markdown tables, lists and other formatting features when presenting comparative data, statistics, or structured information

Additional requirements:
- Prioritize insights that emerged from deeper levels of research
- Highlight connections between different research branches
- Include relevant statistics, data, and concrete examples
- You MUST determine your own concrete and valid opinion based on the given information. Do NOT defer to general and meaningless conclusions.
- You MUST prioritize the relevance, reliability, and significance of the sources you use. Choose trusted sources over less reliable ones.
- You must also prioritize new articles over older articles if the source can be trusted.
- Use in-text citation references in {report_format} format and make it with markdown hyperlink placed at the end of the sentence or paragraph that references them like this: ([in-text citation](url)).
- {tone_prompt}
- Write in {language}

{reference_prompt}

Please write a thorough, well-researched report that synthesizes all the gathered information into a cohesive whole.
Assume the current date is {datetime.now(timezone.utc).strftime('%B %d, %Y')}.
```

**(L491–515) `auto_agent_instructions` (router system prompt with all three positive examples):**

```text
This task involves researching a given topic, regardless of its complexity or the availability of a definitive answer. The research is conducted by a specific server, defined by its type and role, with each server requiring distinct instructions.
Agent
The server is determined by the field of the topic and the specific name of the server that could be utilized to research the topic provided. Agents are categorized by their area of expertise, and each server type is associated with a corresponding emoji.

examples:
task: "should I invest in apple stocks?"
response:
{
    "server": "💰 Finance Agent",
    "agent_role_prompt": "You are a seasoned finance analyst AI assistant. Your primary goal is to compose comprehensive, astute, impartial, and methodically arranged financial reports based on provided data and trends."
}
task: "could reselling sneakers become profitable?"
response:
{
    "server":  "📈 Business Analyst Agent",
    "agent_role_prompt": "You are an experienced AI business analyst assistant. Your main objective is to produce comprehensive, insightful, impartial, and systematically structured business reports based on provided business data, market trends, and strategic analysis."
}
task: "what are the most interesting sites in Tel Aviv?"
response:
{
    "server":  "🌍 Travel Agent",
    "agent_role_prompt": "You are a world-travelled AI tour guide assistant. Your main purpose is to draft engaging, insightful, unbiased, and well-structured travel reports on given locations, including history, attractions, and cultural insights."
}
```

**(L525–529) `generate_summary_prompt`:**

```text
{data}
 Using the above text, summarize it based on the following task or query: "{query}".
 If the query cannot be answered using the text, YOU MUST summarize the text in short.
 Include all factual information such as numbers, stats, quotes, etc if available.
```

**(L540–552) `generate_quick_summary_prompt`:**

```text
Synthesize a comprehensive answer to the following query based ONLY on the provided search results.
Query: "{query}"

Search Results:
{context}

Instructions:
1. Provide a single, continuous narrative summary.
2. Cite your sources using numbers [1], [2], etc., corresponding to the search results.
3. If the results are insufficient to answer the query, state that clearly.
4. Focus on accuracy and relevance.
```

**(L574–593) `generate_subtopics_prompt`:**

```text
Provided the main topic:

{task}

and research data:

{data}

- Construct a list of subtopics which indicate the headers of a report document to be generated on the task.
- These are a possible list of subtopics : {subtopics}.
- There should NOT be any duplicate subtopics.
- Limit the number of subtopics to a maximum of {max_subtopics}
- Finally order the subtopics by their tasks, in a relevant and meaningful order which is presentable in a detailed report

"IMPORTANT!":
- Every subtopic MUST be relevant to the main topic and provided research data ONLY!

{format_instructions}
```

**(L608–670) `generate_subtopic_report_prompt` (verbatim body):**

```text
Context:
"{context}"

Main Topic and Subtopic:
Using the latest information available, construct a detailed report on the subtopic: {current_subtopic} under the main topic: {main_topic}.
You must limit the number of subsections to a maximum of {max_subsections}.

Content Focus:
- The report should focus on answering the question, be well-structured, informative, in-depth, and include facts and numbers if available.
- Use markdown syntax and follow the {report_format.upper()} format.
- When presenting data, comparisons, or structured information, use markdown tables to enhance readability.

IMPORTANT:Content and Sections Uniqueness:
- This part of the instructions is crucial to ensure the content is unique and does not overlap with existing reports.
- Carefully review the existing headers and existing written contents provided below before writing any new subsections.
- Prevent any content that is already covered in the existing written contents.
- Do not use any of the existing headers as the new subsection headers.
- Do not repeat any information already covered in the existing written contents or closely related variations to avoid duplicates.
- If you have nested subsections, ensure they are unique and not covered in the existing written contents.
- Ensure that your content is entirely new and does not overlap with any information already covered in the previous subtopic reports.

"Existing Subtopic Reports":
- Existing subtopic reports and their section headers:

    {existing_headers}

- Existing written contents from previous subtopic reports:

    {relevant_written_contents}

"Structure and Formatting":
- As this sub-report will be part of a larger report, include only the main body divided into suitable subtopics without any introduction or conclusion section.
- You MUST include markdown hyperlinks to relevant source URLs wherever referenced in the report, for example:

    ### Section Header

    This is a sample text ([in-text citation](url)).

- Use H2 for the main subtopic header (##) and H3 for subsections (###).
- Use smaller Markdown headers (e.g., H2 or H3) for content structure, avoiding the largest header (H1) as it will be used for the larger report's heading.
- Organize your content into distinct sections that complement but do not overlap with existing reports.
- When adding similar or identical subsections to your report, you should clearly indicate the differences between and the new content and the existing written content from previous subtopic reports. For example:

    ### New header (similar to existing header)

    While the previous section discussed [topic A], this section will explore [topic B]."

"Date":
Assume the current date is {datetime.now(timezone.utc).strftime('%B %d, %Y')} if required.

"IMPORTANT!":
- You MUST write the report in the following language: {language}.
- The focus MUST be on the main topic! You MUST Leave out any information un-related to it!
- Must NOT have any introduction, conclusion, summary or reference section.
- You MUST use in-text citation references in {report_format.upper()} format and it must be made with markdown hyperlink placed at the end of the sentence or paragraph that references them like this: ([in-text citation](url)).
- You MUST mention the difference between the existing content and the new content in the report if you are adding the similar or same subsections wherever necessary.
- The report should have a minimum length of {total_words} words.
- Use an {tone.value} tone throughout the report.

Do NOT add a conclusion section.
```

**(L679–704) `generate_draft_titles_prompt`:**

```text
"Context":
"{context}"

"Main Topic and Subtopic":
Using the latest information available, construct a draft section title headers for a detailed report on the subtopic: {current_subtopic} under the main topic: {main_topic}.

"Task":
1. Create a list of draft section title headers for the subtopic report.
2. Each header should be concise and relevant to the subtopic.
3. The header shouldn't be too high level, but detailed enough to cover the main aspects of the subtopic.
4. Use markdown syntax for the headers, using H3 (###) as H1 and H2 will be used for the larger report's heading.
5. Ensure the headers cover main aspects of the subtopic.

"Structure and Formatting":
Provide the draft headers in a list format using markdown syntax, for example:

### Header 1
### Header 2
### Header 3

"IMPORTANT!":
- The focus MUST be on the main topic! You MUST Leave out any information un-related to it!
- Must NOT have any introduction, conclusion, summary or reference section.
- Focus solely on creating headers, not content.
```

**(L708–716) `generate_report_introduction`:**

```text
{research_summary}

Using the above latest information, Prepare a detailed report introduction on the topic -- {question}.
- The introduction should be succinct, well-structured, informative with markdown syntax.
- As this introduction will be part of a larger report, do NOT include any other sections, which are generally present in a report.
- The introduction should be preceded by an H1 heading with a suitable topic for the entire report.
- You must use in-text citation references in {report_format.upper()} format and make it with markdown hyperlink placed at the end of the sentence or paragraph that references them like this: ([in-text citation](url)).
Assume that the current date is {datetime.now(timezone.utc).strftime('%B %d, %Y')} if required.
- The output must be in {language} language.
```

**(L732–751) `generate_report_conclusion`:**

```text
    Based on the research report below and research task, please write a concise conclusion that summarizes the main findings and their implications:

    Research task: {query}

    Research Report: {report_content}

    Your conclusion should:
    1. Recap the main points of the research
    2. Highlight the most important findings
    3. Discuss any implications or next steps
    4. Be approximately 2-3 paragraphs long

    If there is no "## Conclusion" section title written at the end of the report, please add it to the top of your conclusion.
    You must use in-text citation references in {report_format.upper()} format and it must be made with markdown hyperlink placed at the end of the sentence or paragraph that references them like this: ([in-text citation](url)).

    IMPORTANT: The entire conclusion MUST be written in {language} language.

    Write the conclusion:
```

### 1.2 `gpt_researcher/actions/agent_creator.py`

**(L116–119) Default-role fallback prompt (used when router JSON cannot be recovered):**

```text
You are an AI critical thinker research assistant. Your sole purpose is to write well written, critically acclaimed, objective and structured reports on given text.
```

### 1.3 `gpt_researcher/skills/deep_research.py` — embedded system/user prompts

**(L270–283) query generation — system + user:**

```text
[system] You are an expert researcher generating search queries. Return valid JSON only. Do not include markdown, code fences, bullets, numbering, or prose.
```

```text
[user] Given the following prompt, generate {num_queries} unique search queries to research the topic thoroughly. For each query, provide a research goal.

Return ONLY a JSON array of objects using this exact schema:
[{"query": "<search query>", "researchGoal": "<research goal>"}]

Prompt: {query}
```

**(L321–338) research plan — system + user:**

```text
[system] You are an expert researcher. Your task is to analyze the original query and search results, then generate targeted questions that explore different aspects and time periods of the topic. Return valid JSON only.
```

```text
[user] Original query: {query}

Current time: {current_time}

Search results:
{search_results}

Based on these results, the original query, and the current time, generate {num_questions} unique questions. Each question should explore a different aspect or time period of the topic, considering recent developments up to {current_time}.

Return ONLY a JSON object using this exact schema:
{"questions": ["<question 1>", "<question 2>"]}
```

**(L357–370) research-results analysis — system + user:**

```text
[system] You are an expert researcher analyzing search results. Return valid JSON only.
```

```text
[user] Given the following research results for the query '{query}', extract key learnings and suggest follow-up questions. For each learning, include a citation to the source URL if available.

Return ONLY a JSON object using this exact schema:
{"learnings": [{"insight": "<insight>", "sourceUrl": "<url or empty string>"}], "followUpQuestions": ["<question 1>", "<question 2>"]}

Research results:
{context}
```

### 1.4 `gpt_researcher/skills/image_generator.py` — embedded prompts

**(L238) system:** `"You are a visualization expert. Return only valid JSON arrays."`

**(L202–232) planning prompt (user):**

```text
Analyze this research context and identify 2-3 concepts that would significantly benefit from professional diagram/infographic illustrations.

RESEARCH QUERY: {query}

RESEARCH CONTEXT:
{truncated_context}

For each visualization opportunity, provide:
1. title: A short descriptive title (e.g., "System Architecture", "Comparison Chart")
2. prompt: A detailed image generation prompt describing exactly what to visualize, including layout and key elements (minimum 30 words)
3. section_hint: Which section of the report this image relates to

Focus on:
- Architecture/system diagrams
- Process flows and workflows
- Comparison charts
- Data visualizations
- Conceptual illustrations

IMPORTANT: Return ONLY a valid JSON array. No markdown, no explanation.

Example output:
[
  {
    "title": "System Architecture Overview",
    "prompt": "A layered architecture diagram showing the frontend application on top, connecting to an API gateway in the middle, which routes to microservices at the bottom. Use clean boxes with connecting arrows, modern tech aesthetic.",
    "section_hint": "Architecture"
  }
]

Return 2-3 visualization concepts as a JSON array:
```

**(L304) analysis system:** `"You are an expert at identifying content that would benefit from visual illustrations."`
**(L389–420) analysis prompt (user):** same JSON `{"suggestions":[{section_number, section_header, image_prompt, reason}]}` contract as §1.1 image-analysis, additionally: *"Do NOT suggest images for introduction or conclusion sections"* and *"Return ONLY the JSON, no additional text."*

### 1.5 `gpt_researcher/utils/tools.py` — tool definitions

**(L230–271) `search_tool` (LangChain `@tool`; runtime schema derived from the signature):**

```python
@tool
def search_tool(query: str) -> str:
    """Search for current events or online information when you need new knowledge that doesn't exist in the current context"""
    # ...returns up to 5 results as Title/Content(≤300 chars)/URL, or error strings
```

**(L274–316) `create_custom_tool` factory:**

```python
def create_custom_tool(
    name: str,
    description: str,
    function: Callable,
    parameter_schema: Optional[Dict] = None
) -> Callable:
    @tool
    def custom_tool(*args, **kwargs) -> str:
        try:
            result = function(*args, **kwargs)
            return str(result) if result is not None else "Tool executed successfully"
        except Exception as e:
            # maps validation/not-found/other errors to fixed strings
    custom_tool.name = name
    custom_tool.description = description
    return custom_tool
```

## Part 2 — Inspection Results

### Stage A-1 — System Prompt (QD-P)

#### Tier determination: **L3 Complex Agent**

Basis (prompt-checklist §3.1, ≥2 criteria): multi-tool collaboration (pluggable retrievers + MCP tool selection/execution, §1.1 L54/L105); complex workflow well over 5 steps (query generation → retrieval → curation → outline → subtopic expansion → synthesis, plus recursive breadth/depth deep research); external web access with source-trust decisions (security-sensitive boundary). Tier stated as L3; the L3 minimum set (34 P0 items) applies.

The inspected surface is a **parameterized prompt library**, not one master system prompt: global constraints that would normally sit in one system prompt are absent, and per-template slots are filled by orchestration code. Verdicts judge the aggregate prompt surface; N/A is used only where the morphology genuinely does not exist.

#### L3 minimum set — 34 P0 items

| ID | V | Evidence (verbatim, short) / basis |
|---|---|---|
| QD-P-1.1.1 Direct Contradiction | PASS | No same-context contradiction found; "DO NOT rewrite … source content" (curate L341) vs "summarize it" (L526) are different task templates, not one context |
| QD-P-1.1.3 Example-Rule Contradiction | PASS | Router examples (L497–514) match the required `server`+`agent_role_prompt` contract; each JSON template's inline example matches its own rule |
| QD-P-1.2.1 Role-Responsibility Mismatch | PASS | Router-emitted roles (finance/business/travel analyst) and the fallback "research assistant … write … reports" (L117–119) match the report-writing responsibility |
| QD-P-1.2.3 Constraint-Responsibility Mismatch | PASS | Citation/grounding constraints bound but do not prohibit the core reporting responsibility |
| QD-P-1.5.1 Responsibilities Support Objective | PASS | Gather → synthesize → cite responsibilities support the research-report objective |
| QD-P-2.2.1 Undeclared Input Source | PASS | Every template names its input slots (`RESEARCH QUERY`, `Information: "{context}"`, `AVAILABLE TOOLS`, `Search Results:`) — source is declared at template level |
| **QD-P-2.3.4 Missing Security/Privacy Filtering** | **FAIL** | No template defines sensitive-data filtering, privacy handling, or security output constraints across the entire library (web-scraped content flows straight into `Information: "{context}"`) |
| **QD-P-2.5.2 Missing Security Boundary Constraints** | **FAIL** | No prohibited-operation / external-system-access boundary anywhere; MCP template (L54–83) authorizes choosing any listed tool with no boundary statement |
| **QD-P-1.3.3 Undefined Boundaries** | **FAIL** | No authorization scope, prohibition scope, or handoff conditions; router (L491–515) classifies any topic with no out-of-scope branch |
| QD-P-1.5.2 Resources Support Workflow | PASS | The only channel that directs the model to use tools (MCP) declares them (`AVAILABLE TOOLS: {tool_names}`); retrieval execution is code-orchestrated, not prompt-directed |
| **QD-P-1.6.1 Critical Decision Word Vagueness** | **FAIL** | "Choose **trusted** sources over less reliable ones" / "if the source **can be trusted**" (L306–307, L477–478) and curate's "**severely** outdated / clearly untrustworthy" (L339) carry the credibility decision with no criteria |
| **QD-P-2.2.2 Unconstrained Input Format** | **FAIL** | `Information: "{context}"` (L294) and `SOURCES LIST TO EVALUATE: {sources}` impose no format/encoding/size limit in the prompt; the 6,000-char / 25,000-word caps live only in Python (image_generator L199, deep_research L18), invisible to the model |
| QD-P-2.2.3 Required/Optional Not Distinguished | PASS | Single user-facing required input (`query`); optional `tone`/`language` default in code and never surface as a model decision — morphology not present, basis recorded |
| **QD-P-2.2.4 Undefined Missing-Input Handling** | **FAIL** | No template defines model-side behavior for an empty query or empty/injected context; only `quick_summary` covers insufficient *results* (L550), not missing required input |
| QD-P-2.3.1 Undefined Output Format | PASS | Downstream-parsed outputs are format-defined: list-of-strings (L257), exact JSON (L69–80, L162–173, L348), markdown/APA reports (L303) |
| QD-P-2.3.2 Incomplete Output Schema | PASS | JSON contracts enumerate fields/types (L70–80, L163–172; deep-research L280/L337/L366–368); curate's "EXACT … as the original sources" is an isomorphic schema reference |
| QD-P-2.4.2 Undeclared Resources/Tools | PASS | The model is directed to call tools only on the MCP path, where tools are declared; report/curate paths consume pre-fetched context and name no tools |
| **QD-P-2.4.3 Missing Tool Invocation Specification** | **FAIL** | MCP research template says "Use the available tools strategically" (L118) but defines no parameter-passing spec, no invocation sequence, and only an open-ended failure line ("try alternative approaches", L112) |
| **QD-P-1.1.2 Priority Conflict** | **FAIL** | Simultaneous MUSTs conflict in sparse-information scenarios with no arbitration: "strive to write … as long as you can … at least {total_words} words" (L298–299) vs "focus … Leave out any information un-related" (L662) and "Do NOT cite sources that do not appear in the provided information" (L310) |
| QD-P-1.6.2 Rules Depending on Model Internal State | PASS | No "when you are uncertain / judge intent to be malicious / high confidence" style rules; "your own … opinion" (L302) is an output stance, not an internal-state key |
| **QD-P-1.6.3 Soft Rule Interweaving Without Arbitration** | **FAIL** | "determine your own concrete and valid opinion" (L302) interweaves with role prompts demanding "**impartial**" / "unbiased"/"objective" reports (L501, L507, L513; fallback L118); no arbitration between stance and neutrality, nor between "comprehensive" and "focus" |
| QD-P-1.6.6 Implicit Assumption Dependency | PASS | Risky assumptions are slot-filled by code; the date is explicitly injected ("Assume the current date is …") and "facts and numbers **if available**" provides an explicit fallback |
| QD-P-1.6.7 Non-Monotonic Reasoning Defects | N/A | Morphology absent: each run is a fresh single research task (deep research spawns new researcher instances per branch); no prompt maintains cross-turn conclusions that new information could invalidate |
| **QD-P-2.3.3 Missing Output Stability Assurance** | **FAIL** | "Return ONLY JSON/list" statements constrain format but no template defines a stability/consistency self-check mechanism; JSON tolerance is implemented only in code (`json_repair`) |
| QD-P-2.4.1 Incomplete Workflow Steps | PASS | Each self-contained template's steps are complete (e.g., MCP research 5 numbered steps); no template claims an end-to-end workflow it then leaves gaps in |
| QD-P-2.5.1 Missing Termination Constraints | PASS | All enumerative outputs carry parameterized caps: `Write {max_iterations} search queries`, "select EXACTLY {max_tools}", "up to {max_results}", "maximum of {max_subtopics}", "2-3 concepts" |
| **QD-P-2.5.3 Missing Permission Control Boundaries** | **FAIL** | MCP lets the model self-select tools from an externally supplied set (L61–67) with no permission scope, no elevation conditions, and no escalation handling |
| **QD-P-2.5.4 Undefined Constraint Priority** | **FAIL** | Beyond the concrete conflicts of 1.1.2, no arbitration rules are given for the competing SHOULD-style objectives (length vs relevance; opinion vs impartiality; "as long as you can" vs succinct intro/conclusion) |
| **QD-P-2.5.5 Missing Resource Invocation Frequency Limits** | **FAIL** | Tool **execution** frequency is unbounded: "Call multiple tools if needed" (L111) with only the *selection* count capped (L61); no limit on retries/calls against search or MCP backends in any prompt |
| **QD-P-2.6.1 Runtime Exceptions Not Covered** | **FAIL** | Tool/backend failure handling in prompts is one unbounded line, "If a tool call fails … try alternative approaches" (L112); timeout/rate-limit/permission error classes (handled in `tools.py` code L165–172) have no prompt-level behavior |
| **QD-P-2.6.2 Missing Degradation/Recovery Strategy** | **FAIL** | No prompt-declared degradation/recovery behavior; default-agent fallback and provider fallback exist only in Python (agent_creator L115, tools.py L213–227) |
| **QD-P-2.7.1 Positive Example Representativeness** | **FAIL** | Router gives three isomorphic examples (L497–514), all "X-Agent + one polished role sentence"; no coverage of boundary topics, unclassifiable queries, or refusal/hand-off; image prompts give a single idealized example (L223–230) |
| **QD-P-2.7.2 Insufficient Counter-Example Coverage** | **FAIL** | No counter-examples appear anywhere in the 19 templates (fact directly matching the definition "No counter-examples provided"), most notably none for router misclassification or invalid JSON |
| **QD-P-2.7.3 Missing Boundary-Case Examples** | **FAIL** | No examples for empty query, over-long/garbage context, zero search results, or contradictory sources |

**Stage A-1 totals: 18 P0 FAIL · 15 PASS · 1 N/A (of 34 minimum P0 items).** P0 items, failed once each: 1.1.2, 1.3.3, 1.6.1, 1.6.3, 2.2.2, 2.2.4, 2.3.3, 2.3.4, 2.4.3, 2.5.2, 2.5.3, 2.5.4, 2.5.5, 2.6.1, 2.6.2, 2.7.1, 2.7.2, 2.7.3.

### Stage A-2 — Tool Schema (QD-T)

#### Tier determination: `search_tool` = **L1 Low Risk**

Basis (tool-checklist §3.1): read-only web query, no state change, repeatable, no side effects; failure consequence is query failure only. The factory (`create_custom_tool`) is not a concrete Tool Schema — evaluated as an observation below, not item-by-item.

#### L1 minimum set — 7 items (mechanical verdicts against the static artifact; runtime schema is LangChain-generated)

| ID | V | Level | Evidence / basis |
|---|---|---|---|
| QD-T-1.1 Base Field Missing | PASS | P0 | `name` = `search_tool`, description = docstring (L242), inputSchema generated from `query: str` — all three base fields are deterministically present |
| QD-T-1.2 Required Field Inconsistency | PASS | P0 | Sole parameter `query` has no default → required; single-property schema, no mismatch possible |
| QD-T-1.3 Invalid Enum Constraints | N/A | — | No enum-valued parameter exists (determination basis recorded) |
| QD-T-1.4 Uncontrolled additionalProperties | **FAIL** | P1 | The repository contains **no static inputSchema text** declaring `additionalProperties`; the generated object schema's behavior is framework-version-dependent and unverifiable from the artifact. The explicit declaration the rule requires is absent |
| QD-T-2.1 String Without Length Constraint | **FAIL** | P2 | `def search_tool(query: str)` (L241) with docstring only — no `maxLength`/`minLength` on the free-form query string |
| QD-T-2.3 Number Without Boundary | N/A | — | No number-type parameter |
| QD-T-4.1 Insufficient Description Quality | PASS | P2 | Docstring states both purpose and trigger condition ("…when you need new knowledge that doesn't exist in the current context") — adequate for L1 |

**Stage A-2 totals: 0 P0 · 1 P1 (QD-T-1.4) · 1 P2 (QD-T-2.1) · 3 PASS · 2 N/A.**

Factory observation (no rule ID invented): `create_custom_tool(... parameter_schema: Optional[Dict] = None)` wraps `*args, **kwargs` (L292–293), so the mechanism can emit tools with no static parameter contract at all — a raw-passthrough-enabling construction (cf. QD-T-3.2's morphology at higher tiers) that only becomes a concrete finding once such a tool is instantiated and tiered. Not itemized because a factory is not a Tool Schema instance.

#### Mode decision

Prompt Stage A-1 carries unfixed P0 findings → **Mode 2 (P0 blocking)** per SKILL.md §5 and cross-checklist §5.2.1 ("Single-artifact inspection has passed, and no undisposed P0 defects remain" is the entry condition). Downstream stages are not executed.

### Stage B — Cross-artifact inspection (QD-PS / QD-PT / QD-ST)

Not executed (status board). Applicability map for the re-run: **QD-PT applicable** — prompts direct tool use (MCP templates) against dynamically generated tool schemas; QD-PT-2.1/2.2/2.4 are the candidate P0 items. **QD-PS and QD-ST N/A** — no Skill-definition artifact exists (the `skills/*.py` modules are orchestration code); recorded as determination basis, not FAIL.

### Stage C — Gate-0

Not executed (status board). At re-run, G0-1 is known-unsatisfied (18 prompt P0); G0-3 (locatable responsibility-boundary statements) and G0-4 (per-field Tool Schema completeness) also have open evidence (no boundary statements; no static schema text), but Gate-0 does not produce numbers and is not itself a FAIL.

### Stage D — Permission proportionality (QD-PM, Quick Mode)

Not executed (status board). Two independent reasons: (1) Mode 2 — upstream P0 unfixed; (2) Permission quick mode requires the full artifact set (Prompt + Skill + all Tool Schemas), and no Skill artifact exists → "incomplete artifact set".

### Stage E — Impact outlook

Not executed in this blocked run (Mode 2 stops after Stage A). Candidate AS-*/FM-* cards for the 18 prompt P0 + 2 tool findings will be produced, in candidate-only language with strength labeled separately from severity, on the unblocked re-run — or as an explicitly advisory-only pass on request. Risk Explicit/Implicit subsets were not run in either case.

### Status board

```text
Stage A (Single-artifact):  Executed — Prompt QD-P (L3, 34-item set: 18 P0 FAIL, 15 PASS, 1 N/A) and Tool QD-T (search_tool L1: 0 P0, 1 P1, 1 P2, 3 PASS, 2 N/A); no Skill artifact exists
Stage B (Cross):            Not Executed — not executed because upstream P0 findings are unfixed (QD-PT applicable at re-run; QD-PS/QD-ST N/A — no Skill artifact)
Stage C (Gate-0):           Not Executed — not executed because upstream P0 findings are unfixed
Stage D (Permission QD-PM): Not Executed — not executed because upstream P0 findings are unfixed; additionally "incomplete artifact set" (no Skill artifact)
Stage E (Impact outlook):   Not Executed — not executed because upstream P0 findings are unfixed
```

**Inspector scope reminder:** detect-only — no fixed prompts/schemas were generated; these static findings say nothing about Risk (Explicit/Implicit) or Quality outcomes, and a future Permission quick-mode pass validates declared proportionality only — not IAM/PEP/runtime enforcement.
