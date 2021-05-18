import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IUser } from '@data/models/user';
import { Time } from '@angular/common';
import { IUserStatus, UserStatusModel } from '@app/models/user-status.model';
import { DateType } from '@app/models/date.model';
import { employee, userResponse } from '../../mock';
import { UserStatus } from '@data/api/user-service/models/user-status';
import { User } from '@app/models/user.model';
import { CommunicationInfo } from '@data/api/user-service/models/communication-info';
import { promptGlobalAnalytics } from '@angular/cli/models/analytics';
import { UserResponse } from '@data/api/user-service/models/user-response';
import { UserService } from '@app/services/user.service';
import { switchMap, takeUntil, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { DepartmentService } from '@app/services/department.service';
import { DepartmentInfo } from '@data/api/user-service/models/department-info';
import { ProjectService } from '@app/services/project.service';
import { PositionInfo } from '@data/api/user-service/models/position-info';
import { CommunicationType } from '@data/api/user-service/models';

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
  public pageId: string;
  public employeeInfoForm: FormGroup;
  public employee: ExtendedUser;
  public selectOptions;
  public isEditing: boolean;
  public previewPhoto: string;
  public userStatus: typeof UserStatus = UserStatus;
  public dateType: typeof DateType = DateType;
  public user: User;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private _userService: UserService, private _departmentService: DepartmentService,
              private _projectService: ProjectService) {
    this.employee = employee;

    this.selectOptions = {
      positions: [],
      departments: [],
      office: ['м. Чернышевская', 'м. Площадь Восстания'],
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
    this._userService.getMockUser(this.pageId).pipe(
        switchMap((userResponse: UserResponse) => of(new User(userResponse)))
    ).subscribe((user: User) => this.user = user);
    this._initEditForm();

    this._departmentService.getDepartments().subscribe((departments: DepartmentInfo[]) => {
      this.selectOptions.departments = departments;
    })

    this._projectService.getProjectPositions().subscribe((positions: PositionInfo[]) => {
      this.selectOptions.positions = positions;
    })
    // this.previewPhoto = this.user.avatar.content;
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
    console.log(this.employeeInfoForm.value);
    /*TODO send APi request and rerender page*/
    this.user.avatar.content = this.employeeInfoForm.value.photo;
    this.user.user.about = this.employeeInfoForm.value.about;
    this.user.communications = this.employeeInfoForm.value.communications;
    this.user.position = { ...this.employeeInfoForm.value.position, receivedAt: new Date().toISOString() };
    this.user.department = this.employeeInfoForm.value.department;
    this.user.firstName = this.employeeInfoForm.value.firstName;
    this.user.lastName = this.employeeInfoForm.value.lastName;
    this.user.middleName = this.employeeInfoForm.value.middleName;
    this.user.user.rate = +this.employeeInfoForm.value.rate;
    this.user.user.status = this.employeeInfoForm.value.status;
    this.user.user.startWorkingAt = this.employeeInfoForm.value.workingSince.toISOString();
    // this.employee = { ...this.employee, ...this.employeeInfoForm.value };
  }

  onSubmit() {
    this.updateEmployeeInfo();
    this.isEditing = !this.isEditing;
  }

  onReset() {
    this.employeeInfoForm.reset();
    this.isEditing = !this.isEditing;
  }

  fillForm() {
    const middleName = (this.user.middleName) ? this.user.middleName : '';
    const photo = (this.user.avatar && this.user.avatar.content) ? `${this.user.avatar.content}` : '';
    const status = (this.user.status) ? this.user.status.statusType : '';
    const about = (this.user.user.about) ? this.user.user.about : '';
    const position = (this.user.position) ? this.user.position : '';
    const department = (this.user.department) ? this.user.department : '';
    const rate = ( this.user.user.rate) ?  this.user.user.rate : '';

    this.employeeInfoForm.patchValue({
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      middleName: middleName,
      photo: photo,
      status: status,
      about: about,
      position: position,
      department: department,
      rate: rate,
      workingSince: this.user.startWorkingDate,
      communications: this._enrichCommunications()
    });
  }

  changeWorkingRate(step) {
    const currentValue = this.employeeInfoForm.get('rate').value;
    const rate = +currentValue + step;
    this.employeeInfoForm.patchValue({ rate: rate });
  }

  compareSelectValues(option: any, value: any) {
    console.log(option, value);
    return option.id === value.id;
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
      rate: ['', Validators.required],
      workingSince: [null],
      communications: this.fb.array([
        this.fb.group( { type: CommunicationType.Email, value: ['', Validators.required] }),
        this.fb.group({ type: CommunicationType.Phone, value: ['', Validators.required] }),
      ])
    });
  }

  private _initCommunications(): void {
    if (this.user && this.user.communications) {
      this.user.communications.map((communication: CommunicationInfo) => {
        return this.fb.group({ type: '', value: '' });
      }).forEach((group: FormGroup) => this.communications.push(group));
    }
  }

  private _enrichCommunications(): CommunicationInfo[] {
    if (this.user && this.user.communications) {
      return this.user.communications.map((communication: CommunicationInfo) => {
        return { type: communication.type, value: communication.value };
      });
    } else {
     return [];
    };
  }
}
