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
import { FileInfoComponent } from './cell-components/file-info/file-info.component';
import { FileIconPipe } from './cell-components/file-info/file-icon.pipe';
import { SelectComponent } from './cell-components/select/select.component';

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
		FileInfoComponent,
		FileIconPipe,
		SelectComponent,
	],
	imports: [SharedModule, CdkTableModule],
	exports: [TableComponent],
})
export class TableModule {}