import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { CommunicationInfo } from '@api/user-service/models/communication-info';
import { UserInfo as FilterUserInfo } from '@api/filter-service/models/user-info';
import { ContextMenuService } from '../services/context-menu.service';
import { UserInfoLike } from '../user-list.types';

@Component({
	selector: 'do-user-list-item',
	templateUrl: './user-list-item.component.html',
	styleUrls: ['./user-list-item.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserListItemComponent implements OnInit {
	@Input() user!: UserInfoLike;

	public email?: CommunicationInfo;
	public additionalInfo?: Pick<FilterUserInfo, 'department' | 'position'>;

	constructor(private contextMenuService: ContextMenuService) {}

	public ngOnInit(): void {
		if (this.contextMenuService.isActiveUser(this.user)) {
			this.additionalInfo = {
				position: this.user.position,
				department: this.user.department,
			};
		} else {
			this.email = this.user.communications?.[0];
		}
	}

	public openContextMenu(event: MouseEvent): void {
		this.contextMenuService.openContextMenu(event, this.user);
	}
}
