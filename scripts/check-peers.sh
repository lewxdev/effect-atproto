#!/usr/bin/env bash
set -euo pipefail

root_effect="$(bun pm pkg get devDependencies.effect | tr -d '"')"
syntax_effect="$(bun pm pkg get peerDependencies.effect --cwd packages/syntax | tr -d '"')"

if [[ "$root_effect" != "$syntax_effect" ]]; then
  printf 'effect peer mismatch: root devDependencies.effect=%s packages/syntax peerDependencies.effect=%s\n' "$root_effect" "$syntax_effect" >&2
  exit 1
fi

