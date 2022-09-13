import { BehaviorSubject } from 'rxjs';

export class LoadingState {
	public readonly loading$ = new BehaviorSubject(false);

	public setLoading(loading: boolean): void {
		this.loading$.next(loading);
	}
}
