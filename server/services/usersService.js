import { executeQuery } from './db.js';
import {getByIdQuery, getQuery, deleteQuery, updateQuery, createQuery, softDeleteQuery } from './query.js'

export class UsersService {

    async getUsers() {
        const queryUser = getQuery('users',true);
        const result = await executeQuery(queryUser);
        return result;
    }

    async getUserById(id) {
        const queryUser = getByIdQuery('users', 'id', true);
        const result =  await executeQuery(queryUser, [id]);
        return result;
    }

    async addUser(userItem) {
        const queryUser = createQuery('users', "name, username, email, address, phone", "?,?,?,?,?");
        const result =  await executeQuery(queryUser, [userItem.name, userItem.username, userItem.email, userItem.address, userItem.phone]);
        return result;

    }

    async deleteUser(id){
        const user = await executeQuery(getByIdQuery("users","id"), [id]);
        const queryUser = softDeleteQuery('users', 'id');
        const result = await executeQuery(queryUser, [id]);
        const queryTodo = deleteQuery("todos", "userId");
        await executeQuery(queryTodo,[id]);
        const userAlbumsQuery = getByIdQuery("albums", "userId");
        const userAlbums = await executeQuery(userAlbumsQuery,[id]);
        userAlbums.forEach(async el=>{
            const queryPhoto = deleteQuery("photos", "albumId");
            await executeQuery(queryPhoto,[el.id]);
        })
        const queryAlbum = deleteQuery("albums", "userId");
        await executeQuery(queryAlbum,[id]);
        const userPostQuery = getByIdQuery("posts", "userId");
        const userPosts = await executeQuery(userPostQuery,[id]);
        userPosts.forEach(async el=>{
            const queryComment = deleteQuery("comments", "postId");
            await executeQuery(queryComment,[el.id]);
        })
        const queryPost = deleteQuery("posts", "userId");
        await executeQuery(queryPost,[id]);
        const queryComment = deleteQuery("comments", "email");
        await executeQuery(queryPost,[user.email]);
        return result;
    }

    async updateUser(userItem, id){
        const queryUser = updateQuery('users', 'id', usersColumns, true);
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


const usersColumns = "name =?, userName =?, email=?, address=?, phone=?"

