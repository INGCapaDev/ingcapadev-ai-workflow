# INGCapaDev AI Workflow

A lightweight, human-in-the-loop AI development workflow. Built around collaborative design, small tasks, focused evidence, resilient plans, and risk-based review with two focused axes — because the human stays in control.

## The Story

This system is the result of a lot of trial and error. It grew out of my former engineered-ai-dev skill — clarification, sliced planning, persistent handoff, and human review gates. Capa v3 now separates planning, execution, and independent review into their owning sources rather than using that skill as its live core.

It takes inspiration from two incredible tools:

- **[Matt Pocock's composable skills](https://github.com/mattpocock/skills)** — his approach to writing clean, focused, progressive-disclosure skills changed how I think about skill design. Every skill in this repo follows that philosophy.
- **[Gentle AI by Alan Buscaglia](https://github.com/Gentleman-Programming/gentle-ai)** — the orchestrator pattern, fresh-context delegation, and Engram persistent memory concepts were foundational. The review lifecycle protocol and skill-resolution patterns came from studying Gentle AI's architecture.

That earlier skill helped me refine the workflow. This system took the best of both references — Matt's composability and Alan's orchestration — and evolved into something deeply personal to my workflow. It's not the most advanced system out there. It's probably not the best either. But it's what works best for **me**, and I'm sharing it because I believe it can help others — either to use directly or as a reference to build their own workflows.

## How It Works

The primary agent (`ingcapa-dev-orchestrator`) is Capa, a senior developer who can implement
directly, with four hidden specialists and native `explore` for read-only research:

| Specialist | Role |
|---|---|
| `explore` (native) | Read-only, non-delegating codebase investigation |
| `capa-worker` | Implement one bounded task or accepted correction without delegation |
| `sub-verify` | Optional read-only checker, explicitly requested or approved for an evidence gap |
| `sub-review-standards` | Review axis: documented rules and quality |
| `sub-review-plan` | Review axis: plan conformance |

Core development commands:

- `/plan` — Discuss design, propose small work units, and persist one plan only after final approval
- `/continue` — Follow the current approved plan through one task, then stop for human review
- `/review [ref]` — Read-only independent review of current work, or committed changes since a fixed Git ref
- `/improve-ai [focus]` — Read-only retrospective; selection and implementation require explicit authorization

Tiny understood work stays direct, without a mandatory plan, worker, or review. Medium direct
work uses review when worthwhile; material decisions, multiple outcomes, risk, or recoverable
work call for planning. Inline versus delegated execution is a separate choice: delegation
needs a concrete benefit; one writer is the default. Independent checking is optional, requested explicitly
or approved for a concrete evidence gap; there is no separate verification command.

Parallel writers normally handle only worthwhile, independent subtasks within the current
authorized slice, with disjoint edit surfaces and compatible contracts. Capa coordinates the
integrated result and its checks; individual worker success is not proof of integration.
Executing independent slices together is an exception requiring explicit human approval of
the proposed grouping and checkpoints. Small size or speed alone does not justify giving up
step-by-step control; each slice retains its evidence and human acceptance.

`/review` without arguments includes staged, unstaged, and relevant new source work.
`/review <ref>` selects committed branch changes since the validated fixed point; explicit
natural-language requests may select another scope. Both entry paths load the lazy `review`
skill, which freezes the candidate for the selected fresh independent Standards and/or Plan
contexts. General standalone review uses both when an approved plan exists, otherwise Standards;
explicit axis requests are honored. Reports keep findings and coverage separate; without an
approved plan, Plan reports `no plan available`. Standalone review does not fix code, accept tasks, commit, or
update progress. Supplied task candidates use their actual pre-task delta, not earlier accepted
uncommitted work.

Each planned task receives purposeful verification for its actual change; structural readback
can suffice for mechanical or behavior-neutral edits. Planning alone does not require independent
review. High-risk work receives justified independent scrutiny; Capa selects Standards, Plan
conformance, or both for the remaining assurance need. Both axes run fresh and in parallel on
the same frozen candidate when selected. Existing applicable evidence is reused, but functional
checks are not automatically independent judgment. Omitted axes are not reported as passes.
Capa may authorize at most one focused correction pass for clear meaningful in-scope findings,
followed by affected checks. Material design changes,
disputed findings, and optional alternatives return to the human. Corrections are disclosed as
changes to the reviewed candidate, not implied re-review; no automatic second broad loop runs.
New tests are only explicitly requested or project-required. For important high-risk business
rules with an established setup, Capa may recommend a focused test and waits for authorization.
Routine builds, blanket suites, and unrelated checks are not default verification. Every planned
task still stops for human acceptance, including tasks with no independent review.

For a lightweight retrospective, use `/improve-ai [focus or examples]` or explicitly ask to
improve the AI workflow or learn from session feedback. Both reach the same lazy `improve-ai`
skill using available evidence, with uncertainty made clear and no-change as a valid outcome.
Discovery is read-only. Selecting a proposal alone does not authorize changes: after selection
and explicit implementation authorization, small understood corrections stay direct, while
substantial changes or unresolved meaningful design use the `planning` skill and its approval
gates. Not every improvement needs a persisted plan; project-specific changes stay local,
and shared scope requires deliberate authorization.

Reviewers always start fresh; worker context may be reused for an accepted correction. Capa owns
plan state, memory, and human transitions. One `PLAN.md` records active scope/design/evidence/progress;
Git owns code reality and Engram stores accepted reusable knowledge not better owned in the repo.
The plan retains original user wording/intent (or points to its available canonical source)
separately from later approved refinements. Workers receive relevant requirement/decision/slice
locators plus concise parent instructions, not paraphrased requirements or unrelated history.
Without a canonical source, a delegated assignment includes the request verbatim and agreed
clarifications; delegation alone does not require creating a plan. Reviewers receive relevant
requirements and frozen evidence, without the writer's reasoning or suggested conclusions.
Implementation uses the thin AGENTS baseline and loads router-selected conventions before
substantive code changes. Wording-only edits, mechanical renames, and confirmed unused-code
deletions normally skip additional coding conventions; actual behavior/contract/structure changes
still need their relevant guidance. Standards loads applicable quality/convention guidance.
Explicit project conventions remain binding in both roles.

`pending -> ready-for-review -> complete` distinguishes unfinished work, a final HUMAN-ready
candidate after applicable checks, selected review, and correction, and explicit human acceptance. Capa presents
the final diff, decisions, findings/dispositions, correction checks, and limitations, then stops.
Approval-only accepts and stops; `/continue` after presentation of the unchanged ready candidate
accepts it and starts exactly one next task. Adjustments remain on the current task. Missing proof,
stale evidence, or unresolved material problems block readiness. Resume preserves partial/accepted
work and reconciles the active plan with actual code; it does not reset or treat memory as authority.
Planning or acceptance never authorizes automatic commits, delivery, or destructive operations.

Implemented changes include a suggested Conventional Commit message for manual or later use.
The lightweight `conventional-commits` skill loads when drafting a message, not for every
implementation step; a suggestion does not authorize a commit.

## Requirements

- [OpenCode](https://opencode.ai) and an authenticated provider with models available to your account.
- Bash for the configured shell: the Windows example uses Git Bash from Git for Windows.
- Optional: [Engram](https://github.com/gentleman-Programming/engram) for persistent memory and
  [Context7 MCP](https://context7.com) for current library/framework documentation. Configure
  their example MCP entries, or disable them if you do not use them. Missing memory does not
  block a clear local plan unless specific consequential knowledge is missing.

## Quick Start

1. Back up your existing OpenCode setup. Install the core files below into
   `~/.config/opencode` (`%USERPROFILE%\.config\opencode` on Windows), keeping the relative
   `prompts/capa/` and `skills/` paths intact. Merge with your setup rather than overwriting
   personal skills, commands, plugins, or credentials.
2. For a new setup, copy `opencode.example.json` to `opencode.json`. For an existing setup,
   merge the Capa agent definitions and permissions deliberately. Choose provider/model IDs
   available to your account and replace example path/API-key placeholders. Preserve the
   agent IDs, prompt paths, task allowlist, and read-only reviewer/checker restrictions.
   Set `shell` to your installed Bash executable. The Windows example uses
   `C:/Program Files/Git/bin/bash.exe`; on Linux/macOS use an appropriate path such as `/bin/bash`.
   On Windows, do not substitute the `bash.exe` WSL launcher for Git Bash.
3. Authenticate your provider through OpenCode, for example with `opencode auth login`.
   If enabled, install Engram so `engram mcp` is available and configure Context7's API key.
   Otherwise set the respective MCP entry's `enabled` value to `false`. The example's Google
   provider settings and Gemini authentication plugin are not required by Capa; retain them
   only if your provider setup uses them.
4. Start or restart OpenCode. The example sets `default_agent` to `ingcapa-dev-orchestrator`,
   so new sessions start with Capa; other primary agents remain available for selection.
   Config, agent prompts, and skills are startup-loaded; restart after changing them.
   Work from your project so its instructions and conventions apply.
5. Ask directly for small understood work. For planned work, use `/plan`, settle material
   design choices, and approve the final plan before persistence. Then explicitly authorize
   execution with `/continue`. Review each presented candidate; approval-only accepts and
   stops, while `/continue` accepts an unchanged ready candidate and starts one next task.
   Commits, pushes, PRs, and deployment need separate authorization.

> The real `opencode.json` is gitignored — only `opencode.example.json` is tracked. This keeps your API keys, private paths, and personal plugins out of the public repo.

### Inspection permissions

The example preapproves ordinary Git/GitHub inspection, filesystem listing/metadata, and
`rg`/`grep` search. Git diff/log/show accept normal argument variations rather than a list
of exact spellings. Prefer dedicated Read/Grep/Glob tools for file contents and
`--no-ext-diff --no-textconv` for captured Git review evidence. Raw, non-writing hashing uses
`git hash-object --no-filters -- <file>`; it intentionally does not perform Git attribute or
line-ending conversion. Git configuration-value queries remain approval-gated because they may
expose secrets. These conveniences assume a trusted installed toolchain and repository setup.

Lint, typecheck/type-check, format, and test script families are allowed through pnpm, npm,
yarn, and bun, including suffixed script names such as `lint:fix`. Listed local lint/type
tools and formatters are also allowed; `npx` requires the listed `--no-install` forms.
Formatting and lint autofix may modify files. Snapshot updates, installs, unlisted scripts,
modifying Git operations, and delivery still require approval. Later rules keep Git output
files/external helpers and ripgrep preprocessors approval-gated.
`git grep` remains approval-gated because equivalent option spellings can launch pager
helpers; use `rg` or `grep` for ordinary shell search.

OpenCode evaluates parsed commands separately, so a chain of permitted inspections
may run unattended; a safe cmdlet inside a larger script does not approve the whole script.
Keep ordinary inspections as separate literal commands. Operator/expression patterns are
conservative fallback rules, not a shell sandbox; allowed scripts/tools execute trusted
project code and may use project configuration. Shell search is not governed by the dedicated
Read tool's secret-file deny rules. Sensitive config dumps and arbitrary interpreters are not
preapproved; agents must still honor secret and directory boundaries.
Reviewers retain their explicit read-only tool restrictions.

### Windows shell workaround

On OpenCode `1.18.35`, a reproduced PowerShell permission-scanning failure allows
`git diff --stat -p -- <path>` to execute even with an explicit `git diff*` deny, while the
same command without the standalone `--` is blocked. The pinned runtime's shell implementation
skips the Bash permission request when its parsed command scan has no patterns. The observed
shell/argument difference is consistent with that fail-open path; the exact AST was not dumped.

This setup uses Git Bash, where both forms were correctly blocked in the denial probe. It is
a workaround for the reproduced case, not a universal security guarantee. Keep Git's `--`
argument separator; do not remove it to evade the parsing issue. A small set of inspection
cmdlets is allowed through either `powershell` or `pwsh` with the fixed
`-NoProfile -NonInteractive -Command '<cmdlet> <literal arguments>'` form. For example:

```sh
powershell -NoProfile -NonInteractive -Command 'Test-Path README.md'
```

Use the exact listed form for Test-Path, Get-ChildItem, Get-Item, Get-Location, Select-String,
or Get-FileHash. Other invocation forms, expressions, and arbitrary PowerShell scripts still
require approval. This leaves Git Bash as the default and does not blanket-allow interpreters.

Source: [OpenCode v1.18.35 shell implementation](https://github.com/anomalyco/opencode/blob/v1.18.35/packages/opencode/src/tool/shell.ts).

## Core Capa Files

This tree shows the workflow's core files, not unrelated personal commands or skills.

```
opencode.example.json    — Agent definitions and config (template, no secrets)
AGENTS.md                — Global baseline instructions
README.md                — This file
commands/
├── plan.md              — /plan command
├── continue.md          — /continue command
├── review.md            — /review command
└── improve-ai.md        — /improve-ai retrospective entry point
prompts/capa/
├── orchestrator.md      — Orchestrator prompt
├── worker.md            — Bounded implementation worker
├── checker.md           — Optional read-only checker
├── review-standards.md   — Standards review axis
├── review-plan.md        — Plan conformance axis
└── references/
    └── specialist-reports.md — Shared report meanings, loaded when producing/interpreting reports
skills/
├── code-quality/        — Final-code Standards judgment and targeted design/correction guidance
├── coding-conventions/  — Language/framework convention router
├── conventional-commits/ — Lightweight guidance for suggested or authorized commit messages
├── planning/            — Design discussion, task breakdown, and disclosed plan format
├── review/              — Lazy scoped independent-review procedure and inputs
└── improve-ai/          — Read-only retrospective and authorized-change routing
```

## Complementary Tools

For the best experience, pair this workflow with:

- **Engram** — optional persistent memory across sessions. During Capa delegation, specialists return durable memory candidates and the orchestrator consolidates accepted outcomes after human review. Active progress stays in `PLAN.md`, not memory.
- **Context7 MCP** — gives AI agents real-time access to library and framework documentation.
- **Matt Pocock's skill-writing approach** — if you want to write your own skills, his composable skill pattern fits perfectly with this workflow.

`AGENTS.md` owns memory policy, including primary-session compaction recovery. Installed
adapters must not inject a competing save/search protocol or persist delegated outcomes before
human acceptance. The local `plugins/engram.ts` adapter retains operational session/user-prompt
capture, server startup, and import handling; semantic saves and context recovery remain with
Capa. It does not inject policy, reminders, project memory into compaction, or passive task-result
learnings. This personal adapter is ignored by Git and is not part of the public core install;
reconcile separately installed adapters deliberately rather than assuming the template changes them.

## License

MIT
