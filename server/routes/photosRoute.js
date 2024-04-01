
import express from "express";
import { PhotosController } from '../controllers/photosController.js'
const photosRouter = express.Router();

const photoscontroller = new PhotosController()

photosRouter.get("/:id", photoscontroller.getPhotoById)
photosRouter.get("/", photoscontroller.getPhotos)
photosRouter.post("/", photoscontroller.addPhoto)
photosRouter.delete("/:id", photoscontroller.deletePhoto)
photosRouter.put("/:id", photoscontroller.updatePhoto)

export default
    photosRouter