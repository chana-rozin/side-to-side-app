import express from "express";
import { PostsController } from '../controllers/postsController.js';
import { validatePostData, validate } from "../middleware/validationMiddleware.js";


const postsRouter = express.Router();

const postscontroller = new PostsController();

postsRouter.get("/:id", postscontroller.getPostById);
postsRouter.get("/", postscontroller.getPosts);
postsRouter.post("/",validatePostData,(req,res,next)=>validate(req,res,next), postscontroller.addPost);
postsRouter.delete("/:id", postscontroller.deletePost);
postsRouter.put("/:id",validatePostData,(req,res,next)=>validate(req,res,next), postscontroller.updatePost);
postsRouter.get("/:id/comments", postscontroller.getPostsComments);

export default
    postsRouter