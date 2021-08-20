import { Component, Inject } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { TimeService } from "@app/services/time/time.service";
import { IDialogResponse } from "../../components/user-tasks/user-tasks.component";
import { LeaveTimeInfo } from "@data/api/time-service/models";

@Component({
    selector: 'do-edit-leave',
    templateUrl: './edit-leave.component.html',
    styleUrls: ['./edit-leave.component.scss']
})
export class EditLeaveComponent {
    public editForm: FormGroup;

    constructor(
        @Inject(MAT_DIALOG_DATA) public leave: LeaveTimeInfo,
        private _fb: FormBuilder,
        private _dialogRef: MatDialogRef<EditLeaveComponent, IDialogResponse>,
        private _timeService: TimeService
    ) {
        this.editForm = this._initEditForm();
    }

    public onClose(params?: IDialogResponse): void {
        this._dialogRef.close(params);
    }

    public onSubmitClick(): void {
        let startTime = new Date(this.editForm.get('startTime')?.value).toISOString();
        let endTime = new Date(this.editForm.get('endTime')?.value).toISOString();

        this._timeService.editLeaveTime({
            leaveTimeId: this.leave.id!,
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
            this.onClose({
                status: res.status,
                data: {
                    comment: this.editForm.get('description')?.value,
                    startTime: startTime,
                    endTime: endTime
                }
            })
        })
    }

    private _initEditForm(): FormGroup {
        return this._fb.group({
            startTime: [new Date(this.leave.startTime!), [Validators.required]],
            endTime: [new Date(this.leave.endTime!), [Validators.required]],
            description: [this.leave.comment],
            id: this.leave.id
        })
    }
}