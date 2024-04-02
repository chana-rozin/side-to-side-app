import express from "express";
import { LoginController } from '../controllers/albumsController.js'
const loginRouter = express.Router();

const loginController = new LoginController()

loginRouter.post("/", loginController.login)

 export default loginRouter;