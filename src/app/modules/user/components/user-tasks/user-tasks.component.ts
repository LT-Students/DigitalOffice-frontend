import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { MatDatepicker } from '@angular/material/datepicker';

import { OperationResultStatusType, WorkTimeInfo } from '@data/api/time-service/models';
import { LeaveTimeInfo } from '@data/api/time-service/models';
import { UserService } from '@app/services/user/user.service';
import { DatePeriod } from '@data/models/date-period';
import { Activities, AttendanceService } from '@app/services/attendance.service';

export interface IDialogResponse {
	status?: OperationResultStatusType;
	data?: any;
}

@Component({
	selector: 'do-user-tasks',
	templateUrl: './user-tasks.component.html',
	styleUrls: ['./user-tasks.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserTasksComponent implements OnInit {
	@ViewChild('dp') monthpicker: MatDatepicker<Date> | undefined;

	public projects: WorkTimeInfo[] | undefined;
	public leaves: LeaveTimeInfo[] | undefined;

	private _activitiesObserver: Observer<Map<number, Activities>>;

	public selectedPeriod: DatePeriod;
	public selectedYear: number;
	public selectedMonth: number;
	public canEdit: boolean;
	private _userId: string | undefined;

	constructor(private _attendanceService: AttendanceService, private _cdr: ChangeDetectorRef, private _userService: UserService) {
		this.projects = [];
		this.leaves = [];

		this.selectedPeriod = this._getPeriod(new Date());
		this.selectedMonth = this.selectedPeriod.startDate?.getMonth()!;
		this.selectedYear = this.selectedPeriod?.startDate?.getFullYear()!;
		this.canEdit = true;

		this._activitiesObserver = {
			next: (activities) => {
				const dateKey = new Date(this.selectedYear, this.selectedMonth).getTime();
				this.projects = activities.get(dateKey)?.projects;
				this.leaves = activities.get(dateKey)?.leaves;
				this._cdr.markForCheck();
				console.log('user tasks', activities);
				this.canEdit = this._getEditPermission();
			},
			error: (err) => {},
			complete: () => {},
		};
	}

	public ngOnInit(): void {
		this._userService.currentUser$
			.pipe(
				tap((user) => (this._userId = user?.id)),
				switchMap(() => this._attendanceService.activities$)
			)
			.subscribe(this._activitiesObserver);
	}

	private _getEditPermission(): boolean {
		const currentDate = new Date();
		const currentMonth = currentDate.getMonth();
		const currentYear = currentDate.getFullYear();

		return (
			currentYear === this.selectedYear &&
			(currentMonth === this.selectedMonth || (currentDate.getDate() <= 5 && currentMonth === this.selectedMonth + 1))
		);
	}

	private _getPeriod(date: Date): DatePeriod {
		const startDate = new Date(date.getFullYear(), date.getMonth(), 1);
		const endDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
		return {
			startDate,
			endDate,
		};
	}

	private _getTasks(userId: string | undefined): Observable<Map<number, Activities>> {
		return this._attendanceService
			.getActivities(userId, this.selectedMonth, this.selectedYear)
			.pipe(switchMap(() => this._attendanceService.activities$));
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
		this._getTasks(this._userId).subscribe(this._activitiesObserver);
	}
}
