---
description: Continue the current plan through one task, then stop for human review
agent: ingcapa-dev-orchestrator
---

Follow `prompts/capa/orchestrator.md` to reconcile the active approved `PLAN.md` with actual code and evidence. After an unchanged HUMAN-ready candidate, `/continue` accepts it and executes **exactly one** next task; otherwise resume the current pending task. Approval-only accepts and stops. Present evidence and stop for the human. Do not skip tasks or infer acceptance from changed or partial work.

Context: $ARGUMENTS
