//@ts-nocheck
import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { FormGroupDirective, FormControl } from '@angular/forms';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

@Component({
	selector: 'do-input',
	templateUrl: './input.component.html',
	styleUrls: ['./input.component.scss'],
changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputComponent implements OnInit {
	private _required: boolean;

	@Input() label = '';
	@Input()
	get required() {
		return this._required;
	}
	set required(value: boolean | string) {
		this._required = coerceBooleanProperty(value);
	}
	@Input() type = 'text';
	@Input() placeholder = '';
	@Input() controlName = '';
	@Input() isEdit = false;
	@Input() textSize: 'regular' | 'small';

	control: FormControl;

	constructor(private formGroupDir: FormGroupDirective) {
		this._required = false;
		this.textSize = 'regular';
	}

	ngOnInit() {
		this.control = this.formGroupDir.control?.get(this.controlName) as FormControl;
	}
}
