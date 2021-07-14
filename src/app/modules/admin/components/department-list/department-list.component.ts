import { Component, OnInit } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { NetService } from '@app/services/net.service';
import { DepartmentInfo } from '@data/api/company-service/models/department-info';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NewDepartmentComponent } from '../new-department/new-department.component';
import { RouteType } from '../../../../app-routing.module';

@Component({
	selector: 'do-department-list',
	templateUrl: './department-list.component.html',
	styleUrls: ['./department-list.component.scss'],
})
export class DepartmentListComponent implements OnInit {
	public departmentsInfo: DepartmentInfo[];
	public sortedDepartmentsInfo: DepartmentInfo[];

	constructor(private netService: NetService, private dialog: MatDialog, private router: Router) {
		this.departmentsInfo = null;
		this.sortedDepartmentsInfo = null;
	}

	ngOnInit(): void {
		this.netService.getDepartmentsList().subscribe((data) => {
			this.departmentsInfo = data.slice();
			this.sortedDepartmentsInfo = data.slice();
		})
	}

	public onAddEmployeeClick() {
		this.dialog.open(NewDepartmentComponent);
	}

	public onDepartmentClick(departmentId) {
		this.router.navigate([ `${ RouteType.DEPARTMENT }/${ departmentId }` ]);
	}

	public sortData(sort: Sort): void {
		const data = this.departmentsInfo.slice();
		if (!sort.active || sort.direction === '') {
			this.sortedDepartmentsInfo = data;
			return;
		}

		this.sortedDepartmentsInfo = data.sort((a: DepartmentInfo, b: DepartmentInfo) => {
			const isAsc = sort.direction === 'asc';
			switch (sort.active) {
				case 'name':
					return this._compare(a.name, b.name, isAsc);
				case 'description':
					return this._compare(a.description, b.description, isAsc);
				case 'director':
					return this._compare(a.director?.firstName, b.director?.firstName, isAsc);
				case 'amount':
					return this._compare(a.users.length, b.users.length, isAsc);
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
