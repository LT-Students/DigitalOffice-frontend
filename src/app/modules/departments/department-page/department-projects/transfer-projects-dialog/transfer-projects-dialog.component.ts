import { Component, OnInit, ChangeDetectionStrategy, ViewChild, OnDestroy } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProjectInfo } from '@api/project-service/models/project-info';
import { DoTableDataSource, ListParams } from '@app/types/do-table-data-source';
import { Icons } from '@shared/modules/icons/icons';
import { DepartmentProjectsApiService, FindProjectsParams } from '../services/department-projects-api.service';
import { TableOptions } from '../../../../table/models';
import { TableConfigService } from './table-config.service';
import { TransferFilterComponent } from './transfer-filter/transfer-filter.component';

@Component({
	selector: 'do-transfer-projects-dialog',
	templateUrl: './transfer-projects-dialog.component.html',
	styleUrls: ['./transfer-projects-dialog.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransferProjectsDialogComponent implements OnInit, OnDestroy {
	public readonly Icons = Icons;

	@ViewChild(TransferFilterComponent, { static: true }) filter!: TransferFilterComponent;

	public tableOptions!: TableOptions;
	public dataSource!: DoTableDataSource<ProjectInfo>;
	public subscription!: Subscription;

	constructor(
		private fb: UntypedFormBuilder,
		private tableConfig: TableConfigService,
		private apiService: DepartmentProjectsApiService,
		private route: ActivatedRoute,
		private dialogRef: MatDialogRef<TransferProjectsDialogComponent>
	) {}

	public ngOnInit(): void {
		const departmentId = this.route.snapshot.params['id'];
		this.tableOptions = this.tableConfig.getTableOptions(departmentId);

		this.dataSource = new DoTableDataSource<ProjectInfo>();
		this.dataSource.filter = this.filter;
		this.dataSource.dataService = {
			loadData: this.apiService.findTransferProjects.bind(this.apiService, departmentId),
			convertListParamsToRequestParams: this.convertListParamsToRequestParams.bind(this),
		};

		this.subscription = this.dialogRef.backdropClick().subscribe({
			next: () => this.dialogRef.close(this.tableConfig.isProjectTransfered),
		});
	}

	public ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}

	private convertListParamsToRequestParams(params: ListParams): FindProjectsParams {
		return {
			nameincludesubstring: params['name'] || undefined,
			departmentid: params['department'],
		};
	}
}
