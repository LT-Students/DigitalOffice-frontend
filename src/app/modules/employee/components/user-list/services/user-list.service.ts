import { Injectable } from '@angular/core';
import { debounceTime, distinctUntilChanged, map, startWith, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { BehaviorSubject, combineLatest, Observable, of, Subject } from 'rxjs';
import { OperationResultResponse } from '@app/types/operation-result-response.interface';
import { PendingUserInfo } from '@api/user-service/models/pending-user-info';
import { ActivatedRoute, Data } from '@angular/router';
import { UserInfo } from '@api/user-service/models/user-info';
import { FilterService } from '@app/services/filter/filter.service';
import { UserService } from '@app/services/user/user.service';
import { IFindRequest } from '@app/types/find-request.interface';
import { NewEmployeeComponent } from '@shared/modals/new-employee/new-employee.component';
import { ModalService } from '@app/services/modal.service';
import { FindUsersBody, Status, UserInfoLike } from '../user-list.types';

interface FindUsersParams extends IFindRequest {
	fullnameincludesubstring?: string;
}

@Injectable()
export class UserListService {
	private readonly takeCount = 20;
	private skipCount = 0;

	private users = new BehaviorSubject<UserInfoLike[]>([]);

	private statusChange = new BehaviorSubject<Status>('active');
	public statusChange$ = this.statusChange.asObservable();

	private shouldAppend$ = new Subject<void>();
	private nameChange$?: Observable<string>;

	constructor(
		private filterService: FilterService,
		private userService: UserService,
		private route: ActivatedRoute,
		private modal: ModalService
	) {}

	public setStatus(status: Status): void {
		this.statusChange.next(status);
	}

	public appendUsers(): void {
		this.shouldAppend$.next();
	}

	public registerOnNameChange(valueChanges$: Observable<string>): void {
		this.nameChange$ = valueChanges$;
	}

	public createUser(): void {
		this.modal
			.openModal<NewEmployeeComponent, null, OperationResultResponse<UserInfo[]>>(NewEmployeeComponent)
			.afterClosed()
			.pipe(withLatestFrom(this.statusChange$))
			.subscribe(([_, status]: [any, Status]) => {
				if (status !== 'active') {
					this.shouldAppend$.next();
				}
			});
	}

	public removeFromList(userId: string): void {
		const newUsers = this.users.value.filter((user: UserInfoLike) => user.id !== userId);
		this.users.next(newUsers);
	}

	public getUsers$(): Observable<UserInfoLike[]> {
		return combineLatest([
			this.nameChange$?.pipe(
				debounceTime(500),
				startWith(''),
				distinctUntilChanged(),
				tap(() => this.onFiltersChange())
			) ?? of(''),
			this.statusChange$.pipe(tap(() => this.onFiltersChange())),
			this.shouldAppend$.pipe(startWith(null)),
		]).pipe(
			switchMap(([name, status, _]: [string, Status, null | void], index: number) => {
				const nameSearch = name
					? {
							fullnameincludesubstring: name,
					  }
					: null;
				const params: FindUsersParams = {
					skipCount: this.skipCount,
					takeCount: this.takeCount,
					...nameSearch,
				};
				this.skipCount += this.takeCount;
				return this.getFetchCallback(params, index ? status : undefined);
			}),
			map((res: OperationResultResponse<FindUsersBody>) => res.body as FindUsersBody),
			map((users: FindUsersBody) => {
				if (this.isPendingUsers(users)) {
					return users.map((user: PendingUserInfo) => ({ ...user.user }));
				}
				return users;
			}),
			switchMap((users: UserInfoLike[]) => {
				const newUsers = [...this.users.value, ...users];
				this.users.next(newUsers);
				return this.users.asObservable();
			})
		);
	}

	private onFiltersChange(): void {
		this.skipCount = 0;
		this.users.next([]);
	}

	private isPendingUsers(users: any): users is PendingUserInfo[] {
		return users?.[0]?.user;
	}

	private getFetchCallback(
		params: FindUsersParams,
		status?: Status
	): Observable<OperationResultResponse<FindUsersBody>> {
		switch (status) {
			case 'active':
				return this.filterService.filterUsers({ ...params });
			case 'archive':
				return this.userService.findUsers({ ...params, isactive: false, includecurrentavatar: true });
			case 'pending':
				return this.userService.findPending({
					...params,
					includecurrentavatar: true,
					includecommunication: true,
				});
			default:
				return this.route.data.pipe(
					map((response: Data) => response.users as OperationResultResponse<UserInfo[]>)
				);
		}
	}
}
