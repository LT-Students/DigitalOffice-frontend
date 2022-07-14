import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarRef } from '@angular/material/snack-bar';

@Injectable({
	providedIn: 'root',
})
export class AlertService {
	private defaultConfig: MatSnackBarConfig = {
		// duration: 10000
	};

	constructor(private snackBar: MatSnackBar) {}

	public open(message: string, config?: MatSnackBarConfig): MatSnackBarRef<any> {
		return this.snackBar.open(message, '×', { ...this.defaultConfig, ...config });
	}
}
