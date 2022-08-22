import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { Icons } from '@shared/modules/icons/icons';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogService } from '@app/services/dialog.service';
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
export class UploadProgressComponent implements OnInit {
	public readonly Icons = Icons;
	private uploadedFilesCount = 0;

	constructor(
		@Inject(MAT_DIALOG_DATA) public data: UploadProgress,
		private dialog: DialogService,
		private dialogRef: MatDialogRef<UploadProgressComponent>
	) {}

	ngOnInit(): void {}

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
