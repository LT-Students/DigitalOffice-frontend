import { Injectable } from '@angular/core';
import { Icons } from '@shared/modules/icons/icons';
import { getFileIcon } from '@shared/pipes/file-icon.pipe';
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
				type: 'iconCell',
				field: 'type-icon',
				valueGetter: (file: FileInfo) => getFileIcon(file.extension),
				headerStyle: { flex: '0 0 24px', 'margin-right': '12px' },
				columnStyle: { flex: 0, 'margin-right': '12px' },
			},
			{
				type: 'textCell',
				field: 'name',
				headerName: 'Название',
				valueGetter: (file: FileInfo) => file.name,
				columnStyle: {
					'flex-grow': 2,
				},
			},
			{
				type: 'textCell',
				field: 'extension',
				headerName: 'Тип',
				valueGetter: (file: FileInfo) => file.extension.toUpperCase(),
				columnStyle: {
					'flex-grow': 2,
				},
			},
			{
				type: 'textCell',
				field: 'uploadDate',
				headerName: 'Дата загрузки',
				valueGetter: (file: FileInfo) => file.role,
				columnStyle: {
					'flex-grow': 2,
				},
			},
			{
				type: 'textCell',
				field: 'size',
				headerName: 'Размер',
				valueGetter: (file: FileInfo) => file.size,
				columnStyle: {
					'flex-grow': 2,
				},
			},
			{
				type: 'iconButtonCell',
				field: 'download',
				headerName: 'Скачать',
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
}
