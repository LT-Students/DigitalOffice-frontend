import { Observable } from 'rxjs';

export abstract class CreateLeaveTime {
	public abstract createLeaveTime(...args: any[]): Observable<any>;
}
