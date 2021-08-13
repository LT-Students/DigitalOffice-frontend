//@ts-nocheck
import { Component, OnInit } from '@angular/core';
import { AddImageRequest } from '@data/api/user-service/models/add-image-request';

@Component({
	selector: 'do-upload-photo',
	templateUrl: './upload-photo.component.html',
	styleUrls: ['./upload-photo.component.scss'],
})
export class UploadPhotoComponent implements OnInit {
	public isPhotoUploaded: boolean;
	public photoPreview: string;
	public resultFile: AddImageRequest;

	constructor() {
		this.isPhotoUploaded = false;
		this.photoPreview = null;
		this.resultFile = null;
	}

	ngOnInit(): void {}

	onFileDropped(event): void {
		this.handleFile(event[0]);
	}

	onFileChanged(event): void {
		this.handleFile(event.target.files[0]);
	}

	handleFile(file): void {
		const extension = file.name.split('.').pop().toLowerCase();

		this.isPhotoUploaded = true;
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = (evt) => {
			this.photoPreview = evt.target.result as string;
			this.resultFile = {
				content: this.photoPreview.split(',')[1],
				extension: '.' + extension,
			};
		};
	}
}
