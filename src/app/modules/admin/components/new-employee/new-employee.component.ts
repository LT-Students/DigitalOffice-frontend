import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UserService } from '@digital-office/api/user-service';
import { User } from '@digital-office/api/user-service';

import { catchError, switchMap } from 'rxjs/operators';

@Component({
  selector: 'do-new-employee',
  templateUrl: './new-employee.component.html',
  styleUrls: ['./new-employee.component.scss'],
})
export class NewEmployeeComponent implements OnInit {
  user: User;
  public message: string;
  public imagePath;
  public imgURL: any;
  public userForm: FormGroup;
  public positions = [
    { name: 'position1' },
    { name: 'position2' },
    { name: 'position3' },
  ];
  public rates = [0, 0.5, 1, 1.5, 2];
  public departments = [
    { name: 'department1' },
    { name: 'department2' },
    { name: 'department3' },
  ];

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {
    this.userForm = this.formBuilder.group({
      lastName: ['', Validators.required],
      firstName: ['', Validators.required],
      middleName: ['', Validators.required],
      position: [''],
      rate: [''],
      department: [''],
      email: ['', Validators.required, Validators.email],
      login: ['', [Validators.required, Validators.minLength(5)]],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  createEmployee(): void {
    this.userService
      .createUserPost({
        email: this.userForm.controls['email'].value,
        login: this.userForm.controls['login'].value,
        firstName: this.userForm.controls['firstName'].value,
        lastName: this.userForm.controls['lastName'].value,
        middleName: this.userForm.controls['middleName'].value,
        password: this.userForm.controls['password'].value,
        isAdmin: true,
        isActive: true,
      })
      .pipe(
        /*switchMap(() => {

        }),*/
        catchError((error) => {
          console.log(error.message);
          throw error;
        })
      )
      .subscribe(
        (res) => {},
        (error) => {
          console.log(error.message);
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
