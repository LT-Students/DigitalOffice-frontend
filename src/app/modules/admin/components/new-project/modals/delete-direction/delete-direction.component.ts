//@ts-nocheck
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface ModalApprovalConfig {
	text: {
		main: string;
		additional?: string;
	};
	actions: {
		negative: string;
		positive: string;
	};
}

export enum ModalResult {
	NEGATIVE,
	POSITIVE,
}

@Component({
	selector: 'do-delete-direction',
	templateUrl: './delete-direction.component.html',
	styleUrls: ['./delete-direction.component.scss'],
})
export class DeleteDirectionComponent implements OnInit {
	constructor(@Inject(MAT_DIALOG_DATA) public data: ModalApprovalConfig) {}

	ngOnInit(): void {}
}
