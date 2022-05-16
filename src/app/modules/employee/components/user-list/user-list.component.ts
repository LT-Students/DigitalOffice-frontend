import { Component, ChangeDetectionStrategy, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs';

import { ModalService } from '@app/services/modal.service';
import { FormControl } from '@angular/forms';
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
export class UserListComponent implements OnInit, AfterViewInit {
	@ViewChild(ContextMenuComponent) contextMenu!: ContextMenuComponent;

	public contextMenuItems = this.contextMenuService.menuItems;
	public users$!: Observable<UserInfoLike[]>;
	public nameSearch = new FormControl('');

	constructor(
		private modal: ModalService,
		private userList: UserListService,
		private contextMenuService: ContextMenuService
	) {}

	public ngOnInit(): void {
		this.userList.registerOnNameChange(this.nameSearch.valueChanges);
		this.users$ = this.userList.getUsers$();
	}

	public ngAfterViewInit(): void {
		this.contextMenuService.setContextMenu(this.contextMenu);
	}

	public identify(index: number, user: UserInfoLike): string {
		return user.id;
	}

	public appendUsers(): void {
		this.userList.appendUsers();
	}

	public handleStatusToggle(status: Status): void {
		this.userList.setStatus(status);
	}

	public createEmployee(): void {
		this.userList.createUser();
	}
}
