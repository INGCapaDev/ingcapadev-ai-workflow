# sub-apply Semantic Conformance Fixture

This focused fixture binds active approved decisions to the Apply completion criterion without defining a
second result contract.

## Scenario 1: conditional-to-absolute contradiction

- Active approved decision: conditional approved alternatives are allowed under the stated condition:
  either approved alternative A or approved alternative B.
- Candidate patch meaning: alternative B becomes an absolute prohibition, including outside that
  condition.
- Expected result: this is a material semantic contradiction. It is not `success`; the isolated replay
  reports `partial` using the shared result-contract semantics.

## Scenario 2: per-assignment-to-global cardinality contradiction

- Active approved decision: one-per-bounded-assignment is required, so each bounded assignment receives
  one instance.
- Candidate patch meaning: one-total instance is used across all bounded assignments.
- Expected result: this is a material cardinality contradiction. It is not `success`; the isolated replay
  reports `partial` using the shared result-contract semantics.

## Scenario 3: semantically equivalent wording

- Active approved decision: each bounded assignment receives one instance under the approved condition.
- Candidate patch meaning: equivalent wording keeps the same conditional meaning and the same
  per-assignment cardinality.
- Expected result: this is semantically equivalent wording and is an acceptable success case when the
  remaining completion criteria and seam evidence pass.
