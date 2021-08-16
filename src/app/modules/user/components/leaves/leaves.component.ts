import { Component, Input, OnChanges, SimpleChanges } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ModalService, ModalWidth } from "@app/services/modal.service";
import { LeaveTimeInfo } from "@data/api/time-service/models";
import { DeleteTaskComponent } from "../../modals/delete-task/delete-task.component";
import { EditLeaveComponent } from "../../modals/edit-leave/edit-leave.component";

enum rusTypes {
    'Idle' = 'Праздник',
    'Vacation' = 'Отпуск',
    'Training' = 'Тренинг',
    'SickLeave' = 'Больничный'
}

@Component({
    selector: 'do-leaves',
    templateUrl: './leaves.component.html',
    styleUrls: ['./leaves.component.scss']
})
export class LeavesComponent implements OnChanges {
    @Input() leaves: LeaveTimeInfo[] | null;
    //@Input() selectedPeriod;

    public plural: { [k: string]: string };
    public totalMinutes: number;
    public canEdit: boolean;

    constructor(
        private _modalService: ModalService,
        private _dialog: MatDialog
    ) {
        this.plural = {
            one: '# запись',
            few: '# записи',
            other: '# записей'
        }
        this.leaves = null;
        this.totalMinutes = 0;
        this.canEdit = false;
    }

    public ngOnChanges(changes: SimpleChanges): void {
        this.leaves = changes.leaves.currentValue;
        console.log('LEAVES: ', this.leaves)
        //console.log(LeaveTypes['Idle'])
        // const currentDate = new Date();
        // if (this.selectedPeriod.startTime.getMonth() === currentDate.getMonth() && this.selectedPeriod.startTime.getFullYear() === currentDate.getFullYear()) {
        //     console.log('Выбранная дата совпадает с текущим месяцем')
        //     this.canEdit = true;
        // }
        // if (changes.leaves.currentValue !== changes.leaves.previousValue) {
        //     this.leaves.forEach(leave => this.totalMinutes += leave.minutes)
        // }
    }

    public getRusType(type: keyof typeof rusTypes): string {
        return rusTypes[type];
    }

    public openEditModal(leave: LeaveTimeInfo): void {
        this._modalService.openModal(EditLeaveComponent, ModalWidth.L, {
            startTime: leave.startTime,
            endTime: leave.endTime,
            type: this.getRusType(leave.leaveType!).toLowerCase(),
            description: leave.comment,
            hours: leave.minutes! / 60
        })
    }

    public openDeleteModal(leave: LeaveTimeInfo): void {
        this._modalService.openModal(DeleteTaskComponent, ModalWidth.M, {
            taskType: 'leave',
            name: this.getRusType(leave.leaveType!).toLowerCase(),
            date: new Date(leave.startTime!)
        })
    }
}