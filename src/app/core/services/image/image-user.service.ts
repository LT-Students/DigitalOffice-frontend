import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OperationResultResponseImageResponse } from '@api/image-service/models/operation-result-response-image-response';
import { ImageApiService } from '@api/image-service/services/image-api.service';

@Injectable({
	providedIn: 'root',
})
export class ImageUserService {
	constructor(private imageService: ImageApiService) {}

	public getImageUser(imageId: string): Observable<OperationResultResponseImageResponse> {
		return this.imageService.getImage({ imageId, source: 'User' });
	}
}
