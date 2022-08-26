import { Injectable } from '@angular/core';
import { Icons } from '@shared/modules/icons/icons';
import { FeedbackInfo } from '@api/feedback-service/models/feedback-info';
import { DateTime } from 'luxon';
import { of } from 'rxjs';
import { Params } from '@angular/router';
import { TableOptions } from '../../table/models/table-options';
import { TextCellParams } from '../../table/cell-components/text/text.component';
import { FeedbackType, FeedbackTypeInfo } from '../models/feedback-type';
import { FilterDef, SelectFilterParams } from '../../dynamic-filter/models';
import { ColumnDef } from '../../table/models';

@Injectable()
export class FeedbackListService {
	constructor() {}

	public getFilterConfig(initialValues: Params): FilterDef[] {
		return [
			{
				type: 'select',
				key: 'category',
				initialValue: initialValues['category'],
				width: 200,
				params: new SelectFilterParams({
					options$: of(FeedbackType.getAllFeedbackTypeInfos()),
					valueGetter: (typeInfo: FeedbackTypeInfo) => typeInfo.type,
					displayValueGetter: (typeInfo: FeedbackTypeInfo) => typeInfo.label,
					allowReset: true,
					placeholder: 'Категория',
				}),
			},
		];
	}

	public getTableOptions(): TableOptions {
		return {
			sortActive: 'createdAt',
			selectionCompareWith: (f1: FeedbackInfo, f2: FeedbackInfo) => f1.id === f2.id,
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
					valueGetter: (f: FeedbackInfo) => (f.imagesCount ? Icons.PaperclipTilt : ''),
					columnStyle: { flex: '0 0 24px', margin: '2px' },
				}),
				new ColumnDef({
					type: 'textCell',
					field: 'attachments',
					valueGetter: (f: FeedbackInfo) => f.imagesCount || ' ',
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
