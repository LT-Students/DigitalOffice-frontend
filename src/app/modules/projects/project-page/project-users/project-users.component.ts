import { Component, OnInit, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { Icons } from '@shared/modules/icons/icons';
import { DialogService, ModalWidth } from '@app/services/dialog.service';
import { first, map, mapTo, startWith, switchMap } from 'rxjs/operators';
import { ProjectResponse } from '@api/project-service/models/project-response';
import { UserInfo } from '@api/project-service/models/user-info';
import { Observable, Subject } from 'rxjs';
import { UserRights } from '@app/types/user-rights.enum';
import { AddEmployeeDialogData, AddProjectUsersComponent } from '../../add-project-users/add-project-users.component';
import { SelectedProjectService } from '../../project-id-route-container/selected-project.service';
import { DynamicFilterComponent } from '../../../dynamic-filter/dynamic-filter.component';
import { TableComponent } from '../../../table/table.component';
import { ProjectUsersService } from './project-users.service';

@Component({
	selector: 'do-project-users',
	templateUrl: './project-users.component.html',
	styleUrls: ['./project-users.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [ProjectUsersService],
})
export class ProjectUsersComponent implements OnInit {
	public readonly Icons = Icons;
	public readonly UserRights = UserRights;
	@ViewChild(TableComponent, { static: true }) table!: TableComponent<UserInfo>;
	@ViewChild(DynamicFilterComponent, { static: true }) filter!: DynamicFilterComponent;

	public canManageUsers$ = this.usersService.canManageUsers$();
	public filterData = this.usersService.getFilterData();
	public tableColumns = this.usersService.getTableColumns();
	public tableChanged = new Subject();
	public dataSource!: Observable<UserInfo[]>;

	constructor(
		private usersService: ProjectUsersService,
		private selectedProject: SelectedProjectService,
		private dialog: DialogService
	) {}

	ngOnInit(): void {
		this.dataSource = this.selectedProject.users$.pipe(
			switchMap((users: UserInfo[]) =>
				this.tableChanged.pipe(
					startWith(null),
					mapTo(users),
					map(this.filterUsers.bind(this)),
					map(this.sortUsers.bind(this))
				)
			)
		);
	}

	private filterUsers(users: UserInfo[]): UserInfo[] {
		const { position, nameincludesubstring } = this.filter.value;
		return users
			.filter((u: UserInfo) => !position || u.position?.id === position)
			.filter(
				(u: UserInfo) =>
					!nameincludesubstring ||
					nameincludesubstring
						.toLowerCase()
						.trim()
						.split(/\s+/)
						.some((w: string) =>
							[u.firstName, u.lastName, u.middleName || '']
								.filter(Boolean)
								.some((name: string) => name.toLowerCase().includes(w))
						)
			);
	}

	private sortUsers(users: UserInfo[]): UserInfo[] {
		const sort = this.table.sort.direction;
		if (!sort) {
			return users;
		}
		const sortSign = sort === 'asc' ? 1 : -1;
		users.sort(
			(u1: UserInfo, u2: UserInfo) =>
				sortSign * u1.lastName.toLowerCase().localeCompare(u2.lastName.toLowerCase()) ||
				sortSign * u1.firstName.toLowerCase().localeCompare(u2.firstName.toLowerCase())
		);
		return users;
	}

	public addUsers(): void {
		this.selectedProject.info$
			.pipe(
				first(),
				switchMap((p: ProjectResponse) => {
					const data: AddEmployeeDialogData = {
						entityId: p.project.id,
						entityName: p.project.name,
						usersToHide: p.users?.map((u) => ({ id: u.userId, role: u.role })) || [],
					};
					return this.dialog
						.open<UserInfo[]>(AddProjectUsersComponent, { width: ModalWidth.M, data })
						.afterClosed();
				})
			)
			.subscribe({
				next: (users?: UserInfo[]) => {
					if (users) {
						this.selectedProject.setProject({ users });
					}
				},
			});
	}
}
