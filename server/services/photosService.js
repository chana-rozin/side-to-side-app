
import { executeQuery } from './db.js';
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
        const values = photoToString(photoItem);
        const queryPhoto = createQuery("photos", columns, values);
        const result =  await executeQuery(queryPhoto);
        return result;
    }

    async updatePhoto(photoItem) {
        const columns = `albumId = ${photoItem.albumId} url = ${photoItem.url} title = ${photoItem.title}`;
        const queryPhoto = updateQuery("photos","id", columns);
        const result =  await executeQuery(queryPhoto);
        return result;
    }

    async deletePhoto(id) {
        const queryPhoto = deleteQuery("photos", "id");
        const result =  await executeQuery(queryPhoto, [id]);
        return result;
    }

}

function photoToString(photoItem){
    return `${photoItem.albumId} ${photoItem.url} ${photoItem.title}`
}