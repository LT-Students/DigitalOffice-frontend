import { Component, ChangeDetectionStrategy, Inject } from '@angular/core';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { FileInfo } from '@api/project-service/models/file-info';
import { Icons } from '@shared/modules/icons/icons';
import { DialogService } from '@shared/component/dialog/dialog.service';
import { DownloadItemComponent } from './download-item.component';

@Component({
	selector: 'do-download-files',
	templateUrl: './download-files.component.html',
	styleUrls: ['./download-files.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DownloadFilesComponent {
	public readonly Icons = Icons;
	private downloadedFilesCount = 0;

	constructor(
		@Inject(DIALOG_DATA) public files: FileInfo[],
		private dialog: DialogService,
		private dialogRef: DialogRef<DownloadItemComponent>
	) {}

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
