# ADR 0002 — Track Firefox ESR, not the rapid release channel

- Status: accepted
- Date: 2026-11-25

## Context

Firefox ships two relevant channels: the rapid release train (a new major
version every ~4 weeks) and **ESR** (Extended Support Release: a major
version held for ~a year, receiving only security and stability point
updates, roughly monthly).

For a fork whose maintenance budget is 5–10 h/week, the rebase cost scales
with the *amount of upstream change between our releases*.

## Decision

Sky Browser tracks **ESR** (currently the 153 line, pinned per release in
`upstream.env`). When Mozilla moves to the next ESR major, we follow after it
has settled, on our own schedule.

## Consequences

**Positive**

- Point rebases are small and mostly mechanical: security fixes, low churn in
  the code our patches touch → our patch series survives easily.
- Security cadence aligns with our release commitment
  (docs/release-process.md): we ship what Mozilla's ESR users get, when they
  get it.
- Stability — the ESR line gets extra QA; good fit for a browser whose users
  chose it for quiet reliability.

**Negative / accepted costs**

- New web features arrive later than in mainline Firefox (months behind).
- Privacy defaults inherited from upstream can lag behind rapid-release
  improvements for a while.
