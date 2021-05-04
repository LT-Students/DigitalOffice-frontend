import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { UserApiService } from '@data/api/user-service/services/user-api.service';
import { PositionApiService } from '@data/api/company-service/services/position-api.service';
import { PositionResponse } from '@data/api/company-service/models/position-response';
import { MatDialogRef } from '@angular/material/dialog';
import { IUser } from '@data/models/user';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { HttpErrorResponse } from '@angular/common/http';
import { DepartmentApiService } from '@data/api/company-service/services/department-api.service';
import { CreateUserRequest } from '@data/api/user-service/models/create-user-request';
import { CommunicationInfo } from '@data/api/user-service/models/communication-info';
import { UserStatus } from '@app/models/user-status.model';
import { CommunicationType } from '@data/api/user-service/models';
import { UserService } from '@app/services/user.service';

export const DATE_FORMAT = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'd MMMM y',
    monthYearLabel: 'YYYY',
  },
};

@Component({
  selector: 'do-new-employee',
  templateUrl: './new-employee.component.html',
  styleUrls: ['./new-employee.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    { provide: MAT_DATE_FORMATS, useValue: DATE_FORMAT },
  ],
})
export class NewEmployeeComponent implements OnInit {
  public user: IUser;
  public message: string;
  public imagePath;
  public imgURL: any;
  public userForm: FormGroup;
  public positions;
  public departments: string[];
  public offices: string[];
  public sex: string[];

  constructor(
    private formBuilder: FormBuilder,
    private positionApiService: PositionApiService,
    private userService: UserService,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<any>
  ) {
    this.positions = ['Junior Pug', 'Boss Pug'];
    this.departments = ['Pug Department', 'Corgi Department'];
    this.offices = ['м. Чернышевская', 'Улица Пушкина, дом Колотушкина'];
    this.sex = ['Мужской', 'Женский', 'Не определён'];
  }

  ngOnInit(): void {
    this.getPositions();
    this.userForm = this.formBuilder.group({
      lastName: ['', [Validators.required, Validators.maxLength(32)]],
      firstName: ['', [Validators.required, Validators.maxLength(32)]],
      middleName: ['', [Validators.maxLength(32)]],
      positionId: ['', [Validators.required]],
      city: ['', [Validators.required]],
      sex: [''],
      birthDate: [''],
      startWorkingAt: ['', [Validators.required]],
      rate: ['1', [Validators.required]],
      departmentId: ['', [Validators.required]],
      office: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  getPositions(): void {
    this.positionApiService
      .getPositionsList()
      .subscribe((data: PositionResponse[]) => {
        this.positions = data;
      });
  }

  createEmployee(): void {
    const params = this._convertFormDataToCreateUserParams();

    this.userService.createUser(params).subscribe(
        () => {
          this.snackBar.open('New user added successfully', 'done', {
            duration: 3000,
          });
        },
        (error: HttpErrorResponse) => {
          this.snackBar.open(error.error.Message, 'accept');
          throw error;
        }
    );
  }


  changeWorkingRate(step: number): void {
    this.userForm.patchValue({
      rate: +this.userForm.get('rate').value + step,
    });
  }

  private _convertFormDataToCreateUserParams(): CreateUserRequest {
    const communications: CommunicationInfo[] = [{type: CommunicationType.Email, value: this.userForm.get('email').value}];

    const params: CreateUserRequest = {
      firstName: this.userForm.get('firstName').value as string,
      lastName: this.userForm.get('lastName').value as string,
      middleName: this.userForm.get('middleName').value as string,
      password: this.userForm.get('password').value as string,
      rate: this.userForm.get('rate').value as number,
      isAdmin: true,
      communications: communications,
      startWorkingAt: new Date().toDateString(),
      status: UserStatus.WorkFromHome
    }

    return params;
  }
}
