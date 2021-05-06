import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { of, Subscription } from 'rxjs';

import { switchMap } from 'rxjs/operators';
import { UserApiService } from '@data/api/user-service/services/user-api.service';
import { UsersResponse } from '@data/api/user-service/models/users-response';
import { UserInfo } from '@data/api/user-service/models/user-info';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TeamCard, TeamMember } from '../../team-cards';

@Component({
  selector: 'do-new-members-board',
  templateUrl: './new-members-board.component.html',
  styleUrls: ['./new-members-board.component.scss'],
})
export class NewMembersBoardComponent implements OnInit, OnDestroy {
  public members: UserInfo[];
  public visibleMembers: UserInfo[];
  public checkedMembers: UserInfo[];
  public selectedSpecialization;
  public selectedLevel;
  public searchName: string ;
  private getMembersSubscription: Subscription;

  public specializations: string[] = [
    'Front-End Developer',
    'Backend-End Developer',
    'Product Manager',
    'UI/UX Designer',
    'QA Tester',
  ];
  public levels: string[] = ['Junior', 'Middle', 'Senior'];

  constructor(@Inject(MAT_DIALOG_DATA) public data: TeamCard,
              private userApiService: UserApiService) {
    this.checkedMembers = [];
    this.searchName = null;
  }

  ngOnInit(): void {
    this.getMembers();
  }

  getMembers(): void {
    console.log('getMembers');
  }

  onSelect() {
    this.visibleMembers = this.members;
    if (this.selectedSpecialization) {
      this.visibleMembers = this.visibleMembers.filter((user: UserInfo) => true
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

  onSearchClick(value: string): void {
    this.searchName = value;
    this.getMembers();
  }

  ngOnDestroy(): void {
    // this.getMembersSubscription.unsubscribe();
  }

  assignLead(member: TeamMember): void {
    const index: number = this.data.members.findIndex((teamMember: TeamMember) => teamMember === member);
    this.data.members[index].lead = (this.data.members[index].lead) ? !this.data.members[index].lead : true;
  }

  onCheckMember($event, user): void {
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
}
