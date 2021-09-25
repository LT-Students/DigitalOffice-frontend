import { Injectable } from '@angular/core';
import { ImageUserApiService } from '@data/api/image-service/services/image-user-api.service';
import { Observable } from 'rxjs';
import { OperationResultResponseImageResponse } from '@data/api/image-service/models/operation-result-response-image-response';

@Injectable({
	providedIn: 'root',
})
export class ImageUserService {
	constructor(private _imageUserService: ImageUserApiService) {}

	public getImageUser(imageId: string): Observable<OperationResultResponseImageResponse> {
		return this._imageUserService.getImageUser({ imageId });
	}
}
