
import { executeQuery } from './db.js';
import { getTetsQuery ,getTetsByIdQuery} from './queryPhotos.js'

export class PhotosService {

    async getPhotos() {
        const queryPhotos = getTetsQuery();
        const result = await executeQuery(queryPhotos);
        return result;
    }

    async getPhotoById(id) {
        const queryPhoto = getTetsByIdQuery();
        const result =  await executeQuery(queryPhoto, [id]);
        return result;
    }

    async addPhoto(PhotoItem) {
        // call db add item

    }
}