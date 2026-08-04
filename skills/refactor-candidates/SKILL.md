---
name: refactor-candidates
description: "Use when a user asks to inspect a diff for worthwhile simplification, deletion or reuse, structural/depth improvements, or material traversal, render, query, or I/O costs; route the read-only discovery through Capa."
---

# Refactor Candidate Review

Use this model-invoked skill for natural-language requests to find evidence-backed candidates in a
diff, including:

- worthwhile simplification, deletion, reduced verbosity, meaningful reuse, responsibility, or readability;
- ownership, module depth, interfaces, seams, leverage, and locality;
- material and high-cost traversal, render, query, loop, or I/O costs supported by realistic evidence.

Route the request to the Capa orchestrator. The canonical authorities are:

- `prompts/capa/orchestrator.md` for routing, assignments, aggregation, and the human transition;
- `prompts/capa/review-input.md` for review-input capture and scope safety;
- `skills/engineered-ai-dev/SKILL.md` for lifecycle and approval gates;
- `skills/code-quality/SKILL.md` for simplification, reuse, cost, and anti-speculation policy;
- `skills/coding-conventions/SKILL.md` and its applicable references for documented conventions;
- `skills/coding-conventions/references/architecture.md` only when structural analysis applies;
- `prompts/capa/result-contract.md` for specialist communication.

Keep the review read-only and let those authorities remain the single source for their policies.
