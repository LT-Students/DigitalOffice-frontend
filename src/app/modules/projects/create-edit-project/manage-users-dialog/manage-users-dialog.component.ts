import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ManageUsersDialogService } from './manage-users-dialog.service';

@Component({
	selector: 'do-manage-users-dialog',
	templateUrl: './manage-users-dialog.component.html',
	styleUrls: ['./manage-users-dialog.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManageUsersDialogComponent implements OnInit {
	public filters = this.manageUsers.getFilterData();
	public columns = this.manageUsers.getTableColumns();
	public dataSource = this.manageUsers.loadUsers$();

	constructor(private manageUsers: ManageUsersDialogService) {}

	ngOnInit(): void {}
}
