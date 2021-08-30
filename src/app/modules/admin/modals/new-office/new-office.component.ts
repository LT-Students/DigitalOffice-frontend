import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OfficeService } from '@app/services/company/office.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialogRef } from '@angular/material/dialog';

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
			city: ['', [Validators.required]],
			address: ['', [Validators.required]],
			name: [''],
		});
	}

	createOffice(): void {
		this._officeService
			.createOffice({
				city: this.officeForm.get('city')?.value,
				address: this.officeForm.get('address')?.value,
				name: this.officeForm.get('name')?.value,
			})
			.subscribe(
				(result) => {
					this._snackBar.open('Новый офис успешно добавлен', 'done', {
						duration: 3000
					});
					this._dialogRef.close(result);
				},
				(error: HttpErrorResponse) => {
					this._snackBar.open(error.error.Message, 'accept');
					throw error;
				}
			);
	}
}
