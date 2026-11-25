# Release process

Sky Browser releases are **rebuilds of Firefox ESR point releases plus our
patch series.** The process is deliberately boring and repeatable.

## Cadence & commitment

We track Firefox ESR (153.x today — pinned in `upstream.env`). Mozilla ships
ESR point releases roughly monthly, many of them security releases.

- **Security releases take absolute priority.** Target: a Sky Browser release
  within **7 days** of the corresponding upstream ESR security release;
  **48 hours** for actively-exploited issues where feasible.
- Feature releases ride along when ready; security never waits for features.
- Watch <https://www.mozilla.org/en-US/security/advisories/> and Mozilla's
  ESR release notes.

## Steps for every release

1. **Bump the pin** — update `UPSTREAM_TAG`/`UPSTREAM_DISPLAY_VERSION` in
   `upstream.env` to the new ESR point release tag
   (format: `FIREFOX_<major>_<minor>_<point>esr_RELEASE`).
2. **Fresh tree** — `rm -rf .build && ./scripts/setup.sh` (keep the old
   `.build` aside for diffing if a patch breaks).
3. **Re-apply the series** — `./scripts/apply-patches.sh`; fix/re-generate
   any patch whose upstream context moved (see patches/README.md), then
   **re-review `prefs/sky-browser.js`** against the new ESR — pref names
   and defaults drift.
4. **Build & package** on Windows and Linux:
   `./scripts/build.sh --package`.
5. **Smoke test checklist** (both platforms, fresh profile):
   - [ ] Browser starts; window title & about pages say "Sky Browser"
   - [ ] No Firefox logos anywhere visible (installer, icons, about:support)
   - [ ] about:support shows the expected base version and no leftover
         Mozilla updater
   - [ ] HTTPS-Only + strict tracking protection active by default
   - [ ] New tab page shows no sponsored tiles/stories; Pocket absent
   - [ ] A news site loads, video plays, login persists, downloads work
   - [ ] `about:telemetry` shows no data collection being sent
6. **Tag & release** — `git tag vX.Y.Z`; GitHub Release with notes
   (template below); upload artifacts; publish `sha256sum` checksums in the
   release notes.
7. **Housekeeping** — update `CHANGELOG.md`, README status badges and the
   ESR base badge if the major version moved; announce.

## Release notes template

```markdown
## Sky Browser vX.Y.Z

**Based on Firefox ESR <UPSTREAM_DISPLAY_VERSION>** (tag `<UPSTREAM_TAG>`)

### Security
- Includes all upstream security fixes from Firefox ESR <version>
  ([Mozilla advisory](https://www.mozilla.org/en-US/security/advisories/mfsa2026-XX/)).

### Changed
- ...

### Known issues
- ...

sha256: <hashes>
```

## Distribution

- **Linux**: tarball now; AppImage once we validate it (`--package` output).
- **Windows**: installer from `mach package` (`obj-sky/dist/install/`).
  Binaries are unsigned for now: users will see a SmartScreen warning on
  first run. Signing (and budgeting for a certificate) is an M4 topic.
- Reproducible builds: not yet; noted for M4.
