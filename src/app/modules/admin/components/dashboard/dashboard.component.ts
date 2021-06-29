import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { OperationResultResponse } from '@data/api/user-service/models/operation-result-response';
import { OperationResultStatusType } from '@data/api/user-service/models/operation-result-status-type';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of, Subject } from 'rxjs';
import { fromPromise } from 'rxjs/internal-compatibility';
import { switchMap } from 'rxjs/operators';
import { AdminDashboardModalType } from '@app/services/modal.service';
import { NewCompanyComponent } from '../new-company/new-company.component';
import { NewDepartmentComponent } from '../new-department/new-department.component';
import { NewSpecializationComponent } from '../new-specialization/new-specialization.component';
import { NewEmployeeComponent } from '../new-employee/new-employee.component';
import { NewRoleComponent } from '../new-role/new-role.component';

@Component({
	selector: 'do-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
	public today: Date;
	public openModalClick: Subject<AdminDashboardModalType>;
	public modalType: typeof AdminDashboardModalType;

	constructor(private _router: Router, private _matSnackBar: MatSnackBar, public dialog: MatDialog) {
		this.today = new Date();
		this.openModalClick = new Subject<AdminDashboardModalType>();
		this.modalType = AdminDashboardModalType;
	}

	public ngOnInit(): void {
		const openModalClick$ = this.openModalClick.asObservable();

		openModalClick$.pipe(
			switchMap((value: AdminDashboardModalType) => {
				return (value === this.modalType.NEW_COMPANY)
					? this.dialog.open(NewCompanyComponent, { width: '503px' }).afterClosed()
					: (value === this.modalType.NEW_DEPARTMENT)
					? this.dialog.open(NewDepartmentComponent, { width: '503px' }).afterClosed()
					: (value === this.modalType.NEW_SPECIALIZATION)
					? this.dialog.open(NewSpecializationComponent, {}).afterClosed()
					: (value === this.modalType.NEW_EMPLOYEE)
					? this.dialog.open(NewEmployeeComponent, {}).afterClosed()
					: (value === this.modalType.NEW_ROLE)
					? this.dialog.open(NewRoleComponent, {}).afterClosed()
					: (value === this.modalType.NEW_PROJECT)
					? fromPromise(this._router.navigate(['admin/new-project']))
					: (value === this.modalType.MANAGE_USERS)
					? fromPromise(this._router.navigate(['admin/manage-users']))
					: of(false)
			})).subscribe((result: boolean | any | OperationResultResponse) => {
			if (
				result &&
				result.status &&
				!(result.errors && result.errors.length)
				(result.status === OperationResultStatusType.FullSuccess || result.status === OperationResultStatusType.PartialSuccess)
			) {
				this._matSnackBar.open('Новый пользователь успешно добавлен!', 'Закрыть', { duration: 7000 });
			}
		});
	}
}
