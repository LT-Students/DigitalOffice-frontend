import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { IGetProjectResponse, ProjectService } from '@app/services/project/project.service';
import { ProjectInfo } from '@data/api/project-service/models/project-info';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ModalService } from '@app/services/modal.service';
import { UserInfo } from '@data/api/project-service/models/user-info';
import { ProjectTypeModel } from '@app/models/project/project-status';
import { ProjectStatusType } from '@data/api/project-service/models/project-status-type';
import { map, switchMap } from 'rxjs/operators';
import { OperationResultResponse } from '@app/types/operation-result-response.interface';
import {
	AddEmployeeComponent,
	OpenAddEmployeeModalFrom,
} from '../../../../shared/modals/add-employee/add-employee.component';
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
	public projectCreatedAt: Date;
	public projectDuration: number;
	public dayCountMap: { [k: string]: string };
	public participantCountMap: { [k: string]: string };
	public employeeCountMap: { [k: string]: string };
	public positions: string[];
	public displayedColumns: string[];
	public dataSource: MatTableDataSource<UserInfo>;
	public selection: SelectionModel<UserInfo>;
	public status: ProjectStatusType | undefined;

	constructor(
		private _route: ActivatedRoute,
		private _projectService: ProjectService,
		private _cdr: ChangeDetectorRef,
		private _dialog: MatDialog,
		private _modalService: ModalService,
		private _router: Router
	) {
		this.projectId = '';
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

		this._route.data
			.pipe(map((response) => response.project))
			.subscribe((project) => this._updateProjectInfo(project));
	}

	ngOnInit(): void {
		this.projectId = this._route.snapshot.params.id;
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
			data: {
				idToHide: this.dataSource.data.map((e) => e.id),
				pageId: this.projectId,
				openFrom: OpenAddEmployeeModalFrom.Project,
				moduleName: this.projectInfo?.name,
			},
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
						includeShortDescription: true,
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
									this.selection.clear();
									this._updateProjectInfo(result);
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
		this.status = ProjectTypeModel.getProjectType(this.projectInfo?.status)?.type;
		this.dataSource = new MatTableDataSource(result?.body?.users?.filter((e) => e.isActive) ?? []);
		this.projectCreatedAt = new Date(this.projectInfo?.createdAtUtc);
		this.projectDuration = this._countProjectDuration();
		this._cdr.markForCheck();
	}
}
