import { CellParams, CellTypes } from './table-cell';

export interface ColumnDef {
	field: string;
	headerName?: string;
	type?: CellTypes;
	params?: CellParams;
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
