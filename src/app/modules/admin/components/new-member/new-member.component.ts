import { Component, Input, OnInit } from '@angular/core';

import { NewMember } from '../new-members-board/new-members';





@Component({
  selector: 'do-new-member',
  templateUrl: './new-member.component.html',
  styleUrls: ['./new-member.component.scss']
})
export class NewMemberComponent implements OnInit {

  @Input()
  public newMember: NewMember;


  roles: string[] = [
    'Product Manager',
    'Front-End Developer',
    'QA Tester',
    'Teamlead',
    'Technical Support',
    'Back-End Developer'
  ];

  // text: any;

  constructor() {
  }

  // public checkProductsCount(number, titles) {
  //   cases = [2, 0, 1, 1, 1, 2];
  //   return titles[ (number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5] ];
  // }
  // let count = productsCount,
  // result = checkProductsCount(count, ['проект', 'проекта', 'проектов']);
  // }


  ngOnInit(): void {
  }

}
