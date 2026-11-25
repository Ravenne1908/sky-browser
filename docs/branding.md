# Branding & trademark compliance

Sky Browser is a modified build of Firefox. Mozilla's trademark policy is
clear: modified builds **must not** use the Firefox name, logos, icons or
other Mozilla branding. This document is the plan for (a) staying compliant
and (b) giving Sky Browser its own identity.

## Stage 0 — where we start (current state)

The build uses upstream's **`browser/branding/unofficial`** branding, the
trademark-safe generic set Mozilla ships exactly for third-party builds. No
Firefox logos, but no Sky identity yet either. The mozconfig line:

```
ac_add_options --with-branding=browser/branding/unofficial
```

## Stage 1 — full Sky Browser rebrand (milestone M1)

Goal: the application is *visibly Sky Browser everywhere* — installer,
window title, taskbar, about pages, user-agent partner IDs, no Mozilla logos.

The plan, as the first real patches:

1. **Create `browser/branding/skybrowser/`** — copy `browser/branding/unofficial`
   as a base and study `browser/branding/nightly` for the full file list.
   Contents (adapted per file): icon PNGs (16/22/24/32/48/64/128/256), the
   Windows `.ico` bundle, `default16.png`-style content-window icons,
   `about-logo.png` for the about pages, `wordmark` and branding strings
   (`brand.dtd`, `brand.properties`: `brandFullName`, `brandShortName`,
   `vendorShortName` → "Sky Browser", "Sky", "Sky Community"...).
2. **Point mozconfig at it**: `--with-branding=browser/branding/skybrowser`
   and switch `mozconfig` in this repo accordingly.
3. **App identity strings** — `MOZ_APP_DISPLAYNAME=Sky Browser`,
   `MOZ_APP_NAME=skybrowser` etc. are defined by the branding directory's
   `moz.configure`/`branding` config; set ours there.
4. **Check the leftovers** — search the built app for "Firefox" strings in
   UI-visible places (`about:support`, about pages, dialogs) and decide each:
   legitimate "based on Firefox" attribution (about page, NOTICE) vs branding
   that must change.
5. **Preinstall plan for uBlock Origin** (M3) — investigate upstream's
   distribution/extensions mechanism for bundled extensions; ship as a patch
   with the `.xpi` fetched from the official AMO releases and checksum-pinned.

Deliverables for M1 are tracked in the README roadmap.

## Identity assets (this repo)

- `assets/logo/sky-browser-logo.svg` — app icon / logo (sky gradient, white
  contrail-swoosh "S").
- `assets/logo/sky-browser-wordmark.svg` — text wordmark (placeholder; uses
  a system font until a custom wordmark is drawn).

Color palette:

| Token | Hex | Usage |
|---|---|---|
| Sky Deep | `#0B4A9E` | primary dark, wordmark |
| Sky Azure | `#2F8FE0` | primary accent |
| Sky Horizon | `#A5E3FB` | light background accents |
| Cloud | `#FFFFFF` | swoosh, text on gradients |

To rasterize for the branding directory (16→256 px PNGs + `.ico`):

```bash
# with ImageMagick (or any SVG rasterizer: resvg, Inkscape...)
magick -background none assets/logo/sky-browser-logo.svg -resize 512x512 \
  ICONS_DIR/default128.png
# ...then per-size exports; on Windows, ImageMagick can emit .ico directly.
```

## Naming & trademark diligence (TODO before v0.1)

- [ ] GitHub repo name `sky-browser` free (it is at scaffolding time).
- [ ] Quick trademark search: **"Sky" is a registered and litigious brand in
      broadcasting/telecom (Sky UK/EU)** — a browser named "Sky Browser" with
      a sky-themed logo is likely fine (different sector, generic word), but
      do a proper check for your target countries, or a short consult with a
      trademark professional, before promoting the project widely.
- [ ] Domain check: `skybrowser.dev` / `.app` / `.net` availability for a
      future landing page.
- [ ] Social handles if/when the project needs them.

*This document is not legal advice.*
