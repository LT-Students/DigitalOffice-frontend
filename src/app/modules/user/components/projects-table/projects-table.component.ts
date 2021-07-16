import { Component, OnInit } from '@angular/core';
import { ProjectService } from '@app/services/project.service';
import { ProjectInfo } from '@data/api/project-service/models/project-info';
import { Router } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';
import { RouteType } from '../../../../app-routing.module';

@Component({
	selector: 'do-projects-table',
	templateUrl: './projects-table.component.html',
	styleUrls: ['./projects-table.component.scss'],
})
export class ProjectsTableComponent implements OnInit {
	public projectList: ProjectInfo[];

	public totalCount: number;
	public pageSize: number;
	public pageIndex: number;

	constructor(private _projectService: ProjectService, private _router: Router) {
		this.totalCount = 0;
		this.pageSize = 10;
		this.pageIndex = 0;
	}

	// activeProjects: Project[] = [];
	// suspendedProjects: Project[] = [];
	// closedProjects: Project[] = [];
	// visiblyGroup = '';
	//
	// public groups = [
	// 	{ groupName: 'В работе', groupData: this.activeProjects },
	// 	{ groupName: 'Приостановлены', groupData: this.suspendedProjects },
	// 	{ groupName: 'Завершены', groupData: this.closedProjects },
	// ];

	ngOnInit() {
		// const active: Project = {
		// 	id: '1',
		// 	name: 'Меркурий – лечу на орбиту',
		// 	shortName: 'shortName',
		// 	departmentId: '1',
		// 	isActive: true,
		// 	consumer: {
		// 		name: 'Роскосмос',
		// 		description: '',
		// 	},
		// 	description:
		// 		'Внедряем ПО на железки Роскосмоса для полета к орбите Меркурия. Человечество надеется на нас! Внедряем ПО на железки Роскосмоса для полета к орбите Меркурия. Человечество надеется на нас!',
		// 	contributors: [
		// 		{
		// 			user: {
		// 				firstName: 'Вася',
		// 				lastName: 'Пчелкин',
		// 				photo: './assets/images/girl.png',
		// 			},
		// 			totalTime: {
		// 				hours: 280,
		// 				minutes: 40,
		// 			},
		// 		},
		// 		{
		// 			user: {
		// 				firstName: 'Вася',
		// 				lastName: 'Пчелкин',
		// 				photo: './assets/images/girl.png',
		// 			},
		// 			totalTime: {
		// 				hours: 280,
		// 				minutes: 40,
		// 			},
		// 		},
		// 		{
		// 			user: {
		// 				firstName: 'Вася',
		// 				lastName: 'Пчелкин',
		// 				photo: './assets/images/girl.png',
		// 			},
		// 			totalTime: {
		// 				hours: 280,
		// 				minutes: 40,
		// 			},
		// 		},
		// 		{
		// 			user: {
		// 				firstName: 'Вася',
		// 				lastName: 'Пчелкин',
		// 				photo: './assets/images/girl.png',
		// 			},
		// 			totalTime: {
		// 				hours: 280,
		// 				minutes: 40,
		// 			},
		// 		},
		// 		{
		// 			user: {
		// 				firstName: 'Вася',
		// 				lastName: 'Пчелкин',
		// 				photo: './assets/images/girl.png',
		// 			},
		// 			totalTime: {
		// 				hours: 280,
		// 				minutes: 40,
		// 			},
		// 		},
		// 	],
		// };
		//
		// const suspended = {
		// 	id: '1',
		// 	name: 'Герои Меча и Магии XXV',
		// 	shortName: 'shortName',
		// 	departmentId: '1',
		// 	isActive: false,
		// 	consumer: {
		// 		name: 'Российский Фонд Кино',
		// 		description: '',
		// 	},
		// 	description: 'Тут были единороги и 50 новых видов драконов, но проект приостановлен до возобновления финансирования',
		// 	contributors: [
		// 		{
		// 			user: {
		// 				firstName: 'Вася',
		// 				lastName: 'Пчелкин',
		// 				photo: './assets/images/girl.png',
		// 			},
		// 			totalTime: {
		// 				hours: 123,
		// 				minutes: 40,
		// 			},
		// 		},
		// 	],
		// 	historyDetails: 'Приостановлен 10.06.2019',
		// };
		//
		// const closed: Project = {
		// 	id: '1',
		// 	name: 'Ребрендинг “Мир Света”',
		// 	shortName: 'shortName',
		// 	departmentId: '1',
		// 	isActive: false,
		// 	consumer: {
		// 		name: 'ИП Горин Д.А.',
		// 		description: '',
		// 	},
		// 	description: 'Делаем так, чтобы всем захотелось срочно поменять все светильники в доме!!',
		// 	contributors: [
		// 		{
		// 			user: {
		// 				firstName: 'Вася',
		// 				lastName: 'Пчелкин',
		// 				photo: './assets/images/girl.png',
		// 			},
		// 			totalTime: {
		// 				hours: 123,
		// 				minutes: 40,
		// 			},
		// 		},
		// 	],
		// 	historyDetails: 'Завершен 02.03.2020',
		// };
		//
		// this.activeProjects.push(active, active, active, active);
		// this.suspendedProjects.push(suspended);
		// this.closedProjects.push(closed);

		this._getProjectList();
	}

	// onSelect(selectChange) {
	// 	this.visiblyGroup = selectChange.value;
	// }

	public onPageChange(event: PageEvent): void {
		this.pageSize = event.pageSize;
		this.pageIndex = event.pageIndex;
		this._getProjectList();
	}

	public onProjectClick(projectId: string): void {
		this._router.navigate([`${RouteType.PROJECT}/${projectId}`]);
	}

	public onAddProjectClick(): void {
		this._router.navigate(['admin/new-project']);
	}

	private _getProjectList(): void {
		this._projectService.getProjectList(this.pageIndex * this.pageSize, this.pageSize).subscribe((result) => {
			this.totalCount = result.totalCount;
			this.projectList = result.body;
		});
	}
}
