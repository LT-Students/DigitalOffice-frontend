import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { BaseImageInfo, UploadedImage } from '@app/models/image.model';
import { BehaviorSubject } from 'rxjs';
import { AlertService } from '@app/services/alert.service';

const ALLOWED_TYPES = ['png', 'jpeg', 'gif', 'bmp', 'tiff'].map((t: string) => 'image/' + t);
const IMAGE_MAX_SIZE = 1.1e7;

@Component({
	selector: 'do-select-image',
	templateUrl: './select-image.component.html',
	styleUrls: ['./select-image.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectImageComponent implements OnInit {
	@Output() fileSelected = new EventEmitter<BaseImageInfo>();
	public imageLoading$ = new BehaviorSubject<boolean>(false);
	public readonly allowedTypes = ALLOWED_TYPES.join(', ');

	constructor(private alert: AlertService) {}

	ngOnInit(): void {}

	public onFileDropped(event: FileList): void {
		this.handleFile(event[0]);
	}

	public onFileChanged(event: Event): void {
		const file = (event.target as HTMLInputElement).files?.[0];
		if (file) {
			this.handleFile(file);
		}
	}

	private handleFile(file: File): void {
		if (!ALLOWED_TYPES.includes(file.type)) {
			this.alert.open('Недопустимое расширение файла');
			return;
		}
		if (file.size > IMAGE_MAX_SIZE) {
			this.alert.open('Размер файла слишком большой. Максимальный размер 10 МБ.');
			return;
		}

		this.imageLoading$.next(true);
		const image = new UploadedImage(file);
		image.getBaseImage$().subscribe({
			next: (uploadedImage: BaseImageInfo) => this.fileSelected.next(uploadedImage),
			error: () => this.imageLoading$.next(false),
		});
	}
}
