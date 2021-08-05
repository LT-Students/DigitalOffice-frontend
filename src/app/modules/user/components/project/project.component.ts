import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Project } from '../user-tasks/user-tasks.component';

@Component({
	selector: 'do-project',
	templateUrl: './project.component.html',
	styleUrls: ['./project.component.scss'],
})
export class ProjectComponent implements OnChanges {
	@Input() public project: Project;
	@Input() public selectedPeriod;

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

	public ngOnChanges(changes: SimpleChanges): void {
		const currentDate = new Date();
		if (this.selectedPeriod.startTime.getMonth() === currentDate.getMonth() && this.selectedPeriod.startTime.getFullYear() === currentDate.getFullYear()) {
			console.log('Выбранная дата совпадает с текущим месяцем')
			this.canEdit = true;
		}
		if (changes.project.currentValue !== changes.project.previousValue) {
			this.project.tasks.forEach(task => {
				this.totalMinutes += task.minutes
			})
		}
	}
}
