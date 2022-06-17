import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { coerceNumberProperty } from '@angular/cdk/coercion';
import { ColumnDef } from './models/column-def';

@Component({
	selector: 'do-table',
	templateUrl: './table.component.html',
	styleUrls: ['./table.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent<T> implements OnInit {
	@Output() rowClick = new EventEmitter<T>();

	@Input()
	set rowHeight(height: any) {
		this._rowHeight = coerceNumberProperty(height);
	}
	get rowHeight(): number {
		return this._rowHeight;
	}
	private _rowHeight = 0;
	@Input() dataSource!: DataSource<T>;
	@Input() columns: ColumnDef[] = [];
	public displayColumns: string[] = [];

	constructor() {}

	public ngOnInit(): void {
		this.displayColumns = this.columns.map((col: ColumnDef) => col.field);
	}
}
