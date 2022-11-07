import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Icons } from '@shared/modules/icons/icons';
import { TableCell } from '../../models';

interface UserInfo {
	id: string;
	firstName: string;
	lastName: string;
	middleName?: string;
	imageId?: string;
	position?: { name: string };
}

export class UserInfoParams {
	iconColor?: string;
	statusIconGetter?: (o: any) => Icons | null;
	onAvatarClick?: (o: any) => void;
	onNameClick?: (o: any) => void;

	constructor(params?: {
		statusIconGetter?: (o: any) => Icons | null;
		iconColor?: string;
		onAvatarClick?: (o: any) => void;
		onNameClick?: (o: any) => void;
	}) {
		this.iconColor = params?.iconColor;
		this.statusIconGetter = params?.statusIconGetter;
		this.onAvatarClick = params?.onAvatarClick;
		this.onNameClick = params?.onNameClick;
	}
}

@Component({
	selector: 'do-user-info',
	templateUrl: './user-info.component.html',
	styleUrls: ['./user-info.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserInfoComponent implements TableCell<UserInfo> {
	public set value(user: UserInfo) {
		this.user = user;
	}
	public user!: UserInfo;

	public params?: UserInfoParams;

	constructor() {}
}
