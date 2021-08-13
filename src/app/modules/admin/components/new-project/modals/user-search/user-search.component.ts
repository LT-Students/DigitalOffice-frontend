//@ts-nocheck
import { Component, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { UserInfo } from '@data/api/user-service/models/user-info';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService } from '@app/services/user/user.service';
import { UserSearchModalConfig } from '@app/services/modal.service';
import { UserRoleType } from '@data/api/project-service/models/user-role-type';
import { PositionInfo } from '@data/api/company-service/models/position-info';
import { NetService } from '@app/services/net.service';
import { PageEvent } from '@angular/material/paginator';
import { Team, teamCards } from '../../team-cards';
import { WorkFlowMode } from '../../../../../employee/employee-page.component';

@Component({
	selector: 'do-new-members-board',
	templateUrl: './user-search.component.html',
	styleUrls: ['./user-search.component.scss'],
})
export class UserSearchComponent implements OnInit, OnDestroy {
	@Input() mode: WorkFlowMode;
	public members: UserInfo[];
	public membersAll: UserInfo[];
	public visibleMembers: UserInfo[];
	public checkedMembers: UserInfo[];
	public selectedSpecialization;
	public selectedLevel;
	public searchName: string;
	public roles: UserRoleType[] = [UserRoleType.ProjectAdmin];
	public positions: PositionInfo[];
	public WorkFlowMode = WorkFlowMode;

	public totalCount: number;
	public pageSize: number;
	public pageIndex: number;

	// private getMembersSubscription: Subscription;

	constructor(
		@Inject(MAT_DIALOG_DATA) public data: UserSearchModalConfig,
		private _userService: UserService,
		private _netService: NetService,
		private _dialogRef: MatDialogRef<UserSearchComponent>
	) {
		this.checkedMembers = [...data.members];
		this.searchName = null;
		this.members = data.members;
		// TODO: Не показывать, пока не будет применён фильтр
		switch (data.mode) {
			case WorkFlowMode.VIEW: {
				this.membersAll = data.team ? data.team.members : null;
				break;
			}
			case WorkFlowMode.EDIT: {
				this.members = data.team.members;
				this._initSearchMode();
				break;
			}
			case WorkFlowMode.ADD: {
				break;
			}
		}

		this.totalCount = 0;
		this.pageSize = 10;
		this.pageIndex = 0;
		// teamCards.forEach((team: Team) => {
		//   this.membersAll.push(...team.members)
		// });
	}

	public ngOnInit(): void {
		this._getMembers();
		this._getPositions();
	}

	private _getMembers(): void {
		this._userService.findUsers(this.pageIndex * this.pageSize, this.pageSize).subscribe(
			(data) => {
				this.membersAll = data.body;
				this.totalCount = data.totalCount;
			},
			(error) => console.log(error)
		);
	}

	private _getPositions(): void {
		this._netService.getPositionsList({ skipCount: 0, takeCount: 100 }).subscribe(
			(data) => {
				this.positions = data.body;
			},
			(error) => console.log(error)
		);
	}

	public onSelect() {
		this.visibleMembers = this.members;
		if (this.selectedSpecialization) {
			this.visibleMembers = this.visibleMembers.filter(
				(user: UserInfo) => true
				//  TODO: refactor when api will be ready
				// user.specialization.includes(this.selectedSpecialization)
			);
		}

		if (this.selectedLevel) {
			/* В эту ветку не попадем, т.к. не задано начальное значение
        TODO: refactor when api will be ready
      this.visibleMembers = this.visibleMembers.filter(
        (user) => user.level === this.selectedLevel
      );*/
		}
		return this.visibleMembers;
	}

	public onSave(): void {
		console.log(this.checkedMembers);
		this._dialogRef.close(this.checkedMembers);
	}

	public onPageChange(event: PageEvent): void {
		this.pageSize = event.pageSize;
		this.pageIndex = event.pageIndex;
		this._getMembers();
	}

	public onSearchClick(value: string): void {
		this.searchName = value;
		this._getMembers();
	}

	public ngOnDestroy(): void {
		// this.getMembersSubscription.unsubscribe();
	}

	// public assignLead(member: UserInfo): void {
	// 	const index: number = this.members.findIndex((teamMember: UserInfo) => teamMember === member);
	// 	this.members[index].lead = this.members[index].lead ? !this.members[index].lead : true;
	// }

	public onCheckMember($event, user: UserInfo): void {
		if ($event.checked) {
			this.checkedMembers.push(user);
		} else {
			const uncheckedUserIndex = this.checkedMembers.findIndex((u, index) => u.id === user.id);
			this.checkedMembers.splice(uncheckedUserIndex, 1);
		}
	}

	public isMember(user: UserInfo): boolean {
		/* TODO: add id to compare with id*/
		if (this.checkedMembers && this.checkedMembers.length) {
			return this.checkedMembers.some((member: UserInfo) => user.id === member.id);
		} else {
			return false;
		}
	}

	private _initSearchMode(): void {
		// add subscription to fetch Users

		this.membersAll = teamCards
			.map((team: Team) => team.members)
			.reduce((prev: UserInfo[], currentValue: UserInfo[]) => prev.concat(currentValue), []);
		console.log('initSearchMode');
	}
}
