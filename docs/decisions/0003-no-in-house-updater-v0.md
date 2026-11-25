# ADR 0003 — No in-app updater in v0.x; GitHub Releases only

- Status: accepted
- Date: 2026-11-25

## Context

Firefox's updater (Balrog/ADR services) is Mozilla infrastructure and is
**not available to third-party builds.** A fork must therefore either ship
without an in-app updater or build and operate its own update infrastructure —
which is itself security-critical (update servers, signing keys, push
mechanism). Building update infrastructure in the v0.x phase would multiply
the project's security exposure before it has any users.

## Decision

- Build with `ac_add_options --disable-updater`.
- Releases are distributed via **GitHub Releases** (plus checksums); users
  update by downloading the new release.
- The browser must clearly tell users where updates come from (our docs,
  and later an update-check banner).

## Consequences

**Positive**

- No security-critical infrastructure to operate at the project's most
  fragile stage.
- Simple, auditable release process.

**Negative / accepted costs**

- Users don't get automatic updates — the classic weak point of small
  forks: users *stay* on vulnerable versions. Mitigations until we build
  our own:
  - a homepage/new-tab notice on new releases (M3 candidate feature);
  - a documented security cadence so followers know when to expect updates
    (docs/release-process.md);
  - releases announced everywhere the project is announced.

## Revisit trigger

An in-house updater (server + signing) becomes worth building when a stable
user base exists and update latency becomes the main security risk —
projected milestone M4+.
