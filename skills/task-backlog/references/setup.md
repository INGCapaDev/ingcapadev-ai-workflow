# Backlog Setup

Vendor the backlog system into the active project so anyone with any agent setup can use it: the skill directory, a plain-OpenCode command entrypoint, and a starter `TODO.md`. Daily backlog work stays in `SKILL.md`. Setup is idempotent: it creates only absent files and never overwrites team adaptations unprompted, so rerunning it with no intervening changes modifies nothing. All writes require the explicit setup request that invoked this procedure.

## 1. Inspect before writing

Read the project's `TODO.md` and `todos/` when present. Adopt existing entries verbatim; never reformat, overwrite, or delete them during setup. Locate the project's established skills directory when it has one (for example `.agents/skills/`, `.claude/skills/`); otherwise default to `.agents/skills/`. Note whether the project uses OpenCode (an `.opencode/` directory or `opencode.json` exists).

**Complete when:** you know what exists, where the skill belongs, and whether a command entrypoint applies; no file has been modified.

## 2. Vendor the skill

Copy this skill's whole directory (`SKILL.md` plus `references/`) to `<skills-dir>/task-backlog/`, creating parent directories as needed. Create absent files freely and skip files that are already byte-identical. When a present file differs, the team adapted it: report the drift and offer the update instead of overwriting unprompted. Never write to both a neutral and a tool-specific skills directory: one location, the project's own convention.

**Complete when:** the vendored directory matches this one file for file; a rerun copies nothing.

## 3. Vendor the command entrypoint

Only for projects that use OpenCode: write `<project>/.opencode/commands/todo.md` with the canonical `commands/todo.md` content minus the `agent:` frontmatter line, which names an agent that exists only where the full workflow is installed. Create it when absent; when present and different, report and offer rather than overwrite. Skip this step elsewhere: other tools reach the skill by its description, and an `.opencode/` directory in a non-OpenCode project is clutter.

**Complete when:** OpenCode projects have a working `/todo` entrypoint; other projects have no stray files.

## 4. Scaffold the starter backlog

`TODO.md` absent: create it from the starter below, adjusting the skill link when step 1 chose a tool-specific directory. `TODO.md` present: leave entries untouched and prepend the conventions header only when the file has none. The header carries the essentials; the vendored skill holds the full procedure.

**Complete when:** the backlog exists, existing entries are unchanged, and its links resolve relative to the project root.

## 5. Offer the agent pointer

Show this one-liner and wait; never edit project configuration unprompted:

```md
- Project backlog lives in `TODO.md` (procedure: `.agents/skills/task-backlog/SKILL.md`). Read it before planning; update it when deferring or finishing work.
```

Adjust the skill path when step 1 chose a tool-specific directory. If the pointer line is already present, report it as already wired and stop; never duplicate it. Teammates install nothing beyond these files: they read `TODO.md` and follow the header.

**Complete when:** the pointer is placed with approval or the human has the snippet; no configuration was touched without explicit approval.

## 6. Report

List vendored, created, and adopted files, the pointer state, and which tools can use the backlog from these files alone. Do not claim cross-tool runtime verification from static checks.

**Complete when:** the human can see what was installed, what was preserved, and what remains optional.

## Starter `TODO.md`

```md
# TODO

Project backlog: deferred ideas, bugs, debt, and open questions. Anyone — human or agent — can read and update this file.

- `- [ ]` is open; `- [x]` is done (kept only while its context still helps others).
- Each entry says what remains and why, with links to relevant files.
- Group under `##` headings when it helps scanning; keep entries short.
- Longer context lives in `todos/<topic>.md`, linked from here.
- A linked plan owns its requirements and progress; keep only a reminder and the link here.
- Remove an entry only when its work is fully done; never drop context others still use.

Full procedure: [.agents/skills/task-backlog/SKILL.md](.agents/skills/task-backlog/SKILL.md).
```
