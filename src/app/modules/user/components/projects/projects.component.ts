import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalService, ModalWidth } from '@app/services/modal.service';
import { DeleteTaskComponent } from '../../modals/delete-task/delete-task.component';
import { EditProjectComponent } from '../../modals/edit-project/edit-project.component';
import { mappedProject, Project } from '../user-tasks/user-tasks.component';

@Component({
	selector: 'do-projects',
	templateUrl: './projects.component.html',
	styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements OnChanges, OnInit {
	@Input() public projects: mappedProject[];
	// @Input() public selectedPeriod;

	public plural: { [k: string]: string };
	public totalMinutes: number;
	//public canEdit: boolean;
	public selectedDate: Date;

	constructor(
		private _modalService: ModalService,
		private dialog: MatDialog
	) {
		this.plural = {
			one: '# запись',
			few: '# записи',
			other: '# записей'
		}
		this.totalMinutes = 0;
		this.selectedDate = new Date();
		this.projects = [];
		//this.canEdit = false;
	}

	public ngOnInit(): void {
		console.log('Проекты: ', this.projects)
	}

	public ngOnChanges(changes: SimpleChanges): void {
		console.log('Changes: ', changes.projects)
		console.log('CurrentValue: ', changes.projects.currentValue)
		if (changes.projects.currentValue !== changes.projects.previousValue)
			this.projects = changes.projects.currentValue;
		// if (changes.projects.currentValue !== changes.projects.previousValue)
		// 	this.selectedDate = new Date(this.projects.year, this.projects.month + 1, 0)
		// console.log('ДАТА: ', this.selectedDate)

		// const currentDate = new Date();
		// if (this.selectedPeriod.startTime.getMonth() === currentDate.getMonth() && this.selectedPeriod.startTime.getFullYear() === currentDate.getFullYear()) {
		// 	console.log('Выбранная дата совпадает с текущим месяцем')
		// 	this.canEdit = true;
		// }
		// if (changes.project.currentValue !== changes.project.previousValue) {
		// 	this.project.tasks.forEach(task => {
		// 		this.totalMinutes += task.minutes
		// 	})
		// }
	}

	public getDate(year: number, month: number) {
		return new Date(year, month, 0)
	}

	public openEditModal(project: mappedProject) {
		this._modalService.openModal(EditProjectComponent, ModalWidth.L, {
			id: project.id,
			name: project.name,
			hours: project.userHours,
			description: project.description,
			month: project.month,
			year: project.year
		})
	}

	public openDeleteModal(project: mappedProject) {
		this._modalService.openModal(DeleteTaskComponent, ModalWidth.M, {
			taskType: 'project',
			name: project.name,
			date: new Date(project.year, project.month - 1)
		})
	}
}
