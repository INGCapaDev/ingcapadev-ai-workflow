---
name: task-backlog
description: "Optional project backlog: use for /todo or natural-language requests to read, capture, update, link, or resolve deferred work; reconcile known linked TODOs after final human acceptance of their plan."
---

# Task Backlog

Maintain a human-readable, Git-shared backlog of deferred ideas, bugs, debt, improvements, and unresolved requirements. An item need not be implementation-ready. The consuming project owns its files; this skill owns backlog procedures, not planning or execution.

## 1. Locate and bound the request

Work in the active project, not this skill's installation directory. Respect its instructions and established backlog location/format; otherwise use repository-root `TODO.md`. Interpret `/todo` arguments and natural-language requests with the same behavior:

| Intent | Action |
| --- | --- |
| `/todo` or read | Show the local backlog; if absent, report that without creating files. |
| `add ...` | Capture explicitly requested deferred work. |
| `update ...` | Edit the identified item or child. |
| `link ...` | Associate the identified item with an existing plan. |
| `done ...` | Resolve the identified item or child and reconcile its remaining scope. |

Read the relevant backlog and target context before editing. Match the target by wording, links, and current context; clarify material ambiguity and wait. Bare `/todo` is read-only. Reading, linking, and marking backlog work done do not authorize implementation, plan approval, or acceptance of a plan candidate.

For add/update, check relevant existing entries and any known active plan for overlapping work. Reuse the existing item rather than duplicate it. If the work belongs in the active plan, explain that and use Capa's normal plan-update authorization instead of silently changing its scope. Follow normal planning rules when the human wants to plan an item; a backlog request alone does not create a `PLAN.md`.

**Complete when:** intent, project, target, overlap, and permitted edit scope are established; a read-only request has been answered without writes.

## 2. Capture or maintain useful context

For an explicit write request, edit only affected entries, preserving unrelated collaborators' edits and the project's language/format. Describe what remains and why, with useful source links and available context. Owner and priority are optional: retain stated or well-grounded importance in ordinary project language; never invent ownership or priority.

Keep small items inline in `TODO.md`. Group by module/domain and use nested checkboxes or independent related entries only when they help. No required schema, task IDs, timestamps, dependency graph, or checklist scaffolding.

Use a detail note only when extensive context, unresolved questions, or supporting references impair main-backlog readability. Respect existing conventions; otherwise use `todos/<domain>/<topic>.md`, omitting the domain level when unnecessary. Create only files/folders needed for actual context. Keep a concise relative link in the backlog; put available facts, motivation, open questions, and authoritative references in the note. Preserve uncertainty rather than fabricate decisions or an approved plan.

When linking, verify the plan exists and that the locator resolves from the backlog file. Record useful reminder, remaining scope, optional ownership, and the plan link. Preserve original requirement/source context in the authoritative plan before removing it from an entry or note. The plan alone owns requirements, design, decisions, slices, verification, and progress; do not mirror these in TODOs. An existing unapproved plan remains unapproved after linking.

**Complete when:** the scoped entry/context edits represent the requested pending work, useful links resolve relative to their files, and no unrelated work or competing plan state has been added.

## 3. Resolve and reconcile linked scope

Enter for explicit `done` intent, or after **final human acceptance** of a plan whose known backlog references are being reconciled. Automatic plan closure applies only if the project's backlog exists and already links to that plan; absent backlog or absent link means no backlog write. Intermediate slice acceptance, passing checks, implementation completion, and plan linking are not final acceptance. Explicit `done` can resolve backlog scope but never supplies missing plan acceptance.

Compare resolved scope with the item and related children. Remove a fully resolved standalone entry. For partial resolution, refocus the item on remaining work and retain needed links. A completed child can stay checked while siblings remain open when its result, references, or context are useful. Remove the parent/group only when all related work is resolved. Preserve useful context from resolved entries before removing them if remaining entries depend on it.

Before deleting a detail file, establish that it is exclusively owned obsolete context and check references from other live items, plans, and project documents, including alternate relative locators. A reference shared with any live owner retains the file. Inspect affected paths and ownership; never follow a backlog link into deleting external, unrelated, or uncertain files. Remove only resulting empty, exclusively owned detail folders, not the backlog file or project documentation by default. If reference coverage or ownership cannot be established, retain the file and disclose why.

Honor Capa's current destructive-operation authorization. Accepted completion permits scoped linked-item reconciliation, not blanket file deletion: delete context files/folders only with explicit applicable cleanup authorization; otherwise propose the exact cleanup and wait. Ask before destructive or ambiguous cleanup affecting unrelated files. This is a lightweight closure action, not another slice, workflow stage, synchronization engine, or completion archive; Git keeps history.

**Complete when:** resolved scope is reconciled, unresolved/related work and shared context are preserved, and any authorized file cleanup is limited to proven obsolete exclusive paths.

## 4. Check and hand off

Inspect the attributable diff for requested scope, preserved collaborators, accurate remaining work, and working links. Report changed entries/files, any retained context or cleanup needing authorization, and meaningful uncertainty. Do not claim runtime behavior or measured token/cost savings from static checks.

When working on another task, mention an out-of-scope backlog candidate only if it is genuinely useful and at risk of being forgotten, preferably in the normal handoff. Keep it a suggestion until explicit capture is requested; do not interrupt the current task just to ask or duplicate work already handled by its plan/slices. Ordinary projects without backlog intent or known linked closure keep their existing workflow and incur no backlog discovery or indexing.

**Complete when:** the human can see what changed, what remains, and any relevant limitations. Git operations, external trackers, and implementation remain outside backlog-write authorization.
