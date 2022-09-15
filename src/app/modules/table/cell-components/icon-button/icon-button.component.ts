import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Icons } from '@shared/modules/icons/icons';
import { TableCell } from '../../models';

export class IconButtonParams {
	onClickFn: (...args: any[]) => any;
	icon: (...args: any[]) => Icons;

	constructor(params: { onClickFn: (...args: any[]) => any; icon: (...args: any[]) => Icons }) {
		this.icon = params.icon;
		this.onClickFn = params.onClickFn;
	}
}

@Component({
	selector: 'do-icon-button',
	template: `
		<button doButton (click)="$event.stopPropagation(); onClick(value)">
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
