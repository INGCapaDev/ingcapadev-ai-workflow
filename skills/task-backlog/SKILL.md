---
name: task-backlog
description: "Optional project backlog: use for /todo or natural-language requests to read, capture, update, link, resolve, or set up deferred work; reconcile known linked TODOs after final human acceptance of their plan."
---

# Task Backlog

Maintain a human-readable, Git-shared backlog of deferred ideas, bugs, debt, improvements, and
unresolved requirements. Items need not be implementation-ready. The project owns its files; this
skill owns backlog procedures, not planning or execution.

## 1. Locate and bound the request

Work in the active project, not this skill's installation directory. Respect its instructions and
established backlog location/format; otherwise use repository-root `TODO.md`. Interpret `/todo`
arguments and natural-language requests the same way:

| Intent | Action |
| --- | --- |
| `/todo` or read | Show the local backlog; if absent, report that without creating files. |
| `add ...` | Capture explicitly requested deferred work. |
| `update ...` | Edit the identified item or child. |
| `link ...` | Associate the identified item with an existing plan. |
| `done ...` | Resolve the identified item or child and reconcile its remaining scope. |
| `setup` | Read [setup](references/setup.md) and follow it; it vendors the system into the project and is safe to rerun. |

Read the relevant backlog and target context before editing. Match the target by wording, links,
and current context; clarify material ambiguity and wait. Bare `/todo` is read-only. Reading,
linking, and marking done authorize no implementation, plan approval, or acceptance.

For add or update, check relevant entries and any known active plan for overlap; reuse the
existing item rather than duplicate it. If the work belongs in the active plan, explain and use
the project's plan-update authorization instead of changing its scope. Apply normal planning
rules when the human wants to plan an item; a backlog request alone creates no `PLAN.md`.

**Complete when:** intent, project, target, overlap, and permitted edit scope are established; a
read-only request is answered without writes.

## 2. Capture or maintain useful context

For an explicit write request, edit only affected entries, preserving unrelated collaborators'
edits and the project's language and format. Describe what remains and why, with useful source
links and available context. Owner and priority are optional: retain stated or well-grounded
importance in ordinary language; never invent them.

Keep small items inline in `TODO.md`; group by module or domain, using nested checkboxes or
related entries only when they help. No required schema, task IDs, timestamps, dependency graph,
or checklist scaffolding.

Use a detail note only when extensive context, open questions, or references impair main-backlog
readability. Respect existing conventions; otherwise `todos/<domain>/<topic>.md`, omitting the
domain level when unnecessary. Create only files needed for actual context. Keep a concise
relative link in the backlog; put facts, motivation, open questions, and authoritative references
in the note. Preserve uncertainty rather than fabricate decisions or an approved plan.

When linking, verify the plan exists and the locator resolves from the backlog file. Record the
useful reminder, remaining scope, optional ownership, and plan link. Preserve original
requirements in the authoritative plan before removing them from an entry. The plan alone owns
requirements, design, decisions, slices, verification, and progress; do not mirror them. An
unapproved plan remains unapproved after linking.

**Complete when:** scoped edits represent the requested pending work, links resolve, and no
unrelated work or competing plan state was added.

## 3. Resolve and reconcile linked scope

Enter for explicit `done`, or after **final human acceptance** of a plan whose known backlog
references are being reconciled. Automatic closure applies only if the project's backlog exists
and already links to that plan; otherwise no backlog write. Intermediate slice acceptance,
passing checks, implementation completion, and plan linking are not final acceptance. Explicit
`done` resolves backlog scope but never supplies missing plan acceptance.

Compare resolved scope with the item and related children. Remove a fully resolved standalone
entry. For partial resolution, refocus on remaining work and retain needed links. A completed
child may stay checked while siblings remain open when its result or references are useful.
Remove a parent group only when all related work is resolved.

Before deleting a detail file, establish that it is exclusively owned obsolete context and check
references from other live items, plans, and project documents, including alternate locators. A
reference shared with any live owner retains the file. Inspect affected paths; never follow a
backlog link into deleting external, unrelated, or uncertain files. Remove only resulting empty,
exclusively owned detail folders, not the backlog file or project documentation. If ownership or
coverage cannot be established, retain the file and disclose why.

Honor current destructive-operation authorization (ask when in doubt). Accepted completion
permits scoped linked-item reconciliation, not blanket deletion: delete context files only with
explicit cleanup authorization; otherwise propose the exact cleanup and wait. Ask before
destructive or ambiguous cleanup affecting unrelated files. This is a lightweight closure
action, not another slice, workflow stage, synchronization engine, or completion archive; Git
keeps history.

**Complete when:** resolved scope is reconciled, unresolved and related work is preserved, and
authorized cleanup is limited to proven obsolete exclusive paths.

## 4. Check and hand off

Inspect the attributable diff for requested scope, preserved collaborators, accurate remaining
work, and working links. Report changed entries and files, retained context or cleanup needing
authorization, and meaningful uncertainty. Do not claim runtime behavior or measured savings from
static checks.

On another task, mention an out-of-scope backlog candidate only if genuinely useful and at risk
of being forgotten, preferably in the normal handoff; keep it a suggestion until capture is
requested, and do not interrupt the task to ask or duplicate work already in its plan. Projects
without backlog intent or known linked closure incur no backlog discovery.

**Complete when:** the human can see what changed, what remains, and any relevant limitations.
Git operations, external trackers, and implementation remain outside backlog-write
authorization.
