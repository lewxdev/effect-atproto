workspace="$1"
destination="$2"

if [ -z "$workspace" ]; then
  echo "usage: bun scripts/pack-package-dry-run.sh <workspace> [destination]"
  exit 1
fi

if [ -z "$destination" ]; then
  destination=".artifacts"
fi

destination="$PWD/$destination"
catalog_effect="$(bun pm pkg get workspaces.catalog.effect | cut -d '"' -f 2)"
stage="$(mktemp -d)"
package_dir="$stage/package"

mkdir -p "$package_dir"
cp -R "$workspace"/. "$package_dir"/
bun pm pkg set "peerDependencies.effect=$catalog_effect" --cwd "$package_dir"
mkdir -p "$destination"

cd "$package_dir" && bun pm pack --destination "$destination" --dry-run
