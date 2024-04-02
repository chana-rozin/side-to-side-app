import { executeQuery } from './db.js';
import { createQuery, getByIdQuery } from './query.js'
import bcrypt from 'bcrypt';

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

    async loginService(username, password){
        try {
            const [user] = await executeQuery(getByIdQuery('access', 'username'), [username]);
            if (user && await bcrypt.compare(password, user.psw)) {
                delete user.psw; // Remove password from response
                return user;
            }
            return null;
        } catch (error) {
            throw new Error('Error authenticating user');
        }
    };
    
}
