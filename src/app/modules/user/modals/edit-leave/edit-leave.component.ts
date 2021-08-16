import { Component, Inject } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
    selector: 'do-edit-leave',
    templateUrl: './edit-leave.component.html',
    styleUrls: ['./edit-leave.component.scss']
})
export class EditLeaveComponent {
    public editForm: FormGroup;

    constructor(
        @Inject(MAT_DIALOG_DATA) public leave: { startTime: string, endTime: string, type: string, description: string, hours: number },
        private _fb: FormBuilder,
        private _dialogRef: MatDialogRef<EditLeaveComponent>
    ) {
        this.editForm = this._initEditForm();
    }

    public onCancelClick(): void {
        this._dialogRef.close();
    }

    private _initEditForm(): FormGroup {
        return this._fb.group({
            startTime: [new Date(this.leave.startTime), [Validators.required]],
            endTime: [new Date(this.leave.endTime), [Validators.required]],
            description: [this.leave.description]
        })
    }
}