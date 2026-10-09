# Plan format

Use one `PLAN.md` for the approved change's context, design, slices, and observed progress.
Keep exactly the five main headings below; detail scales with the work. The change title
identifies the plan. Include repository/worktree, plan location, branch/base, or other locating
context under Goal and scope when it prevents ambiguity.

The outline describes content, not mandatory field labels. Replace placeholders with
change-specific information and omit empty, filler, or irrelevant fields in the persisted
plan. Add slice blocks only for actual work. Keep workflow and quality rules with their
owners rather than copying them into the plan or creating another state artifact.

```markdown
# <Change title>

## Goal and scope
- Problem and intended outcome.
- In scope and out of scope.
- Constraints and overall acceptance.

## Relevant context
- Relevant current behavior, owners, patterns, contracts, and repository paths.
- Applicable instructions or authoritative references, with when/why to read them.

## Agreed design
- Resolved material choices and rationale.
- Intended behavior, interactions, interfaces, and important invariants.
- Compatibility requirements when relevant.

## Slices

### S1 — <Verifiable outcome>
Status: pending
Depends on: <real prerequisite, only when present>

- Outcome and logically coupled supporting changes.
- Acceptance criteria.
- Verification: boundary/scenario, purposeful checks, expected evidence, and independent
  review needs when consequential. Reassess these needs against the actual candidate.
- Edit boundaries or recovery: <only when consequential>

Evidence:
<Actual observations, candidate-specific findings/dispositions, correction checks,
limitations, and human acceptance as they become available. Omit until evidence exists.>

## Current progress
- Current slice: <slice ID, or none when all slices are accepted>.
- Next action: <one concrete action>.
- Blocker: <concrete condition, only when present>.
```

Intent belongs in Goal and scope; resolved design belongs in Agreed design; deliverable
outcomes and proof belong with their slices. Reference shared overall acceptance rather
than repeating it in every slice. Context paths are navigation hints, not a frozen
file-by-file implementation script. Keep small context inline and point to dense or
authoritative material with a clear condition for reading it.

Each slice needs acceptance and verification: identify the observable scenario or boundary,
which checks serve it, and what evidence would establish the expected result. Record
dependencies only when another outcome is a prerequisite. Add edit boundaries, exclusions,
compatibility detail, or concrete recovery options only where consequential work makes them
useful. Recovery identifies how to preserve or restore the relevant state, not a generic
instruction to revert everything.

**Evidence is slice-local.** Record observed results against expected evidence, including
failed, unavailable, or skipped checks and their consequences. Record independent-review
selection and its reason; identify omitted axes without treating them as passing reviews.
Tie functional observations and selected Plan/Standards findings to the actual candidate
examined; record no-findings outcomes only when observed. Include finding dispositions,
accepted corrections, affected checks, and remaining limitations. Distinguish checks of corrected code from independent review of
an earlier candidate; corrections do not imply re-review. Identify reused unchanged evidence
as reuse. Record explicit human acceptance when given. Git establishes what code exists;
the plan records what was checked and accepted, without a separate evidence/state mirror.

**Status means progress toward human acceptance:**

- `pending`: implementation or required verification/selected review/correction remains unfinished.
- `ready-for-review`: the final candidate is HUMAN-ready after applicable functional
  verification, selected independent review (if needed), and accepted correction/checks.
  No independent review is required merely because the task is planned. Remaining non-blocking
  findings or limitations are disclosed; explicit human acceptance is still pending.
- `complete`: the human explicitly accepted the slice.

Requested adjustments return the slice to `pending` while adjustment and required checks
remain unfinished. Missing required evidence or an unresolved material problem prevents
`ready-for-review`. A blocker is a concrete condition, not a fourth status. Current progress
names the current slice and exactly one next action, adding a blocker only when present.
Later progress writes belong to the authorized workflow owner; this reference defines what
the plan records, not an execution, review, delivery, or memory pipeline.
