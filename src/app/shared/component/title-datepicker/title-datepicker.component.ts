import { Component, ChangeDetectionStrategy, Input, EventEmitter, Output } from '@angular/core';
import { MatDatepicker } from '@angular/material/datepicker';

@Component({
	selector: 'do-title-datepicker',
	templateUrl: './title-datepicker.component.html',
	styleUrls: ['./title-datepicker.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})

export class TitleDatepickerComponent {
	@Input() text: string | undefined;
	@Input() selectDate?: Date | null;
	@Output() onSelectedDate: EventEmitter<Date>;

	constructor() {
		this.selectDate =  new Date();
		this.onSelectedDate = new EventEmitter<Date>();
	}

	public chosenMonthHandler(date: Date, picker: MatDatepicker<any>): void{
		this.selectDate = date;
		this.onSelectedDate.emit(this.selectDate);
		picker.close();
	}

}
