import express from "express";
import { UsersController } from '../controllers/userscontroller.js';
import { validateUserData,validate  } from "../middleware/validationMiddleware.js";
import { validationResult } from "express-validator";
import { authorizeUser } from "../middleware/authorizationMiddleware.js";
const usersRouter = express.Router();

const userscontroller = new UsersController();

usersRouter.get("/:id", userscontroller.getUserById);
usersRouter.get("/", userscontroller.getUsers);
usersRouter.post("/",validateUserData,(req, res, next)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });
    next();}, userscontroller.addUser);

usersRouter.delete("/:id",async (req,res,next)=>{
    const data = await userscontroller.getUserById(req, res, next)
    authorizeUser(data[0].id,req.user.id,res,next);
    console.log("finish authorize");
    next();
}, userscontroller.deleteUser);
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