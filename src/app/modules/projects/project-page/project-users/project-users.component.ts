import { Component, OnInit, ChangeDetectionStrategy, ViewChild, ViewContainerRef } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { first, map, mapTo, startWith, switchMap } from 'rxjs/operators';
import { ProjectResponse } from '@api/project-service/models/project-response';
import { UserInfo } from '@api/project-service/models/user-info';
import { UserRights } from '@app/types/user-rights.enum';
import { Icons } from '@shared/modules/icons/icons';
import { SelectedProjectService } from '../../project-id-route-container/selected-project.service';
import { DynamicFilterComponent } from '../../../dynamic-filter/dynamic-filter.component';
import { TableComponent } from '../../../table/table.component';
import { AddUsersDialogService } from '../../../add-users-dialog/services/add-users-dialog.service';
import { AddUsersDialogData } from '../../../add-users-dialog/models/models';
import { AddUsersApiBase } from '../../../add-users-dialog/services/add-users-api.service';
import { AddUsersTableConfigService } from '../../../add-users-dialog/services/add-users-table-config.service';
import { ProjectUsersService } from './services/project-users.service';
import { AddProjectUsersApiService } from './services/add-project-users-api.service';
import { AddProjectUsersDialogTableConfigService } from './services/add-project-users-dialog-table-config.service';

@Component({
	selector: 'do-project-users',
	templateUrl: './project-users.component.html',
	styleUrls: ['./project-users.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		ProjectUsersService,
		{ provide: AddUsersApiBase, useClass: AddProjectUsersApiService },
		{ provide: AddUsersTableConfigService, useClass: AddProjectUsersDialogTableConfigService },
	],
})
export class ProjectUsersComponent implements OnInit {
	public readonly Icons = Icons;
	public readonly UserRights = UserRights;
	@ViewChild(TableComponent, { static: true }) table!: TableComponent<UserInfo>;
	@ViewChild(DynamicFilterComponent, { static: true }) filter!: DynamicFilterComponent;

	public canManageUsers$ = this.usersService.canManageUsers$();
	public filterData = this.usersService.getFilterData();
	public tableColumns$ = this.usersService.getTableColumns$();
	public tableChanged = new Subject();
	public dataSource!: Observable<UserInfo[]>;

	constructor(
		private usersService: ProjectUsersService,
		private selectedProject: SelectedProjectService,
		private addUsersDialog: AddUsersDialogService,
		private vcr: ViewContainerRef
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
					const data: AddUsersDialogData = {
						entityId: p.id,
						entityName: p.name,
						existingUsers: p.users?.map((u) => ({ id: u.userId, role: u.role })) || [],
					};
					return this.addUsersDialog.open<[UserInfo[], ProjectResponse]>(data, this.vcr).closed;
				})
			)
			.subscribe({
				next: (result?: [UserInfo[], ProjectResponse]) => {
					if (result) {
						const [users, info] = result;
						this.selectedProject.setProject({ users, info });
					}
				},
			});
	}
}
