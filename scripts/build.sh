#!/usr/bin/env bash
# Sky Browser — build from the patched upstream tree.
#
# Usage: ./scripts/build.sh [--package]
#   --package   also produce distributables (./mach package) in .build/obj-sky/dist/
set -euo pipefail

root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
source_dir="$root/.build/upstream"

if [ ! -d "$source_dir" ]; then
  echo "!! No upstream tree found. Run ./scripts/setup.sh first." >&2
  exit 1
fi

cd "$source_dir"

echo ">> Building (first build: 1-3+ hours depending on machine)..."
./mach build

if [ "${1:-}" = "--package" ]; then
  echo ">> Packaging distributables..."
  ./mach package
  echo ">> Artifacts in: .build/obj-sky/dist/"
fi

echo ">> Build finished. Run ./scripts/run.sh to launch it."
