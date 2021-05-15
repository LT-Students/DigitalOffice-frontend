import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IUser } from '@data/models/user';
import { Time } from '@angular/common';
import { UserStatus, UserStatusModel } from '@app/models/user-status.model';
import { DateType } from '@app/models/date.model';
import { UserInfo } from '@data/api/user-service/models/user-info';
import { MatDialog } from '@angular/material/dialog';
import { employee } from '../../mock';
import { UploadPhotoComponent } from '../modals/upload-photo/upload-photo.component';

interface ExtendedUser extends IUser {
	about?: string;
	photoUrl: string;
	jobPosition: string;
	department: string;
	location: string;
	office: string;
	workingRate: number;
	workingHours: { startAt: Time; endAt: Time };
	workingSince?: Date;
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
	@Input() avatar: object;
	@Input() user: UserInfo;
	@Input() department: object;

	public pageId: string;
	public employeeInfoForm: FormGroup;
	public employee: ExtendedUser;
	public selectOptions;
	public isEditing: boolean;
	public previewPhoto: string;
	public userStatus: typeof UserStatus = UserStatus;
	public dateType: typeof DateType = DateType;

	constructor(
		private fb: FormBuilder,
		private route: ActivatedRoute,
		private dialog: MatDialog
	) {
		this.employee = employee;

		this.selectOptions = {
			jobPosition: ['Middle Product Manager', 'Senior Product Manager'],
			department: [
				'Департамент цифровых технологий',
				'Департамент мопсиков',
			],
			office: ['м. Чернышевская', 'м. Площадь Восстания'],
			statuses: UserStatusModel.getAllStatuses(),
			workingHours: ['8:00', '9:00', '10:00', '16:00', '17:00', '19:00'],
		};

		this.isEditing = false;
		this.previewPhoto = this.employee.photoUrl;

		this.employeeInfoForm = this.fb.group({
			firstName: ['', Validators.required],
			lastName: ['', Validators.required],
			middleName: [''],
			photoUrl: [''],
			status: [null],
			about: [''],
			jobPosition: ['', Validators.required],
			department: ['', Validators.required],
			location: ['', Validators.required],
			office: ['', Validators.required],
			workingRate: ['', Validators.required],
			workingHours: this.fb.group({
				startAt: [''],
				endAt: [''],
			}),
			workingSince: [null],
			birthDate: [''],
			email: ['', [Validators.required, Validators.email]],
			phone: ['', Validators.required],
			telegram: [''],
			vacationSince: ['', Validators.required],
			sickSince: ['', Validators.required],
			vacationUntil: ['', Validators.required],
			vacationDays: ['', Validators.required],
		});

		this.pageId = this.route.snapshot.paramMap.get('id');
	}

	ngOnInit(): void {}

	get fullName() {
		const { lastName, firstName, middleName } = this.employee;
		return `${lastName} ${firstName} ${middleName}`;
	}

	get workingHours() {
		const getTime = (timeObj: Time) => {
			const minutes =
				timeObj.minutes < 10 ? timeObj.minutes + '0' : timeObj.minutes;
			return `${timeObj.hours}:${minutes}`;
		};
		return Object.values(this.employee.workingHours)
			.map((timeObj: Time) => getTime(timeObj))
			.join('-');
	}

	isOwner() {
		return this.employee.id === this.pageId;
	}

	canEdit() {
		return this.employee.isAdmin || this.isOwner();
	}

	toggleEditMode() {
		this.fillForm();
		this.isEditing = !this.isEditing;
	}

	updateEmployeeInfo() {
		this.employee = { ...this.employee, ...this.employeeInfoForm.value };
	}

	onSubmit() {
		this.updateEmployeeInfo();
		this.toggleEditMode();
	}

	onReset() {
		this.employeeInfoForm.reset();
		this.toggleEditMode();
	}

	fillForm() {
		this.employeeInfoForm.patchValue(this.employee);
	}

	compareEmoji(option, value) {
		return option.emoji === value.emoji;
	}

	changeWorkingRate(step) {
		const currentValue = this.employeeInfoForm.get('workingRate').value;
		const rate = +currentValue + step;
		this.employeeInfoForm.patchValue({ workingRate: rate });
	}

	onOpenDialog() {
		const dialogRef = this.dialog.open(UploadPhotoComponent, {});
		dialogRef.afterClosed().subscribe((result) => {
			if (result) {
				this.employeeInfoForm.patchValue({
					photoUrl: result,
				});
				this.previewPhoto = result;
			}
		});
	}
}
