import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { FileService } from '@app/services/file/file.service';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { UploadFile } from '../add-files.service';

@Component({
	selector: 'do-upload-item',
	template: `
		<div class="upload-item">
			<div class="file text-secondary_active">
				<mat-icon [svgIcon]="file.file.type | fileIcon"></mat-icon>
				<span class="name">{{ file.name }}</span>
			</div>
			<mat-progress-bar class="progress-bar" color="primary" [value]="uploadProgress | async"></mat-progress-bar>
			<div class="progress text-secondary_active">
				<span
					>{{ (((uploadProgress | async) || 0) * file.file.size) / 100 | formatBytes: 2:true }} из
					{{ file.file.size | formatBytes }}</span
				>
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
export class UploadItemComponent implements OnInit, OnDestroy {
	@Output() fileUploaded = new EventEmitter();
	@Input() file!: UploadFile;
	@Input() entityId!: string;

	public uploadProgress = new BehaviorSubject(0);
	private subscription!: Subscription;

	constructor(private fileApi: FileService) {}

	ngOnInit(): void {
		const { file, accessType, name } = this.file;
		this.subscription = this.fileApi
			.createFile({ file, access: accessType, entityId: this.entityId, fileName: name })
			.subscribe({
				next: (event: HttpEvent<any>) => {
					switch (event.type) {
						case HttpEventType.UploadProgress:
							this.uploadProgress.next(Math.round((event.loaded / (event.total || 0)) * 100));
							break;
						case HttpEventType.Response:
							this.fileUploaded.emit();
							break;
						default:
							break;
					}
				},
			});
	}

	public ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}
}
