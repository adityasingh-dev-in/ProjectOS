# ADR-001: Use MongoDB

**Date:** —
**Status:** Accepted

---

## Context

The project needs a primary data store for user accounts, projects, tasks, comments, notifications, and file metadata. The data is document-oriented — entities like projects contain nested settings, and tasks have flexible metadata that may evolve over time. The team is small and needs fast iteration without rigid schema migrations.

---

## Options Considered

### Option A — MongoDB

- **Pros:** Flexible document model, natural fit for nested/hierarchical data, horizontal scaling, schemaless iteration speed, strong ecosystem (Mongoose, Atlas).
- **Cons:** No native joins (requires application-level joins or aggregation), weaker ACID guarantees for multi-document transactions (improved in 4.0+), less mature tooling for complex queries.

### Option B — PostgreSQL

- **Pros:** Relational model with strong ACID guarantees, mature query optimizer, native joins, well-suited for complex queries and reporting.
- **Cons:** Rigid schemas require migrations for every change, object-relational impedance mismatch with JavaScript objects, more operational overhead for a small team.

---

## Decision

MongoDB was chosen because the data model is document-oriented (projects contain settings, tasks have variable metadata) and the team prioritizes iteration speed over relational integrity. Mongoose provides schema validation at the application level, giving structure without migration overhead.

---

## Consequences

### Positive

- Schema changes don't require migrations — faster iteration
- Natural mapping between MongoDB documents and JavaScript objects
- MongoDB Atlas provides managed hosting with built-in backups
- Mongoose schemas provide validation without database-level rigidity

### Negative

- Complex queries spanning multiple collections require aggregation pipelines or multiple queries
- No native foreign key constraints — referential integrity enforced at the application level
- Team must learn MongoDB-specific patterns (embedding vs. referencing, aggregation)

---

## References

- [MongoDB Documentation](https://www.mongodb.com/docs/)
- [Mongoose ODM](https://mongoosejs.com/)
- [MongoDB Atlas](https://www.mongodb.com/atlas)
