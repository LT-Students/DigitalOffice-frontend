import { TextComponent } from '../cell-components/text/text.component';
import { StatusComponent } from '../cell-components/status/status.component';

export const CELL_TYPES = {
	textCell: TextComponent,
	statusCell: StatusComponent,
};

export type CellTypes = keyof typeof CELL_TYPES;

export interface TextCellParams {
	lineClamp?: number;
}

export type CellParams = TextCellParams;

export interface TableCell<V> {
	value: V;
	params?: CellParams;
}
