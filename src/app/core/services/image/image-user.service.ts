import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OperationResultResponseImageResponse } from '@data/api/image-service/models/operation-result-response-image-response';
import { UserImageApiService } from '@data/api/image-service/services/user-image-api.service';

@Injectable({
	providedIn: 'root',
})
export class ImageUserService {
	constructor(private _imageUserService: UserImageApiService) {}

	public getImageUser(imageId: string): Observable<OperationResultResponseImageResponse> {
		return this._imageUserService.getUserImage({ imageId });
	}
}
