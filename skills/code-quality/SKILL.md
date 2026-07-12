---
name: code-quality
description: "Trigger: implementing, refactoring, or reviewing code. Enforces minimal, readable, human-maintainable changes."
license: MIT
metadata:
  author: ingcapadev
  version: "1.0"
---

# Code Quality

- **Minimize:** Make the smallest clear change that satisfies the approved behavior.
- **Follow evidence:** Follow established project patterns. If concrete evidence shows a pattern is incorrect, surface it before widening scope or architecture.
- **Validate boundaries:** Validate external or unknown data when it enters a trusted boundary. Inside that boundary, rely on static types, schemas, framework guarantees, and parsed or validated results.
- **Reuse first:** Search the project and its libraries before creating generic parsing, formatting, validation, transformation, date, string, array, or async logic.
- **Keep logic local:** Keep one-use logic inline. Extract only when it improves current clarity or removes meaningful duplication; place justified shared code near its domain or related utility family.

## Decision Test

Before adding a guard, fallback, helper, wrapper, factory, or abstraction, test the relevant condition:

- **Reachable:** Add guards or fallbacks only for behavior the current system can reach and requires.
- **Untrusted:** Add runtime validation only while a value remains outside a validated boundary.
- **Simpler:** Add helpers or abstractions only when they reduce complexity now.

## Completion

Remove redundant validation, impossible-state masking, speculative abstractions, trivial wrappers, generic comments, placeholder prose, duplicated utilities, and dead, unrequired, or unrelated code.
