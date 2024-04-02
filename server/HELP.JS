import mysql from 'mysql2/promise';

const connection = await mysql.createConnection({
    host: "127.0.0.3",
    user: "nodeProj",
    password: "nodeProj123",
    database: "nodeprojdb"
  });
  const [results,] = await connection.query("SELECT * FROM users");
  console.log(results);