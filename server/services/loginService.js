import { executeQuery } from './db.js';
import { createQuery, getByIdQuery } from './query.js'
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

    async login(username, password, activeUserId){
        try {
            const [user] = await executeQuery(getByIdQuery('access', 'username'), [username], activeUserId);
            console.log(password, user.psw)
            //if (user && await bcrypt.compare(password, user.psw)) {
            if (user && password === user.psw) {
                console.log("got user and compare psw")
                delete user.psw; // Remove password from response
                return user;
            }
            return null;
        } catch (error) {
            throw new Error('Error authenticating user');
        }
    };

    async getUserByUsername(username, activeUserId){
        const queryUser = getByIdQuery('users', 'username', true);
        const result =  await executeQuery(queryUser, [username], activeUserId);
        return result;
    }
    
}
