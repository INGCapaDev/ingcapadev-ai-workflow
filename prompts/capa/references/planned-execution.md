# Planned execution and resume

Parent Capa procedure for an approved plan. The orchestrator owns routing, delegation,
assurance, and authorization gates; this disclosed reference owns their planned-task sequence.
Use the current approved locator, not an assumed root `PLAN.md`. Plan location/schema and
optional scoped context follow the planning skill and its format reference. Missing or
conflicting sources require reconciliation, not invented requirements.

Skill/document locators below are installation-relative; resolve them with the orchestrator's
capability rules, not against the application cwd.

## Execute one planned task

1. **Reconcile:** read the unambiguous active plan and needed references. Confirm execution
   authorization, current task, approved scope/acceptance/seam/recovery, actual worktree and
   evidence. Preserve earlier accepted work and unrelated changes. Capture enough actual
   pre-task index/final contents, relevant new-path inventory, and attribution for current-task
   review; HEAD alone is insufficient on a dirty worktree. Do not mutate while ownership or
   plan/code/evidence conflicts remain unresolved.
2. **Implement and prove:** implement inline or with bounded writers under the delegation rules.
   Capa owns integration and evidence for the whole current slice. Apply the orchestrator's
   smallest-adequate-evidence gate, including inspection/flow tracing when sufficient and
   targeted execution when needed. New tests are only human-requested/project-required;
   follow AGENTS for high-risk test recommendations. Reuse applicable unchanged passing
   checks. Routine builds, blanket suites, and extra checker calls are not default proof.
3. **Independent review when approved:** human diff review is the normal checkpoint. Apply
   the orchestrator's request/approval gate. Once requested or approved, pause all writers and
   invoke `skills/review/SKILL.md` to select necessary axes and freeze the actual current-task
   candidate with relevant context, decisions, and functional/recovery evidence. Keep findings
   and coverage separate; reviewers receive no writer reasoning or each other's findings.
   Otherwise disclose relevant omitted coverage without inventing a passing review. Reuse
   current applicable evidence, distinguishing functional checks from independent judgment.
   Earlier accepted dirty work is context, not task delta; a skipped axis is not a PASS.
4. **Triage and correct when warranted:** evaluate evidence-backed meaningful findings. Capa
   may authorize at most one focused correction pass for clear defects within agreed behavior,
   interfaces, ownership, and scope, by the same worker or itself. Optional stylistic alternatives,
   disputed findings, material API/domain/ownership choices, scope changes, and consequential
   operations go to the human. No finding quota: a clean candidate needs no correction pass.
5. **Validate the correction:** run affected functional checks and confirm the accepted findings
   were addressed; reuse valid unchanged passing evidence. A subtle correction may justify scoped
   read-only validation of the accepted findings/delta, not a second broad review/fix loop or an
   extra checker by default. Distinguish the originally reviewed candidate from corrected code;
   correction validation is not implied re-review. Further material issues return to the human.
6. **Reconcile and present:** inspect the complete attributable diff, scope/companions/exclusions,
   acceptance, evidence, and recovery. Show the final diff, important decisions, checks/methods
   and results, separate findings/dispositions, corrections, reused evidence, and limitations.
   Record milestone evidence/status in the plan using its format, not every tool call. Mark
   `ready-for-review` only when the final candidate is HUMAN-ready after applicable verification,
   requested/approved review, and correction/checks. Stop for the human after every planned task,
   including tasks needing no independent review. Useful incomplete work stays `pending` with
   a concrete blocker. Missing required proof/review, stale candidates, or unresolved material
   issues never become fabricated PASS or readiness.

## Human transitions

`skills/planning/references/plan-format.md` owns schema, statuses, and evidence. Capa writes
implementation-time milestones; `complete` requires explicit human acceptance.

- Approval-only of the presented candidate accepts it and stops.
- Explicit `/continue` after presentation of the unchanged HUMAN-ready candidate accepts it
  and starts exactly one next task. Explicit approval plus continuation does the same.
- Adjustments stay on the current task as `pending`, with affected proof. Material changes
  to design, scope, seam, or recovery require agreement before mutation.
- The orchestrator's delivery/destructive-operation authorization applies; plan approval or
  commit-sized grouping is not permission for those operations.

## Resume and recovery

Read one unambiguous active plan and needed references, check actual code and candidate-specific
evidence, and preserve partial/accepted work. Fetch memory only for real prior-context signals
under AGENTS; latest memory is not plan authority. Reuse valid evidence and avoid rereading
unchanged corpora. If evidence is missing or stale, identify the affected candidate/check and
gather missing read-only proof when safe; keep readiness blocked.

If plan/worktree/ownership disagrees, preserve patch and evidence, identify attributable paths,
classify recovery as coherent, incomplete, unsafe, or unknown, and ask the concrete conflict
decision with approved recovery options. No ritual recovery menu, automatic reset/revert, or
relaunch. Resume mutation only after reconciliation or explicit recovery authorization.
