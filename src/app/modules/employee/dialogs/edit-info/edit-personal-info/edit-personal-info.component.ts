import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DIALOG_DATA } from '@angular/cdk/dialog';
import { EMPTY, Observable } from 'rxjs';
import { finalize, first, map, switchMap } from 'rxjs/operators';
import { User } from '@app/models/user/user.model';
import { DoValidators } from '@app/validators/do-validators';
import { DateFormat } from '@app/types/date.enum';
import { UserService } from '@app/services/user/user.service';
import { createEditRequest } from '@app/utils/utils';
import { InitialDataEditRequest, UserPath } from '@app/types/edit-request';
import { Icons } from '@shared/modules/icons/icons';
import { LoadingState } from '@app/utils/loading-state';
import { EmployeePageService } from '../../../services/employee-page.service';

@Component({
	selector: 'do-edit-personal-info',
	templateUrl: './edit-personal-info.component.html',
	styleUrls: ['./edit-personal-info.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditPersonalInfoComponent extends LoadingState {
	public readonly MAX_ABOUT_LENGTH = 150;
	public readonly Icons = Icons;
	public readonly UserPath = UserPath;
	public readonly DateFormat = DateFormat;

	public user$: Observable<User>;
	public isEditMode = false;
	public editForm = this.initForm();
	public canEdit$ = this.employeePage.canManagePersonalInfo$();

	public genders$ = this.route.data.pipe(map((data) => data['genders']));

	private userInitialInfo?: InitialDataEditRequest<UserPath>;

	constructor(
		@Inject(DIALOG_DATA) data: Observable<User>,
		private fb: FormBuilder,
		private userService: UserService,
		private employeePage: EmployeePageService,
		private route: ActivatedRoute
	) {
		super();
		this.user$ = data;
	}

	private initForm(): FormGroup {
		return this.fb.group({
			[UserPath.FIRST_NAME]: [null, [Validators.required, DoValidators.noWhitespaces, DoValidators.isNameValid]],
			[UserPath.LAST_NAME]: [null, [Validators.required, DoValidators.noWhitespaces, DoValidators.isNameValid]],
			[UserPath.MIDDLE_NAME]: [null, [DoValidators.noWhitespaces, DoValidators.isNameValid]],
			[UserPath.DATE_OF_BIRTH]: [null],
			[UserPath.BUSINESS_HOURS_FROM_UTC]: [null],
			[UserPath.BUSINESS_HOURS_TO_UTC]: [null],
			[UserPath.ABOUT]: [null],
			[UserPath.GENDER_ID]: [null],
		});
	}

	public onEdit(user: User): void {
		this.isEditMode = !this.isEditMode;
		this.userInitialInfo = {
			[UserPath.FIRST_NAME]: user.firstName,
			[UserPath.LAST_NAME]: user.lastName,
			[UserPath.MIDDLE_NAME]: user.middleName,
			[UserPath.DATE_OF_BIRTH]: user.additionalInfo.dateOfBirth,
			[UserPath.BUSINESS_HOURS_FROM_UTC]: user.additionalInfo.businessHoursFromUtc,
			[UserPath.BUSINESS_HOURS_TO_UTC]: user.additionalInfo.businessHoursToUtc,
			[UserPath.ABOUT]: user.additionalInfo.about,
			[UserPath.GENDER_ID]: user.additionalInfo.gender?.id,
		};
		this.editForm.patchValue(this.userInitialInfo);
	}

	public onSubmit(): void {
		if (this.userInitialInfo != null) {
			this.setLoading(true);
			const editRequest = createEditRequest(this.editForm.getRawValue(), this.userInitialInfo);
			this.employeePage.selectedUser$
				.pipe(
					first(),
					map((user) => user.id),
					switchMap((userId: string) =>
						editRequest.length
							? this.userService
									.editUser(userId, editRequest)
									.pipe(switchMap(() => this.employeePage.refreshSelectedUser()))
							: EMPTY
					),
					finalize(() => this.setLoading(false))
				)
				.subscribe({
					complete: () => this.toggleEditMode(),
				});
		}
	}

	public toggleEditMode(): void {
		this.isEditMode = !this.isEditMode;
	}
}
