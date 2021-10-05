import { Component, OnInit, ChangeDetectionStrategy, Input, EventEmitter, Output } from '@angular/core';
import { MatDatepicker } from '@angular/material/datepicker';

@Component({
	selector: 'do-title-datepicker',
	templateUrl: './title-datepicker.component.html',
	styleUrls: ['./title-datepicker.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})

export class TitleDatepickerComponent implements OnInit {
	@Input() text: string | undefined
	@Output() onSelectedDate: EventEmitter<Date> = new EventEmitter<Date>()

	public selectDate: Date = new Date()

	public chosenMonthHandler(date: Date, picker: MatDatepicker<any>): void{
		this.selectDate = date;
		this.onSelectedDate.emit(this.selectDate)
		picker.close();
	}

	ngOnInit(): void {
	}

}
