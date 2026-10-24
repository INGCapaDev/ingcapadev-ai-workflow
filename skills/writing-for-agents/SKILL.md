---
name: writing-for-agents
description: Author agent-facing instructions (skills, AGENTS.md, CLAUDE.md, prompts, commands, and agent-consumed docs) with precise context pointers and minimal duplication.
---

Reference for writing any document an agent consumes: a skill, `AGENTS.md` / `CLAUDE.md`, or a
doc reached by a pointer. Packaging differs; the levers do not. The agent takes the same
_process_ every run, not the same output.

When the document is a skill, read [`SKILL-MECHANICS.md`](SKILL-MECHANICS.md) for frontmatter,
invocation choice, and router skills.

## Context pointers

A **context pointer** is a reference held in the agent's context that names out-of-context
material and encodes the condition for reaching it. A skill description is one; an `AGENTS.md`
line naming a doc is the same object. The pointer's _wording_, not its target, decides when and
how reliably the agent reaches the material. A must-have target behind a weak pointer is a
variance bug: sharpen the wording first, inline only if sharpening fails.

A pointer states what the material is and lists the **branches** that should trigger reaching it
(a branch is a distinct case the document handles, so different runs take different paths). Every
word of an always-loaded pointer costs on every turn, so it earns even harder pruning than the
body:

- **Front-load the leading word**: the pointer does its triggering work there.
- **One trigger per branch.** Synonyms renaming one branch are one branch written twice; collapse
  them.
- **Cut identity the body already carries.**

## The two loads

Every document and pointer spends one of two budgets:

- **Context load** is the cost of always-loaded material on the window: an `AGENTS.md` line, a
  skill description, anything in context every turn, spending tokens and attention whether or
  not it fires.
- **Cognitive load** is the cost on the human: which documents exist and when to reach for each.
  The human is the index. It is the price of human agency, not a cost to minimise: spend it where
  human judgement matters, remove it where it does not.

Material reached only through a pointer escapes context load at the price of the pointer's line;
material with no pointer rides entirely on cognitive load.

## Information hierarchy

A document contains **steps** (ordered actions) and **reference** (definitions, rules, facts
consulted on demand). They mix freely. The core decision is where each piece sits on the
**information hierarchy**, ranked by how immediately the agent needs it:

1. **In-file step** is the primary tier: what the agent does, in order.
2. **In-file reference** is consulted on demand. A legitimately flat peer-set (every rule of a
   review on one rung) is fine, not a smell.
3. **Disclosed reference** lives in a separate file, reached by a pointer, loaded only when the
   pointer fires. It can span a sibling file or fully external material.

Push too little down and the top bloats; push too much and you hide material the agent needs.
That tension is the decision.

**Progressive disclosure** is the move down the ladder so the top stays legible. It is not
primarily a token optimisation: it protects the hierarchy. Branching is the cleanest disclosure
test: inline what every branch needs, disclose what only some branches reach. When a document
has steps, in-file reference that should be disclosed buries them and makes attending to them a
coin-flip: a variance lever, not just a legibility one.

**Co-location** is the within-file companion: the ladder decides _how far down_ a piece sits,
co-location decides _what sits beside it_. Keep a concept's definition, rules, and caveats under
one heading rather than scattered, so reading one part brings its neighbours. The document should
read like documentation written for the agent. (Duplication repeats one meaning in two places;
scattering fragments one meaning across many.)

**Sprawl** is the failure mode: a document too long even when every line is live and unique.
Attention thins across the excess, and every extra line is one more to keep relevant. The cure is
the ladder: disclose reference behind pointers, split by branch or sequence so each path carries
only what it needs.

## Steps and completion criteria

Every step ends on a **completion criterion**, the condition that tells the agent the work is
done. Two properties make it a lever:

- **Clarity:** can the agent tell done from not-done? A vague bound ("understanding reached")
  invites **premature completion**: ending the step before it is genuinely done, attention
  slipping to _being done_. The visible steps ahead (**post-completion steps**) supply the pull;
  the criterion's clarity is the resistance. Defend in order: **sharpen the bound first** (local,
  cheap); only if it is irreducibly fuzzy _and_ you observe the rush, hide the later steps by
  splitting the sequence. Hiding works only across a real context boundary (a hand-off or
  subagent dispatch; an inline call leaves later steps in context and clears nothing).
- **Demand:** how much it requires. "Every modified model accounted for" forces thorough work
  where "produce a change list" does not. Demand drives **legwork** (the digging latent in the
  wording rather than written as its own step), and is not step-bound: "every rule applied"
  binds flat reference just as "every step done" binds a sequence, which is how an all-reference
  document still carries an exhaustiveness bar.

The strongest criteria are both checkable and exhaustive.

## When to split

Splitting one document into two spends one of the two loads, so split only when the cut earns
it:

- **By sequence:** split where post-completion steps tempt the agent to rush the one in front of
  it; keeping them out of view drives more legwork. Beware the reverse: merging sequences exposes
  each step's later steps, inviting premature completion.
- **By invocation**, skill-specific: see [`SKILL-MECHANICS.md`](SKILL-MECHANICS.md).

## Leading words

A **leading word** is a compact concept already living in the model's pretraining that the agent
thinks with while running the document (_lesson_, _fog of war_, _tracer bullets_). Repeated as a
token, never a sentence, it accumulates a distributed definition and anchors a region of
behaviour in the fewest tokens, recruiting priors the model already holds. A coined word works
if defined clearly, but recruits no priors: you pay in definition tokens what a pretrained word
gives free.

It anchors twice. In the body, _execution_: the agent reaches for the same behaviour whenever
the word appears, and inside flat reference it focuses attention on a class of thing to look
for. In a pointer, _invocation_: when the same word lives in prompts, docs, and codebase, the
agent links that shared language to the material and reaches it more reliably.

Hunt for refactors: a triad spelled out at three sites, a pointer spending a sentence to gesture
at one idea, is a passage begging to collapse into one token:

- "fast, deterministic, low-overhead" → _tight_ (a _tight_ loop).
- "a loop you believe in" → _red_, turning a fuzzy gate into a binary observable state (the loop
  goes _red_ on the bug, or it doesn't).

You win twice: fewer tokens, and a sharper hook to hang thinking on. Assume every document
carries restatements that leading words retire.

**Negation** is the failure mode beside this lever: steering by prohibition drags the forbidden
behaviour into context and makes it _more_ available. _Don't think of an elephant_, and the
elephant is all there is; the negation is a weak modifier the activated concept overruns, so the
ban half-reads as an instruction to do the thing. Prompt the **positive**: state the target
behaviour ("write one-line comments") so the banned one is never spoken. A prohibition earns its
place only as a hard guardrail you cannot phrase positively; even then, pair it with the positive
target.

## Pruning

- Keep each meaning in a **single source of truth**: one authoritative place, so changing the
  behaviour is a one-place edit. **Duplication** costs maintenance and tokens and inflates a
  meaning's prominence past its real rank. (The accidental inverse of a leading word, which
  repeats a token on purpose, never the meaning.)
- The **environment** is a source of truth too (`package.json` scripts, config, layout, `--help`
  output). A document that restates it is a **cache**: a copy of a lookup, earning its load only
  when the lookup is expensive. Cache what the agent cannot find by looking: the unwritten
  convention, the reason behind a choice, the gotcha no config confesses. Leave one-file,
  one-command lookups to the environment, where they cannot go stale.
- Check every line for **relevance**: does it still bear on what the document does? A line loses
  relevance by never bearing on the task (mere exposition, or a branch that should be disclosed)
  or by going stale as the world changes. Shorter documents are easier to keep relevant. Without
  pruning the default fate is **sediment**: stale layers that settle because adding feels safe
  and removing feels risky, until you must core down through them.
- Hunt **no-ops** sentence by sentence: an instruction the model already obeys by default pays
  load to say nothing. The test (does it change behaviour versus the default?) is model-relative:
  two people disagreeing about a no-op disagree about the default, and settle it by running the
  document. When a sentence fails, delete it rather than trimming words. The test also grades
  leading words: a word too weak to beat the default (_be thorough_ when the agent is already
  thorough-ish) is a no-op, and the fix is a stronger word (_relentless_), not a different
  technique.
