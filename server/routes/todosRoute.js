import express from "express";
import { TodosController } from '../controllers/todosController.js';
import { validateTodoData, validate } from "../middleware/validationMiddleware.js";

const todosRouter = express.Router();

const todoscontroller = new TodosController();

todosRouter.get("/:id", todoscontroller.getTodoById);
todosRouter.get("/", todoscontroller.getTodos);
todosRouter.post("/",validate(validateTodoData), todoscontroller.addTodo);
todosRouter.delete("/:id", todoscontroller.deleteTodo);
todosRouter.put("/:id",validate(validateTodoData), todoscontroller.updateTodo);


export default
    todosRouter
