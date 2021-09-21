import { Injectable } from '@angular/core';
import { ImagemessageApiService } from '@data/api/image-service/services/imagemessage-api.service';
import { OperationResultResponseImageResponse } from '@data/api/image-service/models/operation-result-response-image-response';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class ImageMessageService {
	constructor(private _imageMessageService: ImagemessageApiService) {}

	public getImageMessage(imageId: string): Observable<OperationResultResponseImageResponse> {
		return this._imageMessageService.getImageMessage({ imageId });
	}
}
