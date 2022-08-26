import { Component, OnInit, ChangeDetectionStrategy, ViewChild, AfterViewInit } from '@angular/core';
import { FeedbackInfo } from '@api/feedback-service/models/feedback-info';
import { Icons } from '@shared/modules/icons/icons';
import { BehaviorSubject, Observable, PartialObserver, Subject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { PaginatorComponent } from '@shared/component/paginator/paginator.component';
import { OperationResultResponse } from '@app/types/operation-result-response.interface';
import { first, map, takeUntil, tap } from 'rxjs/operators';
import { Sort, SortDirection } from '@angular/material/sort';
import { ImageContent } from '@api/feedback-service/models/image-content';
import { FeedbackDialogService } from '../services/feedback-dialog.service';
import { FeedbackService, FindFeedbackParams } from '../services/feedback.service';
import { TableComponent } from '../../table/table.component';
import { DynamicFilterComponent } from '../../dynamic-filter/dynamic-filter.component';
import { FeedbackListService } from './feedback-list.service';
import { FeedbackListQueriesService, ListParams } from './feedback-list-queries.service';

@Component({
	selector: 'do-report-list',
	templateUrl: './feedback-list.component.html',
	styleUrls: ['./feedback-list.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [FeedbackListService],
})
export class FeedbackListComponent implements OnInit, AfterViewInit {
	public readonly Icons = Icons;

	@ViewChild(TableComponent, { static: true }) table!: TableComponent<FeedbackInfo>;
	@ViewChild(DynamicFilterComponent) filter!: DynamicFilterComponent;
	@ViewChild(PaginatorComponent) paginator!: PaginatorComponent;

	public initialQueryParams = this.route.snapshot.queryParams;
	public initialSort = this.getInitialSort(this.initialQueryParams['sort']);

	public filterConfig = this.feedbackListService.getFilterConfig(this.initialQueryParams);
	public tableOptions = this.feedbackListService.getTableOptions();
	public dataSource = new FeedbackListDataSource(this.feedbackService, this.route);

	private paramsChange$ = new Subject<boolean>();
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

		this.feedbackDialog.refreshFeedbackPage$.pipe(takeUntil(this.destroy$)).subscribe({
			next: () => this.updateTableData(false),
		});
	}

	public ngAfterViewInit(): void {
		this.paramsChange$.pipe(takeUntil(this.destroy$)).subscribe({
			next: this.updateTableData.bind(this),
		});
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
				this.updateTableData(true);
				this.table.selection.clear();
			},
		});
	}

	public handleParamsChange(resetPaginator = false): void {
		this.paramsChange$.next(resetPaginator);
	}

	public updateTableData(resetPaginator: boolean): void {
		const params = this.getListParams(resetPaginator);
		const queryParams = this.listQueries.convertListParamsToQueryUrlParams(params);
		this.router.navigate([], {
			relativeTo: this.route,
			queryParams,
			queryParamsHandling: 'merge',
		});
		const requestParams = this.listQueries.convertQueryUrlParamsToEndpointParams(queryParams);
		this.dataSource.loadFeedback(requestParams).subscribe({
			next: () => {
				if (resetPaginator) {
					this.paginator.pageIndex = 0;
				}
			},
		});
	}

	private getListParams(resetPaginator: boolean): ListParams {
		return {
			...this.filter.value,
			active: this.table.sort.active,
			direction: this.table.sort.direction,
			pageIndex: resetPaginator ? 0 : this.paginator.pageIndex,
			pageSize: this.paginator.pageSize,
		};
	}
}

class FeedbackListDataSource extends DataSource<FeedbackInfo> {
	private feedback = new BehaviorSubject<FeedbackInfo[]>([]);
	private totalCount = new BehaviorSubject(0);
	public totalCount$ = this.totalCount.asObservable();
	private cancelPreviousLoad$ = new Subject();

	private readonly observer: PartialObserver<OperationResultResponse<FeedbackInfo[]>> = {
		next: (res) => {
			this.feedback.next(res.body || []);
			this.totalCount.next(res.totalCount as number);
		},
	};

	constructor(private feedbackService: FeedbackService, route: ActivatedRoute) {
		super();
		route.data
			.pipe(
				first(),
				map((data) => data['feedback'])
			)
			.subscribe(this.observer);
	}

	connect(collectionViewer: CollectionViewer): Observable<FeedbackInfo[]> {
		return this.feedback.asObservable();
	}

	disconnect(collectionViewer: CollectionViewer): void {}

	public loadFeedback(params: FindFeedbackParams): Observable<OperationResultResponse<FeedbackInfo[]>> {
		this.cancelPreviousLoad$.next();
		return this.feedbackService.findFeedback(params).pipe(tap(this.observer), takeUntil(this.cancelPreviousLoad$));
	}
}
