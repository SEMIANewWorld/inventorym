import { defineConfig } from "drizzle-kit";

import dotenv from "dotenv";

// Load .env before using process.env
dotenv.config();

if (!process.env.DB_URL) {
  throw new Error("DATABASE_URL not found in environment");
}

export default defineConfig({
  out: "./migrations",
  schema: "./shared/schema.ts",
  dialect: "mysql",
  dbCredentials: {
    url: process.env.DB_URL,
  },
});
