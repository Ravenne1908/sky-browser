# Sky Browser UI prototype (Electron)

> **This is a mock-up of the Sky Browser interface — NOT the real browser.**
> The real Sky Browser is a Firefox ESR fork built from this repo's root
> (see the main README). This prototype exists to try the look & feel in
> seconds, on any machine, while that build matures.

**What it shares with the real project:** the identity (name, logo,
palette — see `docs/branding.md`), the start page design, and default
search (DuckDuckGo).

**What it is NOT:** not Gecko, not privacy-hardened, unrelated to the
`patches/` and `prefs/` of the main project. Electron means Chromium plus
Node — fine for a UI mock, not the product.

## Run it

**Windows:** double-click `launch-sky-browser.bat`
(first run installs Electron, ~2–3 min; then it starts instantly).

**Any OS with Node.js ≥ 18:**

```bash
cd preview/electron
npm install
npm start
```

## Shortcuts

| Keys | Action |
|---|---|
| Ctrl+T | new tab |
| Ctrl+W | close tab |
| Ctrl+L | focus the address bar |
| Enter (address bar) | navigate — a plain sentence searches on DuckDuckGo |

## Scope

This folder may later serve as the UI reference for the real browser's
interface, or be retired once the Firefox build ships — decision deferred;
it must never block the main project.
