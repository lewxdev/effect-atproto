root_effect="$(bun pm pkg get devDependencies.effect)"
syntax_effect="$(bun pm pkg get peerDependencies.effect --cwd packages/syntax)"

if [ "$root_effect" != "$syntax_effect" ]; then
  echo "effect peer mismatch: root devDependencies.effect=$root_effect packages/syntax peerDependencies.effect=$syntax_effect"
  exit 1
fi
