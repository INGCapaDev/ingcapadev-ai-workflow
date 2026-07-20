# Capa Result Communication

Specialists communicate in a natural, role-appropriate format. Formatting, section order, omitted filler, and useful extra information do not invalidate useful work.

## Small Semantic Core

Every report makes its role, operational state (`success`, `partial`, or `blocked`), material evidence, artifacts or changed scope, blockers or gaps, risks, and next safe action identifiable enough for the orchestrator to act safely. Specialists distinguish observed evidence from inference and report uncertainty rather than inventing support.

The orchestrator advances consequential state only from the semantic evidence required by that gate. It preserves useful partial results and extra context, but never infers approval, implementation completion, a verification verdict, or review findings when the required role-specific evidence is absent or contradictory.

`success` means the assigned mission's completion criteria are met. `partial` means useful, non-contradictory work exists but required evidence or context is incomplete. `blocked` means safe continuation requires a decision, access, or dependency.

## Shared Review Severity

- `critical`: unsafe or materially incorrect and requires human action.
- `important`: substantial standards, conformance, or evidence issue.
- `optional`: non-blocking improvement or judgment call.

When skills matter, state how they were resolved and any rejected or unavailable required paths. Resolution is evidence, not a fixed enum.

This stable repository reference is consumed by standard specialists. Delegation capsules normally point to it rather than copying it in full; full reinjection is reserved for migration or mismatch recovery, or an external specialist that lacks the standard prompt.
