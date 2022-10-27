import { Injectable, ViewContainerRef } from '@angular/core';
import { DialogRef } from '@angular/cdk/dialog';
import { DialogService, ModalWidth } from '@shared/component/dialog/dialog.service';
import { AddUsersDialogComponent } from '../add-users-dialog.component';
import { AddUsersDialogData } from '../models';

@Injectable({
	providedIn: 'root',
})
export class AddUsersDialogService {
	constructor(private dialog: DialogService) {}

	public open<R = unknown>(
		data: AddUsersDialogData,
		viewContainerRef?: ViewContainerRef
	): DialogRef<R, AddUsersDialogComponent> {
		return this.dialog.open(AddUsersDialogComponent, {
			width: ModalWidth.M,
			data,
			viewContainerRef,
		});
	}
}
