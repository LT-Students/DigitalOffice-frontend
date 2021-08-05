import { Component, Input, OnChanges, SimpleChanges } from "@angular/core";
import { LeaveTimeInfo } from "@data/api/time-service/models";

@Component({
    selector: 'do-leaves',
    templateUrl: './leaves.component.html',
    styleUrls: ['./leaves.component.scss']
})
export class LeavesComponent implements OnChanges {
    @Input() leaves: LeaveTimeInfo[];
    @Input() selectedPeriod;

    public plural: { [k: string]: string };
    public totalMinutes: number;
    public canEdit: boolean;

    constructor() {
        this.plural = {
            one: '# запись',
            few: '# записи',
            other: '# записей'
        }
        this.totalMinutes = 0;
        this.canEdit = false;
    }

    ngOnChanges(changes: SimpleChanges) {
        const currentDate = new Date();
        if (this.selectedPeriod.startTime.getMonth() === currentDate.getMonth() && this.selectedPeriod.startTime.getFullYear() === currentDate.getFullYear()) {
            console.log('Выбранная дата совпадает с текущим месяцем')
            this.canEdit = true;
        }
        if (changes.leaves.currentValue !== changes.leaves.previousValue) {
            this.leaves.forEach(leave => this.totalMinutes += leave.minutes)
        }
    }
}