import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of, Subscription } from 'rxjs';
import { DepartmentApiService } from '@data/api/company-service/services/department-api.service';
import { UserApiService } from '@data/api/user-service/services/user-api.service';
import { UserSearchComponent } from '../new-project/modals/user-search/user-search.component';
import { UsersResponse } from '@data/api/user-service/models/users-response';
import { switchMap } from 'rxjs/operators';
import { UserInfo } from '@data/api/user-service/models/user-info';

@Component({
  selector: 'do-new-department',
  templateUrl: './new-department.component.html',
  styleUrls: ['./new-department.component.scss'],
})
export class NewDepartmentComponent implements OnInit {
  public directors: UserInfo[] = [];
  private getDirectorsSubscription: Subscription;

  public departmentForm = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    description: new FormControl(null, [Validators.required]),
    directorId: new FormControl(null, [Validators.required]),
  });

  constructor(
    public userApiService: UserApiService,
    public departmentApiService: DepartmentApiService,
    private dialogRef: MatDialogRef<UserSearchComponent>,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getDirectors();

    this.departmentForm = this.formBuilder.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(100),
        ],
      ],
      description: [
        '',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(1000),
        ],
      ],
      directorId: ['', [Validators.required, Validators.minLength(1)]],
    });
  }

  getDirectors(): void {
    //Rework when will api with specialization sort
    this.getDirectorsSubscription = this.userApiService.findUsers({
      skipCount: 0,
      takeCount: 50,
    }).pipe(
        switchMap((usersResponse: UsersResponse) => of(usersResponse.users)),
    ).subscribe((data: UserInfo[]) => this.directors = data);
  }

  postDepartment(): void {
    this.departmentApiService
      .addDepartment({
        body: {
          info: {
            name: this.departmentForm.controls['name'].value,
            description: this.departmentForm.controls['description'].value,
            directorUserId: this.departmentForm.controls['directorId'].value,
          },
        },
      })
      .subscribe(
        (res) => {
          this.snackBar.open('New department added successfully', 'done', {
            duration: 3000,
          });
        },
        (error: HttpErrorResponse) => {
          this.snackBar.open(error.error.Message, 'accept');
          throw error;
        }
      );
  }
}
