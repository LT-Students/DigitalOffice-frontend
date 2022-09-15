import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OperationResultResponseImageResponse } from '@api/image-service/models/operation-result-response-image-response';
import { OperationResultResponseCreateImageNewsResponse } from '@api/image-service/models/operation-result-response-create-image-news-response';
import { CreateImageRequest } from '@api/image-service/models/create-image-request';
import { NewsImageApiService } from '@api/image-service/services/news-image-api.service';
import { ImageApiService } from '@api/image-service/services/image-api.service';

@Injectable({
	providedIn: 'root',
})
export class ImageNewsService {
	constructor(private imageNewsService: NewsImageApiService, private imageService: ImageApiService) {}

	public getImageNews(imageId: string): Observable<OperationResultResponseImageResponse> {
		return this.imageService.getImage({ imageId, source: 'News' });
	}

	public createImageNews(image: CreateImageRequest): Observable<OperationResultResponseCreateImageNewsResponse> {
		return this.imageNewsService.createNewsImage({ body: image });
	}
}
