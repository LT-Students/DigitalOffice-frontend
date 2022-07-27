import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { SelectionModel } from '@app/utils/selection-model';
import { TableCell } from '../../models';
import { TableCellComponent } from '../../table-cell.component';
import { TableComponent } from '../../table.component';

export class CheckboxParams {
	public disabled: (...o: any[]) => boolean;
	public disabledTooltip: (...o: any[]) => string;
	constructor(params?: Partial<{ disabled: (...o: any[]) => boolean; disabledTooltip: (...o: any[]) => string }>) {
		this.disabled = params?.disabled || (() => false);
		this.disabledTooltip = params?.disabledTooltip || (() => '');
	}
}

@Component({
	selector: 'do-checkbox',
	template: `<mat-checkbox
		[checked]="value || selection.isSelected(row)"
		[disabled]="disabled"
		(change)="selection.toggle(row)"
		[matTooltip]="disabledTooltip"
		[matTooltipDisabled]="!disabled"
	></mat-checkbox>`,
	styles: [],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxComponent implements OnInit, TableCell<boolean> {
	public value = false;
	public set params(params: CheckboxParams | undefined) {
		params = params || new CheckboxParams();
		this.disabled = params.disabled(this.row);
		this.disabledTooltip = params.disabledTooltip(this.row);
	}
	public disabled = false;
	public disabledTooltip = '';

	public row: any;
	public selection: SelectionModel<any>;

	constructor(tableCell: TableCellComponent, table: TableComponent<any>) {
		this.row = tableCell.row;
		this.selection = table.selection;
	}

	ngOnInit(): void {}
}
