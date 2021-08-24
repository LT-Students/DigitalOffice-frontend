import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Input, OnChanges, ViewChild } from "@angular/core";

import { ModalService, ModalWidth } from "@app/services/modal.service";
import { LeaveTimeInfo, LeaveType, OperationResultStatusType } from "@data/api/time-service/models";
import { DeleteLeaveComponent } from "../../modals/delete-leave/delete-leave.component";
import { EditLeaveComponent } from "../../modals/edit-leave/edit-leave.component";
import { IDialogResponse } from "../user-tasks/user-tasks.component";
import { LeaveTimeModel } from "@app/models/leave-time.model";

export interface IModalContentConfig {
    id?: string;
    startTime?: string;
    endTime?: string;
    leaveType?: LeaveType;
    comment?: string;
    hours?: number;
    date?: Date;
}

@Component({
    selector: 'do-leaves',
    templateUrl: './leaves.component.html',
    styleUrls: ['./leaves.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LeavesComponent implements OnChanges {
    @Input() leaves: LeaveTimeInfo[] | undefined | null;
    @Input() canEdit: boolean;
    @ViewChild("comment") comment: ElementRef | undefined;

    constructor(
        private _modalService: ModalService,
        private _cdr: ChangeDetectorRef
    ) {
        this.leaves = [];
        this.canEdit = true;
    }

    public ngOnChanges() {
        console.log(this.leaves)
    }

    public getRusType(leaveType: LeaveType) {
        return LeaveTimeModel.getLeaveInfoByLeaveType(leaveType)?.leaveInRussian;
    }

    getPeriodInHours(startTime: string, endTime: string): number {
        const startDate = new Date(startTime)
        const endDate = new Date(endTime)

        return (endDate.getTime() - startDate.getTime()) / 1000 / 60 / 60 + 24;
    }

    public openEditModal(leave: LeaveTimeInfo): void {
        let modalContentConfig: IModalContentConfig = {
            id: leave.id,
            startTime: leave.startTime,
            endTime: leave.endTime,
            leaveType: leave.leaveType,
            comment: leave.comment,
            hours: this.getPeriodInHours(leave.startTime!, leave.endTime!)
        }

        this._modalService
            .openModal<EditLeaveComponent, IModalContentConfig, IDialogResponse>(EditLeaveComponent, ModalWidth.L, modalContentConfig)
            .afterClosed()
            .subscribe(result => {
                if (result?.status === OperationResultStatusType.FullSuccess) {
                    leave.comment = result.data.comment;
                    leave.startTime = result.data.startTime;
                    leave.endTime = result.data.endTime;

                    this._cdr.detectChanges();
                }
            })
    }

    public openDeleteModal(leave: LeaveTimeInfo): void {
        let modalContentConfig: IModalContentConfig = {
            leaveType: leave.leaveType,
            date: new Date(leave.startTime!),
            id: leave.id
        }

        this._modalService
            .openModal<DeleteLeaveComponent, IModalContentConfig, IDialogResponse>(DeleteLeaveComponent, ModalWidth.M, modalContentConfig)
            .afterClosed()
            .subscribe(result => {
                if (result?.status === OperationResultStatusType.FullSuccess) {
                    const deletedIndex = this.leaves?.findIndex(leave => leave.id === result.data.id);
                    if (deletedIndex !== -1) {
                        this.leaves?.splice(deletedIndex!, 1);

                        this._cdr.detectChanges();
                    }
                }
            })
    }
}