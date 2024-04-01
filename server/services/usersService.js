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
        const queryUser = createQuery('users', `name, username, email, address, phone`);
        const result =  await executeQuery(queryUser, [user.name, user.username, user.email, user.address, user.phone]);
        return result;

    }

    async deleteUser(id){
        const queryUser = deleteQuery('users', 'id');
        const result = await executeQuery(queryUser, [id]);
        return result;
    }

    async updateUser(userItem){
        const queryUser = updateQuery('users', 'id', `name = ?, username = ?, email = ?, address = ?, phone = ?`);
        const result =  await executeQuery(queryUser, [id, user.name, user.username, user.email, user.address, user.phone]);
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



