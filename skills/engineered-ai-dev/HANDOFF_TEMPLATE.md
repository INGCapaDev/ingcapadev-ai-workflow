# <Change Title>

## A. Identity And Authority

- Change slug: `<change-slug>`
- Repository/worktree: `<canonical absolute repository root or worktree path>`
- Handoff path: `<project convention or docs/ai-workflow/<change-slug>/PLAN.md>`
- Last updated: `<YYYY-MM-DD HH:MM timezone>`
- Status: planning | approved | in-progress | slice-review | blocked | completed
- Branch/base: `<only when relevant; otherwise omit>`
- Workflow-state authority: This `PLAN.md` stores approved decisions, slice progress, gates, and next action. Engram stores durable knowledge/session context; related artifacts are references, not progress mirrors.

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

### Context And Constraints

- Relevant areas:
- Project conventions and reusable utilities:
- Material compatibility, performance, UX, security, or operational constraints: <include applicable items; otherwise omit>
- Risks and assumptions: <include when material; otherwise omit>

### Related Artifacts

<Reference PRD, `CONTEXT.md`, `EXPLORATION.md`, ADR, issue/URL, examples, or other authoritative context only when useful. Keep small context in this plan; do not create or duplicate artifacts by default. Omit this section when none apply.>

### Relevant Instructions And Skills

<For each applicable item, list exact path or skill name and when/why to load it. Do not copy bodies. Omit this section when none apply.>

## C. Approved Plan

Plan approval: pending | approved on <date/by whom>

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
- Status: pending | in-progress | blocked | complete | review-approved

Order by real dependency and prefer independently valuable vertical slices. Add foundations/contracts/schemas first only when dependents genuinely require them. Every slice must be coherent, reviewable, and leave the codebase valid; avoid file-by-file, arbitrary tiny, mixed, or invented horizontal phases.

## D. Human And Transition Gates

- Resolve every material product, architecture, scope, validation, or recovery decision before final plan approval. Clear slices need no separate interview; one final approval is sufficient.
- Persist and implement only after explicit plan approval.
- Implement one approved slice at a time.
- Complete a slice only after focused seam evidence, full diff reconciliation, and durable-state update.
- Present the diff and wait for human review before starting the next slice.
- Independent `/verify` and `/review` are opt-in.
- Suggest a conventional commit after a successful slice; never commit unless explicitly asked.

## E. Durable Current State

- Last completed slice: <ID or none>
- Current slice/status: <ID and pending | in-progress | blocked | complete-awaiting-review | review-approved>
- Decisions: <material approved or implementation decisions with rationale; omit when none>
- Validation evidence: <focused seam observations and proportional supporting checks; `N/A` only when approved>
- Accepted deviations: <human-accepted departures from the approved plan and rationale; omit when none>
- Blockers: <unresolved conditions preventing safe progress; omit when none>
- Follow-ups/deferred work: <outside approved scope unless explicitly promoted through human approval; omit when none>
- Next safe action: <one concrete approved action>
- Next human decision: <required decision, transition approval, or none>

## F. Resume, Update, And Scope-Change Protocol

### Resume

1. Confirm the change slug, repository/worktree, and handoff path; read this entire handoff.
2. Inspect the current worktree and full relevant diff before mutation.
3. Summarize the last completed slice, current slice/status, and next safe action.
4. Report stale, conflicting, or ambiguous handoff/worktree state before mutation. List attributable changed files against edit scope, preserve evidence/patch, and classify Working Tree Recovery as `coherent | incomplete | unsafe | unknown`.
5. Offer human choices: resume after reconciliation; preserve the patch and reset slice state; revert only attributable changes; or manual recovery. Ask before mutation; never auto-reset, revert, or relaunch, and never mark an interrupted slice complete.
6. Continue only the approved next action. Preserve every human gate.
7. After reconciliation, update this handoff; with a separate coordinator, specialists report evidence and recommended updates while the coordinator remains sole writer.

Treat this handoff as a safety net: reread it on resume, after context loss or external change, when asked, or when state is unclear, not mechanically between steps in an intact session.

### Update

After each slice and before presenting it as complete, reconcile the full diff/evidence and update status, Decisions, Validation Evidence, Accepted Deviations, Blockers, Follow-ups, Next Safe Action, Next Human Decision, and Last updated. Update stable planning sections only when human-approved facts change.

### Scope Change

If requested work changes the approved roadmap, scope, edit scope, validation seam, or recovery, stop and present two choices:

1. Update and reapprove this plan before continuing.
2. Keep this approved roadmap unchanged and create a separate plan for the new work.

Never promote a follow-up or expand scope implicitly.

## Omission Rules

Always retain identity, request, in/out scope, acceptance, approved plan/status, current state, next safe action, human gates, and resume rule. Omit conditional fields or sections when they do not apply; use explicit `N/A` only where its meaning matters, such as an approved seam without executable behavior. Do not leave placeholder sections in a persisted plan.
