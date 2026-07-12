# Hono

- Separate route registration, HTTP handlers, and application or domain behavior proportionally to the service.
- Keep HTTP handlers thin, validate at boundaries, and use middleware for cross-cutting concerns.
- Apply these rules only inside Hono services.
