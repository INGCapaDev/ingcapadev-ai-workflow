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
requires(promptBodies["sub-apply"], ["exactly one approved slice", "validation seam", "recovery", "changed files", "review readiness"], "sub-apply");
requires(promptBodies["sub-explore"], ["without modifying", "support every material claim", "distributed evidence", "competing alternatives", "non-obvious constraints", "reused across slices"], "sub-explore");
requires(promptBodies["sub-verify"], ["every behavior", "command or method", "result", "observation", "skipped check", "evidence gap"], "sub-verify");
for (const name of ["sub-review-standards", "sub-review-plan"]) {
  requires(promptBodies[name], ["result-contract.md", "every critical and important", "at most five", "optional", "findings", "coverage"], name);
}
requires(promptBodies["sub-review-plan"], ["no plan available", "recovery"], "sub-review-plan");

const workflowSources = {
  "result-contract.md": contract,
  ...Object.fromEntries(Object.entries(promptBodies).map(([name, body]) => [`${name}.md`, body])),
  "engineered-ai-dev/SKILL.md": await read("skills/engineered-ai-dev/SKILL.md"),
  "engineered-ai-dev/HANDOFF_TEMPLATE.md": await read("skills/engineered-ai-dev/HANDOFF_TEMPLATE.md"),
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
