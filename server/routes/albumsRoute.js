
import express from "express";
import { AlbumsController } from '../controllers/albumsController.js'
const albumsRouter = express.Router();

const albumscontroller = new AlbumsController()

albumsRouter.get("/:id/photos", albumscontroller.getAlbumsPhotos)
albumsRouter.get("/:id", albumscontroller.getAlbumById)
albumsRouter.get("/", albumscontroller.getAlbum)
albumsRouter.post("/", albumscontroller.addAlbum)
albumsRouter.delete("/:id", albumscontroller.deleteAlbum)
albumsRouter.put("/:id", albumscontroller.updateAlbum)

export {
    albumsRouter
}