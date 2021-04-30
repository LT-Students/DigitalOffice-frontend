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
    private userApiService: UserApiService,
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
    this.userApiService
      .createUser({
        body: {
          lastName: this.userForm.controls['lastName'].value,
          firstName: this.userForm.controls['firstName'].value,
          middleName: this.userForm.controls['middleName'].value,
          positionId: this.userForm.controls['positionId'].value,
          // city: this.userForm.controls['city'].value,
          // sex: this.userForm.controls['sex'].value,
          // birthDate: this.userForm.controls['birthDate'].value,
          startWorkingAt: this.userForm.controls['startWorkingAt'].value,
          // rate: this.userForm.controls['rate'].value,
          departmentId: this.userForm.controls['departmentId'].value,
          // office: this.userForm.controls['office'].value,
          communications: this.userForm.controls['email'].value,
          password: this.userForm.controls['password'].value,
          isAdmin: true,
          // isActive: true,
        },
      })
      .subscribe(
        (res) => {
          this.snackBar.open('New user added successfully', 'done', {
            duration: 3000,
          });
        },
        (error: HttpErrorResponse) => {
          this.snackBar.open(error.error.Message, 'accept');
          throw error;
        }
      );
    this.snackBar.open('New user added successfully', 'done', {
      duration: 3000,
    });
    this.dialogRef.close();
  }

  changeWorkingRate(step: number): void {
    this.userForm.patchValue({
      rate: +this.userForm.get('rate').value + step,
    });
  }
}
