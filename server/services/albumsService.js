
import { executeQuery } from './executeQuery.js';
import {getByIdQuery, getQuery, deleteQuery, updateQuery, createQuery } from './query.js'


export class AlbumsService {

    async getAlbums() {
        const queryAlbum = getQuery("albums");
        console.log(queryAlbum)
        const result = await executeQuery(queryAlbum);
        return result;
    }

    async getAlbumById(id) {
        const queryAlbum = getByIdQuery("albums", "id");
        const result =  await executeQuery(queryAlbum, [id]);
        return result;
    }

    async getAlbumsPhotos(id) {
        const queryAlbum = getByIdQuery("photos", "albumId");
        const result =  await executeQuery(queryAlbum, [id]);
        return result;
    }

    async addAlbum(albumItem) {
        const columns = "userId, title";
        const values = "?,?";
        const queryAlbum = createQuery("albums", columns, values);
        const result =  await executeQuery(queryAlbum, [albumItem.userId,albumItem.title]);
        return result;
    }

    async updateAlbum(AlbumItem, id) {
        const columns = `userId = ?, title = ?`;
        const queryAlbum = updateQuery("albums","id", columns);
        const result =  await executeQuery(queryAlbum,[AlbumItem.userId,AlbumItem.title, id]);
        return result;
    }

    async deleteAlbum(id) {
        const queryAlbum = deleteQuery("albums", "id");
        await executeQuery(queryAlbum, [id]);
        const queryPhotos = deleteQuery("photos", "albumId");
        const result = await executeQuery(queryPhotos, [id]);
        return result;
    }

}
