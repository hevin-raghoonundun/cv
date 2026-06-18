# Hevin Raghoonundun — CV / Portfolio

A single-page personal CV built with **native HTML & CSS** (no frameworks, no build step).
Cyberpunk-neon theme, fully responsive, and accessible (semantic markup, skip link,
keyboard focus styles, `prefers-reduced-motion` support).

## Files

| File          | Purpose                                  |
| ------------- | ---------------------------------------- |
| `index.html`  | Page structure & content                 |
| `styles.css`  | All styling (theme, layout, animations)  |
| `favicon.svg` | Neon "HR" monogram tab icon              |
| `.nojekyll`   | Tells GitHub Pages to serve files as-is  |

## View locally

Just open `index.html` in a browser — that's it. (An internet connection lets the
Google Fonts load; otherwise it falls back to clean system fonts.)

## Deploy to GitHub Pages

This is set up as a **project page** → it will live at
`https://<your-username>.github.io/cv`.

1. Create a new **public** repo on GitHub named **`cv`** (don't add a README — this folder already has one).
2. From this folder, push it up:
   ```bash
   git remote add origin https://github.com/<your-username>/cv.git
   git branch -M main
   git push -u origin main
   ```
3. On GitHub: **Settings → Pages → Build and deployment**
   - Source: **Deploy from a branch**
   - Branch: **`main`** / folder: **`/ (root)`** → **Save**
4. Wait ~1 minute, then visit **`https://<your-username>.github.io/cv`**.

## Editing later

All the content lives in `index.html` — edit the text directly. Colours and fonts
are defined as CSS variables at the top of `styles.css` (`:root { ... }`) if you
ever want to retheme.
