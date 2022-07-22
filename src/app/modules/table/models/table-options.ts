import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs';
import { ColumnDef } from './column-def';

export interface TableOptions {
	dataSource?: DataSource<any>;
	dataSourceGetter?: (...args: any[]) => any[] | DataSource<any> | Observable<any[]>;
	columns?: ColumnDef[];
	rowHeight?: number;
	rowStyle?: { [key: string]: any };
	isRowExpandable?: (index: number, rowData: any) => boolean;
	expandedRowOptions?: TableOptions;
}
