import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective } from '@angular/forms';
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
  @Input() isEdit = true;
  @Input() placeholder = '';
  @Input() format = 'd MMMM y';

  control: FormControl | undefined;

  constructor(private formGroupDir: FormGroupDirective) {}

  ngOnInit() {
    this.control = this.formGroupDir.control?.get(
      this.controlName
    ) as FormControl;
  }
}
