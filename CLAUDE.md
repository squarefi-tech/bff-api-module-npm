# CLAUDE.md

Guidance for Claude Code when working in this repository.

## Project at a glance

This is **`squarefi-bff-api-module`** — a TypeScript SDK library that wraps the Squarefi BFF API. It is **not a runnable application**: it is published to npm and consumed by bundler-based apps (Vite, Webpack, Next.js, etc.).

- Entry point: [src/index.ts](src/index.ts)
- Public API surface lives under [src/api/](src/api/), constants in [src/constants.ts](src/constants.ts), React hooks in [src/hooks/](src/hooks/), shared utilities in [src/utils/](src/utils/).
- Types are auto-generated from the live OpenAPI spec via `npm run update:types` ([scripts/](scripts/)).

## Commands

| Task | Command |
|------|---------|
| Install deps | `npm ci` |
| Build | `npm run build` |
| Type check | `npm run check-types` |
| Regenerate API types from OpenAPI | `npm run update:types` (needs `API_DOCS_URL`) |
| Format check | `npx prettier --check .` |
| Format fix | `npx prettier --write .` |
| Tests | `npm test` (Jest — no test files yet, exits 1 without `--passWithNoTests`) |

See [AGENTS.md](AGENTS.md) for additional notes on caveats (Prettier not in devDeps, `bundler` module resolution, the husky pre-commit hook requiring `API_DOCS_URL`).

## ⚠️ MANDATORY: Update CHANGELOG.md before every commit

This is a **hard requirement**, not a suggestion. Before staging files for a commit:

1. **Open [CHANGELOG.md](CHANGELOG.md) and read the most recent entries.**
2. **Backfill any prior versions that are missing or have a placeholder** like `Version bump for latest changes`, `chore: update API types`, or any entry that does not actually describe the change. Use `git log <prev-version-tag>..<that-version-tag>` (or the commit immediately preceding the version bump) to extract the real change and write a meaningful entry.
3. **Add an entry for the change you are about to commit** under `## [Unreleased]`, choosing the correct section (`### Added`, `### Changed`, `### Fixed`, `### Removed`, `### Deprecated`, `### Security`). One bullet per logically distinct change. Describe **what changed and why**, not the file names.
4. **Use the existing format** ([Keep a Changelog](https://keepachangelog.com/en/1.0.0/) + SemVer). Versions go newest → oldest, top → bottom. Date format is `YYYY-MM-DD`.
5. **Every commit bumps the version** (see *Commit & PR workflow* below). When you bump, rename `## [Unreleased]` to `## [X.Y.Z] - YYYY-MM-DD` and start a fresh empty `## [Unreleased]` block above it — the new version section must already contain the bullets, so the diff that ships to npm is fully described.

If the user asks you to commit and the changelog has not been updated, **update the changelog first, in the same commit**. Do not skip this even for tiny edits — type tweaks, renames, and formatting changes are still consumer-visible because this is a published SDK.

### When NOT to add a changelog entry

- Purely internal docs not shipped to npm (this file, `README.md` tweaks that don't affect the public API, `AGENTS.md`).
- Local config (`.husky/`, `.prettierrc`, `.gitignore`) that has no consumer impact.
- Re-running `npm run update:types` with **no diff** in the public types.

When in doubt, add the entry.

## Coding rules

- **Public API is the source of truth for consumers.** Treat anything exported from [src/index.ts](src/index.ts) (re-exports of `api/`, `constants.ts`, `hooks/`) as a versioned surface — renames and signature changes need a changelog entry and, ideally, a minor bump (or major if breaking).
- **Do not hand-edit generated OpenAPI types.** Files under `src/api/types/` (or wherever `openapi-typescript` writes) come from `npm run update:types`. If types are wrong, fix the upstream spec or the generator script, not the output.
- **Module resolution is `bundler`.** Imports may rely on bare directory paths — do not "fix" them to Node-ESM-compatible paths.
- **Match existing style.** Prettier config is in `.prettierrc`; run `npx prettier --write` on any files you touch.
- **No new top-level docs files** (`*.md`) unless the user asks. The repo already has `README.md`, `AGENTS.md`, `CHANGELOG.md`, plus a few `*_INSTRUCTIONS.md` / `*_SUMMARY.md` files — don't add more.
- **No emojis in code or commit messages** unless explicitly requested.
- **Comments only when the *why* is non-obvious.** Don't restate what the code does.

## Commit & PR workflow

- **Never commit unless the user explicitly asks.**
- When asked to commit, the repo follows a **release-ready commit** workflow — every commit ships a new patch version so all that remains is `npm publish`:
  1. Run the changelog check above — update if needed.
  2. **Bump the patch version without auto-tagging**:
     ```sh
     npm version patch --no-git-tag-version
     ```
     This updates `package.json` + `package-lock.json` only. Read the new version back from `package.json`.
  3. **Promote `[Unreleased]` to the new version** in [CHANGELOG.md](CHANGELOG.md): rename `## [Unreleased]` → `## [X.Y.Z] - YYYY-MM-DD` and insert a fresh empty `## [Unreleased]` block above it. The promoted block must contain the bullets you just added in step 1.
  4. Stage files by name (avoid `git add -A` / `git add .`) — include `package.json`, `package-lock.json`, `CHANGELOG.md`, and the actual code changes.
  5. Commit with a descriptive message in the existing style: `feat(api): …`, `fix(api): …`, `refactor(api): …`, `chore(...): …`. **Do not** use a bare `X.Y.Z` message — the version bump is part of this feature commit, not a separate one.
  6. **Tag the commit**: `git tag vX.Y.Z`. Do not push the tag automatically — leave that and `npm publish` to the user.
  7. Never use `--no-verify` to skip the husky hook unless the user has confirmed `API_DOCS_URL` is unavailable and asked you to bypass it. If the hook fails, surface the error.
  8. Never amend or force-push without explicit instruction.
- If the user asks for an explicit version (`minor`, `major`, or a specific number), use that instead of `patch` in step 2. Default is `patch`.
- For PRs: keep titles under 70 chars, use the body for detail. The repo has merged PRs from `cursor/*` and `claude/*` branches — branch naming is flexible.

## Things specific to this repo

- The `Unreleased` section in CHANGELOG.md frequently lags reality — the very first thing to do on any session that involves a commit is **reconcile it against `git log`**.
- The package version in [package.json](package.json) is the published version. The matching CHANGELOG entry must exist before publishing — never leave a version on npm without a changelog entry describing it.
- Husky pre-commit runs `npm run update:types && npm run build`. If `API_DOCS_URL` is missing the hook will fail; ask the user before bypassing.
- `dist/` is generated and committed. Do not edit it directly — it is regenerated by `npm run build`.
