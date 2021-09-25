import { Injectable } from '@angular/core';
import { ImageProjectApiService } from '@data/api/image-service/services/image-project-api.service';
import { Observable } from 'rxjs';
import { OperationResultResponseImageResponse } from '@data/api/image-service/models/operation-result-response-image-response';

@Injectable({
	providedIn: 'root',
})
export class ImageProjectService {
	constructor(private _imageProjectService: ImageProjectApiService) {}

	public getImageProject(imageId: string): Observable<OperationResultResponseImageResponse> {
		return this._imageProjectService.getImageProject({ imageId });
	}
}
