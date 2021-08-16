import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
    selector: 'do-delete-task',
    templateUrl: 'delete-task.component.html',
    styleUrls: ['delete-task.component.scss']
})
export class DeleteTaskComponent {
    constructor(
        @Inject(MAT_DIALOG_DATA) public task: { taskType: 'leave' | 'project', date: string, name: Date },
        private dialogRef: MatDialogRef<DeleteTaskComponent>
    ) { }

    public onCancel() {
        this.dialogRef.close({ deleted: false });
    }

    public onSubmit() {
        this.dialogRef.close({ deleted: true });
    }
}