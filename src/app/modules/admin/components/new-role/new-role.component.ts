import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { RightsApiService } from '@data/api/rights-service/services/rights-api.service';
import { UserSearchComponent } from '../new-project/modals/user-search/user-search.component';
import { RoleApiService } from '@data/api/rights-service/services/role-api.service';

@Component({
	selector: 'do-new-role',
	templateUrl: './new-role.component.html',
	styleUrls: ['./new-role.component.scss'],
})
export class NewRoleComponent implements OnInit {
	public rights = [];

	public roleForm: FormGroup;

	constructor(
		private rightsApiService: RightsApiService,
		private roleApiService: RoleApiService,
		private dialogRef: MatDialogRef<UserSearchComponent>,
		private fb: FormBuilder,
		private snackBar: MatSnackBar
	) {}

	ngOnInit(): void {
		this.getRights();
		this.roleForm = this.fb.group({
			name: ['', [Validators.required]],
			description: [''],
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

	createRole(): void {
		this.roleApiService
			.createRole({
				body: {
					name: this.roleForm.get('name').value,
					description: this.roleForm.get('description').value,
					rights: this.roleForm.get('rights').value,
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
