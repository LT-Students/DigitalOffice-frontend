import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';

import { OperationResultResponse, RightInfo } from '@data/api/rights-service/models';
import { RightsService } from '@app/services/rights/rights.service';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { DoValidators } from '@app/validators/do-validators';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
	selector: 'do-new-role',
	templateUrl: './new-role.component.html',
	styleUrls: ['./new-role.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewRoleComponent {
	public rights$: Observable<RightInfo[]>;
	public roleForm: FormGroup;

	constructor(
		private _rightsService: RightsService,
		private _dialogRef: MatDialogRef<NewRoleComponent>,
		private _fb: FormBuilder
	) {
		this.rights$ = this._rightsService.findRights().pipe(tap(console.log));
		this.roleForm = this._fb.group({
			name: ['', [Validators.required, DoValidators.noWhitespaces]],
			description: [''],
			rights: this._fb.array([], [DoValidators.atLeastOneChecked]),
		});
	}

	public onCheckboxChange(e: MatCheckboxChange): void {
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

	public createRole(): void {
		this._rightsService
			.createRole({
				localizations: [
					{
						name: this.roleForm?.get('name')?.value?.trim(),
						description: this.roleForm?.get('description')?.value?.trim(),
						locale: 'ru',
					},
				],
				rights: this.roleForm?.get('rights')?.value,
			})
			.subscribe(
				(result: OperationResultResponse) => {
					this._dialogRef.close(result);
				},
				(error: HttpErrorResponse) => {
					throw error;
				}
			);
	}
}
