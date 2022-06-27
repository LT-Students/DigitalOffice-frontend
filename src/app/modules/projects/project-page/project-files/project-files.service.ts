import { Injectable } from '@angular/core';
import { Icons } from '@shared/features/icons/icons';
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
			},
		];
	}

	public addFiles(projectId: string, files: FileInfo[]): Observable<any> {
		return this.projectService.addFiles(projectId, files);
	}
}
