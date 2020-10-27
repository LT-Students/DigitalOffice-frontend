import {Component, OnInit} from '@angular/core';

import { teamCards, TeamCard } from './team-cards';

@Component({
  selector: 'do-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: [ './new-project.component.scss' ]
})
export class NewProjectComponent {
  public teams: TeamCard[] = teamCards;
  public team = [
    {
      name: 'Olya',
      profileImgSrc: ''
    },
    {
      name: 'Slava',
      profileImgSrc: ''
    },
    {
      name: 'Nikita',
      profileImgSrc: ''
    },
    {
      name: 'Olya',
      profileImgSrc: ''
    },
    {
      name: 'Slava',
      profileImgSrc: ''
    },
  ];

  constructor() { }

  public addMember(members): void {
    members.push({
      name: 'unknown',
      profileImgSrc: ''
    });
  }
}
