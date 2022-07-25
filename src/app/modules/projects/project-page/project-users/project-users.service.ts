import { Injectable } from '@angular/core';
import { Icons } from '@shared/modules/icons/icons';
import { FileInfo } from '@api/project-service/models/file-info';
import { Observable } from 'rxjs';
import { UserInfo } from '@api/project-service/models/user-info';
import { ProjectService } from '../../project.service';
import { FilterDef, InputFilterParams } from '../../../dynamic-filter/models';
import { ColumnDef } from '../../../table/models';

@Injectable()
export class ProjectUsersService {
	constructor(private projectService: ProjectService) {}

	public getFilterData(): FilterDef[] {
		return [
			{
				key: 'position',
				type: 'input',
				width: 176,
				params: new InputFilterParams({ placeholder: 'Должность', icon: Icons.ArrowDownV1 }),
			},
			{
				key: 'nameincludesubstring',
				type: 'input',
				width: 324,
				params: new InputFilterParams({ placeholder: 'поиск', icon: Icons.Search }),
			},
		];
	}

	public getTableColumns(): ColumnDef[] {
		return [
			{
				type: 'userInfoCell',
				field: 'userInfo',
				headerName: 'Фио',
				sortEnabled: true,
				valueGetter: (user: UserInfo) => ({ ...user, avatar: user.avatarImage }),
				columnStyle: {
					'flex-grow': 2,
				},
			},
			{
				type: 'textCell',
				field: 'role',
				headerName: 'Статус',
				sortEnabled: true,
				valueGetter: () => 'Участник проекта',
				columnStyle: {
					'flex-grow': 2,
				},
			},
			{
				type: 'iconButtonCell',
				field: 'delete-button',
				valueGetter: () => {},
				params: {
					icon: () => Icons.Delete,
					onClickFn: () => {},
				},
				columnStyle: {
					'flex-grow': 0,
				},
			},
		];
	}

	public addUsers(projectId: string, files: FileInfo[]): Observable<any> {
		return this.projectService.addFiles(projectId, files);
	}
}
