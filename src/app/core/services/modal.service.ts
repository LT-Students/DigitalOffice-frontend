import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ComponentType } from '@angular/cdk/overlay';
import { MatDialogRef } from '@angular/material/dialog/dialog-ref';
import { UserInfo } from '@data/api/user-service/models/user-info';
import { WorkFlowMode } from '../../modules/employee/employee-page.component';
import { Team } from '../../modules/admin/components/new-project/team-cards';

export enum ModalType {
	CREATE,
	DELETE,
	EDIT,
	WATCH,
}

export enum AdminDashboardModalType {
	NEW_COMPANY,
	NEW_EMPLOYEE,
	NEW_DEPARTMENT,
	NEW_POSITION,
    NEW_ROLE,
	NEW_PROJECT,
	MANAGE_USERS,
	MANAGE_ROLES,
	NEW_OFFICE,
	DEPARTMENT_LIST,
	OFFICE_LIST,
	POSITION_LIST
}

export interface UserSearchModalConfig {
	team?: Team;
	members?: UserInfo[];
	mode: WorkFlowMode;
}

export const enum ModalWidth {
	Download = '720px',
	Remove = '440px',
	NewCard = '672px',
	Cancel = '550px',
	ClosingCard = '700px',
	Thumbnail = '647px',
	Photo = '509px'
}


@Injectable({
	providedIn: 'root',
})
export class ModalService {
	constructor(private matDialog: MatDialog) {}

	public openModal<C, T, R>(component: ComponentType<C>, modalContentConfig?: T, result?: R, modalWidth?: ModalWidth): MatDialogRef<C, R> {
		return this.matDialog.open<C, T, R>(component, {
			data: modalContentConfig,
			width: modalWidth
		});
	}
}
