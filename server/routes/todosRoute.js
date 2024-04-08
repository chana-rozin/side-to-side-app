import express from "express";
import { TodosController } from '../controllers/todosController.js';
import { validateTodoData, validate } from "../middleware/validationMiddleware.js";
import {authorizeUser} from "../middleware/authorizationMiddleware.js";

const todosRouter = express.Router();

const todoscontroller = new TodosController();


todosRouter.get("/", todoscontroller.getTodos);
todosRouter.get("/:id", todoscontroller.getTodoById);
todosRouter.delete("/:id", todoscontroller.deleteTodo);
todosRouter.use((req,res,next)=>{authorizeUser(req.body.userId,req.user.id,res); next()})
todosRouter.post("/",validateTodoData,(req,res,next)=>validate(req,res,next), todoscontroller.addTodo);
todosRouter.put("/:id",validateTodoData,(req,res,next)=>validate(req,res,next), todoscontroller.updateTodo);


export default
    todosRouter
