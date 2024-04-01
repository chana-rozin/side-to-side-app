

import { PhotosService } from '../services/photosService.js'
export class PhotosController {

    async getPhotos(req, res, next) {
        try {

            const photosService = new PhotosService();
            const resultItems = await photosService.getPhotos()
            return res.status(200).json(resultItems);
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }

    async getPhotoById(req, res) {
        try {
            const photosService = new PhotosService();
            const resultItem = await photosService.getPhotoById(req.params.id);
            res.status(200).json({ status: 200, data: resultItem });
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }


    async addPhoto(req, res) {
        try {
            const photosService = new PhotosService();
             await photosService.addPhoto(req.body);
            res.status(200).json({ status: 200 });
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }


    async deletePhoto(req, res) {
        try {
            console.log("Photo");
            console.log(req.params.id);
            res.status(200).json({ status: 200, data: req.params.id });
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }

    async updatePhoto(req, res) {
        try {
            console.log("Photo");
            console.log(req.params.id);
            console.log(req.body);
            res.status(200).json({ status: 200, data: req.params.id });
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }




}