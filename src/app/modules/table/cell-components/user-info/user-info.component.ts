import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ImageInfo } from '@app/models/image.model';
import { Icons } from '@shared/modules/icons/icons';
import { TableCell } from '../../models';

interface UserInfo {
	firstName: string;
	lastName: string;
	middleName?: string;
	avatar?: ImageInfo;
	position?: { name: string };
}

export interface UserInfoParams {
	statusIconGetter?: (o: any) => Icons | null;
	iconColor?: string;
}

@Component({
	selector: 'do-user-info',
	templateUrl: './user-info.component.html',
	styleUrls: ['./user-info.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserInfoComponent implements OnInit, TableCell<UserInfo> {
	public set value(user: UserInfo) {
		this.user = user;
	}
	public user!: UserInfo;

	public params?: UserInfoParams;

	constructor() {}

	ngOnInit(): void {}
}
