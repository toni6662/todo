import pkg from "pg";
const { Pool } = pkg;

declare global {
  // eslint-disable-next-line no-var
  var _pgPool: InstanceType<typeof Pool> | undefined;
}

const pool = new Pool({
  host: 'p68dnc.h.filess.io',       // or your Docker container name
  port: 5432,
  user: 'todo_announced',
  password: 'fec19cf66218fdf41610f858f0673d8fa9737bf1',
  database: 'todo_announced',
});


if (process.env.NODE_ENV === "development") {
  global._pgPool = pool;
}

export default pool;