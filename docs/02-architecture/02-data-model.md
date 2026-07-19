# Data Model

> Overview of the ProjectOS database architecture, entity relationships, modeling decisions, and indexing strategy.

---

# Database Philosophy

ProjectOS uses **MongoDB** with **Mongoose** to provide a flexible, scalable, and developer-friendly data model.

The database follows these principles:

- Documents are validated using Mongoose schemas.
- Related data is referenced unless it is small and always loaded together.
- Frequently accessed configuration is embedded.
- Large collections are queried independently.
- Every collection supports timestamps.
- Soft deletes are preferred over permanent deletion.
- Collections are designed for efficient filtering, pagination, and indexing.

---

# Database Overview

```text
                           User
                             │
                 owns        │
                             ▼
                        Project
                    ┌──────┼──────┐
                    │      │      │
                    │      │      │
                    ▼      ▼      ▼
                 Client   Task   Activity
                           │
              ┌────────────┼────────────┐
              ▼                         ▼
         Comment                 Attachments
                                       │
                                       ▼
                                 Cloudinary

User
 │
 ├────────► Notifications
 │
 └────────► Activity
```

---

# Core Collections

| Collection      | Purpose                                             |
| --------------- | --------------------------------------------------- |
| `users`         | User accounts, authentication, profile, preferences |
| `projects`      | Project workspace and settings                      |
| `tasks`         | Individual work items                               |
| `clients`       | Client information linked to projects               |
| `comments`      | Task discussions                                    |
| `notifications` | User notifications                                  |
| `activities`    | Audit trail of important actions                    |

---

# Entity Relationships

| Parent   | Relationship | Child                                |
| -------- | ------------ | ------------------------------------ |
| User     | One-to-Many  | Projects                             |
| User     | One-to-Many  | Notifications                        |
| User     | One-to-Many  | Activities                           |
| Project  | One-to-Many  | Tasks                                |
| Project  | Many-to-One  | Client                               |
| Task     | One-to-Many  | Comments                             |
| Task     | One-to-Many  | Attachments (embedded metadata)      |
| Activity | References   | User, Project, Task, Client, Comment |

---

# Attachment Strategy

ProjectOS does **not** store files inside MongoDB.

Instead:

```text
Browser
    │
    ▼
Express
    │
    ▼
Cloudinary
    │
    ▼
MongoDB

Stores only:

• publicId
• secureUrl
• fileName
• fileType
• fileSize
• uploadedBy
• uploadedAt
```

This keeps database documents lightweight while allowing Cloudinary to handle storage and delivery.

---

# Embedding vs Referencing

| Data             | Strategy          | Reason                               |
| ---------------- | ----------------- | ------------------------------------ |
| User Preferences | Embedded          | Small and always loaded with user    |
| Project Settings | Embedded          | Always needed with project           |
| Project Members  | Embedded IDs      | Small array in Version 1             |
| Client Reference | Reference         | Independent collection               |
| Tasks            | Reference         | Large collection requiring filtering |
| Comments         | Reference         | Supports pagination                  |
| Notifications    | Reference         | Queried independently                |
| Activities       | Reference         | Large audit log                      |
| Attachments      | Embedded Metadata | Files stored in Cloudinary           |

---

# Common Fields

Every collection includes:

```text
_id
createdAt
updatedAt
isDeleted
```

Most collections also include:

```text
createdBy
updatedBy
```

where appropriate.

---

# Indexing Strategy

## Users

| Field | Type   | Purpose        |
| ----- | ------ | -------------- |
| email | Unique | Authentication |

---

## Projects

| Field  | Type  |
| ------ | ----- |
| owner  | Index |
| status | Index |

---

## Tasks

| Field            | Type     |
| ---------------- | -------- |
| project          | Index    |
| assignee         | Index    |
| status           | Index    |
| priority         | Index    |
| dueDate          | Index    |
| project + status | Compound |

---

## Clients

| Field | Type  |
| ----- | ----- |
| owner | Index |
| email | Index |

---

## Notifications

| Field            | Type     |
| ---------------- | -------- |
| recipient        | Index    |
| read             | Index    |
| recipient + read | Compound |

---

## Activities

| Field      | Type       |
| ---------- | ---------- |
| entityType | Index      |
| entityId   | Index      |
| createdAt  | Descending |

---

# Data Integrity

ProjectOS maintains consistency through:

- Mongoose schema validation
- Zod request validation
- Required foreign references
- Soft deletion
- Automatic timestamps
- Centralized business logic inside services

---

# Scaling Strategy

The schema is designed to support future features without major restructuring.

Future additions include:

- Organizations
- Team workspaces
- Role-based permissions
- Time tracking
- Automation
- Email integrations
- Public API
- Mobile applications

The current Version 1 schema intentionally avoids unnecessary complexity while remaining extensible.
