import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UserService } from '@digital-office/api/user-service';
import { User } from '@digital-office/api/user-service';

import { LocalStorageService } from '../../../../services/local-storage.service';

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
    private userService: UserService,
    private localStorageService: LocalStorageService
  ) {
    this.userForm = this.formBuilder.group({
      lastName: ['', Validators.required],
      firstName: ['', Validators.required],
      middleName: ['', Validators.required],
      position: [''],
      rate: [''],
      department: [''],
      isAdmin: ['true'],
      isActive: ['true'],
      login: [''],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  createEmployee(): void {
    this.userService
      .createUserPost({
        //id: this.localStorageService.get('user'),
        id: '6146b87a-587d-4945-a565-1cbde93f187c',
        email: this.userForm.controls['email'].value,
        login: this.userForm.controls['lastName'].value,
        firstName: this.userForm.controls['firstName'].value,
        lastName: this.userForm.controls['lastName'].value,
        middleName: this.userForm.controls['middleName'].value,
        status: 'someStatus',
        password: this.userForm.controls['password'].value,
        isAdmin: true,
        isActive: true,
        avatarFileId: '',

        /*: this.userForm.controls['position'].value,
        : this.userForm.controls['rate'].value,
        : this.userForm.controls['department'].value,*/
      })
      .subscribe((res) => {});
  }

  sendCredentials(): void {}

  generateCredentials(): void {}

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
