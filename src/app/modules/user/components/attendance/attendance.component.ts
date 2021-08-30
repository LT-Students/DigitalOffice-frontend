import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { UserService } from '@app/services/user/user.service';
import { AttendanceService } from '@app/services/attendance.service';
import { switchMap, takeUntil, tap } from 'rxjs/operators';
import { ReplaySubject, Subscription } from 'rxjs';

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
		//TODO think how to use only one observable for this logic
		this._userService.currentUser$
			.pipe(
				takeUntil(this.onDestroy$),
				tap((user) => this._attendanceService.setUserId(user?.id)),
				switchMap(() => this._attendanceService.getActivities()),
				switchMap(() => this._attendanceService.selectedDate$)
			)
			.subscribe();
		this._attendanceService.selectedDate$
			.pipe(
				takeUntil(this.onDestroy$),
				switchMap(() => this._attendanceService.getActivities())
			)
			.subscribe();
	}

	public ngOnDestroy() {
		this.onDestroy$.next();
		this.onDestroy$.complete();
	}
}
