import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { UserInfo } from '@api/filter-service/models/user-info';
import { UserRequest } from '@api/project-service/models';
import { FilterService } from '@app/services/filter/filter.service';
import { AddUsersApiService } from '../../../../add-users-dialog/services/add-users-api.service';
import { ProjectService } from '../../../project.service';
import { NewProjectUser } from '../models';

@Injectable()
export class AddProjectUsersApiService extends AddUsersApiService {
	constructor(filterService: FilterService, private projectService: ProjectService) {
		super(filterService);
	}

	// get project to display correct users count value in project page header
	public addUsers(projectId: string, users: NewProjectUser[]): Observable<unknown> {
		const newUsers: UserRequest[] = users.map((u: NewProjectUser) => ({ userId: u.id, role: u.role }));
		return this.projectService
			.addUsers(projectId, newUsers)
			.pipe(
				switchMap(() =>
					forkJoin([
						this.projectService.getProjectUsers(projectId),
						this.projectService.getProject(projectId),
					])
				)
			);
	}

	public loadUsers(name: string): Observable<NewProjectUser[]> {
		return super
			.findUsers(name)
			.pipe(map((users: UserInfo[]) => users.map((u: UserInfo) => new NewProjectUser(u))));
	}
}
