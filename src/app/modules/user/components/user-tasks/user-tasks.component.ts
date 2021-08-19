import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';

import { ProjectStatusType } from '@data/api/time-service/models';
import { LeaveTimeInfo } from '@data/api/time-service/models';
import { TimeService } from '@app/services/time/time.service';
import { UserService } from '@app/services/user/user.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatDatepicker } from '@angular/material/datepicker';

export interface mappedProject {
	description: string;
	id: string;
	name: string;
	status: ProjectStatusType;
	userId: string;
	managerHours: number;
	userHours: number;
	month: number;
	year: number;
}

@Component({
	selector: 'do-user-tasks',
	templateUrl: './user-tasks.component.html',
	styleUrls: ['./user-tasks.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserTasksComponent implements OnInit {
	public projects$: Observable<mappedProject[] | undefined> | null;
	public leaves$: Observable<LeaveTimeInfo[] | undefined> | null;
	@ViewChild('dp') monthpicker: MatDatepicker<Date> | undefined;

	public selectedPeriod;
	public selectedYear: number;
	public selectedMonth: number;

	constructor(
		private _timeService: TimeService,
		private _userService: UserService,
	) {
		this.projects$ = null;
		this.leaves$ = null;

		this.selectedPeriod = this._getPeriod(new Date());
		this.selectedMonth = this.selectedPeriod.startTime.getMonth();
		this.selectedYear = this.selectedPeriod.startTime.getFullYear();
	}

	public ngOnInit(): void {
		this._getTasks();
	}

	private _getPeriod(date: Date) {
		const startTime = new Date(date.getFullYear(), date.getMonth(), 1);
		const endTime = new Date(date.getFullYear(), date.getMonth() + 1, 0);
		return {
			startTime,
			endTime
		}
	}

	private _getTasks(): void {
		const userId = this._userService.getCurrentUser()?.id;
		console.log(userId)
		const params = {
			userid: userId,
			skipCount: 0,
			takeCount: 10,
			starttime: this.selectedPeriod.startTime.toISOString(),
			endtime: this.selectedPeriod.endTime.toISOString(),
			month: this.selectedMonth,
			year: this.selectedYear
		}

		this.projects$ = this._timeService.findWorkTimes(params)
			.pipe(map(res => res.body?.map(workTime => ({
				description: workTime.description,
				id: workTime.id,
				name: workTime.project?.name,
				status: workTime.project?.status,
				userId: workTime?.userId,
				managerHours: workTime?.managerHours,
				userHours: workTime?.userHours,
				month: workTime?.month,
				year: workTime?.year
			}) as mappedProject)))

		this.leaves$ = this._timeService.findLeaveTimes(params)
			.pipe(map(res => res.body))
	}

	public openMonthpicker() {
		this.monthpicker?.open();
	}

	public chosenYearHandler(event: Date) {
		this.selectedYear = event.getFullYear();
	}

	public chosenMonthHandler(event: Date, datepicker: any) {
		this.selectedMonth = event.getMonth();
		this.selectedPeriod = this._getPeriod(new Date(this.selectedYear, this.selectedMonth));
		datepicker.close();
		this._getTasks();
	}
}











// Старый код, пусть будет, вдруг понадобится

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