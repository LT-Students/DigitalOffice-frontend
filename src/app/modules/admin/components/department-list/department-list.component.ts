import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { UserResponse } from '@data/api/user-service/models/user-response';

@Component({
	selector: 'app-department-list',
	templateUrl: './department-list.component.html',
	styleUrls: ['./department-list.component.scss'],
})
export class DepartmentListComponent implements OnInit {
	@ViewChild(MatSort) sort: MatSort;

	constructor() {}

	ngOnInit(): void {}

	public onAddEmployeeClick() {
		console.log('onAddEmployeeClick');
	}

	public sortData(sort: Sort): void {
		const data = this.userInfo.slice();
		if (!sort.active || sort.direction === '') {
			this.sortedUserInfo = data;
			return;
		}

		this.sortedUserInfo = data.sort((a: UserResponse, b: UserResponse) => {
			const isAsc = sort.direction === 'asc';
			switch (sort.active) {
				case 'name':
					return this._compare(a.user.firstName, b.user.firstName, isAsc);
				case 'department':
					return this._compare(a.department?.name, b.department?.name, isAsc);
				case 'role':
					return this._compare(a.position?.name, b.position?.name, isAsc);
				case 'rate':
					return this._compare(a.user?.rate, b.user?.rate, isAsc);
				case 'status':
					return this._compare(a.user.status, b.user.status, isAsc);
				default:
					return 0;
			}
		});
	}

	private _compare(a: number | string, b: number | string, isAsc: boolean) {
		if (typeof a === 'undefined' || typeof b === 'undefined') {
			return 0;
		}
		return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
	}
}
