import { Component, OnInit, ChangeDetectionStrategy, HostBinding } from '@angular/core';
import { Icons } from '@shared/modules/icons/icons';
import { TableCell } from '../../models';

export class SlideApplyButtonParams {
	onClickFn: (...args: any[]) => any;

	constructor(params: { onClickFn: (...args: any[]) => any }) {
		this.onClickFn = params.onClickFn;
	}
}

@Component({
	selector: 'do-slide-button',
	template: `
		<button *ngIf="!isApplied" doButton class="slide-button" (click)="$event.stopPropagation(); handleClick(value)">
			<mat-icon [svgIcon]="Icons.Add"></mat-icon>
		</button>
		<mat-icon *ngIf="isApplied" class="applied-icon" [svgIcon]="Icons.Done"></mat-icon>
	`,
	styleUrls: ['./slide-apply-button.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SlideApplyButtonComponent implements OnInit, TableCell<any> {
	public readonly Icons = Icons;

	@HostBinding('class.applied') isApplied = false;

	public value: any;
	set params(params: SlideApplyButtonParams) {
		this.onClick = params.onClickFn;
	}
	public onClick: Function = () => {};

	constructor() {}

	ngOnInit(): void {}

	public handleClick(v: any): void {
		this.isApplied = true;
		this.onClick(v);
	}
}
