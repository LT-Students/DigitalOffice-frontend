import { Injectable } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { EMPTY, Observable } from 'rxjs';
import { CommunicationInfo } from '@api/user-service/models/communication-info';
import { CommunicationType } from '@api/user-service/models/communication-type';
import { UserService } from '@app/services/user/user.service';
import { DialogService, ModalWidth } from '@shared/component/dialog/dialog.service';
import { UserRecoveryComponent } from '@shared/dialogs/user-recovery/user-recovery.component';

@Injectable({
	providedIn: 'root',
})
export class UserArchiveRecoveryService {
	constructor(private dialog: DialogService, private userService: UserService) {}

	public archiveUser(userId: string): Observable<any> {
		return this.dialog
			.confirm({
				confirmText: 'Да, удалить',
				title: 'Удаление пользователя',
				message: 'Вы действительно хотите удалить этого пользователя?',
			})
			.closed.pipe(
				switchMap((confirmed?: boolean) => (confirmed ? this.userService.disableUser(userId) : EMPTY))
			);
	}

	public restoreUser(
		userId: string,
		communications: CommunicationInfo[] = [],
		isPending: boolean
	): Observable<CommunicationInfo | undefined> {
		const emails = communications.filter(
			(c: CommunicationInfo) => c.type === CommunicationType.Email || c.type === CommunicationType.BaseEmail
		);
		return this.dialog.open<CommunicationInfo>(UserRecoveryComponent, {
			width: ModalWidth.S,
			data: { userId, emails, isPending },
		}).closed;
	}
}
