import { UsersService } from '../services/usersService.js'
const usersService = new UsersService();
export class UsersController {

    async getUsers(req, res, next) {
        try {
            const resultItems = await usersService.getUsers()
            return res.status(200).json(resultItems);
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }

    async getUserById(req, res, next) {
        try {
            
            const resultItem = await usersService.getUserById(req.params.id);
            res.status(200).json({ status: 200, data: resultItem });
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }


    async addUser(req, res, next) {
        try {
            const result = await usersService.addUser(req.body);
            res.status(201).json({insertId: result.insertId});
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }


    async deleteUser(req, res, next) {
        try {
            console.log("users");
            console.log(req.params.id);
            await usersService.deleteUser(req.body, req.params.id);
            res.status(204);
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }

    async updateUser(req, res, next) {
        try {
            console.log("users");
            console.log(req.params.id);
            console.log(req.body);
            await usersService.updateUser(req.body, req.params.id);
            res.status(204).json().send();
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }

    async getUsersAlbums(req, res, next){
        try {

            const resultItems = await usersService.getUsersAlbums(req.params.id)
            return res.status(200).json(resultItems);
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }

    async getUsersPosts(req, res, next){
        try {

            const resultItems = await usersService.getUsersPosts(req.params.id)
            return res.status(200).json(resultItems);
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }

    async getUsersTodos(req, res, next){
        try {

            const resultItems = await usersService.getUsersTodos(req.params.id)
            return res.status(200).json(resultItems);
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }




}