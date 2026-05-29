tag="$1"

if [ -z "$tag" ]; then
  echo "usage: bun scripts/check-package-tag.sh <tag>"
  exit 1
fi

if git ls-remote --exit-code --tags origin "refs/tags/$tag" > /dev/null; then
  exists=true
else
  exists=false
fi

if [ -z "$GITHUB_OUTPUT" ]; then
  echo "exists=$exists"
else
  echo "exists=$exists" >> "$GITHUB_OUTPUT"
fi
