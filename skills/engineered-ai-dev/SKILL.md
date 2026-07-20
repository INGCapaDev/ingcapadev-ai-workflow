---
name: engineered-ai-dev
description: "Trigger: feature, fix, refactor, tooling change, or explicit structured planning. Guides approval-gated slices, evidence, review gates, and resilient handoffs."
license: MIT
metadata:
  author: ingcapadev
  version: "2.0"
---

# Engineered AI Development

## Activation Contract

Use for a feature, fix, refactor, tooling change, or explicit request for structured planning and human review gates. Handle explanations, one-line or local microchanges, simple commands, and snippets directly unless the user explicitly requests this workflow.

This skill is standalone for one capable agent. Capa enhances it with routing and delegation with specialist; it never supplies a required workflow capability or changes a human gate.

## Hard Rules

- **Keep authority clear:** `PLAN.md` stores approved slice progress and the next action. Its slice statuses are only `pending` and `complete`; `complete` means human-approved. Engram stores durable knowledge, never transient Apply state. References are not progress mirrors.
- **Assign one writer:** Standalone, the current agent coordinates, implements, reconciles, and writes the plan after human acceptance. With Capa, its orchestrator is the sole plan and Engram writer; specialists return evidence and memory candidates.
- **Approve before mutation:** Inspect the codebase before asking facts it can answer. Clarify material requirements, behavior that should and should not happen, in/out/deferred scope, acceptance, and relevant compatibility, performance, UX, and security constraints. Obtain explicit plan approval before persisting or implementing.
- **Deliver one slice:** Implement only the current approved slice. Never start the next slice in the response that asks for diff review. Never commit unless explicitly asked.
- **Prove readiness:** Focused evidence against the approved validation seam is mandatory before presenting a successful Apply result for human diff review. Independent `/verify` and `/review` are opt-in.
- **Protect scope:** Never expand scope, edit scope, validation seam, or recovery implicitly. Keep blockers distinct from accepted deviations.
- **Protect artifacts:** Write technical artifacts in English, match the latest user language in replies, redact secrets and PII, and reference authoritative material instead of duplicating it.

## Decision Gates

| Situation | Action |
|---|---|
| Material product, architecture, scope, validation, or recovery choice exists | Present viable alternatives with tradeoffs; resolve the choice with the human before final plan approval. |
| A slice has no unresolved material decision | Do not create a per-slice question ritual; one final approval covers the clear plan. |
| Existing behavior, conventions, utilities, or risks are unclear | Explore read-only before planning. |
| Context is small | Summarize it in `PLAN.md`. |
| Context is large, dense, reusable, or authoritative | Persist or reference the relevant PRD, `CONTEXT.md`, `EXPLORATION.md`, ADR, issue/URL, or examples without duplication. Do not create artifacts by default. |
| Monorepo, sensitive boundary, known ownership, or likely expansion | Add `Edit scope`: primary roots, expected companion files, and useful exclusions. |
| API, schema, data, auth, permissions, deployment, or operational risk | Add concrete `Recovery`: Rollback, Fix-forward, or Feature flag. Do not use `Rollback: revert change`. |
| No executable behavior changes | Record a justified `N/A` validation seam; verification passes only after confirming the justification and absence of executable behavior. |
| New work changes roadmap, scope, seam, or recovery | Stop. Ask the human to update the current plan before continuation, or keep the approved roadmap and create a separate plan. |

## Execution Steps

1. **Clarify:** Inspect relevant code and instructions first. Ask only unresolved questions that materially affect correctness, scope, safety, or acceptance, then stop.
2. **Explore proportionally:** Keep exploration read-only. Transfer concise findings inline; persist/reference dense or authoritative context only when a short summary would be lossy.
3. **Plan:** Propose the smallest clear solution following project patterns, reusable utilities, code-quality guidance, and applicable conventions. State request, behavior, in/out/deferred scope, acceptance, constraints, assumptions, and material alternatives.
4. **Slice by review decision:** Apply the slice-boundary rules below. Resolve every material slice decision, then ask once for final plan approval and stop.
5. **Specify each slice:** Include outcome, primary review decision, required changes/areas, valid resulting state, validation seam and expected evidence, conditional edit scope/recovery, risks/assumptions, conditional `Why separate`, and suggested conventional commit.
6. **Persist after approval:** Use [HANDOFF_TEMPLATE.md](./HANDOFF_TEMPLATE.md) at the project convention or `docs/ai-workflow/<change-slug>/PLAN.md`. Add `Relevant Instructions and Skills` as path/name plus when/why to load; never copy skill bodies.
7. **Implement one slice:** Load relevant instructions/skills, implement only approved work, and gather focused seam evidence plus proportional supporting checks. Stop and replan remaining work if a second review decision appears or the approved boundary becomes invalid. Do not run routine builds unless requested or required by the approved seam. Apply success means ready for human diff review, not complete.
8. **Reconcile before presenting:** Inspect the full diff and evidence. Account for every changed file and preserve the result through review without updating plan progress. If plan/worktree state disagrees or an Apply result is missing, preserve evidence, classify recovery, and ask before mutation; never auto-reset, revert, relaunch, or complete the slice.
9. **Accept and persist once:** Only after explicit human acceptance, mark the slice `complete`, record accepted durable evidence/decisions, advance the current slice, and set the next safe action in one plan update. Consolidate or upsert durable memory then; do not save delegated session summaries or transient Apply state.
10. **Return control:** Present changed files, decisions, evidence, blockers/deviations, risks, and a conventional commit suggestion. Ask for diff review and stop. Continue only after explicit transition approval.

## Slice Boundary

- Center each slice on one primary human review decision and a valid, merge-safe resulting state; keep all supporting cross-layer work for that decision together. A small coherent feature may remain one slice.
- Size for one focused review session. Judge cognitive load from behaviors, concepts, contracts, state transitions, risk, context, and evidence; LOC is weak telemetry, never a threshold.
- When split signals exist across user-visible contracts, state owners, live implementations, validation seams, risk profiles, or review load, test each candidate contract for independent acceptance, a merge-safe state, evidence, and dependencies before combining it. These signals inform boundaries; none forces a slice by itself.
- Weigh shared contracts, temporary inconsistency, coupling, and transition overhead against narrower review focus. A shared business outcome alone does not justify combining independently reviewable contracts; when multiple materially different structures remain defensible, resolve the tradeoff with the human.
- Split for independent decisions, distinct risk, rollout, or recovery, materially different evidence, or excessive cognitive load. Routine repository/service/file/layer decomposition does not create phases by itself.
- Foundations, refactors, cleanup, and live verification are slices only when they independently meet the review-decision and valid-state test. Explore before planning; keep routine validation and cleanup with the outcome.
- Reject file-by-file slices, arbitrarily tiny slices, mixed unrelated work, and states that cannot be validated or safely accepted independently.
- Plan new tests only when the user explicitly requests them or applicable project instructions/context require them. Existing tests may still be selected as validation evidence.

## Delegation Capsule

For Capa, send the smallest sufficient projection rather than the full plan by default: the exact approved slice and acceptance, unchanged validation seam, conditional edit scope and recovery, selected skill paths, relevant active decisions/instructions, worktree preflight, and the repository reference to stable result communication. Standard specialists consume that reference; fully reinject it only for migration or mismatch recovery, or an external specialist without the standard prompt. Specialists may identify, request, or safely investigate missing relevant context. Read referenced context only when its branch applies or explicit revalidation requires it; resolved active decisions prevent routine rereads of superseded guidance. An ordinary vertical slice needs no rationale; explain only a real dependency that makes an exception necessary. Between equally safe choices, use less recurring context; any recurring addition must replace more context or encode a required safety invariant.

## Output Contract

- Use one proportional handoff: a compact slice table while fields remain brief; otherwise use a summary index plus detailed per-slice blocks for changes, edit scope, seam, or recovery. Do not create a second template.
- Always persist identity, request, in/out scope, acceptance, approved plan/status, current slice, conditional blocker, next action, human gates, and resume rule. Include accepted evidence/decisions, skills, edit scope, recovery, and references only when applicable.
- Treat the handoff as a safety net, not a mechanically reread loop input.
- Completion is checkable after human acceptance: approved scope implemented, focused seam evidence recorded, full diff reconciled, and one durable plan update made. A successful Apply only requests human review without committing or advancing.

## References

- [Handoff template](./HANDOFF_TEMPLATE.md)
