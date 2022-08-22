import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';
import { Icons } from '@shared/modules/icons/icons';

@Component({
	selector: 'do-snackbar',
	template: `
		<div class="flex flex_jc_space-between flex_ai_center">
			<span class="text-light_3" [innerHTML]="message"></span>
			<button class="text-light_3" doButton (click)="close()">
				<mat-icon [svgIcon]="Icons.Close"></mat-icon>
			</button>
		</div>
	`,
	styles: [],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SnackbarComponent implements OnInit {
	public readonly Icons = Icons;

	public message: string;

	constructor(
		@Inject(MAT_SNACK_BAR_DATA) data: { message: string },
		private snackbarRef: MatSnackBarRef<SnackbarComponent>
	) {
		this.message = data.message;
	}

	ngOnInit(): void {}

	public close(): void {
		this.snackbarRef.dismiss();
	}
}
