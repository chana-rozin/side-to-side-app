import { createConnection } from './db.js';
import { logAction } from '../logging/logger.js';


async function executeQuery(query, params, userId) {
  let results;
  console.log(params);
  const connection = await createConnection();
  
  try {
    [results] = await connection.execute(query, params);
    console.log("query executed successfully:", results);
    if (userId) {
      await logAction(`Query executed: ${query}`, userId);
    }
  } catch (err) {
    console.log("error executing query:", err);
    throw `error executing query: ${err}`
  } finally {
    await connection.end();
    console.log("connection closed");
  }
  
  return results;
}

export { executeQuery };
