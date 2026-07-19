# ProjectOS

A modern, full-stack project management platform for freelancers and small engineering teams.

---

## Overview

ProjectOS is a SaaS project management application that combines project planning, task management, client management, file sharing, real-time collaboration, and notifications into a single unified workspace.

Built with a TypeScript-first monorepo architecture using Next.js, Express.js, MongoDB, and Socket.IO.

---

## Tech Stack

| Layer           | Technology                    |
| --------------- | ----------------------------- |
| Frontend        | Next.js 16.2.10, React 19.2.4 |
| Backend         | Express.js 5.x, Node.js 20+   |
| Database        | MongoDB + Mongoose            |
| Real-Time       | Socket.IO                     |
| File Storage    | Cloudinary                    |
| Language        | TypeScript                    |
| Styling         | Tailwind CSS 4.x              |
| Package Manager | pnpm 11.10.0                  |
| Monorepo        | Turborepo                     |

---

## Monorepo Structure

```text
projectos/

├── apps/
│   ├── web/        # Next.js frontend
│   └── server/     # Express backend
│
├── packages/
│   ├── shared/     # Shared types and schemas
│   └── ui/         # Shared UI components
│
├── docs/           # Project documentation
├── package.json
├── pnpm-workspace.yaml
└── turbo.json
```

---

## Quick Start

### Prerequisites

- Node.js 20.x or later
- pnpm 11.x or later
- MongoDB 8.x or a MongoDB Atlas account
- Cloudinary account

### Setup

```bash
# Clone the repository
git clone <repository-url>
cd ProjectOS

# Install dependencies
pnpm install

# Install Git hooks
pnpm prepare

# Configure environment variables
cp apps/server/.env.example apps/server/.env
cp apps/web/.env.example apps/web/.env.local

# Start development servers
pnpm dev
```

### Development Servers

| Application | URL                   |
| ----------- | --------------------- |
| Frontend    | http://localhost:3000 |
| Backend API | http://localhost:5000 |

---

## Available Scripts

| Command              | Description                                    |
| -------------------- | ---------------------------------------------- |
| `pnpm dev`           | Start all development servers                  |
| `pnpm build`         | Build all workspaces                           |
| `pnpm lint`          | Run ESLint across all workspaces               |
| `pnpm format`        | Format all files with Prettier                 |
| `pnpm format:check`  | Check formatting without writing               |
| `pnpm docs:generate` | Regenerate API and database documentation      |
| `pnpm docs:watch`    | Watch for changes and regenerate documentation |

---

## Documentation

Full documentation is located in the [`docs/`](docs/) directory.

| Section                               | Description                              |
| ------------------------------------- | ---------------------------------------- |
| [Onboarding](docs/01-onboarding/)     | Setup, tech stack, environment variables |
| [Architecture](docs/02-architecture/) | System design, data model, security      |
| [Features](docs/03-features/)         | Feature specifications                   |
| [Decisions](docs/04-decisions/)       | Architecture Decision Records            |
| [Guidelines](docs/05-guidelines/)     | Git workflow, coding standards, testing  |
| [Generated](docs/06-generated/)       | Auto-generated API and schema docs       |

---

## License

ISC
