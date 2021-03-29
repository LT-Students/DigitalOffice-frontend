import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'do-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],
})
export class DatepickerComponent implements OnInit {
  @Input() label = '';
  @Input() required = false;
  @Input() controlName = '';
  @Input() isEdit = false;
  @Input() format = 'd MMMM y';
  @Input() value: Date;

  control: FormControl | undefined;

  constructor(private formGroupDir: FormGroupDirective) {}

  ngOnInit() {
    this.control = this.formGroupDir.control?.get(
      this.controlName
    ) as FormControl;
  }
}