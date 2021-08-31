import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { NetService } from '@app/services/net.service';
import { DepartmentInfo } from '@data/api/company-service/models/department-info';
import { Router } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';
import { NewDepartmentComponent } from '../../modals/new-department/new-department.component';
import { RouteType } from '../../../../app-routing.module';
import { ModalService } from '@app/services/modal.service';
// import { Observable } from 'rxjs';
// import { map, tap } from 'rxjs/operators';

@Component({
	selector: 'do-department-list',
	templateUrl: './department-list.component.html',
	styleUrls: ['./department-list.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DepartmentListComponent implements OnInit {
	public departmentsInfo: DepartmentInfo[];
	//public departmentsInfo$: Observable<DepartmentInfo[]>
	public sortedDepartmentsInfo: DepartmentInfo[];

	public totalCount: number;
	public pageSize: number;
	public pageIndex: number;
	public id: string;


	constructor(
		private netService: NetService,
		private _modalService: ModalService,
		private router: Router,
		private _cdr: ChangeDetectorRef
	) {
		this.departmentsInfo = [];
		this.sortedDepartmentsInfo = [];
		//this.departmentsInfo$ = new Observable();

		this.totalCount = 0;
		this.pageSize = 10;
		this.pageIndex = 0;
		this.id = '';
	}

	ngOnInit(): void {
		this._getDepartments();
	}

	public onAddDepartmentClick() {
		this._modalService
			.openModal<NewDepartmentComponent, undefined, any>(NewDepartmentComponent)
			.afterClosed()
			.subscribe(result => {
				console.log("RESULT: ", result)
				// Fix, then backend chnage to enum type
				if (result?.status === 'FullSuccess')
					this._getDepartments();
			});
	}

	public onDepartmentClick(departmentId: string | undefined) {
		this.router.navigate([`${RouteType.DEPARTMENTS}/${departmentId ?? ''}`]);
	}

	public onPageChange(event: PageEvent): void {
		this.pageSize = event.pageSize;
		this.pageIndex = event.pageIndex;
		this._getDepartments();
	}

	private _getDepartments(): void {
		this.netService.getDepartmentsList({ skipCount: this.pageIndex * this.pageSize, takeCount: this.pageSize }).subscribe((res) => {
			this.totalCount = res.totalCount ?? 0;
			this.departmentsInfo = res.body ?? [];
			this.sortedDepartmentsInfo = res.body ?? [];
			this._cdr.markForCheck();
		});

		// this.departmentsInfo$ = this.netService.getDepartmentsList({ skipCount: this.pageIndex * this.pageSize, takeCount: this.pageSize })
		// 	.pipe(
		// 		tap((result) => { this.totalCount = result.totalCount ?? 0; }),
		// 		map((result) => { return result.body ?? []; })
		// 	)
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
					return this._compare(a.description!, b.description!, isAsc);
				case 'director':
					return this._compare(a.director?.firstName, b.director?.firstName, isAsc);
				case 'amount':
					return this._compare(a.countUsers, b.countUsers, isAsc);
				default:
					return 0;
			}
		});
	}

	private _compare(a: number | string | undefined, b: number | string | undefined, isAsc: boolean) {
		if (typeof a === 'undefined' || typeof b === 'undefined') {
			return 0;
		}
		return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
	}
}
