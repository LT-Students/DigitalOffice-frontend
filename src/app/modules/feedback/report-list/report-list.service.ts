import { Injectable } from '@angular/core';
import { Icons } from '@shared/modules/icons/icons';
import { FeedbackInfo } from '@api/feedback-service/models/feedback-info';
import { DateTime } from 'luxon';
import { TableOptions } from '../../table/models/table-options';
import { TextCellParams } from '../../table/cell-components/text/text.component';
import { FeedbackType } from '../models/feedback-type';
import { ColumnDef } from '../../table/models';

@Injectable()
export class ReportListService {
	constructor() {}

	public getTableOptions(): TableOptions {
		return {
			sortActive: 'createdAt',
			sortDirection: 'asc',
			rowStyle: {
				height: '96px',
				padding: '12px 32px',
				'align-items': 'baseline',
			},
			columns: [
				new ColumnDef({
					type: 'checkboxCell',
					field: 'checkbox',
					headerStyle: { flex: '0 0 18px' },
					columnStyle: { flex: '0 0 auto' },
				}),
				new ColumnDef({
					type: 'textCell',
					field: 'name',
					headerName: 'ФИО',
					valueGetter: (f: FeedbackInfo) => f.senderFullName,
					columnStyle: { flex: '0 0 15%' },
					params: new TextCellParams({ lineClamp: 1 }),
				}),
				new ColumnDef({
					type: 'textCell',
					field: 'category',
					headerName: 'Категория',
					valueGetter: (f: FeedbackInfo) => FeedbackType.getFeedbackInfoByFeedbackType(f.type).label,
				}),
				new ColumnDef({
					type: 'textCell',
					field: 'createdAt',
					headerName: 'Дата и время',
					valueGetter: (f: FeedbackInfo) => DateTime.fromISO(f.createdAtUtc).toFormat('dd.MM.yyyy HH:mm'),
					sortEnabled: true,
					disableClearSort: true,
				}),
				new ColumnDef({
					type: 'iconCell',
					field: 'icon',
					valueGetter: (f: FeedbackInfo) => (f.type.length ? Icons.PaperclipTilt : ''),
					columnStyle: { flex: '0 0 24px', margin: '2px' },
				}),
				new ColumnDef({
					type: 'textCell',
					field: 'attachments',
					valueGetter: (f: FeedbackInfo) => f.type.length || ' ',
					columnStyle: { flex: '0 0 18px' },
				}),
				new ColumnDef({
					type: 'textCell',
					field: 'comment',
					headerName: 'Комментарий',
					valueGetter: (f: FeedbackInfo) => f.content,
					columnStyle: { flex: '0 0 45%' },
					params: new TextCellParams({ lineClamp: 3 }),
				}),
			],
		};
	}
}
