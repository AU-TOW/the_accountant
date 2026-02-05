import pg from "pg";
import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const client = new pg.Client({
  connectionString:
    "postgresql://postgres:8kmwO04kZ0eJDKcl@db.uytljrorlihfqgtmxqvz.supabase.co:5432/postgres",
  ssl: { rejectUnauthorized: false },
});

async function run() {
  console.log("Connecting to Supabase...");
  await client.connect();
  console.log("Connected.\n");

  const sql = readFileSync(
    resolve(__dirname, "../supabase/schema.sql"),
    "utf-8"
  );

  console.log("Executing full schema SQL...\n");

  try {
    await client.query(sql);
    console.log("Schema executed successfully!");
  } catch (err) {
    console.error("Schema execution failed:", err.message);
    console.error("\nAttempting statement-by-statement...\n");
    await runStatementByStatement(sql);
  }

  // Verify tables exist
  console.log("\nVerifying tables...");
  const { rows } = await client.query(`
    SELECT table_name
    FROM information_schema.tables
    WHERE table_schema = 'public'
    ORDER BY table_name
  `);
  console.log("Tables found:", rows.map((r) => r.table_name).join(", "));

  await client.end();
}

async function runStatementByStatement(sql) {
  // Split on semicolons, respecting $$ blocks
  const statements = [];
  let current = "";
  let inDollarBlock = false;

  for (const line of sql.split("\n")) {
    current += line + "\n";
    const dollarCount = (line.match(/\$\$/g) || []).length;
    if (dollarCount % 2 !== 0) inDollarBlock = !inDollarBlock;

    if (line.trim().endsWith(";") && !inDollarBlock) {
      // Check if statement has any actual SQL (not just comments)
      const hasSQL = current
        .split("\n")
        .some((l) => l.trim() && !l.trim().startsWith("--"));
      if (hasSQL) statements.push(current.trim());
      current = "";
    }
  }

  let success = 0, failed = 0;
  for (let i = 0; i < statements.length; i++) {
    const label = statements[i]
      .split("\n")
      .find((l) => l.trim() && !l.trim().startsWith("--"))
      ?.trim()
      .substring(0, 80);
    try {
      await client.query(statements[i]);
      console.log(`[${i + 1}/${statements.length}] OK: ${label}`);
      success++;
    } catch (err) {
      console.error(`[${i + 1}/${statements.length}] FAILED: ${label}`);
      console.error(`  Error: ${err.message}`);
      failed++;
    }
  }
  console.log(`\n${success} succeeded, ${failed} failed.`);
}

run().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
