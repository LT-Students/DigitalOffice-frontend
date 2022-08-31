import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, merge, Observable, of, Subscription } from 'rxjs';
import { FindResponse } from '@app/types/operation-result-response.interface';
import { map, mapTo, switchMap, tap } from 'rxjs/operators';
import { MatSort, SortDirection } from '@angular/material/sort';
import {
	PageEvent,
	PaginatorComponent,
	PaginatorDefaultOptions,
} from '@shared/component/paginator/paginator.component';
import { booleanGuard } from '@app/utils/utils';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DynamicFilterComponent, FilterEvent } from '../../modules/dynamic-filter/dynamic-filter.component';

interface FindParams {
	[key: string]: any;
}

interface DataService<T, P extends FindParams = any> {
	loadData: (params: P) => Observable<FindResponse<T>>;
}

export type ListParams = Partial<FilterEvent & { active: string; direction: SortDirection } & PageEvent>;

export class DoTableDataSource<T> implements DataSource<T> {
	public totalCount$ = new BehaviorSubject(0);
	private data = new BehaviorSubject<T[]>([]);
	private paramsChangesSubscription?: Subscription;

	set filter(filter: DynamicFilterComponent | null) {
		this._filter = filter;
		this.updateChangeSubscription();
	}
	get filter(): DynamicFilterComponent | null {
		return this._filter;
	}
	private _filter: DynamicFilterComponent | null = null;

	set sort(sort: MatSort | null) {
		this._sort = sort;
		this.updateChangeSubscription();
	}
	get sort(): MatSort | null {
		return this._sort;
	}
	private _sort: MatSort | null = null;

	set paginator(paginator: PaginatorComponent | null) {
		this._paginator = paginator;
		this.updateChangeSubscription();
	}
	get paginator(): PaginatorComponent | null {
		return this._paginator;
	}
	private _paginator: PaginatorComponent | null = null;

	set dataService(dataService: DataService<T> | null) {
		this._dataService = dataService;
	}
	get dataService(): DataService<T> | null {
		return this._dataService;
	}
	private _dataService: DataService<T> | null = null;

	set router(router: Router | null) {
		this._router = router;
	}
	get router(): Router | null {
		return this._router;
	}
	private _router: Router | null = null;

	set route(route: ActivatedRoute | null) {
		this._route = route;
	}
	get route(): ActivatedRoute | null {
		return this._route;
	}
	private _route: ActivatedRoute | null = null;

	set queryParamsConverter(queryParamsConverter: QueryParamsConverter | null) {
		this._queryParamsConverter = queryParamsConverter;
	}
	get queryParamsConverter(): QueryParamsConverter | null {
		return this._queryParamsConverter;
	}
	private _queryParamsConverter: QueryParamsConverter | null = null;

	constructor(initialValue: FindResponse<T>) {
		this.setData(initialValue);
	}

	public connect(collectionViewer: CollectionViewer): Observable<T[]> {
		return this.data.asObservable();
	}

	public disconnect(collectionViewer: CollectionViewer): void {
		this.paramsChangesSubscription?.unsubscribe();
	}

	public loadData(params: FindParams): Observable<FindResponse<T>> {
		return this.dataService?.loadData(params).pipe(tap(this.setData.bind(this))) || of(new FindResponse<T>());
	}

	private setData(response: FindResponse<T>): void {
		this.data.next(response.data);
		this.totalCount$.next(response.totalCount);
	}

	private updateChangeSubscription(): void {
		let resetPaginator = false;
		const changes = [
			this.filter?.filterChange.pipe(mapTo(true)),
			this.sort?.sortChange.pipe(mapTo(true)),
			this.paginator?.page.pipe(mapTo(false)),
		].filter(booleanGuard);
		this.paramsChangesSubscription?.unsubscribe();
		this.paramsChangesSubscription = merge(...changes)
			.pipe(
				tap((reset: boolean) => (resetPaginator = reset)),
				map(() => {
					const listParams = this.getListParams();
					return this.queryParamsConverter?.convertListParamsToQueryUrlParams(listParams) || {};
				}),
				tap((queryParams) => {
					if (this.router) {
						this.router.navigate([], {
							relativeTo: this.route,
							queryParams,
							queryParamsHandling: 'merge',
						});
					}
				}),
				switchMap((params: FindParams) => {
					const requestParams =
						this.queryParamsConverter?.convertQueryURLParamsToEndpointParams(params) || {};
					return this.loadData(requestParams);
				})
			)
			.subscribe({
				next: () => {
					if (this.paginator && resetPaginator) {
						this.paginator.pageIndex = 0;
					}
				},
			});
	}

	private getListParams(): ListParams {
		return {
			...this.filter?.value,
			active: this.sort?.active,
			direction: this.sort?.direction,
			pageIndex: this.paginator?.pageIndex,
			pageSize: this.paginator?.pageSize,
		};
	}
}

export abstract class QueryParamsConverter<Q extends Params = Params, E extends Params = Params> {
	constructor(private paginatorDefaults: PaginatorDefaultOptions) {}

	public abstract getAdditionalQueryUrlParams(params: ListParams): Q;
	public abstract getAdditionalEndpointParams(params: Params): E;

	public convertListParamsToQueryUrlParams(params: ListParams): Q & {
		pageIndex: number | null;
		pageSize: number | null;
	} {
		const additionalParams = this.getAdditionalQueryUrlParams(params);
		return {
			pageIndex: params.pageIndex || null,
			pageSize: !params.pageSize || params.pageSize === this.paginatorDefaults.pageSize ? null : params.pageSize,
			...additionalParams,
		};
	}

	public convertQueryURLParamsToEndpointParams(params: Params): E & { takeCount: number; skipCount: number } {
		const pageIndex = Number(params['pageIndex'] || 0);
		const pageSize = Number(params['pageSize'] || this.paginatorDefaults.pageSize);
		const additionalParams = this.getAdditionalEndpointParams(params);
		return {
			skipCount: pageIndex * pageSize,
			takeCount: pageSize,
			...additionalParams,
		};
	}
}
