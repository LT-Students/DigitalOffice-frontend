import { Component, ChangeDetectionStrategy, Input, EventEmitter, Output } from '@angular/core';
import { MatDatepicker } from '@angular/material/datepicker';

@Component({
	selector: 'do-title-datepicker',
	templateUrl: './title-datepicker.component.html',
	styleUrls: ['./title-datepicker.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TitleDatepickerComponent {
	@Input() text: string | undefined;
	@Input() selectDate?: Date | null;
	@Output() dateSelection: EventEmitter<Date>;

	constructor() {
		this.selectDate = new Date();
		this.dateSelection = new EventEmitter<Date>();
	}

	public chosenMonthHandler(date: Date, picker: MatDatepicker<any>): void {
		this.selectDate = date;
		this.dateSelection.emit(this.selectDate);
		picker.close();
	}
}
