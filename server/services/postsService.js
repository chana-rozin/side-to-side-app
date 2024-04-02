import { executeQuery } from './db.js';
import {getByIdQuery, getQuery, deleteQuery, updateQuery, createQuery } from './query.js'

export class PostsService {

    async getPosts() {
        const queryPost = getQuery('posts');
        const result = await executeQuery(queryPost);
        return result;
    }

    async getPostById(id) {
        const queryPost = getByIdQuery('posts', 'id');
        const result =  await executeQuery(queryPost, [id]);
        return result;
    }

    async addPost(postItem) {
        const queryPost = createQuery('posts', "userId,title,body", "?,?,?");
        const result =  await executeQuery(queryPost, [postItem.userId,postItem.title,postItem.body]);
        return result;

    }

    async deletePost(id){
        const queryPost = deleteQuery('posts', 'id');
        const result = await executeQuery(queryPost, [id]);
        return result;
    }

    async updatePost(postItem, id){
        const queryPost = updateQuery('posts', 'id', postsColumns);
        const result =  await executeQuery(queryPost, [postItem.userId,postItem.title,postItem.body,id]);
        return result;
    }

    async getPostsComments(id){
        const queryPost = getByIdQuery('comments', 'id');
        const result =  await executeQuery(queryPost, [id]);
        return result;
    }
    
}
const postsColumns = "userId = ?, title = ?, body = ?";



