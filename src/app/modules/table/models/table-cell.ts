import { TextComponent } from '../cell-components/text/text.component';
import { StatusComponent } from '../cell-components/status/status.component';
import { CheckboxComponent } from '../cell-components/checkbox/checkbox.component';
import { UserInfoComponent } from '../cell-components/user-info/user-info.component';
import { IconButtonComponent } from '../cell-components/icon-button/icon-button.component';
import { SelectComponent } from '../cell-components/select/select.component';
import { IconComponent } from '../cell-components/icon/icon.component';
import { EditableTextFieldComponent } from '../cell-components/editable-text-field/editable-text-field.component';
import { ShowMoreTextComponent } from '../cell-components/show-more-text/show-more-text.component';
import { ContextMenuCellComponent } from '../cell-components/context-menu/context-menu-cell.component';
import { SlideApplyButtonComponent } from '../cell-components/slide-apply-button/slide-apply-button.component';

export const CELL_TYPES = {
	textCell: TextComponent,
	statusCell: StatusComponent,
	iconCell: IconComponent,
	iconButtonCell: IconButtonComponent,
	slideApplyButtonCell: SlideApplyButtonComponent,
	checkboxCell: CheckboxComponent,
	userInfoCell: UserInfoComponent,
	selectCell: SelectComponent,
	editableTextFieldCell: EditableTextFieldComponent,
	showMoreTextCell: ShowMoreTextComponent,
	contextMenuCell: ContextMenuCellComponent,
};

export type CellTypes = keyof typeof CELL_TYPES;

export interface TableCell<V> {
	value?: V;
	params?: any;
}
