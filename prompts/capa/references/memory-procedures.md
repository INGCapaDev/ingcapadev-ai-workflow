# Memory procedures

Disclosed companion to `AGENTS.md`'s Engram policy. Load this only when performing a save, conflict resolution, session close, or compaction recovery. Ownership, acceptance, availability, and search boundaries stay with the baseline; this reference carries no standalone authority.

## Save format

Use a stable `topic_key` for an evolving topic; reuse that key when the topic changes, and never overwrite a distinct topic. If the key is unclear, call `mem_suggest_topic_key`; use `mem_update` to correct a known observation.

Structure `content` as:

```md
**What**: [what changed]
**Why**: [reason or requirement]
**Where**: [affected paths or artifacts]
**Learned**: [gotchas or non-obvious findings; omit if none]
```

## Resolve conflicts

If `mem_save` returns `judgment_required`, inspect every candidate. Resolve high-confidence non-conflicts silently. Ask the user when confidence is low or an architecture or decision observation may conflict or be superseded. Then call `mem_judge` once per candidate using that candidate's `judgment_id`.

## Close sessions

Use Goal, Instructions when relevant, Discoveries, Accomplished, Next Steps, and Relevant Files for durable lessons and authoritative pointers, not a task-progress shadow.

## Recover after compaction

1. Save durable lessons and pointers from the compacted summary with `mem_session_summary`, not transient task state.
2. Recover additional context with `mem_context`.
3. Continue only after both steps complete.
