---
name: improve-ai
description: "Use for /improve-ai or explicit requests to improve the AI workflow or assistant behavior, or learn from session feedback and errors. Provides an evidence-backed, read-only retrospective before authorized changes."
---

# Improve AI Retrospective

Both `/improve-ai` and equivalent explicit natural-language requests reach this one lazy,
model-invoked retrospective owned by Capa. Inspect available session evidence by default;
use supplied focus or examples when present.

## Evidence boundary

Use available conversation context, explicit user input, relevant accepted durable knowledge,
and read-only repository corroboration. Distinguish observations from interpretation and
uncertainty. Missing conversation, response, tool-error history, or telemetry remains missing;
repository facts can corroborate a problem but cannot reconstruct an unseen event.

Inspect facts before asking questions. Work directly unless distributed corroboration is useful;
then use at most one fresh existing `sub-explore` per bounded assignment, read-only and returning
attributable evidence. Use existing capabilities without adding an actor or telemetry path.

## Find the owner and smallest useful correction

Consider feedback, failures, corrective rework, and successful reusable patterns where evidence
supports a useful lesson. Group repeated symptoms by likely root cause and owning authority,
preserving their evidence. Determine whether guidance is missing, unclear, undiscoverable, or
simply unfollowed before proposing another rule.

- An ordinary implementation bug belongs in code and appropriate verification.
- A reliably detectable mechanical violation belongs in existing lint, types, tests, or a
  focused deterministic check when suitable.
- A genuine missing design convention belongs in the owning quality or applicable convention
  guidance; undiscoverable knowledge may need a navigation pointer or clearer documentation.
- Silent meaningful API choices belong in planning/design interaction; repeated workflow or
  tool friction belongs in the owning workflow, prompt, configuration, or tool.
- An isolated model mistake with adequate guidance may need only correction of the immediate
  result. Adequate existing guidance, an already-fixed issue, or insufficient evidence can
  justify no system change.

Prefer precise corrections, clearer loading, or removal of unnecessary machinery over more
policy. Keep one authoritative owner rather than copying guidance across commands and prompts.
Judge benefit by useful results, correction churn, latency, and human review burden, not prompt
size or agent-call counts alone.

Keep project-specific changes project-local. Propose shared guidance only with supporting
cross-project evidence or explicit direction for that scope; a single bad generation alone
does not justify global promotion. Evidence supports a proposal, not permission to edit shared
sources. Prepare work for the current repository unless the human deliberately authorizes
another owner or destination.

## Present useful proposals

Report inline and proportionally: for worthwhile candidates, give the observation/evidence,
likely cause and uncertainty, owner and smallest change, expected benefit, and important tradeoff
or validation implication. Prioritize practical impact. Summarize rejected, already-fixed, or
unsupported ideas only when useful to the decision; no mandatory taxonomy or tracker is needed.
A clear no-change outcome is valid when nothing warrants an improvement.

Ask only unresolved material questions about evidence, behavior, ownership, scope, or validation,
then stop for the answer. Discovery ends with useful proposals or a justified no-change outcome
and any material evidence gaps made clear.

## Authorization and normal routing

Discovery is read-only: it never changes code, prompts, skills, plans, commits, or Engram.
Human interest or candidate selection alone does not authorize mutation. Obtain both selection
and explicit implementation authorization for the intended scope; one clear instruction may
provide both. If authorization is absent, stop at the proposals or selected candidate.

After selection and authorization, return to normal Capa routing:

- Small understood corrections proceed directly with focused validation and reporting.
- Substantial changes or unresolved meaningful design invoke the currently installed
  `engineered-ai-dev` planning workflow and its approval gates before persistence or implementation.

An improvement does not automatically need a persisted plan. Capa retains classification, human
interaction, plan state, and accepted durable knowledge ownership under the normal workflow.
Implementation permission does not authorize commits, delivery, or material scope expansion.
