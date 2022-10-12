import { Component, ChangeDetectionStrategy, Inject } from '@angular/core';
import { Icons } from '@shared/modules/icons/icons';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { DialogService } from '@shared/component/dialog/dialog.service';
import { UploadFile } from '../add-files.service';

export interface UploadProgress {
	files: UploadFile[];
	entityId: string;
}

@Component({
	selector: 'do-upload-progress',
	templateUrl: './upload-progress.component.html',
	styleUrls: ['./upload-progress.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UploadProgressComponent {
	public readonly Icons = Icons;
	private uploadedFilesCount = 0;

	constructor(
		@Inject(DIALOG_DATA) public data: UploadProgress,
		private dialog: DialogService,
		private dialogRef: DialogRef<UploadProgressComponent>
	) {}

	public handleUploadedFile(): void {
		this.uploadedFilesCount++;
		if (this.uploadedFilesCount === this.data.files.length) {
			this.dialog.closeAll();
		}
	}

	public onCancel(): void {
		this.dialogRef.close();
	}
}
