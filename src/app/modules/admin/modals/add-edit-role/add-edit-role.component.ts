import { Component, ChangeDetectionStrategy, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { RightInfo, RoleInfo } from '@api/rights-service/models';
import { RightsService } from '@app/services/rights/rights.service';
import { DoValidators } from '@app/validators/do-validators';
import { BehaviorSubject, iif, Observable } from 'rxjs';
import { finalize, map, tap } from 'rxjs/operators';
import { OperationResultResponse } from '@app/types/operation-result-response.interface';

@Component({
	selector: 'do-new-role',
	templateUrl: './add-edit-role.component.html',
	styleUrls: ['./add-edit-role.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddEditRoleComponent implements OnInit {
	public rights$!: Observable<RightInfo[]>;
	public roleForm: FormGroup;
	public isEditMode: boolean;
	public loading$$: BehaviorSubject<boolean>;
	public readonly roleInfo?: RoleInfo;
	public readonly MAX_NAME_LENGTH = 80;
	public readonly MAX_DESCRIPTION_LENGTH = 300;

	constructor(
		@Inject(MAT_DIALOG_DATA) roleInfo: RoleInfo,
		private _rightsService: RightsService,
		private _dialogRef: MatDialogRef<AddEditRoleComponent>,
		private _fb: FormBuilder
	) {
		this.isEditMode = !!roleInfo;
		this.loading$$ = new BehaviorSubject<boolean>(false);
		this.roleForm = this._fb.group({
			name: ['', [Validators.required, DoValidators.noWhitespaces]],
			description: ['', [DoValidators.noWhitespaces]],
			rights: this._fb.group({}, { validators: DoValidators.atLeastOneChecked }),
		});

		if (this.isEditMode) {
			this.roleInfo = roleInfo;
		}
	}

	public ngOnInit() {
		this.rights$ = this._rightsService.findRights().pipe(
			map((response) => response.body ?? []),
			tap((rights) => {
				const rightsGroup = this.roleForm.get('rights') as FormGroup;
				rights.forEach((r) => {
					rightsGroup.addControl(r.rightId + '', new FormControl(false));
				});

				if (this.isEditMode) {
					this.roleForm.patchValue({ name: this.roleInfo?.localizations?.[0].name });
					this.roleInfo?.rights?.forEach((r) => rightsGroup.get(r?.rightId + '')?.setValue(true));
				}
			})
		);
	}

	public onSubmit(): void {
		this.loading$$.next(true);
		iif(() => this.isEditMode, this._editRole(), this._createRole())
			.pipe(finalize(() => this.loading$$.next(false)))
			.subscribe({
				next: (result) => this._dialogRef.close(result),
				error: (error) => {
					throw error;
				},
			});
	}

	private _createRole(): Observable<OperationResultResponse<any>> {
		return this._rightsService.createRole({
			localizations: [
				{
					name: this.roleForm?.get('name')?.value?.trim(),
					description: this.roleForm?.get('description')?.value?.trim(),
					locale: 'ru',
				},
			],
			rights: this._retrieveRightIdsArray(),
		});
	}

	private _editRole(): Observable<OperationResultResponse<any>> {
		return this._rightsService.editRoleRightsSet(this.roleInfo?.id ?? '', this._retrieveRightIdsArray());
	}

	private _retrieveRightIdsArray(): number[] {
		const rightsGroup = this.roleForm?.get('rights') as FormGroup;

		return Object.keys(rightsGroup.controls)
			.filter((k) => rightsGroup.get(k)?.value)
			.map(Number);
	}
}
