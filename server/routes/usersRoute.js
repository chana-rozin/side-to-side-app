import express from "express";
import { usersController } from '../controllers/usersController.js'
const usersRouter = express.Router();

const userscontroller = new usersController()

usersRouter.get("/:id", userscontroller.getUsersById)
usersRouter.get("/", userscontroller.getUsers)
usersRouter.post("/", userscontroller.addUsers)
usersRouter.delete("/:id", userscontroller.deleteUsers)
usersRouter.put("/:id", userscontroller.updateUsers)

export {
    usersRouter
}