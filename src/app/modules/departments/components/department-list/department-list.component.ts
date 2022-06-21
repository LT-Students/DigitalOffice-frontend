import { AfterViewInit, ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { DepartmentInfo } from '@api/department-service/models/department-info';
import { ActivatedRoute } from '@angular/router';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { DialogService, ModalWidth } from '@app/services/dialog.service';
import { combineLatest, EMPTY, iif, Observable, ReplaySubject, Subject } from 'rxjs';
import { IFindRequest } from '@app/types/find-request.interface';
import { map, startWith, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { OperationResultResponse, OperationResultStatusType } from '@app/types/operation-result-response.interface';
import { DepartmentService } from '@app/services/department/department.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AddEditDepartmentComponent } from '@shared/dialogs/add-edit-department/add-edit-department.component';
import { Icons } from '@shared/features/icons/icons';

@Component({
	selector: 'do-department-list',
	templateUrl: './department-list.component.html',
	styleUrls: ['./department-list.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DepartmentListComponent implements AfterViewInit {
	public readonly Icons = Icons;
	@ViewChild(MatPaginator) paginator!: MatPaginator;

	private _departmentParams: ReplaySubject<IFindRequest>;
	public filters: FormGroup;
	public departments$!: Observable<OperationResultResponse<DepartmentInfo[]>>;

	private _refreshCurrentPage$$: Subject<boolean>;

	constructor(
		private _departmentService: DepartmentService,
		private _modalService: DialogService,
		private _route: ActivatedRoute,
		private _fb: FormBuilder
	) {
		this.filters = this._fb.group({
			showDeactivated: [false],
		});
		this._refreshCurrentPage$$ = new Subject<boolean>();
		this._departmentParams = new ReplaySubject<IFindRequest>(1);
	}

	public ngAfterViewInit(): void {
		this.departments$ = combineLatest([
			this.filters.valueChanges.pipe(
				startWith({ showDeactivated: false }),
				tap(() => this.paginator.firstPage())
			),
			this.paginator.page.pipe(startWith(null)),
			this._refreshCurrentPage$$.pipe(startWith(null)),
		]).pipe(
			switchMap(([filters, page, refresh]) =>
				filters !== null || page !== null || refresh
					? this.getDepartments(filters, page)
					: this._route.data.pipe(map((response) => response.departments))
			),
			tap((res) => {
				this.paginator.length = res?.totalCount ?? 0;
			})
		);
	}

	public onAddDepartmentClick(): void {
		this._modalService
			.openModal<AddEditDepartmentComponent, undefined, any>(AddEditDepartmentComponent, ModalWidth.M)
			.afterClosed()
			.pipe(withLatestFrom(this._departmentParams))
			.subscribe(([result, params]) => {
				// Fix, then backend change to enum type
				if (result?.status === 'FullSuccess') {
					this._departmentParams.next(params);
				}
			});
	}

	public onDeleteDepartment(department: DepartmentInfo, event: MouseEvent): void {
		event.stopPropagation();
		this._modalService
			.confirm({
				confirmText: 'Да, удалить',
				message: `Вы действительно хотите удалить департамент ${department.name}?`,
				title: `Удаление департамента ${department.name}`,
			})
			.afterClosed()
			.pipe(
				switchMap((result) => {
					return iif(() => !!result, this._departmentService.deleteDepartment(department.id ?? ''), EMPTY);
				})
			)
			.subscribe((result) => {
				if (result.status !== OperationResultStatusType.Failed) {
					this._refreshCurrentPage$$.next(true);
				}
			});
	}

	public onRestoreDepartment(department: DepartmentInfo, event: MouseEvent): void {
		event.stopPropagation();
		this._modalService
			.confirm({
				confirmText: 'Да, восстановить',
				message: `Вы действительно хотите восстановить департамент ${department.name}?`,
				title: `Восстановление департамента ${department.name}`,
			})
			.afterClosed()
			.pipe(
				switchMap((result) => {
					return iif(() => !!result, this._departmentService.restoreDepartment(department.id ?? ''), EMPTY);
				})
			)
			.subscribe((result) => {
				if (result.status !== OperationResultStatusType.Failed) {
					this._refreshCurrentPage$$.next(true);
				}
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

	public getDepartments(
		filters: any,
		event: PageEvent | null
	): Observable<OperationResultResponse<DepartmentInfo[]>> {
		return this._departmentService.findDepartments({
			skipCount: event ? event.pageIndex * event.pageSize : 0,
			takeCount: event ? event.pageSize : 10,
			includeDeactivated: filters.showDeactivated,
		});
	}
}
