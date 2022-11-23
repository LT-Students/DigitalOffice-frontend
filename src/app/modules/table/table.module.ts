import { NgModule } from '@angular/core';
import { CdkTableModule } from '@angular/cdk/table';
import { SharedModule } from '@shared/shared.module';
import { TableComponent } from './table.component';
import { TableCellComponent } from './table-cell.component';
import { TextComponent } from './cell-components/text/text.component';
import { StatusComponent } from './cell-components/status/status.component';
import { CheckboxComponent } from './cell-components/checkbox/checkbox.component';
import { UserInfoComponent } from './cell-components/user-info/user-info.component';
import { IconButtonComponent } from './cell-components/icon-button/icon-button.component';
import { SelectComponent } from './cell-components/select/select.component';
import { IconComponent } from './cell-components/icon/icon.component';
import { EditableTextFieldComponent } from './cell-components/editable-text-field/editable-text-field.component';
import { ShowMoreTextComponent } from './cell-components/show-more-text/show-more-text.component';
import { ContextMenuCellComponent } from './cell-components/context-menu/context-menu-cell.component';
import { SlideApplyButtonComponent } from './cell-components/slide-apply-button/slide-apply-button.component';

@NgModule({
	declarations: [
		TableComponent,
		TableCellComponent,
		TextComponent,
		StatusComponent,
		CheckboxComponent,
		UserInfoComponent,
		IconButtonComponent,
		SelectComponent,
		IconComponent,
		EditableTextFieldComponent,
		ShowMoreTextComponent,
		ContextMenuCellComponent,
		SlideApplyButtonComponent,
	],
	imports: [SharedModule, CdkTableModule],
	exports: [TableComponent, CdkTableModule],
})
export class TableModule {}
