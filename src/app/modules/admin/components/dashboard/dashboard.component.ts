import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { Project } from '@data/models/project';
import { OperationResultResponse } from '@data/api/user-service/models/operation-result-response';
import { OperationResultStatusType } from '@data/api/user-service/models/operation-result-status-type';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NewCompanyComponent } from '../new-company/new-company.component';
import { NewDepartmentComponent } from '../new-department/new-department.component';
import { NewSpecializationComponent } from '../new-specialization/new-specialization.component';
import { NewEmployeeComponent } from '../new-employee/new-employee.component';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
	selector: 'do-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
	public projects: Project[] = [];
	public today = Date.now();

	constructor(private _router: Router,
				private _matSnackBar: MatSnackBar,
				public dialog: MatDialog) {}

	public ngOnInit(): void {
		const active: Project = {
			id: '1',
			name: 'Меркурий – лечу на орбиту',
			shortName: 'shortName',
			departmentId: '1',
			isActive: true,
			consumer: {
				name: 'Роскосмос',
				description: '',
			},
			description:
				'Внедряем ПО на железки Роскосмоса для полета к орбите Меркурия. Человечество надеется на нас! Внедряем ПО на железки Роскосмоса для полета к орбите Меркурия. Человечество надеется на нас!',
			contributors: [
				{
					user: {
						firstName: 'Вася',
						lastName: 'Пчелкин',
						photo: './assets/images/girl.png',
					},
					totalTime: {
						hours: 280,
						minutes: 40,
					},
				},
				{
					user: {
						firstName: 'Вася',
						lastName: 'Пчелкин',
						photo: './assets/images/girl.png',
					},
					totalTime: {
						hours: 280,
						minutes: 40,
					},
				},
				{
					user: {
						firstName: 'Вася',
						lastName: 'Пчелкин',
						photo: './assets/images/girl.png',
					},
					totalTime: {
						hours: 280,
						minutes: 40,
					},
				},
				{
					user: {
						firstName: 'Вася',
						lastName: 'Пчелкин',
						photo: './assets/images/girl.png',
					},
					totalTime: {
						hours: 280,
						minutes: 40,
					},
				},
				{
					user: {
						firstName: 'Вася',
						lastName: 'Пчелкин',
						photo: './assets/images/girl.png',
					},
					totalTime: {
						hours: 280,
						minutes: 40,
					},
				},
			],
		};

		this.projects.push(active, active, active, active);
	}

	onOpenNewProject() {
		this._router.navigate(['admin/new-project']);
	}

	onOpenNewCompany(): void {
		const dialogRef = this.dialog.open(NewCompanyComponent, {
			width: '503px',
		});
		dialogRef.afterClosed().subscribe((result) => {
			console.log(`Dialog result: ${result}`);
		});

	}
	onOpenNewDepartment(): void {
		const dialogRef = this.dialog.open(NewDepartmentComponent, {
			width: '503px',
		});
		/*dialogRef.afterClosed().subscribe((result) => {
		  console.log(`Dialog result: ${result}`);
		});*/
	}
	onOpenNewSpecialization(): void {
		const dialogRef = this.dialog.open(NewSpecializationComponent, {});
	}

	onOpenNewEmployee(): void {
		const dialogRef = this.dialog.open(NewEmployeeComponent, {});

		dialogRef.afterClosed().subscribe((result: OperationResultResponse) => {
				if (result && result.status &&
					(result.status === OperationResultStatusType.FullSuccess || result.status === OperationResultStatusType.PartialSuccess)) {
					this._matSnackBar.open('Новый пользователь успешно добавлен!', 'Закрыть', { duration: 3000 });
					console.log(`Dialog result: ${ result }`);
				}
			}
		);
		//
		//
	}
}
