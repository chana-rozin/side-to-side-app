
import express from "express";
import { CommentsController } from '../controllers/commentsController.js'
import { validateCommentData, validate } from "../middleware/validationMiddleware.js";

const commentsRouter = express.Router();

const commentscontroller = new CommentsController()

commentsRouter.get("/:id", commentscontroller.getCommentById)
commentsRouter.get("/", commentscontroller.getComment)
commentsRouter.post("/",validate(validateCommentData), commentscontroller.addComment)
commentsRouter.delete("/:id", commentscontroller.deleteComment)
commentsRouter.put("/:id",validate(validateCommentData), commentscontroller.updateComment)

export default
    commentsRouter
