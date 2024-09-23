// import { Pool } from "pg";
import pg from "pg";
const { Pool } = pg;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "ezgi.123",
  port: 5432,
});

pool.on("connect", () => {
  console.log("Database Bağlantısını Sağladım.");
});

export default pool;
