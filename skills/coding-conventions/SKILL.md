---
name: coding-conventions
description: Routes substantive code implementation, Standards judgment, and task-critical design or correction questions to applicable project, TypeScript, React, Hono, Go, or architecture conventions.
---

# Coding Conventions

This is a convention router, not a second code-quality guide. Writers load applicable references
before substantive code changes; Standards loads them alongside code-quality. Follow project
instructions and nearby sound patterns first. All explicit project conventions remain binding.

## Applicability

Route by the actual change and affected contracts, not the file extension alone. Wording-only
edits, mechanical renames, and deletion of confirmed unused code normally need no additional
coding-convention load. If inspection reveals changes to behavior, types, public contracts,
effects, or structure, load the relevant guidance before implementing that part. Applicable
authoring guidance still governs edits to agent-facing instructions.

For substantive code, read this router and the smallest applicable set below. Reuse guidance
already loaded while its applicability remains unchanged; reassess when the task or affected
boundary changes. Do not load every reference as an implementation checklist.

## Precedence

1. System instructions and the explicit user request.
2. Applicable project and global `AGENTS.md` instructions.
3. Project-local skills and the approved plan.
4. Global Capa skills: `code-quality` and `coding-conventions`.
5. Ecosystem defaults when no stronger convention exists.

## General Engineering Principles

- Write decimal integer literals with contiguous digits, for example `20000`.

## References

- [TypeScript](references/typescript.md) — substantive TypeScript behavior, types, contracts,
  or boundary validation.
- [React](references/react.md) — component behavior, props, state, hooks, or rendering;
  add TypeScript when applicable.
- [Hono](references/hono.md) — Hono route registration, handlers, or middleware;
  add TypeScript when applicable.
- [Go](references/go.md) — substantive Go implementation.
- [Architecture](references/architecture.md) — adding or reshaping responsibilities,
  module/component structure, contracts, dependencies, or ownership boundaries, not merely
  editing logic inside an existing module.

Use the smallest relevant set. Project-local rules override these references; do not load unrelated language or framework conventions.
