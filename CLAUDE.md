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
5. **Leave the bullets under `## [Unreleased]` — do NOT add a version header or promote the section yourself.** The version bump and the `[Unreleased]` → `## [X.Y.Z] - YYYY-MM-DD` promotion happen automatically in CI on every push to `main` (see *Publishing* below). Your job is only to make sure `[Unreleased]` accurately describes what you are shipping; CI stamps the version and date.

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
- **Do NOT bump the version, edit `package.json`'s `version`, tag, or run `npm publish` / `npm version` / `git tag`.** Versioning and publishing are owned entirely by CI (see *Publishing* below). Hand-bumping causes double bumps and merge conflicts with the CI release commit.
- When asked to commit:
  1. Run the changelog check above — make sure your changes are described under `## [Unreleased]` (bullets only, no version header).
  2. Stage files by name (avoid `git add -A` / `git add .`) — include `CHANGELOG.md` and the actual code changes. **Leave `package.json` / `package-lock.json` `version` untouched.**
  3. Commit with a descriptive message in the existing style: `feat(api): …`, `fix(api): …`, `refactor(api): …`, `chore(...): …`.
  4. Never use `--no-verify` to skip the husky hook unless the user has confirmed `API_DOCS_URL` is unavailable and asked you to bypass it. If the hook fails, surface the error.
  5. Never amend or force-push without explicit instruction.
- **Branch & push.** If you are on `main`, create a branch first (the repo has merged PRs from `cursor/*` and `claude/*` branches — naming is flexible). Open a PR rather than pushing straight to `main`. **Merging the PR to `main` is what ships the release** — CI then bumps the patch version, promotes the CHANGELOG, tags `vX.Y.Z`, and publishes to npm. Treat merging to `main` as a publish action: only do it (or push to `main`) when the user has asked to release.
- For PRs: keep titles under 70 chars, use the body for detail.

## Publishing

- **Fully automated. Never publish by hand** — do not run `npm login`, `npm publish`, `npm version`, or `git tag`.
- [.github/workflows/publish.yml](.github/workflows/publish.yml) runs on **every push to `main`** (direct or via merged PR). It: bumps the patch version, promotes `## [Unreleased]` → `## [X.Y.Z] - YYYY-MM-DD` in [CHANGELOG.md](CHANGELOG.md), commits that back to `main` with `[skip ci]`, tags `vX.Y.Z`, and runs `npm publish`.
- Auth uses npm **Trusted Publisher (OIDC)** — no `NPM_TOKEN` secret, no 2FA prompt. The npm package's Trusted Publisher must point at org `squarefi-tech`, repo `bff-api-module-npm`, workflow `publish.yml`.
- The CI bump commit pushes to `main`, so **`main` must allow the `github-actions[bot]` to push** (if `main` is a protected branch, add a bypass for GitHub Actions, otherwise the release push is rejected).
- Because every push to `main` publishes a new patch, batch related changes into one PR — each merge = one npm version.

## Things specific to this repo

- The `Unreleased` section in CHANGELOG.md frequently lags reality — the very first thing to do on any session that involves a commit is **reconcile it against `git log`**.
- The package version in [package.json](package.json) is owned by CI — it is bumped automatically on each push to `main`. Do not edit it by hand. Because CI promotes `[Unreleased]` into the version section at release time, keep `[Unreleased]` accurate so the published version's changelog entry is meaningful.
- Husky pre-commit runs `npm run update:types && npm run build`. If `API_DOCS_URL` is missing the hook will fail; ask the user before bypassing.
- `dist/` is generated and committed. Do not edit it directly — it is regenerated by `npm run build`.
