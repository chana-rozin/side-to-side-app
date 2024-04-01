import mysql from 'mysql2/promise';
import 'dotenv/config'
import config from '../config'


async function executeQuery(query, params){
    let results;
    const connection = await mysql.createConnection(config.db);

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