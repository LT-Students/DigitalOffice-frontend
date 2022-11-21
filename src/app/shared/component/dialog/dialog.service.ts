import { Injectable } from '@angular/core';
import { Dialog, DialogConfig, DialogRef } from '@angular/cdk/dialog';
import { ComponentType } from '@angular/cdk/overlay';
import { ConfirmDialogComponent, ConfirmDialogData } from '@shared/dialogs/confirm-dialog/confirm-dialog.component';
import { InfoDialogComponent, InfoDialogData } from '@shared/dialogs/info-dialog/info-dialog.component';
import { DialogComponent } from './dialog.component';

export const enum ModalWidth {
	L = '1240px',
	M = '848px',
	S = '552px',
}

@Injectable({
	providedIn: 'root',
})
export class DialogService {
	public get openDialogs(): readonly DialogRef<any, any>[] {
		return this.dialog.openDialogs;
	}

	constructor(private dialog: Dialog) {}

	public open<R = unknown, D = unknown, C = unknown>(
		component: ComponentType<C>,
		config?: DialogConfig<D, DialogRef<R, C>>
	): DialogRef<R, C> {
		// remove transition from backdrop when there's a multiple dialogs to remove flickering when closing and opening
		// dialogs at the same time
		if (this.openDialogs.length) {
			config = {
				...config,
				backdropClass: [
					...(config?.backdropClass || []),
					'no-transition-on-multiple-dialogs',
					'cdk-overlay-dark-backdrop',
				],
			};
		}
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

	public closeAll(): void {
		this.dialog.closeAll();
	}

	public getDialogById(id: string): DialogRef | undefined {
		return this.dialog.getDialogById(id);
	}
}
