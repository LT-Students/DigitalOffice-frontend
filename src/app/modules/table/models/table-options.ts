import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs';
import { ColumnDef } from './column-def';

export interface TableOptions<T = any> {
	dataSource?: DataSource<T>;
	dataSourceGetter?: (...args: T[]) => T[] | DataSource<T> | Observable<T[]>;
	columns?: ColumnDef[];
	rowHeight?: number;
	rowStyle?: { [key: string]: T };
	rowClass?: string;
	isRowExpandable?: (index: number, rowData: T) => boolean;
	expandedRowComparator?: ([expandedRow, row]: [T | null, T]) => boolean;
	selectionCompareWith?: (o1: T, o2: T) => boolean;
}
