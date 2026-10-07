# IEEE Website — Sanity Studio

This is the content-management studio for the IEEE student branch website. It is a
[Sanity Studio](https://www.sanity.io/docs) (v5) that editors use to manage the site's
content: events, committees, and the home page. The published content is consumed by a
separate frontend website via Sanity's GROQ/GraphQL APIs — this repo is the studio only.

- Sanity project ID: `lwizkpum`
- Dataset: `production` (no dev dataset — editing always touches live content)

## What's in here

```
schemaTypes/          Document schemas registered in the studio
  event.ts            Events (talks, workshops, competitions, socials)
  committee.ts        Student committees (technical, operation, branding)
  homePage.ts         Home page images
  index.ts            Schema registry — every type MUST be exported here
sanity.config.ts      Studio config: project, dataset, plugins
sanity.cli.ts         CLI config (deploy/GraphQL targets)
static/               Empty static-file dir; keep it
AGENTS.md             Detailed guide for LLM agents working in this repo
```

## Working with it

```bash
npm install
npm run dev        # local studio at localhost:3333 (edits LIVE production data)
npm run build      # production build -> dist/
npm run start      # serve the built bundle locally
npm run deploy     # deploy the studio to sanity.io
npm run deploy-graphql   # regenerate the GraphQL API (run after schema changes)
```

Verify changes (no tests/CI exist):

```bash
npx tsc --noEmit && npx eslint .
```

## Important notes for contributors (human or AI)

- **There is no dev dataset.** `npm run dev` and the studio edit real production
  documents. Do not create, delete, or mutate content unless explicitly asked.
- **New document types must be added to `schemaTypes/index.ts`** or they will not
  appear in the studio.
- **Schema field names are an API.** The external website queries fields like
  `home_images`, `startDateSecondV`, and `orderNum` directly. Renaming or removing a
  field in a schema breaks the frontend even though nothing in this repo references it.
- Style: Prettier config is inline in `package.json` (no semicolons, single quotes,
  printWidth 100, no bracket spacing). Commits follow Conventional Commits.

For deeper detail — environment quirks (Windows host + WSL), gotchas, and workflow
guidance — read [`AGENTS.md`](./AGENTS.md).
