import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { DepartmentApiService } from '@data/api/company-service/services/department-api.service';
import { INewMember } from '@app/interfaces/INewMember';
import { map } from 'rxjs/operators';
import { UserApiService } from '@data/api/user-service/services/user-api.service';
import { User } from '@data/api/user-service/models/user';
import { NewMembersBoardComponent } from '../new-members-board/new-members-board.component';

@Component({
  selector: 'do-new-department',
  templateUrl: './new-department.component.html',
  styleUrls: ['./new-department.component.scss'],
})
export class NewDepartmentComponent implements OnInit {
  public director: INewMember;
  public directors: INewMember[];
  private getDirectorsSubscription: Subscription;

  public departmentForm = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    description: new FormControl(null, [Validators.required]),
    directorId: new FormControl(null, [Validators.required]),
  });

  constructor(
    public userApiService: UserApiService,
    public departmentApiService: DepartmentApiService,
    private dialogRef: MatDialogRef<NewMembersBoardComponent>,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
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
    this.getDirectorsSubscription = this.userApiService
      .getAllUsers({
        skipCount: 0,
        takeCount: 50,
      })
      .pipe(
        map((data: User[]) =>
          data.map((userDb) => ({
            id: userDb.id,
            fullName: `${userDb.firstName} ${userDb.lastName} `,
            projectsCount: 0,
            level: '',
            profileImgSrc: '',
            specialization: '',
          }))
        )
      )
      .subscribe((data: INewMember[]) => {
        this.directors = data;
        console.log(this.directors);
      });
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
          users: [
            {
              userId: '6146B87A-587D-4945-A565-1CBDE93F187C',
              positionId: 'EEDE7723-3C5D-4DD1-96F1-17B7F22CE266', //add any position Id from your DB
            },
          ],
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
