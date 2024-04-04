import { executeQuery } from './executeQuery.js';
import {getByIdQuery, getQuery, deleteQuery, updateQuery, createQuery } from './query.js'

export class PostsService {

    async getPosts(queryParams, activeUserId) {
        const queryPost = getQuery('posts', queryParams);
        const result = await executeQuery(queryPost.query, queryPost.params, activeUserId);
        return result;
    }

    async getPostById(id, activeUserId) {
        const queryPost = getByIdQuery('posts', 'id');
        const result =  await executeQuery(queryPost, [id], activeUserId);
        return result;
    }

    async addPost(postItem, activeUserId) {
        const queryPost = createQuery('posts', "userId,title,body", "?,?,?");
        const result =  await executeQuery(queryPost, [postItem.userId,postItem.title,postItem.body], activeUserId);
        return result;

    }

    async deletePost(id, activeUserId){
        const queryPost = deleteQuery('posts', 'id');
        await executeQuery(queryPost, [id], activeUserId);
        const queryComments = deleteQuery('posts', 'id');
        const result = await executeQuery(queryComments, [id], activeUserId);
        return result;
    }

    async updatePost(postItem, id, activeUserId){
        const queryPost = updateQuery('posts', 'id', postsColumns);
        const result =  await executeQuery(queryPost, [postItem.userId,postItem.title,postItem.body,id], activeUserId);
        return result;
    }

    async getPostsComments(id, activeUserId){
        const queryPost = getByIdQuery('comments', 'id');
        const result =  await executeQuery(queryPost, [id], activeUserId);
        return result;
    }
    
}
const postsColumns = "userId = ?, title = ?, body = ?";



