---
name: improve-ai
description: "Use for /improve-ai or explicit requests to improve the AI workflow or assistant behavior, or learn from session feedback and errors. Provides an evidence-backed, read-only retrospective before authorized changes."
---

# Improve AI Retrospective

Both `/improve-ai` and equivalent natural-language requests reach this lazy retrospective owned
by Capa. Discovery is read-only: it never changes code, prompts, skills, plans, commits, or
Engram. Inspect available session evidence by default; use supplied focus or examples when
present.

## 1. Establish evidence

Use conversation context, explicit user input, relevant accepted durable knowledge, and
read-only repository corroboration. Separate observation from interpretation and uncertainty.
Missing conversation, response, tool-error history, or telemetry stays missing; repository facts
can corroborate a problem but cannot reconstruct an unseen event.

Inspect facts before asking questions. Work directly unless distributed corroboration is useful;
then use at most one fresh native `explore` per bounded assignment, read-only and returning
attributable evidence. Use existing capabilities without adding an actor or telemetry path.

**Done when:** each candidate problem has attributable evidence or an explicit evidence gap.

## 2. Find the owner and smallest correction

Consider feedback, failures, corrective rework, and successful reusable patterns where evidence
supports a lesson. Group repeated symptoms by likely root cause and owning authority, preserving
their evidence. Decide whether guidance is missing, unclear, undiscoverable, or unfollowed
before proposing another rule.

- An ordinary implementation bug belongs in code and appropriate verification.
- A reliably detectable mechanical violation belongs in existing lint, types, tests, or a
  focused deterministic check.
- A genuine missing convention belongs in the owning quality or convention guidance;
  undiscoverable knowledge may need a navigation pointer or clearer documentation.
- Silent meaningful API choices belong in planning/design interaction; repeated workflow or tool
  friction belongs in the owning workflow, prompt, configuration, or tool.
- An isolated model mistake with adequate guidance may need only correction of the immediate
  result. Adequate guidance, an already-fixed issue, or insufficient evidence can justify no
  change.

Prefer precise corrections, clearer loading, or removal of unnecessary machinery over more
policy. Keep one authoritative owner rather than copying guidance across commands and prompts.
Judge benefit by useful results, correction churn, latency, and human review burden, not prompt
size or agent-call counts alone.

Keep project-specific changes project-local. Propose shared guidance only with cross-project
evidence or explicit direction for that scope; one bad generation justifies no global promotion.
Evidence supports a proposal, not permission to edit shared sources.

**Done when:** every proposed improvement identifies a supported cause, authority, minimal
correction, expected benefit, and material tradeoff or verification need; unsupported ideas are
rejected.

## 3. Propose, then route

Report inline and proportionally: for worthwhile candidates, give the observation or evidence,
likely cause and uncertainty, owner and smallest change, expected benefit, and important
tradeoff or validation implication. A clear no-change outcome is valid. Ask only unresolved
material questions about evidence, behavior, ownership, scope, or validation, then stop for the
answer.

Interest or candidate selection alone does not authorize mutation. Obtain both selection and
explicit implementation authorization for the intended scope; one clear instruction may provide
both. Without authorization, stop at the proposals or selected candidate.

After selection and authorization, return to normal Capa routing: small understood corrections
proceed directly with focused validation and reporting; substantial changes or unresolved
design invoke `skills/planning/SKILL.md` and its approval gates. An improvement does not
automatically need a persisted plan. Implementation permission does not authorize commits,
delivery, or scope expansion.
