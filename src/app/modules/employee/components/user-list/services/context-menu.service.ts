import { Injectable } from '@angular/core';
import { MenuItem } from '@shared/component/context-menu/menu-item';
import { map, switchMap } from 'rxjs/operators';
import { EMPTY, Observable } from 'rxjs';
import { CommunicationInfo } from '@api/user-service/models/communication-info';
import { UserService } from '@app/services/user/user.service';
import { DialogService } from '@shared/component/dialog/dialog.service';
import { ContextMenuComponent } from '@shared/component/context-menu/context-menu.component';
import { UserInfo } from '@api/user-service/models/user-info';
import { OperationResultResponse } from '@app/types/operation-result-response.interface';
import { ConfirmDialogData } from '@shared/dialogs/confirm-dialog/confirm-dialog.component';
import { UserArchiveRecoveryService } from '@app/services/user-archive-recovery.service';
import { UserInfoLike } from '../user-list.types';
import { isActiveUser, isPendingUser } from '../helpers';
import { UserListService } from './user-list.service';

type RemoveFrom = 'active' | 'pending';

@Injectable()
export class ContextMenuService {
	public readonly menuItems: MenuItem[] = [
		{
			title: 'Добавить в архив',
			action: (user: UserInfoLike) => this.archiveUser(user),
			visible: (user: UserInfoLike) => isActiveUser(user),
			icon: 'archive',
		},
		{
			title: 'Восстановить из архива',
			action: (user: UserInfoLike) => this.restoreUser(user as UserInfo),
			visible: (user: UserInfoLike) => !isActiveUser(user) && !isPendingUser(user),
			icon: 'unarchive',
		},
		{
			title: 'Отменить приглашение',
			action: (user: UserInfoLike) => this.removePending(user as UserInfo),
			visible: (user: UserInfoLike) => isPendingUser(user),
			icon: 'unsubscribe',
		},
		{
			title: 'Отправить приглашение',
			action: (user: UserInfoLike) => this.restoreUser(user as UserInfo),
			visible: (user: UserInfoLike) => isPendingUser(user),
			icon: 'mark_email_read',
		},
	];

	private contextMenu?: ContextMenuComponent;

	constructor(
		private userService: UserService,
		private dialog: DialogService,
		private userList: UserListService,
		private archiveRecovery: UserArchiveRecoveryService
	) {}

	public setContextMenu(menuRef: ContextMenuComponent): void {
		this.contextMenu = menuRef;
	}

	public openContextMenu(event: MouseEvent, user: UserInfoLike): void {
		this.contextMenu?.openContextMenu(event, user);
	}

	private restoreUser(user: UserInfo): void {
		if (!user.communications) return;
		this.archiveRecovery
			.restoreUser(user.id, user.communications, !!user.pendingInfo?.invitationCommunicationId)
			.subscribe({
				next: (communication?: CommunicationInfo) => {
					if (communication) {
						const isNewCommunication = !user?.communications?.some(
							(c: CommunicationInfo) => c.id === communication.id
						);
						const partialUser: Partial<UserInfo> = {
							pendingInfo: {
								invitationCommunicationId: communication.id,
							},
							communications: isNewCommunication
								? [...(user.communications as CommunicationInfo[]), communication]
								: user.communications,
						};
						this.userList.editUserInList(user.id, partialUser);
					}
				},
			});
	}

	private archiveUser(user: UserInfoLike): void {
		this.removeUserFrom(user.id, 'active').subscribe();
	}

	private removePending(user: UserInfo): void {
		this.removeUserFrom(user.id, 'pending').subscribe({
			next: (isRemoved: boolean) => {
				if (!isRemoved) {
					const partialUser: Partial<UserInfo> = {
						pendingInfo: undefined,
					};
					this.userList.editUserInList(user.id, partialUser);
				}
			},
		});
	}

	private removeUserFrom(userId: string, from: RemoveFrom): Observable<boolean> {
		let confirmConfig: ConfirmDialogData;
		let removeCallback: Observable<OperationResultResponse>;
		if (from === 'active') {
			confirmConfig = {
				confirmText: 'Да, удалить',
				title: 'Удаление пользователя',
				message: 'Вы действительно хотите удалить этого пользователя?',
			};
			removeCallback = this.userService.disableUser(userId);
		} else {
			confirmConfig = {
				confirmText: 'Да, отменить',
				title: 'Отменить приглашение',
				message: 'Вы действительно хотите отменить приглашение для этого пользователя?',
			};
			removeCallback = this.userService.removePending(userId);
		}
		return this.dialog.confirm(confirmConfig).closed.pipe(
			switchMap((confirmed?: boolean) => (confirmed ? removeCallback : EMPTY)),
			map(() => this.userList.removeFromList(userId))
		);
	}
}
