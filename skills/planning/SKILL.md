---
name: planning
description: "Planning for Capa v3: gather context, resolve material design choices, and propose evidence-based work units before approval; /reslice compares alternative groupings read-only."
---

# Planning

Turn a request into an agreed design and a proportionate work breakdown. Planning input
authorizes read-only investigation and a proposal; persisting `PLAN.md` needs explicit final
approval, and implementation needs separate execution authorization. Capa invokes this source and
owns execution.

For `/reslice` or an explicit comparison of an existing proposal's grouping, follow
[read-only regrouping](references/reslice.md) instead of the persistence path.

## 1. Establish facts and constraints

Inspect enough of the repository to explain the requested behavior, its owner, contracts,
reusable patterns, examples, and checks. Follow project instructions and established decisions.
Small, understood work needs small context and a small proposal.

Before proposing custom integration, inspect installed or native capabilities. If native support
needs a version change, compare migration cost with custom maintenance and resolve the choice
with the human; neither upgrade nor custom layer is the default.

Separate **facts** (verify from evidence), **established decisions** (follow unless
contradicted), and **material choices** (human decision). Load only task-critical references;
broad quality judgment belongs to reviewers. If evidence contradicts the approach, explain it
and suggest an alternative.

**Done when:** current behavior and constraints are evidenced, and remaining uncertainty is
classified as investigable facts or material choices.

## 2. Resolve the design frontier

Use a **design tree** for material choices and their prerequisites. The **frontier** holds only
choices whose prerequisites are settled; dependent questions wait. Keep the tree conversational
unless complexity warrants a compact sketch.

Before asking, test the question:

1. Can evidence answer it? Investigate.
2. Is there an established project answer? Follow it.
3. Would different reasonable answers materially change the solution? State evidence,
   alternatives, tradeoffs, and your recommendation, then pause for the human.
4. Otherwise use engineering judgment within the agreed design.

Discuss meaningful APIs, including internal caller-facing contracts, domain models, ownership,
and structure before coding. Depth follows consequence and reversibility; include only reachable
scenarios supported by the request or evidence. Routine naming, helper shape, extraction,
organization, and test layout stay engineering judgment unless they alter a consequential
boundary.

A material unanswered choice stays visible and pauses planning; it is not an assumption buried
in tasks.

**Done when:** one coherent design is agreed, with no material unanswered choice hidden as a
task assumption.

## 3. State the agreed design

Summarize intended behavior, scope, overall acceptance, material choices and rationale,
interactions, contracts, and compatibility. Explain how the design uses existing owners and
patterns, referencing authoritative context instead of copying it. If synthesis exposes another
material choice, return to the frontier.

**Done when:** the human can see how the choices fit together and what the work will and will not
deliver.

## 4. Design tracer-bullet slices

Plan **tracer bullets**: small tasks with demonstrable or verifiable results, grouped like
work-unit commits. A task may advance a feature without finishing it. Favor one clear purpose and
logically coupled supporting changes over feature-sized bundles or file-by-file tasks.

Test **outcome separability** before grouping. If capabilities can each deliver a useful,
independently verifiable result while preserving supported behavior, prefer separate slices when
that reduces review burden; shared features or eventual wiring do not justify combining them.
Split by demonstrable outcomes, not folders, layers, or responsibilities.

Use roughly 400 authored additions plus deletions as a review-sizing signal, not a target or cap.
Assess **review breadth** alongside size: several independent outcomes or materially different
acceptance surfaces suggest reconsidering the grouping. When combining is necessary, explain the
concrete dependency or invalid intermediate state.

For a slice too broad for natural review, propose bounded subtasks and optional intermediate diff
previews. Previews invite feedback, not new statuses or acceptance gates. If an intermediate
outcome is independently valid and warrants acceptance, prefer a separate slice.

Record only real dependencies: a preceding contract, capability, or valid-state requirement.
Show what remains for later tasks without manufacturing setup, cleanup, or verification phases.
Commit-sized grouping does not authorize a commit.

Give each verification activity a purpose tied to an acceptance scenario or evidence gap;
inspection and flow tracing are valid evidence paths, not automatically commands. Prefer existing
checks and observable behavior, and reuse valid unchanged evidence. New tests, TDD, and coverage
come only from the human or project instructions; follow the AGENTS boundary for high-risk rules
and the orchestrator's review gate. Add edit boundaries or recovery options only when ownership or
risk calls for them.

Compare genuinely viable decompositions only when boundaries are materially debatable; a simple
coherent task needs no alternatives table. Present a concise rationale: why supporting changes
belong together, why the boundaries help, and what remains valid at each checkpoint.

**Done when:** every slice has a clear outcome, coherent supporting changes, a valid checkpoint,
and verifiable acceptance, with dependencies and material risks accounted for.

## 5. Obtain final approval, then persist

Present the design and proposed tasks conversationally so the human can correct
misunderstandings. Ask for explicit final approval and stop; answering a design question is not
approval.

When preparing an approved plan, read [the plan format](references/plan-format.md) for its
structure, evidence contract, progress meanings, and scoped-folder rules. Preserve identity,
locating context, and verbatim requirements; companions must not become competing scope or a
progress mirror.

After approval, the authorized writer persists one `PLAN.md`, with slices `pending` and one next
action, then returns its location and next action to the execution owner. Execution and later
review, acceptance, delivery, and memory orchestration remain outside this skill.
