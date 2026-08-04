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
  const normalized = body.toLowerCase();
  for (const term of terms) check(normalized.includes(term), `${name}: missing semantic invariant: ${term}`);
};
const requiresAny = (body, alternatives, name) => {
  const normalized = body.toLowerCase();
  check(alternatives.some((terms) => terms.every((term) => normalized.includes(term))), `${name}: missing semantic invariant`);
};
const decideCodeShape = ({ improvesClarity, meaningfulDuplication }) =>
  improvesClarity || meaningfulDuplication ? "extract" : "local";
const decideStructure = ({ distinctResponsibility, hidesImplementation, shallowWrapper }) =>
  shallowWrapper || !distinctResponsibility || !hidesImplementation ? "reject" : "seam";
const hasMaterialCostEvidence = ({ frequency, cardinality, amplification, boundaryCost }) =>
  frequency === "repeated" || cardinality === "large" || amplification === "amplified" || boundaryCost === "remote";
const decideCost = (evidence) => (hasMaterialCostEvidence(evidence) ? "address" : "simple");
const decideBehavior = ({ preservation }) => (preservation === "preserved" ? "preserved" : "gap");
const coreSkillNames = ["engineered-ai-dev", "code-quality", "coding-conventions"];
const consequentialTransitions = ["Apply", "Verify", "Standards Review", "Plan Conformance"];
const requiredSkillsFor = ({ codeInvolved, structuredPlanning = false }) => {
  if (codeInvolved) return [...coreSkillNames];
  return structuredPlanning ? ["engineered-ai-dev"] : [];
};
const hasExactSkillSet = (required, resolvedAndLoaded) => {
  const resolved = new Set(resolvedAndLoaded);
  return required.length === resolvedAndLoaded.length && required.every((name) => resolved.has(name));
};
const canEnterTransition = (transition, { codeInvolved, resolvedAndLoaded }) => {
  if (!codeInvolved || !consequentialTransitions.includes(transition)) return true;
  return hasExactSkillSet(coreSkillNames, resolvedAndLoaded);
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

for (const name of ["plan", "continue", "verify", "review"]) {
  const body = await read(`commands/${name}.md`);
  check(body.includes("agent: ingcapa-dev-orchestrator"), `${name}: command agent drift`);
}
const planCommand = await read("commands/plan.md");
requires(planCommand, ["classify code involvement", "core-skill bootstrap", "code exploration", "non-code planning"], "plan command bootstrap entry point");

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
  "code-involved",
  "required core set",
  "engineered-ai-dev",
  "code-quality",
  "root `coding-conventions`",
  "before code exploration or plan drafting",
  "load the root `coding-conventions` router before any applicable language/framework references",
  "those references are additive",
  "never replace it",
  "classification changes to code-involved",
  "simple explanation",
  "command-only microtask",
  "before delegating apply, verify, standards review, or plan conformance",
  "same required core set",
  "inherited capsule or prior phase is not proof",
  "capability-first resolution is exhausted",
  "non-code exception",
], "code-session bootstrap");
requires(promptBodies["sub-apply"], ["exactly one approved slice", "validation seam", "recovery", "changed files", "review readiness"], "sub-apply");
requires(promptBodies["sub-explore"], ["without modifying", "support every material claim", "distributed evidence", "competing alternatives", "non-obvious constraints", "reused across slices"], "sub-explore");
requires(promptBodies["sub-verify"], ["every behavior", "command or method", "result", "observation", "skipped check", "evidence gap"], "sub-verify");
for (const name of ["sub-review-standards", "sub-review-plan"]) {
  requires(promptBodies[name], ["result-contract.md", "every critical and important", "at most five", "optional", "findings", "coverage"], name);
}
requires(promptBodies["sub-review-plan"], ["no plan available", "recovery"], "sub-review-plan");
for (const name of specialists) {
  check(!/required core set|before code exploration or plan drafting|same required core set/i.test(promptBodies[name]), `${name}: duplicated core bootstrap policy`);
}

const globalInstructions = await read("AGENTS.md");
requires(globalInstructions, [
  "capa phase ownership",
  "orchestrator.md",
  "core-skill resolution",
  "engineered-ai-dev",
  "code-quality",
  "root `coding-conventions`",
  "applicable convention references are additive",
  "should not copy the core bootstrap policy",
], "global phase ownership");

// Focused deterministic simulations keep the bootstrap contract executable without
// introducing a second runtime resolver or making the registry authoritative.
const codePlanSkills = requiredSkillsFor({ codeInvolved: true, structuredPlanning: true });
check(hasExactSkillSet(coreSkillNames, codePlanSkills), "/plan code session must require the exact core set");
check(hasExactSkillSet(coreSkillNames, requiredSkillsFor({ codeInvolved: true })), "direct code session must require the exact core set");
for (const transition of consequentialTransitions) {
  check(
    canEnterTransition(transition, { codeInvolved: true, resolvedAndLoaded: coreSkillNames }),
    `${transition}: code transition requires the exact core set`,
  );
  check(
    !canEnterTransition(transition, { codeInvolved: true, resolvedAndLoaded: ["engineered-ai-dev", "coding-conventions"] }),
    `${transition}: missing required skill must block the transition`,
  );
}
check(requiredSkillsFor({ codeInvolved: false }).length === 0, "simple non-code work must not load the code-session set");
check(canEnterTransition("Apply", { codeInvolved: false, resolvedAndLoaded: [] }), "non-code work must keep the consequential gate lightweight");
check(
  hasExactSkillSet(["engineered-ai-dev"], requiredSkillsFor({ codeInvolved: false, structuredPlanning: true })),
  "non-code /plan keeps only the lifecycle skill",
);

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
  !canEnterTransition("Apply", { codeInvolved: true, resolvedAndLoaded: ["engineered-ai-dev", "coding-conventions"] }),
  "a consequential transition must block when a required skill is missing",
);

for (const name of coreSkillNames) {
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
check(
  orchestrator.includes("git rev-parse --verify --end-of-options <ref>^{commit}") &&
    orchestrator.includes("structured subprocess argument array"),
  "review fixed-point shell-safety structure missing",
);
requires(orchestrator, [
  "accepts exactly one ref token",
  "empty or multiple arguments",
  "whitespace payloads",
  "shell metacharacters",
  "leading-option syntax",
  "[a-za-z0-9][a-za-z0-9._/@{}^~:-]*",
  "never construct a shell string",
  "including `--` separation where applicable",
  "sha-to-`head` three-dot diff is non-empty",
], "review input safety");

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
