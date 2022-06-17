import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { CdkTableModule } from '@angular/cdk/table';
import { TableComponent } from './table.component';
import { TableCellComponent } from './table-cell.component';
import { TextComponent } from './cell-components/text/text.component';
import { StatusComponent } from './cell-components/status/status.component';

@NgModule({
	declarations: [TableComponent, TableCellComponent, TextComponent, StatusComponent],
	imports: [SharedModule, CdkTableModule],
	exports: [TableComponent],
})
export class TableModule {}
