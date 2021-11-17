import { Injectable } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import { CreateImageRequest } from '@data/api/image-service/models/create-image-request';

@Injectable({
	providedIn: 'root',
})
export class CreateImageService {
	constructor() {}

	public getCreateImageRequest(file: File): Observable<any> {
		const extension = file.type.split('/').pop();
		const fileReader = new FileReader();
		fileReader.readAsBinaryString(file);

		return new Observable<any>((observer: Subscriber<any>): void => {
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
