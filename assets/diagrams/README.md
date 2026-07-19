# Assets — Diagrams

All project diagrams live here as flat, numbered files. Organized by purpose, not by technology layer.

---

## Naming Convention

```
[number]-[purpose].drawio
```

Use draw.io (diagrams.net), Excalidraw, or Mermaid. Export visual formats (SVG, PNG) alongside source files.

---

## Planned Diagrams

| File                          | Purpose                                   | Referenced By                |
| ----------------------------- | ----------------------------------------- | ---------------------------- |
| `01-system.drawio`            | High-level system architecture            | Architecture Overview        |
| `02-folder-structure.drawio`  | Repository and monorepo layout            | Folder Structure             |
| `03-database-er.drawio`       | Entity-relationship diagram               | Database blueprint           |
| `04-auth-flow.drawio`         | Authentication and token lifecycle        | Security Plan, Auth workflow |
| `05-request-lifecycle.drawio` | HTTP request through middleware stack     | Backend Reference            |
| `06-project-workflow.drawio`  | Project creation, archival, deletion flow | Project workflow             |
| `07-task-workflow.drawio`     | Task lifecycle and state transitions      | Task workflow                |
| `08-deployment.drawio`        | CI/CD pipeline and environment topology   | Deployment Reference         |
| `09-component-tree.drawio`    | React component hierarchy                 | Components blueprint         |
| `10-api-flow.drawio`          | API request/response data flow            | API blueprint                |

---

## Best Practices

- Number diagrams for stable ordering.
- One diagram per purpose. Don't combine unrelated flows.
- Export a PNG or SVG alongside the source file for quick viewing.
- Update the diagram before updating the code it represents.
- Reference diagrams from documentation using relative paths.
