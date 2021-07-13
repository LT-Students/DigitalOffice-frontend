import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IUser } from '@data/models/user';
import { Time } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { UserStatusModel } from '@app/models/user-status.model';
import { DateType } from '@app/models/date.model';
import { UserStatus } from '@data/api/user-service/models/user-status';
import { User } from '@app/models/user.model';
import { CommunicationInfo } from '@data/api/user-service/models/communication-info';
import { promptGlobalAnalytics } from '@angular/cli/models/analytics';
import { UserResponse } from '@data/api/user-service/models/user-response';
import { UserService } from '@app/services/user.service';
import { switchMap, takeUntil, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { DepartmentInfo } from '@data/api/user-service/models/department-info';
import { ProjectService } from '@app/services/project.service';
import { PositionInfo } from '@data/api/user-service/models/position-info';
import { CommunicationType, ErrorResponse } from '@data/api/user-service/models';
import { NetService } from '@app/services/net.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FindOfficesResponse } from '@data/api/company-service/models/find-offices-response';
import { employee } from '../../mock';
import { UploadPhotoComponent } from '../modals/upload-photo/upload-photo.component';

interface ExtendedUser extends IUser {
	about?: string;
	photoUrl: string;
	position: string;
	department: string;
	location: string;
	office: string;
	workingRate: number;
	workingHours: { startAt: Time; endAt: Time };
	startWorkingAt?: Date;
	birthDate: Date;
	email: string;
	phone: string;
	telegram: string;
	vacationDaysLeft: number;
	vacationSince?: Date;
	vacationUntil?: Date;
	sickSince?: Date;
}

@Component({
	selector: 'do-employee-page-main-info',
	templateUrl: './main-info.component.html',
	styleUrls: ['./main-info.component.scss'],
})
export class MainInfoComponent implements OnInit {
	public pageId: string;
	public employeeInfoForm: FormGroup;
	public employee: ExtendedUser;
	public selectOptions;
	public isEditing: boolean;
	public previewPhoto: string;
	public userStatus: typeof UserStatus = UserStatus;
	public dateType: typeof DateType = DateType;
	public user: User;

	constructor(
		private fb: FormBuilder,
		private route: ActivatedRoute,
		private _userService: UserService,
		private _netService: NetService,
		private dialog: MatDialog,
		private _snackBar: MatSnackBar
	) {
		this.employee = employee;

		this.selectOptions = {
			positions: [],
			departments: [],
			offices: [],
			statuses: UserStatusModel.getAllStatuses(),
			workingHours: ['8:00', '9:00', '10:00', '16:00', '17:00', '19:00'],
		};
		this.isEditing = false;
		this.previewPhoto = null;
		this.user = null;
		this.pageId = this.route.snapshot.paramMap.get('id');
		this._initEditForm();
	}
	ngOnInit(): void {
		this._getUser();
		this._initEditForm();

		this._netService.getDepartmentsList().subscribe((departments: DepartmentInfo[]) => {
			this.selectOptions.departments = departments;
		});

		this._netService.getPositionsList().subscribe((positions: PositionInfo[]) => {
			this.selectOptions.positions = positions;
		});

		this._netService.getOfficesList().subscribe(({ offices }: FindOfficesResponse) => {
			this.selectOptions.offices = offices;
		});
		// this.previewPhoto = this.user.avatar.content;
	}

	public get communications(): FormArray {
		return this.employeeInfoForm.get('communications') as FormArray;
	}

	get workingHours() {
		const getTime = (timeObj: Time) => {
			const minutes = timeObj.minutes < 10 ? timeObj.minutes + '0' : timeObj.minutes;
			return `${timeObj.hours}:${minutes}`;
		};
		return Object.values(this.employee.workingHours)
			.map((timeObj: Time) => getTime(timeObj))
			.join('-');
	}

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
		this._userService
		// .getMockUser(this.pageId)
		.getUser(this.pageId, true)
		.pipe(switchMap((userResponse: UserResponse) => of(new User(userResponse))))
		.subscribe((user: User) => {
			this.user = user;
			console.log(user);
		});
	}

	public patchEditUser(): void {
		const editRequest = Object.keys(this.employeeInfoForm.controls)
			.filter((key) => this.employeeInfoForm.get(key).dirty)
			.map((key) => ({ path: key, value: this.employeeInfoForm.get(key).value }));
		this._userService.editUser(this.user.id, editRequest).subscribe(
			(result) => {
				this._snackBar.open('User was edited successfully', 'Close', { duration: 3000 });
				this.updateEmployeeInfo();
			},
			(error: ErrorResponse) => {
				console.log(error);
				this._snackBar.open(error.message, 'Close', { duration: 5000 });
			}
		);
	}

	onSubmit() {
		this.patchEditUser();
		this.toggleEditMode();
	}

	onReset() {
		this.employeeInfoForm.reset();
		this.toggleEditMode();
	}

	fillForm() {
		const middleName = this.user.middleName ? this.user.middleName : '';
		const photo = this.user.avatar && this.user.avatar.content ? `${this.user.avatar.content}` : '';
		const status = this.user.status ? this.user.status.statusType : '';
		const about = this.user.user.about ? this.user.user.about : '';
		const position = this.user.user.position ? this.user.user.position.id : '';
		const department = this.user.user.department ? this.user.user.department.id : '';
		const office = this.user.user.office ? this.user.user.office.id : '';
		const rate = this.user.user.rate ? this.user.user.rate : '';

		this.employeeInfoForm.patchValue({
			firstName: this.user.firstName,
			lastName: this.user.lastName,
			middleName: middleName,
			photo: photo,
			status: status,
			about: about,
			position: position,
			department: department,
			office: office,
			rate: rate,
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
				this.previewPhoto = result;
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
			department: ['', Validators.required],
			office: ['', Validators.required],
			rate: ['', Validators.required],
			startWorkingAt: [null],
			communications: this.fb.array([
				this.fb.group({ type: CommunicationType.Email, value: ['', Validators.required] }),
				this.fb.group({ type: CommunicationType.Phone, value: ['', Validators.required] }),
			]),
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
