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
        const columns = `name, username, email, address, phone`
        const queryUser = createQuery('users', columns, userToString(userItem));
        const result =  await executeQuery(queryUser, [userItem.name, userItem.username, userItem.email, userItem.address, userItem.phone]);
        return result;

    }

    async deleteUser(id){
        const queryUser = deleteQuery('users', 'id');
        const result = await executeQuery(queryUser, [id]);
        return result;
    }

    async updateUser(userItem){
        const columns = "name =?, userName =?, email=?, address=?, phone=?"
        const queryUser = updateQuery('users', 'id', columns);
        const result =  await executeQuery(queryUser, [userItem.name, userItem.username, userItem.email, userItem.address, userItem.phone, id]);
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
    const stringTodo = `${userItem.name}, ${userItem.username}, ${userItem.email}, ${userItem.address}, ${userItem.phone}`;
    return stringTodo;

}
