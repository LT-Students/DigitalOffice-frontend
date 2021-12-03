import { Component, ChangeDetectionStrategy } from '@angular/core';
import { IImageInfo, UploadedImage } from '@app/models/image.model';
import { Observable } from 'rxjs';

@Component({
	selector: 'do-upload-photo',
	templateUrl: './upload-photo.component.html',
	styleUrls: ['./upload-photo.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UploadPhotoComponent {
	public isImageUploaded: boolean;
	public imagePreview$?: Observable<string>;
	public resultFile$?: Observable<IImageInfo>;

	constructor() {
		this.isImageUploaded = false;
	}

	public onFileDropped(event: FileList): void {
		this._handleFile(event[0]);
	}

	public onFileChanged(event: Event): void {
		const file = (event.target as HTMLInputElement).files?.[0];
		if (file) {
			this._handleFile(file);
		}
	}

	private _handleFile(file: File): void {
		const image = new UploadedImage(file);
		this.resultFile$ = image.getCreateImageRequest();
		this.imagePreview$ = image.getLocalUrl();
		this.isImageUploaded = true;
	}
}
