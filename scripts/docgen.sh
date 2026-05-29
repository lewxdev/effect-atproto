workspace="$1"

if [ -z "$workspace" ]; then
  echo "usage: bun scripts/docgen.sh <workspace>"
  exit 1
fi

if [ -f "$workspace/docgen.json" ]; then
  cd "$workspace" && bun x --bun docgen
else
  cd "$workspace" && bun x --bun docgen --src src --out docs --exclude 'src/internal/**/*.ts'
fi
