# Building Sky Browser on Windows

Windows builds happen inside **MozillaBuild**, Mozilla's bash-like shell that
bundles git, python and friends. Our scripts (`.sh`) run inside it.

## Prerequisites

- Windows 10 or 11, 64-bit
- ~60 GB free on an NTFS drive (SSD strongly recommended)
- 16 GB RAM recommended
- **Windows Defender exclusions** — excluding the project folder (and its
  `.build` subfolder) from real-time scanning dramatically speeds up builds:
  *Windows Security → Virus & threat protection → Manage settings →
  Exclusions → Add folder*.

## Setup

1. Install **MozillaBuild** (latest version):
   <https://ftp.mozilla.org/pub/mozilla/libraries/win32/> — run the
   `MozillaBuildSetup-*.exe` and install it to the default location
   (`C:\mozilla-build`, no spaces in the path).

2. Launch **`C:\mozilla-build\start-shell.bat`**. You get a bash prompt.

3. In that shell:

```bash
# Navigate to your project folder — Windows drives are mounted as /c/, /d/...
cd /c/Users/YOU/Projects/sky-browser     # wherever you cloned the repo

./scripts/setup.sh            # clone pinned Firefox ESR into .build/upstream

cd .build/upstream
./mach bootstrap             # choose "Firefox for Desktop"; installs/configures
                             # Visual Studio C++ components + pinned Clang.
                             # Some steps may need an ELEVATED start-shell
                             # (run start-shell.bat as administrator).
cd ../..

./scripts/apply-patches.sh
./scripts/build.sh           # first build: several hours on a typical machine
./scripts/run.sh
```

## Notes

- Visual Studio's C++ build tools + Windows SDK are required; `mach bootstrap`
  configures them. A full Visual Studio IDE is *not* needed.
- Long path support avoids rare filename-length issues:
  enable it via Group Policy or
  `git config --system core.longpaths true`.
- Distributables: `./scripts/build.sh --package` — the Windows installer
  lands in `.build/obj-sky/dist/install/`.

## Troubleshooting

- **"mach: command not found"** — you're not in `.build/upstream`, or you're
  using cmd/PowerShell instead of the MozillaBuild shell.
- **Build dies on disk space** — clean with `./mach clobber` (inside
  `.build/upstream`) and free space; `.build` can be deleted entirely.
- Upstream build docs, always current:
  <https://firefox-source-docs.mozilla.org/setup/windows_build.html>
