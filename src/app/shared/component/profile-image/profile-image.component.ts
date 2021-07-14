import { Component, OnInit, Input, ViewEncapsulation, OnChanges, SimpleChanges } from '@angular/core';
import { ImageInfo } from '@data/api/user-service/models/image-info';

@Component({
	selector: 'do-profile-image',
	templateUrl: './profile-image.component.html',
	styleUrls: ['./profile-image.component.scss'],
})
export class ProfileImageComponent implements OnInit, OnChanges {
	@Input() image: ImageInfo;
	@Input() size: 'l' | 'm' | 's';
	public src: string;
	public width: number;

	constructor() {
		this.size = 'm';
		this.width = 48;
	}

	ngOnInit(): void {
		if (this.size === 's') {
			this.width = 40;
		} else if (this.size === 'l') {
			this.width = 180;
		} else {
			this.width = 48;
		}
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
				return 'profile-image_size_s';
			case 'l':
				return 'profile-image_size_l';
			default:
				return null;
		}
	}
}
