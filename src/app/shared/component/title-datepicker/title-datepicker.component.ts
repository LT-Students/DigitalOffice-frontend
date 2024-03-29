import { Component, ChangeDetectionStrategy, Input, EventEmitter, Output } from '@angular/core';
import { MatDatepicker } from '@angular/material/datepicker';
import { DateTime } from 'luxon';
import { Icons } from '@shared/modules/icons/icons';

@Component({
	selector: 'do-title-datepicker',
	templateUrl: './title-datepicker.component.html',
	styleUrls: ['./title-datepicker.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TitleDatepickerComponent {
	private static uniqueId = 0;
	public readonly Icons = Icons;

	@Input() title = '';
	@Input()
	set selectDate(date: DateTime | null) {
		this._selectedDate = date || DateTime.now();
	}
	get selectDate(): DateTime {
		return this._selectedDate;
	}
	private _selectedDate = DateTime.now();

	@Input() minDate: DateTime | null = null;
	@Input() maxDate: DateTime | null = null;
	@Output() dateSelection = new EventEmitter<DateTime>();
	public readonly id = TitleDatepickerComponent.uniqueId++;

	constructor() {}

	public chosenMonthHandler(date: DateTime, picker: MatDatepicker<any>): void {
		this.selectDate = date;
		this.dateSelection.emit(this.selectDate);
		picker.close();
	}
}
