import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Icons } from '@shared/features/icons/icons';
import { DialogService, ModalWidth } from '@app/services/dialog.service';
import { ManageUsersDialogComponent } from '../manage-users-dialog/manage-users-dialog.component';

interface UserLike {
	firstName: string;
	lastName: string;
}

@Component({
	selector: 'do-team',
	templateUrl: './team.component.html',
	styleUrls: ['./team.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeamComponent implements OnInit {
	public readonly Icons = Icons;
	@Input() users: UserLike[] = [{ firstName: 'Roma', lastName: 'Ts' }];

	constructor(private dialog: DialogService) {}

	ngOnInit(): void {}

	openDialog() {
		this.dialog.open(ManageUsersDialogComponent, { width: ModalWidth.L });
	}
}
