# Astro + Bun Performance Demo

This project demonstrates **Astro’s HTML-first architecture**, **partial hydration (islands)**, and **multi-framework support** using a realistic, performance-heavy example.

It combines:

- Astro for static rendering
- React and Vue islands for interactivity
- AG Grid for real-world UI complexity
- Bun and Node.js backends for runtime comparison

The goal is to show **where Astro provides real value compared to a traditional SPA**, not just a minimal example.

---

## 🚀 Project Structure

Relevant parts of the project:

```text
/
├── public/
│   └── favicon.svg
├── src
│   ├── components
│   │   ├── AppIsland.jsx          # React island (controls + grid)
│   │   ├── PerfIsland.jsx         # Independent performance island
│   │   └── vue/
│   │       ├── AppIslandVue.vue   # Vue island (same logic as React)
│   │       ├── VueControlsIsland.vue
│   │       └── VueGridIsland.vue
│   ├── pages
│   │   └── index.astro            # Static Astro page + islands
│   └── assets
├── server.ts                      # Bun backend
├── server-node.ts                 # Node.js backend
└── package.json
```

Astro renders the page shell as static HTML and hydrates only the interactive islands.

---

## 🧞 Commands

All commands are run from the root of the project:

| Command               | Action                                      |
| --------------------- | ------------------------------------------- |
| `bun install`         | Install dependencies                        |
| `bun dev`             | Start dev server at `http://localhost:4321` |
| `bun build`           | Build production site to `./dist`           |
| `bun preview`         | Preview the production build locally        |
| `bun run server:bun`  | Start the Bun backend                       |
| `bun run server:node` | Start the Node.js backend                   |

---

## Why Astro?

This project demonstrates Astro’s core strengths using a **heavy UI component (AG Grid)** and a **real backend comparison (Bun vs Node.js)**.

### 1. HTML-first rendering

Astro renders pages as static HTML by default.

- Headers, explanations, and layout ship **zero JavaScript**
- Content is immediately visible without hydration

---

### 2. Partial hydration (Islands)

Only interactive parts hydrate:

- Backend switch controls
- AG Grid table (React and Vue implementations)
- Performance overlay

Everything else remains static HTML.

Hydration is **explicit**, not automatic.

---

### 3. Clear client/server boundaries

The frontend explicitly fetches data from:

- Bun backend
- Node.js backend

Performance metrics are exposed via HTTP headers:

- Cold start time
- Query time
- Runtime

---

### 4. Frameworks only where needed

Frameworks are used **surgically**:

- React for complex grid interactions
- Vue for an equivalent interactive implementation
- No framework for layout, text, or static content

Astro coordinates all frameworks without coupling them.

---

### 5. Performance by default

- Minimal JavaScript on initial load
- Cached framework chunks after first hydration
- Fast `DOMContentLoaded` even with heavy UI components

Astro optimizes by default instead of requiring manual tuning.

---

## React / Vue SPA vs Astro

### React / Vue SPA

- Entire page depends on JavaScript
- One global framework runtime
- Hydration happens for the whole app
- Static content still ships JS

Even with SSR, the framework runtime is required to hydrate everything.

---

### Astro (this project)

- HTML-first rendering by default
- JavaScript is opt-in per component
- Partial hydration via islands
- Frameworks used only where necessary

Static content never hydrates and never ships JS.

---

## Multi-framework support

Astro allows multiple frameworks on the same page:

- React for complex grids
- Vue for a parallel interactive implementation
- Independent hydration strategies per island

Each island ships, loads, and hydrates independently.

This project demonstrates React and Vue islands side by side,
coexisting without shared runtime or coupling.
