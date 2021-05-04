import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';

import { PositionApiService } from '@data/api/company-service/services/position-api.service';
import { PositionResponse } from '@data/api/company-service/models/position-response';
import { CommunicationInfo } from '@data/api/user-service/models/communication-info';
import { CommunicationType, CreateUserRequest, UserInfo } from '@data/api/user-service/models';
import { UserService } from '@app/services/user.service';
import { UserStatus } from '@app/models/user-status.model';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'do-new-employee',
  templateUrl: './new-employee.component.html',
  styleUrls: ['./new-employee.component.scss'],
})
export class NewEmployeeComponent implements OnInit {
  public user: User;
  public message: string;
  public imagePath;
  public imgURL: any;
  public userForm: FormGroup;
  public positions;
  public departments: string[];
  public offices: string[];
  public sex: string[];
  public isVisible: boolean;
  public passwordIcon: string;
  public passwordType: string;

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
    this.isVisible = false;
    this.passwordIcon = 'visibility_off';
    this.passwordType = 'password';
  }

  ngOnInit(): void {
    this.getPositions();
    this.userForm = this.formBuilder.group({
      lastName: ['', [Validators.required, Validators.maxLength(32)]],
      firstName: ['', [Validators.required, Validators.maxLength(32)]],
      middleName: ['', [Validators.maxLength(32)]],
      position: ['', [Validators.required]],
      city: ['', [Validators.required]],
      sex: [''],
      birthDate: [''],
      workingSince: ['', [Validators.required]],
      rate: ['1', [Validators.required]],
      department: ['', [Validators.required]],
      office: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      login: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(16),
        ],
      ],
      password: ['', [Validators.required]],
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

  generateCredentials(): void {
    // todo add this part when APi is ready
  }

  preview(files) {
    if (files.length === 0) {
      return;
    }

    let mimeType = files[0].type;
    if (mimeType.match(/image\/*/) === null) {
      this.message = 'Only images are supported.';
      return;
    }

    let reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (event) => {
      this.imgURL = reader.result;
    };
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
