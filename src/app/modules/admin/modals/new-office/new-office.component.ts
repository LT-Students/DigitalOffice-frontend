//@ts-nocheck
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OfficeApiService } from '@data/api/company-service/services/office-api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
	selector: 'do-new-office',
	templateUrl: './new-office.component.html',
	styleUrls: ['./new-office.component.scss'],
changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewOfficeComponent implements OnInit {
	public officeForm: FormGroup;

	constructor(
		private formBuilder: FormBuilder, 
		private officeApiService: OfficeApiService,
		private snackBar: MatSnackBar,
		private dialogRef: MatDialogRef<NewOfficeComponent>
		) {}

	ngOnInit(): void {
		this.officeForm = this.formBuilder.group({
			city: ['', [Validators.required]],
			address: ['', [Validators.required]],
			name: [''],
		});
	}

	createOffice(): void {
		this.officeApiService
			.createOffice({
				body: {
					city: this.officeForm.get('city').value,
					address: this.officeForm.get('address').value,
					name: this.officeForm.get('name').value,
				},
			})
			.subscribe(
				(res) => {
					this.snackBar.open('New office added successfully', 'done', {
						duration: 3000
					});
					this.dialogRef.close();
				},
				(error: HttpErrorResponse) => {
					this.snackBar.open(error.error.Message, 'accept');
					throw error;
				}
			);
	}
}
