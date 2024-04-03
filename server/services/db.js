import * as mysql from 'mysql2/promise';
import 'dotenv/config';

async function executeQuery(query, params) {
    let results;
    console.log(query, process.env.DB_HOST);
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    });

    try {
        [results] = await connection.execute(query, params);
        console.log("query executed successfully:", results);
    } catch (err) {
        console.log("error executing query:", err);
        throw `error executing query: ${err}`
    } finally {
        await connection.end();
        console.log("connection closed");
    }
    return results;
}

export {
    executeQuery
};
