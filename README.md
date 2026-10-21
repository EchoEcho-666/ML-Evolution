# ML Civilization

An interactive causal atlas of machine-learning history. The prototype focuses on the sequence-modeling lineage from recurrent networks to the Transformer frontier.

## Develop in GitHub Codespaces

The repository includes a cloud development container with Node.js 22, ESLint,
and Markdown All in One. Dependencies are installed automatically when the
Codespace is created.

1. Open the repository on GitHub.
2. Select **Code**, then **Codespaces**.
3. Select **Create codespace on main**.
4. In the browser-based VS Code terminal, run:

```bash
npm run dev -- --host 0.0.0.0
```

Codespaces forwards port `5173` and opens the application preview. Commit and
push changes from the Codespace so work is saved in GitHub before deleting the
Codespace.

## Cloud checks and deployment

The `Verify and deploy` GitHub Actions workflow runs lint and a production build
for every pull request and every push to `main`. Successful `main` builds are
deployed to GitHub Pages.

One-time GitHub setup:

1. Open the repository on GitHub.
2. Go to **Settings** → **Pages**.
3. Under **Build and deployment**, set **Source** to **GitHub Actions**.
4. Push to `main`, then follow the run under the **Actions** tab.

The deployed URL appears in the workflow's `Deploy GitHub Pages` job and in the
repository's **Deployments** section.

## Launch locally

```bash
npm ci
npm run dev
```

Open the URL shown by Vite (normally [http://localhost:5173](http://localhost:5173)).

## Deploy to Render

This React/Vite app runs as a Render **Static Site**. The root `render.yaml`
contains the build and publish settings; no server or database is required.

1. Push the deployment configuration to GitHub.
2. In [Render](https://dashboard.render.com/), select **New → Blueprint** and
   connect `EchoEcho-666/ML-Evolution`. Apply the `ml-evolution` static site.
3. Wait for the build to succeed and copy the assigned `onrender.com` URL.

Alternatively, select **New → Static Site**, connect the same repository, use
`npm ci && npm run build` as the build command, and `dist` as the publish directory.

Notes and exploration progress are saved separately in each visitor's browser.
They are not shared with other visitors. Paper discovery calls OpenAlex and
Crossref directly, so search availability depends on those external APIs.

Render documentation: [Static sites](https://render.com/docs/static-sites) and
[Blueprint configuration](https://render.com/docs/blueprint-spec).

## Production build

```bash
npm run build
npm run preview
```

## Controls

- Drag the background to pan and scroll to zoom.
- Select a node to read its research analysis and edit local notes.
- Press `⌘K` / `Ctrl+K` to search the atlas.
- Toggle **Lineage** to isolate causal ancestry and descendants.
- Toggle **Fog** (or press `F`) to reveal locked territory.
- Switch to **Timeline** for a chronological projection of the same causal graph.
- Select a color in the map key to show or hide survival, merger, migration, or extinction/stagnation edges.

Exploration states and notes are stored in browser local storage.
