//@ts-nocheck
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ImageApiService } from '@data/api/file-service/services/image-api.service';
import { ImageRequest } from '@data/api/file-service/models/image-request';

@Injectable({
	providedIn: 'root',
})
export class ImageService {
	constructor(private _imageService: ImageApiService) {}

	public addNewImage(body: ImageRequest): Observable<string> {
		return this._imageService.addNewImage({ body });
	}
}
