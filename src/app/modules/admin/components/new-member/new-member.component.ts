import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

import { INewMember } from '@app/interfaces/INewMember';

@Component({
  selector: 'do-new-member',
  templateUrl: './new-member.component.html',
  styleUrls: ['./new-member.component.scss'],
})
export class NewMemberComponent implements OnInit {
  @Input() public newMember: INewMember;
  @Output() checkMember = new EventEmitter<boolean>();

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

  onCheckNewMember(event) {
    this.checkMember.emit(event.checked);
  }
}
