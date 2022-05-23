import { Component, OnInit, Input, ChangeDetectionStrategy, OnChanges } from '@angular/core';
import { BaseImageInfo, ImageInfo } from '@app/models/image.model';
import { ImageUserService } from '@app/services/image/image-user.service';
import { merge, Observable, ReplaySubject } from 'rxjs';
import { distinctUntilChanged, map, switchMap } from 'rxjs/operators';
import { NgChanges } from '@app/types/ng-changes';

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
	@Input()
	set image(image: ImageInfo | undefined) {
		this._image.next(image ?? null);
	}
	private _image = new ReplaySubject<ImageInfo | null>(1);
	public image$!: Observable<BaseImageInfo | null>;

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
	set userInitials({ firstName, lastName }: { firstName: string; lastName: string }) {
		this.initials = firstName.trim()[0] + lastName.trim()[0];
	}

	@Input() textRatio = 2.4;

	@Input()
	set size(size: Size) {
		this.width = sizeMap[size];
	}
	public width = 48;

	@Input() progressive = false;

	private progressiveImage$ = new ReplaySubject<string>(1);

	constructor(private imageService: ImageUserService) {}

	public ngOnChanges(changes: NgChanges<ProfileImageComponent>): void {
		if (!(changes.progressive?.currentValue || this.progressive)) {
			return;
		}
		const parentId = changes.image?.currentValue?.parentId;
		const prevParentId = changes.image?.previousValue?.parentId;
		if (parentId && prevParentId !== parentId) {
			this.progressiveImage$.next(parentId);
		}
	}

	public ngOnInit(): void {
		this.image$ = merge(
			this._image.pipe(
				distinctUntilChanged((img1: ImageInfo | null, img2: ImageInfo | null) => img1?.id === img2?.id)
			),
			this.progressiveImage$.pipe(
				switchMap((id: string) => this.imageService.getImageUser(id)),
				map((res) => res.body!)
			)
		);
	}
}
