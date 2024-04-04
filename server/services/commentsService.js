
import { executeQuery } from './executeQuery.js';
import {getByIdQuery, getQuery, deleteQuery, updateQuery, createQuery } from './query.js'

export class CommentsService {

    async getComments(searchParams, activeUserId) {
        const queryComment = getQuery("comments", searchParams);
        const result = await executeQuery(queryComment.query, queryComment.params, activeUserId);
        return result;
    }

    async getCommentById(id, activeUserId) {
        const queryComment = getByIdQuery("comments", "id");
        const result =  await executeQuery(queryComment, [id], activeUserId);
        return result;
    }

    async addComment(commentItem, activeUserId) {
        const columns = "postId, name, email, body";
        const values = "?,?,?,?";
        const queryComment = createQuery("comments", columns, values);
        const result =  await executeQuery(queryComment, [commentItem.postId,commentItem.name,commentItem.email,commentItem.body], activeUserId);
        return result;
    }

    async updateComment(commentItem, id, activeUserId) {
        const columns = `postId = ?, name = ?, email = ?, body = ?`;
        const queryComment = updateQuery("comments","postId", columns);
        const result =  await executeQuery(queryComment, [commentItem.postId,commentItem.name,commentItem.email,commentItem.body, id], activeUserId);
        return result;
    }

    async deleteComment(id, activeUserId) {
        const queryComment = deleteQuery("comments", "id");
        const result =  await executeQuery(queryComment, [id], activeUserId);
        return result;
    }

}

