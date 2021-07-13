import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PositionApiService } from '@data/api/company-service/services/position-api.service';

@Component({
	selector: 'do-new-position',
	templateUrl: './new-position.component.html',
	styleUrls: ['./new-position.component.scss'],
})
export class NewPositionComponent implements OnInit {
	public positionForm: FormGroup;

	constructor(public positionApiService: PositionApiService, private formBuilder: FormBuilder, private snackBar: MatSnackBar) {}

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
				},
				(error: HttpErrorResponse) => {
					this.snackBar.open(error.error.Message, 'accept');
					throw error;
				}
			);
	}
}
