import { ChangeDetectionStrategy, Component, Input, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatDatepicker } from '@angular/material/datepicker';

import { OperationResultStatusType, ProjectStatusType } from '@data/api/time-service/models';
import { LeaveTimeInfo } from '@data/api/time-service/models';
import { TimeService } from '@app/services/time/time.service';
import { UserService } from '@app/services/user/user.service';
import { DatePeriod } from '@data/models/date-period'

interface IParams {
	userid?: string;
	skipCount?: number;
	takeCount?: number;
	starttime?: string;
	endtime?: string;
	month?: number;
	year?: number;
}

export interface IDialogResponse {
	status?: OperationResultStatusType;
	data?: any;
}

export interface IMappedProject {
	description: string;
	id: string;
	name: string;
	status?: ProjectStatusType;
	userId?: string;
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
	public projects$: Observable<IMappedProject[] | undefined> | null;
	public leaves$: Observable<LeaveTimeInfo[] | undefined> | null;
	@ViewChild('dp') monthpicker: MatDatepicker<Date> | undefined;

	public selectedPeriod: DatePeriod;
	public selectedYear: number;
	public selectedMonth: number;
	public canEdit: boolean;

	constructor(
		private _timeService: TimeService,
		private _userService: UserService,
	) {
		this.projects$ = null;
		this.leaves$ = null;

		this.selectedPeriod = this._getPeriod(new Date());
		this.selectedMonth = this.selectedPeriod.startDate?.getMonth()!;
		this.selectedYear = this.selectedPeriod?.startDate?.getFullYear()!;
		this.canEdit = true;
	}

	public ngOnInit(): void {
		this._getTasks();
	}

	private _getEditPermission(): boolean {
		const currentDate = new Date();
		const currentMonth = currentDate.getMonth();
		const currentYear = currentDate.getFullYear();

		if (currentYear === this.selectedYear &&
			(currentMonth === this.selectedMonth || currentDate.getDate() <= 5 && currentMonth === this.selectedMonth + 1)) {
			return true;
		}

		return false;
	}

	private _getPeriod(date: Date): DatePeriod {
		const startDate = new Date(date.getFullYear(), date.getMonth(), 1);
		const endDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
		return {
			startDate,
			endDate
		}
	}

	private _getTasks(): void {
		const userId = this._userService.getCurrentUser()?.id;

		console.log(this.selectedPeriod.startDate)
		console.log(this.selectedPeriod.endDate)

		const findWorkTimesParams: IParams = {
			userid: userId,
			skipCount: 0,
			takeCount: 10,
			month: this.selectedMonth + 1,
			year: this.selectedYear
		}

		const findLeaveTimesParams: IParams = {
			userid: userId,
			skipCount: 0,
			takeCount: 10,
			starttime: this.selectedPeriod.startDate?.toISOString(),
			endtime: this.selectedPeriod.endDate?.toISOString(),
		}

		this.projects$ = this._timeService.findWorkTimes(findWorkTimesParams)
			.pipe(map(res => res.body?.map(workTime => ({
				description: workTime.description,
				id: workTime.id,
				name: workTime.project?.name,
				status: workTime.project?.status,
				userId: workTime?.user?.id,
				managerHours: workTime?.managerHours,
				userHours: workTime?.userHours,
				month: workTime?.month,
				year: workTime?.year
			}) as IMappedProject)))

		this.leaves$ = this._timeService.findLeaveTimes(findLeaveTimesParams)
			.pipe(map(res => res.body))

		this.canEdit = this._getEditPermission();
	}

	public openMonthpicker() {
		this.monthpicker?.open();
	}

	public chosenYearHandler(event: Date) {
		this.selectedYear = event.getFullYear();
	}

	public chosenMonthHandler(event: Date, datepicker: MatDatepicker<Date>) {
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