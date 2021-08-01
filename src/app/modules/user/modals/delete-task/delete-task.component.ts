import { Component } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";

@Component({
    selector: 'do-delete-task',
    templateUrl: 'delete-task.component.html',
    styleUrls: ['delete-task.component.scss']
})
export class DeleteTaskComponent {
    constructor(private dialogRef: MatDialogRef<DeleteTaskComponent>) { }

    public onCancel() {
        this.dialogRef.close({ deleted: false });
    }

    public onSubmit() {
        this.dialogRef.close({ deleted: true });
    }
}