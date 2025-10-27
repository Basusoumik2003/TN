const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: 5432,
  max: 20, // max number of clients in the pool
  idleTimeoutMillis: 30000, // close idle clients after 30s
  connectionTimeoutMillis: 2000, // return error after 2s if cannot connect
});

pool.on("connect", () => {
  console.log("✅ Connected to PostgreSQL");
});

pool.on("error", (err) => {
  console.error("❌ Unexpected database error:", err.message);
  // Attempt to reconnect if needed
  setTimeout(() => {
    console.log("♻️  Reconnecting to database...");
  }, 2000);
});

module.exports = pool;
