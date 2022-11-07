import { Component, ChangeDetectionStrategy, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, first, startWith, takeUntil } from 'rxjs/operators';

import { UserRights } from '@app/types/user-rights.enum';
import { ContextMenuComponent } from '@shared/component/context-menu/context-menu.component';
import { UserListService } from './services/user-list.service';
import { Status, UserInfoLike } from './user-list.types';
import { ContextMenuService } from './services/context-menu.service';

@Component({
	selector: 'do-manage-users',
	templateUrl: './user-list.component.html',
	styleUrls: ['./user-list.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [UserListService, ContextMenuService],
})
export class UserListComponent implements OnInit, AfterViewInit, OnDestroy {
	public readonly UserRights = UserRights;

	@ViewChild(ContextMenuComponent) contextMenu!: ContextMenuComponent;

	public contextMenuItems = this.contextMenuService.menuItems;
	public users$!: Observable<UserInfoLike[]>;
	public nameSearch = this.userList.nameControl;
	public loading$ = this.userList.usersLoading$;

	private destroy$ = new Subject();

	constructor(private userList: UserListService, private contextMenuService: ContextMenuService) {}

	public ngOnInit(): void {
		this.users$ = this.userList.getUsers$();

		this.nameSearch.valueChanges
			.pipe(debounceTime(500), startWith(''), distinctUntilChanged(), takeUntil(this.destroy$))
			.subscribe(() => this.userList.refreshCount());
	}

	public ngAfterViewInit(): void {
		this.contextMenuService.setContextMenu(this.contextMenu);
	}

	public ngOnDestroy(): void {
		this.destroy$.next();
		this.destroy$.complete();
	}

	public loadUsers(): void {
		this.loading$.pipe(first()).subscribe((isLoading: boolean) => {
			if (!isLoading) {
				this.userList.appendUsers();
			}
		});
	}

	public handleStatusToggle(status: Status): void {
		this.userList.setStatus(status);
	}

	public createEmployee(): void {
		this.userList.createUser();
	}
}
