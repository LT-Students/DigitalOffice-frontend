//@ts-nocheck
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective } from '@angular/forms';

@Component({
	selector: 'do-stepper',
	templateUrl: './stepper.component.html',
	styleUrls: ['./stepper.component.scss'],
})
export class StepperComponent implements OnInit {
	@Input() label = '';
	@Input() required = false;
	@Input() type = 'number';
	@Input() controlName = '';
	@Input() isEdit = true;

	control: FormControl;

	constructor(private formGroupDir: FormGroupDirective) {}

	ngOnInit() {
		this.control = this.formGroupDir.control?.get(this.controlName) as FormControl;
	}

	changeWorkingRate(input, step) {
		input.value = +input.value + step;
	}
}
