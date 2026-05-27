# Contributing

## Shared Format

Use Conventional Commit style for issue titles, commit messages, and pull request titles.
Headers must be lowercase.

```text
<type>: <summary>
```

Examples:

```text
docs: document atproto source boundaries
feat: load query procedure schemas
test: cover auth header construction
chore: add contribution templates
```

## Types

- `feat`: user-facing SDK behavior
- `fix`: bug fix
- `docs`: documentation only
- `test`: tests only
- `refactor`: behavior-preserving code change
- `chore`: repo, tooling, or maintenance

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
