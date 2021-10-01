import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { UserService } from '@app/services/user/user.service';
import { map } from 'rxjs/operators';
import { UserInfo } from '@data/api/user-service/models/user-info';
import { DepartmentService } from '@app/services/company/department.service';
import { DepartmentInfo } from '@data/api/company-service/models/department-info';
import { OperationResultResponse } from '@data/api/company-service/models/operation-result-response';
import { PatchDepartmentDocument } from '@data/api/company-service/models/patch-department-document';
import { EditDepartmentRequest } from '@data/api/company-service/models/edit-department-request';
import { EditDepartmentPath } from '@app/services/company/department.service';
import { EditModalContentConfig } from '../../components/department-card/department-card.component';

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
	private dataToEdit: any;
	public isFormChanged: boolean;

	constructor(
		public _userService: UserService,
		public _departmentService: DepartmentService,
		private _dialogRef: MatDialogRef<NewDepartmentComponent>,
		private _formBuilder: FormBuilder,
		private _snackBar: MatSnackBar,
		@Inject(MAT_DIALOG_DATA) data: EditModalContentConfig
	) {
		this.dataToEdit = data;
		this.isFormChanged = false;
		this.departmentForm = this._formBuilder.group({
			name: ['', [Validators.required]],
			description: [null],
			directorid: [null],
		});
		if (this.dataToEdit) {
			this.isEdit = true;
			this.departmentForm = this._formBuilder.group({
				name: [this.dataToEdit.name, [Validators.required]],
				directorid: this.dataToEdit.directorid,
				description: this.dataToEdit.description,
			});
		}


		this.directors$ = this._userService.findUsers(0, 500).pipe(map((response) => response.body));
		// this.currentDirector = this._userService.findUsers(0, 50, data.data.id)
		// .pipe(map((response) => response.body));
	}

	public ngOnInit(): void {
		this.departmentForm.valueChanges.subscribe(x => {
			if (this.dataToEdit.name !== x.name
				|| this.dataToEdit.description !== x.description
				|| this.dataToEdit.directorid !== x.directorid) {
			this.isFormChanged = true;
			console.log(this.isFormChanged)
			} else {
			this.isFormChanged = false;
			}
		})
	}



	public createDepartment(): void {
		this._departmentService
			.addDepartment({
				name: this.departmentForm.get('name')?.value?.trim(),
				description: this.departmentForm.get('description')?.value?.trim(),
				directorUserId: this.departmentForm.get('directorid')?.value,
				users: [],
			})
			.subscribe(
				(result) => {
					this._snackBar.open('Новый департамент успешно добавлен', 'done', {
						duration: 3000,
					});
					this._dialogRef.close(result);
				},
				(error: HttpErrorResponse) => {
					let errorMessage = error.error.errors;
					if (error.status === 409) {
						errorMessage = 'Департамент с таким названием уже существует';
					}
					this._snackBar.open(errorMessage, 'accept');
					throw error;
				}
			);
	}



	public editDepartment(): void {
			const editBody = Object.keys(this.departmentForm.controls).reduce((acc: Array<PatchDepartmentDocument>, key) => {
				if(this.departmentForm.controls[key].value !== this.dataToEdit[key]) {
					const patchDepartmentDocument: PatchDepartmentDocument = {
					op: 'replace', path: `/${key}` as EditDepartmentPath, value: this.departmentForm.controls[key].value
					}
					acc.push(patchDepartmentDocument);
				}
				return acc;
			} , []);

			this._departmentService
			.editDepartment({
				departmentId: this.dataToEdit.id as string,
				body: editBody
			})
			.subscribe((result: OperationResultResponse) => {
				this._snackBar.open('Департамент успешно изменен', 'done', {
					duration: 3000,
				});
				this._dialogRef.close(result);
				console.log('данные после изменения', this.departmentForm.value)
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
