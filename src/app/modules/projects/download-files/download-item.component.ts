import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter, Input, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { FileDownload, FileService } from '@app/services/file/file.service';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { FileInfo } from '@api/project-service/models/file-info';
import { b64toBlob } from '@app/utils/utils';

@Component({
	selector: 'do-download-item',
	template: `
		<div class="upload-item">
			<div class="file text-secondary_active">
				<mat-icon [svgIcon]="file.extension | slice: 1 | typeFromExtension | fileIcon"></mat-icon>
				<span class="name">{{ file.name }}</span>
			</div>
			<mat-progress-bar class="progress-bar" color="primary" [value]="progress | async"></mat-progress-bar>
			<div class="progress text-secondary_active">
				<span
					>{{ (((progress | async) || 0) * file.size) / 100 | formatBytes: 2:true }} из
					{{ file.size | formatBytes }}</span
				>
				<span>{{ progress | async }}%</span>
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
export class DownloadItemComponent implements OnInit, OnDestroy {
	@Output() fileDownloaded = new EventEmitter();
	@Input() file!: FileInfo;

	public progress = new BehaviorSubject(0);
	private subscription!: Subscription;

	constructor(private fileApi: FileService) {}

	public ngOnInit(): void {
		this.subscription = this.fileApi.downloadFile(this.file.id).subscribe({
			next: (event: HttpEvent<FileDownload>) => {
				switch (event.type) {
					case HttpEventType.DownloadProgress:
						this.progress.next(Math.round((event.loaded / (event.total || 0)) * 100));
						break;
					case HttpEventType.Response:
						this.fileDownloaded.emit();
						const file = event.body as FileDownload;
						this.download(file);
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

	private download(file: FileDownload): void {
		const a = document.createElement('a');
		const blob = b64toBlob(file.fileContents, file.contentType);
		const url = URL.createObjectURL(blob);
		a.href = url;
		a.download = file.fileDownloadName;
		a.click();
		URL.revokeObjectURL(url);
	}
}
