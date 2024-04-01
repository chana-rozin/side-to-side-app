

import { AlbumsService } from '../services/albumsService.js'
export class albumsController {

    async getAlbumsPhotos(req, res, next) {
        try {

            const albumsService = new AlbumsService();
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

            const albumsService = new albumsService();
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

    async getAlbumById(req, res) {
        try {
            const albumsService = new albumsService();
            const resultItem = await albumsService.getAlbumById(req.params.id);
            res.status(200).json({ status: 200, data: resultItem });
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }


    async addAlbum(req, res) {
        try {
            const albumsService = new albumsService();
             await albumsService.addAlbum(req.body);
            res.status(200).json({ status: 200 });
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }


    async deleteAlbum(req, res) {
        try {
            console.log("albums");
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

    async updateAlbum(req, res) {
        try {
            console.log("albums");
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