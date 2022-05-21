import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { BaseImageInfo } from '@app/models/image.model';

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
export class ProfileImageComponent implements OnInit {
	@Input()
	set image(image: BaseImageInfo | undefined) {
		this._image = image ?? null;
	}
	public _image: BaseImageInfo | null = null;

	@Input()
	set label(value: string) {
		this.initials = value
			.split(' ')
			.map((v: string) => v[0])
			.join('')
			.slice(0, 2);
	}
	public initials = '';

	@Input()
	set userInitials({ firstName, lastName }: { firstName: string; lastName: string; }) {
		this.initials = firstName.trim()[0] + lastName.trim()[0];
	}

	@Input() textRatio = 2.4;

	@Input()
	set size(size: Size) {
		this.width = sizeMap[size];
	}
	public width = 48;

	constructor() {}

	public ngOnInit(): void {}
}
