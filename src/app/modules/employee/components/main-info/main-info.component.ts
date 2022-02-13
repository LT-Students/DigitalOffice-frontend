import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { IUserStatus, UserStatusModel } from '@app/models/user/user-status.model';
import { DateType } from '@app/types/date.enum';
import { UserStatus } from '@data/api/user-service/models/user-status';
import { User } from '@app/models/user/user.model';
import { finalize, map, switchMap, take } from 'rxjs/operators';
import { UserGender } from '@data/api/user-service/models';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IUserGender, PersonalInfoManager } from '@app/models/user/personal-info-manager';
import { BehaviorSubject, forkJoin, Observable, of } from 'rxjs';
import { EmployeePageService } from '@app/services/employee-page.service';
import { InitialDataEditRequest, UserPath } from '@app/types/edit-request';
import { UserService } from '@app/services/user/user.service';
import { createEditRequest } from '@app/utils/utils';
import { UploadPhotoComponent } from '../../modals/upload-photo/upload-photo.component';

@Component({
	selector: 'do-employee-page-main-info',
	templateUrl: './main-info.component.html',
	styleUrls: ['./main-info.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainInfoComponent implements OnInit {
	public toolTipText: {
		firstName: string;
		lastName: string;
		middleName: string;
	};
	public loading: BehaviorSubject<boolean>;

	public userStatus: typeof UserStatus = UserStatus;
	public dateType: typeof DateType = DateType;
	public EditPath: typeof UserPath = UserPath;
	public employeeInfoForm: FormGroup;
	public isEditing: boolean;
	public genders: IUserGender[];
	public statuses: IUserStatus[];

	public user$: Observable<User>;
	private _initialData: InitialDataEditRequest<UserPath>;

	constructor(
		private _fb: FormBuilder,
		private _route: ActivatedRoute,
		private _employeeService: EmployeePageService,
		private _userService: UserService,
		private _dialog: MatDialog,
		private _snackBar: MatSnackBar,
		private _cdr: ChangeDetectorRef
	) {
		this.toolTipText = {
			firstName: `
				Текст имени может содержать только буквы русского алфавита.
				Первая буква должна быть заглавной.
				Все остальные только строчные.`,
			lastName: `
				Текст фамилии может содержать только буквы русского алфавита.
				Первая буква должна быть заглавной.
				Все остальные только строчные.
			`,
			middleName: `
				Текст отчества может содержать только буквы русского алфавита.
				Первая буква должна быть заглавной.
				Все остальные только строчные.
			`,
		};

		// `
		// 	Текст имени может содержать только буквы русского алфовита.
		// 	Первая буква должна быть заглавной.
		// 	Все остальные только строчные.`;
		this.loading = new BehaviorSubject<boolean>(false);
		this._initialData = {};
		this.genders = PersonalInfoManager.getGenderList();
		this.statuses = UserStatusModel.getAllStatuses();
		this.isEditing = false;
		this.employeeInfoForm = this._initEditForm();
		this.user$ = this._employeeService.selectedUser$;
	}

	public ngOnInit(): void {
		this._route.params.subscribe(() => (this.isEditing = false));
	}

	public isOwner(): boolean {
		// return this.user.id === this.pageId;
		return true;
	}

	public canEdit(): boolean {
		// return this.user.isAdmin || this.isOwner();
		return true;
	}

	public toggleEditMode(user?: User): void {
		if (user) {
			this._fillForm(user);
		}
		this.isEditing = !this.isEditing;
	}

	public onReset(): void {
		this.employeeInfoForm.reset();
		this.toggleEditMode();
	}

	public onAvatarUploadDialog(): void {
		const dialogRef = this._dialog.open(UploadPhotoComponent);
		dialogRef.afterClosed().subscribe((result) => {
			if (result) {
				this.employeeInfoForm.patchValue({
					avatarImage: result,
				});
				this.employeeInfoForm.get('avatarImage')?.markAsDirty();
				this._cdr.markForCheck();
			}
		});
	}

	public onSubmit(): void {
		this.loading.next(true);

		const { avatarImage, ...userInfo } = this.employeeInfoForm.getRawValue();
		const editRequest = createEditRequest(userInfo, this._initialData);

		this._employeeService.selectedUser$
			.pipe(
				take(1),
				map((user) => user.id ?? ''),
				switchMap((userId) =>
					forkJoin([
						this._userService.editUser(userId, editRequest),
						this.employeeInfoForm.get('avatarImage')?.dirty
							? this._userService.createAvatarImage(avatarImage, userId)
							: // .pipe(
							  // 		switchMap((response) => {
							  // 			return this._userService.changeAvatar(response.body as string, userId);
							  // 		})
							  //   )
							  of(null),
					]).pipe(switchMap(() => this._employeeService.getEmployee(userId)))
				),
				finalize(() => {
					this.loading.next(false);
				})
			)
			.subscribe({
				next: () => this.toggleEditMode(),
				error: (err) => {
					throw err;
				},
			});
	}

	private _fillForm(user: User): void {
		if (user) {
			this._initialData = {
				[UserPath.FIRST_NAME]: user.firstName,
				[UserPath.LAST_NAME]: user.lastName,
				[UserPath.MIDDLE_NAME]: user.middleName,
				[UserPath.STATUS]: user.statusEmoji?.statusType,
				[UserPath.ABOUT]: user.about,
				[UserPath.CITY]: user.city,
				// [UserPath.START_WORKING_AT]: user.startWorkingAt,
				[UserPath.DATE_OF_BIRTH]: user.dateOfBirth,
				[UserPath.GENDER]: user.gender?.genderType,
			};
			this.employeeInfoForm.patchValue({ ...this._initialData, avatarImage: user.avatarImage });
		}
	}

	private _initEditForm(): FormGroup {
		return this._fb.group({
			[UserPath.FIRST_NAME]: ['', Validators.required],
			[UserPath.LAST_NAME]: ['', Validators.required],
			[UserPath.MIDDLE_NAME]: [''],
			[UserPath.STATUS]: [null],
			[UserPath.ABOUT]: [''],
			[UserPath.CITY]: [''],
			// [UserPath.START_WORKING_AT]: [null],
			[UserPath.DATE_OF_BIRTH]: [null],
			[UserPath.GENDER]: [UserGender.NotSelected],
			avatarImage: [null],
		});
	}
}
