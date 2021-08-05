import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Input } from '@angular/core';

import { DatePeriod } from '@data/models/date-period';
import { ProjectStatusType } from '@data/api/time-service/models';
import { LeaveTimeInfo, WorkTimeInfo } from '@data/api/time-service/models';
import { TimeService } from '@app/services/time/time.service';
import { UserService } from '@app/services/user/user.service';

export interface Task {
	createdAt?: string;
	createdBy?: string;
	description?: string;
	endTime?: string;
	id?: string;
	minutes?: number;
	startTime?: string;
	title?: string;
	userId?: string;
}

export interface Project {
	description?: null | string;
	id?: string;
	name?: string;
	shortDescription?: null | string;
	shortName?: null | string;
	status?: ProjectStatusType;
	tasks?: Task[]
}

@Component({
	selector: 'do-user-tasks',
	templateUrl: './user-tasks.component.html',
	styleUrls: ['./user-tasks.component.scss'],
})
export class UserTasksComponent implements OnInit {
	@Input() projects: Project[];
	@Input() leaves: LeaveTimeInfo[];
	@ViewChild('dp') datepicker;

	public tasksCount: number;
	public plural: { [k: string]: string };
	public selectedPeriod;
	public selectedYear: number;
	public selectedMonth: number;

	constructor(
		private _timeService: TimeService,
		private _userService: UserService
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
	}

	public ngOnInit(): void {
		console.log("ПЕРИОД ПРИ ИНИЦИАЛИЗАЦИИ: ", this.selectedPeriod.startTime, this.selectedPeriod.endTime)
		this._getTasks();
	}

	private _getPeriod(date: Date) {
		console.log('CURRENT DATE: ', date)
		console.log('CURRENT MONTH: ', date.getMonth())
		const startTime = new Date(date.getFullYear(), date.getMonth(), 1);
		const endTime = new Date(date.getFullYear(), date.getMonth() + 1, 0);

		console.log("COMMON DATE: ", startTime)

		return {
			startTime,
			endTime
		}
	}

	private _groupProjects(tasks: WorkTimeInfo[]): void {
		let projects = {};
		tasks.forEach(task => {
			if (!projects[task.project.name]) {
				projects[task.project.name] = {}
				projects[task.project.name] = {
					...task.project,
					tasks: [{
						id: task.id,
						createdAt: task.createdAt,
						createdBy: task.createdBy,
						description: task.description,
						startTime: task.startTime,
						endTime: task.endTime,
						minutes: task.minutes,
						title: task.title,
						userId: task.userId
					}]
				}
			}
			else
				projects[task.project.name].tasks.push({
					id: task.id,
					createdAt: task.createdAt,
					createdBy: task.createdBy,
					description: task.description,
					startTime: task.startTime,
					endTime: task.endTime,
					minutes: task.minutes,
					title: task.title,
					userId: task.userId
				});
		})
		for (let project in projects) {
			this.projects.push(projects[project]);
		}
	}

	private _getTasks(): void {
		this.tasksCount = 0;
		this.projects = [];
		this.leaves = [];
		console.log("ПЕРИОД ПРИ ЗАПРОСЕ ТАСОК: ", this.selectedPeriod.startTime, this.selectedPeriod.endTime)
		const userId = this._userService.getCurrentUser().id;
		console.log(userId)
		this._timeService.findLeaveTimes({
			userid: userId,
			skipCount: 0,
			takeCount: 10,
			starttime: this.selectedPeriod.startTime.toISOString(),
			endtime: this.selectedPeriod.endTime.toISOString()
		}).subscribe(res => {
			this.leaves = res.body;
			console.log(this.leaves)
			this.tasksCount += res.body.length;
		})
		this._timeService.findWorkTimes
			({
				userid: userId,
				skipCount: 0,
				takeCount: 10,
				starttime: this.selectedPeriod.startTime.toISOString(),
				endtime: this.selectedPeriod.endTime.toISOString()
			}).subscribe(res => {
				this._groupProjects(res.body);
				console.log(this.projects)
				this.tasksCount += res.body.length;
			})
	}

	public openDatepicker() {
		this.datepicker.open();
	}

	public chosenYearHandler(event: Date) {
		this.selectedYear = event.getFullYear();
	}

	public chosenMonthHandler(event: Date, datepicker) {
		this.selectedMonth = event.getMonth();

		this.selectedPeriod = this._getPeriod(new Date(this.selectedYear, this.selectedMonth, 1))
		console.log("НАЧАЛО: ", this.selectedPeriod.startTime)
		console.log("КОНЕЦ: ", this.selectedPeriod.endTime)

		datepicker.close();

		this._getTasks();
	}
}
