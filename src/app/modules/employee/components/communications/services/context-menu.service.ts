import { Injectable } from '@angular/core';
import { ContextMenu } from '@shared/component/context-menu/context-menu';
import { MenuItem } from '@app/models/menu-item';
import { Icons } from '@shared/modules/icons/icons';
import { CommunicationInfo } from '@api/user-service/models/communication-info';
import { CommunicationType } from '@api/user-service/models/communication-type';
import { ContextMenuComponent } from '@shared/component/context-menu/context-menu.component';
import { ManageCommunicationsService } from './manage-communications.service';

@Injectable()
export class ContextMenuService implements ContextMenu {
	private contextMenu?: ContextMenuComponent;

	constructor(private manageCommunications: ManageCommunicationsService) {}

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
				visible: (communication: CommunicationInfo) =>
					communication.type === CommunicationType.Email && !communication.isConfirmed,
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
