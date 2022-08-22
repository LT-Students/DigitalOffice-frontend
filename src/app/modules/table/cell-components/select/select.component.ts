import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Icons } from '@shared/modules/icons/icons';
import { TableCell } from '../../models';
import { TableCellComponent } from '../../table-cell.component';

export interface SelectCellParams {
	options: any[];
	displayValueGetter?: (o: any) => string;
	iconGetter?: (o: any) => Icons | null;
	iconColor?: string;
	updateRow?: (o: any, v: any) => void;
	disabled?: (o: any) => boolean;
}

@Component({
	selector: 'do-select',
	template: `
		<div
			class="trigger flex flex_ai_center text-secondary_default"
			[matMenuTriggerFor]="menu"
			[class.disabled]="params.disabled ? (row | execute: params.disabled) : null"
		>
			<mat-icon
				class="icon"
				*ngIf="params.iconGetter as iconGetter"
				[svgIcon]="value | execute: iconGetter"
				[style.width.px]="16"
				[style.color]="params.iconColor"
			></mat-icon>
			<span>{{ params.displayValueGetter ? (value | execute: params.displayValueGetter) : value }}</span>
			<mat-icon *ngIf="!(params.disabled ? (row | execute: params.disabled) : null)">arrow_drop_down</mat-icon>
		</div>
		<mat-menu #menu="matMenu">
			<button *ngFor="let item of params.options" mat-menu-item (click)="setValue(item)">
				{{ params.displayValueGetter ? (item | execute: params.displayValueGetter) : item }}
			</button>
		</mat-menu>
	`,
	styles: [
		`
			.trigger {
				cursor: pointer;
			}

			.disabled {
				pointer-events: none;
			}

			.icon {
				margin-right: 4px;
			}
		`,
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectComponent implements OnInit, TableCell<any> {
	public value: any;
	public params!: SelectCellParams;
	public row: any;

	constructor(tableCell: TableCellComponent) {
		this.row = tableCell.row;
	}

	ngOnInit(): void {}

	public setValue(value: any): void {
		this.value = value;
		if (this.params.updateRow) {
			this.params.updateRow(this.row, value);
		}
	}
}
