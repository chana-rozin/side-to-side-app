import { executeQuery } from './db.js';
import {getByIdQuery, getQuery, deleteQuery, updateQuery, createQuery } from './query.js'

export class TodosService {

    async getTodos() {
        const queryTodo = getQuery('todos');
        const result = await executeQuery(queryTodo);
        return result;
    }

    async getTodoById(id) {
        const queryTodo = getByIdQuery('todos', 'id');
        const result =  await executeQuery(queryTodo, [id]);
        return result;
    }

    async addTodo(todoItem) {
        const queryTodo = createQuery('todos', "userId,title,completed", "?,?,?,?");
        const result =  await executeQuery(queryTodo, [todoItem.userId,todoItem.title,todoItem.completed]);
        return result;

    }

    async deleteTodo(id){
        const queryTodo = deleteQuery('todos', 'id');
        const result = await executeQuery(queryTodo, [id]);
        return result;
    }

    async updateTodo(todoItem, id){
        const queryTodo = updateQuery('todos', 'id',  tososColumns);
        const result =  await executeQuery(queryTodo, [todoItem.userId,todoItem.title,todoItem.completed,id]);
        return result;
    }

    
}

const tososColumns = `userId=?, title=?, completed=?`;
