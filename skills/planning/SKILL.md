---
name: planning
description: "Planning for Capa v3: gather context, resolve material design choices, and propose evidence-based work units before approval; /reslice compares alternative groupings read-only."
---

# Planning

Turn a request into an agreed design and a proportionate work breakdown. This guidance
works for one capable agent; execution, independent review, delivery, and memory stay with
their respective owners. Capa invokes this source for planning and owns subsequent execution.

Planning-only input authorizes read-only investigation and a conversational proposal.
Obtain explicit final plan approval before persisting `PLAN.md`. Implementation requires
execution authorization; a planning request or permission to write the plan supplies none.

For `/reslice` or an explicit request to compare an existing proposal's or plan's grouping,
follow [read-only regrouping](references/reslice.md) instead of the plan-persistence path.

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

Before presenting a nontrivial proposal, evaluate grouping against actual code and
contracts: independently useful outcomes, acceptance surfaces, integration paths, shared
prerequisites, valid intermediate states, review breadth, and human handoff burden.
Requirement headings alone do not establish task boundaries. When boundaries are materially
debatable, compare a small number of genuinely viable decompositions before recommending
one; a simple coherent task needs no alternatives or comparison table.

Test **outcome separability** before grouping work. If capabilities can each deliver a
useful, independently verifiable result while preserving supported behavior, prefer separate
slices when that reduces review burden. Sharing a feature or eventual wiring is not
sufficient reason to combine them.

Distinguish implementation prerequisites from final activation. Producer/consumer wiring
may belong to a later integration slice when earlier capabilities remain coherent and
verifiable without placeholders or premature production activation. Split by demonstrable
outcomes, not mechanically by folders, technical layers, or responsibilities.

For each slice, describe the outcome, necessary supporting changes, acceptance, and
how to check the result. Keep the consumers, types, documentation, and any requested or
project-required tests needed for that checkpoint with the outcome. Every task need not
span UI, API, and storage. End at a valid checkpoint where the changes work and existing
supported behavior remains intact.

Use roughly 400 authored additions plus deletions as a review-sizing signal, not a target
or cap. Many tasks should be smaller. Assess **review breadth** alongside authored size:
several independently meaningful outcomes or materially different acceptance surfaces are
signals to reconsider grouping, even when the diff is small. Seek meaningful smaller
checkpoints if the code would be difficult to understand in one focused review. When
combining outcomes is necessary, explain the concrete dependency or invalid intermediate
state, not merely that the complete feature needs all the pieces. Preserve coherent
structure and supporting work.

Record only real dependencies: a preceding contract, capability, or valid-state requirement
that the task needs. Show what remains for later tasks without manufacturing setup,
cleanup, or verification phases for ordinary supporting work. Commit-sized grouping does
not authorize a commit.

Give each check a purpose tied to an acceptance scenario or concrete evidence gap.
Prefer relevant existing checks and observable behavior; reuse valid unchanged passing
evidence. New tests, TDD, and coverage requirements come only from the human or applicable
project instructions. Follow the AGENTS test-recommendation boundary for high-risk business
rules. Identify consequential independent-review needs, not mandatory reviewers for every
slice; execution reassesses the actual candidate. Add consequential edit boundaries or concrete
recovery options when the work's ownership or risk calls for them, not as default filler.

The breakdown is sufficient when each slice has a clear outcome, coherent supporting
changes, a valid checkpoint, and verifiable acceptance, with dependencies and material
risks accounted for.

Present a concise grouping rationale with the proposed tasks: why supporting changes belong
together, why the boundaries help, what remains valid at each checkpoint, and which
dependencies are real. Explain the recommendation, not private deliberation or a second
plan artifact. Favor the clearest coherent checkpoints, not a higher or lower task count.

## 5. Obtain final approval, then persist

Present the agreed design and proposed tasks conversationally so the human can correct
misunderstandings. Ask for explicit final approval of the plan and stop. Settled choices
need no per-slice approval ritual, but answering a design question is not final plan approval.

When preparing an approved plan for persistence, read
[the plan format](references/plan-format.md) for its five-section structure, per-slice
evidence contract, and progress meanings. Use the project's plan location convention;
if none exists, agree a discoverable location with the human. Preserve useful identity,
locating context, and the format's verbatim-requirement provenance without creating a second
spec, ticket, handoff, or progress mirror.

After final approval, the authorized plan writer persists the agreed change in one
`PLAN.md`, with slices initially `pending` and one concrete next action. End planning by
returning the approved plan's location and next action to the execution owner. Execution
authorization and later review, acceptance, delivery, and memory orchestration remain
outside this skill.
