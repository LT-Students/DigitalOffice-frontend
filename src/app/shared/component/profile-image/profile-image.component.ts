import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { ImageInfo } from '@data/api/user-service/models/image-info';

@Component({
	selector: 'do-profile-image',
	templateUrl: './profile-image.component.html',
	styleUrls: ['./profile-image.component.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class ProfileImageComponent implements OnInit {
	@Input() image: ImageInfo;
	@Input() size: 'l' | 'sm';
	public src: string;
	public width: number;

	constructor() {
		this.size = 'sm';
		this.width = 48;
	}

	ngOnInit(): void {
		if (this.image?.content && this.image?.extension) {
			this.src = `data:image/${this.image.extension.slice(1)};base64,${this.image.content}`;
		} else {
			this.src = 'assets/images/IAFOR-Blank-Avatar-Image.jpg';
		}
		this.width = this.size === 'sm' ? 48 : 180;
	}
}
