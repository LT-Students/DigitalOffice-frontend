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
	public editForm: FormGroup = this.initForm();

	public statuses: IUserStatus[] = UserStatusModel.getAllStatuses();
	public dateType: typeof DateType = DateType;

	private userInitialInfo?: InitialDataEditRequest<UserPath>;
	public userPath = UserPath;
	public readonly maxChars = 150;

	constructor(@Inject(MAT_DIALOG_DATA) data: User,
				private fb: FormBuilder,
				private userService: UserService,
				private employeeService: EmployeePageService,
				private dialogRef: MatDialogRef<EditInfoComponent>,
	) {
		this.user = data;
	}

	ngOnInit(): void {}

	private initForm(): FormGroup {
		 return this.fb.group({
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
		this.userInitialInfo = {
			[UserPath.FIRST_NAME]: this.user.firstName,
			[UserPath.LAST_NAME]: this.user.lastName,
			[UserPath.MIDDLE_NAME]: this.user.middleName,
			[UserPath.DATE_OF_BIRTH]: this.user.dateOfBirth,
			[UserPath.BUSINESS_HOURS_FROM_UTC]: this.user.businessHoursFromUtc,
			[UserPath.BUSINESS_HOURS_TO_UTC]: this.user.businessHoursToUtc,
			[UserPath.STATUS]: this.user.status,
			[UserPath.ABOUT]: this.user.about
		}
		this.editForm.patchValue(this.userInitialInfo);
	}

	public onSubmit(): void {
		const { ...userInfo } = this.userInitialInfo;
		const editRequest = createEditRequest(this.editForm.getRawValue(), userInfo);
		this.employeeService.selectedUser$.pipe(
			first(),
			map((user) => user.id as string),
			switchMap((userId: string) => this.userService.editUser(userId, editRequest)
				.pipe(switchMap(() => this.employeeService.getEmployee(userId)))),
			finalize(() => {
				this.toggleEditMode();
			})
		)
		.subscribe({
			next: () => this.toggleEditMode(),
		});
	}

	public toggleEditMode(): void {
		this.isEditMode = !this.isEditMode;
	}
}
