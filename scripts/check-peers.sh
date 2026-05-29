root_effect="$(bun -e 'const p = await Bun.file("package.json").json(); console.log(p.devDependencies?.effect ?? "")')"
syntax_effect="$(bun -e 'const p = await Bun.file("packages/syntax/package.json").json(); console.log(p.peerDependencies?.effect ?? "")')"

if [ "$root_effect" != "$syntax_effect" ]; then
  echo "effect peer mismatch: root devDependencies.effect=$root_effect packages/syntax peerDependencies.effect=$syntax_effect"
  exit 1
fi
