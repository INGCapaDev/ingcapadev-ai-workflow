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

// Catch deterministic shipped Capa wiring, permissions, paths, and contract drift.
// Validate clear structural pass/fail only; exact Markdown, workflow prose, and prompt quality are brittle, freeze writing, and belong to review. Add checks only when structural protection costs less than recovery.
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

const contract = await read("prompts/capa/result-contract.md");
const enumText = "paths-injected | fallback-registry | fallback-path | none";
check(contract.includes(enumText), "result contract Skill Resolution enum drift");
for (const name of ["orchestrator", ...specialists]) {
  const body = await read(`prompts/capa/${name}.md`);
  check(body.includes("result-contract.md"), `${name}: result contract not consumed`);
  check(!body.includes("Skill Resolution: paths-injected | none"), `${name}: stale Skill Resolution subset`);
}

const orchestrator = await read("prompts/capa/orchestrator.md");
check(
  orchestrator.includes("git rev-parse --verify --end-of-options <ref>^{commit}") &&
    orchestrator.includes("structured subprocess argument array"),
  "review fixed-point shell-safety structure missing",
);

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
