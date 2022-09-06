import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { SelectionModel } from '@app/utils/selection-model';
import { AddUsersApiBase } from '../services/add-users-api.service';
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

	public loadUsers(search: string): void {
		let users$: Observable<T[]>;
		if (search) {
			users$ = this.apiService.findUsers(search).pipe(map(this.mapUsersToSelected.bind(this)));
		} else {
			users$ = of(this.selection.selected);
		}
		users$.subscribe({ next: (users) => this.data.next(users) });
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
}
