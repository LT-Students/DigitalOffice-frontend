import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OperationResultResponseImageResponse } from '@api/image-service/models/operation-result-response-image-response';
import { OperationResultResponseCreateImageNewsResponse } from '@api/image-service/models/operation-result-response-create-image-news-response';
import { CreateImageRequest } from '@api/image-service/models/create-image-request';
import { NewsImageApiService } from '@api/image-service/services/news-image-api.service';

@Injectable({
	providedIn: 'root',
})
export class ImageNewsService {
	constructor(private _imageNewsService: NewsImageApiService) {}

	public getImageNews(imageId: string): Observable<OperationResultResponseImageResponse> {
		return this._imageNewsService.getNewsImage({ imageId });
	}

	public createImageNews(image: CreateImageRequest): Observable<OperationResultResponseCreateImageNewsResponse> {
		return this._imageNewsService.createNewsImage({ body: image });
	}
}
