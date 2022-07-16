import { ChangeDetectionStrategy, Component } from '@angular/core';

import { DateTime } from 'luxon';
import { AttendanceService, MAX_FUTURE_DATE } from '../../services/attendance.service';
import { ChartLegend } from './doughnut-chart/doughnut-chart.component';

@Component({
	selector: 'do-time-widget',
	templateUrl: './time-widget.component.html',
	styleUrls: ['./time-widget.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimeWidgetComponent {
	public readonly maxDate = MAX_FUTURE_DATE;

	public selectedDate$ = this.attendanceService.selectedDate$;
	public chartData: ChartLegend = { colors: [], labels: [] };
	public nextMonthButtonDisabled = false;

	constructor(private attendanceService: AttendanceService) {}

	private changeMonth(date: DateTime): void {
		this.attendanceService.setNewDate(date);
		this.nextMonthButtonDisabled = date.plus({ month: 1 }) > this.maxDate;
	}

	public chosenMonthHandler(date: DateTime): void {
		this.changeMonth(date);
	}

	public onPreviousMonthClicked(date: DateTime): void {
		this.changeMonth(date.minus({ months: 1 }));
	}

	public onNextMonthClicked(date: DateTime): void {
		this.changeMonth(date.plus({ months: 1 }));
	}
}
