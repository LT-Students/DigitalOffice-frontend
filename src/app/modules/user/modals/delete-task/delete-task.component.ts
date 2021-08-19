import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { TimeService } from "@app/services/time/time.service";
import { EditLeaveTimeRequest, EditWorkTimeRequest, OperationResultResponse } from "@data/api/time-service/models";

@Component({
    selector: 'do-delete-task',
    templateUrl: 'delete-task.component.html',
    styleUrls: ['delete-task.component.scss']
})
export class DeleteTaskComponent {
    constructor(
        @Inject(MAT_DIALOG_DATA) public task: { taskType: 'leave' | 'project', date: string, name: Date, id: string },
        private _dialogRef: MatDialogRef<DeleteTaskComponent>,
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

        switch (this.task.taskType) {
            case 'leave': {
                this._timeService.editLeaveTime({
                    leaveTimeId: this.task.id,
                    body
                }).subscribe((res: OperationResultResponse) => {
                    this._dialogRef.close({
                        status: res.status,
                        data: {
                            id: this.task.id
                        }
                    })
                })
            }
            default: {
                return;
            }
        }
    }
}