# ADR 0001 — Patch-based fork, not a full source fork

- Status: accepted
- Date: 2026-11-25
- Deciders: project founder

## Context

Sky Browser is a customized Firefox maintained by one person (~5–10 h/week)
with community ambitions. Two structures were possible:

**(a) Hard fork of the whole tree** — our repo *is* the browser source,
tracking upstream history and merging it constantly.

**(b) Delta-only fork** — our repo contains only our patches, preferences,
branding and build tooling; upstream is fetched at a pinned tag.

## Decision

**(b)** — delta-only fork, on the upstream's official Git repository
(`https://github.com/mozilla-firefox/firefox`, source of truth since May
2025).

`scripts/setup.sh` shallow-clones the pinned tag from `upstream.env`;
`scripts/apply-patches.sh` applies `patches/series` on top; `mozconfig` and
`prefs/sky-browser.js` carry our build config and defaults.

## Consequences

**Positive**

- The repository stays tiny and fully reviewable: every byte of divergence
  from Firefox is visible in one `patches/` directory.
- Rebasing is a one-line pin bump plus re-applying the series; conflicts
  surface immediately and mechanically.
- No history-merge burden (a hard fork of ~100k commits/month would demand
  most of the maintainer's time on merges, not product).

**Negative / accepted costs**

- Contributors must download the upstream tree to build (several GB).
- We depend on Mozilla keeping the Git repo and tag naming stable.

## Alternatives considered

Hard fork (a): rejected as unsustainable for the available time budget.
Abandoning Firefox for a Rust engine (Servo): rejected for web-compatibility
and scope reasons.
