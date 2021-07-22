import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of, Subscription } from 'rxjs';
import { DepartmentApiService } from '@data/api/company-service/services/department-api.service';
import { UserApiService } from '@data/api/user-service/services/user-api.service';
import { switchMap } from 'rxjs/operators';
import { UserInfo } from '@data/api/user-service/models/user-info';
import { FindResultResponseUserInfo } from '@data/api/user-service/models/find-result-response-user-info';
import { UserSearchComponent } from '../new-project/modals/user-search/user-search.component';

@Component({
	selector: 'do-new-department',
	templateUrl: './new-department.component.html',
	styleUrls: ['./new-department.component.scss'],
})
export class NewDepartmentComponent implements OnInit {
	public directors: UserInfo[] = [];
	private getDirectorsSubscription: Subscription;

	public departmentForm: FormGroup;

	constructor(
		public userApiService: UserApiService,
		public departmentApiService: DepartmentApiService,
		private dialogRef: MatDialogRef<UserSearchComponent>,
		private formBuilder: FormBuilder,
		private snackBar: MatSnackBar
	) {}

	ngOnInit(): void {
		this.getDirectors();

		this.departmentForm = this.formBuilder.group({
			name: ['', [Validators.required]],
			description: [null],
			directorId: [null],
		});
	}

	getDirectors(): void {
		//Rework when will api with specialization sort
		this.getDirectorsSubscription = this.userApiService
			.findUsers({
				skipCount: 0,
				takeCount: 50,
			})
			.pipe(switchMap((usersResponse: FindResultResponseUserInfo) => of(usersResponse.body)))
			.subscribe((data: UserInfo[]) => (this.directors = data));
	}

	postDepartment(): void {
		this.departmentApiService
			.addDepartment({
				body: {
					info: {
						name: this.departmentForm.get('name').value,
						description: this.departmentForm.get('description').value,
						directorUserId: this.departmentForm.get('directorId').value,
					},
					users: [],
				},
			})
			.subscribe(
				(res) => {
					this.snackBar.open('New department added successfully', 'done', {
						duration: 3000,
					});
					this.dialogRef.close();
				},
				(error: HttpErrorResponse) => {
					let errorMessage = error.error.errors;
					if (error.status === 409) {
						errorMessage = 'Департамент с таким названием уже существует';
					}
					this.snackBar.open(errorMessage, 'accept');
					throw error;
				}
			);
	}
}
