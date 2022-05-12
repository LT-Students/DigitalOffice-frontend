import { Component, ViewChild, ChangeDetectionStrategy, AfterViewInit } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { EMPTY, Observable, Subject, combineLatest } from 'rxjs';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

import { UserInfo } from '@api/user-service/models/user-info';
import { UserService } from '@app/services/user/user.service';
import { CommunicationInfo, CommunicationType, OperationResultStatusType } from '@api/user-service/models';
import { ModalService } from '@app/services/modal.service';
import { map, startWith, switchMap, tap } from 'rxjs/operators';
import { OperationResultResponse } from '@app/types/operation-result-response.interface';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NewEmployeeComponent } from '@shared/modals/new-employee/new-employee.component';
import { UserRecoveryComponent } from '@shared/modals/user-recovery/user-recovery.component';
import { MatDialog } from '@angular/material/dialog';
import { User } from '@app/models/user/user.model';

@Component({
	selector: 'do-manage-users',
	templateUrl: './manage-users.component.html',
	styleUrls: ['./manage-users.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManageUsersComponent implements AfterViewInit {
	@ViewChild(MatSort) sort?: MatSort;
	@ViewChild(MatPaginator) paginator?: MatPaginator;

	public users$: Observable<OperationResultResponse<UserInfo[]>>;
	public filters: FormGroup;
	private _refreshCurrentPage$$: Subject<void>;

	constructor(
		private userService: UserService,
		private modal: ModalService,
		private dialog: MatDialog,
		private _route: ActivatedRoute,
		private _fb: FormBuilder
	) {
		this._refreshCurrentPage$$ = new Subject<void>();
		this.filters = this._fb.group({
			showDeactivatedUsers: [false],
		});
		this.users$ = new Observable<OperationResultResponse<UserInfo[]>>();
	}

	public ngAfterViewInit(): void {
		if (this.paginator !== undefined) {
			this.users$ = combineLatest([
				this.filters.valueChanges.pipe(
					startWith(null),
					tap(() => this.paginator?.firstPage())
				),
				this.paginator.page.pipe(startWith(null)),
				this._refreshCurrentPage$$.pipe(startWith(null)),
			]).pipe(
				switchMap(([filters, page]) =>
					filters !== null || page !== null
						? this.getUsers(filters, page)
						: this._route.data.pipe(map((response) => response.users))
				),
				tap((res) => {
					if (this.paginator) {
						this.paginator.length = res.totalCount ?? 0;
					}
				})
			);
		}
	}

	public getUsers(filters: any, event: PageEvent | null): Observable<OperationResultResponse<UserInfo[]>> {
		return this.userService.findUsers({
			skipCount: event ? event.pageIndex * event.pageSize : 0,
			takeCount: event ? event.pageSize : 10,
			includecurrentavatar: true,
			includeposition: true,
			includedepartment: true,
			includerole: true,
			includedeactivated: filters?.showDeactivatedUsers,
		});
	}

	public onAddEmployeeClick(): void {
		this.modal
			.openModal<NewEmployeeComponent, null, OperationResultResponse<UserInfo[]>>(NewEmployeeComponent)
			.afterClosed()
			.subscribe((result) => {
				if (result?.status === OperationResultStatusType.FullSuccess) {
					this._refreshCurrentPage$$.next();
				}
			});
	}

	public archiveUser(userId: string): void {
		this.modal
			.confirm({
				confirmText: 'Да, удалить',
				title: 'Удаление пользователя',
				message: 'Вы действительно хотите удалить этого пользователя?',
			})
			.afterClosed()
			.pipe(switchMap((confirmed?: boolean) => (confirmed ? this.userService.disableUser(userId) : EMPTY)))
			.subscribe();
	}

	public restoreUser(userId: string): void {
		this.userService.getUser({ userId: userId, includecommunications: true }).subscribe({
			next: (user: User) => {
				if (!user.communications) return;

				const emails = user.communications.filter(
					(c: CommunicationInfo) =>
						c.type === CommunicationType.Email || c.type === CommunicationType.BaseEmail
				);

				this.dialog.open(UserRecoveryComponent, {
					width: '550px',
					maxHeight: '100%',
					data: { userId: userId, emails: emails },
				});
			},
		});
	}
}
