import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ComponentType } from '@angular/cdk/overlay';
import { ConfirmDialogComponent, ConfirmDialogData } from '@shared/dialogs/confirm-dialog/confirm-dialog.component';

export const enum ModalWidth {
	L = '1240px',
	M = '848px',
	S = '552px',
}

/**
 * @deprecated instead use DialogService from Shared Module
 */
@Injectable({
	providedIn: 'root',
})
export class DialogService {
	constructor(private matDialog: MatDialog) {}

	public confirm(confirmData: ConfirmDialogData): MatDialogRef<ConfirmDialogComponent> {
		return this.matDialog.open(ConfirmDialogComponent, { data: confirmData, width: ModalWidth.S });
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
}
