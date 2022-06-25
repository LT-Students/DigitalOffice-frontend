import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { IconButtonParams, TableCell } from '../../models';

@Component({
	selector: 'do-icon-button',
	template: `
		<button mat-icon-button (click)="params.onClickFn()">
			<mat-icon [svgIcon]="null | execute: params.icon"></mat-icon>
		</button>
	`,
	styles: [],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconButtonComponent implements OnInit, TableCell<any> {
	public value: any;
	public params!: IconButtonParams;

	constructor() {}

	ngOnInit(): void {}
}
