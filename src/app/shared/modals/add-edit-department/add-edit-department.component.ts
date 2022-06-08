import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BehaviorSubject, EMPTY, iif, Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';
import { UserInfo } from '@api/filter-service/models/user-info';
import { DepartmentService } from '@app/services/department/department.service';
import { DepartmentPath, InitialDataEditRequest } from '@app/types/edit-request';
import { OperationResultResponse } from '@app/types/operation-result-response.interface';
import { createEditRequest } from '@app/utils/utils';
import { DepartmentInfo } from '@api/department-service/models/department-info';
import { UUID } from '@app/types/uuid.type';
import { DoValidators } from '@app/validators/do-validators';
import { DepartmentUserRole } from '@api/department-service/models/department-user-role';
import { HttpErrorResponse } from '@angular/common/http';
import { FilterService } from '@app/services/filter/filter.service';
import { CreateUserRequest } from '@api/department-service/models/create-user-request';
import { DepartmentUserAssignment } from '@api/department-service/models/department-user-assignment';

@Component({
	selector: 'do-new-department',
	templateUrl: './add-edit-department.component.html',
	styleUrls: ['./add-edit-department.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddEditDepartmentComponent {
	public EditPath = DepartmentPath;

	public directors$: Observable<UserInfo[] | undefined>;
	public departmentForm: FormGroup;
	public isEdit: boolean;
	public loading$$: BehaviorSubject<boolean>;
	private readonly _departmentInfo?: InitialDataEditRequest<DepartmentPath> & { id: UUID };

	constructor(
		public filterService: FilterService,
		public _departmentService: DepartmentService,
		private _dialogRef: MatDialogRef<AddEditDepartmentComponent>,
		private _formBuilder: FormBuilder,
		@Inject(MAT_DIALOG_DATA)
		data?: { departmentInfo: Required<DepartmentInfo>; directors$: Observable<UserInfo[]> }
	) {
		this.departmentForm = this._formBuilder.group({
			[DepartmentPath.NAME]: [
				'',
				[
					Validators.required,
					DoValidators.noWhitespaces,
					DoValidators.matchMinLength(3),
					DoValidators.oneSpaceBetweenWords,
				],
			],
			[DepartmentPath.DESCRIPTION]: [null],
			// [DepartmentPath.DIRECTOR_ID]: [null],
		});
		this.isEdit = !!data?.departmentInfo;
		this.loading$$ = new BehaviorSubject<boolean>(false);

		if (this.isEdit && data) {
			this._departmentInfo = {
				id: data.departmentInfo.id,
				[DepartmentPath.NAME]: data.departmentInfo.name,
				[DepartmentPath.DESCRIPTION]: data.departmentInfo.description,
				// [DepartmentPath.DIRECTOR_ID]: data.departmentInfo.director?.user?.id,
			};
			this.departmentForm.patchValue(this._departmentInfo);
		}

		this.directors$ =
			data?.directors$ ??
			this.filterService
				.filterUsers({ skipCount: 0, takeCount: 500 })
				.pipe(map((response) => response.body ?? []));
	}

	public createDepartment(): Observable<OperationResultResponse<any>> {
		// const directorId: string | undefined = this.departmentForm.get(DepartmentPath.DIRECTOR_ID)?.value ?? undefined;
		const directorId = undefined;

		const director: CreateUserRequest | undefined = directorId
			? {
					userId: directorId,
					role: DepartmentUserRole.Manager,
					assignment: DepartmentUserAssignment.Director,
			  }
			: undefined;

		return this._departmentService.createDepartment({
			name: this.departmentForm.get(DepartmentPath.NAME)?.value?.trim(),
			shortName: '',
			description: this.departmentForm.get(DepartmentPath.DESCRIPTION)?.value?.trim(),
			users: director ? [director] : [],
		});
	}

	public editDepartment(): Observable<OperationResultResponse<any>> {
		if (!this._departmentInfo) {
			return EMPTY;
		}

		const { id, ...departmentInfo } = this._departmentInfo;
		const editRequest = createEditRequest(this.departmentForm.getRawValue(), departmentInfo);
		return this._departmentService.editDepartment(id, editRequest);
	}

	public onSubmitDepartmentForm(): void {
		this.loading$$.next(true);
		iif(() => this.isEdit, this.editDepartment(), this.createDepartment())
			.pipe(finalize(() => this.loading$$.next(false)))
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
