import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  host: 'p68dnc.h.filess.io',       // or your Docker container name
  port: 5432,
  user: 'todo_announced',
  password: 'fec19cf66218fdf41610f858f0673d8fa9737bf1',
  database: 'todo_announced',
});

export default pool;