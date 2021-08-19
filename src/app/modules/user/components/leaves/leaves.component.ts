import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Input, ViewChild } from "@angular/core";
import { ModalService, ModalWidth } from "@app/services/modal.service";
import { LeaveTimeInfo } from "@data/api/time-service/models";
import { DeleteLeaveComponent } from "../../modals/delete-leave/delete-leave.component";
import { EditLeaveComponent } from "../../modals/edit-leave/edit-leave.component";

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
        this._modalService.openModal(EditLeaveComponent, ModalWidth.L, {
            id: leave.id,
            startTime: leave.startTime,
            endTime: leave.endTime,
            type: this.getRusType(leave.leaveType!).toLowerCase(),
            description: leave.comment,
            hours: leave.minutes! / 60
        }).afterClosed().subscribe((result: any) => {
            if (result?.status === 'FullSuccess') {
                leave.comment = result.data.comment;
                leave.startTime = result.data.startTime;
                leave.endTime = result.data.endTime;

                this._cdr.detectChanges();
            }
        })
    }

    public openDeleteModal(leave: LeaveTimeInfo): void {
        this._modalService.openModal(DeleteLeaveComponent, ModalWidth.M, {
            taskType: 'leave',
            name: this.getRusType(leave.leaveType!).toLowerCase(),
            date: new Date(leave.startTime!),
            id: leave.id
        }).afterClosed().subscribe((result: any) => {
            console.log(result.status)
            if (result?.status === 'FullSuccess') {
                console.log('ОПа')
                const deletedIndex = this.leaves?.findIndex(leave => leave.id === result.data.id);
                if (deletedIndex !== -1) {
                    this.leaves?.splice(deletedIndex!, 1);
                    console.log('LEAVES: ', this.leaves)

                    this._cdr.detectChanges();
                }
            }
        })
    }
}