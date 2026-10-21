# Copilot instructions

## Build, run, and test

- Run the desktop app with `npm start` (starts Electron via `electron .`).
- `package.json` defines no build, lint, or test scripts, and the repository has no configured test runner. There is no single-test command; use `npm start` for a manual smoke check.

## Architecture

- This is an Electron desktop popup. `main.js` creates a frameless, transparent, fixed-size (380×480), always-on-top `BrowserWindow`, loads the root `index.html`, positions it at the bottom-right of the primary display, and hides it on blur.
- `index.html`, `styles.css`, and `script.js` form the renderer. The HTML defines the home, profile, affirmation, and resources panels; `script.js` handles navigation and DOM interactions, and `styles.css` provides the window and panel layouts.
- Renderer state is held in the DOM: profile edits and interests are not persisted. Images are referenced directly from `assets/`.
- The window disables Node integration and enables context isolation. Keep Electron and Node APIs out of renderer code. `main.js` points `webPreferences.preload` at a root `preload.js` and listens for `window-control-close` and `window-control-minimize`, but no root `preload.js` currently exists. Renderer-to-main features need a narrow preload bridge (for example, with `contextBridge`) and matching IPC handlers; do not assume the current renderer can send those channels.

## Repository-specific conventions

- Keep panel IDs, navigation selectors, and CSS classes aligned across `index.html`, `script.js`, and `styles.css`. Panels use `.view-panel`; switch visibility by adding or removing `.hidden`.
- Register renderer handlers inside `DOMContentLoaded`. Existing code guards optional elements because controls are not present on every panel.
- Navigation icons are repeated in multiple panels. Some routing binds through `img[src*="..."]` and its `.nav-icon` parent; asset filenames and selectors therefore affect navigation behavior. Avoid duplicate IDs when adding navigation elements: `getElementById` only resolves one element, and the current markup already repeats some navigation IDs.
- Keep the renderer as plain JavaScript (no module bundler); `main.js` uses CommonJS. Put UI behavior in `script.js` and Electron window/IPC behavior in `main.js`.
- Keep asset paths and extensions exact; `assets/` contains both `.jpg` and `.png` files.
- The custom title bar uses `-webkit-app-region: drag`; interactive controls within it need `-webkit-app-region: no-drag`.
