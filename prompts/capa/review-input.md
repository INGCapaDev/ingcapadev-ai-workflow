# Canonical Review-Input Capture

This procedure is the single source of truth for capturing review input. Consumers select a supported
scope and pass the resulting frozen payload to their review axes; consumers do not resolve refs, read a
moving worktree, or recreate these safety rules.

## Supported scopes

The capture request is a token array, not a shell command string. The supported grammar is:

- `committed`: exactly one safe ref token, written as `<ref>`.
- `worktree`: the literal `worktree` token.
- `combined`: `worktree` followed by exactly one safe ref token, written as `worktree <ref>`.

Natural-language scope selection and untracked-file approval belong to a future consumer. An absent,
ambiguous, or otherwise unsupported scope blocks capture before any specialist is launched.

## Ref and subprocess safety

For `committed` and `combined`, accept exactly one safe ref token and validate it before invoking Git.
Reject missing or multiple tokens, whitespace-only or whitespace-containing payloads, leading-option
syntax, shell metacharacters, and anything outside `[A-Za-z0-9][A-Za-z0-9._/@{}^~:-]*`. Never concatenate
a shell string. Invoke Git with structured subprocess argument arrays, including `--` before path
arguments.

Resolve immutable identities with separate structured calls equivalent to:

```text
git rev-parse --verify --end-of-options <ref>^{commit}
git rev-parse --verify --end-of-options HEAD^{commit}
```

The first result is `baseSha`; the second is the frozen `headSha`. Accept only a single full SHA result
from each call. A failed, unsafe, ambiguous, or non-commit ref blocks capture without mutation.

## Capture transaction

Capture the complete selected input before delegation. Record the scope, immutable identity, one payload,
changed-file inventory, changed-hunk inventory, tracked-state snapshot, and untracked exclusions in the
result. Use the same frozen `baseSha` and `headSha` throughout a `combined` capture.

### Committed

Use the frozen three-dot identity `baseSha...headSha`. Capture the diff payload and derive or record its
changed files and hunks with structured `git diff` calls equivalent to:

```text
git diff --no-ext-diff --binary --unified=0 <baseSha>...<headSha> --
git diff --no-ext-diff --name-status --find-renames <baseSha>...<headSha> --
```

The three-dot identity, both SHAs, file inventory, and hunk headers belong to the captured payload. An
empty committed diff—an empty diff payload or file inventory—blocks delegation; a binary change may
legitimately have no textual hunk header when its file inventory and payload are present.

### Worktree

Freeze `headSha` before reading the index or working tree. Capture staged and unstaged tracked changes
relative to that frozen `HEAD`; it is the identity anchor for both tracked layers:

- `staged`: the `headSha`-to-index delta, captured with `git diff --cached <headSha> --`.
- `unstaged`: the index-to-working-tree delta, captured with `git diff --`; its state is tied to
  the same frozen `headSha` and is never silently treated as a second `HEAD`.
- `combinedWorktree`: the final tracked working-tree delta from `headSha`, captured with
  `git diff <headSha> --`.

Inventory changed files, hunks, and `staged`/`unstaged` state for these layers. The selected tracked
payload is empty when neither staged nor unstaged tracked changes exist, and empty input blocks
delegation even when untracked names are present.

### Combined

Resolve and freeze `baseSha` and `headSha` first, then capture the committed `baseSha...headSha` layer
and the worktree layers anchored at that same `headSha`. Preserve both layers, their file and hunk
inventories, the staged/unstaged state, and the frozen base/head identity in one captured payload. Do not
let a later Git read create a new base or head.

## Untracked files and stability

By default, exclude untracked files from every payload and report their paths in `untrackedExcluded`.
Read names only for that report; do not read ignored or untracked content automatically. Include an
untracked path only after a future consumer explicitly names it and receives approval; the approval and
allowlist must be part of the captured payload before its content is read. For `worktree` or `combined`,
capture approved untracked content as a separate layer with its file inventory, and let that layer satisfy
the non-empty-input gate. Committed scope remains SHA-to-SHA only.

Treat the first staged, unstaged, and combined diff payloads as the captured tracked-state snapshot. After
all payload and inventory reads, resolve `HEAD` again and rerun every applicable payload-producing Git
diff call with the same frozen arguments. Compare the exact bytes or cryptographic digests of the first
and verification payloads, including any explicitly approved untracked-content layer. Raw diff metadata
may support inventory, but it is not a content-stability fingerprint because an unstaged destination
object can remain `0000000` while its content changes.

Capture untracked names with `git status --porcelain=v1 -z --untracked-files=all` and compare the exact
path list after payload verification so the reported exclusions are frozen too. If `HEAD`, any tracked
or approved-untracked payload, or the untracked exclusion list changes before capture completes, block
delegation and require a fresh capture. Do not auto-loop, retry against new state, or mutate Git. Invalid,
unsafe, ambiguous, empty, or unstable input launches no specialists and mutates nothing.

## Consumer boundary

Only a successful, non-empty capture may cross the delegation boundary. The existing `/review` consumer
invokes `committed` with its fixed point, passes the captured payload unchanged, and launches only
Standards and Plan Conformance. This procedure does not add another review axis or change `/review`
result semantics.
