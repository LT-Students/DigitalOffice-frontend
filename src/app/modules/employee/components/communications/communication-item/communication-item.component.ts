import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { CommunicationInfo } from '@api/user-service/models/communication-info';
import { Icons } from '@shared/modules/icons/icons';
import { CommunicationType } from '@api/user-service/models';
import { ContextMenu } from '@shared/component/context-menu/context-menu';
import { EmployeePageService } from '../../../services/employee-page.service';

@Component({
	selector: 'do-communication-item',
	templateUrl: './communication-item.component.html',
	styleUrls: ['./communication-item.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommunicationItemComponent implements OnInit {
	public readonly Icons = Icons;
	public readonly CommunicationType = CommunicationType;

	@Input() communication!: CommunicationInfo;
	public canEdit$ = this.employeePage.canManagePersonalInfo$();

	constructor(private contextMenu: ContextMenu, private employeePage: EmployeePageService) {}

	ngOnInit(): void {}

	public openContextMenu(event: MouseEvent): void {
		event.stopPropagation();
		this.contextMenu.openContextMenu(event, this.communication);
	}
}
