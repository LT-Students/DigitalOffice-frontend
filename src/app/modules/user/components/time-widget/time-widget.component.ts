import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';

import { AttendanceService } from '@app/services/attendance.service';
import { MatDatepicker } from '@angular/material/datepicker';

@Component({
	selector: 'do-time-widget',
	templateUrl: './time-widget.component.html',
	styleUrls: [ './time-widget.component.scss' ],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimeWidgetComponent {
	public selectedDate$: Observable<Date>;

	constructor(private _attendanceService: AttendanceService) {
		this.selectedDate$ = _attendanceService.selectedDate$;
	}

	private _changeMonth(date: Date): void {
		this._attendanceService.setNewDate(date);
	}

	public chosenMonthHandler(date: Date, picker: MatDatepicker<any>): void {
		this._changeMonth(date);
		picker.close();
	}

	public onPreviousMonthClicked(date: Date): void {
		this._changeMonth(new Date(date.getFullYear(), date.getMonth() - 1));
	}

	public onNextMonthClicked(date: Date): void {
		this._changeMonth(new Date(date.getFullYear(), date.getMonth() + 1));
	}
}
