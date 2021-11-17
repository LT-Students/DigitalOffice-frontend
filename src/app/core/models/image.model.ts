import { Observable, Subscriber } from 'rxjs';
import { CreateImageRequest } from '@data/api/image-service/models/create-image-request';
import { ImageType } from '@data/api/user-service/models/image-type';

export interface IImageInfo {
	content: string;
	extension: string;
	id?: string;
	name: null | string;
	parentId: null | string;
	type?: ImageType;
}

export class UploadedImage {
	constructor(private _image: File) {}

	public get name(): string {
		return this._image.name;
	}

	public get extension(): string | undefined {
		return this._image.type.split('/').pop()?.toLowerCase();
	}

	public getLocalUrl(): Observable<string> {
		const fileReader = new FileReader();
		fileReader.readAsDataURL(this._image);

		return new Observable<string>((observer: Subscriber<string>): void => {
			fileReader.onload = (evt: ProgressEvent<FileReader>): void => {
				observer.next(evt.target?.result as string);
				observer.complete();
			};

			fileReader.onerror = (error: ProgressEvent): void => {
				observer.error(error);
			};
		});
	}

	public getCreateImageRequest(): Observable<CreateImageRequest> {
		const extension = this.extension;
		const fileReader = new FileReader();
		fileReader.readAsBinaryString(this._image);

		return new Observable<CreateImageRequest>((observer: Subscriber<any>): void => {
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
