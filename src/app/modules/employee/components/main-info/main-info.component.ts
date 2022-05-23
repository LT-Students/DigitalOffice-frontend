import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { IUserStatus, UserStatusModel } from '@app/models/user/user-status.model';
import { DateType } from '@app/types/date.enum';
import { UserStatus } from '@api/user-service/models/user-status';
import { User } from '@app/models/user/user.model';
import { finalize, first, map, switchMap } from 'rxjs/operators';
import { BehaviorSubject, forkJoin, Observable } from 'rxjs';
import { InitialDataEditRequest, UserPath } from '@app/types/edit-request';
import { UserService } from '@app/services/user/user.service';
import { createEditRequest } from '@app/utils/utils';
import { ModalWidth } from '@app/services/dialog.service';
import { EmployeePageService } from '../../services/employee-page.service';
import { UploadImageComponent } from '../../modals/upload-image/upload-image.component';
import { EditInfoComponent } from '../../modals/edit-info/edit-info.component';

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
	public EditPath: typeof UserPath = UserPath;
	public employeeInfoForm: FormGroup;
	public isEditing: boolean;
	public statuses: IUserStatus[];

	public user$: Observable<User>;
	private _initialData: InitialDataEditRequest<UserPath>;

	constructor(
		private _fb: FormBuilder,
		private _route: ActivatedRoute,
		private _employeeService: EmployeePageService,
		private _userService: UserService,
		private _dialog: MatDialog,
		private _cdr: ChangeDetectorRef,
		private viewContainer: ViewContainerRef
	) {
		this.loading = new BehaviorSubject<boolean>(false);
		this._initialData = {};
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

	public onReset(): void {
		this.employeeInfoForm.reset();
	}

	public editUser(): void {
		this.isEditing = !this.isEditing;
		const dialogRef = this._dialog.open(EditInfoComponent, {
			data: this.user$,
			width: ModalWidth.L,
			autoFocus: false,
			viewContainerRef: this.viewContainer
		});
	}

	public onAvatarUploadDialog(): void {
		const dialogRef = this._dialog.open(UploadImageComponent, {
			width: ModalWidth.XL,
			height: 'auto',
			autoFocus: false,
			panelClass: 'upload-image-dialog',
			viewContainerRef: this.viewContainer
		});
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
				first((user) => !!user?.id),
				map((user) => user.id as string),
				switchMap((userId: string) =>
					forkJoin([
						this._userService.editUser(userId, editRequest),
						// this.employeeInfoForm.get('avatarImage')?.dirty
						// 	? this._userService.createAvatarImage(avatarImage, userId)
						// 	: // .pipe(
						// 	  // 		switchMap((response) => {
						// 	  // 			return this._userService.changeAvatar(response.body as string, userId);
						// 	  // 		})
						// 	  //   )
						// 	  of(null),
					]).pipe(switchMap(() => this._employeeService.getEmployee(userId)))
				),
				finalize(() => {
					this.loading.next(false);
				})
			)
			.subscribe();
	}

	private _fillForm(user: User): void {
		this._initialData = {
			[UserPath.FIRST_NAME]: user.firstName,
			[UserPath.LAST_NAME]: user.lastName,
			[UserPath.MIDDLE_NAME]: user.middleName,
			[UserPath.STATUS]: user.status,
			[UserPath.ABOUT]: user.about,
			// [UserPath.START_WORKING_AT]: user.startWorkingAt,
			[UserPath.DATE_OF_BIRTH]: user.dateOfBirth,
		};
		this.employeeInfoForm.patchValue({ ...this._initialData, avatarImage: user.avatar });
	}

	private _initEditForm(): FormGroup {
		return this._fb.group({
			[UserPath.FIRST_NAME]: ['', Validators.required],
			[UserPath.LAST_NAME]: ['', Validators.required],
			[UserPath.MIDDLE_NAME]: [''],
			[UserPath.STATUS]: [null],
			[UserPath.ABOUT]: [''],
			// [UserPath.CITY]: [''],
			// [UserPath.START_WORKING_AT]: [null],
			[UserPath.DATE_OF_BIRTH]: [null],
			avatarImage: [null],
		});
	}
}
