import { Component, OnInit, ChangeDetectionStrategy, Input, ContentChild } from '@angular/core';
import { MatFormFieldControl } from '@angular/material/form-field';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

@Component({
	selector: 'do-form-field',
	templateUrl: './form-field.component.html',
	styleUrls: ['./form-field.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormFieldComponent implements OnInit {
	@ContentChild(MatFormFieldControl) control?: MatFormFieldControl<any>;

	@Input() label = '';
	@Input() labelClass = 'text-secondary_default';
	@Input()
	set required(required: any) {
		this._required = coerceBooleanProperty(required);
	}
	get required(): boolean {
		return this._required;
	}
	private _required = false;

	constructor() {}

	ngOnInit(): void {}
}
