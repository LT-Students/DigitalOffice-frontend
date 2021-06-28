import { Component, OnInit } from '@angular/core';
import { UserInfo } from '@data/api/user-service/models/user-info';
import { of, Subscription } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserApiService } from '@data/api/user-service/services/user-api.service';
import { DepartmentApiService } from '@data/api/company-service/services/department-api.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { switchMap } from 'rxjs/operators';
import { UsersResponse } from '@data/api/user-service/models/users-response';
import { HttpErrorResponse } from '@angular/common/http';
import { UserSearchComponent } from '../new-project/modals/user-search/user-search.component';
import { RightsApiService } from '@data/api/rights-service/services/rights-api.service';

@Component({
	selector: 'do-new-role',
	templateUrl: './new-role.component.html',
	styleUrls: ['./new-role.component.scss'],
})
export class NewRoleComponent implements OnInit {
	public directors: UserInfo[] = [];
	private getDirectorsSubscription: Subscription;
	public rights = [];

	public roleForm = new FormGroup({
		name: new FormControl(null, [Validators.required]),
		description: new FormControl(null, [Validators.required]),
		directorId: new FormControl(null, [Validators.required]),
	});

	constructor(
		public rightsApiService: RightsApiService,
		public userApiService: UserApiService,
		public departmentApiService: DepartmentApiService,
		private dialogRef: MatDialogRef<UserSearchComponent>,
		private formBuilder: FormBuilder,
		private snackBar: MatSnackBar
	) {}

	ngOnInit(): void {
		this.getRights();

		this.roleForm = this.formBuilder.group({
			name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
		});
	}

	getRights(): void {
		this.rightsApiService.getRightsList().subscribe((rights) => (this.rights = rights));
		// this.getDirectorsSubscription = this.userApiService
		// 	.findUsers({
		// 		skipCount: 0,
		// 		takeCount: 50,
		// 	})
		// 	.pipe(switchMap((usersResponse: UsersResponse) => of(usersResponse.users)))
		// 	.subscribe((data: UserInfo[]) => (this.directors = data));
	}

	postRole(): void {
		this.departmentApiService
			.addDepartment({
				body: {
					info: {
						name: this.roleForm.controls['name'].value,
						description: this.roleForm.controls['description'].value,
						directorUserId: this.roleForm.controls['directorId'].value,
					},
				},
			})
			.subscribe(
				(res) => {
					this.snackBar.open('New role added successfully', 'done', {
						duration: 3000,
					});
				},
				(error: HttpErrorResponse) => {
					this.snackBar.open(error.error.Message, 'accept');
					throw error;
				}
			);
	}
}
