import express from "express";
import { postsController } from '../controllers/postsController.js';
import { commentsController } from '../controllers/commentsController.js';

const postsRouter = express.Router();

const postscontroller = new PostsController();

postsRouter.get("/:id", postscontroller.getPostsById);
postsRouter.get("/", postscontroller.getPosts);
postsRouter.post("/", postscontroller.addPosts);
postsRouter.delete("/:id", postscontroller.deletePosts);
postsRouter.put("/:id", postscontroller.updatePosts);
postsRouter.get("/:id/comments", postscontroller.getAlbumsPosts);


export {
    postsRouter
}