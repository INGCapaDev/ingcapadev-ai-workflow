---
name: conventional-commits
description: "Commit messages: use when writing or suggesting a message for a manual, later, or explicitly authorized commit. Provides lightweight Conventional Commits guidance."
---

# Conventional Commits

Base the message on the actual selected changes or supplied change description. Follow explicit project commit rules and established types/scopes; use available recent history when useful. Describe what changed, not the agent's process, and do not invent behavior or completed checks.

```text
<type>[optional scope][!]: <description>
```

- Use `feat` for a new capability and `fix` for a bug correction. Other usual types: `docs`, `refactor`, `perf`, `test`, `build`, `ci`, and `chore`. Match project conventions.
- Scope only when informative. Keep the description concise, imperative, and without a trailing period; follow the project's language and length rules.
- Add a blank-line-separated body only for useful rationale, context, or migration details, not a repeat of the subject or a file list.
- Mark breaking contracts with `!` or a separated `BREAKING CHANGE: ...` footer; state impact and migration. Add issue/reference footers only when supplied or established.
- Never add `Co-Authored-By` or AI attribution. A message suggestion does not authorize staging, committing, or amending.

Examples:

```text
feat(filters): add reset action
fix(auth): preserve the return URL after login
refactor(api)!: replace positional arguments with an options object
```

Return one copyable message unless alternatives are requested. Message-writing guidance does not change implementation, verification, review, or Git authorization requirements.

Reference: [Conventional Commits 1.0.0](https://www.conventionalcommits.org/en/v1.0.0/).
