---
name: code-quality
description: "Trigger: implementing, refactoring, or reviewing code. Defines shared standards for readable, human-maintainable final code."
license: MIT
metadata:
  author: ingcapadev
  version: "1.0"
---

# Code Quality

One authoritative final-code quality bar for authors and Standards judgment. Project instructions, established conventions, and agreed design govern its application. Role-specific loading and review procedure belong to the workflow; current implementation loading and completion checks remain in force until that workflow changes.

## Quality Bar

- **Minimum conceptual complexity:** Optimize for the knowledge a maintainer needs, not minimum LOC or automatic inlining. After understanding the real flow, skip unrequired work and reuse suitable project code, standard-library, platform, or installed capabilities before writing custom code. Use names, types, and explicit control flow to communicate meaning; comments explain rationale, constraints, or non-obvious behavior.
- **Trust contracts:** Validate external or unknown data once at its trusted boundary, then trust established types, schemas, framework guarantees, and validated results. Preserve checks for genuinely unknown information, legitimate narrowing, optionality, and explicit invariants. For violations of established internal invariants, fail fast using the project's error model rather than normalizing them into absence, invented defaults, or speculative recovery.
- **Require reachability:** Guards, fallbacks, retries, recovery paths, and error mappings serve actual required behavior and reachable failures. Preserve security, accessibility, data-loss protection, explicit requirements, and the project's established error model; adapt throwing providers at the boundary and keep Result/error-as-value flows typed except at explicit framework exception boundaries.
- **Fix the owner:** Put behavior beside the state, decision, or domain concept it owns. For a bug, inspect callers and repair the shared owner when that is the smallest correct fix. Follow established project patterns unless evidence shows the pattern itself is wrong.
- **Make abstractions earn their place:** A helper, module, component, or interface earns its place by naming a concept, hiding meaningful complexity, concentrating an invariant, reducing caller knowledge, owning a responsibility, or providing a needed boundary. A useful one-use extraction is valid; keep straightforward logic local when extraction merely relocates it. Reuse is a justification, not an admission requirement.
- **Optimize from evidence:** Keep bounded local work simple. Optimize traversal, render, query, or I/O only when realistic frequency, cardinality, amplification, or boundary cost makes it material.
- **Design contracts together:** Investigate existing code and discuss meaningful API, domain-model, or structural choices with the human before introducing or reshaping them. Show the recommended contract, important tradeoffs, and coupled implementation implications; internal caller-facing APIs count too. Routine details within agreed design remain implementation work.
- **Use project validation:** Test creation, TDD, and coverage requirements come from the user or applicable project conventions. Select relevant existing checks and additional validation for concrete changed behavior or evidence gaps.

## Decision Test

Before adding code or structure, test the relevant condition:

- **Required:** Is the behavior part of the current request or an established contract?
- **Untrusted:** Is the value still outside a validated boundary?
- **Simpler:** Does the addition reduce current complexity or own a real boundary?
- **Material:** Is there evidence that the cost matters now?

## Completion

Before implementation success, inspect the complete diff against the quality bar and applicable conventions. Remove redundant validation or error handling, impossible-state masking, shallow wrappers, speculative flexibility, generic comments, placeholder prose, duplicated utilities, and dead, unrequired, unrelated, or unnecessarily verbose code. Preserve justified checks and abstractions by their actual contracts and responsibilities.

## Standards Judgment

Ground findings in the candidate, its callers, established contracts, applicable rules, and material consequences. Distinguish established violations or material problems from optional preferences and equally valid tradeoffs. Explain why a proposed correction improves the current code; fewer lines, one consumer, or a heuristic match alone is not evidence of a defect. No findings is a valid outcome. Meaningful design alternatives remain human decisions rather than automatic review corrections.
