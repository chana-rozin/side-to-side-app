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
        stringTodoItem = todoToString(todoItem);
        const queryTodo = createQuery('todos', stringTodoItem);
        const result =  await executeQuery(queryTodo);
        return result;

    }

    async deleteTodo(id){
        const queryTodo = deleteQuery('todos', 'id');
        const result = await executeQuery(queryTodo, [id]);
        return result;
    }

    async updateTodo(todoItem, id){
        const stringTodoItem = todoToString(todoItem)`userId, title, completed`;
        const queryTodo = updateQuery('todos', 'id',  stringTodoItem);
        const result =  await executeQuery(queryTodo, [todoItem.userId,todoItem.title,todoItem.completed,id]);
        return result;
    }

    
}
function todoToString(todo){
    const stringTodo = `${todo.userId}, ${todo.title}, ${todo.completed}`;
    return stringTodo;

}
