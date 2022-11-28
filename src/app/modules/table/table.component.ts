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
	TrackByFunction,
	ViewChild,
	ViewEncapsulation,
} from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { coerceNumberProperty } from '@angular/cdk/coercion';
import { Observable } from 'rxjs';
import { MatSort, Sort, SortDirection } from '@angular/material/sort';
import { SelectionModel } from '@app/utils/selection-model';
import { CdkNoDataRow, CdkTable } from '@angular/cdk/table';
import { MenuItem } from '@shared/component/context-menu/menu-item';
import { ContextMenuComponent } from '@shared/component/context-menu/context-menu.component';
import { ColumnDef, TableOptions } from './models';

@Component({
	selector: 'do-table',
	templateUrl: './table.component.html',
	styleUrls: ['./table.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
})
export class TableComponent<T> implements OnInit, AfterContentInit {
	@ContentChild(CdkNoDataRow) noDataRow?: CdkNoDataRow;
	@ViewChild(CdkTable, { static: true }) table!: CdkTable<T>;
	@ViewChild(MatSort, { static: true }) sort!: MatSort;
	@ViewChild(ContextMenuComponent, { static: true }) contextMenu!: ContextMenuComponent;

	@Output() rowClick = new EventEmitter<T>();
	@Output() sortChange = new EventEmitter<Sort>();

	public expandedElement: T | null = null;
	public selection = new SelectionModel<T>(true, [], true);
	@Input() selectionCompareWith?: (o1: T, o2: T) => boolean;

	@Input()
	set tableOptions(options: TableOptions | null) {
		if (options) {
			this.dataSource = options.dataSource || this.dataSource;
			this.columns = options.columns || this._columns;
			this._rowHeight = options.rowHeight || this._rowHeight;
			this._rowStyle = options.rowStyle || this._rowStyle;
			this._getRowStyle = options.getRowStyle || this._getRowStyle;
			this._rowClass = options.rowClass || this._rowClass;
			this._getRowClass = options.getRowClass || this._getRowClass;
			this._getRowTooltip = options.getRowTooltip || this._getRowTooltip;
			this.contextMenuItems = options.contextMenuItems || this.contextMenuItems;
			this.isRowExpandable = options.isRowExpandable || this.isRowExpandable;
			this.expandedRowComparator = options.expandedRowComparator || this.expandedRowComparator;
			this.selectionCompareWith = options.selectionCompareWith || this.selectionCompareWith;
			this.sortActive = options.sortActive || this.sortActive;
			this.sortDirection = options.sortDirection || this.sortDirection;
			this.trackByFn = options.trackByFn || this.trackByFn;
		}
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
	set getRowStyle(getRowStyle: ((row: T) => { [key: string]: any }) | null) {
		this._getRowStyle = getRowStyle;
	}
	get getRowStyle(): ((row: T) => { [key: string]: any }) | null {
		return this._getRowStyle;
	}
	private _getRowStyle: ((row: T) => { [key: string]: any }) | null = null;

	@Input()
	set rowClass(className: string | string[]) {
		this._rowClass = className;
	}
	get rowClass(): string | string[] {
		return this._rowClass;
	}
	private _rowClass: string | string[] = '';

	@Input()
	set getRowClass(getRowClass: ((row: T) => string | string[]) | null) {
		this._getRowClass = getRowClass;
	}
	get getRowClass(): ((row: T) => string | string[]) | null {
		return this._getRowClass;
	}
	private _getRowClass: ((row: T) => string | string[]) | null = null;

	@Input()
	set getRowTooltip(getRowTooltip: ((row: T) => string | null) | null) {
		this._getRowTooltip = getRowTooltip;
	}
	get getRowTooltip(): ((row: T) => string | null) | null {
		return this._getRowTooltip;
	}
	private _getRowTooltip: ((row: T) => string | null) | null = null;

	@Input() dataSource!: T[] | DataSource<T> | Observable<readonly T[]>;
	@Input()
	set columns(cols: ColumnDef[] | null) {
		this._columns = cols || [];
		this.displayColumns = this._columns.map((col: ColumnDef) => col.field);
	}
	get columns(): ColumnDef[] {
		return this._columns;
	}
	private _columns: ColumnDef[] = [];

	@Input() sortActive = '';
	@Input() sortDirection: SortDirection = '';

	public displayColumns: string[] = [];

	@Input() contextMenuItems: MenuItem[] = [];

	@Input() expandedRowTemplate: TemplateRef<any> | null = null;
	@Input() isRowExpandable: (index: number, rowData: T) => boolean = () => false;
	@Input() expandedRowComparator: ([expandedRow, row]: [T | null, T]) => boolean = ([expandedRow, row]) =>
		expandedRow === row;
	@Input() trackByFn: TrackByFunction<any> = (index: number, row: T) => row;

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
