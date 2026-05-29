workspace="$1"

if [ -z "$workspace" ]; then
  echo "usage: bun scripts/package-tag.sh <workspace>"
  exit 1
fi

name="$(bun pm pkg get name --cwd "$workspace" | cut -d '"' -f 2)"
version="$(bun pm pkg get version --cwd "$workspace" | cut -d '"' -f 2)"
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
