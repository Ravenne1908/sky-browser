#!/usr/bin/env bash
# Sky Browser — run the local build without packaging (./mach run).
# Extra arguments are passed to mach, e.g. ./scripts/run.sh --jsdebugger
set -euo pipefail

root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
source_dir="$root/.build/upstream"

if [ ! -d "$source_dir" ]; then
  echo "!! No upstream tree found. Run ./scripts/setup.sh first." >&2
  exit 1
fi

cd "$source_dir"
exec ./mach run "$@"
