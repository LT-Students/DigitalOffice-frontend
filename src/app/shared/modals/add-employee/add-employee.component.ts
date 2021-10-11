import { Component, ChangeDetectionStrategy, ChangeDetectorRef, Input, OnInit } from '@angular/core';
import { UserService } from '@app/services/user/user.service';

@Component({
	selector: 'do-modal-add-employee',
	templateUrl: './add-employee.component.html',
	styleUrls: ['./add-employee.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddEmployeeComponent implements OnInit {
	@Input() idToHide?: string[];
	public positions: string[];
	public membersAll: any[];

	constructor(private _userService: UserService, private _cdr: ChangeDetectorRef) {
		this.positions = ['front', 'back', 'manager', 'lead'];
		this.membersAll = [];
	}
	public ngOnInit(): void {
		this._getPageUsers();
	}

	private _getPageUsers(): void {
		this._userService.findUsers(0, 10, '', true, true).subscribe((data) => {
			this.membersAll = data?.body?.slice() ?? [];
			if (this.idToHide !== undefined) {
				// @ts-ignore
				this.membersAll = this.membersAll.filter((e) => this.idToHide.indexOf(e.id) === -1);
			}
			this._cdr.markForCheck();
		});
	}

	public onScroll() {
		this._getPageUsers();
	}
}
