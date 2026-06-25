# MCP DS Sandbox — Storybook

Design system component library for **MCP DS Sandbox** (Figma), built with React, Ant Design, and design tokens.

## Live Storybook (GitHub Pages)

**https://gabrielteooo.github.io/ds-sandbox-storybook/**

Deployed automatically from `main` via [`.github/workflows/static.yml`](.github/workflows/static.yml).

## Local development

```bash
npm install          # requires Font Awesome Pro .npmrc — see below
npm run storybook    # http://localhost:6006
```

## GitHub Pages setup

### 1. Enable Pages (one-time)

In the GitHub repo: **Settings → Pages → Build and deployment**

- **Source:** GitHub Actions (not “Deploy from a branch”)

### 2. Add the Font Awesome secret (required for CI)

The workflow installs **Font Awesome Pro** packages. Add a repository secret:

1. GitHub repo → **Settings → Secrets and variables → Actions**
2. **New repository secret**
3. Name: `FONTAWESOME_NPM_TOKEN`
4. Value: your [Font Awesome npm token](https://fontawesome.com/account/general)

Without this secret, `npm ci` fails in CI and Storybook will not redeploy on push to `main`.

### 3. Deploy

Push to `main`, or run the workflow manually:

**Actions → Deploy static content to Pages → Run workflow**

### 4. Verify

- Workflow run should complete successfully
- Live URL should show the latest stories after the deploy step finishes

## Build for GitHub Pages locally

```bash
STORYBOOK_BASE_PATH=/ds-sandbox-storybook/ npm run build-storybook
# Output: storybook-static/
```

The base path must match the repo name (`/ds-sandbox-storybook/`) so assets load correctly on GitHub Pages.

## Font Awesome Pro (local install)

Create a local `.npmrc` (gitignored) with your Font Awesome npm token:

```
@awesome.me:registry=https://npm.fontawesome.com/
@fortawesome:registry=https://npm.fontawesome.com/
//npm.fontawesome.com/:_authToken=YOUR_TOKEN
```

## Related docs

- [`AGENTS.md`](AGENTS.md) — conventions for building UI in this repo
- [`design-system-audit.md`](design-system-audit.md) — Figma tokens and node IDs
- [`prompts/figma-screen-to-storybook.md`](prompts/figma-screen-to-storybook.md) — Cursor prompt for Figma → Storybook
