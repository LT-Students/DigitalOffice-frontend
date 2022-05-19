import { Component, OnInit, Input, OnChanges, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
import { ImageInfo } from '@app/models/image.model';

type Size = 's' | 'm' | 'l' | 'xl';

const sizeMap: { [key in Size]: number } = {
	s: 40,
	m: 48,
	l: 64,
	xl: 180,
};

@Component({
	selector: 'do-profile-image',
	templateUrl: './profile-image.component.html',
	styleUrls: ['./profile-image.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileImageComponent implements OnInit, OnChanges {
	@Input() image: Partial<ImageInfo> | null | undefined;
	@Input() size: Size = 'm';
	public src = 'assets/images/IAFOR-Blank-Avatar-Image.jpg';
	public width = 48;

	constructor() {}

	ngOnInit(): void {
		this.width = sizeMap[this.size];
	}

	public ngOnChanges(changes: SimpleChanges): void {
		if (this.image?.content && this.image?.extension) {
			this.src = `data:image/${this.image.extension.slice(1)};base64,${this.image.content}`;
		} else {
			this.src = 'assets/images/IAFOR-Blank-Avatar-Image.jpg';
		}
	}
}
