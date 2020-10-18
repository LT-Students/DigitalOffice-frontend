import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'do-new-member',
  templateUrl: './new-member.component.html',
  styleUrls: ['./new-member.component.scss']
})
export class NewMemberComponent implements OnInit {

  members = [
    {
      profileImgSrc: '',
      lead: true
    }
  ];
  names: string[] = [
    'Алексей Пивоваров',
    'Алита Пратчетт',
    'Алтул Пендлагон',
    'Алиса Реутова'
  ];
  specializations: string[] = [
    'Front-End Developer',
    'Back-End Developer',
    'Junior Product Manager',
    'Middle QA Tester',
    'Junior UI/UX Designer'
  ];
  projects: string[] = [
    '2 проекта',
    '1 проект'
  ];
  roles: string[] = [
    'Product Manager',
    'Front-End Developer',
    'QA Tester',
    'Teamlead',
    'Technical Support',
    'Back-End Developer'
  ];

  constructor() {
  }


  ngOnInit(): void {
  }

}
