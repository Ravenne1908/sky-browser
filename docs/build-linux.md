# Building Sky Browser on Linux

Tested path: Ubuntu 22.04+/Debian 12-class 64-bit distributions. Any modern
x86_64 distro should work — `mach bootstrap` installs the toolchain.

## Prerequisites

- 64-bit Linux, ~40–60 GB free disk space
- 16 GB RAM recommended (8 GB + generous swap possible but painful)
- `git`, `python3` (3.8+), `bash`, and `sudo` (mach bootstrap installs
  compiler toolchain packages; it will prompt for your password)

## Build

```bash
git clone https://github.com/ravennelucas1908-max/sky-browser.git
cd sky-browser

./scripts/setup.sh            # clone pinned Firefox ESR into .build/upstream

cd .build/upstream
./mach bootstrap             # choose "Firefox for Desktop" when asked
cd ../..

./scripts/apply-patches.sh   # apply the Sky Browser patch series
./scripts/build.sh           # the long part — first build takes hours
./scripts/run.sh             # launch the build
```

## Notes

- `mach bootstrap` is **one-time per toolchain generation**; re-run it after
  bumping `upstream.env` to a new major ESR if the build complains about
  toolchain versions.
- Distributables (for a release): `./scripts/build.sh --package` — artifacts
  land in `.build/obj-sky/dist/`.
- A fresh start: `rm -rf .build` removes everything disposable.
- Building in a container works and keeps your host clean; the build tree is
  position-sensitive, so keep the same absolute path between builds.

## Troubleshooting

- **Out of disk** — the object directory alone is tens of GB. `./mach clobber`
  (inside `.build/upstream`) cleans build artifacts but keeps sources.
- **"mach: command not found"** — you're not inside `.build/upstream` or you
  skipped `setup.sh`.
- Upstream build docs, always current:
  <https://firefox-source-docs.mozilla.org/setup/linux_build.html>
