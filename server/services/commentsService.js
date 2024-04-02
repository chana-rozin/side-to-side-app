
import { executeQuery } from './db.js';
import {getByIdQuery, getQuery, deleteQuery, updateQuery, createQuery } from './query.js'

export class CommentsService {

    async getComments() {
        const queryComment = getQuery("comments");
        const result = await executeQuery(queryComment);
        return result;
    }

    async getCommentById(id) {
        const queryComment = getByIdQuery("comments", "id");
        const result =  await executeQuery(queryComment, [id]);
        return result;
    }

    async addComment(commentItem) {
        const columns = "postId, name, email, body";
        const values = "?,?,?,?";
        const queryComment = createQuery("comments", columns, values);
        const result =  await executeQuery(queryComment, [commentItem.postId,commentItem.name,commentItem.email,commentItem.body]);
        return result;
    }

    async updateComment(commentItem, id) {
        const columns = `postId = ?, name = ?, email = ?, body = ?`;
        const queryComment = updateQuery("comments","postId", columns);
        const result =  await executeQuery(queryComment, [commentItem.postId,commentItem.name,commentItem.email,commentItem.body, id]);
        return result;
    }

    async deleteComment(id) {
        const queryComment = deleteQuery("comments", "id");
        const result =  await executeQuery(queryComment, [id]);
        return result;
    }

}

