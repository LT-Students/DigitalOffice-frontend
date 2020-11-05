
import { Component, Input, OnInit } from '@angular/core';

import { NewMember } from '../new-members-board/new-members';

@Component({
  selector: 'do-new-member',
  templateUrl: './new-member.component.html',
  styleUrls: ['./new-member.component.scss'],
})
export class NewMemberComponent implements OnInit {
  @Input()
  public newMember: NewMember;

  roles: string[] = [
    'PM',
    'Front-End Developer',
    'QA Tester',
    'Teamlead',
    'Technical Support',
    'Back-End Developer',
  ];

  constructor() {}

  ngOnInit(): void {}

  getCountProjectsTitle(): string {
    return this.declOfNum(this.newMember.projectsCount, [
      'проект',
      'проекта',
      'проектов',
    ]);
  }

  // TODO вынести в Utils
  declOfNum(count: number, titles: string[]): string {
    const cases = [2, 0, 1, 1, 1, 2];
    return titles[
      count % 100 > 4 && count % 100 < 20
        ? 2
        : cases[count % 10 < 5 ? count % 10 : 5]
      ];
  }
}
