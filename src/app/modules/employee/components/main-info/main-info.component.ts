import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { IUserStatus, UserStatusModel } from '@app/models/user/user-status.model';
import { DateType } from '@app/types/date.enum';
import { UserStatus } from '@data/api/user-service/models/user-status';
import { User } from '@app/models/user/user.model';
import { CommunicationInfo } from '@data/api/user-service/models/communication-info';
import { UserService } from '@app/services/user/user.service';
import { map } from 'rxjs/operators';
import { UserGender } from '@data/api/user-service/models';
import { NetService } from '@app/services/net.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IUserGender, PersonalInfoManager } from '@app/models/user/personal-info-manager';
import { IGetUserRequest } from '@app/types/get-user-request.interface';
import { RoleInfo } from '@data/api/rights-service/models/role-info';
import { OfficeInfo } from '@data/api/company-service/models/office-info';
import { DepartmentInfo } from '@data/api/company-service/models/department-info';
import { PositionInfo } from '@data/api/company-service/models/position-info';
import { RightsService } from '@app/services/rights/rights.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { EmployeePageService } from '@app/services/employee-page.service';
import { UploadPhotoComponent } from '../../modals/upload-photo/upload-photo.component';

@Component({
	selector: 'do-employee-page-main-info',
	templateUrl: './main-info.component.html',
	styleUrls: ['./main-info.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainInfoComponent implements OnInit {
	public userStatus: typeof UserStatus = UserStatus;
	public dateType: typeof DateType = DateType;
	public employeeInfoForm: FormGroup;
	public isEditing: boolean;
	public genders: IUserGender[];
	public statuses: IUserStatus[];

	public user$: Observable<User>;
	public roles$: Observable<RoleInfo[] | undefined>;
	public offices$: Observable<OfficeInfo[] | undefined>;
	public departments$: Observable<DepartmentInfo[] | undefined>;
	public positions$: Observable<PositionInfo[] | undefined>;

	constructor(
		private _fb: FormBuilder,
		private _route: ActivatedRoute,
		private _userService: UserService,
		private _employeeService: EmployeePageService,
		private _netService: NetService,
		private _dialog: MatDialog,
		private _snackBar: MatSnackBar,
		private _roleService: RightsService,
		private _cdr: ChangeDetectorRef
	) {
		this.genders = PersonalInfoManager.getGenderList();
		this.statuses = UserStatusModel.getAllStatuses();
		this.isEditing = false;
		this.employeeInfoForm = this._initEditForm()

		this.user$ = _employeeService.selectedUser;
		this.departments$ = this._netService
			.getDepartmentsList({
				skipCount: 0,
				takeCount: 100,
			})
			.pipe(map((res) => res.body));
		this.positions$ = this._netService
			.getPositionsList({
				skipCount: 0,
				takeCount: 100,
			})
			.pipe(map((res) => res.body));
		this.offices$ = this._netService.getOfficesList({ skipCount: 0, takeCount: 100 }).pipe(map((res) => res.body));
		this.roles$ = this._roleService.findRoles({ skipCount: 0, takeCount: 50 }).pipe(map((res) => res.roles));
	}

	public get user(): User | undefined {
		return this.userSubject.value;
	}

	public get communications(): FormArray {
		return this.employeeInfoForm.get('communications') as FormArray;
	}

	public ngOnInit(): void {
		this._route.params
			.pipe(
				map((params) => {
					this._getUser(params.id);
					this.employeeInfoForm = this._initEditForm();
					this._cdr.detectChanges();
				})
			)
			.subscribe();
		// this._getUser();
		// this._initEditForm();
	}

	public isOwner() {
		// return this.user.id === this.pageId;
		return true;
	}

	public canEdit() {
		// return this.user.isAdmin || this.isOwner();
		return true;
	}

	public toggleEditMode() {
		this._fillForm();
		this.isEditing = !this.isEditing;
	}

	public onSubmit() {
		this._patchEditUser();
		this.toggleEditMode();
	}

	public onReset() {
		this.employeeInfoForm.reset();
		this.toggleEditMode();
	}

	public changeWorkingRate(step: number) {
		const currentValue = this.employeeInfoForm.get('rate')?.value;
		const rate = +currentValue + step;
		this.employeeInfoForm.patchValue({ rate: rate });

		if (this.employeeInfoForm.get('rate')?.pristine) {
			this.employeeInfoForm.get('rate')?.markAsDirty();
		}
	}

	public compareSelectValues(option: any, value: any) {
		console.log(option, value);
		return option.id === value.id;
	}

	public onOpenDialog() {
		const dialogRef = this._dialog.open(UploadPhotoComponent, {});
		dialogRef.afterClosed().subscribe((result) => {
			if (result) {
				this.employeeInfoForm.patchValue({
					photo: result,
				});
				this.employeeInfoForm.get('photo')?.markAsDirty();
			}
		});
	}

	private _updateEmployeeInfo() {
		this._getUser();
	}

	private _getUser(pageId: string): void {
		const params: IGetUserRequest = {
			userId: pageId,
			includedepartment: true,
			includeposition: true,
			includeoffice: true,
			includecommunications: true,
			includerole: true,
			includeimages: true,
		};

		this._userService.getUser(params).subscribe(this.userSubject);
	}

	private _patchEditUser(): void {
		const editRequest: { path: string; value: any }[] = Object.keys(this.employeeInfoForm.controls)
			.filter((key) => this.employeeInfoForm.get(key)?.dirty)
			.map((key) => ({ path: key, value: this.employeeInfoForm.get(key)?.value }));
		this._userService.editUser(this.user.id, editRequest).subscribe(
			() => {
				this._snackBar.open('User was edited successfully', 'Close', { duration: 3000 });
				this._updateEmployeeInfo();
				// this._userService.getUserSetCredentials(res)
			},
			(error: HttpErrorResponse) => {
				console.log(error);
				this._snackBar.open(error.message, 'Close', { duration: 5000 });
			}
		);
	}

	private _fillForm(): void {
		if (this.user) {
			this.employeeInfoForm.patchValue({
				firstName: this.user.firstName,
				lastName: this.user.lastName,
				middleName: this.user.middleName,
				photo: this.user.avatarImage,
				status: this.user.statusEmoji?.statusType,
				about: this.user.about,
				position: this.user.position?.id,
				department: this.user.department?.id,
				office: this.user.office?.id,
				role: this.user.role?.id,
				rate: this.user.rate,
				city: this.user.city,
				gender: this.user.gender,
				dateOfBirth: this.user.dateOfBirth,
				startWorkingAt: this.user.startWorkingAt,
				communications: this._enrichCommunications(),
			});
		}
	}

	private _initEditForm(): FormGroup {
		return this._fb.group({
			firstName: ['', Validators.required],
			lastName: ['', Validators.required],
			middleName: [''],
			photo: [''],
			status: [null],
			about: [''],
			position: ['', Validators.required],
			department: [''],
			office: ['', Validators.required],
			role: [''],
			rate: ['', Validators.required],
			city: [''],
			startWorkingAt: [null],
			dateOfBirth: [null],
			gender: [UserGender],
			// communications: this.fb.array([
			// 	this.fb.group({ type: CommunicationType.Email, value: ['', Validators.required] }),
			// 	this.fb.group({ type: CommunicationType.Phone, value: ['', Validators.required] }),
			// ]),
		});
	}

	private _initCommunications(): void {
		if (this.user && this.user.communications) {
			this.user.communications
				.map((communication: CommunicationInfo) => {
					return this._fb.group({ type: '', value: '' });
				})
				.forEach((group: FormGroup) => this.communications.push(group));
		}
	}

	private _enrichCommunications(): CommunicationInfo[] {
		if (this.user && this.user.communications) {
			return this.user.communications.map((communication: CommunicationInfo) => {
				return { type: communication.type, value: communication.value };
			});
		} else {
			return [];
		}
	}
}
