#!/usr/bin/env bash
# Sky Browser — fetch the pinned upstream Firefox source.
# Creates .build/upstream/ (git-ignored) containing the exact upstream tag
# pinned in upstream.env, with our mozconfig copied in.
#
# Usage: ./scripts/setup.sh
set -euo pipefail

root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
build_dir="$root/.build"
source_dir="$build_dir/upstream"

# shellcheck source=../upstream.env
source "$root/upstream.env"

if [ -d "$source_dir/.git" ]; then
  echo ">> Upstream already present in $source_dir"
  echo ">> Tag in use: $(git -C "$source_dir" describe --tags --exact 2>/dev/null || echo 'unknown')"
  echo ">> To re-pin (rebase), delete it first: rm -rf .build"
  exit 0
fi

mkdir -p "$build_dir"

echo ">> Cloning $UPSTREAM_REPO"
echo ">> Pinned tag: $UPSTREAM_TAG (Firefox $UPSTREAM_DISPLAY_VERSION)"
echo ">> Shallow clone of one tag: several GB, this takes a while..."
git clone --depth 1 --branch "$UPSTREAM_TAG" "$UPSTREAM_REPO" "$source_dir"

echo ">> Copying Sky Browser mozconfig into the upstream tree..."
cp "$root/mozconfig" "$source_dir/mozconfig"

echo ">> Done. Next steps:"
echo "     ./scripts/apply-patches.sh   # apply the Sky Browser patch series"
echo "     cd .build/upstream && ./mach bootstrap && cd ../..   # one-time toolchain"
echo "     ./scripts/build.sh          # build (long!)"
