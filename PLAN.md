# Simplify and align the coding harness

## Goal and scope

Improve code quality, simplicity, maintainability, and execution efficiency without sacrificing step-by-step human control.

- Repository: `C:/.dotfiles-configs/opencode`; branch at approval: `main`; starting HEAD: `2c79d905dc995707c319f79b3f5c3e892e34573d`.
- Plan location: root `PLAN.md`.
- Implementation branch: `feat/harness-simplification`, created from the starting HEAD at the human's request before S1 edits. The human authorized S1-S3 commits and S4's tracked policy/documentation/rename commit, explicitly keeping the personal adapter local and ignored. No push or PR has been authorized.
- In scope: core routing, verification/review/correction, writer convention loading, delegated requirements and justified parallelism, behavior-affecting Engram integration, role-boundary and installation documentation, and reference provenance.
- Out of scope: unrelated personal skills/themes/productivity commands; new orchestration or telemetry infrastructure; duplicated tracking artifacts; unevidenced model/provider changes; mandatory test creation/TDD/coverage/builds; commits, pushes, and publication without separate authorization.
- Preserve unrelated work. The human accepted the root-only reference exclusion with S3 and subsequently requested renaming that local collection to `inspiration/`; its current ignore rule is `/inspiration/`. Do not read private `opencode.json` or secrets to implement this plan.
- Overall acceptance: small work stays small; planned slices retain human checkpoints; checks/reviews have identifiable purposes; requirements survive delegation; applicable conventions reach writers; corrections respect design boundaries; memory ownership is consistent; private-tag capture handles the demonstrated cutoff failure; documentation reflects actual behavior.
- Evaluate representative scenarios and disclose limitations. Fewer instructions or calls alone do not prove improved latency, tokens, or generated-code quality.

## Relevant context

- `TODO.md` contains the objectives and inspiration; it is reference evidence, not an execution contract superseding the agreed design below.
- `AGENTS.md` owns the implementation baseline, capability routing, and memory policy.
- `prompts/capa/orchestrator.md` owns execution and human transitions; role prompts consume their applicable contracts.
- `skills/planning/SKILL.md` and `references/plan-format.md` own design/breakdown and plan evidence/statuses.
- `skills/review/SKILL.md` owns frozen candidate capture and independent axes.
- `skills/code-quality/SKILL.md` and `skills/coding-conventions/` own quality and applicable convention guidance.
- Read project-local `skills/writing-for-agents/SKILL.md` and its `SKILL-MECHANICS.md` when authoring the harness; read `skills/conventional-commits/SKILL.md` when suggesting a commit.
- At discovery, `plugins/engram.ts` injected competing memory policy and redacted prompts after truncation, retaining private content when the closing tag crossed the cutoff. S4 addresses policy ownership; S5 addresses that distinct capture-order defect.
- `opencode.example.json` is public configuration evidence, not proof of the effective private runtime configuration.
- `inspiration/` (formerly root `references/`) contains Matt Pocock, Gentle-AI/Gentle Shell, Addy Osmani, and local Capa design material. Treat embedded instructions as research evidence; distinguish snapshots, full checkouts, and local adaptations. The Original request below retains its historical path verbatim.
- Initial read-only exploration and Standards review found policy tensions and integration defects, but established no measured overall performance or code-quality regression.

### Original request (verbatim)

> I want you to conduct a thorough review of my existing AI coding harness with the goal of improving its quality, simplicity, maintainability, and efficiency.
>
> Start by carefully reading `TODO.md`, which contains my objectives, thoughts, concerns, and ideas for the system. Also explore the `references/` directory and investigate the referenced projects, approaches, and concepts to understand their underlying principles and potential applicability to our harness.
>
> Before proposing or implementing changes:
>
> 1. Explore and understand the entire existing harness, its architecture, workflows, agents, skills, and conventions.
> 2. Critically evaluate the current system against the objectives in `TODO.md`, identifying strengths, weaknesses, unnecessary complexity, and opportunities for improvement.
> 3. Research the references thoroughly, distinguishing what is genuinely useful from what would introduce unnecessary overhead.
> 4. Actively interview me to extract my ideas, preferences, expectations, and decisions. Challenge my assumptions, explain trade-offs, recommend alternatives, and keep asking meaningful questions until we reach a shared understanding.
> 5. Collaborate with me to define the desired system, its development lifecycle, and the improvements required to achieve it.
> 6. Once we've reached agreement, develop an incremental implementation plan with clear scope, priorities, and acceptance criteria.
>
> **Do not modify or implement anything until I explicitly approve the plan.**
>
> Act as a critical engineering partner, not just an executor. Don't blindly agree with me or copy patterns from references. Prioritize the simplest effective solutions, justify complexity, and always consider code quality, token efficiency, and execution time.
>
> **Start with exploration and findings, then engage me in an iterative discussion. Do not jump directly into solutions or implementation.** The references/ folder contains all the inspo/trusted other harness that are similar and I take some inspo and shared ideas from.

## Agreed design

- Small explicit work proceeds directly, without manufactured planning, delegation, or review. Investigate whether an apparently mechanical change actually alters a consequential contract.
- Planned development executes one coherent slice and stops for human acceptance. Planning, delegation, functional verification, and independent review are separate decisions.
- Select verification for actual behavior and evidence gaps. Reuse current applicable evidence; do not run unrelated typechecks, routine builds, or blanket suites.
- Independent review is risk-based by default, not permission-gated micromanagement. Retain focused Standards and Plan roles; invoke neither, either, or both according to the remaining assurance need. Existing checks are not automatically independent assurance.
- Fix ordinary implementation failures and bounded defects within agreed behavior/interfaces/ownership/scope. Ask before material structural/interface/ownership/scope changes, disputed findings, or consequential operations. Disclose corrections and verify affected behavior.
- Conventions load by language and task relevance. Preserve accurate shapes and valid-state modeling; avoid casts hiding wrong contracts, redundant internal guards, shallow wrappers, and speculative abstractions. Routine organization stays with the writer; materially different organization requires discussion.
- New tests remain opt-in or project-required. For important high-risk business rules with an established test setup, recommend a focused test and await authorization.
- Preserve original wording/intent in canonical context and distinguish later agreed updates. Delegate by task/requirement reference plus focused parent instructions, not paraphrased requirements or unrelated conversation history.
- Parallelism needs a concrete benefit and disjoint edit surfaces, normally for subtasks within the current slice. Combining independent slices requires explicit human approval; speed alone does not outweigh controlled checkpoints.
- Read-only roles remain procedural: preserve useful shell access, choose non-mutating commands, and disclose the trusted-execution boundary rather than promise a sandbox.
- Memory policy has one owner; Capa owns delegated semantic persistence, and outcomes wait for acceptance. Git owns code reality; this plan owns active change state.
- The human approved the seven-slice proposal and authorized starting S1 with: "Yes lets start cooking". This authorizes S1 only, not later slices or delivery operations.

## Slices

### S1 — Proportional verification and selective review
Status: complete

- Outcome: decouple mandatory dual review from planned work while preserving every human checkpoint.
- Supporting changes: align orchestration, review selection, plan evidence/statuses, worker completion, and directly affected lifecycle documentation; retain focused axes, bounded corrections, and opt-in new tests with high-risk recommendations.
- Acceptance: low-risk wording work needs neither unrelated checks nor automatic reviewers; high-risk work gets justified independent scrutiny; reuse avoids pointless repetition without substituting checks for missing independent judgment; selected required proof blocks readiness when incomplete; skipped axes are not recorded as passes; material corrections return to the human.
- Verification: trace mechanical, low-risk planned wording, high-risk quality/conformance, existing-evidence reuse, correction, and missing-proof scenarios through the actual changed instructions; check lifecycle/status consistency. Review this control-policy change with both fresh axes against its frozen candidate.
- Edit boundary: lifecycle/verification/review policy and necessary companion documentation only; leave S2-S7 behavior, private config, and unrelated work unchanged.
- Recovery: preserve the attributable S1 patch and evidence if a policy conflict or proof gap appears; keep S1 pending and ask for the specific decision rather than resetting other work.

Evidence:
- Pre-task baseline: the nine selected tracked files had index and final contents unchanged from starting HEAD; the complete dirty delta was the unrelated `.gitignore` addition. Original raw-content hashes were captured during discovery. `PLAN.md` was created for the approved plan, not an earlier implementation delta. Branch creation preserved the patch and index.
- Candidate scope: `AGENTS.md`, `README.md`, `prompts/capa/{orchestrator,worker,review-plan,review-standards}.md`, `skills/planning/SKILL.md`, `skills/planning/references/plan-format.md`, and `skills/review/SKILL.md`. No configuration, plugin, convention-routing, delegation, or reference-provenance behavior was edited.
- Instruction-level scenario trace: direct mechanical work retains the existing no-plan/no-worker/no-review route; behavior-neutral planned wording can use structural readback and omit independent review while retaining the human stop; high-risk concerns require independent scrutiny with selected axes; evidence reuse requires current candidate/coverage; omitted axes are not passes; local correction is bounded and material changes return to the human; missing selected proof blocks readiness; test recommendations await authorization.
- `git diff --check`: passed. Focused searches and full diff inspection found no remaining mandatory dual-review rule in the selected execution path. Existing capture, role isolation, and explicit human-acceptance rules remain intact.
- Independent review selected: both Standards and Plan, because this candidate changes assurance/control-policy contracts and must match the approved S1 acceptance.
- Standards (`ses_ee0ecbc0dffeGnCkliC7QLScrQ`): operation success; no critical, important, or useful optional findings. All nine selected files and required authoring/quality/context sources covered; live-model behavior and raw-byte recomputation outside reviewer coverage.
- Plan (`ses_ee0ecbbdeffeFgLYWzlkbDFb4a`): operation success; no critical, important, or optional findings; all S1 acceptance, seam, scope, and recovery requirements covered. Future slices excluded. No human acceptance inferred.
- Owner post-review reconciliation: starting HEAD, index, all nine candidate raw-content hashes, plan input hash, and unchanged context hashes matched the frozen review input. The unrelated `.gitignore` patch is unchanged. No corrections were needed; original verified evidence remains applicable. Only this milestone/status update follows review; candidate policy files are unchanged.
- Frozen policy candidate raw-content hashes (`git hash-object --no-filters`):
  - `AGENTS.md`: `53382214eb1bf2cdbd15bdd3530530bcdf0774af`.
  - `README.md`: `e2c8ba39a5593ce0f7446b33b75f2b99ce40917a`.
  - `prompts/capa/orchestrator.md`: `454139a39febb516274b0337916fc7cfaf7556f0`.
  - `prompts/capa/worker.md`: `703af188ab9411cc3cc64fba5ac7c2ec6bc7522f`.
  - `prompts/capa/review-plan.md`: `62f67eb18713f7ec146743798e12e512070697d4`.
  - `prompts/capa/review-standards.md`: `c14d26a90f9ab6828b0d631f4e68822b2067460a`.
  - `skills/planning/SKILL.md`: `2ee192f98be72a51f2ca80019071177b85d24a91`.
  - `skills/planning/references/plan-format.md`: `76092cc8d8a04c5d1f9c71a5238107a26a79ca5c`.
  - `skills/review/SKILL.md`: `ed2cd4f4e4343a4bc68ed393a1d2f20683c2c053`.
- Limitations: evidence is source inspection and instruction-level tracing, not a live-model compliance benchmark. No builds, typechecks, new tests, private-config reads, or secret-bearing runtime probes were needed or performed. Existing startup-loaded instructions require a restart to activate changed files.
- Human acceptance and transition: "commit the changes and continue" accepted the unchanged HUMAN-ready S1 candidate, authorized its commit, and authorized execution of S2 only. All nine policy hashes still matched at acceptance; the unrelated `.gitignore` change is excluded from the commit.

### S2 — Task-relevant writer conventions
Status: complete
Depends on: S1

- Outcome: reliably route the writer to applicable conventions without loading unrelated corpora or duplicating the quality bar.
- Acceptance: mechanical work normally skips additional conventions; typed-boundary work reaches TypeScript; framework and structural changes reach their relevant references; project conventions remain binding; inaccurate contracts are corrected rather than hidden.
- Verification: route representative mechanical, typed-behavior, framework, and structural scenarios; inspect pointers and ownership for contradiction/duplication.

Evidence:
- Accepted prerequisite: S1 committed as `1e02fd250c362498cc501b872b7bcef0b4de70d3`; the human's "commit the changes and continue" authorized S2 only.
- Pre-task baseline: selected index/final files matched that HEAD, with no staged work; only the unrelated `.gitignore` addition remained dirty. Raw-content hashes captured before editing.
- Candidate scope: `AGENTS.md`, `README.md`, `prompts/capa/{orchestrator,worker}.md`, `skills/coding-conventions/SKILL.md`, and its `references/architecture.md`. Existing quality rules and language/framework reference contents are preserved; no S3-S7 behavior is implemented.
- Routing trace against the candidate's applicability/annotated references:
  - Wording-only text, a local mechanical rename, or deletion of confirmed unused code: normally no additional coding conventions; agent-facing edits still use authoring guidance.
  - An apparently mechanical rename that changes an exported contract or removal with observable effects: inspect the actual consequence and load relevant guidance before that substantive part.
  - TypeScript validation or shape changes: TypeScript reference, retaining its boundary-validation and accurate-modeling rules; no automatic full quality corpus.
  - React component state/render behavior: React plus TypeScript when applicable; architecture only for a changed responsibility/structural boundary.
  - Hono handler/middleware behavior: Hono plus TypeScript when applicable; no unrelated React/Go load.
  - Go implementation: Go; architecture only when its applicability condition is met.
  - New or reshaped ownership/module/dependency boundary: Architecture plus applicable language/framework guidance; merely editing existing module logic does not alone trigger Architecture.
  - Explicit project conventions and already-loaded applicable guidance: preserve precedence and reuse; reassess when the task/boundary changes.
- `git diff --check`: passed. Full selected diff and role pointers inspected; all five router references exist and were read. Language/framework rule bodies and the quality bar are unchanged, including TypeScript's rule against casts masking wrong contracts.
- Independent review selected: Standards for pointer/authoring/ownership consistency and Plan for the coupled writer-versus-mechanical applicability contract across parent, worker, and router. Neither selection is based solely on having a plan.
- Standards (`ses_ee0e07bf5ffeXHlDkPkxBl4uwC`): operation success; no critical, important, or useful optional findings. All six policy files, attributed plan evidence, and required source context covered; live-model activation and raw-byte recomputation outside reviewer coverage.
- Plan (`ses_ee0e07bcdffebIuJzsQ0adfreI`): operation success; no critical, important, or useful optional findings. All S2 acceptance, ownership/seam, scope, and recovery requirements covered; future slices excluded. No human acceptance inferred.
- Owner reconciliation: HEAD, empty staged delta, all six candidate hashes, plan input hash, and context hashes matched the frozen review input after both reviews. Unrelated `.gitignore` change is unchanged. No correction was needed; verified source evidence remains applicable. This subsequent plan milestone/status update is not a policy correction or implied re-review.
- Frozen policy candidate raw-content hashes (`git hash-object --no-filters`):
  - `AGENTS.md`: `c3301cfbbecda6074980744607cd9a58658d498d`.
  - `README.md`: `059d2b858177b1891505d39f756361e9015adccf`.
  - `prompts/capa/orchestrator.md`: `a14046b629681f8becb301b29bb0cae8407756b6`.
  - `prompts/capa/worker.md`: `40a7ea66a3b149329c5604ad549330833dd8cee8`.
  - `skills/coding-conventions/SKILL.md`: `8120afd55f5aa5ab3b67bc81caa4910587d3f393`.
  - `skills/coding-conventions/references/architecture.md`: `ef178587c93c6ba002e7cd7f6a9ea27ed2c664b2`.
- Limitations: structural/source tracing, not live-model skill-activation or generated-code quality evidence; no builds, typechecks, new tests, or private configuration inspection. Startup-loaded instructions and descriptions require restart for activation.
- Human acceptance and transition: "Commit them and continue" accepted the unchanged HUMAN-ready S2 candidate, authorized its commit, and authorized S3 only. All six policy hashes matched at acceptance. The unrelated `.gitignore` addition is now staged; preserve its index state and exclude it from the selected-path S2 commit.

### S3 — Faithful requirements and bounded delegation
Status: complete
Depends on: S1

- Outcome: canonical original requirements plus later decisions, focused reference-based assignments, and justified parallel subtasks.
- Acceptance: workers locate original intent and current approval; parent instructions supplement rather than replace requirements; unrelated history is not mandatory; reviewers receive no writer conclusions; parallelism preserves edit ownership, integration responsibility, and checkpoints; cross-slice execution requires approval.
- Verification: inspect single-worker, parallel-subtask, and independent-review handoffs; trace original/later requirement precedence and overlapping edit surfaces.

Evidence:
- Accepted prerequisite/context: S2 committed as `a00b3328080126e4a3c64174b04120a1f0b1e56b`; the human's "Commit them and continue" authorized S3 only. S1's accepted review/control behavior remains context, not this delta.
- Pre-task baseline: all six selected policy files and plan index/final versions matched that HEAD. Only the unrelated `.gitignore` addition remained dirty, staged; its exact index/worktree patch is preserved. Original selected raw-content hashes captured before mutation.
- Candidate scope: `README.md`, `prompts/capa/{orchestrator,worker}.md`, `skills/planning/SKILL.md`, `skills/planning/references/plan-format.md`, and `skills/review/SKILL.md`; this plan receives milestone evidence only. No new actors, artifacts, runtime concurrency mechanism, or S4-S7 integration behavior is introduced.
- Instruction-level handoff traces:
  - Single worker: a locator to this plan's Original request, Agreed design, and assigned slice/acceptance plus focused seam/edit-surface/preflight instructions provides original intent and current approval without copying unrelated evidence/history.
  - No canonical source: a bounded direct assignment includes the request verbatim and active clarifications rather than inventing a plan solely for delegation.
  - Later approved refinement: the preserved original request remains provenance; a deliberate change recorded in Agreed design governs the current contract. Unexplained conflicts or missing source context require reconciliation, not invented requirements.
  - Parallel subtasks within a slice: distinct worker-prompt and plan-format edit surfaces can be assigned under the same settled contract when worthwhile; parent avoids active worker surfaces and checks the whole attributable integrated result after all writers finish.
  - Overlapping files, companion surfaces, dependencies, or a newly changed shared contract: keep execution sequential or return the conflict/dependency to Capa; individual success never proves integration.
  - Independent review: stop all candidate writers, freeze the integrated slice delta, supply relevant original requirements/approved decisions and evidence identically, and exclude writer reasoning/conclusions.
  - Cross-slice grouping: propose benefit/dependencies/checkpoints and obtain explicit human approval; an ordinary continuation still authorizes exactly one next slice.
- `git diff --check`: passed. Complete attributable diff, selected role/planning/review pointers, and original-wording/later-decision clauses inspected; accepted S1/S2 gates and the staged unrelated `.gitignore` patch remain intact.
- Independent review selected: Standards for source/authoring/authority consistency and Plan for requirement fidelity, edit ownership, integration, and cross-slice permission/checkpoint semantics.
- Standards (`ses_edebbb7b3ffecyczZyeIKmESO1`): operation success; no critical, important, or useful optional findings. All six policy files, attributed plan evidence, and required source context covered. No Plan verdict or human acceptance inferred.
- Plan (`ses_edebbb77effea6aXg8zn9PdrDD`): operation success; no critical, important, or useful optional findings. All S3 requirement fidelity, authority, integration, checkpoint, scope, seam, and recovery requirements covered; future slices excluded. No Standards verdict or human acceptance inferred.
- Owner reconciliation: HEAD, all six candidate hashes, plan input hash, and unchanged context hashes matched after review; selected index remains at baseline and only the original unrelated `.gitignore` delta is staged. No corrections needed; source-trace evidence remains applicable. This subsequent milestone/status update is not a policy correction or implied re-review.
- Frozen policy candidate raw-content hashes (`git hash-object --no-filters`):
  - `README.md`: `ba03b4423ad021b734f2c899cae4cd2f9cef1cb9`.
  - `prompts/capa/orchestrator.md`: `11bf5d32b142437b0d87581e26346d7438153c53`.
  - `prompts/capa/worker.md`: `f310af4d9950eaa428c75975862210bffa7a4d36`.
  - `skills/planning/SKILL.md`: `c8640aa6b7e82a36a041dac84c08bd74fadd0be0`.
  - `skills/planning/references/plan-format.md`: `935b60d42e88bcd474a18d1cb11513a2ec5ddcd2`.
  - `skills/review/SKILL.md`: `29da905ee0726954405f6b8c1e815c118ca07a96`.
- Limitations: source inspection and instruction-level scenarios, not a live multi-writer run or model-compliance benchmark. No new tests, builds, typechecks, private configuration reads, or unrequested concurrent implementation were performed.
- Human acceptance: "Commit the changes and fix the issue" accepted the unchanged S3 policy candidate and authorized the root-reference ignore correction. Policy hashes still match the reviewed candidate. No continuation of S4, push, or PR is authorized.

### S4 — Single-owner memory policy
Status: complete

- Outcome: reconcile injected memory guidance and specialist/compaction/passive-capture paths with Capa ownership, preserving useful operational integration.
- Acceptance: specialists receive no mandatory prohibited memory writes; outcomes wait for acceptance; passive capture does not bypass ownership; active state is not mirrored; memory is not a new prerequisite for ordinary work.
- Verification: inspect injection/capture paths and parent/specialist/compaction scenarios without persisting real review outcomes during checks.

Evidence:
- Execution authorization: after the accepted S3 commit `94983d6`, the human requested renaming the root collection and then said "continue with the plan after that". This authorizes the rename and S4 only, not a commit, S5, or publication.
- Side change: root `references/` renamed to `inspiration/`, with the root-only ignore rule and current plan navigation updated. Nested skill/prompt `references/` folders and original request wording are unchanged. Source/reference provenance content remains for S7.
- Rename checks: destination contains the same six top-level entries; original root path absent; `git check-ignore --no-index --verbose --non-matching` ignores `inspiration/README.md` and matches no rule for the nested TypeScript/planning/specialist-report references. No new untracked collection files exposed. Initial tracked index was clean.
- S4 pre-task baseline after rename: tracked `AGENTS.md` and `README.md` matched HEAD `94983d63b379c037f4c27ab8a048cf671be1f925`; `.gitignore`/plan already held the authorized rename changes and are not rebranded as S4 delta. Local ignored `plugins/engram.ts` was read in full, with original raw-content hash `5e9237b56b25bd271271e3789e76161afcc52fa4`.
- Candidate scope: local `plugins/engram.ts`, primary/specialist recovery scope in `AGENTS.md`, and directly affected memory-adapter documentation in `README.md`; no new actor, memory store, or policy copy. Rename companions remain a separately attributed direct change. Plugin remains ignored/personal; no publication boundary was changed.
- Implementation: removed the adapter's duplicated memory-protocol string, system/nudge hook, project-context/forced-summary compaction hook, and passive Task-result learning writes; removed their unused reminder/tool-count state. Retained session/prompt/health/startup/import/project-identification paths. Primary-session closing/recovery scope is explicit in AGENTS; specialists return context needs to Capa. S5's prompt truncation/redaction ordering is unchanged.
- Functional verification: `node --input-type=module -e` imported the actual TypeScript adapter under Node `v24.15.0` after replacing `fetch` and all used Bun I/O with in-memory stubs. Assertions passed for primary registration/prompt capture, parentID-specialist suppression, both Task/task completion without passive persistence, absent system/compaction injection for parent and specialist, re-registration after deletion, stubbed manifest import, and unavailable-service/startup fallback. Observed hook keys: `event`, `chat.message`, `tool.execute.after`; zero real network calls, process spawns, or test files.
- Policy/source trace: primary compaction recovery remains with AGENTS; delegated roles recover assignment/context through Capa; accepted semantic outcomes are Capa-owned; no adapter path writes observations or mirrors active plan state. Session metadata and raw user-prompt capture are operational records, not accepted implementation outcomes. Full retained source read; `git diff --check` passed for tracked changes.
- Independent review selected: Standards for the TypeScript adapter's changed effects and policy authority, Plan for delegated-persistence/compaction boundaries and retained operational behavior. The ignored adapter is explicitly included as authorized local source, not omitted from review because Git ignores it.
- Standards (`ses_ede523497ffeRG8bV5it4s357v`): operation success; no critical, important, or useful optional findings. Full final adapter/tracked companions and supplied original affected-content capture covered; original full adapter version was not independently available to that reviewer, and runtime evidence was evaluated rather than rerun. No Plan verdict or human acceptance inferred.
- Plan (`ses_ede523469ffebIvbT0dw1HMsaM`): operation success; no critical, important, or useful optional findings. All S4 ownership/persistence/recovery/availability acceptance and authorized rename covered. Future S5-S7, publication, and stored memory changes excluded. No Standards verdict or human acceptance inferred.
- Owner reconciliation: HEAD, clean selected index, all three S4 candidate hashes, rename ignore/plan input hashes, and unchanged context identities matched after review. Root rename/ignore checks still pass. No corrections needed; executed hook assertions and source evidence remain applicable. Subsequent milestone/status updates do not alter the reviewed policy/code candidate.
- Frozen S4 candidate raw-content hashes (`git hash-object --no-filters`):
  - `plugins/engram.ts`: `a78998794032cd074ab322f9e0e1cfea66d5da94` (ignored local source).
  - `AGENTS.md`: `91d36171a81d097fa928fb9baf46c022258f6cec`.
  - `README.md`: `04bc2acb77450eeb1ea4df493960dd6373287f1a`.
  - Rename companion `.gitignore`: `90f87d1913b74573f937abbca6c6abcd921c83a1`.
- Limitations: runtime checks are isolated stubs, not a live OpenCode/Engram deployment or model-compliance test. No memory DB writes, new tests, broad builds/typechecks, or private-config reads. Restart is needed for plugin/instruction activation; separately installed adapters and existing stored observations are untouched. Local adapter changes will not be included in Git publication under the existing ignore rules.
- Human acceptance/transition: "commit and continue", clarified by selecting option "1", accepts the unchanged S4/rename candidate, authorizes committing only tracked policy/docs/rename companions, keeps `plugins/engram.ts` local/ignored, and authorizes S5 only. All accepted candidate hashes match; local runtime implementation is not misrepresented as part of the Git commit.

### S5 — Redaction before prompt truncation
Status: complete

- Outcome: remove valid private-tag sections before truncation can eliminate the closing tag; keep the correction focused.
- Acceptance: cutoff-crossing and complete private sections are removed; ordinary text retains its intended limit; synthetic private payloads are not transmitted to Engram.
- Verification: isolated synthetic string-processing checks for ordinary, complete-private, and cutoff-crossing inputs; no new test files or infrastructure.

Evidence:
- Authorization: the human's "commit and continue", clarified by option "1", accepted S4 and authorized only S5 next. Tracked S4/rename changes committed as `f48a6487b64aae3382938afce5d990745e1b011d`; personal adapter remains ignored by explicit choice.
- Actual pre-task baseline: clean tracked worktree/index at that HEAD; local ignored adapter's accepted S4 final hash `a78998794032cd074ab322f9e0e1cfea66d5da94` is the S5 source baseline, not HEAD. Plan baseline hash `325c05798a7553cce3656c39217d2ac1d563cdb5` captured.
- Baseline reproduction: imported the actual adapter under Node with all used Bun/fetch I/O stubbed; a complete private section beginning after 1950 ordinary characters and closing beyond the cutoff retained a synthetic private payload in the captured `/prompts` body. Observed `BUG_REPRODUCED`; zero real network/process/test-file effects.
- Candidate: only the prompt body expression changes from `stripPrivateTags(truncate(finalContent, 2000))` to `truncate(stripPrivateTags(finalContent), 2000)`. Existing parser, capture threshold, summary fallback, truncation suffix, and accepted S4 behavior remain unchanged. No new tests, abstractions, configuration changes, or publication expansion.
- Functional verification: `node --input-type=module -e` imported the actual changed adapter with all used fetch/Bun I/O mocked before import. Ten assertion scenarios passed: ordinary text; long ordinary text (first 2000 characters plus existing `...`); complete private section; closing tag beyond cutoff; replacement marker crossing cutoff; multiline/case-insensitive tags; multiple private sections; private-only input; summary fallback; unchanged short-prompt threshold. Nine synthetic prompts captured by the stub, zero real network/process/test-file effects. The original cutoff fixture now contains no synthetic private payload.
- Reused evidence: accepted S4's policy-hook/session/import/unavailable-service checks remain applicable to their unchanged paths; no blanket rerun. Actual source is parsed/imported by the focused check. `git diff --check` covers the tracked plan companion; local source readback confirms the single-expression edit.
- Independent review selected: Standards for the private-data sink/order boundary and Plan for the exact valid-tag/cutoff/truncation acceptance contract. The ignored local source remains explicitly included.
- Standards (`ses_ede4350b8ffeV6YP10RRwKxHBT`): operation success; no critical, important, or useful optional findings. Complete adapter/current plan context and exact one-line delta covered; functional evidence evaluated, not rerun, and the full inline harness/raw execution transcript was not supplied to that reviewer. No Plan verdict or human acceptance inferred.
- Plan (`ses_ede43508affex1ZAhcfKwT92fl`): operation success; no critical, important, or useful optional findings. Valid-tag/cutoff/limit/capture-seam scope and recovery conformance covered; future slices and publication excluded. No Standards verdict or human acceptance inferred.
- Owner reconciliation: HEAD, unchanged selected index, local candidate hash `990dca2698f672c653f39a8f4270c8e976b3bb05`, frozen plan input hash, and unchanged context identities matched after review. No correction needed; executed actual-hook evidence and reused unchanged S4 evidence remain applicable. Subsequent milestone/status updates do not alter the reviewed adapter.
- Limitations: isolated actual-hook checks, not live Engram/OpenCode delivery; existing stored data is untouched. Contract covers complete valid private-tag pairs; malformed/unclosed/nested tags are not redesigned. No test files, builds, broad typechecks, or private reads. Restart is needed to activate the local plugin, which remains excluded from Git publication by explicit choice.
- Human acceptance/transition: "continue" accepts the unchanged local S5 candidate (`990dca2698f672c653f39a8f4270c8e976b3bb05`) and authorizes S6 only. No commit, force-add, push, or PR is authorized; accepted S5 evidence remains uncommitted context for S6.

### S6 — Accurate boundaries and installation guidance
Status: complete
Depends on: S1, S2, S3, S4

- Outcome: reconcile remaining cross-cutting role/trusted-shell and installation documentation with settled behavior; distinguish config privacy from Git publication protection.
- Acceptance: no editor-denial-as-sandbox claims; required guidance and active commands are discoverable; documented lifecycle matches implementation; privacy limitations are explicit without reading secrets.
- Verification: cross-check core inventory, example configuration, installation pointers, and role descriptions/permissions. Slice-local documentation needed for correctness stays in its owning slice rather than waiting for S6.

Evidence:
- Authorization: "continue" accepted the unchanged S5 local candidate and authorized S6 only; no commit or publication. Accepted S5 source/evidence remain dirty context, not S6 implementation.
- Actual pre-task baseline: HEAD `f48a6487b64aae3382938afce5d990745e1b011d`; selected README/checker index/final matched HEAD, with original raw hashes `04bc2acb77450eeb1ea4df493960dd6373287f1a` and `03ac9678fecd6770bd79a1d5f0555f052ad27944`. Plan index is `325c05798a7553cce3656c39217d2ac1d563cdb5`, but actual pre-S6 final is `79f7cb72ebdc7ef7cbe20c002f88d94933436815`, including accepted uncommitted S5 evidence/acceptance. No staged work. Local adapter stays at accepted S5 hash `990dca2698f672c653f39a8f4270c8e976b3bb05`.
- Candidate scope: `README.md` and `prompts/capa/checker.md`, plus slice-local plan evidence. No example/live configuration or permission changes, source/plugin edits, stronger sandbox, new skill/actor, or S7 provenance work.
- Inventory verification: `git ls-files` confirms all five documented core commands, all six role/shared-report prompt files, all seven listed skill roots, both authoring files, and nested convention/planning references are tracked. All five command entry points were read and match their documented routes; authoring requirements match AGENTS. The public example is tracked; private `opencode.json` is not, and its contents were not read.
- Boundary/privacy trace: public example `explore`/checker deny edit/task but inherit shell, while both review roles also deny Bash. Read rules do not explicitly deny private config; Git ignore is not tool access control. Instructions now require non-mutating checker commands and return known formatting/autofix/snapshot work to Capa even if supplied/allowed; a supplied safe Git inspection remains usable. No shell allowlist changes or sandbox guarantee added.
- Installation/navigation trace: copy whole listed skill directories, including disclosed references and `SKILL-MECHANICS.md`; expose `/reslice` in command list/tree; exclude repository active plan and ignored inspiration/personal integration from core installation. Root inspiration remains ignored, while specialist/authoring/planning references have no matching ignore rule. Accepted lifecycle and local adapter publication boundary remain unchanged.
- `git diff --check`: passed. Complete attributable source/documentation diff inspected; example/config and accepted local adapter hashes remain unchanged. No builds/typechecks/new tests, live permission probes, actual formatting commands, or private reads were needed.
- Independent review selected: Standards for AI-facing authoring and privacy/trusted-execution claims, Plan for the procedural read-only and complete installation contract. Earlier accepted S5 evidence and adapter are context, not this delta.
- Standards (`ses_ede2fc986ffeNwVNk64hqeOTaq`): operation success; no critical, important, or useful optional findings. Every attributed README/checker hunk and S6 evidence covered; Git/runtime results evaluated as owner-supplied rather than independently rerun. No Plan verdict or human acceptance inferred.
- Plan (`ses_ede2fc914ffeMzR7Je48jVO0pO`): operation success; no critical, important, or useful optional findings. All S6 boundary/privacy/inventory/lifecycle/scope/recovery requirements covered; accepted dirty S5 work excluded from delta. No Standards verdict or human acceptance inferred.
- Owner reconciliation after review and conversational pause: HEAD, selected index, both policy hashes, frozen plan input hash, and unchanged example/command/guidance/local-adapter context identities matched. No corrections or additional feedback-driven edits; valid reviews and checks reused without another review cycle. Subsequent milestone/status update is not a policy correction or implied re-review.
- Frozen S6 policy raw-content hashes (`git hash-object --no-filters`): `README.md` = `9804b7fe3c46606c0ec863a142961d279bf10557`; `prompts/capa/checker.md` = `6613eaa6a2b418975c89705d9e4b5a9a10c4267e`.
- Limitations: structural/source and instruction-level checks, not a fresh-install or live-model/permission-enforcement test. Existing version-bounded Windows workaround is retained without claiming revalidation on the running version; startup-loaded checker guidance needs restart for activation.
- Human acceptance/transition: "Conitnue working" accepts the unchanged S6 policy candidate and authorizes S7 only. At resume, the human had committed accepted S5 evidence/S6 documentation as `d07e2c7ee5aa3263bf0f79ae02e416dc1466655b`; tracked worktree/index are clean, both reviewed S6 hashes and the accepted local adapter still match. No new Capa commit or publication authorized.

### S7 — Trustworthy reference provenance
Status: complete

- Outcome: accurately index snapshots/checkouts/local commentary and identify versions without changing upstream material or adopting its instructions.
- Acceptance: full checkouts are not labeled plain pinned snapshots; Addy/Gentle Shell/local Capa are discoverable; source versions are identifiable; reference instructions remain evidence.
- Verification: compare navigation/provenance with directory inventory and read-only revision metadata; check links and version distinctions.

Evidence:
- Authorization: "Conitnue working" accepted unchanged S6 and authorized S7 only; no new commit, checkout refresh, source execution, or publication. S7 indexes remain local under `/inspiration/` by the human's existing exclusion decision.
- Pre-task baseline: tracked worktree/index clean at human-created HEAD `d07e2c7ee5aa3263bf0f79ae02e416dc1466655b`. Plan final after acceptance = `f70220e04e4e767fa6a8deb4e170f82a5fbf41a3`. Local index originals captured: root README `edb16a4096cdda96426c768a6125ac2e5c78f361`, Matt REFERENCE `27f1c821c25c98430da27e7b35b5641281b5aecb`, Gentle REFERENCE `c0c0d36cb23d1f7b9183366908ed88fb7dcd2ec8`, local Capa README `1712bf633ace54fba7c320f38f2b35f81e4a48e4`. They are ignored local artifacts, not HEAD versions.
- Source observation: three clean Git checkouts on `main`, with official SSH remotes: Addy `1401c8b8030e023baeebb31781a6653fe8e93026` (2026-10-03), Gentle-AI `4e020a8a26d509f3df94f06afcebec672a63b129` (2026-10-08), Gentle Shell `16ced58e8c7d8936d5f47d9b674fe59fb84a9bc4` (2026-10-08). Gentle's local v4.0.0 tag = historical `ff77164d4f56f1665b22fb6fac51c2ccbb769400`, not current HEAD. Matt export has no nested `.git`; local Capa records its distinct historical Gentle pin `5140c5f55baf91763198eb0bfca019c015e3b015` and a local routing synopsis.
- Candidate: four authored local indexes only. Root index exposes all five collections and distinguishes observed checkout versions from declared snapshot/historical pins. Gentle wrapper no longer calls the current checkout a selected v4 export and exposes Gentle Shell separately. Matt pin/layout limits are explicit. Historical Capa navigation no longer points to missing MAIN_PROMPT or calls the new root plan its original migration plan. No upstream source/license, clone state, active workflow policy, or local adapter changed.
- Verification: explicit `test -f` checks passed for all 48 indexed local navigation targets; directory readback confirms checkout/export/pack layouts and the routing synopsis identifies itself as distilled source. Post-edit Git HEAD/status checks match all three pre-task checkout revisions with clean worktrees. Source remotes and local v4 tag metadata were read without fetching/pulling/checking out or executing upstream code.
- Scope/readback: all four final indexes read in full; existing Capa SOURCES hash is unchanged. Root harness README/checker hashes still match accepted S6 and the local adapter matches accepted S5. Only plan evidence is visible in parent Git; `/inspiration/` continues ignoring the local indexes. `git diff --check` passed for the tracked plan companion; no builds/typechecks/new tests or formatter runs.
- Independent review omitted: both Standards and Plan axes were unnecessary for this low-risk local metadata/navigation change, supported by direct file readback, observed Git metadata, and concrete link checks. No active code/policy/permission boundary changed. Omission is not a PASS; the human checkpoint remains required.
- Final local raw-content identities: root README `c804d7a298f1d079b31e0fa5c5dfda3004887513`; Matt REFERENCE `bcf8790b4ddb0613286625f814fd4ffcbd42b16e`; Gentle REFERENCE `bfd4bbb68c807b008cca92ac394d07fee394ed86`; local Capa README `afa296c0bde67e893bbb12c781e90c32abfc0a1e`.
- Limitations: external URLs were not fetched and the Matt/source-copy declared pins were not verified byte-for-byte against upstream; those limits are explicit in the indexes. Observed checkout HEADs are not guaranteed latest versions or future pins. This is local provenance reconciliation, not a runtime/model-performance benchmark or upstream refresh; no new commit/publication authorized.
- Human acceptance: "accept and commit the changes" accepts the unchanged S7 candidate and authorizes committing the tracked plan/evidence update. All four local index identities and accepted harness/adapter identities still match. Inspiration indexes and the personal adapter stay ignored/local; no force-add, push, or PR authorized. All seven slices are now human-accepted.

## Current progress

- Current slice: none; S1-S7 complete.
- Next action: stop; the approved plan is complete. Publication or further implementation requires a separate human instruction; ignored local artifacts remain excluded.
