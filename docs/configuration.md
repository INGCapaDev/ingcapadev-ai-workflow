# Configuration Notes

Start with the [Quick Start](../README.md#quick-start). This reference explains the public [configuration template](../opencode.example.json); it does not inspect or guarantee an existing installation's private configuration.

## Shell and Paths

Install under `~/.config/opencode`, preserving the `commands/`, `prompts/capa/`, and `skills/` paths. `{file:./prompts/capa/...}` references are relative to the configuration file. Copy whole skill directories, including nested references and companion files.

The example uses `C:/Program Files/Git/bin/bash.exe`. On Windows, use Git Bash from Git for Windows, not the `bash.exe` WSL launcher. On Linux/macOS, select your installed Bash executable, such as `/bin/bash`.

Replace the `YOUR_USERNAME` and `C:/path/to/opencode` permission-path placeholders with intentional locations. Preserve the agent IDs, task allowlist, and reviewer/checker restrictions when merging. Global and project configuration can combine; review your effective setup rather than treating the example as an access-control guarantee.

## Optional Integrations

- **Engram:** install it separately so the example's `engram mcp --tools=agent` command is available.
- **Context7:** configure the remote MCP entry's API key.
- **Google/Gemini:** the example's provider settings and `opencode-gemini-auth` plugin are provider-specific conveniences, not Capa requirements. Remove them if your provider setup does not use them.

To disable unused MCP servers, merge the relevant overrides into your configuration:

```json
{
  "mcp": {
    "context7": { "enabled": false },
    "engram": { "enabled": false }
  }
}
```

If you already use a memory adapter, reconcile its behavior with [AGENTS.md's memory policy](../AGENTS.md#engram-persistent-memory). Capa owns semantic saves and delegated outcomes wait for human acceptance; adapters must not inject a competing policy. Personal plugins are not part of this repository's public core install, and copying the template does not reconfigure an existing adapter.

## Permission Boundaries

The template starts shell commands at `ask`, then allows ordinary Git/GitHub inspection, filesystem metadata, search, and listed lint/typecheck/format/test commands. Later rules keep output files, external helpers, search preprocessors, snapshot updates, and delivery approval-gated.

- Git inspection accepts ordinary argument variations. For captured review evidence, use `--no-ext-diff --no-textconv`; raw hashing uses `git hash-object --no-filters -- <file>`.
- Git configuration-value queries may expose secrets and are not preapproved. `git grep` also remains approval-gated because option variants can launch pager helpers; use dedicated search tools or ordinary `rg`/`grep` instead.
- Formatters, lint autofix, and trusted test scripts can write files even when allowed. Shell access is not read-only execution. The checker and native `explore` deny editor writes and delegation but retain shell access; the review axes additionally deny Bash.
- Parsed commands are evaluated separately. A permitted inspection inside an arbitrary script does not approve that whole script. Operator-pattern rules are conservative checks, not a shell sandbox.
- Dedicated Read-tool secret rules do not govern shell search. `opencode.json` being gitignored is publication hygiene, not access control. Keep credentials out of shared files and avoid private configuration dumps.

Use non-mutating checks for read-only assignments. Permission rules assume a trusted installed toolchain and repository setup; they do not prove scripts cannot write or private files cannot be reached.

## Windows Permission-Scanning Workaround

The existing setup documents a reproduced issue on **OpenCode 1.18.35**: under PowerShell, `git diff --stat -p -- <path>` executed despite an explicit `git diff*` deny, while the form without the standalone `--` was blocked. That runtime's shell implementation skips a Bash permission request when its parsed command scan yields no patterns; the observed behavior is consistent with that path, but the exact AST was not captured.

Git Bash blocked both forms in the original denial probe. This is a workaround for that reproduced case, not a universal guarantee or a fresh validation of other versions. Keep Git's `--` argument separator; removing it is not the solution.

The template permits selected inspection cmdlets through this fixed form:

```sh
powershell -NoProfile -NonInteractive -Command 'Test-Path README.md'
```

Equivalent listed `pwsh` forms cover `Test-Path`, `Get-ChildItem`, `Get-Item`, `Get-Location`, `Select-String`, and `Get-FileHash`. Other invocation forms, expressions, and arbitrary PowerShell scripts require approval.

Source: [OpenCode v1.18.35 shell implementation](https://github.com/anomalyco/opencode/blob/v1.18.35/packages/opencode/src/tool/shell.ts).
