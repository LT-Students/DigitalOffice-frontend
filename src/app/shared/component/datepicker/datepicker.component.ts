import { Component, EventEmitter, Input, OnInit, Output, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, FormGroupDirective } from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

export const DATE_FORMAT = {
	parse: {
		dateInput: 'LL',
	},
	display: {
		dateInput: 'dd MMMM y',
		monthYearLabel: 'YYYY',
	},
};

@Component({
	selector: 'do-datepicker',
	templateUrl: './datepicker.component.html',
	styleUrls: ['./datepicker.component.scss'],
changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		{
			provide: DateAdapter,
			useClass: MomentDateAdapter,
			deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
		},
		{ provide: MAT_DATE_FORMATS, useValue: DATE_FORMAT },
	],
})
export class DatepickerComponent implements OnInit {
	private _required: boolean;
	private _isEdit: boolean;

	@Input() label = '';
	@Input()
	get required() {
		return this._required;
	}
	set required(value: boolean | string) {
		this._required = coerceBooleanProperty(value);
	}
	@Input() controlName: string;
	@Input()
	get isEdit() {
		return this._isEdit;
	}
	set isEdit(value: boolean | undefined) {
		this._isEdit = coerceBooleanProperty(value);
	}
	@Input() format: 'year' | 'full';

	@Output() dateSelected: EventEmitter<Date>;

	@ViewChild('picker') datePicker: MatDatepicker<Date> | undefined;

	public startView: 'multi-year' | 'month';
	public placeholder: 'ГГГГ' | 'ДД месяц ГГГГ';
	public dateFormat: 'YYYY' | 'dd MMMM y';
	public control: FormControl;

	constructor(private formGroupDir: FormGroupDirective) {
		this._required = false;
		this._isEdit = false;
		this.controlName = '';
		this.format = 'full';
		this.startView = 'month';
		this.placeholder = 'ДД месяц ГГГГ';
		this.dateFormat = 'dd MMMM y';
		this.dateSelected = new EventEmitter<Date>();
		this.control = new FormControl();
	}

	ngOnInit() {
		if (this.format === 'year') {
			this.startView = 'multi-year';
			this.placeholder = 'ГГГГ';
			this.dateFormat = 'YYYY';
		} else {
			this.startView = 'month';
			this.placeholder = 'ДД месяц ГГГГ';
			this.dateFormat = 'dd MMMM y';
		}

		this.control = this.formGroupDir.control?.get(this.controlName) as FormControl;
	}

	public onYearSelected(selectedDate: any) {
		if (this.format === 'year') {
			const dateToSet = new Date(selectedDate.year(), 0, 1);
			this.control.patchValue(dateToSet);
			this.datePicker?.close();
		}
	}
}
