import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
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
					this._dialogRef.close(result);
				},
				(error: HttpErrorResponse) => {
					throw error;
				}
			);
	}
}
