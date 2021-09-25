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
import { departments } from '../../../employee/mock';

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
	public departmentInfo: DepartmentInfo | undefined;

	constructor(
		public _userService: UserService,
		public _departmentService: DepartmentService,
		private _dialogRef: MatDialogRef<NewDepartmentComponent>,
		private _formBuilder: FormBuilder,
		private _snackBar: MatSnackBar,
		private dialogRef: MatDialogRef<NewDepartmentComponent>,
		@Inject(MAT_DIALOG_DATA) data: MatDialogConfig
	) {
		this.dataToEdit = data;

		this.departmentForm = this._formBuilder.group({
			name: ['', [Validators.required]],
			description: [null],
			directorId: [null],
		});
		if (this.dataToEdit) {
			this.isEdit = true;
			this.departmentForm = this._formBuilder.group({
				name: [this.dataToEdit.data.name, [Validators.required]],
				directorId: this.dataToEdit.data.directorId,
				description: this.dataToEdit.data.description,
			});
		}


		this.directors$ = this._userService.findUsers(0, 500).pipe(map((response) => response.body));
		// this.currentDirector = this._userService.findUsers(0, 50, data.data.id)
		// .pipe(map((response) => response.body));
	}

	public ngOnInit(): void {}

	public createDepartment(): void {
		this._departmentService
			.addDepartment({
				name: this.departmentForm.get('name')?.value?.trim(),
				description: this.departmentForm.get('description')?.value?.trim(),
				directorUserId: this.departmentForm.get('directorId')?.value,
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
			const editBody = Object.keys(this.departmentForm.controls).reduce((acc: any, key) => {
				if(this.departmentForm.controls[key].value !== this.dataToEdit.data[key]) {
					const objToSend = {
					op: 'replace', path: `/${key}`, value: this.departmentForm.controls[key].value
					}
					acc.push(objToSend);
				}
				return acc
			} , []);

			this._departmentService
			.editDepartment({
				departmentId: this.dataToEdit.data.id as string,
				body: editBody
			})
			.subscribe((result: any) => {
				this._snackBar.open('Департамент успешно изменен', 'done', {
					duration: 3000,
				});
				this._dialogRef.close(this.departmentForm.value);
			});
	}

	public chooseModal() {
		if (this.isEdit) {
			this.editDepartment();
		} else {
			this.createDepartment();
		}
	}
}
