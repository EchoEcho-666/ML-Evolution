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

Exploration states and notes are stored in browser local storage.
