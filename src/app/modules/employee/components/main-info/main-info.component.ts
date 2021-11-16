import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { IUserStatus, UserStatusModel } from '@app/models/user/user-status.model';
import { DateType } from '@app/types/date.enum';
import { UserStatus } from '@data/api/user-service/models/user-status';
import { User } from '@app/models/user/user.model';
import { finalize, map, switchMap, take } from 'rxjs/operators';
import { ImageInfo, PatchUserDocument, UserGender } from '@data/api/user-service/models';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IUserGender, PersonalInfoManager } from '@app/models/user/personal-info-manager';
import { BehaviorSubject, EMPTY, forkJoin, Observable } from 'rxjs';
import { EmployeePageService } from '@app/services/employee-page.service';
import { PatchRequest, UserPath } from '@app/types/patch-paths';
import { DateTime } from 'luxon';
import { UserService } from '@app/services/user/user.service';
import { UploadPhotoComponent } from '../../modals/upload-photo/upload-photo.component';

@Component({
	selector: 'do-employee-page-main-info',
	templateUrl: './main-info.component.html',
	styleUrls: ['./main-info.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainInfoComponent implements OnInit {
	public loading: BehaviorSubject<boolean>;

	public userStatus: typeof UserStatus = UserStatus;
	public dateType: typeof DateType = DateType;
	public editPaths: typeof UserPath = UserPath;
	public employeeInfoForm: FormGroup;
	public isEditing: boolean;
	public genders: IUserGender[];
	public statuses: IUserStatus[];

	public user$: Observable<User>;
	private _initialData: PatchRequest<UserPath> & { avatarImage?: ImageInfo | null };

	constructor(
		private _fb: FormBuilder,
		private _route: ActivatedRoute,
		private _employeeService: EmployeePageService,
		private _userService: UserService,
		private _dialog: MatDialog,
		private _snackBar: MatSnackBar,
		private _cdr: ChangeDetectorRef
	) {
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
		const dialogRef = this._dialog.open(UploadPhotoComponent, {});
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

		const { avatarImage, ...userInfo } = this.employeeInfoForm.controls;
		const editRequest = (Object.keys(userInfo) as UserPath[]).reduce((acc: PatchUserDocument[], key) => {
			const formValue = this.employeeInfoForm.get(key)?.value;
			if (formValue !== this._initialData[key]) {
				const patchDocument: PatchUserDocument = {
					op: 'replace',
					path: key,
					value:
						formValue instanceof DateTime
							? formValue.plus({ minutes: formValue.offset }).toISO()
							: formValue,
				};
				acc.push(patchDocument);
			}
			return acc;
		}, []);

		forkJoin([
			this._employeeService.editEmployee(editRequest),
			avatarImage.dirty
				? this._employeeService.selectedUser$.pipe(
						take(1),
						map((user) => user.id ?? ''),
						switchMap((userId) =>
							this._userService
								.createAvatarImage(avatarImage.value, userId)
								.pipe(
									switchMap((response) =>
										this._userService.changeAvatar(response.body as string, userId)
									)
								)
						)
				  )
				: EMPTY,
		])
			.pipe(
				finalize(() => {
					this.loading.next(false);
				})
			)
			.subscribe({
				next: () => this.toggleEditMode(),
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
				[UserPath.START_WORKING_AT]: user.startWorkingAt,
				[UserPath.DATE_OF_BIRTH]: user.dateOfBirth,
				[UserPath.GENDER]: user.gender?.genderType,
				avatarImage: user.avatarImage,
			};
			this.employeeInfoForm.patchValue(this._initialData);
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
			[UserPath.START_WORKING_AT]: [null],
			[UserPath.DATE_OF_BIRTH]: [null],
			[UserPath.GENDER]: [UserGender.NotSelected],
			avatarImage: [null],
		});
	}
}
