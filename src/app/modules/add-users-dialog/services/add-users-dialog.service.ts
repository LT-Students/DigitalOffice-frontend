import { Injectable, ViewContainerRef } from '@angular/core';
import { DialogService, ModalWidth } from '@app/services/dialog.service';
import { MatDialogRef } from '@angular/material/dialog/dialog-ref';
import { AddUsersDialogComponent } from '../add-users-dialog.component';
import { AddUsersDialogData } from '../models/models';

@Injectable({
	providedIn: 'root',
})
export class AddUsersDialogService {
	constructor(private dialog: DialogService) {}

	public open<R = unknown>(
		data: AddUsersDialogData,
		viewContainerRef?: ViewContainerRef
	): MatDialogRef<AddUsersDialogComponent, R> {
		return this.dialog.open(AddUsersDialogComponent, {
			width: ModalWidth.M,
			data,
			viewContainerRef,
		});
	}
}
