import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { Icons } from '@shared/modules/icons/icons';
import { getFileIcon } from '@shared/pipes/file-icon.pipe';
import { FileInfo } from '@api/project-service/models/file-info';
import { DateTime } from 'luxon';
import { formatBytes } from '@shared/pipes/format-bytes.pipe';
import { FilterDef, InputFilterParams } from '../../../dynamic-filter/models';
import { ColumnDef } from '../../../table/models';
import { ProjectService } from '../../project.service';

@Injectable()
export class ProjectFilesService {
	constructor(@Inject(LOCALE_ID) private locale: string, private projectService: ProjectService) {}

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
				valueGetter: (file: FileInfo) => {
					const date = DateTime.fromISO(file.createdAtUtc).toFormat('dd.MM.yy');
					return `добавлено ${date}`;
				},
				columnStyle: {
					'flex-grow': 2,
				},
			},
			{
				type: 'textCell',
				field: 'size',
				headerName: 'Размер',
				valueGetter: (file: FileInfo) => formatBytes(file.size, this.locale),
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
