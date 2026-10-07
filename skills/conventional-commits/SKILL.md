---
name: conventional-commits
description: "Commit messages: use when writing or suggesting a message for a manual, later, or explicitly authorized commit. Provides lightweight Conventional Commits guidance."
---

# Conventional Commits

Base the message on the actual selected changes or supplied change description. Follow explicit
project commit rules and established types/scopes; use available recent history when useful.
Describe what changed, not the agent's process, and do not invent behavior or completed checks.

```text
<type>[optional scope][!]: <description>
```

- Use `feat` for a new capability and `fix` for a bug correction. Common other types are
  `docs` (documentation only), `refactor` (restructuring without adding features or fixing bugs),
  `perf`, `test`, `build`, `ci`, and `chore`; these are conventions, not a closed required list.
- Add a scope only when it identifies a meaningful area. Keep the description concise,
  imperative and without a trailing period; follow the project's language and length rules.
- A body is optional. Separate it from the subject with a blank line and use it only for
  useful rationale, context or migration details. Avoid repeating the subject or listing files.
- Mark actual breaking changes of any type with `!` before the colon or an uppercase
  `BREAKING CHANGE: <description>` footer, separated by a blank line. Explain the incompatible
  contract and migration; when using only `!`, describe the break in the subject.
- Add issue/reference footers only when supplied or established. Never add `Co-Authored-By`
  or AI attribution. A message suggestion does not authorize staging, committing or amending.

Examples:

```text
feat(filters): add reset action
fix(auth): preserve the return URL after login
refactor(api)!: replace positional arguments with an options object
```

Return one copyable message unless alternatives are requested. Message-writing guidance does
not change implementation, verification, review or Git authorization requirements.

Reference: [Conventional Commits 1.0.0](https://www.conventionalcommits.org/en/v1.0.0/).
