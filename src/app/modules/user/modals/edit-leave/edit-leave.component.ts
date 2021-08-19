import { Component, Inject } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { TimeService } from "@app/services/time/time.service";

@Component({
    selector: 'do-edit-leave',
    templateUrl: './edit-leave.component.html',
    styleUrls: ['./edit-leave.component.scss']
})
export class EditLeaveComponent {
    public editForm: FormGroup;

    constructor(
        @Inject(MAT_DIALOG_DATA) public leave: { startTime: string, endTime: string, type: string, description: string, hours: number, id: string },
        private _fb: FormBuilder,
        private _dialogRef: MatDialogRef<EditLeaveComponent>,
        private _timeService: TimeService
    ) {
        this.editForm = this._initEditForm();
    }

    public onSubmitClick(): void {
        let startTime = new Date(this.editForm.get('startTime')?.value).toISOString();
        let endTime = new Date(this.editForm.get('endTime')?.value).toISOString();

        this._timeService.editLeaveTime({
            leaveTimeId: this.leave.id,
            body: [
                {
                    op: 'replace',
                    path: '/Comment',
                    value: this.editForm.get('description')?.value
                },
                // {
                //     op: 'replace',
                //     path: '/StartTime',
                //     value: startTime
                // },
                // {
                //     op: 'replace',
                //     path: '/EndTime',
                //     value: endTime
                // }
            ]
        }).subscribe(res => {
            this._dialogRef.close({
                status: res.status,
                data: {
                    comment: this.editForm.get('description')?.value,
                    startTime: startTime,
                    endTime: endTime
                }
            })
        })
    }

    public onCancelClick(): void {
        this._dialogRef.close({
            status: '',
            data: {}
        });
    }

    private _initEditForm(): FormGroup {
        return this._fb.group({
            startTime: [new Date(this.leave.startTime), [Validators.required]],
            endTime: [new Date(this.leave.endTime), [Validators.required]],
            description: [this.leave.description],
            id: this.leave.id
        })
    }
}