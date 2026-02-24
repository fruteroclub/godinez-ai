import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "../../../drizzle/schema";

function createDb() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error(
      "DATABASE_URL is not set. Add it to .env.local for development."
    );
  }
  const sql = neon(url);
  return drizzle({ client: sql, schema });
}

// Lazy singleton — only connects when first accessed at runtime
let _db: ReturnType<typeof createDb> | undefined;

export const db = new Proxy({} as ReturnType<typeof createDb>, {
  get(_target, prop, receiver) {
    if (!_db) _db = createDb();
    return Reflect.get(_db, prop, receiver);
  },
});
