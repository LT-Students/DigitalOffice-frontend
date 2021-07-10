import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { NetService } from '@app/services/net.service';
import { DepartmentInfo } from '@data/api/company-service/models/department-info';

@Component({
	selector: 'do-department-list',
	templateUrl: './department-list.component.html',
	styleUrls: ['./department-list.component.scss'],
})
export class DepartmentListComponent implements OnInit {
	@ViewChild(MatSort) sort: MatSort;

	public displayedColumns: string[];
	public departmentInfo: DepartmentInfo[];
	public sortedDepartmentInfo: DepartmentInfo[];

	constructor(private netService: NetService) {
		this.displayedColumns = ['name', 'description', 'director', 'amount'];
		this.departmentInfo = null;
		this.sortedDepartmentInfo = null;
		//this.studyTypes = []
	}

	ngOnInit(): void {
		this.netService.getDepartmentsList().subscribe((data) => {
			this.departmentInfo = data.slice();
			this.sortedDepartmentInfo = data.slice();
			console.log(data);
		})
	}

	public onAddEmployeeClick() {
		console.log('onAddEmployeeClick');
	}

	public sortData(sort: Sort): void {
		const data = this.departmentInfo.slice();
		if (!sort.active || sort.direction === '') {
			this.sortedDepartmentInfo = data;
			return;
		}

		this.sortedDepartmentInfo = data.sort((a: DepartmentInfo, b: DepartmentInfo) => {
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
