import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { User, UserService } from '@digital-office/api/user-service';

import { Member } from '../../../../interfaces/member.interface';
import { newMembers, NewMember } from './new-members';

@Component({
  selector: 'do-new-members-board',
  templateUrl: './new-members-board.component.html',
  styleUrls: ['./new-members-board.component.scss'],
})
export class NewMembersBoardComponent implements OnInit, OnDestroy {
  public user: User;
  private getUsersSubscription: Subscription;
  public users: NewMember[] = newMembers;
  public visibleUsers = this.users;
  public specializations: string[] = [
    'Front-End Developer',
    'Backend-End Developer',
    'Product Manager',
    'UI/UX Designer',
    'QA Tester',
  ];
  public levels: string[] = ['Junior', 'Middle', 'Senior'];
  @Input() members: Member[] = [];
  public selectedSpecialization;
  public selectedLevel;
  public searchName;

  constructor(private userService: UserService) {}

  ngOnInit(): void {}

  getUsers(): void {
    this.getUsersSubscription = this.userService
      .getAllUsersGet(0, 50, this.searchName)
      .subscribe((data: User) => console.log(data));
  }

  onSelect() {
    this.visibleUsers = this.users;
    if (this.selectedSpecialization !== undefined) {
      this.visibleUsers = this.visibleUsers.filter((user) =>
        user.specialization.includes(this.selectedSpecialization)
      );
    }
    if (this.selectedLevel !== undefined) {
      this.visibleUsers = this.visibleUsers.filter(
        (user) => user.level === this.selectedLevel
      );
    }
    return this.visibleUsers;
  }

  onChooseMemberClick(): void {
    console.log('clicked!');
  }

  onSearchClick(value: string): void {
    this.searchName = value;
    this.getUsers();
  }

  ngOnDestroy(): void {
    this.getUsersSubscription.unsubscribe();
  }
}
