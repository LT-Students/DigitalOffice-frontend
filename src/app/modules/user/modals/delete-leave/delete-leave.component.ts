import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

import { TimeService } from "@app/services/time/time.service";
import { EditLeaveTimeRequest, EditWorkTimeRequest, OperationResultResponse, OperationResultStatusType } from "@data/api/time-service/models";
import { IDialogResponse } from "../../components/user-tasks/user-tasks.component";

@Component({
    selector: 'do-delete-leave',
    templateUrl: 'delete-leave.component.html',
    styleUrls: ['delete-leave.component.scss']
})
export class DeleteLeaveComponent {
    constructor(
        @Inject(MAT_DIALOG_DATA) public leave: { date: Date, name: string, id: string },
        private _dialogRef: MatDialogRef<DeleteLeaveComponent, IDialogResponse>,
        private _timeService: TimeService
    ) { }

    public onClose(params?: IDialogResponse) {
        this._dialogRef.close(params);
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
            this.onClose({
                status: res.status,
                data: {
                    id: this.leave.id
                }
            })
        })
    }
}