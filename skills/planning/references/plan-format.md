# Plan format

Use one `PLAN.md` for the approved change's context, design, slices, and progress. Keep the five
headings below; detail scales with the work. Include repository/worktree, plan location, and
branch/base under Goal and scope when it prevents ambiguity.

Follow an explicit project location convention; otherwise create
`<docs-root>/ai/<feature-or-plan-name>/PLAN.md`, defaulting to `docs/`. Keep related context in
that folder when useful and reference it. It supports the single authority, not a second state
mirror; create companions only for real context.

The outline describes content, not labels. Replace placeholders and omit empty fields. Keep
workflow and quality rules with their owners.

```markdown
# <Change title>

## Goal and scope
- Problem and intended outcome.
- In scope and out of scope.
- Constraints and overall acceptance.

## Relevant context
- Original user request/requirements in their exact wording, or an available canonical source
  locator; preserve original language and intent without copying secrets.
- Relevant current behavior, owners, patterns, contracts, and repository paths.
- Applicable instructions or authoritative references, with when/why to read them.

## Agreed design
- Resolved material choices and rationale, distinguishing later approved refinements from
  original requirements.
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

Intent belongs in Goal and scope; design in Agreed design; outcomes and proof with their slices.
Reference shared acceptance instead of repeating it. Context paths are navigation hints, not a
script. Keep small context inline and point to dense material with a reading condition.

Preserve source wording; use the original requirements and Agreed design together, with later
approved changes refining intent. Delegation points to source, decisions, and slice acceptance,
not redundant handoffs.

Each slice needs acceptance and verification: the observable scenario, serving checks, and
expected evidence. Record dependencies only when real. Add edit boundaries, exclusions,
compatibility detail, or recovery only when consequential; recovery preserves or restores state,
not a generic revert.

**Evidence is slice-local.** Record results against expected evidence, including failed,
unavailable, or skipped checks and their consequences. Record review request or approval,
selected scope, and omitted axes without treating omission as passing. Tie findings to the
candidate examined; record no findings only when observed. Include dispositions, corrections,
affected checks, and limitations. Distinguish corrected code from independent review of an
earlier candidate; corrections do not imply re-review. Mark reused evidence as reuse and record
human acceptance. Git owns code reality; the plan records what was checked and accepted.

**Status means progress toward human acceptance:**

- `pending`: implementation or required verification, review, or correction remains unfinished.
- `ready-for-review`: the final candidate is HUMAN-ready after verification, requested or
  approved review, and accepted corrections. Planning alone requires no review. Disclose
  non-blocking findings; human acceptance is pending.
- `complete`: the human accepted the slice.

Adjustments return the slice to `pending`. Missing evidence or an unresolved problem prevents
`ready-for-review`. A blocker is a concrete condition, not a status. Current progress names the
slice and one next action, adding a blocker only when present. Later writes belong to the
workflow owner; this reference defines what the plan records, not a pipeline.
