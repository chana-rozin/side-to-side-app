import executeQuery from '../services/db'

async function logAction(action, userId = null) {
  const queryString = 'INSERT INTO logs (action, user_id) VALUES (?, ?)';
  const values = [action, userId];

    try {
        await executeQuery(queryString, values);
        console.log('Action logged successfully.');
    } catch (error) {
        console.error('Error logging action:', error);
}
}

export default logAction;
