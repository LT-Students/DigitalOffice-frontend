import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';

import { OperationResultResponse } from '@data/api/rights-service/models';
import { RightsService } from '@app/services/rights/rights.service';
import { RightResponse } from '@data/api/rights-service/models/right-response';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
	selector: 'do-new-role',
	templateUrl: './new-role.component.html',
	styleUrls: ['./new-role.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewRoleComponent implements OnInit {
	public rights: RightResponse[] = [];

	public roleForm: FormGroup;

	constructor(
		private _rightsService: RightsService,
		private _dialogRef: MatDialogRef<NewRoleComponent>,
		private _fb: FormBuilder,
		private _snackBar: MatSnackBar
	) {
		this.roleForm = this._fb.group({
			name: ['', [Validators.required]],
			description: [''],
			rights: this._fb.array([]),
		});
	}

	ngOnInit(): void {
		this.getRights();
	}

	onCheckboxChange(e: MatCheckboxChange): void {
		const rights: FormArray = this.roleForm?.get('rights') as FormArray;

		if (e.checked) {
			rights.push(new FormControl(e.source.value));
		} else {
			rights.controls.forEach((item: AbstractControl, i: number) => {
				if (item.value === e.source.value) {
					rights.removeAt(i);
					return;
				}
			});
		}
	}

	getRights(): void {
		this._rightsService.findRights().subscribe((rights) => (this.rights = rights));
	}

	createRole(): void {
		this._rightsService
			.createRole({
				name: this.roleForm?.get('name')?.value,
				description: this.roleForm?.get('description')?.value,
				rights: this.roleForm?.get('rights')?.value,
			})
			.subscribe(
				(result: OperationResultResponse) => {
					this._snackBar.open('New role added successfully', 'done', {
						duration: 3000,
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
