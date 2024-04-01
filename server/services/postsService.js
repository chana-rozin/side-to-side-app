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
        const queryPost = createQuery('posts', postColomns, stringPostItem);
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
        const queryPost = updateQuery('posts', 'id', postColomns, stringPostItem);
        const result =  await executeQuery(queryPost, [id]);
        return result;
    }

    
}
const postColomns = 'userId, title, body';
function postToString(post){
    const stringPost = `${post.userId}, ${post.title}, ${post.body}`;
    return stringPost;

}
