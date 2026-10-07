---
name: planning
description: "Planning for Capa v3: gather relevant context, resolve material design choices with the human, and propose small verifiable work units before plan approval."
---

# Planning

Turn a request into an agreed design and a proportionate work breakdown. This guidance
works for one capable agent; execution, independent review, delivery, and memory stay with
their respective owners. Capa invokes this source for planning and owns subsequent execution.

Planning-only input authorizes read-only investigation and a conversational proposal.
Obtain explicit final plan approval before persisting `PLAN.md`. Implementation requires
execution authorization; a planning request or permission to write the plan supplies none.

## 1. Gather context toward decisions

Inspect enough of the repository to explain the requested behavior, its current owner,
relevant contracts, reusable patterns, examples, and existing checks. Follow applicable
project instructions and established decisions. Small, understood work needs only small
context and a small proposal, not an exploratory pipeline.

Separate what you learn into three categories:

- **Facts:** investigate in source, configuration, documentation, or observed behavior.
- **Established decisions:** follow the project's answer unless evidence contradicts it.
- **Material choices:** discuss reasonable alternatives that change behavior, domain
  meaning, scope, compatibility, UX, data, or architecture.

Consult authoritative references when their branch matters. Keep mandatory constraints
and task-critical design guidance in view; load detailed conventions for a material design
question rather than gathering the full language/framework corpus. Broad quality judgment
belongs mainly to reviewers. If evidence contradicts the request's assumed approach,
explain the conflict and recommend a correct or narrower alternative.

Context gathering is sufficient when the current behavior and constraints are evidenced
and the remaining uncertainty is identifiable as facts to investigate or choices to resolve.

## 2. Resolve the design frontier

Use a **design tree** to track material choices and their prerequisites. The **frontier**
contains only choices whose prerequisites are settled; dependent questions wait. Keep the
tree conversational unless its complexity warrants a compact visible sketch.

Before asking a question, test it:

1. Can evidence answer it? Investigate the fact.
2. Is there an established project answer? Follow that decision.
3. Would different reasonable answers materially change the solution? Ask the human.
4. Otherwise, use engineering judgment within the agreed design.

For each frontier choice, state the evidence, viable alternatives, consequential tradeoffs,
and your recommendation, then pause for the human's answer. Discuss meaningful APIs,
including internal caller-facing contracts, domain models, ownership, and structural choices
before coding. Discussion depth follows consequence and reversibility; include only
reachable scenarios supported by the request or evidence.

Routine naming, local helper shape, straightforward extraction, internal organization, and
test-file layout normally remain engineering judgment. When such a detail changes a
material contract or hard-to-reverse boundary, treat that consequence as the choice.

Proceed when no unresolved material decision prevents one coherent design and a
reviewable breakdown. A material unanswered choice stays visible and pauses planning;
it is not an assumption to bury in tasks or a placeholder to settle during implementation.

## 3. Synthesize the agreed design

Summarize the intended behavior, in/out scope, overall acceptance, material choices and
their rationale, important interactions, contracts, and compatibility requirements. Explain
how the design uses relevant existing owners and patterns. Keep this synthesis focused
on the change; reference authoritative context instead of copying guidance bodies.

The synthesis is sufficient when the human can see how the resolved choices fit together
and what the proposed work will and will not deliver. If it reveals another material choice,
return to that frontier before final approval.

## 4. Break down small work units

Plan **tracer bullets**: small developer tasks with demonstrable or verifiable results,
grouped like sensible work-unit commits. A task may advance a feature without finishing
it. Favor one clear purpose and logically coupled supporting changes over feature-sized
bundles or file-by-file tasks.

For each slice, describe the outcome, necessary supporting changes, acceptance, and
how to check the result. Keep required consumers, types, documentation, and any requested
or project-required tests with the outcome. Follow the layers the task actually touches;
every task need not span UI, API, and storage. End at a valid checkpoint where the changes
work and existing supported behavior remains intact.

Use roughly 400 authored additions plus deletions as a review-sizing signal, not a target
or cap. Many tasks should be smaller. Seek meaningful smaller checkpoints if the code
would be difficult to understand in one focused review; explain a necessary larger coupled
boundary before settling the breakdown. Preserve coherent structure and supporting work.

Record only real dependencies: a preceding contract, capability, or valid-state requirement
that the task needs. Show what remains for later tasks without manufacturing setup,
cleanup, or verification phases for ordinary supporting work. Commit-sized grouping does
not authorize a commit.

Give each check a purpose tied to an acceptance scenario or concrete evidence gap.
Prefer relevant existing checks and observable behavior; reuse valid unchanged passing
evidence. New tests, TDD, and coverage requirements come only from the human or applicable
project instructions. Add consequential edit boundaries or concrete recovery options when
the work's ownership or risk calls for them, not as default filler.

The breakdown is sufficient when each slice has a clear outcome, coherent supporting
changes, a valid checkpoint, and verifiable acceptance, with dependencies and material
risks accounted for.

## 5. Obtain final approval, then persist

Present the agreed design and proposed tasks conversationally so the human can correct
misunderstandings. Ask for explicit final approval of the plan and stop. Settled choices
need no per-slice approval ritual, but answering a design question is not final plan approval.

When preparing an approved plan for persistence, read
[the plan format](references/plan-format.md) for its five-section structure, per-slice
evidence contract, and progress meanings. Use the project's plan location convention;
if none exists, agree a discoverable location with the human. Preserve useful identity
and locating context without creating a second spec, ticket, handoff, or progress mirror.

After final approval, the authorized plan writer persists the agreed change in one
`PLAN.md`, with slices initially `pending` and one concrete next action. End planning by
returning the approved plan's location and next action to the execution owner. Execution
authorization and later review, acceptance, delivery, and memory orchestration remain
outside this skill.
