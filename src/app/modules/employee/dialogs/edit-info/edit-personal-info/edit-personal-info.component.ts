import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '@app/models/user/user.model';
import { DoValidators } from '@app/validators/do-validators';
import { DateFormat } from '@app/types/date.enum';
import { UserService } from '@app/services/user/user.service';
import { createEditRequest } from '@app/utils/utils';
import { InitialDataEditRequest, PatchDocument, UserPath } from '@app/types/edit-request';
import { finalize, first, map, switchMap } from 'rxjs/operators';
import { combineLatest, Observable, of } from 'rxjs';
import { Icons } from '@shared/modules/icons/icons';
import { PermissionService } from '@app/services/permission.service';
import { UserRights } from '@app/types/user-rights.enum';
import { LoadingState } from '@shared/directives/button-loading.directive';
import { GenderApiService } from '@api/user-service/services/gender-api.service';
import { EmployeePageService } from '../../../services/employee-page.service';

@Component({
	selector: 'do-edit-personal-info',
	templateUrl: './edit-personal-info.component.html',
	styleUrls: ['./edit-personal-info.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditPersonalInfoComponent extends LoadingState implements OnInit {
	public readonly Icons = Icons;
	public user$: Observable<User>;
	public isEditMode = false;
	public editForm = this.initForm();
	public canEdit$ = this.getCanEdit$();
	public genderControl = this.fb.control(null);

	public DateFormat = DateFormat;

	private userInitialInfo?: InitialDataEditRequest<UserPath>;
	public userPath = UserPath;
	public readonly MAX_ABOUT_LENGTH = 150;

	constructor(
		@Inject(MAT_DIALOG_DATA) data: Observable<User>,
		private fb: FormBuilder,
		private userService: UserService,
		private employeePage: EmployeePageService,
		private permission: PermissionService,
		private genderApi: GenderApiService
	) {
		super();
		this.user$ = data;
	}

	ngOnInit(): void {}

	private getCanEdit$(): Observable<boolean> {
		return combineLatest([
			this.permission.checkPermission$(UserRights.AddEditRemoveUsers),
			this.employeePage.isOwner$(),
		]).pipe(map(([hasPermission, isOwner]: [boolean, boolean]) => hasPermission || isOwner));
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
		});
	}

	public onEdit(user: User): void {
		this.isEditMode = !this.isEditMode;
		this.userInitialInfo = {
			[UserPath.FIRST_NAME]: user.firstName,
			[UserPath.LAST_NAME]: user.lastName,
			[UserPath.MIDDLE_NAME]: user.middleName,
			[UserPath.DATE_OF_BIRTH]: user.additionalInfo.dateOfBirth,
			[UserPath.BUSINESS_HOURS_FROM_UTC]: this.formatTime(user.additionalInfo.businessHoursFromUtc),
			[UserPath.BUSINESS_HOURS_TO_UTC]: this.formatTime(user.additionalInfo.businessHoursToUtc),
			[UserPath.ABOUT]: user.additionalInfo.about,
			[UserPath.GENDER_ID]: user.additionalInfo.genderName,
		};
		this.genderControl.setValue(user.additionalInfo.genderName);
		this.editForm.patchValue(this.userInitialInfo);
	}

	public onSubmit(): void {
		if (this.userInitialInfo != null) {
			this.setLoading(true);
			const editRequest = createEditRequest(this.editForm.getRawValue(), this.userInitialInfo);
			const isNewGender = this.compareGenders();
			this.employeePage.selectedUser$
				.pipe(
					first(),
					map((user) => user.id as string),
					switchMap((userId: string) =>
						this.getGenderChangeRequest(isNewGender).pipe(
							switchMap((genderId: string | null) => {
								if (genderId) {
									const genderEditRequest = new PatchDocument(genderId, UserPath.GENDER_ID);
									editRequest.push(genderEditRequest);
								}
								return this.userService
									.editUser(userId, editRequest)
									.pipe(switchMap(() => this.employeePage.refreshSelectedUser()));
							})
						)
					),
					finalize(() => this.setLoading(false))
				)
				.subscribe({
					next: () => this.toggleEditMode(),
				});
		}
	}

	private compareGenders(): boolean {
		return (
			this.userInitialInfo?.[UserPath.GENDER_ID]?.toLowerCase() !== this.genderControl.value.name.toLowerCase()
		);
	}

	private getGenderChangeRequest(isNewGender: boolean): Observable<string | null> {
		const newGender = this.genderControl.value;
		if (isNewGender) {
			if (newGender.id) {
				return of(newGender.id);
			}
			return this.genderApi
				.createGender({ body: { name: newGender.name } })
				.pipe(map((res) => res.body as string));
		}
		return of(null);
	}

	public toggleEditMode(): void {
		this.isEditMode = !this.isEditMode;
	}

	private formatTime(time?: string): string | undefined {
		return time?.split('T')[1];
	}
}