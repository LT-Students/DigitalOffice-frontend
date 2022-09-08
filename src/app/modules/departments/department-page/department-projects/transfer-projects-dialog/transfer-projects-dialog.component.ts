import { Component, OnInit, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ProjectInfo } from '@api/project-service/models/project-info';
import { DoTableDataSource, ListParams } from '@app/types/do-table-data-source';
import { Icons } from '@shared/modules/icons/icons';
import { ActivatedRoute } from '@angular/router';
import { DepartmentProjectsApiService, FindProjectsParams } from '../services/department-projects-api.service';
import { TableConfigService } from './table-config.service';
import { TransferFilterComponent } from './transfer-filter/transfer-filter.component';

@Component({
	selector: 'do-transfer-projects-dialog',
	templateUrl: './transfer-projects-dialog.component.html',
	styleUrls: ['./transfer-projects-dialog.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransferProjectsDialogComponent implements OnInit {
	public readonly Icons = Icons;

	@ViewChild(TransferFilterComponent, { static: true }) filter!: TransferFilterComponent;

	public tableOptions = this.tableConfig.getTableOptions();
	public dataSource!: DoTableDataSource<ProjectInfo>;

	constructor(
		private fb: FormBuilder,
		private tableConfig: TableConfigService,
		private apiService: DepartmentProjectsApiService,
		private route: ActivatedRoute
	) {}

	public ngOnInit(): void {
		this.dataSource = new DoTableDataSource<ProjectInfo>();
		this.dataSource.filter = this.filter;
		const departmentId = this.route.snapshot.params['id'];
		this.dataSource.dataService = {
			loadData: this.apiService.findTransferProjects.bind(this.apiService, departmentId),
			convertListParamsToRequestParams: this.convertListParamsToRequestParams.bind(this),
		};
	}

	private convertListParamsToRequestParams(params: ListParams): FindProjectsParams {
		return {
			nameincludesubstring: params['name'] || undefined,
			departmentid: params['department'],
		};
	}
}
