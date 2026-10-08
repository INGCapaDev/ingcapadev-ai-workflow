# Read-only regrouping

Use for `/reslice` or an explicit request to compare an existing proposal's or plan's
grouping. This branch reports alternatives through the planning owner; it does not enter
the plan-persistence path merely because the human selects an option.

## 1. Establish the target and constraints

Use an unambiguous conversational proposal or saved plan, with any supplied target or
focus. Inspect relevant code/contracts and current work attribution far enough to assess
valid checkpoints. If the target, approved scope/design, or attribution of current work
is ambiguous, ask the human and stop before recommending changed boundaries.

Preserve agreed scope/design and treat accepted or partially implemented work as constraints.
Compare remaining work around those constraints rather than rearranging or reverting it.
Identify alternatives requiring material scope/design changes separately; they are not
equivalent regroupings of the agreed work.

## 2. Compare and recommend

Apply the planning skill's work-unit breakdown criteria to the current grouping and a
small number of meaningful alternatives. Consider combining as well as splitting. Explain
boundary changes, real prerequisites, functional checkpoints, risk/review breadth, and
human handoff cost. Reject invalid intermediate states or unsupported alternatives with
the concrete reason; if no useful alternative exists, explain why the current grouping holds.

Recommend an option with concise tradeoffs and invite the human to choose another viable
option. Keep the comparison conversational and proportional, not a second plan artifact.

## 3. Stop at selection

Selection records a grouping preference conversationally. Report only: leave saved plans,
code, acceptance, and Git state unchanged. A subsequent explicit request to amend a plan
returns to the existing planning approval/persistence gates; execution and human transitions
remain with Capa. Selection alone authorizes neither amendment nor implementation.
