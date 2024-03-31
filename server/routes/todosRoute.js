import express from "express";
import { todosController } from '../controllers/todosController.js';
const todosRouter = express.Router();

const todoscontroller = new TodosController();

todosRouter.get("/:id", todoscontroller.getTodosById);
todosRouter.get("/", todoscontroller.getTodos);
todosRouter.post("/", todoscontroller.addTodos);
todosRouter.delete("/:id", todoscontroller.deleteTodos);
todosRouter.put("/:id", todoscontroller.updateTodos);


export {
    todosRouter
}