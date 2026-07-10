// Postgres connection, only used when DATABASE_URL is set (production).
// Local dev without DATABASE_URL falls back to the JSON file store in orders.ts.
import { Pool } from "pg";

let pool: Pool | null = null;
let ready: Promise<void> | null = null;

export function hasDb(): boolean {
  return !!process.env.DATABASE_URL;
}

export function getPool(): Pool {
  if (!pool) {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.DATABASE_URL?.includes("localhost") ? false : { rejectUnauthorized: false },
    });
  }
  return pool;
}

// Simple JSONB key-value store — one row per logical "table" (orders array, config, admin key).
export async function ensureSchema(): Promise<void> {
  if (!ready) {
    ready = getPool().query(
      `CREATE TABLE IF NOT EXISTS apexrig_kv (key TEXT PRIMARY KEY, value JSONB NOT NULL)`
    ).then(() => undefined);
  }
  return ready;
}

export async function kvGet<T>(key: string): Promise<T | null> {
  await ensureSchema();
  const { rows } = await getPool().query("SELECT value FROM apexrig_kv WHERE key = $1", [key]);
  return rows.length ? (rows[0].value as T) : null;
}

export async function kvSet(key: string, value: unknown): Promise<void> {
  await ensureSchema();
  await getPool().query(
    `INSERT INTO apexrig_kv (key, value) VALUES ($1, $2)
     ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value`,
    [key, JSON.stringify(value)]
  );
}
