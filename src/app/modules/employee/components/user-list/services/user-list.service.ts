import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Data } from '@angular/router';
import { BehaviorSubject, merge, Observable, of, Subject, throwError } from 'rxjs';
import { catchError, filter, first, map, scan, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { UserInfo } from '@api/user-service/models/user-info';
import { OperationResultResponse } from '@app/types/operation-result-response.interface';
import { FilterService } from '@app/services/filter/filter.service';
import { UserService } from '@app/services/user/user.service';
import { WithPagination } from '@app/types/find-request.interface';
import { LoadingState } from '@app/utils/loading-state';
import { NewEmployeeComponent } from '@shared/dialogs/new-employee/new-employee.component';
import { DialogService, ModalWidth } from '@shared/component/dialog/dialog.service';
import { EditPayload, Status, UpdateUsersAction, UpdateUsersPayload, UserInfoLike } from '../user-list.types';

interface FindUsersParams extends WithPagination {
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
	public nameControl = new FormControl('', { nonNullable: true });

	private skipCount$ = new BehaviorSubject<number>(0);
	private loadingState = new LoadingState();
	public usersLoading$ = this.loadingState.loading$;

	constructor(
		private filterService: FilterService,
		private userService: UserService,
		private route: ActivatedRoute,
		private modal: DialogService
	) {}

	public setStatus(status: Status): void {
		this.statusChange.next(status);
		this.refreshCount();
	}

	public appendUsers(): void {
		this.skipCount$.pipe(first()).subscribe({
			next: (offset: number) => this.skipCount$.next(offset + this.takeCount),
		});
	}

	public refreshCount(): void {
		this.skipCount$.next(0);
	}

	public createUser(): void {
		this.modal
			.open(NewEmployeeComponent, {
				width: ModalWidth.M,
			})
			.closed.pipe(withLatestFrom(this.statusChange$))
			.subscribe(([_, status]: [any, Status]) => {
				if (status !== 'active') {
					this.refreshCount();
				}
			});
	}

	public removeFromList(userId: string): boolean {
		let isRemoved = false;
		this.statusChange$.pipe(first()).subscribe({
			next: () => this.removeUser$.next(userId),
		});
		return isRemoved;
	}

	public editUserInList(userId: string, partialUser: Partial<UserInfoLike>): void {
		this.editUser$.next({ userId, partialUser });
	}

	public getUsers$(): Observable<UserInfoLike[]> {
		return this.skipCount$.pipe(
			filter((skipCount: number) => skipCount < this.userCount),
			switchMap((skipCount: number, index: number) => {
				this.loadingState.setLoading(true);

				const name = this.nameControl.value;
				const status = this.statusChange.value;

				const params: FindUsersParams = {
					skipCount: skipCount,
					takeCount: this.takeCount,
					...(name
						? {
								fullnameincludesubstring: name,
						  }
						: null),
				};
				return this.getFetchCallback(params, index ? status : undefined).pipe(
					catchError((err) => {
						this.loadingState.setLoading(false);
						return throwError(err);
					})
				);
			}),
			tap((res: OperationResultResponse<UserInfoLike[]>) => {
				this.loadingState.setLoading(false);
				this.userCount = res.totalCount || 0;
			}),
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
				return this.filterService.filterUsers({ ...params, isascendingsort: true });
			case 'archive':
				return this.userService.findUsers({
					...params,
					isactive: false,
					ispending: false,
					includecurrentavatar: true,
					includecommunications: true,
					isascendingsort: true,
				});
			case 'pending':
				return this.userService.findUsers({
					...params,
					isactive: false,
					ispending: true,
					includecurrentavatar: true,
					includecommunications: true,
					isascendingsort: true,
				});
			default:
				return this.route.data.pipe(
					map((response: Data) => response.users as OperationResultResponse<UserInfo[]>)
				);
		}
	}
}
