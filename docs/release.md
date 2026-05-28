# Release

This repo uses Changesets in two steps:

1. Merge feature PRs with changesets.
2. Let the release PR workflow open or update `chore: version packages`.
3. Review and merge that version PR.
4. Run the `publish` workflow from the release commit.

The release PR workflow validates and versions packages only. It does not
publish.

## Publishing

The `publish` workflow is manual and should run from a reviewed release commit
on `main`. It validates the repo, dry-runs package packing with npm through Bun,
checks whether the Changesets package tag already exists, publishes only when
the tag is missing, pushes the Changesets tag, and creates a GitHub Release.

Before npm trusted publishing is configured, add a temporary `NPM_TOKEN` secret
and publish with the token path. The workflow invokes:

```sh
bunx npm@latest publish --workspaces=false --provenance --access public
```

After the package has a trusted publisher configured on npm, remove the token.
The workflow uses GitHub-hosted runners and `id-token: write`; npm exchanges the
OIDC token during `npm publish`, automatically creates provenance for public
packages, and does not need `--provenance`.

Optional hardening: configure the `npm-publish` GitHub environment with required
reviewers.

## Packing

Inspect package contents before publishing from `packages/syntax`:

```sh
bun run build
bunx npm@latest pack --dry-run --json --workspaces=false
```

Expected package contents:

- `LICENSE.md` from `packages/syntax`.
- `README.md`.
- Compiled `dist/*` public modules and declarations.
- Compiled `dist/internal/*` modules only when public compiled modules import
  them.

Do not ship generated docs, source fixtures, unrelated submodule files, root
repo metadata, or test files. Internal modules may be present in `dist` for
runtime imports, but they must not be public package exports or generated API
docs.

## ATProto Interop Submodule

Update `vendor/atproto-interop-tests` intentionally. In the same PR, update any
test expectations that changed because of the new fixture revision.

Preserve fixture license and attribution notes when copying or documenting
fixtures. Do not vendor generated package docs or unrelated fixture data into
the published package.
