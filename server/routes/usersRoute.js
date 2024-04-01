import express from "express";
import { UsersController } from '../controllers/usersController.js';
const usersRouter = express.Router();

const userscontroller = new UsersController();

usersRouter.get("/:id", userscontroller.getUserById);
usersRouter.get("/", userscontroller.getUsers);
usersRouter.post("/", userscontroller.addUser);
usersRouter.delete("/:id", userscontroller.deleteUser);
usersRouter.put("/:id", userscontroller.updateUser);
usersRouter.get("/:id/todos", userscontroller.getUsersTodos);
usersRouter.get("/:id/posts", userscontroller.getUsersPosts);
usersRouter.get("/:id/albums", userscontroller.getUsersAlbums);


export default
    usersRouter