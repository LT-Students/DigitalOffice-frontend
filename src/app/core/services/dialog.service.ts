import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ComponentType } from '@angular/cdk/overlay';
import { MatDialogRef } from '@angular/material/dialog/dialog-ref';
import { ConfirmDialogComponent, ConfirmDialogData } from '@shared/modals/confirm-dialog/confirm-dialog.component';
import { UserRecoveryComponent } from '@shared/modals/user-recovery/user-recovery.component';
import { CommunicationInfo } from '@api/user-service/models/communication-info';

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
	COMPANY_SETTINGS,
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
export class DialogService {
	constructor(private _matDialog: MatDialog) {}

	/**
	 * @deprecated use 'open' method
	 */
	public openModal<C, T = any, R = any>(
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

	public open<R, C = any, D = any>(component: ComponentType<C>, config: MatDialogConfig<D>): MatDialogRef<C, R> {
		return this._matDialog.open(component, config);
	}

	public recoverUser(
		userId: string,
		emails: CommunicationInfo[],
		isPending: boolean
	): MatDialogRef<UserRecoveryComponent, CommunicationInfo | undefined> {
		return this.open(UserRecoveryComponent, {
			width: ModalWidth.M,
			data: { userId, emails, isPending },
		});
	}

	public confirm(confirmData: ConfirmDialogData): MatDialogRef<ConfirmDialogComponent, boolean> {
		return this._matDialog.open(ConfirmDialogComponent, { data: confirmData, width: ModalWidth.M });
	}

	public fullScreen<C, T, R = any>(component: ComponentType<C>, data?: T): MatDialogRef<C, R> {
		return this._matDialog.open(component, {
			maxHeight: '100vh',
			maxWidth: '100vw',
			height: '100%',
			width: '100%',
			data: data,
			autoFocus: false,
			panelClass: 'dialog-border-radius-none',
		});
	}
}
