---
description: Discover read-only, evidence-backed refactor candidates from a committed ref or worktree
agent: ingcapa-dev-orchestrator
---

Run a read-only Refactor Candidate Review through Capa. Use `prompts/capa/review-input.md` as the
canonical capture procedure and pass one successful frozen payload unchanged to every review axis.

Command grammar:

- `<ref>` => committed
- `worktree` => uncommitted tracked worktree
- `worktree <ref>` => combined committed and tracked worktree input

`worktree` is reserved in command position. Report candidates inline by default, do not modify code,
plans, or commits, and end with the human selection and plan-transition question.

Arguments: $ARGUMENTS
