---
name: code-quality
description: "Standards judgment for readable, human-maintainable final code; targeted guidance for material design or correction questions."
license: MIT
metadata:
  author: ingcapadev
  version: "1.0"
---

# Code Quality

One authoritative final-code quality bar, primarily for Standards judgment. Project
instructions, established conventions, and agreed design govern its application. Implementation
follows the thin AGENTS baseline and may consult this guidance for a design or correction
question; it does not require loading the full corpus.

## Quality Bar

- **Minimum conceptual complexity:** Optimize for the knowledge a maintainer needs, not minimum
  LOC or automatic inlining. After understanding the real flow, skip unrequired work and reuse
  suitable project, standard-library, platform, or installed capabilities before writing custom
  code.
- **Self-explanatory code:** Apply the self-explanatory-code and comment rule in the AGENTS
  implementation baseline.
- **Trust contracts:** Judge redundant validation, impossible-state masking, and normalization
  of broken invariants against the AGENTS validation rule. Preserve checks for genuinely
  unknown data, legitimate narrowing, optionality, and explicit invariants.
- **Require reachability:** Guards, fallbacks, retries, recovery paths, and error mappings
  serve actual required behavior and reachable failures. Preserve security, accessibility,
  data-loss protection, explicit requirements, and the project's error model; adapt throwing
  providers at the boundary and keep Result/error-as-value flows typed except at explicit
  framework exception boundaries.
- **Fix the owner:** Put behavior beside the state, decision, or domain concept it owns. For a
  bug, inspect callers and repair the shared owner when that is the smallest correct fix.
  Follow established patterns unless evidence shows the pattern itself is wrong.
- **Make abstractions earn their place:** A helper, module, component, or interface earns its
  place by naming a concept, hiding meaningful complexity, concentrating an invariant,
  reducing caller knowledge, owning a responsibility, or providing a needed boundary. A useful
  one-use extraction is valid; keep straightforward logic local when extraction merely
  relocates it.
- **Optimize from evidence:** Keep bounded local work simple. Optimize traversal, render,
  query, or I/O only when realistic frequency, cardinality, amplification, or boundary cost
  makes it material.

## Decision Test

Before adding code or structure, test the relevant condition:

- **Required:** Is the behavior part of the current request or an established contract?
- **Untrusted:** Is the value still outside a validated boundary?
- **Simpler:** Does the addition reduce current complexity or own a real boundary?
- **Material:** Is there evidence that the cost matters now?

## Completion

For Standards judgment, inspect every selected candidate hunk against the quality bar and
applicable conventions. For targeted design or correction use, reconcile the affected work with
the relevant guidance rather than imposing a full self-review. Identify redundant validation or
error handling, impossible-state masking, shallow wrappers, speculative flexibility, generic
comments, placeholder prose, duplicated utilities, and dead, unrequired, unrelated, or
unnecessarily verbose code. Preserve justified checks and abstractions by their actual
contracts.

## Standards Judgment

Ground findings in the candidate, its callers, established contracts, applicable rules, and
material consequences. Distinguish established violations from optional preferences and equally
valid tradeoffs. Explain why a proposed correction improves the current code; fewer lines, one
consumer, or a heuristic match alone is not evidence of a defect. No findings is a valid
outcome. Meaningful design alternatives remain human decisions, not automatic review
corrections.
