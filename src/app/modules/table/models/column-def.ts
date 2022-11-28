import { ComponentType } from '@angular/cdk/overlay';
import { CellTypes, TableCell } from './table-cell';

export interface IColumnDef {
	field: string;
	headerName?: string;
	type?: CellTypes;
	customComponent?: ComponentType<TableCell<any>>;
	params?: any;
	valueGetter?: (element: any) => any;
	width?: number;
	minWidth?: number;
	maxWidth?: number;
	columnStyle?: { [key: string]: any };
	columnClass?: string | string[];
	headerStyle?: { [key: string]: any };
	sortEnabled?: boolean;
	disableClearSort?: boolean;
}

export class ColumnDef {
	field: string;
	type: CellTypes;
	customComponent?: ComponentType<TableCell<any>>;
	headerName?: string;
	params?: any;
	valueGetter?: (element: any) => any;
	width?: number;
	minWidth?: number;
	maxWidth?: number;
	columnStyle?: { [key: string]: any };
	columnClass?: string | string[];
	headerStyle?: { [key: string]: any };
	sortEnabled: boolean;
	disableClearSort: boolean;

	constructor(colDef: IColumnDef) {
		this.field = colDef.field;
		this.type = colDef.type || 'textCell';
		this.customComponent = colDef.customComponent;
		this.headerName = colDef.headerName;
		this.params = colDef.params;
		this.valueGetter = colDef.valueGetter;
		this.width = colDef.width;
		this.minWidth = colDef.minWidth;
		this.maxWidth = colDef.maxWidth;
		this.columnStyle = colDef.columnStyle;
		this.columnClass = colDef.columnClass;
		this.headerStyle = colDef.headerStyle;
		this.sortEnabled = colDef.sortEnabled || false;
		this.disableClearSort = colDef.disableClearSort || false;
	}
}
