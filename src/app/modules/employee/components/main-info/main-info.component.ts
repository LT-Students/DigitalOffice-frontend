import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IUser } from '@data/models/user';
import { Time } from '@angular/common';
import { IUserStatus, UserStatusModel } from '@app/models/user-status.model';
import { DateType } from '@app/models/date.model';
import { employee } from '../../mock';
import { UserStatus } from '@data/api/user-service/models/user-status';
import { User } from '@app/models/user.model';
import { CommunicationInfo } from '@data/api/user-service/models/communication-info';

interface ExtendedUser extends IUser {
  about?: string;
  photoUrl: string;
  position: string;
  department: string;
  location: string;
  office: string;
  workingRate: number;
  workingHours: { startAt: Time; endAt: Time };
  workingSince?: Date;
  birthDate: Date;
  email: string,
  phone: string,
  telegram: string,
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
  @Input() user: User;

  public pageId: string;
  public employeeInfoForm: FormGroup;
  public employee: ExtendedUser;
  public selectOptions;
  public isEditing: boolean;
  public previewPhoto: string;
  public userStatus: typeof UserStatus = UserStatus;
  public dateType: typeof DateType = DateType;
  public status: IUserStatus;

  constructor(private fb: FormBuilder, private route: ActivatedRoute) {
    this.employee = employee;

    this.selectOptions = {
      position: ['Middle Product Manager', 'Senior Product Manager'],
      department: ['Департамент цифровых технологий', 'Департамент мопсиков'],
      office: ['м. Чернышевская', 'м. Площадь Восстания'],
      statuses: UserStatusModel.getAllStatuses(),
      workingHours: ['8:00', '9:00', '10:00', '16:00', '17:00', '19:00'],
    };

    this.isEditing = false;
    this.previewPhoto = null;

    this.employeeInfoForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      middleName: [''],
      photo: [''],
      status: [null],
      about: [''],
      position: ['', Validators.required],
      department: ['', Validators.required],
      rate: ['', Validators.required],
      workingSince: [null],
      communications: this.fb.array([])
    });

    this.pageId = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.previewPhoto = this.user.avatar.content;
    this.status = UserStatusModel.getUserStatusInfoByType(this.user.user.status);
    this._getCommunications().forEach((communicationControl: FormGroup) => this.communications.push(communicationControl));

  }

  public get communications(): FormArray {
    return this.employeeInfoForm.get('communications') as FormArray;
  }

  get workingHours() {
    const getTime = (timeObj: Time) => {
      const minutes = (timeObj.minutes < 10) ? timeObj.minutes + '0' : timeObj.minutes;
      return `${timeObj.hours}:${minutes}`;
    };
    return Object.values(this.employee.workingHours).map((timeObj: Time) => getTime(timeObj)).join('-');
  }

  isOwner() {
    return this.user.id === this.pageId;
  }

  canEdit() {
    return this.user.isAdmin || this.isOwner();
  }

  toggleEditMode() {
    this.fillForm();
    this.isEditing = !this.isEditing;
  }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      const reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (evt) => {
        this.employeeInfoForm.patchValue({
          photo: evt.target.result,
        });
        this.previewPhoto = evt.target.result as string;
      };
    }
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
    this.employeeInfoForm.patchValue({
      firstName: [this.user.firstName],
      lastName: [this.user.lastName],
      middleName: this.user.middleName,
      photo: `data:image/jpeg;base64,${this.user.avatar.content}`,
      status: this.user.status,
      about: this.user.user.about,
      position: this.user.position,
      department: this.user.department.name,
      rate: this.user.user.rate,
      workingSince: this.user.startWorkingDate,
      // communications: this._getCommunications(),
    });
  }

  compareEmoji(option, value) {
    return option.emoji === value.emoji;
  }

  changeWorkingRate(step) {
    const currentValue = this.employeeInfoForm.get('rate').value;
    const rate = +currentValue + step;
    this.employeeInfoForm.patchValue({ rate: rate });
  }

  private _getCommunications(): FormGroup[] {
    return this.user.communications.map((communication: CommunicationInfo) => {
      return this.fb.group({
        type: communication.type,
        value: communication.value
      });
    });
  }
}
