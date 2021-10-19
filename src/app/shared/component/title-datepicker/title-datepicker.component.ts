import { Component, ChangeDetectionStrategy, Input, EventEmitter, Output } from '@angular/core';
import { MatDatepicker } from '@angular/material/datepicker';
import { DateTime } from 'luxon';

@Component({
	selector: 'do-title-datepicker',
	templateUrl: './title-datepicker.component.html',
	styleUrls: ['./title-datepicker.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TitleDatepickerComponent {
	@Input() text: string | undefined;
	@Input() selectDate?: DateTime | null;
	@Output() dateSelection: EventEmitter<DateTime>;

	constructor() {
		this.selectDate = DateTime.now();
		this.dateSelection = new EventEmitter<DateTime>();
	}

	public chosenMonthHandler(date: DateTime, picker: MatDatepicker<any>): void {
		this.selectDate = date;
		this.dateSelection.emit(this.selectDate);
		picker.close();
	}
}
