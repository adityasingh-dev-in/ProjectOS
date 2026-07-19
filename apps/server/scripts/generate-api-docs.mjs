/**
 * generate-api-docs.mjs
 *
 * API Documentation Generator
 * ─────────────────────────────────────────────────────────────────────────────
 * Scans all *.route.ts files under src/modules/** and feeds them to
 * swagger-autogen, which reads JSDoc @swagger annotations and produces a
 * fully-formed OpenAPI 3.0 JSON file.
 *
 * Output → docs/06-generated/api/openapi.json  (relative to monorepo root)
 *
 * Usage:
 *   node apps/server/scripts/generate-api-docs.mjs
 *   (or via npm script: pnpm --filter server docs:generate:api)
 *
 * How to annotate your routes (add JSDoc above each handler):
 * ─────────────────────────────────────────────────────────────────────────────
 *   router.post('/login', async (req, res) => {
 *     #swagger.tags = ['Auth']
 *     #swagger.summary = 'Login a user'
 *     #swagger.requestBody = { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/LoginBody' } } } }
 *     #swagger.responses[200] = { description: 'Returns JWT + user object' }
 *     #swagger.responses[401] = { description: 'Invalid credentials' }
 *   });
 */

import { createRequire } from "module";
import { glob } from "fs/promises"; // Node 22+
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

// ─── Resolve paths ────────────────────────────────────────────────────────────
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Monorepo root = 3 levels up from apps/server/scripts/
const MONOREPO_ROOT = path.resolve(__dirname, "../../..");
const SERVER_ROOT = path.resolve(__dirname, "..");
const OUTPUT_FILE = path.join(
  MONOREPO_ROOT,
  "docs/06-generated/api/openapi.json",
);
const MODULES_DIR = path.join(SERVER_ROOT, "src/modules");

// ─── swagger-autogen requires CommonJS require() ──────────────────────────────
const require = createRequire(import.meta.url);
const swaggerAutogen = require("swagger-autogen")({ openapi: "3.0.0" });

// ─── Load base document ───────────────────────────────────────────────────────
const { swaggerDocument } = await import("./swagger.config.mjs");

// ─── Collect route files ──────────────────────────────────────────────────────
async function findRouteFiles() {
  if (!fs.existsSync(MODULES_DIR)) {
    console.warn(
      "[docs:api] ⚠️  src/modules/ directory not found — skipping route scan.",
    );
    return [];
  }

  const files = [];
  const entries = fs.readdirSync(MODULES_DIR, { recursive: true });

  for (const entry of entries) {
    if (entry.endsWith(".route.ts")) {
      files.push(path.join(MODULES_DIR, entry));
    }
  }

  return files;
}

// ─── Main ─────────────────────────────────────────────────────────────────────
async function main() {
  console.log("[docs:api] 🔍 Scanning for route files...");

  const routeFiles = await findRouteFiles();

  if (routeFiles.length === 0) {
    console.warn(
      "[docs:api] ⚠️  No *.route.ts files found in src/modules/. " +
        "Generating a skeleton openapi.json.",
    );
  } else {
    console.log(
      `[docs:api] 📄 Found ${routeFiles.length} route file(s):\n` +
        routeFiles
          .map((f) => `         • ${path.relative(MONOREPO_ROOT, f)}`)
          .join("\n"),
    );
  }

  // Ensure output directory exists
  fs.mkdirSync(path.dirname(OUTPUT_FILE), { recursive: true });

  // If no routes found, write a valid skeleton so the file always exists
  if (routeFiles.length === 0) {
    const skeleton = {
      ...swaggerDocument,
      paths: {},
      "x-generated-at": new Date().toISOString(),
      "x-generated-by": "swagger-autogen",
      "x-note":
        "No route files found. Add *.route.ts files to src/modules/<feature>/ to populate this spec.",
    };
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(skeleton, null, 2));
    console.log(`[docs:api] ✅ Skeleton written to ${OUTPUT_FILE}`);
    return;
  }

  // Run swagger-autogen
  try {
    await swaggerAutogen(OUTPUT_FILE, routeFiles, swaggerDocument);

    // Inject generation metadata
    const generated = JSON.parse(fs.readFileSync(OUTPUT_FILE, "utf-8"));
    generated["x-generated-at"] = new Date().toISOString();
    generated["x-generated-by"] = "swagger-autogen";
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(generated, null, 2));

    console.log(
      `[docs:api] ✅ OpenAPI spec written to:\n         ${OUTPUT_FILE}`,
    );
  } catch (err) {
    console.error("[docs:api] ❌ Generation failed:", err.message);
    process.exit(1);
  }
}

main();
