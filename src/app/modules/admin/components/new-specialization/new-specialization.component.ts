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
import { PositionApiService } from '@data/api/company-service/services/position-api.service';

@Component({
  selector: 'do-new-specialization',
  templateUrl: './new-specialization.component.html',
  styleUrls: ['./new-specialization.component.scss'],
})
export class NewSpecializationComponent implements OnInit {
  specializationForm = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    description: new FormControl(null, [Validators.required]),
  });

  constructor(
    public positionApiService: PositionApiService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.specializationForm = this.formBuilder.group({
      name: ['', []],
      description: ['', []],
    });
  }

  postSpecialization(): void {
    this.positionApiService
      .createPosition({
        body: {
          name: '',
          description: '',
          id: '',
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
