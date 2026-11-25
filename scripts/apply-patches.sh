#!/usr/bin/env bash
# Sky Browser — apply the patch series (patches/series) onto .build/upstream.
# Patches already applied are skipped, so this script is idempotent.
# After applying, the state is committed in the build clone so that
# scripts/new-patch.sh sees only NEW changes afterwards.
#
# Usage: ./scripts/apply-patches.sh
set -euo pipefail

root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
source_dir="$root/.build/upstream"
series="$root/patches/series"

if [ ! -d "$source_dir" ]; then
  echo "!! No upstream tree found. Run ./scripts/setup.sh first." >&2
  exit 1
fi
if [ ! -f "$series" ]; then
  echo "!! Missing $series" >&2
  exit 1
fi

cd "$source_dir"

applied=0
skipped=0
while IFS= read -r line; do
  # Skip blank lines and comments.
  case "$line" in ""|"#"*) continue ;; esac
  patch_file="$root/patches/$line"
  if [ ! -f "$patch_file" ]; then
    echo "!! patches/series lists '$line' but $patch_file does not exist" >&2
    exit 1
  fi
  if git apply --check "$patch_file" 2>/dev/null; then
    git apply "$patch_file"
    echo ">> applied: $line"
    applied=$((applied + 1))
  elif git apply --reverse --check "$patch_file" 2>/dev/null; then
    echo ">> already applied: $line (skipping)"
    skipped=$((skipped + 1))
  else
    echo "!! patch failed to apply: $line" >&2
    echo "!! Upstream context probably moved — see patches/README.md, 'Rebasing'." >&2
    exit 1
  fi
done < "$series"

if [ "$applied" -gt 0 ]; then
  git add -A
  git commit -q -m "Sky Browser: baseline patch series" \
    || echo ">> (nothing to commit)"
fi

echo ">> Done: $applied applied, $skipped already present."
