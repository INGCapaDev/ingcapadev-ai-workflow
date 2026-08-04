---
description: Run an opt-in two-axis Capa review from a fixed point
agent: ingcapa-dev-orchestrator
---

Use `prompts/capa/review-input.md` as the canonical procedure. Invoke its `committed` mode with the supplied fixed point, then pass a successful frozen payload to the existing two-axis review. `/review` launches only Standards and Plan Conformance without fixing code; if no approved plan/handoff exists, report `no plan available` for Plan Conformance.

Fixed point: $ARGUMENTS
