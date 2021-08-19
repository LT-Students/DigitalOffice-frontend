import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { TimeService } from "@app/services/time/time.service";
import { EditLeaveTimeRequest, EditWorkTimeRequest, OperationResultResponse } from "@data/api/time-service/models";

@Component({
    selector: 'do-delete-leave',
    templateUrl: 'delete-leave.component.html',
    styleUrls: ['delete-leave.component.scss']
})
export class DeleteLeaveComponent {
    constructor(
        @Inject(MAT_DIALOG_DATA) public leave: { date: Date, name: string, id: string },
        private _dialogRef: MatDialogRef<DeleteLeaveComponent>,
        private _timeService: TimeService
    ) { }

    public onCancel() {
        this._dialogRef.close({
            status: '',
            data: {}
        });
    }

    public onSubmit() {
        const body: EditLeaveTimeRequest | EditWorkTimeRequest = [
            {
                op: 'replace',
                path: '/IsActive',
                value: false
            }
        ]

        this._timeService.editLeaveTime({
            leaveTimeId: this.leave.id,
            body
        }).subscribe((res: OperationResultResponse) => {
            this._dialogRef.close({
                status: res.status,
                data: {
                    id: this.leave.id
                }
            })
        })
    }
}