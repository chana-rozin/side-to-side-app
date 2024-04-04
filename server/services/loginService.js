import { executeQuery } from './executeQuery.js';
import { createQuery, getByIdQuery } from './query.js'
import { logAction } from '../logging/logger.js'
//import bcrypt from 'bcrypt';

export class LoginService{

    // async loginService(username, password){
    //     try {
    //         const [user] = await executeQuery(getByIdQuery('users', 'username'), [username]);
    //         if (user && user.password === password) {
    //             delete user.password; // Remove password from response
    //             return user;
    //         }
    //         return null;
    //     } catch (error) {
    //         throw new Error('Error authenticating user');
    //     }
    // };

    async login(username, password){
        try {
            const query = getByIdQuery('access', 'username');
            const [user] = await executeQuery(query, [username]);
            console.log('logged user', password, user.psw)
            //if (user && await bcrypt.compare(password, user.psw)) {
            if (user && password === user.psw) {
                console.log("got user and compare psw")
                delete user.psw; // Remove password from response
                logAction(`Query executed: ${query}`, user.id)
                return user;
            }
            return null;
        } catch (error) {
            console.error(error);
            throw new Error('Error authenticating user');
        }
    };

    async getUserByUsername(username, activeUserId){
        const queryUser = getByIdQuery('users', 'username', true);
        const result =  await executeQuery(queryUser, [username], activeUserId);
        return result;
    }
    
}
