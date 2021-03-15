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

import { DepartmentApiService } from '@data/api/company-service/services/department-api.service';
import { INewMember } from '@app/interfaces/INewMember';
import { NewMembersBoardComponent } from '../new-members-board/new-members-board.component';

@Component({
  selector: 'do-new-department',
  templateUrl: './new-department.component.html',
  styleUrls: ['./new-department.component.scss'],
})
export class NewDepartmentComponent implements OnInit {
  public director: INewMember;

  public departmentForm = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    description: new FormControl(null, [Validators.required]),
    directorId: new FormControl(null, [Validators.required]),
  });

  constructor(
    public departmentApiService: DepartmentApiService,
    private dialogRef: MatDialogRef<NewMembersBoardComponent>,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
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

  public onAddMemberClick(): void {
    const dialogRef = this.dialog.open(NewMembersBoardComponent, {
      width: '720px',
      height: '650px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.director = result[0];
      if (this.director !== undefined) {
        this.departmentForm.controls['directorId'].setValue(this.director.id);
      } else {
        this.departmentForm.controls['directorId'].setValue('');
      }
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
          usersIds: [
            this.departmentForm.controls['directorId'].value,
            this.departmentForm.controls['directorId'].value,
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
