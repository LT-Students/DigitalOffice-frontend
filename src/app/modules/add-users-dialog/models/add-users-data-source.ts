import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { SelectionModel } from '@app/utils/selection-model';
import { AddUsersApiBase } from '../services';
import { FilterEvent } from '../../dynamic-filter/dynamic-filter.component';
import { NewUserBase } from './models';

export class AddUsersDataSource<T extends NewUserBase = NewUserBase> implements DataSource<T> {
	private data = new BehaviorSubject<T[]>([]);
	get data$(): Observable<T[]> {
		return this.data.asObservable();
	}

	constructor(private apiService: AddUsersApiBase<T>, private selection: SelectionModel<T>) {}

	connect(collectionViewer: CollectionViewer): Observable<T[]> {
		return this.data.asObservable();
	}

	disconnect(collectionViewer: CollectionViewer): void {}

	public loadUsers(filter: FilterEvent): void {
		let users$: Observable<T[]>;
		console.log(filter, Object.values(filter), this.isFilterEmpty(filter));
		if (!this.isFilterEmpty(filter)) {
			users$ = this.apiService.loadUsers(filter).pipe(map(this.mapUsersToSelected.bind(this)));
		} else {
			users$ = of(this.selection.selected);
		}
		users$.subscribe({ next: (users: T[]) => this.data.next(users) });
	}

	public updateRow(id: string, newValue: T): void {
		const users = this.data.value.map((u: T) => (u.id === id ? newValue : u));
		const index = this.selection.selected.findIndex((u: T) => u.id === id);
		if (index !== -1) {
			this.selection.selected[index] = newValue;
		}
		this.data.next(users);
	}

	private mapUsersToSelected(users: T[]): T[] {
		return users.map((u: T) => {
			const user = this.selection.selected.find((selected: T) => u.id === selected.id);
			return { ...(user || u) };
		});
	}

	private isFilterEmpty(filter: FilterEvent): boolean {
		return !Object.values(filter).some(Boolean);
	}
}
