import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';

import { DateTime } from 'luxon';
import { AttendanceService } from '../../services/attendance.service';
import { ChartLegend } from './doughnut-chart/doughnut-chart.component';

@Component({
	selector: 'do-time-widget',
	templateUrl: './time-widget.component.html',
	styleUrls: ['./time-widget.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimeWidgetComponent {
	public selectedDate$: Observable<DateTime>;
	public chartData: ChartLegend = { colors: [], labels: [] };

	constructor(private _attendanceService: AttendanceService) {
		this.selectedDate$ = this._attendanceService.selectedDate$;
	}

	private _changeMonth(date: DateTime): void {
		this._attendanceService.setNewDate(date);
	}

	public chosenMonthHandler(date: DateTime): void {
		this._changeMonth(date);
	}

	public onPreviousMonthClicked(date: DateTime): void {
		this._changeMonth(date.minus({ months: 1 }));
	}

	public onNextMonthClicked(date: DateTime): void {
		this._changeMonth(date.plus({ months: 1 }));
	}
}
