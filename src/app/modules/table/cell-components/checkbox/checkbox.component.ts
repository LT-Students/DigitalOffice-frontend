import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { SelectionModel } from '@app/utils/selection-model';
import { Subscription } from 'rxjs';
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
		(click)="$event.stopPropagation()"
		[matTooltip]="disabledTooltip"
		[matTooltipDisabled]="!disabled"
	></mat-checkbox>`,
	styles: [],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxComponent implements OnInit, OnDestroy, TableCell<boolean> {
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
	private subscription!: Subscription;

	constructor(tableCell: TableCellComponent, table: TableComponent<any>, private cdr: ChangeDetectorRef) {
		this.row = tableCell.row;
		this.selection = table.selection;
	}

	public ngOnInit(): void {
		this.subscription = this.selection.changed.subscribe(() => this.cdr.markForCheck());
	}

	public ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}
}
