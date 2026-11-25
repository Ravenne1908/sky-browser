# Contributing to Sky Browser

Thanks for wanting to help! Sky Browser is a small-delta Firefox fork, and
that discipline is what keeps a solo-maintained fork alive. This guide exists
so your contribution lands smoothly.

## Golden rule: minimize the delta

Every byte we diverge from upstream is debt we pay at every ESR rebase.
Before proposing a change to the source, ask:

1. **Can it be done with a preference?** (see `prefs/sky-browser.js`) — best case.
2. **Can it be done with a build option?** (see `mozconfig`) — good.
3. **Does it really need a source patch?** — last resort, and then the patch
   must be as small as humanly possible.

## Getting started

1. Set up a build environment — [Linux](docs/build-linux.md) or
   [Windows](docs/build-windows.md) (allow an afternoon the first time).
2. Produce a working build of the pinned upstream **before** changing anything.
3. Make your change **on top of the applied patch series** in `.build/upstream`.
4. Create your patch: `./scripts/new-patch.sh 123-short-name` — this snapshots
   your diff into `patches/` and registers it in `patches/series`.
5. Open a pull request containing the patch file and the `series` change
   (plus a `prefs/` change if your feature also sets defaults).

## Patch rules

- **One patch = one concern.** A patch called `disable-pocket-integration`
   must not also rename the browser.
- **Keep diffs minimal.** Never reformat upstream code around your change;
   rebase pain is proportional to context churn.
- **Explain the why in the PR**, not just the what — the commit message and
   PR description are the future maintainer's map (the future maintainer may
   be you, rebasing at midnight).
- **Every touched pref must have a comment** in `prefs/sky-browser.js`
   explaining what it does and why we set it.
- Don't commit anything from `.build/` — it's the disposable build tree,
   git-ignored on purpose.

## Workflow hygiene

- Fork, branch, PR against `main`.
- Squash-worthiness: prefer a few meaningful commits over many tiny ones.
- CI runs on your PR: script syntax, prefs syntax, patch-series integrity,
  and that the pinned upstream tag still exists. Keep it green.
- If your patch conflicts at rebase time, the maintainer will ping you —
  you know your change best.

## Commit message style

```
<area>: <what changed in one line>

<optional body: why, trade-offs, upstream context>
```

Examples: `prefs: disable urlbar sponsored suggestions`,
`branding: add Sky Browser icon set (16-256px)`.

## Reporting bugs

Use the issue templates. The bug report asks whether the bug also reproduces
in stock Firefox — that question decides whether it's ours to fix or
upstream's, so please answer it carefully.

## Translations & docs

Docs are English-first (community lingua franca) with a French README
(`README.fr.md`). More translations are welcome once v0.1 ships.

## Code of conduct

See [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md). Be kind; browsers are serious
business but contributors are people first.
