import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FileApiService } from '@api/file-service/services/file-api.service';
import { BehaviorSubject } from 'rxjs';
import { HttpEventType } from '@angular/common/http';
import { UploadFile } from '../add-files.service';

@Component({
	selector: 'do-upload-item',
	template: `
		<div class="upload-item">
			<div class="file text-secondary_active">
				<mat-icon [svgIcon]="'folder'"></mat-icon>
				<span class="name">{{ file.name }}</span>
			</div>
			<mat-progress-bar class="progress-bar" color="primary" [value]="uploadProgress | async"></mat-progress-bar>
			<div class="progress text-secondary_active">
				<span>{{ file.file.size | formatBytes }}</span>
				<span>{{ uploadProgress | async }}%</span>
			</div>
		</div>
	`,
	styles: [
		`
			:host {
				display: block;
			}

			.upload-item {
				display: flex;
				flex-direction: column;
			}

			.file {
				display: flex;
				align-items: center;

				mat-icon {
					margin-right: 5px;
				}

				.name {
					text-overflow: ellipsis;
					overflow: hidden;
					white-space: nowrap;
				}
			}

			.progress-bar {
				margin: 4px 0;
				height: 10px;
				border-radius: 5px;
			}

			.progress {
				display: flex;
				justify-content: space-between;
			}
		`,
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UploadItemComponent implements OnInit {
	@Input() file!: UploadFile;
	@Input() entityId!: string;

	public uploadProgress = new BehaviorSubject(50);

	constructor(private fileApi: FileApiService) {}

	ngOnInit(): void {
		// this.fileApi
		// 	.createFile$Response({
		// 		uploadedFiles: this.file.file,
		// 		access: this.file.accessType,
		// 		entityId: this.entityId,
		// 		body: [],
		// 	})
		// 	.subscribe({
		// 		next: (res) => {
		// 			if (res.type === HttpEventType.UploadProgress) {
		// 			}
		// 		},
		// 	});
	}
}
