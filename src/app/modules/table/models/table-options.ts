import { DataSource } from '@angular/cdk/collections';
import { ColumnDef } from './column-def';

export interface TableOptions {
	dataSource?: DataSource<any>;
	columns?: ColumnDef[];
	rowHeight?: number;
	rowStyle?: { [key: string]: any };
	isRowExpandable?: (index: number, rowData: any) => boolean;
	expandedRowOptions?: TableOptions;
}
