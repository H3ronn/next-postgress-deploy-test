import { Pool } from "pg";

let conn = new Pool({
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  host: process.env.PGHOST,
  port: process.env.PGPORT as number | undefined,
  database: process.env.PGDATABASE,
});

export default conn;
