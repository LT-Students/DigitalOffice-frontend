import { Component, OnInit } from '@angular/core';
import { DepartmentInfo } from '@data/api/company-service/models/department-info';
import { Sort } from '@angular/material/sort';
import { of } from 'rxjs';
import { NetService } from '@app/services/net.service';
import { UserInfo } from '@data/api/company-service/models/user-info';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { NewEmployeeComponent } from '../new-employee/new-employee.component';

const department = of({
	id: 'yo',
	director: {
		firstName: 'Roma',
		lastName: 'Tsinevich',
	},
	name: 'Департамент цифровых решений',
	description:
		'Департамент цифровых решений основан в 1834 году. Первым ДД был граф Дракула. В департаменте идет разработка философского камня и новых моделей Нимбусов. ',
	users: [
		{
			firstName: 'Roma',
			lastName: 'Tsinevich',
		},
		{
			firstName: 'Viktor',
			lastName: 'Timokhov',
		},
	],
});

@Component({
	selector: 'do-department-card',
	templateUrl: './department-card.component.html',
	styleUrls: ['./department-card.component.scss'],
})
export class DepartmentCardComponent implements OnInit {
	public departmentInfo: DepartmentInfo;
	public sortedUsersInfo: UserInfo[];
	private _departmentId: string;

	constructor(private _netService: NetService, private _router: Router, private _dialog: MatDialog, private _route: ActivatedRoute) {
		this._departmentId = this._route.snapshot.params.id;
	}

	ngOnInit(): void {
		this._netService.getDepartment(this._departmentId).subscribe((data: DepartmentInfo) => {
			console.log('yoo', data);
			this.departmentInfo = data;
			this.sortedUsersInfo = data.users.slice();
		});
	}

	onAddEmployeeClick() {
		this._dialog.open(NewEmployeeComponent);
	}

	onUserClick(userId: string) {
		this._router.navigate([`/user/${userId}`]);
	}

	public sortData(sort: Sort): void {
		const data = this.departmentInfo.users.slice();
		if (!sort.active || sort.direction === '') {
			this.sortedUsersInfo = data;
			return;
		}

		// this.sortedUsersInfo = data.sort((a: UserInfo, b: UserInfo) => {
		// 	const isAsc = sort.direction === 'asc';
		// 	switch (sort.active) {
		// 		case 'name':
		// 			return this._compare(a.firstName, b.firstName, isAsc);
		// 		case 'role':
		// 			return this._compare(a.role, b.role, isAsc);
		// 		case 'rate':
		// 			return this._compare(a.rate, b.rate, isAsc);
		// 		case 'status':
		// 			return this._compare(a.status, b.status, isAsc);
		// 		default:
		// 			return 0;
		// 	}
		// });
	}

	private _compare(a: number | string, b: number | string, isAsc: boolean) {
		if (typeof a === 'undefined' || typeof b === 'undefined') {
			return 0;
		}
		return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
	}
}
