# ADR 0004 — MPL-2.0 for all Sky Browser code

- Status: accepted
- Date: 2026-11-25

## Context

The Firefox source we build on is Mozilla Public License 2.0. Our own
files (patches, scripts, prefs, docs, branding) needed a license decision.

## Decision

Everything in this repository is licensed under the **Mozilla Public License
2.0** — the full text is in `LICENSE`, and each source file carries the MPL
header where appropriate.

## Rationale

- **Uniformity**: one license for our delta and the upstream it applies to —
  no license-boundary bookkeeping.
- **File-level copyleft**: modifications to our files must stay open (aligned
  with the project's open-source mission), while combining with permissively
  licensed code stays possible.
- **Patent grant**: MPL-2.0 includes an explicit patent license.
- Community norms: most Firefox forks and LibreWolf ecosystem components
  are MPL-2.0; contributors find nothing surprising.

## Alternatives considered

- MIT/Apache-2.0: simpler, but would let a third party close-source a
  modified Sky Browser — contrary to the project's spirit.
- GPL: stronger copyleft, but mixing/friction with MPL-2.0 upstream files
  would be counterproductive.
