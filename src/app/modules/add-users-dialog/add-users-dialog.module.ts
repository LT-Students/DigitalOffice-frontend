import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { TableModule } from '../table/table.module';
import { AddUsersDialogComponent } from './add-users-dialog.component';

@NgModule({
	declarations: [AddUsersDialogComponent],
	imports: [SharedModule, TableModule],
})
export class AddUsersDialogModule {}
