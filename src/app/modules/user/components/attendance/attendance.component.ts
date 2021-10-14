import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { UserService } from '@app/services/user/user.service';
import { AttendanceService } from '@app/services/attendance.service';
import { switchMap, takeUntil, tap } from 'rxjs/operators';
import { ReplaySubject } from 'rxjs';

@Component({
	selector: 'do-attendance',
	templateUrl: './attendance.component.html',
	styleUrls: ['./attendance.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AttendanceComponent implements OnInit, OnDestroy {
	private onDestroy$: ReplaySubject<void>;

	constructor(private _attendanceService: AttendanceService, private _userService: UserService) {
		this.onDestroy$ = new ReplaySubject<void>(1);
	}

	ngOnInit() {
		this._userService.currentUser$
			.pipe(
				takeUntil(this.onDestroy$),
				tap((user) => this._attendanceService.setUserIdAndRate(user?.id, user?.rate)),
				switchMap(() => this._attendanceService.selectedDate$),
				switchMap(() => this._attendanceService.getMonthNormAndHolidays()),
				switchMap(() => this._attendanceService.getActivities())
			)
			.subscribe();
	}

	public ngOnDestroy() {
		this.onDestroy$.next();
		this.onDestroy$.complete();
	}
}
