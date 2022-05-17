import { Injectable } from '@angular/core';
import {
	debounceTime,
	distinctUntilChanged,
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
import { Status, UpdateUsersAction, UserInfoLike } from '../user-list.types';

interface FindUsersParams extends IFindRequest {
	fullnameincludesubstring?: string;
}

@Injectable()
export class UserListService {
	private readonly takeCount = 20;
	private skipCount = 0;

	private removeUser$ = new Subject<string>();

	private statusChange = new BehaviorSubject<Status>('active');
	public statusChange$ = this.statusChange.asObservable();
	public nameControl = new FormControl('');

	private shouldAppend$ = new Subject<void>();

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
		this.skipCount += this.takeCount;
		this.shouldAppend$.next();
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
		this.removeUser$.next(userId);
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
				return this.getFetchCallback(params, index ? status : undefined);
			}),
			map((res: OperationResultResponse<UserInfoLike[]>) => res.body as UserInfoLike[]),
			switchMap((users: UserInfoLike[]) =>
				merge(of(users), this.removeUser$).pipe(map((v: UserInfoLike[] | string) => new UpdateUsersAction(v)))
			),
			scan((acc: UserInfoLike[], update: UpdateUsersAction<UserInfoLike[] | string>) => {
				console.log(acc, update);
				switch (update.action) {
					case 'add':
						const newUsers = update.payload as UserInfoLike[];
						return this.skipCount ? [...acc, ...newUsers] : newUsers;
					case 'remove':
						return acc.filter((user: UserInfoLike) => user.id !== update.payload);
					default:
						return acc;
				}
			}, [])
		);
	}

	private refreshCount(): void {
		this.skipCount = 0;
	}

	private getFetchCallback(
		params: FindUsersParams,
		status?: Status
	): Observable<OperationResultResponse<UserInfoLike[]>> {
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
