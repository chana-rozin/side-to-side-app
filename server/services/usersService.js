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
        const queryUser = createQuery('users', stringUserItem);
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
        const queryUser = updateQuery('users', 'id', stringUserItem);
        const result =  await executeQuery(queryUser, [id]);
        return result;
    }

    async getUsersAlbums(id){
        const queryUser = getByIdQuery('albums', 'userId');
        const result =  await executeQuery(queryUser, [id]);
        return result;
    }

    async getUsersPosts(id){
        const queryUser = getByIdQuery('posts', 'userId');
        const result =  await executeQuery(queryUser, [id]);
        return result;
    }
    async getUsersTodos(id){
        const queryUser = getByIdQuery('todos', 'userId');
        const result =  await executeQuery(queryUser, [id]);
        return result;
    }

    
}
function userToString(user){
    stringUser = `name = ${user.name}, username = ${user.username}, email = ${user.email}, address = ${user.address}, phone = ${user.phone}`;
    return stringUser;

}
