import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

import { Member } from '../../../../interfaces/member.interface';
import { newMembers, NewMember } from './new-members';




@Component({
  selector: 'do-new-members-board',
  templateUrl: './new-members-board.component.html',
  styleUrls: ['./new-members-board.component.scss']
})

export class NewMembersBoardComponent implements OnInit {

  public users: NewMember[] = newMembers;

  specializations: string[] = [
    'front-end',
    'back-end',
    'full-stack'
  ];
  levels: string[] = [
    'junior',
    'middle',
    'senior'
  ];


  @Input() members: Member[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  onChooseMemberClick(): void {
    console.log('clicked!');
  }

  onSearchClick(value: string): void {
    console.log(value);
  }
}
