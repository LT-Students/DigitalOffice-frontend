import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { TableModule } from '../table/table.module';
import { DynamicFilterModule } from '../dynamic-filter/dynamic-filter.module';
import { ManagerTimelistComponent } from './manager-timelist.component';

@NgModule({
	declarations: [ManagerTimelistComponent],
	imports: [CommonModule, SharedModule, TableModule, DynamicFilterModule],
	exports: [ManagerTimelistComponent],
})
export class ManagerTimelistModule {}
