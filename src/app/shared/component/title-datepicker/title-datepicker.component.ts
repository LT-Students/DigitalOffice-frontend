import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { MatDatepicker } from '@angular/material/datepicker';
import { AttendanceService } from '@app/services/attendance.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'do-title-datepicker',
  templateUrl: './title-datepicker.component.html',
  styleUrls: ['./title-datepicker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class TitleDatepickerComponent implements OnInit {
	@Input() text: string | undefined
	public selectedDate: Observable<Date>;


	constructor(private _attendanceService: AttendanceService) {
		this.selectedDate = this._attendanceService.selectedDate$;
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

  ngOnInit(): void {
  }

}
