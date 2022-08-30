import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Observable } from 'rxjs';
import { FindResponse } from '@app/types/operation-result-response.interface';
import { tap } from 'rxjs/operators';

interface FindParams {
	[key: string]: any;
}

interface DataService<T, P extends FindParams = any> {
	loadData: (params: P) => Observable<FindResponse<T>>;
}

export class DoTableDataSource<T> implements DataSource<T> {
	public totalCount$ = new BehaviorSubject(0);
	private data = new BehaviorSubject<T[]>([]);

	constructor(private dataService: DataService<T>, initialValue: FindResponse<T>) {
		this.updateData(initialValue);
	}

	public connect(collectionViewer: CollectionViewer): Observable<T[]> {
		return this.data.asObservable();
	}

	public disconnect(collectionViewer: CollectionViewer): void {}

	public loadData(params: FindParams): Observable<FindResponse<T>> {
		return this.dataService.loadData(params).pipe(tap(this.updateData.bind(this)));
	}

	private updateData(response: FindResponse<T>): void {
		this.data.next(response.data);
		this.totalCount$.next(response.totalCount);
	}
}
