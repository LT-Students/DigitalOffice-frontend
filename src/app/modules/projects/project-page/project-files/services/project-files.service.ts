import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { Icons } from '@shared/modules/icons/icons';
import { getFileIcon } from '@shared/pipes/file-icon.pipe';
import { FileInfo } from '@api/project-service/models/file-info';
import { DateTime } from 'luxon';
import { formatBytes } from '@shared/pipes/format-bytes.pipe';
import { getTypeFromExtension } from '@shared/pipes/type-from-extension.pipe';
import { FilterDef, InputFilterParams } from '../../../../dynamic-filter/models';
import { ColumnDef } from '../../../../table/models';
import { ProjectService } from '../../../project.service';

@Injectable()
export class ProjectFilesService {
	constructor(@Inject(LOCALE_ID) private locale: string, private projectService: ProjectService) {}

	public getFilterData(): FilterDef[] {
		return [
			{
				key: 'name',
				type: 'input',
				width: 267,
				params: new InputFilterParams({ placeholder: 'Поиск документа', icon: Icons.Search }),
			},
		];
	}

	public getTableColumns(): ColumnDef[] {
		return [
			new ColumnDef({
				type: 'checkboxCell',
				field: 'checkbox',
				headerStyle: { flex: '0 0 18px' },
				columnStyle: {
					'flex-grow': 0,
				},
			}),
			new ColumnDef({
				type: 'iconCell',
				field: 'type-icon',
				valueGetter: (file: FileInfo) => getFileIcon(getTypeFromExtension(file.extension.slice(1))),
				headerStyle: { flex: '0 0 24px', 'margin-right': '12px' },
				columnStyle: { flex: 0, 'margin-right': '12px' },
			}),
			new ColumnDef({
				type: 'textCell',
				field: 'name',
				headerName: 'Название',
				valueGetter: (file: FileInfo) => file.name,
				columnStyle: {
					flex: '0 0 25%',
				},
			}),
			new ColumnDef({
				type: 'textCell',
				field: 'extension',
				headerName: 'Тип',
				valueGetter: (file: FileInfo) => file.extension.slice(1).toUpperCase() || '–',
				columnClass: 'text-secondary_default',
				columnStyle: {
					'flex-grow': 2,
				},
			}),
			new ColumnDef({
				type: 'textCell',
				field: 'uploadDate',
				headerName: 'Дата загрузки',
				valueGetter: (file: FileInfo) => {
					const date = DateTime.fromISO(file.createdAtUtc).toFormat('dd.MM.yy');
					return `добавлено ${date}`;
				},
				columnClass: 'text-secondary_default',
				columnStyle: {
					'flex-grow': 2,
				},
			}),
			new ColumnDef({
				type: 'textCell',
				field: 'size',
				headerName: 'Размер',
				valueGetter: (file: FileInfo) => formatBytes(file.size, this.locale),
				columnClass: 'text-secondary_default',
			}),
			new ColumnDef({
				type: 'iconButtonCell',
				field: 'download',
				headerName: 'Скачать',
				valueGetter: (file: FileInfo) => file,
				params: {
					icon: () => Icons.Download,
					onClickFn: (file: FileInfo) => this.projectService.downloadFile(file),
				},
				columnStyle: {
					'flex-grow': 0,
				},
			}),
			new ColumnDef({
				type: 'contextMenuCell',
				field: 'context-menu',
				valueGetter: (file: FileInfo) => file,
				headerStyle: {
					flex: '0 0 48px',
				},
				columnStyle: {
					'flex-grow': 0,
				},
			}),
		];
	}
}
