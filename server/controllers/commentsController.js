

import { CommentsService } from '../services/commentsService.js'

const commentsService = new CommentsService();
export class CommentsController {

    async getComments(req, res, next) {
        try {

            const resultItems = await commentsService.getComments(req.query)
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


    async addComment(req, res, next) {
        try {
            const result =  await commentsService.addComment(req.body);
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
            const commentsDetails = await commentsService.getCommentById(req.params.id);
            authorizeUser(commentsDetails[0].email, req.user.email, res);
            const response = await commentsService.deleteComment(req.params.id);
                res.status(response.affectedRows?204:404).send();
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
            await commentsService.updateComment(req.body, req.params.id);
            const response = console.log("update successfuly");
                res.status(response.affectedRows?204:404).send();
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }




}