import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { UserInfo } from '@api/user-service/models/user-info';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService } from '@app/services/user/user.service';
import { UserSearchModalConfig } from '@app/services/modal.service';
import { PageEvent } from '@angular/material/paginator';
import { ProjectUserRoleType } from '@api/project-service/models/project-user-role-type';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { PositionService } from '@app/services/position/position.service';
import { PositionInfo } from '@api/position-service/models/position-info';
import { Team, teamCards } from '../../team-cards';
import { WorkFlowMode } from '../../../../../employee/employee-page.component';

@Component({
	selector: 'do-new-members-board',
	templateUrl: './user-search.component.html',
	styleUrls: ['./user-search.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserSearchComponent implements OnInit, OnDestroy {
	@Input() mode: WorkFlowMode | undefined;
	public members: UserInfo[];
	public membersAll: UserInfo[];
	public visibleMembers: UserInfo[];
	public checkedMembers: UserInfo[];
	public selectedSpecialization: any;
	public selectedLevel: any;
	public searchName: string;
	public roles: ProjectUserRoleType[] = [ProjectUserRoleType.Manager];
	public positions: PositionInfo[];
	public WorkFlowMode = WorkFlowMode;

	public totalCount: number;
	public pageSize: number;
	public pageIndex: number;

	constructor(
		@Inject(MAT_DIALOG_DATA) public data: UserSearchModalConfig,
		private _userService: UserService,
		private _positionService: PositionService,
		private _dialogRef: MatDialogRef<UserSearchComponent>,
		private _cdr: ChangeDetectorRef
	) {
		this.checkedMembers = [...(data.members as UserInfo[])];
		this.searchName = '';
		this.members = data.members as UserInfo[];
		this.membersAll = [];
		this.visibleMembers = [];
		this.positions = [];

		this.totalCount = 0;
		this.pageSize = 10;
		this.pageIndex = 0;
	}

	public ngOnInit(): void {
		this._getMembers();
		this._getPositions();
	}

	private _getMembers(): void {
		this._userService
			.findUsers({ skipCount: this.pageIndex * this.pageSize, takeCount: this.pageSize })
			.subscribe((data) => {
				this.membersAll = data.body ?? [];
				this.totalCount = data.totalCount ?? 0;
				this._cdr.markForCheck();
			});
	}

	private _getPositions(): void {
		this._positionService.findPositions({ skipcount: 0, takecount: 100 }).subscribe((data) => {
			this.positions = data.body ?? [];
		});
	}

	public onSelect() {
		this.visibleMembers = this.members ?? [];
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

	public onCheckMember($event: MatCheckboxChange, user: UserInfo): void {
		if ($event.checked) {
			this.checkedMembers.push(user);
		} else {
			const uncheckedUserIndex = this.checkedMembers.findIndex((u) => u.id === user.id);
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
}
