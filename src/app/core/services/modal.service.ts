import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Team } from '../../modules/admin/components/new-project/team-cards';
import { WorkFlowMode } from '../../modules/employee/employee-page.component';
import { ComponentType } from '@angular/cdk/overlay';
import { MatDialogRef } from '@angular/material/dialog/dialog-ref';

export enum ModalType {
	CREATE,
	DELETE,
	EDIT,
	WATCH,
}

export interface UserSearchModalConfig {
	team?: Team;
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
