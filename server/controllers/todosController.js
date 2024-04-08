import { TodosService } from '../services/todosService.js'
import { authorizeUser } from '../middleware/authorizationMiddleware.js';
const todosService = new TodosService();

export class TodosController {

    async getTodos(req, res, next) {
        try {
            const resultItems = await todosService.getTodos(req.query)
            return res.status(200).json(resultItems);
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }

    async getTodoById(req, res, next) {
        try {
            const resultItem = await todosService.getTodoById(req.params.id);
            authorizeUser(resultItem[0].userId, req.user.id, res);
            res.status(200).json(resultItem);
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }


    async addTodo(req, res, next) {
        try {
            const result = await todosService.addTodo(req.body);
            res.status(201).json({ insertId: result.insertId });
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }


    async deleteTodo(req, res, next) {
        try {
            console.log("todos");
            console.log(req.params.id);
            const todoDetails = await todosService.getTodoById(req.params.id);
            console.log("todo details: ", todoDetails[0]);
            authorizeUser(todoDetails[0].userId, req.user.id, res);
            const response = await todosService.deleteTodo(req.params.id)
            console.log("selete succesfully")
            res.status(response.affectedRows ? 204 : 404).send();
        }
        catch (ex) {
            console.log(ex);
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }

    async updateTodo(req, res, next) {
        try {
            console.log("todos");
            console.log(req.params.id);
            console.log(req.body);
            const response = await todosService.updateTodo(req.body, req.params.id)
            res.status(response.affectedRows ? 204 : 404).json().send();
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }





}