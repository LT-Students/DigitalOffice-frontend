import { Injectable } from '@angular/core';
import { Icons } from '@shared/modules/icons/icons';
import { DateTime } from 'luxon';
import { TableOptions } from '../../table/models/table-options';
import { TextCellParams } from '../../table/cell-components/text/text.component';

export interface Report {
	userInfo: { firstName: string; lastName: string; middleName?: string };
	category: string;
	createdAt: DateTime;
	attachments: any[];
	comment: string;
}

export const reports: Report[] = [
	{
		userInfo: { firstName: 'Роман', lastName: 'Циневич' },
		category: 'Сломалось',
		createdAt: DateTime.now(),
		attachments: [1, 2, 3, 4],
		comment:
			'Опенспейс находится на четвертом этаже и разделен на 3 зоны. Располагается недалеко от лифта. Помещение имеет общую площадь зоны. Располагается недалеко от лифта. Помещение имеет общую...',
	},
	{
		userInfo: { firstName: 'Лола', lastName: 'Петрова', middleName: 'Дениска' },
		category: 'Пожелание',
		createdAt: DateTime.now(),
		attachments: [1, 2],
		comment:
			'Опенспейс находится на четвертом этаже и разделен на 3 зоны. Располагается недалеко от лифта. Помещение имеет общую площадь зоны. Располагается недалеко от лифта. Помещение имеет общую',
	},
	{
		userInfo: {
			firstName: 'Роман',
			lastName: 'Циневич',
			middleName: 'Оченьоченьоченьоченьдлиииииииииииииииииииинноеотчество',
		},
		category: 'Сломалось',
		createdAt: DateTime.now(),
		attachments: [],
		comment: 'Опенспейс находитс',
	},
	{
		userInfo: { firstName: 'Роман', lastName: 'Циневич' },
		category: 'Сломалось',
		createdAt: DateTime.now(),
		attachments: [1, 2, 3, 4],
		comment:
			'Опенспейс находится на четвертом этаже и разделен на 3 зоны. Располагается недалеко от лифта. Помещение имеет общую площадь зоны. Располагается недалеко от лифта. Помещение имеет общую...',
	},
];

@Injectable()
export class ReportListService {
	constructor() {}

	public getTableOptions(): TableOptions {
		return {
			rowStyle: {
				padding: '12px 32px',
				'align-items': 'flex-start',
			},
			columns: [
				{
					type: 'checkboxCell',
					field: 'checkbox',
					headerStyle: { flex: '0 0 18px' },
					columnStyle: { flex: '0 0 auto' },
				},
				{
					type: 'textCell',
					field: 'name',
					headerName: 'ФИО',
					valueGetter: (r: Report) =>
						[r.userInfo.lastName, r.userInfo.firstName, r.userInfo.middleName].filter(Boolean).join(' '),
					columnStyle: { flex: '0 0 15%' },
					params: new TextCellParams({ lineClamp: 1 }),
				},
				{
					type: 'textCell',
					field: 'category',
					headerName: 'Категория',
					valueGetter: (r: Report) => r.category,
				},
				{
					type: 'textCell',
					field: 'date',
					headerName: 'Дата и время',
					valueGetter: (r: Report) => r.createdAt.toFormat('dd.MM.yyyy HH:mm'),
					sortEnabled: true,
				},
				{
					type: 'textCell',
					field: 'attachments',
					valueGetter: (r: Report) => r.attachments.length || ' ',
					headerStyle: { flex: '0 0 42px' },
					columnStyle: { flex: '0 0 42px' },
					params: new TextCellParams({ prefixIcon: () => Icons.Attachment }),
				},
				{
					type: 'textCell',
					field: 'comment',
					headerName: 'Комментарий',
					valueGetter: (r: Report) => r.comment,
					columnStyle: { flex: '0 0 45%' },
					params: new TextCellParams({ lineClamp: 3 }),
				},
			],
		};
	}
}
