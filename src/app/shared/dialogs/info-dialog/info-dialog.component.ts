import { Component, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface InfoDialogData {
	title: string;
	message: string;
	buttonText: string;
}

@Component({
	selector: 'do-info-dialog',
	templateUrl: './info-dialog.component.html',
	styleUrls: ['./info-dialog.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfoDialogComponent {
	public title: string;
	public message: string;
	public buttonText: string;

	constructor(@Inject(MAT_DIALOG_DATA) { title, message, buttonText }: InfoDialogData) {
		this.title = title;
		this.message = message;
		this.buttonText = buttonText;
	}
}
