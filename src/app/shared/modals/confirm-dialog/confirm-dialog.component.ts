import { Component, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface ConfirmDialogModel {
	title: string;
	message?: string;
	confirmText: string;
}

@Component({
	selector: 'do-confirm-dialog',
	templateUrl: './confirm-dialog.component.html',
	styleUrls: ['./confirm-dialog.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmDialogComponent {
	constructor(@Inject(MAT_DIALOG_DATA) public data: ConfirmDialogModel) {}
}
