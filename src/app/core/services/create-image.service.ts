import { Injectable } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import { CreateImageRequest } from '@api/image-service/models/create-image-request';

@Injectable({
	providedIn: 'root',
})
export class CreateImageService {
	constructor() {}

	/**
	 * @deprecated we should use Image class from image.model.ts. This service soon will be deleted.
	 */
	public getCreateImageRequest(file: File): Observable<CreateImageRequest> {
		const extension = file.type.split('/').pop();
		const fileReader = new FileReader();
		fileReader.readAsBinaryString(file);

		return new Observable<CreateImageRequest>((observer: Subscriber<CreateImageRequest>): void => {
			fileReader.onload = (evt: ProgressEvent<FileReader>): void => {
				const imageContent = btoa(evt.target?.result as string);
				const imageRequest: CreateImageRequest = {
					content: imageContent,
					extension: `.${extension}`,
					enablePreview: true,
				};

				observer.next(imageRequest);
				observer.complete();
			};

			fileReader.onerror = (error: ProgressEvent): void => {
				observer.error(error);
			};
		});
	}
}
