import { PostsService } from '../services/postsService.js'

const postsService = new PostsService();

export class PostsController {

    async getPosts(req, res, next) {
        try {
            const resultItems = await postsService.getPosts(req.query)
                return res.status(200).json(resultItems);
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }

    async getPostById(req, res, next) {
        try {
            const resultItem = await postsService.getPostById(req.params.id);
                res.status(200).json(resultItem);
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }


    async addPost(req, res, next) {
        try {
            const result = await postsService.addPost(req.body);
                res.status(201).json({insertId: result.insertId});
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }


    async deletePost(req, res, next) {
        try {
            console.log("posts");
            console.log(req.params.id);
            const response = await postsService.deletePost(req.params.id);
                res.status(response.affectedRows?204:404).send();
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }

    async updatePost(req, res, next) {
        try {
            console.log("posts");
            console.log(req.params.id);
            console.log(req.body);
            const response = await postsService.updatePost(req.body, req.params.id);
                res.status(response.affectedRows?204:404).send();
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }

    async getPostsComments(req, res, next){
        try {
            const resultItems = await postsService.getPostsComments(req.params.id)
                return res.status(200).json(resultItems);
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }

    

}