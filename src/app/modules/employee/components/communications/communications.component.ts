import { ChangeDetectionStrategy, Component, Input, OnInit, ViewChild } from '@angular/core';
import { CommunicationInfo } from '@api/user-service/models/communication-info';
import { Clipboard } from '@angular/cdk/clipboard';
import { AlertService } from '@app/services/alert.service';
import { Icons } from '@shared/modules/icons/icons';
import { ContextMenu } from '@shared/component/context-menu/context-menu';
import { ContextMenuComponent } from '@shared/component/context-menu/context-menu.component';
import { CommunicationType } from '@api/user-service/models/communication-type';
import { EmployeePageService } from '../../services/employee-page.service';
import { ContextMenuService } from './services/context-menu.service';
import { ManageCommunicationsService } from './services/manage-communications.service';

@Component({
	selector: 'do-communications',
	templateUrl: './communications.component.html',
	styleUrls: ['./communications.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [{ provide: ContextMenu, useClass: ContextMenuService }],
})
export class CommunicationsComponent implements OnInit {
	public readonly Icons = Icons;

	@ViewChild(ContextMenuComponent, { static: true }) menuRef!: ContextMenuComponent;

	@Input()
	set communications(communications: CommunicationInfo[]) {
		this._communications = communications.map(this.transformPhone).sort(this.compareFn);
	}
	get communications(): CommunicationInfo[] {
		return this._communications;
	}
	private _communications: CommunicationInfo[] = [];
	public menuItems = this.contextMenu.getMenuItems();
	public canAdd$ = this.employeePage.canManagePersonalInfo$();

	constructor(
		private employeePage: EmployeePageService,
		private alert: AlertService,
		private clipboard: Clipboard,
		private contextMenu: ContextMenu,
		private manageCommunications: ManageCommunicationsService
	) {}

	public ngOnInit(): void {
		this.contextMenu.setContextMenu(this.menuRef);
	}

	public onCommunicationClick(contact: CommunicationInfo): void {
		const copied = this.clipboard.copy(contact.value);
		if (copied) {
			this.alert.open('Контакт скопирован в буфер обмена', { duration: 3000 });
		}
	}

	public onAddCommunication(): void {
		this.manageCommunications.createCommunication();
	}

	private compareFn(contact1: CommunicationInfo, contact2: CommunicationInfo): number {
		if (contact1.type === CommunicationType.BaseEmail) {
			return -1;
		}

		if (contact2.type === CommunicationType.BaseEmail) {
			return 1;
		}

		if (contact1.type === contact2.type) {
			return 0;
		}

		if (contact1.type === CommunicationType.Email) {
			return -1;
		}

		if (contact1.type && contact2.type && contact1.type < contact2.type) {
			return -1;
		}

		if (contact1.type && contact2.type && contact1.type > contact2.type) {
			return 1;
		}

		return 0;
	}

	private transformPhone(communication: CommunicationInfo): CommunicationInfo {
		if (communication.type === CommunicationType.Phone) {
			communication.value = '+' + communication.value;
		}
		return communication;
	}
}
