import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { DepartmentInfo } from '@data/api/company-service/models/department-info';
import { ActivatedRoute } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';
import { ModalService } from '@app/services/modal.service';
import { iif, Observable, ReplaySubject } from 'rxjs';
import { IFindRequest } from '@app/types/find-request.interface';
import { map, startWith, switchMap, withLatestFrom } from 'rxjs/operators';
import { OperationResultResponse } from '@app/types/operation-result-response.interface';
import { DepartmentService } from '@app/services/department/department.service';
import { NewDepartmentComponent } from '../../modals/new-department/new-department.component';

@Component({
	selector: 'do-department-list',
	templateUrl: './department-list.component.html',
	styleUrls: ['./department-list.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DepartmentListComponent {
	private _departmentParams: ReplaySubject<IFindRequest>;
	public departments$: Observable<OperationResultResponse<DepartmentInfo[]>>;

	constructor(
		private _departmentService: DepartmentService,
		private _modalService: ModalService,
		private _route: ActivatedRoute
	) {
		this._departmentParams = new ReplaySubject<IFindRequest>(1);
		this.departments$ = this._departmentParams.pipe(
			startWith(null),
			switchMap((params: IFindRequest | null) =>
				iif(
					() => !!params,
					this._departmentService.findDepartments(params as IFindRequest),
					this._route.data.pipe(map((response) => response.departments))
				)
			)
		);
	}

	public onAddDepartmentClick(): void {
		this._modalService
			.openModal<NewDepartmentComponent, undefined, any>(NewDepartmentComponent)
			.afterClosed()
			.pipe(withLatestFrom(this._departmentParams))
			.subscribe(([result, params]) => {
				// Fix, then backend change to enum type
				if (result?.status === 'FullSuccess') {
					this._departmentParams.next(params);
				}
			});
	}

	public onPageChange(event: PageEvent): void {
		this._departmentParams.next({
			skipCount: event.pageIndex * event.pageSize,
			takeCount: event.pageSize,
		});
	}

	public sortData(sort: Sort): void {
		// const data = this.departmentsInfo.slice();
		// if (!sort.active || sort.direction === '') {
		// 	this.sortedDepartmentsInfo = data;
		// 	return;
		// }
		//
		// this.sortedDepartmentsInfo = data.sort((a: DepartmentInfo, b: DepartmentInfo) => {
		// 	const isAsc = sort.direction === 'asc';
		// 	switch (sort.active) {
		// 		case 'name':
		// 			return this._compare(a.name, b.name, isAsc);
		// 		case 'description':
		// 			return this._compare(a.description as string, b.description as string, isAsc);
		// 		case 'director':
		// 			return this._compare(a.director?.firstName, b.director?.firstName, isAsc);
		// 		case 'amount':
		// 			return this._compare(a.countUsers, b.countUsers, isAsc);
		// 		default:
		// 			return 0;
		// 	}
		// });
	}

	private _compare(a: number | string | undefined, b: number | string | undefined, isAsc: boolean) {
		if (typeof a === 'undefined' || typeof b === 'undefined') {
			return 0;
		}
		return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
	}
}
