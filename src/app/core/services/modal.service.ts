import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ComponentType } from '@angular/cdk/overlay';
import { MatDialogRef } from '@angular/material/dialog/dialog-ref';
import { Team } from '../../modules/admin/components/new-project/team-cards';
import { WorkFlowMode } from '../../modules/employee/employee-page.component';
import { UserInfo } from '@data/api/user-service/models/user-info';

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
	NEW_SPECIALIZATION,
    NEW_ROLE,
	NEW_PROJECT,
	MANAGE_USERS,
	NEW_OFFICE,
	DEPARTMENT_LIST,
}

export interface UserSearchModalConfig {
	team?: Team;
	members?: UserInfo[];
	mode: WorkFlowMode;
}

@Injectable({
	providedIn: 'root',
})
export class ModalService {
	constructor(private matDialog: MatDialog) {}

	public openModal<C, T, R>(component: ComponentType<C>, modalContentConfig?: T, result?: R): MatDialogRef<C, R> {
		return this.matDialog.open<C, T, R>(component, {
			data: modalContentConfig,
			width: '720px',
		});
	}
}
