import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

import { TimeService } from "@app/services/time/time.service";
import { EditLeaveTimeRequest, EditWorkTimeRequest, LeaveType, OperationResultResponse, OperationResultStatusType } from "@data/api/time-service/models";
import { IModalContentConfig } from "../../components/leaves/leaves.component";
import { IDialogResponse } from "../../components/user-tasks/user-tasks.component";
import { LeaveTimeModel } from "@app/models/leave-time.model";

@Component({
    selector: 'do-delete-leave',
    templateUrl: 'delete-leave.component.html',
    styleUrls: ['delete-leave.component.scss']
})
export class DeleteLeaveComponent {
    constructor(
        @Inject(MAT_DIALOG_DATA) public leave: IModalContentConfig,
        private _dialogRef: MatDialogRef<DeleteLeaveComponent, IDialogResponse>,
        private _timeService: TimeService
    ) { }

    public getRusType(leaveType: LeaveType) {
        return LeaveTimeModel.getLeaveInfoByLeaveType(leaveType)?.leaveInRussian;
    }

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
            leaveTimeId: this.leave.id!,
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