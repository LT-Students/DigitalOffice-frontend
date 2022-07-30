import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AddFilesService } from './add-files.service';

@Component({
	selector: 'do-add-files',
	templateUrl: './add-files.component.html',
	styleUrls: ['./add-files.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [AddFilesService],
})
export class AddFilesComponent implements OnInit {
	public filesDataSource = this.addFilesService.getDataSource();
	public tableOptions = this.addFilesService.getTableOptions();

	constructor(private addFilesService: AddFilesService) {}

	ngOnInit(): void {}

	public onFileDropped(event: FileList): void {
		this.handleFiles(event);
	}

	public onFileChanged(event: Event): void {
		const files = (event.target as HTMLInputElement).files;
		if (files) {
			this.handleFiles(files);
		}
	}

	private handleFiles(files: FileList): void {
		this.filesDataSource.addFiles(files);
	}

	public uploadFiles(): void {
		this.addFilesService.uploadFiles();
	}
}
