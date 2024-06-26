

import { AlbumsService } from '../services/albumsService.js'
const albumsService = new AlbumsService();
export class AlbumsController {

    async getAlbumsPhotos(req, res, next) {
        try {
            const resultItems = await albumsService.getAlbumsPhotos(req.params.id)
            return res.status(200).json(resultItems);
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }

    async getAlbums(req, res, next) {
        try {
            console.log("get albums controller")
            const resultItems = await albumsService.getAlbums()
            return res.status(200).json(resultItems);
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }

    async getAlbumById(req, res, next) {
        try {
            const resultItem = await albumsService.getAlbumById(req.params.id);
            res.status(200).json(resultItem);
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }


    async addAlbum(req, res, next) {
        try {
        const result = await albumsService.addAlbum(req.body);
            res.status(201).json({insertId: result.insertId});
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }


    async deleteAlbum(req, res, next) {
        try {
            console.log("albums");
            console.log(req.params.id);
            await albumsService.deleteAlbum(req.params.id)
            res.status(204).send();
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }

    async updateAlbum(req, res, next) {
        try {
            console.log("albums");
            console.log(req.params.id);
            console.log(req.body);
            await albumsService.updateAlbum(req.body, req.params.id);
            res.status(204).send();
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }




}