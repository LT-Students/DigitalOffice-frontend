import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs';
import { MenuItem } from '@shared/component/context-menu/menu-item';
import { SortDirection } from '@angular/material/sort';
import { TrackByFunction } from '@angular/core';
import { ColumnDef } from './column-def';

export interface TableOptions<T = any> {
	dataSource?: DataSource<T>;
	dataSourceGetter?: (...args: T[]) => T[] | DataSource<T> | Observable<T[]>;
	columns?: ColumnDef[];
	rowHeight?: number;
	rowStyle?: { [key: string]: T };
	getRowStyle?: (row: T) => { [key: string]: T };
	rowClass?: string | string[];
	getRowClass?: (row: T) => string | string[];
	getRowTooltip?: (row: T) => string | null;
	isRowExpandable?: (index: number, rowData: T) => boolean;
	expandedRowComparator?: ([expandedRow, row]: [T | null, T]) => boolean;
	selectionCompareWith?: (o1: T, o2: T) => boolean;
	contextMenuItems?: MenuItem[];
	sortActive?: string;
	sortDirection?: SortDirection;
	trackByFn?: TrackByFunction<T>;
}
