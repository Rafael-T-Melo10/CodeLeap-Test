# CodeLeap - React Posting Interface

A frontend coding challenge built with React, TypeScript and Vite. Users can choose a display name, browse posts, create content, edit or delete their own displayed posts, and filter or sort the feed.

## Project scope

- React components for the feed, post form, edit modal and delete confirmation.
- Axios API client with list/create/update/delete operations and pagination handling.
- Search by content or author, newest/oldest sorting and a "my posts" filter.
- Display-name persistence in browser local storage.

This repository contains the frontend; it does not implement the external posting API. Display-name matching in the UI is not secure server-side authentication or authorization.

## Run locally

Use Node.js 22 and npm:

```bash
cd frontend/codeleap-frontend
npm ci
```

For the challenge API, create a local `.env` containing `VITE_API_BASE=/api/`; the supplied Vite configuration forwards `/api` to the external challenge endpoint. Alternatively, set `VITE_API_BASE` to a compatible posting API. The API client expects list/create at the base URL and update/delete at `{id}/`. The application rewrites pagination links from the challenge API to `/api`, so a matching development/deployment proxy is required when using that API. The Vite configuration is currently located in `src/vite.config.ts` rather than the usual project root; inspect it when configuring a proxy.

```bash
npm run dev -- --config src/vite.config.ts
npm run build
```

Never place a secret in a `VITE_` variable: Vite exposes those variables to the browser.

## Deployment status

The two previously advertised Vercel URLs returned HTTP 404 during verification on 2026-11-11 and have been removed. A working hosted demo is not currently advertised. This documentation update does not claim a fresh end-to-end deployment test.

## More complete application examples

[Ateliê 3D](https://github.com/Rafael-T-Melo10/atelier3d-demo) and [FinançasLM](https://github.com/Rafael-T-Melo10/financaslm-demo) include backend code, database migrations, fictional demo data and automated tests.
