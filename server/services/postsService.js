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
        stringPostItem = postToString(postItem);
        const queryPost = createQuery('posts', stringPostItem);
        const result =  await executeQuery(queryPost);
        return result;

    }

    async deletePost(id){
        const queryPost = deleteQuery('posts', 'id');
        const result = await executeQuery(queryPost, [id]);
        return result;
    }

    async updatePost(postItem){
        stringPostItem = postToString(postItem);
        const queryPost = updateQuery('posts', 'id', stringPostItem);
        const result =  await executeQuery(queryPost, [id]);
        return result;
    }

    async getPostsComments(id){
        const queryPost = getByIdQuery('comments', 'id');
        const result =  await executeQuery(queryPost, [id]);
        return result;
    }
    
}

function postToString(post){
    const stringPost = `userId = ${post.userId}, title = ${post.title}, body = ${post.body}`;
    return stringPost;
}
