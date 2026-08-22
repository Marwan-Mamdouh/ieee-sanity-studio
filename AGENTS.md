# AGENTS.md

Sanity Studio v5 CMS ("ieee website") for an IEEE student branch site. Content lives in Sanity project `lwizkpum`, dataset `production`.

## Gotchas

- **Everything targets production data.** There is no dev dataset — `npm run dev` edits live production documents. Do not create/delete/mutate content unless asked.
- **New document types must be registered** in `schemaTypes/index.ts` or they won't appear in the studio (easy to miss).
- Schema field names are consumed by the external website via GROQ; renaming a field (e.g. `home_images`, `startDateSecondV`) breaks the frontend even though nothing here references it.
- `static/` is empty but is the Sanity static file dir; keep it.

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

(`npm install` first; strict TS.)

## Style

Prettier config lives inline in `package.json`: **no semicolons, single quotes, printWidth 100, no bracket spacing** (`import {defineType} from 'sanity'`). Match it manually if prettier isn't run. ESLint uses `@sanity/eslint-config-studio` flat config. Commits follow Conventional Commits (`feat:`, `fix:`, `refactor:`, `chore:`).
