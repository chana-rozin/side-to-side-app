import express from "express";
import { usersController } from '../controllers/usersController.js';
const usersRouter = express.Router();

const userscontroller = new UsersController();

usersRouter.get("/:id", userscontroller.getUsersById);
usersRouter.get("/", userscontroller.getUsers);
usersRouter.post("/", userscontroller.addUsers);
usersRouter.delete("/:id", userscontroller.deleteUsers);
usersRouter.put("/:id", userscontroller.updateUsers);
usersRouter.get("/:id/todos", userscontroller.getUsersTodos);
usersRouter.get("/:id/posts", userscontroller.getUsersPosts);
usersRouter.get("/:id/albums", userscontroller.getUsersAlbums);


export {
    usersRouter
}