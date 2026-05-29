workspace="$1"

if [ -z "$workspace" ]; then
  echo "usage: bun scripts/package-tag.sh <workspace>"
  exit 1
fi

name="$(bun pm pkg get name --cwd "$workspace" | cut -d '"' -f 2)"
version="$(bun pm pkg get version --cwd "$workspace" | cut -d '"' -f 2)"
tag="$name@$version"
filename="$(echo "$name" | sed 's#^@##; s#/#-#')-$version.tgz"
tarball=".artifacts/$filename"
output="name=$name
version=$version
tag=$tag
tarball=$tarball
"

printf '%s' "$output"
