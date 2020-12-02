import { Component, Input, OnInit } from '@angular/core';

import { Member } from '../../../../interfaces/member.interface';
import { newMembers, NewMember } from './new-members';

@Component({
  selector: 'do-new-members-board',
  templateUrl: './new-members-board.component.html',
  styleUrls: ['./new-members-board.component.scss'],
})
export class NewMembersBoardComponent implements OnInit {
  public users: NewMember[] = newMembers;
  public visiblyUsers = this.users;

  specializations: string[] = [
    'Front-End Developer',
    'Backend-End Developer',
    'Product Manager',
    'UI/UX Designer',
    'QA Tester',
  ];
  levels: string[] = ['Junior', 'Middle', 'Senior'];

  @Input() members: Member[] = [];
  selectedSpecialization;
  selectedLevel;

  constructor() {}

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

  ngOnInit(): void {}

  onChooseMemberClick(): void {
    console.log('clicked!');
  }

  onSearchClick(value: string): void {
    console.log(value);
  }
}
