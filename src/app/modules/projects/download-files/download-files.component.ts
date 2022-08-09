import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FileInfo } from '@api/project-service/models/file-info';
import { Icons } from '@shared/modules/icons/icons';
import { DialogService } from '@app/services/dialog.service';
import { DownloadItemComponent } from './download-item.component';

@Component({
	selector: 'do-download-files',
	templateUrl: './download-files.component.html',
	styleUrls: ['./download-files.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DownloadFilesComponent implements OnInit {
	public readonly Icons = Icons;
	private downloadedFilesCount = 0;

	constructor(
		@Inject(MAT_DIALOG_DATA) public files: FileInfo[],
		private dialog: DialogService,
		private dialogRef: MatDialogRef<DownloadItemComponent>
	) {}

	ngOnInit(): void {}

	public handleUploadedFile(): void {
		this.downloadedFilesCount++;
		if (this.downloadedFilesCount === this.files.length) {
			this.dialog.closeAll();
		}
	}

	public onCancel(): void {
		this.dialogRef.close();
	}
}
