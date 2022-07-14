import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ComponentType } from '@angular/cdk/overlay';
import { MatDialogRef } from '@angular/material/dialog/dialog-ref';
import { ConfirmDialogComponent, ConfirmDialogData } from '@shared/modals/confirm-dialog/confirm-dialog.component';
import { InfoDialogComponent, InfoDialogData } from '@shared/modals/info-dialog/info-dialog.component';

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
	constructor(private matDialog: MatDialog) {}

	/**
	 * @deprecated use 'open' method
	 */
	public openModal<C, T = any, R = any>(
		component: ComponentType<C>,
		modalWidth?: ModalWidth,
		modalContentConfig?: T,
		result?: R
	): MatDialogRef<C, R> {
		return this.matDialog.open<C, T, R>(component, {
			data: modalContentConfig,
			width: modalWidth,
			role: 'alertdialog',
		});
	}

	public open<R, C = any, D = any>(component: ComponentType<C>, config?: MatDialogConfig<D>): MatDialogRef<C, R> {
		return this.matDialog.open(component, config);
	}

	public confirm(confirmData: ConfirmDialogData): MatDialogRef<ConfirmDialogComponent> {
		return this.matDialog.open(ConfirmDialogComponent, { data: confirmData, width: ModalWidth.M });
	}

	public info(infoData: InfoDialogData): MatDialogRef<InfoDialogComponent> {
		return this.matDialog.open(InfoDialogComponent, { data: infoData, width: ModalWidth.M });
	}

	public fullScreen<C, T, R = any>(component: ComponentType<C>, data?: T): MatDialogRef<C, R> {
		return this.matDialog.open(component, {
			maxHeight: '100vh',
			maxWidth: '100vw',
			height: '100%',
			width: '100%',
			data: data,
			autoFocus: false,
			panelClass: 'dialog-border-radius-none',
		});
	}

	public closeAll(): void {
		this.matDialog.closeAll();
	}
}
