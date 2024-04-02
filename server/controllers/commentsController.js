

import { CommentsService } from '../services/commentsService.js'
export class CommentsController {

    async getComments(req, res, next) {
        try {

            const commentsService = new CommentsService();
            const resultItems = await commentsService.getComments()
            return res.status(200).json(resultItems);
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }

    async getCommentById(req, res) {
        try {
            const commentsService = new CommentsService();
            const resultItem = await commentsService.getCommentById(req.params.id);
            res.status(200).json(resultItem);
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }


    async addComment(req, res) {
        try {
            const commentsService = new CommentsService();
             await commentsService.addComment(req.body);
            res.status(201).json(req.body);
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }


    async deleteComment(req, res) {
        try {
            console.log("comments");
            console.log(req.params.id);
            await commentsService.deleteComment(req.params.id)
            res.status(204).send();
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }

    async updateComment(req, res) {
        try {
            console.log("comments");
            console.log(req.params.id);
            console.log(req.body);
            await CommentsService.updateComment(req.body, req.params.id)
            res.status(200).json(req.body);
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }




}