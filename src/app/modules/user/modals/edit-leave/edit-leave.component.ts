import { ChangeDetectionStrategy, Component, Inject } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { TimeService } from "@app/services/time/time.service";
import { IDialogResponse } from "../../components/user-tasks/user-tasks.component";
import { LeaveTimeModel } from "@app/models/leave-time.model";
import { IModalContentConfig } from "../../components/leaves/leaves.component";
import { LeaveType } from "@data/api/time-service/models";

@Component({
    selector: 'do-edit-leave',
    templateUrl: './edit-leave.component.html',
    styleUrls: ['./edit-leave.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditLeaveComponent {
    public editForm: FormGroup;
    public periodInHours: number;
    public startTimeSelected: boolean;

    constructor(
        @Inject(MAT_DIALOG_DATA) public leave: IModalContentConfig,
        private _fb: FormBuilder,
        private _dialogRef: MatDialogRef<EditLeaveComponent, IDialogResponse>,
        private _timeService: TimeService,
    ) {
        this.startTimeSelected = false;
        this.editForm = this._initEditForm();
        this.periodInHours = this.leave.hours!;
    }

    // Таков прикол, что эта функция должна быть DateFilterFn<D>, и если указать просто (date: Date), то будет маячить ошибка в консоли, но работать будет,
    // так что это ради избавления от той ошибки.
    // Также, если сделать обычной функцией, то this указывает на объект календаря, а не на компоненту.
    public filterDate = <D>(date: Date): boolean => {
        if (this.startTimeSelected)
            return date.getMonth() === new Date(this.editForm.get('startTime')?.value).getMonth();

        return true;
    }

    public DateSelected(): void {
        if (!this.editForm.get('endTime')?.value) {
            this.startTimeSelected = true;
        }
        else {
            const startTime = new Date(this.editForm.get('startTime')?.value);
            const endTime = new Date(this.editForm.get('endTime')?.value);

            this._setPeriodInHours(startTime, endTime);
            this.startTimeSelected = false;
        }
    }

    private _setPeriodInHours(startTime: Date, endTime: Date): void {
        const periodInHours = (endTime.getTime() - startTime.getTime()) / 1000 / 60 / 60 + 24;
        this.periodInHours = periodInHours > 0 ? periodInHours : 0;
    }

    public getRusType(leaveType: LeaveType) {
        return LeaveTimeModel.getLeaveInfoByLeaveType(leaveType)?.leaveInRussian;
    }

    public onClose(params?: IDialogResponse): void {
        this._dialogRef.close(params);
    }

    public onSubmitClick(): void {
        let startTime = new Date(this.editForm.get('startTime')?.value).toISOString();
        let endTime = new Date(this.editForm.get('endTime')?.value).toISOString();

        if (!this.editForm.invalid) {
            this._timeService.editLeaveTime({
                leaveTimeId: this.leave.id!,
                body: [
                    {
                        op: 'replace',
                        path: '/Comment',
                        value: this.editForm.get('description')?.value
                    },
                    {
                        op: 'replace',
                        path: '/StartTime',
                        value: startTime
                    },
                    {
                        op: 'replace',
                        path: '/EndTime',
                        value: endTime
                    }
                ]
            }).subscribe(result => {
                this.onClose({
                    status: result.status,
                    data: {
                        comment: this.editForm.get('description')?.value,
                        startTime: startTime,
                        endTime: endTime
                    }
                })
            })
        }
    }

    private _initEditForm(): FormGroup {
        const fg = this._fb.group({
            startTime: [new Date(this.leave.startTime!), [Validators.required]],
            endTime: [new Date(this.leave.endTime!), [Validators.required]],
            description: [this.leave.comment],
            id: this.leave.id
        })

        return fg;
    }
}