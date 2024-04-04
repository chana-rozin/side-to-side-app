import { executeQuery } from './db.js';
import {getByIdQuery, getQuery, deleteQuery, updateQuery, createQuery } from './query.js'

export class TodosService {

    async getTodos(searchParams, activeUserId) {
        const queryTodo = getQuery('todos', searchParams);
        const result = await executeQuery(queryTodo.query, queryTodo.params, activeUserId);
        return result;
    }

    async getTodoById(id, activeUserId) {
        const queryTodo = getByIdQuery('todos', 'id');
        const result =  await executeQuery(queryTodo, [id], activeUserId);
        return result;
    }

    async addTodo(todoItem, activeUserId) {
        const queryTodo = createQuery('todos', "userId,title,completed", "?,?,?");
        const result =  await executeQuery(queryTodo, [todoItem.userId,todoItem.title,todoItem.completed], activeUserId);
        return result;

    }

    async deleteTodo(id, activeUserId){
        const queryTodo = deleteQuery('todos', 'id');
        const result = await executeQuery(queryTodo, [id], activeUserId);
        return result;
    }

    async updateTodo(todoItem, id, activeUserId){
        const queryTodo = updateQuery('todos', 'id',  tososColumns);
        const result =  await executeQuery(queryTodo, [todoItem.userId,todoItem.title,todoItem.completed,id], activeUserId);
        return result;
    }

    
}

const tososColumns = `userId=?, title=?, completed=?`;
