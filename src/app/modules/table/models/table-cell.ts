import { Icons } from '@shared/modules/icons/icons';
import { TextCellParams, TextComponent } from '../cell-components/text/text.component';
import { StatusComponent } from '../cell-components/status/status.component';
import { CheckboxComponent, CheckboxParams } from '../cell-components/checkbox/checkbox.component';
import { UserInfoComponent, UserInfoParams } from '../cell-components/user-info/user-info.component';
import { IconButtonComponent } from '../cell-components/icon-button/icon-button.component';
import { SelectCellParams, SelectComponent } from '../cell-components/select/select.component';
import { IconComponent } from '../cell-components/icon/icon.component';
import {
	EditableTextFieldComponent,
	EditableTextFieldParams,
} from '../cell-components/editable-text-field/editable-text-field.component';
import { EditableTimeComponent } from '../cell-components/editable-text-field/editable-time.component';

export const CELL_TYPES = {
	textCell: TextComponent,
	statusCell: StatusComponent,
	iconCell: IconComponent,
	iconButtonCell: IconButtonComponent,
	checkboxCell: CheckboxComponent,
	userInfoCell: UserInfoComponent,
	selectCell: SelectComponent,
	editableTextFieldCell: EditableTextFieldComponent,
	editableTimeCell: EditableTimeComponent,
};

export type CellTypes = keyof typeof CELL_TYPES;

export interface IconButtonParams {
	onClickFn: (...args: any[]) => any;
	icon: (...args: any[]) => Icons;
}

export type CellParams =
	| TextCellParams
	| IconButtonParams
	| SelectCellParams
	| UserInfoParams
	| CheckboxParams
	| EditableTextFieldParams;

export interface TableCell<V> {
	value?: V;
	params?: CellParams;
}
