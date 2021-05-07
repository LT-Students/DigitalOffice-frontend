import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Team } from '../../modules/admin/components/new-project/team-cards';
import { WorkFlowMode } from '../../modules/employee/employee-page.component';
import { ComponentType } from '@angular/cdk/overlay';


export enum ModalType {
	CREATE,
	DELETE,
	EDIT,
	WATCH
}

export interface UserSearchModalConfig {
	users: Team,
	mode: WorkFlowMode
}


@Injectable({
	providedIn: 'root'
})
export class ModalService {

	constructor(private matDialog: MatDialog) {}

	public openModal<C, T>(component: ComponentType<C>, modalContentConfig?: T){
		this.matDialog.open<C, T>(component, {
			data: modalContentConfig,
			width: '720px',
		});
	}
}
