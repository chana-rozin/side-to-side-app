import { executeQuery } from './db.js';
import {getByIdQuery, getQuery, deleteQuery, updateQuery, createQuery, softDeleteQuery } from './query.js'

export class UsersService {

    async getUsers(queryParams, activeUserId) {
        const queryUser = getQuery('users',queryParams, true);
        const result = await executeQuery(queryUser.query, queryUser.params, activeUserId);
        return result;
    }

    async getUserById(id, activeUserId) {
        const queryUser = getByIdQuery('users', 'id', true);
        const result =  await executeQuery(queryUser, [id], activeUserId);
        return result;
    }

    async addUser(userItem, activeUserId) {
        const queryUser = createQuery('users', "name, username, email, address, phone", "?,?,?,?,?");
        const result =  await executeQuery(queryUser, [userItem.name, userItem.username, userItem.email, userItem.address, userItem.phone], activeUserId);
        return result;

    }

    async deleteUser(id, activeUserId){
        const user = await executeQuery(getByIdQuery("users","id"), [id]);
        const result = await executeQuery(softDeleteQuery('users', 'id'), [id], activeUserId);
        await executeQuery(deleteQuery("todos", "userId"),[id], activeUserId);
        await this.deleteUsersAlbums(user[0]);
        await this.deleteUsersPosts(user[0]);
        await executeQuery(deleteQuery("comments", "email"),[user[0].email], activeUserId);
        return result;
    }

    async deleteUsersAlbums(user, activeUserId){
        const userAlbums = await executeQuery(getByIdQuery("albums", "userId"),[id]);
        userAlbums.forEach(async el => await executeQuery(deleteQuery("photos", "albumId"),[el.id], activeUserId));
        await executeQuery(deleteQuery("albums", "userId"),[user.id], activeUserId);
    }

    async deleteUsersPosts(user, activeUserId){
        const userPosts = await executeQuery(getByIdQuery("posts", "userId"),[id], activeUserId);
        userPosts.forEach(async el => await executeQuery(deleteQuery("comments", "postId"),[el.id], activeUserId));
        await executeQuery(deleteQuery("posts", "userId"),[user.id], activeUserId);
    }

    async updateUser(userItem, id, activeUserId){
        const queryUser = updateQuery('users', 'id', usersColumns, true);
        const result =  await executeQuery(queryUser, [userItem.name, userItem.username, userItem.email, userItem.address, userItem.phone, id], activeUserId);
        return result;
    }

    async getUsersAlbums(id, activeUserId){
        const queryUser = getByIdQuery('albums', 'userId');
        const result =  await executeQuery(queryUser, [id], activeUserId);
        return result;
    }

    async getUsersPosts(id, activeUserId){
        const queryUser = getByIdQuery('posts', 'userId');
        const result =  await executeQuery(queryUser, [id], activeUserId);
        return result;
    }
    async getUsersTodos(id, activeUserId){
        const queryUser = getByIdQuery('todos', 'userId');
        const result =  await executeQuery(queryUser, [id], activeUserId);
        return result;
    }

    
}


const usersColumns = "name =?, userName =?, email=?, address=?, phone=?"

