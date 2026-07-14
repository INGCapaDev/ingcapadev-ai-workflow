# <Change Title>

## A. Identity And Authority

- Change slug: `<change-slug>`
- Repository/worktree: `<canonical absolute repository root or worktree path>`
- Handoff path: `<project convention or docs/ai-workflow/<change-slug>/PLAN.md>`
- Last updated: `<YYYY-MM-DD HH:MM timezone>`
- Branch/base: `<only when relevant; otherwise omit>`
- Workflow-state authority: This `PLAN.md` stores approved slice progress and next action. Slice status is `pending | complete`; `complete` means human-approved. Engram stores durable reusable knowledge, not transient execution state.

## B. Request, Scope, Acceptance, And Context

### Request

<Concise request. Redact secrets and PII.>

### Scope

- In scope:
- Out of scope:
- Deferred: <include when applicable; otherwise omit>

### Acceptance Behavior

- Should happen:
- Should not happen:
- Completion criteria:

### Relevant Context

- Relevant areas:
- Project conventions and reusable utilities:
- Active decisions/instructions: <only those still applicable; reference superseded guidance rather than routinely rereading it>

### Related Artifacts

<Reference PRD, `CONTEXT.md`, `EXPLORATION.md`, ADR, issue/URL, examples, or other authoritative context only when useful. Keep small context in this plan; do not create or duplicate artifacts by default. Omit this section when none apply.>

### Relevant Instructions And Skills

<For each applicable item, list exact path or skill name and when/why to load it. Do not copy bodies. Omit this section when none apply.>

## C. Approved Plan

Choose one presentation based on detail; do not keep both.

### Compact Slice Table

Use while every field stays brief.

| Slice | Goal | Concrete changes/areas | Validation seam and expected evidence | Edit scope/recovery summary (optional) | Suggested commit | Status |
|---|---|---|---|---|---|---|
| 1 |  |  |  |  |  | pending |

### Detailed Slice Plan

Use a summary index plus one block per slice when changes, edit scope, validation seam, or recovery need detail.

| Slice | Goal | Depends on | Status |
|---|---|---|---|
| 1 |  | none | pending |

#### Slice 1: <Goal>

- Areas:
- Concrete changes:
- Edit scope: <primary roots, expected companion files, exclusions; omit when not applicable>
- Validation seam: <boundary, observable behavior, expected focused evidence; justified `N/A` only without executable behavior>
- Recovery: <Rollback, Fix-forward, Feature flag, justified `N/A`; omit for low-risk work>
- Risks/assumptions: <omit when none>
- Suggested conventional commit:
- Status: pending | complete

Order by real dependency and prefer independently valuable vertical slices. Explain a non-vertical slice only when a real dependency requires it.

## D. Human And Transition Gates

- Resolve every material product, architecture, scope, validation, or recovery decision before final plan approval. Clear slices need no separate interview; one final approval is sufficient.
- Persist and implement only after explicit plan approval.
- Implement one approved slice at a time.
- A successful Apply is ready for human diff review, not complete; do not update this plan before review approval.
- After explicit human acceptance, make one update: mark the slice complete, record accepted durable facts, advance the current slice, and set the next safe action.
- Independent `/verify` and `/review` are opt-in.
- Suggest a conventional commit after a successful slice; never commit unless explicitly asked.

## E. Current Progress

- Current slice: <ID and `pending`, or none>
- Blocked reason: <only an active condition preventing safe progress; otherwise `none`>
- Accepted evidence/decisions: <human-accepted durable facts; omit when none>
- Next safe action: <one concrete approved action>

## F. Resume, Update, And Scope-Change Protocol

### Resume

1. Confirm the change slug, repository/worktree, and handoff path; read the active plan and applicable referenced context.
2. Inspect the current worktree and full relevant diff before mutation.
3. Summarize the current slice, conditional blocker, and next safe action.
4. Report stale, conflicting, or ambiguous handoff/worktree state before mutation. List attributable changed files against edit scope, preserve evidence/patch, and classify Working Tree Recovery as `coherent | incomplete | unsafe | unknown`.
5. Offer human choices: resume after reconciliation; preserve the patch and reset slice state; revert only attributable changes; or manual recovery. Ask before mutation; never auto-reset, revert, or relaunch, and never mark an interrupted slice complete.
6. Continue only the approved next action. Preserve every human gate.
7. Keep Apply evidence transient through human review. After explicit acceptance, the standalone agent or Capa orchestrator makes the one plan update; Capa specialists only return evidence and memory candidates.

Treat this handoff as a safety net: reread it on resume, after context loss or external change, when asked, or when state is unclear, not mechanically between steps in an intact session.

### Update

After human acceptance, update the completed slice, current slice, accepted durable facts, blocked reason, next safe action, and timestamp once. Do not persist approval/global/transient execution statuses or pre-review evidence.

### Scope Change

If requested work changes the approved roadmap, scope, edit scope, validation seam, or recovery, stop and present two choices:

1. Update and reapprove this plan before continuing.
2. Keep this approved roadmap unchanged and create a separate plan for the new work.

Never promote a follow-up or expand scope implicitly.

## Omission Rules

Always retain identity, request, in/out scope, acceptance, approved plan/status, current progress, next action, human gates, and resume rule. Omit conditional fields or sections when they do not apply; use explicit `N/A` only where its meaning matters, such as an approved seam without executable behavior. Do not leave placeholder sections in a persisted plan.
