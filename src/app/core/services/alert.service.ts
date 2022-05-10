import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarRef } from '@angular/material/snack-bar';

@Injectable({
	providedIn: 'root',
})
export class AlertService {
	private config: MatSnackBarConfig = {
		duration: 10000
	};

	constructor(private snackBar: MatSnackBar) {}

	public open(message: string): MatSnackBarRef<any> {
		return this.snackBar.open(message, '×', this.config);
	}
}
