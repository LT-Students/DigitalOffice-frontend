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
  private subscription: Subscription;
  public users: NewMember[] = newMembers;
  public visiblyUsers = this.users;
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
    this.subscription = this.userService
      .getAllUsersGet(0, 50, this.searchName)
      .pipe()
      .subscribe((data: User) => console.log(data));
  }

  onSelect() {
    this.visiblyUsers = this.users;
    if (this.selectedSpecialization !== undefined) {
      this.visiblyUsers = this.visiblyUsers.filter((user) =>
        user.specialization.find(
          (specialization) => specialization === this.selectedSpecialization
        )
      );
    }
    if (this.selectedLevel !== undefined) {
      this.visiblyUsers = this.visiblyUsers.filter(
        (user) => user.level === this.selectedLevel
      );
    }
    return this.visiblyUsers;
  }

  onChooseMemberClick(): void {
    console.log('clicked!');
  }

  onSearchClick(value: string): void {
    this.searchName = value;
    this.getUsers();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
