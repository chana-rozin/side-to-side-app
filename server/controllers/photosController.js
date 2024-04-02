

import { PhotosService } from '../services/photosService.js'

const photosService = new PhotosService();
export class PhotosController {

    async getPhotos(req, res, next) {
        try {
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
            const resultItem = await photosService.getPhotoById(req.params.id);
            res.status(200).json(resultItem);
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
            const result = await photosService.addPhoto(req.body);
            res.status(201).json({insertId: result.insertId});
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
            await photosService.deletePhoto(req.params.id);
            res.status(204).send();
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
            res.status(200).json(req.body);
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }




}