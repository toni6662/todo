import pkg from "pg";
const { Pool } = pkg;

declare global {
  var pgPool: InstanceType<typeof Pool> | undefined;
}

let pool: InstanceType<typeof Pool>;

console.log('global.pgPool', global.pgPool);

if(!global.pgPool) {
  global.pgPool = new Pool({
    host: 'p68dnc.h.filess.io',       // or your Docker container name
    port: 5432,
    user: 'todo_announced',
    password: 'fec19cf66218fdf41610f858f0673d8fa9737bf1',
    database: 'todo_announced',
    max: 2
  });
}

pool = global.pgPool;

export default pool;