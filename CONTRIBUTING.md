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

Run `bun changeset`, choose the package bump, and commit the generated file
under `.changeset/`.

Use:

- `patch`: bug fixes and internal changes that affect published behavior
- `minor`: new backwards-compatible API or feature
- `major`: breaking API or behavior changes

Skip a changeset for documentation-only, test-only, formatting, CI, or tooling
changes that do not affect the published package. In that case, write
`Changeset: Not needed` in the pull request body.

Release flow:

1. Merge feature pull requests with their changesets.
2. Run `bun run release:version` to consume changesets and update versions.
3. Review and merge the version pull request.
4. Run `bun run release` from the release commit to publish.

## Commits

Keep commits focused. Prefer one coherent commit per issue unless the work naturally separates into independently useful changes.
