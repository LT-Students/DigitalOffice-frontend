import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { forkJoin, Subject } from 'rxjs';
import { first, skip, switchMap, takeUntil, withLatestFrom } from 'rxjs/operators';
import { CurrentUserService } from '@app/services/current-user.service';
import { User } from '@app/models/user/user.model';
import {
	CanManageTimeInSelectedDate,
	CreateLeaveTime,
	LeaveTimeAndDatepickerManagement,
} from '@shared/modules/shared-time-tracking-system/models';
import {
	AttendanceService,
	AttendanceStoreService,
	CanManageTimeInSelectedDateService,
	LeaveTimeDatepickerService,
	MonthNormService,
} from '../../services';
import { AttendanceResolvedData } from '../../attendance.resolver';
import { CreateLeaveTimeService } from '../../services/create-leave-time.service';

@Component({
	selector: 'do-attendance',
	templateUrl: './attendance.component.html',
	styleUrls: ['./attendance.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		AttendanceService,
		{ provide: LeaveTimeAndDatepickerManagement, useClass: LeaveTimeDatepickerService },
		{ provide: CanManageTimeInSelectedDate, useClass: CanManageTimeInSelectedDateService },
		{ provide: CreateLeaveTime, useClass: CreateLeaveTimeService },
	],
})
export class AttendanceComponent implements OnInit, OnDestroy {
	private destroy$ = new Subject();

	constructor(
		private attendance: AttendanceService,
		private attendanceStore: AttendanceStoreService,
		private canManage: CanManageTimeInSelectedDate,
		private leaveTimeDatepicker: LeaveTimeAndDatepickerManagement,
		private monthNormService: MonthNormService,
		private currentUser: CurrentUserService,
		private route: ActivatedRoute
	) {}

	public ngOnInit(): void {
		this.route.data.pipe(first(), withLatestFrom(this.currentUser.user$)).subscribe({
			next: ([data, u]: [Data, User]) => {
				const { leaveTimes, workTimes, holidays, monthNorm } = data.attendance as AttendanceResolvedData;
				this.attendanceStore.setInitialData({ leaveTimes, workTimes });
				this.leaveTimeDatepicker.setDatepickerHolidays(holidays);
				this.leaveTimeDatepicker.setReservedDays(leaveTimes);
				const rate = u.company?.rate || 1;
				this.leaveTimeDatepicker.setRate(rate);
				this.monthNormService.setMonthNorm(monthNorm, rate);
			},
		});

		this.canManage.selectedDate$
			.pipe(
				skip(1),
				switchMap(() => forkJoin([this.attendance.getMonthNorm(), this.attendance.getMonthActivities()])),
				takeUntil(this.destroy$)
			)
			.subscribe();
	}

	public ngOnDestroy() {
		this.destroy$.next();
		this.destroy$.complete();
	}
}
