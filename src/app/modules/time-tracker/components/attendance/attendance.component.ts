import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { skip, switchMap, takeUntil } from 'rxjs/operators';
import { ReplaySubject } from 'rxjs';
import { CurrentUserService } from '@app/services/current-user.service';
import { ActivatedRoute } from '@angular/router';
import { AttendanceService } from '../../services/attendance.service';

@Component({
	selector: 'do-attendance',
	templateUrl: './attendance.component.html',
	styleUrls: ['./attendance.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AttendanceComponent implements OnInit, OnDestroy {
	private onDestroy$$: ReplaySubject<void>;

	constructor(
		private _attendanceService: AttendanceService,
		private _currentUserService: CurrentUserService,
		private _activatedRoute: ActivatedRoute
	) {
		this.onDestroy$$ = new ReplaySubject<void>(1);
	}

	public ngOnInit(): void {
		this._attendanceService.selectedDate$
			.pipe(
				skip(1),
				takeUntil(this.onDestroy$$),
				switchMap(() => this._attendanceService.getMonthNormAndHolidays()),
				switchMap(() => this._attendanceService.getActivities())
			)
			.subscribe();
	}

	public ngOnDestroy() {
		this.onDestroy$$.next();
		this.onDestroy$$.complete();
	}
}