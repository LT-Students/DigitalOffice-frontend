import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Icons } from '@shared/modules/icons/icons';
import { BehaviorSubject } from 'rxjs';
import { AlertService } from '@app/services/alert.service';

@Component({
	selector: 'do-upload-images',
	templateUrl: './upload-images.component.html',
	styleUrls: ['./upload-images.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UploadImagesComponent implements OnInit, OnDestroy {
	public readonly Icons = Icons;
	public readonly MAX_IMAGES_COUNT = 10;
	public readonly ACCEPTABLE_TYPES = ['image/jpeg', 'image/png', 'image/bmp', 'image/gif'];

	@Output() imagesChange = new EventEmitter();

	public images$ = new BehaviorSubject<File[]>([]);

	constructor(private alert: AlertService) {}

	public ngOnInit(): void {
		this.images$.subscribe({ next: (images: File[]) => this.imagesChange.emit(images) });
	}

	public ngOnDestroy(): void {
		this.images$.unsubscribe();
	}

	public onFileDropped(event: FileList): void {
		this.handleFiles(event);
	}

	public onFileChanged(event: Event): void {
		const files = (event.target as HTMLInputElement).files;
		if (files) {
			this.handleFiles(files);
		}
	}

	private handleFiles(fileList: FileList): void {
		const oldFiles = this.images$.value;
		const newFiles = [...oldFiles, ...Array.from(fileList)];
		if (newFiles.length > this.MAX_IMAGES_COUNT) {
			this.alert.open('Превышено максимальное количество файлов', { duration: 3000 });
			return;
		}
		if (newFiles.some((f: File) => !this.ACCEPTABLE_TYPES.some((t: string) => t === f.type))) {
			this.alert.open('Недопустимое расширение файла', { duration: 3000 });
			return;
		}
		this.images$.next(newFiles);
	}

	public removeImage(i: number): void {
		const shiftedFiles = this.images$.value.filter((_: File, index: number) => index !== i);
		this.images$.next(shiftedFiles);
	}
}
