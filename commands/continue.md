---
description: Continue the current plan through one task, then stop for human review
agent: ingcapa-dev-orchestrator
---

Follow `prompts/capa/orchestrator.md` to reconcile the current approved `PLAN.md` with actual code and evidence. An explicit `/continue` after presentation of an unchanged HUMAN-ready candidate accepts it and starts exactly one next task; otherwise continue the current pending task. Approval-only accepts and stops, while adjustments stay on the current task. Implement inline or delegate for a concrete benefit, follow the applicable verification/review/correction path, present the final candidate and evidence, and stop for the human. Do not skip tasks or infer acceptance of partial or changed candidates.

Context: $ARGUMENTS
