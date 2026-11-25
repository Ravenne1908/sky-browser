# The patch series — Sky Browser's entire divergence from Firefox

This directory is the **most important directory in the repo.** It contains
every intentional difference between Sky Browser and the pinned Firefox ESR
tag. If a change to Firefox behavior isn't represented here (or in
`prefs/` or `mozconfig`), it doesn't exist.

## Philosophy

A fork survives on one skill: **keeping the delta small.** Every line of
divergence is a line that must be re-applied, reviewed and possibly fixed at
every ESR rebase (roughly monthly for security point releases). LibreWolf,
Waterfox and the other long-lived forks all share this discipline.

Therefore, in order of preference:

1. **Prefer a pref** (`prefs/sky-browser.js`) — survives rebases almost free.
2. **Prefer a build option** (`mozconfig`) — same.
3. **Patch the source** only when there is no other way — and then keep the
   diff surgical: touch as few lines and as little context as possible.

## Rules for patches

- One patch = one concern. Name says what it does: `001-branding-skybrowser.patch`.
- Never reformat/reindent upstream code around your change — conflict pain
  is proportional to context churn.
- New files are fine (branding assets), wholesale rewrites of upstream files
  are not.
- Patches apply in the order listed in `series`; number them so the order is
  stable when inserted in the middle (`001`, `010`, `020`…).

## Creating a patch (workflow)

```bash
./scripts/setup.sh           # fresh pinned source in .build/upstream
./scripts/apply-patches.sh   # baseline applied & committed in the build clone

# ...make your changes in .build/upstream/...

./scripts/new-patch.sh 030-my-change    # snapshot diff -> patches/030-my-change.patch
git add patches/ && git commit         # commit patch + series update
```

`new-patch.sh` captures **all** working-tree changes (including new files),
so make one logical change at a time.

## Rebasing onto a new ESR

1. Update `upstream.env` to the new tag.
2. `rm -rf .build` (or move it aside to diff later), then `./scripts/setup.sh`.
3. `./scripts/apply-patches.sh` — failures point at the patches whose upstream
   context moved.
4. For each failing patch: apply it manually (or re-do the change), then
   regenerate it with `new-patch.sh` under its **existing number and name**
   (overwrite the old file).
5. Smoke-test, update CHANGELOG, release (see `docs/release-process.md`).

## What CI checks

The `ci` workflow verifies that: shell scripts parse, the prefs file is valid
JS, every entry in `series` points to an existing patch file, and the pinned
upstream tag still exists on Mozilla's repository. A full build CI is
`build.yml` (self-hosted runner only).
