import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Input, ViewChild } from "@angular/core";

import { ModalService, ModalWidth } from "@app/services/modal.service";
import { LeaveTimeInfo, OperationResultStatusType } from "@data/api/time-service/models";
import { DeleteLeaveComponent } from "../../modals/delete-leave/delete-leave.component";
import { EditLeaveComponent } from "../../modals/edit-leave/edit-leave.component";
import { IDialogResponse } from "../user-tasks/user-tasks.component";

// Заменить на модель, которую создал Рома
enum rusTypes {
    'Idle' = 'Отгул',
    'Vacation' = 'Отпуск',
    'Training' = 'Обучение',
    'SickLeave' = 'Больничный'
}

@Component({
    selector: 'do-leaves',
    templateUrl: './leaves.component.html',
    styleUrls: ['./leaves.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LeavesComponent {
    @Input() leaves: LeaveTimeInfo[] | undefined | null;
    @ViewChild("comment") comment: ElementRef | undefined;

    public canEdit: boolean;

    constructor(
        private _modalService: ModalService,
        private _cdr: ChangeDetectorRef
    ) {
        this.leaves = [];
        this.canEdit = false;
    }

    public getRusType(type: keyof typeof rusTypes): string {
        return rusTypes[type];
    }

    public openEditModal(leave: LeaveTimeInfo): void {
        let modalContentConfig = {
            id: leave.id,
            startTime: leave.startTime,
            endTime: leave.endTime,
            type: this.getRusType(leave.leaveType!).toLowerCase(),
            comment: leave.comment,
            minutes: leave.minutes
        }
        // Выглядит плохо, но я не нашёл, как по-другому можно передать result: R в openModal, на интерфейс он жаловался, поэтому пока так
        let response: IDialogResponse = {};

        this._modalService
            .openModal(EditLeaveComponent, ModalWidth.L, modalContentConfig, response)
            .afterClosed()
            .subscribe((result) => {
                if (result?.status === OperationResultStatusType.FullSuccess) {
                    leave.comment = result.data.comment;
                    leave.startTime = result.data.startTime;
                    leave.endTime = result.data.endTime;

                    this._cdr.detectChanges();
                }
            })
    }

    public openDeleteModal(leave: LeaveTimeInfo): void {
        let modalContentConfig = {
            taskType: 'leave',
            name: this.getRusType(leave.leaveType!).toLowerCase(),
            date: new Date(leave.startTime!),
            id: leave.id
        }
        let response: IDialogResponse = {};

        this._modalService
            .openModal(DeleteLeaveComponent, ModalWidth.M, modalContentConfig, response)
            .afterClosed()
            .subscribe((result) => {
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