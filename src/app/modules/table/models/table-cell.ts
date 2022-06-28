import { Icons } from '@shared/features/icons/icons';
import { TextComponent } from '../cell-components/text/text.component';
import { StatusComponent } from '../cell-components/status/status.component';
import { CheckboxComponent } from '../cell-components/checkbox/checkbox.component';
import { UserInfoComponent } from '../cell-components/user-info/user-info.component';
import { IconButtonComponent } from '../cell-components/icon-button/icon-button.component';
import { LeaveTimesComponent } from '../cell-components/leave-times/leave-times.component';

export const CELL_TYPES = {
	textCell: TextComponent,
	statusCell: StatusComponent,
	iconButtonCell: IconButtonComponent,
	checkboxCell: CheckboxComponent,
	userInfoCell: UserInfoComponent,
	leaveTimes: LeaveTimesComponent,
};

export type CellTypes = keyof typeof CELL_TYPES;

export interface TextCellParams {
	lineClamp?: number;
}

export interface IconButtonParams {
	onClickFn: (...args: any[]) => any;
	icon: (...args: any[]) => Icons;
}

export type CellParams = TextCellParams | IconButtonParams;

export interface TableCell<V> {
	value: V;
	params?: CellParams;
}
