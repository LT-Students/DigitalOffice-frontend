import { Injectable } from '@angular/core';
import { OperationResultResponseImageResponse } from '@api/image-service/models/operation-result-response-image-response';
import { Observable } from 'rxjs';
import { MessageImageApiService } from '@api/image-service/services/message-image-api.service';

@Injectable({
	providedIn: 'root',
})
export class ImageMessageService {
	constructor(private _imageMessageService: MessageImageApiService) {}

	public getImageMessage(imageId: string): Observable<OperationResultResponseImageResponse> {
		return this._imageMessageService.getMessageImage({ imageId });
	}
}
