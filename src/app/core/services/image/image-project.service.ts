import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OperationResultResponseImageResponse } from '@data/api/image-service/models/operation-result-response-image-response';
import { ProjectImageApiService } from '@data/api/image-service/services/project-image-api.service';

@Injectable({
	providedIn: 'root',
})
export class ImageProjectService {
	constructor(private _imageProjectService: ProjectImageApiService) {}

	public getImageProject(imageId: string): Observable<OperationResultResponseImageResponse> {
		return this._imageProjectService.getProjectImage({ imageId });
	}
}
