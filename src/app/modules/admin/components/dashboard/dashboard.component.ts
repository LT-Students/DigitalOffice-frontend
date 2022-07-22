import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { OperationResultResponse } from '@api/user-service/models/operation-result-response';
import { of, Subject } from 'rxjs';
import { fromPromise } from 'rxjs/internal-compatibility';
import { switchMap } from 'rxjs/operators';
import { AdminDashboardModalType, DialogService, ModalWidth } from '@app/services/dialog.service';
import { NewEmployeeComponent } from '@shared/dialogs/new-employee/new-employee.component';
import { AddEditDepartmentComponent } from '@shared/dialogs/add-edit-department/add-edit-department.component';
import { AppRoutes } from '@app/models/app-routes';
import { AddEditPositionComponent } from '../../modals/add-edit-position/add-edit-position.component';
import { AddEditOfficeComponent } from '../../modals/add-edit-office/add-edit-office.component';
import { AddEditRoleComponent } from '../../modals/add-edit-role/add-edit-role.component';
import { EditCompanyComponent } from '../../modals/edit-company/edit-company.component';
import { ProjectsRoutes } from '../../../projects/models/projects-routes';
import { AdminRoutes } from '../../models/admin-routes';

@Component({
	selector: 'do-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit {
	public openModalClick: Subject<AdminDashboardModalType>;
	public modalType: typeof AdminDashboardModalType;

	constructor(private _router: Router, public dialog: MatDialog, public modalService: DialogService) {
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
							return fromPromise(
								this._router.navigate([AppRoutes.Projects, ProjectsRoutes.CreateProject])
							);
						}
						case this.modalType.MANAGE_USERS: {
							return fromPromise(this._router.navigate([AppRoutes.Users]));
						}
						case this.modalType.DEPARTMENT_LIST: {
							return fromPromise(this._router.navigate([AppRoutes.Departments]));
						}
						case this.modalType.MANAGE_ROLES: {
							return fromPromise(this._router.navigate([AppRoutes.Admin, AdminRoutes.Roles]));
						}
						case this.modalType.OFFICE_LIST: {
							return fromPromise(this._router.navigate([AppRoutes.Admin, AdminRoutes.Offices]));
						}
						case this.modalType.POSITION_LIST: {
							return fromPromise(this._router.navigate([AppRoutes.Admin, AdminRoutes.Positions]));
						}
						default: {
							return of(false);
						}
					}
				})
			)
			.subscribe((result: boolean | any | OperationResultResponse) => {
				if (result && result.status && !(result.errors && result.errors.length)) {
					// this._matSnackBar.open('Новый пользователь успешно добавлен!', 'Закрыть', { duration: 7000 });
				}
			});
	}
}
