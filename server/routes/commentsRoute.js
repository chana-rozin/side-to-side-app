
import express from "express";
import { CommentsController } from '../controllers/commentsController.js'
import { validateCommentData, validate } from "../middleware/validationMiddleware.js";

const commentsRouter = express.Router();

const commentscontroller = new CommentsController()

commentsRouter.get("/:id", commentscontroller.getCommentById)
commentsRouter.get("/", commentscontroller.getComments)
commentsRouter.post("/",validateCommentData,(req,res,next)=>validate(req,res,next), commentscontroller.addComment)
commentsRouter.delete("/:id", commentscontroller.deleteComment)
commentsRouter.put("/:id",validateCommentData,(req,res,next)=>validate(req,res,next), commentscontroller.updateComment)

export default
    commentsRouter
