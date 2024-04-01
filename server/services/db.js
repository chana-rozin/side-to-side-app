import mysql from 'mysql2/promise';
import 'dotenv/config'
//import config from '../config'


async function executeQuery(query, params){
    let results;
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE
    });

    try {
        [results] = await connection.execute(query,params);

    } catch (err) {
        console.log(err);
    }
    finally {
        connection.end();
    }
    return results;
}

export{
    executeQuery
}