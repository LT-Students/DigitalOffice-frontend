import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnChanges, OnInit, ViewChild } from '@angular/core';
import { Input } from '@angular/core';

import { DatePeriod } from '@data/models/date-period';
import { FindResultResponseWorkTimeInfo, ProjectStatusType } from '@data/api/time-service/models';
import { LeaveTimeInfo, WorkTimeInfo } from '@data/api/time-service/models';
import { TimeService } from '@app/services/time/time.service';
import { UserService } from '@app/services/user/user.service';

// export interface Task {
// 	createdAt?: string;
// 	createdBy?: string;
// 	description?: string;
// 	endTime?: string;
// 	id?: string;
// 	minutes?: number;
// 	startTime?: string;
// 	title?: string;
// 	userId?: string;
// }

export interface Project {
	description?: null | string;
	id?: string;
	userId: string;
	managerHours: string;
	userHours: string;
	month: number;
	year: number;
	project: {
		description: string;
		id: string;
		name: string;
		shortDescription: string;
		shortName: string;
		status: string;
	}
}

export interface mappedProject {
	description: string;
	id: string;
	name: string;
	status: string;
	userId: string;
	managerHours: string;
	userHours: string;
	month: number;
	year: number;
}

@Component({
	selector: 'do-user-tasks',
	templateUrl: './user-tasks.component.html',
	styleUrls: ['./user-tasks.component.scss'],
	//changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserTasksComponent implements OnInit, OnChanges {
	public projects: mappedProject[];
	public leaves: LeaveTimeInfo[] | undefined;
	//@ViewChild('dp') datepicker;

	public tasksCount: number;
	public plural: { [k: string]: string };
	public selectedPeriod;
	//public selectedYear: number;
	//public selectedMonth: number;

	constructor(
		private _timeService: TimeService,
		private _userService: UserService,
		private cdr: ChangeDetectorRef
	) {
		this.projects = [];
		this.leaves = [];
		this.tasksCount = 0;
		// ПОтом надо под тип какой-то подставить и задать изначальные значения в виде текущей даты
		this.selectedPeriod = this._getPeriod(new Date());
		this.plural = {
			one: '# запись',
			few: '# записи',
			other: '# записей'
		}

		// this.projects = [{
		// 	description: 'Я собрала машину времени и перенеслась в прошлое на 50 лет назад. Познакомилась с Майклом, он мило со мной болтал. А ещё вот текст для чего-нибудь',
		// 	id: '1',
		// 	name: 'Нет бэка - данные мок',
		// 	status: 'Active',
		// 	userId: 'user1',
		// 	managerHours: '',
		// 	userHours: '',
		// 	month: 8,
		// 	year: 2021
		// },
		// {
		// 	description: 'Оxtym оооооооооооооооооооооооооооооооооооооооооооооооооооооооооооооооооооооооооооооочень очень очень очень очень очень очень очень очень очень очень очень очень очень очень очень длинное описание',
		// 	id: '2',
		// 	name: 'Нет бэка - данные мок 2',
		// 	status: 'Active',
		// 	userId: 'user2',
		// 	managerHours: '',
		// 	userHours: '120',
		// 	month: 7,
		// 	year: 2020
		// }];

		// this.leaves = [{
		// 	comment: 'Суббота и воскресенье - это выходные, имею право отдохнуть, сходить на природу!',
		// 	endTime: '2021-08-16T12:00',
		// 	id: '1l',
		// 	leaveType: 'Idle',
		// 	minutes: 2880,
		// 	startTime: '2021-08-14T00:00',
		// 	userId: 'user1'
		// },
		// 	// {

		// 	// },
		// 	// {

		// 	// }
		// ]
	}

	public ngOnInit(): void {
		console.log('[ПРОЕКТЫ1]: ', this.projects)
		console.log("ПЕРИОД ПРИ ИНИЦИАЛИЗАЦИИ: ", this.selectedPeriod.startTime, this.selectedPeriod.endTime)
		this._getTasks();
		console.log('[ПРОЕКТЫ2]: ', this.projects)
	}

	public ngOnChanges(): void {
		console.log('CHANGED')
	}

	private _getPeriod(date: Date) {
		const startTime = new Date(date.getFullYear(), date.getMonth(), 1);
		const endTime = new Date(date.getFullYear(), date.getMonth() + 1, 0);
		return {
			startTime,
			endTime
		}
	}

	// private _groupProjects(tasks: WorkTimeInfo[]): void {
	// 	let projects = {};
	// 	tasks.forEach(task => {
	// 		if (!projects[task.project.name]) {
	// 			projects[task.project.name] = {}
	// 			projects[task.project.name] = {
	// 				...task.project,
	// 				tasks: [{
	// 					id: task.id,
	// 					createdAt: task.createdAt,
	// 					createdBy: task.createdBy,
	// 					description: task.description,
	// 					startTime: task.startTime,
	// 					endTime: task.endTime,
	// 					minutes: task.minutes,
	// 					title: task.title,
	// 					userId: task.userId
	// 				}]
	// 			}
	// 		}
	// 		else
	// 			projects[task.project.name].tasks.push({
	// 				id: task.id,
	// 				createdAt: task.createdAt,
	// 				createdBy: task.createdBy,
	// 				description: task.description,
	// 				startTime: task.startTime,
	// 				endTime: task.endTime,
	// 				minutes: task.minutes,
	// 				title: task.title,
	// 				userId: task.userId
	// 			});
	// 	})
	// 	for (let project in projects) {
	// 		this.projects.push(projects[project]);
	// 	}
	// }

	private _getTasks(): void {
		// Сюда константу для params
		console.log("ПЕРИОД ПРИ ЗАПРОСЕ ТАСОК: ", this.selectedPeriod.startTime, this.selectedPeriod.endTime)
		const userId = this._userService.getCurrentUser()?.id;
		console.log(userId)
		this._timeService.findLeaveTimes({
			userid: userId,
			skipCount: 0,
			takeCount: 10,
			starttime: this.selectedPeriod.startTime.toISOString(),
			endtime: this.selectedPeriod.endTime.toISOString()
		}).subscribe(res => {
			// Для проверки дефолтной асинхронной отрисовки
			this.tasksCount = 120;
			this.leaves = res.body;
			console.log('body: ', res.body)
			console.log("[ОТСУТСТВИЯ В _getTasks]: ", this.leaves)
			// если включишь дефолт, то отключи этот
			//this.cdr.detectChanges()
		})
		this._timeService.findWorkTimes
			({
				userid: userId,
				skipCount: 0,
				takeCount: 10,
				starttime: this.selectedPeriod.startTime.toISOString(),
				endtime: this.selectedPeriod.endTime.toISOString()
			}).subscribe((res: FindResultResponseWorkTimeInfo) => {
				// this._groupProjects(res.body);
				res.body?.forEach((project: any) => {
					this.projects.push({
						name: project.project.name,
						description: project.project.description,
						status: project.project.status,
						userId: project.userId,
						id: project.project.id,
						month: project.month,
						year: project.year,
						userHours: project.userHours,
						managerHours: project.managerHours
					})
				})
				console.log("[ПРОЕКТЫ В _getTasks]: ", this.projects)
				//this.cdr.detectChanges()
			})
	}

	// public openDatepicker() {
	// 	this.datepicker.open();
	// }

	// public chosenYearHandler(event: Date) {
	// 	this.selectedYear = event.getFullYear();
	// }

	// public chosenMonthHandler(event: Date, datepicker) {
	// 	this.selectedMonth = event.getMonth();

	// 	this.selectedPeriod = this._getPeriod(new Date(this.selectedYear, this.selectedMonth, 1))
	// 	console.log("НАЧАЛО: ", this.selectedPeriod.startTime)
	// 	console.log("КОНЕЦ: ", this.selectedPeriod.endTime)

	// 	datepicker.close();

	// 	this._getTasks();
	// }
}
