import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { BaseImageInfo } from '@app/models/image.model';

@Component({
	selector: 'do-adjust-image',
	templateUrl: './adjust-image.component.html',
	styleUrls: ['./adjust-image.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdjustImageComponent implements OnInit {
	@Output() cancel = new EventEmitter<void>();
	@Output() save = new EventEmitter<BaseImageInfo>();

	@Input() image: BaseImageInfo | null = null;

	@Input()
	set saveInProgress(value: any) {
		this._saveInProgress = coerceBooleanProperty(value);
	}
	get saveInProgress(): boolean {
		return this._saveInProgress;
	}
	private _saveInProgress = false;

	public croppedImage: string | null | undefined = null;

	constructor() {}

	ngOnInit(): void {}

	public imageCropped(event: ImageCroppedEvent): void {
		this.croppedImage = event.base64;
	}

	public saveImage(): void {
		if (this.image?.extension === '.gif') {
			this.save.emit(this.image);
		} else if (this.croppedImage) {
			const croppedImage: BaseImageInfo = {
				content: this.croppedImage.split(',')[1],
				extension: '.jpeg',
			};
			this.save.emit(croppedImage);
		}
	}
}
