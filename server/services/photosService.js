
import { executeQuery } from './executeQuery.js';
import {getByIdQuery, getQuery, deleteQuery, updateQuery, createQuery } from './query.js'

export class PhotosService {

    async getPhotos() {
        const queryPhoto = getQuery("photos");
        const result = await executeQuery(queryPhoto);
        return result;
    }

    async getPhotoById(id) {
        const queryPhoto = getByIdQuery("photos", "id");
        const result =  await executeQuery(queryPhoto, [id]);
        return result;
    }

    async addPhoto(photoItem) {
        const columns = "albumId url title";
        const values = "?,?,?";
        const queryPhoto = createQuery("photos", columns, values);
        const result =  await executeQuery(queryPhoto, [photoItem.albumId,photoItem.url,photoItem.title]);
        return result;
    }

    async updatePhoto(photoItem, id) {
        const columns = `albumId = ? url = ? title = ?`;
        const queryPhoto = updateQuery("photos","id", columns);
        const result =  await executeQuery(queryPhoto,[photoItem.albumId,photoItem.url,photoItem.title, id]);
        return result;
    }

    async deletePhoto(id) {
        const queryPhoto = deleteQuery("photos", "id");
        const result =  await executeQuery(queryPhoto, [id]);
        return result;
    }

}

