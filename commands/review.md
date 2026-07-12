---
description: Run an opt-in two-axis Capa review from a fixed point
agent: ingcapa-dev-orchestrator
---

Accept exactly one safe Git ref token. Resolve it to an immutable commit SHA with structured subprocess arguments, verify `<sha>...HEAD` is a non-empty diff, then review Standards and Plan Conformance without fixing code. Reject missing, multiple, option-like, metacharacter, or unsafe ref input. If no approved plan/handoff exists, report `no plan available` for Plan Conformance.

Fixed point: $ARGUMENTS
