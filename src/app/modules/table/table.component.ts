import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { coerceNumberProperty } from '@angular/cdk/coercion';
import { Observable } from 'rxjs';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ColumnDef } from './models';
import { TableOptions } from './models/table-options';

export class SimpleDataSource<T> extends DataSource<T> {
	constructor(private data$: Observable<T[]>) {
		super();
	}
	public connect(collectionViewer: CollectionViewer): Observable<T[]> {
		return this.data$;
	}

	public disconnect(collectionViewer: CollectionViewer): void {}
}

@Component({
	selector: 'do-table',
	templateUrl: './table.component.html',
	styleUrls: ['./table.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	animations: [
		trigger('detailExpand', [
			state('collapsed', style({ height: '0px', minHeight: '0' })),
			state('expanded', style({ height: '*' })),
			transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
		]),
	],
})
export class TableComponent<T> implements OnInit {
	@Output() rowClick = new EventEmitter<T>();

	public expandedElement?: T;

	@Input()
	set tableOptions(options: TableOptions) {
		this.dataSource = options.dataSource || this.dataSource;
		this.columns = options.columns || this._columns;
		this._rowHeight = options.rowHeight || this._rowHeight;
		this._rowStyle = options.rowStyle || this._rowStyle;
		this.isRowExpandable = options.isRowExpandable || this.isRowExpandable;
		this.expandedRowOptions = options.expandedRowOptions || this.expandedRowOptions;
	}

	@Input()
	set rowHeight(height: any) {
		this._rowHeight = coerceNumberProperty(height);
	}
	get rowHeight(): number {
		return this._rowHeight;
	}
	private _rowHeight = 0;

	@Input()
	set rowStyle(style: { [key: string]: any }) {
		this._rowStyle = style;
	}
	get rowStyle(): { [key: string]: any } {
		return this._rowStyle;
	}
	private _rowStyle = {};

	@Input() dataSource!: T[] | DataSource<T> | Observable<readonly T[]>;
	@Input()
	set columns(cols: ColumnDef[]) {
		this._columns = cols;
		this.displayColumns = this._columns.map((col: ColumnDef) => col.field);
	}
	get columns(): ColumnDef[] {
		return this._columns;
	}
	private _columns: ColumnDef[] = [];

	public displayColumns: string[] = [];

	@Input() expandedRowOptions: TableOptions = {};

	@Input() isRowExpandable: (index: number, rowData: T) => boolean = () => false;

	constructor() {}

	public ngOnInit(): void {}
}
