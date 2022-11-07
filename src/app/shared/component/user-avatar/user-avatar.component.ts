import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ImageApiService } from '@api/image-service/services/image-api.service';
import { BaseImageInfo } from '@app/models/image.model';

type AvatarSize = 's' | 'm' | 'l' | 'xl';

const sizeMap: { [key in AvatarSize]: number } = {
	s: 40,
	m: 48,
	l: 64,
	xl: 180,
};

@Component({
	selector: 'do-user-avatar',
	templateUrl: './user-avatar.component.html',
	styleUrls: ['./user-avatar.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserAvatarComponent implements OnInit {
	public readonly textRatio = 2.4;

	@Input() imageId?: string;

	/**
	 * User info is used to display username initials
	 */
	@Input()
	set user({ firstName, lastName }: { firstName: string; lastName: string }) {
		this.initials = firstName.trim()[0] + lastName.trim()[0];
	}
	public initials = '??';

	@Input()
	set size(size: AvatarSize) {
		this.width = sizeMap[size];
	}
	public width = 48;

	public image$!: Observable<BaseImageInfo>;

	constructor(private imageService: ImageApiService) {}

	public ngOnInit(): void {
		if (this.imageId) {
			this.image$ = this.imageService
				.getImage({ imageId: this.imageId, source: 'User' })
				.pipe(map((res) => res.body as BaseImageInfo));
		}
	}
}
