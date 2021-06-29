import { Component, OnInit } from '@angular/core';
import { UserInfo } from '@data/api/user-service/models/user-info';
import { of, Subscription } from 'rxjs';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserApiService } from '@data/api/user-service/services/user-api.service';
import { DepartmentApiService } from '@data/api/company-service/services/department-api.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { switchMap } from 'rxjs/operators';
import { UsersResponse } from '@data/api/user-service/models/users-response';
import { HttpErrorResponse } from '@angular/common/http';
import { RightsApiService } from '@data/api/rights-service/services/rights-api.service';
import { UserSearchComponent } from '../new-project/modals/user-search/user-search.component';

@Component({
	selector: 'do-new-role',
	templateUrl: './new-role.component.html',
	styleUrls: ['./new-role.component.scss'],
})
export class NewRoleComponent implements OnInit {
	public rights = [];

	public roleForm: FormGroup;

	constructor(
		public rightsApiService: RightsApiService,
		private dialogRef: MatDialogRef<UserSearchComponent>,
		private fb: FormBuilder,
		private snackBar: MatSnackBar
	) {}

	ngOnInit(): void {
		this.getRights();
		this.roleForm = this.fb.group({
			name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
			description: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
			rights: this.fb.array([]),
		});
	}

	onCheckboxChange(e): void {
		const rights: FormArray = this.roleForm.get('rights') as FormArray;

		if (e.checked) {
			rights.push(new FormControl(e.source.value));
		} else {
			rights.controls.forEach((item: FormControl, i) => {
				if (item.value === e.source.value) {
					rights.removeAt(i);
					return;
				}
			});
		}
	}

	getRights(): void {
		this.rightsApiService.getRightsList().subscribe((rights) => (this.rights = rights));
	}

	postRole(): void {
		console.log(this.roleForm.value, this.rights);
		// this.rightsApiService
		// 	.addRole({
		// 		body: {
		// 			name: this.roleForm.get('name').value,
		// 			description: this.roleForm.get('description').value,
		// 			rights: this.roleForm.get('rights').value,
		// 		},
		// 	})
		// 	.subscribe(
		// 		(res) => {
		// 			this.snackBar.open('New role added successfully', 'done', {
		// 				duration: 3000,
		// 			});
		// 		},
		// 		(error: HttpErrorResponse) => {
		// 			this.snackBar.open(error.error.Message, 'accept');
		// 			throw error;
		// 		}
		// 	);
	}
}
