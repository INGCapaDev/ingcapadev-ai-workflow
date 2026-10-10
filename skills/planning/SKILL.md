---
name: planning
description: "Planning for Capa v3: gather context, resolve material design choices, and propose evidence-based work units before approval; /reslice compares alternative groupings read-only."
---

# Planning

Turn a request into an agreed design and a proportionate work breakdown. Planning-only input authorizes read-only investigation and a conversational proposal. Obtain explicit final plan approval before persisting `PLAN.md`. Implementation requires execution authorization; a planning request or permission to write the plan supplies none. Capa invokes this source for planning and owns subsequent execution.

For `/reslice` or an explicit request to compare an existing proposal's or plan's grouping, follow [read-only regrouping](references/reslice.md) instead of the plan-persistence path.

## 1. Establish facts and constraints

Inspect enough of the repository to explain the requested behavior, its current owner, relevant contracts, reusable patterns, examples, and existing checks. Follow applicable project instructions and established decisions. Small, understood work needs only small context and a small proposal.

Separate **facts** (verify from evidence), **established decisions** (follow unless contradicted), and **material choices** (human decision). Load relevant task-critical references only, not the entire quality/convention corpus. Broad quality judgment belongs mainly to reviewers. If evidence contradicts the proposed approach, explain it and suggest a viable alternative.

**Done when:** current behavior and constraints are evidenced, and remaining uncertainty is classified as investigable facts or material choices.

## 2. Resolve the design frontier

Use a **design tree** to track material choices and their prerequisites. The **frontier** contains only choices whose prerequisites are settled; dependent questions wait. Keep the tree conversational unless its complexity warrants a compact visible sketch.

Before asking a question, test it:

1. Can evidence answer it? Investigate the fact.
2. Is there an established project answer? Follow that decision.
3. Would different reasonable answers materially change the solution? State the evidence, viable alternatives, consequential tradeoffs, and your recommendation, then pause for the human's answer.
4. Otherwise, use engineering judgment within the agreed design.

Discuss meaningful APIs, including internal caller-facing contracts, domain models, ownership, and structural choices before coding. Discussion depth follows consequence and reversibility; include only reachable scenarios supported by the request or evidence. Routine naming, local helper shape, extraction, internal organization, and test-file layout remain engineering judgment unless they alter a consequential boundary.

A material unanswered choice stays visible and pauses planning; it is not an assumption to bury in tasks.

**Done when:** one coherent design is agreed, with no material unanswered choice hidden as a task assumption.

## 3. State the agreed design

Summarize the intended behavior, in/out scope, overall acceptance, material choices and their rationale, important interactions, contracts, and compatibility requirements. Explain how the design uses relevant existing owners and patterns. Reference authoritative context instead of copying guidance bodies. If synthesis exposes another material choice, return to the frontier.

**Done when:** the human can see how the resolved choices fit together and what the proposed work will and will not deliver.

## 4. Design tracer-bullet slices

Plan **tracer bullets**: small developer tasks with demonstrable or verifiable results, grouped like sensible work-unit commits. A task may advance a feature without finishing it. Favor one clear purpose and logically coupled supporting changes over feature-sized bundles or file-by-file tasks.

Test **outcome separability** before grouping work. If capabilities can each deliver a useful, independently verifiable result while preserving supported behavior, prefer separate slices when that reduces review burden. Sharing a feature or eventual wiring is not sufficient reason to combine them. Split by demonstrable outcomes, not mechanically by folders, technical layers, or responsibilities.

Use roughly 400 authored additions plus deletions as a review-sizing signal, not a target or cap. Assess **review breadth** alongside authored size: several independently meaningful outcomes or materially different acceptance surfaces are signals to reconsider grouping. When combining outcomes is necessary, explain the concrete dependency or invalid intermediate state.

For a coherent slice too broad for natural human review, propose bounded subtasks and optional
intermediate diff previews. Previews invite feedback on the current slice, not new statuses or
separate acceptance gates. If an intermediate outcome is independently valid and warrants human
acceptance, prefer a separate slice instead.

Record only real dependencies: a preceding contract, capability, or valid-state requirement that the task needs. Show what remains for later tasks without manufacturing setup, cleanup, or verification phases for ordinary supporting work. Commit-sized grouping does not authorize a commit.

Give each verification activity a purpose tied to an acceptance scenario or concrete evidence gap; implementation/diff inspection and flow tracing are valid evidence paths, not automatically commands. Prefer relevant existing checks and observable behavior; reuse valid unchanged passing evidence. New tests, TDD, and coverage requirements come only from the human or applicable project instructions. Follow the AGENTS test-recommendation boundary for high-risk business rules. Follow the orchestrator's verification-effort and review-approval gates: identify any consequential concern worth recommending for review, not mandatory reviewers for every slice. Execution reassesses the actual candidate. Add consequential edit boundaries or concrete recovery options when the work's ownership or risk calls for them, not as default filler.

Compare a small number of genuinely viable decompositions only when boundaries are materially debatable; a simple coherent task needs no alternatives table. Present a concise grouping rationale: why supporting changes belong together, why the boundaries help, and what remains valid at each checkpoint.

**Done when:** every slice has a clear outcome, coherent supporting changes, a valid checkpoint, and verifiable acceptance, with dependencies and material risks accounted for.

## 5. Obtain final approval, then persist

Present the agreed design and proposed tasks conversationally so the human can correct misunderstandings. Ask for explicit final approval of the plan and stop. Answering a design question is not final plan approval.

When preparing an approved plan for persistence, read [the plan format](references/plan-format.md) for its five-section structure, per-slice evidence contract, progress meanings, and scoped-folder/companion rules. Preserve useful identity, locating context, and verbatim requirements; companion context must not become a competing scope or progress mirror.

After final approval, the authorized plan writer persists the agreed change in one `PLAN.md`, with slices initially `pending` and one concrete next action. End planning by returning the approved plan's location and next action to the execution owner. Execution authorization and later review, acceptance, delivery, and memory orchestration remain outside this skill.
