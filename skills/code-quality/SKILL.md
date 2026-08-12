---
name: code-quality
description: "Trigger: implementing, refactoring, or reviewing code. Enforces minimal, readable, human-maintainable changes."
license: MIT
metadata:
  author: ingcapadev
  version: "1.0"
---

# Code Quality

- **Minimum solution ladder:** After understanding the real flow, stop at the first sufficient option: skip unrequired work; reuse current project code; use the standard library; use the native platform; use an installed dependency; otherwise write the minimum direct custom code. Prefer deletion and clear local code over verbose equivalents.
- **Trust contracts:** Validate external or unknown data once when it enters a trusted boundary. Inside it, trust static types, schemas, framework guarantees, and validated results. Fail fast on violated internal invariants instead of masking them with defensive checks or fallbacks.
- **Require reachability:** Add a guard, fallback, retry, recovery path, or error mapping only for reachable required behavior. Preserve security, accessibility, data-loss protection, explicit requirements, and the project's established error model; adapt throwing providers at the boundary and keep Result/error-as-value flows typed except at explicit framework exception boundaries.
- **Fix the owner:** For a bug, inspect callers and repair the shared owner when that is the smallest correct fix. Follow established project patterns unless evidence shows the pattern itself is wrong.
- **Extract only for present value:** Keep one-use logic local. Add a helper, wrapper, factory, interface, or shared utility only when it improves clarity now, creates a real boundary, or removes meaningful duplication.
- **Optimize from evidence:** Keep bounded local work simple. Optimize traversal, render, query, or I/O only when realistic frequency, cardinality, amplification, or boundary cost makes it material.

## Decision Test

Before adding code or structure, test the relevant condition:

- **Required:** Is the behavior part of the current request or an established contract?
- **Untrusted:** Is the value still outside a validated boundary?
- **Simpler:** Does the addition reduce current complexity or own a real boundary?
- **Material:** Is there evidence that the cost matters now?

## Completion

Before success, inspect the complete diff and remove redundant validation or error handling, impossible-state masking, trivial wrappers, speculative flexibility, generic comments, placeholder prose, duplicated utilities, and dead, unrequired, unrelated, or unnecessarily verbose code.
