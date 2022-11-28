import { BehaviorSubject } from 'rxjs';

export class LoadingState {
	private readonly loading = new BehaviorSubject(false);
	public readonly loading$ = this.loading.asObservable();

	public setLoading(loading: boolean): void {
		this.loading.next(loading);
	}
}
