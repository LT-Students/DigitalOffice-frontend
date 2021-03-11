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
import { NewMembersBoardComponent } from '../new-members-board/new-members-board.component';

@Component({
  selector: 'do-new-department',
  templateUrl: './new-department.component.html',
  styleUrls: ['./new-department.component.scss'],
})
export class NewDepartmentComponent implements OnInit {
  public team = [];

  departmentForm = new FormGroup({
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
      name: ['', []],
      description: ['', []],
      director: ['', []],
    });
  }

  public onAddMembersClick(): void {
    const dialogRef = this.dialog.open(NewMembersBoardComponent, {
      width: '720px',
      height: '650px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
    });
  }

  postDepartment(): void {
    this.departmentApiService
      .createDepartment({
        body: {
          info: {
            description: 'my test',
            directorId: '6146B87A-587D-4945-A565-1CBDE93F187C',
            name: 'testProject',
          },
          users: [
            {
              userId: '6146B87A-587D-4945-A565-1CBDE93F187C',
              positionId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
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
