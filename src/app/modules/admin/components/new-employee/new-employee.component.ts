import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';

import { User } from '@data/api/user-service/models/user';
import { UserApiService } from '@data/api/user-service/services/user-api.service';
import { PositionApiService } from '@data/api/company-service/services/position-api.service';
import { map } from 'rxjs/operators';
import { PositionResponse } from '@data/api/company-service/models/position-response';

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
  public positions = [];
  public rates = [0, 0.5, 1, 1.5, 2];
  public departments = [
    { name: 'department1' },
    { name: 'department2' },
    { name: 'department3' },
  ];

  constructor(
    private formBuilder: FormBuilder,
    private positionApiService: PositionApiService,
    private userApiService: UserApiService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getPositions();
    this.userForm = this.formBuilder.group({
      lastName: ['', [Validators.required, Validators.maxLength(32)]],
      firstName: ['', [Validators.required, Validators.maxLength(32)]],
      middleName: ['', [Validators.required, Validators.maxLength(32)]],
      position: [''],
      rate: [''],
      department: [''],
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
    let pos;
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
          email: this.userForm.controls['email'].value,
          login: this.userForm.controls['login'].value,
          firstName: this.userForm.controls['firstName'].value,
          lastName: this.userForm.controls['lastName'].value,
          middleName: this.userForm.controls['middleName'].value,
          password: this.userForm.controls['password'].value,
          isAdmin: true,
          isActive: true,
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
}
