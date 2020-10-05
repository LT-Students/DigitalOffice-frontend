import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Member } from './../../../../interfaces/member.interface';

@Component({
  selector: 'do-members-board',
  templateUrl: './members-board.component.html',
  styleUrls: ['./members-board.component.scss']
})
export class MembersBoardComponent implements OnInit {

  specializations: string[] = [
    "front-end",
    "back-end",
    "full-stack"
  ];
  levels: string[] = [
    "junior",
    "middle",
    "senior"
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
