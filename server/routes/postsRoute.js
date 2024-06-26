import express from "express";
import { PostsController } from '../controllers/postsController.js';
import { validatePostData, validate } from "../middleware/validationMiddleware.js";
import {authorizeUser} from "../middleware/authorizationMiddleware.js";


const postsRouter = express.Router();

const postscontroller = new PostsController();

postsRouter.get("/:id", postscontroller.getPostById);
postsRouter.get("/", postscontroller.getPosts);
postsRouter.get("/:id/comments", postscontroller.getPostsComments);
postsRouter.delete("/:id", postscontroller.deletePost);
postsRouter.use((req,res,next)=>{authorizeUser(req.body.userId,req.user.id,res); next()})
postsRouter.post("/",validatePostData,(req,res,next)=>validate(req,res,next), postscontroller.addPost);
postsRouter.put("/:id",validatePostData,(req,res,next)=>validate(req,res,next), postscontroller.updatePost);


export default
    postsRouter