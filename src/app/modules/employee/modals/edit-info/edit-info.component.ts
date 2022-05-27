import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '@app/models/user/user.model';
import { DoValidators } from '@app/validators/do-validators';
import { DateType } from '@app/types/date.enum';
import { UserService } from '@app/services/user/user.service';
import { createEditRequest } from '@app/utils/utils';
import { InitialDataEditRequest, UserPath } from '@app/types/edit-request';
import { first, map, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Icons } from '@shared/modules/icons/icons';
import { EmployeePageService } from '../../services/employee-page.service';

@Component({
	selector: 'do-edit-info',
	templateUrl: './edit-info.component.html',
	styleUrls: ['./edit-info.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditInfoComponent implements OnInit {
	public readonly Icons = Icons;
	public user: Observable<User>;
	public isEditMode = false;
	public editForm: FormGroup = this.initForm();

	public dateType: typeof DateType = DateType;

	private userInitialInfo?: InitialDataEditRequest<UserPath>;
	public userPath = UserPath;
	public readonly MAX_ABOUT_LENGTH = 150;

	constructor(
		@Inject(MAT_DIALOG_DATA) data: Observable<User>,
		private fb: FormBuilder,
		private userService: UserService,
		private employeeService: EmployeePageService
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
			[UserPath.ABOUT]: [null],
		});
	}

	public onEdit(user: User): void {
		this.isEditMode = !this.isEditMode;
		this.userInitialInfo = {
			[UserPath.FIRST_NAME]: user.firstName,
			[UserPath.LAST_NAME]: user.lastName,
			[UserPath.MIDDLE_NAME]: user.middleName,
			[UserPath.DATE_OF_BIRTH]: user.dateOfBirth,
			[UserPath.BUSINESS_HOURS_FROM_UTC]: this.formatTime(user.businessHoursFromUtc),
			[UserPath.BUSINESS_HOURS_TO_UTC]: this.formatTime(user.businessHoursToUtc),
			[UserPath.ABOUT]: user.about,
		};
		this.editForm.patchValue(this.userInitialInfo);
	}

	public onSubmit(): void {
		if (this.userInitialInfo != null) {
			const editRequest = createEditRequest(this.editForm.getRawValue(), this.userInitialInfo);
			this.employeeService.selectedUser$
				.pipe(
					first(),
					map((user) => user.id as string),
					switchMap((userId: string) =>
						this.userService
							.editUser(userId, editRequest)
							.pipe(switchMap(() => this.employeeService.getEmployee(userId)))
					)
				)
				.subscribe({
					next: () => this.toggleEditMode(),
				});
		}
	}

	public toggleEditMode(): void {
		this.isEditMode = !this.isEditMode;
	}

	private formatTime(time?: string): string | undefined {
		return time?.split('T')[1];
	}
}
