import { Injectable } from '@angular/core';
import { first } from 'rxjs/operators';
import { CommunicationInfo, CommunicationType } from '@api/user-service/models';
import { ContextMenu } from '@shared/component/context-menu/context-menu';
import { Icons } from '@shared/modules/icons/icons';
import { ContextMenuComponent } from '@shared/component/context-menu/context-menu.component';
import { MenuItem } from '@shared/component/context-menu/menu-item';
import { EmployeePageService } from '../../../services/employee-page.service';
import { ManageCommunicationsService } from './manage-communications.service';

@Injectable()
export class ContextMenuService implements ContextMenu {
	private contextMenu?: ContextMenuComponent;

	constructor(private manageCommunications: ManageCommunicationsService, private employeePage: EmployeePageService) {}

	public setContextMenu(menuRef: ContextMenuComponent): void {
		this.contextMenu = menuRef;
	}

	public openContextMenu(event: MouseEvent, communication: CommunicationInfo): void {
		this.contextMenu?.openContextMenu(event, communication);
	}

	public getMenuItems(): MenuItem[] {
		return [
			{
				title: 'Редактировать',
				visible: (communication: CommunicationInfo) => this.canEdit(communication),
				action: this.manageCommunications.editCommunicationValue.bind(this.manageCommunications),
				icon: Icons.Edit,
			},
			{
				title: 'Удалить',
				visible: (communication: CommunicationInfo) => communication.type !== CommunicationType.BaseEmail,
				action: this.manageCommunications.deleteCommunication.bind(this.manageCommunications),
				icon: Icons.Delete,
			},
			{
				title: 'Подтвердить e-mail',
				visible: (communication: CommunicationInfo) => {
					// not sure if this is a good idea to use this observable in a synchronous way. Probably need to
					// refactor ContextMenu abstract class
					let isCurrentUserOwner = false;
					this.employeePage
						.isOwner$()
						.pipe(first())
						.subscribe({
							next: (isOwner: boolean) => (isCurrentUserOwner = isOwner),
						});
					return (
						isCurrentUserOwner &&
						communication.type === CommunicationType.Email &&
						!communication.isConfirmed
					);
				},
				action: this.manageCommunications.resendBaseConfirmation.bind(this.manageCommunications),
				icon: Icons.EmailRead,
			},
			{
				title: 'Сделать основным',
				visible: (communication: CommunicationInfo) =>
					communication.type === CommunicationType.Email && communication.isConfirmed,
				action: this.manageCommunications.transformToBaseEmail.bind(this.manageCommunications),
				icon: Icons.StarBorder,
			},
		];
	}

	private canEdit(communication: CommunicationInfo): boolean {
		return (
			(communication.type !== CommunicationType.Email && communication.type !== CommunicationType.BaseEmail) ||
			!communication.isConfirmed
		);
	}
}
