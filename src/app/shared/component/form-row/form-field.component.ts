import { Component, OnInit, ChangeDetectionStrategy, Input, ContentChild } from '@angular/core';
import { MatFormFieldControl } from '@angular/material/form-field';

@Component({
	selector: 'do-form-field',
	templateUrl: './form-field.component.html',
	styleUrls: ['./form-field.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormFieldComponent implements OnInit {
	@Input() label = '';
	@Input() required = false;
	@ContentChild(MatFormFieldControl) control?: MatFormFieldControl<any>;

	constructor() {}

	ngOnInit(): void {}
}
