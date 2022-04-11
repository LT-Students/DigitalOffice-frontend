import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BehaviorSubject, EMPTY, iif, Observable } from 'rxjs';
import { UserService } from '@app/services/user/user.service';
import { finalize, map } from 'rxjs/operators';
import { UserInfo } from '@api/user-service/models/user-info';
import { DepartmentService, ICreateUserRequest } from '@app/services/department/department.service';
import { DepartmentPath, InitialDataEditRequest } from '@app/types/edit-request';
import { OperationResultResponse } from '@app/types/operation-result-response.interface';
import { createEditRequest } from '@app/utils/utils';
import { DepartmentInfo } from '@api/department-service/models/department-info';
import { UUID } from '@app/types/uuid.type';
import { DoValidators } from '@app/validators/do-validators';
import { DepartmentUserRole } from '@api/department-service/models/department-user-role';
import { HttpErrorResponse } from '@angular/common/http';

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
		public _userService: UserService,
		public _departmentService: DepartmentService,
		private _dialogRef: MatDialogRef<AddEditDepartmentComponent>,
		private _formBuilder: FormBuilder,
		@Inject(MAT_DIALOG_DATA) departmentInfo: Required<DepartmentInfo>
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
			[DepartmentPath.DIRECTOR_ID]: [null],
		});
		this.isEdit = !!departmentInfo;
		this.loading$$ = new BehaviorSubject<boolean>(false);

		if (this.isEdit) {
			this._departmentInfo = {
				id: departmentInfo.id,
				[DepartmentPath.NAME]: departmentInfo.name,
				[DepartmentPath.DESCRIPTION]: departmentInfo.description,
				[DepartmentPath.DIRECTOR_ID]: departmentInfo.director?.user?.id,
			};
			this.departmentForm.patchValue(this._departmentInfo);
		}

		this.directors$ = this._userService.findUsers({ skipCount: 0, takeCount: 500, includedepartment: true }).pipe(
			map((response) => response.body ?? []),
			map((users) => {
				if (this.isEdit) {
					// return users.filter((user) => user.department?.id === this._departmentInfo?.id);
					return users.filter((user) => user.isActive);
				}
				return users;
			})
		);
	}

	public createDepartment(): Observable<OperationResultResponse<any>> {
		const directorId: string | undefined = this.departmentForm.get(DepartmentPath.DIRECTOR_ID)?.value ?? undefined;

		const director: ICreateUserRequest | undefined = directorId
			? {
					userId: directorId,
					role: DepartmentUserRole.Director,
			  }
			: undefined;

		console.log(director);

		return this._departmentService.createDepartment({
			name: this.departmentForm.get(DepartmentPath.NAME)?.value?.trim(),
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
