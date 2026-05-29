workspace="$1"

if [ -z "$workspace" ]; then
  echo "usage: bun scripts/package-tag.sh <workspace>"
  exit 1
fi

name="$(bun -e 'const p = await Bun.file(process.argv[1]).json(); console.log(p.name)' "$workspace/package.json")"
version="$(bun -e 'const p = await Bun.file(process.argv[1]).json(); console.log(p.version)' "$workspace/package.json")"
tag="$name@$version"
output="name=$name
version=$version
tag=$tag
"

if [ -z "$GITHUB_OUTPUT" ]; then
  printf '%s' "$output"
else
  printf '%s' "$output" >> "$GITHUB_OUTPUT"
fi
