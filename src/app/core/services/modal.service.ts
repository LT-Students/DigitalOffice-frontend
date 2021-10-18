import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ComponentType } from '@angular/cdk/overlay';
import { MatDialogRef } from '@angular/material/dialog/dialog-ref';
import { UserInfo } from '@data/api/user-service/models/user-info';
import { WorkFlowMode } from '../../modules/employee/employee-page.component';
import { Team } from '../../modules/admin/components/new-project/team-cards';
import { ConfirmDialogComponent, ConfirmDialogData } from '../../shared/modals/confirm-dialog/confirm-dialog.component';
import { PostComponent } from '../../modules/news/components/post/post.component';

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
	POSITION_LIST,
}

export interface UserSearchModalConfig {
	team?: Team;
	members?: UserInfo[];
	mode: WorkFlowMode;
}

export const enum ModalWidth {
	XL = '720px',
	L = '672px',
	M = '550px',
	S = '440px',
}

@Injectable({
	providedIn: 'root',
})
export class ModalService {
	constructor(private _matDialog: MatDialog) {}

	public openModal<C, T, R>(
		component: ComponentType<C>,
		modalWidth?: ModalWidth,
		modalContentConfig?: T,
		result?: R
	): MatDialogRef<C, R> {
		return this._matDialog.open<C, T, R>(component, {
			data: modalContentConfig,
			width: modalWidth,
			role: 'alertdialog',
		});
	}

	public confirm(confirmData: ConfirmDialogData): MatDialogRef<ConfirmDialogComponent, ConfirmDialogData> {
		return this._matDialog.open(ConfirmDialogComponent, { data: confirmData, width: ModalWidth.M });
	}

	public fullScreen<C, T, R = any>(component: ComponentType<C>, data?: T): MatDialogRef<C, R> {
		return this._matDialog.open(component, {
			maxHeight: `100vh`,
			maxWidth: '100vw',
			height: `100%`,
			width: '100%',
			data: data,
			autoFocus: false,
			panelClass: 'dialog-border-radius-none',
		});
	}
}
