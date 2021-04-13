import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';

import { User } from '@data/api/user-service/models/user';
import { UserApiService } from '@data/api/user-service/services/user-api.service';
import { PositionApiService } from '@data/api/company-service/services/position-api.service';
import { PositionResponse } from '@data/api/company-service/models/position-response';
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
    private userApiService: UserApiService,
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
    // this.userApiService
    //   .createUser({
    //     body: {
    //       lastName: this.userForm.controls['lastName'].value,
    //       firstName: this.userForm.controls['firstName'].value,
    //       middleName: this.userForm.controls['middleName'].value,
    //       position: this.userForm.controls['position'].value,
    //       city: this.userForm.controls['city'].value,
    //       sex: this.userForm.controls['sex'].value,
    //       birthDate: this.userForm.controls['birthDate'].value,
    //       workingSince: this.userForm.controls['workingSince'].value,
    //       rate: this.userForm.controls['rate'].value,
    //       department: this.userForm.controls['department'].value,
    //       office: this.userForm.controls['office'].value,
    //       email: this.userForm.controls['email'].value,
    //       password: this.userForm.controls['password'].value,
    //       isAdmin: true,
    //       isActive: true,
    //     },
    //   })
    //   .subscribe(
    //     (res) => {
    //       this.snackBar.open('New user added successfully', 'done', {
    //         duration: 3000,
    //       });
    //     },
    //     (error: HttpErrorResponse) => {
    //       this.snackBar.open(error.error.Message, 'accept');
    //       throw error;
    //     }
    //   );
    this.snackBar.open('New user added successfully', 'done', {
      duration: 3000,
    });
    this.dialogRef.close();
  }

  generateCredentials(): void {
    // this.userApiService.generatePassword().subscribe(
    //   (res) => {
    //     this.userForm.patchValue({ password: res });
    //   },
    //   (error: HttpErrorResponse) => {
    //     this.snackBar.open(error.error.Message, 'accept');
    //     throw error;
    //   }
    // );
    this.userForm.patchValue({ password: 'some-random-string' });
  }

  toggleVisibility(): void {
    this.isVisible = !this.isVisible;
    if (this.isVisible) {
      this.passwordIcon = 'visibility';
      this.passwordType = 'text';
    } else {
      this.passwordIcon = 'visibility_off';
      this.passwordType = 'password';
    }
  }
}
