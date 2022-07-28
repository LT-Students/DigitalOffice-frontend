import { Injectable } from '@angular/core';
import { Icons } from '@shared/modules/icons/icons';
import { Observable } from 'rxjs';
import { FileInfo } from '@api/project-service/models/file-info';
import { FilterDef, InputFilterParams } from '../../../dynamic-filter/models';
import { ColumnDef } from '../../../table/models';
import { ProjectService } from '../../project.service';

@Injectable()
export class ProjectFilesService {
	constructor(private projectService: ProjectService) {}

	public getFilterData(): FilterDef[] {
		return [
			{
				key: 'nameincludesubstring',
				type: 'input',
				width: 267,
				params: new InputFilterParams({ placeholder: 'Поиск документа', icon: Icons.Search }),
			},
		];
	}

	public getTableColumns(): ColumnDef[] {
		return [
			{
				type: 'checkboxCell',
				field: 'checkbox',
				columnStyle: {
					'flex-grow': 0,
				},
			},
			{
				type: 'textCell',
				field: 'fileInfo',
				valueGetter: () => ({ name: 'file', extension: 'png' }),
				columnStyle: {
					'flex-grow': 2,
				},
			},
			{
				type: 'iconButtonCell',
				field: 'download',
				valueGetter: () => {},
				params: {
					icon: () => Icons.Download,
					onClickFn: () => {},
				},
				columnStyle: {
					'flex-grow': 0,
				},
			},
		];
	}

	public addFiles(projectId: string, files: FileInfo[]): Observable<any> {
		return this.projectService.addFiles(projectId, files);
	}
}
