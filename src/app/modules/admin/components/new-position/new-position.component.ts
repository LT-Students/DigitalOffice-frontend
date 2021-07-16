import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PositionApiService } from '@data/api/company-service/services/position-api.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
	selector: 'do-new-position',
	templateUrl: './new-position.component.html',
	styleUrls: ['./new-position.component.scss'],
})
export class NewPositionComponent implements OnInit {
	public positionForm: FormGroup;

	constructor(
		public positionApiService: PositionApiService,
		private formBuilder: FormBuilder,
		private snackBar: MatSnackBar,
		private dialogRef: MatDialogRef<NewPositionComponent>
	) {}

	ngOnInit(): void {
		this.positionForm = this.formBuilder.group({
			name: ['', [Validators.required]],
			description: [null],
		});
	}

	createPosition(): void {
		this.positionApiService
			.addPosition({
				body: {
					name: this.positionForm.controls['name'].value,
					description: this.positionForm.controls['description'].value,
				},
			})
			.subscribe(
				(res) => {
					this.snackBar.open('New position added successfully', 'done', {
						duration: 3000,
					});
					this.dialogRef.close();
				},
				(error: HttpErrorResponse) => {
					let errorMessage = error.error.errors;
					if (error.status === 409) {
						errorMessage = 'Должность с таким названием уже существует';
					}
					this.snackBar.open(errorMessage, 'accept');
					throw error;
				}
			);
	}
}
