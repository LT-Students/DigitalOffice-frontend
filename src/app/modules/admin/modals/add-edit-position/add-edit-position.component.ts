import { Component, ChangeDetectionStrategy, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PositionService } from '@app/services/position/position.service';
import { DoValidators } from '@app/validators/do-validators';
import { InitialDataEditRequest, PositionPath } from '@app/types/edit-request';
import { UUID } from '@app/types/uuid.type';
import { EMPTY, iif, Observable } from 'rxjs';
import { OperationResultResponse } from '@app/types/operation-result-response.interface';
import { createEditRequest } from '@app/utils/utils';
import { PositionInfo } from '@data/api/position-service/models/position-info';

@Component({
	selector: 'do-new-position',
	templateUrl: './add-edit-position.component.html',
	styleUrls: ['./add-edit-position.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddEditPositionComponent {
	public EditPath = PositionPath;

	public positionForm: FormGroup;
	public isEditMode: boolean;
	private readonly _positionInfo?: InitialDataEditRequest<PositionPath> & { id: UUID };

	constructor(
		@Inject(MAT_DIALOG_DATA) positionInfo: Required<PositionInfo>,
		private _fb: FormBuilder,
		private _positionService: PositionService,
		private _dialogRef: MatDialogRef<AddEditPositionComponent>
	) {
		this.isEditMode = !!positionInfo;

		this.positionForm = this._fb.group({
			[PositionPath.NAME]: ['', [Validators.required, DoValidators.noWhitespaces]],
			[PositionPath.DESCRIPTION]: ['', [DoValidators.noWhitespaces]],
		});

		if (this.isEditMode) {
			this._positionInfo = {
				id: positionInfo.id,
				[PositionPath.NAME]: positionInfo.name,
				[PositionPath.DESCRIPTION]: positionInfo.description,
			};
			this.positionForm.patchValue(this._positionInfo);
		}
	}

	public onSubmit(): void {
		iif(() => this.isEditMode, this._editPosition(), this._createPosition()).subscribe({
			next: (result) => this._dialogRef.close(result),
			error: (error) => {
				throw error;
			},
		});
	}

	private _createPosition(): Observable<OperationResultResponse<any>> {
		return this._positionService.createPosition({
			name: this.positionForm.get(PositionPath.NAME)?.value?.trim(),
			description: this.positionForm.get(PositionPath.DESCRIPTION)?.value?.trim(),
		});
	}

	private _editPosition(): Observable<OperationResultResponse<any>> {
		if (!this._positionInfo) {
			return EMPTY;
		}

		const { id, ...officeInfo } = this._positionInfo;
		const editRequest = createEditRequest(this.positionForm.getRawValue(), officeInfo);
		return this._positionService.editPosition(id, editRequest);
	}
}
