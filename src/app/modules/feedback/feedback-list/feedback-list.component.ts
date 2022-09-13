import { Component, OnInit, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Sort, SortDirection } from '@angular/material/sort';
import { Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { ImageContent } from '@api/feedback-service/models/image-content';
import { FeedbackInfo } from '@api/feedback-service/models/feedback-info';
import { DoTableDataSource } from '@app/types/do-table-data-source';
import { Icons } from '@shared/modules/icons/icons';
import { PaginatorComponent } from '@shared/component/paginator/paginator.component';
import { FeedbackDialogService } from '../services/feedback-dialog.service';
import { FeedbackService, FindFeedbackParams } from '../services/feedback.service';
import { TableComponent } from '../../table/table.component';
import { DynamicFilterComponent } from '../../dynamic-filter/dynamic-filter.component';
import { FeedbackListService } from './feedback-list.service';
import { FeedbackListQueriesService } from './feedback-list-queries.service';

@Component({
	selector: 'do-report-list',
	templateUrl: './feedback-list.component.html',
	styleUrls: ['./feedback-list.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [FeedbackListService],
})
export class FeedbackListComponent implements OnInit {
	public readonly Icons = Icons;

	@ViewChild(TableComponent, { static: true }) table!: TableComponent<FeedbackInfo>;
	@ViewChild(DynamicFilterComponent, { static: true }) filter!: DynamicFilterComponent;
	@ViewChild(PaginatorComponent, { static: true }) paginator!: PaginatorComponent;

	public initialQueryParams = this.route.snapshot.queryParams;
	public initialSort = this.getInitialSort(this.initialQueryParams['sort']);

	public filterConfig = this.feedbackListService.getFilterConfig(this.initialQueryParams);
	public tableOptions = this.feedbackListService.getTableOptions();
	public dataSource!: DoTableDataSource<FeedbackInfo>;

	private destroy$ = new Subject();

	constructor(
		private feedbackListService: FeedbackListService,
		private feedbackDialog: FeedbackDialogService,
		private feedbackService: FeedbackService,
		private listQueries: FeedbackListQueriesService,
		private route: ActivatedRoute,
		private router: Router
	) {}

	public ngOnInit(): void {
		const feedbackId = this.route.snapshot.queryParamMap.get('id');
		if (feedbackId) {
			this.feedbackService.getFeedback(feedbackId).subscribe({
				next: (res) => this.openDetails(res.feedback, res.images),
			});
		}

		this.dataSource = this.createDataSource();

		this.feedbackDialog.refreshFeedbackPage$
			.pipe(
				switchMap(() => this.dataSource.refetchData()),
				takeUntil(this.destroy$)
			)
			.subscribe();
	}

	private createDataSource(): DoTableDataSource<FeedbackInfo> {
		const initialData = this.route.snapshot.data['feedback'];
		const dataSource = new DoTableDataSource<FeedbackInfo>(initialData);
		dataSource.dataService = {
			loadData: (params: FindFeedbackParams) => this.feedbackService.findFeedback(params),
			convertListParamsToRequestParams: this.listQueries.convertListParamsToRequestParams.bind(this.listQueries),
		};
		dataSource.queryParamsConverter = this.listQueries;
		dataSource.route = this.route;
		dataSource.router = this.router;
		dataSource.filter = this.filter;
		dataSource.sort = this.table.sort;
		dataSource.paginator = this.paginator;

		return dataSource;
	}

	private getInitialSort(sortValue?: string): Sort {
		if (!sortValue) {
			return { active: 'createdAt', direction: 'asc' };
		}
		const [active, direction] = sortValue.split('_');
		return {
			active,
			direction: direction as SortDirection,
		};
	}

	public openDetails(report: FeedbackInfo, images?: ImageContent[]): void {
		this.router.navigate([], {
			relativeTo: this.route,
			queryParams: { id: report.id },
			queryParamsHandling: 'merge',
		});
		this.feedbackDialog
			.openReportDetails(report, images)
			.afterClosed()
			.subscribe({
				next: () => {
					this.router.navigate([], {
						relativeTo: this.route,
						queryParams: { id: null },
						queryParamsHandling: 'merge',
					});
				},
			});
	}

	public archiveFeedback(): void {
		const selectedFeedbackIds = this.table.selection.selected.map((f) => f.id);
		this.feedbackService.archiveFeedback(selectedFeedbackIds).subscribe({
			next: () => {
				this.paginator.navigateToPage(0);
				this.table.selection.clear();
			},
		});
	}
}
