import { Component, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserInfo } from '@data/api/user-service/models/user-info';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Team, teamCards, TeamMember } from '../../team-cards';
import { WorkFlowMode } from '../../../../../employee/employee-page.component';
import { UserSearchModalConfig } from '@app/services/modal.service';

@Component({
	selector: 'do-new-members-board',
	templateUrl: './user-search.component.html',
	styleUrls: ['./user-search.component.scss'],
})
export class UserSearchComponent implements OnInit, OnDestroy {
	@Input() mode: WorkFlowMode;
	public members: UserInfo[];
	public memberss: TeamMember[];
	public membersAll: TeamMember[];
	public visibleMembers: UserInfo[];
	public filteredUsers: UserInfo[];
	public checkedMembers: UserInfo[];
	public selectedSpecialization;
	public selectedLevel;
	public searchName: string;
	public specializations: string[] = ['Front-End Developer', 'Backend-End Developer', 'Product Manager', 'UI/UX Designer', 'QA Tester'];
	public levels: string[] = ['Junior', 'Middle', 'Senior'];
	public WorkFlowMode = WorkFlowMode;

	private getMembersSubscription: Subscription;

	constructor(@Inject(MAT_DIALOG_DATA) public data: UserSearchModalConfig) {
		this.checkedMembers = [];
		this.searchName = null;
		this.memberss = null;
		// TODO: Не показывать, пока не будет применён фильтр
		switch (data.mode) {
			case WorkFlowMode.VIEW: {
				this.membersAll = data.team ? data.team.members : null;
				break;
			}
			case WorkFlowMode.EDIT: {
				this.memberss = data.team.members;
				this._initSearchMode();
				break;
			}
			case WorkFlowMode.ADD: {
				break;
			}
		}
		// teamCards.forEach((team: Team) => {
		//   this.membersAll.push(...team.members)
		// });
	}

	public ngOnInit(): void {
		this.getMembers();
	}

	public getMembers(): void {
		console.log('getMembers');
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

	public onSearchClick(value: string): void {
		this.searchName = value;
		this.getMembers();
	}

	public ngOnDestroy(): void {
		// this.getMembersSubscription.unsubscribe();
	}

	public assignLead(member: TeamMember): void {
		const index: number = this.memberss.findIndex((teamMember: TeamMember) => teamMember === member);
		this.memberss[index].lead = this.memberss[index].lead ? !this.memberss[index].lead : true;
	}

	public onCheckMember($event, user): void {
		if ($event) {
			this.checkedMembers.push(user);
		} else {
			let uncheckedUserIndex;
			this.checkedMembers.map((x, index) => {
				if (x.id === user.id) {
					uncheckedUserIndex = index;
				}
			});
			this.checkedMembers.splice(uncheckedUserIndex, 1);
		}
	}

	public isMember(user: TeamMember): boolean {
		/* TODO: add id to compare with id*/
		if (this.memberss && this.memberss.length) {
			return this.memberss.some((member: TeamMember) => user.id === member.id);
		} else {
			return false;
		}
	}

	private _initSearchMode(): void {
		// add subscription to fetch Users

		this.membersAll = teamCards
			.map((team: Team) => team.members)
			.reduce((prev: TeamMember[], currentValue: TeamMember[]) => prev.concat(currentValue), []);
		console.log('initSearchMode');
	}
}
