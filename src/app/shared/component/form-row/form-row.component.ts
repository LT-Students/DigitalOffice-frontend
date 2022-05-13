import { Component, OnInit, ChangeDetectionStrategy, Input, ContentChild } from '@angular/core';
import { MatFormFieldControl } from '@angular/material/form-field';

@Component({
	selector: 'do-form-row',
	templateUrl: './form-row.component.html',
	styleUrls: ['./form-row.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormRowComponent implements OnInit {
	@Input() label = '';
	@Input() required = false;
	@ContentChild(MatFormFieldControl) control?: MatFormFieldControl<any>;

	constructor() {}

	ngOnInit(): void {}
}
