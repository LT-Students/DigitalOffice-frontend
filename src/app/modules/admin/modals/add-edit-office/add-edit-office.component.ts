import { Component, ChangeDetectionStrategy, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OfficeService } from '@app/services/company/office.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DoValidators } from '@app/validators/do-validators';
import { OfficeInfo } from '@api/office-service/models/office-info';
import { InitialDataEditRequest, OfficePath } from '@app/types/edit-request';
import { createEditRequest } from '@app/utils/utils';
import { UUID } from '@app/types/uuid.type';
import { BehaviorSubject, EMPTY, iif, Observable } from 'rxjs';
import { OperationResultResponse } from '@app/types/operation-result-response.interface';
import { finalize } from 'rxjs/operators';

@Component({
	selector: 'do-new-office',
	templateUrl: './add-edit-office.component.html',
	styleUrls: ['./add-edit-office.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddEditOfficeComponent {
	public EditPath = OfficePath;

	public officeForm: FormGroup;
	public isEditMode: boolean;
	public loading$$: BehaviorSubject<boolean>;
	private readonly _officeInfo?: InitialDataEditRequest<OfficePath> & { id: UUID };

	constructor(
		@Inject(MAT_DIALOG_DATA) officeInfo: Required<OfficeInfo>,
		private _fb: FormBuilder,
		private _officeService: OfficeService,
		private _dialogRef: MatDialogRef<AddEditOfficeComponent>
	) {
		this.isEditMode = !!officeInfo;
		this.loading$$ = new BehaviorSubject<boolean>(false);

		this.officeForm = this._fb.group({
			[OfficePath.CITY]: ['', [Validators.required, DoValidators.noWhitespaces]],
			[OfficePath.ADDRESS]: ['', [Validators.required, DoValidators.noWhitespaces]],
			[OfficePath.NAME]: ['', [DoValidators.noWhitespaces]],
		});

		if (this.isEditMode) {
			this._officeInfo = {
				id: officeInfo.id,
				[OfficePath.CITY]: officeInfo.city,
				[OfficePath.ADDRESS]: officeInfo.address,
				[OfficePath.NAME]: officeInfo.name,
			};
			this.officeForm.patchValue(this._officeInfo);
		}
	}

	public onSubmit(): void {
		this.loading$$.next(true);
		iif(() => this.isEditMode, this._editOffice(), this._createOffice())
			.pipe(finalize(() => this.loading$$.next(false)))
			.subscribe({
				next: (result) => this._dialogRef.close(result),
				error: (error) => {
					throw error;
				},
			});
	}

	private _createOffice(): Observable<OperationResultResponse<any>> {
		return this._officeService.createOffice({
			city: this.officeForm.get(OfficePath.CITY)?.value?.trim(),
			address: this.officeForm.get(OfficePath.ADDRESS)?.value?.trim(),
			name: this.officeForm.get(OfficePath.NAME)?.value?.trim(),
		});
	}

	private _editOffice(): Observable<OperationResultResponse<any>> {
		if (!this._officeInfo) {
			return EMPTY;
		}

		const { id, ...officeInfo } = this._officeInfo;
		const editRequest = createEditRequest(this.officeForm.getRawValue(), officeInfo);
		return this._officeService.editOffice(id, editRequest);
	}
}
