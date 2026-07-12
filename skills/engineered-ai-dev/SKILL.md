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

This skill is standalone for one capable agent. When Capa or another coordinator is active, it enhances execution through specialists without changing the workflow or human gates.

## Hard Rules

- **Keep authority clear:** `PLAN.md` stores the approved workflow state. Engram stores durable knowledge and session context. `EXPLORATION.md`, PRDs, ADRs, issues, and context files are references, not progress mirrors.
- **Assign one writer:** With a separate coordinator, it owns handoff state and specialists return evidence and recommended updates. Without one, the current agent coordinates, implements, reconciles, and updates the handoff.
- **Approve before mutation:** Inspect the codebase before asking facts it can answer. Clarify material requirements, behavior that should and should not happen, in/out/deferred scope, acceptance, and relevant compatibility, performance, UX, and security constraints. Obtain explicit plan approval before persisting or implementing.
- **Deliver one slice:** Implement only the current approved slice. Never start the next slice in the response that asks for diff review. Never commit unless explicitly asked.
- **Prove completion:** Focused evidence against the approved validation seam is mandatory before a slice is complete. Independent `/verify` and `/review` are opt-in.
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
4. **Slice by value and dependency:** Prefer independently valuable vertical slices. Put contracts, schemas, or foundations before dependents only when genuinely required; do not invent horizontal foundation phases. Each slice must be coherent and reviewable, not file-by-file, arbitrarily tiny, or mixed.
5. **Specify each slice:** Include goal, areas, concrete changes, conditional edit scope/recovery, validation seam and expected evidence, risks/assumptions, and suggested conventional commit. Resolve every material slice decision, then ask once for final plan approval and stop.
6. **Persist after approval:** Use [HANDOFF_TEMPLATE.md](./HANDOFF_TEMPLATE.md) at the project convention or `docs/ai-workflow/<change-slug>/PLAN.md`. Add `Relevant Instructions and Skills` as path/name plus when/why to load; never copy skill bodies.
7. **Implement one slice:** Load relevant instructions/skills, implement only approved work, and gather focused seam evidence plus proportional supporting checks. Do not run routine builds unless requested or required by the approved seam.
8. **Reconcile before presenting:** Inspect the full diff and evidence. Account for every changed file and update slice status, Decisions, Validation Evidence, Blockers, Accepted Deviations, Follow-ups, and Next Safe Action. If handoff/worktree state disagrees or an Apply result is missing, preserve evidence, classify recovery, and ask before mutation; never auto-reset, revert, relaunch, or complete the slice. With a coordinator, specialists recommend updates and the coordinator writes them. A slice is complete only when implementation, focused evidence, reconciliation, and handoff update all pass.
9. **Return control:** Present changed files, decisions, evidence, blockers/deviations, risks, and a conventional commit suggestion. Ask for diff review and stop. Continue only after explicit transition approval.

## Output Contract

- Use one proportional handoff: a compact slice table while fields remain brief; otherwise use a summary index plus detailed per-slice blocks for changes, edit scope, seam, or recovery. Do not create a second template.
- Always persist identity, request, in/out scope, acceptance, approved plan/status, current state, next action, human gates, and resume rule. Include exploration, skills, edit scope, recovery, risks, decisions, follow-ups, and related artifacts only when applicable; use the template's omission rules.
- Treat the handoff as a safety net, not a mechanically reread loop input.
- Completion is checkable: approved scope implemented, focused seam evidence recorded, full diff reconciled, durable state updated, commit suggested, and human review requested without committing or advancing.

## References

- [Handoff template](./HANDOFF_TEMPLATE.md)
