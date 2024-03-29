import { Component, ChangeDetectionStrategy, Inject } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { OfficeService } from '@app/services/company/office.service';
import { DoValidators } from '@app/validators/do-validators';
import { OfficeInfo } from '@api/office-service/models/office-info';
import { InitialDataEditRequest, OfficePath } from '@app/types/edit-request';
import { createEditRequest } from '@app/utils/utils';
import { UUID } from '@app/types/uuid.type';
import { BehaviorSubject, EMPTY, iif, Observable } from 'rxjs';
import { OperationResultResponse } from '@app/types/operation-result-response.interface';
import { finalize } from 'rxjs/operators';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';

@Component({
	selector: 'do-new-office',
	templateUrl: './add-edit-office.component.html',
	styleUrls: ['./add-edit-office.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddEditOfficeComponent {
	public EditPath = OfficePath;

	public officeForm: UntypedFormGroup;
	public isEditMode: boolean;
	public loading$$: BehaviorSubject<boolean>;
	private readonly _officeInfo?: InitialDataEditRequest<OfficePath> & { id: UUID };
	public readonly MAX_CITY_LENGTH = 200;

	constructor(
		@Inject(DIALOG_DATA) officeInfo: Required<OfficeInfo>,
		private _fb: UntypedFormBuilder,
		private _officeService: OfficeService,
		private _dialogRef: DialogRef
	) {
		this.isEditMode = !!officeInfo;
		this.loading$$ = new BehaviorSubject<boolean>(false);

		this.officeForm = this._fb.group({
			[OfficePath.CITY]: [
				'',
				[Validators.required, DoValidators.noWhitespaces, DoValidators.matchMaxLength(200)],
			],
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
			name: this.officeForm.get(OfficePath.NAME)?.value?.trim() || undefined,
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
