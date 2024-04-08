import express from "express";
import { RegisterController } from '../controllers/registerController.js'
const registerRouter = express.Router();

const registerController = new RegisterController()

registerRouter.post("/", registerController.register)
registerRouter.get("/exist", registerController.existUser)


 export default registerRouter;