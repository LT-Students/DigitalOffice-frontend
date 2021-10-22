import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { IGetProjectResponse, ProjectService } from '@app/services/project/project.service';
import { ProjectInfo } from '@data/api/project-service/models/project-info';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ModalService } from '@app/services/modal.service';
import { UserInfo } from '@data/api/project-service/models/user-info';
import { ProjectStatus } from '@app/models/project/project-status';
import { ProjectStatusType } from '@data/api/project-service/models/project-status-type';
import { switchMap } from 'rxjs/operators';
import { OperationResultResponseProjectResponse } from '@data/api/project-service/models/operation-result-response-project-response';
import { OperationResultResponse } from '@app/types/operation-result-response.interface';
import { AddEmployeeComponent } from '../../../../shared/modals/add-employee/add-employee.component';
import { EditProjectComponent } from '../../../admin/modals/edit-project/edit-project.component';

@Component({
	selector: 'do-project-page',
	templateUrl: './project-page.component.html',
	styleUrls: ['./project-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectPageComponent implements OnInit {
	public projectId: string;
	public projectInfo: ProjectInfo | undefined;
	public projectUsers: Array<UserInfo>;
	public projectCreatedAt: Date;
	public projectDuration: number;
	public dayCountMap: { [k: string]: string };
	public participantCountMap: { [k: string]: string };
	public employeeCountMap: { [k: string]: string };
	public positions: string[];
	public displayedColumns: string[];
	public dataSource: MatTableDataSource<UserInfo>;
	public selection: SelectionModel<UserInfo>;
	public status: ProjectStatus;

	constructor(
		private _route: ActivatedRoute,
		private _projectService: ProjectService,
		private _cdr: ChangeDetectorRef,
		private _dialog: MatDialog,
		private _modalService: ModalService,
		private _router: Router
	) {
		this.projectId = '';
		this.projectUsers = [];
		this.projectCreatedAt = new Date();
		this.projectDuration = 0;
		this.positions = ['front', 'back', 'manager', 'lead'];
		this.displayedColumns = ['select', 'name', 'role', 'rate', 'status'];
		this.selection = new SelectionModel<UserInfo>(true, []);
		this.dataSource = new MatTableDataSource();

		this.dayCountMap = {
			one: '# день',
			few: '# дня',
			other: '# дней',
		};

		this.participantCountMap = {
			one: '# участник',
			few: '# участника',
			other: '# участников',
		};

		this.employeeCountMap = {
			one: 'Выбран # сотрудник',
			few: 'Выбрано # сотрудника',
			other: 'Выбрано # сотрудников',
		};

		this.status = new ProjectStatus(this.projectInfo?.status ?? ProjectStatusType.Active);
	}

	ngOnInit(): void {
		this.projectId = this._route.snapshot.params.id;
		this._projectService
			.getProject({
				projectId: this.projectId,
				includeusers: true,
				shownotactiveusers: true,
				includeDescription: true,
				includeShortDescription: true,
			})
			.subscribe((result) => {
				console.log(result?.body?.users);
				this.projectInfo = result.body?.project ?? {};
				this.projectUsers = result?.body?.users?.filter((e) => e.isActive) ?? [];
				this.dataSource = new MatTableDataSource(this.projectUsers);
				this.projectCreatedAt = new Date(this.projectInfo?.createdAtUtc);
				this.projectDuration = this._countProjectDuration();
				this._cdr.markForCheck();
			});
	}

	private _countProjectDuration(): number {
		const currentTime = new Date();
		const dayLength = 24 * 60 * 60 * 1000;
		return Math.round((currentTime.getTime() - this.projectCreatedAt.getTime()) / dayLength);
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

	public openAddEmployeeModal(): void {
		const dialogRef = this._dialog.open(AddEmployeeComponent, {
			data: { idToHide: this.projectUsers.map((e) => e.id), pageId: this.projectId },
			maxWidth: '670px',
		});
		dialogRef
			.afterClosed()
			.pipe(
				switchMap(() =>
					this._projectService.getProject({
						projectId: this.projectId,
						includeusers: true,
						shownotactiveusers: true,
					})
				)
			)
			.subscribe((result) => {
				this._updateProjectInfo(result);
			});
	}

	public openEditProjectModal(): void {
		const dialogRef = this._dialog.open(EditProjectComponent, {
			data: { projectInfo: this.projectInfo },
			width: '800px',
		});
		dialogRef
			.afterClosed()
			.pipe(
				switchMap(() =>
					this._projectService.getProject({
						projectId: this.projectId,
						includeusers: true,
						shownotactiveusers: true,
					})
				)
			)
			.subscribe((result) => {
				this._updateProjectInfo(result);
			});
	}

	public removeFromProject(): void {
		this._modalService
			.confirm({
				confirmText: 'Да, удалить',
				title: 'Удаление сотрудников',
				message: 'Вы действительно хотите удалить указанных сотрудников?',
			})
			.afterClosed()
			.subscribe((result) => {
				if (result) {
					const ids: string[] = this.selection.selected.reduce(function (newArr: string[], user) {
						newArr.push(user.id ?? '');

						return newArr;
					}, []);
					this._projectService
						.removeUsersFromProject({ projectId: this.projectId, body: ids })
						.subscribe(() => {
							this._projectService
								.getProject({ projectId: this.projectId, includeusers: true, shownotactiveusers: true })
								.subscribe((result) => {
									this.projectInfo = result.body?.project ?? {};
									this.projectUsers = result?.body?.users?.filter((e) => e.isActive) ?? [];
									this.dataSource = new MatTableDataSource(this.projectUsers);
									this.selection.clear();
									this._cdr.markForCheck();
								});
						});
				}
			});
	}

	public onUserClick(userId: string | undefined): void {
		this._router.navigate([`/user/${userId}`]);
	}

	private _updateProjectInfo(result: OperationResultResponse<IGetProjectResponse>) {
		this.projectInfo = result.body?.project ?? {};
		this.projectUsers = result?.body?.users?.filter((e) => e.isActive) ?? [];
		this.projectCreatedAt = new Date(this.projectInfo?.createdAtUtc);
		this.projectDuration = this._countProjectDuration();
		this._cdr.markForCheck();
	}
}
