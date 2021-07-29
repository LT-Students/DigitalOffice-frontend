import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { UserStatusModel } from '@app/models/user/user-status.model';
import { DateType } from '@app/types/date.enum';
import { UserStatus } from '@data/api/user-service/models/user-status';
import { User } from '@app/models/user/user.model';
import { CommunicationInfo } from '@data/api/user-service/models/communication-info';
import { UserService } from '@app/services/user.service';
import { map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { DepartmentInfo } from '@data/api/user-service/models/department-info';
import { PositionInfo } from '@data/api/user-service/models/position-info';
import { ErrorResponse, OperationResultResponseUserResponse, UserGender } from '@data/api/user-service/models';
import { NetService } from '@app/services/net.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RoleApiService } from '@data/api/rights-service/services/role-api.service';
import { IUserGender, PersonalInfoManager } from '@app/models/user/personal-info-manager';
import { getUserRequest } from '@app/types/get-user-request.interface';
import { UploadPhotoComponent } from '../../modals/upload-photo/upload-photo.component';

@Component({
	selector: 'do-employee-page-main-info',
	templateUrl: './main-info.component.html',
	styleUrls: ['./main-info.component.scss'],
})
export class MainInfoComponent implements OnInit {
	public pageId: string;
	public employeeInfoForm: FormGroup;
	public selectOptions;
	public isEditing: boolean;
	public userStatus: typeof UserStatus = UserStatus;
	public dateType: typeof DateType = DateType;
	public user: User;
	public genders: IUserGender[];

	constructor(
		private fb: FormBuilder,
		private route: ActivatedRoute,
		private _userService: UserService,
		private _netService: NetService,
		private dialog: MatDialog,
		private _snackBar: MatSnackBar,
		private _roleService: RoleApiService
	) {
		this.selectOptions = {
			roles: [],
			positions: [],
			departments: [],
			offices: [],
			statuses: UserStatusModel.getAllStatuses(),
			workingHours: ['8:00', '9:00', '10:00', '16:00', '17:00', '19:00'],
		};
		this.genders = PersonalInfoManager.getGenderList();
		this.isEditing = false;
		this.user = null;
		this.pageId = this.route.snapshot.paramMap.get('id');
		this._initEditForm();
	}
	ngOnInit(): void {
		this.route.params
			.pipe(
				map((params) => params.id),
				map((pageId) => {
					this.pageId = pageId;
					this._getUser();
					this._initEditForm();
				})
			)
			.subscribe();
		// this._getUser();
		// this._initEditForm();

		this._netService.getDepartmentsList({ skipCount: 0, takeCount: 100 }).subscribe(({ body: departments }) => {
			this.selectOptions.departments = departments;
		});

		this._netService.getPositionsList({ skipCount: 0, takeCount: 100 }).subscribe(({ body: positions }) => {
			this.selectOptions.positions = positions;
		});

		this._netService.getOfficesList({ skipCount: 0, takeCount: 100 }).subscribe(({ body: offices }) => {
			this.selectOptions.offices = offices;
		});

		this._roleService.findRoles({ skipCount: 0, takeCount: 50 }).subscribe(({ roles }) => {
			this.selectOptions.roles = roles;
		});
	}

	public get communications(): FormArray {
		return this.employeeInfoForm.get('communications') as FormArray;
	}

	// get workingHours() {
	// 	const getTime = (timeObj: Time) => {
	// 		const minutes = timeObj.minutes < 10 ? timeObj.minutes + '0' : timeObj.minutes;
	// 		return `${timeObj.hours}:${minutes}`;
	// 	};
	// 	return Object.values(this.employee.workingHours)
	// 		.map((timeObj: Time) => getTime(timeObj))
	// 		.join('-');
	// }

	isOwner() {
		// return this.user.id === this.pageId;
		return true;
	}

	canEdit() {
		// return this.user.isAdmin || this.isOwner();
		return true;
	}

	toggleEditMode() {
		this.fillForm();
		this.isEditing = !this.isEditing;
	}

	updateEmployeeInfo() {
		this._getUser();
	}

	private _getUser(): void {
		const params: getUserRequest = {
			userId: this.pageId,
			includedepartment: true,
			includeposition: true,
			includeoffice: true,
			includecommunications: true,
			includerole: true,
			includeimages: true,
		};

		this._userService.getUser(params).subscribe((user: User) => {
			this.user = user;
			console.log(user);
		});
	}

	private _patchEditUser(): void {
		const editRequest: {path: string, value: any }[] = Object.keys(this.employeeInfoForm.controls)
			.filter((key) => this.employeeInfoForm.get(key).dirty)
			.map((key) => ({ path: key, value: this.employeeInfoForm.get(key).value }));
		this._userService.editUser(this.user.id, editRequest).subscribe(
			(result) => {
				this._snackBar.open('User was edited successfully', 'Close', { duration: 3000 });
				this.updateEmployeeInfo();
				// this._userService.getUserSetCredentials(res)
			},
			(error: ErrorResponse) => {
				console.log(error);
				this._snackBar.open(error.message, 'Close', { duration: 5000 });
			}
		);
	}

	onSubmit() {
		this._patchEditUser();
		this.toggleEditMode();
	}

	onReset() {
		this.employeeInfoForm.reset();
		this.toggleEditMode();
	}

	fillForm() {
		const middleName = this.user.middleName ? this.user.middleName : '';
		const status = this.user.statusEmoji ? this.user.statusEmoji.statusType : '';
		const about = this.user.user.about ? this.user.user.about : '';
		const position = this.user.user.position ? this.user.user.position.id : '';
		const department = this.user.user.department ? this.user.user.department.id : '';
		const office = this.user.user.office ? this.user.user.office.id : '';
		const role = this.user.user.role ? this.user.user.role.id : '';
		const rate = this.user.user.rate ? this.user.user.rate : '';
		const city = this.user.user.city ? this.user.user.city : '';

		this.employeeInfoForm.patchValue({
			firstName: this.user.firstName,
			lastName: this.user.lastName,
			middleName: middleName,
			photo: this.user.avatarImage,
			status: status,
			about: about,
			position: position,
			department: department,
			office: office,
			role: role,
			rate: rate,
			city: city,
			gender: this.user.user.gender,
			dateOfBirth: this.user.dateOfBirth,
			startWorkingAt: this.user.startWorkingDate,
			communications: this._enrichCommunications(),
		});
	}

	changeWorkingRate(step) {
		const currentValue = this.employeeInfoForm.get('rate').value;
		const rate = +currentValue + step;
		this.employeeInfoForm.patchValue({ rate: rate });

		if (this.employeeInfoForm.get('rate').pristine) {
			this.employeeInfoForm.get('rate').markAsDirty();
		}
	}

	compareSelectValues(option: any, value: any) {
		console.log(option, value);
		return option.id === value.id;
	}

	onOpenDialog() {
		const dialogRef = this.dialog.open(UploadPhotoComponent, {});
		dialogRef.afterClosed().subscribe((result) => {
			if (result) {
				this.employeeInfoForm.patchValue({
					photo: result,
				});
				this.employeeInfoForm.get('photo').markAsDirty();
			}
		});
	}

	private _initEditForm(): void {
		this.employeeInfoForm = this.fb.group({
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
					return this.fb.group({ type: '', value: '' });
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
