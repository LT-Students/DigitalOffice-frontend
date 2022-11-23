import { ChangeDetectionStrategy, Component } from '@angular/core';

import { DateTime } from 'luxon';
import { Icons } from '@shared/modules/icons/icons';
import {
	CanManageTimeInSelectedDate,
	MAX_FUTURE_DATE_FOR_LEAVE_TIME,
} from '@shared/modules/shared-time-tracking-system/models';
import { map, withLatestFrom } from 'rxjs/operators';
import { MonthNormService } from '../../services';
import { ChartLegend } from './doughnut-chart/doughnut-chart.component';

@Component({
	selector: 'do-time-widget',
	templateUrl: './time-widget.component.html',
	styleUrls: ['./time-widget.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimeWidgetComponent {
	public readonly Icons = Icons;
	public readonly maxDate = MAX_FUTURE_DATE_FOR_LEAVE_TIME;

	public minDate$ = this.canManageTime.minDate$;
	public selectedDate$ = this.canManageTime.selectedDate$;
	public monthNorm$ = this.monthNormService.monthNorm$;
	public nextMonthButtonDisabled$ = this.selectedDate$.pipe(map((date) => date.plus({ month: 1 }) > this.maxDate));
	public previousMonthButtonDisabled$ = this.selectedDate$.pipe(
		withLatestFrom(this.minDate$),
		map(([selectedDate, minDate]) => selectedDate.minus({ month: 1 }) < minDate)
	);

	public chartData: ChartLegend = { colors: [], labels: [] };

	constructor(private canManageTime: CanManageTimeInSelectedDate, private monthNormService: MonthNormService) {}

	private changeMonth(date: DateTime): void {
		this.canManageTime.setNewDate(date);
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
