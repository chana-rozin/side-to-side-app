import { createConnection } from '../services/db.js'

async function logAction(action, userId = null) {
    const connection = await createConnection()
    const queryString = 'INSERT INTO logs (action, user_id) VALUES (?, ?)';
    const values = [action, userId];
    try {
      await connection.execute(queryString, values);
      console.log('Action logged successfully.');
    } catch (error) {
      console.error('Error logging action:', error);
    }
  }
  
  export { logAction };
  