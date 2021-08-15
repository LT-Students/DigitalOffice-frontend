//@ts-nocheck
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { OperationResultResponse } from '@data/api/user-service/models/operation-result-response';
import { OperationResultStatusType } from '@data/api/user-service/models/operation-result-status-type';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of, Subject } from 'rxjs';
import { fromPromise } from 'rxjs/internal-compatibility';
import { switchMap } from 'rxjs/operators';
import { AdminDashboardModalType, ModalService, ModalWidth } from '@app/services/modal.service';
import { NewCompanyComponent } from '../../modals/new-company/new-company.component';
import { NewDepartmentComponent } from '../../modals/new-department/new-department.component';
import { NewPositionComponent } from '../../modals/new-position/new-position.component';
import { NewEmployeeComponent } from '../../modals/new-employee/new-employee.component';
import { NewRoleComponent } from '../../modals/new-role/new-role.component';
import { NewOfficeComponent } from '../../modals/new-office/new-office.component';

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

	constructor(private _router: Router, private _matSnackBar: MatSnackBar, public dialog: MatDialog, public modalService: ModalService) {
		this.today = new Date();
		this.openModalClick = new Subject<AdminDashboardModalType>();
		this.modalType = AdminDashboardModalType;
	}

	public ngOnInit(): void {
		const openModalClick$ = this.openModalClick.asObservable();

		openModalClick$
			.pipe(
				switchMap((value: AdminDashboardModalType) => {
					return value === this.modalType.NEW_DEPARTMENT
						? this.modalService.openModal(NewDepartmentComponent, ModalWidth.M).afterClosed()
						: value === this.modalType.NEW_POSITION
						? this.modalService.openModal(NewPositionComponent, ModalWidth.M).afterClosed()
						: value === this.modalType.NEW_EMPLOYEE
						? this.modalService.openModal(NewEmployeeComponent, ModalWidth.L).afterClosed()
						: value === this.modalType.NEW_ROLE
						? this.modalService.openModal(NewRoleComponent, ModalWidth.M).afterClosed()
						: value === this.modalType.NEW_OFFICE
						? this.modalService.openModal(NewOfficeComponent, ModalWidth.M).afterClosed()
						: value === this.modalType.NEW_PROJECT
						? fromPromise(this._router.navigate(['admin/new-project']))
						: value === this.modalType.MANAGE_USERS
						? fromPromise(this._router.navigate(['admin/manage-users']))
						: value === this.modalType.DEPARTMENT_LIST
						? fromPromise(this._router.navigate(['departments']))
						: value === this.modalType.MANAGE_ROLES
						? fromPromise(this._router.navigate(['admin/manage-roles']))
						: value === this.modalType.OFFICE_LIST
						? fromPromise(this._router.navigate(['admin/offices']))
						: value === this.modalType.POSITION_LIST
						? fromPromise(this._router.navigate(['admin/positions']))
						: of(false);
				})
			)
			.subscribe((result: boolean | any | OperationResultResponse) => {
				if (
					result &&
					result.status &&
					!(result.errors && result.errors.length) &&
					(result.status === OperationResultStatusType.FullSuccess || result.status === OperationResultStatusType.PartialSuccess)
				) {
					this._matSnackBar.open('Новый пользователь успешно добавлен!', 'Закрыть', { duration: 7000 });
				}
			});
	}
}
