import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ImageApiService } from '@data/api/file-service/services/image-api.service';
import { AddImageRequest } from '@data/api/file-service/models/add-image-request';

@Injectable({
	providedIn: 'root',
})
export class ImageService {
	constructor(private _imageService: ImageApiService) {}

	public addNewImage(body: AddImageRequest): Observable<string> {
		return this._imageService.addImage({ body });
	}
}
