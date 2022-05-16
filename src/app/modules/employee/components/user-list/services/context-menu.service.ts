import { Injectable } from '@angular/core';
import { MenuItem } from '@app/models/menu-item';
import { switchMap } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { User } from '@app/models/user/user.model';
import { CommunicationInfo } from '@api/user-service/models/communication-info';
import { CommunicationType } from '@api/user-service/models/communication-type';
import { UserRecoveryComponent } from '@shared/modals/user-recovery/user-recovery.component';
import { UserService } from '@app/services/user/user.service';
import { ModalService } from '@app/services/modal.service';
import { MatDialog } from '@angular/material/dialog';
import { ContextMenuComponent } from '@shared/component/context-menu/context-menu.component';
import { UserInfo as FilterUserInfo } from '@api/filter-service/models/user-info';
import { UserInfoLike } from '../user-list.types';
import { UserListService } from './user-list.service';

@Injectable()
export class ContextMenuService {
	public readonly menuItems: MenuItem[] = [
		{
			title: 'Редактировать',
			action: () => {},
			visible: (user: UserInfoLike) => user && this.isActiveUser(user),
			icon: 'edit',
		},
		{
			title: 'Добавить в архив',
			action: (user: UserInfoLike) => this.archiveUser(user.id),
			visible: (user: UserInfoLike) => user && this.isActiveUser(user),
			icon: 'archive',
		},
		{
			title: 'Восстановить из архива',
			action: (user: UserInfoLike) => this.restoreUser(user.id),
			visible: (user: UserInfoLike) => user && !this.isActiveUser(user),
			icon: 'unarchive',
		},
		// {
		// 	title: 'Отменить приглашение',
		// 	action: () => {},
		// 	visible: (user: UserInfoLike) => user && !this.isActiveUser(user),
		// 	icon: 'unsubscribe',
		// },
		{
			title: 'Отправить приглашение',
			action: () => {},
			visible: (user: UserInfoLike) => user && !this.isActiveUser(user),
			icon: 'mark_email_read',
		},
	];

	private contextMenu?: ContextMenuComponent;

	constructor(
		private userService: UserService,
		private modal: ModalService,
		private dialog: MatDialog,
		private userList: UserListService
	) {}

	public setContextMenu(menuRef: ContextMenuComponent): void {
		this.contextMenu = menuRef;
	}

	public openContextMenu(event: MouseEvent, user: UserInfoLike): void {
		this.contextMenu?.openContextMenu(event, user);
	}

	public isActiveUser(user: UserInfoLike): user is FilterUserInfo {
		return !('isActive' in user);
	}

	private archiveUser(userId: string): void {
		this.modal
			.confirm({
				confirmText: 'Да, удалить',
				title: 'Удаление пользователя',
				message: 'Вы действительно хотите удалить этого пользователя?',
			})
			.afterClosed()
			.pipe(switchMap((confirmed?: boolean) => (confirmed ? this.userService.disableUser(userId) : EMPTY)))
			.subscribe({
				next: () => this.userList.removeFromList(userId),
			});
	}

	private restoreUser(userId: string): void {
		this.userService.getUser({ userId: userId, includecommunications: true }).subscribe({
			next: (user: User) => {
				if (!user.communications) return;

				const emails = user.communications.filter(
					(c: CommunicationInfo) =>
						c.type === CommunicationType.Email || c.type === CommunicationType.BaseEmail
				);

				this.dialog.open(UserRecoveryComponent, {
					width: '550px',
					maxHeight: '100%',
					data: { userId: userId, emails: emails },
				});
			},
		});
	}
}
