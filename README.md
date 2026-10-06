# INGCapaDev AI Workflow

A lightweight, human-in-the-loop AI development workflow. Built around collaborative design, small tasks, focused evidence, resilient plans, and two-axis review — because the human stays in control.

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
| `capa-worker` | Implement one approved slice without delegation |
| `sub-verify` | Optional read-only checker, requested explicitly |
| `sub-review-standards` | Review axis: documented rules and quality |
| `sub-review-plan` | Review axis: plan conformance |

Core development commands:

- `/plan` — Discuss design, propose small work units, and persist one plan only after final approval
- `/continue` — Follow the current approved plan through one task, then stop for human review
- `/review [ref]` — Read-only independent review of current work, or committed changes since a fixed Git ref

Tiny understood work stays direct, without a mandatory plan, worker, or review. Medium direct
work uses review when worthwhile; material decisions, multiple outcomes, risk, or recoverable
work call for planning. Inline versus delegated execution is a separate choice: delegation
needs a concrete benefit and one writer. Independent checking is optional, requested explicitly
or approved for a concrete evidence gap; there is no separate verification command.

`/review` without arguments includes staged, unstaged, and relevant new source work.
`/review <ref>` selects committed branch changes since the validated fixed point; explicit
natural-language requests may select another scope. Both entry paths load the lazy `review`
skill, which freezes the candidate for fresh independent Standards and Plan contexts. Reports
keep findings and coverage separate; without an approved plan, Standards can run and Plan
reports `no plan available`. Standalone review does not fix code, accept tasks, commit, or
update progress. Supplied task candidates use their actual pre-task delta, not earlier accepted
uncommitted work.

Each planned task receives meaningful functional verification and fresh parallel Standards/Plan
review of the same frozen task candidate. Capa may authorize at most one focused correction pass
for clear meaningful in-scope findings, followed by affected checks. Material design changes,
disputed findings, and optional alternatives return to the human. Corrections are disclosed as
changes to the reviewed candidate, not implied re-review; no automatic second broad loop runs.
New tests are only explicitly requested or project-required, and valid unchanged checks are reused.

For a lightweight retrospective, use `/improve-ai [focus or examples]` or explicitly ask to
improve the AI workflow or learn from session feedback. Both reach the same lazy `improve-ai`
skill using available evidence, with uncertainty made clear and no-change as a valid outcome.
Discovery is read-only. Selecting a proposal alone does not authorize changes: after selection
and explicit implementation authorization, small understood corrections stay direct, while
substantial changes or unresolved meaningful design use the `planning` skill and its approval
gates. Not every improvement needs a persisted plan; project-specific
changes stay local, and shared scope requires deliberate authorization.

Reviewers always start fresh; worker context may be reused for an accepted correction. Capa owns
plan state, memory, and human transitions. One `PLAN.md` records active scope/design/evidence/progress;
Git owns code reality and Engram stores accepted reusable knowledge not better owned in the repo.
Implementation uses the thin AGENTS baseline and task-critical rules; Standards loads the full
applicable quality/convention guidance. Explicit project conventions remain binding in both roles.

`pending -> ready-for-review -> complete` distinguishes unfinished work, a final HUMAN-ready
candidate after applicable checks/review/correction, and explicit human acceptance. Capa presents
the final diff, decisions, findings/dispositions, correction checks, and limitations, then stops.
Approval-only accepts and stops; `/continue` after presentation of the unchanged ready candidate
accepts it and starts exactly one next task. Adjustments remain on the current task. Missing proof,
stale evidence, or unresolved material problems block readiness. Resume preserves partial/accepted
work and reconciles the active plan with actual code; it does not reset or treat memory as authority.
Planning or acceptance never authorizes automatic commits, delivery, or destructive operations.

## Requirements

- [OpenCode](https://opencode.ai) — the AI coding platform this workflow runs on
- [Engram](https://github.com/gentleman-Programming/engram) — persistent memory across sessions
- [Context7 MCP](https://context7.com) — real-time library/framework context (recommended for better results)

## Quick Start

1. Place the contents of this repo in your OpenCode config directory.
2. Copy `opencode.example.json` → `opencode.json` and fill in your API keys and paths.
3. Start a conversation and use `/plan` for structured work.

> The real `opencode.json` is gitignored — only `opencode.example.json` is tracked. This keeps your API keys, private paths, and personal plugins out of the public repo.

## Project Structure

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
├── result-contract.md   — Specialist result communication
├── worker.md            — Bounded implementation worker
├── checker.md           — Optional read-only checker
├── review-standards.md   — Standards review axis
└── review-plan.md        — Plan conformance axis
skills/
├── code-quality/        — Final-code Standards judgment and targeted design/correction guidance
├── coding-conventions/  — Language/framework convention router
├── engineered-ai-dev/   — Legacy handoff support only (not active routing)
├── planning/            — Design discussion, task breakdown, and disclosed plan format
├── review/              — Lazy scoped independent-review procedure and inputs
└── improve-ai/          — Read-only retrospective and authorized-change routing
```

## Complementary Tools

For the best experience, pair this workflow with:

- **Engram** — persistent memory across sessions. During Capa delegation, specialists return durable memory candidates and the orchestrator consolidates accepted outcomes after human review.
- **Context7 MCP** — gives AI agents real-time access to library and framework documentation.
- **Matt Pocock's skill-writing approach** — if you want to write your own skills, his composable skill pattern fits perfectly with this workflow.

## License

MIT
