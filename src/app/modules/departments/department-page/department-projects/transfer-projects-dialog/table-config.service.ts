import { Injectable } from '@angular/core';
import { ProjectInfo } from '@api/project-service/models/project-info';
import { TableOptions } from '../../../../table/models/table-options';
import { ColumnDef } from '../../../../table/models';

@Injectable({
	providedIn: 'root',
})
export class TableConfigService {
	constructor() {}

	public getTableOptions(): TableOptions {
		return {
			rowHeight: 64,
			columns: [
				new ColumnDef({ field: 'shortName', headerName: 'Сокращенное наименование', params: { lineClamp: 2 } }),
				new ColumnDef({ field: 'customer', headerName: 'Заказчик', params: { lineClamp: 2 } }),
				new ColumnDef({
					field: 'department',
					headerName: 'Департамент',
					valueGetter: (project: ProjectInfo) => project.department?.shortName,
				}),
			],
		};
	}
}
