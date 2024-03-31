
import { executeQuery } from './db.js';
import { getTetsQuery ,getTetsByIdQuery} from './queryComments.js'

export class CommentsService {

    async getComments() {
        const queryComments = getTetsQuery();
        const result = await executeQuery(queryComments);
        return result;
    }

    async getCommentById(id) {
        const queryComment = getTetsByIdQuery();
        const result =  await executeQuery(queryComment, [id]);
        return result;
    }

    async addComment(CommentItem) {
        // call db add item

    }
}