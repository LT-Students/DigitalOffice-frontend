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
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(80),
        ],
      ],
      description: [
        '',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(350),
        ],
      ],
    });
  }

  postSpecialization(): void {
    this.positionApiService
      .addPosition({
        body: {
          name: this.specializationForm.controls['name'].value,
          description: this.specializationForm.controls['description'].value,
          isActive: true,
        },
      })
      .subscribe(
        (res) => {
          this.snackBar.open('New specialization added successfully', 'done', {
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
