import { Component, OnInit } from '@angular/core';

import { DatePeriod } from '@data/models/date-period';
import { IDailyHoursData } from '../gradient-graphics/gradient-graphics.component';
import { ProjectService } from '@app/services/project/project.service';
import { Observable, of } from 'rxjs';
import { Project } from '@app/models/project/project.model';
import { map } from 'rxjs/operators';
import { FindResponseProjectInfo } from '@data/api/project-service/models/find-response-project-info';
import { ProjectInfo } from '@data/api/project-service/models/project-info';
import { LocalStorageService } from '@app/services/local-storage.service';
import { LeaveTimeApiService, WorkTimeApiService } from '@data/api/time-service/services';
import { LeaveTimeInfo, WorkTimeInfo } from '@data/api/time-service/models';

@Component({
	selector: 'do-attendance',
	templateUrl: './attendance.component.html',
	styleUrls: ['./attendance.component.scss'],
})
export class AttendanceComponent implements OnInit {
	// public projects: Project[];
	public projects;
	public leaves: LeaveTimeInfo[];
	public tasks: WorkTimeInfo[];

	public timePeriodSelected: DatePeriod = {
		startDate: new Date(),
	};

	public projects$: Observable<Project[]>;

	public dailyHoursData: IDailyHoursData[] = [
		{ day: '22', month: 'june', hours: 6, minutes: 0 },
		{ day: '23', month: 'june', hours: 2, minutes: 30 },
		{ day: '24', month: 'june', hours: 8, minutes: 0 },
		{ day: '25', month: 'june', hours: 8, minutes: 50 },
		{ day: '26', month: 'june', hours: 6, minutes: 30 },
		{ day: '27', month: 'june', hours: 0, minutes: 0 },
	];

	constructor(
		private _projectService: ProjectService,
		private _leaveTimeService: LeaveTimeApiService,
		private _workTimeService: WorkTimeApiService,
		private _localStorageService: LocalStorageService
	) {
		this.projects = [];
		this.leaves = [];
	}

	ngOnInit() {
		// this.projects$ = this._projectService.getProjectList().pipe(
		// 	map((data: FindResponseProjectInfo) => data.body),
		// 	map((data: ProjectInfo[]) => {
		// 		return data.map((projectInfo: ProjectInfo) => new Project(projectInfo));
		// 	})
		// );
		const userId = this._localStorageService.get('user').id;
		this._leaveTimeService.findLeaveTimes({ userid: userId, skipCount: 0, takeCount: 10 }).subscribe(res => {
			this.leaves = res.body;
			console.log(this.leaves);
		})
		this._workTimeService.findWorkTimes({ userid: userId, skipCount: 0, takeCount: 10 }).subscribe(res => {
			console.log('WorkTimes: ', res);
			this._groupProjects(res.body);
			console.log("Projects: ", this.projects)
		})
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

	// private _groupLeaves(leaves: LeaveTimeInfo[]) {
	// 	let lvs = {};
	// 	leaves.forEach(leave => {
	// 		if (!lvs[leave.leaveType]) {
	// 			lvs[leave.leaveType] = []
	// 			lvs[leave.leaveType].push({
	// 				...leave
	// 			})
	// 		}
	// 		else
	// 			lvs[leave.leaveType].push({
	// 				...leave
	// 			});
	// 	})

	// 	for (let leave in lvs) {
	// 		this.leaves.push(lvs[leave])
	// 	}
	// }
}
