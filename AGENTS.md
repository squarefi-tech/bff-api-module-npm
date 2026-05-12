# AGENTS.md

## Cursor Cloud specific instructions

This is a **TypeScript SDK library** (`squarefi-bff-api-module`) — not a runnable application. It provides a typed API client for the Squarefi BFF API.

### Key commands

| Task | Command |
|------|---------|
| Install deps | `npm ci` |
| Build | `npm run build` |
| Type check | `npm run check-types` |
| Format check | `npx prettier --check .` |
| Format fix | `npx prettier --write .` |
| Tests | `npm test` |

### Caveats

- **Prettier is not a devDependency.** The `format` and `format:check` npm scripts reference `prettier` directly, but it is not listed in `devDependencies`. Use `npx prettier` instead of `npm run format:check`.
- **No test files exist** in the repo. `npm test` (Jest) exits with code 1 because there are no matching test files. Use `--passWithNoTests` if you need a zero exit code.
- **Module resolution is `bundler`.** The compiled output in `dist/` uses bare directory imports and cannot be loaded directly by Node.js ESM. The library is designed to be consumed by bundlers (Vite, Webpack, etc.). To verify the build, check that `dist/index.js` and `dist/index.d.ts` exist and the file count is correct (currently 39 `.js` + 39 `.d.ts` files).
- **Husky pre-commit hook** runs `npm run update:types` then `npm run build`. The `update:types` script requires `API_DOCS_URL` env var pointing to a live OpenAPI spec endpoint. If that env var is not set, the pre-commit hook will fail. You can skip hooks with `git commit --no-verify` when `API_DOCS_URL` is unavailable.
- **No external services** are needed for building or type-checking. All API URLs, Supabase, and TOTP endpoints are runtime-only dependencies.
