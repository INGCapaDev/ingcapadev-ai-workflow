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

   Copy each skill's references and companion files, not just `SKILL.md`. Preserve personal commands, skills, plugins, and credentials. Never copy a `PLAN.md` — those are per-project work notes, not install files. Use prompts, skills, and configuration from the same revision.

   **Optional backlog:** install [`skills/task-backlog/`](skills/task-backlog/) and [`commands/todo.md`](commands/todo.md) together, preserving those paths. No extra service, configuration entry, or project backlog file is required.

3. **Configure Capa.** For a new setup, use [`opencode.example.json`](opencode.example.json) as `opencode.json`. Otherwise merge its agent definitions and permissions into your existing config.

   Choose available `provider/model` IDs for every agent; the example's choices are not requirements. Set `shell` to your Bash executable and replace path/API-key placeholders. Keep Capa's agent setup intact — don't rename agents or loosen approvals without reading the [configuration notes](docs/configuration.md) first. The Google provider settings and Gemini authentication plugin are optional.

4. **Authenticate and configure optional tools.** Run:

   ```sh
   opencode auth login
   ```

   If enabled, install Engram so `engram mcp` is available and provide your Context7 API key. Otherwise set each unused MCP entry's `enabled` value to `false`.

5. **Run `opencode` from your project.** The example selects `ingcapa-dev-orchestrator` by default. Restart after changing configuration, prompts, or skills so the updated setup is loaded. Project instructions and conventions still apply.

Keep private configuration out of Git. The example is an installation template, not proof of your effective permissions or a security sandbox.

## Using the Workflow

For small, understood changes, ask Capa directly. You don't need a plan or extra help for those.

For work with meaningful decisions:

1. Use `/plan <request>` to investigate, discuss the design, and propose tasks.
2. Approve the final plan before it is saved. Plan approval alone does not authorize implementation.
3. Use `/proceed` to execute one task. Capa presents the change, its evidence, and limitations, then stops.
4. Inspect the candidate. Approval accepts it and stops; `/proceed` accepts an unchanged ready candidate and starts one next task. Request adjustments when needed.

| Command | Purpose |
| --- | --- |
| `/plan <request>` | Discuss design and propose an approval-gated plan |
| `/proceed` | Execute one planned task, then stop for your decision |
| `/review [ref]` | Read-only second opinion on current work, or changes since a commit |
| `/reslice [focus]` | Compare alternative task groupings without changing the saved plan or code |
| `/improve-ai [focus]` | Inspect session evidence and propose workflow improvements without implementing them |

**Verification and review are different.** Checks and inspection show the change works. `/review` gives a second opinion from a fresh perspective, against quality standards, your plan, or both. Either way, you inspect the result before anything is accepted — that checkpoint is always yours.

`/review` only reports — it changes nothing. Accepting a task never commits, pushes, or deploys it; those need your separate go-ahead. Nothing here runs builds, creates tests, or loops on its own.

### Optional Project Backlog

Use `/todo` to read deferred work, or ask in natural language. If no backlog exists, reading creates nothing. Explicitly capture or maintain items with requests such as:

```text
/todo add Revisit the availability label: it is confusing after partial delivery.
/todo update the availability label item with the affected screen reference
/todo link the availability label item to docs/ai/availability-label/PLAN.md
/todo done the availability label item
```

The link example assumes the plan already exists; linking does not approve it or authorize implementation. Small items stay inline in the project's `TODO.md`; extensive context may justify a linked note under `todos/`. Existing project formats, optional priorities/owners, and unrelated entries are preserved.

`PLAN.md` remains the authority for planned work. When you accept a finished plan, its linked backlog items get cleaned up; anything unfinished stays, along with shared context. Deleting backlog files always needs your explicit say-so. Ideas spotted along the way are offered as suggestions, never captured automatically. Projects that skip the backlog work exactly as before.

The [task-backlog skill](skills/task-backlog/SKILL.md) has the full procedure.

To adopt the backlog in a project — including for coworkers without this workflow — run `/todo setup`. It copies the backlog assistant into the project (`.agents/skills/` by default), adds a plain-OpenCode `/todo` entrypoint where applicable, and scaffolds a starter `TODO.md`, keeping any existing entries. Reruns change nothing unless files drifted. Teammates on Gemini, Codex, Claude, or plain OpenCode use it through their own setup with nothing extra installed. It offers (never applies) a one-line pointer for the project's agent instructions.

## Customize and Understand the System

- [`AGENTS.md`](AGENTS.md): the baseline rules — how Capa works, which skills load when, and how memory is handled.
- [`opencode.example.json`](opencode.example.json): Capa and its helpers, prompts included ([`prompts/capa/orchestrator.md`](prompts/capa/orchestrator.md)). Start from the example, then make it yours.
- [`skills/planning/`](skills/planning/), [`skills/review/`](skills/review/), and [`skills/improve-ai/`](skills/improve-ai/): how planning, review, and self-improvement work. [`docs/configuration.md`](docs/configuration.md) covers setup details and permission boundaries.
- [`skills/pr/`](skills/pr/) is an optional helper for concise PR descriptions; copy the whole directory to install it.

Your plan lives in `PLAN.md`; Git holds the code. When enabled, Engram remembers accepted decisions across sessions instead of duplicating the plan.

## Credits

- [Matt Pocock / AI Hero](https://github.com/mattpocock/skills): composable skills and agent-facing authoring.
- [Alan Buscaglia / Gentleman Programming](https://github.com/Gentleman-Programming/gentle-ai): orchestration, fresh-context delegation, and memory patterns.
- [Dex Horthy / HumanLayer](https://github.com/humanlayer/skills): the PR skill's visual-summary guidance. See its [provenance](skills/pr/CREDITS.md).

## License

MIT
