import { Injectable } from '@angular/core';
import { ProjectInfo } from '@api/project-service/models/project-info';
import { ColumnDef, TableOptions } from '../../../../table/models';
import { DepartmentProjectsApiService } from '../services/department-projects-api.service';
import { SlideApplyButtonParams } from '../../../../table/cell-components/slide-apply-button/slide-apply-button.component';

@Injectable({
	providedIn: 'root',
})
export class TableConfigService {
	public isProjectTransfered = false;

	constructor(private apiService: DepartmentProjectsApiService) {}

	public getTableOptions(departmentId: string): TableOptions {
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
				new ColumnDef({
					field: 'transfer-button',
					type: 'slideApplyButtonCell',
					valueGetter: (project: ProjectInfo) => project,
					columnStyle: { flex: '0 0 54px' },
					params: new SlideApplyButtonParams({
						onClickFn: (project: ProjectInfo) => {
							this.apiService.transferProject(departmentId, project.id).subscribe();
							if (!this.isProjectTransfered) {
								this.isProjectTransfered = true;
							}
						},
					}),
				}),
			],
		};
	}
}
