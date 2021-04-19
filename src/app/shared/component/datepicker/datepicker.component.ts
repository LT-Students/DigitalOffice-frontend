import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroupDirective } from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import {
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
  MomentDateAdapter,
} from '@angular/material-moment-adapter';

export const DATE_FORMAT = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'd MMMM y',
    monthYearLabel: 'YYYY',
  },
};

@Component({
  selector: 'do-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],
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
  @Input() label = '';
  @Input() required = false;
  @Input() controlName = '';
  @Input() isEdit = false;
  @Input() format: 'year' | 'full';

  @Output() dateSelected: EventEmitter<Date>;

  @ViewChild('picker') datePicker: MatDatepicker<Date>;

  public startView: 'multi-year' | 'month';
  public placeholder: 'ГГГГ' | 'ДД месяц ГГГГ';
  public dateFormat: 'YYYY' | 'dd MMMM y';
  public control: FormControl | undefined;

  constructor(private formGroupDir: FormGroupDirective) {
    this.startView = null;
    this.placeholder = null;
    this.dateFormat = null;
    this.dateSelected = new EventEmitter<Date>();
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

    this.control = this.formGroupDir.control?.get(
      this.controlName
    ) as FormControl;
  }

  public onYearSelected(selectedDate: any) {
    if (this.format === 'year') {
      const dateToSet = new Date(selectedDate.year(), 0, 1);
      this.control.patchValue(dateToSet);
      this.datePicker.close();
    }
  }
}
