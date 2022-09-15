import { Injectable } from '@angular/core';
import { UserImageApiService } from '@api/image-service/services/user-image-api.service';

@Injectable({
	providedIn: 'root',
})
export class ImageService {
	constructor(private _imageService: UserImageApiService) {}

	// public addNewImage(body: AddImageRequest): Observable<string> {
	// 	return this._imageService.addImage({ body });
	// }
}
