
import express from "express";
import { CommentsController } from '../controllers/commentsController.js'
const commentsRouter = express.Router();

const commentscontroller = new CommentsController()

commentsRouter.get("/:id", commentscontroller.getCommentById)
commentsRouter.get("/", commentscontroller.getComment)
commentsRouter.post("/", commentscontroller.addComment)
commentsRouter.delete("/:id", commentscontroller.deleteComment)
commentsRouter.put("/:id", commentscontroller.updateComment)

export default
    commentsRouter
