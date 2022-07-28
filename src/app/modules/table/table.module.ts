import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { CdkTableModule } from '@angular/cdk/table';
import { TableComponent } from './table.component';
import { TableCellComponent } from './table-cell.component';
import { TextComponent } from './cell-components/text/text.component';
import { StatusComponent } from './cell-components/status/status.component';
import { CheckboxComponent } from './cell-components/checkbox/checkbox.component';
import { UserInfoComponent } from './cell-components/user-info/user-info.component';
import { IconButtonComponent } from './cell-components/icon-button/icon-button.component';
import { LeaveTimesComponent } from './cell-components/leave-times/leave-times.component';
import { LeaveItemComponent } from './cell-components/leave-times/leave-item.component';
import { SelectComponent } from './cell-components/select/select.component';
import { IconComponent } from './cell-components/icon/icon.component';
import { EditableTextFieldComponent } from './cell-components/editable-text-field/editable-text-field.component';

@NgModule({
	declarations: [
		TableComponent,
		TableCellComponent,
		TextComponent,
		StatusComponent,
		CheckboxComponent,
		UserInfoComponent,
		IconButtonComponent,
		LeaveTimesComponent,
		LeaveItemComponent,
		SelectComponent,
		IconComponent,
		EditableTextFieldComponent,
	],
	imports: [SharedModule, CdkTableModule],
	exports: [TableComponent],
})
export class TableModule {}
