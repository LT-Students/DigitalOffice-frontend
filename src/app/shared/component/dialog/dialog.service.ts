import { Injectable } from '@angular/core';
import { Dialog, DialogConfig, DialogRef } from '@angular/cdk/dialog';
import { ComponentType } from '@angular/cdk/overlay';
import { ModalWidth } from '@app/services/dialog.service';
import { ConfirmDialogComponent, ConfirmDialogData } from '@shared/dialogs/confirm-dialog/confirm-dialog.component';
import { InfoDialogComponent, InfoDialogData } from '@shared/dialogs/info-dialog/info-dialog.component';
import { DialogComponent } from './dialog.component';

@Injectable({
	providedIn: 'root',
})
export class DialogService {
	constructor(private dialog: Dialog) {}

	public open<R = unknown, D = unknown, C = unknown>(
		component: ComponentType<C>,
		config?: DialogConfig<D, DialogRef<R, C>>
	): DialogRef<R, C> {
		return this.dialog.open(component, {
			container: DialogComponent,
			...config,
		});
	}
	public confirm<R = any>(confirmData: ConfirmDialogData): DialogRef<R, ConfirmDialogComponent> {
		return this.open(ConfirmDialogComponent, { data: confirmData, width: ModalWidth.S });
	}

	public info(infoData: InfoDialogData): DialogRef<unknown, InfoDialogComponent> {
		return this.open(InfoDialogComponent, { data: infoData, width: ModalWidth.S });
	}
}
