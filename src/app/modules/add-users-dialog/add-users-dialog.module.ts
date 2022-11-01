import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { TableModule } from '../table/table.module';
import { DynamicFilterModule } from '../dynamic-filter/dynamic-filter.module';
import { AddUsersDialogComponent } from './add-users-dialog.component';

@NgModule({
	declarations: [AddUsersDialogComponent],
	imports: [SharedModule, TableModule, DynamicFilterModule],
})
export class AddUsersDialogModule {}
