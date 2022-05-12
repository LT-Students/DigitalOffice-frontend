import { Component, OnInit, Input, OnChanges, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
import { ImageInfo } from '@app/models/image.model';

@Component({
	selector: 'do-profile-image',
	templateUrl: './profile-image.component.html',
	styleUrls: ['./profile-image.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileImageComponent implements OnInit, OnChanges {
	@Input() image: Partial<ImageInfo> | null | undefined;
	@Input() size: 'l' | 'm' | 's' = 'm';
	public src = 'assets/images/IAFOR-Blank-Avatar-Image.jpg';
	public width = 48;
	public sizeClass = 'size_m';

	constructor() {}

	ngOnInit(): void {
		if (this.size === 's') {
			this.width = 40;
		} else if (this.size === 'l') {
			this.width = 180;
		} else {
			this.width = 48;
		}
		this.sizeClass = this.getSizeClass();
	}

	public ngOnChanges(changes: SimpleChanges): void {
		if (this.image?.content && this.image?.extension) {
			this.src = `data:image/${this.image.extension.slice(1)};base64,${this.image.content}`;
		} else {
			this.src = 'assets/images/IAFOR-Blank-Avatar-Image.jpg';
		}
	}

	public getSizeClass(): string {
		switch (this.size) {
			case 's':
				return 'size_s';
			case 'm':
				return 'size_m';
			case 'l':
				return 'size_l';
			default:
				return 'size_m';
		}
	}
}
