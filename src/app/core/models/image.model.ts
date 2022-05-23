import { Observable, Subscriber } from 'rxjs';

export interface BaseImageInfo {
	content: string;
	extension: string;
}

export interface ImageInfo extends BaseImageInfo {
	id: string;
	parentId?: string;
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

	public getBaseImage$(): Observable<BaseImageInfo> {
		const extension = this.extension;
		const fileReader = new FileReader();

		return new Observable<BaseImageInfo>((observer: Subscriber<any>): void => {
			fileReader.readAsBinaryString(this._image);
			fileReader.onload = (evt: ProgressEvent<FileReader>): void => {
				const imageContent = btoa(evt.target?.result as string);
				const imageRequest: BaseImageInfo = {
					content: imageContent,
					extension: `.${extension}`,
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
