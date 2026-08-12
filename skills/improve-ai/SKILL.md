---
name: improve-ai
description: "Use when the user explicitly asks to improve the AI workflow, learn from this session's feedback or errors, improve assistant or agent behavior, or requests /improve-ai; route both entry paths to Capa for an evidence-backed, approval-gated review."
---

# Improve AI Review

This model-invoked skill is the lazy workflow for explicit `/improve-ai` and explicit
natural-language improvement requests. Both entry paths use one Capa-owned review; the command
may add an optional focus or example, but it does not create a second workflow.

## Evidence boundary

Use only currently available conversation context, explicit user input, relevant accepted Engram
knowledge, and read-only repository corroboration. Label observed evidence, interpretation, and
uncertainty separately. Report missing provenance or history, including unavailable transcript,
assistant-response, or tool-error history; never reconstruct it and never imply that absent telemetry
was observed.

## Signal pass

Inspect the available evidence for these signal classes:

- user corrections or feedback;
- errors or failed actions;
- unexpected generation or behavior;
- successful corrective rework or fixes;
- preferences;
- reusable patterns.

For every signal, preserve its origin, exact available evidence, and what remains unknown. Treat a
repository fact as corroboration, not as proof of an unrecorded session event.

## Corroboration and normalization

Inspect evidence before asking questions. Use direct read-only repository inspection for local facts.
For each bounded assignment, use at most one fresh existing `sub-explore` when distributed
corroboration is useful; otherwise do not delegate. The exploration is bounded, read-only, and must
return attributable evidence rather than invented history. Do not add a specialist, plugin, phase,
config entry, or telemetry path.

Normalize and deduplicate findings by root invariant plus owning authority, not by filename. Merge
repeated symptoms while preserving all supporting evidence and the dispositions `selected`,
`rejected`, `already fixed`, and `insufficient evidence`. A valid review may produce a no-change
outcome when evidence does not justify an enhancement.

## Target and scope classification

Consider proportionate candidates for project context, project or global `AGENTS.md`, skills
or references, Capa prompts/agents/subagents, commands, conventions, code-quality policy, Engram
behavior, and explicit no-change outcomes.

Keep a candidate project-local when it depends on project domain, architecture, or conventions. Allow
global promotion only through explicit user direction, independent recurrence, or intrinsic
cross-project ownership, including generic reusable patterns, AI agent or subagent behavior,
project-agnostic skills, and ecosystem conventions or quality rules. Human selection and plan approval
remain mandatory; a single bad generation is not sufficient evidence by itself for global promotion.

Prepare selected changes for the current repository. Retain evidence-based project/global
classification, but do not infer another repository owner or plan destination.

## Candidate report

Describe each candidate proportionally with its signal origin and evidence, repository corroboration,
root invariant, owner and scope, applicability, smallest viable enhancement, tradeoffs, uncertainty,
validation implications, and disposition. Preserve rejected, already-fixed, and insufficient-evidence
findings so the review does not silently rediscover or erase them. Include the no-change outcome when
no candidate clears the evidence or scope threshold.

## Human decision and plan gate

Ask only material questions about evidence, behavior, scope, ownership, promotion, or validation.
Stop after each question round. Never infer selection or approval.
Selection comes before planning: present the candidate choices, record the human selection, then
propose an engineered-ai-dev plan in the same workflow with its owner, scope, acceptance, validation
seam, and recovery. Persist a plan only after explicit human approval.

Capa alone owns classification, skill resolution, optional exploration, semantic aggregation, human
questions, plan state, and accepted durable Engram knowledge; Capa alone writes plans and accepted
durable Engram knowledge after explicit approval. Candidate discovery never mutates code, prompts,
skills, plans, commits, or Engram automatically. This workflow identifies improvements for human
approval; it does not self-modify.
