async function logAction(connection, action, userId = null) {
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
  