import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { NetService } from '@app/services/net.service';
import { DepartmentInfo } from '@data/api/company-service/models/department-info';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';
import { NewDepartmentComponent } from '../../modals/new-department/new-department.component';
import { RouteType } from '../../../../app-routing.module';

@Component({
	selector: 'do-department-list',
	templateUrl: './department-list.component.html',
	styleUrls: ['./department-list.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DepartmentListComponent implements OnInit {
	public departmentsInfo: DepartmentInfo[];
	public sortedDepartmentsInfo: DepartmentInfo[];

	public totalCount: number;
	public pageSize: number;
	public pageIndex: number;
	public id: string;

	constructor(private netService: NetService, private dialog: MatDialog, private router: Router) {
		this.departmentsInfo = [];
		this.sortedDepartmentsInfo = [];

		this.totalCount = 0;
		this.pageSize = 10;
		this.pageIndex = 0;
		this.id = '';
	}

	ngOnInit(): void {
		this._getDepartments();
	}

	public onAddEmployeeClick() {
		this.dialog.open(NewDepartmentComponent);
	}

	public onDepartmentClick(departmentId: string | undefined) {
		if (departmentId !== undefined) {
			this.router.navigate([ `${ RouteType.DEPARTMENTS }/${ departmentId }` ]);
		}
	}

	public onPageChange(event: PageEvent): void {
		this.pageSize = event.pageSize;
		this.pageIndex = event.pageIndex;
		this._getDepartments();
	}

	private _getDepartments(): void {
		this.netService.getDepartmentsList({ skipCount: this.pageIndex * this.pageSize, takeCount: this.pageSize }).subscribe((res) => {
			this.totalCount = res?.totalCount ?? 0;
			this.departmentsInfo = res?.body ?? [];
			this.sortedDepartmentsInfo = res?.body ?? [];
		});
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
					return this._compare(a.countUsers, b.countUsers, isAsc);
				default:
					return 0;
			}
		});
	}

	private _compare(a: number | string | undefined | null, b: number | string | undefined | null, isAsc: boolean) {
		if (a == null || b == null) {
			return 0;
		}
		return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
	}
}
