# Capa Result Contract

Every specialist consumes this contract from its assignment and returns all common fields exactly once.

- `Status`: `success | partial | blocked`. Success means the assigned operation completed with required evidence; partial means useful valid output exists but required context or evidence is incomplete; blocked means safe continuation requires human input or dependency resolution.
- `Executive Summary`: one to three sentences.
- `Artifacts`: paths or `none`.
- `Next Recommended`: one human action.
- `Risks`: risks or `none`.
- `Skill Resolution`: `paths-injected | fallback-registry | fallback-path | none`, matching the supplied or actually used mode exactly.

Missing fields, invalid enum values, contradictory fields, or output for the wrong role/axis make the envelope malformed. The orchestrator must fail closed: never infer completion, approval, a verification verdict, or findings; preserve useful valid output as `partial`, otherwise return `blocked`, with the exact error.

Operation `Status` is independent of `Verification Verdict: PASS | FAIL | INCOMPLETE` and review finding severity.
