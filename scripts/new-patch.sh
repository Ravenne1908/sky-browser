#!/usr/bin/env bash
# Sky Browser — snapshot your working-tree changes as a new patch.
# Captures ALL changes in .build/upstream (including new/untracked files),
# writes them to patches/<name>.patch and appends the name to patches/series.
#
# Prerequisites: setup.sh + apply-patches.sh done, so the diff contains only
# YOUR new change (applied patches were committed in the build clone).
#
# Usage: ./scripts/new-patch.sh 030-short-name
set -euo pipefail

root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
source_dir="$root/.build/upstream"

name="${1:-}"
if [ -z "$name" ]; then
  echo "usage: $0 <NNN-short-name>   e.g. $0 030-disable-pocket-prefs" >&2
  exit 1
fi

if [ ! -d "$source_dir" ]; then
  echo "!! No upstream tree found. Run ./scripts/setup.sh first." >&2
  exit 1
fi

out="$root/patches/$name.patch"

cd "$source_dir"
git add -A
git diff --cached > "$out"

if [ ! -s "$out" ]; then
  rm -f "$out"
  echo "!! No changes found in $source_dir — make your change first." >&2
  exit 1
fi

# Commit the baseline in the build clone so the next new-patch is clean too.
git commit -q -m "Sky Browser patch: $name" || true

if ! grep -q "^$name.patch$" "$root/patches/series"; then
  echo "$name.patch" >> "$root/patches/series"
fi

echo ">> Created patches/$name.patch and registered it in patches/series."
echo ">> Review the diff, then commit BOTH files to the Sky Browser repo."
