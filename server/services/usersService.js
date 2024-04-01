import { executeQuery } from './db.js';
import {getByIdQuery, getQuery, deleteQuery, updateQuery, createQuery } from './query.js'

export class UsersService {

    async getUsers() {
        const queryUser = getQuery('users');
        const result = await executeQuery(queryUser);
        return result;
    }

    async getUserById(id) {
        const queryUser = getByIdQuery('users', 'id');
        const result =  await executeQuery(queryUser, [id]);
        return result;
    }

    async addUser(userItem) {
        stringUserItem = userToString(userItem);
        const queryUser = createQuery('users', userColomns, stringUserItem);
        const result =  await executeQuery(queryUser);
        return result;

    }

    async deleteUser(id){
        const queryUser = deleteQuery('users', 'id');
        const result = await executeQuery(queryUser, [id]);
        return result;
    }

    async updateUser(userItem){
        stringUserItem = userToString(userItem);
        const queryUser = updateQuery('users', 'id', userColomns, stringUserItem);
        const result =  await executeQuery(queryUser, [id]);
        return result;
    }

    
}
const userColomns = 'name, username, email, address, phone';
function userToString(user){
    stringUser = `${user.name}, ${user.username}, ${user.email}, ${user.address}, ${user.phone}`;
    return stringUser;

}
