import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { first, map, scan, startWith, switchMap, tap } from 'rxjs/operators';
import { OperationResultResponse } from '@app/types/operation-result-response.interface';

export type LoadDataFn<T> = (
	params: { skipCount: number; takeCount: number },
	isFirst: boolean
) => Observable<OperationResultResponse<T[]>>;
interface AdditionalParams {
	[key: string]: any;
}

export class InfiniteScrollDataProvider<T> {
	private skipCount$!: BehaviorSubject<number>;
	private takeCount = 40;
	private totalCount = Number.MAX_VALUE;
	public dataSource$: Observable<T[]>;

	constructor(
		loadDataFn: LoadDataFn<T>,
		loadTriggers?: Observable<AdditionalParams>[] | Observable<AdditionalParams>,
		takeCount?: number
	) {
		this.dataSource$ = this.createInfiniteDataSource$(loadDataFn, loadTriggers, takeCount);
	}

	public loadOnScroll(): void {
		this.skipCount$.pipe(first()).subscribe({
			next: (offset: number) => {
				const newOffset = offset + this.takeCount;
				if (newOffset < this.totalCount) {
					this.skipCount$.next(offset + this.takeCount);
				}
			},
		});
	}

	private createInfiniteDataSource$(
		loadDataFn: LoadDataFn<T>,
		loadTriggers?: Observable<AdditionalParams>[] | Observable<AdditionalParams>,
		takeCount?: number
	): Observable<T[]> {
		if (takeCount) {
			this.takeCount = takeCount;
		}
		loadTriggers = loadTriggers ? (Array.isArray(loadTriggers) ? loadTriggers : [loadTriggers]) : [];
		return combineLatest([...loadTriggers]).pipe(
			startWith([]),
			switchMap((params: AdditionalParams[], index: number) => {
				const additionalParams = params.reduce(
					(acc: AdditionalParams, params: AdditionalParams) => ({ ...acc, ...params }),
					{}
				);
				this.skipCount$ = new BehaviorSubject<number>(0);

				return this.skipCount$.pipe(
					switchMap((skipCount: number) => {
						const params = {
							skipCount: skipCount,
							takeCount: this.takeCount,
							...additionalParams,
						};
						const isFirst = !index && !skipCount;
						return loadDataFn(params, isFirst);
					}),
					tap((res: OperationResultResponse) => (this.totalCount = res.totalCount || 0)),
					map((res: OperationResultResponse) => res.body as any[]),
					scan((acc: any[], elements: any[]) => [...acc, ...elements], [])
				);
			})
		);
	}
}
