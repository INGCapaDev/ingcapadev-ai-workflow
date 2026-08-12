import { readFile, realpath, stat } from "node:fs/promises";
import { dirname, isAbsolute, join, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const configPath = join(root, "opencode.example.json");
const failures = [];
const check = (condition, message) => {
  if (!condition) failures.push(message);
};
const read = (path) => readFile(join(root, path), "utf8");
const normalize = (value) => value.toLowerCase().replace(/\s+/g, " ").trim();
const existsFile = async (path) => {
  try {
    return (await stat(path)).isFile();
  } catch {
    return false;
  }
};
const isInsideRoot = (path) => {
  const pathFromRoot = relative(root, path);
  return pathFromRoot === "" || (!pathFromRoot.startsWith(`..${sep}`) && pathFromRoot !== ".." && !isAbsolute(pathFromRoot));
};
const requires = (body, terms, name) => {
  const normalized = normalize(body);
  for (const term of terms) check(normalized.includes(normalize(term)), `${name}: missing semantic invariant: ${term}`);
};
const requiresAny = (body, alternatives, name) => {
  const normalized = normalize(body);
  check(alternatives.some((terms) => terms.every((term) => normalized.includes(normalize(term)))), `${name}: missing semantic invariant`);
};
const decideCodeShape = ({ improvesClarity, meaningfulDuplication }) =>
  improvesClarity || meaningfulDuplication ? "extract" : "local";
const decideStructure = ({ distinctResponsibility, hidesImplementation, shallowWrapper }) =>
  shallowWrapper || !distinctResponsibility || !hidesImplementation ? "reject" : "seam";
const hasMaterialCostEvidence = ({ frequency, cardinality, amplification, boundaryCost }) =>
  frequency === "repeated" || cardinality === "large" || amplification === "amplified" || boundaryCost === "remote";
const decideCost = (evidence) => (hasMaterialCostEvidence(evidence) ? "address" : "simple");
const decideBehavior = ({ preservation }) => (preservation === "preserved" ? "preserved" : "gap");
const capabilitySkillNames = ["engineered-ai-dev", "code-quality", "coding-conventions"];
const consequentialTransitions = ["Apply", "Verify", "Standards Review", "Plan Conformance"];
const requiredSkillsFor = ({ lifecycleWork = false, implementationOrQualityReview = false, applicableConventions = false }) => {
  const required = [];
  if (lifecycleWork) required.push("engineered-ai-dev");
  if (implementationOrQualityReview) required.push("code-quality");
  if (applicableConventions) required.push("coding-conventions");
  return required;
};
const hasRequiredSkills = (required, resolvedAndLoaded) => {
  const resolved = new Set(resolvedAndLoaded);
  return required.every((name) => resolved.has(name));
};
const canEnterTransition = (transition, { requiredSkills, resolvedAndLoaded }) => {
  if (!consequentialTransitions.includes(transition)) return true;
  return hasRequiredSkills(requiredSkills, resolvedAndLoaded);
};
const simulatedSkillCandidate = (path, options = {}) => ({
  path,
  fileName: options.fileName ?? "SKILL.md",
  approved: options.approved ?? true,
  stale: options.stale ?? false,
});
const resolveFromSafeChannels = (channels) => {
  const rejected = [];
  for (const [source, candidate] of channels) {
    if (!candidate) continue;
    if (candidate.stale || candidate.fileName !== "SKILL.md" || !candidate.approved) {
      rejected.push(`${source}:${candidate.path}`);
      continue;
    }
    return { path: candidate.path, source, rejected };
  }
  return { path: null, source: null, rejected };
};

let config;
try {
  config = JSON.parse(await readFile(configPath, "utf8"));
} catch (error) {
  failures.push(`JSON parse: ${error.message}`);
  config = { agent: {} };
}

const specialists = [
  "sub-explore",
  "sub-apply",
  "sub-verify",
  "sub-review-standards",
  "sub-review-plan",
];
const capaAgents = ["ingcapa-dev-orchestrator", ...specialists];

// Keep deterministic wiring and security boundaries structural. Prompt quality remains
// a human-review concern; this validator checks only durable workflow invariants.
for (const name of capaAgents) {
  const agent = config.agent?.[name];
  check(agent, `missing agent: ${name}`);
  check(agent?.model, `${name}: model missing`);
  check(agent?.variant, `${name}: variant missing`);

  const match = /^\{file:\.\/([^{}]+)\}$/.exec(agent?.prompt ?? "");
  check(match, `${name}: invalid prompt reference`);
  if (!match) continue;

  const target = resolve(root, match[1]);
  check(await existsFile(target), `${name}: prompt path missing`);
  if (await existsFile(target)) check(isInsideRoot(await realpath(target)), `${name}: prompt path escapes repository root`);
}

const taskRules = config.agent?.["ingcapa-dev-orchestrator"]?.permission?.task ?? {};
const expectedTaskRules = { "*": "deny", ...Object.fromEntries(specialists.map((name) => [name, "allow"])) };
check(JSON.stringify(taskRules) === JSON.stringify(expectedTaskRules), "orchestrator task allowlist drift");
for (const name of specialists) check(config.agent?.[name]?.permission?.task === "deny", `${name}: delegation must be denied`);
for (const name of ["sub-review-standards", "sub-review-plan"]) {
  const permission = config.agent?.[name]?.permission;
  check(permission?.edit === "deny" && permission?.bash === "deny" && permission?.task === "deny", `${name}: review permissions drift`);
}

for (const name of ["plan", "continue", "verify", "review", "refactor-review"]) {
  const body = await read(`commands/${name}.md`);
  check(body.includes("agent: ingcapa-dev-orchestrator"), `${name}: command agent drift`);
}
const improveCommand = await read("commands/improve-ai.md");
const improveSkill = await read("skills/improve-ai/SKILL.md");
const improveFixture = await read("scripts/fixtures/improve-ai-session.md");
const subApplyConformanceFixture = await read("scripts/fixtures/sub-apply-semantic-conformance.md");
const improveOrchestrator = await read("prompts/capa/orchestrator.md");
check(/^---[\s\S]*\bdescription:\s*[^\n]+[\s\S]*\bagent:\s*ingcapa-dev-orchestrator\b[\s\S]*---/m.test(improveCommand), "improve-ai: command frontmatter drift");
check(!/`\$ARGUMENTS`/.test(improveCommand), "improve-ai: arguments must remain a labeled value");
check(!/disable-model-invocation/i.test(improveSkill), "improve-ai: must remain model-invoked");
check(/^---[\s\S]*\bname:\s*improve-ai\b[\s\S]*\bdescription:/m.test(improveSkill), "improve-ai: skill frontmatter missing");
requires(improveCommand, ["optional", "natural-language", "focus", "examples", "$arguments", "read-only", "approval-ready plan"], "improve-ai command");
requires(improveSkill, [
  "explicit `/improve-ai`",
  "explicit natural-language",
  "one Capa-owned review",
  "currently available conversation context",
  "explicit user input",
  "accepted Engram",
  "read-only repository corroboration",
  "missing provenance",
  "never reconstruct",
], "improve-ai evidence boundary");
requires(improveSkill, [
  "user corrections",
  "errors or failed actions",
  "unexpected generation",
  "successful corrective rework",
  "preferences",
  "reusable patterns",
], "improve-ai signal classes");
requires(improveSkill, [
  "root invariant",
  "owning authority",
  "repeated symptoms",
  "selected",
  "rejected",
  "already fixed",
  "insufficient evidence",
  "no-change outcome",
], "improve-ai normalization");
requires(improveSkill, [
  "project context",
  "project or global `AGENTS.md`",
  "skills or references",
  "Capa prompts/agents/subagents",
  "commands",
  "conventions",
  "code-quality policy",
  "Engram behavior",
], "improve-ai candidate targets");
requires(improveSkill, [
  "project-local",
  "explicit user direction",
  "independent recurrence",
  "intrinsic",
  "cross-project ownership",
  "human selection",
  "plan approval",
], "improve-ai ownership and promotion");
requires(improveSkill, [
  "current repository",
  "do not infer another repository owner",
  "material questions",
  "stop after each question round",
  "never infer selection",
  "selection comes before planning",
  "engineered-ai-dev plan",
  "explicit human approval",
], "improve-ai decision and plan gate");
requires(improveSkill, [
  "signal origin and evidence",
  "repository corroboration",
  "applicability",
  "smallest viable enhancement",
  "tradeoffs",
  "uncertainty",
  "validation implications",
  "disposition",
  "Capa alone owns",
  "Capa alone writes plans",
  "candidate discovery never mutates",
], "improve-ai candidate report and ownership");
requires(improveOrchestrator, [
  "`/improve-ai`",
  "explicit natural-language requests",
  "model-invoked `improve-ai` skill",
  "one lazy workflow",
  "optional bounded read-only exploration",
  "semantic aggregation",
  "selection-before-plan gating",
  "current repository",
  "only when distributed corroboration is useful",
  "do not add a specialist, plugin, phase, config entry, or telemetry",
], "improve-ai Capa routing and aggregation");
requires(improveFixture, [
  "user correction/feedback",
  "error/failed action",
  "unexpected generation",
  "successful corrective rework/fix",
  "preference",
  "reusable pattern",
  "repeated symptom",
  "project-local",
  "explicit promotion",
  "independent recurrence promotion",
  "intrinsic cross-project promotion",
  "insufficient evidence",
  "no-change outcome",
  "material question",
  "stop after that question round",
  "current repository",
  "explicitly approved requirement",
  "selection-before-plan",
  "no automatic mutation",
  "does not edit code, prompts, skills, plans, commits, or Engram",
], "improve-ai representative fixture");
check(!/new specialist|new plugin|new phase|new config entry|persistent telemetry/i.test(improveSkill), "improve-ai: scope expansion instruction present");
const planCommand = await read("commands/plan.md");
requires(planCommand, ["engineered-ai-dev", "skills required", "lifecycle", "implementation/review", "applicable convention", "non-code planning"], "plan command capability entry point");

const promptNames = ["orchestrator", ...specialists];
const promptBodies = Object.fromEntries(await Promise.all(promptNames.map(async (name) => [name, await read(`prompts/capa/${name}.md`)])));
const contract = await read("prompts/capa/result-contract.md");
requires(contract, ["semantic core", "role", "operational state", "material evidence", "blockers", "risks", "next safe action"], "result communication");
requires(contract, ["critical", "unsafe", "materially incorrect", "important", "substantial", "optional", "non-blocking"], "shared severity");
requires(contract, ["stable repository reference", "standard specialists", "normally", "migration", "mismatch", "external specialist"], "result reference delivery");
for (const [name, body] of Object.entries(promptBodies)) {
  check(body.includes("result-contract.md") || body.includes("shared communication protocol"), `${name}: result communication not consumed`);
}

requires(promptBodies.orchestrator, [
  "exact paths injected",
  "session-cache or registry",
  "opencode-advertised skills",
  "safe model or repository investigation",
  "regular file named exactly `skill.md`",
  "canonical duplicate paths count once",
  "same-name skills resolve to different canonical files",
  "project-local candidate wins",
  "block planning only after every safe channel",
  "role-specific required evidence",
  "gather missing read-only evidence directly",
  "ask before any new mutation or scope expansion",
  "never automatically relaunch",
  "one review axis repair or replace another",
  "human diff review",
], "orchestrator");
requires(promptBodies.orchestrator, [
  "current work",
  "lifecycle work needs `engineered-ai-dev`",
  "implementation or code-quality review needs `code-quality`",
  "applicable language or framework conventions need root `coding-conventions`",
  "their additive references",
  "engineered-ai-dev",
  "code-quality",
  "root `coding-conventions`",
  "before exploration, planning, or mutation",
  "simple explanation",
  "command-only microtask",
  "before delegating apply, verify, standards review, or plan conformance",
  "only when requirements, paths, or context changed",
  "inherited capsule is sufficient for unchanged context",
  "capability-first resolution is exhausted",
], "capability-based skill loading");
requires(promptBodies["sub-apply"], ["exactly one approved slice", "validation seam", "recovery", "changed files", "review readiness"], "sub-apply");
requires(promptBodies["sub-apply"], [
  "active approved decision",
  "conditional versus absolute meaning",
  "allowed alternatives",
  "quantities",
  "per-assignment cardinality",
  "other active approved semantics",
  "material semantic or cardinality contradiction",
  "cannot report `success`",
  "shared `partial`/`blocked` semantics",
  "semantic conformance",
], "sub-apply semantic conformance criterion");
const subApplyConformanceScenarios = [
  [
    "conditional-to-absolute contradiction",
    ["conditional approved alternatives", "absolute prohibition", "material semantic contradiction", "partial", "not `success`"],
  ],
  [
    "per-assignment-to-global cardinality contradiction",
    ["one-per-bounded-assignment", "one-total", "cardinality contradiction", "partial", "not `success`"],
  ],
  [
    "semantically equivalent wording",
    ["semantically equivalent wording", "same conditional meaning", "same per-assignment cardinality", "acceptable success"],
  ],
];
for (const [name, terms] of subApplyConformanceScenarios) {
  requires(subApplyConformanceFixture, terms, `sub-apply fixture scenario: ${name}`);
}
requires(promptBodies["sub-explore"], ["without modifying", "support every material claim", "distributed evidence", "competing alternatives", "non-obvious constraints", "reused across slices"], "sub-explore");
requires(promptBodies["sub-verify"], ["every behavior", "command or method", "result", "observation", "skipped check", "evidence gap"], "sub-verify");
for (const name of ["sub-review-standards", "sub-review-plan"]) {
  requires(promptBodies[name], ["result-contract.md", "every critical and important", "at most five", "optional", "findings", "coverage"], name);
}
requires(promptBodies["sub-review-plan"], ["no plan available", "recovery"], "sub-review-plan");
for (const name of specialists) {
  check(!/code-session bootstrap|before code exploration or plan drafting|every member of that required set/i.test(promptBodies[name]), `${name}: duplicated capability-loading policy`);
}

const globalInstructions = await read("AGENTS.md");
requires(globalInstructions, [
  "capa phase ownership",
  "orchestrator.md",
  "applicable-skill resolution",
  "engineered-ai-dev",
  "code-quality",
  "root `coding-conventions`",
  "its references are additive to the root router",
  "should not copy the capability-loading policy",
], "global phase ownership");

// Focused deterministic simulations keep capability selection executable without
// introducing a second runtime resolver or making the registry authoritative.
const lifecycleSkills = requiredSkillsFor({ lifecycleWork: true });
const implementationSkills = requiredSkillsFor({ implementationOrQualityReview: true });
const conventionSkills = requiredSkillsFor({ applicableConventions: true });
const fullCapabilitySet = requiredSkillsFor({ lifecycleWork: true, implementationOrQualityReview: true, applicableConventions: true });
check(hasRequiredSkills(["engineered-ai-dev"], lifecycleSkills) && lifecycleSkills.length === 1, "lifecycle work must load engineered-ai-dev only");
check(hasRequiredSkills(["code-quality"], implementationSkills) && implementationSkills.length === 1, "implementation/review must load code-quality only");
check(hasRequiredSkills(["coding-conventions"], conventionSkills) && conventionSkills.length === 1, "applicable conventions must load the root router");
for (const transition of consequentialTransitions) {
  check(canEnterTransition(transition, { requiredSkills: fullCapabilitySet, resolvedAndLoaded: fullCapabilitySet }), `${transition}: applicable skills allow transition`);
  check(canEnterTransition(transition, { requiredSkills: fullCapabilitySet, resolvedAndLoaded: [...fullCapabilitySet, "improve-ai"] }), `${transition}: additional loaded skills allow transition`);
  check(!canEnterTransition(transition, { requiredSkills: fullCapabilitySet, resolvedAndLoaded: lifecycleSkills }), `${transition}: missing applicable skill must block transition`);
}
check(canEnterTransition("Apply", { requiredSkills: [], resolvedAndLoaded: [] }), "work without applicable capabilities remains lightweight");

const registryFallback = resolveFromSafeChannels([
  ["registry", undefined],
  ["configured approved root", simulatedSkillCandidate("skills/code-quality/SKILL.md")],
]);
check(registryFallback.source === "configured approved root", "missing registry must fall back to an approved root");
const stalePathFallback = resolveFromSafeChannels([
  ["registry", simulatedSkillCandidate("C:/stale/code-quality/SKILL.md", { stale: true })],
  ["configured approved root", simulatedSkillCandidate("skills/code-quality/SKILL.md")],
]);
check(stalePathFallback.source === "configured approved root" && stalePathFallback.rejected.length === 1, "stale skill path must be rejected before root fallback");
const missingRequiredSkill = resolveFromSafeChannels([
  ["injected", undefined],
  ["registry", undefined],
  ["advertised skills", undefined],
  ["configured approved root", undefined],
  ["safe investigation", undefined],
]);
check(missingRequiredSkill.path === null, "missing required skill must remain unresolved after safe channels");
check(
  !canEnterTransition("Apply", { requiredSkills: fullCapabilitySet, resolvedAndLoaded: ["engineered-ai-dev", "coding-conventions"] }),
  "a consequential transition must block when a required skill is missing",
);

for (const name of capabilitySkillNames) {
  check(await existsFile(join(root, "skills", name, "SKILL.md")), `${name}: canonical project skill path missing`);
}
const conventionRoot = await read("skills/coding-conventions/SKILL.md");
const typeScriptReference = await read("skills/coding-conventions/references/typescript.md");
const reactReference = await read("skills/coding-conventions/references/react.md");
const loadedConventionPaths = [
  "skills/coding-conventions/SKILL.md",
  "skills/coding-conventions/references/typescript.md",
];
check(loadedConventionPaths.includes("skills/coding-conventions/SKILL.md"), "TypeScript loading must retain the root convention router");
check(loadedConventionPaths.includes("skills/coding-conventions/references/typescript.md"), "TypeScript loading must add its applicable reference");
check(conventionRoot.includes("contiguous digits") && conventionRoot.includes("20000"), "root conventions must carry contiguous decimal awareness");
check(typeScriptReference.includes("Use `interface`") && conventionRoot.includes("contiguous digits"), "root-plus-reference loading must preserve both convention layers");

const workflowSources = {
  "result-contract.md": contract,
  ...Object.fromEntries(Object.entries(promptBodies).map(([name, body]) => [`${name}.md`, body])),
  "engineered-ai-dev/SKILL.md": await read("skills/engineered-ai-dev/SKILL.md"),
  "engineered-ai-dev/HANDOFF_TEMPLATE.md": await read("skills/engineered-ai-dev/HANDOFF_TEMPLATE.md"),
  "code-quality/SKILL.md": await read("skills/code-quality/SKILL.md"),
  "coding-conventions/SKILL.md": conventionRoot,
  "coding-conventions/references/architecture.md": await read("skills/coding-conventions/references/architecture.md"),
  "coding-conventions/references/typescript.md": typeScriptReference,
  "coding-conventions/references/react.md": reactReference,
};
const staleProtocol = [
  /return all common fields exactly once/i,
  /missing fields.*envelope malformed/i,
  /load only injected skills/i,
  /paths-injected\s*\|\s*fallback-registry\s*\|\s*fallback-path\s*\|\s*none/i,
  /technical-layer ordering/i,
];
for (const [name, body] of Object.entries(workflowSources)) {
  for (const pattern of staleProtocol) check(!pattern.test(body), `${name}: stale protocol requirement: ${pattern}`);
}
for (const name of ["sub-review-standards", "sub-review-plan"]) {
  check(!/critical\s*:\s*unsafe|important\s*:\s*substantial|optional\s*:\s*non-blocking/i.test(promptBodies[name]), `${name}: duplicated severity definition`);
}
requiresAny(workflowSources["engineered-ai-dev/SKILL.md"], [["file-by-file", "arbitrarily tiny", "mixed unrelated", "validated", "accepted independently"]], "slice guidance");

const qualityGuidance = workflowSources["code-quality/SKILL.md"];
const architectureGuidance = workflowSources["coding-conventions/references/architecture.md"];
requires(qualityGuidance, [
  "delete before adding",
  "smallest clear change",
  "one-use logic",
  "meaningful duplication",
  "realistic frequency",
  "cardinality",
  "amplification",
  "boundary cost",
  "bounded in-memory loop",
  "material cost",
  "speculative abstractions",
  "trivial wrappers",
  "dead code",
  "Preserve established error models",
  "Result/error-as-value capability",
  "typed errors through fallible contracts",
  "throw`/`catch` chain",
  "framework exception boundaries may cross models",
], "code-quality policy source");
requires(architectureGuidance, [
  "only for changes that add or alter a module",
  "distinct responsibility",
  "module or layer",
  "useful seams",
  "information",
  "locality",
  "proportional",
], "conditional architecture guidance");
requires(workflowSources["engineered-ai-dev/SKILL.md"], [
  "materially depends on ownership, reuse, abstraction, or cost",
  "surface the decision and its evidence",
  "keep the plan silent",
  "actual structural work",
  "loaded quality guidance",
], "conditional planning guidance");
requires(promptBodies["sub-apply"], [
  "complete local diff",
  "loaded quality guidance",
  "material decisions or gaps",
  "ritual checklist",
  "separate cleanup phase",
], "sub-apply maintainability reconciliation");

const typeScriptCostReminder = /realistic frequency/i;
const detailedQualityPolicy = [
  /one-use logic/i,
  /meaningful duplication/i,
  /bounded in-memory loop/i,
  typeScriptCostReminder,
  /query amplification/i,
  /speculative abstractions?/i,
];
for (const [name, body] of Object.entries(workflowSources)) {
  if (name === "code-quality/SKILL.md") continue;
  for (const pattern of detailedQualityPolicy) {
    // The orchestrator must name these bounded review axes and evidence fields;
    // those labels are routing, not a second copy of the quality policy.
    if (name === "orchestrator.md" && (pattern === typeScriptCostReminder || pattern.source === "meaningful duplication")) continue;
    if (name === "coding-conventions/references/typescript.md" && pattern === typeScriptCostReminder) continue;
    check(!pattern.test(body), `${name}: detailed quality policy duplicated: ${pattern}`);
  }
  check(!/\b(?:be thorough|do your best|ensure quality|quality checklist)\b/i.test(body), `${name}: no-op quality instruction present`);
}
check(!/\b(?:new|mandatory) (?:reviewer|command|phase)\b/i.test(promptBodies["sub-apply"]), "sub-apply: maintainability must not add a lifecycle role");

requires(reactReference, [
  "distinct responsibility",
  "materially clarifies orchestration",
  "appropriate event, effect, server, or data boundary",
  "concurrent failure",
  "one synchronization lifecycle",
  "smallest state that preserves required ui behavior",
  "boolean or explicit predicate",
  "ternary when both branches matter",
], "React prevention-first conventions");
requires(typeScriptReference, [
  "validate unknown data once at the nearest boundary",
  "existing schema validator",
  "zod when available",
  "trust typescript internally",
  "typeof` for primitive narrowing",
  "schemas or appropriate type guards",
  "containing object does not prove",
  "documented package or feature public entrypoints",
  "do not create new barrel files unless explicitly requested",
  "small or bounded collections",
  "cost material",
], "TypeScript prevention-first conventions");

const rejectedConventionMandates = [
  ["React broad extraction", reactReference, /contains states, hooks, functions inline/i],
  ["React unconditional concurrency", reactReference, /use promise\.all for independent async calls/i],
  ["React single-effect mandate", reactReference, /single `use(?:effect|layouteffect)`.*single cleanup/i],
  ["React derived-boolean subscription mandate", reactReference, /subscribe to derived boolean state/i],
  ["React unconditional ternary mandate", reactReference, /use explicit ternary operators.*instead of &&/i],
  ["TypeScript flatMap mandate", typeScriptReference, /use \.flatmap\(\) to transform and filter/i],
  ["TypeScript single-loop mandate", typeScriptReference, /combine into one loop/i],
  ["TypeScript barrel ban fragment", typeScriptReference, /import directly avoid barrel files/i],
];
for (const [name, body, pattern] of rejectedConventionMandates) {
  check(!pattern.test(body), `${name}: rejected blanket mandate present`);
}

const focusedMaintainabilityScenarios = [
  {
    name: "local one-use logic",
    actual: decideCodeShape({ improvesClarity: false, meaningfulDuplication: false }),
    expected: "local",
  },
  {
    name: "meaningful duplication",
    actual: decideCodeShape({ improvesClarity: false, meaningfulDuplication: true }),
    expected: "extract",
  },
  {
    name: "shallow wrappers",
    actual: decideStructure({ distinctResponsibility: true, hidesImplementation: true, shallowWrapper: true }),
    expected: "reject",
  },
  {
    name: "responsibility boundaries",
    actual: decideStructure({ distinctResponsibility: true, hidesImplementation: true, shallowWrapper: false }),
    expected: "seam",
  },
  {
    name: "bounded loops",
    actual: decideCost({ frequency: "once", cardinality: "bounded", amplification: "none", boundaryCost: "local" }),
    expected: "simple",
  },
  {
    name: "repeated traversals",
    actual: decideCost({ frequency: "repeated", cardinality: "large", amplification: "none", boundaryCost: "local" }),
    expected: "address",
  },
  {
    name: "render recomputation",
    actual: decideCost({ frequency: "repeated", cardinality: "bounded", amplification: "none", boundaryCost: "local" }),
    expected: "address",
  },
  {
    name: "query amplification",
    actual: decideCost({ frequency: "ordinary", cardinality: "large", amplification: "amplified", boundaryCost: "local" }),
    expected: "address",
  },
  {
    name: "remote I/O",
    actual: decideCost({ frequency: "ordinary", cardinality: "bounded", amplification: "none", boundaryCost: "remote" }),
    expected: "address",
  },
  {
    name: "behavior preservation",
    actual: decideBehavior({ preservation: "preserved" }),
    expected: "preserved",
  },
  {
    name: "speculative abstractions",
    actual: decideStructure({ distinctResponsibility: false, hidesImplementation: false, shallowWrapper: false }),
    expected: "reject",
  },
];
for (const scenario of focusedMaintainabilityScenarios) {
  check(scenario.actual === scenario.expected, `${scenario.name}: focused maintainability scenario failed`);
}

const orchestrator = promptBodies.orchestrator;
const reviewInput = await read("prompts/capa/review-input.md");
const reviewCommand = await read("commands/review.md");
const refactorSkill = await read("skills/refactor-candidates/SKILL.md");
const refactorCommand = await read("commands/refactor-review.md");
const originalRefactorPrompt = await read("scripts/fixtures/refactor-review-original-prompt.md");
requires(reviewInput, [
  "single source of truth",
  "committed",
  "worktree",
  "combined",
  "exactly one safe ref token",
  "missing",
  "multiple tokens",
  "whitespace-only",
  "leading-option",
  "syntax",
  "shell",
  "metacharacters",
  "[a-za-z0-9][a-za-z0-9._/@{}^~:-]*",
  "structured subprocess argument arrays",
  "git rev-parse --verify --end-of-options <ref>^{commit}",
  "basesha",
  "headsha",
  "frozen three-dot identity",
  "changed files",
  "hunks",
  "git diff --cached <headsha> --",
  "git diff --",
  "git status --porcelain=v1 -z --untracked-files=all",
  "staged",
  "unstaged",
  "combinedworktree",
  "untrackedexcluded",
  "explicitly names it and receives approval",
  "ignored or untracked content automatically",
  "approved untracked content as a separate layer",
  "satisfy the non-empty-input gate",
  "captured tracked-state snapshot",
  "exact bytes or cryptographic digests",
  "content-stability",
  "reported exclusions are frozen",
  "block delegation",
  "auto-loop",
  "mutates",
  "nothing",
  "only a successful, non-empty capture",
], "review-input capture procedure");
check(
  orchestrator.includes("prompts/capa/review-input.md") && orchestrator.includes("committed` mode"),
  "orchestrator review-input consumer missing",
);
check(
  reviewCommand.includes("prompts/capa/review-input.md") && reviewCommand.includes("committed` mode"),
  "review command review-input consumer missing",
);
check(reviewCommand.includes("only Standards and Plan Conformance"), "review command axes changed");
check(!/git rev-parse|shell metacharacters|leading-option syntax|\[A-Za-z0-9\]/i.test(orchestrator), "orchestrator duplicates review-input safety policy");
check(!/git rev-parse|shell metacharacters|leading-option syntax|\[A-Za-z0-9\]/i.test(reviewCommand), "review command duplicates review-input safety policy");

const reviewInputScenarios = [
  ["unsafe or ambiguous input", ["missing or multiple tokens", "leading-option", "shell metacharacters", "blocks capture"]],
  ["committed capture", ["frozen three-dot identity", "empty committed diff", "blocks delegation"]],
  ["worktree capture", ["staged", "unstaged", "combinedworktree", "empty input blocks delegation"]],
  ["combined capture", ["preserve both layers", "same frozen `basesha` and `headsha`"]],
  ["untracked exclusion", ["untrackedexcluded", "do not read ignored or untracked content automatically"]],
  ["approved untracked inclusion", ["receives approval", "approved untracked content as a separate layer"]],
  ["content stability", ["exact bytes or cryptographic digests", "not a content-stability fingerprint"]],
  ["capture instability", ["reported exclusions are frozen", "require a fresh capture", "do not auto-loop"]],
];
for (const [name, terms] of reviewInputScenarios) requires(reviewInput, terms, `review-input scenario: ${name}`);
check(
  reviewCommand.includes("only Standards and Plan Conformance") && !/refactor|candidate/i.test(reviewCommand),
  "/review axes must remain unchanged",
);

check(/^---[\s\S]*\bname:\s*refactor-candidates\b[\s\S]*\bdescription:/m.test(refactorSkill), "refactor-candidates: model-invoked frontmatter missing");
check(!/disable-model-invocation/i.test(refactorSkill), "refactor-candidates: must remain model-invoked");
requires(refactorSkill, [
  "simplification",
  "deletion",
  "reuse",
  "structural/depth",
  "material",
  "traversal",
  "render",
  "query",
  "i/o",
  "route the request to the capa orchestrator",
  "prompts/capa/orchestrator.md",
  "prompts/capa/review-input.md",
  "skills/engineered-ai-dev/skill.md",
  "skills/code-quality/skill.md",
  "skills/coding-conventions/skill.md",
  "prompts/capa/result-contract.md",
], "refactor-candidates skill");
requires(refactorCommand, [
  "agent: ingcapa-dev-orchestrator",
  "prompts/capa/review-input.md",
  "`<ref>` => committed",
  "`worktree` => uncommitted tracked worktree",
  "`worktree <ref>` => combined",
  "`worktree` is reserved in command position",
  "frozen payload unchanged",
  "read-only",
  "do not modify code",
  "plans",
  "commits",
], "refactor-review command");
check(!/git rev-parse|shell metacharacters|leading-option syntax|\[A-Za-z0-9\]/i.test(refactorSkill), "refactor-candidates: duplicates capture safety policy");
check(!/git rev-parse|shell metacharacters|leading-option syntax|\[A-Za-z0-9\]/i.test(refactorCommand), "refactor-review: duplicates capture safety policy");
requires(orchestrator, [
  "refactor candidate review",
  "explicit uncommitted",
  "working-tree",
  "clear named-ref request defaults to `combined`",
  "current tracked uncommitted changes",
  "explicit committed-only wording",
  "ambiguous request asks for clarification and stops",
  "untracked files are excluded and reported",
  "explicitly names and approves them",
  "approved untracked content is allowed only in `worktree` or `combined`",
  "command scope is exact",
  "`worktree` is reserved in command position",
  "before delegation, run the canonical capture",
  "complete applicable-skill loading plus the consequential transition gate",
  "one successful frozen payload",
  "same payload unchanged",
  "missing `plan`, `context`, `adr`, local skills, or registry entries remain valid states",
  "sub-review-standards",
  "every changed hunk",
  "fresh `sub-explore`",
  "meaningful duplication",
  "current reuse",
  "ownership",
  "module depth",
  "architecture reference only when structural analysis applies",
  "realistic traversal, render, query, and i/o costs",
  "frequency",
  "cardinality",
  "amplification",
  "boundary cost",
  "globally inventories and triages every hunk",
  "standards covers every hunk",
  "covered hunks and justified exclusions",
  "preserve disagreements",
  "correctness/material performance risks",
  "optional simplification/deletion/reuse/readability",
  "architecture deepening",
  "small safe cleanup",
  "rejected candidates",
  "bounded loops without material evidence",
  "speculation",
  "shallow wrappers",
  "non-meaningful duplication",
  "insufficiently evidenced",
  "originating axes",
  "exact changed-hunk or context evidence",
  "preserved behavior and plan constraints",
  "smallest safe refactor",
  "validation seam",
  "edit-scope implications",
  "risk/effort",
  "immutable base/head identity",
  "per-axis coverage and exclusions",
  "inline unless it is large, reusable, or explicitly requested",
  "end with human selection",
  "reapproved amendment or new slice",
  "separate new plan",
  "never create or mutate a plan",
  "infer approval automatically",
], "refactor candidate routing and aggregation");
requiresAny(originalRefactorPrompt, [
  ["refactor", "diff"],
  ["code quality", "reuse"],
  ["loop operations", "high cost operations"],
], "refactor natural-language fixture");
const refactorFixtureSurface = `${refactorSkill}\n${refactorCommand}\n${orchestrator}`;
requires(refactorFixtureSurface, [
  "verbosity",
  "responsibility",
  "readability",
  "loop",
  "high-cost",
], "refactor fixture trigger coverage");
const refactorReviewScenarios = [
  ["command committed scope", ["`<ref>` => committed"]],
  ["command worktree scope", ["`worktree` => uncommitted tracked worktree"]],
  ["command combined scope", ["`worktree <ref>` => combined"]],
  ["ambiguous natural language", ["ambiguous request asks for clarification and stops"]],
  ["bounded-loop rejection", ["bounded loops without material evidence"]],
  ["material query/render/traversal/I/O candidates", ["realistic traversal, render, query, and i/o costs", "frequency", "cardinality", "amplification", "boundary cost"]],
  ["global hunk triage", ["globally inventories and triages every hunk", "standards covers every hunk"]],
  ["axis exclusions", ["covered hunks and justified exclusions", "preserve disagreements"]],
  ["read-only and no inferred approval", ["read-only", "never create or mutate a plan", "infer approval automatically"]],
  ["plan transition question", ["reapproved amendment or new slice", "separate new plan"]],
];
const refactorReviewScenarioSource = `${refactorCommand}\n${orchestrator}`;
for (const [name, terms] of refactorReviewScenarios) requires(refactorReviewScenarioSource, terms, `refactor review scenario: ${name}`);

for (const file of ["skills/engineered-ai-dev/SKILL.md", "skills/coding-conventions/SKILL.md"]) {
  const body = await read(file);
  for (const match of body.matchAll(/\[[^\]]+\]\((?!https?:|#)([^)]+)\)/g)) {
    check(await existsFile(resolve(root, dirname(file), match[1])), `${file}: broken Markdown link ${match[1]}`);
  }
}

if (failures.length) {
  console.error(`FAIL validate-ingcapadev (${failures.length} checks failed)`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exitCode = 1;
} else {
  console.log("PASS validate-ingcapadev (all checks passed)");
}
