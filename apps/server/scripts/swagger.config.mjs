/**
 * swagger.config.mjs
 *
 * Base OpenAPI document metadata passed to swagger-autogen.
 * Edit the `info` block as the project evolves (version, contact, license, etc.).
 * Do NOT modify the `paths` or `components` keys here — those are auto-generated.
 */

export const swaggerDocument = {
  openapi: "3.0.0",
  info: {
    title: "ProjectOS API",
    version: "1.0.0",
    description:
      "Auto-generated OpenAPI specification for the ProjectOS backend. " +
      "This file is regenerated on every commit via the pre-commit hook and " +
      "during development via `pnpm docs:watch`. **Do not edit manually.**",
    contact: {
      name: "ProjectOS Team",
    },
    license: {
      name: "ISC",
    },
  },
  servers: [
    {
      url: "http://localhost:5000",
      description: "Local development server",
    },
    {
      url: "https://api.projectos.dev",
      description: "Production server",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        description: "JWT access token issued on login.",
      },
      cookieAuth: {
        type: "apiKey",
        in: "cookie",
        name: "refreshToken",
        description: "HTTP-only refresh token cookie.",
      },
    },
  },
  security: [{ bearerAuth: [] }],
  tags: [],
};
