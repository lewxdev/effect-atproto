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
- `Issue`: linked issue, when available

## Commits

Keep commits focused. Prefer one coherent commit per issue unless the work naturally separates into independently useful changes.
