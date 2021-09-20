import { Injectable } from '@angular/core';
import { ImageNewsApiService } from '@data/api/image-service/services/image-news-api.service';
import { Observable } from 'rxjs';
import { OperationResultResponseImageResponse } from '@data/api/image-service/models/operation-result-response-image-response';
import { OperationResultResponseCreateImageNewsResponse } from '@data/api/image-service/models/operation-result-response-create-image-news-response';
import { CreateImageRequest } from '@data/api/image-service/models/create-image-request';

@Injectable({
	providedIn: 'root',
})
export class ImageNewsService {
	constructor(private _imageNewsService: ImageNewsApiService) {}

	public getImageNews(imageId: string): Observable<OperationResultResponseImageResponse> {
		return this._imageNewsService.getImageNews({ imageId });
	}

	public createImageNews(image: CreateImageRequest): Observable<OperationResultResponseCreateImageNewsResponse> {
		return this._imageNewsService.createImageNews({ body: image });
	}
}
