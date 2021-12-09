import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '@app/services/user/user.service';
import { DepartmentInfo } from '@data/api/department-service/models/department-info';
import { ModalService, ModalWidth } from '@app/services/modal.service';
import { OperationResultStatusType, UserInfo } from '@data/api/user-service/models';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { DepartmentUserInfo } from '@data/api/department-service/models/department-user-info';
import { map, switchMap, tap } from 'rxjs/operators';
import { DepartmentService } from '@app/services/department/department.service';
import { EMPTY } from 'rxjs';
import { AddEditDepartmentComponent } from '../../modals/add-edit-department/add-edit-department.component';
import {
	AddEmployeeComponent,
	OpenAddEmployeeModalFrom,
} from '../../../../shared/modals/add-employee/add-employee.component';

@Component({
	selector: 'do-department-card',
	templateUrl: './department-card.component.html',
	styleUrls: ['./department-card.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DepartmentCardComponent {
	public departmentInfo: DepartmentInfo | undefined;
	private _departmentId: string;
	public positions: string[];
	public totalCount: number;
	public peopleCountMap: { [k: string]: string };
	public displayedColumns: string[];
	public dataSource: MatTableDataSource<DepartmentUserInfo>;
	public selection: SelectionModel<DepartmentUserInfo>;
	public employeeCountMap: { [k: string]: string };

	constructor(
		private _departmentService: DepartmentService,
		private _userService: UserService,
		private _router: Router,
		private _modalService: ModalService,
		private _route: ActivatedRoute,
		private _cdr: ChangeDetectorRef
	) {
		this._departmentId = this._route.snapshot.params.id;
		this.totalCount = 0;
		this.positions = ['front', 'back', 'manager', 'lead'];
		this.displayedColumns = ['select', 'name', 'role', 'rate', 'status'];
		this.selection = new SelectionModel<DepartmentUserInfo>(true, []);
		this.dataSource = new MatTableDataSource();

		this.peopleCountMap = {
			few: '# человека',
			other: '# человек',
		};

		this.employeeCountMap = {
			one: 'Выбран # сотрудник',
			few: 'Выбрано # сотрудника',
			other: 'Выбрано # сотрудников',
		};

		this._route.data.pipe(map((result) => result.department)).subscribe((department) => {
			this.departmentInfo = department.body?.department;

			this.totalCount = department.body?.users?.length ?? 0;
			this.dataSource = new MatTableDataSource(department.body?.users?.slice() ?? []);
			this._cdr.markForCheck();
		});
	}

	private _getDepartment(): void {
		this._departmentService
			.getDepartment({ departmentid: this._departmentId, includeusers: true })
			.subscribe(({ body }) => {
				this.departmentInfo = body?.department;

				this.totalCount = body?.users?.length ?? 0;
				this.dataSource = new MatTableDataSource(body?.users?.slice() ?? []);
				this._cdr.markForCheck();
			});
	}

	public onEditDepartamentClick(): void {
		this._modalService
			.openModal<AddEditDepartmentComponent>(AddEditDepartmentComponent, ModalWidth.M, this.departmentInfo)
			.afterClosed()
			.subscribe((result) => {
				if (result?.status === OperationResultStatusType.FullSuccess) this._getDepartment();
			});
	}

	public onUserClick(userId: string | undefined): void {
		this._router.navigate([`/user/${userId}`]);
	}

	public openAddEmployeeModal(): void {
		const modal = this._modalService.openModal(AddEmployeeComponent, ModalWidth.L, {
			idToHide: this.dataSource.data.map((e) => e.id),
			openFrom: OpenAddEmployeeModalFrom.Department,
			moduleName: this.departmentInfo?.name,
		});

		modal
			.afterClosed()
			.pipe(
				switchMap((result: UserInfo[] | undefined) => {
					if (result !== undefined) {
						const usersId: string[] = result.map((m) => m.id).filter((id) => id !== undefined) as string[];

						return this._departmentService.addUsersToDepartment(this._departmentId, usersId);
					} else {
						return EMPTY;
					}
				}),
				switchMap(() => {
					return this._departmentService.getDepartment({
						departmentid: this._departmentId,
						includeusers: true,
					});
				}),
				tap(({ body }) => {
					this.selection.clear();
					this.departmentInfo = body?.department;

					this.totalCount = body?.users?.length ?? 0;
					this.dataSource = new MatTableDataSource(body?.users?.slice() ?? []);
				})
			)
			.subscribe(() => {
				this._cdr.markForCheck();
			});
	}

	public isAllSelected(): boolean {
		const numSelected = this.selection.selected.length;
		const numRows = this.dataSource.data.length;

		return numSelected === numRows;
	}

	public masterToggle(): void {
		if (this.isAllSelected()) {
			this.selection.clear();
			return;
		}
		this.selection.select(...this.dataSource.data);
	}

	public removeFromDepartment(): void {
		this._modalService
			.confirm({
				confirmText: 'Да, удалить',
				title: 'Удаление сотрудников',
				message: 'Вы действительно хотите удалить указанных сотрудников?',
			})
			.afterClosed()
			// .subscribe((result) => {
			// 	if (result) {
			// 		const ids: string[] = this.selection.selected.reduce(function (newArr: string[], user) {
			// 			newArr.push(user.id ?? '');
			//
			// 			return newArr;
			// 		}, []);
			// 		this._departmentService.removeUsersFromDepartment(this._departmentId, ids).subscribe(() => {
			// 			this._departmentService
			// 				.getDepartment({ departmentid: this._departmentId, includeusers: true })
			// 				.subscribe(({ body }) => {
			// 					this.selection.clear();
			// 					this.departmentInfo = body?.department;
			//
			// 					this.totalCount = body?.users?.length ?? 0;
			// 					this.dataSource = new MatTableDataSource(body?.users?.slice() ?? []);
			// 					this._cdr.markForCheck();
			// 				});
			// 		});
			// 	}
			// });
			.pipe(
				switchMap((result) => {
					if (result) {
						const ids: string[] = this.selection.selected.reduce(function (newArr: string[], user) {
							newArr.push(user.id ?? '');

							return newArr;
						}, []);
						return this._departmentService.removeUsersFromDepartment(this._departmentId, ids);
					} else {
						return EMPTY;
					}
				}),
				switchMap(() => {
					return this._departmentService.getDepartment({
						departmentid: this._departmentId,
						includeusers: true,
					});
				}),
				tap(({ body }) => {
					this.selection.clear();
					this.departmentInfo = body?.department;

					this.totalCount = body?.users?.length ?? 0;
					this.dataSource = new MatTableDataSource(body?.users?.slice() ?? []);
				})
			)
			.subscribe(() => {
				this._cdr.markForCheck();
			});
	}
}
