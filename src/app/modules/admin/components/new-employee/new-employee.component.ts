import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'do-new-employee',
  templateUrl: './new-employee.component.html',
  styleUrls: ['./new-employee.component.scss'],
})
export class NewEmployeeComponent implements OnInit {
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

  constructor(private formBuilder: FormBuilder) {
    this.userForm = this.formBuilder.group({
      lastName: ['', Validators.required],
      firstName: ['', Validators.required],
      middleName: ['', Validators.required],
      position: ['', Validators.required],
      rate: ['', Validators.required],
      department: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  createEmployee(): void {}

  sendCredentials(): void {}

  generateCredentials(): void {}

  preview(files) {
    if (files.length === 0) {
      return;
    }

    let mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
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
