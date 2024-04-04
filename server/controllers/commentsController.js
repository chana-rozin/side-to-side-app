

import { CommentsService } from '../services/commentsService.js'

const commentsService = new CommentsService();
export class CommentsController {

    async getComments(req, res, next) {
        try {

            const resultItems = await commentsService.getComments(req.query, req.user.userId)
            return res.status(200).json(resultItems);
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }

    async getCommentById(req, res, next) {
        try {
            const resultItem = await commentsService.getCommentById(req.params.id, req.user.userId);
            res.status(200).json(resultItem);
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }


    async addComment(req, res, next) {
        try {
            const result =  await commentsService.addComment(req.body, req.user.userId);
            res.status(201).json({insertId: result.insertId});
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }


    async deleteComment(req, res, next) {
        try {
            console.log("comments");
            console.log(req.params.id);
            await commentsService.deleteComment(req.params.id, req.user.userId)
            res.status(204).send();
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }

    async updateComment(req, res, next) {
        try {
            console.log("comments");
            console.log(req.params.id);
            console.log(req.body);
            await commentsService.updateComment(req.body, req.params.id, req.user.userId)
            console.log("update successfuly")
            res.status(204).send();
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }




}