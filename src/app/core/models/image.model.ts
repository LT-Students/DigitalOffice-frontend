import { Observable, Subscriber } from 'rxjs';

export interface IImageInfo {
	id?: string;
	parentId?: string;
	content: string;
	extension: string;
	name?: string;
	enablePreview?: boolean;
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

	public getCreateImageRequest(): Observable<IImageInfo> {
		const extension = this.extension;
		const fileReader = new FileReader();
		fileReader.readAsBinaryString(this._image);

		return new Observable<IImageInfo>((observer: Subscriber<any>): void => {
			fileReader.onload = (evt: ProgressEvent<FileReader>): void => {
				const imageContent = btoa(evt.target?.result as string);
				const imageRequest: IImageInfo = {
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
