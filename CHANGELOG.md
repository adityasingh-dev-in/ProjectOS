# Changelog

All notable changes to ProjectOS are documented in this file.

This file follows the [Keep a Changelog](https://keepachangelog.com/) format.

---

## [Unreleased]

### Added

- Initial monorepo structure with Turborepo, pnpm workspaces, and shared packages.
- Express.js backend scaffold with Helmet, CORS, cookie-parser, compression, and Morgan middleware.
- Next.js 16 frontend scaffold with Tailwind CSS 4, App Router, and TypeScript.
- Shared `@projectos/shared` package for types and constants.
- Shared `@projectos/ui` package for reusable UI components.
- Documentation structure covering onboarding, architecture, features, decisions, and guidelines.
- Automated API and database documentation generation via `swagger-autogen` and `mongoose-schema-jsonschema`.
- Husky pre-commit hook running lint-staged and `docs:generate` before every commit.
- Commitlint enforcing Conventional Commits on all commit messages.
- Feature documentation for Authentication, Kanban Board, File Uploads, and Notifications.
- Architecture Decision Records for MongoDB, Zustand, and Turborepo.

---

## Format

```
## [version] — YYYY-MM-DD

### Added
New features.

### Changed
Changes to existing features.

### Deprecated
Features soon to be removed.

### Removed
Features removed in this version.

### Fixed
Bug fixes.

### Security
Security fixes and vulnerability patches.
```

Entries are written as changes are merged, not at release time.
