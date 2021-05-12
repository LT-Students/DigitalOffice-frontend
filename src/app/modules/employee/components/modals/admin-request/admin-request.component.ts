import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'do-admin-request',
  templateUrl: './admin-request.component.html',
  styleUrls: ['./admin-request.component.scss']
})
export class AdminRequestComponent implements OnInit {
  requestMessage = '';

  constructor(private dialogRef: MatDialogRef<AdminRequestComponent>) { }

  ngOnInit(): void {
  }

  closeDialog() {
    this.dialogRef.close(this.requestMessage);
  }

}
