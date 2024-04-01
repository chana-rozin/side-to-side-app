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

    async updatePost(postItem, id){
        const stringPostItem = "userId = ?, title = ?, body = ?";
        const queryPost = updateQuery('posts', 'id', stringPostItem);
        const result =  await executeQuery(queryPost, [postItem.userId,postItem.title,postItem.body,id]);
        return result;
    }

    async getPostsComments(id){
        const queryPost = getByIdQuery('comments', 'id');
        const result =  await executeQuery(queryPost, [id]);
        return result;
    }
    
}

function postToString(post){
    const stringPost = `${post.userId}, ${post.title}, ${post.body}`;
    return stringPost;
}
