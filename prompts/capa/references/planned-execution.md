# Planned execution and resume

Parent Capa procedure for an approved plan. The orchestrator owns routing, delegation, assurance,
and authorization; this reference owns their planned-task sequence. Use the current approved
locator, not an assumed root `PLAN.md`. Plan location, schema, and scoped context follow the
planning skill and its format reference; missing or conflicting sources require reconciliation.

Locators are installation-relative; resolve them with the orchestrator's capability rules, not
against the application cwd.

## Execute one planned task

1. **Reconcile:** Read the active plan and needed references. Confirm authorization, current
   task, approved scope/acceptance/seam/recovery, worktree, and evidence. Preserve earlier
   accepted work and unrelated changes. Capture the pre-task index/final contents, new-path
   inventory, and attribution for current-task review; HEAD alone is insufficient on a dirty
   worktree. Do not mutate while ownership or plan/code/evidence conflicts remain.

2. **Implement and prove:** Implement inline or with bounded writers under the delegation rules;
   Capa owns integration and evidence for the slice. Follow dependencies and pause at agreed
   diff previews without changing status or treating feedback as acceptance, then resume the
   same slice. Apply the smallest-adequate-evidence gate, including inspection or flow tracing
   when sufficient and targeted execution when needed. New tests stay human-requested or
   project-required; routine builds, blanket suites, and extra checker calls are not default
   proof.

3. **Independent review when approved:** Human diff review is the normal checkpoint. Once
   review is requested or approved, pause writers and invoke `skills/review/SKILL.md` to select
   axes and freeze the actual current-task candidate with relevant context, decisions, and
   functional/recovery evidence. Keep findings and coverage separate; reviewers receive no
   writer reasoning or each other's findings. Otherwise disclose omitted coverage without
   inventing a passing review. Earlier accepted dirty work is context, not task delta; a skipped
   axis is not a PASS.

4. **Triage and correct when warranted:** Evaluate evidence-backed findings. Capa may authorize
   one focused correction pass for clear defects within agreed behavior, interfaces, ownership,
   and scope, directly or through a worker. Optional style, disputed findings, material
   API/domain/ownership choices, scope changes, and consequential operations go to the human. A
   clean candidate needs no correction pass.

5. **Validate the correction:** Run affected checks and confirm the accepted findings were
   addressed, reusing valid unchanged evidence. A subtle correction may justify scoped read-only
   validation of the findings or delta, not a second broad review or an extra checker. Distinguish
   the reviewed candidate from corrected code; correction validation is not re-review. Further
   material issues return to the human.

6. **Reconcile and present:** Inspect the complete attributable diff, scope, companions,
   exclusions, acceptance, evidence, and recovery. Show the final diff, decisions, checks and
   results, separate findings/dispositions, corrections, reused evidence, and limitations. Record
   milestone evidence and status in the plan, not every tool call. Mark `ready-for-review` only
   when the final candidate is HUMAN-ready after verification, requested or approved review, and
   correction checks. Stop for the human after every planned task, including those needing no
   independent review. Useful incomplete work stays `pending` with a concrete blocker. Missing
   proof or review, stale candidates, and unresolved material issues never become PASS or
   readiness.

## Human transitions

`skills/planning/references/plan-format.md` owns schema, statuses, and evidence. Capa writes
implementation milestones; `complete` requires explicit human acceptance.

- Approval-only of the presented candidate accepts it and stops.
- Explicit `/proceed` after the unchanged HUMAN-ready candidate accepts it and starts exactly one
  task; explicit approval plus continuation does the same.
- Adjustments stay `pending` with affected proof. Material changes to design, scope, seam, or
  recovery need agreement before mutation.
- Delivery and destructive-operation authorization stays with AGENTS; plan approval or
  commit-sized grouping is not permission.

After final acceptance of all slices, if context already identifies a project backlog linked to
the plan and `task-backlog` is installed, load it for scoped linked-item reconciliation.
Otherwise stop without backlog discovery. The skill owns cleanup authorization; this adds no
stage.

## Resume and recovery

Read one unambiguous plan and needed references, check actual code and candidate-specific
evidence, and preserve partial or accepted work. Fetch memory only for real prior-context
signals under AGENTS; memory is not plan authority. Reuse valid evidence and avoid rereading
unchanged corpora. If evidence is missing or stale, identify the affected candidate or check and
gather read-only proof when safe; keep readiness blocked.

If plan, worktree, or ownership disagrees, preserve patch and evidence, identify attributable
paths, classify recovery as coherent, incomplete, unsafe, or unknown, and ask the concrete
conflict decision with approved options. No ritual menu, automatic reset or revert, or relaunch.
Resume mutation only after reconciliation or explicit recovery authorization.
