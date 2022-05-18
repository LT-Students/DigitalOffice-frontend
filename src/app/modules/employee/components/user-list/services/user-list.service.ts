import { Injectable } from '@angular/core';
import {
	debounceTime,
	distinctUntilChanged, filter,
	first,
	map,
	scan,
	startWith,
	switchMap,
	tap,
	withLatestFrom,
} from 'rxjs/operators';
import { BehaviorSubject, combineLatest, merge, Observable, of, Subject } from 'rxjs';
import { OperationResultResponse } from '@app/types/operation-result-response.interface';
import { ActivatedRoute, Data } from '@angular/router';
import { UserInfo } from '@api/user-service/models/user-info';
import { FilterService } from '@app/services/filter/filter.service';
import { UserService } from '@app/services/user/user.service';
import { IFindRequest } from '@app/types/find-request.interface';
import { NewEmployeeComponent } from '@shared/modals/new-employee/new-employee.component';
import { DialogService } from '@app/services/dialog.service';
import { FormControl } from '@angular/forms';
import { EditPayload, Status, UpdateUsersAction, UpdateUsersPayload, UserInfoLike } from '../user-list.types';

interface FindUsersParams extends IFindRequest {
	fullnameincludesubstring?: string;
}

@Injectable()
export class UserListService {
	private readonly takeCount = 20;
	private userCount = Number.MAX_VALUE;

	private removeUser$ = new Subject<string>();
	private editUser$ = new Subject<EditPayload>();

	private statusChange = new BehaviorSubject<Status>('active');
	public statusChange$ = this.statusChange.asObservable();
	public nameControl = new FormControl('');

	private skipCount$ = new BehaviorSubject<number>(0);

	constructor(
		private filterService: FilterService,
		private userService: UserService,
		private route: ActivatedRoute,
		private modal: DialogService
	) {}

	public setStatus(status: Status): void {
		this.statusChange.next(status);
	}

	public appendUsers(): void {
		this.skipCount$.pipe(first()).subscribe({
			next: (offset: number) => this.skipCount$.next(offset + this.takeCount),
		});
	}

	private refreshCount(): void {
		this.skipCount$.next(0);
	}

	public createUser(): void {
		this.modal
			.openModal<NewEmployeeComponent, null, OperationResultResponse<UserInfo[]>>(NewEmployeeComponent)
			.afterClosed()
			.pipe(withLatestFrom(this.statusChange$))
			.subscribe(([_, status]: [any, Status]) => {
				if (status !== 'active') {
					this.refreshCount();
				}
			});
	}

	public removeFromList(userId: string): boolean {
		let isRemoved = false;
		this.statusChange$.pipe(first()).subscribe({
			next: (status: Status) => {
				isRemoved = status !== 'archive';
				if (isRemoved) {
					this.removeUser$.next(userId);
				}
			},
		});
		return isRemoved;
	}

	public editUserInList(userId: string, partialUser: Partial<UserInfoLike>): void {
		this.editUser$.next({ userId, partialUser });
	}

	public getUsers$(): Observable<UserInfoLike[]> {
		return combineLatest([
			this.nameControl.valueChanges.pipe(
				debounceTime(500),
				startWith(''),
				distinctUntilChanged(),
				tap(() => this.refreshCount())
			),
			this.statusChange$.pipe(tap(() => this.refreshCount())),
			this.skipCount$.pipe(filter((skip: number) => skip < this.userCount)),
		]).pipe(
			switchMap(([name, status, skipCount]: [string, Status, number], index: number) => {
				const nameSearch = name
					? {
							fullnameincludesubstring: name,
					  }
					: null;
				const params: FindUsersParams = {
					skipCount: skipCount,
					takeCount: this.takeCount,
					...nameSearch,
				};
				return this.getFetchCallback(params, index ? status : undefined);
			}),
			tap((res: OperationResultResponse<UserInfoLike[]>) => (this.userCount = res.totalCount || 0)),
			map((res: OperationResultResponse<UserInfoLike[]>) => res.body as UserInfoLike[]),
			switchMap((users: UserInfoLike[]) =>
				merge(of(users), this.editUser$, this.removeUser$).pipe(
					map((v: UpdateUsersPayload) => new UpdateUsersAction(v)),
					withLatestFrom(this.skipCount$)
				)
			),
			scan((acc: UserInfoLike[], [update, skipCount]: [UpdateUsersAction<UpdateUsersPayload>, number]) => {
				switch (update.action) {
					case 'add':
						const newUsers = update.payload as UserInfoLike[];
						return skipCount ? [...acc, ...newUsers] : newUsers;
					case 'edit':
						const { userId, partialUser } = update.payload as EditPayload;
						return acc.map((u: UserInfoLike) => {
							if (u.id === userId) {
								return { ...u, ...partialUser };
							}
							return u;
						});
					case 'remove':
						return acc.filter((user: UserInfoLike) => user.id !== update.payload);
					default:
						return acc;
				}
			}, [])
		);
	}

	private getFetchCallback(
		params: FindUsersParams,
		status?: Status
	): Observable<OperationResultResponse<UserInfoLike[]>> {
		switch (status) {
			case 'active':
				return this.filterService.filterUsers({ ...params });
			case 'archive':
				return this.userService.findUsers({
					...params,
					isactive: false,
					includecurrentavatar: true,
					includecommunications: true,
				});
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
