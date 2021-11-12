import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from '@app/services/user/user.service';
import { map } from 'rxjs/operators';
import { UserInfo } from '@data/api/user-service/models/user-info';
import { OperationResultResponse } from '@data/api/company-service/models/operation-result-response';
import { PatchDepartmentDocument } from '@data/api/department-service/models/patch-department-document';
import { DepartmentService } from '@app/services/department/department.service';
import { DepartmentPath } from '@app/types/patch-paths';
import { EditModalContent } from '../../components/department-card/department-card.component';

@Component({
	selector: 'do-new-department',
	templateUrl: './new-department.component.html',
	styleUrls: ['./new-department.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewDepartmentComponent implements OnInit {
	public directors$: Observable<UserInfo[] | undefined>;
	public departmentForm: FormGroup;
	public isEdit: boolean | undefined;
	private readonly _departamentInfo: EditModalContent;
	public isFormChanged: boolean;

	constructor(
		public _userService: UserService,
		public _departmentService: DepartmentService,
		private _dialogRef: MatDialogRef<NewDepartmentComponent>,
		private _formBuilder: FormBuilder,
		@Inject(MAT_DIALOG_DATA) data: EditModalContent
	) {
		this._departamentInfo = data;
		this.isFormChanged = false;
		this.departmentForm = this._formBuilder.group({
			name: [
				this._departamentInfo ? this._departamentInfo.name : '',
				[Validators.required, Validators.minLength(3)],
			],
			description: [this._departamentInfo ? this._departamentInfo.description : ''],
			directorid: [this._departamentInfo ? this._departamentInfo.directorid : ''],
		});
		this.isEdit = !!this._departamentInfo;

		this.directors$ = this._userService
			.findUsers({ skipCount: 0, takeCount: 500 })
			.pipe(map((response) => response.body));
	}

	public ngOnInit(): void {
		this.departmentForm.valueChanges.subscribe((x) => {
			this.isFormChanged =
				this._departamentInfo.name !== x.name ||
				this._departamentInfo.description !== x.description ||
				this._departamentInfo.directorid !== x.directorid;
		});
	}

	public createDepartment(): void {
		console.log('ДИРЕКТОР:', this.departmentForm.get('directorid')?.value);
		this._departmentService
			.createDepartment({
				name: this.departmentForm.get('name')?.value?.trim(),
				description: this.departmentForm.get('description')?.value?.trim(),
				// directorUserId: this.departmentForm.get('directorid')?.value,
				users: [],
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

	public editDepartment(): void {
		const editBody = Object.keys(this.departmentForm.controls).reduce(
			(acc: Array<PatchDepartmentDocument>, key) => {
				if (this.departmentForm.controls[key].value !== this._departamentInfo[key as keyof EditModalContent]) {
					const patchDepartmentDocument: PatchDepartmentDocument = {
						op: 'replace',
						path: `/${key}` as DepartmentPath,
						value: this.departmentForm.controls[key].value,
					};
					acc.push(patchDepartmentDocument);
				}
				return acc;
			},
			[]
		);

		this._departmentService
			.editDepartment({
				departmentId: this._departamentInfo.id as string,
				body: editBody,
			})
			.subscribe((result: OperationResultResponse) => {
				this._dialogRef.close(result);
			});
	}

	public onSubmitDepartmentForm() {
		if (this.isEdit) {
			this.editDepartment();
		} else {
			this.createDepartment();
		}
	}
}
