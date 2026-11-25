<!-- Sky Browser — main README (English). French version: README.fr.md -->
<!-- TODO: replace ravennelucas1908-max with your GitHub username everywhere in this file. -->

<p align="center">
  <img src="assets/logo/sky-browser-logo.svg" width="128" alt="Sky Browser logo">
</p>

<h1 align="center">Sky Browser</h1>

<p align="center">
  <strong>A privacy-first, lightweight web browser — an independent fork of Firefox.</strong><br>
  No telemetry. No sponsored content. Just the web, quietly.
</p>

<p align="center">
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-MPL--2.0-blue.svg" alt="License: MPL-2.0"></a>
  <a href="upstream.env"><img src="https://img.shields.io/badge/base-Firefox%20ESR%20153-orange.svg" alt="Base: Firefox ESR 153"></a>
  <img src="https://img.shields.io/badge/status-pre--alpha-red.svg" alt="Status: pre-alpha">
  <a href="CONTRIBUTING.md"><img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg" alt="PRs welcome"></a>
</p>

<p align="center">
  🇫🇷 <a href="README.fr.md">Lire ce README en français</a>
</p>

---

## Why Sky Browser?

Firefox has an excellent engine and codebase — but the stock build ships with
telemetry, sponsored content, Pocket and other extras that don't belong in a
browser that respects you. **Sky Browser is the same engine, re-tuned:**

| Topic | Sky Browser defaults |
|---|---|
| Telemetry | Disabled — health report, crash reports, Shield studies, all off |
| Tracking | Strict content blocking, Total Cookie Protection, social tracking blocked |
| Fingerprinting | `resistFingerprinting` enabled by default |
| Sponsored content | Pocket, sponsored top sites & urlbar suggestions — removed |
| Sponsored "stories" | Disabled on the new tab page |
| HTTPS | HTTPS-Only mode enabled by default |
| Autofill | Form history & address/credit-card autofill disabled by default |
| Updater | GitHub Releases (v0.x — see [ADR 0003](docs/decisions/0003-no-in-house-updater-v0.md)) |

Every default is documented in [`prefs/sky-browser.js`](prefs/sky-browser.js)
— if you disagree with one, open an issue, that's a conversation worth having.

## Project status

**Pre-alpha — there are no binaries to download yet.** Watch this repo to be
notified of the first release.

- ✅ Build infrastructure pinning a privacy-hardened Firefox ESR 153.8.0 base
- ✅ Default preferences reviewed and documented
- ✅ Patch-series tooling (minimal, auditable divergence from upstream)
- 🚧 Branding: placeholder logo today, full rebrand patch next
- 🚧 First binary releases for Windows and Linux
- 📋 Planned: uBlock Origin preinstalled, UI polish, deblobbing audit

Sky Browser tracks **Firefox ESR** — the stability- and security-focused
release channel ([why](docs/decisions/0002-esr-channel.md)).

## Download

Once released, installers and tarballs will live on the
[Releases page](https://github.com/ravennelucas1908-max/sky-browser/releases).

## Build it yourself

Linux quickstart — full guides for [Linux](docs/build-linux.md) and
[Windows](docs/build-windows.md). Expect a long build and ~40–60 GB of disk.

```bash
git clone https://github.com/ravennelucas1908-max/sky-browser.git
cd sky-browser

./scripts/setup.sh          # fetch the pinned Firefox ESR source (several GB)
./scripts/apply-patches.sh  # apply the Sky Browser patch series

cd .build/upstream && ./mach bootstrap && cd ../..   # one-time toolchain setup

./scripts/build.sh         # ☕ go for a walk
./scripts/run.sh           # launch your build
```

## How this fork works

This repository intentionally contains **only the Sky Browser delta** — our
patches, preferences, branding and build scripts. The Firefox source itself is
fetched at a pinned ESR tag from Mozilla's official Git repository and our
small patch series is applied on top
([ADR 0001](docs/decisions/0001-fork-strategy.md)).

```
mozilla-firefox/firefox @ FIREFOX_153_8_0esr_RELEASE   (upstream, pinned)
        └── patches/series                             (Sky Browser delta, applied in order)
              └── prefs/sky-browser.js                  (privacy-hardened defaults)
                    └── branding + mozconfig            (identity & build config)
```

Consequence: every byte of divergence from Firefox is visible, auditable and
reviewable in this repo. Re-basing onto a new ESR is a one-line change in
[`upstream.env`](upstream.env) plus re-applying the series.

## Relationship with Firefox — trademark notice

Sky Browser is built from the source code of Mozilla Firefox, which is
licensed under the Mozilla Public License 2.0.

**Sky Browser is not created by, endorsed by, or affiliated with the Mozilla
Foundation in any way.** "Firefox" and the Firefox logos are trademarks of the
Mozilla Foundation. In accordance with Mozilla's trademark policy, Sky Browser
removes all Firefox branding and ships its own (see
[docs/branding.md](docs/branding.md) and [NOTICE.md](NOTICE.md)).

## Roadmap

- **M1 — First working build.** Full rebrand (name, icons, about pages) via the
  first patch; official-looking branding directory; dist packages produced.
- **M2 — v0.1 public release.** Windows installer + Linux tarball on GitHub
  Releases, release process live ([docs/release-process.md](docs/release-process.md)).
- **M3 — Identity features.** uBlock Origin preinstalled, deblobbing audit
  (remove everything not needed to browse), final privacy defaults pass.
- **M4 — Community & scale.** Self-hosted CI builds, translated docs,
  in-house updater investigation, more hands.

## Contributing

- 🐛 [Report a bug](https://github.com/ravennelucas1908-max/sky-browser/issues/new?template=bug_report.md)
- 💡 [Suggest a feature](https://github.com/ravennelucas1908-max/sky-browser/issues/new?template=feature_request.md)
- 🔧 Read [CONTRIBUTING.md](CONTRIBUTING.md) for the patch discipline that
  keeps this fork easy to maintain.

Security reports: see [SECURITY.md](SECURITY.md) — please report privately,
never open a public issue for a vulnerability.

## License

Code in this repository is licensed under the
[Mozilla Public License 2.0](LICENSE) — the same license as the Firefox
source it builds on. See [NOTICE.md](NOTICE.md) for attribution and trademark
information.
