import {
	AfterContentInit,
	ChangeDetectionStrategy,
	Component,
	ContentChild,
	EventEmitter,
	Input,
	OnInit,
	Output,
	TemplateRef,
	ViewChild,
} from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { coerceNumberProperty } from '@angular/cdk/coercion';
import { Observable } from 'rxjs';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatSort, Sort, SortDirection } from '@angular/material/sort';
import { SelectionModel } from '@app/utils/selection-model';
import { CdkNoDataRow, CdkTable } from '@angular/cdk/table';
import { ColumnDef } from './models';
import { TableOptions } from './models/table-options';

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
export class TableComponent<T> implements OnInit, AfterContentInit {
	@ContentChild(CdkNoDataRow) noDataRow?: CdkNoDataRow;
	@ViewChild(CdkTable, { static: true }) table!: CdkTable<T>;
	@ViewChild(MatSort, { static: true }) sort!: MatSort;

	@Output() rowClick = new EventEmitter<T>();
	@Output() sortChange = new EventEmitter<Sort>();

	public expandedElement: T | null = null;
	public selection = new SelectionModel<T>(true, [], true);
	@Input() selectionCompareWith?: (o1: T, o2: T) => boolean;

	@Input()
	set tableOptions(options: TableOptions) {
		this.dataSource = options.dataSource || this.dataSource;
		this.columns = options.columns || this._columns;
		this._rowHeight = options.rowHeight || this._rowHeight;
		this._rowStyle = options.rowStyle || this._rowStyle;
		this._rowClass = options.rowClass || this._rowClass;
		this.isRowExpandable = options.isRowExpandable || this.isRowExpandable;
		this.expandedRowComparator = options.expandedRowComparator || this.expandedRowComparator;
		this.selectionCompareWith = options.selectionCompareWith || this.selectionCompareWith;
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

	@Input()
	set rowClass(className: string) {
		this._rowClass = className;
	}
	get rowClass(): string {
		return this._rowClass;
	}
	private _rowClass = '';

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

	@Input() sortActive = '';
	@Input() sortDirection: SortDirection = '';

	public displayColumns: string[] = [];

	@Input() expandedRowTemplate: TemplateRef<any> | null = null;
	@Input() isRowExpandable: (index: number, rowData: T) => boolean = () => false;
	@Input() expandedRowComparator: ([expandedRow, row]: [T | null, T]) => boolean = ([expandedRow, row]) =>
		expandedRow === row;

	constructor() {}

	public ngOnInit(): void {
		this.selection.compareWith = this.selectionCompareWith;
	}

	public ngAfterContentInit(): void {
		if (this.noDataRow) {
			this.table.setNoDataRow(this.noDataRow);
		}
	}

	public handleRowClick(row: T): void {
		this.rowClick.emit(row);
		if (this.expandedRowTemplate) {
			this.expandedElement = this.expandedRowComparator([this.expandedElement, row]) ? null : row;
		}
	}
}
