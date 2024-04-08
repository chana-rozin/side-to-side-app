import { executeQuery } from './executeQuery.js';
import {getByIdQuery, getQuery, deleteQuery, updateQuery, createQuery, softDeleteQuery } from './query.js'

export class RegisterService {

    async getUsers(queryParams) {
        const queryUser = getQuery('users',queryParams, true);
        const result = await executeQuery(queryUser.query, queryUser.params);
        return result;
    }

    async addUser(userItem) {
        const queryUser = createQuery('users', "name, username, email, address, phone", "?,?,?,?,?");
        const queryAccess = createQuery('access', "username, psw", "?,?");
        const userResult =  await executeQuery(queryUser, [userItem.name, userItem.username, userItem.email, userItem.address, userItem.phone]);
        const accessResult =  await executeQuery(queryAccess, [userItem.username, userItem.psw]);
        return {userResult, accessResult};

    }
    
}


const usersColumns = "name =?, userName =?, email=?, address=?, phone=?"

