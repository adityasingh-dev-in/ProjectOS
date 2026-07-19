# Generated Documentation

> **Auto-Generated Files**
>
> Everything inside this directory is generated automatically from the source code.
> **Do not edit anything here manually.**
>
> Any changes made in this folder will be overwritten the next time documentation is generated.

---

# Purpose

This directory contains documentation that is generated directly from the codebase.

Generated files ensure that:

- API documentation always matches the implementation.
- Database schemas stay synchronized with Mongoose models.
- Test coverage is always up to date.
- Documentation never becomes outdated due to forgotten manual edits.

---

# Generation Workflow

Documentation is generated automatically in two situations.

## During Development

A watcher continuously monitors the project and regenerates documentation whenever supported source files change.

```bash
pnpm docs:watch
```

---

## Before Every Commit

A Husky pre-commit hook automatically regenerates documentation before Git creates a commit.

Developers do not need to remember to run documentation commands manually.

```
Source Changes
       │
       ▼
Documentation Generator
       │
       ▼
Generated Files Updated
       │
       ▼
Git Commit
```

---

# Directory Structure

```
docs/
└── 06-generated/
    ├── api/
    │   └── openapi.json
    ├── database/
    │   └── schemas.json
    └── coverage/
```

---

# Generated Outputs

| Directory | Generated From | Generator | Output |
|-----------|----------------|-----------|--------|
| `api/` | Express routes | `swagger-autogen` | OpenAPI 3 specification |
| `database/` | Mongoose models | Custom schema generator | JSON Schema documentation |
| `coverage/` | Test execution | Vitest | HTML + JSON coverage reports |

Additional generated files may be added as the project grows.

---

# Source of Truth

Never edit generated files.

Always modify the original source.

| Want to Change | Edit This |
|----------------|-----------|
| API documentation | Express route annotations |
| Request/Response schema | Validation schema / DTO |
| Database schema | Mongoose model |
| OpenAPI output | Route JSDoc comments |
| Coverage report | Tests |

---

# Manual Generation

Generate everything

```bash
pnpm docs:generate
```

Server only

```bash
pnpm --filter server docs:generate
```

---

## Generate API Documentation

```bash
pnpm --filter server docs:generate:api
```

---

## Generate Database Documentation

```bash
pnpm --filter server docs:generate:db
```

---

## Generate Coverage

```bash
pnpm test --coverage
```

---

# Development Watch Mode

Run the watcher while developing.

```bash
pnpm docs:watch
```

The watcher automatically regenerates documentation whenever supported files change.

Typical workflow

```
Edit Code

↓

Save File

↓

Watcher Detects Change

↓

Documentation Regenerated

↓

Continue Development
```

---

# Pre-Commit Automation

Every commit performs the following steps automatically.

```
Format & Lint (lint-staged)

↓

Generate Documentation

↓

Git Commit
```

If any step fails, the commit is blocked until the issue is fixed.

---

# API Documentation

API documentation is generated directly from Express route files.

Expected source structure

```
apps/server/src/modules/**/*.route.ts
```

Documentation generator

```
swagger-autogen
```

Generated output

```
docs/06-generated/api/openapi.json
```

The OpenAPI specification should always match the running API.

---

# Database Documentation

Database documentation is generated from Mongoose models.

Expected source

```
apps/server/src/modules/**/*.model.ts
```

Generated output

```
docs/06-generated/database/schemas.json
```

Every exported model should appear automatically.

---

# Coverage Reports

Coverage is generated after running the test suite.

Output

```
docs/generated/coverage/
```

Contains

- HTML report
- JSON report
- Coverage summary

Coverage should never be edited manually.

---

# Rules

## Never Edit Generated Files

Everything inside this directory is disposable.

Changes will be lost.

---

## Fix the Source

If generated output is incorrect:

✅ Fix

- Route annotations
- Validation schema
- Mongoose model
- Generator configuration

❌ Never edit

- `openapi.json`
- `schemas.json`
- Coverage reports

---

## Keep Generators Working

When creating new modules:

- Export models correctly.
- Follow project folder structure.
- Add API annotations where required.
- Keep validation schemas synchronized.

---

## Commit Only Valid Output

Generated documentation should always be committed if it changes.

This ensures:

- Pull requests contain updated documentation.
- API specs remain synchronized.
- Coverage reports stay current.
- Other developers always receive the latest generated files.

---

# Troubleshooting

| Problem | Solution |
|---------|----------|
| API documentation missing endpoint | Check route registration and Swagger annotations |
| Model missing from schema output | Verify model export and generator configuration |
| Coverage report missing | Run the test suite with coverage enabled |
| Watcher not updating | Restart `pnpm docs:watch` |
| Pre-commit generation failed | Fix the reported error and commit again |

---

# Future Generated Assets

Planned generated documentation includes:

- API client SDK
- Database ER diagrams
- Route dependency graph
- Socket.IO event documentation
- Environment variable reference
- Permission matrix
- Architecture diagrams
- Bundle analysis reports

---

# Related Documents

- [Testing Guide](../05-guidelines/04-testing.md)
- [Git Workflow](../05-guidelines/01-git-workflow.md)
- [Coding Standards](../05-guidelines/02-coding-standards.md)
- [Data Model](../02-architecture/02-data-model.md)
- [System Diagram](../02-architecture/01-system-diagram.md)