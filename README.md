# INGCapaDev AI Workflow

A lightweight, human-in-the-loop AI development workflow. Built around clear slices, focused evidence, handoff resilience, and two-axis review — because the human stays in control.

## The Story

This system is the result of a lot of trial and error. It's built directly on top of my engineered-ai-dev skill, which is the core workflow that has worked best for me time and time again — clarification, sliced planning, persistent handoff, and human review gates.

It takes inspiration from two incredible tools:

- **[Matt Pocock's composable skills](https://github.com/mattpocock/skills)** — his approach to writing clean, focused, progressive-disclosure skills changed how I think about skill design. Every skill in this repo follows that philosophy.
- **[Gentle AI by Alan Buscaglia](https://github.com/Gentleman-Programming/gentle-ai)** — the orchestrator pattern, fresh-context delegation, and Engram persistent memory concepts were foundational. The review lifecycle protocol and skill-resolution patterns came from studying Gentle AI's architecture.

My `engineered-ai-dev` skill was what helped me refine and perfect the workflow. This system took the best of both references — Matt's composability and Alan's orchestration — and evolved into something deeply personal to my workflow. It's not the most advanced system out there. It's probably not the best either. But it's what works best for **me**, and I'm sharing it because I believe it can help others — either to use directly or as a reference to build their own workflows.

## How It Works

The system has one primary agent (`ingcapa-dev-orchestrator`), four hidden specialists,
and native `explore` for read-only research:

| Specialist | Role |
|---|---|
| `explore` (native) | Read-only, non-delegating codebase investigation |
| `capa-worker` | Implement one approved slice without delegation |
| `sub-verify` | Optional read-only checker, requested explicitly |
| `sub-review-standards` | Review axis: documented rules and quality |
| `sub-review-plan` | Review axis: plan conformance |

Core development commands:

- `/plan` — Force structured planning with human approval gate
- `/continue [slice]` — Apply exactly one approved slice
- `/review <ref>` — Two-axis review from a fixed Git ref

Independent verification is opt-in through an explicit natural-language request to Capa;
there is no separate verification command. The current approval-gated `engineered-ai-dev`
lifecycle remains active; renaming the roles does not activate the future v3 task loop.

For a lightweight retrospective, use `/improve-ai [focus or examples]` or explicitly ask to
improve the AI workflow or learn from session feedback. Both reach the same lazy `improve-ai`
skill using available evidence, with uncertainty made clear and no-change as a valid outcome.
Discovery is read-only. Selecting a proposal alone does not authorize changes: after selection
and explicit implementation authorization, small understood corrections stay direct, while
substantial changes or unresolved meaningful design use the current `engineered-ai-dev` planning
workflow and its approval gates. Not every improvement needs a persisted plan; project-specific
changes stay local, and shared scope requires deliberate authorization.

Every delegation starts fresh. The orchestrator classifies work, resolves skills, delegates, and owns plan state. A successful Apply is ready for human diff review; only human acceptance marks a slice complete and advances the plan.

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
├── review-input.md      — Canonical committed /review input capture
├── worker.md            — Bounded implementation worker
├── checker.md           — Optional read-only checker
├── review-standards.md   — Standards review axis
└── review-plan.md        — Plan conformance axis
skills/
├── code-quality/        — Universal implementation harness
├── coding-conventions/  — Language/framework convention router
├── engineered-ai-dev/   — Core workflow (v2)
└── improve-ai/          — Read-only retrospective and authorized-change routing
```

## Complementary Tools

For the best experience, pair this workflow with:

- **Engram** — persistent memory across sessions. During Capa delegation, specialists return durable memory candidates and the orchestrator consolidates accepted outcomes after human review.
- **Context7 MCP** — gives AI agents real-time access to library and framework documentation.
- **Matt Pocock's skill-writing approach** — if you want to write your own skills, his composable skill pattern fits perfectly with this workflow.

## License

MIT
