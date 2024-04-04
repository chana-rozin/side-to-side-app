import * as mysql from 'mysql2/promise';
import 'dotenv/config';

let connection = null;

async function createConnection() {
  if (connection) {
    return connection;
  } else {
    connection =  await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
    });
    return connection;
}
}

export { createConnection };
