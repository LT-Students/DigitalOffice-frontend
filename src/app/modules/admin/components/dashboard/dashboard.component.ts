import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { OperationResultResponse } from '@api/user-service/models/operation-result-response';
import { OperationResultStatusType } from '@api/user-service/models/operation-result-status-type';
import { of, Subject } from 'rxjs';
import { fromPromise } from 'rxjs/internal-compatibility';
import { switchMap } from 'rxjs/operators';
import { AdminDashboardModalType, ModalService, ModalWidth } from '@app/services/modal.service';
import { AddEditDepartmentComponent } from '../../modals/add-edit-department/add-edit-department.component';
import { AddEditPositionComponent } from '../../modals/add-edit-position/add-edit-position.component';
import { NewEmployeeComponent } from '../../modals/new-employee/new-employee.component';
import { AddEditOfficeComponent } from '../../modals/add-edit-office/add-edit-office.component';
import { AddEditRoleComponent } from '../../modals/add-edit-role/add-edit-role.component';
import { EditCompanyComponent } from '../../modals/edit-company/edit-company.component';
import { RouteType } from '../../../../app-routing.module';

@Component({
	selector: 'do-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit {
	public today: Date;
	public openModalClick: Subject<AdminDashboardModalType>;
	public modalType: typeof AdminDashboardModalType;

	constructor(private _router: Router, public dialog: MatDialog, public modalService: ModalService) {
		this.today = new Date();
		this.openModalClick = new Subject<AdminDashboardModalType>();
		this.modalType = AdminDashboardModalType;
	}

	public ngOnInit(): void {
		const openModalClick$ = this.openModalClick.asObservable();

		openModalClick$
			.pipe(
				switchMap((value: AdminDashboardModalType) => {
					switch (value) {
						case this.modalType.NEW_DEPARTMENT: {
							return this.modalService.openModal(AddEditDepartmentComponent, ModalWidth.M).afterClosed();
						}
						case this.modalType.NEW_POSITION: {
							return this.modalService.openModal(AddEditPositionComponent, ModalWidth.M).afterClosed();
						}
						case this.modalType.NEW_EMPLOYEE: {
							return this.modalService.openModal(NewEmployeeComponent, ModalWidth.L).afterClosed();
						}
						case this.modalType.NEW_ROLE: {
							return this.modalService.openModal(AddEditRoleComponent, ModalWidth.M).afterClosed();
						}
						case this.modalType.NEW_OFFICE: {
							return this.modalService.openModal(AddEditOfficeComponent, ModalWidth.M).afterClosed();
						}
						case this.modalType.COMPANY_SETTINGS: {
							return this.modalService.openModal(EditCompanyComponent, ModalWidth.L).afterClosed();
						}
						case this.modalType.NEW_PROJECT: {
							return fromPromise(this._router.navigate([RouteType.PROJECTS, 'new']));
						}
						case this.modalType.MANAGE_USERS: {
							return fromPromise(this._router.navigate([RouteType.ADMIN, 'manage-users']));
						}
						case this.modalType.DEPARTMENT_LIST: {
							return fromPromise(this._router.navigate(['departments']));
						}
						case this.modalType.MANAGE_ROLES: {
							return fromPromise(this._router.navigate([RouteType.ADMIN, 'manage-roles']));
						}
						case this.modalType.OFFICE_LIST: {
							return fromPromise(this._router.navigate([RouteType.ADMIN, 'offices']));
						}
						case this.modalType.POSITION_LIST: {
							return fromPromise(this._router.navigate([RouteType.ADMIN, 'positions']));
						}
						default: {
							return of(false);
						}
					}
				})
			)
			.subscribe((result: boolean | any | OperationResultResponse) => {
				if (
					result &&
					result.status &&
					!(result.errors && result.errors.length) &&
					(result.status === OperationResultStatusType.FullSuccess ||
						result.status === OperationResultStatusType.PartialSuccess)
				) {
					// this._matSnackBar.open('Новый пользователь успешно добавлен!', 'Закрыть', { duration: 7000 });
				}
			});
	}
}
