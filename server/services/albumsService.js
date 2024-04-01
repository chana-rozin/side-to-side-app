
import { executeQuery } from './db.js';
import {getByIdQuery, getQuery, deleteQuery, updateQuery, createQuery } from './query.js'

export class AlbumsService {

    async getAlbums() {
        const queryAlbum = getQuery("albums");
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

    async addAlbum(AlbumItem) {
        const columns = "userId title";
        const values = albumToString(AlbumItem);
        const queryAlbum = createQuery("albums", columns, values);
        const result =  await executeQuery(queryAlbum);
        return result;
    }

    async updateAlbum(AlbumItem) {
        const columns = `userId = ${AlbumItem.userId} title = ${AlbumItem.title}`;
        const queryAlbum = updateQuery("albums","id", columns);
        const result =  await executeQuery(queryAlbum);
        return result;
    }

    async deleteAlbum(id) {
        const queryAlbum = deleteQuery("albums", "id");
        const result =  await executeQuery(queryAlbum, [id]);
        return result;
    }

}

function albumToString(AlbumItem){
    return `${AlbumItem.userId} ${AlbumItem.title}`
}