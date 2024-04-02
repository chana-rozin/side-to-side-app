import express from "express";
import { UsersController } from '../controllers/userscontroller.js';
import { validateUserData,validate  } from "../middleware/validationMiddleware.js";
import { validationResult } from "express-validator";
const usersRouter = express.Router();

const userscontroller = new UsersController();

usersRouter.get("/:id", userscontroller.getUserById);
usersRouter.get("/", userscontroller.getUsers);
usersRouter.post("/",validateUserData,(req, res, next)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();}, userscontroller.addUser);
usersRouter.delete("/:id", userscontroller.deleteUser);
usersRouter.put("/:id",validateUserData,(req, res, next)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();}, userscontroller.updateUser);
usersRouter.get("/:id/todos", userscontroller.getUsersTodos);
usersRouter.get("/:id/posts", userscontroller.getUsersPosts);
usersRouter.get("/:id/albums", userscontroller.getUsersAlbums);


export default
    usersRouter