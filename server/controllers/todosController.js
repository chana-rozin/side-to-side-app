import { TodosService } from '../services/todosService.js'
const todosService = new TodosService();

export class TodosController {
    
    async getTodos(req, res, next) {
        try {
            const resultItems = await todosService.getTodos()
            return res.status(200).json(resultItems);
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }

    async getTodoById(req, res) {
        try {
            const resultItem = await todosService.getTodoById(req.params.id);
            res.status(200).json({ status: 200, data: resultItem });
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }


    async addTodo(req, res) {
        try {
            const result = await todosService.addTodo(req.body);
            res.status(201).json({insertId: result.insertId});
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }


    async deleteTodo(req, res) {
        try {
            console.log("todos");
            console.log(req.params.id);
            await todosService.deleteTodo(req.body, req.params.id)
            res.status(204);
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }

    async updateTodo(req, res) {
        try {
            console.log("todos");
            console.log(req.params.id);
            console.log(req.body);
            await todosService.updateTodo(req.body, req.params.id)
            res.status(204).json().send();
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }

    



}