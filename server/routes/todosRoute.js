import express from "express";
import { TodosController } from '../controllers/todosController.js';
import { validateTodoData, validate } from "../middleware/validationMiddleware.js";
import {authorizeUser} from "../middleware/authorizationMiddleware.js";

const todosRouter = express.Router();

const todoscontroller = new TodosController();


todosRouter.get("/:id", todoscontroller.getTodoById);
todosRouter.get("/", todoscontroller.getTodos);
todosRouter.use((req,res,next)=>authorizeUser(req,res,next,"userId","id"))
todosRouter.post("/",validateTodoData,(req,res,next)=>validate(req,res,next), todoscontroller.addTodo);
todosRouter.delete("/:id", todoscontroller.deleteTodo);
todosRouter.put("/:id",validateTodoData,(req,res,next)=>validate(req,res,next), todoscontroller.updateTodo);


export default
    todosRouter
