# AGENTS.md

Sanity Studio v5 CMS ("ieee website") for an IEEE student branch site. Content lives in Sanity project `lwizkpum`, dataset `production`.

## Gotchas

- **Everything targets production data.** There is no dev dataset — `npm run dev` edits live production documents. Do not create/delete/mutate content unless asked.
- **New document types must be registered** in `schemaTypes/index.ts` or they won't appear in the studio (easy to miss).
- Schema field names are consumed by the external website via GROQ; renaming a field (e.g. `home_images`, `startDateSecondV`) breaks the frontend even though nothing here references it.
- `static/` is empty (only `.gitkeep`) but is the Sanity static file dir; keep it.
- `dist/`, `.sanity/`, and `*.tsbuildinfo` are gitignored build artifacts — don't commit them or hand-edit.

## Commands

- `npm run dev` — local studio at localhost:3333
- `npm run build` / `npm run start` — build & serve static bundle
- `npm run deploy` — deploy hosted studio to sanity.io
- `npm run deploy-graphql` — regenerate/deploy the GraphQL API (needed if schema changes should be exposed to the website's GraphQL endpoint)

## Checks

No tests or CI exist. Verify changes with:

```
npx tsc --noEmit && npx eslint .
```

(`npm install` first; strict TS. Both verified to pass on a clean checkout.)

## Style

Prettier config lives inline in `package.json`: **no semicolons, single quotes, printWidth 100, no bracket spacing** (`import {defineType} from 'sanity'`). Match it manually if prettier isn't run. ESLint uses `@sanity/eslint-config-studio` flat config. Commits follow Conventional Commits (`feat:`, `fix:`, `refactor:`, `chore:`).

## Environment (Windows host + WSL)

- The repo lives in WSL (`/home/marwan/github/ieee-sanity-studio`). From Windows shells, run things via `wsl -e bash -lc '...'` — cmd/PowerShell cannot use the UNC path and bare `npx` resolves to a Windows dir, producing a bogus "This is not the tsc command" error.
- Git reports "dubious ownership" from the Windows side; add `git config --global --add safe.directory '//wsl$/Ubuntu/home/marwan/github/ieee-sanity-studio'` if needed, or run git inside WSL.
