import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OfficeService } from '@app/services/company/office.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialogRef } from '@angular/material/dialog';
import { DoValidators } from '@app/validators/do-validators';

@Component({
	selector: 'do-new-office',
	templateUrl: './new-office.component.html',
	styleUrls: ['./new-office.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewOfficeComponent {
	public officeForm: FormGroup;

	constructor(
		private _fb: FormBuilder,
		private _officeService: OfficeService,
		private _snackBar: MatSnackBar,
		private _dialogRef: MatDialogRef<NewOfficeComponent>
	) {
		this.officeForm = this._fb.group({
			city: ['', [Validators.required, DoValidators.noWhitespaces]],
			address: ['', [Validators.required, DoValidators.noWhitespaces]],
			name: ['', [Validators.required, DoValidators.noWhitespaces]],
		});
	}

	createOffice(): void {
		this._officeService
			.createOffice({
				city: this.officeForm.get('city')?.value?.trim(),
				address: this.officeForm.get('address')?.value?.trim(),
				name: this.officeForm.get('name')?.value?.trim(),
			})
			.subscribe(
				(result) => {
					this._snackBar.open('Новый офис успешно добавлен!', 'x', {
						duration: 3000
					});
					this._dialogRef.close(result);
				},
				(error: HttpErrorResponse) => {
					// error.error.message === undefined, поэтому так
					this._snackBar.open('Что-то пошло не так :(', 'accept');
					throw error;
				}
			);
	}
}
