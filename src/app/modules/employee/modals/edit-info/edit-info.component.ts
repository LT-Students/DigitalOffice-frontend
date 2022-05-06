import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '@app/models/user/user.model';
import { IUserStatus, UserStatusModel } from '@app/models/user/user-status.model';
import { DoValidators } from '@app/validators/do-validators';
import { DateType } from '@app/types/date.enum';
import { UserService } from '@app/services/user/user.service';
import { createEditRequest } from '@app/utils/utils';
import { InitialDataEditRequest, UserPath } from '@app/types/edit-request';
import { finalize, first, map, switchMap } from 'rxjs/operators';
import { forkJoin } from 'rxjs';
import { EmployeePageService } from '../../services/employee-page.service';

@Component({
	selector: 'do-edit-info',
	templateUrl: './edit-info.component.html',
	styleUrls: ['./edit-info.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditInfoComponent implements OnInit {
	public user: User;
	public isEditMode = false;
	public editForm: FormGroup;

	public statuses: IUserStatus[];
	public dateType: typeof DateType = DateType;

	private userInfo?: InitialDataEditRequest<UserPath>;
	public userPath = UserPath;

	constructor(@Inject(MAT_DIALOG_DATA) data: Required<User>,
				private _fb: FormBuilder,
				private userService: UserService,
				private employeeService: EmployeePageService,
				private dialogRef: MatDialogRef<EditInfoComponent>,
	) {
		this.user = data;
		this.editForm = this.initForm();
		this.statuses = UserStatusModel.getAllStatuses();
	}

	ngOnInit(): void {}

	private initForm(): FormGroup {
		 return this._fb.group({
			 [UserPath.FIRST_NAME]: [null, [Validators.required, DoValidators.noWhitespaces, DoValidators.isNameValid]],
			 [UserPath.LAST_NAME]: [null, [Validators.required, DoValidators.noWhitespaces, DoValidators.isNameValid]],
			 [UserPath.MIDDLE_NAME]: [null, [DoValidators.noWhitespaces, DoValidators.isNameValid]],
			 [UserPath.DATE_OF_BIRTH]: [null],
			 [UserPath.BUSINESS_HOURS_FROM_UTC]: [null],
			 [UserPath.BUSINESS_HOURS_TO_UTC]: [null],
			 [UserPath.STATUS]: [null],
			 [UserPath.ABOUT]: [null],
		});
	}

	public onEdit(): void {
		this.isEditMode = !this.isEditMode;
		this.userInfo = {
			[UserPath.FIRST_NAME]: this.user.firstName,
			[UserPath.LAST_NAME]: this.user.lastName,
			[UserPath.MIDDLE_NAME]: this.user.middleName,
			[UserPath.DATE_OF_BIRTH]: this.user.dateOfBirth,
			[UserPath.BUSINESS_HOURS_FROM_UTC]: this.user.businessHoursFromUtc,
			[UserPath.BUSINESS_HOURS_TO_UTC]: this.user.businessHoursToUtc,
			[UserPath.STATUS]: this.user.status,
			[UserPath.ABOUT]: this.user.about
		}
		this.editForm.patchValue(this.userInfo);
	}

	public onSubmit(): void {
		const { ...userInfo } = this.userInfo;
		let editRequest = createEditRequest(this.editForm.getRawValue(), userInfo);
		this.employeeService.selectedUser$.pipe(
			first((user) => !!user?.id),
			map((user) => user.id as string),
			switchMap((userId: string) =>
				forkJoin([
					this.userService.editUser(userId, editRequest),
				]).pipe(switchMap(() => this.employeeService.getEmployee(userId)))
			),
			finalize(() => {
				this.dialogRef.close();
			})
		)
		.subscribe({
			next: () => this.onClose(),
			error: (err) => {
				throw err;
			},
		});
	}

	onClose(): void {
		this.isEditMode = !this.isEditMode;
	}
}
