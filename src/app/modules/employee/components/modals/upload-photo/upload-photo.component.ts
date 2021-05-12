import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'do-upload-photo',
	templateUrl: './upload-photo.component.html',
	styleUrls: ['./upload-photo.component.scss'],
})
export class UploadPhotoComponent implements OnInit {
	isPhotoUploaded = false;
	photoPreview: string;

	constructor() {}

	ngOnInit(): void {}

	onFileDropped(event): void {
		this.handleFile(event[0]);
	}

	onFileChanged(event): void {
		this.handleFile(event.target.files[0]);
	}

	handleFile(file): void {
		this.isPhotoUploaded = true;
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = (evt) => {
			this.photoPreview = <string>evt.target.result;
		};
	}
}
