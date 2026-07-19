# Contributing

Guidelines for contributing to ProjectOS.

---

## Code of Conduct

Treat all contributors with respect. Focus feedback on code and design decisions, not on individuals. Maintain a professional and constructive tone in all discussions.

---

## Getting Started

1. Read the [Project Overview](docs/01-onboarding/01-project-overview.md).
2. Follow the [Local Setup Guide](docs/01-onboarding/03-local-setup.md) to configure your environment.
3. Review the [Coding Standards](docs/05-guidelines/02-coding-standards.md) before writing code.
4. Review the [Git Workflow](docs/05-guidelines/01-git-workflow.md) before opening branches or pull requests.

---

## Branch Naming

| Type    | Format           | Example                 |
| ------- | ---------------- | ----------------------- |
| Feature | `feature/<name>` | `feature/task-comments` |
| Bug fix | `fix/<name>`     | `fix/socket-reconnect`  |
| Hotfix  | `hotfix/<name>`  | `hotfix/login-crash`    |
| Chore   | `chore/<name>`   | `chore/update-eslint`   |
| Docs    | `docs/<name>`    | `docs/auth-workflow`    |

Branch naming rules:

- Use lowercase and kebab-case.
- Keep names short and descriptive.
- Base feature and fix branches on `develop`.
- Base hotfix branches on `main`.

---

## Commit Messages

ProjectOS uses [Conventional Commits](https://www.conventionalcommits.org/).

Format:

```text
type(scope): description
```

Commit types:

| Type       | Purpose                                        |
| ---------- | ---------------------------------------------- |
| `feat`     | New feature                                    |
| `fix`      | Bug fix                                        |
| `docs`     | Documentation                                  |
| `refactor` | Internal improvements without behavior changes |
| `style`    | Formatting only                                |
| `perf`     | Performance improvement                        |
| `test`     | Tests                                          |
| `chore`    | Tooling and configuration                      |

Examples:

```text
feat(auth): add password reset endpoint
fix(api): validate project membership before update
docs(kanban): document drag-and-drop edge cases
chore(config): update eslint configuration
```

Commitlint enforces this format automatically via the Husky `commit-msg` hook.

---

## Pull Requests

Before opening a pull request:

- Pull the latest changes from the base branch.
- Resolve all merge conflicts.
- Run `pnpm lint` and confirm it passes.
- Run `pnpm format:check` and confirm it passes.
- Update documentation if the change affects APIs, models, features, or environment variables.
- Verify the application behaves correctly locally.

Pull request checklist:

- [ ] Branch is up to date with the base branch.
- [ ] Build passes.
- [ ] Lint passes.
- [ ] Formatting passes.
- [ ] Documentation updated where applicable.
- [ ] No debugging code committed.
- [ ] No unused imports.
- [ ] No commented-out code.
- [ ] No secrets committed.

---

## Code Review

Reviewers verify:

- Architecture follows project conventions.
- No duplicated logic.
- Error handling exists.
- Type safety maintained.
- No unnecessary dependencies.
- Naming is clear and consistent.
- Performance is acceptable.
- Security has been considered.
- Documentation is updated.

---

## Coding Standards

See [Coding Standards](docs/05-guidelines/02-coding-standards.md) for the complete reference.

Key rules:

- TypeScript strict mode is mandatory. Never use `any`.
- All shared types live in `packages/shared`.
- Business logic belongs in services, not controllers.
- Every API endpoint must validate input using Zod.
- Server state belongs to TanStack Query. UI state belongs to Zustand.

---

## Testing Requirements

Every feature must include tests covering:

- Success paths
- Failure paths
- Edge cases
- Permission checks

See [Testing Guide](docs/05-guidelines/04-testing.md) for the complete testing strategy.

---

## Documentation

Documentation must be updated in the same commit as the code change when the change affects:

- API endpoints
- Database models
- Environment variables
- Feature behavior
- Architecture
- User workflows

A feature is not complete until its documentation reflects the implementation.

---

## Related Documents

- [Project Overview](docs/01-onboarding/01-project-overview.md)
- [Local Setup](docs/01-onboarding/03-local-setup.md)
- [Git Workflow](docs/05-guidelines/01-git-workflow.md)
- [Coding Standards](docs/05-guidelines/02-coding-standards.md)
- [Testing Guide](docs/05-guidelines/04-testing.md)
