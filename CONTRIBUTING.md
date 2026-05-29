# Contributing

## Format

Commit messages and pull request titles use the Commitlint rule in `commitlint.config.ts`.

```text
<type>: <summary>
```

## Issue Body

Every implementation issue should include:

- `Context`: why this exists
- `Scope`: what changes
- `Acceptance`: concrete done checks
- `Notes`: links, constraints, or follow-up risks

## Pull Request Body

Every pull request should include:

- `Summary`: what changed
- `Verification`: commands run, or `Not run` with reason
- `Changeset`: changeset added, or `Not needed` with reason
- `Issue`: linked issue, when available

## Changesets

Use Changesets for any change that should appear in a release.

During development, run `bun run changeset`, choose the package bump, and commit
the generated file under `.changeset/`.

Use:

- `patch`: bug fixes and internal changes that affect published behavior
- `minor`: new backwards-compatible API or feature
- `major`: breaking API or behavior changes

Skip a changeset for documentation-only, test-only, formatting, CI, or tooling
changes that do not affect the published package. In that case, write
`Changeset: Not needed` in the pull request body.

Release flow:

1. Merge feature pull requests with their changesets.
2. Let the `release-pr` workflow open or update `chore: version packages` with
   `bunx changeset version`.
3. Review and merge the version pull request.
4. Run the `publish` workflow from the release commit on `main`.

The release PR workflow validates the repo and versions packages only. It does
not publish.

The `publish` workflow is manual. It validates the repo, dry-runs package
packing, checks whether the Changesets package tag already exists, publishes
only when the tag is missing, creates the Changesets tag with `bunx changeset
tag`, pushes it, and creates a GitHub Release.

There is no local release script. Use GitHub Actions for versioning and
publishing so the workflow, package tag check, provenance setup, and GitHub
Release creation stay in one place.

Before npm trusted publishing is configured, add a temporary `NPM_TOKEN` secret.
After the package has a trusted publisher configured on npm, remove the token.
The workflow uses GitHub-hosted runners and `id-token: write`; npm exchanges the
OIDC token during `npm publish` and creates provenance for public packages.

Optional hardening: configure the `npm-publish` GitHub environment with required
reviewers.

### Packing

Inspect package contents before publishing:

```sh
bun run build
cd packages/syntax
bun pm pack --destination ../../.artifacts --dry-run
```

Bun rewrites workspace catalog dependencies to concrete versions in the packed
tarball.

Expected package contents:

- `LICENSE.md`, copied from the root license when the package does not inherit
  it through the published tarball.
- `README.md`.
- Compiled `dist/*` public modules and declarations.
- Compiled `dist/internal/*` modules only when public compiled modules import
  them.

Do not ship source fixtures, unrelated submodule files, root repo metadata, or
test files. Internal modules may be present in `dist` for runtime imports, but
they must not be public package exports.

### ATProto Interop Submodule

Update `vendor/atproto-interop-tests` intentionally. In the same PR, update any
test expectations that changed because of the new fixture revision.

Preserve fixture license and attribution notes when copying or documenting
fixtures. Do not vendor unrelated fixture data into the published package.

## Commits

Keep commits focused. Prefer one coherent commit per issue unless the work naturally separates into independently useful changes.
