
import { executeQuery } from './db.js';
import { getTetsQuery ,getTetsByIdQuery} from './queryAlbums.js'

export class AlbumsService {

    async getAlbums() {
        const queryAlbum = getTetsQuery();
        const result = await executeQuery(queryAlbum);
        return result;
    }

    async getAlbumById(id) {
        const queryAlbum = getTetsByIdQuery();
        const result =  await executeQuery(queryAlbum, [id]);
        return result;
    }

    async addAlbum(AlbumItem) {
        // call db add item

    }
}