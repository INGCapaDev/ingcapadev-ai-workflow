# Improve AI Session Fixture

This representative fixture contains only evidence that is currently available to the review.

## Evidence boundary

- Available conversation context: the user corrected an over-broad project-wide recommendation.
- Explicit user input: improve the evidence threshold and keep project-specific guidance local.
- Accepted Engram knowledge: an accepted reusable pattern says to ask before changing shared policy.
- Read-only repository corroboration: the project has a local convention and the Capa orchestrator owns
  plan and Engram writes.
- Missing provenance/history: no complete transcript, assistant-response archive, or tool-error stream
  is available, so the review must not reconstruct any of them.

## Signal classes

- user correction/feedback: the recommendation was too broad;
- error/failed action: a validation action failed after an unsupported assumption;
- unexpected generation: the assistant produced a global rule from one local example;
- successful corrective rework/fix: the follow-up narrowed the rule and validation passed;
- preference: the user prefers focused questions and project-local changes by default;
- reusable pattern: evidence-backed promotion needs corroboration and explicit approval.

## Normalized findings

1. Root invariant `preserve evidence before promotion`, owned by the Capa workflow, combines the
   repeated symptom "one local example became global policy" from the correction and unexpected
   generation. Both observations remain attached. Disposition: selected.
2. Root invariant `keep domain guidance local`, owned by the project conventions, has repository
   corroboration and an explicit user direction for global promotion only when intrinsic. Disposition:
   selected.
3. Root invariant `change the existing validator immediately`, owned by an unrelated maintenance
   concern, has no current failure evidence. Disposition: rejected, insufficient evidence.
4. Root invariant `ask before shared-policy changes`, owned by accepted Engram knowledge, is already
   fixed by the current workflow. Disposition: already fixed.
5. No-change outcome: do not promote the unsupported global rule without independent recurrence or
   intrinsic cross-project ownership.

The report expands selected or materially uncertain findings. It summarizes rejected, already-fixed,
insufficient-evidence, and low-impact findings unless their details affect the human decision.

## Scope, promotion, and plan ownership

- Project-local ownership applies to project domain, architecture, and conventions.
- Explicit promotion is supported only when the user directs it; independent recurrence promotion
  requires separate corroborated occurrences; intrinsic promotion applies to generic reusable patterns,
  so intrinsic cross-project promotion applies only to reusable workflow behavior,
  AI agent/subagent behavior, project-agnostic skills, and ecosystem conventions or quality rules.
- Selected changes stay in the current repository. Project/global classification remains evidence-based;
  a different repository owner requires an explicitly approved requirement.

## Questions and mutation gate

The material question is whether the selected invariant should remain project-local or be promoted by
explicit direction. Ask it after inspecting the evidence, stop after that question round, and do not
infer selection. Selection-before-plan behavior requires recording the answer before proposing the
engineered-ai-dev plan.

Candidate discovery performs no automatic mutation: it does not edit code, prompts, skills, plans,
commits, or Engram. Capa may persist an approved plan or accepted durable Engram knowledge only after
explicit human approval. Existing lifecycle command semantics remain unchanged.
