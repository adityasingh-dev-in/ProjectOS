/**
 * generate-db-docs.mjs
 *
 * Database Schema Documentation Generator
 * ─────────────────────────────────────────────────────────────────────────────
 * Scans all *.model.ts files under src/modules/**, dynamically imports each
 * one via `tsx` (so TypeScript is handled without a compile step), extracts
 * the Mongoose schema, and converts it to JSON Schema using
 * mongoose-schema-jsonschema.
 *
 * Output → docs/06-generated/database/schemas.json  (relative to monorepo root)
 *
 * Usage:
 *   node apps/server/scripts/generate-db-docs.mjs
 *   (or via npm script: pnpm --filter server docs:generate:db)
 *
 * Requirements:
 *   - Each model file must export its Mongoose model as the **default export**.
 *   - Example:
 *       const User = mongoose.model('User', UserSchema);
 *       export default User;
 */

import { createRequire } from "module";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import { execSync } from "child_process";
import os from "os";

// ─── Resolve paths ────────────────────────────────────────────────────────────
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const MONOREPO_ROOT = path.resolve(__dirname, "../../..");
const SERVER_ROOT = path.resolve(__dirname, "..");
const OUTPUT_FILE = path.join(
  MONOREPO_ROOT,
  "docs/06-generated/database/schemas.json",
);
const MODULES_DIR = path.join(SERVER_ROOT, "src/modules");

// ─── mongoose-schema-jsonschema requires CommonJS require() ───────────────────
const require = createRequire(import.meta.url);

// ─── Collect model files ──────────────────────────────────────────────────────
function findModelFiles() {
  if (!fs.existsSync(MODULES_DIR)) {
    console.warn(
      "[docs:db] ⚠️  src/modules/ directory not found — skipping model scan.",
    );
    return [];
  }

  const files = [];
  const entries = fs.readdirSync(MODULES_DIR, { recursive: true });

  for (const entry of entries) {
    if (entry.endsWith(".model.ts")) {
      files.push(path.join(MODULES_DIR, entry));
    }
  }

  return files;
}

// ─── Extract schema from a model file via tsx ────────────────────────────────
// We spin up a child process for each model file using tsx so that TypeScript
// is transpiled on-the-fly. The child extracts and prints the schema as JSON.
function extractSchemaFromFile(modelFile) {
  // Inline extraction script — runs in the context of the model file's dir
  const extractScript = `
import model from ${JSON.stringify(modelFile.replace(/\\/g, "/"))};
import jsonSchema from "mongoose-schema-jsonschema";

if (!model || !model.schema) {
  process.stderr.write("SKIP: No .schema property on default export\\n");
  process.exit(0);
}

const schema = jsonSchema(model.schema);
process.stdout.write(JSON.stringify(schema));
`.trim();

  // Write to a temp file so tsx can execute it
  const tmpFile = path.join(os.tmpdir(), `_schema_extract_${Date.now()}.mjs`);
  fs.writeFileSync(tmpFile, extractScript);

  try {
    const tsxBin = path.join(SERVER_ROOT, "node_modules/.bin/tsx");
    const output = execSync(`"${tsxBin}" ${tmpFile}`, {
      cwd: SERVER_ROOT,
      env: {
        ...process.env,
        // Suppress Mongoose connection warnings during extraction
        SUPPRESS_MONGOOSE_DEPRECATION_WARNINGS: "1",
      },
      timeout: 15000,
    }).toString();

    if (!output.trim()) return null;
    return JSON.parse(output);
  } catch (err) {
    const stderr = err.stderr?.toString() || "";
    if (stderr.includes("SKIP:")) {
      console.warn(
        `[docs:db] ⚠️  Skipped ${path.basename(modelFile)}: ${stderr.replace("SKIP:", "").trim()}`,
      );
      return null;
    }
    console.error(
      `[docs:db] ❌ Failed to extract schema from ${path.basename(modelFile)}:`,
      stderr || err.message,
    );
    return null;
  } finally {
    // Clean up temp file
    try {
      fs.unlinkSync(tmpFile);
    } catch (_) {}
  }
}

// ─── Main ─────────────────────────────────────────────────────────────────────
async function main() {
  console.log("[docs:db] 🔍 Scanning for model files...");

  const modelFiles = findModelFiles();

  // Ensure output directory exists
  fs.mkdirSync(path.dirname(OUTPUT_FILE), { recursive: true });

  if (modelFiles.length === 0) {
    console.warn(
      "[docs:db] ⚠️  No *.model.ts files found in src/modules/. " +
        "Writing empty schemas.json.",
    );
    const emptyOutput = {
      $schema: "http://json-schema.org/draft-07/schema",
      title: "ProjectOS Database Schemas",
      description:
        "Auto-generated from Mongoose model definitions. " +
        "No model files found yet. Add *.model.ts files to src/modules/<feature>/.",
      "x-generated-at": new Date().toISOString(),
      "x-generated-by": "mongoose-schema-jsonschema",
      schemas: {},
    };
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(emptyOutput, null, 2));
    console.log(`[docs:db] ✅ Empty schemas.json written to ${OUTPUT_FILE}`);
    return;
  }

  console.log(
    `[docs:db] 📄 Found ${modelFiles.length} model file(s):\n` +
      modelFiles
        .map((f) => `         • ${path.relative(MONOREPO_ROOT, f)}`)
        .join("\n"),
  );

  const schemas = {};
  let successCount = 0;

  for (const modelFile of modelFiles) {
    const modelName = path.basename(modelFile, ".model.ts");
    console.log(`[docs:db] ⚙️  Extracting schema: ${modelName}`);

    const schema = extractSchemaFromFile(modelFile);
    if (schema) {
      schemas[modelName] = schema;
      successCount++;
    }
  }

  const output = {
    $schema: "http://json-schema.org/draft-07/schema",
    title: "ProjectOS Database Schemas",
    description:
      "Auto-generated from Mongoose model definitions. " +
      "Do not edit manually — regenerated on every commit and via `pnpm docs:watch`.",
    "x-generated-at": new Date().toISOString(),
    "x-generated-by": "mongoose-schema-jsonschema",
    schemas,
  };

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(output, null, 2));
  console.log(
    `[docs:db] ✅ ${successCount}/${modelFiles.length} schema(s) written to:\n         ${OUTPUT_FILE}`,
  );
}

main().catch((err) => {
  console.error("[docs:db] ❌ Fatal error:", err);
  process.exit(1);
});
