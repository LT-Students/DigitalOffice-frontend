import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Icons } from '@shared/features/icons/icons';
import { IconButtonParams, TableCell } from '../../models';

@Component({
	selector: 'do-icon-button',
	template: `
		<button doButton (click)="onClick(value)">
			<mat-icon [svgIcon]="icon"></mat-icon>
		</button>
	`,
	styles: [],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconButtonComponent implements OnInit, TableCell<any> {
	public value: any;
	set params(params: IconButtonParams) {
		this.icon = params.icon();
		this.onClick = params.onClickFn;
	}
	public icon!: Icons;
	public onClick: Function = () => {};

	constructor() {}

	ngOnInit(): void {}
}
