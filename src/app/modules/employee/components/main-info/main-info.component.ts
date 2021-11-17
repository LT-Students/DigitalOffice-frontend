import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { IUserStatus, UserStatusModel } from '@app/models/user/user-status.model';
import { DateType } from '@app/types/date.enum';
import { UserStatus } from '@data/api/user-service/models/user-status';
import { User } from '@app/models/user/user.model';
import { UserService } from '@app/services/user/user.service';
import { finalize, map } from 'rxjs/operators';
import { PatchUserDocument, UserGender } from '@data/api/user-service/models';
import { IUserGender, PersonalInfoManager } from '@app/models/user/personal-info-manager';
import { RoleInfo } from '@data/api/rights-service/models/role-info';
import { OfficeInfo } from '@data/api/company-service/models/office-info';
import { DepartmentInfo } from '@data/api/company-service/models/department-info';
import { PositionInfo } from '@data/api/company-service/models/position-info';
import { RightsService } from '@app/services/rights/rights.service';
import { BehaviorSubject, Observable, Subscription, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { EmployeePageService } from '@app/services/employee-page.service';
import { PatchRequest, UserPath } from '@app/types/patch-paths';
import { DateTime } from 'luxon';
import { PositionService } from '@app/services/position/position.service';
import { DepartmentService } from '@app/services/department/department.service';
import { OfficeService } from '@app/services/company/office.service';
import { UploadPhotoComponent } from '../../modals/upload-photo/upload-photo.component';

@Component({
	selector: 'do-employee-page-main-info',
	templateUrl: './main-info.component.html',
	styleUrls: ['./main-info.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainInfoComponent implements OnInit, OnDestroy {
	public loading: BehaviorSubject<boolean>;

	public userStatus: typeof UserStatus = UserStatus;
	public dateType: typeof DateType = DateType;
	public employeeInfoForm: FormGroup;
	public isEditing: boolean;
	public genders: IUserGender[];
	public statuses: IUserStatus[];

	public user?: User;
	public userSubscription: Subscription | undefined;
	public roles$: Observable<RoleInfo[] | undefined>;
	public offices$: Observable<OfficeInfo[] | undefined>;
	public departments$: Observable<DepartmentInfo[] | undefined>;
	public positions$: Observable<PositionInfo[] | undefined>;
	private _initialData: PatchRequest<UserPath>;

	constructor(
		private _fb: FormBuilder,
		private _route: ActivatedRoute,
		private _userService: UserService,
		private _positionService: PositionService,
		private _departmentService: DepartmentService,
		private _officeService: OfficeService,
		private _employeeService: EmployeePageService,
		private _dialog: MatDialog,
		private _roleService: RightsService,
		private _cdr: ChangeDetectorRef
	) {
		this.loading = new BehaviorSubject<boolean>(false);
		this._initialData = {};
		this.genders = PersonalInfoManager.getGenderList();
		this.statuses = UserStatusModel.getAllStatuses();
		this.isEditing = false;
		this.employeeInfoForm = this._initEditForm();
		this.departments$ = this._departmentService
			.findDepartments({
				skipCount: 0,
				takeCount: 500,
			})
			.pipe(map((res) => res.body));

		this.positions$ = this._positionService
			.findPositions({
				skipCount: 0,
				takeCount: 500,
			})
			.pipe(map((res) => res.body));

		this.offices$ = this._officeService.findOffices({ skipCount: 0, takeCount: 500 }).pipe(map((res) => res.body));
		this.roles$ = this._roleService.findRoles({ skipCount: 0, takeCount: 500 }).pipe(map((res) => res.body));
	}

	public ngOnInit(): void {
		this._route.params.subscribe(() => (this.isEditing = false));
		this.userSubscription = this._employeeService.selectedUser$.subscribe((user) => {
			this.user = user;
			this._cdr.markForCheck();
		});
	}

	public ngOnDestroy(): void {
		this.userSubscription?.unsubscribe();
	}

	public isOwner(): boolean {
		// return this.user.id === this.pageId;
		return true;
	}

	public canEdit(): boolean {
		// return this.user.isAdmin || this.isOwner();
		return true;
	}

	public toggleEditMode(): void {
		this._fillForm();
		this.isEditing = !this.isEditing;
	}

	public onSubmit(): void {
		this._editUser();
	}

	public onReset(): void {
		this.employeeInfoForm.reset();
		this.toggleEditMode();
	}

	public changeWorkingRate(step: number) {
		// const currentValue = this.employeeInfoForm.get('/Rate')?.value;
		// const rate = +currentValue + step;
		// this.employeeInfoForm.patchValue({ '/Rate': rate });
		//
		// if (this.employeeInfoForm.get('/Rate')?.pristine) {
		// 	this.employeeInfoForm.get('/Rate')?.markAsDirty();
		// }
	}

	public onOpenDialog(): void {
		const dialogRef = this._dialog.open(UploadPhotoComponent, {});
		dialogRef.afterClosed().subscribe((result) => {
			if (result) {
				this.employeeInfoForm.patchValue({
					photo: result,
				});
				this.employeeInfoForm.get('/AvatarFileId')?.markAsDirty();
			}
		});
	}

	private _editUser(): void {
		this.loading.next(true);
		const editRequest = (Object.keys(this.employeeInfoForm.controls) as UserPath[]).reduce(
			(acc: PatchUserDocument[], key) => {
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
			},
			[]
		);

		this._employeeService
			.editEmployee(editRequest)
			.pipe(
				finalize(() => {
					this.loading.next(false);
				})
			)
			.subscribe({
				next: () => {
					this.toggleEditMode();
				},
				error: (error: HttpErrorResponse) => {
					return throwError(error);
				},
			});
	}

	private _fillForm(): void {
		if (this.user) {
			this._initialData = {
				'/FirstName': this.user.firstName,
				'/LastName': this.user.lastName,
				'/MiddleName': this.user.middleName,
				// '/AvatarFileId': this.user.avatarImage?.id,
				'/Status': this.user.statusEmoji?.statusType,
				'/About': this.user.about,
				// '/PositionId': this.user.position?.id,
				// '/DepartmentId': this.user.department?.id,
				// '/OfficeId': this.user.office?.id,
				// '/RoleId': this.user.role?.id,
				// '/Rate': this.user.rate,
				'/City': this.user.city,
				'/Gender': this.user.gender?.genderType,
				'/DateOfBirth': this.user.dateOfBirth,
				'/StartWorkingAt': this.user.startWorkingAt,
			};
			this.employeeInfoForm.patchValue(this._initialData);
		}
	}

	private _initEditForm(): FormGroup {
		return this._fb.group({
			'/FirstName': ['', Validators.required],
			'/LastName': ['', Validators.required],
			'/MiddleName': [''],
			'/AvatarFileId': [''],
			'/Status': [null],
			'/About': [''],
			// '/PositionId': ['', Validators.required],
			// '/DepartmentId': [''],
			'/OfficeId': ['', Validators.required],
			'/RoleId': [''],
			// '/Rate': ['', Validators.required],
			'/City': [''],
			'/StartWorkingAt': [null],
			'/DateOfBirth': [null],
			'/Gender': [UserGender],
		});
	}
}
