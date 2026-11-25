# Security Policy

Sky Browser inherits its engine (Gecko) from Mozilla Firefox: most of its
security surface is upstream's, and we stay secure by rebasing quickly onto
new Firefox ESR releases. Our own additions (patches, preferences) are small,
and that smallness is the security strategy: the less we diverge, the less we
can break.

## Supported versions

| Version | Supported |
|---|---|
| latest tagged release | ✅ best effort |
| older releases | ❌ — update to the latest |
| development tree (`main`) | not a supported product |

Sky Browser is currently pre-alpha: no binaries have shipped yet, and no
stability promise applies until v0.1. Once releases exist, **security
releases take absolute priority over features** — that commitment is
spelled out in [docs/release-process.md](docs/release-process.md).

## Reporting a vulnerability

**Please report privately — never open a public issue for a security bug.**

- Preferred: GitHub's private vulnerability reporting — "Security" tab →
  "Report a vulnerability" (maintainer: make sure this feature is enabled in
  the repo settings).
- Alternative: open a private security advisory or contact the maintainer
  directly via their GitHub profile.

Please include: affected component, steps/proof-of-concept, impact
assessment, and whether it affects stock Firefox too.

## What to report where

- **Vulnerabilities in Sky Browser's own patches, prefs or build config** →
  here, privately. We fix it ourselves.
- **Vulnerabilities in the engine** (Gecko, rendering, networking, JS…) →
  [Mozilla's bug bounty / bugzilla](https://bugzilla.mozilla.org/) directly,
  since the fix lands upstream and reaches us through rebasing. You may
  notify us privately as well so we can check whether our pinned ESR tag is
  affected and whether an early rebase is warranted.

## Our commitment once releases exist

- We track every Firefox ESR security advisory.
- Target: ship a corresponding Sky Browser release within **7 days** of the
  upstream ESR security release; **48 hours** for actively-exploited issues
  where feasible.
- Release notes will always state the exact upstream ESR version we are
  built from, so users can verify their patch level.
