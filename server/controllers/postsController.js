import { PostsService } from '../service/postsService.js'
export class PostsController {

    async getPosts(req, res, next) {
        try {

            const postsService = new PostsService();
            const resultItems = await postsService.getPosts()
            return res.status(200).json(resultItems);
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }

    async getPostById(req, res) {
        try {
            const postsService = new PostsService();
            const resultItem = await postsService.getPostById(req.params.id);
            res.status(200).json({ status: 200, data: resultItem });
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }


    async addPost(req, res) {
        try {
            const postsService = new PostsService();
             await postsService.addPost(req.body);
            res.status(200).json({ status: 200 });
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }


    async deletePost(req, res) {
        try {
            console.log("posts");
            console.log(req.params.id);
            res.status(200).json({ status: 200, data: req.params.id });
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }

    async updatePost(req, res) {
        try {
            console.log("posts");
            console.log(req.params.id);
            console.log(req.body);
            res.status(200).json({ status: 200, data: req.params.id });
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

            const postsService = new PostsService();
            const resultItems = await postsService.getPostsComments()
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