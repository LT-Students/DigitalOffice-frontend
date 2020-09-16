import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit(): void {
  }

  onChooseMemberClick(): void {
    console.log('clicked!');
  }
}
