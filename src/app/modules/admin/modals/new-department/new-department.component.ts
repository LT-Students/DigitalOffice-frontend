import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { UserService } from '@app/services/user/user.service';
import { map } from 'rxjs/operators';
import { UserInfo } from '@data/api/user-service/models/user-info';
import { DepartmentService } from '@app/services/company/department.service';

@Component({
	selector: 'do-new-department',
	templateUrl: './new-department.component.html',
	styleUrls: ['./new-department.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewDepartmentComponent implements OnInit {
	public directors$: Observable<UserInfo[] | undefined>;
	public departmentForm: FormGroup;

	constructor(
		public _userService: UserService,
		public _departmentService: DepartmentService,
		private _dialogRef: MatDialogRef<NewDepartmentComponent>,
		private _formBuilder: FormBuilder,
		private _snackBar: MatSnackBar
	) {
		this.departmentForm = this._formBuilder.group({
			name: ['', [Validators.required]],
			description: [null],
			directorId: [null],
		});
		this.directors$ = this._userService.findUsers(0, 50).pipe(map((response) => response.body));
	}

	public ngOnInit(): void {}

	public postDepartment(): void {
		this._departmentService
			.addDepartment({
				name: this.departmentForm.get('name')?.value.trim(),
				description: this.departmentForm.get('description')?.value.trim(),
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
}
