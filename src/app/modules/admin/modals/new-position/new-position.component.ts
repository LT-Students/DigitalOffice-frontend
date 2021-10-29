import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';
import { PositionService } from '@app/services/position/position.service';

@Component({
	selector: 'do-new-position',
	templateUrl: './new-position.component.html',
	styleUrls: ['./new-position.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewPositionComponent {
	public positionForm: FormGroup;

	constructor(
		private _positionService: PositionService,
		private _formBuilder: FormBuilder,
		private _snackBar: MatSnackBar,
		private _dialogRef: MatDialogRef<NewPositionComponent>
	) {
		this.positionForm = this._formBuilder.group({
			name: ['', [Validators.required]],
			description: [null],
		});
	}

	createPosition(): void {
		this._positionService
			.createPosition({
				name: this.positionForm.controls['name'].value?.trim(),
				description: this.positionForm.controls['description'].value?.trim(),
			})
			.subscribe(
				(result) => {
					this._snackBar.open('Новая должность успешно добавлена', 'done', {
						duration: 3000,
					});
					this._dialogRef.close(result);
				},
				(error: HttpErrorResponse) => {
					let errorMessage = error.error.errors;
					if (error.status === 409) {
						errorMessage = 'Должность с таким названием уже существует';
					}
					this._snackBar.open(errorMessage, 'accept');
					throw error;
				}
			);
	}
}
