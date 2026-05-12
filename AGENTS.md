# AGENTS.md

## Cursor Cloud specific instructions

This is a **TypeScript SDK library** (`squarefi-bff-api-module`) — not a runnable application. It wraps the Squarefi BFF API and is published to npm for use in frontend/backend projects.

### Key commands

| Task | Command |
|---|---|
| Install deps | `npm ci` |
| Build | `npm run build` (runs `tsc`) |
| Type check | `npm run check-types` (runs `tsc --noEmit`) |
| Format check | `npx prettier --check .` |
| Format fix | `npx prettier --write .` |
| Tests | `npm test` (runs `jest`) |
| Generate API types | `npm run update:types` (requires `API_DOCS_URL` env var) |

### Caveats

- **prettier** is referenced in `package.json` scripts (`format`, `format:check`) but is **not listed in devDependencies**. Use `npx prettier` to run it.
- **No test files** exist in the repo yet. `npm test` (jest) exits with code 1 due to no tests found. Use `--passWithNoTests` flag if needed.
- **ESM with directory imports**: The compiled output (`dist/`) uses extensionless/directory imports and is intended for consumption via bundlers (Vite/Webpack/Next.js), not directly by Node.js. Use `tsx` to run source files directly for verification.
- **Husky pre-commit hook** runs `npm run update:types` then `npm run build`. The `update:types` script requires the `API_DOCS_URL` environment variable pointing to the OpenAPI docs endpoint.
- **Supabase features** (storage, realtime) require `SUPABASE_URL` and `SUPABASE_PUBLIC_KEY` env vars. The SDK gracefully logs a warning and skips Supabase client creation when these are missing.
