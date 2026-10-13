# INGCapaDev AI Workflow

A human-in-the-loop development workflow for [OpenCode](https://opencode.ai). Capa helps you understand the problem, agree on a plan, implement small changes, and assess the result. You decide what happens next.

**[Explore the workflow → ai.ingcapadev.com](https://ai.ingcapadev.com)**

## Requirements

- OpenCode and an authenticated provider with models available to your account.
- Bash: Git Bash on Windows, or an installed Bash shell on Linux/macOS.
- Optional: [Engram](https://github.com/Gentleman-Programming/engram) for persistent memory and [Context7 MCP](https://context7.com) for current library documentation. Configure them or disable their MCP entries.

## Quick Start

1. **Get the sources.** Cloning does not install the workflow:

   ```sh
   git clone https://github.com/INGCapaDev/ingcapadev-ai-workflow.git
   ```

2. **Back up and merge your OpenCode setup.** Install the following into `~/.config/opencode` (`%USERPROFILE%\.config\opencode` on Windows), preserving their relative paths:

   - [`AGENTS.md`](AGENTS.md): merge the baseline with your existing instructions.
   - The five core development commands in [`commands/`](commands/): `plan.md`, `proceed.md`, `review.md`, `reslice.md`, and `improve-ai.md`.
   - [`prompts/capa/`](prompts/capa/): all role prompts and their references.
   - These complete skill directories: [`planning`](skills/planning/), [`review`](skills/review/), [`improve-ai`](skills/improve-ai/), [`code-quality`](skills/code-quality/), [`coding-conventions`](skills/coding-conventions/), [`conventional-commits`](skills/conventional-commits/), and [`writing-for-agents`](skills/writing-for-agents/).

   Copy each skill's references and companion files, not just `SKILL.md`. Preserve personal commands, skills, plugins, and credentials. The repository's `PLAN.md` is work state, not an installation file. Use prompts, skills, and configuration from the same revision.

   **Optional backlog:** install [`skills/task-backlog/`](skills/task-backlog/) and [`commands/todo.md`](commands/todo.md) together, preserving those paths. No extra service, configuration entry, or project backlog file is required.

3. **Configure Capa.** For a new setup, use [`opencode.example.json`](opencode.example.json) as `opencode.json`. Otherwise merge its agent definitions and permissions into your existing config.

   Choose available `provider/model` IDs for every agent; the example's choices are not requirements. Set `shell` to your Bash executable and replace path/API-key placeholders. Preserve the Capa agent IDs, relative prompt paths, task allowlist, and specialist restrictions. The Google provider settings and Gemini authentication plugin are optional. See [configuration notes](docs/configuration.md) for shell, MCP, and permission details.

4. **Authenticate and configure optional tools.** Run:

   ```sh
   opencode auth login
   ```

   If enabled, install Engram so `engram mcp` is available and provide your Context7 API key. Otherwise set each unused MCP entry's `enabled` value to `false`.

5. **Run `opencode` from your project.** The example selects `ingcapa-dev-orchestrator` by default. Restart after changing configuration, prompts, or skills so the updated setup is loaded. Project instructions and conventions still apply.

Keep private configuration out of Git. The example is an installation template, not proof of your effective permissions or a security sandbox.

## Using the Workflow

For small, understood changes, ask Capa directly. A plan or delegated worker is not mandatory.

For work with meaningful decisions:

1. Use `/plan <request>` to investigate, discuss the design, and propose tasks.
2. Approve the final plan before it is saved. Plan approval alone does not authorize implementation.
3. Use `/proceed` to execute one task. Capa presents the change, its evidence, and limitations, then stops.
4. Inspect the candidate. Approval accepts it and stops; `/proceed` accepts an unchanged ready candidate and starts one next task. Request adjustments when needed.

| Command | Purpose |
| --- | --- |
| `/plan <request>` | Discuss design and propose an approval-gated plan |
| `/proceed` | Execute one planned task, then stop for your decision |
| `/review [ref]` | Read-only independent review of current work, or committed changes since a Git ref |
| `/reslice [focus]` | Compare alternative task groupings without changing the saved plan or code |
| `/improve-ai [focus]` | Inspect session evidence and propose workflow improvements without implementing them |

**Verification and review are different.** Focused checks or inspection establish behavior. Independent review assesses a frozen candidate from fresh Standards and/or Plan contexts, according to the review scope. Independent review is request-driven; human review remains the normal planned-task checkpoint.

Standalone review and selecting an improvement authorize no implementation. Task acceptance does not authorize commits, pushes, PRs, or deployment; authorize those operations separately. The workflow requires no automatic builds, test creation, or broad review loops.

### Optional Project Backlog

Use `/todo` to read deferred work, or ask in natural language. If no backlog exists, reading creates nothing. Explicitly capture or maintain items with requests such as:

```text
/todo add Revisit the availability label: it is confusing after partial delivery.
/todo update the availability label item with the affected screen reference
/todo link the availability label item to docs/ai/availability-label/PLAN.md
/todo done the availability label item
```

The link example assumes the plan already exists; linking does not approve it or authorize implementation. Small items stay inline in the project's `TODO.md`; extensive context may justify a linked note under `todos/`. Existing project formats, optional priorities/owners, and unrelated entries are preserved.

`PLAN.md` remains the authority for planned work. After final human acceptance of a known linked plan, Capa reconciles its TODO scope: remaining work and shared context stay intact, and context-file deletion requires applicable explicit cleanup authorization. Useful out-of-scope discoveries are suggestions, not automatic captures. Projects that do not opt in keep their existing workflow.

The [task-backlog skill](skills/task-backlog/SKILL.md) owns the full procedure. Companion website presentation guidance lives with the landing project at `docs/task-backlog-landing.md`.

To adopt the backlog in a project — including for coworkers without this workflow — run `/todo setup`. It vendors the skill into the project's own skills directory (`.agents/skills/` by default), adds a plain-OpenCode `/todo` entrypoint where applicable, and scaffolds a starter `TODO.md`, adopting existing entries. Setup is idempotent: reruns change nothing unless files drifted. Teammates on Gemini, Codex, Claude, or plain OpenCode use it through their own setup with nothing extra installed. It offers (never applies) a one-line pointer for the project's agent instructions.

## Customize and Understand the System

- [`AGENTS.md`](AGENTS.md) owns the baseline, skill routing, and memory policy.
- [`opencode.example.json`](opencode.example.json) defines Capa and its specialists: a bounded worker, an optional checker, two review axes, and native `explore` for investigation. [`prompts/capa/orchestrator.md`](prompts/capa/orchestrator.md) owns execution and human transitions.
- [`skills/planning/`](skills/planning/), [`skills/review/`](skills/review/), and [`skills/improve-ai/`](skills/improve-ai/) own their procedures. [`docs/configuration.md`](docs/configuration.md) explains setup and permission boundaries.
- [`skills/pr/`](skills/pr/) is an optional complementary skill for concise PR bodies; copy its full directory if you want it.

One `PLAN.md` records scope, decisions, evidence, and progress. Git owns the actual code. When enabled, Engram stores accepted reusable knowledge rather than duplicating the plan. Read-only roles are workflow constraints, not a sandbox; trusted shell tools and project scripts can still have side effects.

## Credits

- [Matt Pocock / AI Hero](https://github.com/mattpocock/skills): composable skills and agent-facing authoring.
- [Alan Buscaglia / Gentleman Programming](https://github.com/Gentleman-Programming/gentle-ai): orchestration, fresh-context delegation, and memory patterns.
- [Dex Horthy / HumanLayer](https://github.com/humanlayer/skills): the PR skill's visual-summary guidance. See its [provenance](skills/pr/CREDITS.md).

## License

MIT
