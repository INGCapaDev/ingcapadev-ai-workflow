import { readFile, realpath, stat } from "node:fs/promises";
import { dirname, isAbsolute, join, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const configPath = join(root, "opencode.json");
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
const expectedAgents = ["ingcapa-dev-orchestrator", ...specialists];
for (const name of expectedAgents) check(config.agent?.[name], `missing agent: ${name}`);

const taskRules = config.agent?.["ingcapa-dev-orchestrator"]?.permission?.task ?? {};
check(taskRules["*"] === "deny", "orchestrator task deny-all must be first and deny");
check(
  JSON.stringify(Object.keys(taskRules)) === JSON.stringify(["*", ...specialists]),
  "task allowlist must exactly match declared Capa specialists",
);

for (const [name, agent] of Object.entries(config.agent ?? {})) {
  check(agent.model, `${name}: model missing`);
  check(agent.variant, `${name}: variant missing`);
  if (agent.prompt) {
    const match = /^\{file:\.\/(.+)}$/.exec(agent.prompt);
    check(match, `${name}: invalid prompt reference`);
    if (match) check(await existsFile(join(root, match[1])), `${name}: prompt path missing`);
  }
}

for (const name of ["sub-review-standards", "sub-review-plan"]) {
  const permission = config.agent?.[name]?.permission;
  check(permission?.edit === "deny" && permission?.bash === "deny" && permission?.task === "deny", `${name}: review permissions drift`);
}
for (const name of specialists) check(config.agent?.[name]?.permission?.task === "deny", `${name}: delegation must be denied`);

for (const name of ["sub-explore", "sub-verify"]) {
  const bash = config.agent?.[name]?.permission?.bash;
  check(Object.keys(bash ?? {})[0] === "*" && bash?.["*"] === "ask", `${name}: bash default must ask first`);
  for (const command of [
    "git status",
    "git status --short",
    "git status --porcelain",
    "git diff",
    "git diff --stat",
    "git log --oneline",
    "git rev-parse --show-toplevel",
    "git rev-parse --is-inside-work-tree",
  ]) {
    check(bash?.[command] === "allow", `${name}: missing read-only allow ${command}`);
  }
}

const commands = ["plan", "continue", "verify", "review"];
for (const name of commands) {
  const body = await read(`commands/${name}.md`);
  check(body.includes("agent: ingcapa-dev-orchestrator"), `${name}: command agent drift`);
}

const contract = await read("prompts/capa/result-contract.md");
const enumText = "paths-injected | fallback-registry | fallback-path | none";
check(contract.includes(enumText), "result contract Skill Resolution enum drift");
for (const name of ["orchestrator", "sub-explore", "sub-apply", "sub-verify", "sub-review-standards", "sub-review-plan"]) {
  const body = await read(`prompts/capa/${name}.md`);
  check(body.includes("result-contract.md"), `${name}: result contract not consumed`);
  check(!body.includes("Skill Resolution: paths-injected | none"), `${name}: stale Skill Resolution subset`);
}

const verify = await read("prompts/capa/sub-verify.md");
check(verify.includes("approved seam is `N/A`") && verify.includes("`FAIL`") && verify.includes("`INCOMPLETE`"), "N/A verdict semantics missing");
const apply = await read("prompts/capa/sub-apply.md");
check(apply.includes("Working Tree Recovery") && apply.includes("must not mark the slice complete"), "Apply partial/recovery fail-closed scenario missing");
check(contract.includes("envelope malformed") && contract.includes("fail closed"), "malformed output fail-closed scenario missing");
check(contract.includes("fallback-registry") && contract.includes("fallback-path"), "fallback modes not accepted");
const orchestrator = await read("prompts/capa/orchestrator.md");
check(orchestrator.includes("obvious low-risk local micro-change") && orchestrator.includes("For non-trivial development"), "direct vs planned routing scenario missing");
check(orchestrator.includes("canonicalize") && orchestrator.includes("symlink escapes"), "trusted skill-path validation missing");
check(orchestrator.includes("structured subprocess argument array") && orchestrator.includes("--end-of-options"), "safe fixed-point contract missing");

const allowedAbsoluteRoots = [root];
for (const agent of Object.values(config.agent ?? {})) {
  if (!agent.prompt) continue;
  const raw = agent.prompt.slice(6, -1);
  const target = resolve(root, raw);
  const canonical = await realpath(target);
  const inside = allowedAbsoluteRoots.some((allowed) => {
    const rel = relative(allowed, canonical);
    return rel === "" || (!rel.startsWith(`..${sep}`) && rel !== ".." && !isAbsolute(rel));
  });
  check(inside, `configured path escapes live root: ${raw}`);
}
for (const file of ["prompts/capa/orchestrator.md", ...specialists.map((name) => `prompts/capa/${name}.md`)]) {
  const body = await read(file);
  check(!body.includes("C:\\\\\.dotfiles-configs\\\\opencode"), `${file}: hardcoded absolute path`);
}

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

