import { Component, ChangeDetectionStrategy } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { MatDialogRef } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
import { BaseImageInfo } from '@app/models/image.model';
import { UploadImageService } from './upload-image.service';

@Component({
	selector: 'do-upload-photo',
	templateUrl: './upload-image.component.html',
	styleUrls: ['./upload-image.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [UploadImageService],
})
export class UploadImageComponent {
	public image$ = this.uploadImageService.image$;

	public imageSaving$ = new BehaviorSubject(false);

	constructor(
		private uploadImageService: UploadImageService,
		private dialogRef: MatDialogRef<UploadImageComponent>
	) {}

	public uploadFile(image: BaseImageInfo): void {
		this.uploadImageService.setUploadImage(image);
	}

	public returnToSelection(): void {
		this.uploadImageService.setUploadImage(null);
	}

	public saveImage(image: BaseImageInfo): void {
		this.imageSaving$.next(true);
		this.uploadImageService
			.saveImage(image)
			.pipe(finalize(() => this.imageSaving$.next(false)))
			.subscribe({
				next: () => {
					this.dialogRef.close();
				},
			});
	}
}
