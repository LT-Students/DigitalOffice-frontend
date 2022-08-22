import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { first, skip, switchMap, takeUntil } from 'rxjs/operators';
import { forkJoin, Subject } from 'rxjs';
import { ActivatedRoute, Data } from '@angular/router';
import { AttendanceService } from '../../services/attendance.service';

@Component({
	selector: 'do-attendance',
	templateUrl: './attendance.component.html',
	styleUrls: ['./attendance.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [AttendanceService],
})
export class AttendanceComponent implements OnInit, OnDestroy {
	private destroy$ = new Subject();

	constructor(private attendanceService: AttendanceService, private route: ActivatedRoute) {}

	public ngOnInit(): void {
		this.route.data
			.pipe(first())
			.subscribe({ next: (data: Data) => this.attendanceService.setInitialData(data.attendance) });

		this.attendanceService.selectedDate$
			.pipe(
				skip(1),
				switchMap(() =>
					forkJoin([
						this.attendanceService.getMonthNormAndHolidays(),
						this.attendanceService.getMonthActivities(),
					])
				),
				takeUntil(this.destroy$)
			)
			.subscribe();
	}

	public ngOnDestroy() {
		this.destroy$.next();
		this.destroy$.complete();
	}
}
