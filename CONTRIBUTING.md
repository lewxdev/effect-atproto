# Contributing

## Format

Commit messages and pull request titles use the Commitlint rule in `commitlint.config.ts`.

```text
<type>: <summary>
```

## Issues and Pull Requests

Use the repository issue and pull request templates.

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

## Releases

After feature pull requests merge, the `release-pr` workflow opens or updates
`chore: version packages`. Merge that pull request to publish automatically from
`main`.

Do not publish locally. The `publish` workflow uses `bun run changeset publish` and
npm trusted publishing.

Before npm trusted publishing is configured, add a temporary `NPM_TOKEN` secret.
After the package has a trusted publisher configured on npm, remove the token.

## ATProto Interop Submodule

Update `vendor/atproto-interop-tests` intentionally. In the same PR, update any
test expectations that changed because of the new fixture revision.

Preserve fixture license and attribution notes when copying or documenting
fixtures. Do not vendor unrelated fixture data into the published package.

## Commits

Keep commits focused. Prefer one coherent commit per issue unless the work naturally separates into independently useful changes.
