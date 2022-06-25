import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { TableCell } from '../../models';

@Component({
	selector: 'do-checkbox',
	template: `<mat-checkbox></mat-checkbox>`,
	styles: [],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxComponent implements OnInit, TableCell<boolean> {
	public value = false;

	constructor() {}

	ngOnInit(): void {}
}
